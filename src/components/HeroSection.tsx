import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileCheck, Clock, Truck } from "lucide-react";

// Import product images for category cards
import dieCutCategory from "@/assets/products/die-cut-category.png";
import holographicCategory from "@/assets/products/holographic-category.png";
import glitterCategory from "@/assets/products/glitter-category.png";
import stickerSheetsCategory from "@/assets/products/sticker-sheets-category.png";

const featureBadges = [
  { icon: FileCheck, label: "Instant proof" },
  { icon: Clock, label: "1-day turnaround" },
  { icon: Truck, label: "Free shipping" },
];

const categoryCards = [
  { title: "Die Cut Stickers", image: dieCutCategory, link: "/stickers/die-cut" },
  { title: "Holographic Stickers", image: holographicCategory, link: "/stickers/holographic" },
  { title: "Glitter Stickers", image: glitterCategory, link: "/stickers/glitter" },
  { title: "Sticker Sheets", image: stickerSheetsCategory, link: "/stickers/sheets" },
];

const HeroSection = () => {
  return (
    <section className="relative pb-8 md:pb-12 overflow-hidden">
      {/* Large background area with gradient */}
      <div className="relative min-h-[380px] md:min-h-[420px] lg:min-h-[460px] bg-gradient-to-br from-peach via-primary/30 to-lavender pt-12 md:pt-16 pb-32 md:pb-40">
        {/* Center content */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 text-foreground">
              <span className="font-handwriting text-5xl md:text-6xl lg:text-7xl text-teal">Make Your Ideas</span>
              <br />
              <span className="font-handwriting text-5xl md:text-6xl lg:text-7xl">Stick Around</span>
            </h1>

            <Button
              size="lg"
              className="rounded-full px-8 font-bold text-base h-12 bg-soft-yellow hover:bg-soft-yellow/90 text-foreground border-0 shadow-md hover:shadow-lg transition-all duration-300"
              asChild
            >
              <Link to="/stickers">Make Custom Stickers</Link>
            </Button>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-10">
              {featureBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2 text-foreground/80">
                  <badge.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category cards - overlapping section */}
      <div className="container mx-auto px-4 relative z-30 -mt-24 md:-mt-32">
        <div className="bg-background rounded-2xl md:rounded-3xl shadow-2xl py-6 md:py-8 px-8 md:px-16 border border-border/20 max-w-4xl mx-auto">
          {/* Section title */}
          <h2 className="text-xl md:text-2xl font-bold text-center text-foreground mb-6">
            Discover Our Best-Sellers
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categoryCards.map((card, index) => (
              <Link
                key={index}
                to={card.link}
                className="group flex flex-col items-center text-center"
              >
                <div className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-2xl bg-gradient-to-br from-lavender/60 to-primary/30 flex items-center justify-center mb-3 md:mb-4 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 border border-primary/20 p-4">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-contain drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300"
                  />
                </div>
                <span className="text-sm md:text-base font-semibold text-foreground group-hover:text-teal transition-colors duration-300 leading-tight">
                  {card.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Get 10% Off Side Tab */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:block">
        <div
          className="side-tab-gradient text-white py-4 px-2 rounded-l-lg cursor-pointer hover:px-3 transition-all duration-300 shadow-lg animate-pulse-glow"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
          }}
        >
          <span className="font-bold text-sm tracking-wider">GET 10% OFF</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;