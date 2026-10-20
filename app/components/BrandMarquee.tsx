
"use client";

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

export default function BrandMarquee() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const reduceMotion = useReducedMotion() === true;

  const copies = reduceMotion ? [0] : [0, 1];

  return (
    <section
      aria-label={isHindi ? "लोकप्रिय ब्रांड्स" : "Popular brands"}
      className="w-full overflow-hidden bg-[#FFF9D8] py-5 sm:py-7"
    >
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        {/* Centered Heading */}
        <div className="mb-5 text-center">
          <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#800020] sm:text-[10px]">
            {isHindi ? "लोकप्रिय ब्रांड्स" : "POPULAR BRANDS"}
          </p>

          <h2 className="mt-1 text-base font-black tracking-tight text-[#171717] sm:text-xl">
            {isHindi
              ? "जाने-पहचाने ब्रांड्स"
              : "Brands You Know & Love"}
            <span className="text-[#800020]">.</span>
          </h2>
        </div>

        {/* Single-Line Logo Marquee */}
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
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 bg-gradient-to-r from-[#FFF9D8] to-transparent sm:w-10"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-5 bg-gradient-to-l from-[#FFF9D8] to-transparent sm:w-10"
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
            {copies.map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
                className="flex shrink-0 items-center gap-5 pr-5 sm:gap-9 sm:pr-9"
              >
                {BRANDS.map((brand) => (
                  <div
                    key={`${copy}-${brand.name}`}
                    className="flex h-11 w-[82px] shrink-0 items-center justify-center sm:h-14 sm:w-[118px]"
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      title={brand.name}
                      decoding="async"
                      className="max-h-9 max-w-full object-contain mix-blend-multiply sm:max-h-11"
                      onError={(event) => {
                        const logoContainer =
                          event.currentTarget.parentElement;

                        if (logoContainer) {
                          logoContainer.style.display = "none";
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Centered Caption */}
        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="h-px w-6 bg-[#800020]/20 sm:w-8" />

          <p className="text-center text-[9px] text-[#171717]/50">
            {isHindi
              ? "चुनिंदा लोकप्रिय ब्रांड्स"
              : "Selected popular brands"}
          </p>

          <span className="h-px w-6 bg-[#800020]/20 sm:w-8" />
        </div>
      </div>

      {/* Seamless Animation */}
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
  );
}
