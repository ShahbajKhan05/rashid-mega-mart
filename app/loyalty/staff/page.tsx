"use client";

import { useState, useEffect } from "react";
import {
  Search, Store, Stamp, Gift, LogOut, CheckCircle2, ShieldCheck, History,
  Plus, X, Receipt, Phone, Calendar, Clock, TrendingUp, Layers, Printer,
  Sparkles, Check, ChevronRight, Award, Users, Ticket, Package
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function StaffLoyaltyPage() {
  const [activeTab, setActiveTab] = useState<"loyalty" | "orders">("loyalty");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- LOYALTY STATES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [customer, setCustomer] = useState<any>(null);
  const [customerCoupon, setCustomerCoupon] = useState<string | null>(null);
  const [searchError, setSearchError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [activeAction, setActiveAction] = useState<"stamp" | "redeem" | "history" | null>(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [billAmount, setBillAmount] = useState("300");
  const [stampCount, setStampCount] = useState("1");
  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [receiptData, setReceiptData] = useState<any>(null);

  const [dailyStamps, setDailyStamps] = useState(0);
  const [dailyRewards, setDailyRewards] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  // --- ORDERS STATES ---
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderSearch, setOrderSearch] = useState("");

  useEffect(() => {
    const todayStr = new Date().toDateString();
    const savedStats = localStorage.getItem("rmm_daily_stats");
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      if (stats.date === todayStr) {
        setDailyStamps(stats.stamps || 0);
        setDailyRewards(stats.rewards || 0);
      }
    }
    const allCustomers = JSON.parse(localStorage.getItem("rmm_loyalty_customers") || "[]");
    setTotalCustomers(allCustomers.length);

    const orders = JSON.parse(localStorage.getItem("rmm_orders") || "[]");
    setAllOrders(orders);
  }, []);

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      if (email && password) setIsLoggedIn(true);
      setIsLoggingIn(false);
    }, 800);
  };

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(""); setCustomer(null); setActiveAction(null); setActionMessage(""); setActionError(""); setReceiptData(null); setCustomerCoupon(null);

    if (!searchQuery.trim()) {
      setSearchError("Please enter a name, number, or invoice.");
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      const allCustomers = JSON.parse(localStorage.getItem("rmm_loyalty_customers") || "[]");
      if (allCustomers.length === 0) {
        setSearchError("No customers registered yet.");
        setIsSearching(false);
        return;
      }

      const query = searchQuery.trim().toLowerCase();

      const found = allCustomers.find((c: any) => 
        c.phone === query || 
        (c.name && c.name.toLowerCase().includes(query)) || 
        (c.history && c.history.some((h:any) => h.invoice.toLowerCase() === query))
      );

      if (!found) {
        setSearchError("Customer not found.");
        setIsSearching(false);
        return;
      }

      const allCoupons = JSON.parse(localStorage.getItem("rmm_coupons") || "{}");
      if (allCoupons[found.phone]) {
        setCustomerCoupon(allCoupons[found.phone]);
      }
      
      setCustomer(found);
      setIsSearching(false);
    }, 500);
  };

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

    const updatedCustomer = {
      ...customer, stamps: finalStamps, lifetime_stamps: newLifetime, rewards: newRewards,
      history: [...history, { type: "stamp", invoice: invoiceNumber, amount: billAmount, date: new Date().toISOString(), count }]
    };

    const allCustomers = JSON.parse(localStorage.getItem("rmm_loyalty_customers") || "[]");
    const updatedList = allCustomers.map((c: any) => c.phone === customer.phone ? updatedCustomer : c);
    localStorage.setItem("rmm_loyalty_customers", JSON.stringify(updatedList));

    setCustomer(updatedCustomer); 
    setReceiptData({ type: "stamp", customer: updatedCustomer, invoice: invoiceNumber, amount: billAmount, count, newStamps: finalStamps, newRewards });
    updateDailyStats("stamp", count);
    
    setInvoiceNumber(""); setBillAmount("300"); setStampCount("1"); setActiveAction(null);
    setActionMessage(`✅ ${count} Stamp(s) added successfully!`);
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

    const updatedCustomer = {
      ...customer, rewards: customer.rewards - 1,
      history: [...history, { type: "redeem", invoice: invoiceNumber, amount: billAmount, date: new Date().toISOString(), count: 1 }]
    };

    const allCustomers = JSON.parse(localStorage.getItem("rmm_loyalty_customers") || "[]");
    const updatedList = allCustomers.map((c: any) => c.phone === customer.phone ? updatedCustomer : c);
    localStorage.setItem("rmm_loyalty_customers", JSON.stringify(updatedList));

    if (customerCoupon) {
      const allCoupons = JSON.parse(localStorage.getItem("rmm_coupons") || "{}");
      delete allCoupons[customer.phone];
      localStorage.setItem("rmm_coupons", JSON.stringify(allCoupons));
      setCustomerCoupon(null);
    }

    setCustomer(updatedCustomer);
    setReceiptData({ type: "redeem", customer: updatedCustomer, invoice: invoiceNumber, amount: billAmount, count: 1, newRewards: updatedCustomer.rewards });
    updateDailyStats("reward", 1);

    setInvoiceNumber(""); setBillAmount("300"); setActiveAction(null);
    setActionMessage("✅ ₹75 Reward Redeemed!");
    setActionError("");
  };

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
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Courier+Prime:wght@400;700&display=swap');
            body { font-family: 'Courier Prime', monospace; max-width: 320px; margin: 0 auto; padding: 20px; color: #000; background: #fff; }
            .center { text-align: center; }
            .bold { font-weight: bold; }
            .dashed { border-bottom: 1px dashed #333; margin: 12px 0; }
            .row { display: flex; justify-content: space-between; margin: 6px 0; font-size: 13px; }
            .title { font-family: 'Inter', sans-serif; font-size: 20px; font-weight: 800; margin-bottom: 2px; letter-spacing: -0.5px; }
            .sub { font-size: 11px; color: #555; }
            .highlight-box { font-size: 15px; font-weight: bold; margin: 15px 0; text-align: center; padding: 10px; border: 2px dashed #000; border-radius: 6px; background: #f9f9f9; }
            .footer { font-size: 10px; text-align: center; margin-top: 25px; color: #555; }
            .barcode { text-align: center; margin: 15px 0; font-size: 24px; letter-spacing: 5px; }
          </style>
        </head>
        <body onload="window.print()">
          
          <div class="center">
            <div class="title">RASHID MEGA MART</div>
            <div class="sub">Ghoghar, Rewa, MP - 486001</div>
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
              ? `<div class="highlight-box">STAMP ADDED (x${count})</div>
                 <div class="row"><span>Bill Amount:</span><span>₹${amount}</span></div>
                 <div class="row"><span>New Stamp Bal:</span><span class="bold">${newStamps} / 8</span></div>`
              : `<div class="highlight-box" style="border-color: #138047; background: #f0fdf4;">REWARD REDEEMED</div>
                 <div class="row"><span>Bill Amount:</span><span>₹${amount}</span></div>
                 <div class="row"><span>Discount:</span><span class="bold">- ₹75</span></div>`
          }

          <div class="row"><span>Rewards Avail:</span><span class="bold">${newRewards}</span></div>

          <div class="dashed"></div>

          <div class="barcode">|||| ||| |||| || |||</div>
          
          <div class="footer">
            Thank you for shopping!<br/>
            <strong>Smart Saver Club</strong><br/>
            Keep this receipt for your records.
          </div>

        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleLogout = () => {
    setIsLoggedIn(false); setCustomer(null); setSearchQuery(""); setActiveAction(null); setReceiptData(null); setCustomerCoupon(null);
  };

  // 🔥 UPDATED: Orders me Coupon Auto-Remove / Return Logic
  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = allOrders.map((o: any) => 
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    setAllOrders(updatedOrders);
    localStorage.setItem("rmm_orders", JSON.stringify(updatedOrders));

    const targetOrder = allOrders.find((o: any) => o.id === orderId);
    if (targetOrder && targetOrder.couponUsed) {
      const allCoupons = JSON.parse(localStorage.getItem("rmm_coupons") || "{}");
      
      if (newStatus === "confirmed") {
        // Agar order cancel ho gaya (wapas confirmed), toh coupon wapas lagao
        if (!allCoupons[targetOrder.customer.phone]) {
          allCoupons[targetOrder.customer.phone] = targetOrder.couponUsed;
          localStorage.setItem("rmm_coupons", JSON.stringify(allCoupons));
        }
      } else {
        // Agar order aage badh gaya (on way ya delivered), toh coupon hata do
        if (allCoupons[targetOrder.customer.phone] === targetOrder.couponUsed) {
          delete allCoupons[targetOrder.customer.phone];
          localStorage.setItem("rmm_coupons", JSON.stringify(allCoupons));
        }
      }
    }

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const totalRedeemed = customer?.history?.filter((h: any) => h.type === "redeem").length || 0;
  const totalEarned = customer?.history?.filter((h: any) => h.type === "stamp").reduce((acc: number, curr: any) => acc + (curr.count || 1), 0) || 0;

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#FFF9D8] flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#800020]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#D4A84F]/10 rounded-full blur-3xl" />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-[32px] bg-white/80 backdrop-blur-xl p-8 shadow-[0_20px_50px_rgba(128,0,32,0.1)] border border-white relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#800020] to-[#5A0014] mb-5 shadow-lg rotate-3">
              <Store size={36} className="text-white" />
            </div>
            <h1 className="text-3xl font-black text-[#800020] tracking-tight">Staff POS</h1>
            <p className="text-sm font-bold text-gray-500 mt-2">Rashid Mega Mart · Loyalty Counter</p>
          </div>
          <form onSubmit={handleStaffLogin} className="flex flex-col gap-4">
            <input type="email" placeholder="Staff Email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-14 rounded-2xl border-2 border-gray-100 bg-gray-50/50 px-5 text-sm font-bold text-gray-800 outline-none focus:border-[#800020] focus:bg-white transition" required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-14 rounded-2xl border-2 border-gray-100 bg-gray-50/50 px-5 text-sm font-bold text-gray-800 outline-none focus:border-[#800020] focus:bg-white transition" required />
            <button type="submit" disabled={isLoggingIn} className="h-14 mt-2 rounded-2xl bg-[#800020] text-sm font-black text-white shadow-[0_10px_20px_rgba(128,0,32,0.3)] hover:bg-[#600018] transition active:scale-95 flex items-center justify-center gap-2">
              {isLoggingIn ? <span className="animate-pulse">Authenticating...</span> : <><ShieldCheck size={18} /> Secure Login</>}
            </button>
          </form>
          <p className="text-xs font-bold text-gray-400 text-center mt-6">Demo: Any credentials work.</p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F3F4F6] text-[#171717] font-sans pb-10">
      {/* Top Bar */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#800020]/10 text-[#800020]">
            <Store size={20} />
          </div>
          <div>
            <h1 className="text-sm font-black text-gray-800 leading-tight">Rashid Mega Mart</h1>
            <p className="text-[10px] font-bold text-[#138047] flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#138047] animate-pulse" /> POS Active</p>
          </div>
        </div>
        
        {currentTime && (
          <div className="flex items-center gap-4 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
              <Calendar size={14} className="text-[#800020]" />
              <span className="hidden sm:inline">{currentTime.toLocaleDateString("en-IN", { weekday: 'short', day: '2-digit', month: 'short' })}</span>
              <span className="sm:hidden">{currentTime.toLocaleDateString("en-IN", { day: '2-digit', month: 'short' })}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-black text-[#800020]">
              <Clock size={14} />
              <span>{currentTime.toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-6">
        {/* Header Stats */}
        <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-black text-gray-800">Counter Dashboard</h2>
            <p className="text-sm font-medium text-gray-500 mt-1">Manage loyalty and orders.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="flex flex-col gap-1 rounded-xl bg-white px-4 py-2 border border-gray-200 shadow-sm">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Total Members</p>
              <div className="flex items-center gap-2 text-sm font-black text-[#800020]">
                <Users size={16} /> {totalCustomers} Customers
              </div>
            </div>

            <div className="flex flex-col gap-1 rounded-xl bg-white px-4 py-2 border border-gray-200 shadow-sm">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Today's Stats</p>
              <div className="flex items-center gap-4 text-sm font-black">
                <span className="text-[#800020] flex items-center gap-1"><Stamp size={14}/> {dailyStamps}</span>
                <span className="text-[#138047] flex items-center gap-1"><Gift size={14}/> {dailyRewards}</span>
              </div>
            </div>

            <button onClick={handleLogout} className="flex h-11 items-center gap-2 rounded-xl bg-red-50 px-4 text-sm font-bold text-red-600 border border-red-100 hover:bg-red-100 transition">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex bg-white rounded-xl p-1 mb-8 shadow-sm border border-gray-200 w-fit">
          <button onClick={() => setActiveTab("loyalty")} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition ${activeTab === "loyalty" ? "bg-[#800020] text-white shadow-md" : "text-gray-500 hover:bg-gray-50"}`}>
            <Stamp size={16} /> Loyalty
          </button>
          <button onClick={() => setActiveTab("orders")} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition ${activeTab === "orders" ? "bg-[#800020] text-white shadow-md" : "text-gray-500 hover:bg-gray-50"}`}>
            <Package size={16} /> Orders
          </button>
        </div>

        {/* ================== LOYALTY TAB ================== */}
        {activeTab === "loyalty" && (
          <div>
            <div className="rounded-[24px] bg-white p-2 shadow-lg border border-gray-100 mb-8 relative">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search by Name, Mobile, or Invoice..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-14 rounded-2xl bg-gray-50 border-none pl-12 pr-4 text-base font-bold text-gray-800 outline-none focus:ring-2 focus:ring-[#800020]/20 transition-all" required />
                </div>
                <button type="submit" className="h-14 rounded-2xl bg-[#800020] px-8 text-sm font-black text-white shadow-md hover:bg-[#600018] transition active:scale-95 flex items-center justify-center gap-2">
                  {isSearching ? "Searching..." : "Find Customer"}
                </button>
              </form>
              {searchError && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-white bg-red-500 px-4 py-1.5 rounded-full shadow-md">
                  {searchError}
                </motion.p>
              )}
            </div>

            <AnimatePresence mode="wait">
              {!customer && !isSearching && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    <Search size={40} className="opacity-50" />
                  </div>
                  <p className="text-sm font-bold">Ready to scan...</p>
                  <p className="text-xs mt-1">Customer details will appear here.</p>
                </motion.div>
              )}

              {customer && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  
                  {actionMessage && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl bg-[#138047] p-4 text-center text-sm font-black text-white shadow-lg flex items-center justify-center gap-2">
                      <CheckCircle2 size={20} /> {actionMessage}
                    </motion.div>
                  )}

                  {receiptData && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl bg-white border-2 border-[#800020] p-5 shadow-xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-[#800020]/10 flex items-center justify-center">
                           <Receipt size={24} className="text-[#800020]" />
                        </div>
                        <div>
                          <p className="text-base font-black text-gray-800">Transaction Complete</p>
                          <p className="text-xs font-bold text-gray-500">Generate physical receipt for customer.</p>
                        </div>
                      </div>
                      <button onClick={handlePrint} className="flex items-center gap-2 rounded-xl bg-[#800020] px-6 py-3 text-sm font-black text-white shadow-md hover:bg-[#600018] transition active:scale-95">
                        <Printer size={18} /> Print Receipt
                      </button>
                    </motion.div>
                  )}

                  <div className="relative overflow-hidden rounded-[32px] bg-white p-6 sm:p-8 shadow-xl border border-gray-100">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#800020]/5 to-[#D4A84F]/5 rounded-bl-full pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="flex items-center gap-5">
                        <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#800020] to-[#5A0014] text-white text-3xl sm:text-4xl font-black shadow-lg">
                          {customer.name ? customer.name.charAt(0).toUpperCase() : "C"}
                        </div>
                        <div>
                          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#D4A84F]/20 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#800020] mb-2">
                            <Award size={12} /> Smart Saver Member
                          </div>
                          <h2 className="text-2xl sm:text-3xl font-black text-gray-800">{customer.name || "Club Member"}</h2>
                          <p className="text-sm font-bold text-gray-500 flex items-center gap-1.5 mt-1"><Phone size={14} /> {customer.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 w-full sm:w-auto">
                        <div className="flex-1 sm:w-32 bg-[#FFF9D8] rounded-2xl p-4 text-center border border-[#D4A84F]/30">
                          <p className="text-[10px] font-bold text-[#800020] uppercase tracking-wider mb-1">Stamps</p>
                          <p className="text-3xl font-black text-[#800020] leading-none">{customer.stamps}<span className="text-sm text-[#800020]/50">/8</span></p>
                        </div>
                        <div className="flex-1 sm:w-32 bg-[#138047]/10 rounded-2xl p-4 text-center border border-[#138047]/20">
                          <p className="text-[10px] font-bold text-[#138047] uppercase tracking-wider mb-1">Rewards</p>
                          <p className="text-3xl font-black text-[#138047] leading-none">{customer.rewards || 0}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-4 border-t border-gray-100 pt-5">
                      <div className="flex-1 min-w-[150px] bg-gray-50 rounded-xl p-3 border border-gray-200 flex flex-col justify-center">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1">Total Earned / Redeemed</p>
                        <div className="flex items-center gap-3 text-sm font-bold">
                          <span className="text-[#138047] flex items-center gap-1"><TrendingUp size={14}/> {totalEarned} Earned</span>
                          <span className="text-red-500 flex items-center gap-1"><Gift size={14}/> {totalRedeemed} Redeemed</span>
                        </div>
                      </div>

                      {customerCoupon && (
                        <div className="flex-1 min-w-[200px] bg-[#FFF9D8] rounded-xl p-3 border border-[#D4A84F]/50 flex flex-col justify-center relative overflow-hidden">
                          <div className="absolute -right-2 -bottom-2 opacity-10"><Ticket size={60} /></div>
                          <p className="text-[10px] font-black text-[#800020] uppercase tracking-wider mb-1 flex items-center gap-1"><Ticket size={12}/> Active Coupon Code</p>
                          <p className="text-base font-mono font-black text-[#800020] tracking-widest">{customerCoupon}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    <button onClick={() => { setActiveAction("stamp"); setActionMessage(""); setActionError(""); setReceiptData(null); }} className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-4 sm:p-6 transition-all duration-300 ${activeAction === 'stamp' ? 'bg-[#800020] border-[#800020] text-white shadow-lg scale-105' : 'bg-white border-transparent text-[#800020] shadow-sm hover:border-[#800020]/30'}`}>
                      <div className={`p-3 rounded-full ${activeAction === 'stamp' ? 'bg-white/20' : 'bg-[#800020]/10'}`}><Stamp size={24} /></div>
                      <span className="text-xs sm:text-sm font-black">Add Stamp</span>
                    </button>
                    
                    <button onClick={() => { setActiveAction("redeem"); setActionMessage(""); setActionError(""); setReceiptData(null); }} className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-4 sm:p-6 transition-all duration-300 ${activeAction === 'redeem' ? 'bg-[#138047] border-[#138047] text-white shadow-lg scale-105' : 'bg-white border-transparent text-[#138047] shadow-sm hover:border-[#138047]/30'}`}>
                      <div className={`p-3 rounded-full ${activeAction === 'redeem' ? 'bg-white/20' : 'bg-[#138047]/10'}`}><Gift size={24} /></div>
                      <span className="text-xs sm:text-sm font-black">Redeem Reward</span>
                    </button>
                    
                    <button onClick={() => { setActiveAction("history"); setActionMessage(""); setActionError(""); setReceiptData(null); }} className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-4 sm:p-6 transition-all duration-300 ${activeAction === 'history' ? 'bg-gray-800 border-gray-800 text-white shadow-lg scale-105' : 'bg-white border-transparent text-gray-600 shadow-sm hover:border-gray-300'}`}>
                      <div className={`p-3 rounded-full ${activeAction === 'history' ? 'bg-white/20' : 'bg-gray-100'}`}><History size={24} /></div>
                      <span className="text-xs sm:text-sm font-black">Ledger</span>
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {activeAction === "stamp" && (
                      <motion.div key="stamp" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="rounded-[32px] bg-white border border-gray-100 p-6 sm:p-8 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-black text-[#800020] flex items-center gap-2"><Stamp size={20}/> Issue Stamps</h3>
                          <button onClick={() => setActiveAction(null)} className="text-gray-400 hover:text-red-500 bg-gray-50 p-2 rounded-full"><X size={18}/></button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-5">
                          <div>
                            <label className="text-[11px] font-black text-gray-500 uppercase tracking-wide">Invoice No</label>
                            <input type="text" placeholder="RMM-101" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="w-full h-12 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 text-sm font-bold text-gray-800 mt-1.5 outline-none focus:border-[#800020] focus:bg-white transition" />
                          </div>
                          <div>
                            <label className="text-[11px] font-black text-gray-500 uppercase tracking-wide">Bill Amount (₹)</label>
                            <input type="number" placeholder="300" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} className="w-full h-12 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 text-sm font-bold text-gray-800 mt-1.5 outline-none focus:border-[#800020] focus:bg-white transition" />
                          </div>
                        </div>

                        <div className="mb-6">
                          <label className="text-[11px] font-black text-gray-500 uppercase tracking-wide flex items-center gap-1.5"><Layers size={12}/> No. of Stamps</label>
                          <div className="flex gap-2 mt-2">
                            {[1, 2, 3, 4].map(num => (
                               <button key={num} onClick={() => setStampCount(String(num))} className={`flex-1 h-12 rounded-xl border-2 text-sm font-black transition-all ${stampCount === String(num) ? 'border-[#800020] bg-[#800020] text-white shadow-md' : 'border-gray-100 bg-white text-gray-500 hover:border-[#800020]/30'}`}>{num}</button>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 mb-6">
                          {[300, 500, 1000].map((amt) => (
                            <button key={amt} onClick={() => setBillAmount(String(amt))} className="flex-1 rounded-xl bg-[#FFF9D8] border border-[#D4A84F]/30 py-2 text-xs font-black text-[#800020] hover:bg-[#800020] hover:text-white transition-colors">Set ₹{amt}</button>
                          ))}
                        </div>
                        
                        {actionError && <p className="mb-4 text-xs font-bold text-white bg-red-500 p-3 rounded-xl text-center shadow-sm">{actionError}</p>}
                        
                        <button onClick={handleAddStamp} className="w-full h-14 rounded-xl bg-[#800020] text-sm font-black text-white shadow-[0_10px_20px_rgba(128,0,32,0.2)] hover:bg-[#600018] transition active:scale-95 flex items-center justify-center gap-2">
                          <Plus size={20} /> Confirm & Add Stamps
                        </button>
                      </motion.div>
                    )}

                    {activeAction === "redeem" && (
                      <motion.div key="redeem" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="rounded-[32px] bg-white border border-gray-100 p-6 sm:p-8 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-black text-[#138047] flex items-center gap-2"><Gift size={20}/> Redeem Reward</h3>
                          <button onClick={() => setActiveAction(null)} className="text-gray-400 hover:text-red-500 bg-gray-50 p-2 rounded-full"><X size={18}/></button>
                        </div>

                        {customer.rewards < 1 ? (
                          <div className="rounded-2xl bg-red-50 p-6 text-center border border-red-100">
                            <p className="text-base font-black text-red-600">No rewards available.</p>
                            <p className="text-xs font-bold text-red-400 mt-1">Need 8 stamps to unlock ₹75 off.</p>
                          </div>
                        ) : (
                          <>
                            <div className="grid grid-cols-2 gap-4 mb-5">
                              <div>
                                <label className="text-[11px] font-black text-gray-500 uppercase tracking-wide">Invoice No</label>
                                <input type="text" placeholder="RMM-101" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="w-full h-12 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 text-sm font-bold text-gray-800 mt-1.5 outline-none focus:border-[#138047] focus:bg-white transition" />
                              </div>
                              <div>
                                <label className="text-[11px] font-black text-gray-500 uppercase tracking-wide">Bill Amount (₹)</label>
                                <input type="number" placeholder="699" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} className="w-full h-12 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 text-sm font-bold text-gray-800 mt-1.5 outline-none focus:border-[#138047] focus:bg-white transition" />
                              </div>
                            </div>
                            <div className="flex gap-2 mb-6">
                              {[699, 1000, 1500].map((amt) => (
                                <button key={amt} onClick={() => setBillAmount(String(amt))} className="flex-1 rounded-xl bg-[#138047]/5 border border-[#138047]/20 py-2 text-xs font-black text-[#138047] hover:bg-[#138047] hover:text-white transition-colors">Set ₹{amt}</button>
                              ))}
                            </div>
                            
                            {actionError && <p className="mb-4 text-xs font-bold text-white bg-red-500 p-3 rounded-xl text-center shadow-sm">{actionError}</p>}

                            <div className="rounded-2xl bg-gradient-to-r from-[#138047] to-[#0D6837] p-4 mb-6 shadow-inner flex items-center justify-between text-white">
                              <div>
                                <p className="text-[10px] font-bold text-white/80 uppercase tracking-wider">Discount to Apply</p>
                                <p className="text-2xl font-black">₹75 OFF</p>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] font-bold text-white/80 uppercase tracking-wider">Available Rewards</p>
                                <p className="text-xl font-black">{customer.rewards}</p>
                              </div>
                            </div>
                            
                            <button onClick={handleRedeem} className="w-full h-14 rounded-xl bg-[#138047] text-sm font-black text-white shadow-[0_10px_20px_rgba(19,128,71,0.2)] hover:bg-[#0D6837] transition active:scale-95 flex items-center justify-center gap-2">
                              <CheckCircle2 size={20} /> Confirm Redeem
                            </button>
                          </>
                        )}
                      </motion.div>
                    )}

                    {activeAction === "history" && (
                      <motion.div key="history" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="rounded-[32px] bg-white border border-gray-100 p-6 sm:p-8 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-black text-gray-800 flex items-center gap-2"><Receipt size={20}/> Customer Ledger</h3>
                          <button onClick={() => setActiveAction(null)} className="text-gray-400 hover:text-red-500 bg-gray-50 p-2 rounded-full"><X size={18}/></button>
                        </div>

                        {(!customer.history || customer.history.length === 0) ? (
                          <div className="rounded-2xl bg-gray-50 p-6 text-center border border-gray-100">
                            <p className="text-sm font-bold text-gray-500">No transactions yet.</p>
                          </div>
                        ) : (
                          <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                            {customer.history.slice().reverse().map((h: any, i: number) => (
                              <div key={i} className="flex justify-between py-3">
                                <div>
                                  <p className="text-sm font-black text-gray-800 flex items-center gap-2">
                                    {h.type === "stamp" ? <Stamp size={14} className="text-[#800020]"/> : <Gift size={14} className="text-[#138047]"/>}
                                    {h.type === "stamp" ? `Earned (x${h.count || 1})` : "Redeemed Reward"}
                                  </p>
                                  <p className="text-[11px] font-bold text-gray-500 mt-1">Invoice: <span className="text-gray-800">{h.invoice}</span></p>
                                  <p className="text-[10px] font-medium text-gray-400 mt-0.5">{new Date(h.date).toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                  <p className={`text-sm font-black ${h.type === "stamp" ? "text-[#138047]" : "text-[#800020]"}`}>
                                    {h.type === "stamp" ? `+${h.count || 1} Stamp` : "-₹75"}
                                  </p>
                                  <p className="text-[10px] font-bold text-gray-400 mt-0.5">Bill: ₹{h.amount}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ================== ORDERS TAB ================== */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
              <div>
                <h2 className="text-xl font-black text-gray-800">Manage Orders</h2>
                <p className="text-sm font-medium text-gray-500 mt-1">Check customer orders & update status.</p>
              </div>
              
              <div className="flex h-10 w-full sm:max-w-xs items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 shadow-sm focus-within:border-[#800020]">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search by Order ID..."
                  className="w-full bg-transparent text-sm font-bold outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                {allOrders.filter(o => o.id.toLowerCase().includes(orderSearch.toLowerCase())).length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <Package size={40} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-sm font-bold text-gray-500">No orders found.</p>
                  </div>
                ) : (
                  allOrders.filter(o => o.id.toLowerCase().includes(orderSearch.toLowerCase())).map((order) => (
                    <button 
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className={`w-full text-left rounded-2xl p-4 transition-all border-2 ${selectedOrder?.id === order.id ? "border-[#800020] bg-[#800020]/5" : "border-transparent bg-white shadow-sm hover:border-gray-200"}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{order.id}</p>
                          <p className="text-sm font-bold text-gray-800">{order.date}</p>
                        </div>
                        <p className="text-sm font-black text-[#800020]">₹{order.total}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-xs font-bold text-gray-600">{order.items.length} items</p>
                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
                          order.status === "delivered" ? "bg-green-100 text-green-700" : 
                          order.status === "out-for-delivery" ? "bg-amber-100 text-amber-700" : 
                          "bg-blue-100 text-blue-700"
                        }`}>
                          {order.status || "confirmed"}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>

              <div className="lg:sticky lg:top-24">
                {!selectedOrder ? (
                  <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <Search size={32} className="text-gray-300 mb-2" />
                    <p className="text-sm font-bold text-gray-500">Select an order to view details</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                    <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
                      <div>
                        <h3 className="text-lg font-black text-gray-800">{selectedOrder.id}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{selectedOrder.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Total</p>
                        <p className="text-lg font-black text-[#800020]">₹{selectedOrder.total}</p>
                      </div>
                    </div>

                    <div className="mb-5 bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Customer Details</p>
                      <p className="text-sm font-bold text-gray-800">{selectedOrder.customer?.name || "N/A"}</p>
                      <p className="text-xs font-medium text-gray-600 mt-0.5">{selectedOrder.customer?.phone || "N/A"}</p>
                      <p className="text-xs text-gray-500 mt-1">{selectedOrder.customer?.address || "N/A"}, {selectedOrder.customer?.pincode || ""}</p>
                    </div>

                    <div className="space-y-2 mb-6">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Items</p>
                      {selectedOrder.items.map((item: any, i: number) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.name} <span className="font-bold">× {item.quantity}</span></span>
                          <span className="font-bold text-gray-800">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-3">Update Order Status</p>
                      <div className="flex gap-2">
                        <button onClick={() => handleUpdateOrderStatus(selectedOrder.id, "confirmed")} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition ${selectedOrder.status === 'confirmed' || !selectedOrder.status ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>Confirm</button>
                        <button onClick={() => handleUpdateOrderStatus(selectedOrder.id, "out-for-delivery")} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition ${selectedOrder.status === 'out-for-delivery' ? 'bg-amber-50 border-amber-200 text-amber-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>On Way</button>
                        <button onClick={() => handleUpdateOrderStatus(selectedOrder.id, "delivered")} className={`flex-1 py-2 rounded-lg text-xs font-bold border transition ${selectedOrder.status === 'delivered' ? 'bg-green-50 border-green-200 text-green-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>Delivered</button>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
      `}} />
    </main>
  );
}