"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  MessageCircle,
  ShoppingBasket,
  Star,
  ShieldCheck,
  Truck,
  BadgeCheck,
} from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function HeroSection() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const containerRef = useRef<HTMLDivElement>(null);

  // Ek hi Image URL jo dono lines mein use hogi
  const maskedImageUrl = "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000&auto=format&fit=crop";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Text Reveal Animation
      tl.fromTo(
        ".mask-text-line",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, delay: 0.2 }
      );

      // 2. Fade up UI elements
      tl.fromTo(
        ".fade-up",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
        "-=0.8"
      );

      // 3. Floating Cards Loop
      gsap.to(".float-card-1", { y: -10, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".float-card-2", { y: 10, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden bg-[#FFFCF0] px-4 pt-6 pb-16 sm:px-6 lg:px-8"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-[#D4A84F]/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[#138047]/5 blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        
        {/* 
          =========================================
          TOP SECTION: AWARD-WINNING MASKED TEXT
          (Ek hi image dono text lines mein)
          =========================================
        */}
        <div className="relative flex flex-col items-center justify-center text-center mb-6 lg:mb-10 mt-6">
          
          <div className="relative z-10 flex flex-col items-center justify-center leading-[0.85] w-full">
            {/* RASHID */}
            <h1 
              className="mask-text-line text-[clamp(4rem,14vw,13rem)] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-cover bg-center"
              style={{
                backgroundImage: `url('${maskedImageUrl}')`,
                WebkitBackgroundClip: "text",
              }}
            >
              RASHID
            </h1>

            {/* MEGA MART */}
            <h1 
              className="mask-text-line text-[clamp(3rem,11vw,10rem)] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-cover bg-center mt-[-1%]"
              style={{
                backgroundImage: `url('${maskedImageUrl}')`,
                WebkitBackgroundClip: "text",
              }}
            >
              MEGA MART
            </h1>
          </div>

          {/* Tag ko text ke niche shift kar diya taaki text na dhake */}
          <div className="fade-up mt-4 inline-flex items-center gap-2 rounded-full bg-[#D4A84F] px-4 py-1.5 sm:px-5 sm:py-2 text-[10px] sm:text-xs font-black text-[#30251F] shadow-lg">
            <Truck size={14} />
            {isHindi ? "30 मिनट में डिलीवरी" : "Delivery in 30 Mins"}
          </div>
        </div>

        {/* 
          =========================================
          BOTTOM SECTION: GLASSMORPHISM CARD
          =========================================
        */}
        <div className="relative z-20 grid grid-cols-1 items-center gap-6 rounded-[32px] border border-white/60 bg-white/70 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:p-8 lg:grid-cols-2">
          
          {/* Left Content */}
          <div className="flex flex-col items-start">
            <div className="fade-up inline-flex items-center gap-2 rounded-full border border-[#D4A84F]/40 bg-[#FFF9D8] px-3 py-1.5 shadow-sm mb-4">
              <span className="flex h-2 w-2 rounded-full bg-[#138047] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#A47A2C] sm:text-xs">
                {isHindi ? "स्मार्ट बचत किट" : "SMART BACHAT KIT"}
              </span>
            </div>

            <h2 className="fade-up text-2xl font-black text-[#30251F] sm:text-3xl lg:text-4xl leading-tight">
              {isHindi ? "पूरे महीने का राशन," : "Full month ration,"} <br/>
              <span className="text-[#800020]">{isHindi ? "बस ₹499 से।" : "starting at just ₹499."}</span>
            </h2>

            <p className="fade-up mt-3 text-sm font-medium leading-relaxed text-[#68574A] sm:text-base">
              {isHindi
                ? "राशिद मेगा मार्ट से अपनी पसंद का ताज़ा किराना सामान और किफायती किट्स ऑर्डर करें।"
                : "Order fresh groceries and budget-friendly kits from Rashid Mega Mart. Get the best quality at the lowest prices."}
            </p>

            {/* Trust Badges */}
            <div className="fade-up mt-5 flex flex-wrap gap-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#30251F]">
                <Truck size={16} className="text-[#138047]" /> {isHindi ? "फ्री डिलीवरी" : "Free Delivery"}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#30251F]">
                <ShieldCheck size={16} className="text-[#138047]" /> {isHindi ? "100% शुद्ध" : "100% Quality"}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#30251F]">
                <BadgeCheck size={16} className="text-[#138047]" /> {isHindi ? "सबसे सस्ता" : "Best Prices"}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="fade-up mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="#kit"
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#800020] px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#620018]"
              >
                <ShoppingBasket size={18} />
                {isHindi ? "किट्स ऑर्डर करें" : "Order Kits"}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>

              
            </div>
          </div>

          {/* Right Side: Real Image / Video Showcase */}
          <div className="relative w-full h-full flex items-end justify-end mt-6 lg:mt-0">
             
             {/* Main Showcase Image */}
             <div className="relative w-full aspect-video overflow-hidden rounded-2xl border-4 border-white shadow-xl ml-auto">
               <img
                  src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1000&auto=format&fit=crop"
                  alt="Fresh Groceries"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded bg-white/90 px-2 py-1 backdrop-blur-sm">
                  <Star size={12} className="text-[#138047]" fill="currentColor"/>
                  <span className="text-[10px] font-bold">4.9/5 (2,000+)</span>
                </div>
             </div>

             {/* Floating Card 1 */}
            <div className="float-card-1 absolute -left-4 top-4 flex items-center gap-2.5 rounded-xl border border-white/60 bg-white p-2.5 shadow-xl sm:-left-6 sm:top-6 sm:gap-3 sm:rounded-2xl sm:p-3 z-20">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#138047] text-white">
                <Star size={20} fill="currentColor" />
              </div>
              <div>
                <p className="text-sm font-black text-[#30251F]">4.9/5</p>
                <p className="text-[10px] font-bold text-gray-500">2,000+ Reviews</p>
              </div>
            </div>

            {/* Floating Card 2 */}
            <div className="float-card-2 absolute -right-2 bottom-[-10px] flex items-center gap-2.5 rounded-xl border border-white/60 bg-white p-2.5 shadow-xl sm:-right-4 sm:bottom-[-15px] sm:gap-3 sm:rounded-2xl sm:p-3 z-20">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4A84F] text-white">
                <Truck size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-[#30251F]">30 Mins</p>
                <p className="text-[10px] font-bold text-gray-500">Delivery</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}