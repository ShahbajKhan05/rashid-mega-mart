
"use client";

import { useState } from "react";
import { Search, ArrowUpRight, X } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

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
    slug: "atta-flour",
    en: "Atta & Flour",
    hi: "आटा और मैदा",
    descEn: "Everyday flour essentials",
    descHi: "रोज़मर्रा के आटे",
    emoji: "🌾",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80",
    color: "from-[#FFF2CC] to-[#F5DDA8]",
  },
  {
    slug: "rice-dal",
    en: "Rice & Dals",
    hi: "चावल और दालें",
    descEn: "Staples for every kitchen",
    descHi: "हर रसोई की ज़रूरत",
    emoji: "🍚",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80",
    color: "from-[#F8EBDD] to-[#EBD5B9]",
  },
  {
    slug: "oil-ghee",
    en: "Oil & Ghee",
    hi: "तेल और घी",
    descEn: "Daily cooking essentials",
    descHi: "खाना बनाने की ज़रूरतें",
    emoji: "🫒",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80",
    color: "from-[#FFF2C6] to-[#EDE1A5]",
  },
  {
    slug: "spices",
    en: "Spices & Masala",
    hi: "मसाले",
    descEn: "Add flavour to every meal",
    descHi: "खाने में स्वाद बढ़ाएँ",
    emoji: "🌶️",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80",
    color: "from-[#FCE4DF] to-[#F1C9C4]",
  },
  {
    slug: "tea-coffee",
    en: "Tea & Coffee",
    hi: "चाय और कॉफी",
    descEn: "Your everyday refreshment",
    descHi: "हर दिन की ताज़गी",
    emoji: "☕",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=500&q=80",
    color: "from-[#F4E2D6] to-[#E5C5AB]",
  },
  {
    slug: "snacks",
    en: "Snacks & Namkeen",
    hi: "स्नैक्स और नमकीन",
    descEn: "Something tasty to munch",
    descHi: "कुछ चटपटा खाने के लिए",
    emoji: "🍿",
    image: "https://images.unsplash.com/photo-1621939514649-280e2aa2f1c9?w=500&q=80",
    color: "from-[#FFE8CB] to-[#F3CD9F]",
  },
  {
    slug: "biscuits",
    en: "Biscuits & Bakery",
    hi: "बिस्कुट और बेकरी",
    descEn: "Treats for every break",
    descHi: "हर ब्रेक के लिए कुछ खास",
    emoji: "🍪",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&q=80",
    color: "from-[#F8E5D6] to-[#EAC6A9]",
  },
  {
    slug: "instant-food",
    en: "Instant Foods",
    hi: "इंस्टेंट फूड",
    descEn: "Quick and easy meals",
    descHi: "जल्दी बनने वाला खाना",
    emoji: "🍜",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80",
    color: "from-[#FBE0E3] to-[#F0C3CE]",
  },
  {
    slug: "dairy",
    en: "Dairy & Breakfast",
    hi: "डेयरी और नाश्ता",
    descEn: "Start your day right",
    descHi: "दिन की अच्छी शुरुआत",
    emoji: "🥛",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&q=80",
    color: "from-[#E4F2F7] to-[#C8E1EC]",
  },
  {
    slug: "personal-care",
    en: "Personal Care",
    hi: "पर्सनल केयर",
    descEn: "Care for yourself daily",
    descHi: "रोज़ाना अपनी देखभाल",
    emoji: "🧴",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&q=80",
    color: "from-[#F5E5F4] to-[#E6CEE7]",
  },
  {
    slug: "cleaning",
    en: "Home Cleaning",
    hi: "घर की सफाई",
    descEn: "Keep your home fresh",
    descHi: "घर को साफ़ रखें",
    emoji: "🧹",
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=500&q=80",
    color: "from-[#E6F0DF] to-[#CFE1C0]",
  },
  {
    slug: "household",
    en: "Household Essentials",
    hi: "घरेलू ज़रूरतें",
    descEn: "Useful things for your home",
    descHi: "घर के काम की चीज़ें",
    emoji: "🏠",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&q=80",
    color: "from-[#E9E6F8] to-[#D5D0EF]",
  },
];

export default function Categories() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const [search, setSearch] = useState("");
  const [failedImages, setFailedImages] = useState<string[]>([]);

  const filteredCategories = categories.filter((category) => {
    const query = search.trim().toLowerCase();

    return (
      !query ||
      category.en.toLowerCase().includes(query) ||
      category.hi.includes(query) ||
      category.slug.includes(query)
    );
  });

  return (
    <section
      id="categories"
      className="overflow-hidden bg-[#FFF9D8] px-3 py-5 sm:px-5 sm:py-8 lg:px-7 lg:py-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* COMPACT HEADING */}
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.19em] text-[#A47A2C] sm:text-[11px]">
              {isHindi ? "आपके पसंदीदा प्रोडक्ट" : "SHOP YOUR FAVOURITES"}
            </p>

            <h2 className="mt-1 text-[24px] font-black leading-tight tracking-tight text-[#800020] sm:text-3xl lg:text-4xl">
              {isHindi ? "कैटेगरी से खरीदें" : "Shop by Category"}
            </h2>

            <p className="mt-1 text-[11px] text-[#685243] sm:text-sm">
              {isHindi
                ? "आपकी रोज़ की ज़रूरतें, एक ही जगह।"
                : "Everyday essentials, all in one place."}
            </p>
          </div>

          <div className="flex h-12 min-w-[62px] shrink-0 flex-col items-center justify-center rounded-[17px] bg-gradient-to-br from-[#970027] to-[#600017] px-2 text-white shadow-[3px_4px_0_#E8CA8A,0_6px_12px_rgba(99,0,25,0.17)] sm:h-[58px] sm:min-w-[76px]">
            <span className="text-xl font-black leading-none sm:text-2xl">
              {filteredCategories.length}
            </span>
            <span className="mt-1 text-[8px] font-extrabold sm:text-[10px]">
              {isHindi ? "कैटेगरी" : "CATEGORIES"}
            </span>
          </div>
        </div>

        {/* COMPACT SEARCH */}
        <label className="mt-4 flex h-11 items-center gap-2.5 rounded-[15px] border border-white bg-[#FFF9D8] px-3.5 shadow-[inset_3px_3px_7px_rgba(89,50,20,0.07),inset_-3px_-3px_8px_rgba(255,255,255,0.95),3px_4px_9px_rgba(89,50,20,0.04)] transition-shadow focus-within:ring-2 focus-within:ring-[#800020]/10 sm:mt-5 sm:h-12 sm:rounded-full sm:px-5">
          <Search size={18} className="shrink-0 text-[#800020]/65" />

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
            className="min-w-0 flex-1 bg-transparent text-xs font-medium text-[#302020] outline-none placeholder:text-[#918071] sm:text-sm"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label={isHindi ? "खोज हटाएँ" : "Clear search"}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#800020] shadow-sm"
            >
              <X size={14} />
            </button>
          )}
        </label>

        {/* PREMIUM RESPONSIVE GRID */}
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-6 sm:grid-cols-3 sm:gap-3.5 lg:grid-cols-4 lg:gap-4">
          {filteredCategories.map((category, index) => {
            const imageFailed = failedImages.includes(category.slug);

            return (
              <a
                key={category.slug}
                href={`/products?category=${encodeURIComponent(category.slug)}`}
                className={`rmm-award-card group relative isolate flex min-h-[150px] overflow-hidden rounded-[19px] border border-white/90 bg-gradient-to-br p-3 sm:min-h-[185px] sm:rounded-[25px] sm:p-4 lg:min-h-[205px] ${category.color}`}
                style={{ animationDelay: `${Math.min(index, 8) * 35}ms` }}
              >
                {/* PHOTO WITH SOFT FADE */}
                {!imageFailed ? (
                  <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[64%] overflow-hidden">
                    <img
                      src={category.image}
                      alt={isHindi ? category.hi : category.en}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      onError={() =>
                        setFailedImages((previous) =>
                          previous.includes(category.slug)
                            ? previous
                            : [...previous, category.slug]
                        )
                      }
                      className="h-full w-full object-cover object-center opacity-90 transition-transform duration-500 group-hover:scale-110"
                      style={{
                        maskImage:
                          "linear-gradient(to right, transparent 0%, black 65%)",
                        WebkitMaskImage:
                          "linear-gradient(to right, transparent 0%, black 65%)",
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/[0.04] to-transparent" />
                  </div>
                ) : (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-1 right-1 z-0 text-6xl opacity-20 sm:text-7xl"
                  >
                    {category.emoji}
                  </div>
                )}

                {/* CLAY DECORATION */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-5 -top-7 z-0 h-20 w-20 rounded-full border border-white/70 bg-white/20 sm:h-28 sm:w-28"
                />

                {/* TEXT CONTENT */}
                <div className="relative z-10 flex w-[72%] flex-col items-start">
                  <h3 className="max-w-full text-[13px] font-black leading-[1.2] tracking-tight text-[#800020] sm:text-[16px] lg:text-[17px]">
                    {isHindi ? category.hi : category.en}
                  </h3>

                  <p className="mt-1.5 max-w-[95%] text-[9px] font-semibold leading-[1.4] text-[#55483C] sm:mt-2 sm:text-[11px] lg:text-xs">
                    {isHindi ? category.descHi : category.descEn}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[9px] font-extrabold text-[#800020] sm:pt-4 sm:text-[11px]">
                    {isHindi ? "अभी देखें" : "Explore"}
                    <ArrowUpRight
                      size={12}
                      strokeWidth={2.5}
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-[14px] sm:w-[14px]"
                    />
                  </span>
                </div>

                {/* FLOATING CATEGORY ICON */}
                <span
                  aria-hidden="true"
                  className="absolute right-2 top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-white/80 bg-white/75 text-[13px] shadow-[2px_3px_7px_rgba(90,50,20,0.10),-2px_-2px_5px_rgba(255,255,255,0.9)] sm:right-3 sm:top-3 sm:h-9 sm:w-9 sm:text-base"
                >
                  {category.emoji}
                </span>

                {/* FLOATING ARROW */}
                <span className="absolute bottom-2 right-2 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-white bg-[#FFFDF5]/95 text-[#800020] shadow-[3px_4px_8px_rgba(90,40,20,0.13),-2px_-2px_5px_rgba(255,255,255,0.9)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#800020] group-hover:text-white sm:bottom-3 sm:right-3 sm:h-9 sm:w-9">
                  <ArrowUpRight size={16} strokeWidth={2.4} />
                </span>

                {/* PREMIUM LIGHT EDGE */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-4 bottom-0 z-20 h-px bg-white/90"
                />
              </a>
            );
          })}
        </div>

        {/* EMPTY SEARCH STATE */}
        {filteredCategories.length === 0 && (
          <div className="mt-4 rounded-2xl border border-white bg-[#FFF9D8] px-3 py-8 text-center shadow-[inset_3px_3px_9px_rgba(90,50,20,0.05),-3px_-3px_8px_white]">
            <p className="text-3xl">🔎</p>
            <h3 className="mt-2 text-sm font-black text-[#800020]">
              {isHindi ? "कोई कैटेगरी नहीं मिली" : "No categories found"}
            </h3>
            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-3 rounded-xl bg-[#800020] px-4 py-2 text-xs font-bold text-white shadow-md"
            >
              {isHindi ? "सभी कैटेगरी दिखाएँ" : "Show all categories"}
            </button>
          </div>
        )}
      </div>

      <style>{`
        .rmm-award-card {
          box-shadow:
            5px 6px 12px rgba(91, 49, 20, 0.085),
            -4px -4px 11px rgba(255, 255, 255, 0.88),
            inset 1px 1px 2px rgba(255, 255, 255, 0.85);
          transition:
            transform 220ms ease,
            box-shadow 220ms ease;
          animation: rmm-award-enter 380ms ease both;
          -webkit-tap-highlight-color: transparent;
        }

        @media (hover: hover) and (pointer: fine) {
          .rmm-award-card:hover {
            transform: translateY(-3px);
            box-shadow:
              8px 11px 19px rgba(91, 49, 20, 0.13),
              -4px -4px 11px rgba(255, 255, 255, 0.95),
              inset 1px 1px 2px rgba(255, 255, 255, 0.9);
          }
        }

        .rmm-award-card:focus-visible {
          outline: 2px solid #800020;
          outline-offset: 3px;
        }

        @keyframes rmm-award-enter {
          from {
            opacity: 0;
            translate: 0 6px;
          }
          to {
            opacity: 1;
            translate: 0 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .rmm-award-card {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
