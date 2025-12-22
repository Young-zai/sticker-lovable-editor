import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageDataUrl, meta } = req.body;

  if (!imageDataUrl || !imageDataUrl.startsWith("data:image")) {
    return res.status(400).json({ error: "Invalid imageDataUrl" });
  }

  const shop = process.env.SHOPIFY_SHOP;
  const token = process.env.SHOPIFY_ADMIN_TOKEN;

  if (!shop || !token) {
    return res.status(500).json({ error: "Missing Shopify env vars" });
  }

  try {
    // 1️⃣ 拆 base64
    const base64 = imageDataUrl.split(",")[1];

    // 2️⃣ 调 Shopify Files API
    const response = await fetch(
      `https://${shop}/admin/api/2024-01/files.json`,
      {
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: {
            attachment: base64,
            filename: `design-${Date.now()}.png`,
          },
        }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        error: "Shopify upload failed",
        details: json,
      });
    }

    const file = json.file;

    // 3️⃣ 返回给前端
    return res.status(200).json({
      designId: file.id,
      designUrl: file.url,
      meta,
    });
  } catch (err: any) {
    return res.status(500).json({
      error: "Upload error",
      message: err.message,
    });
  }
}
