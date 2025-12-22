// api/upload-to-shopify.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

const ALLOWED_ORIGINS = new Set<string>([
  "https://stickerkiko.com",
  "https://www.stickerkiko.com",
  "https://admin.shopify.com",
  "https://5rik0n-xh.myshopify.com",
  // 如果你还有 myshopify 域名预览，也可以加：
  // "https://YOUR-SHOP.myshopify.com",
]);

function setCors(req: VercelRequest, res: VercelResponse) {
  const origin = String(req.headers.origin || "");
  if (ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(req, res);

  // ✅ 关键：预检请求必须直接放行
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageDataUrl, meta } = req.body || {};

  if (!imageDataUrl || typeof imageDataUrl !== "string" || !imageDataUrl.startsWith("data:image")) {
    return res.status(400).json({ error: "Invalid imageDataUrl" });
  }

  const shop = process.env.SHOPIFY_SHOP;
  const token = process.env.SHOPIFY_ADMIN_TOKEN;

  if (!shop || !token) {
    return res.status(500).json({ error: "Missing Shopify env vars" });
  }

  try {
    const base64 = imageDataUrl.split(",")[1];
    if (!base64) return res.status(400).json({ error: "Invalid dataUrl payload" });

    const response = await fetch(`https://${shop}/admin/api/2024-01/files.json`, {
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
    });

    const json = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        error: "Shopify upload failed",
        details: json,
      });
    }

    const file = json.file;

    return res.status(200).json({
      designId: file.id,
      designUrl: file.url,
      meta,
    });
  } catch (err: any) {
    return res.status(500).json({
      error: "Upload error",
      message: err?.message || String(err),
    });
  }
}
