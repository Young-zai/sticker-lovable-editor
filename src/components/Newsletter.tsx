import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Welcome to the Kiko Family!",
        description: "Check your inbox for your exclusive discount code.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-white/80 text-sm font-medium mb-2 italic">
            First Time? We Won't Judge.
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Let's make it official — <em>10% off</em>
          </h2>

          <p className="text-white/80 text-lg mb-8">
            Subscribe for exclusive deals, expert tips, and made-to-stick ideas—plus a special discount on your first order.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 rounded-full bg-white border-0 px-6 text-foreground placeholder:text-muted-foreground"
              required
            />
            <Button
              type="submit"
              size="lg"
              className="h-14 rounded-full px-8 bg-foreground text-background hover:bg-foreground/90 font-bold"
            >
              <Send className="w-4 h-4 mr-2" />
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
