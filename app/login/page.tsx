"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Star,
  CheckCircle2,
  Sparkles,
  Smartphone,
  PartyPopper,
  Crown,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "../components/LanguageProvider";
import Image from "next/image";

export default function LoginPage() {
  const { language, toggleLanguage } = useLanguage();
  const isHindi = language === "hi";
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
  const [isNewUser, setIsNewUser] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".login-card", 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(".form-item", 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3, ease: "power2.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setError(isHindi ? "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें।" : "Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setIsLoading(true);
    
    const isNew = phone.endsWith("0");
    setIsNewUser(isNew);

    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
      setError(isHindi ? "कृपया 4 अंकों का OTP दर्ज करें।" : "Please enter the 4-digit OTP.");
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (enteredOtp === "1234") {
        localStorage.setItem("rmm_user_phone", phone);
        setStep("success");
      } else {
        setError(isHindi ? "गलत OTP। डेमो के लिए 1234 डालें।" : "Invalid OTP. Use 1234 for demo.");
      }
    }, 1000);
  };

  const finishLogin = () => {
    router.push("/");
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6">
      
      <div className="login-card w-full max-w-md bg-white rounded-[32px] shadow-[0_20px_50px_rgba(128,0,32,0.08)] overflow-hidden border border-gray-100">
        
        {/* Header Image */}
        <div className="relative h-44 w-full bg-[#800020]">
          <img 
            src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=800&auto=format&fit=crop" 
            alt="Grocery Items" 
            className="h-full w-full object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#800020] via-[#800020]/60 to-transparent" />
          
          <Link href="/" className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30">
            <ChevronLeft size={20} />
          </Link>

          <button 
            onClick={toggleLanguage}
            className="absolute right-4 top-4 flex h-9 items-center justify-center rounded-full bg-white/20 px-3 text-xs font-bold text-white backdrop-blur-md transition hover:bg-white/30"
          >
            {isHindi ? "EN" : "हिंदी"}
          </button>

          <div className="absolute bottom-4 left-0 right-0 text-center">
            <h1 className="text-2xl font-black text-white drop-shadow-md">Rashid Mega Mart</h1>
            <p className="text-[10px] font-bold tracking-widest text-[#D4A84F] uppercase mt-1">Ghoghar, Rewa</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: PHONE */}
            {step === "phone" && (
              <motion.div 
                key="phone"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col gap-5"
              >
                <div className="text-center mb-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#800020]/5 px-3 py-1 mb-2">
                    <Sparkles size={12} className="text-[#D4A84F]" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#800020]">
                      {isHindi ? "स्वागत है" : "WELCOME"}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-[#30251F]">
                    {isHindi ? "लॉगिन / साइन अप" : "Login / Sign Up"}
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    {isHindi ? "मोबाइल नंबर दर्ज करके आगे बढ़ें।" : "Enter mobile number to continue."}
                  </p>
                </div>

                <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
                  <div className="form-item relative">
                    <Smartphone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#800020]/40" />
                    <span className="absolute left-12 top-1/2 -translate-y-1/2 text-sm font-black text-[#30251F]">+91</span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      placeholder="98765 43210"
                      className="h-14 w-full rounded-2xl border-2 border-gray-100 bg-gray-50 pl-[5.5rem] pr-4 text-lg font-black tracking-wider text-[#800020] outline-none transition-all focus:border-[#800020] focus:bg-white"
                      required
                    />
                  </div>

                  {error && <p className="text-xs font-bold text-red-500 text-center">{error}</p>}

                  <button
                    type="submit"
                    disabled={isLoading || phone.length !== 10}
                    className="form-item flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#800020] text-sm font-black text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#600018] disabled:opacity-50"
                  >
                    {isLoading ? "Sending..." : (isHindi ? "आगे बढ़ें" : "Continue")}
                    {!isLoading && <ArrowRight size={18} />}
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 2: OTP */}
            {step === "otp" && (
              <motion.div 
                key="otp"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col gap-5"
              >
                <div className="text-center mb-2">
                  <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-2 ${isNewUser ? 'bg-[#D4A84F]/20' : 'bg-[#138047]/10'}`}>
                    {isNewUser ? <PartyPopper size={12} className="text-[#A47A2C]" /> : <Crown size={12} className="text-[#138047]" />}
                    <span className={`text-[9px] font-black uppercase tracking-widest ${isNewUser ? 'text-[#A47A2C]' : 'text-[#138047]'}`}>
                      {isNewUser ? (isHindi ? "नए सदस्य" : "NEW MEMBER") : (isHindi ? "वापसी पर स्वागत" : "WELCOME BACK")}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-[#30251F]">
                    {isNewUser 
                      ? (isHindi ? "परिवार में स्वागत है!" : "Welcome to the Family!")
                      : (isHindi ? "फिर से स्वागत है!" : "Welcome Back!")}
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    {isHindi ? `${phone} पर भेजा गया कोड दर्ज करें।` : `Enter the code sent to ${phone}.`}
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
                  <div className="flex justify-between gap-2.5">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => { otpRefs.current[index] = el; }}
                        type="tel"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className={`h-16 w-full rounded-2xl border-2 bg-gray-50 text-center text-2xl font-black outline-none transition-all focus:bg-white ${
                          isNewUser ? 'border-[#D4A84F]/30 focus:border-[#D4A84F] text-[#800020]' : 'border-[#138047]/20 focus:border-[#138047] text-[#138047]'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between items-center px-1">
                    <p className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">
                      {isHindi ? "डेमो OTP: 1234" : "Demo OTP: 1234"}
                    </p>
                    <button 
                      type="button"
                      onClick={() => setStep("phone")}
                      className="text-xs font-bold text-[#800020] hover:underline"
                    >
                      {isHindi ? "नंबर बदलें?" : "Change Number?"}
                    </button>
                  </div>

                  {error && <p className="text-xs font-bold text-red-500 text-center">{error}</p>}

                  <button
                    type="submit"
                    disabled={isLoading || otp.join("").length !== 4}
                    className={`flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-sm font-black text-white shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-50 ${
                      isNewUser 
                        ? 'bg-[#A47A2C] hover:bg-[#8A6520]' 
                        : 'bg-[#138047] hover:bg-[#0D6837]'
                    }`}
                  >
                    {isLoading ? "Verifying..." : (isHindi ? "सत्यापित करें" : "Verify & Login")}
                    {!isLoading && <CheckCircle2 size={18} />}
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 3: SUCCESS */}
            {step === "success" && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-4"
              >
                <div className="relative mb-5">
                  <div className="absolute inset-0 bg-[#D4A84F] blur-2xl opacity-40 rounded-full animate-pulse" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#D4A84F] to-[#B88A2F] shadow-xl">
                    {isNewUser ? (
                      <PartyPopper size={40} className="text-white" />
                    ) : (
                      <Crown size={40} className="text-white" />
                    )}
                  </div>
                </div>

                <h2 className="text-2xl font-black text-[#800020] mb-2">
                  {isNewUser 
                    ? (isHindi ? "स्वागत है!" : "Welcome Aboard!")
                    : (isHindi ? "स्वागत है वापस!" : "Welcome Back!")}
                </h2>
                <p className="text-xs font-medium text-gray-600 mb-6">
                  {isNewUser 
                    ? (isHindi ? "राशिद मेगा मार्ट परिवार में शामिल होने के लिए धन्यवाद!" : "Thank you for joining the Rashid Mega Mart family!")
                    : (isHindi ? "हमें खुशी है कि आप वापस आए।" : "We're glad to have you back.")}
                </p>

                <button
                  onClick={finishLogin}
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#800020] text-sm font-black text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#600018]"
                >
                  {isHindi ? "खरीदारी शुरू करें" : "Start Shopping"}
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Trust Indicators */}
          {step !== "success" && (
            <div className="mt-6 flex items-center justify-center gap-4 border-t border-gray-100 pt-4">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                <Truck size={12} className="text-[#138047]" /> {isHindi ? "30 मिनट डिलीवरी" : "30 Min Delivery"}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                <ShieldCheck size={12} className="text-[#138047]" /> {isHindi ? "100% शुद्ध" : "100% Quality"}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                <Star size={12} className="text-[#D4A84F]" /> 4.9/5
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}