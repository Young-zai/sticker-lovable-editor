import type { VercelRequest, VercelResponse } from "@vercel/node";

const ALLOWED_ORIGINS = new Set([
  "https://stickerkiko.com",
  "https://www.stickerkiko.com",
]);

function setCors(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin || "";
  if (ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  } else {
    // 如果你确认只会从这俩域来，就不要用 *，用白名单更安全
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function safeJsonParse<T = any>(text: string): T | null {
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

async function shopifyGraphQL(shop: string, token: string, query: string, variables: any) {
  const resp = await fetch(`https://${shop}/admin/api/2025-10/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": token,
      "Accept": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  const text = await resp.text();
  const json = safeJsonParse<any>(text);

  if (!resp.ok) {
    throw new Error(`Shopify GraphQL HTTP ${resp.status}: ${text.slice(0, 500)}`);
  }
  if (!json) {
    throw new Error(`Shopify GraphQL returned non-JSON: ${text.slice(0, 500)}`);
  }
  if (json.errors?.length) {
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors).slice(0, 800)}`);
  }
  return json;
}

function guessMimeFromDataUrl(dataUrl: string) {
  const m = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,/);
  return m?.[1] || "image/png";
}

function base64ToBuffer(base64: string) {
  return Buffer.from(base64, "base64");
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  setCors(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? safeJsonParse(req.body) : req.body;
    const { imageDataUrl, meta } = body || {};

    if (!imageDataUrl || typeof imageDataUrl !== "string" || !imageDataUrl.startsWith("data:image")) {
      return res.status(400).json({ error: "Invalid imageDataUrl" });
    }

    const shop = process.env.SHOPIFY_SHOP;
    const token = process.env.SHOPIFY_ADMIN_TOKEN;

    if (!shop || !token) {
      return res.status(500).json({ error: "Missing Shopify env vars" });
    }

    const mime = guessMimeFromDataUrl(imageDataUrl);
    const base64 = imageDataUrl.split(",")[1];
    if (!base64) {
      return res.status(400).json({ error: "Invalid data URL (no base64 payload)" });
    }

    const filename = `design-${Date.now()}.${mime.includes("jpeg") ? "jpg" : "png"}`;
    const fileBytes = base64ToBuffer(base64);

    // 1) stagedUploadsCreate：拿到 GCS 上传地址 + parameters
    const STAGED = `
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
    `;

    const stagedJson = await shopifyGraphQL(shop, token, STAGED, {
      input: [
        {
          resource: "FILE",
          filename,
          mimeType: mime,
          httpMethod: "POST",
        },
      ],
    });

    const stagedErrors = stagedJson?.data?.stagedUploadsCreate?.userErrors || [];
    if (stagedErrors.length) {
      return res.status(500).json({ error: "stagedUploadsCreate userErrors", details: stagedErrors });
    }

    const target = stagedJson?.data?.stagedUploadsCreate?.stagedTargets?.[0];
    const uploadUrl: string | undefined = target?.url;
    const resourceUrl: string | undefined = target?.resourceUrl;
    const parameters: Array<{ name: string; value: string }> = target?.parameters || [];

    if (!uploadUrl) {
      return res.status(500).json({
        error: "Missing upload URL in staged parameters",
        details: parameters,
      });
    }

    // 2) POST multipart/form-data 上传到 GCS
    const form = new FormData();
    for (const p of parameters) form.append(p.name, p.value);
    form.append("file", new Blob([fileBytes], { type: mime }), filename);

    const uploadResp = await fetch(uploadUrl, { method: "POST", body: form as any });
    if (!uploadResp.ok) {
      const t = await uploadResp.text().catch(() => "");
      return res.status(500).json({
        error: "Staged upload failed",
        status: uploadResp.status,
        details: t.slice(0, 800),
      });
    }

    // 3) fileCreate：用 resourceUrl 创建文件
    const FILE_CREATE = `
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
    `;

    // Shopify 官方推荐用 resourceUrl
    const fileCreateJson = await shopifyGraphQL(shop, token, FILE_CREATE, {
      files: [
        {
          alt: "sticker design",
          contentType: "IMAGE",
          originalSource: resourceUrl || uploadUrl, // 优先 resourceUrl
        },
      ],
    });

    const fc = fileCreateJson?.data?.fileCreate;
    const fcErrors = fc?.userErrors || [];
    if (fcErrors.length) {
      return res.status(500).json({ error: "fileCreate userErrors", details: fcErrors });
    }

    const created = fc?.files?.[0];
    const designId: string | undefined = created?.id;

    // 这里经常会是 null（你现在看到的就是这个）
    let designUrl: string | null =
      created?.url ||
      created?.image?.url ||
      created?.preview?.image?.url ||
      null;

    if (!designId) {
      return res.status(500).json({
        error: "fileCreate returned unexpected response",
        details: fileCreateJson,
      });
    }

    // 4) 轮询：用 files 查询直到拿到 URL（最多等 6 次）
    if (!designUrl) {
      const QUERY_FILES = `
        query fileById($id: ID!) {
          node(id: $id) {
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

      for (let i = 0; i < 6; i++) {
        await sleep(700);

        const q = await shopifyGraphQL(shop, token, QUERY_FILES, { id: designId });
        const node = q?.data?.node;

        designUrl =
          node?.url ||
          node?.image?.url ||
          node?.preview?.image?.url ||
          null;

        if (designUrl) break;
      }
    }

    // ✅ 关键：URL 可能还是 null，但我们不再报错 —— 前端用 designId 也可以加购
    return res.status(200).json({
      designId,
      designUrl, // 可能为 null
      meta,
      status: designUrl ? "ready" : "processing",
    });
  } catch (err: any) {
    // ✅ 关键：500 也要带 CORS 头（我们前面已经 setCors 了）
    return res.status(500).json({
      error: "Upload error",
      message: err?.message || String(err),
    });
  }
}
