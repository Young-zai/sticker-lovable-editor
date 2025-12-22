import type { VercelRequest, VercelResponse } from "@vercel/node";

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ===== 基础响应头（重要，防止 CORS + 空响应）=====
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "https://stickerkiko.com");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? safeJsonParse(req.body) : req.body;
    const { imageDataUrl, meta } = body || {};

    if (
      !imageDataUrl ||
      typeof imageDataUrl !== "string" ||
      !imageDataUrl.startsWith("data:image")
    ) {
      return res.status(400).json({ error: "Invalid imageDataUrl" });
    }

    const shop = process.env.SHOPIFY_SHOP; // 5rik0n-xh.myshopify.com
    const token = process.env.SHOPIFY_ADMIN_TOKEN;

    if (!shop || !token) {
      return res.status(500).json({ error: "Missing Shopify env vars" });
    }

    const API_VERSION = "2025-10";

    // ===== 拆 base64 =====
    const base64 = imageDataUrl.split(",")[1];
    const buffer = Buffer.from(base64, "base64");
    const filename = `design-${Date.now()}.png`;

    /* ===============================
     * 1️⃣ stagedUploadsCreate
     * =============================== */
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
                  url
                  resourceUrl
                  parameters {
                    name
                    value
                  }
                }
                userErrors {
                  message
                }
              }
            }
          `,
          variables: {
            input: [
              {
                resource: "FILE",
                filename,
                mimeType: "image/png",
                fileSize: buffer.length.toString(),
                httpMethod: "POST",
              },
            ],
          },
        }),
      }
    );

    const stagedText = await stagedResp.text();
    const stagedJson = safeJsonParse(stagedText);

    const target =
      stagedJson?.data?.stagedUploadsCreate?.stagedTargets?.[0];

    if (!target) {
      return res.status(500).json({
        error: "stagedUploadsCreate failed",
        details: stagedJson ?? stagedText,
      });
    }

    /* ===============================
     * 2️⃣ 上传文件到 Shopify 存储
     * =============================== */
    const form = new FormData();
    target.parameters.forEach((p: any) => {
      form.append(p.name, p.value);
    });

    form.append("file", new Blob([buffer]), filename);

    await fetch(target.url, {
      method: "POST",
      body: form,
    });

    /* ===============================
     * 3️⃣ fileCreate
     * =============================== */
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
                  alt
                  preview {
                    image {
                      url
                    }
                  }
                }
                userErrors {
                  message
                }
              }
            }
          `,
          variables: {
            files: [
              {
                originalSource: target.resourceUrl,
                contentType: "IMAGE",
                alt: "Sticker design",
              },
            ],
          },
        }),
      }
    );

    const createText = await createResp.text();
    const createJson = safeJsonParse(createText);

    const file = createJson?.data?.fileCreate?.files?.[0];

    if (!file) {
      return res.status(500).json({
        error: "fileCreate failed",
        details: createJson ?? createText,
      });
    }

    return res.status(200).json({
      designId: file.id,
      designUrl: file.preview.image.url,
      meta,
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return res.status(500).json({
      error: "Upload error",
      message: err?.message || String(err),
    });
  }
}
