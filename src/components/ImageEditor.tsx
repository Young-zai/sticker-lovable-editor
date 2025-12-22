import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas as FabricCanvas, FabricImage, Rect, IText, Path } from "fabric";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Check
} from "lucide-react";
import { toast } from "sonner";
import { removeBackground, loadImageFromUrl, extractContourPoints } from "@/lib/backgroundRemoval";

interface ImageEditorProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  onSave: (editedImageUrl: string) => void;
  productType?: "die-cut" | "kiss-cut" | "sheet" | "roll";
  // Pass these from parent for display
  width?: string;
  height?: string;
  quantity?: number;
  onWidthChange?: (w: string) => void;
  onHeightChange?: (h: string) => void;
  onQuantityChange?: (q: number) => void;
  price?: string;
  pricePerUnit?: string;
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
  pricePerUnit = "0.00"
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

  const saveHistory = useCallback((canvas: FabricCanvas) => {
    const json = JSON.stringify(canvas.toJSON());
    setHistory(prev => [...prev.slice(0, historyIndex + 1), json]);
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  // Load image to canvas helper
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
    imgElement.onerror = () => {
      toast.error("Failed to load image");
    };
    imgElement.src = imgSrc;
  }, []);

  // Handle file upload in editor
  const handleEditorFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgUrl = event.target?.result as string;
        // Only update currentImageUrl - the useEffect will handle loading
        // Reset lastLoadedImageRef to ensure the image gets loaded
        lastLoadedImageRef.current = null;
        setCurrentImageUrl(imgUrl);
      };
      reader.readAsDataURL(file);
    }
    // Reset input value to allow selecting the same file again
    if (editorFileInputRef.current) {
      editorFileInputRef.current.value = "";
    }
  }, []);

  // Track if canvas is initialized to prevent re-initialization
  const canvasInitializedRef = useRef(false);
  const lastLoadedImageRef = useRef<string | null>(null);

  // Initialize canvas - only once when dialog opens
  useEffect(() => {
    if (!isOpen) {
      setCanvasReady(false);
      setHistory([]);
      setHistoryIndex(-1);
      setRotation(0);
      setZoomLevel(100);
      canvasInitializedRef.current = false;
      lastLoadedImageRef.current = null;
      return;
    }

    // Only initialize canvas once per dialog open
    if (canvasInitializedRef.current) return;

    const timer = setTimeout(() => {
      if (!canvasRef.current || !containerRef.current) return;

      const containerWidth = Math.max(containerRef.current.clientWidth - 40, 500);
      const containerHeight = Math.max(containerRef.current.clientHeight - 40, 400);

      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
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

      // Only load image if we have one
      if (currentImageUrl) {
        loadImageToCanvas(currentImageUrl, canvas);
        lastLoadedImageRef.current = currentImageUrl;
      } else {
        // Initialize empty history for empty canvas
        const json = JSON.stringify(canvas.toJSON());
        setHistory([json]);
        setHistoryIndex(0);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [isOpen]);

  // Load new image when currentImageUrl changes (but not on initial load)
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !canvasReady || !currentImageUrl) return;
    
    // Skip if this is the same image we already loaded
    if (lastLoadedImageRef.current === currentImageUrl) return;
    
    // Clear and load new image
    canvas.clear();
    canvas.backgroundColor = "#f5f5f5";
    loadImageToCanvas(currentImageUrl, canvas);
    lastLoadedImageRef.current = currentImageUrl;
  }, [currentImageUrl, canvasReady, loadImageToCanvas]);

  // Keyboard events - handle shortcuts
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !canvasReady) return;
    canvas.isDrawingMode = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if the target is an input, textarea, or contenteditable element
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      ) {
        // Allow normal keyboard behavior in input fields
        return;
      }

      // Ctrl+Z - Undo
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        handleUndo();
        return;
      }

      // Ctrl+C - Copy
      if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject !== cropRectRef.current && activeObject !== cutLineRef.current && activeObject !== borderRectRef.current) {
          e.preventDefault();
          const json = JSON.stringify(activeObject.toJSON());
          setCopiedObject(json);
          toast.success("Copied!");
        }
        return;
      }

      // Ctrl+V - Paste
      if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        if (copiedObject) {
          e.preventDefault();
          const parsed = JSON.parse(copiedObject);
          // Use FabricImage or IText based on type
          import("fabric").then(({ util }) => {
            util.enlivenObjects([parsed]).then((objects: any[]) => {
              if (objects[0]) {
                const obj = objects[0];
                obj.set({
                  left: (obj.left || 0) + 20,
                  top: (obj.top || 0) + 20,
                });
                canvas.add(obj);
                canvas.setActiveObject(obj);
                canvas.renderAll();
                saveHistory(canvas);
                toast.success("Pasted!");
              }
            });
          });
        }
        return;
      }

      // Ctrl+S - Save
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
        return;
      }

      if (e.key === "Delete" || e.key === "Backspace") {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === "i-text" && (activeObject as IText).isEditing) {
          return;
        }
        
        e.preventDefault();
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects.length > 0 && !activeObjects.includes(cropRectRef.current as any)) {
          activeObjects.forEach(obj => {
            if (obj !== cropRectRef.current && obj !== cutLineRef.current && obj !== borderRectRef.current) {
              canvas.remove(obj);
            }
          });
          canvas.discardActiveObject();
          canvas.renderAll();
          saveHistory(canvas);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeTool, canvasReady, saveHistory, copiedObject, historyIndex]);

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

  // Draw cut line - either contour-based or rectangle
  const updateCutLine = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !showCutLine || productType !== "die-cut") return;

    if (cutLineRef.current) {
      canvas.remove(cutLineRef.current);
      cutLineRef.current = null;
    }

    const objects = canvas.getObjects();
    const imageObj = objects.find(obj => obj.type === "image") as FabricImage | undefined;
    
    if (!imageObj) return;

    const imgLeft = imageObj.left || 0;
    const imgTop = imageObj.top || 0;
    const imgWidth = (imageObj.width || 100) * (imageObj.scaleX || 1);
    const imgHeight = (imageObj.height || 100) * (imageObj.scaleY || 1);
    const imgAngle = imageObj.angle || 0;
    const imgScaleX = imageObj.scaleX || 1;
    const imgScaleY = imageObj.scaleY || 1;

    const offset = borderType === "none" ? 3 : borderType === "small" ? 8 : 15;

    // If we have contour points (from transparent image), draw contour path
    if (hasTransparency && contourPointsRef.current.length > 10) {
      const points = contourPointsRef.current;
      
      // Build SVG path from contour points
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
      // Fallback to rectangle cut line
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

  // Update border visual on canvas when borderType changes
  const updateBorderVisual = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || productType !== "die-cut") return;

    // Remove existing border rect
    if (borderRectRef.current) {
      canvas.remove(borderRectRef.current);
      borderRectRef.current = null;
    }

    // Only show border if borderType is not "none"
    if (borderType === "none") {
      canvas.renderAll();
      return;
    }

    const objects = canvas.getObjects();
    const imageObj = objects.find(obj => obj.type === "image") as FabricImage | undefined;
    
    if (!imageObj) return;

    const imgLeft = imageObj.left || 0;
    const imgTop = imageObj.top || 0;
    const imgWidth = (imageObj.width || 100) * (imageObj.scaleX || 1);
    const imgHeight = (imageObj.height || 100) * (imageObj.scaleY || 1);
    const imgAngle = imageObj.angle || 0;

    // Border offset based on type
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
    
    // Ensure image stays on top of border
    canvas.bringObjectToFront(imageObj);
    
    // If cut line exists, keep it above border but below image
    if (cutLineRef.current) {
      canvas.bringObjectToFront(cutLineRef.current);
      canvas.bringObjectToFront(imageObj);
    }
    
    canvas.renderAll();
  }, [borderType, productType]);

  // Handle layer selection
  const handleLayerClick = useCallback((layer: LayerType) => {
    setActiveLayer(layer);
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    if (layer === "image") {
      const objects = canvas.getObjects();
      const imageObj = objects.find(obj => obj.type === "image");
      if (imageObj) {
        canvas.setActiveObject(imageObj);
        canvas.renderAll();
      }
    } else {
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  }, []);

  // Toggle background visibility
  const toggleBackground = useCallback(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    
    const newShowBackground = !showBackground;
    setShowBackground(newShowBackground);
    canvas.backgroundColor = newShowBackground ? "#f5f5f5" : "transparent";
    canvas.renderAll();
    toast.success(newShowBackground ? "Background shown" : "Background hidden");
  }, [showBackground]);

  // Extract contour from image with transparency
  const extractImageContour = useCallback((imageObj: FabricImage) => {
    try {
      const imgElement = (imageObj as any)._element as HTMLImageElement;
      if (!imgElement) return;

      const tempCanvas = document.createElement("canvas");
      const width = imgElement.naturalWidth || imgElement.width;
      const height = imgElement.naturalHeight || imgElement.height;
      tempCanvas.width = width;
      tempCanvas.height = height;
      
      const ctx = tempCanvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(imgElement, 0, 0);
      const imageData = ctx.getImageData(0, 0, width, height);
      
      // Check if image has transparency
      let hasAlpha = false;
      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] < 250) {
          hasAlpha = true;
          break;
        }
      }

      setHasTransparency(hasAlpha);

      if (hasAlpha) {
        const points = extractContourPoints(imageData, 128, 3);
        contourPointsRef.current = points;
      } else {
        contourPointsRef.current = [];
      }
    } catch (error) {
      console.error("Error extracting contour:", error);
      contourPointsRef.current = [];
      setHasTransparency(false);
    }
  }, []);

  // Handle remove background
  const handleRemoveBackground = async () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const objects = canvas.getObjects();
    const imageObj = objects.find(obj => obj.type === "image") as FabricImage | undefined;
    
    if (!imageObj) {
      toast.error("No image found");
      return;
    }

    setIsRemovingBg(true);
    setBgRemovalProgress("Starting...");

    try {
      const imgElement = (imageObj as any)._element as HTMLImageElement;
      
      const resultBlob = await removeBackground(imgElement, (progress) => {
        setBgRemovalProgress(progress);
      });

      // Convert blob to data URL
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        
        // Get current image properties
        const currentLeft = imageObj.left;
        const currentTop = imageObj.top;
        const currentScaleX = imageObj.scaleX;
        const currentScaleY = imageObj.scaleY;
        const currentAngle = imageObj.angle;

        // Remove old image
        canvas.remove(imageObj);

        // Load new image with removed background
        const newImg = new window.Image();
        newImg.crossOrigin = "anonymous";
        newImg.onload = () => {
          const fabricImg = new FabricImage(newImg);
          fabricImg.set({
            left: currentLeft,
            top: currentTop,
            scaleX: currentScaleX,
            scaleY: currentScaleY,
            angle: currentAngle,
            selectable: true,
          });

          canvas.add(fabricImg);
          canvas.setActiveObject(fabricImg);
          canvas.renderAll();
          
          // Extract contour for the new transparent image
          extractImageContour(fabricImg);
          
          setTimeout(() => updateCutLine(), 100);
          saveHistory(canvas);
          
          toast.success("Background removed!");
          setIsRemovingBg(false);
          setBgRemovalProgress("");
        };
        newImg.src = dataUrl;
      };
      reader.readAsDataURL(resultBlob);
    } catch (error) {
      console.error("Error removing background:", error);
      toast.error("Failed to remove background. Try again.");
      setIsRemovingBg(false);
      setBgRemovalProgress("");
    }
  };

  // Update cut line and border on image changes
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !canvasReady) return;

    const handleObjectModified = () => {
      updateCutLine();
      updateBorderVisual();
    };

    canvas.on("object:modified", handleObjectModified);
    canvas.on("object:moving", handleObjectModified);
    canvas.on("object:scaling", handleObjectModified);
    canvas.on("object:rotating", handleObjectModified);

    updateCutLine();
    updateBorderVisual();

    return () => {
      canvas.off("object:modified", handleObjectModified);
      canvas.off("object:moving", handleObjectModified);
      canvas.off("object:scaling", handleObjectModified);
      canvas.off("object:rotating", handleObjectModified);
    };
  }, [canvasReady, updateCutLine, updateBorderVisual]);

  // Update cut line and border when border type changes
  useEffect(() => {
    if (canvasReady) {
      updateCutLine();
      updateBorderVisual();
    }
  }, [borderType, canvasReady, updateCutLine, updateBorderVisual]);

  const handleRotate = (direction: "left" | "right") => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      const currentAngle = activeObject.angle || 0;
      const newAngle = direction === "right" ? currentAngle + 90 : currentAngle - 90;
      activeObject.rotate(newAngle);
      setRotation(newAngle % 360);
      canvas.renderAll();
      saveHistory(canvas);
      updateCutLine();
    }
  };

  const handleZoom = (direction: "in" | "out") => {
    const newZoom = direction === "in" ? Math.min(zoomLevel + 25, 300) : Math.max(zoomLevel - 25, 25);
    setZoomLevel(newZoom);
    
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      const baseScale = 1;
      const newScale = baseScale * (newZoom / 100);
      activeObject.scale(newScale);
      canvas.renderAll();
      saveHistory(canvas);
      updateCutLine();
    }
  };

  const startCrop = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const objects = canvas.getObjects();
    const imageObj = objects.find(obj => obj.type === "image") as FabricImage | undefined;
    
    if (!imageObj) {
      toast.error("No image found to crop");
      return;
    }

    setIsCropping(true);
    setActiveTool("crop");

    const imgLeft = imageObj.left || 0;
    const imgTop = imageObj.top || 0;
    const imgWidth = (imageObj.width || 100) * (imageObj.scaleX || 1);
    const imgHeight = (imageObj.height || 100) * (imageObj.scaleY || 1);

    const cropRect = new Rect({
      left: imgLeft + 20,
      top: imgTop + 20,
      width: imgWidth - 40,
      height: imgHeight - 40,
      fill: "rgba(0, 128, 128, 0.2)",
      stroke: "#14b8a6",
      strokeWidth: 2,
      strokeDashArray: [5, 5],
      cornerColor: "#14b8a6",
      cornerSize: 10,
      transparentCorners: false,
      hasRotatingPoint: false,
      lockRotation: true,
    });

    cropRectRef.current = cropRect;
    canvas.add(cropRect);
    canvas.setActiveObject(cropRect);
    canvas.renderAll();
    
    toast.info("Resize the crop area, then click Apply");
  };

  const applyCrop = () => {
    const canvas = fabricCanvasRef.current;
    const cropRect = cropRectRef.current;
    if (!canvas || !cropRect) return;

    const objects = canvas.getObjects();
    const imageObj = objects.find(obj => obj.type === "image") as FabricImage | undefined;
    
    if (!imageObj) {
      toast.error("No image found to crop");
      cancelCrop();
      return;
    }

    const cropLeft = cropRect.left || 0;
    const cropTop = cropRect.top || 0;
    const cropWidth = (cropRect.width || 100) * (cropRect.scaleX || 1);
    const cropHeight = (cropRect.height || 100) * (cropRect.scaleY || 1);

    const imgLeft = imageObj.left || 0;
    const imgTop = imageObj.top || 0;
    const imgScaleX = imageObj.scaleX || 1;
    const imgScaleY = imageObj.scaleY || 1;

    const relativeLeft = (cropLeft - imgLeft) / imgScaleX;
    const relativeTop = (cropTop - imgTop) / imgScaleY;
    const relativeWidth = cropWidth / imgScaleX;
    const relativeHeight = cropHeight / imgScaleY;

    canvas.remove(cropRect);
    cropRectRef.current = null;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = relativeWidth;
    tempCanvas.height = relativeHeight;
    const ctx = tempCanvas.getContext("2d");
    
    if (!ctx) {
      toast.error("Failed to crop image");
      setIsCropping(false);
      setActiveTool("select");
      return;
    }

    const imgElement = (imageObj as any)._element as HTMLImageElement;
    
    ctx.drawImage(
      imgElement,
      relativeLeft, relativeTop, relativeWidth, relativeHeight,
      0, 0, relativeWidth, relativeHeight
    );

    const croppedDataUrl = tempCanvas.toDataURL("image/png");

    canvas.remove(imageObj);

    const newImgElement = new window.Image();
    newImgElement.onload = () => {
      const fabricImg = new FabricImage(newImgElement);
      const containerWidth = canvas.width || 400;
      const containerHeight = canvas.height || 400;
      
      const scale = Math.min(
        (containerWidth - 80) / (fabricImg.width || 1),
        (containerHeight - 80) / (fabricImg.height || 1),
        1
      );
      
      fabricImg.scale(scale);
      fabricImg.set({
        left: (containerWidth - (fabricImg.width || 1) * scale) / 2,
        top: (containerHeight - (fabricImg.height || 1) * scale) / 2,
        selectable: true,
      });
      
      canvas.add(fabricImg);
      canvas.setActiveObject(fabricImg);
      canvas.renderAll();
      setTimeout(() => updateCutLine(), 100);
      saveHistory(canvas);
      toast.success("Crop applied!");
    };
    newImgElement.src = croppedDataUrl;

    setIsCropping(false);
    setActiveTool("select");
  };

  const cancelCrop = () => {
    const canvas = fabricCanvasRef.current;
    const cropRect = cropRectRef.current;
    if (canvas && cropRect) {
      canvas.remove(cropRect);
      canvas.renderAll();
    }
    cropRectRef.current = null;
    setIsCropping(false);
    setActiveTool("select");
  };

  const handleDelete = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length > 0) {
      activeObjects.forEach(obj => {
        if (obj !== cutLineRef.current && obj !== borderRectRef.current) {
          canvas.remove(obj);
        }
      });
      canvas.discardActiveObject();
      canvas.renderAll();
      saveHistory(canvas);
      // Update border visual after deletion
      updateBorderVisual();
    }
  };

  const handleSave = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    
    // Temporarily hide cut line and border for export
    if (cutLineRef.current) {
      canvas.remove(cutLineRef.current);
    }
    if (borderRectRef.current) {
      canvas.remove(borderRectRef.current);
    }
    
    const dataUrl = canvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 2,
    });
    
    // Restore cut line and border
    if (showCutLine) {
      updateCutLine();
    }
    if (borderType !== "none") {
      updateBorderVisual();
    }
    
    // Update parent with local values
    if (onWidthChange) onWidthChange(localWidth);
    if (onHeightChange) onHeightChange(localHeight);
    if (onQuantityChange) onQuantityChange(localQuantity);
    
    onSave(dataUrl);
    toast.success("Design saved!");
    onClose();
  };

  const handleDownload = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    
    // Temporarily hide cut line and border for export
    if (cutLineRef.current) {
      canvas.remove(cutLineRef.current);
    }
    if (borderRectRef.current) {
      canvas.remove(borderRectRef.current);
    }
    
    const dataUrl = canvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 2,
    });
    
    // Restore cut line and border
    if (showCutLine) {
      updateCutLine();
    }
    if (borderType !== "none") {
      updateBorderVisual();
    }
    
    const link = document.createElement("a");
    link.download = "sticker-design.png";
    link.href = dataUrl;
    link.click();
    
    toast.success("Image downloaded!");
  };

  const toggleCutLine = () => {
    const newState = !showCutLine;
    setShowCutLine(newState);
    if (newState) {
      setTimeout(() => updateCutLine(), 50);
    } else {
      const canvas = fabricCanvasRef.current;
      if (canvas && cutLineRef.current) {
        canvas.remove(cutLineRef.current);
        cutLineRef.current = null;
        canvas.renderAll();
      }
    }
  };

  const quantityOptions = [50, 100, 300, 500, 800, 1000,2000];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 overflow-hidden flex flex-col bg-background [&>button]:hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleUndo} disabled={historyIndex <= 0}>
              <Undo className="w-4 h-4" />
            </Button>
          </div>
          <h2 className="font-semibold text-foreground">Sticker Editor</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Tools */}
          <div className="w-12 bg-muted/50 border-r border-border flex flex-col items-center py-4 gap-2">
            {/* Upload Image Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => editorFileInputRef.current?.click()}
              title="Upload Image"
              className="w-10 h-10"
            >
              <Image className="w-5 h-5" />
            </Button>
            <input
              ref={editorFileInputRef}
              type="file"
              accept="image/*,.pdf,.ai,.svg"
              onChange={handleEditorFileUpload}
              className="hidden"
            />
            <div className="w-8 h-px bg-border my-1" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleToolClick("text")}
              title="Add Text"
              className="w-10 h-10"
            >
              <Type className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={startCrop}
              title="Crop"
              className="w-10 h-10"
              disabled={isCropping}
            >
              <Crop className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveBackground}
              title="Remove Background"
              className="w-10 h-10"
              disabled={isRemovingBg}
            >
              {isRemovingBg ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Eraser className="w-5 h-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              title="Delete"
              className="w-10 h-10"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 flex flex-col bg-muted/20 relative">
            {/* Loading Overlay */}
            {isRemovingBg && (
              <div className="absolute inset-0 bg-background/80 z-10 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-teal" />
                <p className="text-sm font-medium text-foreground">{bgRemovalProgress || "Removing background..."}</p>
                <p className="text-xs text-muted-foreground">This may take a moment</p>
              </div>
            )}

            {/* Canvas */}
            <div 
              ref={containerRef} 
              className="flex-1 flex items-center justify-center p-4 overflow-auto"
            >
              <div className="relative bg-white rounded-lg shadow-lg border border-border">
                <canvas ref={canvasRef} />
              </div>
            </div>

            {/* Bottom Toolbar */}
            <div className="h-14 border-t border-border bg-background flex items-center justify-between px-4">
              <div className="flex items-center gap-4">
                {isCropping ? (
                  <>
                    <Button size="sm" onClick={applyCrop} className="bg-teal hover:bg-teal/90 text-white">
                      <Scissors className="w-4 h-4 mr-1" />
                      Apply
                    </Button>
                    <Button variant="outline" size="sm" onClick={cancelCrop}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRotate("right")}
                      className="gap-1"
                    >
                      <RotateCw className="w-4 h-4" />
                      ROTATE
                    </Button>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground font-medium">{zoomLevel}%</span>
                <Button variant="ghost" size="icon" onClick={() => handleZoom("out")} className="w-8 h-8">
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleZoom("in")} className="w-8 h-8">
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleCutLine}
                  className={`w-8 h-8 ${showCutLine ? "text-red-500" : ""}`}
                  title="Toggle Cut Line Preview"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Options Panel */}
          <div className="w-72 bg-background border-l border-border flex flex-col overflow-y-auto">
            {/* Layers */}
            <div className="p-4 border-b border-border">
              <p className="text-xs text-muted-foreground font-medium mb-2">LAYERS</p>
              {/* Image Layer */}
              <button
                onClick={() => handleLayerClick("image")}
                className={`w-full flex items-center justify-between gap-2 py-2 px-3 rounded-lg mb-2 transition-all ${
                  activeLayer === "image" 
                    ? "bg-teal/10 border border-teal" 
                    : "bg-muted/50 hover:bg-muted border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Image className={`w-4 h-4 ${activeLayer === "image" ? "text-teal" : "text-muted-foreground"}`} />
                  <span className={`text-sm font-medium ${activeLayer === "image" ? "text-teal" : ""}`}>Image</span>
                </div>
                {activeLayer === "image" && <Check className="w-4 h-4 text-teal" />}
              </button>
              {/* Background Layer */}
              <button
                onClick={toggleBackground}
                className={`w-full flex items-center justify-between gap-2 py-2 px-3 rounded-lg transition-all ${
                  activeLayer === "background" 
                    ? "bg-teal/10 border border-teal" 
                    : "bg-muted/30 hover:bg-muted border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Layers className={`w-4 h-4 ${showBackground ? "text-muted-foreground" : "text-muted-foreground/50"}`} />
                  <span className={`text-sm ${!showBackground ? "line-through opacity-50" : ""}`}>Background</span>
                </div>
                {showBackground ? (
                  <Eye className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <EyeOff className="w-4 h-4 text-muted-foreground/50" />
                )}
              </button>
              <p className="text-[10px] text-muted-foreground mt-2 text-center">
                Click Image to select • Click Background to toggle visibility
              </p>
            </div>

            {/* Need help link */}
            <div className="p-4 border-b border-border">
              <p className="text-sm text-center">
                Need help creating your design? See our{" "}
                <a href="#" className="text-teal hover:underline font-medium">Artwork Tips</a>
              </p>
            </div>

            {/* Border Options - Die Cut */}
            {productType === "die-cut" && (
              <div className="p-4 border-b border-border">
                <label className="text-sm font-semibold text-foreground mb-2 block">BORDER</label>
                <p className="text-xs text-muted-foreground mb-3">White border around your sticker</p>
                <div className="grid grid-cols-3 gap-3">
                  {(["none", "small", "large"] as BorderType[]).map((type) => {
                    const isSelected = borderType === type;
                    const borderWidth = type === "none" ? 0 : type === "small" ? 3 : 6;
                    
                    return (
                      <button
                        key={type}
                        onClick={() => setBorderType(type)}
                        className={`flex flex-col items-center gap-2 py-3 px-2 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? "bg-teal/10 border-2 border-teal text-teal shadow-sm"
                            : "bg-muted/50 hover:bg-muted text-foreground border-2 border-transparent"
                        }`}
                      >
                        {/* Visual preview showing sticker with border */}
                        <div className="w-12 h-12 relative flex items-center justify-center">
                          {/* Outer cut line indicator */}
                          <div 
                            className={`absolute rounded-lg transition-all ${
                              isSelected ? "bg-teal/20" : "bg-muted-foreground/10"
                            }`}
                            style={{
                              width: `${24 + borderWidth * 2}px`,
                              height: `${24 + borderWidth * 2}px`,
                            }}
                          />
                          {/* White border area */}
                          {type !== "none" && (
                            <div 
                              className="absolute bg-white rounded-md shadow-sm"
                              style={{
                                width: `${24 + borderWidth * 2}px`,
                                height: `${24 + borderWidth * 2}px`,
                              }}
                            />
                          )}
                          {/* Inner design (sticker content) */}
                          <div 
                            className={`relative rounded-md transition-all ${
                              isSelected 
                                ? "bg-gradient-to-br from-teal to-teal/70" 
                                : "bg-gradient-to-br from-muted-foreground/40 to-muted-foreground/20"
                            }`}
                            style={{
                              width: "24px",
                              height: "24px",
                            }}
                          >
                            {/* Simple icon inside */}
                            <div className="w-full h-full flex items-center justify-center">
                              <div className={`w-3 h-3 rounded-full ${isSelected ? "bg-white/80" : "bg-white/50"}`} />
                            </div>
                          </div>
                          {/* Dashed cut line */}
                          <div 
                            className={`absolute rounded-lg border-2 border-dashed pointer-events-none ${
                              isSelected ? "border-teal" : "border-muted-foreground/30"
                            }`}
                            style={{
                              width: `${24 + borderWidth * 2 + 4}px`,
                              height: `${24 + borderWidth * 2 + 4}px`,
                            }}
                          />
                        </div>
                        <span className="capitalize">{type}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {type === "none" ? "No margin" : type === "small" ? "1/16\" margin" : "1/8\" margin"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size & Quantity */}
            <div className="p-4 border-b border-border">
              <div className="grid grid-cols-5 gap-2 items-end">
              <div className="col-span-2">
                  <label className="text-xs text-muted-foreground font-medium mb-1 block">WIDTH</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={localWidth}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow empty, numbers, and decimal points
                        if (value === "" || /^\d*\.?\d*$/.test(value)) {
                          setLocalWidth(value);
                        }
                      }}
                      onBlur={() => {
                        // Ensure minimum value on blur
                        const num = parseFloat(localWidth);
                        if (isNaN(num) || num < 0.5) {
                          setLocalWidth("0.5");
                        }
                      }}
                      className="flex h-10 w-full rounded-l-md border border-r-0 border-border bg-background px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-0"
                    />
                    <span className="px-2 py-2 h-10 flex items-center bg-muted border border-l-0 border-border rounded-r-md text-sm text-muted-foreground">in</span>
                  </div>
                </div>
                <div className="flex items-end justify-center pb-2">
                  <span className="text-muted-foreground font-medium">×</span>
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-muted-foreground font-medium mb-1 block">HEIGHT</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={localHeight}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow empty, numbers, and decimal points
                        if (value === "" || /^\d*\.?\d*$/.test(value)) {
                          setLocalHeight(value);
                        }
                      }}
                      onBlur={() => {
                        // Ensure minimum value on blur
                        const num = parseFloat(localHeight);
                        if (isNaN(num) || num < 0.5) {
                          setLocalHeight("0.5");
                        }
                      }}
                      className="flex h-10 w-full rounded-l-md border border-r-0 border-border bg-background px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-0"
                    />
                    <span className="px-2 py-2 h-10 flex items-center bg-muted border border-l-0 border-border rounded-r-md text-sm text-muted-foreground">in</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="text-xs text-muted-foreground font-medium mb-1 block">QUANTITY</label>
                <select 
                  value={localQuantity}
                  onChange={(e) => setLocalQuantity(parseInt(e.target.value))}
                  className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground text-sm"
                >
                  {quantityOptions.map((qty) => (
                    <option key={qty} value={qty}>{qty}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price */}
            <div className="p-4 border-b border-border">
              <p className="text-sm text-teal font-medium text-center mb-2">Order more, save more!</p>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-foreground">${price}</span>
                <span className="text-sm text-muted-foreground">${pricePerUnit}/unit</span>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 space-y-3 mt-auto">
              <Button 
                onClick={handleSave} 
                className="w-full bg-teal hover:bg-teal/90 text-white py-6 text-base font-semibold rounded-full"
              >
                REVIEW & ADD TO CART
              </Button>
              <Button 
                variant="link" 
                onClick={handleDownload}
                className="w-full text-teal hover:text-teal/80 font-medium"
              >
                <Download className="w-4 h-4 mr-2" />
                SAVE ARTWORK
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageEditor;
