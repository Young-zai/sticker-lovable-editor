import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import { Palette, Package, ShoppingCart, Truck, RotateCcw } from 'lucide-react';

const faqData = [
  {
    category: "Design & Artwork",
    icon: Palette,
    questions: [
      {
        q: "What type of art files do you accept?",
        a: "We accept AI, PDF, EPS, SVG, PSD, PNG, JPG, and TIF file types."
      },
      {
        q: "Can I use custom shapes for my stickers?",
        a: "Yes! We offer standard shapes and custom die-cut shapes to match your design precisely."
      },
      {
        q: "How should I set up size and bleed?",
        a: "Extend your design 1/8\" beyond the cut line to avoid white edges, and keep important details inside the safe zone."
      },
      {
        q: "How can I get the most accurate color?",
        a: "Design in CMYK, use exact CMYK values, order a physical sample, and review proofs. Keep in mind that materials like clear, metallic, or laminated finishes can affect color."
      }
    ]
  },
  {
    category: "Products",
    icon: Package,
    questions: [
      {
        q: "What types of stickers do you offer?",
        a: "Vinyl, clear, holographic, silver/gold metallic, glow-in-the-dark, static cling, and industrial-grade stickers."
      },
      {
        q: "What kind of adhesive do you use?",
        a: "Most of our stickers use a removable adhesive that sticks well while in use but peels off cleanly without leaving any sticky residue. Standard stickers use removable adhesive, industrial-grade stickers use permanent adhesive, and static clings have no adhesive."
      },
      {
        q: "What is the minimum order quantity?",
        a: "Our minimum order is 1 piece. You can order a single custom sticker or as many as you need — no bulk requirement."
      },
      {
        q: "Can I order samples?",
        a: "Yes! You can order a sample pack, including your own custom design, to check the material and color."
      }
    ]
  },
  {
    category: "Ordering",
    icon: ShoppingCart,
    questions: [
      {
        q: "How do I place an order?",
        a: "Upload your artwork, select sticker options, and add to cart. You can order as a guest or create an account to save designs."
      },
      {
        q: "Can I change or cancel my order?",
        a: "Orders can be modified or canceled only before proof approval. Once approved, production begins, and changes are not possible."
      },
      {
        q: "Can I get a quote?",
        a: "Yes! You can request a quote at any time by submitting your artwork and sticker details (size, quantity, material). We'll respond with pricing and any recommendations for your design."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept Visa, Mastercard, American Express, Discover Card, PayPal, Google Pay, Apple Pay, Shop Pay, and Diners Club."
      },
      {
        q: "Can I see the proof before production?",
        a: "Yes! We provide a digital proof for your approval. Production starts only after you confirm the proof."
      }
    ]
  },
  {
    category: "Shipping",
    icon: Truck,
    questions: [
      {
        q: "Do you offer free shipping?",
        a: "Yes. We offer free standard shipping worldwide. All available shipping options and rates are shown at checkout."
      },
      {
        q: "Which countries do you ship to?",
        a: "We ship worldwide. International delivery times vary by country, and any customs or import fees are the customer's responsibility."
      },
      {
        q: "How long does the turnaround time take?",
        a: "Turnaround time: 1–2 business days after proof approval."
      },
      {
        q: "What shipping options do you offer?",
        a: "We ship via USPS, UPS, and FedEx. Standard, expedited, and international shipping are available, with tracking."
      },
      {
        q: "When will I receive my order?",
        a: "Once shipped, U.S. orders typically arrive in 2–5 business days. International orders usually take 2–14 business days, depending on customs and local carriers."
      },
      {
        q: "How can I track my order?",
        a: "You'll receive tracking information as soon as your order ships. You can follow your package from our facility to your address."
      }
    ]
  },
  {
    category: "Returns & Refunds",
    icon: RotateCcw,
    questions: [
      {
        q: "What is your return policy?",
        a: "Since all items are custom-made, we cannot accept returns unless your order arrives damaged or defective."
      },
      {
        q: "What if my order is defective?",
        a: "If your order arrives damaged, misprinted, or defective, please contact us within 7 days with photos. We'll arrange a free reprint."
      },
      {
        q: "Can I get a refund?",
        a: "Refunds are only issued for quality-related issues. Please contact our support team with details and photos of the issue."
      }
    ]
  }
];

const FAQ = () => {
  return (
    <Layout>
      <Helmet>
        <title>FAQ - Sticker Kiko | Frequently Asked Questions</title>
        <meta name="description" content="Find answers to common questions about ordering custom stickers, shipping, returns, and more at Sticker Kiko." />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-accent to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about ordering custom stickers from Sticker Kiko
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12 container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqData.map((section, sectionIndex) => {
              const IconComponent = section.icon;
              return (
                <div key={sectionIndex} className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">{section.category}</h2>
                  </div>

                  {/* Questions */}
                  <div className="space-y-6">
                    {section.questions.map((item, qIndex) => (
                      <div key={qIndex} className="group">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {item.q}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed pl-0 md:pl-4">
                          {item.a}
                        </p>
                        {qIndex < section.questions.length - 1 && (
                          <div className="mt-6 border-b border-border/50" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact CTA */}
          <div className="max-w-4xl mx-auto mt-12 text-center bg-primary/5 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-4">
              Can't find the answer you're looking for? Our team is here to help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default FAQ;
