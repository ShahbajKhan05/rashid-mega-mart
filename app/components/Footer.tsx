
"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [time, setTime] = useState("--:--:--");
  const [year, setYear] = useState(2026);

  useEffect(() => {
    // Get the current year in the browser
    setYear(new Date().getFullYear());

    // Live Indian Standard Time clock
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    };

    updateTime();

    const interval = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <footer
      id="contact"
      className="mt-auto w-full bg-[#FFF9D8] px-5 pb-7 pt-[clamp(4rem,8vw,7rem)] sm:px-[5%]"
    >
      <div className="mx-auto max-w-[1600px]">
        <a
          href="#home"
          aria-label="Rashid Mega Mart - Back to top"
          className="block w-full text-center text-[clamp(2.2rem,10vw,9.5rem)] font-black leading-[0.95] tracking-[-0.075em] no-underline sm:whitespace-nowrap"
        >
          <span className="text-[#171717]">Rashid </span>
          <span className="burgundy-gradient-text">Mega Mart</span>
        </a>

        <div className="mt-7 grid grid-cols-1 items-center gap-3 text-center text-xs sm:grid-cols-3 sm:text-left">
          <p className="text-[#171717]/75">
            © {year}{" "}
            <span className="font-semibold text-[#800020]">
              Rashid Mega Mart
            </span>
          </p>

          <p className="tabular-nums text-[#171717]/75 sm:text-center">
            Time <span className="font-bold text-[#800020]">→</span>{" "}
            <span className="font-semibold text-[#800020]">{time}</span>{" "}
            <span className="text-[#171717]">IST</span>
          </p>

          <a
            href="https://wa.me/918962531603"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#171717]/75 no-underline transition-colors hover:text-[#800020] sm:text-right"
          >
            Contact on{" "}
            <span className="font-semibold text-[#800020]">
              WhatsApp
            </span>{" "}
            <span className="text-[#800020]">↗</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
