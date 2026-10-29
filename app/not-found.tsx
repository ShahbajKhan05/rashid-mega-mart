"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "./components/LanguageProvider";
import { ArrowLeft, Search, Home, ShoppingBag, Compass } from "lucide-react";
import { motion } from "motion/react";

export default function NotFoundPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?category=all&q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#FFF9D8] px-4 text-center">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] h-[40vh] w-[40vh] rounded-full bg-[#800020]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[40vh] w-[40vh] rounded-full bg-[#D4A84F]/10 blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Premium Illustration (SVG art) */}
        <div className="relative mx-auto mb-8 flex h-48 w-48 items-center justify-center">
          {/* Background Circle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#800020]/10 to-[#D4A84F]/10" />
          
          {/* Floating Elements */}
          <motion.div 
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-2 -right-2 text-4xl"
          >
            ❓
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }} 
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute bottom-2 -left-2 text-4xl"
          >
            🛒
          </motion.div>

          {/* Main Icon (Shopping Bag with Search) */}
          <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-white shadow-xl rotate-3 border border-gray-100">
            <ShoppingBag size={56} className="text-[#800020]" />
            <div className="absolute -bottom-3 -right-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#D4A84F] text-white shadow-lg -rotate-12">
              <Search size={24} strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-7xl font-black tracking-tighter text-[#800020] sm:text-8xl drop-shadow-sm">
          404
        </h1>
        
        <h2 className="mt-2 text-2xl font-black text-gray-800 sm:text-3xl">
          {isHindi ? "अरे नहीं! पेज नहीं मिला" : "Oops! Page Not Found"}
        </h2>
        
        <p className="mx-auto mt-3 max-w-md text-sm font-medium text-gray-500">
          {isHindi 
            ? "लगता है आप जो सामान ढूंढ रहे हैं, वो हमारे पास नहीं है या उसका लिंक बदल गया है। चलिए कुछ और ढूंढते हैं!" 
            : "It looks like the page you're looking for doesn't exist or has been moved. Let's find something else you'll love!"}
        </p>

        {/* Search Bar to recover user */}
        <form onSubmit={handleSearch} className="mx-auto mt-8 flex h-14 w-full max-w-sm items-center gap-2 rounded-2xl bg-white px-4 shadow-sm border border-gray-200 focus-within:border-[#800020] transition-all">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isHindi ? "सामान खोजें..." : "Search for products..."}
            className="w-full bg-transparent text-sm font-bold outline-none placeholder:text-gray-400"
          />
          <button type="submit" className="flex h-9 items-center justify-center rounded-xl bg-[#800020] px-4 text-xs font-bold text-white hover:bg-[#600018] transition">
            {isHindi ? "खोजें" : "Search"}
          </button>
        </form>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link 
            href="/" 
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#800020] px-6 py-3.5 text-sm font-black text-white shadow-[0_10px_20px_rgba(128,0,32,0.2)] transition hover:-translate-y-0.5 hover:bg-[#600018]"
          >
            <Home size={18} /> {isHindi ? "होम पर जाएं" : "Back to Home"}
          </Link>
          
          <Link 
            href="/products" 
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white border-2 border-[#800020]/10 px-6 py-3.5 text-sm font-black text-[#800020] shadow-sm transition hover:border-[#800020]/30 hover:bg-[#800020]/5"
          >
            <Compass size={18} /> {isHindi ? "सामान देखें" : "Browse Products"}
          </Link>
        </div>

        {/* Small Footer Note */}
        <p className="mt-12 text-xs font-bold text-gray-400">
          <span className="text-[#800020] font-black">Rashid Mega Mart</span> — {isHindi ? "आपकी रोज़मर्रा की ज़रूरतें" : "Your Daily Needs, Our Priority"}
        </p>
      </motion.div>
    </main>
  );
}