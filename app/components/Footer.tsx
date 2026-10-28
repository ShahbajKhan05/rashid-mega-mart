"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import {
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  X,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "./LanguageProvider";

const PHONE = "918962531603";
const PHONE_DISPLAY = "+91 89625 31603";
const EMAIL = "support@rashidmegamart.com";
const ADDRESS = "Ghoghar, Rewa, Madhya Pradesh, India - 486001";
const FSSAI_NUMBER = "12345678901234";

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
  youtube: "https://www.youtube.com/",
};

type SocialIconName = "facebook" | "instagram" | "youtube";
type Notice = {
  title: string;
  content: React.ReactNode;
};

// REAL SVG ICONS FOR SOCIALS
function SocialIcon({ name, className = "h-5 w-5" }: { name: SocialIconName; className?: string }) {
  if (name === "facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5H17V3.1c-.8-.1-1.7-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.5v3.2h2.8V21z" />
      </svg>
    );
  }
  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    );
  }
  // YouTube
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"></polygon>
    </svg>
  );
}

// REAL WHATSAPP ICON
function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

export default function Footer() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const footerRef = useRef<HTMLDivElement>(null);

  const [year, setYear] = useState("2026");
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  // GSAP Footer Reveal Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-animate",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = notice ? "hidden" : "unset";
  }, [notice]);

  const openContactModal = () => {
    setNotice({
      title: isHindi ? "संपर्क करें" : "Contact Us",
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="text-[#800020] mt-1 shrink-0" size={20} />
            <div>
              <p className="font-bold text-[#30251F]">{isHindi ? "पता" : "Address"}</p>
              <p className="text-sm text-gray-600">{ADDRESS}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="text-[#800020] mt-1 shrink-0" size={20} />
            <div>
              <p className="font-bold text-[#30251F]">{isHindi ? "फोन" : "Phone"}</p>
              <a href={`tel:+${PHONE}`} className="text-sm text-gray-600 hover:text-[#800020]">{PHONE_DISPLAY}</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="text-[#800020] mt-1 shrink-0" size={20} />
            <div>
              <p className="font-bold text-[#30251F]">{isHindi ? "ईमेल" : "Email"}</p>
              <a href={`mailto:${EMAIL}`} className="text-sm text-gray-600 hover:text-[#800020]">{EMAIL}</a>
            </div>
          </div>
          <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-2 w-full rounded-xl bg-[#138047] py-3 text-white font-bold text-sm shadow-md hover:bg-[#0D6837] transition">
            <WhatsAppIcon className="h-5 w-5" /> {isHindi ? "WhatsApp पर चैट करें" : "Chat on WhatsApp"}
          </a>
        </div>
      ),
    });
  };

  const openPrivacyModal = () => {
    setNotice({
      title: isHindi ? "गोपनीयता नीति" : "Privacy Policy",
      content: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>At <strong>Rashid Mega Mart</strong>, we value your privacy. We only collect basic information like your name, phone number, and address to fulfill your grocery orders.</p>
          <p>We do not sell or share your personal data with third-party advertisers. Your data is securely used for order confirmation and delivery purposes only.</p>
          <p>For any data deletion requests, please contact us at {EMAIL}.</p>
        </div>
      ),
    });
  };

  const openTermsModal = () => {
    setNotice({
      title: isHindi ? "नियम और शर्तें" : "Terms & Conditions",
      content: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p><strong>1. Order & Delivery:</strong> Orders placed via WhatsApp are confirmed upon reply. Delivery time is estimated at 30-45 minutes but may vary based on availability.</p>
          <p><strong>2. Pricing:</strong> All prices are in INR and subject to change without prior notice. Custom items' prices will be confirmed by the store.</p>
          <p><strong>3. Returns:</strong> Fresh items can only be returned at the time of delivery if found damaged or expired.</p>
        </div>
      ),
    });
  };

  return (
    <>
      <footer ref={footerRef} id="contact" className="relative border-t-2 border-[#D4A84F] bg-[#FFF9D8] text-[#171717] overflow-hidden">
        
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-[#D4A84F]/10 blur-[80px] pointer-events-none" />

        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">
          
          {/* Brand Header */}
          <div className="footer-animate mb-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#800020]/10 pb-6">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-[#800020]">Rashid Mega Mart</h2>
              <p className="mt-1 text-sm text-[#5C4B42] max-w-md">
                {isHindi ? "आपकी रोज़मर्रा की ज़रूरतों के लिए भरोसेमंद किराना और वैल्यू किट्स।" : "Everyday groceries and value kits for your family's daily needs."}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white/50 px-4 py-2 border border-[#800020]/10 shadow-sm">
              <ShieldCheck size={20} className="text-[#138047]" />
              <div>
                <p className="text-[9px] font-black uppercase text-gray-500 tracking-wider">Certified Store</p>
                <p className="text-xs font-bold text-[#30251F]">FSSAI: {FSSAI_NUMBER}</p>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Contact */}
            <section className="footer-animate">
              <h3 className="mb-5 text-lg font-black text-[#800020]">Contact Us</h3>
              <div className="flex flex-col gap-4">
                <a href="https://maps.google.com" target="_blank" className="group flex items-start gap-3 text-sm text-gray-600 hover:text-[#800020]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#800020] shadow-sm group-hover:bg-[#800020] group-hover:text-white transition-colors">
                    <MapPin size={20} />
                  </span>
                  <span className="pt-2">{ADDRESS}</span>
                </a>
                <a href={`tel:+${PHONE}`} className="group flex items-center gap-3 text-sm text-gray-600 hover:text-[#800020]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#800020] shadow-sm group-hover:bg-[#800020] group-hover:text-white transition-colors">
                    <Phone size={20} />
                  </span>
                  <span className="font-bold">{PHONE_DISPLAY}</span>
                </a>
                <a href={`mailto:${EMAIL}`} className="group flex items-center gap-3 text-sm text-gray-600 hover:text-[#800020]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#800020] shadow-sm group-hover:bg-[#800020] group-hover:text-white transition-colors">
                    <Mail size={20} />
                  </span>
                  <span className="break-all">{EMAIL}</span>
                </a>
              </div>
            </section>

            {/* Quick Links */}
            <section className="footer-animate">
              <h3 className="mb-5 text-lg font-black text-[#800020]">Quick Links</h3>
              <nav className="flex flex-col gap-3">
                {[
                  { label: "Home", href: "/" },
                  { label: "Grocery Kits", href: "#kit" },
                  { label: "About Us", href: "#about" },
                ].map((link) => (
                  <a key={link.label} href={link.href} className="group flex items-center gap-2 text-sm text-gray-600 hover:text-[#800020]">
                    <ChevronRight size={16} className="text-[#D4A84F] group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </a>
                ))}
                <button onClick={openContactModal} className="group flex items-center gap-2 text-sm text-gray-600 hover:text-[#800020]">
                  <ChevronRight size={16} className="text-[#D4A84F] group-hover:translate-x-1 transition-transform" /> Contact
                </button>
                <button onClick={openPrivacyModal} className="group flex items-center gap-2 text-sm text-gray-600 hover:text-[#800020]">
                  <ChevronRight size={16} className="text-[#D4A84F] group-hover:translate-x-1 transition-transform" /> Privacy Policy
                </button>
                <button onClick={openTermsModal} className="group flex items-center gap-2 text-sm text-gray-600 hover:text-[#800020]">
                  <ChevronRight size={16} className="text-[#D4A84F] group-hover:translate-x-1 transition-transform" /> Terms & Conditions
                </button>
              </nav>
            </section>

            {/* Socials */}
            <section className="footer-animate">
              <h3 className="mb-5 text-lg font-black text-[#800020]">Follow Us</h3>
              <div className="flex flex-wrap gap-3">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#1877F2] shadow-sm hover:-translate-y-1 hover:shadow-md transition-all">
                  <SocialIcon name="facebook" className="h-6 w-6" />
                </a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#E4405F] shadow-sm hover:-translate-y-1 hover:shadow-md transition-all">
                  <SocialIcon name="instagram" className="h-6 w-6" />
                </a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#FF0000] shadow-sm hover:-translate-y-1 hover:shadow-md transition-all">
                  <SocialIcon name="youtube" className="h-6 w-6" />
                </a>
                <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#25D366] shadow-sm hover:-translate-y-1 hover:shadow-md transition-all">
                  <WhatsAppIcon className="h-6 w-6" />
                </a>
              </div>
              <p className="mt-4 text-xs text-gray-500 leading-relaxed">Connect with us for store information, enquiries and orders.</p>
            </section>

            {/* Logo */}
            <section className="footer-animate flex flex-col items-center justify-center text-center">
              <Image src="/Logo.png" alt="Logo" width={150} height={150} className="object-contain mb-3" />
              <p className="text-xs font-black text-[#800020] tracking-wider uppercase">Your Neighbourhood Store</p>
              <div className="mt-3 h-1 w-12 rounded-full bg-[#D4A84F]" />
            </section>
          </div>

          {/* Bottom Bar */}
          <div className="footer-animate mt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#800020]/10 pt-6">
            <p className="text-xs text-gray-500">
              © {year} <strong className="text-[#800020]">Rashid Mega Mart.</strong> All Rights Reserved.
            </p>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              Crafted with <span className="text-red-500">❤️</span> by <a href="#" className="font-bold text-[#800020]">Noor Technologies</a>
            </p>
          </div>
        </div>
      </footer>

      {/* AWARD-WINNING MODAL (Popup) */}
      {notice && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onClick={() => setNotice(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-300"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-[#FFF9D8] p-5">
              <h3 className="text-xl font-black text-[#800020]">{notice.title}</h3>
              <button onClick={() => setNotice(null)} className="rounded-full bg-white p-2 text-gray-500 hover:text-[#800020] shadow-sm">
                <X size={18} />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {notice.content}
            </div>

            {/* Footer Action */}
            <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-end">
              <button onClick={() => setNotice(null)} className="rounded-xl bg-[#800020] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#600018] transition-colors flex items-center gap-2">
                Got it <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}