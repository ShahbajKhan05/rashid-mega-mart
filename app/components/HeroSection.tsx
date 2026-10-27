
"use client";

import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function HeroSection() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[560px] w-full scroll-mt-14 items-center overflow-hidden bg-[#241714] sm:min-h-[610px] sm:scroll-mt-16 lg:min-h-[660px]"
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero.webp')" }}
      />

      {/* Dark overlay for readable text */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/65 to-black/20"
      />

      {/* Extra readability on mobile */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/45 via-transparent to-black/10 lg:hidden"
      />

      {/* Main content */}
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <div className="max-w-2xl">

          {/* Store location */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#F0D49A] sm:text-sm">
            <MapPin
              size={16}
              strokeWidth={1.8}
              aria-hidden="true"
            />

            <span>
              {isHindi
                ? "घोघर, रीवा, मध्य प्रदेश"
                : "Ghoghar, Rewa, Madhya Pradesh"}
            </span>
          </div>

          {/* Main heading */}
          <h1 className="mt-6 text-[clamp(2.6rem,7vw,5.2rem)] font-bold leading-[1.08] tracking-[-0.04em] text-white">
            {isHindi ? (
              <>
                राशिद मेगा मार्ट
                <span className="mt-3 block text-[#F0D49A]">
                  आपके घर की ज़रूरतें
                </span>
              </>
            ) : (
              <>
                Welcome to
                <span className="mt-2 block text-[#F0D49A]">
                  Rashid Mega Mart.
                </span>
              </>
            )}
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
            {isHindi
              ? "रोज़मर्रा का किराना सामान और किफायती ग्रोसरी किट्स — आपकी खरीदारी के लिए, एक ही जगह।"
              : "Everyday groceries and affordable grocery kits for your home, all in one convenient place."}
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex w-full max-w-md flex-col gap-3 min-[430px]:flex-row">

            {/* Grocery kits button */}
            <a
              href="#kit"
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#800020] px-5 py-3 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#650019] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F0D49A] sm:flex-none sm:px-6"
            >
              {isHindi ? "ग्रोसरी किट्स देखें" : "Explore Grocery Kits"}

              <ArrowRight size={17} aria-hidden="true" />
            </a>

            {/* WhatsApp contact button */}
            <a
              href="https://wa.me/918962531603"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg border border-white/55 bg-black/15 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-[#800020] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F0D49A] sm:flex-none sm:px-6"
            >
              <MessageCircle size={17} aria-hidden="true" />

              {isHindi ? "हमसे संपर्क करें" : "Contact Us"}
            </a>
          </div>

          {/* Brand signature */}
          <div className="mt-9 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-10 shrink-0 bg-[#D4A84F]"
            />

            <p className="text-[11px] font-medium tracking-wide text-white/70 sm:text-xs">
              {isHindi
                ? "आपकी अपनी किराना दुकान"
                : "Your neighbourhood grocery store"}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom brand accent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#800020] via-[#D4A84F] to-[#800020]"
      />
    </section>
  );
}
