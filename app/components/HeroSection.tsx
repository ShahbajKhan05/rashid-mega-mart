
"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";

export default function HeroSection() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  return (
    <section className="relative overflow-hidden bg-[#FFF9D8] pt-24 pb-10 sm:pt-28 sm:pb-14">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* 1. HERO HEADING */}
        <h1 className="text-3xl font-black leading-tight tracking-tight text-[#171717] sm:text-5xl">
          {isHindi ? (
            <>
              घर का राशन,{" "}
              <span className="text-[#800020]">
                सबसे सही दाम में
              </span>
            </>
          ) : (
            <>
              Everyday Groceries,
              <br />
              <span className="text-[#800020]">
                Best Prices Guaranteed.
              </span>
            </>
          )}
        </h1>

        {/* 2. SUBHEADING */}
        <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-[#171717]/75 sm:text-sm">
          {isHindi
            ? "राशिद मेगा मार्ट से ₹500 से ₹6000 तक की राशन किट्स सीधे अपने घर मंगवाएं।"
            : "Choose from our ₹500 to ₹6000 curated grocery kits and order directly on WhatsApp."}
        </p>

        {/* 3. BANNER IMAGE */}
        <div className="relative my-6 w-full overflow-hidden rounded-2xl border border-[#800020]/15 bg-[#FFF9D8] shadow-sm sm:rounded-3xl">
          <a
            href="#kit"
            aria-label={
              isHindi ? "राशन किट्स देखें" : "Explore grocery kits"
            }
            className="relative block aspect-[3/1] w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020]"
          >
            <Image
              src="/banner-hero.png"
              alt="Rashid Mega Mart grocery and free delivery offer"
              fill
              sizes="(max-width: 640px) 100vw, 768px"
              className="object-contain"
              priority
            />
          </a>
        </div>

        {/* 4. FREE DELIVERY NOTICE */}
        <div className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-[#800020]/20 bg-white/70 px-4 py-2 shadow-sm">
          <span className="shrink-0 text-base" aria-hidden="true">
            🛵
          </span>

          <span className="text-[10px] font-extrabold text-[#800020] sm:text-[11px]">
            {isHindi
              ? "2 KM तक फ्री होम डिलीवरी • रीवा"
              : "Free Home Delivery Up to 2 KM • Rewa"}
          </span>
        </div>

        {/* 5. ACTION BUTTONS */}
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          {/* Explore Grocery Kits - Filled Burgundy */}
          <a
            href="#kit"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-[#800020] bg-[#800020] px-8 py-3.5 text-xs font-black text-[#FFF9D8] shadow-sm transition-colors duration-200 hover:border-[#610019] hover:bg-[#610019] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#800020]"
          >
            <span aria-hidden="true">🛍️</span>

            <span>
              {isHindi ? "किराना किट्स देखें" : "Explore Grocery Kits"}
            </span>
          </a>

          {/* WhatsApp Order - Green Outline */}
          <a
            href="https://wa.me/918962531603"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              isHindi ? "WhatsApp पर ऑर्डर करें" : "Order on WhatsApp"
            }
            className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border-2 border-[#25D366] bg-transparent px-8 py-3.5 text-xs font-black text-[#075E54] shadow-sm transition-colors duration-200 hover:border-[#128C7E] hover:bg-[#E8FFF0] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#128C7E]"
          >
            <Image
              src="/Whatsapp-3d.svg"
              alt=""
              width={24}
              height={24}
              unoptimized
              aria-hidden="true"
              className="h-6 w-6 shrink-0 object-contain"
            />

            <span>
              {isHindi ? "व्हाट्सएप पर ऑर्डर करें" : "Order on WhatsApp"}
            </span>
          </a>
        </div>

        {/* 6. STORE INFORMATION */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-bold text-[#171717]/65">
          <span>📍 Ghoghar, Rewa</span>
          <span aria-hidden="true">•</span>
          <span>⚡ Cash &amp; UPI</span>
        </div>
      </div>
      {/* Bottom Section Divider */}
<div
  aria-hidden="true"
  className="mx-auto mt-8 h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-[#800020]/100 to-transparent"
/>
    </section>
  );
}
