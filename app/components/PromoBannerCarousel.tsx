
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "./LanguageProvider";

type Promo = {
  id: string;
  eyebrowEn: string;
  eyebrowHi: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  buttonEn: string;
  buttonHi: string;
  href: string;
  image: string;
  theme: string;
  overlay: string;
};

const promos: Promo[] = [
  {
    id: "pantry",
    eyebrowEn: "YOUR DAILY ESSENTIALS",
    eyebrowHi: "रोज़मर्रा की ज़रूरतें",
    titleEn: "Stock up on favourites",
    titleHi: "अपनी पसंद का राशन लें",
    descEn: "Atta, rice, dal and pantry essentials.",
    descHi: "आटा, चावल, दालें और रोज़ का सामान।",
    buttonEn: "Shop groceries",
    buttonHi: "खरीदारी करें",
    href: "#categories",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1000&q=85",
    theme: "from-[#FFF5D6] to-[#E9C982]",
    overlay:
      "linear-gradient(90deg,rgba(255,245,214,1) 0%,rgba(255,245,214,.97) 35%,rgba(255,245,214,.76) 53%,rgba(255,245,214,.08) 85%,transparent 100%)",
  },
  {
    id: "spices",
    eyebrowEn: "BRING FLAVOUR HOME",
    eyebrowHi: "हर खाने में स्वाद",
    titleEn: "Spice up your kitchen",
    titleHi: "रसोई में स्वाद बढ़ाएँ",
    descEn: "Explore spices and masala favourites.",
    descHi: "अपने पसंदीदा मसाले और मिक्स खरीदें।",
    buttonEn: "Explore spices",
    buttonHi: "मसाले देखें",
    href: "/products?category=spices",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1000&q=85",
    theme: "from-[#FBE7DB] to-[#E8B6A3]",
    overlay:
      "linear-gradient(90deg,rgba(251,231,219,1) 0%,rgba(251,231,219,.97) 35%,rgba(251,231,219,.76) 53%,rgba(251,231,219,.08) 85%,transparent 100%)",
  },
  {
    id: "snacks",
    eyebrowEn: "MAKE BREAKS DELICIOUS",
    eyebrowHi: "हर ब्रेक बने मज़ेदार",
    titleEn: "Snack time, anytime",
    titleHi: "जब मन करे, कुछ चटपटा",
    descEn: "Discover snacks and bakery treats.",
    descHi: "स्नैक्स, बिस्कुट और बेकरी की चीज़ें।",
    buttonEn: "Explore snacks",
    buttonHi: "स्नैक्स देखें",
    href: "/products?category=snacks",
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1000&q=85",
    theme: "from-[#FFE9CA] to-[#F1C08B]",
    overlay:
      "linear-gradient(90deg,rgba(255,233,202,1) 0%,rgba(255,233,202,.97) 35%,rgba(255,233,202,.75) 53%,rgba(255,233,202,.08) 85%,transparent 100%)",
  },
  {
    id: "tea",
    eyebrowEn: "A LITTLE DAILY JOY",
    eyebrowHi: "हर दिन की छोटी खुशी",
    titleEn: "Make time for chai",
    titleHi: "चाय का मज़ा लें",
    descEn: "Find tea and coffee favourites.",
    descHi: "अपनी पसंद की चाय और कॉफी चुनें।",
    buttonEn: "Explore beverages",
    buttonHi: "चाय-कॉफी देखें",
    href: "/products?category=tea-coffee",
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1000&q=85",
    theme: "from-[#E7EFD8] to-[#C5D4A7]",
    overlay:
      "linear-gradient(90deg,rgba(231,239,216,1) 0%,rgba(231,239,216,.97) 35%,rgba(231,239,216,.76) 53%,rgba(231,239,216,.08) 85%,transparent 100%)",
  },
];

export default function PromoBannerCarousel() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  // Mobile: 1 banner. Tablet/desktop: 2 banners.
  const [perView, setPerView] = useState(1);
  const [trackIndex, setTrackIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [paused, setPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const updateLayout = () => {
      const nextView = window.matchMedia("(min-width: 768px)").matches
        ? 2
        : 1;

      setPerView((previous) =>
        previous === nextView ? previous : nextView
      );
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);

    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const pages = useMemo(() => {
    const result: Promo[][] = [];

    for (let i = 0; i < promos.length; i += perView) {
      result.push(promos.slice(i, i + perView));
    }

    return result;
  }, [perView]);

  // Clone the first and last pages to make the carousel loop smoothly.
  const extendedPages = useMemo(() => {
    if (pages.length <= 1) return pages;

    return [
      pages[pages.length - 1],
      ...pages,
      pages[0],
    ];
  }, [pages]);

  useEffect(() => {
    setTransitionEnabled(false);
    setTrackIndex(pages.length > 1 ? 1 : 0);

    let secondFrame = 0;

    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);

      if (secondFrame) {
        window.cancelAnimationFrame(secondFrame);
      }
    };
  }, [pages.length]);

  // Automatic slide every 4.5 seconds.
  useEffect(() => {
    if (paused || pages.length <= 1) return;

    const timer = window.setInterval(() => {
      setTrackIndex((current) => current + 1);
    }, 2500);

    return () => window.clearInterval(timer);
  }, [paused, pages.length]);

  const handleTransitionEnd = () => {
    if (pages.length <= 1) return;

    // Jump invisibly from the trailing clone to the first real page.
    if (trackIndex === pages.length + 1 || trackIndex === 0) {
      const target = trackIndex === 0 ? pages.length : 1;

      setTransitionEnabled(false);
      setTrackIndex(target);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }
  };

  const goNext = () => {
    setTransitionEnabled(true);
    setTrackIndex((current) => current + 1);
  };

  const goPrevious = () => {
    setTransitionEnabled(true);
    setTrackIndex((current) => current - 1);
  };

  const activeDot =
    pages.length <= 1
      ? 0
      : trackIndex === 0
        ? pages.length - 1
        : trackIndex === pages.length + 1
          ? 0
          : trackIndex - 1;

  const handleTouchEnd = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    const start = touchStartX.current;
    const end = event.changedTouches[0]?.clientX;

    touchStartX.current = null;

    if (start === null || end === undefined) return;

    const distance = start - end;

    if (Math.abs(distance) > 45) {
      if (distance > 0) {
        goNext();
      } else {
        goPrevious();
      }
    }
  };

  return (
    <section
      aria-label={isHindi ? "विशेष ऑफर बैनर" : "Featured shopping banners"}
      aria-roledescription="carousel"
      className="mx-auto mt-4 w-full max-w-7xl px-3 sm:mt-6 sm:px-5 lg:px-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* SLIDER */}
      <div
        className="overflow-hidden rounded-[24px] sm:rounded-[28px]"
        onTouchStart={(event) => {
          touchStartX.current =
            event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex w-full"
          style={{
            transform: `translateX(-${trackIndex * 100}%)`,
            transition: transitionEnabled
              ? "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)"
              : "none",
            willChange: "transform",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedPages.map((page, pageIndex) => (
            <div
              key={`page-${pageIndex}`}
              className="w-full shrink-0 basis-full px-px py-1"
            >
              <div
                className={`grid grid-cols-1 gap-3 ${
                  perView === 2 ? "md:grid-cols-2" : ""
                }`}
              >
                {page.map((promo) => (
                  <a
                    key={promo.id}
                    href={promo.href}
                    className={`rmm-promo-banner group relative isolate flex aspect-[1.8/1] min-h-[176px] items-center overflow-hidden rounded-[22px] border border-white/80 bg-gradient-to-br p-4 sm:aspect-[2/1] sm:min-h-[205px] sm:rounded-[26px] sm:p-5 lg:min-h-[225px] ${promo.theme}`}
                  >
                    {/* PRODUCT / GROCERY IMAGE */}
                    <img
                      src={promo.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      onError={(event) => {
                        event.currentTarget.style.visibility = "hidden";
                      }}
                      className="absolute inset-y-0 right-0 z-0 h-full w-[77%] object-cover object-center transition-transform duration-700 group-hover:scale-105 sm:w-[75%]"
                    />

                    {/* IMAGE FADE FOR TEXT READABILITY */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 z-0"
                      style={{ background: promo.overlay }}
                    />

                    {/* DECORATIVE CLAY CIRCLE */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-7 -top-10 z-0 h-28 w-28 rounded-full border border-white/40 bg-white/10 sm:h-36 sm:w-36"
                    />

                    {/* BANNER CONTENT */}
                    <div className="relative z-10 w-[76%] max-w-[310px] sm:w-[72%]">
                      <p className="text-[8px] font-black uppercase tracking-[0.16em] text-[#9A7229] sm:text-[10px]">
                        {isHindi ? promo.eyebrowHi : promo.eyebrowEn}
                      </p>

                      <h3 className="mt-1.5 text-[19px] font-black leading-[1.12] tracking-tight text-[#800020] sm:mt-2 sm:text-[23px] lg:text-[26px]">
                        {isHindi ? promo.titleHi : promo.titleEn}
                      </h3>

                      <p className="mt-2 max-w-[245px] text-[10px] font-medium leading-relaxed text-[#574638] sm:text-xs">
                        {isHindi ? promo.descHi : promo.descEn}
                      </p>

                      <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#800020] px-3 py-2 text-[9px] font-extrabold text-white shadow-[3px_4px_9px_rgba(91,0,23,0.2)] transition-all duration-200 group-hover:gap-3 group-hover:bg-[#5F0018] sm:mt-4 sm:px-4 sm:py-2.5 sm:text-[11px]">
                        {isHindi ? promo.buttonHi : promo.buttonEn}
                        <ArrowRight size={13} strokeWidth={2.5} />
                      </span>
                    </div>

                    {/* SUBTLE EDGE */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-5 bottom-0 z-20 h-px bg-white/80"
                    />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DOTS + MANUAL CONTROLS */}
      <div className="mt-2 flex items-center justify-center gap-3 sm:mt-3">
        <button
          type="button"
          onClick={goPrevious}
          aria-label={isHindi ? "पिछला बैनर" : "Previous banner"}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#800020]/10 bg-[#FFF9D8] text-[#800020] shadow-[2px_3px_7px_rgba(90,50,20,0.08),-2px_-2px_6px_white] transition-colors hover:bg-white"
        >
          <ChevronLeft size={17} />
        </button>

        <div className="flex items-center justify-center gap-1.5">
          {pages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setTransitionEnabled(true);
                setTrackIndex(pages.length > 1 ? index + 1 : 0);
              }}
              aria-label={
                isHindi
                  ? `बैनर ${index + 1} दिखाएँ`
                  : `Show banner ${index + 1}`
              }
              aria-current={activeDot === index ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeDot === index
                  ? "w-6 bg-[#800020]"
                  : "w-2 bg-[#800020]/20 hover:bg-[#800020]/45"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label={isHindi ? "अगला बैनर" : "Next banner"}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#800020]/10 bg-[#FFF9D8] text-[#800020] shadow-[2px_3px_7px_rgba(90,50,20,0.08),-2px_-2px_6px_white] transition-colors hover:bg-white"
        >
          <ChevronRight size={17} />
        </button>
      </div>

      <style>{`
        .rmm-promo-banner {
          -webkit-tap-highlight-color: transparent;
          box-shadow:
            6px 7px 16px rgba(90, 43, 18, 0.09),
            -4px -4px 12px rgba(255, 255, 255, 0.85),
            inset 1px 1px 2px rgba(255, 255, 255, 0.8);
          transition:
            box-shadow 250ms ease,
            transform 250ms ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .rmm-promo-banner:hover {
            box-shadow:
              9px 12px 21px rgba(90, 43, 18, 0.13),
              -4px -4px 12px rgba(255, 255, 255, 0.95),
              inset 1px 1px 2px rgba(255, 255, 255, 0.85);
          }
        }

        .rmm-promo-banner:focus-visible {
          outline: 2px solid #800020;
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          .rmm-promo-banner,
          .rmm-promo-banner img {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
