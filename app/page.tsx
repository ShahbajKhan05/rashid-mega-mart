
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import PromoBannerCarousel from "./components/PromoBannerCarousel";
import BrandMarquee from "./components/BrandMarquee";
import KitBuilder from "./components/KitBuilder";
import Footer from "./components/Footer";
import Categories from "./components/Categories";


export default function Home() {
  return (
    <>
      <Navbar />

      <main>
      <HeroSection/>
      <BrandMarquee/> 
      <PromoBannerCarousel/>
      <Categories/>
      </main>
      <Footer/>
    </>
  );
}
