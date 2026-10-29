"use client";

import { useState, useLayoutEffect, useRef } from "react";
import { Search, ArrowUpRight, X } from "lucide-react";
import Link from "next/link"; // 👈 Link import kiya smooth navigation ke liye
import { useLanguage } from "./LanguageProvider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Category = {
  slug: string;
  en: string;
  hi: string;
  descEn: string;
  descHi: string;
  emoji: string;
  image: string;
  color: string;
};

const categories: Category[] = [
  {
    slug: "staples",
    en: "Atta, Rice & Dal",
    hi: "आटा, चावल और दाल",
    descEn: "Everyday staples for your kitchen",
    descHi: "रोज़मर्रा की रसोई ज़रूरतें",
    emoji: "🌾",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80",
    color: "from-[#FFF2CC] to-[#F5DDA8]",
  },
  {
    slug: "oil",
    en: "Oil & Ghee",
    hi: "तेल और घी",
    descEn: "Daily cooking essentials",
    descHi: "खाना बनाने की ज़रूरतें",
    emoji: "🫒",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80",
    color: "from-[#FFF2C6] to-[#EDE1A5]",
  },
  {
    slug: "masala",
    en: "Spices & Masala",
    hi: "मसाले",
    descEn: "Add flavour to every meal",
    descHi: "खाने में स्वाद बढ़ाएँ",
    emoji: "🌶️",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80",
    color: "from-[#FCE4DF] to-[#F1C9C4]",
  },
  {
    slug: "tea",
    en: "Tea & Coffee",
    hi: "चाय और कॉफी",
    descEn: "Your everyday refreshment",
    descHi: "हर दिन की ताज़गी",
    emoji: "☕",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80",
    color: "from-[#F4E2D6] to-[#E5C5AB]",
  },
  {
    slug: "snacks",
    en: "Snacks & Namkeen",
    hi: "स्नैक्स और नमकीन",
    descEn: "Something tasty to munch",
    descHi: "कुछ चटपटा खाने के लिए",
    emoji: "🍿",
    image: "https://images.unsplash.com/photo-1621939514649-280e2aa2f1c9?w=600&q=80",
    color: "from-[#FFE8CB] to-[#F3CD9F]",
  },
  {
    slug: "biscuits",
    en: "Biscuits & Bakery",
    hi: "बिस्कुट और बेकरी",
    descEn: "Treats for every break",
    descHi: "हर ब्रेक के लिए कुछ खास",
    emoji: "🍪",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=80",
    color: "from-[#F8E5D6] to-[#EAC6A9]",
  },
  {
    slug: "breakfast",
    en: "Breakfast & Instant",
    hi: "नाश्ता और इंस्टेंट",
    descEn: "Quick and easy meals",
    descHi: "जल्दी बनने वाला खाना",
    emoji: "🥣",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80",
    color: "from-[#FBE0E3] to-[#F0C3CE]",
  },
  {
    slug: "dairy",
    en: "Dairy & Breakfast",
    hi: "डेयरी और नाश्ता",
    descEn: "Start your day right",
    descHi: "दिन की अच्छी शुरुआत",
    emoji: "🥛",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80",
    color: "from-[#E4F2F7] to-[#C8E1EC]",
  },
  {
    slug: "personal-care",
    en: "Personal Care",
    hi: "पर्सनल केयर",
    descEn: "Care for yourself daily",
    descHi: "रोज़ाना अपनी देखभाल",
    emoji: "🧴",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80",
    color: "from-[#F5E5F4] to-[#E6CEE7]",
  },
  {
    slug: "cleaning",
    en: "Home Cleaning",
    hi: "घर की सफाई",
    descEn: "Keep your home fresh",
    descHi: "घर को साफ़ रखें",
    emoji: "🧹",
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&q=80",
    color: "from-[#E6F0DF] to-[#CFE1C0]",
  },
  {
    slug: "household",
    en: "Household Essentials",
    hi: "घरेलू ज़रूरतें",
    descEn: "Useful things for your home",
    descHi: "घर के काम की चीज़ें",
    emoji: "🏠",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80",
    color: "from-[#E9E6F8] to-[#D5D0EF]",
  },
];

export default function Categories() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const [search, setSearch] = useState("");
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredCategories = categories.filter((category) => {
    const query = search.trim().toLowerCase();
    return (
      !query ||
      category.en.toLowerCase().includes(query) ||
      category.hi.includes(query) ||
      category.slug.includes(query)
    );
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".category-card",
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="categories"
      className="overflow-hidden bg-[#FFF9D8] px-4 py-10 sm:px-6 lg:px-8 lg:py-16"
    >
      <div ref={containerRef} className="mx-auto max-w-7xl">

        {/* --- HEADER --- */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end mb-10">
          <div className="text-center md:text-left max-w-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A47A2C] sm:text-xs">
              {isHindi ? "आपके पसंदीदा प्रोडक्ट" : "SHOP YOUR FAVOURITES"}
            </p>
            <h2 className="mt-2 text-3xl font-black leading-tight tracking-tight text-[#800020] sm:text-4xl lg:text-5xl">
              {isHindi ? "कैटेगरी से खरीदें" : "Shop by Category"}
            </h2>
            <p className="mt-2 text-sm text-[#685243] sm:text-base">
              {isHindi
                ? "आपकी रोज़ की ज़रूरतें, एक ही जगह।"
                : "Everyday essentials, all in one place."}
            </p>
          </div>

          <div className="flex h-16 min-w-[80px] flex-col items-center justify-center rounded-[20px] bg-gradient-to-br from-[#970027] to-[#600017] px-4 text-white shadow-lg">
            <span className="text-2xl font-black leading-none">
              {filteredCategories.length}
            </span>
            <span className="mt-1 text-[9px] font-extrabold uppercase tracking-wider">
              {isHindi ? "कैटेगरी" : "CATEGORIES"}
            </span>
          </div>
        </div>

        {/* --- SEARCH BAR --- */}
        <div className="mb-8 flex justify-center md:justify-start">
          <label className="flex h-12 w-full max-w-md items-center gap-3 rounded-full border border-white bg-white/60 px-5 shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-[#800020]/20">
            <Search size={20} className="shrink-0 text-[#800020]/60" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label={isHindi ? "कैटेगरी खोजें" : "Search categories"}
              placeholder={
                isHindi
                  ? "कैटेगरी खोजें..."
                  : "Search groceries, snacks, spices..."
              }
              className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#302020] outline-none placeholder:text-[#918071]"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label={isHindi ? "खोज हटाएँ" : "Clear search"}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#800020]/10 text-[#800020] transition hover:bg-[#800020]/20"
              >
                <X size={16} />
              </button>
            )}
          </label>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 lg:gap-6">
          {filteredCategories.map((category) => {
            const imageFailed = failedImages.includes(category.slug);

            return (
              /* 👈 Yahan <a> ko hatakar <Link> kar diya hai */
              <Link
                key={category.slug}
                href={`/products?category=${encodeURIComponent(category.slug)}`}
                className={`category-card group relative isolate flex min-h-[180px] overflow-hidden rounded-[24px] border border-white/90 bg-gradient-to-br shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-h-[220px] sm:rounded-[32px] ${category.color}`}
              >
                {/* Image (Right Side) */}
                {!imageFailed ? (
                  <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[65%] overflow-hidden">
                    <img
                      src={category.image}
                      alt={isHindi ? category.hi : category.en}
                      loading="lazy"
                      onError={() => setFailedImages((prev) => [...prev, category.slug])}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        maskImage: "linear-gradient(to right, transparent 0%, black 60%)",
                        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 60%)",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/[0.05] to-transparent" />
                  </div>
                ) : (
                  <div aria-hidden="true" className="absolute bottom-2 right-2 z-0 text-7xl opacity-20">
                    {category.emoji}
                  </div>
                )}

                {/* Decorative Circle */}
                <span aria-hidden="true" className="pointer-events-none absolute -right-6 -top-8 z-0 h-24 w-24 rounded-full border border-white/50 bg-white/20 sm:h-32 sm:w-32" />

                {/* Content (Left Side) */}
                <div className="relative z-10 flex w-[75%] flex-col justify-between p-4 sm:p-5">
                  <div>
                    <h3 className="text-[15px] font-black leading-[1.15] text-[#800020] sm:text-lg lg:text-xl">
                      {isHindi ? category.hi : category.en}
                    </h3>
                    <p className="mt-1.5 text-[10px] font-bold leading-[1.4] text-[#55483C] sm:text-xs">
                      {isHindi ? category.descHi : category.descEn}
                    </p>
                  </div>

                  <span className="mt-4 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#800020] sm:text-xs">
                    {isHindi ? "अभी देखें" : "Explore"}
                    <ArrowUpRight
                      size={14}
                      strokeWidth={3}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>

                {/* Floating Emoji */}
                <span aria-hidden="true" className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white/80 text-sm shadow-sm backdrop-blur-sm sm:h-10 sm:w-10 sm:text-lg">
                  {category.emoji}
                </span>

                {/* Floating Arrow Button */}
                <span className="absolute bottom-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#800020] shadow-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#800020] group-hover:text-white sm:h-10 sm:w-10">
                  <ArrowUpRight size={16} strokeWidth={2.5} />
                </span>
              </Link>
            );
          })}
        </div>

        {/* --- EMPTY STATE --- */}
        {filteredCategories.length === 0 && (
          <div className="mt-8 rounded-3xl border border-white bg-white/50 px-4 py-12 text-center shadow-sm">
            <p className="text-4xl">🔎</p>
            <h3 className="mt-3 text-lg font-black text-[#800020]">
              {isHindi ? "कोई कैटेगरी नहीं मिली" : "No categories found"}
            </h3>
            <p className="mt-1 text-sm text-[#685243]">
              {isHindi ? "कृपया दूसरा नाम खोजें।" : "Please try a different search term."}
            </p>
            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-6 rounded-xl bg-[#800020] px-6 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#600018]"
            >
              {isHindi ? "सभी कैटेगरी दिखाएँ" : "Show all categories"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}