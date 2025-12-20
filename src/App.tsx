
import { useEffect, useState } from "react";
import EditorEmbed from "./pages/EditorEmbed";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ImageEditor from "@/components/ImageEditor";

import Index from "./pages/Index";
import Stickers from "./pages/Stickers";
import Labels from "./pages/Labels";
import Banners from "./pages/Banners";
import Deals from "./pages/Deals";
import Samples from "./pages/Samples";
import Industries from "./pages/Industries";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import DieCutStickers from "./pages/products/DieCutStickers";
import SamplePack from "./pages/products/SamplePack";
import StickerPacks from "./pages/products/StickerPacks";
import StickerTypes from "./pages/stickers/StickerTypes";
import StickerShapes from "./pages/stickers/StickerShapes";
import StickerMaterials from "./pages/stickers/StickerMaterials";
import LabelFormats from "./pages/labels/LabelFormats";
import LabelMaterials from "./pages/labels/LabelMaterials";
import UseCases from "./pages/UseCases";

const queryClient = new QueryClient();

const App = () => {
  /* =========================
     DESIGN NOW – 全局编辑器状态
     ========================= */
  const [editorOpen, setEditorOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [width, setWidth] = useState("3");
  const [height, setHeight] = useState("3");
  const [quantity, setQuantity] = useState(100);
  const [price, setPrice] = useState("0.00");
  const [pricePerUnit, setPricePerUnit] = useState("0.00");

  /* =========================
     接收 Shopify → OPEN_EDITOR
     ========================= */
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      const data = event.data;
      if (!data || typeof data !== "object") return;
      if (data.type !== "OPEN_EDITOR") return;

      setImageUrl(data.imageUrl || null);
      setWidth(String(data.width ?? "3"));
      setHeight(String(data.height ?? "3"));
      setQuantity(Number(data.quantity ?? 100));
      setPrice(String(data.price ?? "0.00"));
      setPricePerUnit(String(data.pricePerUnit ?? "0.00"));

      setEditorOpen(true);
    }

    window.addEventListener("message", onMessage);

    // iframe 场景：告诉 Shopify 我准备好了
    window.parent?.postMessage({ type: "EDITOR_READY" }, "*");

    return () => window.removeEventListener("message", onMessage);
  }, []);

  /* =========================
     保存 → 回传 Shopify
     ========================= */
  const handleEditorSave = (editedImageUrl: string) => {
    window.parent?.postMessage(
      {
        type: "EDITOR_SAVED",
        editedImageUrl,
        width,
        height,
        quantity,
        price,
        pricePerUnit,

        // 上线推荐：改成 CDN URL
        // designFileUrl: "https://cdn.xxx/original.png",
      },
      "*"
    );

    setEditorOpen(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* ========= 全局 DESIGN NOW 编辑器 ========= */}
        <ImageEditor
          isOpen={editorOpen}
          onClose={() => setEditorOpen(false)}
          imageUrl={imageUrl}
          onSave={handleEditorSave}
          width={width}
          height={height}
          quantity={quantity}
          onWidthChange={setWidth}
          onHeightChange={setHeight}
          onQuantityChange={setQuantity}
          price={price}
          pricePerUnit={pricePerUnit}
        />

        {/* ========= 原有路由保持不变 ========= */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/stickers" element={<Stickers />} />
            <Route path="/stickers/die-cut" element={<DieCutStickers />} />
            <Route path="/stickers/packs" element={<StickerPacks />} />
            <Route path="/stickers/types" element={<StickerTypes />} />
            <Route path="/stickers/shapes" element={<StickerShapes />} />
            <Route path="/stickers/materials" element={<StickerMaterials />} />
            <Route path="/labels" element={<Labels />} />
            <Route path="/labels/formats" element={<LabelFormats />} />
            <Route path="/labels/materials" element={<LabelMaterials />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/banners" element={<Banners />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/samples" element={<Samples />} />
            <Route path="/sample-pack" element={<SamplePack />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/editor/embed" element={<EditorEmbed />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
