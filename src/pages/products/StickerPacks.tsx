import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Upload, Package, FileText, Users, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from "@/components/Layout";

// Import product images
import dieCutStickers from "@/assets/products/die-cut-stickers.png";
import kissCutStickers from "@/assets/products/kiss-cut-stickers.png";
import holographicStickers from "@/assets/products/holographic-stickers.png";
import rollLabels from "@/assets/products/roll-labels.png";

const includedItems = [
  {
    icon: Package,
    title: "Custom Stickers",
    description: "Choose one or multiple materials — mix designs, sizes, more",
  },
  {
    icon: FileText,
    title: "Custom Header Card",
    description: "Features your unique header with message, brand message, or offer.",
  },
  {
    icon: Users,
    title: "Packed By Our Team",
    description: "Each pack is hand-assembled and sealed by our friendly team for a polished final look.",
  },
];

const steps = [
  {
    number: 1,
    title: "Take your favorite sticker designs",
    color: "bg-warm-orange",
  },
  {
    number: 2,
    title: "Create your custom header",
    color: "bg-teal",
  },
  {
    number: 3,
    title: "Upload it all in the form below",
    color: "bg-coral",
  },
];

const useCases = [
  {
    title: "Event Merch + Giveaways",
    description: "Create memorable event swag with custom sticker packs.",
    image: dieCutStickers,
  },
  {
    title: "Artist & Illustrator Bundles",
    description: "Showcase your art collection in professional packaging.",
    image: kissCutStickers,
  },
  {
    title: "Gift or Customer Surprise",
    description: "Add a personal touch to orders with branded sticker sets.",
    image: holographicStickers,
  },
  {
    title: "Brand Merchandise",
    description: "Sell your brand's sticker collection as merchandise.",
    image: dieCutStickers,
  },
];

const faqs = [
  {
    question: "How can I place an order?",
    answer: "Simply fill out the form above with your header card design, sticker designs, and contact details. Our team will review your order and send you a custom quote."
  },
  {
    question: "Can I return an item?",
    answer: "We want you to be satisfied with your order. If there are any issues, contact us within 30 days of receiving your order. Please keep in mind that items need to be in original condition and packaging."
  },
  {
    question: "How can I stay updated with your promos?",
    answer: "Stay in the loop by subscribing to our newsletter! You'll receive exclusive updates on new products, sales, and special offers straight to your inbox."
  },
];

const relatedProducts = [
  { name: "Kiss Cut Stickers", image: kissCutStickers, href: "/stickers/kiss-cut" },
  { name: "Sticker Sheets", image: kissCutStickers, href: "/stickers/sheets" },
  { name: "Holographic Stickers", image: holographicStickers, href: "/stickers/holographic" },
  { name: "Roll Labels", image: rollLabels, href: "/labels/roll" },
];

const reviews = [
  {
    name: "Perfect!",
    username: "Emma S.",
    rating: 5,
    review: "The sticker packs came out amazing! The header cards look super professional and my customers love them.",
    verified: true,
  },
  {
    name: "Outstanding!",
    username: "Alex K.",
    rating: 5,
    review: "Great quality and the packaging is beautiful. Will definitely order again for my next event.",
    verified: true,
  },
  {
    name: "Amazing Quality",
    username: "Jordan P.",
    rating: 5,
    review: "I'm really impressed with the quality of my sticker packs. The printing is sharp and the materials feel premium.",
    verified: true,
  },
];

const StickerPacks = () => {
  const [headerCardFile, setHeaderCardFile] = useState<File | null>(null);
  const [stickerFiles, setStickerFiles] = useState<File[]>([]);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleHeaderCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setHeaderCardFile(e.target.files[0]);
    }
  };

  const handleStickerFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStickerFiles(Array.from(e.target.files));
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-warm-orange/30 to-coral/20 rounded-3xl flex items-center justify-center overflow-hidden">
                <img 
                  src={dieCutStickers} 
                  alt="Sticker Packs" 
                  className="w-3/4 h-3/4 object-contain drop-shadow-xl"
                />
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Sticker Packs</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-warm-orange text-warm-orange" />
                  ))}
                </div>
                <span className="text-muted-foreground text-sm">56 reviews</span>
              </div>

              <p className="text-muted-foreground mb-4">
                Sticker packs are a fun way to bundle a set of your sticker designs. Each pack comes in a cute reusable package with your own custom header card. Customize the front and back of your header card with your own designs, logos, or messages.
              </p>

              <p className="text-muted-foreground mb-6">
                Perfect for events, artist stores, merchandise, or as customer gifts and surprise extras in orders.
              </p>

              <Button 
                size="lg"
                className="bg-warm-orange hover:bg-warm-orange/90 text-white rounded-md px-8 font-bold"
              >
                GET STARTED
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            What's included in your Custom Sticker Pack?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {includedItems.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-background rounded-2xl border border-border flex items-center justify-center">
                  <item.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Get Started Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            How to Get Started
          </h2>

          <div className="flex flex-wrap justify-center gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center`}>
                  <span className="text-white font-bold text-xl">{step.number}</span>
                </div>
                <p className="text-foreground font-medium max-w-[180px]">{step.title}</p>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-6 h-6 text-muted-foreground hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section className="py-16 bg-warm-orange/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Get your pack now.</h2>
          <p className="text-muted-foreground mb-8">
            Upload your sticker pack header and sticker designs using the form below. Once submitted, our team will contact you with pricing, timing, and any other details. Please note: prices and only refer to custom sticker form. Design, printing information, etc. fees not included.
          </p>

          <div className="bg-background rounded-2xl p-8 border border-border space-y-8">
            {/* Header Card Upload */}
            <div>
              <label className="block font-semibold text-foreground mb-3">Add Header card</label>
              <div 
                className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => document.getElementById('header-card-upload')?.click()}
              >
                {headerCardFile ? (
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-5 h-5 text-teal" />
                    <span className="text-foreground">{headerCardFile.name}</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Click to upload</p>
                  </>
                )}
                <input 
                  type="file" 
                  id="header-card-upload"
                  className="hidden" 
                  accept="image/*,.pdf"
                  onChange={handleHeaderCardUpload}
                />
              </div>
            </div>

            {/* Sticker Designs Upload */}
            <div>
              <label className="block font-semibold text-foreground mb-3">Add your sticker designs here</label>
              <div 
                className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => document.getElementById('sticker-designs-upload')?.click()}
              >
                {stickerFiles.length > 0 ? (
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-5 h-5 text-teal" />
                    <span className="text-foreground">{stickerFiles.length} file(s) selected</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Click to upload</p>
                  </>
                )}
                <input 
                  type="file" 
                  id="sticker-designs-upload"
                  className="hidden" 
                  accept="image/*,.pdf"
                  multiple
                  onChange={handleStickerFilesUpload}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">0 valid file(s) up</p>
            </div>

            {/* Contact Details */}
            <div>
              <label className="block font-semibold text-foreground mb-3">Enter your details</label>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <Input placeholder="Email" type="email" className="rounded-lg" />
                <Select>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="What size?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (2")</SelectItem>
                    <SelectItem value="medium">Medium (3")</SelectItem>
                    <SelectItem value="large">Large (4")</SelectItem>
                    <SelectItem value="custom">Custom Size</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input placeholder="Any other info (e.g., how many packs you need, etc.)" className="rounded-lg" />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <Checkbox 
                id="terms" 
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I consent for my submitted data to be collected and stored.{" "}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-right">
              <Button 
                className="bg-coral hover:bg-coral/90 text-white rounded-full px-8"
                disabled={!agreeToTerms}
              >
                Submit for Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">How to Use Sticker Packs?</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="group">
                <div className="aspect-square bg-muted/30 rounded-2xl overflow-hidden mb-3">
                  <img 
                    src={useCase.image} 
                    alt={useCase.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground">{useCase.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button 
              variant="outline"
              className="bg-warm-orange hover:bg-warm-orange/90 text-white border-warm-orange rounded-md px-8"
            >
              QUOTE NOW
            </Button>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">FAQs for Sticker Packs</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-border rounded-lg p-6 bg-background"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
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
            {relatedProducts.map((product, index) => (
              <Link
                key={index}
                to={product.href}
                className="group text-center"
              >
                <div className="aspect-square bg-coral/10 rounded-2xl overflow-hidden mb-3 group-hover:shadow-lg transition-shadow">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </Link>
            ))}
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
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-warm-orange text-warm-orange" />
                  ))}
                </div>
                <p className="text-sm opacity-80">Based on 56 reviews</p>
              </div>
            </div>

            {/* Reviews */}
            <div className="lg:col-span-3 space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="bg-primary-foreground/10 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center font-bold">
                      {review.username.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{review.username}</span>
                        {review.verified && (
                          <span className="text-xs bg-teal/20 text-teal px-2 py-0.5 rounded-full">Verified</span>
                        )}
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`w-4 h-4 ${star <= review.rating ? "fill-warm-orange text-warm-orange" : "text-primary-foreground/30"}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <h4 className="font-semibold mb-1">{review.name}</h4>
                  <p className="text-sm opacity-80">{review.review}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StickerPacks;
