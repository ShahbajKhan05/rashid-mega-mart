// app/admin/staff/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, UserPlus, Trash2, UserCog, TrendingUp,
  Award, Users, KeyRound, ToggleLeft, ToggleRight
} from "lucide-react";
import {
  getStaffList, saveStaffList, getStaffSalesSummary, StaffMember
} from "./../../lib/store";

export default function AdminStaffPage() {
  const router = useRouter();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [perf, setPerf] = useState<{ staffId: string; staffName: string; total: number; count: number }[]>([]);
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const load = () => {
    setStaff(getStaffList());
    setPerf(getStaffSalesSummary());
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("rmm_admin") !== "true") {
      router.push("/admin");
      return;
    }
    load();
  }, [router]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Naam likho");
    if (pin.length < 4) return setError("PIN kam se kam 4 digit ka ho");
    if (staff.some(s => s.pin === pin)) return setError("Yeh PIN pehle se use ho raha hai");

    const newStaff: StaffMember = {
      id: `STF-${Date.now()}`,
      name: name.trim(),
      pin,
      active: true,
      createdAt: new Date().toLocaleDateString("en-GB"),
    };
    const list = [newStaff, ...staff];
    saveStaffList(list);
    setStaff(list);
    setName(""); setPin("");
  };

  const toggleActive = (id: string) => {
    const list = staff.map(s => s.id === id ? { ...s, active: !s.active } : s);
    saveStaffList(list);
    setStaff(list);
  };

  const removeStaff = (id: string) => {
    if (!confirm("Staff ko hata dein? Sale records rehenge.")) return;
    const list = staff.filter(s => s.id !== id);
    saveStaffList(list);
    setStaff(list);
  };

  const totalSales = perf.reduce((s, p) => s + p.total, 0);
  const topPerformer = perf[0];

  return (
    <div className="min-h-screen bg-[#FFF9D8] p-4 sm:p-8 pb-20">
      <div className="mx-auto max-w-4xl">

        <button onClick={() => router.push("/admin")} className="mb-6 flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#800020] shadow-sm hover:bg-gray-50 transition w-fit">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        {/* Header */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <h1 className="text-2xl font-black text-[#800020] mb-1 flex items-center gap-2"><UserCog size={24} /> Staff & Sales</h1>
          <p className="text-xs font-bold text-gray-500">Kaun kaam kar raha hai, kaun kitna bech raha hai</p>
        </div>

        {/* Top performer highlight */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <Users size={16} className="text-blue-600" />
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total Staff</p>
            </div>
            <p className="text-2xl font-black text-gray-800">{staff.length}</p>
            <p className="text-[10px] text-gray-400">{staff.filter(s => s.active).length} active</p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={16} className="text-green-600" />
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Staff Sales</p>
            </div>
            <p className="text-2xl font-black text-green-600">₹{totalSales.toLocaleString("en-IN")}</p>
            <p className="text-[10px] text-gray-400">{perf.reduce((s, p) => s + p.count, 0)} sales</p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-[#D4A84F] to-[#B8860B] p-5 text-white shadow-lg">
            <div className="flex items-center gap-2 mb-1">
              <Award size={16} />
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-90">Top Performer</p>
            </div>
            <p className="text-lg font-black truncate">{topPerformer?.staffName || "—"}</p>
            <p className="text-xs font-bold opacity-90">₹{(topPerformer?.total || 0).toLocaleString("en-IN")}</p>
          </div>
        </div>

        {/* Add staff form */}
        <form onSubmit={handleAdd} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <h3 className="text-sm font-black text-gray-800 mb-3 flex items-center gap-2"><UserPlus size={16} /> Naya Staff Add Karo</h3>
          {error && <p className="text-xs font-bold text-red-500 bg-red-50 py-1.5 px-3 rounded-lg mb-3">{error}</p>}
          <div className="flex flex-col sm:flex-row gap-3">
            <input value={name} onChange={e => setName(e.target.value)}
              placeholder="Staff ka naam"
              className="flex-1 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-2.5 text-sm font-bold outline-none focus:border-[#800020]" />
            <input value={pin} onChange={e => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="PIN (4-6 digit)" inputMode="numeric"
              className="w-full sm:w-40 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-2.5 text-sm font-bold outline-none focus:border-[#800020]" />
            <button type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#800020] px-5 py-2.5 text-sm font-black text-white hover:bg-[#600018] transition">
              <UserPlus size={16} /> Add
            </button>
          </div>
        </form>

        {/* Staff list */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-black text-gray-800 mb-4">Staff List</h3>
          {staff.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-8">Koi staff nahi. Upar se add karo 👆</p>
          )}
          <div className="space-y-2">
            {staff.map(s => {
              const p = perf.find(x => x.staffId === s.id);
              return (
                <div key={s.id} className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2.5">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black ${s.active ? "bg-[#800020] text-white" : "bg-gray-300 text-gray-600"}`}>
                    {s.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-gray-800 truncate flex items-center gap-1.5">
                      {s.name}
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-black ${s.active ? "bg-green-50 text-green-600" : "bg-gray-200 text-gray-500"}`}>
                        {s.active ? "Active" : "Off"}
                      </span>
                    </p>
                    <p className="text-[10px] text-gray-400 flex items-center gap-2">
                      <span className="flex items-center gap-0.5"><KeyRound size={9} /> {s.pin}</span>
                      <span>· {s.createdAt}</span>
                      {p && <span className="text-[#800020] font-bold">· ₹{p.total.toLocaleString("en-IN")} ({p.count})</span>}
                    </p>
                  </div>
                  <button onClick={() => toggleActive(s.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200 transition" title="Toggle active">
                    {s.active ? <ToggleRight size={20} className="text-green-600" /> : <ToggleLeft size={20} />}
                  </button>
                  <button onClick={() => removeStaff(s.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition">
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance table */}
        {perf.length > 0 && (
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mt-6">
            <h3 className="text-sm font-black text-gray-800 mb-4 flex items-center gap-2"><TrendingUp size={16} /> Sales Leaderboard</h3>
            <div className="space-y-3">
              {perf.map((p, i) => {
                const pct = totalSales > 0 ? (p.total / totalSales) * 100 : 0;
                return (
                  <div key={p.staffId} className="flex items-center gap-3">
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${i === 0 ? "bg-[#D4A84F] text-white" : "bg-[#800020] text-white"}`}>
                      #{i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-black text-gray-800 truncate">{p.staffName}</p>
                        <p className="text-xs font-black text-[#800020]">₹{p.total.toLocaleString("en-IN")}</p>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#800020] rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="text-[10px] text-gray-400 mt-0.5">{p.count} sales · {pct.toFixed(1)}% share</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}