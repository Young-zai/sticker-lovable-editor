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

const slidingStickers = [
  { src: pizzaSticker, animation: "animate-slide-left", top: "10%", size: "w-12 md:w-16 lg:w-20", delay: 0 },
  { src: burgerSticker, animation: "animate-slide-right", top: "25%", size: "w-14 md:w-18 lg:w-24", delay: 2000 },
  { src: starSticker, animation: "animate-slide-left", top: "40%", size: "w-10 md:w-14 lg:w-18", delay: 4000 },
  { src: heartSticker, animation: "animate-slide-diagonal", top: "55%", size: "w-12 md:w-16 lg:w-20", delay: 1000 },
  { src: donutSticker, animation: "animate-slide-right", top: "70%", size: "w-14 md:w-18 lg:w-22", delay: 3000 },
  { src: iceCreamSticker, animation: "animate-slide-left", top: "85%", size: "w-10 md:w-14 lg:w-18", delay: 5000 },
  { src: rocketSticker, animation: "animate-slide-diagonal", top: "15%", size: "w-12 md:w-16 lg:w-20", delay: 6000 },
  { src: catSticker, animation: "animate-slide-right", top: "45%", size: "w-14 md:w-18 lg:w-22", delay: 7000 },
  { src: rainbowSticker, animation: "animate-slide-left", top: "75%", size: "w-16 md:w-20 lg:w-24", delay: 8000 },
  { src: lightningSticker, animation: "animate-slide-right", top: "30%", size: "w-10 md:w-14 lg:w-16", delay: 9000 },
];

const SlidingStickers = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {slidingStickers.map((sticker, index) => (
        <img
          key={index}
          src={sticker.src}
          alt=""
          className={`absolute ${sticker.size} ${sticker.animation} opacity-20 hover:opacity-40`}
          style={{ 
            top: sticker.top,
            animationDelay: `${sticker.delay}ms`,
          }}
        />
      ))}
    </div>
  );
};

export default SlidingStickers;
