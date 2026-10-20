"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();
  const [time, setTime] = useState("--:--");
  const [year, setYear] = useState("2026");

  useEffect(() => {
    setYear(String(new Date().getFullYear()));

    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    };

    updateTime();
    const interval = window.setInterval(updateTime, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <footer className="site-footer w-full shrink-0 border-t border-[#800020]/10 bg-[#FFF9D8] px-4 py-4 text-center">
      <div className="mx-auto max-w-5xl">
        <a
          href="/"
          className="inline-block text-xl font-black tracking-tight no-underline sm:text-2xl"
        >
          <span className="text-[#171717]">Rashid </span>
          <span className="bg-[linear-gradient(110deg,#171717,#800020_52%,#4B0018)] bg-clip-text text-transparent">
            Mega Mart
          </span>
        </a>

        <div className="mx-auto my-3 h-[1px] w-24 bg-[#800020]/15"></div>

        <div className="flex flex-col items-center justify-center gap-1 text-[10px] text-[#171717]/70 sm:text-[11px]">
          <p>
            © {year} <span className="font-semibold text-[#800020]">Rashid Mega Mart</span> | Time: <span className="font-bold text-[#800020]">{time}</span> IST
          </p>
          <p>
            {t("madeWith")} <span className="text-[#800020]">♥</span> {t("by")}{" "}
            <span className="font-bold text-[#171717]">Noor </span>
            <span className="font-bold text-[#800020]">Technologies</span>
          </p>
        </div>
      </div>
    </footer>
  );
}