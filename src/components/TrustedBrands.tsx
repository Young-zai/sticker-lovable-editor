const brands = [
  "Coffee Shops", "Candle Brands", "Etsy Sellers", "Indie Businesses",
  "Bakeries", "Breweries", "Food Trucks", "Boutiques"
];

const TrustedBrands = () => {
  return (
    <section className="py-16 bg-background overflow-hidden border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-muted-foreground text-sm font-semibold uppercase tracking-wider mb-1">
            TRUSTED BY
          </p>
          <h3 className="text-3xl md:text-4xl font-black text-foreground">
            Great<span className="text-gradient">Brands</span>
          </h3>
        </div>

        <div className="relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Scrolling brands */}
          <div className="flex animate-scroll">
            {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand}-${index}`}
                className="flex-shrink-0 mx-10 px-8 py-4"
              >
                <span className="text-2xl font-bold text-muted-foreground/40 hover:text-primary transition-colors duration-300 cursor-default">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
