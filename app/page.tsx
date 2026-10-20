import Navbar from "./components/Navbar";
import DiwaliAnnouncement from "./components/DiwaliAnnouncement";
import HeroSection from "./components/HeroSection";
import FreeDeliveryBanner from "./components/FreeDeliveryBanner";
import KitBuilder from "./components/KitBuilder";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFF9D8] text-[#171717]">
      {/* Header Navigation */}
      <Navbar />
      <DiwaliAnnouncement />

      {/* Banner, Location & Category Header */}
      <HeroSection />

     

      {/* Custom Kit Builder Component */}
      <section id="kit" className="mx-auto max-w-7xl px-3 py-6 sm:px-6">
        <KitBuilder />
      </section>

       {/* Free Delivery Banner */}
      <div className="px-4 py-4 sm:px-6 lg:px-8">
  <FreeDeliveryBanner />
</div>

      {/* Footer */}
      <Footer />
    </main>
  );
}