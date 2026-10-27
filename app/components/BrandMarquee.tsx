
"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

type Brand = {
  name: string;
  src: string;
};

const brands: Brand[] = [
  {
    name: "Aashirvaad",
    src: "https://anandoo.in/brand_icons/aashirvaad.png",
  },
  {
    name: "Fortune",
    src: "https://www.indiantelevision.com/sites/default/files/images/tv-images/2020/03/18/fortune.jpg",
  },
  {
    name: "Tata Sampann",
    src: "https://www.tataconsumer.com/sites/g/files/gfwrlq316/files/13_Tata-Sampann_600x567.png",
  },
  {
    name: "India Gate",
    src: "https://cdn.tasteatlas.com/images/productmakers/a4c39d73df0247cc8f7a9e9faa196605.png?mw=670",
  },
  {
    name: "MDH",
    src: "https://www.agnifoods.co.uk/pub/media/codazon_cache/brand/400x400/agni_skin/brand-logo/mdh-logo.png",
  },
  {
    name: "Everest",
    src: "https://suneethafoods.com/cdn/shop/collections/everest_600x600_cb168230-bbb6-48b4-a514-53993ddb5f9f.png?v=1621784809",
  },
  {
    name: "Tata Tea",
    src: "https://logowik.com/content/uploads/images/tata-tea9018.logowik.com.webp",
  },
  {
    name: "Red Label",
    src: "https://www.pngkey.com/png/detail/404-4047815_red-label-brooke-bond-red-label-loose-black.png",
  },
  {
    name: "MAGGI",
    src: "https://toppng.com/uploads/preview/maggi-vector-logo-download-free-11574071817zcshndgenx.png",
  },
  {
    name: "Parle-G",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/05/Parle_G_logo.jpg",
  },
];

function BrandLogo({
  brand,
  duplicate = false,
}: {
  brand: Brand;
  duplicate?: boolean;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      title={brand.name}
      className="flex h-12 w-[74px] shrink-0 items-center justify-center sm:h-14 sm:w-[100px] md:w-[115px]"
    >
      {imageFailed ? (
        <span
          aria-hidden={duplicate}
          className="text-center text-[10px] font-extrabold text-[#800020] sm:text-xs"
        >
          {brand.name}
        </span>
      ) : (
        <img
          src={brand.src}
          alt={duplicate ? "" : brand.name}
          title={brand.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          draggable={false}
          onError={() => setImageFailed(true)}
          className="max-h-10 max-w-[72px] object-contain transition-transform duration-200 hover:scale-105 sm:max-h-12 sm:max-w-[96px] md:max-w-[110px]"
        />
      )}
    </div>
  );
}

export default function BrandMarquee() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  return (
    <section
      id="brands"
      className="overflow-hidden border-y border-[#800020]/10 bg-[#FFF9D8] py-4 sm:py-6"
    >
      {/* HEADING */}
      <div className="mx-auto mb-4 max-w-7xl px-4 text-center sm:mb-5">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#A47A2C] sm:text-xs">
          {isHindi ? "आपके पसंदीदा ब्रांड" : "BRANDS YOU LOVE"}
        </p>

        <h2 className="mt-1 text-lg font-black tracking-tight text-[#800020] sm:text-2xl">
          {isHindi ? "लोकप्रिय किराना ब्रांड" : "Popular Grocery Brands"}
        </h2>
      </div>

      {/* CONTINUOUS BRAND MARQUEE */}
      <div className="rmm-brand-marquee relative w-full">
        {/* Left fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-4 bg-gradient-to-r from-[#FFF9D8] to-transparent sm:w-10"
        />

        {/* Right fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-4 bg-gradient-to-l from-[#FFF9D8] to-transparent sm:w-10"
        />

        <div className="rmm-brand-track flex w-max items-center">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center gap-1 pr-1 sm:gap-2 sm:pr-2 md:gap-3 md:pr-3"
            >
              {brands.map((brand) => (
                <BrandLogo
                  key={`${copy}-${brand.name}`}
                  brand={brand}
                  duplicate={copy === 1}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* MARQUEE ANIMATION */}
      <style>{`
        .rmm-brand-marquee {
          overflow: hidden;
        }

        .rmm-brand-track {
          width: max-content;
          animation: rmm-logo-scroll 32s linear infinite;
          will-change: transform;
        }

        .rmm-brand-marquee:hover .rmm-brand-track {
          animation-play-state: paused;
        }

        @keyframes rmm-logo-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 640px) {
          .rmm-brand-track {
            animation-duration: 26s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .rmm-brand-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
