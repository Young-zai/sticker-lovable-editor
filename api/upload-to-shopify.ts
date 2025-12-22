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

    if (!imageDataUrl?.startsWith("data:image")) {
      return res.status(400).json({ error: "Invalid imageDataUrl" });
    }

    const shop = process.env.SHOPIFY_SHOP;
    const token = process.env.SHOPIFY_ADMIN_TOKEN;
    if (!shop || !token) {
      return res.status(500).json({ error: "Missing Shopify env vars" });
    }

    const API_VERSION = "2025-10";
    const base64 = imageDataUrl.split(",")[1];
    const buffer = Buffer.from(base64, "base64");
    const filename = `design-${Date.now()}.png`;

    /* ========= 1️⃣ stagedUploadsCreate ========= */
    const stagedResp = await fetch(
      `https://${shop}/admin/api/${API_VERSION}/graphql.json`,
      {
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
                  resourceUrl
                  parameters {
                    name
                    value
                  }
                }
                userErrors { message }
              }
            }
          `,
          variables: {
            input: [{
              resource: "FILE",
              filename,
              mimeType: "image/png",
              fileSize: buffer.length.toString(),
              httpMethod: "POST",
            }],
          },
        }),
      }
    );

    const stagedJson = safeJsonParse(await stagedResp.text());
    const target = stagedJson?.data?.stagedUploadsCreate?.stagedTargets?.[0];

    if (!target?.resourceUrl || !Array.isArray(target.parameters)) {
      return res.status(500).json({
        error: "Invalid staged upload response",
        details: stagedJson,
      });
    }

    /* ========= 2️⃣ 真正上传文件（不再用 target.url） ========= */
    const uploadUrlParam = target.parameters.find((p: any) => p.name === "url");
    const uploadUrl = uploadUrlParam?.value;

    if (!uploadUrl) {
      return res.status(500).json({
        error: "Missing upload URL in staged parameters",
        details: target.parameters,
      });
    }

    const form = new FormData();
    target.parameters.forEach((p: any) => {
      if (p.name !== "url") form.append(p.name, p.value);
    });
    form.append("file", new Blob([buffer]), filename);

    await fetch(uploadUrl, { method: "POST", body: form });

    /* ========= 3️⃣ fileCreate ========= */
    const createResp = await fetch(
      `https://${shop}/admin/api/${API_VERSION}/graphql.json`,
      {
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
                  preview {
                    image { url }
                  }
                }
                userErrors { message }
              }
            }
          `,
          variables: {
            files: [{
              originalSource: target.resourceUrl,
              contentType: "IMAGE",
            }],
          },
        }),
      }
    );

    const createJson = safeJsonParse(await createResp.text());
    const file = createJson?.data?.fileCreate?.files?.[0];

    if (!file?.preview?.image?.url) {
      return res.status(500).json({
        error: "fileCreate failed",
        details: createJson,
      });
    }

    return res.status(200).json({
      designId: file.id,
      designUrl: file.preview.image.url,
      meta,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      error: "Upload error",
      message: err?.message || String(err),
    });
  }
}
