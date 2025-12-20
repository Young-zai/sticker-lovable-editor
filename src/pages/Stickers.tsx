import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Newsletter from "@/components/Newsletter";
import { ArrowRight, Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import dieCutImg from "@/assets/products/die-cut-stickers.png";
import kissCutImg from "@/assets/products/kiss-cut-stickers.png";
import holographicImg from "@/assets/products/holographic-stickers.png";
import glitterImg from "@/assets/products/glitter-stickers.png";
import clearImg from "@/assets/products/clear-stickers.png";
import matteImg from "@/assets/products/matte-stickers.png";
import glossyImg from "@/assets/products/glossy-stickers.png";
import chromeImg from "@/assets/products/chrome-stickers.png";

// Hero分类卡片 - SEO优化版本
const heroCategories = [
  {
    id: "types",
    title: "Sticker Types",
    description: "Die-cut, kiss-cut, sheets & more printing options",
    href: "/stickers/types",
    images: [dieCutImg, kissCutImg],
    keywords: "die cut stickers, kiss cut stickers, sticker sheets",
  },
  {
    id: "shapes",
    title: "Sticker Shapes",
    description: "Circle, square, rectangle & custom shapes available",
    href: "/stickers/shapes",
    images: [dieCutImg],
    keywords: "circle stickers, square stickers, custom shape stickers",
  },
  {
    id: "materials",
    title: "Sticker Materials",
    description: "Vinyl, holographic, glitter & premium finishes",
    href: "/stickers/materials",
    images: [holographicImg, glitterImg],
    keywords: "vinyl stickers, holographic stickers, glitter stickers",
  },
];

// 所有贴纸产品 - 按分类颜色区分
const allStickers = [
  // Sticker Types - coral
  { id: "die-cut", title: "Die Cut Stickers", image: dieCutImg, href: "/stickers/die-cut", color: "coral" },
  { id: "kiss-cut", title: "Kiss Cut Stickers", image: kissCutImg, href: "/stickers/kiss-cut", color: "coral" },
  { id: "sheets", title: "Sticker Sheets", image: kissCutImg, href: "/stickers/sheets", color: "coral" },
  { id: "packs", title: "Sticker Packs", image: holographicImg, href: "/stickers/packs", color: "coral" },
  { id: "static", title: "Static Stickers", image: clearImg, href: "/stickers/static-clings", color: "coral" },
  { id: "heavy-duty", title: "Heavy-Duty Stickers", image: matteImg, href: "/stickers/heavy-duty", color: "coral" },
  // Sticker Shapes - teal
  { id: "circle", title: "Circle Stickers", image: dieCutImg, href: "/stickers/circle", color: "teal" },
  { id: "square", title: "Square Stickers", image: dieCutImg, href: "/stickers/square", color: "teal" },
  { id: "rectangle", title: "Rectangle Stickers", image: kissCutImg, href: "/stickers/rectangle", color: "teal" },
  { id: "oval", title: "Oval Stickers", image: dieCutImg, href: "/stickers/oval", color: "teal" },
  { id: "rounded", title: "Rounded Corner Stickers", image: kissCutImg, href: "/stickers/rounded", color: "teal" },
  // Sticker Materials - lavender
  { id: "vinyl", title: "Vinyl Stickers", image: matteImg, href: "/stickers/vinyl", color: "lavender" },
  { id: "clear", title: "Clear Stickers", image: clearImg, href: "/stickers/clear", color: "lavender" },
  { id: "holographic", title: "Holographic Stickers", image: holographicImg, href: "/stickers/holographic", color: "lavender" },
  { id: "glitter", title: "Glitter Stickers", image: glitterImg, href: "/stickers/glitter", color: "lavender" },
  { id: "metallic-gold", title: "Metallic Gold Stickers", image: chromeImg, href: "/stickers/metallic-gold", color: "lavender" },
  { id: "metallic-silver", title: "Metallic Silver Stickers", image: chromeImg, href: "/stickers/metallic-silver", color: "lavender" },
  { id: "glow", title: "Glow-in-the-dark Stickers", image: glossyImg, href: "/stickers/glow-in-the-dark", color: "lavender" },
];

// 生产流程 - Soft Gradient Style
const workflowSteps = [
  {
    id: "upload",
    step: "01",
    title: "Upload Your Design",
    description: "Send us your artwork, logo, or photo – any file works.",
    gradient: "from-peach/60 to-coral/30",
    iconColor: "text-coral",
  },
  {
    id: "customize",
    step: "02",
    title: "Customize Sticker",
    description: "Choose size, shape, material & any quantity.",
    gradient: "from-mint/60 to-teal/30",
    iconColor: "text-teal",
  },
  {
    id: "proof",
    step: "03",
    title: "Instant Proof",
    description: "Receive instant digital proof. Unlimited edits before printing.",
    gradient: "from-lavender/60 to-primary/30",
    iconColor: "text-primary",
  },
  {
    id: "ship",
    step: "04",
    title: "Print & Ship",
    description: "1-day turnaround, with shipping from the U.S.",
    gradient: "from-soft-yellow/60 to-warm-orange/30",
    iconColor: "text-warm-orange",
  },
];

// FAQ数据
const faqs = [
  {
    question: "How can I place an order?",
    answer: "Browse our collection, add your desired items to your cart, and proceed to checkout. You can complete your purchase using various payment methods.",
  },
  {
    question: "Can I return an item?",
    answer: "Yes! If unsatisfied with your purchase, you can return items within 30 days of receiving your order. Please ensure items are in their original condition and packaging.",
  },
  {
    question: "How can I stay updated with your promos?",
    answer: "To stay in the loop, subscribe to our newsletter! You'll receive exclusive updates on new arrivals, sales, and tips straight to your inbox.",
  },
  {
    question: "What file formats do you accept?",
    answer: "We accept PNG, JPG, PDF, AI, EPS, and SVG files. For best results, upload high-resolution files (300 DPI or higher).",
  },
];

const Stickers = () => {
  return (
    <Layout>
      {/* Hero Section - Choucre Inspired Design */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-peach via-coral/20 to-lavender/30" />
        
        {/* Decorative Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill="hsl(var(--background))" fillOpacity="0.5"/>
            <path d="M0 60C240 100 480 20 720 60C960 100 1200 20 1440 60V80H0V60Z" fill="hsl(var(--background))"/>
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-10 pb-24 md:pt-14 md:pb-32">

          {/* Title & Reviews - Centered */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Custom Stickers
            </h1>
            
            {/* Reviews Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-md">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warm-orange text-warm-orange" />
                ))}
              </div>
              <span className="font-semibold text-foreground text-sm">1,198 reviews</span>
            </div>
          </div>

          {/* Subtitle - Centered */}
          <p className="text-center text-sm md:text-base text-foreground/80 max-w-xl mx-auto mb-10">
            Choose from multiple{" "}
            <Link to="/stickers/types" className="font-bold underline underline-offset-2 hover:text-primary transition-colors">
              sticker types
            </Link>
            ,{" "}
            <Link to="/stickers/shapes" className="font-bold underline underline-offset-2 hover:text-primary transition-colors">
              shapes
            </Link>
            , and{" "}
            <Link to="/stickers/materials" className="font-bold underline underline-offset-2 hover:text-primary transition-colors">
              materials
            </Link>{" "}
            to match your style and application needs
          </p>

          {/* Category Cards - Centered with Glass Effect */}
          <nav aria-label="Sticker categories" className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {heroCategories.map((category) => (
              <Link
                key={category.id}
                to={category.href}
                title={category.keywords}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl p-5 md:p-6 flex flex-col items-center hover:bg-white/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-white/50"
              >
                {/* Images Container */}
                <div className="relative w-full h-20 md:h-24 flex items-center justify-center mb-4">
                  {category.images.length > 1 ? (
                    <div className="relative flex items-center justify-center">
                      <img
                        src={category.images[0]}
                        alt={`${category.title} example`}
                        className="w-12 md:w-14 h-12 md:h-14 object-contain -rotate-12 absolute -left-2 drop-shadow group-hover:scale-110 transition-transform"
                      />
                      <img
                        src={category.images[1]}
                        alt={`${category.title} variety`}
                        className="w-14 md:w-16 h-14 md:h-16 object-contain rotate-6 relative z-10 drop-shadow-md group-hover:scale-110 transition-transform"
                      />
                    </div>
                  ) : (
                    <img
                      src={category.images[0]}
                      alt={`${category.title} example`}
                      className="w-16 md:w-20 h-16 md:h-20 object-contain drop-shadow-md group-hover:scale-110 transition-transform"
                    />
                  )}
                </div>

                {/* Title */}
                <h2 className="text-base md:text-lg font-bold text-foreground mb-1">
                  {category.title}
                </h2>

                {/* SEO Description */}
                <p className="text-xs md:text-sm text-foreground/70 text-center mb-3 leading-relaxed">
                  {category.description}
                </p>

                {/* Arrow Button */}
                <div className="w-9 h-9 rounded-full border-2 border-teal flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* All Stickers Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10">
            All Stickers
          </h2>

          {/* Stickers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {allStickers.map((sticker, index) => {
              const bgClass = sticker.color === 'coral' ? 'bg-coral' : sticker.color === 'teal' ? 'bg-teal' : 'bg-lavender';
              const hoverBgClass = sticker.color === 'coral' ? 'group-hover:bg-coral/5' : sticker.color === 'teal' ? 'group-hover:bg-teal/5' : 'group-hover:bg-lavender/5';
              const borderClass = sticker.color === 'coral' ? 'group-hover:border-coral/50' : sticker.color === 'teal' ? 'group-hover:border-teal/50' : 'group-hover:border-lavender/50';
              
              return (
                <Link
                  key={sticker.id}
                  to={sticker.href}
                  className="group relative bg-background rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  {/* Image */}
                  <div className={`aspect-square p-4 flex items-center justify-center transition-colors duration-300 ${hoverBgClass}`}>
                    <img
                      src={sticker.image}
                      alt={sticker.title}
                      className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Label */}
                  <div className={`${bgClass} px-4 py-3 transition-all duration-300 group-hover:px-5`}>
                    <p className="text-sm font-semibold text-white truncate">
                      {sticker.title}
                    </p>
                  </div>

                  {/* Hover Overlay Effect */}
                  <div className={`absolute inset-0 border-2 border-transparent rounded-xl transition-colors duration-300 ${borderClass} pointer-events-none`} />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Production Workflow Section - Compact Centered Design */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Header - Centered */}
          <div className="text-center mb-8 md:mb-10">
            <span className="text-sm font-medium text-teal uppercase tracking-wider">HOW IT WORKS</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
              Production Workflow
            </h2>
          </div>

          {/* Steps - Horizontal Cards with Arrows */}
          <div className="flex flex-wrap justify-center items-stretch max-w-5xl mx-auto">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                {/* Card */}
                <div 
                  className={`bg-gradient-to-br ${step.gradient} rounded-2xl p-5 md:p-6 w-[160px] md:w-[200px] text-center group hover:scale-105 transition-all duration-300 hover:shadow-xl border border-white/50`}
                >
                  {/* Step Number Badge */}
                  <span className={`inline-block text-xs font-bold ${step.iconColor} bg-white/80 px-3 py-1 rounded-full mb-3 shadow-sm`}>
                    STEP {step.step}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-sm md:text-base font-bold text-foreground mb-2 leading-tight">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-xs text-foreground/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow Connector - Hide on last item and mobile */}
                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:flex items-center px-2 md:px-4">
                    <svg 
                      className="w-6 h-6 md:w-8 md:h-8 text-teal/60" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13 7l5 5m0 0l-5 5m5-5H6" 
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Arrow Indicators */}
          <div className="flex lg:hidden justify-center mt-4 gap-2">
            {[1, 2, 3].map((_, i) => (
              <svg 
                key={i}
                className="w-4 h-4 text-teal/40" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-12 md:py-16 bg-peach/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-5 gap-8 items-start">
            {/* Left: Title and Decoration */}
            <div className="md:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                FAQs for Custom Stickers
              </h2>
              
              {/* Decorative element */}
              <div className="hidden md:block mt-6">
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 bg-lavender/40 rounded-full animate-bounce" style={{ animationDuration: "3s" }} />
                  <div className="absolute top-4 left-8 w-24 h-24 bg-coral/30 rounded-full" />
                  <div className="absolute bottom-2 right-4 text-6xl">🎨</div>
                </div>
              </div>
            </div>

            {/* Right: FAQ Accordion */}
            <div className="md:col-span-3 bg-background rounded-2xl p-6 shadow-sm">
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50">
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-4 text-sm">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Link
                to="/faq"
                className="inline-block mt-6 px-6 py-2.5 bg-teal text-white font-semibold rounded-full text-sm hover:bg-teal/90 transition-colors"
              >
                See All FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </Layout>
  );
};

export default Stickers;
