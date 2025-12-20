import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import holographicImg from "@/assets/products/holographic-stickers.png";
import chromeImg from "@/assets/products/chrome-stickers.png";
import glitterImg from "@/assets/products/glitter-stickers.png";
import clearImg from "@/assets/products/clear-stickers.png";

const materials = [
  {
    id: "holographic",
    title: "Holographic",
    description: "Prismatic sheen that makes simple art look legendary.",
    image: holographicImg,
    href: "/stickers",
  },
  {
    id: "chrome",
    title: "Chrome",
    description: "High-gloss metal look that screams premium on arrival.",
    image: chromeImg,
    href: "/stickers",
  },
  {
    id: "glitter",
    title: "Glitter",
    description: "Party-grade shimmer, sealed in and seriously durable.",
    image: glitterImg,
    href: "/stickers",
  },
  {
    id: "clear",
    title: "Clear",
    description: "See-through strength; subtle at first, unmissable later.",
    image: clearImg,
    href: "/stickers",
  },
];

const PremiumMaterials = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
            SPECIAL EFFECTS
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground">
            Premium<span className="text-gradient">Materials</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((material, index) => (
            <Link
              key={material.id}
              to={material.href}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden product-card-shadow hover:product-card-shadow-hover transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={material.image}
                alt={material.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              
              {/* Permanent gradient overlay */}
              <div className="absolute inset-0 material-overlay" />
              
              {/* Holographic shine on hover */}
              <div className="absolute inset-0 holographic-shine opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
              
              {/* Content - always visible at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-black mb-2 drop-shadow-lg">
                  {material.title}
                </h3>
                <p className="text-white/80 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {material.description}
                </p>
                <span className="inline-flex items-center text-primary-foreground bg-primary/90 px-4 py-2 rounded-full font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  SHOP NOW
                  <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumMaterials;
