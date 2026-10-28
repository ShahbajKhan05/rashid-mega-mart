"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import {
  ArrowRight,
  ShoppingBasket,
  Star,
  ShieldCheck,
  Truck,
  BadgeCheck,
  Clock,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function HeroSection() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const containerRef = useRef<HTMLDivElement>(null);
  const basketRef = useRef<HTMLDivElement>(null);
  
  // State for Mouse/Tilt interaction
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Mouse Move Handler (Desktop 3D effect)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!basketRef.current) return;
    const rect = basketRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Dividing to reduce the intensity
    setRotateY(x / 15);
    setRotateX(-y / 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Device Tilt Handler (Mobile 3D effect)
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma is left-to-right tilt, beta is front-to-back tilt
        setRotateY(e.gamma / 2);
        setRotateX(-(e.beta - 45) / 2); // Assuming 45 deg is normal holding angle
      }
    };
    
    // Only add listener if available
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
    }
    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, []);

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

      // 3. Basket Entry & Continuous Floating
      tl.fromTo(
        ".basket-container",
        { scale: 0.8, opacity: 0, rotateY: -30 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 1.2, ease: "back.out(1.2)" },
        "-=0.6"
      );
      
      gsap.to(".basket-container", {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 4. Floating Cards
      gsap.to(".float-card-1", { y: -10, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });
      gsap.to(".float-card-2", { y: 10, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });

      // 5. Floating Product Tags
      gsap.to(".prod-tag-1", { y: -12, x: 5, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 });
      gsap.to(".prod-tag-2", { y: 12, x: -5, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.8 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative flex min-h-[100vh] flex-col justify-center overflow-hidden bg-[#FFFCF0] px-4 pt-10 pb-16 sm:px-6 lg:px-8"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-[#D4A84F]/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[#138047]/5 blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-col items-center">
        
        {/* =========================================
            TOP SECTION: MASKED TEXT (Awward Style)
            ========================================= */}
        <div className="relative flex flex-col items-center justify-center text-center w-full mb-6">
          
          <div className="relative z-10 flex flex-col items-center justify-center leading-[0.85] w-full">
            {/* RASHID */}
            <h1 
              className="mask-text-line text-[clamp(4rem,15vw,13rem)] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000&auto=format&fit=crop')`,
                WebkitBackgroundClip: "text",
              }}
            >
              RASHID
            </h1>

            {/* MEGA MART */}
            <h1 
              className="mask-text-line text-[clamp(3rem,11vw,10rem)] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-cover bg-center mt-[-1%]"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000&auto=format&fit=crop')`,
                WebkitBackgroundClip: "text",
              }}
            >
              MEGA MART
            </h1>
          </div>

          {/* Delivery Tag */}
          <div className="fade-up mt-4 inline-flex items-center gap-2 rounded-full bg-[#D4A84F] px-4 py-1.5 sm:px-5 sm:py-2 text-[10px] sm:text-xs font-black text-[#30251F] shadow-lg z-20">
            <Truck size={14} />
            {isHindi ? "30 मिनट में डिलीवरी" : "Delivery in 30 Mins"}
          </div>
        </div>

        {/* =========================================
            CENTER SECTION: 3D INTERACTIVE BASKET
            ========================================= */}
        <div 
          className="relative w-full max-w-md h-[380px] sm:h-[450px] flex items-center justify-center my-8"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1000px" }}
        >
          {/* Glowing Background Circle */}
          <div className="absolute inset-0 m-auto h-64 w-64 sm:h-80 sm:w-80 rounded-full bg-gradient-to-tr from-[#D4A84F]/30 to-[#800020]/10 blur-3xl rounded-full" />
          
          {/* 
            THE 3D BASKET 
            Yahan aap apni 'Red Basket' ki transparent PNG image daal sakte hain. 
            Abhi ke liye ek placeholder use kiya hai.
          */}
          <div 
            ref={basketRef}
            className="basket-container relative z-10 w-full max-w-[280px] sm:max-w-[340px] transition-transform duration-100 ease-out"
            style={{
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=800&auto=format&fit=crop"
              alt="Grocery Basket"
              className="h-full w-full object-contain drop-shadow-[0_20px_50px_rgba(128,0,32,0.3)]"
              style={{
                maskImage: "radial-gradient(circle, black 70%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(circle, black 70%, transparent 100%)",
              }}
            />
          </div>

          {/* Floating Cards (Depth Effect) */}
          <div className="float-card-1 absolute left-0 top-10 sm:-left-8 flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/90 p-2.5 shadow-xl backdrop-blur-md sm:gap-3 sm:rounded-2xl sm:p-3 z-20" style={{ transform: "translateZ(50px)" }}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#138047] text-white">
              <Star size={20} fill="currentColor" />
            </div>
            <div>
              <p className="text-sm font-black text-[#30251F]">4.9/5</p>
              <p className="text-[10px] font-bold text-gray-500">2,000+ Reviews</p>
            </div>
          </div>

          <div className="float-card-2 absolute right-0 bottom-12 sm:-right-8 flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/90 p-2.5 shadow-xl backdrop-blur-md sm:gap-3 sm:rounded-2xl sm:p-3 z-20" style={{ transform: "translateZ(60px)" }}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4A84F] text-white">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-sm font-black text-[#30251F]">30 Mins</p>
              <p className="text-[10px] font-bold text-gray-500">Fast Delivery</p>
            </div>
          </div>

          {/* Floating Product Tags */}
          <div className="prod-tag-1 absolute -left-4 bottom-20 hidden sm:flex items-center gap-1.5 rotate-[-10deg] rounded-lg bg-white/80 backdrop-blur-sm px-3 py-2 shadow-lg border border-white z-20" style={{ transform: "translateZ(30px)" }}>
             <span className="text-lg">🌾</span>
             <span className="text-xs font-black text-[#800020]">Aashirvaad</span>
          </div>
          <div className="prod-tag-2 absolute -right-4 top-24 hidden sm:flex items-center gap-1.5 rotate-[10deg] rounded-lg bg-white/80 backdrop-blur-sm px-3 py-2 shadow-lg border border-white z-20" style={{ transform: "translateZ(40px)" }}>
             <span className="text-lg">🛢️</span>
             <span className="text-xs font-black text-[#138047]">Fortune Oil</span>
          </div>

        </div>

        {/* =========================================
            BOTTOM SECTION: GLASSMORPHISM INFO
            ========================================= */}
        <div className="relative z-20 w-full max-w-4xl grid grid-cols-1 items-center gap-6 rounded-[32px] border border-white/60 bg-white/70 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:p-8 lg:grid-cols-2">
          
          {/* Left Content */}
          <div className="flex flex-col items-start">
            <div className="fade-up inline-flex items-center gap-2 rounded-full border border-[#D4A84F]/40 bg-[#FFF9D8] px-3 py-1.5 shadow-sm mb-4">
              <Sparkles size={14} className="text-[#D4A84F]" />
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
                : "Order fresh groceries and budget-friendly kits from Rashid Mega Mart."}
            </p>

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

          {/* Right Content: Trust Badges */}
          <div className="flex flex-col justify-center gap-4 sm:pl-6 lg:border-l border-[#800020]/10 h-full">
            <div className="fade-up flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#138047]/10 text-[#138047]">
                <Truck size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-[#30251F]">{isHindi ? "फ्री डिलीवरी" : "Free Delivery"}</p>
                <p className="text-xs text-[#76665C]">{isHindi ? "ऑर्डर पर डिलीवरी चार्ज नहीं" : "No delivery charges"}</p>
              </div>
            </div>
            <div className="fade-up flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#138047]/10 text-[#138047]">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-[#30251F]">{isHindi ? "100% शुद्ध" : "100% Quality"}</p>
                <p className="text-xs text-[#76665C]">{isHindi ? "सबसे अच्छे ब्रांड्स" : "Best brands guaranteed"}</p>
              </div>
            </div>
            <div className="fade-up flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#138047]/10 text-[#138047]">
                <BadgeCheck size={20} />
              </div>
              <div>
                <p className="text-sm font-black text-[#30251F]">{isHindi ? "सबसे सस्ता" : "Best Prices"}</p>
                <p className="text-xs text-[#76665C]">{isHindi ? "बाजार से कम दाम" : "Lower than market rates"}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}