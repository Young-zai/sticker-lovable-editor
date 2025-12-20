import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import coffeeShops from "@/assets/industries/coffee-shops.png";
import candleBrands from "@/assets/industries/candle-brands.png";
import beautyWellness from "@/assets/industries/beauty-wellness.png";
import packagingBranding from "@/assets/industries/packaging-branding.png";
import creativePersonal from "@/assets/industries/creative-personal.png";

const industries = [
  {
    name: "Coffee Shops",
    description: "Custom labels and stickers for cups, bags, and branding.",
    image: coffeeShops,
    href: "/industries/coffee-shops",
  },
  {
    name: "Candle Brands",
    description: "Elegant labels that elevate your candle packaging.",
    image: candleBrands,
    href: "/industries/candle-brands",
  },
  {
    name: "Beauty & Wellness",
    description: "Premium stickers for cosmetics and skincare products.",
    image: beautyWellness,
    href: "/industries/beauty-wellness",
  },
  {
    name: "Packaging & Branding",
    description: "Make your packaging memorable with custom stickers.",
    image: packagingBranding,
    href: "/industries/packaging-branding",
  },
  {
    name: "Creative & Personal",
    description: "Express yourself with unique, personalized stickers.",
    image: creativePersonal,
    href: "/industries/creative-personal",
  },
];

const IndustriesSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            WHO WE SERVE
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            Industries & <span className="text-gradient">Use Cases</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Trusted by businesses and creators across various industries
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured Card - Coffee Shops */}
          <Link
            to={industries[0].href}
            className="group md:col-span-2 lg:col-span-1 lg:row-span-2"
          >
            <div className="relative h-full min-h-[320px] lg:min-h-full rounded-3xl overflow-hidden">
              <img
                src={industries[0].image}
                alt={industries[0].name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {industries[0].name}
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  {industries[0].description}
                </p>
                <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>

          {/* Card 2 - Candle Brands */}
          <Link to={industries[1].href} className="group">
            <div className="relative h-[280px] rounded-3xl overflow-hidden">
              <img
                src={industries[1].image}
                alt={industries[1].name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                  {industries[1].name}
                </h3>
                <p className="text-white/70 text-sm line-clamp-2">
                  {industries[1].description}
                </p>
              </div>
            </div>
          </Link>

          {/* Card 3 - Beauty & Wellness */}
          <Link to={industries[2].href} className="group">
            <div className="relative h-[280px] rounded-3xl overflow-hidden">
              <img
                src={industries[2].image}
                alt={industries[2].name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                  {industries[2].name}
                </h3>
                <p className="text-white/70 text-sm line-clamp-2">
                  {industries[2].description}
                </p>
              </div>
            </div>
          </Link>

          {/* Card 4 - Packaging & Branding */}
          <Link to={industries[3].href} className="group">
            <div className="relative h-[280px] rounded-3xl overflow-hidden">
              <img
                src={industries[3].image}
                alt={industries[3].name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                  {industries[3].name}
                </h3>
                <p className="text-white/70 text-sm line-clamp-2">
                  {industries[3].description}
                </p>
              </div>
            </div>
          </Link>

          {/* Card 5 - Creative & Personal */}
          <Link to={industries[4].href} className="group">
            <div className="relative h-[280px] rounded-3xl overflow-hidden">
              <img
                src={industries[4].image}
                alt={industries[4].name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                  {industries[4].name}
                </h3>
                <p className="text-white/70 text-sm line-clamp-2">
                  {industries[4].description}
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/industries"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors hover:gap-3"
          >
            Explore All Industries <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
