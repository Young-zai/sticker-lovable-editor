import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Star, Check, ChevronRight, ChevronDown, ChevronLeft, Upload, X, Edit, Zap, Shield, Truck, Clock, Droplets, Sun, Quote } from "lucide-react";
import ImageEditor from "@/components/ImageEditor";
import ProductionWorkflow from "@/components/ProductionWorkflow";
import dieCutImg from "@/assets/products/die-cut-stickers-main.png";
import kissCutImg from "@/assets/products/kiss-cut-stickers.png";
import holographicImg from "@/assets/products/holographic-stickers.png";
import glitterImg from "@/assets/products/glitter-stickers.png";
import rollLabelsImg from "@/assets/products/roll-labels.png";
import stickerSheetsImg from "@/assets/products/sticker-sheets-category.png";

// Material images
import vinylMaterial from "@/assets/materials/vinyl-material.png";
import clearMaterial from "@/assets/materials/clear-material.png";
import holographicMaterial from "@/assets/materials/holographic-material.png";
import glitterMaterial from "@/assets/materials/glitter-material.png";
import metallicGoldMaterial from "@/assets/materials/metallic-material.png";
import metallicSilverMaterial from "@/assets/materials/metallic-silver-material.png";
import glowMaterial from "@/assets/materials/glow-material.png";

// Shape images
import dieCutShape from "@/assets/shapes/die-cut-shape.png";
import circleShape from "@/assets/shapes/circle-shape.png";
import squareShape from "@/assets/shapes/square-shape.png";
import rectangleShape from "@/assets/shapes/rectangle-shape.png";
import ovalShape from "@/assets/shapes/oval-shape.png";

// 预设尺寸选项
const presetSizes = [
  { label: "2 × 2", width: 2, height: 2 },
  { label: "3 × 3", width: 3, height: 3 },
  { label: "4 × 4", width: 4, height: 4 },
  { label: "5 × 5", width: 5, height: 5 },
];

// 数量价格表 - 显示单价和总价
const quantityPricing = [
  { qty: 50, unitPrice: 0.89, savings: 0 },
  { qty: 100, unitPrice: 0.69, savings: 22 },
  { qty: 250, unitPrice: 0.49, savings: 45 },
  { qty: 500, unitPrice: 0.39, savings: 56 },
  { qty: 1000, unitPrice: 0.29, savings: 67 },
  { qty: 2500, unitPrice: 0.19, savings: 79 },
];

// 材质选项 - 主要显示的材质 (4个 + More按钮 = 5列)
const mainMaterialOptions = [
  { id: "vinyl", name: "Vinyl", price: 0, image: vinylMaterial },
  { id: "clear", name: "Clear", price: 0.05, image: clearMaterial },
  { id: "holographic", name: "Holographic", price: 0.15, image: holographicMaterial },
  { id: "glow", name: "Glow", price: 0.18, image: glowMaterial },
];

// 更多材质选项
const moreMaterialOptions = [
  { id: "glitter", name: "Glitter", price: 0.12, image: glitterMaterial },
  { id: "metallic-gold", name: "Metallic Gold", price: 0.10, image: metallicGoldMaterial },
  { id: "metallic-silver", name: "Metallic Silver", price: 0.10, image: metallicSilverMaterial },
];

// 所有材质选项
const allMaterialOptions = [...mainMaterialOptions, ...moreMaterialOptions];

const shapeOptions = [
  { id: "die-cut", name: "Die Cut", image: dieCutShape },
  { id: "circle", name: "Circle", image: circleShape },
  { id: "square", name: "Square", image: squareShape },
  { id: "rectangle", name: "Rectangle", image: rectangleShape },
  { id: "oval", name: "Oval", image: ovalShape },
];

// 相关产品
const relatedProducts = [
  { id: "kiss-cut", title: "Kiss Cut Stickers", image: kissCutImg, href: "/stickers/kiss-cut" },
  { id: "sticker-sheets", title: "Sticker Sheets", image: stickerSheetsImg, href: "/stickers/sheets" },
  { id: "holographic", title: "Holographic Stickers", image: holographicImg, href: "/stickers/holographic" },
  { id: "roll-labels", title: "Roll Labels", image: rollLabelsImg, href: "/labels/roll" },
];

// 产品特点
const features = [
  "Cut precisely to the shape of your design",
  "Waterproof & weatherproof vinyl",
  "UV-resistant inks that won't fade",
  "Easy peel-and-stick application",
  "Indoor/outdoor durability up to 5 years",
];

// 快速特性图标
const quickFeatures = [
  { icon: Zap, text: "Instant Proof" },
  { icon: Shield, text: "Free Shipping" },
  { icon: Truck, text: "Fast Turnaround" },
  { icon: Clock, text: "5-Year Durability" },
];

// FAQs
const faqs = [
  {
    question: "How can I place an order?",
    answer: "Browse our collection, add your desired items to your cart, and proceed to checkout. You can complete your purchase using various payment methods."
  },
  {
    question: "Can I return an item?",
    answer: "Yes! If you're not satisfied with your purchase, you can return items within 30 days of receiving your order. Please ensure items are in their original condition and packaging."
  },
  {
    question: "How can I stay updated with your promos?",
    answer: "Subscribe to our newsletter! You'll receive exclusive updates on new arrivals, sales, and tips straight to your inbox."
  },
  {
    question: "What's the minimum order quantity?",
    answer: "Our minimum order is 50 stickers. The more you order, the lower the price per sticker!"
  },
  {
    question: "What file formats do you accept?",
    answer: "We accept PNG, JPG, PDF, AI, and SVG files. For best results, upload high-resolution files (300 DPI or higher)."
  },
];

// Customer Reviews
const customerReviews = [
  {
    id: 1,
    name: "Jessica Miller",
    role: "Small Business Owner",
    avatar: "J",
    rating: 5,
    date: "2 weeks ago",
    comment: "Absolutely love the quality! Customer service was amazing and fast response times. Will definitely order again.",
    verified: true,
  },
  {
    id: 2,
    name: "Psy T.",
    role: "Graphic Designer",
    avatar: "P",
    rating: 5,
    date: "1 month ago",
    comment: "The colors came out exactly as expected. The die-cut precision is impressive - no white edges at all!",
    verified: true,
  },
  {
    id: 3,
    name: "Alvarado",
    role: "Brand Manager",
    avatar: "A",
    rating: 5,
    date: "3 weeks ago",
    comment: "Great product! These stickers have survived rain, sun, and even the dishwasher. Highly recommend for outdoor use.",
    verified: true,
  },
  {
    id: 4,
    name: "Anonymous Buyer",
    role: "Verified Customer",
    avatar: "?",
    rating: 4,
    date: "1 month ago",
    comment: "I absolutely love the quality, customer service, and fast turnaround time! Sticker Kiko has become my go-to for all promotional products.",
    verified: true,
  },
];

// Why Choose Die Cut reasons
const whyChooseReasons = [
  "Perfectly Customized to Your Exact Shape",
  "Premium Weatherproof Vinyl for Any Use",
  "Eco-Conscious Production & Materials",
  "Flexible Minimum Order Quantities",
  "Easy-to-Apply with Professional Finish",
  "Great for Small Businesses & Creators",
];

const DieCutStickers = () => {
  // Size state
  const [customWidth, setCustomWidth] = useState("3");
  const [customHeight, setCustomHeight] = useState("3");
  const [isCustomSize, setIsCustomSize] = useState(false);

  // Quantity state
  const [selectedQtyIndex, setSelectedQtyIndex] = useState(1); // Default to 100
  const [customQuantity, setCustomQuantity] = useState("");
  const [isCustomQuantity, setIsCustomQuantity] = useState(false);

  // Other options
  const [selectedMaterial, setSelectedMaterial] = useState(mainMaterialOptions[0]);
  const [selectedShape, setSelectedShape] = useState(shapeOptions[0]);
  const [showMoreMaterials, setShowMoreMaterials] = useState(false);

  // Gallery image state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const galleryImages = [dieCutImg, dieCutImg, dieCutImg, dieCutImg];

  // Image upload
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Sticky bar visibility
  const [showStickyBar, setShowStickyBar] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (formRef.current) {
        const rect = formRef.current.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle preset size click
  const handlePresetSize = (width: number, height: number) => {
    setCustomWidth(width.toString());
    setCustomHeight(height.toString());
    setIsCustomSize(false);
  };

  // Handle quantity selection
  const handleQuantitySelect = (index: number) => {
    setSelectedQtyIndex(index);
    setIsCustomQuantity(false);
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setUploadedImage(imageUrl);
        // Use setTimeout to ensure state is updated before opening editor
        setTimeout(() => {
          setIsEditorOpen(true);
        }, 50);
      };
      reader.onerror = () => {
        console.error("Failed to read file");
      };
      reader.readAsDataURL(file);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDesignNow = () => {
    // If already has an uploaded image, open editor directly
    if (uploadedImage) {
      setIsEditorOpen(true);
      return;
    }
    // Otherwise trigger file upload
    fileInputRef.current?.click();
  };

  const handleOpenEditor = () => {
    if (uploadedImage) {
      setIsEditorOpen(true);
    }
  };

  const handleSaveEdit = (editedImageUrl: string) => {
    setUploadedImage(editedImageUrl);
  };

  // 价格计算
  const width = parseFloat(customWidth) || 3;
  const height = parseFloat(customHeight) || 3;
  const area = width * height;
  const baseMultiplier = area / 9; // 基于3x3的面积

  const currentQty = isCustomQuantity 
    ? parseInt(customQuantity) || 100 
    : quantityPricing[selectedQtyIndex].qty;
  
  const currentUnitPrice = isCustomQuantity 
    ? 0.49 // 自定义数量使用中间价格
    : quantityPricing[selectedQtyIndex].unitPrice;
  
  const adjustedUnitPrice = (currentUnitPrice * baseMultiplier + selectedMaterial.price).toFixed(2);
  const totalPrice = (currentQty * parseFloat(adjustedUnitPrice)).toFixed(2);

  return (
    <Layout>
      {/* Breadcrumb */}
      <nav className="bg-muted/30 py-3">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/stickers" className="hover:text-foreground transition-colors">Stickers</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">Custom Die Cut Stickers</span>
          </div>
        </div>
      </nav>

      {/* Product Section */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Mobile: Title & Rating - Show above image on mobile */}
          <div className="lg:hidden mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Custom Die Cut Stickers
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warm-orange text-warm-orange" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(2,847 reviews)</span>
            </div>
            {/* Quick Features */}
            <div className="flex flex-wrap gap-4">
              {quickFeatures.map((feature, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <feature.icon className="w-4 h-4 text-teal" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Gallery */}
            <div className="lg:col-span-7 space-y-4">
              {/* Main Image with Navigation */}
              <div className="bg-gradient-to-br from-peach/20 to-coral/10 rounded-2xl p-6 md:p-10 flex items-center justify-center aspect-square relative overflow-hidden group">
                {/* Left Arrow */}
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                  className="absolute left-2 md:left-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-md flex items-center justify-center hover:bg-background transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>

                <img
                  src={galleryImages[currentImageIndex]}
                  alt="Custom Die Cut Stickers"
                  className="w-4/5 h-4/5 object-contain drop-shadow-xl"
                />

                {/* Right Arrow */}
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 md:right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-md flex items-center justify-center hover:bg-background transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Thumbnails - Below Main Image */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`w-16 h-16 rounded-lg bg-muted/50 p-1.5 border-2 transition-colors flex-shrink-0 ${
                      i === currentImageIndex ? "border-teal" : "border-transparent hover:border-teal/50"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>

              {/* Product Description */}
              <div className="bg-muted/30 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-lg">About Die Cut Stickers</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our custom die cut stickers are precision-cut to the exact shape of your design, 
                  giving your stickers a clean, professional look. Made with premium waterproof vinyl 
                  that's built to last indoors and outdoors for up to 5 years.
                </p>
                <ul className="space-y-2">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-teal flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Configuration Form */}
            <div className="lg:col-span-5" ref={formRef}>
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Title & Rating - Desktop only */}
                <div className="hidden lg:block">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Custom Die Cut Stickers
                  </h1>
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-warm-orange text-warm-orange" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">(2,847 reviews)</span>
                  </div>
                </div>

                {/* Quick Features - Desktop only */}
                <div className="hidden lg:flex flex-wrap gap-4">
                  {quickFeatures.map((feature, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <feature.icon className="w-4 h-4 text-teal" />
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* Shape Selection - Grid with Images */}
                <div>
                  <label className="block text-sm font-semibold mb-3">Shape</label>
                  <div className="grid grid-cols-5 gap-2">
                    {shapeOptions.map((shape) => (
                      <button
                        key={shape.id}
                        onClick={() => setSelectedShape(shape)}
                        className={`p-2 rounded-xl border-2 transition-all flex flex-col items-center gap-1.5 ${
                          selectedShape.id === shape.id
                            ? "border-teal bg-teal/5 shadow-md"
                            : "border-border hover:border-teal/50 bg-muted/30"
                        }`}
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden">
                          <img 
                            src={shape.image} 
                            alt={shape.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs font-medium">{shape.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Material Selection - Grid like Shape */}
                <div>
                  <label className="block text-sm font-semibold mb-3">Material</label>
                  <div className="grid grid-cols-5 gap-2">
                    {mainMaterialOptions.map((material) => (
                      <button
                        key={material.id}
                        onClick={() => setSelectedMaterial(material)}
                        className={`p-2 rounded-xl border-2 transition-all flex flex-col items-center gap-1.5 ${
                          selectedMaterial.id === material.id
                            ? "border-teal bg-teal/5 shadow-md"
                            : "border-border hover:border-teal/50 bg-muted/30"
                        }`}
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden">
                          <img 
                            src={material.image} 
                            alt={material.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs font-medium text-center leading-tight">{material.name}</span>
                      </button>
                    ))}
                    <button
                      onClick={() => setShowMoreMaterials(!showMoreMaterials)}
                      className={`p-2 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1.5 ${
                        showMoreMaterials || moreMaterialOptions.some(m => m.id === selectedMaterial.id)
                          ? "border-teal bg-teal/5"
                          : "border-border hover:border-teal/50 bg-muted/30"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center">
                        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${showMoreMaterials ? 'rotate-180' : ''}`} />
                      </div>
                      <span className="text-xs font-medium">More</span>
                    </button>
                  </div>
                  
                  {/* More Materials Dropdown */}
                  {showMoreMaterials && (
                    <div className="grid grid-cols-5 gap-2 mt-2 pt-2 border-t border-border">
                      {moreMaterialOptions.map((material) => (
                        <button
                          key={material.id}
                          onClick={() => setSelectedMaterial(material)}
                          className={`p-2 rounded-xl border-2 transition-all flex flex-col items-center gap-1.5 ${
                            selectedMaterial.id === material.id
                              ? "border-teal bg-teal/5 shadow-md"
                              : "border-border hover:border-teal/50 bg-muted/30"
                          }`}
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden">
                            <img 
                              src={material.image} 
                              alt={material.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-xs font-medium text-center leading-tight">{material.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>


                {/* Size Selection */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Size</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {presetSizes.map((size) => (
                      <button
                        key={size.label}
                        onClick={() => handlePresetSize(size.width, size.height)}
                        className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                          !isCustomSize && customWidth === size.width.toString() && customHeight === size.height.toString()
                            ? "border-teal bg-teal/10 text-teal"
                            : "border-border hover:border-teal/50"
                        }`}
                      >
                        {size.label}"
                      </button>
                    ))}
                    <button
                      onClick={() => setIsCustomSize(true)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        isCustomSize
                          ? "border-teal bg-teal/10 text-teal"
                          : "border-border hover:border-teal/50"
                      }`}
                    >
                      Custom Size
                    </button>
                  </div>
                  
                  {/* Custom Size Inputs */}
                  {isCustomSize && (
                    <div className="flex items-center gap-2 bg-muted/50 p-3 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center border border-border rounded-lg overflow-hidden bg-background">
                          <Input
                            type="number"
                            value={customWidth}
                            onChange={(e) => setCustomWidth(e.target.value)}
                            min="0.5"
                            max="20"
                            step="0.25"
                            className="border-0 text-center"
                          />
                          <span className="px-3 text-sm text-muted-foreground bg-muted">in</span>
                        </div>
                      </div>
                      <span className="text-muted-foreground font-medium">×</span>
                      <div className="flex-1">
                        <div className="flex items-center border border-border rounded-lg overflow-hidden bg-background">
                          <Input
                            type="number"
                            value={customHeight}
                            onChange={(e) => setCustomHeight(e.target.value)}
                            min="0.5"
                            max="20"
                            step="0.25"
                            className="border-0 text-center"
                          />
                          <span className="px-3 text-sm text-muted-foreground bg-muted">in</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quantity Pricing Table */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Quantity</label>
                  <div className="border border-border rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="py-2 px-3 text-left font-medium text-muted-foreground">Qty</th>
                          <th className="py-2 px-3 text-center font-medium text-muted-foreground">Unit Price</th>
                          <th className="py-2 px-3 text-center font-medium text-muted-foreground">Total</th>
                          <th className="py-2 px-3 text-right font-medium text-muted-foreground">Save</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quantityPricing.map((item, index) => {
                          const itemUnitPrice = (item.unitPrice * baseMultiplier + selectedMaterial.price).toFixed(2);
                          const itemTotal = (item.qty * parseFloat(itemUnitPrice)).toFixed(2);
                          return (
                            <tr 
                              key={item.qty}
                              onClick={() => handleQuantitySelect(index)}
                              className={`cursor-pointer transition-colors ${
                                !isCustomQuantity && selectedQtyIndex === index
                                  ? "bg-teal/10 border-l-4 border-l-teal"
                                  : "hover:bg-muted/30"
                              }`}
                            >
                              <td className="py-2.5 px-3 font-medium">{item.qty}</td>
                              <td className="py-2.5 px-3 text-center">${itemUnitPrice}</td>
                              <td className="py-2.5 px-3 text-center font-semibold">${itemTotal}</td>
                              <td className="py-2.5 px-3 text-right">
                                {item.savings > 0 && (
                                  <span className="text-green-600 font-medium">-{item.savings}%</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    
                    {/* Custom Quantity */}
                    <div 
                      className={`border-t border-border p-3 ${isCustomQuantity ? "bg-teal/10" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          checked={isCustomQuantity}
                          onChange={() => setIsCustomQuantity(true)}
                          className="w-4 h-4 text-teal"
                        />
                        <span className="text-sm font-medium">Custom Quantity:</span>
                        <Input
                          type="number"
                          value={customQuantity}
                          onChange={(e) => {
                            setCustomQuantity(e.target.value);
                            setIsCustomQuantity(true);
                          }}
                          min="25"
                          placeholder="Enter qty"
                          className="w-24 h-8 text-center text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf,.ai,.svg"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Image Editor Dialog */}
                <ImageEditor
                  isOpen={isEditorOpen}
                  onClose={() => setIsEditorOpen(false)}
                  imageUrl={uploadedImage}
                  onSave={handleSaveEdit}
                  productType="die-cut"
                  width={customWidth}
                  height={customHeight}
                  quantity={currentQty}
                  onWidthChange={setCustomWidth}
                  onHeightChange={setCustomHeight}
                  onQuantityChange={(q) => {
                    const idx = quantityPricing.findIndex(p => p.qty === q);
                    if (idx >= 0) {
                      setSelectedQtyIndex(idx);
                      setIsCustomQuantity(false);
                    } else {
                      setCustomQuantity(q.toString());
                      setIsCustomQuantity(true);
                    }
                  }}
                  price={totalPrice}
                  pricePerUnit={adjustedUnitPrice}
                />

                {/* Price Summary & CTA */}
                <div className="bg-gradient-to-r from-teal/10 to-coral/10 rounded-xl p-5">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Total Price</span>
                      <p className="text-3xl font-bold text-foreground">${totalPrice}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">Unit Price</span>
                      <p className="text-lg font-semibold text-foreground">${adjustedUnitPrice}/ea</p>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-teal hover:bg-teal/90 text-white py-6 text-lg font-bold rounded-full shadow-lg"
                    onClick={handleDesignNow}
                  >
                    DESIGN NOW
                  </Button>
                  
                  <p className="text-center text-xs text-muted-foreground mt-3">
                    Free shipping on orders over $75
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Product Details</h2>
          
          <Tabs defaultValue="material" className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0 mb-8">
              <TabsTrigger 
                value="material" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal data-[state=active]:bg-transparent px-6 py-3"
              >
                Material Specification
              </TabsTrigger>
              <TabsTrigger 
                value="artwork" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal data-[state=active]:bg-transparent px-6 py-3"
              >
                Artwork File Specifications
              </TabsTrigger>
              <TabsTrigger 
                value="size-guide" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal data-[state=active]:bg-transparent px-6 py-3"
              >
                Best Size Guide
              </TabsTrigger>
            </TabsList>

            <TabsContent value="material" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Material Specification for Die Cut</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-teal mt-0.5 flex-shrink-0" />
                      <span><strong>Material:</strong> High-quality Vinyl</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-teal mt-0.5 flex-shrink-0" />
                      <span><strong>Adhesive:</strong> Permanent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-teal mt-0.5 flex-shrink-0" />
                      <span><strong>Shapes:</strong> Custom die-cut shapes and sizes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-teal mt-0.5 flex-shrink-0" />
                      <span><strong>Size:</strong> Smallest Die Cut Sticker 0.5" x 0.5"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Droplets className="w-5 h-5 text-teal mt-0.5 flex-shrink-0" />
                      <span><strong>Waterproof:</strong> Water-based inks for print durability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-teal mt-0.5 flex-shrink-0" />
                      <span><strong>Weather Resistant:</strong> Durable for indoor & outdoor use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-teal mt-0.5 flex-shrink-0" />
                      <span><strong>Dishwasher Safe:</strong> Safe for water contact items (cups, bottles, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Sun className="w-5 h-5 text-teal mt-0.5 flex-shrink-0" />
                      <span><strong>UV Resistant:</strong> Protects colors from fading under sunlight</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-peach/30 to-coral/20 rounded-2xl p-6 text-center">
                  <h4 className="text-lg font-bold mb-4 text-teal">DISCOVER OUR VERSATILE STICKERS!</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center">
                        <Droplets className="w-8 h-8 text-teal" />
                      </div>
                      <span className="text-xs font-medium">WATERPROOF</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center">
                        <Shield className="w-8 h-8 text-teal" />
                      </div>
                      <span className="text-xs font-medium">DISHWASHER SAFE</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center">
                        <Sun className="w-8 h-8 text-teal" />
                      </div>
                      <span className="text-xs font-medium">UV RESISTANT</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="artwork" className="mt-0">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Artwork File Specifications</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-teal text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                      <div>
                        <h4 className="font-medium">Resolution</h4>
                        <p className="text-muted-foreground text-sm">Minimum of 300 DPI (or your expected size), for crisp, high-quality prints.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-teal text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                      <div>
                        <h4 className="font-medium">Color Mode</h4>
                        <p className="text-muted-foreground text-sm">Set your file to CMYK (not RGB), with Pantone colors converted to CMYK, for the most accurate color output.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-teal text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                      <div>
                        <h4 className="font-medium">File Formats</h4>
                        <p className="text-muted-foreground text-sm">Accepted: AI, PDF, EPS, SVG, PNG, PSD, PNG, JPG, TIF.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-teal text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                      <div>
                        <h4 className="font-medium">Preferred File Size</h4>
                        <p className="text-muted-foreground text-sm">At least around 4 PNG. Also highest-resolution final images (300 DPI).</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-teal text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                      <div>
                        <h4 className="font-medium">Size Limitations</h4>
                        <p className="text-muted-foreground text-sm">Smallest Sticker 0.5" x 0.5", Smallest Label 1" x 1".</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-teal text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">6</span>
                      <div>
                        <h4 className="font-medium">Important Tips</h4>
                        <p className="text-muted-foreground text-sm">Use vector files whenever possible for scalability. Add 1/8" bleed beyond the outline to avoid trimming errors.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="size-guide" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Best Size Guide</h3>
                  <p className="text-muted-foreground">
                    This handy size guide compares our most popular sticker dimensions to everyday items, helping you choose the perfect scale for your design.
                  </p>
                  <p className="text-muted-foreground">
                    Use these comparisons to easily decide what size works best for laptops, phones, water bottles, packaging, or branding.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <span className="text-2xl font-bold text-teal">2" × 2"</span>
                      <p className="text-sm text-muted-foreground mt-1">Credit Card Size</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <span className="text-2xl font-bold text-teal">3" × 3"</span>
                      <p className="text-sm text-muted-foreground mt-1">Post-it Note Size</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <span className="text-2xl font-bold text-teal">4" × 4"</span>
                      <p className="text-sm text-muted-foreground mt-1">CD Case Size</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <span className="text-2xl font-bold text-teal">5" × 5"</span>
                      <p className="text-sm text-muted-foreground mt-1">Smartphone Pro</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-lavender/30 to-primary/20 rounded-2xl p-6 flex items-center justify-center">
                  <img 
                    src={dieCutImg} 
                    alt="Size comparison" 
                    className="max-w-full h-auto"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Why Choose Die Cut Stickers */}
      <section className="py-16 bg-gradient-to-br from-peach/20 to-coral/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Why choose Die Cut stickers?
              </h2>
              <p className="text-muted-foreground">
                Die cut stickers are the most popular choice for custom stickers because they highlight your design with a clean, precise outline and a premium look.
              </p>
              <ul className="space-y-3">
                {whyChooseReasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-teal text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-foreground">{reason}</span>
                  </li>
                ))}
              </ul>
              <Button className="bg-teal hover:bg-teal/90 text-white rounded-full px-8">
                Order Now
              </Button>
            </div>
            <div className="flex justify-center">
              <img 
                src={dieCutImg} 
                alt="Die Cut Stickers" 
                className="max-w-md w-full drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Production Workflow */}
      <ProductionWorkflow />

      {/* FAQs */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">FAQs for Die Cut Stickers</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-border rounded-lg p-6 bg-background"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" className="rounded-full border-coral text-coral hover:bg-coral hover:text-white">
              See All FAQs
            </Button>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">You May Also Like...</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((product) => (
              <Link
                key={product.id}
                to={product.href}
                className="group bg-background rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all"
              >
                <div className="aspect-square bg-gradient-to-br from-peach/20 to-coral/10 p-6 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-3/4 h-3/4 object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-foreground group-hover:text-teal transition-colors">
                    {product.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-gradient-to-br from-peach/20 to-coral/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Customer Reviews</h2>
          
          {/* Rating Summary */}
          <div className="bg-background rounded-2xl p-6 mb-8">
            <div className="flex flex-wrap items-center gap-8">
              <div className="text-center">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">4.9</span>
                  <span className="text-muted-foreground">out of 5</span>
                </div>
                <div className="flex gap-1 mt-2 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-warm-orange text-warm-orange" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Based on 2,847 reviews</p>
              </div>
              
              {/* Rating Bars */}
              <div className="flex-1 space-y-2 min-w-[200px]">
                {[
                  { stars: 5, percent: 85 },
                  { stars: 4, percent: 10 },
                  { stars: 3, percent: 3 },
                  { stars: 2, percent: 1 },
                  { stars: 1, percent: 1 },
                ].map((rating) => (
                  <div key={rating.stars} className="flex items-center gap-2">
                    <span className="text-sm w-12">{rating.stars} stars</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-warm-orange rounded-full"
                        style={{ width: `${rating.percent}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-10">{rating.percent}%</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-2">
                <Button className="bg-coral hover:bg-coral/90 text-white rounded-full">
                  Ask a Question
                </Button>
                <Button variant="outline" className="rounded-full">
                  Write a Review
                </Button>
              </div>
            </div>
          </div>

          {/* Review Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {customerReviews.map((review) => (
              <div key={review.id} className="bg-background rounded-xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal to-coral flex items-center justify-center text-white font-bold text-lg">
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{review.name}</h4>
                        <p className="text-sm text-muted-foreground">{review.role}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-warm-orange text-warm-orange" />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-muted-foreground">{review.comment}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <span>{review.date}</span>
                      {review.verified && (
                        <span className="flex items-center gap-1 text-teal">
                          <Check className="w-4 h-4" />
                          Verified Buyer
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Bottom Bar */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-50 transition-transform duration-300 ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between py-3 gap-4">
            {/* Summary */}
            <div className="hidden md:flex items-center gap-6 text-sm">
              <div>
                <span className="text-muted-foreground">Shape:</span>
                <span className="ml-1 font-medium">Die Cut</span>
              </div>
              <div>
                <span className="text-muted-foreground">Material:</span>
                <span className="ml-1 font-medium">{selectedMaterial.name}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Size:</span>
                <span className="ml-1 font-medium">{customWidth}" × {customHeight}"</span>
              </div>
              <div>
                <span className="text-muted-foreground">Qty:</span>
                <span className="ml-1 font-medium">{currentQty}</span>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center gap-4 ml-auto">
              <div className="text-right">
                <p className="text-2xl font-bold text-foreground">${totalPrice}</p>
                <p className="text-xs text-muted-foreground">${adjustedUnitPrice}/ea</p>
              </div>
              <Button 
                className="bg-teal hover:bg-teal/90 text-white px-8 py-3 font-bold rounded-full"
                onClick={() => uploadedImage ? setIsEditorOpen(true) : fileInputRef.current?.click()}
              >
                {uploadedImage ? "CHECKOUT" : "DESIGN NOW"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DieCutStickers;
