import { useEffect, useRef, useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Sparkles, Target, Users, Zap, Award, Linkedin, Twitter, Instagram } from "lucide-react";
import mascotImage from "@/assets/mascot.png";
import burgerSticker from "@/assets/decorative/burger-sticker.png";
import pizzaSticker from "@/assets/decorative/pizza-sticker.png";
import starSticker from "@/assets/decorative/star-sticker.png";
import heartSticker from "@/assets/decorative/heart-sticker.png";
import rainbowSticker from "@/assets/decorative/rainbow-sticker.png";

const values = [
  {
    icon: Heart,
    title: "Passion First",
    description: "We pour love into every sticker we create, treating each order like it's our own.",
  },
  {
    icon: Sparkles,
    title: "Quality Obsessed",
    description: "Premium materials and color-true printing for stickers that last and impress.",
  },
  {
    icon: Target,
    title: "Customer Focused",
    description: "Your success is our success. We go above and beyond for every customer.",
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    description: "Quick turnaround times without compromising on quality or attention to detail.",
  },
];

const stats = [
  { number: "50K+", label: "Happy Customers" },
  { number: "1M+", label: "Stickers Shipped" },
  { number: "99%", label: "Satisfaction Rate" },
  { number: "24/7", label: "Customer Support" },
];

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    bio: "Sticker enthusiast since childhood. Built Sticker Kiko from her garage.",
    avatar: "SC",
    color: "from-pink-400 to-rose-500",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Marcus Johnson",
    role: "Head of Design",
    bio: "Former Disney artist bringing magic to every sticker design.",
    avatar: "MJ",
    color: "from-purple-400 to-indigo-500",
    social: { linkedin: "#", instagram: "#" },
  },
  {
    name: "Emily Rodriguez",
    role: "Production Manager",
    bio: "Quality perfectionist ensuring every sticker meets our standards.",
    avatar: "ER",
    color: "from-teal-400 to-cyan-500",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "David Kim",
    role: "Customer Success",
    bio: "Your happiness is his mission. Always ready to help.",
    avatar: "DK",
    color: "from-orange-400 to-amber-500",
    social: { linkedin: "#", instagram: "#" },
  },
];

const About = () => {
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
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/10 overflow-hidden">
          {/* Decorative Stickers */}
          <img src={burgerSticker} alt="" className="absolute top-20 left-[5%] w-16 md:w-24 opacity-60 animate-wiggle" />
          <img src={pizzaSticker} alt="" className="absolute bottom-20 right-[8%] w-14 md:w-20 opacity-50 animate-bounce-slow" />
          <img src={starSticker} alt="" className="absolute top-32 right-[15%] w-12 md:w-16 opacity-70 animate-pulse" />
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 animate-fade-in">
              ABOUT STICKER KIKO
            </p>
            <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6">
              Our <span className="text-gradient">Story</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Born from a love of vibrant designs and quality craftsmanship, we're on a mission to make your ideas stick.
            </p>
          </div>
        </section>

        {/* Dual Promise Section */}
        <section ref={sectionRef} className="py-20 md:py-28 bg-background overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Mascot Image */}
              <div className={`flex justify-center lg:justify-start transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
                <div className="relative">
                  {/* Glow effect behind mascot */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/20 blur-3xl rounded-full scale-90" />
                  
                  {/* Floating stickers around mascot */}
                  <img src={heartSticker} alt="" className="absolute -top-8 -right-4 w-16 animate-float opacity-80" />
                  <img src={rainbowSticker} alt="" className="absolute -bottom-4 -left-8 w-20 animate-bounce-slow opacity-70" />
                  
                  <img
                    src={mascotImage}
                    alt="Kiko the Sticker Mascot"
                    className="relative w-[300px] md:w-[380px] lg:w-[450px] drop-shadow-2xl"
                    style={{ 
                      filter: 'drop-shadow(0 25px 50px rgba(88, 66, 130, 0.35))',
                    }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className={`text-center lg:text-left transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
                <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
                  DUAL PROMISE
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-8 leading-tight">
                  Made<span className="text-gradient italic font-handwriting text-6xl md:text-7xl lg:text-8xl">to</span>Stick
                </h2>
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                  <p className="text-xl">
                    Our name is a <span className="text-foreground font-bold">dual promise</span>.
                  </p>
                  <p>
                    <span className="text-primary font-semibold">Sticker Kiko</span> products stick on your stuff <em className="text-foreground">and</em> in your head. We use premium materials and color-true printing to make long-lasting prints that turn heads.
                  </p>
                  <p>
                    It's our mission to make your designs <span className="text-foreground font-semibold">spark conversation</span>, <span className="text-foreground font-semibold">inspire pride</span>, and <span className="text-foreground font-semibold">get recognized</span>.
                  </p>
                  <div className="pt-4 p-6 bg-muted/50 rounded-2xl border border-border">
                    <p className="text-foreground">
                      Repping our brand is <span className="text-primary font-bold">Kiko</span>, our roll-up-the-sleeves chameleon inspired by the spectrum of colors and our obsession with vibrant, tacky, colorful stickers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-primary via-primary/90 to-secondary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center text-primary-foreground">
                  <div className="text-4xl md:text-5xl font-black mb-2">{stat.number}</div>
                  <div className="text-sm md:text-base opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                WHAT DRIVES US
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                Our <span className="text-gradient">Values</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                The principles that guide everything we do at Sticker Kiko
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="group bg-background rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <value.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                THE PEOPLE BEHIND THE STICKERS
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
                Meet Our <span className="text-gradient">Team</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                A passionate crew dedicated to making your sticker dreams come true
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={member.name}
                  className="group bg-muted/30 rounded-3xl p-8 text-center hover:bg-background hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-border"
                >
                  {/* Avatar */}
                  <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl font-black text-white">{member.avatar}</span>
                  </div>
                  
                  {/* Info */}
                  <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold text-sm mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{member.bio}</p>
                  
                  {/* Social Links */}
                  <div className="flex justify-center gap-3">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.instagram && (
                      <a
                        href={member.social.instagram}
                        className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full mb-6">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">Join 50,000+ Happy Customers</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
                Ready to Make Your Ideas <span className="text-gradient">Stick</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Whether you're a small business, artist, or just someone who loves stickers, we're here to bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/stickers"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <Sparkles className="w-5 h-5" />
                  Shop Stickers
                </a>
                <a
                  href="/samples"
                  className="inline-flex items-center justify-center gap-2 bg-background border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
                >
                  Get Free Samples
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
