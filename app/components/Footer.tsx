"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ChevronRight,
  X,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const PHONE = "918962531603";
const PHONE_DISPLAY = "+91 89625 31603";
const EMAIL = "support@rashidmegamart.com";
const ADDRESS = "Ghoghar, Rewa, Madhya Pradesh, India - 486001";

// Yahan apna asli FSSAI Number daal dena
const FSSAI_NUMBER = "12345678901234"; 

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
  youtube: "https://www.youtube.com/",
};

type SocialIconName = "facebook" | "instagram" | "youtube";

type Notice = {
  title: string;
  message: string;
};

function SocialIcon({
  name,
  className = "h-5 w-5",
}: {
  name: SocialIconName;
  className?: string;
}) {
  if (name === "facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5H17V3.1c-.8-.1-1.7-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.5v3.2h2.8V21z" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23 7a3 3 0 0 0-2.1-2.1C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7a31 31 0 0 0-.5 5 31 31 0 0 0 .5 5 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5A3 3 0 0 0 23 17a31 31 0 0 0 .5-5 31 31 0 0 0-.5-5ZM9.6 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

export default function Footer() {
  const { language, toggleLanguage } = useLanguage();
  const isHindi = language === "hi";

  const [year, setYear] = useState("2026");
  const [logoFailed, setLogoFailed] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  useEffect(() => {
    if (!notice) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setNotice(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [notice]);

  const text = {
    contact: isHindi ? "संपर्क करें" : "Contact Us",
    quickLinks: isHindi ? "महत्वपूर्ण लिंक" : "Quick Links",
    follow: isHindi ? "हमसे जुड़ें" : "Follow Us",
    home: isHindi ? "होम" : "Home",
    kits: isHindi ? "किराना किट्स" : "Grocery Kits",
    about: isHindi ? "हमारे बारे में" : "About Us",
    contactLink: isHindi ? "संपर्क" : "Contact",
    privacy: isHindi ? "गोपनीयता नीति" : "Privacy Policy",
    terms: isHindi ? "नियम और शर्तें" : "Terms & Conditions",
    whatsapp: isHindi ? "WhatsApp पर ऑर्डर करें" : "Order on WhatsApp",
    description: isHindi
      ? "आपकी रोज़मर्रा की ज़रूरतों के लिए भरोसेमंद किराना और वैल्यू किट्स।"
      : "Everyday groceries and value kits for your family's daily needs.",
    rights: isHindi ? "सर्वाधिकार सुरक्षित।" : "All Rights Reserved.",
    language: isHindi ? "English" : "हिंदी",
    location: isHindi ? "घोघर, रीवा, मध्य प्रदेश, भारत - 486001" : ADDRESS,
    close: isHindi ? "बंद करें" : "Close",
    ok: isHindi ? "ठीक है" : "Got it",
    brandLine: isHindi ? "आपकी अपनी किराना दुकान" : "Your Neighbourhood Grocery Store",
    socialDescription: isHindi
      ? "स्टोर की जानकारी, पूछताछ और ऑर्डर के लिए हमसे जुड़ें।"
      : "Connect with us for store information, enquiries and orders.",
    privacyMessage: isHindi
      ? `गोपनीयता और व्यक्तिगत जानकारी से जुड़ी जानकारी के लिए ${PHONE_DISPLAY} पर संपर्क करें।`
      : `For information about privacy and personal data, contact us at ${PHONE_DISPLAY}.`,
    termsMessage: isHindi
      ? `स्टोर के नियम और शर्तों के लिए ${PHONE_DISPLAY} पर संपर्क करें।`
      : `For store terms and conditions, contact us at ${PHONE_DISPLAY}.`,
    fssai: isHindi ? "FSSAI लाइसेंस संख्या:" : "FSSAI Lic. No:",
  };

  const footerLinks = [
    { label: text.home, href: "#top" },
    { label: text.kits, href: "#kit" },
    { label: text.about, href: "#about" },
    { label: text.contactLink, href: "#contact" },
  ];

  function openNotice(title: string, message: string) {
    setNotice({ title, message });
  }

  const softClay =
    "shadow-[3px_3px_7px_rgba(85,25,25,0.07),-2px_-2px_6px_rgba(255,255,255,0.75)]";

  const iconSurface =
    `flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ` +
    `bg-[#800020]/[0.06] text-[#800020] ${softClay} ` +
    `transition-all duration-200 group-hover:bg-[#800020] ` +
    `group-hover:text-white`;

  const socialSurface =
    `flex h-11 w-11 items-center justify-center rounded-xl ` +
    `border border-[#800020]/10 bg-[#FFFDF0] text-[#800020] ` +
    `${softClay} transition-all duration-200 ` +
    `hover:-translate-y-0.5 hover:bg-[#800020] ` +
    `hover:text-white sm:h-12 sm:w-12`;

  return (
    <>
      <footer id="contact" className="border-t-2 border-[#D4A84F] bg-[#FFF9D8] text-[#171717]">
        <div className="mx-auto w-full max-w-[1700px] px-4 py-9 sm:px-6 sm:py-11 lg:px-10 xl:px-[5.5%]">

          {/* Brand heading and language toggle */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#800020]/15 pb-5 sm:mb-10">
            <div className="flex min-w-0 items-center gap-3">
              <span className="h-9 w-1 shrink-0 rounded-full bg-[#800020]" />
              <div className="min-w-0">
                <h2 className="text-lg font-extrabold tracking-tight text-[#800020] sm:text-xl">
                  Rashid Mega Mart
                </h2>
                <p className="mt-1 max-w-xl text-xs leading-5 text-[#5C4B42] sm:text-sm">
                  {text.description}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={isHindi ? "Switch to English" : "हिंदी में बदलें"}
              className={`shrink-0 rounded-full border border-[#800020]/20 bg-[#FFFDF0] px-4 py-2 text-sm font-extrabold text-[#800020] ${softClay} transition-colors hover:bg-[#800020] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020]`}
            >
              {text.language}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-8 xl:gap-12">
            {/* Contact details */}
            <section aria-labelledby="footer-contact-title">
              <h3 id="footer-contact-title" className="mb-5 text-lg font-extrabold text-[#800020] sm:text-xl">
                {text.contact}
              </h3>

              <div className="flex flex-col gap-4">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Ghoghar%2C+Rewa%2C+Madhya+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-w-0 items-start gap-3 text-sm leading-6 text-[#37302D] transition-colors hover:text-[#800020] sm:text-[15px]"
                >
                  <span className={iconSurface}><MapPin size={21} /></span>
                  <span className="break-words pt-1">{text.location}</span>
                </a>

                <a
                  href={`tel:+${PHONE}`}
                  className="group flex min-w-0 items-center gap-3 text-sm font-bold text-[#37302D] transition-colors hover:text-[#800020] sm:text-[15px]"
                >
                  <span className={iconSurface}><Phone size={20} /></span>
                  <span>{PHONE_DISPLAY}</span>
                </a>

                <a
                  href={`https://wa.me/${PHONE}?text=${encodeURIComponent(isHindi ? "नमस्ते राशिद मेगा मार्ट!" : "Hello Rashid Mega Mart!")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-w-0 items-center gap-3 text-sm text-[#37302D] transition-colors hover:text-[#138047] sm:text-[15px]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#138047]/[0.07] text-[#138047] shadow-[3px_3px_7px_rgba(19,128,71,0.08),-2px_-2px_6px_rgba(255,255,255,0.75)] transition-colors group-hover:bg-[#138047] group-hover:text-white">
                    <MessageCircle size={21} />
                  </span>
                  <span>{text.whatsapp}</span>
                </a>

                <a
                  href={`mailto:${EMAIL}`}
                  className="group flex min-w-0 items-center gap-3 text-sm text-[#37302D] transition-colors hover:text-[#800020] sm:text-[15px]"
                >
                  <span className={iconSurface}><Mail size={20} /></span>
                  <span className="break-all">{EMAIL}</span>
                </a>
              </div>
            </section>

            {/* Quick links */}
            <section aria-labelledby="footer-links-title">
              <h3 id="footer-links-title" className="mb-5 text-lg font-extrabold text-[#800020] sm:text-xl">
                {text.quickLinks}
              </h3>
              <nav aria-label={text.quickLinks} className="flex flex-col items-start gap-3.5">
                {footerLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-[#37302D] transition-colors hover:text-[#800020] sm:text-[15px]"
                  >
                    <ChevronRight size={17} className="shrink-0 text-[#800020] transition-transform group-hover:translate-x-1" />
                    <span>{link.label}</span>
                  </a>
                ))}
                <button
                  type="button"
                  onClick={() => openNotice(text.privacy, text.privacyMessage)}
                  className="group flex items-center gap-2 text-left text-sm text-[#37302D] transition-colors hover:text-[#800020] sm:text-[15px]"
                >
                  <ChevronRight size={17} className="shrink-0 text-[#800020] transition-transform group-hover:translate-x-1" />
                  {text.privacy}
                </button>
                <button
                  type="button"
                  onClick={() => openNotice(text.terms, text.termsMessage)}
                  className="group flex items-center gap-2 text-left text-sm text-[#37302D] transition-colors hover:text-[#800020] sm:text-[15px]"
                >
                  <ChevronRight size={17} className="shrink-0 text-[#800020] transition-transform group-hover:translate-x-1" />
                  {text.terms}
                </button>
              </nav>
            </section>

            {/* Social links */}
            <section aria-labelledby="footer-social-title">
              <h3 id="footer-social-title" className="mb-5 text-lg font-extrabold text-[#800020] sm:text-xl">
                {text.follow}
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={socialSurface}>
                  <SocialIcon name="facebook" className="h-6 w-6" />
                </a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={socialSurface}>
                  <SocialIcon name="instagram" className="h-6 w-6" />
                </a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={socialSurface}>
                  <SocialIcon name="youtube" className="h-6 w-6" />
                </a>
                <a
                  href={`https://wa.me/${PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border border-[#138047]/15 bg-[#FFFDF0] text-[#138047] ${softClay} transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#138047] hover:text-white sm:h-12 sm:w-12`}
                >
                  <MessageCircle size={23} />
                </a>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-6 text-[#5C4B42]">
                {text.socialDescription}
              </p>
            </section>

            {/* Brand logo */}
            <section aria-label="Rashid Mega Mart brand" className="flex min-w-0 flex-col items-center justify-center text-center sm:col-span-2 lg:col-span-1">
              <a href="#top" aria-label="Rashid Mega Mart home" className="flex w-full items-center justify-center rounded-2xl p-3 transition-colors hover:bg-white/40">
                {!logoFailed ? (
                  <Image
                    src="/Logo.png"
                    alt="Rashid Mega Mart logo"
                    width={210}
                    height={210}
                    onError={() => setLogoFailed(true)}
                    className="h-auto max-h-48 w-full max-w-[175px] object-contain sm:max-h-52"
                  />
                ) : (
                  <span className="flex flex-col items-center justify-center gap-2 py-5">
                    <span className="text-5xl" aria-hidden="true">🛒</span>
                    <span className="text-center text-xl font-black leading-tight tracking-tight text-[#800020]">
                      RASHID <span className="block">MEGA MART</span>
                    </span>
                    <span className="text-xs text-[#5C4B42]">
                      {isHindi ? "किराना स्टोर • रीवा" : "Grocery Store • Rewa"}
                    </span>
                  </span>
                )}
              </a>
              <p className="mt-2 text-xs font-semibold tracking-wide text-[#800020]">
                {text.brandLine}
              </p>
              <span className="mt-3 h-1 w-14 rounded-full bg-[#D4A84F]" />
            </section>
          </div>

          {/* Bottom bar with FSSAI */}
          <div className="mt-9 flex flex-col gap-4 border-t border-[#800020]/15 pt-5 sm:mt-11 md:flex-row md:items-center md:justify-between">
            
            {/* FSSAI Badge */}
            <div className="flex items-center gap-2 rounded-lg bg-white/50 px-3 py-2 border border-[#800020]/10 w-fit">
              <ShieldCheck size={20} className="text-[#138047]" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {isHindi ? "प्रमाणित दुकान" : "Certified Store"}
                </span>
                <span className="text-xs font-black text-gray-800">
                  {text.fssai} {FSSAI_NUMBER}
                </span>
              </div>
            </div>

            <p className="text-xs leading-6 text-[#5C4B42] sm:text-sm md:text-right">
              © {year} <strong className="text-[#800020]">Rashid Mega Mart.</strong> {text.rights}
            </p>
          </div>
        </div>
      </footer>

      {/* Privacy and terms dialog */}
      {notice && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4 sm:p-6" onClick={() => setNotice(null)}>
          <div
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-[#D4A84F]/50 bg-[#FFF9D8] p-5 text-[#171717] shadow-[8px_8px_24px_rgba(35,0,10,0.16),-3px_-3px_12px_rgba(255,255,255,0.65)] sm:p-7"
          >
            <button
              type="button"
              aria-label={text.close}
              onClick={() => setNotice(null)}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl text-[#800020] shadow-[2px_2px_5px_rgba(85,25,25,0.07),-2px_-2px_5px_rgba(255,255,255,0.8)] transition-colors hover:bg-[#800020]/10 sm:right-4 sm:top-4"
            >
              <X size={20} />
            </button>
            <h3 className="mb-3 pr-9 text-xl font-extrabold text-[#800020]">
              {notice.title}
            </h3>
            <p className="text-sm leading-7 text-[#37302D]">
              {notice.message}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setNotice(null)}
                className="rounded-xl bg-[#800020] px-5 py-2.5 text-sm font-bold text-white shadow-[3px_3px_7px_rgba(85,25,25,0.12)] transition-colors hover:bg-[#610019] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#800020]"
              >
                {text.ok}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}