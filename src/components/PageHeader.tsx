import pizzaSticker from "@/assets/decorative/pizza-sticker.png";
import donutSticker from "@/assets/decorative/donut-sticker.png";
import burgerSticker from "@/assets/decorative/burger-hq.png";
import iceCreamSticker from "@/assets/decorative/ice-cream-sticker.png";
import starSticker from "@/assets/decorative/star-sticker.png";
import heartSticker from "@/assets/decorative/heart-sticker.png";
import rocketSticker from "@/assets/decorative/rocket-sticker.png";
import rainbowSticker from "@/assets/decorative/rainbow-sticker.png";
import catSticker from "@/assets/decorative/cat-sticker.png";
import lightningSticker from "@/assets/decorative/lightning-sticker.png";
interface PageHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  description: string;
}
const decorativeStickers = [
// Left side stickers
{
  src: pizzaSticker,
  className: "absolute left-2 md:left-8 lg:left-16 top-8 w-16 md:w-24 lg:w-32",
  animation: "animate-wiggle",
  delay: 0
}, {
  src: catSticker,
  className: "absolute left-4 md:left-12 lg:left-24 top-1/2 -translate-y-1/2 w-14 md:w-20 lg:w-28",
  animation: "animate-bounce-soft",
  delay: 200
}, {
  src: starSticker,
  className: "absolute left-0 md:left-4 lg:left-12 bottom-12 w-12 md:w-16 lg:w-24",
  animation: "animate-wiggle-slow",
  delay: 400
}, {
  src: heartSticker,
  className: "absolute left-16 md:left-28 lg:left-40 bottom-4 w-10 md:w-14 lg:w-20",
  animation: "animate-wiggle",
  delay: 100
},
// Right side stickers
{
  src: burgerSticker,
  className: "absolute right-2 md:right-8 lg:right-16 top-12 w-16 md:w-24 lg:w-32",
  animation: "animate-bounce-soft",
  delay: 300
}, {
  src: donutSticker,
  className: "absolute right-4 md:right-16 lg:right-32 top-4 w-12 md:w-18 lg:w-24",
  animation: "animate-wiggle",
  delay: 500
}, {
  src: rocketSticker,
  className: "absolute right-0 md:right-6 lg:right-20 top-1/2 -translate-y-1/2 w-14 md:w-20 lg:w-28",
  animation: "animate-wiggle-slow",
  delay: 150
}, {
  src: iceCreamSticker,
  className: "absolute right-12 md:right-24 lg:right-40 bottom-8 w-12 md:w-16 lg:w-24",
  animation: "animate-wiggle",
  delay: 250
}, {
  src: rainbowSticker,
  className: "absolute right-2 md:right-8 lg:right-16 bottom-4 w-14 md:w-20 lg:w-28",
  animation: "animate-bounce-soft",
  delay: 350
},
// Top center sticker
{
  src: lightningSticker,
  className: "absolute left-1/2 -translate-x-1/2 -top-2 md:top-2 w-10 md:w-14 lg:w-18 hidden md:block",
  animation: "animate-wiggle",
  delay: 450
}];
const PageHeader = ({
  badge,
  title,
  highlight,
  description
}: PageHeaderProps) => {
  return <div className="relative py-24 md:py-32 bg-gradient-to-br from-primary/20 via-background to-accent/10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Decorative stickers with animations */}
      {decorativeStickers.map((sticker, index) => (
        <img
          key={index}
          src={sticker.src}
          alt=""
          className={`${sticker.className} ${sticker.animation} drop-shadow-xl pointer-events-none`}
          style={{ animationDelay: `${sticker.delay}ms` }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {badge && <div className="inline-block mb-6">
              <div className="relative px-6 py-2 bg-gradient-to-r from-primary to-accent rounded-full shadow-lg">
                <span className="font-bold text-sm text-white uppercase tracking-wider">
                  {badge}
                </span>
              </div>
            </div>}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-6">
            {title}{" "}
            {highlight && <span className="text-gradient italic">{highlight}</span>}
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>
      </div>
    </div>;
};
export default PageHeader;