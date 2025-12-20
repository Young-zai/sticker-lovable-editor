import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Newsletter from "@/components/Newsletter";

import foodBeverageImg from "@/assets/industries/food-beverage.png";
import beautyCosmeticsImg from "@/assets/industries/beauty-cosmetics.png";
import techStartupsImg from "@/assets/industries/tech-startups.png";
import retailEcommerceImg from "@/assets/industries/retail-ecommerce.png";
import eventsEntertainmentImg from "@/assets/industries/events-entertainment.png";
import cannabisImg from "@/assets/industries/cannabis.png";
import healthcareImg from "@/assets/industries/healthcare.png";
import nonprofitImg from "@/assets/industries/nonprofit.png";

const industries = [
  {
    id: "food-beverage",
    title: "Food & Beverage",
    description: "FDA-compliant labels for restaurants, breweries, coffee shops, and food products.",
    features: ["Waterproof labels", "Food-safe materials", "Custom shapes"],
    image: foodBeverageImg,
  },
  {
    id: "beauty-cosmetics",
    title: "Beauty & Cosmetics",
    description: "Elegant labels and stickers for skincare, makeup, and personal care products.",
    features: ["Luxury finishes", "Oil-resistant", "Elegant designs"],
    image: beautyCosmeticsImg,
  },
  {
    id: "tech-startups",
    title: "Tech & Startups",
    description: "Laptop stickers, swag, and branded materials for tech companies and startups.",
    features: ["Die-cut logos", "Bulk pricing", "Fast turnaround"],
    image: techStartupsImg,
  },
  {
    id: "retail-ecommerce",
    title: "Retail & E-commerce",
    description: "Packaging stickers, thank you cards, and branded materials for online sellers.",
    features: ["Custom packaging", "Thank you stickers", "Brand consistency"],
    image: retailEcommerceImg,
  },
  {
    id: "events-entertainment",
    title: "Events & Entertainment",
    description: "Banners, decals, and promotional materials for concerts, festivals, and events.",
    features: ["Large format printing", "Event signage", "Quick setup"],
    image: eventsEntertainmentImg,
  },
  {
    id: "cannabis",
    title: "Cannabis & CBD",
    description: "Compliant labels and packaging for dispensaries and cannabis brands.",
    features: ["Compliance-ready", "Tamper-evident", "Custom warnings"],
    image: cannabisImg,
  },
  {
    id: "healthcare",
    title: "Healthcare & Wellness",
    description: "Labels for supplements, vitamins, medical devices, and healthcare products.",
    features: ["Regulatory compliant", "Clear instructions", "Durable materials"],
    image: healthcareImg,
  },
  {
    id: "nonprofit",
    title: "Nonprofits & Causes",
    description: "Awareness stickers, fundraising materials, and campaign merchandise.",
    features: ["Bulk discounts", "Eco-friendly options", "Mission-driven"],
    image: nonprofitImg,
  },
];

const Industries = () => {
  return (
    <Layout>
      <PageHeader
        badge="Industry Solutions"
        title="Made For Your"
        highlight="Industry"
        description="Specialized sticker and label solutions tailored to your industry's unique requirements and compliance needs."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <div
                key={industry.id}
                className="group relative bg-card rounded-3xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5 aspect-square md:aspect-auto overflow-hidden">
                    <img 
                      src={industry.image} 
                      alt={industry.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="md:w-3/5 p-8">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {industry.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {industry.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {industry.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <Link to={`/industries/${industry.id}`}>
                      <Button variant="ghost" className="p-0 h-auto font-semibold text-primary hover:text-primary/80">
                        Explore Solutions
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Don't See Your Industry?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We work with businesses of all types and sizes. Get in touch for a custom solution tailored to your specific needs.
          </p>
          <Button size="lg" className="rounded-full px-8 font-bold">
            Contact Us
          </Button>
        </div>
      </section>

      <Newsletter />
    </Layout>
  );
};

export default Industries;
