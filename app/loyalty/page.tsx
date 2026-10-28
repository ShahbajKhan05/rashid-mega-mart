"use client";

import { useState, useEffect, useRef } from "react";
import {
  Crown, Gift, Star, CheckCircle2, History, TrendingUp, Sparkles, ShieldCheck, 
  QrCode, X, Award
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function LoyaltyPage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"login" | "otp" | "dashboard">("login");
  const [customer, setCustomer] = useState<any>(null);
  const [error, setError] = useState("");
  
  // 3D Card Tilt
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Scratch Card State
  const [scratchRevealed, setScratchRevealed] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("rmm_loyalty_profile");
    if (saved) {
      setCustomer(JSON.parse(saved));
      setStep("dashboard");
    }
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateY(x / 15);
    setRotateX(-y / 15);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit number.");
      return;
    }
    setError("");
    setStep("otp");
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== "1234") {
      setError("Invalid OTP. Use 1234 for demo.");
      return;
    }
    
    const saved = localStorage.getItem("rmm_loyalty_profile");
    if (saved) {
      const existing = JSON.parse(saved);
      if (existing.phone === phone) {
        setCustomer(existing);
      } else {
        const newProfile = { phone, name, stamps: 0, lifetime_stamps: 0, rewards: 0, history: [], tier: "Silver" };
        setCustomer(newProfile);
        localStorage.setItem("rmm_loyalty_profile", JSON.stringify(newProfile));
      }
    } else {
      const newProfile = { phone, name, stamps: 0, lifetime_stamps: 0, rewards: 0, history: [], tier: "Silver" };
      setCustomer(newProfile);
      localStorage.setItem("rmm_loyalty_profile", JSON.stringify(newProfile));
    }
    setStep("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("rmm_loyalty_profile");
    setCustomer(null);
    setStep("login");
    setPhone("");
    setOtp("");
  };

  // --- LOGIN SCREEN ---
  if (step === "login") {
    return (
      <main className="min-h-screen bg-[#FFF9D8] flex items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-md overflow-hidden rounded-[32px] bg-white shadow-2xl border border-[#800020]/10">
          <div className="relative h-32 sm:h-36 w-full bg-[#800020]">
             <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop" alt="Store" className="h-full w-full object-cover opacity-40" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#800020] to-transparent" />
             <div className="absolute bottom-4 left-5">
               <h1 className="text-xl sm:text-2xl font-black text-white">Smart Saver Club</h1>
               <p className="text-[9px] sm:text-[10px] font-bold text-[#D4A84F] uppercase tracking-widest">Rashid Mega Mart</p>
             </div>
          </div>
          <div className="p-5 sm:p-8">
            <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
              <div className="text-center mb-2">
                <h2 className="text-lg sm:text-xl font-black text-[#30251F]">Join / Login</h2>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-1">Apna mobile number dalkar card kholein.</p>
              </div>
              <input type="text" placeholder="Your Name (Optional)" value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 text-sm font-medium outline-none focus:border-[#800020] focus:bg-white" />
              <input type="tel" maxLength={10} placeholder="10-digit Mobile Number" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} className="h-12 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 text-sm font-medium outline-none focus:border-[#800020] focus:bg-white" required />
              {error && <p className="text-xs font-bold text-red-500 text-center">{error}</p>}
              <button type="submit" className="h-12 rounded-xl bg-[#800020] text-sm font-black text-white shadow-lg hover:bg-[#600018]">Send OTP</button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  // --- OTP SCREEN ---
  if (step === "otp") {
    return (
      <main className="min-h-screen bg-[#FFF9D8] flex items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-md rounded-[32px] bg-white p-6 sm:p-8 shadow-2xl border border-[#800020]/10">
          <div className="text-center mb-6">
            <h2 className="text-lg sm:text-xl font-black text-[#30251F]">Enter OTP</h2>
            <p className="text-[11px] sm:text-xs text-gray-500 mt-1">Demo OTP: <strong>1234</strong></p>
          </div>
          <form onSubmit={handleVerify} className="flex flex-col gap-4">
            <input type="text" maxLength={4} placeholder="Enter 4-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} className="h-14 sm:h-16 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 text-center text-xl sm:text-2xl font-black tracking-[0.5em] outline-none focus:border-[#800020] focus:bg-white" required />
            {error && <p className="text-xs font-bold text-red-500 text-center">{error}</p>}
            <button type="submit" className="h-12 rounded-xl bg-[#138047] text-sm font-black text-white shadow-lg hover:bg-[#0D6837]">Verify & Open Card</button>
            <button type="button" onClick={() => setStep("login")} className="text-xs font-bold text-gray-500 underline">Change Number</button>
          </form>
        </div>
      </main>
    );
  }

  // --- DASHBOARD ---
  const tierColor = customer.tier === "Platinum" ? "text-gray-300" : customer.tier === "Gold" ? "text-[#D4A84F]" : "text-gray-400";

  return (
    <main className="min-h-screen bg-[#FFF9D8] px-3 sm:px-4 py-8 sm:py-12 pt-24" style={{ perspective: "1500px" }}>
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#800020]">Smart Saver Club</h1>
            <p className="text-[10px] sm:text-xs font-medium text-gray-500">Rashid Mega Mart, Ghoghar</p>
          </div>
          <button onClick={handleLogout} className="text-[10px] sm:text-xs font-bold text-gray-500 underline hover:text-red-500">Sign Out</button>
        </div>

        {/* REAL-LIFE 3D MEMBERSHIP CARD */}
        <div 
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={() => { setRotateX(0); setRotateY(0); }}
          className="relative w-full aspect-[1.6/1] sm:aspect-[1.8/1] transition-transform duration-100 ease-out"
          style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`, transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[24px] sm:rounded-[32px] bg-gradient-to-br from-[#3A0010] via-[#800020] to-[#2A000A] p-4 sm:p-8 text-white shadow-[0_20px_40px_-10px_rgba(128,0,32,0.5)] border border-white/20">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(#FFF9D8 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
            
            <div className="relative z-10 flex items-start justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="h-6 w-8 sm:h-8 sm:w-11 rounded-md bg-gradient-to-br from-[#F5DDA8] to-[#B88A2F] shadow-inner flex flex-col justify-between p-0.5 sm:p-1">
                  <div className="h-px w-full bg-black/10" />
                  <div className="h-px w-full bg-black/10" />
                  <div className="h-px w-full bg-black/10" />
                </div>
                <div>
                  <p className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest text-[#D4A84F]">Rashid Mega Mart</p>
                  <p className="text-[8px] sm:text-[10px] font-bold text-white/80">Smart Saver Club</p>
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/10 px-2 sm:px-3 py-0.5 sm:py-1 backdrop-blur-sm">
                <Crown size={10} className={`sm:w-3 sm:h-3 ${tierColor}`} />
                <span className={`text-[7px] sm:text-[9px] font-black uppercase ${tierColor}`}>{customer.tier || "Silver"}</span>
              </div>
            </div>

            <div className="relative z-10 mt-4 sm:mt-8">
              <p className="text-sm sm:text-2xl font-mono tracking-[0.15em] sm:tracking-[0.2em] text-white/90 drop-shadow-md">
                5241  ••••  ••••  {customer.phone.slice(-4)}
              </p>
            </div>

            <div className="relative z-10 mt-3 sm:mt-4 flex items-end justify-between">
              <div>
                <p className="text-[7px] sm:text-[8px] font-bold text-white/50 uppercase">Card Holder</p>
                <p className="text-[11px] sm:text-sm font-black uppercase tracking-wider">{customer.name || "Valued Customer"}</p>
              </div>
              <div className="text-right">
                <p className="text-[7px] sm:text-[8px] font-bold text-white/50 uppercase">Member Since</p>
                <p className="text-[11px] sm:text-sm font-black">{new Date().getFullYear()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* STAMPS & PROGRESS */}
        <div className="mt-6 sm:mt-8 rounded-[24px] sm:rounded-3xl border border-[#800020]/10 bg-white p-4 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#30251F]">Your Rewards Progress</h2>
              <p className="text-[10px] sm:text-xs text-gray-500">Collect stamps and unlock rewards</p>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-xl sm:text-2xl font-black text-[#800020]">{customer.stamps}</span>
              <span className="text-xs sm:text-sm font-bold text-gray-400">/ 8</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-5 sm:mb-6">
            {Array.from({ length: 8 }).map((_, i) => {
              const isFilled = i < customer.stamps;
              return (
                <motion.div 
                  key={i}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex aspect-square flex-col items-center justify-center rounded-xl sm:rounded-2xl border-2 transition-all duration-500 ${
                    isFilled 
                      ? 'border-[#D4A84F] bg-gradient-to-br from-[#FFF9D8] to-[#F5DDA8] text-[#800020] shadow-[0_4px_10px_rgba(212,168,79,0.3)]' 
                      : 'border-dashed border-gray-200 bg-gray-50 text-gray-300'
                  }`}
                >
                  {isFilled ? <CheckCircle2 size={20} className="sm:w-7 sm:h-7" strokeWidth={2.5} /> : <Gift size={18} className="sm:w-6 sm:h-6" />}
                  <span className="text-[7px] sm:text-[9px] font-black mt-1 uppercase">{isFilled ? "Earned" : i+1}</span>
                </motion.div>
              );
            })}
          </div>

          {customer.rewards > 0 ? (
            <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#138047] to-[#0D6837] p-3 sm:p-4 text-center text-white shadow-md">
              <p className="text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 sm:gap-2">
                <Sparkles size={14} className="sm:w-4 sm:h-4" /> 🎉 {customer.rewards} reward(s) ready!
              </p>
              <p className="text-[9px] sm:text-[10px] text-white/80 mt-1">₹75 off on your next ₹699+ bill.</p>
            </div>
          ) : (
            <div className="rounded-xl sm:rounded-2xl bg-[#FFF9D8] p-3 sm:p-4 text-center border border-[#D4A84F]/30">
              <p className="text-xs sm:text-sm font-bold text-[#800020]">
                {8 - customer.stamps} more stamp(s) to unlock ₹75 reward!
              </p>
            </div>
          )}
        </div>

        {/* SCRATCH CARD GAME */}
        {customer.rewards > 0 && !scratchRevealed && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mt-5 sm:mt-6 rounded-[24px] sm:rounded-3xl bg-gradient-to-br from-[#D4A84F] to-[#B88A2F] p-1"
          >
            <div className="rounded-[20px] sm:rounded-[22px] bg-white p-4 sm:p-6 text-center">
              <h3 className="text-base sm:text-lg font-black text-[#800020] mb-1">🎁 You have a Surprise!</h3>
              <p className="text-[10px] sm:text-xs text-gray-500 mb-3 sm:mb-4">Scratch the card to reveal your extra bonus.</p>
              
              <div className="relative mx-auto h-20 sm:h-24 w-full max-w-xs rounded-xl bg-[#800020]/5 border-2 border-dashed border-[#D4A84F]/50 flex items-center justify-center overflow-hidden">
                 <button 
                   onClick={() => setScratchRevealed(true)}
                   className="absolute inset-0 z-10 flex items-center justify-center bg-[#800020] text-white text-xs sm:text-sm font-black tracking-widest hover:bg-[#600018] transition-colors"
                 >
                   TAP TO SCRATCH
                 </button>
                 <div className="text-center">
                    <p className="text-xl sm:text-2xl">🎉</p>
                    <p className="text-xs sm:text-sm font-black text-[#138047]">FREE DELIVERY</p>
                    <p className="text-[9px] sm:text-[10px] text-gray-500">On your next order</p>
                 </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* QR CODE & INFO */}
        <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="rounded-xl sm:rounded-2xl border border-[#800020]/10 bg-white p-3 sm:p-5 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:font-black text-[#800020] mb-0.5">Your QR Code</h3>
              <p className="text-[9px] sm:text-[10px] text-gray-500">Show this at the store</p>
            </div>
            <button onClick={() => setShowQR(true)} className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-[#800020]/5 flex items-center justify-center text-[#800020] hover:bg-[#800020]/10 transition-colors">
               <QrCode size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>
          
          <div className="rounded-xl sm:rounded-2xl border border-[#800020]/10 bg-white p-3 sm:p-5 shadow-sm">
            <h3 className="text-sm sm:font-black text-[#800020] mb-0.5">How to Earn</h3>
            <p className="text-[9px] sm:text-[10px] text-gray-500 leading-relaxed">Shop ₹300+ at Rashid Mega Mart and show your registered mobile number to earn a stamp.</p>
          </div>
        </div>

        {/* History */}
        <div className="mt-5 sm:mt-6 rounded-xl sm:rounded-2xl border border-[#800020]/10 bg-white p-4 sm:p-6 shadow-sm">
          <h3 className="text-sm sm:font-black text-[#800020] mb-3 sm:mb-4 flex items-center gap-1.5"><History size={16} className="sm:w-[18px] sm:h-[18px]" /> Recent Activity</h3>
          {(!customer.history || customer.history.length === 0) ? (
            <p className="text-xs sm:text-sm text-gray-500">Koi activity nahi hai. Store par bill karke stamp kamayein.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {customer.history.slice(-5).reverse().map((h: any, i: number) => (
                <div key={i} className="flex justify-between py-2.5 sm:py-3">
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-[#30251F]">{h.type === "stamp" ? "Stamp Earned" : "Reward Redeemed"}</p>
                    <p className="text-[9px] sm:text-xs text-gray-500">Bill: {h.invoice} · {new Date(h.date).toLocaleDateString()}</p>
                  </div>
                  <p className={`text-xs sm:text-sm font-black ${h.type === "stamp" ? "text-[#138047]" : "text-[#800020]"}`}>{h.type === "stamp" ? `+${h.count || 1}` : "-₹75"}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* QR MODAL */}
      <AnimatePresence>
        {showQR && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" onClick={() => setShowQR(false)}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl text-center max-w-xs w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-lg sm:text-xl font-black text-[#800020] mb-2">Scan at Store</h3>
              <p className="text-[10px] sm:text-xs text-gray-500 mb-5 sm:mb-6">Show this to the staff to add stamps</p>
              
              <div className="bg-[#FFF9D8] p-3 sm:p-4 rounded-2xl inline-block border-2 border-[#D4A84F]/30 mb-4">
                 <QrCode size={120} className="text-[#800020] sm:w-[150px] sm:h-[150px]" />
              </div>
              
              <p className="font-mono text-xs sm:text-sm font-bold text-gray-700 tracking-widest">{customer.phone}</p>
              <button onClick={() => setShowQR(false)} className="mt-5 sm:mt-6 w-full py-2 bg-gray-100 rounded-xl text-[10px] sm:text-xs font-bold text-gray-600">Close</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}