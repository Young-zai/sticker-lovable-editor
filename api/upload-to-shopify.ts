import type { VercelRequest, VercelResponse } from "@vercel/node";

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "https://stickerkiko.com");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

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

    const API_VERSION = "2025-10";

    const base64 = imageDataUrl.split(",")[1];
    if (!base64) return res.status(400).json({ error: "Invalid data URL (no base64 payload)" });

    const buffer = Buffer.from(base64, "base64");
    const filename = `design-${Date.now()}.png`;
    const mimeType = "image/png";

    /* ========= 1) stagedUploadsCreate (关键：把 url 字段也查出来) ========= */
    const stagedResp = await fetch(`https://${shop}/admin/api/${API_VERSION}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": token,
      },
      body: JSON.stringify({
        query: `
          mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
            stagedUploadsCreate(input: $input) {
              stagedTargets {
                url
                resourceUrl
                parameters { name value }
              }
              userErrors { message }
            }
          }
        `,
        variables: {
          input: [
            {
              resource: "FILE",
              filename,
              mimeType,
              fileSize: String(buffer.length),
              httpMethod: "POST",
            },
          ],
        },
      }),
    });

    const stagedText = await stagedResp.text();
    const stagedJson = safeJsonParse(stagedText);

    const errs = stagedJson?.data?.stagedUploadsCreate?.userErrors;
    if (errs?.length) {
      return res.status(500).json({ error: "stagedUploadsCreate userErrors", details: errs });
    }

    const target = stagedJson?.data?.stagedUploadsCreate?.stagedTargets?.[0];
    if (!target?.resourceUrl || !target?.url || !Array.isArray(target.parameters)) {
      return res.status(500).json({
        error: "Invalid staged upload response (missing url/resourceUrl/parameters)",
        details: stagedJson ?? stagedText?.slice(0, 800),
      });
    }

    /* ========= 2) 上传到 GCS/S3：POST target.url + parameters + file ========= */
    const form = new FormData();
    for (const p of target.parameters) form.append(p.name, p.value);
    form.append("file", new Blob([buffer], { type: mimeType }), filename);

    const uploadResp = await fetch(target.url, { method: "POST", body: form });
    if (!uploadResp.ok) {
      const t = await uploadResp.text().catch(() => "");
      return res.status(500).json({
        error: "Staged upload failed",
        status: uploadResp.status,
        details: t?.slice(0, 800),
      });
    }

    /* ========= 3) fileCreate：用 resourceUrl 注册成 Shopify file ========= */
    const createResp = await fetch(`https://${shop}/admin/api/${API_VERSION}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": token,
      },
      body: JSON.stringify({
        query: `
          mutation fileCreate($files: [FileCreateInput!]!) {
            fileCreate(files: $files) {
              files {
                id
                ... on MediaImage {
                  image { url }
                }
                preview {
                  image { url }
                }
              }
              userErrors { message }
            }
          }
        `,
        variables: {
          files: [
            {
              originalSource: target.resourceUrl,
              contentType: "IMAGE",
            },
          ],
        },
      }),
    });

    const createText = await createResp.text();
    const createJson = safeJsonParse(createText);

    const createErrors = createJson?.data?.fileCreate?.userErrors;
    if (createErrors?.length) {
      return res.status(500).json({ error: "fileCreate userErrors", details: createErrors });
    }

    const file = createJson?.data?.fileCreate?.files?.[0];
    const designUrl = file?.image?.url || file?.preview?.image?.url;

    if (!file?.id || !designUrl) {
      return res.status(500).json({
        error: "fileCreate returned unexpected response",
        details: createJson ?? createText?.slice(0, 800),
      });
    }

    return res.status(200).json({
      designId: file.id,
      designUrl,
      meta,
    });
  } catch (err: any) {
    return res.status(500).json({
      error: "Upload error",
      message: err?.message || String(err),
    });
  }
}
