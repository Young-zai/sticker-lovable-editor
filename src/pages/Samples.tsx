import { useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Package, CheckCircle, Truck, Star } from "lucide-react";

import dieCutImg from "@/assets/products/die-cut-stickers.png";
import kissCutImg from "@/assets/products/kiss-cut-stickers.png";
import holographicImg from "@/assets/products/holographic-stickers.png";
import clearImg from "@/assets/products/clear-stickers.png";
import productLabelsImg from "@/assets/products/product-labels.png";
import vinylBannerImg from "@/assets/products/vinyl-banner.png";

const sampleTypes = [
  { id: "die-cut", name: "Die-Cut Stickers", image: dieCutImg },
  { id: "kiss-cut", name: "Kiss-Cut Stickers", image: kissCutImg },
  { id: "holographic", name: "Holographic Stickers", image: holographicImg },
  { id: "clear", name: "Clear Stickers", image: clearImg },
  { id: "labels", name: "Product Labels", image: productLabelsImg },
  { id: "vinyl-banner", name: "Vinyl Banner Swatch", image: vinylBannerImg },
];

const Samples = () => {
  const [selectedSamples, setSelectedSamples] = useState<string[]>([]);
  const { toast } = useToast();

  const toggleSample = (id: string) => {
    setSelectedSamples((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id].slice(0, 3)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Sample Request Submitted!",
      description: "Your free samples will be shipped within 3-5 business days.",
    });
    setSelectedSamples([]);
  };

  return (
    <Layout>
      <PageHeader
        badge="Try Before You Buy"
        title="Free"
        highlight="Samples"
        description="See and feel the quality for yourself. Request up to 3 free sample packs shipped directly to your door."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Package, title: "100% Free", desc: "No hidden costs or fees" },
              { icon: Truck, title: "Free Shipping", desc: "Delivered to your door" },
              { icon: Star, title: "Premium Quality", desc: "Same as our products" },
              { icon: CheckCircle, title: "No Obligation", desc: "Order only if you love it" },
            ].map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
                  <benefit.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Sample Selection */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Choose Your Samples <span className="text-muted-foreground font-normal">(Up to 3)</span>
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {sampleTypes.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => toggleSample(sample.id)}
                    className={`relative rounded-2xl border-2 transition-all duration-300 text-left overflow-hidden ${
                      selectedSamples.includes(sample.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {selectedSamples.includes(sample.id) && (
                      <div className="absolute top-3 right-3 z-10">
                        <CheckCircle className="w-6 h-6 text-primary bg-background rounded-full" />
                      </div>
                    )}
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={sample.image} 
                        alt={sample.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <span className="font-semibold text-foreground text-sm">{sample.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Request Form */}
            <div className="bg-card rounded-3xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Shipping Details</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required className="mt-2" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input id="company" placeholder="Your Company" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="address">Shipping Address</Label>
                  <Input id="address" placeholder="123 Main St" required className="mt-2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Los Angeles" required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="90210" required className="mt-2" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Special Requests (Optional)</Label>
                  <Textarea id="notes" placeholder="Any specific needs or questions?" className="mt-2" />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-full font-bold"
                  disabled={selectedSamples.length === 0}
                >
                  Request Free Samples ({selectedSamples.length}/3 selected)
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Samples;
