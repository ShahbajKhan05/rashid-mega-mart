"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t, language } = useLanguage();
  const isHindi = language === "hi";
  const reduceMotion = useReducedMotion();
  const [year, setYear] = useState("2026");

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  return (
    <footer
      id="footer"
      className="relative mt-3 w-full overflow-hidden border-t border-[#800020]/15 bg-[#FFF9D8] px-3 py-3 text-center text-[#171717] sm:px-6 sm:py-4"
    >
      {/* Compact animated divider */}
      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[2px] w-full origin-left bg-[linear-gradient(90deg,#800020,#D4A84F,#800020)]"
        initial={{ scaleX: reduceMotion ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
      />

      <div className="mx-auto max-w-6xl">
        {/* Brand logo and name */}
        <div className="flex flex-col items-center text-center">
          <a
            href="/"
            aria-label="Rashid Mega Mart Home"
            className="mb-0.5 inline-flex items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020]"
          >
            <Image
              src="/Logo.png"
              alt="Rashid Mega Mart logo"
              width={48}
              height={48}
              className="h-8 w-8 object-contain sm:h-9 sm:w-9"
            />
          </a>

          <a
            href="/"
            className="inline-block text-[21px] font-black leading-tight tracking-tight sm:text-2xl"
          >
            <span className="text-[#171717]">Rashid </span>
            <span className="bg-[linear-gradient(110deg,#171717,#800020_52%,#4B0018)] bg-clip-text text-transparent">
              Mega Mart
            </span>
          </a>

          <p className="mt-0.5 text-[10px] leading-4 text-[#171717]/65 sm:text-xs">
            {isHindi
              ? "आपका भरोसेमंद किराना स्टोर • रीवा"
              : "Your trusted grocery store • Rewa"}
          </p>
        </div>

        {/* Compact store information: three columns on mobile and desktop */}
        <div className="mt-3 grid grid-cols-3 gap-1 border-y border-[#800020]/10 py-2.5 sm:mt-4 sm:gap-4 sm:py-3">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Ghoghar%2C+Rewa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg px-0.5 py-1 transition-colors hover:bg-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020]"
          >
            <MapPin size={16} className="text-[#800020] sm:h-[18px] sm:w-[18px]" />
            <span className="text-[8px] leading-3 text-[#171717]/55 sm:text-[10px]">
              {isHindi ? "स्टोर लोकेशन" : "Store Location"}
            </span>
            <span className="inline-flex items-center justify-center gap-0.5 text-[9px] font-bold leading-3 text-[#171717] sm:text-xs sm:leading-4">
              <span>Ghoghar, Rewa</span>
              <ArrowUpRight size={11} className="shrink-0 text-[#800020]" />
            </span>
          </a>

          <div className="flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg px-0.5 py-1">
            <span className="text-base leading-5" aria-hidden="true">
              🛵
            </span>
            <span className="text-[8px] leading-3 text-[#171717]/55 sm:text-[10px]">
              {isHindi ? "होम डिलीवरी" : "Home Delivery"}
            </span>
            <span className="text-[9px] font-bold leading-3 text-[#800020] sm:text-xs sm:leading-4">
              {isHindi ? "2 KM तक मुफ़्त" : "Free up to 2 KM"}
            </span>
          </div>

          <div className="flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg px-0.5 py-1">
            <span className="text-base font-semibold leading-5" aria-hidden="true">
              ₹
            </span>
            <span className="text-[8px] leading-3 text-[#171717]/55 sm:text-[10px]">
              {isHindi ? "पेमेंट विकल्प" : "Payment Options"}
            </span>
            <span className="text-[9px] font-bold leading-3 text-[#171717] sm:text-xs sm:leading-4">
              Cash &amp; UPI
            </span>
          </div>
        </div>

        {/* Compact navigation */}
        <nav
          aria-label={isHindi ? "फुटर नेविगेशन" : "Footer navigation"}
          className="flex items-center justify-center gap-5 py-2 text-[11px] font-bold sm:gap-6 sm:py-2.5 sm:text-xs"
        >
          <a
            href="/"
            className="transition-colors hover:text-[#800020] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020]"
          >
            {isHindi ? "होम" : "Home"}
          </a>

          <span className="h-1 w-1 rounded-full bg-[#800020]/30" aria-hidden="true" />

          <a
            href="#kit"
            className="transition-colors hover:text-[#800020] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020]"
          >
            {isHindi ? "ग्रोसरी किट्स" : "Grocery Kits"}
          </a>
        </nav>

        {/* Copyright and developer credit */}
        <div className="border-t border-[#800020]/10 pt-2 text-center">
          <p className="text-[9px] leading-4 text-[#171717]/60 sm:text-[11px]">
            © {year} <span className="font-bold text-[#800020]">Rashid Mega Mart</span>
            {" · "}
            {isHindi ? "सर्वाधिकार सुरक्षित" : "All rights reserved"}
          </p>

          <p className="mt-0.5 text-[9px] leading-4 text-[#171717]/60 sm:text-[11px]">
            {t("madeWith")} <span className="text-[#800020]">♥</span>{" "}
            {t("by")} <span className="font-bold text-[#171717]">Noor</span>{" "}
            <span className="font-bold text-[#800020]">Technologies</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
