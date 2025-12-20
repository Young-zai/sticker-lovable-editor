import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import dieCutStickers from "@/assets/products/die-cut-stickers.png";

const SamplesSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Sticker Image */}
          <div className="relative">
            <div className="bg-muted rounded-3xl aspect-[4/3] flex items-center justify-center overflow-hidden">
              <img 
                src={dieCutStickers} 
                alt="Sample stickers pack" 
                className="w-3/4 h-3/4 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="lg:pl-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Need Some Samples?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Explore a curated pack of our most popular materials, finishes, and print effects—designed to help you choose with confidence.
            </p>
            <Button
              size="lg"
              className="rounded-full px-8 font-bold text-base h-12 bg-foreground hover:bg-foreground/90 text-background border-0 shadow-md hover:shadow-lg transition-all duration-300"
              asChild
            >
              <Link to="/samples">Explore More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SamplesSection;
