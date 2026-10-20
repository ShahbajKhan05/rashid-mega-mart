"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "./LanguageProvider";

export default function DiwaliAnnouncement() {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const isHindi = language === "hi";

  useEffect(() => {
    function handleUserClick() {
      // Jab bhi user kahin click karega, banner show hoga
      setIsVisible(true);

      // 3 second ke baad apne aap chala jayega
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }

    // Global click listener add kar rahe hain
    window.addEventListener("click", handleUserClick, { once: true }); // Chaho toh { once: true } hata sakte ho agar har click par chalana ho

    return () => {
      window.removeEventListener("click", handleUserClick);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-14 sm:top-16 inset-x-0 z-40 flex items-center justify-between bg-[#800020] px-3 py-2 text-xs font-medium text-[#FFF9D8] shadow-md"
        >
          {/* Centered Message + Action Link */}
          <div className="mx-auto flex flex-wrap items-center justify-center gap-1.5 text-center text-[11px] sm:text-xs">
            <span>
              {isHindi
                ? "🪔 दीपावली महा-ऑफर: सभी राशन किट्स पर भारी छूट और फ्री होम डिलीवरी!"
                : "🪔 Diwali Mega Offer: Special discounts & free home delivery on all kits."}
            </span>
            <a
              href="#kit"
              className="font-black underline underline-offset-2 hover:text-white"
            >
              {isHindi ? "ऑफर देखें" : "Click for details"}
            </a>
          </div>

          {/* Dismiss Button */}
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[#FFF9D8]/80 hover:bg-white/10 hover:text-white"
            aria-label="Close notification"
          >
            <svg
              className="h-3.5 w-3.5 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}