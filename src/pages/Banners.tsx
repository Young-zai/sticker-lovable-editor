import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import ProductGrid from "@/components/ProductGrid";
import Newsletter from "@/components/Newsletter";

import vinylBannerImg from "@/assets/products/vinyl-banner.png";
import meshBannerImg from "@/assets/products/mesh-banner.png";
import retractableBannerImg from "@/assets/products/retractable-banner.png";
import fabricBannerImg from "@/assets/products/fabric-banner.png";
import poleBannerImg from "@/assets/products/pole-banner.png";
import stepRepeatBannerImg from "@/assets/products/step-repeat-banner.png";

const banners = [
  {
    id: "vinyl-banners",
    title: "Vinyl Banners",
    description: "Durable outdoor banners with vibrant full-color printing.",
    price: "From $29",
    image: vinylBannerImg,
    badge: "Best Seller",
    href: "/banners/vinyl",
  },
  {
    id: "mesh-banners",
    title: "Mesh Banners",
    description: "Wind-resistant banners perfect for outdoor events and fences.",
    price: "From $35",
    image: meshBannerImg,
    href: "/banners/mesh",
  },
  {
    id: "retractable-banners",
    title: "Retractable Banners",
    description: "Portable pull-up banners with stands for trade shows and events.",
    price: "From $89",
    image: retractableBannerImg,
    badge: "Popular",
    href: "/banners/retractable",
  },
  {
    id: "fabric-banners",
    title: "Fabric Banners",
    description: "Premium fabric banners with a professional, wrinkle-free finish.",
    price: "From $49",
    image: fabricBannerImg,
    href: "/banners/fabric",
  },
  {
    id: "pole-banners",
    title: "Pole Banners",
    description: "Double-sided street pole banners for maximum visibility.",
    price: "From $45",
    image: poleBannerImg,
    href: "/banners/pole",
  },
  {
    id: "step-repeat",
    title: "Step & Repeat Banners",
    description: "Photo backdrop banners for events, press, and red carpet moments.",
    price: "From $129",
    image: stepRepeatBannerImg,
    href: "/banners/step-repeat",
  },
];

const Banners = () => {
  return (
    <Layout>
      <PageHeader
        badge="Custom Banners"
        title="Bold"
        highlight="Banners"
        description="Make a big statement with custom banners. Perfect for events, storefronts, trade shows, and outdoor advertising."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <ProductGrid products={banners} />
        </div>
      </section>

      <Newsletter />
    </Layout>
  );
};

export default Banners;
