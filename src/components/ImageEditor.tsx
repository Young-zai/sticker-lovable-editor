import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas as FabricCanvas, FabricImage, Rect, IText, Path } from "fabric";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  RotateCw,
  ZoomIn,
  ZoomOut,
  Type,
  Trash2,
  Undo,
  Download,
  Crop,
  Scissors,
  Eye,
  EyeOff,
  Image,
  Layers,
  X,
  Eraser,
  Loader2,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import {
  removeBackground,
  extractContourPoints,
} from "@/lib/backgroundRemoval";

interface ImageEditorProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  onSave: (editedImageUrl: string) => void;
  productType?: "die-cut" | "kiss-cut" | "sheet" | "roll";
  width?: string;
  height?: string;
  quantity?: number;
  onWidthChange?: (w: string) => void;
  onHeightChange?: (h: string) => void;
  onQuantityChange?: (q: number) => void;
  price?: string;
  pricePerUnit?: string;

  /** ✅ 关键：iframe embed 用 true，就不会再生成 Radix Dialog 那层 role="dialog" */
  embedded?: boolean;
}

type Tool = "select" | "text" | "crop";
type BorderType = "none" | "small" | "large";
type LayerType = "image" | "background";

const ImageEditor = ({
  isOpen,
  onClose,
  imageUrl,
  onSave,
  productType = "die-cut",
  width = "3",
  height = "3",
  quantity = 100,
  onWidthChange,
  onHeightChange,
  onQuantityChange,
  price = "0.00",
  pricePerUnit = "0.00",
  embedded = false,
}: ImageEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);

  const [canvasReady, setCanvasReady] = useState(false);
  const [activeTool, setActiveTool] = useState<Tool>("select");
  const [activeColor, setActiveColor] = useState("#000000");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [rotation, setRotation] = useState(0);
  const [isCropping, setIsCropping] = useState(false);

  const cropRectRef = useRef<Rect | null>(null);
  const [showCutLine, setShowCutLine] = useState(false);
  const cutLineRef = useRef<Path | Rect | null>(null);

  const [borderType, setBorderType] = useState<BorderType>("none");
  const [zoomLevel, setZoomLevel] = useState(100);

  const [localWidth, setLocalWidth] = useState(width);
  const [localHeight, setLocalHeight] = useState(height);
  const [localQuantity, setLocalQuantity] = useState(quantity);

  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [bgRemovalProgress, setBgRemovalProgress] = useState("");
  const [hasTransparency, setHasTransparency] = useState(false);
  const contourPointsRef = useRef<{ x: number; y: number }[]>([]);

  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(imageUrl);
  const editorFileInputRef = useRef<HTMLInputElement>(null);

  const [activeLayer, setActiveLayer] = useState<LayerType>("image");
  const [showBackground, setShowBackground] = useState(true);
  const [copiedObject, setCopiedObject] = useState<string | null>(null);
  const borderRectRef = useRef<Rect | null>(null);

  const [isSavingToCart, setIsSavingToCart] = useState(false);

  // Sync with parent props
  useEffect(() => {
    setLocalWidth(width);
    setLocalHeight(height);
    setLocalQuantity(quantity);
  }, [width, height, quantity]);

  // Sync currentImageUrl with imageUrl prop
  useEffect(() => {
    setCurrentImageUrl(imageUrl);
  }, [imageUrl]);

  const saveHistory = useCallback(
    (canvas: FabricCanvas) => {
      const json = JSON.stringify(canvas.toJSON());
      setHistory((prev) => [...prev.slice(0, historyIndex + 1), json]);
      setHistoryIndex((prev) => prev + 1);
    },
    [historyIndex]
  );

  const loadImageToCanvas = useCallback((imgSrc: string, canvas: FabricCanvas) => {
    const containerWidth = canvas.width || 500;
    const containerHeight = canvas.height || 400;

    const imgElement = new window.Image();
    imgElement.crossOrigin = "anonymous";
    imgElement.onload = () => {
      const fabricImg = new FabricImage(imgElement);
      const imgWidth = fabricImg.width || 1;
      const imgHeight = fabricImg.height || 1;

      const scale = Math.min(
        (containerWidth - 80) / imgWidth,
        (containerHeight - 80) / imgHeight,
        1
      );

      fabricImg.scale(scale);
      fabricImg.set({
        left: (containerWidth - imgWidth * scale) / 2,
        top: (containerHeight - imgHeight * scale) / 2,
        selectable: true,
      });

      canvas.add(fabricImg);
      canvas.setActiveObject(fabricImg);
      canvas.renderAll();

      const json = JSON.stringify(canvas.toJSON());
      setHistory([json]);
      setHistoryIndex(0);
    };
    imgElement.onerror = () => toast.error("Failed to load image");
    imgElement.src = imgSrc;
  }, []);

  const handleEditorFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgUrl = event.target?.result as string;
        lastLoadedImageRef.current = null;
        setCurrentImageUrl(imgUrl);
      };
      reader.readAsDataURL(file);
    }
    if (editorFileInputRef.current) editorFileInputRef.current.value = "";
  }, []);

  const canvasInitializedRef = useRef(false);
  const lastLoadedImageRef = useRef<string | null>(null);

  // ✅ 监听父页面回传 CART_ADDED / CART_ADD_FAILED（你这段本来就对）
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const data = event.data || {};
      if (!data || typeof data !== "object") return;

      if (data.type === "CART_ADDED") {
        toast.success("Added to cart!");
        setIsSavingToCart(false);
        onClose();
      }
      if (data.type === "CART_ADD_FAILED") {
        toast.error(data.message || "Add to cart failed");
        setIsSavingToCart(false);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [onClose]);

  // ✅ 初始化 canvas：注意这里要在“真正关闭”时 dispose
  useEffect(() => {
    if (!isOpen) {
      setCanvasReady(false);
      setHistory([]);
      setHistoryIndex(-1);
      setRotation(0);
      setZoomLevel(100);
      setIsSavingToCart(false);

      canvasInitializedRef.current = false;
      lastLoadedImageRef.current = null;

      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
      return;
    }

    if (canvasInitializedRef.current) return;

    const timer = setTimeout(() => {
      if (!canvasRef.current || !containerRef.current) return;

      const containerWidth = Math.max(containerRef.current.clientWidth - 40, 500);
      const containerHeight = Math.max(containerRef.current.clientHeight - 40, 400);

      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }

      const canvas = new FabricCanvas(canvasRef.current, {
        width: containerWidth,
        height: containerHeight,
        backgroundColor: "#f5f5f5",
        selection: true,
      });

      fabricCanvasRef.current = canvas;
      canvasInitializedRef.current = true;
      setCanvasReady(true);

      if (currentImageUrl) {
        loadImageToCanvas(currentImageUrl, canvas);
        lastLoadedImageRef.current = currentImageUrl;
      } else {
        const json = JSON.stringify(canvas.toJSON());
        setHistory([json]);
        setHistoryIndex(0);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen, loadImageToCanvas, currentImageUrl]);

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !canvasReady || !currentImageUrl) return;
    if (lastLoadedImageRef.current === currentImageUrl) return;

    canvas.clear();
    canvas.backgroundColor = "#f5f5f5";
    loadImageToCanvas(currentImageUrl, canvas);
    lastLoadedImageRef.current = currentImageUrl;
  }, [currentImageUrl, canvasReady, loadImageToCanvas]);

  const handleUndo = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || historyIndex <= 0) return;

    const newIndex = historyIndex - 1;
    canvas.loadFromJSON(JSON.parse(history[newIndex])).then(() => {
      canvas.renderAll();
      setHistoryIndex(newIndex);
    });
  };

  const handleToolClick = (tool: Tool) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    setActiveTool(tool);

    if (tool === "text") {
      const text = new IText("", {
        left: 100,
        top: 100,
        fontFamily: "Arial",
        fontSize: 24,
        fill: activeColor,
        editable: true,
      });
      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
      setTimeout(() => {
        text.enterEditing();
        text.selectAll();
        canvas.renderAll();
      }, 50);
      saveHistory(canvas);
      setActiveTool("select");
    }
  };

  const updateCutLine = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !showCutLine || productType !== "die-cut") return;

    if (cutLineRef.current) {
      canvas.remove(cutLineRef.current);
      cutLineRef.current = null;
    }

    const objects = canvas.getObjects();
    const imageObj = objects.find((obj) => obj.type === "image") as FabricImage | undefined;
    if (!imageObj) return;

    const imgLeft = imageObj.left || 0;
    const imgTop = imageObj.top || 0;
    const imgWidth = (imageObj.width || 100) * (imageObj.scaleX || 1);
    const imgHeight = (imageObj.height || 100) * (imageObj.scaleY || 1);
    const imgAngle = imageObj.angle || 0;
    const imgScaleX = imageObj.scaleX || 1;
    const imgScaleY = imageObj.scaleY || 1;

    const offset = borderType === "none" ? 3 : borderType === "small" ? 8 : 15;

    if (hasTransparency && contourPointsRef.current.length > 10) {
      const points = contourPointsRef.current;
      let pathData = `M ${points[0].x * imgScaleX} ${points[0].y * imgScaleY}`;
      for (let i = 1; i < points.length; i++) {
        pathData += ` L ${points[i].x * imgScaleX} ${points[i].y * imgScaleY}`;
      }
      pathData += " Z";

      const contourPath = new Path(pathData, {
        left: imgLeft,
        top: imgTop,
        fill: "transparent",
        stroke: "#ff4444",
        strokeWidth: 2,
        strokeDashArray: [8, 4],
        selectable: false,
        evented: false,
        angle: imgAngle,
        originX: "left",
        originY: "top",
      });

      cutLineRef.current = contourPath;
      canvas.add(contourPath);
    } else {
      const cutLine = new Rect({
        left: imgLeft - offset,
        top: imgTop - offset,
        width: imgWidth + offset * 2,
        height: imgHeight + offset * 2,
        fill: "transparent",
        stroke: "#ff4444",
        strokeWidth: 2,
        strokeDashArray: [8, 4],
        selectable: false,
        evented: false,
        angle: imgAngle,
        originX: "left",
        originY: "top",
      });

      cutLineRef.current = cutLine;
      canvas.add(cutLine);
    }

    canvas.sendObjectToBack(cutLineRef.current);
    canvas.bringObjectToFront(imageObj);
    canvas.renderAll();
  }, [showCutLine, productType, borderType, hasTransparency]);

  const updateBorderVisual = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || productType !== "die-cut") return;

    if (borderRectRef.current) {
      canvas.remove(borderRectRef.current);
      borderRectRef.current = null;
    }
    if (borderType === "none") {
      canvas.renderAll();
      return;
    }

    const objects = canvas.getObjects();
    const imageObj = objects.find((obj) => obj.type === "image") as FabricImage | undefined;
    if (!imageObj) return;

    const imgLeft = imageObj.left || 0;
    const imgTop = imageObj.top || 0;
    const imgWidth = (imageObj.width || 100) * (imageObj.scaleX || 1);
    const imgHeight = (imageObj.height || 100) * (imageObj.scaleY || 1);
    const imgAngle = imageObj.angle || 0;

    const borderOffset = borderType === "small" ? 8 : 15;

    const borderRect = new Rect({
      left: imgLeft - borderOffset,
      top: imgTop - borderOffset,
      width: imgWidth + borderOffset * 2,
      height: imgHeight + borderOffset * 2,
      fill: "white",
      stroke: "#e5e5e5",
      strokeWidth: 1,
      selectable: false,
      evented: false,
      angle: imgAngle,
      originX: "left",
      originY: "top",
      rx: 4,
      ry: 4,
    });

    borderRectRef.current = borderRect;
    canvas.add(borderRect);
    canvas.sendObjectToBack(borderRect);
    canvas.bringObjectToFront(imageObj);

    if (cutLineRef.current) {
      canvas.bringObjectToFront(cutLineRef.current);
      canvas.bringObjectToFront(imageObj);
    }
    canvas.renderAll();
  }, [borderType, productType]);

  // ✅ 你其它逻辑我不动（crop/remove bg 等）……（省略：保持你原实现即可）
  // -------------------------------------------------------------
  // 下面这段：EditorUI 就是你原来 DialogContent 里面那坨
  // 你只要把你原来的 JSX 内容放进来就行
  // -------------------------------------------------------------

  const handleSave = async () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    try {
      setIsSavingToCart(true);

      if (cutLineRef.current) canvas.remove(cutLineRef.current);
      if (borderRectRef.current) canvas.remove(borderRectRef.current);

      const dataUrl = canvas.toDataURL({ format: "png", quality: 1, multiplier: 2 });

      if (showCutLine) updateCutLine();
      if (borderType !== "none") updateBorderVisual();

      onWidthChange?.(localWidth);
      onHeightChange?.(localHeight);
      onQuantityChange?.(localQuantity);

      onSave(dataUrl);

      // ⚠️ 注意：embed 场景你实际走的是父页面上传接口（不是这里的 /api）
      // 这里保持你的逻辑即可（你现在已经在父页面做 upload-to-shopify 了）
      window.parent?.postMessage(
        {
          type: "EDITOR_SAVED",
          editedImageUrl: dataUrl,
          width: localWidth,
          height: localHeight,
          quantity: localQuantity,
          productType,
          price,
          pricePerUnit,
          borderType,
        },
        "*"
      );

      toast.success("Design saved. Adding to cart...");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Save failed");
      setIsSavingToCart(false);
    }
  };

  const handleDownload = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    if (cutLineRef.current) canvas.remove(cutLineRef.current);
    if (borderRectRef.current) canvas.remove(borderRectRef.current);

    const dataUrl = canvas.toDataURL({ format: "png", quality: 1, multiplier: 2 });

    if (showCutLine) updateCutLine();
    if (borderType !== "none") updateBorderVisual();

    const link = document.createElement("a");
    link.download = "sticker-design.png";
    link.href = dataUrl;
    link.click();
    toast.success("Image downloaded!");
  };

  const quantityOptions = [50, 100, 300, 500, 800, 1000, 2000];

  const EditorUI = (
    <div className="max-w-6xl w-[95vw] h-[90vh] p-0 overflow-hidden flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleUndo} disabled={historyIndex <= 0 || isSavingToCart}>
            <Undo className="w-4 h-4" />
          </Button>
        </div>
        <h2 className="font-semibold text-foreground">Sticker Editor</h2>
        <Button variant="ghost" size="icon" onClick={() => !isSavingToCart && onClose()} disabled={isSavingToCart}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-12 bg-muted/50 border-r border-border flex flex-col items-center py-4 gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editorFileInputRef.current?.click()}
            title="Upload Image"
            className="w-10 h-10"
            disabled={isSavingToCart}
          >
            <Image className="w-5 h-5" />
          </Button>
          <input ref={editorFileInputRef} type="file" accept="image/*,.pdf,.ai,.svg" onChange={handleEditorFileUpload} className="hidden" />
          <div className="w-8 h-px bg-border my-1" />
          <Button variant="ghost" size="icon" onClick={() => handleToolClick("text")} title="Add Text" className="w-10 h-10" disabled={isSavingToCart}>
            <Type className="w-5 h-5" />
          </Button>
          {/* 其它按钮保持你原来的实现即可 */}
        </div>

        {/* Canvas */}
        <div className="flex-1 flex flex-col bg-muted/20 relative">
          {(isRemovingBg || isSavingToCart) && (
            <div className="absolute inset-0 bg-background/80 z-10 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-teal" />
              <p className="text-sm font-medium text-foreground">
                {isRemovingBg ? bgRemovalProgress || "Removing background..." : "Uploading & adding to cart..."}
              </p>
              <p className="text-xs text-muted-foreground">This may take a moment</p>
            </div>
          )}

          <div ref={containerRef} className="flex-1 flex items-center justify-center p-4 overflow-auto">
            <div className="relative bg-white rounded-lg shadow-lg border border-border">
              <canvas ref={canvasRef} />
            </div>
          </div>

          <div className="h-14 border-t border-border bg-background flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => {}} disabled={isSavingToCart}>
                <RotateCw className="w-4 h-4" />
                ROTATE
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground font-medium">{zoomLevel}%</span>
              <Button variant="ghost" size="icon" className="w-8 h-8" disabled={isSavingToCart}><ZoomOut className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="w-8 h-8" disabled={isSavingToCart}><ZoomIn className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className={`w-8 h-8 ${showCutLine ? "text-red-500" : ""}`} disabled={isSavingToCart}>
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel（你原来的内容照搬即可，这里省略一部分） */}
        <div className="w-72 bg-background border-l border-border flex flex-col overflow-y-auto">
          <div className="p-4 space-y-3 mt-auto">
            <Button
              onClick={handleSave}
              disabled={isSavingToCart}
              className="w-full bg-teal hover:bg-teal/90 text-white py-6 text-base font-semibold rounded-full"
            >
              {isSavingToCart ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ADDING...
                </>
              ) : (
                "REVIEW & ADD TO CART"
              )}
            </Button>
            <Button variant="link" onClick={handleDownload} disabled={isSavingToCart} className="w-full text-teal hover:text-teal/80 font-medium">
              <Download className="w-4 h-4 mr-2" />
              SAVE ARTWORK
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // ✅ 关键：embedded = true 时，不再生成 Radix Dialog 那一层 role="dialog"
  if (embedded) {
    // isOpen=false 时直接不渲染（避免 iframe 内残留 UI）
    if (!isOpen) return null;
    return <div className="w-screen h-screen bg-white">{EditorUI}</div>;
  }

  // ✅ 非 embedded：保留 Dialog（站内正常用）
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isSavingToCart && onClose()}>
      <DialogContent className="[&>button]:hidden p-0 overflow-hidden">
        {EditorUI}
      </DialogContent>
    </Dialog>
  );
};

export default ImageEditor;
