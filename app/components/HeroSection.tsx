"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  MapPin,
  MessageCircle,
  ShoppingBasket,
  Star,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Clock,
} from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function HeroSection() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Animation
      gsap.from(".hero-animate-text", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1,
        clearProps: "all"
      });

      // 2. Image/Video Animation
      gsap.from(".hero-animate-image", {
        scale: 0.95,
        opacity: 0,
        x: 20,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
        clearProps: "all"
      });

      // 3. Floating Cards
      gsap.to(".float-card-1", { y: -10, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".float-card-2", { y: 10, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });

      // 4. 30 Mins Badge Glow Animation (Gold Glow instead of Maroon)
      gsap.to(".glow-badge", {
        boxShadow: "0px 0px 20px 2px rgba(212, 168, 79, 0.5)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="top"
      // Background color ko halka cream rakha hai
      className="relative overflow-hidden bg-[#FFFCF0] pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-16 lg:pb-20"
    >
      {/* Background Decor - Soft Gold/Green Blurs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 h-[300px] w-[300px] rounded-full bg-[#D4A84F]/10 blur-[80px] sm:h-[500px] sm:w-[500px]" />
        <div className="absolute top-40 -left-20 h-[200px] w-[200px] rounded-full bg-[#138047]/5 blur-[60px] sm:h-[400px] sm:w-[400px]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        
        {/* LEFT: TEXT CONTENT */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          
          {/* Eyebrow */}
          <div className="hero-animate-text inline-flex items-center gap-2 rounded-full border border-[#D4A84F]/40 bg-white px-3 py-1.5 shadow-sm mb-4 sm:mb-6">
            <span className="flex h-2 w-2 rounded-full bg-[#138047] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#A47A2C] sm:text-xs">
              {isHindi ? "किराना • किट्स • डिलीवरी" : "GROCERY • KITS • DELIVERY"}
            </span>
          </div>

          {/* Main Headline (Dark Text instead of Burgundy) */}
          <h1 className="hero-animate-text text-[clamp(2.2rem,5vw,4.2rem)] font-black leading-[1.05] tracking-[-0.03em] text-[#30251F]">
            {isHindi ? (
              <>
                रोज़मर्रा का सामान,
                <span className="mt-2 flex flex-col items-center gap-1 lg:items-start">
                  अब सिर्फ़
                  {/* 30 Mins Highlight Badge */}
                  <span className="glow-badge mt-1 inline-flex items-center gap-2 rounded-2xl bg-[#D4A84F] px-4 py-1.5 text-[#30251F] shadow-lg sm:px-6 sm:py-2">
                    <Clock size={28} className="animate-pulse sm:h-10 sm:w-10" strokeWidth={2.5} />
                    <span className="text-[1.2em] font-black tracking-tighter">30 मिनट</span>
                  </span>
                  में।
                </span>
              </>
            ) : (
              <>
                Daily essentials,
                <span className="mt-2 flex flex-col items-center gap-1 lg:items-start">
                  delivered in
                  {/* 30 Mins Highlight Badge */}
                  <span className="glow-badge mt-1 inline-flex items-center gap-2 rounded-2xl bg-[#D4A84F] px-4 py-1.5 text-[#30251F] shadow-lg sm:px-6 sm:py-2">
                    <Clock size={28} className="animate-pulse sm:h-10 sm:w-10" strokeWidth={2.5} />
                    <span className="text-[1.2em] font-black tracking-tighter">30 mins</span>
                  </span>
                </span>
              </>
            )}
          </h1>

          {/* Subtext */}
          <p className="hero-animate-text mt-5 max-w-md text-sm leading-relaxed text-[#68574A] sm:mt-6 sm:text-base sm:leading-7">
            {isHindi
              ? "राशिद मेगा मार्ट से अपनी पसंद का ताज़ा किराना सामान और किफायती किट्स ऑर्डर करें।"
              : "Order fresh groceries and budget-friendly kits from Rashid Mega Mart. Get the best quality at the lowest prices."}
          </p>

          {/* Trust Microcopy */}
          <div className="hero-animate-text mt-4 flex flex-wrap items-center justify-center gap-3 sm:mt-6 sm:gap-5 lg:justify-start">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#30251F] sm:text-xs">
              <Truck size={14} className="text-[#138047]" />
              {isHindi ? "तेज़ डिलीवरी" : "Fast Delivery"}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#30251F] sm:text-xs">
              <ShieldCheck size={14} className="text-[#138047]" />
              {isHindi ? "100% शुद्ध" : "100% Quality"}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#30251F] sm:text-xs">
              <BadgeCheck size={14} className="text-[#138047]" />
              {isHindi ? "सबसे सस्ता" : "Best Prices"}
            </div>
          </div>

          {/* CTAs */}
          <div className="hero-animate-text mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row">
            <a
              href="#kit"
              className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#800020] px-6 py-2.5 text-sm font-bold text-white shadow-[0_4px_15px_rgba(128,0,32,0.2)] transition-all hover:-translate-y-0.5 hover:bg-[#620018] hover:shadow-[0_8px_20px_rgba(128,0,32,0.3)]"
            >
              <ShoppingBasket size={18} />
              {isHindi ? "किट्स ऑर्डर करें" : "Order Kits"}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="https://wa.me/918962531603"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border-2 border-[#30251F]/10 bg-white px-6 py-2.5 text-sm font-bold text-[#30251F] transition-all hover:border-[#30251F]/30 hover:bg-gray-50"
            >
              <MessageCircle size={18} />
              {isHindi ? "WhatsApp करें" : "WhatsApp Us"}
            </a>
          </div>

          {/* Location */}
          <div className="hero-animate-text mt-5 flex items-center gap-2 text-xs font-medium text-[#76665C] sm:mt-8">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm text-[#A47A2C]">
              <MapPin size={14} />
            </div>
            <span>{isHindi ? "घोघर, रीवा, मध्य प्रदेश" : "Ghoghar, Rewa, Madhya Pradesh"}</span>
          </div>
        </div>

        {/* RIGHT: VIDEO SHOWCASE */}
        <div className="hero-animate-image relative mx-auto w-full max-w-[400px] lg:max-w-none lg:pr-8">
          
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] border-[4px] border-white bg-[#E9DDB8] shadow-[0_15px_40px_rgba(62,32,14,0.1)] sm:rounded-[32px] sm:border-[6px]">
            
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/hero.webp"
              className="h-full w-full object-cover"
            >
              <source src="/AD.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
            
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 pointer-events-none">
              <div className="inline-flex items-center gap-1.5 rounded-md bg-[#D4A84F] px-2 py-1 backdrop-blur-md mb-2">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#30251F] sm:text-[10px]">
                  {isHindi ? "आज का ऑफर" : "TODAY'S OFFER"}
                </span>
              </div>
              <h2 className="max-w-[250px] text-xl font-black leading-tight text-white sm:max-w-sm sm:text-2xl">
                {isHindi
                  ? "पूरे महीने का राशन, बस ₹499 से।"
                  : "Full month ration, starting at just ₹499."}
              </h2>
            </div>
          </div>

          {/* Floating Card 1 */}
          <div className="float-card-1 absolute -left-2 top-4 flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/95 p-2 shadow-xl sm:-left-6 sm:top-8 sm:gap-3 sm:rounded-2xl sm:p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#138047] text-white sm:h-10 sm:w-10">
              <Star size={16} fill="currentColor" className="sm:h-5 sm:w-5" />
            </div>
            <div>
              <p className="text-xs font-black text-[#30251F] sm:text-sm">4.9/5</p>
              <p className="text-[9px] font-bold text-gray-500 sm:text-[10px]">2,000+ Reviews</p>
            </div>
          </div>

          {/* Floating Card 2 */}
          <div className="float-card-2 absolute -right-2 bottom-8 flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/95 p-2 shadow-xl sm:-right-6 sm:bottom-12 sm:gap-3 sm:rounded-2xl sm:p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4A84F] text-white sm:h-10 sm:w-10">
              <Truck size={16} className="sm:h-5 sm:w-5" />
            </div>
            <div>
              <p className="text-xs font-black text-[#30251F] sm:text-sm">30 Mins</p>
              <p className="text-[9px] font-bold text-gray-500 sm:text-[10px]">Delivery</p>
            </div>
          </div>

        </div>
      </div>

      {/* Accent Line - Soft Gold */}
      <div aria-hidden="true" className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#D4A84F] to-transparent" />
    </section>
  );
}