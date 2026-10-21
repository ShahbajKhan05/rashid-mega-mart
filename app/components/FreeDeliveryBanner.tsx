
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { PhoneCall } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function FreeDeliveryBanner() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-2 sm:px-6 sm:py-3">
      <div className="relative overflow-hidden rounded-2xl border border-[#800020]/20 bg-[linear-gradient(110deg,#FFFDF5,#FFF9D8_50%,#F4E9C9)] p-3 shadow-sm sm:p-4">
        {/* Subtle Decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#800020]/5 blur-2xl"
        />

        <div className="relative z-10 flex flex-col items-center gap-2.5 sm:flex-row sm:justify-between sm:gap-4">
          {/* Truck and Delivery Text */}
          <div className="flex w-full min-w-0 flex-col items-center gap-2 sm:flex-1 sm:flex-row sm:gap-3 sm:text-left">
            {/* Animated Truck */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#800020] shadow-sm sm:h-11 sm:w-11">
              <motion.span
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        x: [-3, 2, 0],
                        y: [0, -1, 0, 1, 0],
                      }
                }
                transition={{
                  x: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  y: {
                    duration: 0.45,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="text-xl sm:text-2xl"
                aria-hidden="true"
              >
                🚚
              </motion.span>
            </div>

            {/* Delivery Information */}
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <span className="rounded-full bg-[#800020]/10 px-2 py-0.5 text-[8px] font-black uppercase tracking-wide text-[#800020] sm:text-[9px]">
                  {isHindi ? "फ्री होम डिलीवरी" : "Free Home Delivery"}
                </span>

                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#800020]"
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-1 text-sm font-black leading-snug tracking-tight text-[#171717] sm:text-base lg:text-lg">
                {isHindi ? (
                  <>
                    <span className="sm:hidden">
                      रीवा में मुफ़्त होम डिलीवरी!
                    </span>
                    <span className="hidden sm:inline">
                      रीवा में आपके घर तक मुफ़्त डिलीवरी!
                    </span>
                  </>
                ) : (
                  <>
                    <span className="sm:hidden">
                      Free Delivery in Rewa!
                    </span>
                    <span className="hidden sm:inline">
                      Guaranteed Doorstep Delivery in Rewa!
                    </span>
                  </>
                )}
              </h3>

              <p className="mx-auto mt-0.5 max-w-sm text-[10px] leading-relaxed text-[#171717]/70 sm:mx-0 sm:text-xs">
                {isHindi
                  ? "अपनी पसंदीदा किट WhatsApp या कॉल से ऑर्डर करें।"
                  : "Order your grocery kit via WhatsApp or call."}
              </p>
            </div>
          </div>

          {/* Compact Action Buttons */}
          <div className="flex w-full shrink-0 items-center justify-center gap-2 sm:w-auto sm:gap-2.5">
            {/* WhatsApp Outline Button */}
            <motion.a
              whileHover={reduceMotion ? undefined : { scale: 1.025 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              href="https://wa.me/918962531603?text=Namaste%21%20Mujhe%20Rashid%20Mega%20Mart%20se%20grocery%20kit%20order%20karni%20hai."
              target="_blank"
              rel="noopener noreferrer"
              aria-label={
                isHindi ? "WhatsApp पर ऑर्डर करें" : "Order on WhatsApp"
              }
              className="inline-flex min-h-10 min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border-2 border-[#25D366] bg-transparent px-2.5 py-2 text-[10px] font-extrabold text-[#075E54] transition-colors hover:border-[#128C7E] hover:bg-[#E8FFF0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#128C7E] sm:flex-none sm:gap-2 sm:px-4 sm:text-xs"
            >
              <Image
                src="/Whatsapp-3d.svg"
                alt=""
                width={22}
                height={22}
                unoptimized
                aria-hidden="true"
                className="h-5 w-5 shrink-0 object-contain"
              />

              <span className="whitespace-nowrap">
                {isHindi ? "WhatsApp ऑर्डर" : "WhatsApp Order"}
              </span>
            </motion.a>

            {/* Call Store Button */}
            <motion.a
              whileHover={reduceMotion ? undefined : { scale: 1.025 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              href="tel:8962531603"
              aria-label={isHindi ? "स्टोर पर कॉल करें" : "Call Store"}
              className="inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#800020]/25 bg-white/80 px-3 py-2 text-[10px] font-bold text-[#800020] transition-colors hover:bg-[#800020] hover:text-[#FFF9D8] sm:gap-2 sm:px-4 sm:text-xs"
            >
              <PhoneCall size={13} className="shrink-0" />

              <span>{isHindi ? "कॉल करें" : "Call Store"}</span>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
