// app/admin/customers/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, User, Phone, UserCheck, UserX, Edit3, XCircle, Save } from "lucide-react";
import { safeGet, safeSet } from "./../../lib/store";

type Customer = { 
  phone: string; 
  name: string; 
  stamps: number; 
  rewards: number; 
  totalSpent: number; 
  active?: boolean; 
};

export default function AdminCustomersPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");

  // 🔥 Edit Points Modal State
  const [editCust, setEditCust] = useState<Customer | null>(null);
  const [addStamps, setAddStamps] = useState(1);

  const load = () => {
    const data = safeGet<Customer[]>("rmm_loyalty_customers", []);
    const formatted = data.map(c => ({ ...c, active: c.active !== false }));
    setCustomers(formatted);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("rmm_admin") !== "true") {
      router.push("/admin");
      return;
    }
    load();
  }, [router]);

  // Active/Inactive Toggle
  const toggleStatus = (phone: string, currentStatus: boolean) => {
    const updated = customers.map(c => 
      c.phone === phone ? { ...c, active: !currentStatus } : c
    );
    setCustomers(updated);
    safeSet("rmm_loyalty_customers", updated);
  };

  // 🔥 Stamps & Rewards Update Logic
  const handleUpdatePoints = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCust) return;

    const updated = customers.map(c => {
      if (c.phone !== editCust.phone) return c;
      
      let newStamps = c.stamps + addStamps;
      let newRewards = c.rewards;

      // Auto Reward Logic (8 stamps = 1 reward)
      if (newStamps >= 8) {
        const earned = Math.floor(newStamps / 8);
        newRewards += earned;
        newStamps = newStamps % 8;
      } else if (newStamps < 0) {
        newStamps = 0; // Stamps negative nahi ho sakte
      }

      return { ...c, stamps: newStamps, rewards: newRewards };
    });

    setCustomers(updated);
    safeSet("rmm_loyalty_customers", updated);
    
    // Modal close karo
    setEditCust(null);
    setAddStamps(1);
  };

  const filtered = customers.filter(c => 
    (c.name || "").toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );

  return (
    <div className="min-h-screen bg-[#FFF9D8] p-4 sm:p-8 pb-20">
      <div className="mx-auto max-w-4xl">
        
        <button onClick={() => router.push("/admin")} className="mb-6 flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#800020] shadow-sm hover:bg-gray-50 transition w-fit">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#800020] mb-1">Manage Customers</h1>
            <p className="text-xs font-bold text-gray-500">Loyalty members ka status dekho aur points update karo</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Naam ya phone..." className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 py-2.5 pl-9 pr-3 text-sm font-bold outline-none focus:border-[#800020]" />
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map(c => (
            <div key={c.phone} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-black text-lg ${c.active ? 'bg-[#800020]/10 text-[#800020]' : 'bg-gray-100 text-gray-400'}`}>
                  {(c.name || "U").charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className={`text-base font-black ${c.active ? 'text-gray-800' : 'text-gray-400 line-through'}`}>{c.name || "Unknown"}</p>
                  <p className="text-xs text-gray-500 flex flex-wrap items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-1"><Phone size={12}/> {c.phone}</span>
                    <span>•</span>
                    <span className="text-amber-600 font-bold">{c.stamps} Stamps</span>
                    <span>•</span>
                    <span className="text-[#138047] font-bold">{c.rewards} Rewards</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-right mr-2">
                   <p className="text-[10px] font-bold text-gray-400 uppercase">Spent</p>
                   <p className="text-sm font-black text-gray-700">₹{c.totalSpent || 0}</p>
                </div>
                
                {/* 🔥 Edit Points Button */}
                <button onClick={() => { setEditCust(c); setAddStamps(1); }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl text-xs font-black hover:bg-blue-100 transition">
                  <Edit3 size={14} /> Points
                </button>

                <button onClick={() => toggleStatus(c.phone, c.active || false)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black border-2 transition ${
                    c.active 
                      ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100" 
                      : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {c.active ? <><UserCheck size={16}/> Active</> : <><UserX size={16}/> Inactive</>}
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
             <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
               <User size={40} className="mx-auto text-gray-300 mb-2" />
               <p className="text-sm font-bold text-gray-500">Koi customer nahi mila</p>
             </div>
          )}
        </div>

      </div>

      {/* 🔥 EDIT POINTS MODAL */}
      {editCust && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onClick={() => setEditCust(null)}>
          <div 
            className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-gray-800">Update Points</h3>
              <button onClick={() => setEditCust(null)} className="p-1 text-gray-400 hover:text-red-500"><XCircle size={20}/></button>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-xl mb-4 text-sm text-gray-600 text-center">
              <span className="font-black text-[#800020] text-lg">{editCust.name}</span> <br/>
              Current: <strong className="text-amber-600">{editCust.stamps} Stamps</strong>, <strong className="text-[#138047]">{editCust.rewards} Rewards</strong>
            </div>

            <form onSubmit={handleUpdatePoints} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 text-center">
                  Stamps Add / Remove (e.g. 1 ya -1)
                </label>
                <input 
                  required 
                  type="number" 
                  value={addStamps} 
                  onChange={e => setAddStamps(Number(e.target.value))} 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#800020] text-lg font-black text-center" 
                />
              </div>
              <button type="submit" className="w-full py-3.5 bg-[#800020] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition">
                <Save size={18} /> Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}