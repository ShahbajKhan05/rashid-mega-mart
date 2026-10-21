
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import KitBuilder from "./components/KitBuilder";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main
      id="top"
      className="min-h-screen w-full overflow-x-clip bg-[#FFF9D8] text-[#171717]"
    >
      {/* Fixed Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />


      {/* Grocery Kit Builder */}
      <section
        id="kit"
        aria-label="Grocery kits"
        className="mx-auto w-full max-w-7xl scroll-mt-20 px-3 py-6 sm:px-6 sm:py-8"
      >
        <KitBuilder />
      </section>

      {/* Free Delivery Banner */}
      <div className="py-3 sm:py-4">
        
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
