import type { VercelRequest, VercelResponse } from "@vercel/node";

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function setCors(req: VercelRequest, res: VercelResponse) {
  // 你也可以改成只允许 https://stickerkiko.com
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function dataUrlToBuffer(dataUrl: string) {
  const m = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!m) return null;
  const mime = m[1];
  const base64 = m[2];
  const buf = Buffer.from(base64, "base64");
  return { mime, buf };
}

async function shopifyGraphQL(shop: string, token: string, query: string, variables: any) {
  const resp = await fetch(`https://${shop}/admin/api/2025-10/graphql.json`, {
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": token,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  const text = await resp.text();
  const json = safeJsonParse(text);

  if (!resp.ok) {
    throw new Error(`Shopify GraphQL HTTP ${resp.status}: ${text?.slice(0, 500)}`);
  }
  if (!json) {
    throw new Error(`Shopify GraphQL invalid JSON: ${text?.slice(0, 500)}`);
  }
  if (json.errors?.length) {
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors).slice(0, 800)}`);
  }
  return json;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(req, res);
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const body = typeof req.body === "string" ? safeJsonParse(req.body) : req.body;
    const { imageDataUrl, meta } = body || {};

    if (!imageDataUrl || typeof imageDataUrl !== "string") {
      return res.status(400).json({ error: "Invalid imageDataUrl" });
    }

    // 如果你以后某些场景传进来的是已存在的 https url，这里直接透传（不再上传）
    if (/^https?:\/\//i.test(imageDataUrl)) {
      return res.status(200).json({
        designId: "",
        designUrl: imageDataUrl,
        meta,
        passthrough: true,
      });
    }

    const parsed = dataUrlToBuffer(imageDataUrl);
    if (!parsed) return res.status(400).json({ error: "Invalid imageDataUrl" });

    const shop = process.env.SHOPIFY_SHOP;
    const token = process.env.SHOPIFY_ADMIN_TOKEN;
    if (!shop || !token) return res.status(500).json({ error: "Missing Shopify env vars" });

    const filename = `design-${Date.now()}.png`;
    const fileSize = parsed.buf.length;
    const mimeType = parsed.mime;

    // 1) stagedUploadsCreate
    const STAGED_UPLOADS_CREATE = /* GraphQL */ `
      mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
        stagedUploadsCreate(input: $input) {
          stagedTargets {
            url
            resourceUrl
            parameters {
              name
              value
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const stagedJson = await shopifyGraphQL(shop, token, STAGED_UPLOADS_CREATE, {
      input: [
        {
          resource: "FILE",
          filename,
          mimeType,
          httpMethod: "POST",
          fileSize: String(fileSize),
        },
      ],
    });

    const staged = stagedJson?.data?.stagedUploadsCreate;
    const userErrors1 = staged?.userErrors || [];
    if (userErrors1.length) {
      return res.status(500).json({ error: "stagedUploadsCreate userErrors", details: userErrors1 });
    }

    const target = staged?.stagedTargets?.[0];
    const uploadUrl: string | undefined = target?.url;
    const resourceUrl: string | undefined = target?.resourceUrl;
    const params: { name: string; value: string }[] = target?.parameters || [];

    if (!uploadUrl || !resourceUrl) {
      return res.status(500).json({
        error: "Missing uploadUrl/resourceUrl from stagedUploadsCreate",
        details: target || stagedJson,
      });
    }

    // 2) POST multipart to staged upload URL
    const form = new FormData();
    for (const p of params) form.append(p.name, p.value);
    form.append("file", new Blob([parsed.buf], { type: mimeType }), filename);

    const upResp = await fetch(uploadUrl, { method: "POST", body: form as any });
    if (!upResp.ok) {
      const t = await upResp.text();
      return res.status(500).json({
        error: "Staged upload failed",
        status: upResp.status,
        details: t?.slice(0, 800),
      });
    }

    // 3) fileCreate
    const FILE_CREATE = /* GraphQL */ `
      mutation fileCreate($files: [FileCreateInput!]!) {
        fileCreate(files: $files) {
          files {
            __typename
            ... on MediaImage {
              id
              image {
                url
              }
              preview {
                image {
                  url
                }
              }
            }
            ... on GenericFile {
              id
              url
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const createJson = await shopifyGraphQL(shop, token, FILE_CREATE, {
      files: [
        {
          originalSource: resourceUrl,
          contentType: "IMAGE",
          alt: "Sticker design",
        },
      ],
    });

    const fc = createJson?.data?.fileCreate;
    const userErrors2 = fc?.userErrors || [];
    if (userErrors2.length) {
      return res.status(500).json({ error: "fileCreate userErrors", details: userErrors2 });
    }

    const created = fc?.files?.[0];
    const designId: string | undefined = created?.id;

    // 4) image.url 可能一开始是 null，poll 一下
    let designUrl: string | null =
      created?.image?.url ||
      created?.preview?.image?.url ||
      created?.url ||
      null;

    const NODE_QUERY = /* GraphQL */ `
      query node($id: ID!) {
        node(id: $id) {
          __typename
          ... on MediaImage {
            id
            image { url }
            preview { image { url } }
          }
          ... on GenericFile {
            id
            url
          }
        }
      }
    `;

    if (designId && !designUrl) {
      for (let i = 0; i < 6; i++) {
        await new Promise((r) => setTimeout(r, 600));
        const nodeJson = await shopifyGraphQL(shop, token, NODE_QUERY, { id: designId });
        const node = nodeJson?.data?.node;
        designUrl =
          node?.image?.url ||
          node?.preview?.image?.url ||
          node?.url ||
          null;
        if (designUrl) break;
      }
    }

    // 最后兜底：至少返回 resourceUrl（虽然它不是 CDN，但能定位）
    if (!designUrl) designUrl = resourceUrl;

    return res.status(200).json({ designId: designId || "", designUrl, meta });
  } catch (err: any) {
    return res.status(500).json({
      error: "Upload error",
      message: err?.message || String(err),
    });
  }
}
