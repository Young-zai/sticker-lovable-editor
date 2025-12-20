import { Sparkles, Zap, Shield, Percent } from "lucide-react";
import catSticker from "@/assets/decorative/cat-sticker.png";
import starSticker from "@/assets/decorative/star-sticker.png";
import heartSticker from "@/assets/decorative/heart-sticker.png";
import rainbowSticker from "@/assets/decorative/rainbow-sticker.png";

const features = [
  {
    icon: Sparkles,
    title: "Custom Everything",
    description: "From tiny cuts to giant decals—any shape, any size, your way.",
  },
  {
    icon: Zap,
    title: "Super-Fast Production",
    description: "Instant proofs + Quick 1-day turnaround + Free U.S. shipping.",
  },
  {
    icon: Shield,
    title: "Made To Endure",
    description: "Rain, sun, coffee spills—your stickers stay bright and bold.",
  },
  {
    icon: Percent,
    title: "Better Prices In Bulk",
    description: "The more you order, the more you save. Simple and sweet.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          {/* Left side - Features */}
          <div className="space-y-8 lg:pl-20 xl:pl-32 2xl:pl-40">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4 items-start group">
                <div className="w-14 h-14 rounded-xl bg-lavender/50 flex items-center justify-center flex-shrink-0 group-hover:bg-lavender group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Title and Stickers */}
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-center mb-8">
              Why <span className="text-teal">Sticker Kiko</span> ?
            </h2>
            
            {/* Stacked stickers */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
              <img 
                src={rainbowSticker} 
                alt="" 
                className="absolute top-0 left-0 w-24 md:w-28 lg:w-32 rotate-[-15deg] animate-wiggle-slow drop-shadow-lg z-10"
              />
              <img 
                src={starSticker} 
                alt="" 
                className="absolute top-4 right-0 w-20 md:w-24 lg:w-28 rotate-[10deg] animate-bounce-soft drop-shadow-lg z-20"
              />
              <img 
                src={heartSticker} 
                alt="" 
                className="absolute bottom-0 left-4 w-18 md:w-22 lg:w-26 rotate-[5deg] animate-wiggle drop-shadow-lg z-30"
              />
              <img 
                src={catSticker} 
                alt="" 
                className="absolute bottom-2 right-4 w-24 md:w-28 lg:w-32 rotate-[-8deg] animate-bounce-soft drop-shadow-lg z-40"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
