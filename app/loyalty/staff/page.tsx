// app/loyalty/staff/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldAlert, Bell, LogOut, Home, Zap, Users, List, Package, Settings, 
  AlertCircle, CheckCircle2 
} from "lucide-react";
import { safeGet, safeSet, getStaffList, StaffMember } from "./../../lib/store";

import DashboardTab from "./components/DashboardTab";
import PosTab from "./components/PosTab";
import OrdersTab from "./components/OrdersTab";
import CustomersTab from "./components/CustomersTab";
import InventoryTab from "./components/InventoryTab";
import SettingsTab from "./components/SettingsTab";

export type Tab = "dashboard" | "pos" | "customers" | "orders" | "inventory" | "settings";
export type Product = { id: string; name: string; price: number; stock: number; category: string };
export type CartItem = { product: Product; qty: number };
export type Customer = { phone: string; name: string; stamps: number; rewards: number; totalSpent: number; history: any[]; tier?: string; active?: boolean };
export type Coupon = { code: string; phone: string; status: "active" | "redeemed"; discount: number; minBill: number; createdAt: string };
export type Order = { id: string; date: string; customerPhone: string; items: CartItem[]; total: number; method: string; status: string; couponUsed?: string; staffId?: string; staffName?: string; source?: string };
export type Shift = { isOpen: boolean; openTime: string; openingCash: number; expectedCash: number; actualCash?: number; staffId?: string };
export type LoyaltySettings = { stampsRequired: number; rewardDiscount: number; minBill: number };

const DEFAULT_SETTINGS: LoyaltySettings = { stampsRequired: 8, rewardDiscount: 75, minBill: 699 };

export default function AdvancedStaffPOS() {
  const [isMounted, setIsMounted] = useState(false);
  const [loggedStaff, setLoggedStaff] = useState<StaffMember | null>(null);
  const [pinInput, setPinInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);

  const [inventory, setInventory] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [settings, setSettings] = useState<LoyaltySettings>(DEFAULT_SETTINGS);
  const [shift, setShift] = useState<Shift>({ isOpen: false, openTime: "", openingCash: 0, expectedCash: 0 });
  const [showShiftModal, setShowShiftModal] = useState(false);
  const [onlineAlerts, setOnlineAlerts] = useState<any[]>([]);

  const showToast = (msg: string, type: "success" | "error" | "info" = "success") => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 2500);
  };

  const playAlertSound = () => {
    const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
    audio.volume = 0.8; audio.play().catch(() => {});
    setTimeout(() => { const a = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg"); a.play().catch(()=>{}); }, 500);
  };

  useEffect(() => {
    setIsMounted(true);
    setInventory(safeGet("rmm_inventory", []));
    setOrders(safeGet("rmm_orders", []));
    setShift(safeGet("rmm_shift", { isOpen: false, openTime: "", openingCash: 0, expectedCash: 0 }));
    setSettings(safeGet("rmm_admin_settings", DEFAULT_SETTINGS));
    setCustomers(safeGet("rmm_loyalty_customers", []));
    setCoupons(safeGet("rmm_coupons", []));
    setLoggedStaff(safeGet("rmm_staff_session", null));
  }, []);

  useEffect(() => { if (isMounted) safeSet("rmm_inventory", inventory); }, [inventory, isMounted]);
  useEffect(() => { if (isMounted) safeSet("rmm_orders", orders); }, [orders, isMounted]);
  useEffect(() => { if (isMounted) safeSet("rmm_loyalty_customers", customers); }, [customers, isMounted]);
  useEffect(() => { if (isMounted) safeSet("rmm_coupons", coupons); }, [coupons, isMounted]);
  useEffect(() => { if (isMounted) safeSet("rmm_shift", shift); }, [shift, isMounted]);

  useEffect(() => {
    const interval = setInterval(() => {
      const alerts = safeGet<any[]>("rmm_order_alerts", []);
      const unread = alerts.filter(a => !a.isRead);
      if (unread.length > 0 && onlineAlerts.length === 0) playAlertSound();
      setOnlineAlerts(unread);
    }, 4000);
    return () => clearInterval(interval);
  }, [onlineAlerts.length]);

  const todayOrders = useMemo(() => orders.filter(o => o.date === new Date().toLocaleDateString("en-GB") && o.status === "Completed"), [orders]);
  const myTodayOrders = useMemo(() => todayOrders.filter(o => o.staffId === loggedStaff?.id), [todayOrders, loggedStaff]);
  const myTodaySales = useMemo(() => myTodayOrders.reduce((s, o) => s + o.total, 0), [myTodayOrders]);

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault(); playAlertSound();
    const found = getStaffList().find(s => s.pin === pinInput && s.active);
    if (found) { setLoggedStaff(found); safeSet("rmm_staff_session", found); } 
    else { setLoginError("Galat PIN"); }
  };

  const handleLogout = () => {
    setLoggedStaff(null); 
    safeSet("rmm_staff_session", null);
  };

  if (!isMounted) return null;

  if (!loggedStaff) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#800020] p-4">
        <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl">
          <ShieldAlert size={48} className="mx-auto text-[#800020] mb-4" />
          <h1 className="text-2xl font-black mb-6">Staff Login</h1>
          <form onSubmit={handleStaffLogin} className="space-y-4">
            <input type="password" maxLength={6} value={pinInput} onChange={e => setPinInput(e.target.value)}
              className="w-full rounded-2xl border-2 px-4 py-3 text-center text-2xl tracking-widest outline-none focus:border-[#800020]" placeholder="PIN" />
            {loginError && <p className="text-xs text-red-500 font-bold">{loginError}</p>}
            <button type="submit" className="w-full bg-[#800020] text-white py-3 rounded-xl font-bold">Enter POS</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* 🔥 PC SIDEBAR (Desktop only) */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200">
        <div className="p-5 border-b">
          <p className="font-black">{loggedStaff.name}</p>
          <p className="text-xs text-green-600">₹{myTodaySales} aaj</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {[
            { id: "dashboard", icon: Home, label: "Dashboard" },
            { id: "pos", icon: Zap, label: "New Sale" },
            { id: "orders", icon: List, label: "Orders" },
            { id: "customers", icon: Users, label: "Customers" },
            { id: "inventory", icon: Package, label: "Stock" },
            { id: "settings", icon: Settings, label: "Settings" },
          ].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id as Tab)} className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg font-bold capitalize transition ${activeTab === t.id ? "bg-[#800020] text-white" : "text-gray-600 hover:bg-gray-100"}`}>
              <t.icon size={18} /> {t.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t">
          <button onClick={handleLogout} className="w-full text-red-600 font-bold py-2 bg-red-50 rounded-lg flex items-center justify-center gap-2">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* 🔥 MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        
                {/* Top Header */}
        <header className="bg-white p-4 border-b flex justify-between items-center shadow-sm z-10">
                    <div className="flex items-center gap-3">
            {/* 🔥 ORIGINAL LOGO YAHAN ADD KIYA HAI */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#800020]/5 border border-[#800020]/10 p-1 overflow-hidden">
              <img src="/Logo.png" alt="Rashid Mega Mart" className="h-full w-full object-contain" />
            </div>
            <div>
              {/* 🔥 YAHAN STAFF DASHBOARD KI CONDITION LAGI HAI */}
              <h2 className="font-black capitalize text-lg leading-tight">
                {activeTab === "dashboard" ? "Staff Dashboard" : activeTab}
              </h2>
              <p className="text-[10px] text-gray-500 font-bold md:hidden">Rashid Mega Mart</p>
            </div>
          </div>

          {/* Online Order Alert (Right Side) */}
          {onlineAlerts.length > 0 && (
            <button onClick={() => { setActiveTab("orders"); safeSet("rmm_order_alerts", []); setOnlineAlerts([]); }} className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold animate-bounce shadow-lg flex items-center gap-1.5">
              <Bell size={14} /> <span className="hidden sm:inline">{onlineAlerts.length} New Order!</span>
              <span className="sm:hidden">{onlineAlerts.length}</span>
            </button>
          )}
        </header>
        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {activeTab === "dashboard" && <DashboardTab myTodaySales={myTodaySales} myTodayOrders={myTodayOrders} todayOrders={todayOrders} todaySales={todayOrders.reduce((s, o) => s + o.total, 0)} avgOrder={0} setActiveTab={setActiveTab} loggedStaff={loggedStaff} shift={shift} setShowShiftModal={setShowShiftModal} />}
          
          {activeTab === "pos" && <PosTab inventory={inventory} setInventory={setInventory} orders={orders} setOrders={setOrders} customers={customers} setCustomers={setCustomers} coupons={coupons} setCoupons={setCoupons} settings={settings} loggedStaff={loggedStaff} showToast={showToast} shift={shift} setShift={setShift} />}
          
          {activeTab === "orders" && <OrdersTab orders={orders} />}
          {activeTab === "customers" && <CustomersTab customers={customers} setCustomers={setCustomers} coupons={coupons} setCoupons={setCoupons} showToast={showToast} />}
          {activeTab === "inventory" && <InventoryTab inventory={inventory} />}
          {activeTab === "settings" && <SettingsTab loggedStaff={loggedStaff} settings={settings} shift={shift} setShowShiftModal={setShowShiftModal} handleLogout={handleLogout} />}
        </div>
      </main>

      {/* 🔥 MOBILE BOTTOM NAVIGATION (Fixed) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center h-[60px]">
          {[
            { id: "dashboard", icon: Home, label: "Home" },
            { id: "pos", icon: Zap, label: "POS" },
            { id: "orders", icon: List, label: "Orders" },
            { id: "customers", icon: Users, label: "Cust" },
            { id: "inventory", icon: Package, label: "Stock" },
            { id: "settings", icon: Settings, label: "Set" },
          ].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id as Tab)} className={`flex flex-col items-center justify-center w-full h-full space-y-0.5 ${activeTab === t.id ? "text-[#800020]" : "text-gray-400"}`}>
              <t.icon size={20} className={activeTab === t.id ? "fill-[#800020]/20" : ""} />
              <span className="text-[9px] font-bold">{t.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-xl ${
              toast.type === "error" ? "bg-red-500" : toast.type === "info" ? "bg-blue-500" : "bg-green-600"
            }`}>
            {toast.type === "error" ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />} {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}