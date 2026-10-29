"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, PlusCircle, Package, ShoppingBag, ArrowRight, LogOut, Loader2, IndianRupee } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Naye Stats
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });

  useEffect(() => {
    if (localStorage.getItem("rmm_admin") === "true") {
      setIsAuthenticated(true);
      loadStats();
    }
  }, []);

  const loadStats = () => {
    const customProducts = JSON.parse(localStorage.getItem("rmm_custom_products") || "[]");
    const orders = JSON.parse(localStorage.getItem("rmm_orders") || "[]");
    
    // Total Revenue Calculate karo
    const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0);

    setStats({ 
      products: customProducts.length + 5, // 5 static products
      orders: orders.length,
      revenue: totalRevenue
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (password === "admin123") {
        localStorage.setItem("rmm_admin", "true");
        setIsAuthenticated(true);
        loadStats();
      } else {
        setError("Invalid Password! (Enter admin123)");
      }
      setIsLoading(false);
    }, 800);
  };

  const handleLogout = () => {
    localStorage.removeItem("rmm_admin");
    setIsAuthenticated(false);
    router.push("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#FFF9D8] p-4">
        <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-2xl border border-gray-100">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#800020] text-white mb-6 shadow-lg rotate-3">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-center text-3xl font-black text-[#800020] mb-2">Admin Login</h1>
          <p className="text-center text-sm font-bold text-gray-400 mb-8">
            Password: <span className="text-green-600 bg-green-50 px-2 py-1 rounded">admin123</span>
          </p>
          
          {error && <div className="mb-4 text-center text-sm font-bold text-red-500 bg-red-50 py-2 rounded-lg">{error}</div>}
          
          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="password"
              placeholder="Enter Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 px-5 py-4 text-center text-lg font-black tracking-widest outline-none focus:border-[#800020] focus:bg-white transition disabled:opacity-50"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#800020] py-4 text-base font-black text-white shadow-lg hover:bg-[#600018] transition active:scale-95 disabled:opacity-70"
            >
              {isLoading ? <><Loader2 size={20} className="animate-spin" /> Checking...</> : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9D8] p-4 sm:p-8 pb-20">
      <div className="mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#800020]">Admin Panel</h1>
            <p className="text-xs font-bold text-gray-500 mt-1">Welcome back, Boss!</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100 transition">
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Stats Cards (Products, Orders, Revenue) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600"><Package size={20} /></div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Products</p>
            </div>
            <p className="text-3xl font-black text-gray-800">{stats.products}</p>
          </div>
          
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600"><ShoppingBag size={20} /></div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Orders</p>
            </div>
            <p className="text-3xl font-black text-[#138047]">{stats.orders}</p>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-[#800020] to-[#5A0014] p-5 shadow-lg text-white relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10"><IndianRupee size={80} /></div>
            <div className="relative z-10">
              <p className="text-xs font-bold text-white/80 uppercase tracking-wider mb-1">Total Sales</p>
              <p className="text-3xl font-black">₹{stats.revenue.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-black text-gray-800 mb-4">Quick Actions</h2>
        
        <div className="space-y-4">
          {/* Add Product Link */}
          <Link href="/admin/products" className="group flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl bg-white p-6 shadow-sm border-2 border-transparent transition hover:border-[#800020] hover:shadow-md cursor-pointer">
            <div className="flex items-center gap-5 w-full">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#FFF9D8] text-[#800020]">
                <PlusCircle size={32} />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-800 group-hover:text-[#800020]">Add New Product</h3>
                <p className="text-sm font-medium text-gray-500 mt-1">Naya saman add karein website par</p>
              </div>
            </div>
            <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 group-hover:bg-[#800020] group-hover:text-white transition">
              <ArrowRight size={20} />
            </div>
          </Link>

          {/* Manage Orders Link */}
          <Link href="/admin/orders" className="group flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl bg-white p-6 shadow-sm border-2 border-transparent transition hover:border-[#138047] hover:shadow-md cursor-pointer">
            <div className="flex items-center gap-5 w-full">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-[#138047]">
                <ShoppingBag size={32} />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-800 group-hover:text-[#138047]">Manage Orders</h3>
                <p className="text-sm font-medium text-gray-500 mt-1">Customer ke orders check karein</p>
              </div>
            </div>
            <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 group-hover:bg-[#138047] group-hover:text-white transition">
              <ArrowRight size={20} />
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}