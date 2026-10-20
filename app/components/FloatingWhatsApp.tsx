"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function FloatingWhatsApp() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  
  // Default keeps popup CLOSED so it never blocks the KitBuilder UI
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      
      {/* Floating Popup Box (Appears ONLY when user clicks icon) */}
      {isOpen && (
        <div className="mb-3 w-[280px] sm:w-[320px] overflow-hidden rounded-2xl border border-[#800020]/20 bg-white/95 p-4 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-5">
          {/* Header with Close Button */}
          <div className="flex items-start justify-between border-b border-[#800020]/10 pb-2.5">
            <div>
              <h4 className="text-xs font-black text-[#171717]">
                Rashid Mega Mart Support
              </h4>
              <p className="text-[10px] text-[#800020]">
                {isHindi ? "ऑनलाइन सपोर्ट • रीवा" : "Online Support • Rewa"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-[#800020]/10 text-xs font-bold text-[#800020] hover:bg-[#800020]/20"
              aria-label="Close Chat"
            >
              ✕
            </button>
          </div>

          {/* Chat Message Text */}
          <p className="my-3 text-xs leading-relaxed text-[#171717]/80">
            {isHindi
              ? "नमस्ते! क्या आप किराना किट या फ्री होम डिलीवरी के बारे में कुछ पूछना चाहते हैं?"
              : "Hello! Need help choosing a grocery kit or asking about free home delivery in Rewa?"}
          </p>

          {/* Action Button inside Popup */}
          <a
            href="https://wa.me/918962531603?text=Namaste%21%20Mujhe%20Rashid%20Mega%20Mart%20se%20grocery%20kit%20ke%20baare%20mein%20poochhna%20hai."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2.5 text-xs font-extrabold text-white shadow-xs transition hover:bg-[#20ba5a] active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current shrink-0"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.553 4.11 1.519 5.836L0 24l6.328-1.503A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.802 0-3.553-.483-5.094-1.398l-.365-.216-3.77.896.91-3.666-.237-.378A9.957 9.957 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            <span>{isHindi ? "व्हाट्सएप चैट शुरू करें" : "Start WhatsApp Chat"}</span>
          </a>
        </div>
      )}

      {/* Sleek Floating Green Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp Chat"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition duration-300 hover:scale-105 hover:bg-[#20ba5a] active:scale-95"
      >
        {isOpen ? (
          <span className="text-lg font-black">✕</span>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 fill-current"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.553 4.11 1.519 5.836L0 24l6.328-1.503A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.802 0-3.553-.483-5.094-1.398l-.365-.216-3.77.896.91-3.666-.237-.378A9.957 9.957 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
        )}
      </button>

    </div>
  );
}