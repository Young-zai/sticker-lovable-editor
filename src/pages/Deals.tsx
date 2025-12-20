import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Tag, Percent, Clock, Zap } from "lucide-react";
import Newsletter from "@/components/Newsletter";

import bulkStickersImg from "@/assets/products/bulk-stickers.png";
import starterKitImg from "@/assets/products/starter-kit.png";
import holographicDealImg from "@/assets/products/holographic-deal.png";
import labelBundleImg from "@/assets/products/label-bundle.png";

const deals = [
  {
    id: "bulk-stickers",
    title: "Bulk Sticker Pack",
    description: "500+ die-cut stickers at wholesale prices. Perfect for events and giveaways.",
    originalPrice: "$199",
    salePrice: "$149",
    discount: "25% OFF",
    image: bulkStickersImg,
    endDate: "Limited Time",
  },
  {
    id: "starter-kit",
    title: "Starter Kit Bundle",
    description: "100 stickers + 50 labels + 1 banner. Everything you need to launch.",
    originalPrice: "$149",
    salePrice: "$99",
    discount: "33% OFF",
    image: starterKitImg,
    endDate: "This Week Only",
  },
  {
    id: "holographic-deal",
    title: "Holographic Special",
    description: "Get 200 holographic stickers at an unbeatable price.",
    originalPrice: "$89",
    salePrice: "$59",
    discount: "34% OFF",
    image: holographicDealImg,
    endDate: "48 Hours Left",
  },
  {
    id: "label-bundle",
    title: "Label Mega Bundle",
    description: "1000 roll labels in any design. Best value for businesses.",
    originalPrice: "$299",
    salePrice: "$199",
    discount: "33% OFF",
    image: labelBundleImg,
    endDate: "Flash Sale",
  },
];

const Deals = () => {
  return (
    <Layout>
      <PageHeader
        badge="Limited Time Offers"
        title="Hot"
        highlight="Deals"
        description="Save big on premium stickers, labels, and banners. New deals added weekly!"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Deal highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 text-center">
              <Percent className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-foreground">Up to 35% Off</h3>
              <p className="text-muted-foreground text-sm">On selected items</p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 text-center">
              <Zap className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-foreground">Free Shipping</h3>
              <p className="text-muted-foreground text-sm">On orders $50+</p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 text-center">
              <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-foreground">Fast Turnaround</h3>
              <p className="text-muted-foreground text-sm">Ships in 3-5 days</p>
            </div>
          </div>

          {/* Deals grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {deals.map((deal) => (
              <div
                key={deal.id}
                className="group relative bg-card rounded-3xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
              >
                <div className="absolute top-4 right-4 z-10 px-4 py-2 bg-destructive text-destructive-foreground text-sm font-bold rounded-full">
                  {deal.discount}
                </div>

                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 aspect-square md:aspect-auto overflow-hidden">
                    <img 
                      src={deal.image} 
                      alt={deal.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-accent" />
                      <span className="text-accent text-sm font-semibold">{deal.endDate}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {deal.title}
                    </h3>

                    <p className="text-muted-foreground mb-6">{deal.description}</p>

                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-3xl font-black text-primary">{deal.salePrice}</span>
                      <span className="text-xl text-muted-foreground line-through">{deal.originalPrice}</span>
                    </div>

                    <Button className="w-full rounded-full font-bold">
                      Grab This Deal
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </Layout>
  );
};

export default Deals;
