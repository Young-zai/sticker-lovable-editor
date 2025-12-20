import { Shield, Truck, Award, Clock, ThumbsUp, Leaf } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "100% satisfaction guaranteed",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $75",
  },
  {
    icon: Award,
    title: "Premium Materials",
    description: "Waterproof & UV resistant",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Ships in 3-5 business days",
  },
  {
    icon: ThumbsUp,
    title: "50,000+ Happy Customers",
    description: "Trusted by creators worldwide",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Sustainable materials available",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <badge.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1">
                {badge.title}
              </h3>
              <p className="text-muted-foreground text-xs">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
