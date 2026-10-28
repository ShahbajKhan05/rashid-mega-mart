"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  House,
  Package,
  LayoutGrid,
  ShoppingCart,
  Menu,
  X,
  ArrowUpRight,
  MapPin,
  Search,
  ChevronDown,
  Crosshair,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useLanguage } from "./LanguageProvider";
import { useCart } from "./CartProvider";
import { products } from "./data";

type Language = "en" | "hi";
const DEFAULT_LOCATION = "Ghoghar, Rewa";

function LanguageToggle({ language, onSelect }: { language: Language; onSelect: (l: Language) => void; }) {
  return (
    <div className="inline-flex shrink-0 items-center rounded-full border border-[#800020]/10 bg-[#FFF9D8] p-0.5 shadow-sm">
      {(["en", "hi"] as Language[]).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => onSelect(lang)}
          className={`flex h-7 min-w-[32px] items-center justify-center rounded-full text-[11px] font-bold transition-all ${
            language === lang ? "bg-[#800020] text-white shadow-sm" : "text-[#800020]/70 hover:bg-white"
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const router = useRouter();
  const { language, toggleLanguage } = useLanguage();
  const { cartCount, openCart } = useCart();
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION);
  const [manualLocation, setManualLocation] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState("");

  const isHindi = language === "hi";
  const cartLabelCount = cartCount > 99 ? "99+" : cartCount;

  useEffect(() => {
    const saved = localStorage.getItem("rmm_location");
    if (saved) setSelectedLocation(saved);
  }, []);

  const handleLiveLocation = () => {
    setIsLocating(true);
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported.");
      setIsLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
          const data = await res.json();
          const city = data.address.city || data.address.town || data.address.village || "";
          const suburb = data.address.suburb || data.address.neighbourhood || "";
          const state = data.address.state || "";
          
          let finalAddress = suburb && city ? `${suburb}, ${city}` : city ? `${city}, ${state}` : data.display_name.split(",").slice(0, 2).join(",");
          setSelectedLocation(finalAddress);
          localStorage.setItem("rmm_location", finalAddress);
          setLocationModalOpen(false);
        } catch (error) {
          setLocationError("Could not fetch address.");
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        setLocationError(error.code === error.PERMISSION_DENIED ? "Please allow location access." : "Failed to get location.");
      },
      { timeout: 10000 }
    );
  };

  const handleSaveManualLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualLocation.trim()) {
      setSelectedLocation(manualLocation.trim());
      localStorage.setItem("rmm_location", manualLocation.trim());
      setManualLocation("");
      setLocationModalOpen(false);
    }
  };

  const searchResults = products.filter((p) => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.nameHi.includes(q);
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?category=all&q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    document.body.style.overflow = (menuOpen || searchOpen || locationModalOpen) ? "hidden" : "unset";
  }, [menuOpen, searchOpen, locationModalOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        
        {/* =========================================
            DESKTOP HEADER
            ========================================= */}
        <div className="mx-auto hidden h-[72px] max-w-7xl items-center justify-between gap-6 px-6 lg:flex">
          <div className="flex items-center gap-5">
            <a href="/" className="flex items-center gap-2">
              <Image src="/Logo.png" alt="Logo" width={44} height={44} className="h-11 w-11 object-contain" />
              <div className="flex flex-col">
                <span className="text-lg font-black leading-none text-[#800020]">Rashid</span>
                <span className="text-xs font-bold tracking-wider text-[#D4A84F]">MEGA MART</span>
              </div>
            </a>
            <button
              onClick={() => setLocationModalOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-gray-100 bg-[#FFFCF0] px-3 py-2 transition-colors hover:border-[#800020]/30"
            >
              <MapPin size={18} className="text-[#138047]" />
              <div className="flex flex-col items-start">
                <span className="text-[11px] font-bold text-[#138047]">Delivery in 30 mins</span>
                <span className="flex items-center gap-1 text-[13px] font-black text-gray-800">
                  {selectedLocation} <ChevronDown size={14} className="text-gray-500" />
                </span>
              </div>
            </button>
          </div>

          <div className="relative flex-1 max-w-xl">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search size={18} className="absolute left-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for atta, oil, maggi..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm font-medium outline-none focus:border-[#800020] focus:bg-white"
              />
            </form>
          </div>

          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-5">
              <a href="/" className="text-sm font-bold text-gray-700 hover:text-[#800020]">Home</a>
              <a href="#kit" className="text-sm font-bold text-gray-700 hover:text-[#800020]">Kits</a>
              <a href="#categories" className="text-sm font-bold text-gray-700 hover:text-[#800020]">Categories</a>
            </nav>
            <LanguageToggle language={language} onSelect={() => toggleLanguage()} />
            <button onClick={openCart} className="flex h-11 items-center gap-2 rounded-xl bg-[#800020] px-5 text-white shadow-md hover:bg-[#600018]">
              <ShoppingCart size={18} />
              <span className="text-sm font-bold">Cart</span>
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#D4A84F] px-1 text-[10px] font-black text-[#35120D]">
                {cartLabelCount}
              </span>
            </button>
          </div>
        </div>

        {/* =========================================
            MOBILE HEADER
            ========================================= */}
        <div className="flex flex-col px-4 pb-3 pt-3 lg:hidden">
          
          {/* Row 1: Menu, Logo, Location, Cart */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <button onClick={() => setMenuOpen(true)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-[#800020]">
                <Menu size={20} />
              </button>

              <a href="/" className="flex items-center gap-2">
                <Image src="/Logo.png" alt="Logo" width={32} height={32} className="h-8 w-8 object-contain" />
                <div className="flex flex-col">
                  <span className="text-[13px] font-black leading-none text-[#800020]">Rashid Mega Mart</span>
                  <button onClick={() => setLocationModalOpen(true)} className="flex items-center gap-1 text-[10px] font-bold text-gray-500 mt-0.5">
                    <MapPin size={10} className="text-[#138047]" />
                    <span className="truncate max-w-[120px]">{selectedLocation}</span>
                    <ChevronDown size={10} />
                  </button>
                </div>
              </a>
            </div>

            <button onClick={openCart} className="relative flex h-9 items-center gap-1.5 rounded-xl bg-[#800020] px-3 text-white shadow-sm">
              <ShoppingCart size={16} />
              <span className="text-xs font-bold">Cart</span>
              <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#D4A84F] px-1 text-[9px] font-black text-[#35120D]">
                {cartLabelCount}
              </span>
            </button>
          </div>

          {/* Row 2: Search Bar + Language Toggle */}
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-10 flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-400"
            >
              <Search size={16} />
              <span className="text-xs font-medium truncate">{isHindi ? "आटा, तेल खोजें..." : "Search atta, oil..."}</span>
            </button>
            
            {/* Mobile Language Toggle */}
            <div className="shrink-0">
              <LanguageToggle language={language} onSelect={() => toggleLanguage()} />
            </div>
          </div>
        </div>
      </header>

      {/* Add a spacer to push content down because header is fixed */}
      <div className="h-[105px] lg:h-[72px]" />

      {/* LOCATION MODAL */}
      <AnimatePresence>
        {locationModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-4" onClick={() => setLocationModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
            >
              <div className="flex items-center justify-between border-b border-gray-100 p-4 bg-[#FFF9D8]">
                <h3 className="text-lg font-black text-[#800020]">Select Delivery Location</h3>
                <button onClick={() => setLocationModalOpen(false)} className="text-gray-500 hover:text-gray-800 rounded-full p-1 bg-white/50"><X size={20} /></button>
              </div>
              
              <div className="p-4 sm:p-5">
                <button
                  onClick={handleLiveLocation}
                  disabled={isLocating}
                  className="flex w-full items-center gap-3 rounded-xl border border-[#138047]/30 bg-[#138047]/5 p-3 text-left transition-colors hover:bg-[#138047]/10 disabled:opacity-50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#138047] text-white">
                    <Crosshair size={20} className={isLocating ? "animate-spin" : ""} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#138047]">{isLocating ? "Detecting..." : "Use my current location"}</p>
                    <p className="text-[11px] font-medium text-[#138047]/70">Detect address using GPS</p>
                  </div>
                </button>

                {locationError && <p className="mt-2 text-xs font-bold text-red-600 bg-red-50 p-2 rounded-lg text-center">⚠️ {locationError}</p>}

                <div className="my-4 flex items-center gap-2">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase">OR ENTER MANUALLY</span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                <form onSubmit={handleSaveManualLocation} className="flex gap-2">
                  <input
                    type="text"
                    value={manualLocation}
                    onChange={(e) => setManualLocation(e.target.value)}
                    placeholder="e.g., College Road, Rewa"
                    className="h-11 flex-1 rounded-xl border border-gray-300 bg-gray-50 px-3 text-sm font-medium outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
                  />
                  <button type="submit" disabled={!manualLocation.trim()} className="h-11 shrink-0 rounded-xl bg-[#800020] px-4 text-sm font-bold text-white shadow-md disabled:opacity-50">Save</button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MOBILE SEARCH OVERLAY */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="fixed inset-0 z-[100] flex flex-col bg-white lg:hidden">
            <div className="flex items-center gap-2 border-b border-gray-100 p-3">
              <form onSubmit={handleSearchSubmit} className="relative flex flex-1 items-center">
                <Search size={18} className="absolute left-3 text-gray-400" />
                <input autoFocus type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." className="h-11 w-full rounded-xl border border-gray-200 bg-[#FFFCF0] pl-10 pr-4 text-sm font-medium outline-none focus:border-[#800020]" />
              </form>
              <button onClick={() => setSearchOpen(false)} className="p-2 text-gray-500"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
               {searchQuery.trim() === "" ? (
                <div className="text-center mt-10 text-gray-400">
                  <Search size={40} className="mx-auto mb-3 opacity-20" />
                  <p className="text-sm font-bold text-gray-500">What are you looking for?</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map((product) => (
                    <div key={product.id} onClick={() => { router.push(`/products?category=${product.category}&q=${encodeURIComponent(product.name)}`); setSearchOpen(false); }} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                      <img src={product.image} alt="" className="h-12 w-12 rounded-lg bg-[#FFF9D8] object-contain p-1" />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-800">{isHindi ? product.nameHi : product.name}</p>
                        <p className="text-xs font-black text-[#800020] mt-0.5">₹{product.price}</p>
                      </div>
                      <ArrowUpRight size={16} className="text-gray-300" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center mt-10"><p className="text-3xl">🔎</p><p className="text-sm font-bold text-gray-500 mt-2">No products found</p></div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)} className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm lg:hidden" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed bottom-0 left-0 top-0 z-[100] w-[80%] max-w-sm bg-white p-5 shadow-2xl lg:hidden flex flex-col">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-2">
                   <Image src="/Logo.png" alt="Logo" width={40} height={40} className="h-10 w-10 object-contain" />
                   <span className="text-sm font-black text-[#800020]">Rashid Mega Mart</span>
                 </div>
                 <button onClick={() => setMenuOpen(false)} className="rounded-full bg-gray-100 p-2 text-gray-600"><X size={20} /></button>
              </div>

              <button onClick={() => { setMenuOpen(false); setLocationModalOpen(true); }} className="mb-6 flex w-full items-center gap-2 rounded-xl bg-[#FFF9D8] p-3 border border-[#800020]/10">
                <MapPin size={18} className="text-[#138047]" />
                <div className="flex flex-col items-start flex-1">
                  <span className="text-[11px] font-bold text-gray-500">Deliver to</span>
                  <span className="text-sm font-black text-[#800020] truncate">{selectedLocation}</span>
                </div>
                <ChevronDown size={16} className="text-[#800020]" />
              </button>

              <div className="flex flex-col gap-2">
                <a href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-50"><House size={20} className="text-[#800020]" /><span className="font-bold text-gray-800">{isHindi ? "होम" : "Home"}</span></a>
                <a href="#kit" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-50"><Package size={20} className="text-[#800020]" /><span className="font-bold text-gray-800">{isHindi ? "किट्स" : "Kits"}</span></a>
                <a href="#categories" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-50"><LayoutGrid size={20} className="text-[#800020]" /><span className="font-bold text-gray-800">{isHindi ? "कैटेगरी" : "Categories"}</span></a>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100">
                <LanguageToggle language={language} onSelect={() => toggleLanguage()} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}