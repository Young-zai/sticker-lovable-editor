import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Check, ShoppingCart, Droplets, Sun, Shield, Package, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

// Import material images
import vinylMaterial from "@/assets/materials/vinyl-material.png";
import clearMaterial from "@/assets/materials/clear-material.png";
import holographicMaterial from "@/assets/materials/holographic-material.png";
import glitterMaterial from "@/assets/materials/glitter-material.png";
import metallicMaterial from "@/assets/materials/metallic-material.png";
import metallicSilverMaterial from "@/assets/materials/metallic-silver-material.png";
import glowMaterial from "@/assets/materials/glow-material.png";

// Import product images for related products
import kissCutStickers from "@/assets/products/kiss-cut-stickers.png";
import holographicStickers from "@/assets/products/holographic-stickers.png";
import rollLabels from "@/assets/products/roll-labels.png";
const materials = [{
  name: "Vinyl (Glossy & Matte)",
  image: vinylMaterial,
  link: "/stickers/vinyl",
  type: "White Vinyl"
}, {
  name: "Clear",
  image: clearMaterial,
  link: "/stickers/clear",
  type: "Matte Clear"
}, {
  name: "Holographic",
  image: holographicMaterial,
  link: "/stickers/holographic",
  type: "Prism Holographic"
}, {
  name: "Glitter",
  image: glitterMaterial,
  link: "/stickers/glitter",
  type: "Gold Glitter"
}, {
  name: "Metallic Gold",
  image: metallicMaterial,
  link: "/stickers/metallic",
  type: "Metallic Gold"
}, {
  name: "Metallic Silver",
  image: metallicSilverMaterial,
  link: "/stickers/metallic",
  type: "Metallic Silver"
}, {
  name: "Glow-in-the-dark",
  image: glowMaterial,
  link: "/stickers/glow-in-the-dark",
  type: "Glow Green"
}, {
  name: "Static Clings",
  image: vinylMaterial,
  link: "/stickers/static-clings",
  type: "Static Cling"
}, {
  name: "Heavy Duty",
  image: vinylMaterial,
  link: "/stickers/heavy-duty",
  type: "Heavy Duty"
}];
const features = ["True color & color-matching", "Texture & adhesive feel", "Transparency vs. opacity", "Durability & scratch-resistance", "Waterproof & UV-performance", "Thickness & flexibility", "Includes descriptive & static cling (for non-adhesive options)"];
const faqs = [{
  question: "How can I place an order?",
  answer: "Simply add the sample pack to your cart, and proceed to checkout. You can also click the 'Order Now' button above to start your order immediately."
}, {
  question: "Can I return an item?",
  answer: "Yes! If you're not satisfied with your order, you can return items within 30 days of receiving your order. Please keep in mind that items need to be in original condition and packaging."
}, {
  question: "How can I stay updated with your promos?",
  answer: "To stay in the loop, subscribe to our newsletter! You'll receive exclusive updates on new arrivals, sales, special signs straight to your inbox."
}];
const relatedProducts = [{
  name: "Kiss Cut Stickers",
  image: kissCutStickers,
  href: "/stickers/kiss-cut"
}, {
  name: "Sticker Sheets",
  image: kissCutStickers,
  href: "/stickers/sheets"
}, {
  name: "Holographic Stickers",
  image: holographicStickers,
  href: "/stickers/holographic"
}, {
  name: "Roll Labels",
  image: rollLabels,
  href: "/labels/roll"
}];
const reviews = [{
  name: "Sarah M.",
  rating: 5,
  title: "Perfect for comparing materials!",
  review: "This sample pack helped me decide on the perfect material for my brand stickers. The quality comparison was invaluable.",
  verified: true
}, {
  name: "Mike T.",
  rating: 5,
  title: "Great value",
  review: "Amazing value for the price. Got to feel every material before placing a bulk order.",
  verified: true
}, {
  name: "Jessica L.",
  rating: 4,
  title: "Very helpful",
  review: "I love being able to compare the quality, opacity, and feel of the sticker materials before committing to a larger order.",
  verified: true
}];
const SamplePack = () => {
  const [quantity, setQuantity] = useState(1);
  return <Layout>
      {/* Hero Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-lavender/30 to-primary/20 rounded-3xl flex items-center justify-center overflow-hidden">
                <img src={holographicMaterial} alt="Sample Pack" className="w-3/4 h-3/4 object-contain drop-shadow-xl" />
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Sample Pack</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-warm-orange text-warm-orange" />)}
                </div>
                <span className="text-muted-foreground text-sm">19 reviews</span>
              </div>

              <p className="text-muted-foreground mb-6">
                Try all of our stickers and label materials at once. Compare finishes, textures, print quality, and durability before placing your custom sticker order.
              </p>

              <p className="text-lg font-medium text-foreground mb-6">
                Try all materials for only $5.
              </p>

              {/* Add to Cart */}
              <div className="flex items-center gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 font-bold">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  ADD TO CART
                </Button>
                <span className="text-2xl font-bold text-foreground">$5.00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compare Materials Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Compare Every Sticker Material We Offer
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understanding how each material looks, feels, and performs helps you choose the perfect fit for your stickers. Your Sample Pack includes every option so you can compare them side by side before ordering your custom stickers.
            </p>
          </div>

          {/* Materials Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {materials.map((material, index) => <Link key={index} to={material.link} className="group text-center">
                <div className="aspect-square bg-background rounded-2xl border border-border overflow-hidden mb-3 group-hover:border-primary/50 transition-colors">
                  <img src={material.image} alt={material.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-medium text-foreground text-sm mb-1">{material.name}</h3>
                <span className="text-xs text-primary hover:underline">{material.type}</span>
              </Link>)}
          </div>

          {/* Note */}
          
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Why Choose a Sample Pack?
              </h2>
              <p className="text-muted-foreground mb-6">
                To help you pick the right material, examine one of our detailed impressions:
              </p>
              
              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>)}
              </ul>

              <p className="text-muted-foreground mb-6">
                See the results, materials firsthand, plus get some extras, like a sticker decals, so you can feel how they stick to your surface without any guess work.
              </p>

              <Button className="bg-foreground hover:bg-foreground/90 text-background rounded-md px-8">
                Order Now
              </Button>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] bg-muted/30 rounded-2xl overflow-hidden">
                <img src={holographicMaterial} alt="Sample pack materials" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">FAQs for Sample Pack</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => <div key={index} className="border border-border rounded-lg p-6 bg-background">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">
                  {faq.answer}
                </p>
              </div>)}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              See All FAQs
            </Button>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">You May Also Like...</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => <Link key={index} to={product.href} className="group text-center">
                <div className="aspect-square bg-coral/10 rounded-2xl overflow-hidden mb-3 group-hover:shadow-lg transition-shadow">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </Link>)}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Customer Reviews</h2>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Rating Summary */}
            <div className="lg:col-span-1 bg-primary-foreground/10 rounded-2xl p-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">4.9</div>
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-warm-orange text-warm-orange" />)}
                </div>
                <p className="text-sm opacity-80">Based on 19 reviews</p>
              </div>
            </div>

            {/* Reviews */}
            <div className="lg:col-span-3 space-y-4">
              {reviews.map((review, index) => <div key={index} className="bg-primary-foreground/10 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{review.name}</span>
                        {review.verified && <span className="text-xs bg-teal/20 text-teal px-2 py-0.5 rounded-full">Verified</span>}
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`w-4 h-4 ${star <= review.rating ? "fill-warm-orange text-warm-orange" : "text-primary-foreground/30"}`} />)}
                      </div>
                    </div>
                  </div>
                  <h4 className="font-semibold mb-1">{review.title}</h4>
                  <p className="text-sm opacity-80">{review.review}</p>
                </div>)}
            </div>
          </div>
        </div>
      </section>
    </Layout>;
};
export default SamplePack;