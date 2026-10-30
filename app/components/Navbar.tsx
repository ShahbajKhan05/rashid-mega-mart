// app/components/Navbar.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  House, Package, LayoutGrid, ShoppingCart, Menu, X, ArrowUpRight,
  MapPin, Search, ChevronDown, Crosshair, User, Star, Lock, Heart, LogOut, Gift, ShieldCheck, Truck,
  Wheat, Droplet, Flame, Cookie // 🔥 Categories ke liye naye icons import kiye
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "./LanguageProvider";
import { useCart } from "./CartProvider";
import { products, categoryOptions } from "./data";

type Language = "en" | "hi";
const DEFAULT_LOCATION = "Ghoghar, Rewa";

function LanguageToggle({ language, onSelect }: { language: Language; onSelect: (l: Language) => void; }) {
  return (
    <div className="inline-flex shrink-0 items-center rounded-lg border border-gray-200 bg-white p-0.5 shadow-sm h-9">
      {(["en", "hi"] as Language[]).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => onSelect(lang)}
          className={`flex h-full min-w-[32px] items-center justify-center rounded-md text-[10px] font-black transition-all ${
            language === lang ? "bg-[#800020] text-white shadow-sm" : "text-gray-500 hover:bg-gray-100"
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

            <a href="/wishlist" className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#800020]/10 text-[#800020] transition hover:border-[#800020]/30 hover:bg-[#800020]/5">
              <Heart size={18} />
            </a>

            <a href={isLoggedIn ? "/account" : "/login"} className="flex h-10 items-center gap-1.5 rounded-xl border-2 border-[#800020]/10 px-3 text-sm font-bold text-[#800020] transition hover:border-[#800020]/30 hover:bg-[#800020]/5">
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
            MOBILE HEADER (Clean & Professional)
            ========================================= */}
        <div className="flex flex-col px-3 pb-2.5 pt-2 lg:hidden">

          {/* ROW 1: Menu + Logo + Clean Icons */}
          <div className="flex items-center justify-between gap-1">
            
            {/* Left Side */}
            <div className="flex items-center gap-2 min-w-0">
              {/* Menu Button */}
              <button
                onClick={() => setMenuOpen(true)}
                className="flex h-8 items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white px-2 text-[11px] font-bold text-gray-700 shadow-sm active:scale-95 transition"
              >
                <Menu size={14} /> Menu
              </button>
              
              {/* Logo & Location */}
              <a href="/" className="flex items-center gap-1.5 min-w-0">
                <Image src="/Logo.png" alt="Logo" width={24} height={24} className="h-6 w-6 object-contain shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[12px] font-black leading-tight text-[#800020] truncate">
                    Rashid Mega Mart
                  </span>
                  <button onClick={() => setLocationModalOpen(true)} className="flex items-center gap-0.5 text-[9px] font-bold text-gray-500 mt-0.5 min-w-0">
                    <MapPin size={9} className="text-[#138047] shrink-0" />
                    <span className="truncate max-w-[80px]">{selectedLocation}</span>
                    <ChevronDown size={9} className="shrink-0" />
                  </button>
                </div>
              </a>
            </div>

            {/* Right Side Icons (Clean, No heavy borders) */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Heart (Wishlist) */}
              <a href="/wishlist" className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 transition">
                <Heart size={16} />
              </a>
              
              {/* User (Login/Account) */}
              <a href={isLoggedIn ? "/account" : "/login"} className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 transition">
                <User size={16} />
              </a>
              
              {/* Cart Button */}
              <button onClick={openCart} className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[#800020] text-white shadow-sm active:scale-95 transition ml-0.5">
                <ShoppingCart size={15} />
                <span className="absolute -right-1 -top-1 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-[#D4A84F] px-1 text-[8px] font-black text-[#35120D] shadow-sm">
                  {cartLabelCount}
                </span>
              </button>
            </div>
          </div>

          {/* ROW 2: Search + Language */}
          <div className="mt-2 flex items-center gap-1.5">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-8 flex-1 items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2 text-sm text-gray-400"
            >
              <Search size={14} />
              <span className="text-[10px] font-medium truncate">{isHindi ? "आटा, तेल खोजें..." : "Search atta, oil..."}</span>
            </button>
            <div className="shrink-0 scale-90 origin-right">
              <LanguageToggle language={language} onSelect={() => toggleLanguage()} />
            </div>
          </div>

          {/* 🔥 ROW 3: Categories with Original Icons */}
          <div className="mt-2 flex items-center gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {categoryOptions.map((cat) => {
              // 🔥 Har category ke liye uske naam ka sahi icon select kar rahe hain
              let Icon = LayoutGrid;
              const cid = cat.id.toLowerCase();
              if (cid === 'staples') Icon = Wheat;
              else if (cid === 'oil') Icon = Droplet;
              else if (cid === 'masala') Icon = Flame;
              else if (cid === 'snacks') Icon = Cookie;

              return (
                <a
                  key={cat.id}
                  href={`/products${cat.id !== "all" ? `?category=${cat.id}` : ""}`}
                  className="shrink-0 flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[10px] font-bold text-gray-700 shadow-sm hover:border-[#800020]/30 hover:text-[#800020] transition"
                >
                  <Icon size={13} className="text-[#800020]" />
                  {isHindi ? cat.hi : cat.en}
                </a>
              );
            })}
          </div>

        </div>
      </header>

      {/* Spacer */}
      <div className="h-[125px] lg:h-[72px]" />

      {/* =========================================
          LOCATION MODAL
          ========================================= */}
      <AnimatePresence>
        {locationModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLocationModalOpen(false)} className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="fixed left-1/2 top-1/2 z-[101] w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-5 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-[#800020] flex items-center gap-2"><MapPin size={20} /> {isHindi ? "डिलीवरी लोकेशन" : "Delivery Location"}</h3>
                <button onClick={() => setLocationModalOpen(false)} className="rounded-full bg-gray-100 p-1.5 text-gray-600 hover:bg-gray-200"><X size={18} /></button>
              </div>

              <button onClick={handleLiveLocation} disabled={isLocating} className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#138047] py-3 text-sm font-bold text-white hover:bg-[#0D6837] transition disabled:opacity-60">
                <Crosshair size={18} /> {isLocating ? (isHindi ? "लोकेशन ढूंढ रहे हैं..." : "Detecting...") : (isHindi ? "वर्तमान लोकेशन उपयोग करें" : "Use Current Location")}
              </button>

              {locationError && <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600">{locationError}</p>}

              <div className="relative mb-4 flex items-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                <div className="relative mx-auto bg-white px-3 text-[10px] font-bold text-gray-400">{isHindi ? "या मैन्युअल दर्ज करें" : "OR ENTER MANUALLY"}</div>
              </div>

              <form onSubmit={handleSaveManualLocation} className="flex flex-col gap-3">
                <input type="text" value={manualLocation} onChange={(e) => setManualLocation(e.target.value)} placeholder={isHindi ? "अपना शहर / इलाका दर्ज करें" : "Enter your city / area"} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium outline-none focus:border-[#800020] focus:bg-white" />
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#800020] py-3 text-sm font-bold text-white hover:bg-[#600018] transition"><MapPin size={16} /> {isHindi ? "सेव करें" : "Save Location"}</button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =========================================
          SEARCH OVERLAY
          ========================================= */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-white">
            <div className="flex h-full flex-col">
              <div className="border-b border-gray-100 p-3">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                  <div className="relative flex flex-1 items-center">
                    <Search size={18} className="absolute left-3 text-gray-400" />
                    <input type="text" autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={isHindi ? "आटा, तेल, दाल खोजें..." : "Search atta, oil, dal..."} className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm font-medium outline-none focus:border-[#800020] focus:bg-white" />
                  </div>
                  <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="rounded-full bg-gray-100 p-2.5 text-gray-600 hover:bg-gray-200"><X size={20} /></button>
                </form>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {!searchQuery.trim() ? (
                  <div className="mt-8 text-center text-gray-400">
                    <Search size={48} className="mx-auto mb-3 opacity-40" />
                    <p className="text-sm font-bold">{isHindi ? "कुछ खोजें..." : "Start typing to search..."}</p>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="mt-8 text-center text-gray-400">
                    <Package size={48} className="mx-auto mb-3 opacity-40" />
                    <p className="text-sm font-bold">{isHindi ? "कोई उत्पाद नहीं मिला" : "No products found"}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {searchResults.slice(0, 10).map((product) => (
                      <a key={product.id} href={`/products/${product.slug || product.id}`} onClick={() => { setSearchOpen(false); setSearchQuery(""); }} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 hover:bg-gray-50 transition">
                        <div className="h-12 w-12 shrink-0 rounded-lg bg-gray-50 p-1 flex items-center justify-center">
                          <img src={product.image} alt={product.name} className="h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-800 truncate">{isHindi ? product.nameHi : product.name}</p>
                          <p className="text-xs font-black text-[#800020] mt-0.5">₹{product.price}</p>
                        </div>
                        <ArrowUpRight size={16} className="text-gray-400" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================
          MOBILE MENU DRAWER
          ========================================= */}
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
                    <a href="/account" onClick={() => setMenuOpen(false)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#800020] py-3 text-sm font-bold text-white"><User size={18} /> My Account</a>
                    <button onClick={handleLogout} className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-3 text-sm font-bold text-red-600"><LogOut size={18} /> Logout</button>
                  </>
                ) : (
                  <a href="/login" onClick={() => setMenuOpen(false)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#800020] py-3 text-sm font-bold text-white"><User size={18} /> {isHindi ? "लॉगिन करें" : "Login / Sign Up"}</a>
                )}

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <a href="/loyalty/staff" onClick={() => setMenuOpen(false)} className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 py-2.5 text-[11px] font-bold text-gray-600"><Lock size={14} /> Staff Login</a>
                  <a href="/admin" onClick={() => setMenuOpen(false)} className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 py-2.5 text-[11px] font-bold text-gray-600"><ShieldCheck size={14} /> Admin Panel</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}