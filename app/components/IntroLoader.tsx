"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function IntroLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Server Side Rendering (SSR) warning se bachne ke liye
  const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    // 1. Body scroll lock properly handle kiya
    if (isLoading) {
      document.body.style.overflow = "hidden";
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
          document.body.style.overflow = "unset";
        }
      });

      gsap.set(".loader-curtain-panel", { scaleY: 1, transformOrigin: "top" });
      gsap.set(".logo-mask", { clipPath: "circle(0% at 50% 50%)" });
      gsap.set(".logo-img", { scale: 1.2 });
      gsap.set(".text-char", { y: 30, opacity: 0 });
      gsap.set(".credit-text", { opacity: 0, y: 10 });
      gsap.set(".ring-1", { rotation: 0, scale: 0.8, opacity: 0 });
      gsap.set(".ring-2", { rotation: 0, scale: 0.8, opacity: 0 });

      tl
        .to(".logo-mask", { clipPath: "circle(100% at 50% 50%)", duration: 0.6, ease: "power3.out" })
        .to(".logo-img", { scale: 1, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .to(".ring-1", { opacity: 1, scale: 1, rotation: 180, duration: 0.8, ease: "power2.out" }, "-=0.4")
        .to(".ring-2", { opacity: 0.5, scale: 1.1, rotation: -180, duration: 0.8, ease: "power2.out" }, "-=0.6")
        .to(".text-char", { y: 0, opacity: 1, duration: 0.4, stagger: 0.02, ease: "power2.out" }, "-=0.4")
        .to(".credit-text", { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.2")
        .to({}, { duration: 0.3 })
        .to(".text-char, .credit-text, .loader-logo-container", { opacity: 0, y: -20, duration: 0.3, ease: "power2.in" })
        .to(".loader-curtain-panel", { scaleY: 0, duration: 0.6, stagger: 0.05, ease: "power3.inOut" }, "-=0.1");

    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!isLoading) return null;
  
  const brandName = "RASHID MEGA MART";

  return (
    <>
      {/* 🔥 SEO FIX: Google aur Screen Readers ke liye Hidden H1 */}
      <h1 className="sr-only">Rashid Mega Mart - Best Grocery Store in Ghoghar, Rewa</h1>

      <div 
        ref={containerRef} 
        className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
        aria-hidden="true" // Accessibility fix: Loader ko screen reader se chupao
      >
        <div className="absolute inset-0 z-0 flex h-full w-full">
          <div className="loader-curtain-panel h-full w-1/3 bg-[#FFF9D8]" />
          <div className="loader-curtain-panel h-full w-1/3 bg-[#FFF9D8]" />
          <div className="loader-curtain-panel h-full w-1/3 bg-[#FFF9D8]" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center w-full px-4">
          <div className="loader-logo-container relative flex h-32 w-32 sm:h-40 sm:w-40 items-center justify-center">
            <div className="ring-1 absolute inset-0 rounded-full border-[1.5px] border-[#D4A84F] border-dashed" />
            <div className="ring-2 absolute inset-3 sm:inset-4 rounded-full border border-[#5A0014]/20" />
            <div className="logo-mask relative flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-full bg-white shadow-[0_15px_35px_rgba(90,0,20,0.15)]">
              <Image 
                src="/Logo.png" 
                alt="Rashid Mega Mart Logo" 
                width={100} 
                height={100} 
                className="logo-img h-16 w-16 sm:h-24 sm:w-24 object-contain" 
                priority 
              />
            </div>
          </div>
          
          {/* Visual Text (Animation ke liye) */}
          <div className="mt-6 sm:mt-8 flex gap-[2px] sm:gap-1 overflow-hidden text-lg sm:text-2xl md:text-3xl font-black text-[#5A0014] tracking-[0.1em] sm:tracking-[0.2em]">
            {brandName.split("").map((char, index) => (
              <span key={index} className="text-char inline-block origin-bottom">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          {/* Visual Credit */}
          <div className="credit-text mt-8 sm:mt-12 flex flex-col items-center gap-1.5">
            <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.2em] sm:tracking-[0.3em] text-[#5A0014]/50 uppercase">Crafted with Love by</span>
            <div className="flex items-center gap-2">
              <span className="h-px w-4 sm:w-6 bg-[#D4A84F]" />
              <span className="text-[10px] sm:text-xs font-black text-[#D4A84F] tracking-[0.15em] sm:tracking-[0.2em] uppercase">NOOR TECHNOLOGIES</span>
              <span className="h-px w-4 sm:w-6 bg-[#D4A84F]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}