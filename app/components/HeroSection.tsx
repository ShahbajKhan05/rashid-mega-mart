"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";

export default function HeroSection() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  return (
    <section className="relative overflow-hidden bg-[#FFF9D8] pt-24 pb-10 sm:pt-28 sm:pb-14">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        
        {/* 1. HERO MAIN HEADING & SUBHEADING */}
        <h1 className="text-3xl font-black leading-tight tracking-tight text-[#171717] sm:text-5xl">
          {isHindi ? (
            <>
              घर का राशन, <span className="text-[#800020]">सबसे सही दाम में</span>
            </>
          ) : (
            <>
              Everyday Groceries, <br />
              <span className="text-[#800020]">Best Prices Guaranteed.</span>
            </>
          )}
        </h1>

        <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-[#171717]/75 sm:text-sm">
          {isHindi
            ? "राशिद मेगा मार्ट से ₹500 से ₹6000 तक की राशन किट्स सीधे अपने घर मंगवाएं।"
            : "Choose from our ₹500 to ₹6000 curated grocery kits and order directly on WhatsApp."}
        </p>

        {/* 2. LANDSCAPE BANNER IMAGE (PURE IMAGE ONLY) */}
        <div className="relative my-6 w-full overflow-hidden rounded-3xl shadow-md">
          <a href="#kit" className="block relative w-full aspect-[21/9] sm:aspect-[24/8]">
            <Image
              src="/banner-hero.png"
              alt="Rashid Mega Mart Banner"
              fill
              className="object-cover"
              priority
              onError={(e) => {
                e.currentTarget.style.opacity = "0.8";
              }}
            />
          </a>
        </div>

        {/* 3. SLEEK DELIVERY NOTICE */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#800020]/15 bg-white/80 px-4 py-1.5 shadow-xs backdrop-blur-xs">
          <span className="text-base">🛵</span>
          <span className="text-[11px] font-extrabold text-[#800020]">
            {isHindi ? "2 KM तक फ्री होम डिलीवरी • रीवा" : "Free Home Delivery Up to 2 KM • Rewa"}
          </span>
        </div>

        {/* 4. PRIMARY ACTION BUTTONS */}
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="#kit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#800020] px-8 py-3.5 text-xs font-black text-[#FFF9D8] shadow-md transition active:scale-95 hover:bg-[#610019]"
          >
            <span>🛍️</span>
            <span>{isHindi ? "किराना किट्स देखें" : "Explore Grocery Kits"}</span>
          </a>

          <a
            href="https://wa.me/918962531603"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-8 py-3.5 text-xs font-black text-white shadow-md transition active:scale-95 hover:bg-[#1ebf59]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current shrink-0 text-white"
              aria-hidden="true"
            >
              <path d="M12.011 0C5.38 0 0 5.378 0 12.011c0 2.116.551 4.176 1.597 5.986L0 24l6.196-1.625A11.93 11.93 0 0012.011 24C18.64 24 24 18.622 24 12.011 24 5.378 18.64 0 12.011 0zm0 22.013c-1.807 0-3.58-.483-5.132-1.398l-.368-.219-3.815 1.001 1.018-3.72-.239-.381A9.92 9.92 0 012.002 12.01c0-5.518 4.49-10.008 10.009-10.008 5.517 0 10.008 4.49 10.008 10.008 0 5.519-4.49 10.008-10.008 10.008zm5.486-7.502c-.301-.151-1.782-.88-2.058-.981-.275-.1-.476-.151-.677.151-.201.302-.778.981-.954 1.182-.176.201-.352.226-.653.075-.302-.151-1.274-.47-2.427-1.498-.897-.8-1.502-1.788-1.678-2.09-.176-.302-.019-.465.132-.615.136-.135.302-.352.452-.528.151-.176.201-.302.302-.503.101-.201.05-.377-.025-.528-.075-.151-.678-1.634-.929-2.237-.244-.587-.493-.508-.677-.517l-.578-.01c-.201 0-.528.075-.804.377-.276.302-1.055 1.031-1.055 2.514 0 1.483 1.08 2.916 1.231 3.117.151.201 2.126 3.248 5.15 4.554.719.31 1.281.496 1.718.635.722.23 1.38.197 1.9.12.58-.087 1.782-.729 2.033-1.433.251-.704.251-1.307.176-1.433-.075-.126-.276-.201-.577-.352z" />
            </svg>
            <span>{isHindi ? "व्हाट्सएप पर ऑर्डर करें" : "Order on WhatsApp"}</span>
          </a>
        </div>

        {/* 5. MINIMAL FOOTER INFO */}
        <div className="mt-8 flex items-center justify-center gap-4 text-[10px] font-bold text-[#171717]/60">
          <span>📍 Ghoghar, Rewa</span>
          <span>•</span>
          <span>⚡ Cash & UPI</span>
        </div>

      </div>
    </section>
  );
}