import { Link } from "react-router-dom";
import dieCutImg from "@/assets/products/die-cut-stickers.png";
import qrLabelsImg from "@/assets/products/qr-labels.png";
import sheetLabelsImg from "@/assets/products/sheet-labels.png";
import vinylBannerImg from "@/assets/products/vinyl-banner.png";

const products = [
  {
    id: "stickers",
    title: "Custom Stickers",
    subtitle: "Scope out every sticker flavor.",
    image: dieCutImg,
    href: "/stickers",
  },
  {
    id: "uses",
    title: "Sticker Uses",
    subtitle: "Explore the possibilities.",
    image: qrLabelsImg,
    href: "/industries",
  },
  {
    id: "labels",
    title: "Custom Labels",
    subtitle: "Browse the full label lineup.",
    image: sheetLabelsImg,
    href: "/labels",
  },
  {
    id: "banners",
    title: "Custom Banners",
    subtitle: "Create a bold banner.",
    image: vinylBannerImg,
    href: "/banners",
  },
];

const ProductShowcase = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <Link
              key={product.id}
              to={product.href}
              className="group text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-muted product-card-shadow group-hover:product-card-shadow-hover transition-all duration-500 group-hover:-translate-y-2">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Shine overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/0 group-hover:via-white/20 group-hover:to-white/10 transition-all duration-500" />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-1 group-hover:text-primary transition-colors duration-300">
                {product.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {product.subtitle}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
