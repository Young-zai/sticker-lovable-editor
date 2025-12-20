import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Newsletter from "@/components/Newsletter";
import ProductionWorkflow from "@/components/ProductionWorkflow";
import { ArrowRight, Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import rollLabelsImg from "@/assets/products/roll-labels.png";
import sheetLabelsImg from "@/assets/products/sheet-labels.png";
import dieCutImg from "@/assets/products/die-cut-stickers.png";

// Hero categories
const heroCategories = [
  {
    id: "formats",
    title: "Formats",
    description: "Roll labels, sheet labels & more",
    href: "/labels/formats",
    image: rollLabelsImg,
  },
  {
    id: "materials",
    title: "Materials",
    description: "Vinyl, clear, matte & specialty finishes",
    href: "/labels/materials",
    image: sheetLabelsImg,
  },
];

// All labels - Roll Labels
const rollLabels = [
  { id: "die-cut-roll", title: "Die Cut Roll Labels", image: rollLabelsImg, href: "/labels/die-cut-roll" },
  { id: "circle-roll", title: "Circle Roll Labels", image: rollLabelsImg, href: "/labels/circle-roll" },
  { id: "square-roll", title: "Square Roll Labels", image: rollLabelsImg, href: "/labels/square-roll" },
  { id: "rectangle-roll", title: "Rectangle Roll Labels", image: rollLabelsImg, href: "/labels/rectangle-roll" },
];

// All labels - Sheet Labels
const sheetLabels = [
  { id: "oval-roll", title: "Oval Roll Labels", image: rollLabelsImg, href: "/labels/oval-roll" },
  { id: "rounded-roll", title: "Rounded Corner Roll Labels", image: rollLabelsImg, href: "/labels/rounded-roll" },
  { id: "die-cut-sheet", title: "Die Cut Sheet Labels", image: sheetLabelsImg, href: "/labels/die-cut-sheet" },
  { id: "circle-sheet", title: "Circle Sheet Labels", image: sheetLabelsImg, href: "/labels/circle-sheet" },
];

// Sheet Labels Row 2
const sheetLabelsRow2 = [
  { id: "square-sheet", title: "Square Sheet Labels", image: sheetLabelsImg, href: "/labels/square-sheet" },
  { id: "rectangle-sheet", title: "Rectangle Sheet Labels", image: sheetLabelsImg, href: "/labels/rectangle-sheet" },
  { id: "oval-sheet", title: "Oval Sheet Labels", image: sheetLabelsImg, href: "/labels/oval-sheet" },
  { id: "rounded-sheet", title: "Rounded Corner Sheet Labels", image: sheetLabelsImg, href: "/labels/rounded-sheet" },
];

// All labels combined for grid
const allLabels = [...rollLabels, ...sheetLabels, ...sheetLabelsRow2];

// FAQ data
const faqs = [
  { question: "How can I place an order?", answer: "Browse our collection, add your desired items to your cart, and proceed to checkout. You can complete your purchase using various payment methods." },
  { question: "Can I return an item?", answer: "Yes! If unsatisfied with your purchase, you can return items within 30 days of receiving your order. Please ensure items are in their original condition and packaging." },
  { question: "How can I stay updated with your promos?", answer: "To stay in the loop, subscribe to our newsletter! You'll receive exclusive updates on new arrivals, sales, and tips straight to your inbox." },
];


const Labels = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#c4a77d] via-[#d4b896] to-background pb-20 pt-10">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Title & Rating */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Custom Labels
              </h1>
              <div className="flex items-center gap-2 bg-white/90 rounded-full px-4 py-2 shadow-sm">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warm-orange text-warm-orange" />
                  ))}
                </div>
                <span className="text-sm font-medium text-muted-foreground">1,168 reviews</span>
              </div>
            </div>
            <p className="text-white/90 max-w-2xl">
              Create custom labels for products, packaging, branding, and small businesses. Choose the right{" "}
              <Link to="/labels/materials" className="font-bold underline underline-offset-2 hover:text-peach">material</Link> and{" "}
              <Link to="/labels/formats" className="font-bold underline underline-offset-2 hover:text-peach">format</Link> to match your needs.
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-2 gap-6 max-w-md">
            {heroCategories.map((category) => (
              <Link
                key={category.id}
                to={category.href}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center hover:bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="w-24 h-24 mb-4">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <h2 className="text-lg font-bold text-foreground mb-1">{category.title}</h2>
                <div className="w-8 h-8 rounded-full border-2 border-teal flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-colors mt-2">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Labels Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10">
            All Labels
          </h2>

          {/* Labels Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {allLabels.map((label, index) => (
              <Link
                key={label.id}
                to={label.href}
                className="group bg-background rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div className="aspect-square p-4 flex items-center justify-center bg-muted/30 group-hover:bg-teal/5 transition-colors">
                  <img
                    src={label.image}
                    alt={label.title}
                    className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="bg-teal px-4 py-3 transition-all duration-300 group-hover:px-5">
                  <p className="text-sm font-semibold text-white truncate">
                    {label.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Production Workflow */}
      <ProductionWorkflow />

      {/* FAQ Section */}
      <section className="py-16 bg-[#c4a77d]/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                FAQs for Custom Labels
              </h2>
              <div className="hidden md:block mt-8">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 bg-coral/20 rounded-full" />
                  <div className="absolute top-6 left-10 w-28 h-28 bg-teal/20 rounded-full" />
                  <div className="absolute bottom-4 right-6 text-6xl">🏷️</div>
                </div>
              </div>
            </div>
            
            <div className="bg-background rounded-2xl p-6 shadow-sm">
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
              <Link to="/faq" className="inline-block mt-4 bg-soft-yellow hover:bg-warm-orange/20 text-foreground font-semibold px-6 py-2 rounded-full text-sm transition-colors">
                See All FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Customer Reviews
          </h2>
          
          <div className="bg-background rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground">4.9</div>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warm-orange text-warm-orange" />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground mt-1">Based on 1,168 Reviews</div>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm w-3">{rating}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-warm-orange rounded-full"
                        style={{ width: rating === 5 ? '88%' : rating === 4 ? '9%' : '3%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-border pt-6">
              <p className="text-muted-foreground text-sm italic">
                "These labels are perfect for our artisan products. The quality is outstanding and they look incredibly professional!"
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center text-teal font-bold text-sm">R</div>
                <span className="font-semibold text-sm">Rachel M.</span>
                <span className="text-xs text-muted-foreground">Verified Buyer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </Layout>
  );
};

export default Labels;
