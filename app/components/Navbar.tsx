
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "motion/react";
import { Award, Sparkles } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

type ComingSoonBadgeProps = {
  isHindi: boolean;
  reduceMotion: boolean;
};

function ComingSoonBadge({
  isHindi,
  reduceMotion,
}: ComingSoonBadgeProps) {
  return (
    <motion.span
      animate={
        reduceMotion
          ? undefined
          : {
              boxShadow: [
                "0 1px 3px rgba(212,168,79,0.12)",
                "0 2px 10px rgba(212,168,79,0.35)",
                "0 1px 3px rgba(212,168,79,0.12)",
              ],
            }
      }
      transition={{
        duration: 2.4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative inline-flex shrink-0 items-center gap-1 overflow-hidden whitespace-nowrap rounded-full border border-[#D4A84F]/70 bg-[linear-gradient(120deg,#FFF8D9,#FFE7A0,#FFF4C8)] px-1.5 py-1 text-[7px] font-black tracking-wide text-[#800020] sm:px-2 sm:text-[8px]"
    >
      {!reduceMotion && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
          animate={{ x: ["-150%", "450%"] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: "easeInOut",
          }}
        />
      )}

      <motion.span
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : { rotate: [0, 12, -8, 0] }
        }
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <Award size={11} strokeWidth={2.5} />
      </motion.span>

      <span className="relative">
        {isHindi ? "जल्द आ रहा है" : "COMING SOON"}
      </span>

      <Sparkles
        size={9}
        className="relative text-[#B8860B]"
        aria-hidden="true"
      />
    </motion.span>
  );
}

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion() === true;
  const isHindi = language === "hi";

  const links = [
    {
      key: "home",
      label: t("home"),
      href: "/",
      comingSoon: false,
    },
    {
      key: "kits",
      label: isHindi ? "किराना किट्स" : "Grocery Kits",
      href: "#kit",
      comingSoon: false,
    },
    {
      key: "categories",
      label: t("categories"),
      comingSoon: true,
    },
    {
      key: "offers",
      label: t("offers"),
      comingSoon: true,
    },
    {
      key: "about",
      label: t("about"),
      comingSoon: true,
    },
  ];

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      {/* Main Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#800020]/15 bg-[#FFF9D8]/95 shadow-sm backdrop-blur-md">
        <nav
          aria-label="Main navigation"
          className="relative mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:h-16 sm:px-6"
        >
          {/* Left: Mobile Menu */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
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
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#800020]/20 text-[#800020] transition-colors hover:bg-[#800020]/10 active:scale-95 lg:hidden"
            >
              <svg
                className="h-5 w-5 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                aria-hidden="true"
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
          </div>

          {/* Center: Logo and Brand Name */}
          <a
            href="/"
            onClick={closeMenu}
            aria-label="Rashid Mega Mart home"
            className="absolute left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap sm:gap-2 lg:static lg:translate-x-0"
          >
            <Image
              src="/Logo.png"
              alt="Rashid Mega Mart logo"
              width={36}
              height={36}
              priority
              className="h-7 w-7 shrink-0 object-contain sm:h-9 sm:w-9"
            />

            <span className="text-xs font-black tracking-tight sm:text-base">
              <span className="text-[#171717]">Rashid </span>
              <span className="bg-[linear-gradient(110deg,#171717,#800020_52%,#4B0018)] bg-clip-text text-transparent">
                Mega Mart
              </span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center justify-center gap-4 lg:flex xl:gap-6">
            {links.map((link) =>
              link.comingSoon ? (
                <div
                  key={link.key}
                  aria-disabled="true"
                  className="inline-flex cursor-not-allowed items-center gap-1.5 whitespace-nowrap text-xs font-bold text-[#171717]/65 xl:text-sm"
                >
                  <span>{link.label}</span>

                  <ComingSoonBadge
                    isHindi={isHindi}
                    reduceMotion={reduceMotion}
                  />
                </div>
              ) : (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={closeMenu}
                  className="group relative inline-flex items-center whitespace-nowrap text-xs font-bold text-[#171717] transition-colors hover:text-[#800020] xl:text-sm"
                >
                  {link.label}

                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#800020] transition-all duration-300 group-hover:w-full" />
                </a>
              )
            )}
          </div>

          {/* Right: Language Toggle */}
          <div className="z-20 ml-auto flex shrink-0 items-center">
            <motion.button
              whileHover={
                reduceMotion ? undefined : { scale: 1.04 }
              }
              whileTap={
                reduceMotion ? undefined : { scale: 0.96 }
              }
              type="button"
              onClick={toggleLanguage}
              aria-label={
                isHindi ? "Switch to English" : "हिंदी में बदलें"
              }
              className="rounded-full border border-[#800020]/25 bg-[linear-gradient(135deg,#FFFDF5,#F4E9C9)] px-3.5 py-1.5 text-[11px] font-black text-[#800020] shadow-sm transition-colors hover:bg-[#800020] hover:text-[#FFF9D8] sm:px-4 sm:text-xs"
            >
              {isHindi ? "English" : "हिंदी"}
            </motion.button>
          </div>
        </nav>
      </header>

      {/* Mobile and Tablet Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : -12,
            }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: reduceMotion ? 0 : -12,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.22,
            }}
            id="main-menu"
            className="fixed inset-x-0 bottom-0 top-14 z-40 flex flex-col justify-between overflow-y-auto border-t border-[#800020]/10 bg-[#FFF9D8] px-5 py-6 shadow-2xl sm:top-16 sm:px-8 lg:hidden"
          >
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#800020]/65">
                Rashid Mega Mart · Rewa
              </p>

              <div className="mt-5 flex flex-col">
                {links.map((link, index) =>
                  link.comingSoon ? (
                    <motion.div
                      key={link.key}
                      initial={{
                        opacity: 0,
                        x: reduceMotion ? 0 : -8,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: reduceMotion ? 0 : index * 0.045,
                      }}
                      aria-disabled="true"
                      className="flex cursor-not-allowed items-center justify-between gap-3 border-b border-[#800020]/10 py-4"
                    >
                      <span className="text-sm font-extrabold text-[#171717]/75 sm:text-base">
                        {link.label}
                      </span>

                      <ComingSoonBadge
                        isHindi={isHindi}
                        reduceMotion={reduceMotion}
                      />
                    </motion.div>
                  ) : (
                    <motion.a
                      key={link.key}
                      initial={{
                        opacity: 0,
                        x: reduceMotion ? 0 : -8,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: reduceMotion ? 0 : index * 0.045,
                      }}
                      href={link.href}
                      onClick={closeMenu}
                      className="flex items-center justify-between border-b border-[#800020]/10 py-4 text-sm font-extrabold text-[#171717] transition-colors hover:text-[#800020] sm:text-base"
                    >
                      <span>{link.label}</span>

                      <span
                        className="text-xs text-[#800020]"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </motion.a>
                  )
                )}
              </div>
            </div>

            {/* Language Switch */}
            <div className="pt-5">
              <button
                type="button"
                onClick={() => {
                  toggleLanguage();
                  closeMenu();
                }}
                className="w-full rounded-2xl border border-[#800020]/25 bg-[#800020] py-3 text-xs font-black text-[#FFF9D8] shadow-sm transition-colors hover:bg-[#610019]"
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
