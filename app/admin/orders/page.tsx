// app/admin/orders/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Search, CheckCircle2, Clock, XCircle,
  Truck, Package, ShoppingBag, Store, Trash2
} from "lucide-react";
import { safeGet, safeSet } from "./../../lib/store";

type OrderItem = { name: string; quantity: number; price: number };
type Order = {
  id: string; date: string; customerPhone?: string; items: OrderItem[];
  total: number; status: string; method?: string; source: "POS" | "Website";
  address?: string; staffName?: string;
};

const STATUS_OPTIONS = ["Pending", "Processing", "Shipped", "Delivered", "Completed", "Cancelled"];

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");

  const loadOrders = () => {
    const pos = safeGet<any[]>("rmm_orders", []).map(o => ({ ...o, source: "POS" as const }));
    const web = safeGet<any[]>("rmm_website_orders", []).map(o => ({ ...o, source: "Website" as const }));
    const combined = [...pos, ...web].sort((a, b) => (a.date < b.date ? 1 : -1));
    setOrders(combined);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("rmm_admin") !== "true") {
      router.push("/admin");
      return;
    }
    loadOrders();
  }, [router]);

  const updateStatus = (orderId: string, newStatus: string) => {
    const pos = safeGet<any[]>("rmm_orders", []);
    const posIdx = pos.findIndex(o => o.id === orderId);
    if (posIdx >= 0) {
      pos[posIdx].status = newStatus;
      safeSet("rmm_orders", pos);
    }
    const web = safeGet<any[]>("rmm_website_orders", []);
    const webIdx = web.findIndex(o => o.id === orderId);
    if (webIdx >= 0) {
      web[webIdx].status = newStatus;
      safeSet("rmm_website_orders", web);
    }
    loadOrders();
  };

  const deleteOrder = (orderId: string) => {
    if (!confirm("Pakka delete karna hai? Yeh wapas nahi aayega.")) return;
    safeSet("rmm_orders", safeGet<any[]>("rmm_orders", []).filter(o => o.id !== orderId));
    safeSet("rmm_website_orders", safeGet<any[]>("rmm_website_orders", []).filter(o => o.id !== orderId));
    loadOrders();
  };

  const filtered = orders.filter(o => {
    if (statusFilter !== "All" && o.status !== statusFilter) return false;
    if (sourceFilter !== "All" && o.source !== sourceFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return o.id.toLowerCase().includes(q) || (o.customerPhone || "").includes(q);
    }
    return true;
  });

  const statusBadge = (status: string) => {
    const map: Record<string, { color: string; icon: any }> = {
      Pending: { color: "bg-amber-50 text-amber-700", icon: Clock },
      Processing: { color: "bg-blue-50 text-blue-700", icon: Package },
      Shipped: { color: "bg-purple-50 text-purple-700", icon: Truck },
      Delivered: { color: "bg-green-50 text-green-700", icon: CheckCircle2 },
      Completed: { color: "bg-green-50 text-green-700", icon: CheckCircle2 },
      Cancelled: { color: "bg-red-50 text-red-700", icon: XCircle },
    };
    const s = map[status] || map.Pending;
    const Icon = s.icon;
    return (
      <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-md ${s.color}`}>
        <Icon size={12} /> {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFF9D8] p-4 sm:p-8 pb-20">
      <div className="mx-auto max-w-5xl">

        <button onClick={() => router.push("/admin")} className="mb-6 flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#800020] shadow-sm hover:bg-gray-50 transition w-fit">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <h1 className="text-2xl font-black text-[#800020] mb-1">All Orders</h1>
          <p className="text-xs font-bold text-gray-500">POS + Website dono orders — status change, filter, search</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Order ID / Phone..." className="w-full rounded-xl bg-white border-2 border-gray-100 py-3 pl-9 pr-3 text-sm font-bold outline-none focus:border-[#800020]" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="rounded-xl bg-white border-2 border-gray-100 py-3 px-3 text-sm font-bold outline-none focus:border-[#800020]">
            <option value="All">All Status</option>
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={sourceFilter} onChange={e => setSourceFilter(e.target.value)}
            className="rounded-xl bg-white border-2 border-gray-100 py-3 px-3 text-sm font-bold outline-none focus:border-[#800020]">
            <option value="All">All Sources</option>
            <option value="POS">POS</option>
            <option value="Website">Website</option>
          </select>
        </div>

        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
              <ShoppingBag size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-sm font-bold text-gray-400">Koi order nahi mila</p>
              <p className="text-xs text-gray-400 mt-1">Filter change karo ya POS/Website se order karo</p>
            </div>
          )}

          {filtered.map((o) => (
            <div key={`${o.source}-${o.id}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-sm font-black text-gray-800">{o.id}</span>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded ${o.source === "POS" ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"}`}>
                      {o.source === "POS" ? <Store size={10} /> : <Package size={10} />} {o.source}
                    </span>
                    {statusBadge(o.status)}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">
                    {o.date}
                    {o.customerPhone && <> · 📞 {o.customerPhone}</>}
                    {o.staffName && <> · 👤 {o.staffName}</>}
                    {o.method && <> · 💳 {o.method}</>}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-lg font-black text-[#800020]">₹{o.total?.toLocaleString("en-IN")}</span>
                  <button onClick={() => deleteOrder(o.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {(o.items || []).map((it, i) => (
                  <span key={i} className="text-[10px] font-bold bg-gray-50 text-gray-600 px-2 py-1 rounded-md">
                    {it.name} × {it.quantity}
                  </span>
                ))}
              </div>

              {o.address && (
                <p className="text-[11px] text-gray-500 bg-gray-50 rounded-lg px-3 py-2 mb-3">📍 {o.address}</p>
              )}

              <div className="flex flex-wrap gap-1.5">
                {STATUS_OPTIONS.filter(s => s !== o.status).map(s => (
                  <button key={s} onClick={() => updateStatus(o.id, s)}
                    className="text-[10px] font-black px-2.5 py-1.5 rounded-lg bg-gray-50 text-gray-600 hover:bg-[#800020] hover:text-white transition">
                    → {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filtered.length > 0 && (
          <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-bold text-gray-500">{filtered.length} orders dikh rahe hain</p>
            <p className="text-sm font-black text-[#800020]">
              Total: ₹{filtered.reduce((s, o) => s + (o.total || 0), 0).toLocaleString("en-IN")}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}