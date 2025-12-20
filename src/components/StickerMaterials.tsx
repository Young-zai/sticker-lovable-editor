import { Link } from "react-router-dom";
import vinylMaterial from "@/assets/materials/vinyl-material.png";
import clearMaterial from "@/assets/materials/clear-material.png";
import holographicMaterial from "@/assets/materials/holographic-material.png";
import glitterMaterial from "@/assets/materials/glitter-material.png";
import metallicMaterial from "@/assets/materials/metallic-material.png";
import glowMaterial from "@/assets/materials/glow-material.png";

const materials = [
  {
    name: "Vinyl Stickers",
    description: "Durable, waterproof, and perfect for indoor or outdoor use.",
    image: vinylMaterial,
    href: "/stickers/vinyl",
  },
  {
    name: "Clear Stickers",
    description: "Transparent background for a seamless, professional look.",
    image: clearMaterial,
    href: "/stickers/clear",
  },
  {
    name: "Holographic Stickers",
    description: "Eye-catching rainbow effects that shift with light.",
    image: holographicMaterial,
    href: "/stickers/holographic",
  },
  {
    name: "Glitter Stickers",
    description: "Sparkly finish that adds glamour to any design.",
    image: glitterMaterial,
    href: "/stickers/glitter",
  },
  {
    name: "Metallic Stickers",
    description: "Premium chrome finish for a luxurious, shiny appearance.",
    image: metallicMaterial,
    href: "/stickers/metallic",
  },
  {
    name: "Glow-in-the-dark",
    description: "Luminous stickers that shine bright in the dark.",
    image: glowMaterial,
    href: "/stickers/glow-in-the-dark",
  },
];

const StickerMaterials = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            PREMIUM QUALITY
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            Sticker <span className="text-gradient">Materials</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Choose from our wide range of premium materials to make your stickers stand out
          </p>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {materials.map((material) => (
            <Link
              key={material.name}
              to={material.href}
              className="group"
            >
              <div className="bg-background rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border">
                {/* Image */}
                <div className="aspect-square overflow-hidden bg-muted/50">
                  <img
                    src={material.image}
                    alt={material.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">
                    {material.name}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                    {material.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            to="/stickers"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            View All Materials →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StickerMaterials;
