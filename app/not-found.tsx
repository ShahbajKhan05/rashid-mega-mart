"use client";

import Link from "next/link";
import Navbar from "./components/Navbar";
import { useLanguage } from "./components/LanguageProvider";

export default function NotFound() {
  const { language } = useLanguage();
  const hindi = language === "hi";

  return (
    <main className="flex min-h-screen flex-col bg-[#FFF9D8] text-[#171717]">
      <Navbar />

      <section className="flex flex-1 flex-col items-center justify-center px-5 pb-12 pt-24 text-center sm:px-8">
        {/* Version 1.0 Highlight Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#800020]/20 bg-[#F4E9C9] px-3.5 py-1 text-[11px] font-extrabold text-[#800020]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#800020] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#800020]"></span>
          </span>
          {hindi ? "वर्ज़न 1.0 लाइव" : "Version 1.0 Live"}
        </div>

        {/* 404 Number */}
        <div className="relative mt-2">
          <span className="burgundy-gradient-text select-none text-[clamp(6rem,22vw,14rem)] font-black leading-none tracking-[-0.09em]">
            404
          </span>

          <span className="absolute -right-2 top-1 text-2xl text-[#800020] sm:-right-4 sm:text-4xl">
            ✳
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#800020] sm:text-xs">
          RASHID MEGA MART · REWA
        </p>

        {/* Heading */}
        <h1 className="mt-2 max-w-2xl text-2xl font-black tracking-tight sm:text-4xl">
          {hindi ? "अरे! यह पेज अभी तैयार हो रहा है।" : "Oops! Page under construction."}
        </h1>

        {/* Message */}
        <p className="mt-3 max-w-md text-xs leading-relaxed text-[#800020]/80 sm:text-sm">
          {hindi
            ? "अभी हमारी वेबसाइट का Version 1.0 चालू है। यह सुविधा और बाकी नए फ़ीचर्स आपको जल्द ही अगले अपडेट में मिलेंगे!"
            : "Currently, Version 1.0 is live! This feature and more exciting facilities will be available in our upcoming Version 2.0 update."}
        </p>

        {/* Info Box - Coming Soon Features */}
        <div className="mt-5 w-full max-w-sm rounded-2xl border border-[#800020]/15 bg-white/60 p-3.5 shadow-xs backdrop-blur-xs">
          <div className="flex items-center justify-between text-left text-[11px] font-bold text-[#171717]">
            <span className="flex items-center gap-1.5">
              <span>🚀</span>
              {hindi ? "v2.0 में क्या आ रहा है?" : "Coming in Version 2.0:"}
            </span>
            <span className="rounded-md bg-[#800020]/10 px-2 py-0.5 text-[9px] font-extrabold text-[#800020]">
              SOON
            </span>
          </div>

          <ul className="mt-2 space-y-1 text-left text-[10px] font-medium text-[#171717]/75">
            <li className="flex items-center gap-1.5">
              <span className="text-[#800020]">✓</span>
              {hindi ? "ऑनलाइन पेमेंट & UPI ट्रैकिंग" : "Online Payment & UPI Tracking"}
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-[#800020]">✓</span>
              {hindi ? "लाइव ऑर्डर स्टेटस & डिलीवरी अपडेट्स" : "Live Order Status & Delivery Updates"}
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-[#800020]">✓</span>
              {hindi ? "कस्टम किट बिल्डर v2" : "Advanced Custom Kit Builder"}
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex w-full flex-col justify-center gap-2.5 sm:w-auto sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#800020] px-6 py-3 text-xs font-bold text-[#FFF9D8] transition duration-200 hover:-translate-y-0.5 hover:bg-[#610019] active:scale-95"
          >
            <span aria-hidden="true">←</span>
            {hindi ? "होम पेज पर जाएँ" : "Back to Home"}
          </Link>

          <Link
            href="/#kit"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#800020]/20 bg-[#F4E9C9] px-6 py-3 text-xs font-bold text-[#800020] transition hover:bg-[#E9DDB5] active:scale-95"
          >
            {hindi ? "उपलब्ध किट देखें" : "Explore Active Kits"}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {/* Footer Brand */}
        <div className="mt-10 border-t border-[#800020]/10 pt-4">
          <p className="text-xs font-bold tracking-tight">
            <span className="text-[#171717]">Rashid </span>
            <span className="burgundy-gradient-text">Mega Mart</span>
          </p>

          <p className="mt-0.5 text-[10px] text-[#800020]/60">
            {hindi
              ? "आपके घर की ज़रूरत, एक ही जगह।"
              : "Your everyday essentials, all in one place."}
          </p>
        </div>
      </section>
    </main>
  );
}