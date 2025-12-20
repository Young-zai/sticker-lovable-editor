import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Newsletter from "@/components/Newsletter";
import ProductionWorkflow from "@/components/ProductionWorkflow";
import { Star, Shapes, Palette, Zap } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import dieCutImg from "@/assets/products/die-cut-stickers.png";
import rollLabelsImg from "@/assets/products/roll-labels.png";
import holographicImg from "@/assets/products/holographic-stickers.png";
import clearImg from "@/assets/products/clear-stickers.png";
import glitterImg from "@/assets/products/glitter-stickers.png";
import chromeImg from "@/assets/products/chrome-stickers.png";
import candleLabelsImg from "@/assets/products/candle-labels.png";
import wineLabelsImg from "@/assets/products/wine-labels.png";
import foodLabelsImg from "@/assets/products/food-labels.png";

// Key benefits
const keyBenefits = [
  { icon: Shapes, title: "Custom Shapes", description: "Free custom fit for your one-of-a-kind labels" },
  { icon: Palette, title: "Multiple Materials", description: "A variety of glossy, matte or clear to match any style AND finish" },
  { icon: Zap, title: "Fast Turnaround & Free Shipping", description: "Get a 1-day turnaround time and free shipping for every order" },
];

// Use cases data
const useCases = [
  { id: "logo", title: "Logo Stickers", image: dieCutImg, href: "/use-cases/logo", color: "bg-peach" },
  { id: "laptop", title: "Custom Laptop Stickers", image: holographicImg, href: "/use-cases/laptop", color: "bg-mint" },
  { id: "bottle", title: "Bottle Stickers", image: clearImg, href: "/use-cases/bottle", color: "bg-lavender" },
  { id: "bumper", title: "Bumper Stickers", image: chromeImg, href: "/use-cases/bumper", color: "bg-soft-yellow" },
  { id: "window", title: "Window Clings", image: clearImg, href: "/use-cases/window", color: "bg-coral" },
  { id: "floor", title: "Floor Stickers", image: dieCutImg, href: "/use-cases/floor", color: "bg-teal" },
  { id: "packaging", title: "Box & Packaging Stickers", image: rollLabelsImg, href: "/use-cases/packaging", color: "bg-peach" },
  { id: "helmet", title: "Helmet Stickers", image: holographicImg, href: "/use-cases/helmet", color: "bg-mint" },
  { id: "brewery", title: "Brewery Labels", image: wineLabelsImg, href: "/use-cases/brewery", color: "bg-coral" },
  { id: "bakery", title: "Bakery Labels", image: foodLabelsImg, href: "/use-cases/bakery", color: "bg-soft-yellow" },
  { id: "honey", title: "Honey Labels", image: candleLabelsImg, href: "/use-cases/honey", color: "bg-warm-orange" },
  { id: "candle", title: "Candle Labels", image: candleLabelsImg, href: "/use-cases/candle", color: "bg-lavender" },
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
  { title: "Custom Stickers", href: "/stickers", image: dieCutImg },
];

const UseCases = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-peach via-coral/20 to-background pb-16 pt-10">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Title & Rating */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Use Cases for Stickers & Labels
            </h1>
            <div className="inline-flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 shadow-sm mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warm-orange text-warm-orange" />
                ))}
              </div>
              <span className="text-sm font-medium text-muted-foreground">768 reviews</span>
            </div>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              There are endless ways to use custom stickers and labels for businesses and products. Find ways we see customers use their stickers and labels in different industries and ways.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {keyBenefits.map((benefit, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center">
                <benefit.icon className="w-8 h-8 mx-auto mb-2 text-teal" />
                <h3 className="font-bold text-sm text-foreground mb-1">{benefit.title}</h3>
                <p className="text-xs text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {useCases.map((useCase, index) => (
              <Link
                key={useCase.id}
                to={useCase.href}
                className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`${useCase.color} aspect-square p-4 flex items-center justify-center`}>
                  <img 
                    src={useCase.image} 
                    alt={useCase.title} 
                    className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <span className="text-white text-sm font-semibold">{useCase.title}</span>
                </div>
              </Link>
            ))}
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
                FAQs for Use Cases
              </h2>
              <div className="hidden md:block mt-8">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 bg-mint/30 rounded-full" />
                  <div className="absolute top-6 left-10 w-28 h-28 bg-coral/20 rounded-full" />
                  <div className="absolute bottom-4 right-6 text-6xl">💡</div>
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
          
          <div className="grid grid-cols-2 gap-6 max-w-md">
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
                "Perfect for my small candle business! The labels look professional and survive the heat perfectly."
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-8 h-8 rounded-full bg-lavender/30 flex items-center justify-center text-primary font-bold text-sm">E</div>
                <span className="font-semibold text-sm">Emily W.</span>
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

export default UseCases;
