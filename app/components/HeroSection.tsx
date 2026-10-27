"use client";

import { useLanguage } from "./LanguageProvider";

export default function HeroSection() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[620px] w-full scroll-mt-14 items-center justify-center overflow-hidden bg-[#211413] sm:min-h-[680px] sm:scroll-mt-16 lg:min-h-[760px]"
    >
      {/* Background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero.webp')",
        }}
      />

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/65"
      />

      {/* Subtle burgundy and gold glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(128,0,32,0.30),transparent_72%)]"
      />

      {/* Centered hero content */}
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-14 pt-24 text-center sm:px-8 sm:py-28 lg:px-12">
        {/* Top badge */}
        <span className="inline-flex max-w-full items-center justify-center rounded-full border border-[#D4A84F]/80 bg-black/25 px-4 py-2 text-[10px] font-extrabold tracking-[0.12em] text-[#FFE5A0] backdrop-blur-sm sm:px-5 sm:text-xs">
          {isHindi
            ? "आपकी अपनी किराना दुकान"
            : "YOUR NEIGHBOURHOOD GROCERY STORE"}
        </span>

        {/* Main heading */}
        <h1 className="mt-7 w-full text-[clamp(2.1rem,7.5vw,5rem)] font-extrabold leading-[1.15] tracking-tight text-white">
          {isHindi ? (
            <>
              राशिद मेगा मार्ट
              <span className="mt-2 block text-[#FFE19A] sm:mt-4">
                हर घर की ज़रूरत
              </span>
            </>
          ) : (
            <>
              Welcome to
              <span className="mt-2 block text-[#FFE19A] sm:mt-4">
                Rashid Mega Mart
              </span>
            </>
          )}
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/90 sm:mt-7 sm:text-base sm:leading-8 md:text-lg">
          {isHindi
            ? "आपके परिवार की रोज़मर्रा की ज़रूरतों के लिए किराना सामान और किफायती वैल्यू किट्स — सब एक ही जगह।"
            : "Discover everyday groceries and affordable value kits for your family, all in one convenient place."}
        </p>

        {/* Centered buttons */}
        <div className="mt-8 flex w-full max-w-xl flex-col items-stretch justify-center gap-3 min-[460px]:flex-row min-[460px]:items-center sm:mt-9 sm:gap-4">
          <a
            href="#kit"
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-[#800020] px-6 py-3.5 text-center text-sm font-extrabold text-white shadow-lg shadow-black/20 transition duration-200 hover:-translate-y-0.5 hover:bg-[#650019] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFE19A] sm:flex-none sm:px-8 sm:text-base"
          >
            {isHindi ? "किराना किट्स देखें" : "Explore Grocery Kits"}
          </a>

          <a
            href="https://wa.me/918962531603"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-[#FFF9D8]/70 bg-[#FFF9D8]/10 px-6 py-3.5 text-center text-sm font-bold text-white backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#FFF9D8] hover:text-[#800020] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFE19A] sm:flex-none sm:px-8 sm:text-base"
          >
            {isHindi ? "WhatsApp पर संपर्क करें" : "Contact Us"}
          </a>
        </div>

        {/* Store location */}
        <p className="mt-7 flex items-center justify-center gap-2 text-xs font-medium leading-6 text-white/85 sm:mt-8 sm:text-sm">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4 shrink-0 text-[#FFE19A]"
            aria-hidden="true"
          >
            <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>

          <span>
            {isHindi
              ? "घोघर, रीवा, मध्य प्रदेश"
              : "Ghoghar, Rewa, Madhya Pradesh"}
          </span>
        </p>
      </div>

      {/* Bottom brand-colour accent */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#800020] via-[#D4A84F] to-[#FFF9D8]"
      />
    </section>
  );
}