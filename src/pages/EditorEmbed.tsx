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
  // ✅ 初始不要打开：等 OPEN_EDITOR 来了才打开
  const [isOpen, setIsOpen] = useState(false);

  // ✅ OPEN_EDITOR 去重（1.2s 内相同 payload 只处理一次）
  const lastOpenRef = useRef<{ key: string; at: number }>({ key: "", at: 0 });

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

  const allowedOrigins = useMemo(() => {
    return new Set<string>([
      "http://localhost:8080",
      "http://localhost:3000",
      "http://localhost:5173",
      // 线上你可以在这里加入你的 shopify 域名
    ]);
  }, []);

  const postToParent = (payload: any) => {
    const win = parentWinRef.current ?? window.parent;
    const origin = parentOriginRef.current || "*";
    try {
      win?.postMessage(payload, origin === "null" ? "*" : origin);
    } catch {
      win?.postMessage(payload, "*");
    }
  };

  const closeEditor = () => {
    setIsOpen(false);
    postToParent({ type: "EDITOR_CLOSED" });
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

  useEffect(() => {
    // 1) 告诉父页面：iframe 已就绪
    window.parent?.postMessage({ type: "EDITOR_READY" }, "*");

    // 2) 等待父页面发 OPEN_EDITOR
    const onMessage = (e: MessageEvent) => {
      const d = e.data as OpenPayload;
      if (!d || d.type !== "OPEN_EDITOR") return;

      // （可选）开发期允许 localhost；上线后可收紧
      const isLocal =
        e.origin.startsWith("http://localhost") ||
        e.origin.startsWith("http://127.0.0.1");
      const isAllowed =
        isLocal || allowedOrigins.has(e.origin) || allowedOrigins.size === 0;
      // if (!isAllowed) return;

      // ✅ 去重：同一 payload 1.2 秒内只处理一次
      const key = [
        String(d.imageUrl || "").slice(0, 80),
        toStr(d.width, "3"),
        toStr(d.height, "3"),
        String(toNum(d.quantity, 100)),
        String(d.productType || "die-cut"),
        toStr(d.price, "0.00"),
        toStr(d.pricePerUnit, "0.00"),
      ].join("|");

      const now = Date.now();
      if (lastOpenRef.current.key === key && now - lastOpenRef.current.at < 1200) {
        console.warn("[embed] duplicate OPEN_EDITOR ignored");
        return;
      }
      lastOpenRef.current = { key, at: now };

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

    const t = window.setTimeout(() => {
      setWaiting((w) => w);
    }, 10000);

    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(t);
    };
  }, [allowedOrigins]);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#fff" }}>
      {/* 没收到 OPEN_EDITOR 时给提示 */}
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

      {/* ✅ 关键：没收到 OPEN_EDITOR 前不要 mount ImageEditor（避免先渲染出一层 Dialog/overlay） */}
      {!waiting && imageUrl && (
        <ImageEditor
          embedded
          isOpen={isOpen}
          onClose={closeEditor}
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
      )}
    </div>
  );
}
