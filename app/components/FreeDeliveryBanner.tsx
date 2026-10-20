
"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { PhoneCall } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function FreeDeliveryBanner() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-3 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl border border-[#800020]/20 bg-[linear-gradient(110deg,#FFFDF5,#FFF9D8_50%,#F4E9C9)] p-4 shadow-sm sm:p-5">
        {/* Background Decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#800020]/5 blur-xl sm:h-32 sm:w-32"
        />

        <div className="relative z-10 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          {/* Delivery Truck and Information */}
          <div className="flex min-w-0 flex-col items-center gap-3 sm:flex-row">
            {/* Animated Delivery Truck */}
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#800020] shadow-sm">
              <motion.span
                animate={{
                  x: [-24, 0, 2],
                  y: [0, -1, 0, 1, 0],
                }}
                transition={{
                  x: {
                    duration: 1.2,
                    ease: "easeOut",
                  },
                  y: {
                    repeat: Infinity,
                    duration: 0.4,
                    ease: "easeInOut",
                  },
                }}
                className="text-2xl"
              >
                🚚
              </motion.span>
            </div>

            {/* Delivery Text */}
            <div className="min-w-0">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <span className="rounded-md bg-[#800020]/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-[#800020]">
                  {isHindi ? "फ्री होम डिलीवरी" : "Free Home Delivery"}
                </span>

                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#800020]" />
              </div>

              <h3 className="mt-1 text-base font-black tracking-tight text-[#171717] sm:text-lg">
                {isHindi
                  ? "रीवा में आपके घर तक मुफ़्त डिलीवरी! 🏠"
                  : "Guaranteed Doorstep Delivery in Rewa! 🏠"}
              </h3>

              <p className="mt-1 text-xs font-medium leading-relaxed text-[#171717]/75">
                {isHindi
                  ? "अपनी पसंदीदा किट का ऑर्डर सीधे व्हाट्सएप या कॉल पर दें।"
                  : "Order your daily grocery kit directly via WhatsApp or Call."}
              </p>
            </div>
          </div>

          {/* Responsive Action Buttons */}
          <div className="flex w-full items-center justify-center gap-2 sm:w-auto sm:shrink-0 sm:gap-2.5">
            {/* WhatsApp Outline Button */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="https://wa.me/918962531603?text=Namaste%21%20Mujhe%20Rashid%20Mega%20Mart%20se%20grocery%20kit%20order%20karni%20hai."
              target="_blank"
              rel="noopener noreferrer"
              aria-label={
                isHindi ? "WhatsApp पर ऑर्डर करें" : "Order on WhatsApp"
              }
              className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-[#25D366] bg-transparent px-3 py-3 text-[11px] font-extrabold text-[#075E54] shadow-sm transition-colors duration-200 hover:border-[#128C7E] hover:bg-[#E8FFF0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#128C7E] sm:flex-none sm:px-5 sm:py-2.5 sm:text-xs"
            >
              <Image
                src="/Whatsapp-3d.svg"
                alt=""
                width={24}
                height={24}
                unoptimized
                aria-hidden="true"
                className="h-6 w-6 shrink-0 object-contain"
              />

              <span className="whitespace-nowrap">
                {isHindi ? "व्हाट्सएप ऑर्डर" : "WhatsApp Order"}
              </span>
            </motion.a>

            {/* Call Store Button */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="tel:8962531603"
              aria-label={isHindi ? "स्टोर पर कॉल करें" : "Call Store"}
              className="inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#800020]/25 bg-white px-3 py-3 text-[11px] font-bold text-[#800020] transition-colors hover:bg-[#800020] hover:text-[#FFF9D8] sm:gap-2 sm:px-4 sm:py-2.5 sm:text-xs"
            >
              <motion.span
                animate={{ rotate: [0, -12, 12, -12, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatDelay: 2,
                  duration: 0.5,
                }}
                className="inline-flex shrink-0"
              >
                <PhoneCall className="h-3.5 w-3.5" />
              </motion.span>

              <span className="whitespace-nowrap">
                {isHindi ? "कॉल करें" : "Call Store"}
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
