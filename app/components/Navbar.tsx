"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  House, Package, LayoutGrid, ShoppingCart, Menu, X, ArrowUpRight,
  MapPin, Search, ChevronDown, Crosshair, User, Star, Lock, Heart, LogOut, Gift, ShieldCheck, Truck
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
          className={`flex h-6 min-w-[28px] items-center justify-center rounded-full text-[10px] font-bold transition-all ${
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
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

    const user = localStorage.getItem("rmm_user");
    if (user) setIsLoggedIn(true);
  }, [menuOpen]);

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

  const handleLogout = () => {
    localStorage.removeItem("rmm_user");
    setIsLoggedIn(false);
    setMenuOpen(false);
    router.push("/");
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
        <div className="mx-auto hidden h-[72px] max-w-7xl items-center justify-between gap-4 px-6 lg:flex">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 shrink-0">
              <Image src="/Logo.png" alt="Logo" width={44} height={44} className="h-11 w-11 object-contain" />
              <div className="flex flex-col">
                <span className="text-lg font-black leading-none text-[#800020]">Rashid</span>
                <span className="text-xs font-bold tracking-wider text-[#D4A84F]">MEGA MART</span>
              </div>
            </a>
            <button
              onClick={() => setLocationModalOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-gray-100 bg-[#FFFCF0] px-3 py-2 transition-colors hover:border-[#800020]/30 shrink-0"
            >
              <MapPin size={18} className="text-[#138047]" />
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-bold text-[#138047]">Delivery in 30 mins</span>
                <span className="flex items-center gap-1 text-[12px] font-black text-gray-800">
                  {selectedLocation} <ChevronDown size={14} className="text-gray-500" />
                </span>
              </div>
            </button>
          </div>

          <div className="relative flex-1 max-w-sm">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search size={18} className="absolute left-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for atta, oil..."
                className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm font-medium outline-none focus:border-[#800020] focus:bg-white"
              />
            </form>
          </div>

          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-3">
              <a href="/" className="text-sm font-bold text-gray-700 hover:text-[#800020]">Home</a>
              <a href="#kit" className="text-sm font-bold text-gray-700 hover:text-[#800020]">Kits</a>
              
              <a href="/loyalty" className="flex items-center gap-1 text-sm font-bold text-[#800020] bg-[#800020]/5 px-2.5 py-1.5 rounded-lg hover:bg-[#800020]/10 transition">
                <Star size={14} className="fill-[#800020]" /> Rewards
              </a>

              <a href="/loyalty/staff" title="Staff Login" className="flex items-center gap-1 text-sm font-bold text-gray-600 bg-gray-100 px-2.5 py-1.5 rounded-lg hover:bg-gray-200 transition">
                <Lock size={14} /> Staff
              </a>

              <a href="/admin" className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-[#800020]">
                <ShieldCheck size={14} /> Admin
              </a>
            </nav>
            
            <LanguageToggle language={language} onSelect={() => toggleLanguage()} />

            {/* 🔥 NAYA: Wishlist Desktop */}
            <a href="/wishlist" className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#800020]/10 text-[#800020] transition hover:border-[#800020]/30 hover:bg-[#800020]/5">
               <Heart size={18} />
            </a>

            {/* 🔥 NAYA: Account / Login Desktop */}
            <a 
              href={isLoggedIn ? "/account" : "/login"} 
              className="flex h-10 items-center gap-1.5 rounded-xl border-2 border-[#800020]/10 px-3 text-sm font-bold text-[#800020] transition hover:border-[#800020]/30 hover:bg-[#800020]/5"
            >
              <User size={18} /> 
              <span className="hidden xl:block">{isLoggedIn ? "Account" : "Login"}</span>
            </a>

            <button onClick={openCart} className="flex h-10 items-center gap-2 rounded-xl bg-[#800020] px-4 text-white shadow-md hover:bg-[#600018]">
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
        <div className="flex flex-col px-3 pb-2 pt-2 lg:hidden">
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1.5">
              <button onClick={() => setMenuOpen(true)} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-[#800020]">
                <Menu size={18} />
              </button>
              <a href="/" className="flex items-center gap-1.5 shrink-0">
                <Image src="/Logo.png" alt="Logo" width={28} height={28} className="h-7 w-7 object-contain" />
                <div className="flex flex-col">
                  <span className="text-[13px] font-black leading-none text-[#800020]">Rashid Mega Mart</span>
                  <button onClick={() => setLocationModalOpen(true)} className="flex items-center gap-0.5 text-[9px] font-bold text-gray-500 mt-0.5">
                    <MapPin size={9} className="text-[#138047]" />
                    <span className="truncate max-w-[80px]">{selectedLocation}</span>
                    <ChevronDown size={9} />
                  </button>
                </div>
              </a>
            </div>

            <div className="flex items-center gap-1">
              <a href="/loyalty" className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#D4A84F]/20 text-[#800020]">
                <Star size={13} className="fill-[#800020]" />
              </a>
              
              {/* 🔥 NAYA: Wishlist Mobile Icon */}
              <a href="/wishlist" className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-[#800020]">
                <Heart size={13} />
              </a>

              {/* 🔥 NAYA: Account Mobile Icon */}
              <a href={isLoggedIn ? "/account" : "/login"} className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-[#800020]">
                <User size={13} />
              </a>

              <button onClick={openCart} className="relative flex h-7 items-center gap-1 rounded-lg bg-[#800020] px-2 text-white ml-0.5">
                <ShoppingCart size={12} />
                <span className="absolute -right-1 -top-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-[#D4A84F] px-1 text-[8px] font-black text-[#35120D] shadow-sm">
                  {cartLabelCount}
                </span>
              </button>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-1.5">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-8 flex-1 items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2 text-sm text-gray-400"
            >
              <Search size={13} />
              <span className="text-[10px] font-medium truncate">{isHindi ? "आटा, तेल खोजें..." : "Search atta, oil..."}</span>
            </button>
            <div className="shrink-0 scale-90 origin-right">
              <LanguageToggle language={language} onSelect={() => toggleLanguage()} />
            </div>
          </div>
        </div>
      </header>

      <div className="h-[95px] lg:h-[72px]" />

      {/* ... (Baaki Location Modal, Search Overlay, Mobile Menu same rahega) ... */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)} className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm lg:hidden" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed bottom-0 left-0 top-0 z-[100] w-[85%] max-w-sm bg-white p-5 shadow-2xl lg:hidden flex flex-col overflow-y-auto">
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
                
                <a href="/loyalty" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-xl p-3 bg-[#FFF9D8] hover:bg-[#FFF4D6]"><Star size={20} className="text-[#D4A84F] fill-[#D4A84F]" /><span className="font-bold text-[#800020]">{isHindi ? "मेरे रिवॉर्ड्स" : "My Rewards"}</span></a>
                
                <a href="/wishlist" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-50"><Heart size={20} className="text-[#800020]" /><span className="font-bold text-gray-800">{isHindi ? "मेरी विशलिस्ट" : "My Wishlist"}</span></a>
                
                <a href="/order-tracking" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-50"><Truck size={20} className="text-[#800020]" /><span className="font-bold text-gray-800">{isHindi ? "ऑर्डर ट्रैक करें" : "Track Order"}</span></a>
                
                <a href="#categories" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-50"><LayoutGrid size={20} className="text-[#800020]" /><span className="font-bold text-gray-800">{isHindi ? "कैटेगरी" : "Categories"}</span></a>
                <a href="/about" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-50"><User size={20} className="text-[#800020]" /><span className="font-bold text-gray-800">{isHindi ? "हमारे बारे में" : "About Us"}</span></a>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-3">
                {isLoggedIn ? (
                  <>
                    <a href="/account" onClick={() => setMenuOpen(false)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#800020] py-3 text-sm font-bold text-white">
                      <User size={18} /> My Account
                    </a>
                    <button onClick={handleLogout} className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-3 text-sm font-bold text-red-600">
                      <LogOut size={18} /> Logout
                    </button>
                  </>
                ) : (
                  <a href="/login" onClick={() => setMenuOpen(false)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#800020] py-3 text-sm font-bold text-white">
                    <User size={18} /> {isHindi ? "लॉगिन करें" : "Login / Sign Up"}
                  </a>
                )}
                
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <a href="/loyalty/staff" onClick={() => setMenuOpen(false)} className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 py-2.5 text-[11px] font-bold text-gray-600">
                    <Lock size={14} /> Staff Login
                  </a>
                  <a href="/admin" onClick={() => setMenuOpen(false)} className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 py-2.5 text-[11px] font-bold text-gray-600">
                    <ShieldCheck size={14} /> Admin Panel
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}