import type { VercelRequest, VercelResponse } from "@vercel/node";

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function getOriginAllowlist(origin?: string) {
  // ✅ 改成你的正式域名（不要用 *，否则你未来要带 cookie 会出问题）
  const allow = new Set([
    "https://stickerkiko.com",
    "https://www.stickerkiko.com",
  ]);
  if (!origin) return "https://stickerkiko.com";
  return allow.has(origin) ? origin : "https://stickerkiko.com";
}

function parseDataUrl(dataUrl: string): { mime: string; base64: string } | null {
  // data:image/png;base64,xxxx
  const m = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!m) return null;
  return { mime: m[1], base64: m[2] };
}

async function shopifyGraphQL(shop: string, token: string, query: string, variables?: any) {
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
    throw new Error(
      `Shopify GraphQL HTTP ${resp.status}: ${JSON.stringify(json ?? text?.slice(0, 500))}`
    );
  }
  return json;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin as string | undefined;
  const allowOrigin = getOriginAllowlist(origin);

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", allowOrigin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const body = typeof req.body === "string" ? safeJsonParse(req.body) : req.body;
    const { imageDataUrl, meta } = body || {};

    if (!imageDataUrl || typeof imageDataUrl !== "string") {
      return res.status(400).json({ error: "Invalid imageDataUrl" });
    }

    // ✅ 如果前端传来的已经是 https 文件 URL（比如你以后直接用 CDN）
    if (/^https?:\/\//i.test(imageDataUrl)) {
      return res.status(200).json({
        designId: "",
        designUrl: imageDataUrl,
        meta,
        note: "imageDataUrl already a URL, skipped upload",
      });
    }

    // ❌ blob: 不可能在 server 端拿到内容（blob 只存在于浏览器内存）
    if (imageDataUrl.startsWith("blob:")) {
      return res.status(400).json({
        error: "Invalid imageDataUrl",
        hint: "You passed a blob: URL. Convert it to data:image/...;base64,... before sending.",
      });
    }

    const parsed = parseDataUrl(imageDataUrl);
    if (!parsed) {
      return res.status(400).json({
        error: "Invalid imageDataUrl",
        hint: "Expected data:image/<type>;base64,<payload>",
      });
    }

    const shop = process.env.SHOPIFY_SHOP;
    const token = process.env.SHOPIFY_ADMIN_TOKEN;
    if (!shop || !token) {
      return res.status(500).json({ error: "Missing Shopify env vars" });
    }

    const filename = `design-${Date.now()}.${parsed.mime.includes("png") ? "png" : "jpg"}`;
    const byteSize = Math.floor((parsed.base64.length * 3) / 4); // 近似即可

    // 1) stagedUploadsCreate：拿 GCS 上传地址 + fields
    const stagedResp = await shopifyGraphQL(
      shop,
      token,
      `
        mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
          stagedUploadsCreate(input: $input) {
            stagedTargets {
              url
              resourceUrl
              parameters { name value }
            }
            userErrors { field message }
          }
        }
      `,
      {
        input: [
          {
            resource: "FILE",
            filename,
            mimeType: parsed.mime,
            httpMethod: "POST",
            fileSize: String(byteSize),
          },
        ],
      }
    );

    const stagedErrors = stagedResp?.data?.stagedUploadsCreate?.userErrors;
    if (stagedErrors?.length) {
      return res.status(500).json({ error: "stagedUploadsCreate userErrors", details: stagedErrors });
    }

    const target = stagedResp?.data?.stagedUploadsCreate?.stagedTargets?.[0];
    const uploadUrl: string | null = target?.url || null;
    const resourceUrl: string | null = target?.resourceUrl || null;
    const parameters: Array<{ name: string; value: string }> = target?.parameters || [];

    if (!uploadUrl) {
      return res.status(500).json({
        error: "Missing upload URL in staged parameters",
        details: parameters,
        raw: stagedResp,
      });
    }
    if (!resourceUrl) {
      return res.status(500).json({
        error: "Missing resourceUrl in staged parameters",
        details: parameters,
        raw: stagedResp,
      });
    }

    // 2) 上传到 GCS（multipart/form-data）
    const form = new FormData();
    for (const p of parameters) form.append(p.name, p.value);

    // base64 -> Blob
    const bin = Buffer.from(parsed.base64, "base64");
    const blob = new Blob([bin], { type: parsed.mime });
    form.append("file", blob, filename);

    const uploadResp = await fetch(uploadUrl, { method: "POST", body: form });
    if (!uploadResp.ok) {
      const t = await uploadResp.text();
      return res.status(500).json({
        error: "Staged upload failed",
        status: uploadResp.status,
        details: t?.slice(0, 500),
      });
    }

    // 3) fileCreate：把 staged resourceUrl 注册成 Shopify File
    const createResp = await shopifyGraphQL(
      shop,
      token,
      `
        mutation fileCreate($files: [FileCreateInput!]!) {
          fileCreate(files: $files) {
            files {
              id
              ... on MediaImage {
                image { url }
                preview { image { url } }
              }
              ... on GenericFile {
                url
              }
            }
            userErrors { field message }
          }
        }
      `,
      {
        files: [
          {
            originalSource: resourceUrl,
            alt: "Sticker design",
            contentType: parsed.mime.includes("png") ? "IMAGE" : "IMAGE",
          },
        ],
      }
    );

    const createErrors = createResp?.data?.fileCreate?.userErrors;
    if (createErrors?.length) {
      return res.status(500).json({ error: "fileCreate userErrors", details: createErrors, raw: createResp });
    }

    const created = createResp?.data?.fileCreate?.files?.[0];
    const fileId: string | undefined = created?.id;
    if (!fileId) {
      return res.status(500).json({
        error: "fileCreate returned unexpected response",
        details: createResp,
      });
    }

    // 4) 轮询拿最终 URL（Shopify 可能异步生成 preview）
    const queryFile = async () => {
      const q = await shopifyGraphQL(
        shop,
        token,
        `
          query node($id: ID!) {
            node(id: $id) {
              id
              ... on MediaImage {
                image { url }
                preview { image { url } }
              }
              ... on GenericFile {
                url
              }
            }
          }
        `,
        { id: fileId }
      );

      const node = q?.data?.node;
      const url =
        node?.url ||
        node?.image?.url ||
        node?.preview?.image?.url ||
        null;

      return { node, url };
    };

    let finalUrl: string | null = null;
    let lastNode: any = null;

    for (let i = 0; i < 8; i++) {
      const { node, url } = await queryFile();
      lastNode = node;
      if (url) {
        finalUrl = url;
        break;
      }
      // 等 500ms 再查
      await new Promise((r) => setTimeout(r, 500));
    }

    // ✅ 就算还没拿到 url，也把 id 返回（至少不再报 null 读属性）
    return res.status(200).json({
      designId: fileId,
      designUrl: finalUrl, // 可能为 null（极少数店铺很慢）
      meta,
      debug: finalUrl ? undefined : { note: "URL not ready yet, try again later", lastNode },
    });
  } catch (err: any) {
    return res.status(500).json({
      error: "Upload error",
      message: err?.message || String(err),
    });
  }
}
