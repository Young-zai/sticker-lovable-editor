import type { VercelRequest, VercelResponse } from "@vercel/node";

function safeJsonParse(text: string) {
  try { return JSON.parse(text); } catch { return null; }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method === "OPTIONS") {
    // 让浏览器预检直接过（如果你未来需要跨域）
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
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

    // 1) 拆 base64
    const base64 = imageDataUrl.split(",")[1];
    if (!base64) {
      return res.status(400).json({ error: "Invalid data URL (no base64 payload)" });
    }

    // 2) 调 Shopify Files API
    const resp = await fetch(`https://${shop}/admin/api/2024-01/files.json`, {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        file: {
          attachment: base64,
          filename: `design-${Date.now()}.jpg`,
        },
      }),
    });

    const text = await resp.text();
    const json = safeJsonParse(text);

    if (!resp.ok) {
      return res.status(500).json({
        error: "Shopify upload failed",
        status: resp.status,
        details: json ?? text?.slice(0, 500),
      });
    }

    if (!json?.file) {
      return res.status(500).json({
        error: "Shopify upload returned unexpected response",
        details: json ?? text?.slice(0, 500),
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
      // 可选：帮助你定位是 body 过大/平台报错
      hint: "If response was HTML/empty before, check Vercel Function logs and payload size.",
    });
  }
}
