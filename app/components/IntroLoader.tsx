"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function IntroLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
          document.body.style.overflow = "unset";
        }
      });

      // Initial Setup
      gsap.set(".loader-curtain-panel", { scaleY: 1, originY: 0 });
      gsap.set(".logo-mask", { clipPath: "circle(0% at 50% 50%)" });
      gsap.set(".logo-img", { scale: 1.5 });
      gsap.set(".text-char", { y: 50, opacity: 0, rotationX: -90 });
      gsap.set(".credit-text", { opacity: 0, y: 20 });
      gsap.set(".ring-1", { rotation: 0, scale: 0.8, opacity: 0 });
      gsap.set(".ring-2", { rotation: 0, scale: 0.8, opacity: 0 });

      // THE CINEMATIC SEQUENCE
      tl
        // 1. Logo Mask Reveal (Camera Focus Effect)
        .to(".logo-mask", {
          clipPath: "circle(100% at 50% 50%)",
          duration: 1.2,
          ease: "power4.inOut"
        })
        .to(".logo-img", {
          scale: 1,
          duration: 1.5,
          ease: "power3.out"
        }, "-=1.2")
        
        // 2. Rings Rotate Around Logo
        .to(".ring-1", {
          opacity: 1,
          scale: 1,
          rotation: 180,
          duration: 1.5,
          ease: "power2.out"
        }, "-=1")
        .to(".ring-2", {
          opacity: 0.5,
          scale: 1.1,
          rotation: -180,
          duration: 1.5,
          ease: "power2.out"
        }, "-=1.3")

        // 3. Text Reveal (One by one with 3D rotation)
        .to(".text-char", {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.5)"
        }, "-=0.8")

        // 4. Noor Tech Credit
        .to(".credit-text", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.2")
        
        // 5. Hold for a moment
        .to({}, { duration: 0.8 })

        // 6. The Award-Winning Panel Exit (Staggered Curtain)
        .to(".text-char, .credit-text, .loader-logo-container", {
          opacity: 0,
          y: -30,
          duration: 0.5,
          ease: "power2.in"
        })
        .to(".loader-curtain-panel", {
          scaleY: 0,
          duration: 0.9,
          stagger: 0.1, // Ek ke baad ek jayega
          ease: "power4.inOut"
        }, "-=0.2");

    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!isLoading) return null;

  const brandName = "RASHID MEGA MART";

  return (
    <div ref={containerRef} className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden">
      
      {/* THE 3-PANEL CURTAIN (Made of Cream color) */}
      <div className="absolute inset-0 z-0 flex h-full w-full">
        <div className="loader-curtain-panel h-full w-1/3 bg-[#FFF9D8]" />
        <div className="loader-curtain-panel h-full w-1/3 bg-[#FFF9D8]" />
        <div className="loader-curtain-panel h-full w-1/3 bg-[#FFF9D8]" />
      </div>

      {/* CONTENT AREA */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Logo & Animated Rings */}
        <div className="loader-logo-container relative flex h-40 w-40 items-center justify-center">
          {/* Animated Golden Rings */}
          <div className="ring-1 absolute inset-0 rounded-full border-[1.5px] border-[#D4A84F] border-dashed" />
          <div className="ring-2 absolute inset-4 rounded-full border border-[#5A0014]/20" />
          
          {/* Logo Mask Container */}
          <div className="logo-mask relative flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-[0_20px_50px_rgba(90,0,20,0.15)]">
            <Image
              src="/Logo.png"
              alt="Rashid Mega Mart"
              width={120}
              height={120}
              className="logo-img h-24 w-24 object-contain"
              priority
            />
          </div>
        </div>

        {/* Cinematic Text Reveal */}
        <div className="mt-8 flex gap-1 overflow-hidden text-2xl sm:text-3xl font-black text-[#5A0014] tracking-[0.2em]">
          {brandName.split("").map((char, index) => (
            <span key={index} className="text-char inline-block origin-bottom">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>

        {/* Noor Tech Credit */}
        <div className="credit-text mt-12 flex flex-col items-center gap-1.5">
          <span className="text-[9px] font-bold tracking-[0.3em] text-[#5A0014]/50 uppercase">
            Crafted with Love by
          </span>
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-[#D4A84F]" />
            <span className="text-xs font-black text-[#D4A84F] tracking-[0.2em] uppercase">
              NOOR TECHNOLOGIES
            </span>
            <span className="h-px w-6 bg-[#D4A84F]" />
          </div>
        </div>

      </div>
    </div>
  );
}