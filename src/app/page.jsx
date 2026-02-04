import BlogSection from "@/components/blog-section";
import BrandsSection from "@/components/brand-section";
import CategorySection from "@/components/category-section";
import ContactSection from "@/components/contact-section";
import CoverSection from "@/components/cover-section";
import MainSection from "@/components/main-section";
import ProductCategories from "@/components/product-category-section";
import ReviewSection from "@/components/reviews-section";
import SectionConver from "@/components/SectionCover";
import StatsSection from "@/components/stats-section";
import Tracking from "@/components/Tracking";
import MainSectionGrid from "@/components/ui/main-section-grid";
import CaissonSection from "@/components/CaissonSection";
import CaissonSectionLeft from "@/components/CaissonSectionLeft";
import Colors from "@/components/Colors";
import FeaturesSection from "@/components/FeaturesSection";

export default function Home() {
  return (
    <div className="bg-[#f2f2f2]">
      <SectionConver />
      {/* <MainSection /> */}
      <FeaturesSection />
      <MainSectionGrid />
      {/* <NewSection /> */}
     
      <CategorySection />
      <CaissonSection />
      <CaissonSectionLeft />
      <Colors />
     
      <ProductCategories />
       <Tracking />
      <CoverSection />
      <BrandsSection />
      <StatsSection />
      <ReviewSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
}
