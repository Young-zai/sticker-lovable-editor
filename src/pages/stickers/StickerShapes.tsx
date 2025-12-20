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

import dieCutImg from "@/assets/products/die-cut-stickers.png";
import kissCutImg from "@/assets/products/kiss-cut-stickers.png";
import holographicImg from "@/assets/products/holographic-stickers.png";

// Shape images
import circleShape from "@/assets/shapes/circle-shape.png";
import squareShape from "@/assets/shapes/square-shape.png";
import rectangleShape from "@/assets/shapes/rectangle-shape.png";
import ovalShape from "@/assets/shapes/oval-shape.png";
import dieCutShape from "@/assets/shapes/die-cut-shape.png";

// Sticker shapes data
const stickerShapes = [
  { id: "custom", title: "Custom Shape", image: dieCutShape, href: "/stickers/die-cut" },
  { id: "circle", title: "Circle Stickers", image: circleShape, href: "/stickers/circle" },
  { id: "square", title: "Square Stickers", image: squareShape, href: "/stickers/square" },
  { id: "rectangle", title: "Rectangle Stickers", image: rectangleShape, href: "/stickers/rectangle" },
  { id: "oval", title: "Oval Stickers", image: ovalShape, href: "/stickers/oval" },
  { id: "rounded", title: "Rounded Corner Stickers", image: squareShape, href: "/stickers/rounded" },
];

// Comparison table data
const comparisonData = [
  { shape: "Circle Stickers", adhesive: "Removable", bestFor: "Logos, seals" },
  { shape: "Square Stickers", adhesive: "Removable", bestFor: "Labels, packaging" },
  { shape: "Rectangle Stickers", adhesive: "Removable", bestFor: "Info stickers, large area" },
  { shape: "Oval Stickers", adhesive: "Removable", bestFor: "Handmade branding" },
  { shape: "Custom Die Cut Stickers", adhesive: "Removable", bestFor: "Complex artwork" },
];

// FAQ data
const faqs = [
  { question: "How can I place an order?", answer: "Browse our collection, add your desired items to your cart, and proceed to checkout. You can complete your purchase using various payment methods." },
  { question: "Can I return an item?", answer: "Yes! If unsatisfied with your purchase, you can return items within 30 days of receiving your order. Please ensure items are in their original condition and packaging." },
  { question: "How can I stay updated with your promos?", answer: "To stay in the loop, subscribe to our newsletter! You'll receive exclusive updates on new arrivals, sales, and tips straight to your inbox." },
];


// Related collections
const relatedCollections = [
  { title: "Custom Stickers", href: "/stickers", image: dieCutImg },
  { title: "Sticker Types", href: "/stickers/types", image: kissCutImg },
  { title: "Sticker Materials", href: "/stickers/materials", image: holographicImg },
];

const StickerShapes = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-soft-yellow via-peach/30 to-background pb-16 pt-10">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Title & Rating */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Sticker Shapes
              </h1>
              <div className="flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 shadow-sm">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warm-orange text-warm-orange" />
                  ))}
                </div>
                <span className="text-sm font-medium text-muted-foreground">768 reviews</span>
              </div>
            </div>
            <p className="text-foreground/80 max-w-2xl">
              Sticker shapes determine how your design is cut—
              <Link to="/stickers/circle" className="font-bold underline underline-offset-2 hover:text-primary">circle</Link>,{" "}
              <Link to="/stickers/square" className="font-bold underline underline-offset-2 hover:text-primary">square</Link>,{" "}
              <Link to="/stickers/rectangle" className="font-bold underline underline-offset-2 hover:text-primary">rectangle</Link>,{" "}
              <Link to="/stickers/oval" className="font-bold underline underline-offset-2 hover:text-primary">oval</Link>, rounded corner, or fully{" "}
              <Link to="/stickers/die-cut" className="font-bold underline underline-offset-2 hover:text-primary">custom shapes</Link>.
              The right shape helps your artwork stand out and ensures perfect application across surfaces.
            </p>
          </div>

          {/* Sticker Shapes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {stickerShapes.map((shape) => (
              <Link
                key={shape.id}
                to={shape.href}
                className="group bg-soft-yellow hover:bg-warm-orange/20 rounded-2xl p-4 flex flex-col items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-20 h-20 mb-3">
                  <img src={shape.image} alt={shape.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm font-semibold text-foreground text-center">{shape.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Compare Sticker Shapes & Their Best Uses
          </h2>
          
          <div className="bg-background rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-4 font-semibold text-foreground"></th>
                    <th className="text-left px-6 py-4 font-semibold text-foreground">Adhesive</th>
                    <th className="text-left px-6 py-4 font-semibold text-foreground">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-semibold text-foreground">{row.shape}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.adhesive}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.bestFor}</td>
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
                FAQs for Sticker Shapes
              </h2>
              <div className="hidden md:block mt-8">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 bg-lavender/30 rounded-full" />
                  <div className="absolute top-6 left-10 w-28 h-28 bg-teal/20 rounded-full" />
                  <div className="absolute bottom-4 right-6 text-6xl">✨</div>
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
                "Perfect shapes every time! The circle stickers came out exactly as expected. Great quality and fast shipping."
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center text-coral font-bold text-sm">M</div>
                <span className="font-semibold text-sm">Mike T.</span>
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

export default StickerShapes;
