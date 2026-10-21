"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { useReducedMotion } from "motion/react";

const BRANDS = [
  {
    name: "Fortune",
    logo: "https://www.indiantelevision.com/sites/default/files/images/tv-images/2020/03/18/fortune.jpg",
  },
  {
    name: "Parle",
    logo: "https://en.wikipedia.org/wiki/Special:Redirect/file/Parle_Products_logo.svg",
  },
  {
    name: "Britannia",
    logo: "https://en.wikipedia.org/wiki/Special:Redirect/file/Britannia_Industries_logo.svg",
  },
  {
    name: "Haldiram's",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Haldiram%27s_Logo_SVG.svg",
  },
  {
    name: "MAGGI",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Maggi_logo.svg",
  },
  {
    name: "Amul",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Amul_official_logo.svg",
  },
  {
    name: "Colgate",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Colgate_logo_red.svg",
  },
  {
    name: "Dove",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Dove_wordmark.svg",
  },
  {
    name: "Dettol",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Dettol_brand_wordmark.png",
  },
  {
    name: "Tata Salt",
    logo: "https://www.tataconsumer.com/sites/g/files/gfwrlq316/files/2.png",
  },
  {
    name: "Aashirvaad",
    logo: "https://s7ap1.scene7.com/is/content/itcportalprod/Logo_2",
  },
  {
    name: "Patanjali",
    logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Patanjali_Logo.svg",
  },
];

export default function HeroSection() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const reduceMotion = useReducedMotion() ?? false;
  const marqueeCopies = reduceMotion ? [0] : [0, 1];

  return (
    <>
      {/* Compact Hero Section */}
      <section className="relative overflow-hidden bg-[#FFF9D8] pt-20 pb-4 sm:pt-24 sm:pb-5">
        <div className="mx-auto max-w-4xl px-3 text-center sm:px-6">
          {/* Hero Heading */}
          <h1 className="text-2xl font-black leading-tight tracking-tight text-[#171717] sm:text-5xl">
            {isHindi ? (
              <>
                घर का राशन, <span className="text-[#800020]">सबसे सही दाम में</span>
              </>
            ) : (
              <>
                Everyday Groceries,
                <br />
                <span className="text-[#800020]">Best Prices Guaranteed.</span>
              </>
            )}
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-2 max-w-md text-[11px] leading-relaxed text-[#171717]/75 sm:mt-3 sm:text-sm">
            {isHindi
              ? "राशिद मेगा मार्ट से ₹500 से ₹6000 तक की राशन किट्स सीधे अपने घर मंगवाएं।"
              : "Choose from our ₹500 to ₹6000 curated grocery kits and order directly on WhatsApp."}
          </p>

          {/* Promotional Banner */}
          <div className="relative my-3 w-full overflow-hidden rounded-xl border border-[#800020]/15 bg-[#FFF9D8] shadow-sm sm:my-5 sm:rounded-2xl">
            <a
              href="#kit"
              aria-label={isHindi ? "राशन किट्स देखें" : "Explore grocery kits"}
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

          {/* Free Delivery Notice */}
          <div className="inline-flex max-w-full items-center justify-center gap-1.5 rounded-full border border-[#800020]/20 bg-white/70 px-3 py-1.5 shadow-sm sm:gap-2 sm:px-4 sm:py-2">
            <span className="shrink-0 text-sm sm:text-base" aria-hidden="true">
              🛵
            </span>
            <span className="text-[9px] font-extrabold text-[#800020] sm:text-[11px]">
              {isHindi
                ? "2 KM तक फ्री होम डिलीवरी • रीवा"
                : "Free Home Delivery Up to 2 KM • Rewa"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-col justify-center gap-2 sm:mt-5 sm:flex-row sm:gap-3">
            <a
              href="#kit"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border-2 border-[#800020] bg-[#800020] px-6 py-2.5 text-[11px] font-black text-[#FFF9D8] shadow-sm transition-colors duration-200 hover:border-[#610019] hover:bg-[#610019] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#800020] sm:min-h-12 sm:px-8 sm:py-3.5 sm:text-xs"
            >
              <span aria-hidden="true">🛍️</span>
              <span>{isHindi ? "किराना किट्स देखें" : "Explore Grocery Kits"}</span>
            </a>

            <a
              href="https://wa.me/918962531603"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={isHindi ? "WhatsApp पर ऑर्डर करें" : "Order on WhatsApp"}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border-2 border-[#25D366] bg-transparent px-6 py-2.5 text-[11px] font-black text-[#075E54] shadow-sm transition-colors duration-200 hover:border-[#128C7E] hover:bg-[#E8FFF0] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#128C7E] sm:min-h-12 sm:gap-2.5 sm:px-8 sm:py-3.5 sm:text-xs"
            >
              <Image
                src="/Whatsapp-3d.svg"
                alt=""
                width={24}
                height={24}
                unoptimized
                aria-hidden="true"
                className="h-5 w-5 shrink-0 object-contain sm:h-6 sm:w-6"
              />
              <span>{isHindi ? "व्हाट्सएप पर ऑर्डर करें" : "Order on WhatsApp"}</span>
            </a>
          </div>

          {/* Store Information */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[9px] font-bold text-[#171717]/65 sm:mt-6 sm:gap-x-4 sm:text-[10px]">
            <span>📍 Ghoghar, Rewa</span>
            <span aria-hidden="true">•</span>
            <span>⚡ Cash &amp; UPI</span>
          </div>
        </div>

        {/* Compact divider before brand marquee */}
        <div
          aria-hidden="true"
          className="mx-auto mt-4 h-px w-[calc(100%-2rem)] max-w-5xl bg-gradient-to-r from-transparent via-[#800020]/30 to-transparent sm:mt-5"
        />
      </section>

      {/* Compact Popular Brands Marquee */}
      <section
        aria-label={isHindi ? "लोकप्रिय किराना ब्रांड्स" : "Popular grocery brands"}
        className="w-full overflow-hidden bg-[#FFF9D8] py-2.5 sm:py-4"
      >
        <div className="mx-auto max-w-6xl px-3 sm:px-6">
          <div className="mb-2 text-center sm:mb-3">
            <p className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-[#800020] sm:text-[10px]">
              {isHindi ? "लोकप्रिय ब्रांड्स" : "POPULAR BRANDS"}
            </p>
            <h2 className="mt-0.5 text-sm font-black tracking-tight text-[#171717] sm:mt-1 sm:text-xl">
              {isHindi ? "जाने-पहचाने ब्रांड्स" : "Brands You Know & Love"}
              <span className="text-[#800020]">.</span>
            </h2>
          </div>

          <div
            className={
              reduceMotion
                ? "overflow-x-auto"
                : "brand-marquee-viewport relative overflow-hidden"
            }
          >
            {!reduceMotion && (
              <>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 z-10 w-4 bg-gradient-to-r from-[#FFF9D8] to-transparent sm:w-8"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 z-10 w-4 bg-gradient-to-l from-[#FFF9D8] to-transparent sm:w-8"
                />
              </>
            )}

            <div
              className={
                reduceMotion
                  ? "flex w-max items-center"
                  : "brand-marquee-track flex w-max items-center"
              }
            >
              {marqueeCopies.map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1 ? true : undefined}
                  className="flex shrink-0 items-center gap-4 pr-4 sm:gap-8 sm:pr-8"
                >
                  {BRANDS.map((brand) => (
                    <div
                      key={`${copy}-${brand.name}`}
                      title={brand.name}
                      className="flex h-9 w-[72px] shrink-0 items-center justify-center sm:h-12 sm:w-[110px]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        loading="lazy"
                        decoding="async"
                        className="max-h-7 max-w-full object-contain mix-blend-multiply sm:max-h-10"
                        onError={(event) => {
                          const logoContainer = event.currentTarget.parentElement;
                          if (logoContainer) logoContainer.style.display = "none";
                        }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-1.5 flex items-center justify-center gap-2 sm:mt-2 sm:gap-3">
            <span className="h-px w-5 bg-[#800020]/20 sm:w-8" />
            <p className="text-center text-[8px] text-[#171717]/50 sm:text-[9px]">
              {isHindi ? "चुनिंदा लोकप्रिय ब्रांड्स" : "Selected popular brands"}
            </p>
            <span className="h-px w-5 bg-[#800020]/20 sm:w-8" />
          </div>
        </div>

        <style jsx>{`
          @keyframes brandMarquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          .brand-marquee-track {
            animation: brandMarquee 35s linear infinite;
            will-change: transform;
          }

          .brand-marquee-viewport:hover .brand-marquee-track,
          .brand-marquee-viewport:focus-within .brand-marquee-track {
            animation-play-state: paused;
          }

          @media (prefers-reduced-motion: reduce) {
            .brand-marquee-track {
              animation: none;
            }
          }
        `}</style>
      </section>
    </>
  );
}
