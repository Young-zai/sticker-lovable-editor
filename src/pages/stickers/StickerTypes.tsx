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
import clearImg from "@/assets/products/clear-stickers.png";
import matteImg from "@/assets/products/matte-stickers.png";
import glossyImg from "@/assets/products/glossy-stickers.png";

// Sticker types data
const stickerTypes = [
  { id: "die-cut", title: "Die Cut Stickers", image: dieCutImg, href: "/stickers/die-cut" },
  { id: "kiss-cut", title: "Kiss Cut Stickers", image: kissCutImg, href: "/stickers/kiss-cut" },
  { id: "sheets", title: "Sticker Sheets", image: kissCutImg, href: "/stickers/sheets" },
  { id: "packs", title: "Sticker Packs", image: holographicImg, href: "/stickers/packs" },
  { id: "static", title: "Static Stickers", image: clearImg, href: "/stickers/static-clings" },
  { id: "heavy-duty", title: "Heavy-Duty Stickers", image: matteImg, href: "/stickers/heavy-duty" },
];

// Comparison table data
const comparisonData = [
  { type: "Die Cut Stickers", adhesive: "Removable", bestFor: "Logos, branding, giveaways", keyFeature: "Precise cut to shape" },
  { type: "Kiss Cut Stickers", adhesive: "Removable", bestFor: "Easy-to-peel, delicate edges", keyFeature: "Sticker cut, backing stays intact" },
  { type: "Sticker Sheets", adhesive: "Removable", bestFor: "Bulk use, organization", keyFeature: "Multiple stickers on one sheet" },
  { type: "Sticker Packs", adhesive: "Removable", bestFor: "Easy to share, trade, and gift", keyFeature: "Curated sets of themed stickers" },
  { type: "Static Clings", adhesive: "No Adhesive", bestFor: "Temp displays, retail promos, car windows", keyFeature: "Stick without glue, easily removable" },
  { type: "Heavy-Duty Stickers", adhesive: "Permanent", bestFor: "Outdoor gear, equipment, tools, vehicles", keyFeature: "Industrial-Grade, thick, durable" },
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
  { title: "Sticker Shapes", href: "/stickers/shapes", image: kissCutImg },
  { title: "Sticker Materials", href: "/stickers/materials", image: holographicImg },
];

const StickerTypes = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-soft-yellow via-peach/30 to-background pb-16 pt-10">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Title & Rating */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Sticker Types
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
              Sticker types showcase the formats your custom stickers are produced in—such as{" "}
              <Link to="/stickers/die-cut" className="font-bold underline underline-offset-2 hover:text-primary">die-cut</Link>,{" "}
              <Link to="/stickers/kiss-cut" className="font-bold underline underline-offset-2 hover:text-primary">kiss-cut</Link>,{" "}
              <Link to="/stickers/sheets" className="font-bold underline underline-offset-2 hover:text-primary">sticker sheets</Link>, and{" "}
              <Link to="/stickers/packs" className="font-bold underline underline-offset-2 hover:text-primary">sticker packs</Link>.
              Each type offers a different way to present, peel, or distribute your stickers.
            </p>
          </div>

          {/* Sticker Types Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {stickerTypes.map((sticker) => (
              <Link
                key={sticker.id}
                to={sticker.href}
                className="group bg-soft-yellow hover:bg-warm-orange/20 rounded-2xl p-4 flex flex-col items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-20 h-20 mb-3">
                  <img src={sticker.image} alt={sticker.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm font-semibold text-foreground text-center">{sticker.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Choosing the Right Sticker Type
          </h2>
          
          <div className="bg-background rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-4 font-semibold text-foreground"></th>
                    <th className="text-left px-6 py-4 font-semibold text-foreground">Adhesive</th>
                    <th className="text-left px-6 py-4 font-semibold text-foreground">Best For</th>
                    <th className="text-left px-6 py-4 font-semibold text-foreground">Key Features</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-semibold text-foreground">{row.type}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.adhesive}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.bestFor}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.keyFeature}</td>
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
                FAQs for Sticker Types
              </h2>
              <div className="hidden md:block mt-8">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 bg-lavender/30 rounded-full" />
                  <div className="absolute top-6 left-10 w-28 h-28 bg-coral/20 rounded-full" />
                  <div className="absolute bottom-4 right-6 text-6xl">🎨</div>
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
                "Amazing quality, customer service, and fast turnaround time! Sticker Kiko can always count on them for exceptional products."
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center text-teal font-bold text-sm">S</div>
                <span className="font-semibold text-sm">Sarah M.</span>
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

export default StickerTypes;
