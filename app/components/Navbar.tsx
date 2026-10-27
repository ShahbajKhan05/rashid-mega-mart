"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  House,
  Package,
  LayoutGrid,
  ShoppingCart,
  Menu,
  X,
  ArrowUpRight,
  MapPin,
  Sparkles,
} from "lucide-react";

import { useLanguage } from "./LanguageProvider";
import { useCart } from "./CartProvider";

type Language = "hi" | "en";

type NavigationLink = {
  key: string;
  label: string;
  href: string;
  icon: typeof House;
  hint: string;
};

function LanguageToggle({
  language,
  onSelect,
  compact = false,
}: {
  language: Language;
  onSelect: (language: Language) => void;
  compact?: boolean;
}) {
  return (
    <div
      role="group"
      aria-label="Select language"
      className={`inline-flex shrink-0 items-center rounded-full border border-white/90 bg-[#F8F0D2] p-1 shadow-[inset_2px_2px_5px_rgba(121,81,43,0.10),inset_-2px_-2px_5px_rgba(255,255,255,0.95),0_3px_8px_rgba(91,0,24,0.06)] ${compact ? "gap-0.5" : "gap-1"}`}
    >
      {(["en", "hi"] as Language[]).map((lang) => {
        const active = language === lang;

        return (
          <button
            key={lang}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(lang)}
            className={`flex items-center justify-center rounded-full font-black transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A84F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF9D8] ${
              compact
                ? "h-7 min-w-7 px-1.5 text-[9px]"
                : "h-8 min-w-9 px-2 text-[10px] sm:min-w-10 sm:text-[11px]"
            } ${
              active
                ? "bg-gradient-to-br from-[#97002A] via-[#800020] to-[#570017] text-[#FFF9D8] shadow-[2px_3px_7px_rgba(91,0,24,0.25),inset_1px_1px_1px_rgba(255,255,255,0.2)]"
                : "text-[#800020]/70 hover:bg-white/80 hover:text-[#800020]"
            }`}
          >
            {lang === "en" ? "EN" : "HI"}
          </button>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const { cartCount, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion() === true;
  const isHindi = language === "hi";
  const cartLabelCount = cartCount > 99 ? "99+" : cartCount;

  const links: NavigationLink[] = [
    {
      key: "home",
      label: isHindi ? "होम" : "Home",
      href: "/",
      icon: House,
      hint: isHindi ? "मुख्य पेज" : "Explore the store",
    },
    {
      key: "kits",
      label: isHindi ? "किराना किट्स" : "Grocery Kits",
      href: "#kit",
      icon: Package,
      hint: isHindi ? "रोज़मर्रा की ज़रूरतें" : "Everyday essentials",
    },
    {
      key: "categories",
      label: isHindi ? "श्रेणियाँ" : "Categories",
      href: "#categories",
      icon: LayoutGrid,
      hint: isHindi ? "अपनी पसंद खोजें" : "Find what you need",
    },
  ];

  const closeMenu = () => setMenuOpen(false);

  const selectLanguage = (nextLanguage: Language) => {
    if (language !== nextLanguage) toggleLanguage();
    closeMenu();
  };

  const handleOpenCart = () => {
    closeMenu();
    openCart();
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) closeMenu();
    };

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#D9B65F]/35 bg-[#FFF9D8]/90 shadow-[0_7px_26px_rgba(65,20,20,0.09),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-2xl">
        <nav
          aria-label={isHindi ? "मुख्य नेविगेशन" : "Main navigation"}
          className="mx-auto flex h-[62px] w-full max-w-7xl items-center gap-2 px-3 sm:h-[70px] sm:gap-4 sm:px-5 lg:gap-6 lg:px-6"
        >
          {/* Compact, tactile mobile menu control */}
          <motion.button
            whileTap={reduceMotion ? undefined : { scale: 0.92 }}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={
              menuOpen
                ? isHindi
                  ? "मेन्यू बंद करें"
                  : "Close menu"
                : isHindi
                  ? "मेन्यू खोलें"
                  : "Open menu"
            }
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] border border-white/90 bg-gradient-to-br from-white to-[#F8EDC9] text-[#800020] shadow-[3px_4px_9px_rgba(95,49,28,0.12),inset_-2px_-2px_4px_rgba(185,145,82,0.10),inset_2px_2px_4px_rgba(255,255,255,0.95)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A84F] sm:h-10 sm:w-10 lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -35, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 35, scale: 0.8 }}
                transition={{ duration: reduceMotion ? 0 : 0.14 }}
                className="flex items-center justify-center"
              >
                {menuOpen ? <X size={19} strokeWidth={2.5} /> : <Menu size={19} strokeWidth={2.5} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Brand stays in normal flow to avoid mobile overlap */}
          <a
            href="/"
            onClick={closeMenu}
            aria-label="Rashid Mega Mart home"
            className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2 lg:flex-none"
          >
            <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-white to-[#F8EDC9] shadow-[2px_3px_8px_rgba(95,49,28,0.12),inset_1px_1px_3px_rgba(255,255,255,0.95)] sm:h-10 sm:w-10">
              <Image
                src="/Logo.png"
                alt="Rashid Mega Mart logo"
                width={44}
                height={44}
                priority
                className="h-[27px] w-[27px] object-contain sm:h-9 sm:w-9"
              />
            </span>
            <span className="min-w-0 truncate text-[10px] font-black leading-tight tracking-tight sm:text-sm xl:text-base">
              <span className="text-[#2A211B]">Rashid </span>
              <span className="bg-gradient-to-r from-[#A32640] via-[#800020] to-[#570017] bg-clip-text text-transparent">
                Mega Mart
              </span>
            </span>
          </a>

          {/* Desktop navigation */}
          <div className="ml-auto hidden flex-1 items-center justify-center gap-5 lg:flex xl:gap-8">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={closeMenu}
                  className="group relative inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm font-extrabold text-[#42302A] transition-all duration-200 hover:bg-white/75 hover:text-[#800020] xl:text-[15px]"
                >
                  <Icon size={16} strokeWidth={2} className="text-[#800020]/75 transition-transform duration-200 group-hover:-translate-y-0.5" />
                  {link.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#800020] to-[#D4A84F] transition-transform duration-200 group-hover:scale-x-100" />
                </a>
              );
            })}
          </div>

          {/* Language and cart controls stay compact on phones */}
          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 lg:ml-4">
            <div className="hidden sm:block">
              <LanguageToggle language={language} onSelect={selectLanguage} />
            </div>
            <motion.button
              whileHover={reduceMotion ? undefined : { y: -1, scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.94 }}
              type="button"
              onClick={handleOpenCart}
              aria-label={isHindi ? `कार्ट खोलें, ${cartCount} आइटम` : `Open cart, ${cartCount} items`}
              className="group relative flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] border border-[#A32640]/25 bg-gradient-to-br from-[#97002A] via-[#800020] to-[#570017] text-white shadow-[3px_4px_10px_rgba(91,0,24,0.24),inset_1px_1px_2px_rgba(255,255,255,0.18)] transition-shadow hover:shadow-[4px_6px_14px_rgba(91,0,24,0.30)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A84F] sm:h-10 sm:w-10 lg:w-auto lg:gap-2 lg:px-3"
            >
              <ShoppingCart size={18} strokeWidth={2.3} className="transition-transform duration-200 group-hover:-rotate-6" />
              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-[#FFF9D8] bg-gradient-to-br from-[#E6C66D] to-[#C99B39] px-1 text-[9px] font-black leading-none text-[#35120D] sm:h-5 sm:min-w-5 sm:text-[10px] lg:static lg:ml-0.5 lg:border-0">
                {cartLabelCount}
              </span>
              <span className="hidden text-xs font-extrabold sm:text-sm lg:inline">{isHindi ? "कार्ट" : "Cart"}</span>
            </motion.button>
          </div>
        </nav>
      </header>

      {/* Mobile clay-style navigation sheet */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label={isHindi ? "मेन्यू बंद करें" : "Close menu"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-[#241013]/45 backdrop-blur-[3px] lg:hidden"
            />

            <motion.div
              id="main-menu"
              initial={{ opacity: 0, y: reduceMotion ? 0 : -9, scale: reduceMotion ? 1 : 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -8, scale: reduceMotion ? 1 : 0.99 }}
              transition={{ duration: reduceMotion ? 0 : 0.19, ease: "easeOut" }}
              className="fixed inset-x-3 top-[70px] z-50 flex max-h-[calc(100dvh-82px)] flex-col overflow-y-auto rounded-[26px] border border-white/90 bg-gradient-to-br from-[#FFFDF0] via-[#FFF9D8] to-[#F8EDC9] p-3.5 shadow-[12px_16px_34px_rgba(35,0,10,0.24),inset_2px_2px_5px_rgba(255,255,255,0.95),inset_-3px_-3px_7px_rgba(191,151,85,0.12)] sm:inset-x-5 sm:top-[78px] sm:max-h-[calc(100dvh-94px)] sm:rounded-[30px] sm:p-5 lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label={isHindi ? "नेविगेशन मेन्यू" : "Navigation menu"}
            >
              {/* Store identity */}
              <div className="relative mb-3 overflow-hidden rounded-[21px] border border-white/90 bg-white/45 p-4 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.95),inset_-2px_-2px_6px_rgba(197,157,86,0.10)] sm:mb-4 sm:p-5">
                <span aria-hidden="true" className="absolute -right-5 -top-8 h-24 w-24 rounded-full bg-[#E7C66F]/20 blur-xl" />
                <span aria-hidden="true" className="absolute right-5 top-5 h-2 w-2 rounded-full bg-[#D4A84F]/70" />
                <div className="relative flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white bg-gradient-to-br from-white to-[#F5E8BF] text-[#800020] shadow-[3px_4px_9px_rgba(95,49,28,0.10),inset_1px_1px_3px_rgba(255,255,255,0.95)]">
                    <Image src="/Logo.png" alt="" width={40} height={40} className="h-9 w-9 object-contain" />
                  </span>
                  <div className="min-w-0 flex-1">
                    
                    <h2 className="mt-1 text-[17px] font-black leading-tight tracking-tight text-[#800020] sm:text-xl">
                      {isHindi ? "राशिद मेगा मार्ट" : "Rashid Mega Mart"}
                    </h2>
                    <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-[#6B5547] sm:text-xs">
                      <MapPin size={12} className="shrink-0 text-[#A47A2C]" />
                      {isHindi ? "घोघर, रीवा, मध्य प्रदेश" : "Ghoghar, Rewa, Madhya Pradesh"}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mb-2 px-1 text-[9px] font-black uppercase tracking-[0.17em] text-[#A47A2C] sm:text-[10px]">
                {isHindi ? "दुकान ब्राउज़ करें" : "BROWSE THE STORE"}
              </p>

              {/* Raised navigation tiles */}
              <div className="flex flex-col gap-2">
                {links.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.key}
                      href={link.href}
                      onClick={closeMenu}
                      initial={{ opacity: 0, x: reduceMotion ? 0 : -7 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: reduceMotion ? 0 : index * 0.035 }}
                      className="group flex min-h-[58px] items-center justify-between rounded-[18px] border border-white/95 bg-gradient-to-br from-white/90 to-[#FFF8DF]/85 px-3 py-2.5 text-[#34251F] shadow-[4px_5px_11px_rgba(109,73,42,0.08),inset_1px_1px_3px_rgba(255,255,255,0.95)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E5CC8A] hover:shadow-[5px_7px_14px_rgba(109,73,42,0.12)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A84F]"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-white bg-gradient-to-br from-white to-[#F5EACB] text-[#800020] shadow-[2px_3px_7px_rgba(95,49,28,0.10),inset_1px_1px_3px_rgba(255,255,255,0.95)] transition-all duration-200 group-hover:bg-[#800020] group-hover:text-white">
                          <Icon size={18} strokeWidth={2.1} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[13px] font-black leading-tight sm:text-sm">{link.label}</span>
                          <span className="mt-1 block text-[10px] font-medium text-[#8A7464] sm:text-[11px]">{link.hint}</span>
                        </span>
                      </span>
                      <span className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#A32640]/65 transition-all duration-200 group-hover:bg-[#800020]/5 group-hover:text-[#800020]">
                        <ArrowUpRight size={16} strokeWidth={2.2} />
                      </span>
                    </motion.a>
                  );
                })}
              </div>

              {/* High-contrast cart action */}
              <motion.button
                whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                type="button"
                onClick={handleOpenCart}
                className="mt-3 flex min-h-[52px] w-full items-center justify-between rounded-[18px] border border-[#A32640]/40 bg-gradient-to-r from-[#940027] via-[#800020] to-[#590018] px-4 py-3 text-left text-sm font-black text-white shadow-[4px_6px_13px_rgba(91,0,24,0.24),inset_1px_1px_2px_rgba(255,255,255,0.18)] transition-all hover:-translate-y-0.5 hover:shadow-[5px_8px_16px_rgba(91,0,24,0.29)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A84F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF9D8]"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.12)]">
                    <ShoppingCart size={18} strokeWidth={2.2} />
                  </span>
                  {isHindi ? "आपका कार्ट" : "Your Cart"}
                </span>
                <span className="flex min-h-7 min-w-7 items-center justify-center rounded-full border border-[#F5D98E]/80 bg-gradient-to-br from-[#F2D67C] to-[#C99B39] px-2 text-[11px] font-black text-[#35120D] shadow-[2px_3px_6px_rgba(30,0,0,0.18)]">
                  {cartLabelCount}
                </span>
              </motion.button>

              {/* Language selector */}
              <div className="mt-3 flex items-center justify-between gap-3 rounded-[18px] border border-white/90 bg-white/40 px-3.5 py-3 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.85),inset_-2px_-2px_5px_rgba(197,157,86,0.08)] sm:mt-4 sm:px-4">
                <div className="min-w-0">
                  <p className="text-[12px] font-black text-[#34251F] sm:text-sm">
                    {isHindi ? "भाषा चुनें" : "Choose language"}
                  </p>
                  <p className="mt-0.5 text-[10px] font-medium text-[#8A7464] sm:text-[11px]">
                    {isHindi ? "अपनी पसंद की भाषा" : "Select your preference"}
                  </p>
                </div>
                <LanguageToggle language={language} onSelect={selectLanguage} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
