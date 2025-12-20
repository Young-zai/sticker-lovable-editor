import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Newsletter from "@/components/Newsletter";
import ProductionWorkflow from "@/components/ProductionWorkflow";
import { Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import rollLabelsImg from "@/assets/products/roll-labels.png";
import sheetLabelsImg from "@/assets/products/sheet-labels.png";
import dieCutImg from "@/assets/products/die-cut-stickers.png";
import holographicImg from "@/assets/products/holographic-stickers.png";

// Roll labels data
const rollLabels = [
  { id: "die-cut-roll", title: "Die Cut Roll Labels", image: rollLabelsImg, href: "/labels/die-cut-roll" },
  { id: "circle-roll", title: "Circle Roll Labels", image: rollLabelsImg, href: "/labels/circle-roll" },
  { id: "square-roll", title: "Square Roll Labels", image: rollLabelsImg, href: "/labels/square-roll" },
  { id: "rectangle-roll", title: "Rectangle Roll Labels", image: rollLabelsImg, href: "/labels/rectangle-roll" },
  { id: "oval-roll", title: "Oval Roll Labels", image: rollLabelsImg, href: "/labels/oval-roll" },
  { id: "rounded-roll", title: "Rounded Corner Roll Labels", image: rollLabelsImg, href: "/labels/rounded-roll" },
];

// Sheet labels data
const sheetLabels = [
  { id: "die-cut-sheet", title: "Die Cut Sheet Labels", image: sheetLabelsImg, href: "/labels/die-cut-sheet" },
  { id: "circle-sheet", title: "Circle Sheet Labels", image: sheetLabelsImg, href: "/labels/circle-sheet" },
  { id: "square-sheet", title: "Square Sheet Labels", image: sheetLabelsImg, href: "/labels/square-sheet" },
  { id: "rectangle-sheet", title: "Rectangle Sheet Labels", image: sheetLabelsImg, href: "/labels/rectangle-sheet" },
  { id: "oval-sheet", title: "Oval Sheet Labels", image: sheetLabelsImg, href: "/labels/oval-sheet" },
  { id: "rounded-sheet", title: "Rounded Corner Sheet Labels", image: sheetLabelsImg, href: "/labels/rounded-sheet" },
];

// Comparison table data
const comparisonData = [
  { feature: "Application", rollLabels: "Automatic / Fast manual", sheetLabels: "Manual" },
  { feature: "Order Size", rollLabels: "Large volume", sheetLabels: "Small to medium" },
  { feature: "Cost Efficiency", rollLabels: "Best for large runs", sheetLabels: "Best for low quantities" },
  { feature: "Multiple Designs", rollLabels: "No, usually 1 per roll", sheetLabels: "Yes" },
  { feature: "Storage", rollLabels: "Needs space", sheetLabels: "Easy, flat" },
  { feature: "Best For", rollLabels: "Product packaging, factories", sheetLabels: "Small shops, crafts, events" },
];

// FAQ data
const faqs = [
  { question: "How can I place an order?", answer: "Browse our collection, add your desired items to your cart, and proceed to checkout. You can complete your purchase using various payment methods." },
  { question: "Can I return an item?", answer: "Yes! If unsatisfied with your purchase, you can return items within 30 days of receiving your order. Please ensure items are in their original condition and packaging." },
  { question: "How can I stay updated with your promos?", answer: "To stay in the loop, subscribe to our newsletter! You'll receive exclusive updates on new arrivals, sales, and tips straight to your inbox." },
];


// Related collections
const relatedCollections = [
  { title: "Custom Labels", href: "/labels", image: rollLabelsImg },
  { title: "Label Materials", href: "/labels/materials", image: sheetLabelsImg },
  { title: "Custom Stickers", href: "/stickers", image: dieCutImg },
];

const LabelFormats = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#c4a77d] via-[#d4b896] to-background pb-16 pt-10">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Title & Rating */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                Label Formats
              </h1>
              <div className="flex items-center gap-2 bg-white/90 rounded-full px-4 py-2 shadow-sm">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warm-orange text-warm-orange" />
                  ))}
                </div>
                <span className="text-sm font-medium text-muted-foreground">768 reviews</span>
              </div>
            </div>
            <p className="text-white/90 max-w-2xl">
              Choose the right label format for your products and packaging. Select{" "}
              <Link to="/labels/roll" className="font-bold underline underline-offset-2 hover:text-peach">sheet labels</Link> for small batches, hand application, and easy storage, or choose{" "}
              <Link to="/labels/sheet" className="font-bold underline underline-offset-2 hover:text-peach">roll labels</Link> for high-volume use, fast dispensing, and compatibility with label applicator machines. Available in multiple shapes and sizes to match your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Labels Grid Section */}
      <section className="py-16 bg-[#e8dfd3]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Roll Labels */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-coral rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">↓</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Roll Labels</h2>
                  <p className="text-sm text-muted-foreground">Best for large volume</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {rollLabels.map((label) => (
                  <Link
                    key={label.id}
                    to={label.href}
                    className="group bg-white rounded-xl p-3 flex flex-col items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="w-16 h-16 mb-2">
                      <img src={label.image} alt={label.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-xs font-semibold text-teal text-center">{label.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sheet Labels */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-foreground text-lg">⌐</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Sheet Labels</h2>
                  <p className="text-sm text-muted-foreground">Best for small batches</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {sheetLabels.map((label) => (
                  <Link
                    key={label.id}
                    to={label.href}
                    className="group bg-white rounded-xl p-3 flex flex-col items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="w-16 h-16 mb-2">
                      <img src={label.image} alt={label.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-xs font-semibold text-teal text-center">{label.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Roll vs Sheet Labels
          </h2>
          
          <div className="bg-background rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-4 font-semibold text-foreground">Features</th>
                    <th className="text-left px-6 py-4 font-semibold text-coral">Roll Labels</th>
                    <th className="text-left px-6 py-4 font-semibold text-teal">Sheet Labels</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-foreground">{row.feature}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.rollLabels}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.sheetLabels}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Production Workflow */}
      <ProductionWorkflow />

      {/* FAQ Section */}
      <section className="py-16 bg-peach/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                FAQs for Label Formats
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

      {/* Related Collection */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Related Collection
          </h2>
          
          <div className="grid grid-cols-3 gap-6">
            {relatedCollections.map((collection, index) => (
              <Link
                key={index}
                to={collection.href}
                className="group bg-peach/30 hover:bg-peach/50 rounded-2xl p-6 flex flex-col items-center transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-20 h-20 mb-4">
                  <img src={collection.image} alt={collection.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm font-semibold text-foreground text-center">{collection.title}</span>
              </Link>
            ))}
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
                <div className="text-sm text-muted-foreground mt-1">Based on 1,028 Reviews</div>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm w-3">{rating}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-warm-orange rounded-full"
                        style={{ width: rating === 5 ? '85%' : rating === 4 ? '12%' : '3%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-border pt-6">
              <p className="text-muted-foreground text-sm italic">
                "Roll labels saved us so much time! Perfect for our high-volume product line."
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center text-teal font-bold text-sm">D</div>
                <span className="font-semibold text-sm">David K.</span>
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

export default LabelFormats;
