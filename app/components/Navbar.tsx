"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "./LanguageProvider";

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: t("home"), href: "/" },
    { label: t("categories"), href: "/#categories" },
    { label: t("offers"), href: "/#offers" },
    { label: t("about"), href: "/about" },
  ];

  const isHindi = language === "hi";

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      {/* Main Luxury Glassmorphism Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#800020]/15 bg-[#FFF9D8]/90 backdrop-blur-md shadow-xs">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:h-16 sm:px-6"
        >
          {/* Mobile Menu Button + Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
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
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#800020]/20 text-[#800020] transition-all hover:bg-[#800020]/10 active:scale-95 md:hidden"
            >
              <svg
                className="h-5 w-5 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Brand Logo & Name */}
            <a
              href="/"
              onClick={closeMenu}
              aria-label="Rashid Mega Mart home"
              className="flex items-center gap-1.5 sm:gap-2"
            >
              <Image
                src="/Logo.png"
                alt="Rashid Mega Mart logo"
                width={36}
                height={36}
                priority
                className="h-7 w-7 shrink-0 object-contain sm:h-9 sm:w-9"
              />

              <span className="whitespace-nowrap text-xs font-black tracking-tight sm:text-base">
                <span className="text-[#171717]">Rashid </span>
                <span className="bg-[linear-gradient(110deg,#171717,#800020_52%,#4B0018)] bg-clip-text text-transparent">
                  Mega Mart
                </span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links (Centered) */}
          <div className="hidden items-center justify-center gap-6 md:flex lg:gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative whitespace-nowrap text-xs font-bold text-[#171717] transition-colors hover:text-[#800020] lg:text-sm group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#800020] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Action: Luxury Animated Language Toggle Button */}
          <div className="flex shrink-0 items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={toggleLanguage}
              aria-label={
                isHindi ? "Switch to English" : "हिंदी में बदलें"
              }
              className="shrink-0 rounded-full border border-[#800020]/25 bg-[linear-gradient(135deg,#FFFDF5,#F4E9C9)] px-4 py-1.5 text-[11px] font-black text-[#800020] shadow-xs transition hover:bg-[#800020] hover:text-[#FFF9D8] sm:text-xs"
            >
              {isHindi ? "English" : "हिंदी"}
            </motion.button>
          </div>
        </nav>
      </header>

      {/* Luxury Animated Mobile Menu Slide-down Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            id="main-menu"
            className="fixed inset-x-0 top-14 bottom-0 z-40 flex flex-col justify-between overflow-y-auto bg-[#FFF9D8]/98 backdrop-blur-xl px-5 py-6 sm:top-16 sm:px-8 md:hidden shadow-2xl border-t border-[#800020]/10"
          >
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#800020]/60">
                Rashid Mega Mart · Rewa
              </p>

              <div className="mt-6 flex flex-col gap-1">
                {links.map((link, idx) => (
                  <motion.a
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between border-b border-[#800020]/10 py-4 text-base font-extrabold text-[#171717] transition-colors hover:text-[#800020]"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-[#800020]" aria-hidden="true">
                      ↗
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Language Switch at bottom of drawer */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  toggleLanguage();
                  closeMenu();
                }}
                className="w-full rounded-2xl border border-[#800020]/25 bg-[#800020] py-3 text-xs font-black text-[#FFF9D8] shadow-md transition hover:bg-[#610019]"
              >
                {isHindi ? "View in English" : "हिंदी में देखें"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}