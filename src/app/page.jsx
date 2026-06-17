import BlogSection from "@/components/blog-section";
import BrandsSection from "@/components/brand-section";
import CategorySection from "@/components/category-section";
import ContactSection from "@/components/contact-section";
import CoverSection from "@/components/cover-section";
import ReviewSection from "@/components/reviews-section";
import StatsSection from "@/components/stats-section";
import MainSectionGrid from "@/components/ui/main-section-grid";
import CaissonSection from "@/components/CaissonSection";
import CaissonSectionLeft from "@/components/CaissonSectionLeft";
import FeaturesSection from "@/components/FeaturesSection";
import PlacarSection from "@/components/PlacardSection";
import Colors from "@/components/Colors";
import TopFooter from "@/components/TopFooter";
import AccSlideShow from "@/components/AccSlideShow";
import SectionVideo from "@/components/SectionVideo";




export const metadata = {
  title: "Fabricant de meubles de cuisine de lux. - Intercocina",
  description:
    "Intercocina, la fabrication de meubles de cuisine, meubles TV, placards et armoires, meubles de salle de bain, ainsi que de parquets, au Maroc.",
};

export default function Home() {
  return (
    <div className="bg-[#f2f2f2]">
      <SectionVideo />
      {/* <SectionConver /> */}
      {/* <MainSection /> */}
      <FeaturesSection />
      <MainSectionGrid />
      {/* <NewSection /> */}
     
      <CategorySection />
      <CaissonSection />
     
      <CaissonSectionLeft />
       <PlacarSection />
       <AccSlideShow />
      <Colors />
     
      {/* <ProductCategories /> */}
       {/* <Tracking /> */}
      <CoverSection />
     
      <BrandsSection />
      <StatsSection />
      <ReviewSection />
      <BlogSection />
      <ContactSection />
      <TopFooter />
    </div>
  );
}
