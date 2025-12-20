import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import dieCutImg from "@/assets/products/die-cut-stickers.png";
import kissCutImg from "@/assets/products/kiss-cut-stickers.png";
import holographicImg from "@/assets/products/holographic-stickers.png";
import chromeImg from "@/assets/products/chrome-stickers.png";
import glitterImg from "@/assets/products/glitter-stickers.png";

const categories = [
  {
    id: "die-cut",
    title: "Die-Cut",
    fullTitle: "Die-Cut Stickers",
    description: "Custom shaped to perfectly match your design. No background, just your art. Perfect for branding, packaging, and personal expression.",
    image: dieCutImg,
    href: "/stickers/die-cut",
    price: "From $29",
  },
  {
    id: "kiss-cut",
    title: "Kiss-Cut",
    fullTitle: "Kiss-Cut Stickers",
    description: "Easy peel backing with precise cuts around your design. Ideal for sticker sheets and retail packaging.",
    image: kissCutImg,
    href: "/stickers/kiss-cut",
    price: "From $24",
  },
  {
    id: "holographic",
    title: "Holographic",
    fullTitle: "Holographic Stickers",
    description: "Prismatic rainbow effect that makes your design pop and shine. Eye-catching finish for standout branding.",
    image: holographicImg,
    href: "/stickers/holographic",
    price: "From $34",
  },
  {
    id: "chrome",
    title: "Chrome",
    fullTitle: "Chrome Stickers",
    description: "High-gloss metallic finish for a premium, eye-catching look. Perfect for luxury branding and special editions.",
    image: chromeImg,
    href: "/stickers/chrome",
    price: "From $39",
  },
  {
    id: "glitter",
    title: "Glitter",
    fullTitle: "Glitter Stickers",
    description: "Sparkly finish that adds festive shimmer to any design. Great for events, celebrations, and fun branding.",
    image: glitterImg,
    href: "/stickers/glitter",
    price: "From $36",
  },
];

const StickerCategoryTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute left-0 top-1/4 w-24 h-48 bg-soft-yellow/40 rounded-r-full -translate-x-1/2" />
      <div className="absolute right-0 top-1/3 w-24 h-48 bg-soft-yellow/40 rounded-l-full translate-x-1/2" />

      <div className="container mx-auto px-4">
        {/* Tabs with wave connector */}
        <div className="relative mb-12">
          {/* Wavy SVG connecting line */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 pointer-events-none hidden md:block max-w-4xl mx-auto">
            <svg
              viewBox="0 0 800 24"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0,12 C50,4 100,20 150,12 C200,4 250,20 300,12 C350,4 400,20 450,12 C500,4 550,20 600,12 C650,4 700,20 750,12 L800,12"
                fill="none"
                stroke="hsl(var(--coral))"
                strokeWidth="4"
                strokeLinecap="round"
                className="drop-shadow-sm"
              />
              {/* Secondary decorative wave */}
              <path
                d="M0,12 C50,20 100,4 150,12 C200,20 250,4 300,12 C350,20 400,4 450,12 C500,20 550,4 600,12 C650,20 700,4 750,12 L800,12"
                fill="none"
                stroke="hsl(var(--peach))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="8 12"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* Tab buttons */}
          <div className="relative z-10 flex flex-wrap justify-center gap-4 md:gap-0 md:justify-between max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ${
                  activeTab === index
                    ? "bg-teal text-white shadow-lg scale-105"
                    : "bg-lavender/50 text-foreground/80 hover:bg-lavender hover:text-foreground"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
          {/* Left: Text content */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {categories[activeTab].fullTitle}
            </h2>
            <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
              {categories[activeTab].description}
            </p>
            <p className="text-xl font-semibold text-teal mb-8">
              {categories[activeTab].price}
            </p>
            <Button
              size="lg"
              className="rounded-full px-8 font-bold bg-soft-yellow hover:bg-soft-yellow/90 text-foreground border-0 shadow-md"
              asChild
            >
              <Link to={categories[activeTab].href}>Shop Now</Link>
            </Button>
          </div>

          {/* Right: Image card */}
          <div className="order-1 md:order-2">
            <div className="relative bg-gradient-to-br from-teal/20 to-teal/40 rounded-3xl p-8 md:p-12 aspect-square flex items-center justify-center">
              {/* Decorative dotted border */}
              <div className="absolute inset-4 border-2 border-dashed border-white/30 rounded-2xl" />
              
              {/* Product image */}
              <img
                src={categories[activeTab].image}
                alt={categories[activeTab].fullTitle}
                className="w-3/4 h-3/4 object-contain drop-shadow-xl transition-all duration-500"
              />

              {/* Floating card effect */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg px-6 py-3">
                <p className="text-sm font-medium text-foreground">
                  ✨ Premium Quality
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StickerCategoryTabs;
