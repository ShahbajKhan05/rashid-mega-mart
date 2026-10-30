// app/admin/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { products as staticProducts } from "./../components/data";
import {
  ShieldCheck, Package, ShoppingBag, LogOut, Loader2, IndianRupee,
  Users, RefreshCw, Download, Upload, AlertTriangle, Ticket,
  LayoutDashboard, TrendingUp, TrendingDown, Wallet, Plus,
  ChevronRight, Activity, BarChart3, UserCog
} from "lucide-react";
import {
  safeGet, safeSet, getAllRevenue, getStaffSalesSummary, getExpenses
} from "../lib/store";

const ADMIN_PASS = "admin123";

type Stats = {
  products: number; orders: number; revenue: number;
  customers: number; coupons: number; posSales: number;
  webSales: number; expenses: number; profit: number;
};

export default function OwnerDashboard() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [stats, setStats] = useState<Stats>({
    products: 0, orders: 0, revenue: 0, customers: 0, coupons: 0,
    posSales: 0, webSales: 0, expenses: 0, profit: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [lowStock, setLowStock] = useState<any[]>([]);
  const [staffPerf, setStaffPerf] = useState<any[]>([]);
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmt, setExpenseAmt] = useState("");
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const loadAll = useCallback(() => {
    setIsRefreshing(true);
    try {
      const customProducts = safeGet<any[]>("rmm_custom_products", []);
      const posOrders = safeGet<any[]>("rmm_orders", []).filter(o => o.status === "Completed");
      const webOrders = safeGet<any[]>("rmm_website_orders", []);
      const customers = safeGet<any[]>("rmm_loyalty_customers", []);
      const couponsRaw = safeGet<any>("rmm_coupons", {});
      const inventory = safeGet<any[]>("rmm_inventory", []);
      const expenses = getExpenses();

      const couponsArr: any[] = Array.isArray(couponsRaw) ? couponsRaw : Object.keys(couponsRaw);
      const rev = getAllRevenue();
      const expenseTotal = expenses.reduce((s, e) => s + (e.amount || 0), 0);

      setStats({
        // ✅ Yahan staticProducts.length use kiya hai automatic count ke liye
        products: customProducts.length + staticProducts.length,
        orders: posOrders.length + webOrders.length,
        revenue: rev.total,
        customers: customers.length,
        coupons: couponsArr.length,
        posSales: rev.posTotal,
        webSales: rev.webTotal,
        expenses: expenseTotal,
        profit: rev.total - expenseTotal,
      });

      const combined = [
        ...posOrders.map((o: any) => ({ ...o, source: "POS" })),
        ...webOrders.map((o: any) => ({ ...o, source: "Website" })),
      ].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 6);
      setRecentOrders(combined);

      setLowStock(inventory.filter((p: any) => p.stock < 20).slice(0, 5));
      setStaffPerf(getStaffSalesSummary());
    } catch (e) { console.error(e); }
    finally { setTimeout(() => setIsRefreshing(false), 400); }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("rmm_admin") === "true") {
      setIsAuth(true);
      loadAll();
    }
  }, [loadAll]);

  useEffect(() => {
    if (!isAuth) return;
    const id = setInterval(loadAll, 15000);
    return () => clearInterval(id);
  }, [isAuth, loadAll]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); setError("");
    setTimeout(() => {
      if (password === ADMIN_PASS) {
        localStorage.setItem("rmm_admin", "true");
        setIsAuth(true); loadAll();
      } else setError("Galat password! (admin123)");
      setIsLoading(false);
    }, 600);
  };

  const handleLogout = () => {
    localStorage.removeItem("rmm_admin");
    setIsAuth(false); router.push("/");
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(expenseAmt);
    if (!expenseTitle.trim() || !amt) return;
    const list = getExpenses();
    safeSet("rmm_expenses", [{
      id: `EXP-${Date.now()}`, title: expenseTitle, amount: amt,
      category: "general", date: new Date().toLocaleDateString("en-GB"),
    }, ...list]);
    setExpenseTitle(""); setExpenseAmt(""); setShowExpenseForm(false);
    loadAll();
  };

  const handleBackup = () => {
    const data = {
      customProducts: safeGet("rmm_custom_products", []),
      posOrders: safeGet("rmm_orders", []),
      webOrders: safeGet("rmm_website_orders", []),
      customers: safeGet("rmm_loyalty_customers", []),
      coupons: safeGet("rmm_coupons", {}),
      inventory: safeGet("rmm_inventory", []),
      settings: safeGet("rmm_admin_settings", {}),
      staffList: safeGet("rmm_staff_list", []),
      staffSales: safeGet("rmm_staff_sales", []),
      expenses: safeGet("rmm_expenses", []),
      version: 2,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `RMM_OwnerBackup_${new Date().toISOString().split("T")[0]}.json`;
    a.click(); URL.revokeObjectURL(url);
  };

  const handleRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = (ev) => {
      try {
        const d = JSON.parse(ev.target?.result as string);
        if (d.posOrders) safeSet("rmm_orders", d.posOrders);
        if (d.webOrders) safeSet("rmm_website_orders", d.webOrders);
        if (d.customProducts) safeSet("rmm_custom_products", d.customProducts);
        if (d.customers) safeSet("rmm_loyalty_customers", d.customers);
        if (d.coupons) safeSet("rmm_coupons", d.coupons);
        if (d.inventory) safeSet("rmm_inventory", d.inventory);
        if (d.staffList) safeSet("rmm_staff_list", d.staffList);
        if (d.staffSales) safeSet("rmm_staff_sales", d.staffSales);
        if (d.expenses) safeSet("rmm_expenses", d.expenses);
        if (d.settings) safeSet("rmm_admin_settings", d.settings);
        loadAll(); alert("Restore ho gaya!");
      } catch { alert("Corrupt file!"); }
    };
    r.readAsText(file); e.target.value = "";
  };

  if (!isAuth) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#FFF9D8] p-4">
        <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-2xl border border-gray-100">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#800020] text-white mb-6 shadow-lg rotate-3">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-center text-3xl font-black text-[#800020] mb-2">Owner Login</h1>
          <p className="text-center text-sm font-bold text-gray-400 mb-8">
            Password: <span className="text-green-600 bg-green-50 px-2 py-1 rounded">admin123</span>
          </p>
          {error && <div className="mb-4 text-center text-sm font-bold text-red-500 bg-red-50 py-2 rounded-lg">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-5">
            <input type="password" placeholder="Enter Password..." value={password}
              onChange={(e) => setPassword(e.target.value)} disabled={isLoading}
              className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 px-5 py-4 text-center text-lg font-black tracking-widest outline-none focus:border-[#800020] focus:bg-white transition disabled:opacity-50"
            />
            <button type="submit" disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#800020] py-4 text-base font-black text-white shadow-lg hover:bg-[#600018] transition active:scale-95 disabled:opacity-70">
              {isLoading ? <><Loader2 size={20} className="animate-spin" /> Checking...</> : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9D8] p-4 sm:p-8 pb-20">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#800020]">Owner Dashboard</h1>
            <p className="text-xs font-bold text-gray-500 mt-1">Boss, aapki dukaan ka poora hisaab 📊</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadAll} className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 transition">
              <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 transition">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* MONEY STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="rounded-3xl bg-gradient-to-br from-[#800020] to-[#5A0014] p-5 text-white shadow-lg relative overflow-hidden col-span-2 sm:col-span-1">
            <div className="absolute -right-3 -bottom-3 opacity-10"><IndianRupee size={80} /></div>
            <p className="text-[10px] font-bold text-white/80 uppercase tracking-wider mb-1">Total Revenue</p>
            <p className="text-3xl font-black">₹{stats.revenue.toLocaleString("en-IN")}</p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <Wallet size={16} className="text-red-500" />
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Kharcha</p>
            </div>
            <p className="text-2xl font-black text-red-600">₹{stats.expenses.toLocaleString("en-IN")}</p>
            <button onClick={() => setShowExpenseForm(!showExpenseForm)} className="text-[10px] font-bold text-[#800020] underline mt-1">+ Add</button>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              {stats.profit >= 0 ? <TrendingUp size={16} className="text-green-600" /> : <TrendingDown size={16} className="text-red-600" />}
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Profit</p>
            </div>
            <p className={`text-2xl font-black ${stats.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
              ₹{stats.profit.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <Activity size={16} className="text-blue-600" />
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">POS vs Web</p>
            </div>
            <p className="text-xs font-black text-gray-700">POS: ₹{stats.posSales.toLocaleString("en-IN")}</p>
            <p className="text-xs font-black text-[#138047]">Web: ₹{stats.webSales.toLocaleString("en-IN")}</p>
          </div>
        </div>

        {/* Expense Form */}
        {showExpenseForm && (
          <motion.form initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleAddExpense}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row gap-3">
            <input required value={expenseTitle} onChange={e => setExpenseTitle(e.target.value)}
              placeholder="Kharcha kya tha? (e.g. Bijli bill)" className="flex-1 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-2.5 text-sm font-bold outline-none focus:border-[#800020]" />
            <input required type="number" value={expenseAmt} onChange={e => setExpenseAmt(e.target.value)}
              placeholder="₹" className="w-full sm:w-32 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-2.5 text-sm font-bold outline-none focus:border-[#800020]" />
            <button type="submit" className="rounded-xl bg-[#800020] px-5 py-2.5 text-sm font-black text-white hover:bg-[#600018]">Save</button>
          </motion.form>
        )}

        {/* OPERATIONS STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Products", val: stats.products, icon: Package, color: "blue", link: "/admin/products" },
            { label: "Orders", val: stats.orders, icon: ShoppingBag, color: "green", link: "/admin/orders" },
            { label: "Customers", val: stats.customers, icon: Users, color: "purple", link: "/admin/customers" },
            { label: "Coupons", val: stats.coupons, icon: Ticket, color: "amber", link: "/admin/coupons" },
          ].map((s, i) => (
            <Link key={i} href={s.link} className="group rounded-3xl bg-white p-4 shadow-sm border border-gray-100 hover:border-[#800020] hover:shadow-md transition block">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-${s.color}-50 text-${s.color}-600`}>
                    <s.icon size={18} />
                  </div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider group-hover:text-[#800020]">{s.label}</p>
                </div>
                <ChevronRight size={14} className="text-gray-300 group-hover:text-[#800020]" />
              </div>
              <p className="text-2xl font-black text-gray-800">{s.val}</p>
            </Link>
          ))}
        </div>

        {/* QUICK ACTIONS */}
        <h2 className="text-lg font-black text-gray-800 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { href: "/admin/products", label: "Add Product", sub: "Naya saman", icon: Plus, color: "#800020", bg: "bg-[#FFF9D8]" },
            { href: "/admin/orders", label: "All Orders", sub: "Manage & status", icon: ShoppingBag, color: "#138047", bg: "bg-green-50" },
            { href: "/admin/staff", label: "Staff & Sales", sub: "Kaun kitna becha", icon: UserCog, color: "#D4A84F", bg: "bg-amber-50" },
            { href: "/loyalty/staff", label: "POS Billing", sub: "Counter pe sale", icon: LayoutDashboard, color: "#7C3AED", bg: "bg-purple-50" },
          ].map((a, i) => (
            <Link key={i} href={a.href} className="group flex items-center justify-between gap-3 rounded-3xl bg-white p-4 shadow-sm border-2 border-transparent transition hover:shadow-md">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${a.bg}`} style={{ color: a.color }}>
                  <a.icon size={22} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-black text-gray-800 truncate group-hover:underline">{a.label}</h3>
                  <p className="text-[11px] font-medium text-gray-500 truncate">{a.sub}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-300 group-hover:text-gray-600 shrink-0" />
            </Link>
          ))}
        </div>

        {/* STAFF PERFORMANCE */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-black text-gray-800 flex items-center gap-2"><UserCog size={16} /> Staff Performance</h3>
            <Link href="/admin/staff" className="text-[10px] font-bold text-[#800020] bg-[#800020]/5 px-2 py-1 rounded-md">Manage</Link>
          </div>
          <div className="space-y-3">
            {staffPerf.length === 0 && <p className="text-xs text-gray-400 text-center py-4">Koi sale abhi tak record nahi hui. POS se sale karo.</p>}
            {staffPerf.map((s, i) => (
              <div key={s.staffId} className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#800020] text-white text-xs font-black">#{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-gray-800 truncate">{s.staffName}</p>
                  <p className="text-[10px] text-gray-400">{s.count} sales</p>
                </div>
                <p className="text-sm font-black text-[#800020]">₹{s.total.toLocaleString("en-IN")}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT ORDERS + LOW STOCK */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-black text-gray-800 mb-3 flex items-center gap-2"><BarChart3 size={16} /> Recent Orders</h3>
            <div className="space-y-2">
              {recentOrders.length === 0 && <p className="text-xs text-gray-400 text-center py-3">No orders yet</p>}
              {recentOrders.map((o: any) => (
                <div key={o.id} className="flex justify-between items-center text-xs border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-gray-500 truncate">{o.id}</p>
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${o.source === "POS" ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"}`}>{o.source}</span>
                  </div>
                  <span className="font-black text-[#800020]">₹{o.total}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-black text-gray-800 mb-3 flex items-center gap-2"><AlertTriangle size={14} className="text-red-500" /> Low Stock</h3>
            <div className="space-y-2">
              {lowStock.length === 0 && <p className="text-xs text-gray-400 text-center py-3">All stock healthy ✅</p>}
              {lowStock.map((p: any) => (
                <div key={p.id} className="flex justify-between items-center text-xs border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                  <span className="font-bold text-gray-700 truncate">{p.name}</span>
                  <span className="font-black text-red-600 bg-red-50 px-2 py-0.5 rounded">{p.stock} left</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BACKUP / RESTORE */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={handleBackup} className="flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm">
            <Download size={16} /> Backup All Data
          </button>
          <label className="flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm cursor-pointer">
            <Upload size={16} /> Restore
            <input type="file" accept=".json" onChange={handleRestore} className="hidden" />
          </label>
        </div>

      </div>
    </div>
  );
}