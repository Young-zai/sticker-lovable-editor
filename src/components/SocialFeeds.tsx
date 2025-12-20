import { Instagram, Heart, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Using existing product images as social feed posts
import holographicStickers from "@/assets/products/holographic-stickers.png";
import dieCutStickers from "@/assets/products/die-cut-stickers.png";
import clearStickers from "@/assets/products/clear-stickers.png";
import glitterStickers from "@/assets/products/glitter-stickers.png";
import matteStickers from "@/assets/products/matte-stickers.png";
import glossyStickers from "@/assets/products/glossy-stickers.png";

const posts = [
  {
    image: holographicStickers,
    likes: 2847,
    comments: 156,
  },
  {
    image: dieCutStickers,
    likes: 1923,
    comments: 89,
  },
  {
    image: clearStickers,
    likes: 3201,
    comments: 234,
  },
  {
    image: glitterStickers,
    likes: 2156,
    comments: 178,
  },
  {
    image: matteStickers,
    likes: 1654,
    comments: 92,
  },
  {
    image: glossyStickers,
    likes: 2789,
    comments: 145,
  },
];

const SocialFeeds = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <section ref={sectionRef} className="py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Instagram className="w-4 h-4" />
            @stickerkiko
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
            Join Our <span className="text-gradient">Community</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            See how creators are using Sticker Kiko products. Tag us to get featured!
          </p>
        </div>

        {/* Social Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, index) => (
            <div
              key={index}
              className={`group relative aspect-square rounded-2xl overflow-hidden bg-background shadow-lg cursor-pointer transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <img
                src={post.image}
                alt={`Social post ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <div className="flex items-center gap-4 text-white">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 fill-white" />
                    <span className="text-sm font-medium">{post.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </div>
                </div>
              </div>

              {/* Corner Instagram Icon */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-10 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Instagram className="w-5 h-5" />
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialFeeds;
