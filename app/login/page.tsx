"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../components/LanguageProvider";
import { ArrowLeft, Lock, ShieldCheck, ChevronRight, User, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const [step, setStep] = useState(1); // 1 = Mobile, 2 = OTP
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      setError(isHindi ? "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें" : "Please enter a 10-digit mobile number");
      return;
    }
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== "1234") {
      setError(isHindi ? "गलत OTP! कृपया 1234 दर्ज करें" : "Invalid OTP! Please enter 1234");
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      // 🔥 1. CHECK IF USER IS BLOCKED
      const loyaltyCustomers = JSON.parse(localStorage.getItem("rmm_loyalty_customers") || "[]");
      const existingUser = loyaltyCustomers.find((c: any) => c.phone === mobile);

      if (existingUser && existingUser.active === false) {
        setError(isHindi 
          ? "आपका अकाउंट ब्लॉक कर दिया गया है। कृपया दुकान पर संपर्क करें।" 
          : "Your account has been blocked. Please contact the store."
        );
        setIsLoading(false);
        return; // Aage mat badho, login mat karo
      }

      // 2. Main User Account Save
      const userData = { 
        mobile, 
        name: name.trim() || "Customer" 
      };
      localStorage.setItem("rmm_user", JSON.stringify(userData));
      
      // 3. Loyalty Account Auto-Sync (Agar pehle se nahi hai)
      if (!existingUser) {
        const newLoyaltyProfile = {
          phone: mobile,
          name: name.trim() || "Valued Customer",
          stamps: 0,
          rewards: 0,
          totalSpent: 0,
          history: [],
          tier: "Silver"
        };
        localStorage.setItem("rmm_loyalty_customers", JSON.stringify([newLoyaltyProfile, ...loyaltyCustomers]));
      }

      // 4. Loyalty Auto-Login Set
      localStorage.setItem("rmm_loyalty_logged_in", mobile);
      
      // 5. Redirect (fresh load ke liye)
      window.location.href = "/account";
    }, 800);
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#FFF9D8]">
      {/* Header */}
      <div className="flex items-center p-4 sm:p-6">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#800020] shadow-sm hover:bg-[#800020] hover:text-white transition"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 pb-12">
        <div className="w-full max-w-md">
          
          <div className="text-center mb-8">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#800020] text-white shadow-xl mb-4 rotate-3">
              <Lock size={32} />
            </div>
            <h1 className="text-3xl font-black text-[#800020]">
              {isHindi ? "लॉगिन करें" : "Login"}
            </h1>
            <p className="mt-2 text-sm text-[#685243]">
              {isHindi 
                ? "अपने ऑर्डर ट्रैक करने के लिए लॉगिन करें" 
                : "Login to track your orders and save addresses"}
            </p>
          </div>

          <div className="rounded-[32px] bg-white p-6 sm:p-8 shadow-[0_20px_40px_rgba(128,0,32,0.08)]">
            
            {error && (
              <div className="mb-4 rounded-xl bg-red-50 p-3 text-center text-xs font-bold text-red-600">
                {error}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-600 uppercase tracking-wide">
                    {isHindi ? "आपका नाम (वैकल्पिक)" : "Your Name (Optional)"}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-bold text-gray-800 outline-none focus:border-[#800020] focus:bg-white transition"
                      placeholder="e.g., Rashid Khan"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-600 uppercase tracking-wide">
                    {isHindi ? "मोबाइल नंबर" : "Mobile Number"}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <span className="text-gray-500 font-bold border-r border-gray-300 pr-3">+91</span>
                    </div>
                    <input
                      required
                      type="tel"
                      maxLength={10}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-16 pr-4 text-lg font-black tracking-widest text-gray-800 outline-none focus:border-[#800020] focus:bg-white transition"
                      placeholder="98765 43210"
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#800020] py-4 text-sm font-black text-white shadow-lg transition hover:bg-[#600018] active:scale-95 disabled:opacity-70"
                >
                  {isLoading ? (
                    <><Loader2 size={18} className="animate-spin" /> {isHindi ? "भेज रहे हैं..." : "Sending..."}</>
                  ) : (
                    <>{isHindi ? "OTP भेजें" : "Send OTP"} <ChevronRight size={18} /></>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide">
                      {isHindi ? "OTP दर्ज करें" : "Enter OTP"}
                    </label>
                    <span className="text-xs font-bold text-[#138047] bg-[#138047]/10 px-2 py-1 rounded">
                      Demo: 1234
                    </span>
                  </div>
                  <input
                    required
                    type="text"
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 text-center text-3xl font-black tracking-[1em] text-[#800020] outline-none focus:border-[#800020] focus:bg-white transition"
                    placeholder="••••"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#800020] py-4 text-sm font-black text-white shadow-lg transition hover:bg-[#600018] active:scale-95 disabled:opacity-70"
                >
                  {isLoading ? (
                    <><Loader2 size={18} className="animate-spin" /> {isHindi ? "लॉगिन हो रहा है..." : "Logging in..."}</>
                  ) : (
                    <><ShieldCheck size={18} /> {isHindi ? "वेरीफाई करें" : "Verify & Login"}</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => { setStep(1); setOtp(""); setError(""); }}
                  className="w-full text-center text-xs font-bold text-gray-500 hover:text-[#800020]"
                >
                  {isHindi ? "नंबर बदलें?" : "Change Number?"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}