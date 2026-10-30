// app/admin/coupons/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, Ticket, CheckCircle2, XCircle, Trash2, ShieldCheck, Clock } from "lucide-react";
import { safeGet, safeSet } from "./../../lib/store";

type Coupon = { 
  code: string; 
  phone: string; 
  status: "active" | "redeemed"; 
  discount: number; 
  minBill: number; 
  createdAt: string 
};

export default function AdminCouponsPage() {
  const router = useRouter();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [search, setSearch] = useState("");

  const load = () => {
    const rawCoupons = safeGet<any>("rmm_coupons", {});
    let arr: Coupon[] = [];
    if (Array.isArray(rawCoupons)) {
      arr = rawCoupons;
    } else {
      arr = Object.keys(rawCoupons).map(phone => ({
        code: rawCoupons[phone], phone, status: "active" as const,
        discount: 75, minBill: 699, createdAt: new Date().toISOString(),
      }));
    }
    setCoupons(arr);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("rmm_admin") !== "true") {
      router.push("/admin");
      return;
    }
    load();
  }, [router]);

  const updateStatus = (code: string, newStatus: "active" | "redeemed") => {
    const updated = coupons.map(c => c.code === code ? { ...c, status: newStatus } : c);
    setCoupons(updated);
    safeSet("rmm_coupons", updated);
  };

  const deleteCoupon = (code: string) => {
    if (!confirm("Coupon delete karna hai?")) return;
    const updated = coupons.filter(c => c.code !== code);
    setCoupons(updated);
    safeSet("rmm_coupons", updated);
  };

  const filtered = coupons.filter(c => 
    c.code.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );

  return (
    <div className="min-h-screen bg-[#FFF9D8] p-4 sm:p-8 pb-20">
      <div className="mx-auto max-w-4xl">
        
        <button onClick={() => router.push("/admin")} className="mb-6 flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#800020] shadow-sm hover:bg-gray-50 transition w-fit">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#800020] mb-1">Manage Coupons</h1>
            <p className="text-xs font-bold text-gray-500">Active aur Used coupons ka status dekho</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Code ya phone..." className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 py-2.5 pl-9 pr-3 text-sm font-bold outline-none focus:border-[#800020]" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map(cp => (
            <div key={cp.code} className={`bg-white rounded-2xl shadow-sm border p-4 relative overflow-hidden ${cp.status === 'active' ? 'border-[#138047]/30' : 'border-gray-200 opacity-75'}`}>
              
              {/* Ribbon design */}
              <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-black rounded-bl-xl ${cp.status === 'active' ? 'bg-[#138047] text-white' : 'bg-gray-500 text-white'}`}>
                {cp.status === 'active' ? '● LIVE' : 'USED'}
              </div>

              <div className="flex items-center gap-2 mb-2">
                <div className={`p-2 rounded-lg ${cp.status === 'active' ? 'bg-[#138047]/10 text-[#138047]' : 'bg-gray-100 text-gray-500'}`}>
                  <Ticket size={20} />
                </div>
                <div>
                  <p className="font-mono text-lg font-black text-gray-800">{cp.code}</p>
                  <p className="text-[10px] text-gray-500 font-bold flex items-center gap-1"><Clock size={10}/> {new Date(cp.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 mb-3 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">Customer:</span>
                  <span className="font-black text-gray-800">{cp.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">Discount:</span>
                  <span className="font-black text-[#800020]">₹{cp.discount} OFF</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold">Min Bill:</span>
                  <span className="font-black text-gray-800">₹{cp.minBill}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cp.status === 'active' ? (
                  <button onClick={() => updateStatus(cp.code, "redeemed")}
                    className="flex-1 py-2 rounded-lg bg-amber-50 text-amber-700 text-xs font-black hover:bg-amber-100 flex items-center justify-center gap-1">
                    <XCircle size={14}/> Mark Used
                  </button>
                ) : (
                  <button onClick={() => updateStatus(cp.code, "active")}
                    className="flex-1 py-2 rounded-lg bg-green-50 text-green-700 text-xs font-black hover:bg-green-100 flex items-center justify-center gap-1">
                    <CheckCircle2 size={14}/> Make Active
                  </button>
                )}
                <button onClick={() => deleteCoupon(cp.code)}
                  className="px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition">
                  <Trash2 size={16}/>
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-gray-100">
              <Ticket size={40} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-bold text-gray-500">Koi coupon nahi mila</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}