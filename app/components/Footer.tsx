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
      className="relative mt-6 w-full overflow-hidden border-t border-[#800020]/15 bg-[#FFF9D8] px-4 py-6 text-center text-[#171717] sm:px-6 sm:py-8"
    >
      {/* Subtle animated top divider */}
      <motion.div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[3px] w-full origin-left bg-[linear-gradient(90deg,#800020,#D4A84F,#800020)]"
        initial={{ scaleX: reduceMotion ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: reduceMotion ? 0 : 0.8,
          ease: "easeOut",
        }}
      />

      <div className="mx-auto max-w-6xl">
        {/* Centered Store Logo and Brand */}
        <div className="flex flex-col items-center text-center">
          <a
            href="/"
            aria-label="Rashid Mega Mart Home"
            className="mb-2 inline-flex items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#800020]"
          >
            <Image
              src="/Logo.png"
              alt="Rashid Mega Mart logo"
              width={72}
              height={72}
              priority
              className="h-12 w-12 object-contain sm:h-14 sm:w-14"
            />
          </a>

          <a
            href="/"
            className="inline-block text-2xl font-black tracking-tight sm:text-3xl"
          >
            <span className="text-[#171717]">Rashid </span>
            <span className="bg-[linear-gradient(110deg,#171717,#800020_52%,#4B0018)] bg-clip-text text-transparent">
              Mega Mart
            </span>
          </a>

          <p className="mt-1 text-xs text-[#171717]/65 sm:text-sm">
            {isHindi
              ? "आपका भरोसेमंद किराना स्टोर • रीवा"
              : "Your trusted grocery store • Rewa"}
          </p>
        </div>

        {/* Centered Store Information */}
        <div className="mt-5 grid grid-cols-1 gap-4 border-y border-[#800020]/10 py-4 sm:grid-cols-3 sm:gap-5">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Ghoghar%2C+Rewa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 rounded-xl p-2 transition-colors hover:bg-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020]"
          >
            <MapPin size={19} className="text-[#800020]" />
            <p className="text-[10px] text-[#171717]/55">
              {isHindi ? "स्टोर लोकेशन" : "Store Location"}
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#171717]">
              Ghoghar, Rewa
              <ArrowUpRight size={13} className="text-[#800020]" />
            </span>
          </a>

          <div className="flex flex-col items-center justify-center gap-1 rounded-xl p-2">
            <span className="text-xl" aria-hidden="true">
              🛵
            </span>
            <p className="text-[10px] text-[#171717]/55">
              {isHindi ? "होम डिलीवरी" : "Home Delivery"}
            </p>
            <p className="text-xs font-bold text-[#800020]">
              {isHindi ? "2 KM तक मुफ़्त" : "Free up to 2 KM"}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 rounded-xl p-2">
            <span className="text-xl font-semibold" aria-hidden="true">
              ₹
            </span>
            <p className="text-[10px] text-[#171717]/55">
              {isHindi ? "पेमेंट विकल्प" : "Payment Options"}
            </p>
            <p className="text-xs font-bold text-[#171717]">Cash &amp; UPI</p>
          </div>
        </div>

        {/* Simple Navigation */}
        <nav
          aria-label={isHindi ? "फुटर नेविगेशन" : "Footer navigation"}
          className="mt-4 flex items-center justify-center gap-6 text-xs font-bold"
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

        {/* Copyright and Developer Credit */}
        <div className="mt-4 border-t border-[#800020]/10 pt-3 text-center">
          <p className="text-[10px] text-[#171717]/60 sm:text-[11px]">
            © {year}{" "}
            <span className="font-bold text-[#800020]">Rashid Mega Mart</span>
            {" · "}
            {isHindi ? "सर्वाधिकार सुरक्षित" : "All rights reserved"}
          </p>

          <p className="mt-1.5 text-[10px] text-[#171717]/60 sm:text-[11px]">
            {t("madeWith")} <span className="text-[#800020]">♥</span>{" "}
            {t("by")} <span className="font-bold text-[#171717]">Noor</span>{" "}
            <span className="font-bold text-[#800020]">Technologies</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
