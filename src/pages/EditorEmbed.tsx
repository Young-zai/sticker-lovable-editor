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

type OpenEditorPayload = {
  type: "OPEN_EDITOR";
  imageUrl?: string | null;
  width?: number | string;
  height?: number | string;
  quantity?: number;
  productType?: ProductType;
  price?: string;
  pricePerUnit?: string;
  // 你也可以加：variantId / productId 等
};

export default function EditorEmbed() {
  // ✅ 父页面 origin 白名单：如果你知道 shopify 域名就写死更安全
  // 先用 *兼容* 版：允许任意 origin，但回消息时用 event.origin 精确回发
  const lastParentOriginRef = useRef<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [productType, setProductType] = useState<ProductType>("die-cut");

  const [width, setWidth] = useState("3");
  const [height, setHeight] = useState("3");
  const [quantity, setQuantity] = useState(100);
  const [price, setPrice] = useState("0.00");
  const [pricePerUnit, setPricePerUnit] = useState("0.00");

  // ✅ 保存后的设计图（dataURL）
  const lastSavedImageRef = useRef<string | null>(null);

  const postToParent = useCallback((msg: any) => {
    const origin = lastParentOriginRef.current;
    // 如果不知道 origin，退化成 '*'（不推荐，但能先跑通）
    window.parent?.postMessage(msg, origin ?? "*");
  }, []);

  // 告诉父页面：iframe ready
  useEffect(() => {
    // embed 页面加载后尽快告诉父页面
    window.parent?.postMessage({ type: "EDITOR_READY" }, "*");
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data || {};
      if (!data?.type) return;

      // ✅ 记录父页面 origin，后续回发用它（避免回给错误来源）
      lastParentOriginRef.current = event.origin;

      // 1) 打开编辑器
      if (data.type === "OPEN_EDITOR") {
        const payload = data as OpenEditorPayload;

        setImageUrl(payload.imageUrl ?? null);
        setProductType(payload.productType ?? "die-cut");
        setWidth(String(payload.width ?? "3"));
        setHeight(String(payload.height ?? "3"));
        setQuantity(Number(payload.quantity ?? 100));
        setPrice(String(payload.price ?? "0.00"));
        setPricePerUnit(String(payload.pricePerUnit ?? "0.00"));

        lastSavedImageRef.current = null;
        setIsOpen(true);

        postToParent({ type: "EDITOR_OPENED" });
        return;
      }

      // 2) 父页面加购成功的 ACK：此时再关闭
      if (data.type === "CART_ADDED") {
        // 你也可以让父页面带上 cart item key 做校验
        setIsOpen(false);
        postToParent({ type: "EDITOR_CLOSED" });
        return;
      }

      // 3) 父页面要求关闭（可选）
      if (data.type === "CLOSE_EDITOR") {
        setIsOpen(false);
        postToParent({ type: "EDITOR_CLOSED" });
        return;
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [postToParent]);

  // 点击右上角 X / 背景关闭：通知父页面
  const handleClose = useCallback(() => {
    setIsOpen(false);
    postToParent({ type: "EDITOR_CLOSED" });
  }, [postToParent]);

  // ✅ ImageEditor 点“REVIEW & ADD TO CART”会调用这里
  // 这里不要关闭！只发 EDITOR_SAVED，让父页面去加购；等父页面回 CART_ADDED 再关
  const handleSave = useCallback(
    (editedImageUrl: string) => {
      lastSavedImageRef.current = editedImageUrl;

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
    },
    [postToParent, width, height, quantity, productType, price, pricePerUnit]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ImageEditor
        isOpen={isOpen}
        onClose={handleClose}
        imageUrl={imageUrl}
        onSave={handleSave}
        productType={productType}
        width={width}
        height={height}
        quantity={quantity}
        onWidthChange={(w) => setWidth(w)}
        onHeightChange={(h) => setHeight(h)}
        onQuantityChange={(q) => setQuantity(q)}
        price={price}
        pricePerUnit={pricePerUnit}
      />
    </div>
  );
}