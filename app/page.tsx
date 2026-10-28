import HeroSection from "./components/HeroSection";
import PromoBannerCarousel from "./components/PromoBannerCarousel";
import BrandMarquee from "./components/BrandMarquee";
import KitBuilder from "./components/KitBuilder";
import Categories from "./components/Categories";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BrandMarquee />
      <PromoBannerCarousel/>
      <Categories />
      <KitBuilder />
    </main>
  );
}