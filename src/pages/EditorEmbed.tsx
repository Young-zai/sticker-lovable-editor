import { useEffect, useMemo, useRef, useState } from "react";
import ImageEditor from "@/components/ImageEditor";

/**
 * 纯嵌入式编辑器页面（给 Shopify iframe 用）
 * - 不依赖站点其它页面/接口
 * - 只通过 postMessage 接收 OPEN_EDITOR
 * - 保存后 postMessage 回传 EDITOR_SAVED
 *
 * 约定消息：
 * Parent -> Iframe:
 *   { type: "OPEN_EDITOR", imageUrl, width, height, quantity, productType, price, pricePerUnit }
 *
 * Iframe -> Parent:
 *   { type: "EDITOR_READY" }
 *   { type: "EDITOR_SAVED", editedImageUrl, width, height, quantity, productType, price, pricePerUnit }
 *   { type: "EDITOR_CLOSED" }
 */

type ProductType = "die-cut" | "kiss-cut" | "sheet" | "roll";

type OpenPayload = {
  type: "OPEN_EDITOR";
  imageUrl?: string;
  width?: number | string;
  height?: number | string;
  quantity?: number;
  productType?: ProductType;
  price?: string | number;
  pricePerUnit?: string | number;
};

function toNum(v: any, fallback: number) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function toStr(v: any, fallback: string) {
  if (v === undefined || v === null) return fallback;
  return String(v);
}

export default function EditorEmbed() {
  // editor state
  const [isOpen, setIsOpen] = useState(true);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [width, setWidth] = useState<string>("3");
  const [height, setHeight] = useState<string>("3");
  const [quantity, setQuantity] = useState<number>(100);

  const [productType, setProductType] = useState<ProductType>("die-cut");
  const [price, setPrice] = useState<string>("0.00");
  const [pricePerUnit, setPricePerUnit] = useState<string>("0.00");

  // UI helper when parent didn't send OPEN_EDITOR yet
  const [waiting, setWaiting] = useState(true);

  // parent window + origin
  const parentWinRef = useRef<Window | null>(null);
  const parentOriginRef = useRef<string>("*");

  /**
   * ✅ 允许的父页面 origin 白名单
   * - 开发期：localhost + 你的 Shopify 域名
   * - 上线：填你的正式 Shopify 域名（以及预览域名）
   *
   * 先给你一个“可用默认值”：不写死，先用 "*" 接收，但回传用收到的 e.origin
   * （这样线上更安全）
   */
  const allowedOrigins = useMemo(() => {
    // 你可以按需加： "https://your-store.myshopify.com", "https://www.yourstore.com"
    return new Set<string>([
      "http://localhost:8080",
      "http://localhost:3000",
      "http://localhost:5173",
      // Shopify 预览有时是 https://xxxx.myshopify.com
      // 这里先不强校验域名模式，等你上线再收紧
    ]);
  }, []);

  useEffect(() => {
    // 1) 告诉父页面：iframe 已就绪
    window.parent?.postMessage({ type: "EDITOR_READY" }, "*");

    // 2) 等待父页面发 OPEN_EDITOR
    const onMessage = (e: MessageEvent) => {
      const d = e.data as OpenPayload;
      if (!d || d.type !== "OPEN_EDITOR") return;

      /**
       * ✅ 接收端安全策略：
       * - 开发阶段：允许 localhost / 任意（避免你卡在域名校验）
       * - 上线后：你可以把下面逻辑改成“只允许白名单”
       */
      const isLocal =
        e.origin.startsWith("http://localhost") ||
        e.origin.startsWith("http://127.0.0.1");
      const isAllowed = isLocal || allowedOrigins.has(e.origin) || allowedOrigins.size === 0;

      // 你现在要顺滑开发：先不 hard block，但会记录 origin
      // 如果你要强校验：把下面 if 打开即可
      // if (!isAllowed) return;

      parentWinRef.current = e.source as Window;
      parentOriginRef.current = e.origin || "*";

      setImageUrl(d.imageUrl ? String(d.imageUrl) : null);
      setWidth(toStr(d.width, "3"));
      setHeight(toStr(d.height, "3"));
      setQuantity(toNum(d.quantity, 100));

      setProductType((d.productType as ProductType) || "die-cut");
      setPrice(toStr(d.price, "0.00"));
      setPricePerUnit(toStr(d.pricePerUnit, "0.00"));

      setWaiting(false);
      setIsOpen(true);
    };

    window.addEventListener("message", onMessage);

    // 3) 10 秒还没收到 OPEN_EDITOR，就给个提示（不影响功能）
    const t = window.setTimeout(() => {
      setWaiting((w) => w); // 保持现状，只是为了不“白屏无反馈”
    }, 10000);

    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(t);
    };
  }, [allowedOrigins]);

  const postToParent = (payload: any) => {
    const win = parentWinRef.current ?? window.parent;
    const origin = parentOriginRef.current || "*";
    try {
      win?.postMessage(payload, origin === "null" ? "*" : origin);
    } catch {
      // 某些环境下 origin 可能异常，兜底用 *
      win?.postMessage(payload, "*");
    }
  };

  const handleSave = (editedImageUrl: string) => {
    postToParent({
      type: "EDITOR_SAVED",
      editedImageUrl,
      width,
      height,
      quantity,
      productType,
      price,
      pricePerUnit,
    });

    setIsOpen(false);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#fff" }}>
      {/* 没收到 OPEN_EDITOR 时给提示（不会影响 iframe 正常工作） */}
      {waiting && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily:
              'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
            color: "#111827",
            background: "#ffffff",
            zIndex: 1,
          }}
        >
          <div style={{ textAlign: "center", maxWidth: 520, padding: 24 }}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
              Waiting for Shopify…
            </div>
            <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>
              This page is an embed-only editor. It will open after the parent page
              sends <code>OPEN_EDITOR</code> via <code>postMessage</code>.
            </div>
          </div>
        </div>
      )}

      <ImageEditor
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          postToParent({ type: "EDITOR_CLOSED" });
        }}
        imageUrl={imageUrl}
        onSave={handleSave}
        productType={productType}
        width={width}
        height={height}
        quantity={quantity}
        onWidthChange={setWidth}
        onHeightChange={setHeight}
        onQuantityChange={setQuantity}
        price={price}
        pricePerUnit={pricePerUnit}
      />
    </div>
  );
}
