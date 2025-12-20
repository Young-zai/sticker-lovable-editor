import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Martina",
    title: "Amazing Quality!",
    content: "I am so grateful that I found Sticker Kiko! They seriously went above and beyond and did an amazing job on my stickers for my business launch. I am telling everyone about them!",
  },
  {
    id: 2,
    name: "Jordan",
    title: "Perfect for My Brand",
    content: "The holographic stickers are absolutely stunning. My customers love them and they've become a signature part of my packaging. Will definitely order again!",
  },
  {
    id: 3,
    name: "Alex",
    title: "Fast & Professional",
    content: "Ordered custom labels for my candle business and they arrived faster than expected. The print quality is crisp and the colors are exactly what I wanted.",
  },
  {
    id: 4,
    name: "Sam",
    title: "Outstanding Service",
    content: "From design to delivery, everything was seamless. The team helped me perfect my artwork and the final stickers exceeded my expectations!",
  },
  {
    id: 5,
    name: "Taylor",
    title: "Best Stickers Ever!",
    content: "These stickers are waterproof, scratch-resistant, and look incredible on my products. My small business has never looked more professional.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
            POWERED BY
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground">
            People<span className="text-gradient">Like You</span>
          </h2>
        </div>

        {/* Scrolling testimonials */}
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />

          <div className="flex animate-scroll">
            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-[350px] mx-4 p-6 bg-background rounded-2xl product-card-shadow hover:product-card-shadow-hover transition-all duration-300 hover:-translate-y-1"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                
                <h4 className="font-bold text-foreground text-lg mb-2">
                  {testimonial.title}
                </h4>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {testimonial.content}
                </p>
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
