// app/about/AboutClient.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShoppingBasket,
  ArrowRight,
  Tag,
  HeartHandshake,
  ShieldCheck,
  Package,
  MapPin,
} from "lucide-react";
import { useLanguage } from "../components/LanguageProvider";

// Register GSAP Plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutClient() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Section Animation (On Load)
      const heroTl = gsap.timeline();
      heroTl.fromTo(
        ".hero-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.2,
        }
      );

      // 2. Scroll Reveal Animations for Sections (Fade Up)
      const sections = gsap.utils.toArray(".scroll-reveal");
      sections.forEach((section: any) => {
        gsap.fromTo(
          section,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 3. Image Reveal Animation (Clip Path)
      const images = gsap.utils.toArray(".image-reveal");
      images.forEach((img: any) => {
        gsap.fromTo(
          img,
          { clipPath: "inset(0 0 100% 0)", scale: 1.1 },
          {
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
            },
          }
        );
      });

      // 4. Staggered Grid Animations (Categories)
      const grids = gsap.utils.toArray(".stagger-grid");
      grids.forEach((grid: any) => {
        gsap.fromTo(
          grid.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: grid,
              start: "top 85%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-[#FFFCF0] overflow-hidden selection:bg-[#D4A84F] selection:text-[#30251F]"
    >
      {/* =========================================
          SECTION 1: HERO (Premium Editorial)
          ========================================= */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Text */}
          <div className="flex flex-col items-start">
            <div className="hero-reveal mb-6 inline-flex items-center gap-2 rounded-full border border-[#D4A84F]/40 bg-[#FFF9D8] px-4 py-1.5 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#800020] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A47A2C] sm:text-xs">
                {isHindi ? "राशिद मेगा मार्ट की कहानी" : "OUR STORY"}
              </span>
            </div>

            <h1 className="hero-reveal text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[1.05] tracking-tight text-[#30251F]">
              {isHindi ? (
                <>
                  रोज़मर्रा की खरीदारी,
                  <br />
                  <span className="text-[#800020]">अब और आसान।</span>
                </>
              ) : (
                <>
                  Making Everyday
                  <br />
                  <span className="text-[#800020]">Shopping Simpler.</span>
                </>
              )}
            </h1>

            <p className="hero-reveal mt-6 max-w-lg text-sm leading-relaxed text-[#68574A] sm:text-base sm:leading-8">
              {isHindi
                ? "राशिद मेगा मार्ट, घोघर, रीवा (मध्य प्रदेश) में आपका पड़ोसी किराना स्टोर है। हमारा उद्देश्य रोज़मर्रा की ज़रूरतों को एक ही जगह पर लाकर आपकी खरीदारी को आसान बनाना है।"
                : "Rashid Mega Mart is your neighbourhood grocery store serving Ghoghar, Rewa, Madhya Pradesh. We aim to make everyday shopping simpler by bringing essential groceries together in one place."}
            </p>

            <div className="hero-reveal mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/products?category=all"
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#800020] px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#620018]"
              >
                <ShoppingBasket size={18} />
                {isHindi ? "खरीदारी शुरू करें" : "Start Shopping"}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <div className="flex items-center gap-2 text-xs font-bold text-[#76665C]">
                <MapPin size={16} className="text-[#138047]" />
                Ghoghar, Rewa, MP
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hero-reveal relative w-full aspect-[4/5] lg:aspect-square overflow-hidden rounded-[32px] rounded-tl-[120px] border-[6px] border-white bg-[#E9DDB8] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=1200&auto=format&fit=crop"
              alt="Fresh grocery store"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Floating Badge */}
            <div className="absolute bottom-6 left-6 rounded-2xl bg-white/90 p-3 shadow-xl backdrop-blur-md">
              <p className="text-[10px] font-black uppercase text-[#A47A2C] tracking-wider">
                Serving Since
              </p>
              <p className="text-xl font-black text-[#800020]">2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: OUR STORY (Split Layout)
          ========================================= */}
      <section className="border-y border-[#800020]/10 bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Image Grid */}
            <div className="relative w-full h-[400px] lg:h-[500px]">
              <div className="image-reveal absolute top-0 left-0 w-[60%] h-[70%] overflow-hidden rounded-3xl shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop"
                  alt="Store"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="image-reveal absolute bottom-0 right-0 w-[55%] h-[60%] overflow-hidden rounded-3xl border-4 border-white shadow-2xl z-10">
                <img
                  src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=800&auto=format&fit=crop"
                  alt="Aisles"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col items-start">
              <span className="scroll-reveal text-xs font-black uppercase tracking-widest text-[#A47A2C]">
                Who We Are
              </span>
              <h2 className="scroll-reveal mt-3 text-3xl font-black text-[#800020] sm:text-4xl lg:text-5xl">
                {isHindi
                  ? "आपका रोज़मर्रा का किराना स्टोर"
                  : "Your Everyday Grocery Store"}
              </h2>
              <div className="scroll-reveal mt-6 space-y-4 text-sm leading-relaxed text-[#68574A] sm:text-base">
                <p>
                  {isHindi
                    ? "राशिद मेगा मार्ट घोघर, रीवा, मध्य प्रदेश में स्थित आपका पड़ोसी किराना स्टोर है। हमारा लक्ष्य रोज़मर्रा के किराना सामान, घरेलू उत्पादों और वैल्यू किट्स को एक ही जगह पर लाकर खरीदारी को अधिक सुविधाजनक बनाना है।"
                    : "Rashid Mega Mart is your neighbourhood grocery store in Ghoghar, Rewa, Madhya Pradesh. We aim to make everyday shopping more convenient by bringing essential groceries, household products and value kits together in one place."}
                </p>
                <p>
                  {isHindi
                    ? "रोज़मर्रा की रसोई की ज़रूरतों से लेकर स्नैक्स, पर्सनल केयर और घरेलू सामानों तक, हमारा लक्ष्य परिवारों को एक सरल और सुविधाजनक खरीदारी अनुभव के माध्यम से उनके ज़रूरी उत्पादों को खोजने में मदद करना है।"
                    : "From everyday kitchen staples to snacks, personal care and household essentials, our goal is to help families find the products they need through a simple and convenient shopping experience."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 3: MISSION (Big Statement)
          ========================================= */}
      <section className="relative overflow-hidden bg-[#5A0014] py-24 lg:py-32">
        {/* Background Pattern/Texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#FFF9D8 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#D4A84F]/20 blur-[100px]" />

        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <span className="scroll-reveal inline-flex items-center gap-2 rounded-full border border-[#D4A84F]/40 bg-white/10 px-5 py-2 shadow-sm mb-8 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#D4A84F]" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#D4A84F]">
              {isHindi ? "हमारा मिशन" : "OUR MISSION"}
            </span>
          </span>
          <h2 className="scroll-reveal text-[clamp(1.8rem,4vw,3.5rem)] font-black leading-tight text-[#FFF9D8]">
            {isHindi
              ? "स्थानीय परिवारों के लिए रोज़मर्रा की किराना खरीदारी को अधिक सुलभ, सुविधाजनक और सरल बनाना।"
              : "To make everyday grocery shopping more accessible, convenient and straightforward for local families."}
          </h2>
          <div className="scroll-reveal mx-auto mt-10 h-1.5 w-32 rounded-full bg-gradient-to-r from-[#D4A84F] to-transparent" />
        </div>
      </section>

      {/* =========================================
          SECTION 4: OUR PROMISE (Staggered Cards)
          ========================================= */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-16 flex flex-col items-center text-center">
            <h2 className="scroll-reveal text-3xl font-black text-[#800020] sm:text-4xl lg:text-5xl">
              {isHindi ? "हमारा वादा" : "Our Promise"}
            </h2>
            <p className="scroll-reveal mt-4 max-w-2xl text-sm leading-relaxed text-[#68574A] sm:text-base">
              {isHindi
                ? "स्पष्ट उत्पाद जानकारी, पारदर्शी कीमतें और एक सहायक खरीदारी अनुभव—हर बार जब आप हमसे खरीदारी करें।"
                : "Clear product information, transparent prices and a helpful shopping experience—every time you shop with us."}
            </p>
          </div>

          <div className="stagger-grid grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: isHindi ? "स्पष्ट जानकारी" : "Clear Information",
                desc: isHindi
                  ? "हर उत्पाद की स्पष्ट जानकारी।"
                  : "Clear details for every product.",
              },
              {
                icon: Tag,
                title: isHindi ? "पारदर्शी कीमतें" : "Transparent Pricing",
                desc: isHindi
                  ? "कोई छिपा हुआ शुल्क नहीं।"
                  : "No hidden charges, ever.",
              },
              {
                icon: HeartHandshake,
                title: isHindi ? "सहायक अनुभव" : "Helpful Experience",
                desc: isHindi
                  ? "खरीदारी में हर कदम पर मदद।"
                  : "Assistance at every step.",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group flex flex-col items-center text-center rounded-[32px] border border-gray-100 bg-[#FFFCF0] p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-white"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#800020]/5 text-[#800020] mb-6 transition-colors group-hover:bg-[#800020] group-hover:text-white">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-black text-[#30251F]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#76665C]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 5: CATEGORIES (Center Grid)
          ========================================= */}
      <section className="border-t border-[#800020]/10 bg-[#FFFCF0] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 flex flex-col items-center text-center">
            <h2 className="scroll-reveal text-3xl font-black text-[#800020] sm:text-4xl lg:text-5xl">
              {isHindi ? "रोज़मर्रा की ज़रूरतें" : "Everyday Essentials"}
            </h2>
            <p className="scroll-reveal mt-4 text-sm text-[#68574A] sm:text-base">
              {isHindi
                ? "अपनी ज़रूरत के हिसाब से श्रेणियाँ चुनें।"
                : "Choose from categories based on your needs."}
            </p>
          </div>

          <div className="stagger-grid grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
            {[
              {
                titleEn: "Atta & Dal",
                titleHi: "आटा और दाल",
                img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80",
                link: "/products?category=staples",
              },
              {
                titleEn: "Oil & Ghee",
                titleHi: "तेल और घी",
                img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80",
                link: "/products?category=oil",
              },
              {
                titleEn: "Spices",
                titleHi: "मसाले",
                img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80",
                link: "/products?category=masala",
              },
              {
                titleEn: "Snacks",
                titleHi: "स्नैक्स",
                img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80",
                link: "/products?category=snacks",
              },
            ].map((cat, idx) => (
              <Link
                key={idx}
                href={cat.link}
                className="group flex flex-col overflow-hidden rounded-[24px] border border-white bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50">
                  <img
                    src={cat.img}
                    alt={cat.titleEn}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <h3 className="absolute bottom-4 left-4 right-4 text-base font-black text-white sm:text-lg">
                    {isHindi ? cat.titleHi : cat.titleEn}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="scroll-reveal mt-16 text-center">
            <Link
              href="/products?category=all"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#800020]/20 bg-white px-8 py-3 text-sm font-bold text-[#800020] shadow-sm transition-all hover:bg-[#800020] hover:text-white"
            >
              {isHindi ? "सभी श्रेणियाँ देखें" : "View All Categories"}{" "}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 6: FINAL CTA (Premium Banner)
          ========================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-20">
        <div className="scroll-reveal relative overflow-hidden rounded-[40px] bg-[#D4A84F] px-6 py-20 text-center shadow-2xl sm:px-12">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(#30251F 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl font-black text-[#30251F] sm:text-5xl">
              {isHindi ? "आपकी रोज़ की ज़रूरतें," : "Your Daily Needs,"} <br />{" "}
              <span className="text-[#800020]">
                {isHindi ? "एक जगह।" : "One Place."}
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-sm font-medium leading-relaxed text-[#30251F]/80 sm:text-base">
              {isHindi
                ? "रोज़मर्रा का किराना सामान खोजें और अपने घर के लिए सुविधाजनक ग्रोसरी किट्स की खोज करें।"
                : "Explore everyday groceries and discover convenient grocery kits for your household."}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/products?category=all"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#800020] px-8 py-3 text-sm font-black text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-[#5A0014]"
              >
                {isHindi ? "श्रेणियाँ देखें" : "Shop Categories"}{" "}
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/#kit"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border-2 border-[#30251F]/20 bg-white/40 px-8 py-3 text-sm font-black text-[#30251F] backdrop-blur-sm transition-all hover:bg-white/60"
              >
                <Package size={18} />{" "}
                {isHindi ? "ग्रोसरी किट्स" : "Grocery Kits"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}