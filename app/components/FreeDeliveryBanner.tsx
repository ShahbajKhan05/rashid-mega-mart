"use client";

import { motion } from "motion/react";
import { PhoneCall } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function FreeDeliveryBanner() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-3 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl border border-[#800020]/20 bg-[linear-gradient(110deg,#FFFDF5,#FFF9D8_50%,#F4E9C9)] p-4 shadow-sm sm:p-5">
        
        {/* Glowing Background Blur */}
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#800020]/5 blur-xl sm:h-32 sm:w-32" />

        <div className="relative z-10 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          
          {/* Left: Animated Delivery Truck & Info */}
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            
            {/* Real Animated Truck Box */}
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#800020] shadow-xs">
              <motion.span
                animate={{
                  x: [-24, 0, 2],
                  y: [0, -1, 0, 1, 0],
                }}
                transition={{
                  x: { duration: 1.2, ease: "easeOut" },
                  y: { repeat: Infinity, duration: 0.4, ease: "easeInOut" },
                }}
                className="text-2xl"
              >
                🚚
              </motion.span>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <span className="rounded-md bg-[#800020]/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-[#800020]">
                  {isHindi ? "फ्री होम डिलीवरी" : "Free Home Delivery"}
                </span>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#800020]" />
              </div>

              <h3 className="mt-0.5 text-base font-black tracking-tight text-[#171717] sm:text-lg">
                {isHindi ? "रीवा में आपके घर तक मुफ़्त डिलीवरी! 🏠" : "Guaranteed Doorstep Delivery in Rewa! 🏠"}
              </h3>

              <p className="text-xs font-medium text-[#171717]/75">
                {isHindi
                  ? "अपनी पसंदीदा किट का ऑर्डर सीधे व्हाट्सएप या कॉल पर दें।"
                  : "Order your daily grocery kit directly via WhatsApp or Call."}
              </p>
            </div>
          </div>

          {/* Right: Official Animated Action Buttons */}
          <div className="flex w-full shrink-0 items-center justify-center gap-2.5 sm:w-auto">
            
            {/* Real Animated WhatsApp Button */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/918962531603?text=Namaste%21%20Mujhe%20Rashid%20Mega%20Mart%20se%20grocery%20kit%20order%20karni%20hai."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-extrabold text-white shadow-xs transition-all hover:bg-[#20ba5a] hover:shadow-md"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 fill-current"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.553 4.11 1.519 5.836L0 24l6.328-1.503A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.802 0-3.553-.483-5.094-1.398l-.365-.216-3.77.896.91-3.666-.237-.378A9.957 9.957 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              <span>{isHindi ? "व्हाट्सएप ऑर्डर" : "WhatsApp Order"}</span>
            </motion.a>

            {/* Real Animated Phone Call Button */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              href="tel:8962531603"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#800020]/25 bg-white px-4 py-2.5 text-xs font-bold text-[#800020] transition hover:bg-[#800020] hover:text-[#FFF9D8]"
            >
              <motion.div
                animate={{ rotate: [0, -12, 12, -12, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: 2,
                  duration: 0.5,
                }}
              >
                <PhoneCall className="h-3.5 w-3.5" />
              </motion.div>
              <span>{isHindi ? "कॉल करें" : "Call Store"}</span>
            </motion.a>

          </div>

        </div>
      </div>
    </div>
  );
}