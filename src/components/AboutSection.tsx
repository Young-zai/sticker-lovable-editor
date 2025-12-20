import mascotImage from "@/assets/mascot.png";

const AboutSection = () => {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Mascot Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Glow effect behind mascot */}
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75" />
              <img
                src={mascotImage}
                alt="Kiko the Sticker Mascot"
                className="relative w-[280px] md:w-[340px] lg:w-[400px] drop-shadow-2xl animate-float"
                style={{ 
                  filter: 'drop-shadow(0 20px 40px rgba(88, 66, 130, 0.3))',
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="text-center lg:text-left">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
              DUAL PROMISE
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
              Made<span className="text-gradient">to</span>Stick
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Our name is a dual promise. <span className="text-foreground font-semibold">Sticker Kiko</span> products stick on your stuff <em>and</em> in your head. We use premium materials and color-true printing to make long-lasting prints.
              </p>
              <p>
                It's our mission to make your designs spark conversation, inspire pride, and get recognized.
              </p>
              <p>
                Repping our brand is <span className="text-foreground font-semibold">Kiko</span>, our roll-up-the-sleeves chameleon inspired by the spectrum of colors and our obsession with vibrant, tacky, colorful stickers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
