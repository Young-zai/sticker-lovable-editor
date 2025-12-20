import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import SamplesSection from "@/components/SamplesSection";
import StickerMaterials from "@/components/StickerMaterials";
import IndustriesSection from "@/components/IndustriesSection";
import Testimonials from "@/components/Testimonials";
import SocialFeeds from "@/components/SocialFeeds";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      <main>
        <HeroSection />
        <WhyChooseUs />
        <StickerMaterials />
        <IndustriesSection />
        <SamplesSection />
        <Testimonials />
        <SocialFeeds />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
