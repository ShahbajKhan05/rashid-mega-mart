"use client";

import { useState, useEffect } from "react";
import {
  Search, Store, Stamp, Gift, LogOut, CheckCircle2, ShieldCheck, History,
  Plus, X, Receipt, Phone, Calendar, Clock, TrendingUp, Layers, Printer,
  UserCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function StaffLoyaltyPage() {
  // --- LOGIN STATES ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // --- LIVE DATE & TIME ---
  // FIX: Initial state null rakha hai taaki build ke time new Date() evaluate na ho
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- SEARCH STATES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [customer, setCustomer] = useState<any>(null);
  const [searchError, setSearchError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // --- ACTION STATES ---
  const [activeAction, setActiveAction] = useState<"stamp" | "redeem" | "history" | null>(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [billAmount, setBillAmount] = useState("300");
  const [stampCount, setStampCount] = useState("1");
  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState("");
  
  // --- RECEIPT STATE ---
  const [receiptData, setReceiptData] = useState<any>(null);

  // --- DAILY STATS ---
  const [dailyStamps, setDailyStamps] = useState(0);
  const [dailyRewards, setDailyRewards] = useState(0);

  useEffect(() => {
    const todayStr = new Date().toDateString();
    const savedStats = localStorage.getItem("rmm_daily_stats");
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      if (stats.date === todayStr) {
        setDailyStamps(stats.stamps || 0);
        setDailyRewards(stats.rewards || 0);
      } else {
        localStorage.setItem("rmm_daily_stats", JSON.stringify({ date: todayStr, stamps: 0, rewards: 0 }));
      }
    } else {
      localStorage.setItem("rmm_daily_stats", JSON.stringify({ date: todayStr, stamps: 0, rewards: 0 }));
    }
  }, []);

  const updateDailyStats = (type: "stamp" | "reward", count: number = 1) => {
    const todayStr = new Date().toDateString();
    const stats = JSON.parse(localStorage.getItem("rmm_daily_stats") || "{}");
    if (stats.date !== todayStr) {
      stats.date = todayStr; stats.stamps = 0; stats.rewards = 0;
    }
    if (type === "stamp") {
      stats.stamps += count;
      setDailyStamps(stats.stamps);
    } else {
      stats.rewards += count;
      setDailyRewards(stats.rewards);
    }
    localStorage.setItem("rmm_daily_stats", JSON.stringify(stats));
  };

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) setIsLoggedIn(true);
  };

  // --- SEARCH LOGIC (Name, Number, Invoice) ---
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(""); setCustomer(null); setActiveAction(null); setActionMessage(""); setActionError(""); setReceiptData(null);

    if (!searchQuery.trim()) {
      setSearchError("Please enter a name, number, or invoice.");
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      const saved = localStorage.getItem("rmm_loyalty_profile");
      if (!saved) {
        setSearchError("No customers registered yet.");
        setIsSearching(false);
        return;
      }

      const profile = JSON.parse(saved);
      const query = searchQuery.trim().toLowerCase();

      const matchesPhone = profile.phone === query;
      const matchesName = profile.name && profile.name.toLowerCase().includes(query);
      const matchesInvoice = profile.history && profile.history.some((h:any) => h.invoice.toLowerCase() === query);

      if (!matchesPhone && !matchesName && !matchesInvoice) {
        setSearchError("Customer not found.");
        setIsSearching(false);
        return;
      }
      
      setCustomer(profile);
      setIsSearching(false);
    }, 500);
  };

  // --- ADD MULTIPLE STAMPS ---
  const handleAddStamp = () => {
    if (!customer) return;
    const count = Number(stampCount) || 1;
    if (!invoiceNumber.trim()) { setActionError("Invoice number is required."); return; }
    if (Number(billAmount) < 300) { setActionError("Minimum bill amount is ₹300."); return; }
    
    const history = customer.history || [];
    if (history.some((h: any) => h.invoice === invoiceNumber)) {
      setActionError("This invoice number has already been used."); return;
    }

    const newStamps = customer.stamps + count;
    const newLifetime = (customer.lifetime_stamps || 0) + count;
    const newRewards = Math.floor(newStamps / 8) + customer.rewards;
    const finalStamps = newStamps % 8;

    const updated = {
      ...customer, stamps: finalStamps, lifetime_stamps: newLifetime, rewards: newRewards,
      history: [...history, { type: "stamp", invoice: invoiceNumber, amount: billAmount, date: new Date().toISOString(), count }]
    };

    localStorage.setItem("rmm_loyalty_profile", JSON.stringify(updated));
    setCustomer(updated); 
    setReceiptData({ type: "stamp", customer: updated, invoice: invoiceNumber, amount: billAmount, count, newStamps: finalStamps, newRewards });
    updateDailyStats("stamp", count);
    
    setInvoiceNumber(""); setBillAmount("300"); setStampCount("1"); setActiveAction(null);
    setActionMessage(`✅ ${count} Stamp(s) added! Progress: ${finalStamps}/8`);
    setActionError("");
  };

  const handleRedeem = () => {
    if (!customer || customer.rewards < 1) { setActionError("No rewards available."); return; }
    if (!invoiceNumber.trim()) { setActionError("Invoice number is required."); return; }
    if (Number(billAmount) < 699) { setActionError("Minimum bill amount is ₹699."); return; }

    const history = customer.history || [];
    if (history.some((h: any) => h.invoice === invoiceNumber)) {
      setActionError("This invoice number has already been used."); return;
    }

    const updated = {
      ...customer, rewards: customer.rewards - 1,
      history: [...history, { type: "redeem", invoice: invoiceNumber, amount: billAmount, date: new Date().toISOString(), count: 1 }]
    };

    localStorage.setItem("rmm_loyalty_profile", JSON.stringify(updated));
    setCustomer(updated);
    setReceiptData({ type: "redeem", customer: updated, invoice: invoiceNumber, amount: billAmount, count: 1, newRewards: updated.rewards });
    updateDailyStats("reward", 1);

    setInvoiceNumber(""); setBillAmount("300"); setActiveAction(null);
    setActionMessage("✅ ₹75 Reward Redeemed!");
    setActionError("");
  };

  // --- PRINT RECEIPT ---
  const handlePrint = () => {
    if (!receiptData) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const { type, customer, invoice, amount, count, newStamps, newRewards } = receiptData;
    const isStamp = type === "stamp";

    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt - Rashid Mega Mart</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');
            body { font-family: 'Courier Prime', monospace; max-width: 300px; margin: 0 auto; padding: 20px; color: #000; background: #fff; }
            .center { text-align: center; }
            .bold { font-weight: bold; }
            .dashed { border-bottom: 1px dashed #000; margin: 10px 0; }
            .row { display: flex; justify-content: space-between; margin: 4px 0; font-size: 13px; }
            .title { font-size: 18px; font-weight: bold; margin-bottom: 4px; }
            .sub { font-size: 11px; }
            .highlight { font-size: 16px; font-weight: bold; margin: 12px 0; text-align: center; padding: 8px; border: 1px solid #000; border-radius: 4px; }
            .footer { font-size: 10px; text-align: center; margin-top: 20px; }
          </style>
        </head>
        <body onload="window.print()">
          
          <div class="center">
            <div class="title">RASHID MEGA MART</div>
            <div class="sub">Ghoghar, Rewa, MP</div>
            <div class="sub">Ph: +91 89625 31603</div>
          </div>

          <div class="dashed"></div>

          <div class="row"><span>Date:</span><span>${new Date().toLocaleDateString()}</span></div>
          <div class="row"><span>Time:</span><span>${new Date().toLocaleTimeString()}</span></div>
          <div class="row"><span>Invoice:</span><span class="bold">${invoice}</span></div>
          <div class="row"><span>Customer:</span><span>${customer.name || "Member"}</span></div>
          <div class="row"><span>Mobile:</span><span>${customer.phone}</span></div>

          <div class="dashed"></div>

          ${
            isStamp 
              ? `<div class="highlight">STAMP ADDED (x${count})</div>
                 <div class="row"><span>Bill Amount:</span><span>₹${amount}</span></div>
                 <div class="row"><span>New Stamp Balance:</span><span class="bold">${newStamps} / 8</span></div>`
              : `<div class="highlight">REWARD REDEEMED</div>
                 <div class="row"><span>Bill Amount:</span><span>₹${amount}</span></div>
                 <div class="row"><span>Discount Given:</span><span class="bold">- ₹75</span></div>`
          }

          <div class="row"><span>Rewards Balance:</span><span class="bold">${newRewards}</span></div>

          <div class="dashed"></div>

          <div class="footer">
            Thank you for shopping!<br/>
            Smart Saver Club<br/>
            * Terms & Conditions Apply
          </div>

        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleLogout = () => {
    setIsLoggedIn(false); setCustomer(null); setSearchQuery(""); setActiveAction(null); setReceiptData(null);
  };

  // --- LOGIN SCREEN ---
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#FFF9D8] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-[32px] bg-white p-6 sm:p-8 shadow-2xl border border-[#800020]/10">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#800020] mb-3 sm:mb-4 shadow-lg">
              <Store size={28} className="text-white sm:w-8 sm:h-8" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#800020]">Staff Login</h1>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Rashid Mega Mart · Loyalty POS</p>
          </div>
          <form onSubmit={handleStaffLogin} className="flex flex-col gap-3 sm:gap-4">
            <input type="email" placeholder="Staff Email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 sm:h-14 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 text-sm text-gray-800 outline-none focus:border-[#800020]" required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 sm:h-14 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 text-sm text-gray-800 outline-none focus:border-[#800020]" required />
            <button type="submit" className="h-12 sm:h-14 rounded-xl bg-[#800020] text-sm font-black text-white shadow-lg hover:bg-[#600018]">Login</button>
          </form>
          <p className="text-[9px] sm:text-[10px] text-gray-400 text-center mt-3 sm:mt-4">Demo: Any credentials work.</p>
        </div>
      </main>
    );
  }

  // --- DASHBOARD ---
  return (
    <main className="min-h-screen bg-[#FFF9D8] text-[#171717] font-sans pb-10">
      
      {/* Top Status Bar */}
      <div className="bg-white border-b border-[#800020]/10 px-3 sm:px-4 py-2 flex items-center justify-between text-[10px] sm:text-xs text-gray-500 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Store size={12} className="text-[#800020] sm:w-3.5 sm:h-3.5" />
          <span className="font-bold text-[#800020]">Rashid Mega Mart</span>
          <span className="hidden sm:inline">| POS 01</span>
        </div>
        
        {/* FIX: Condition lagaya hai taaki currentTime null na ho tabhi dikhe */}
        {currentTime && (
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1">
              <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">{currentTime.toLocaleDateString("en-IN", { weekday: 'short', day: '2-digit', month: 'short' })}</span>
              <span className="sm:hidden">{currentTime.toLocaleDateString("en-IN", { day: '2-digit', month: 'short' })}</span>
            </div>
            <div className="flex items-center gap-1 text-[#800020] font-bold">
              <Clock size={12} className="sm:w-3.5 sm:h-3.5" />
              <span>{currentTime.toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6">
        
        {/* Header & Daily Stats */}
        <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-2xl font-black text-[#800020]">Staff Dashboard</h1>
            <p className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1 mt-0.5 sm:mt-1"><ShieldCheck size={12} className="text-[#138047]"/> Session Active</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="inline-flex items-center gap-1 rounded-lg bg-[#138047]/10 border border-[#138047]/20 px-2 sm:px-3 py-1.5 sm:py-2 text-[9px] sm:text-xs font-bold text-[#138047] flex-1 sm:flex-none justify-center">
              <TrendingUp size={12} className="sm:w-3.5 sm:h-3.5" /> {dailyStamps}S / {dailyRewards}R
            </div>
            <button onClick={handleLogout} className="flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 sm:px-3 py-1.5 sm:py-2 text-[9px] sm:text-xs font-bold text-red-600 hover:bg-red-100">
              <LogOut size={12} className="sm:w-3.5 sm:h-3.5" /> Logout
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="rounded-xl bg-white border border-[#800020]/10 p-3 sm:p-4 shadow-sm mb-4 sm:mb-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 sm:w-[18px] sm:h-[18px]" />
              <input 
                type="text" 
                placeholder="Name, Mobile, or Invoice..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="w-full h-11 sm:h-12 rounded-lg bg-gray-50 border border-gray-200 pl-10 sm:pl-11 pr-3 sm:pr-4 text-xs sm:text-sm text-gray-800 outline-none focus:border-[#800020]" 
                required 
              />
            </div>
            <button type="submit" className="h-11 sm:h-12 rounded-lg bg-[#800020] px-5 sm:px-8 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#600018]">
              Search
            </button>
          </form>
          {searchError && <p className="mt-2 text-[10px] sm:text-xs font-bold text-red-600 bg-red-50 p-2 rounded">{searchError}</p>}
          {isSearching && <p className="mt-2 text-[10px] sm:text-xs font-bold text-[#800020] animate-pulse">Scanning...</p>}
        </div>

        {/* Customer Found */}
        <AnimatePresence>
          {customer && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 sm:space-y-4">
              
              {actionMessage && (
                <div className="rounded-xl bg-[#138047]/10 border border-[#138047]/20 p-3 sm:p-4 text-center text-xs sm:text-sm font-bold text-[#138047] flex items-center justify-center gap-2">
                  <CheckCircle2 size={16} className="sm:w-[18px] sm:h-[18px]" /> {actionMessage}
                </div>
              )}

              {receiptData && (
                <div className="rounded-xl bg-white border border-gray-200 p-3 sm:p-4 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-[#30251F]">Transaction Complete</p>
                    <p className="text-[9px] sm:text-[10px] text-gray-500">Print receipt for record.</p>
                  </div>
                  <button onClick={handlePrint} className="flex items-center gap-1.5 rounded-lg bg-[#800020] px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-bold text-white shadow-sm hover:bg-[#600018]">
                    <Printer size={12} className="sm:w-3.5 sm:h-3.5" /> Print
                  </button>
                </div>
              )}

              {/* Customer Data Card */}
              <div className="rounded-xl bg-white border border-[#D4A84F]/40 p-4 sm:p-5 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#800020]/10 text-[#800020] text-lg sm:text-2xl font-black border-2 border-[#800020]/10">
                      {customer.name ? customer.name.charAt(0).toUpperCase() : "C"}
                    </div>
                    <div>
                      <h2 className="text-base sm:text-xl font-black text-[#30251F]">{customer.name || "Club Member"}</h2>
                      <p className="text-[10px] sm:text-sm text-gray-500 flex items-center gap-1 sm:gap-1.5 mt-0.5 sm:mt-1"><Phone size={10} className="sm:w-3.5 sm:h-3.5" /> {customer.phone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-wider mb-0.5 sm:mb-1">Stamps</p>
                    <p className="text-2xl sm:text-3xl font-black text-[#800020] leading-none">{customer.stamps}<span className="text-[10px] sm:text-sm text-gray-400">/8</span></p>
                  </div>
                </div>

                <div className="mt-4 sm:mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="rounded-lg bg-[#FFF9D8] p-2 sm:p-3 border border-[#800020]/5 text-center">
                    <p className="text-[8px] sm:text-[9px] text-gray-500 uppercase">Lifetime</p>
                    <p className="text-sm sm:text-lg font-bold text-[#30251F] mt-0.5 sm:mt-1">{customer.lifetime_stamps || 0}</p>
                  </div>
                  <div className="rounded-lg bg-[#FFF9D8] p-2 sm:p-3 border border-[#800020]/5 text-center">
                    <p className="text-[8px] sm:text-[9px] text-gray-500 uppercase">Rewards</p>
                    <p className="text-sm sm:text-lg font-bold text-[#138047] mt-0.5 sm:mt-1">{customer.rewards || 0}</p>
                  </div>
                  <div className="rounded-lg bg-[#FFF9D8] p-2 sm:p-3 border border-[#800020]/5 text-center">
                    <p className="text-[8px] sm:text-[9px] text-gray-500 uppercase">Since</p>
                    <p className="text-sm sm:text-lg font-bold text-[#30251F] mt-0.5 sm:mt-1">{new Date().getFullYear()}</p>
                  </div>
                </div>
              </div>

              {/* POS Action Buttons */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <button onClick={() => { setActiveAction("stamp"); setActionMessage(""); setActionError(""); }} className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-white border border-[#800020]/20 p-3 sm:p-4 text-[#800020] shadow-sm transition-all hover:bg-[#FFF9D8] hover:border-[#800020] active:scale-95">
                  <Stamp size={20} className="sm:w-6 sm:h-6" />
                  <span className="text-[9px] sm:text-xs font-bold">Add Stamp</span>
                </button>
                <button onClick={() => { setActiveAction("redeem"); setActionMessage(""); setActionError(""); }} className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-white border border-[#138047]/30 p-3 sm:p-4 text-[#138047] shadow-sm transition-all hover:bg-[#138047]/5 hover:border-[#138047] active:scale-95">
                  <Gift size={20} className="sm:w-6 sm:h-6" />
                  <span className="text-[9px] sm:text-xs font-bold">Redeem</span>
                </button>
                <button onClick={() => { setActiveAction("history"); setActionMessage(""); setActionError(""); }} className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-white border border-gray-200 p-3 sm:p-4 text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:border-gray-400 active:scale-95">
                  <History size={20} className="sm:w-6 sm:h-6" />
                  <span className="text-[9px] sm:text-xs font-bold">History</span>
                </button>
              </div>

              {/* Action Panels */}
              <AnimatePresence mode="wait">
                
                {activeAction === "stamp" && (
                  <motion.div key="stamp" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <div className="rounded-xl bg-white border border-[#800020]/20 p-4 sm:p-5 shadow-lg">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h3 className="text-sm sm:text-base font-bold text-[#800020] flex items-center gap-1.5 sm:gap-2"><Stamp size={16} className="sm:w-[18px] sm:h-[18px]"/> Add Stamp</h3>
                        <button onClick={() => setActiveAction(null)} className="text-gray-400 hover:text-red-500"><X size={16} className="sm:w-[18px] sm:h-[18px]"/></button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-2.5 sm:mb-3">
                        <div>
                          <label className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase">Invoice No</label>
                          <input type="text" placeholder="RMM-101" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="w-full h-10 sm:h-11 rounded-lg border border-gray-200 bg-gray-50 px-2.5 sm:px-3 text-xs sm:text-sm text-gray-800 mt-1 outline-none focus:border-[#800020]" />
                        </div>
                        <div>
                          <label className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase">Bill (₹)</label>
                          <input type="number" placeholder="300" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} className="w-full h-10 sm:h-11 rounded-lg border border-gray-200 bg-gray-50 px-2.5 sm:px-3 text-xs sm:text-sm text-gray-800 mt-1 outline-none focus:border-[#800020]" />
                        </div>
                      </div>

                      <div className="mb-3 sm:mb-4">
                        <label className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Layers size={10} className="sm:w-3 sm:h-3"/> Stamps</label>
                        <div className="flex gap-1.5 sm:gap-2 mt-1">
                          {[1, 2, 3, 4].map(num => (
                             <button key={num} onClick={() => setStampCount(String(num))} className={`flex-1 h-8 sm:h-9 rounded-lg border text-[10px] sm:text-xs font-bold transition-colors ${stampCount === String(num) ? 'border-[#800020] bg-[#800020] text-white' : 'border-gray-200 bg-white text-gray-500 hover:border-[#800020]/50'}`}>{num}</button>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        {[300, 500, 1000].map((amt) => (
                          <button key={amt} onClick={() => setBillAmount(String(amt))} className="flex-1 rounded-md bg-[#FFF9D8] border border-[#D4A84F]/30 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-bold text-[#800020] hover:bg-[#800020] hover:text-white transition-colors">₹{amt}</button>
                        ))}
                      </div>
                      
                      {actionError && <p className="mb-2.5 sm:mb-3 text-[10px] sm:text-xs font-bold text-red-600 bg-red-50 p-2 rounded">{actionError}</p>}
                      
                      <button onClick={handleAddStamp} className="w-full h-11 sm:h-12 rounded-lg bg-[#800020] text-xs sm:text-sm font-black text-white shadow-md hover:bg-[#600018] flex items-center justify-center gap-1.5 sm:gap-2">
                        <Plus size={16} className="sm:w-[18px] sm:h-[18px]" /> Verify & Add
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeAction === "redeem" && (
                  <motion.div key="redeem" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <div className="rounded-xl bg-white border border-[#138047]/20 p-4 sm:p-5 shadow-lg">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h3 className="text-sm sm:text-base font-bold text-[#138047] flex items-center gap-1.5 sm:gap-2"><Gift size={16} className="sm:w-[18px] sm:h-[18px]"/> Redeem ₹75</h3>
                        <button onClick={() => setActiveAction(null)} className="text-gray-400 hover:text-red-500"><X size={16} className="sm:w-[18px] sm:h-[18px]"/></button>
                      </div>

                      {customer.rewards < 1 ? (
                        <div className="rounded-lg bg-gray-50 p-3 sm:p-4 text-center border border-gray-100">
                          <p className="text-xs sm:text-sm font-bold text-red-500">No rewards available.</p>
                          <p className="text-[9px] sm:text-[10px] text-gray-500 mt-1">Need 8 stamps to unlock.</p>
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div>
                              <label className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase">Invoice No</label>
                              <input type="text" placeholder="RMM-101" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="w-full h-10 sm:h-11 rounded-lg border border-gray-200 bg-gray-50 px-2.5 sm:px-3 text-xs sm:text-sm text-gray-800 mt-1 outline-none focus:border-[#138047]" />
                            </div>
                            <div>
                              <label className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase">Bill (₹)</label>
                              <input type="number" placeholder="699" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} className="w-full h-10 sm:h-11 rounded-lg border border-gray-200 bg-gray-50 px-2.5 sm:px-3 text-xs sm:text-sm text-gray-800 mt-1 outline-none focus:border-[#138047]" />
                            </div>
                          </div>
                          <div className="flex gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                            {[699, 1000, 1500].map((amt) => (
                              <button key={amt} onClick={() => setBillAmount(String(amt))} className="flex-1 rounded-md bg-[#138047]/5 border border-[#138047]/20 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-bold text-[#138047] hover:bg-[#138047] hover:text-white transition-colors">₹{amt}</button>
                            ))}
                          </div>
                          
                          {actionError && <p className="mb-2.5 sm:mb-3 text-[10px] sm:text-xs font-bold text-red-600 bg-red-50 p-2 rounded">{actionError}</p>}

                          <div className="rounded-lg bg-[#138047]/5 p-2.5 sm:p-3 mb-3 sm:mb-4 border border-[#138047]/10 flex items-center justify-between">
                            <p className="text-[10px] sm:text-xs font-bold text-[#138047]">Available</p>
                            <p className="text-lg sm:text-xl font-black text-[#138047]">{customer.rewards}</p>
                          </div>
                          
                          <button onClick={handleRedeem} className="w-full h-11 sm:h-12 rounded-lg bg-[#138047] text-xs sm:text-sm font-black text-white shadow-md hover:bg-[#0D6837] flex items-center justify-center gap-1.5 sm:gap-2">
                            <Gift size={16} className="sm:w-[18px] sm:h-[18px]" /> Verify & Redeem
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeAction === "history" && (
                  <motion.div key="history" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <div className="rounded-xl bg-white border border-gray-200 p-4 sm:p-5 shadow-lg">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h3 className="text-sm sm:text-base font-bold text-gray-800 flex items-center gap-1.5 sm:gap-2"><Receipt size={16} className="sm:w-[18px] sm:h-[18px]"/> Ledger</h3>
                        <button onClick={() => setActiveAction(null)} className="text-gray-400 hover:text-red-500"><X size={16} className="sm:w-[18px] sm:h-[18px]"/></button>
                      </div>

                      {(!customer.history || customer.history.length === 0) ? (
                        <div className="rounded-lg bg-gray-50 p-3 sm:p-4 text-center border border-gray-100">
                          <p className="text-xs sm:text-sm font-bold text-gray-500">No transactions.</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto pr-1">
                          {customer.history.slice().reverse().map((h: any, i: number) => (
                            <div key={i} className="flex justify-between py-2 sm:py-3">
                              <div>
                                <p className="text-xs sm:text-sm font-bold text-[#30251F] flex items-center gap-1.5 sm:gap-2">
                                  {h.type === "stamp" ? <Stamp size={12} className="text-[#800020] sm:w-3.5 sm:h-3.5"/> : <Gift size={12} className="text-[#138047] sm:w-3.5 sm:h-3.5"/>}
                                  {h.type === "stamp" ? `Stamp (x${h.count || 1})` : "Reward"}
                                </p>
                                <p className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5">Inv: {h.invoice}</p>
                                <p className="text-[8px] sm:text-[9px] text-gray-400">{new Date(h.date).toLocaleDateString()}</p>
                              </div>
                              <p className={`text-xs sm:text-sm font-black ${h.type === "stamp" ? "text-[#138047]" : "text-[#800020]"}`}>
                                {h.type === "stamp" ? `+${h.count || 1}` : "-₹75"}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}