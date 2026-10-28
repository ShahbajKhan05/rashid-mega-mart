import HeroSection from "./components/HeroSection";
import BrandMarquee from "./components/BrandMarquee";
import KitBuilder from "./components/KitBuilder";
import Categories from "./components/Categories";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <BrandMarquee />
      <Categories />
      <KitBuilder />
    </main>
  );
}