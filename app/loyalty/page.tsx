"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Crown, Gift, CheckCircle2, History, Sparkles, 
  X, Lock, Ticket, Copy, Check, Phone, User
} from "lucide-react"; 
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation"; 

export default function LoyaltyPage() {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"login" | "otp" | "dashboard">("login");
  const [customer, setCustomer] = useState<any>(null);
  const [error, setError] = useState("");
  
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [copied, setCopied] = useState(false);

  // 🔥 Sync Function jo storage aur orders check karega
  const syncData = () => {
    const loggedInPhone = localStorage.getItem("rmm_loyalty_logged_in");
    if (!loggedInPhone) return;

    const allCustomers = JSON.parse(localStorage.getItem("rmm_loyalty_customers") || "[]");
    const existing = allCustomers.find((c: any) => c.phone === loggedInPhone);
    
    if (existing) {
      const savedUser = localStorage.getItem("rmm_user");
      let updatedCustomer = { ...existing };
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser.name && parsedUser.name !== existing.name) {
          updatedCustomer.name = parsedUser.name;
          const updatedList = allCustomers.map((c: any) => c.phone === loggedInPhone ? updatedCustomer : c);
          localStorage.setItem("rmm_loyalty_customers", JSON.stringify(updatedList));
        }
      }
      setCustomer(updatedCustomer);
    }

    // 🔥 COUPON CHECK
    const allCoupons = JSON.parse(localStorage.getItem("rmm_coupons") || "{}");
    if (allCoupons[loggedInPhone]) {
      // Check karo ki koi order "Out for delivery" ya "Delivered" me hai kya?
      const allOrders = JSON.parse(localStorage.getItem("rmm_orders") || "[]");
      const activeOrderWithCoupon = allOrders.find((o: any) => 
        o.couponUsed === allCoupons[loggedInPhone] && (o.status === "out-for-delivery" || o.status === "delivered")
      );

      if (activeOrderWithCoupon) {
        // Agar order deliver ya on-way hai, toh coupon delete kar do
        delete allCoupons[loggedInPhone];
        localStorage.setItem("rmm_coupons", JSON.stringify(allCoupons));
        setCouponCode("");
      } else {
        setCouponCode(allCoupons[loggedInPhone]);
      }
    } else {
      setCouponCode(""); 
    }
  };

  useEffect(() => {
    syncData();
    const loggedInPhone = localStorage.getItem("rmm_loyalty_logged_in");
    if (loggedInPhone) {
      const allCustomers = JSON.parse(localStorage.getItem("rmm_loyalty_customers") || "[]");
      const existing = allCustomers.find((c: any) => c.phone === loggedInPhone);
      if (existing) setStep("dashboard");
    }

    window.addEventListener("focus", syncData);
    window.addEventListener("storage", syncData);

    return () => {
      window.removeEventListener("focus", syncData);
      window.removeEventListener("storage", syncData);
    };
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
    
    const allCustomers = JSON.parse(localStorage.getItem("rmm_loyalty_customers") || "[]");
    const existing = allCustomers.find((c: any) => c.phone === phone);
    
    if (existing) {
      setCustomer(existing);
      localStorage.setItem("rmm_loyalty_logged_in", phone); 
    } else {
      const newProfile = { phone, name, stamps: 0, lifetime_stamps: 0, rewards: 0, history: [], tier: "Silver" };
      const updatedList = [...allCustomers, newProfile];
      localStorage.setItem("rmm_loyalty_customers", JSON.stringify(updatedList));
      setCustomer(newProfile);
      localStorage.setItem("rmm_loyalty_logged_in", phone);
    }
    syncData(); 
    setStep("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("rmm_loyalty_logged_in");
    setCustomer(null);
    setStep("login");
    setPhone("");
    setOtp("");
    setCouponCode("");
  };

  const generateCoupon = () => {
    if (couponCode) {
      setShowCoupon(true); 
      return;
    }
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    const newCode = `RMM-75-${randomStr}`;
    
    setCouponCode(newCode);
    setShowCoupon(true);

    const allCoupons = JSON.parse(localStorage.getItem("rmm_coupons") || "{}");
    allCoupons[customer.phone] = newCode;
    localStorage.setItem("rmm_coupons", JSON.stringify(allCoupons));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    <main className="min-h-screen bg-[#FFF9D8] px-4 py-8 sm:py-12 pt-24" style={{ perspective: "1500px" }}>
      <div className="mx-auto max-w-md">
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-black text-[#800020]">Smart Saver Club</h1>
            <p className="text-[10px] font-medium text-gray-500">Rashid Mega Mart, Ghoghar</p>
          </div>
          <button onClick={handleLogout} className="text-[10px] font-bold text-gray-500 underline hover:text-red-500">Sign Out</button>
        </div>

        {/* MATTE BLACK CARD */}
        <div 
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={() => { setRotateX(0); setRotateY(0); }}
          className="relative w-full aspect-[1.58/1] transition-transform duration-100 ease-out mx-auto"
          style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`, transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 w-full h-full overflow-hidden rounded-[16px] bg-[#111111] p-5 text-white shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)] border border-gray-800">
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(105deg,transparent_20%,rgba(255,255,255,0.4)_25%,transparent_30%,transparent_70%,rgba(255,255,255,0.2)_75%,transparent_80%)] transition-transform duration-700 pointer-events-none" style={{ transform: `translateX(${rotateY * 3}px) translateY(${rotateX * 3}px)` }} />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image src="/Logo.png" alt="Logo" width={32} height={32} className="h-8 w-8 object-contain" />
                <div className="flex flex-col">
                  <span className="text-base font-black leading-none text-white">Rashid</span>
                  <span className="text-[9px] font-bold tracking-[0.15em] text-[#D4A84F]">MEGA MART</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-white/10 border border-white/10 px-2.5 py-1 backdrop-blur-sm">
                <Crown size={12} className={tierColor} />
                <span className={`text-[9px] font-black uppercase tracking-wider ${tierColor}`}>{customer.tier || "Silver"}</span>
              </div>
            </div>
            <div className="relative z-10 mt-4">
              <div className="h-8 w-11 rounded-md bg-gradient-to-br from-[#E6C27A] via-[#D4A84F] to-[#B88A2F] shadow-inner flex flex-col justify-between p-1">
                 <div className="flex justify-between w-full"><div className="h-1.5 w-2 bg-black/10 rounded-sm"/><div className="h-1.5 w-2 bg-black/10 rounded-sm"/></div>
                 <div className="h-1.5 w-full bg-black/10 rounded-sm"/>
                 <div className="flex justify-between w-full"><div className="h-1.5 w-2 bg-black/10 rounded-sm"/><div className="h-1.5 w-2 bg-black/10 rounded-sm"/></div>
              </div>
            </div>
            <div className="relative z-10 mt-5">
              <p className="text-xl font-mono tracking-[0.15em] text-gray-200">
                1200 3567 4510 {customer.phone.slice(-4)}
              </p>
            </div>
            <div className="relative z-10 mt-5 flex items-end justify-between">
              <div className="flex gap-6">
                <div>
                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Card Holder</p>
                  <p className="text-sm font-black uppercase tracking-wider text-gray-200 truncate max-w-[140px]">{customer.name || "Valued Customer"}</p>
                </div>
                <div>
                  <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Valid<br/>Thru</p>
                  <p className="text-sm font-black text-gray-200">12/30</p>
                </div>
              </div>
              <div className="flex relative h-8 w-12">
                <div className="absolute left-0 top-0 h-full w-8 rounded-full bg-[#EB001B] opacity-90" />
                <div className="absolute right-0 top-0 h-full w-8 rounded-full bg-[#F79E1B] opacity-90 mix-blend-screen" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex justify-end">
           <button onClick={() => router.push("/loyalty/staff")} className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 hover:text-[#800020] transition-colors bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
             <Lock size={12} /> Staff Login
           </button>
        </div>

        <div className="mt-8 rounded-[24px] border border-[#800020]/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-black text-[#30251F]">Your Rewards Progress</h2>
              <p className="text-[10px] text-gray-500">Collect stamps and unlock rewards</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black text-[#800020]">{customer.stamps}</span>
              <span className="text-xs font-bold text-gray-400">/ 8</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-6">
            {Array.from({ length: 8 }).map((_, i) => {
              const isFilled = i < customer.stamps;
              return (
                <motion.div key={i} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.05 }} className={`flex aspect-square flex-col items-center justify-center rounded-xl border-2 transition-all duration-500 ${isFilled ? 'border-[#D4A84F] bg-gradient-to-br from-[#FFF9D8] to-[#F5DDA8] text-[#800020] shadow-[0_4px_10px_rgba(212,168,79,0.3)]' : 'border-dashed border-gray-200 bg-gray-50 text-gray-300'}`}>
                  {isFilled ? <CheckCircle2 size={20} strokeWidth={2.5} /> : <Gift size={18} />}
                  <span className="text-[8px] font-black mt-1 uppercase">{isFilled ? "Earned" : i+1}</span>
                </motion.div>
              );
            })}
          </div>

          {customer.rewards > 0 ? (
            <div className="rounded-xl bg-gradient-to-r from-[#138047] to-[#0D6837] p-4 text-center text-white shadow-md">
              <p className="text-xs font-black flex items-center justify-center gap-1.5">
                <Sparkles size={14} /> 🎉 {customer.rewards} reward(s) ready!
              </p>
              <p className="text-[10px] text-white/80 mt-1">₹75 off on your next ₹699+ bill.</p>
            </div>
          ) : (
            <div className="rounded-xl bg-[#FFF9D8] p-4 text-center border border-[#D4A84F]/30">
              <p className="text-xs font-bold text-[#800020]">{8 - customer.stamps} more stamp(s) to unlock ₹75 reward!</p>
            </div>
          )}
        </div>

        {/* COUPON & INFO SECTION (Scratch Card removed) */}
        <div className="mt-5 grid grid-cols-1 gap-3">
          
          {/* Coupon Card */}
          <div className={`rounded-xl border p-4 shadow-sm flex items-center justify-between transition-colors ${couponCode ? 'border-[#138047]/20 bg-[#138047]/5' : 'border-gray-200 bg-gray-50'}`}>
            <div>
              <h3 className={`text-sm font-black mb-0.5 flex items-center gap-1 ${couponCode ? 'text-[#138047]' : 'text-gray-500'}`}>
                <Ticket size={14} /> Your Reward Coupon
              </h3>
              
              {couponCode ? (
                 <p className="text-[10px] text-[#138047]/70 font-bold">Tap to view code</p>
              ) : customer.rewards > 0 ? (
                 <p className="text-[10px] text-gray-500 font-bold">Generate a code</p>
              ) : (
                 <p className="text-[10px] text-gray-400 font-bold">Locked (Need 8 stamps)</p>
              )}
            </div>

            {couponCode ? (
              <button onClick={generateCoupon} className="h-10 px-4 rounded-lg font-black text-xs shadow-sm transition-colors bg-[#138047] text-white hover:bg-[#0D6837]">VIEW CODE</button>
            ) : customer.rewards > 0 ? (
               <button onClick={generateCoupon} className="h-10 px-4 rounded-lg font-black text-xs shadow-sm transition-colors bg-[#D4A84F] text-white hover:bg-[#C28E2B]">GET CODE</button>
            ) : (
              <button disabled className="h-10 px-4 rounded-lg font-black text-xs shadow-sm transition-colors bg-gray-200 text-gray-400 cursor-not-allowed">LOCKED</button>
            )}
          </div>
          
          {/* PHONE NUMBER */}
          <div className="rounded-xl border border-[#800020]/10 bg-white p-4 shadow-sm flex flex-col justify-center relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-[#800020]/5"><Phone size={80} /></div>
            <h3 className="text-sm font-black text-[#800020] mb-1 flex items-center gap-1.5"><User size={14} /> Show at Store</h3>
            <p className="text-[10px] text-gray-500 font-medium mb-2">Give your number to staff for stamps.</p>
            <div className="text-lg font-black text-gray-800 tracking-wider bg-gray-50 p-2 rounded-lg border border-gray-200 text-center">
              {customer.phone}
            </div>
          </div>
        </div>

        {/* History */}
        <div className="mt-5 rounded-xl border border-[#800020]/10 bg-white p-4 shadow-sm mb-12">
          <h3 className="text-sm font-black text-[#800020] mb-3 flex items-center gap-1.5"><History size={16} /> Recent Activity</h3>
          {(!customer.history || customer.history.length === 0) ? (
            <p className="text-xs text-gray-500">Koi activity nahi hai. Store par bill karke stamp kamayein.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {customer.history.slice(-5).reverse().map((h: any, i: number) => (
                <div key={i} className="flex justify-between py-2.5">
                  <div>
                    <p className="text-xs font-bold text-[#30251F]">{h.type === "stamp" ? "Stamp Earned" : "Reward Redeemed"}</p>
                    <p className="text-[9px] text-gray-500">Bill: {h.invoice} · {new Date(h.date).toLocaleDateString()}</p>
                  </div>
                  <p className={`text-xs font-black ${h.type === "stamp" ? "text-[#138047]" : "text-[#800020]"}`}>{h.type === "stamp" ? `+${h.count || 1}` : "-₹75"}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* COUPON MODAL */}
      <AnimatePresence>
        {showCoupon && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setShowCoupon(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="bg-white rounded-3xl shadow-2xl text-center max-w-sm w-full overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="bg-[#138047] p-4 text-white">
                <h3 className="text-xl font-black flex items-center justify-center gap-2">
                  <Ticket size={24} /> Your ₹75 OFF Coupon
                </h3>
              </div>
              <div className="p-6">
                <p className="text-[11px] sm:text-xs font-bold text-gray-500 mb-6">Show this code to the staff at billing.</p>
                <div className="border-2 border-dashed border-[#138047]/30 bg-[#138047]/5 rounded-2xl p-4 sm:p-6 mb-6 relative">
                  <p className="text-3xl sm:text-4xl font-mono font-black text-[#138047] tracking-widest">{couponCode}</p>
                  <button onClick={copyToClipboard} className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border border-gray-200 text-xs font-bold text-gray-600 px-3 py-1 rounded-full shadow-sm flex items-center gap-1 hover:text-[#138047]">
                    {copied ? <><Check size={12} className="text-green-600"/> Copied</> : <><Copy size={12}/> Copy Code</>}
                  </button>
                </div>
                <p className="text-[10px] font-bold text-gray-400">* Valid on bill above ₹699. 1 coupon per bill.</p>
              </div>
              <button onClick={() => setShowCoupon(false)} className="w-full py-3.5 bg-gray-100 text-xs font-black text-gray-600 hover:bg-gray-200 transition-colors">CLOSE</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}