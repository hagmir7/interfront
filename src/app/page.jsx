import BlogSection from "@/components/blog-section";
import BrandsSection from "@/components/brand-section";
import CategorySection from "@/components/category-section";
import ContactSection from "@/components/contact-section";
import CoverSection from "@/components/cover-section";
import MainSection from "@/components/main-section";
import ReviewSection from "@/components/reviews-section";
import StatsSection from "@/components/stats-section";

export default function Home() {
  return (
    <div className="bg-[#f2f2f2]">
      <MainSection />
      <CategorySection />
      <CoverSection />
      <BrandsSection />
      <StatsSection />
      
      
      <ReviewSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
}
