"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "../../components/LanguageProvider";
import { ArrowLeft, Ticket, Copy, Check, Sparkles, Crown, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function MyCouponsPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const isHindi = language === "hi";
  
  const [user, setUser] = useState<any>(null);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("rmm_user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);

      // Load coupons from localStorage
      const allCoupons = JSON.parse(localStorage.getItem("rmm_coupons") || "{}");
      const userCouponCode = allCoupons[parsedUser.mobile];
      
      if (userCouponCode) {
        setCoupons([{ code: userCouponCode, discount: 75, minBill: 699 }]);
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#FFF9D8] pb-24">
      
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#FFF9D8]/90 px-4 py-4 backdrop-blur-md border-b border-[#800020]/10">
        <div className="mx-auto flex max-w-3xl items-center gap-4">
          <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#800020] shadow-sm hover:bg-[#800020] hover:text-white transition">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-black text-[#800020] flex items-center gap-2">
            <Ticket size={22} /> {isHindi ? "मेरे कूपन्स" : "My Coupons"}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 mt-6">
        {coupons.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#FFF9D8] shadow-sm mb-4">
              <Ticket size={40} className="text-[#D4A84F]" />
            </div>
            <h2 className="text-lg font-black text-gray-800">{isHindi ? "कोई कूपन नहीं है" : "No Coupons Found"}</h2>
            <p className="text-sm text-gray-500 mt-1 mb-6 max-w-xs mx-auto">
              {isHindi 
                ? "8 स्टैम्प पूरे करें और ₹75 का डिस्काउंट कूपन पाएं!" 
                : "Complete 8 stamps on loyalty and earn a ₹75 discount coupon!"}
            </p>
            <Link href="/loyalty" className="inline-flex items-center gap-2 rounded-xl bg-[#800020] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#600018] transition">
              <Sparkles size={18} /> {isHindi ? "रिवॉर्ड्स देखें" : "Go to Rewards"}
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Info Banner */}
            <div className="bg-[#138047]/10 border border-[#138047]/20 rounded-2xl p-4 flex items-start gap-3">
              <Sparkles size={20} className="text-[#138047] shrink-0 mt-0.5" />
              <p className="text-xs font-bold text-[#138047] leading-relaxed">
                {isHindi 
                  ? "आपके पास एक एक्टिव कूपन है! इसे चेकआउट के समय इस्तेमाल करें।" 
                  : "You have one active coupon! Use it during checkout for a discount."}
              </p>
            </div>

            {/* 🔥 PREMIUM AWARD-WINNING COUPON CARD */}
            {coupons.map((coupon) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={coupon.code} 
                className="relative w-full max-w-md mx-auto"
              >
                {/* Golden Shadow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4A84F] to-[#F5DDA8] rounded-3xl blur-md opacity-40 translate-y-2 scale-95" />
                
                <div className="relative flex flex-col overflow-hidden rounded-3xl bg-[#800020] shadow-2xl">
                  
                  {/* Metallic Background Pattern */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#FFF 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                  <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_20%,rgba(255,255,255,0.15)_25%,transparent_30%)]" />

                  {/* Top Section (Dark Maroon) */}
                  <div className="relative z-10 p-6 flex items-start justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 backdrop-blur-sm mb-3">
                        <Crown size={12} className="text-[#D4A84F]" />
                        <span className="text-[10px] font-black text-[#D4A84F] uppercase tracking-wider">Smart Saver Exclusive</span>
                      </div>
                      <h2 className="text-4xl font-black text-white tracking-tight">₹75 <span className="text-xl text-white/70">OFF</span></h2>
                      <p className="text-xs font-bold text-white/80 mt-1">
                        {isHindi ? `न्यूनतम ₹${coupon.minBill} के बिल पर` : `On minimum bill of ₹${coupon.minBill}`}
                      </p>
                    </div>

                    {/* Fake Barcode */}
                    <div className="flex gap-0.5 opacity-30 mt-1">
                      {[1, 3, 1, 2, 1, 1, 3, 1].map((w, i) => (
                        <div key={i} className="bg-white h-8" style={{ width: `${w}px` }} />
                      ))}
                    </div>
                  </div>

                  {/* Cutout & Dashed Line Separator */}
                  <div className="relative z-10 flex items-center">
                    <div className="w-6 h-6 bg-[#FFF9D8] rounded-full -ml-3 shadow-inner" />
                    <div className="flex-1 border-t-2 border-dashed border-white/20" />
                    <div className="w-6 h-6 bg-[#FFF9D8] rounded-full -mr-3 shadow-inner" />
                  </div>

                  {/* Bottom Section (Cream) */}
                  <div className="relative z-10 bg-[#FFF9D8] p-6 rounded-b-3xl">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1">{isHindi ? "कूपन कोड" : "Coupon Code"}</p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-2">
                      
                      <div className="font-mono text-2xl font-black text-[#800020] tracking-widest bg-[#800020]/5 px-4 py-2 rounded-xl border border-[#800020]/10 w-full sm:w-auto text-center">
                        {coupon.code}
                      </div>
                      
                      <button 
                        onClick={() => copyToClipboard(coupon.code)}
                        className={`flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-black shadow-lg transition-all duration-300 w-full sm:w-auto active:scale-95 ${
                          copiedCode === coupon.code 
                            ? "bg-[#138047] text-white" 
                            : "bg-[#800020] text-white hover:-translate-y-0.5 hover:bg-[#600018]"
                        }`}
                      >
                        <AnimatePresence mode="wait">
                          {copiedCode === coupon.code ? (
                            <motion.div key="copied" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-1.5">
                              <Check size={16} strokeWidth={3} /> {isHindi ? "कॉपी हो गया!" : "Copied!"}
                            </motion.div>
                          ) : (
                            <motion.div key="copy" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-1.5">
                              <Copy size={16} /> {isHindi ? "कॉपी करें" : "Copy Code"}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>

                    </div>
                  </div>

                </div>
              </motion.div>
            ))}

            <div className="text-center pt-6">
              <Link href="/products" className="inline-flex items-center gap-2 text-sm font-black text-[#800020] hover:underline">
                {isHindi ? "खरीदारी करें और कूपन इस्तेमाल करें" : "Shop now and use your coupon"} <ChevronRight size={16} />
              </Link>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}