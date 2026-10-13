
"use client";

import Image from "next/image";
import { useState } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Our Kit", href: "#kit" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      {/* Main Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#800020]/10 bg-[#FFF9D8]/95 backdrop-blur-md">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[64px] max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-8"
        >
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            className="mr-3 flex h-10 w-7 shrink-0 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={`h-[2px] w-5 bg-[#800020] transition-transform duration-300 ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-5 bg-[#800020] transition-transform duration-300 ${
                menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>

          {/* Logo + Brand */}
          <a
            href="#home"
            onClick={closeMenu}
            aria-label="Rashid Mega Mart home"
            className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3 md:flex-none"
          >
            <Image
              src="/Logo.png"
              alt="Rashid Mega Mart logo"
              width={40}
              height={40}
              priority
              className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
            />

            <span className="whitespace-nowrap text-[12px] font-extrabold tracking-tight sm:text-base">
              <span className="text-[#171717]">Rashid </span>
              <span className="burgundy-gradient-text">Mega Mart</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-9 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-bold text-[#171717] transition-colors duration-200 hover:text-[#800020] lg:text-base"
              >
                {link.label}
              </a>
            ))}

            <a
              href="https://wa.me/918962531603"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#800020] px-5 py-3 text-sm font-bold text-[#FFF9D8] transition duration-300 hover:-translate-y-0.5 hover:bg-[#610019]"
            >
              WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Mobile Quick Action Icons */}
          <div className="ml-2 flex shrink-0 items-center gap-2 md:hidden">
            {/* WhatsApp Icon */}
            <a
              href="https://wa.me/918962531603"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-9 items-center justify-center rounded-lg text-[#800020] transition-transform active:scale-90"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20l1.2-5.3A8.4 8.4 0 1 1 21 11.5Z" />
                <path d="M8.5 8.5c.5 2.5 2 4 4.5 5" />
              </svg>
            </a>

            {/* Kit Icon */}
            <a
              href="#kit"
              onClick={closeMenu}
              aria-label="View our kit"
              className="flex h-10 w-9 items-center justify-center rounded-lg text-[#800020] transition-transform active:scale-90"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M5 8h14l1 12H4L5 8Z" />
                <path d="M9 9V6a3 3 0 0 1 6 0v3" />
              </svg>
            </a>
          </div>
        </nav>
      </header>

      {/* Navigation Menu Overlay */}
      {menuOpen && (
        <div
          id="main-menu"
          className="mobile-menu-overlay fixed inset-x-0 bottom-0 top-[64px] z-40 flex flex-col bg-[#FFF9D8] px-5 pb-8 pt-8 sm:top-[72px] sm:px-8 md:top-[72px]"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#800020]/70">
            Rashid Mega Mart · Rewa
          </p>

          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center">
            {links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="menu-link flex items-center justify-between border-b border-[#800020]/15 py-6 text-4xl font-extrabold tracking-tight text-[#171717] transition-colors hover:text-[#800020] sm:py-7 sm:text-6xl"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <span>{link.label}</span>
                <span
                  className="text-2xl text-[#800020] sm:text-3xl"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            ))}
          </div>

          <a
            href="https://wa.me/918962531603"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-[#800020] px-6 py-3.5 text-sm font-bold text-[#FFF9D8] transition-colors hover:bg-[#610019]"
          >
            WhatsApp par Order Karein
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      )}
    </>
  );
}
