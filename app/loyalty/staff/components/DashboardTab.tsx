import { Zap, IndianRupee, Receipt, TrendingUp, Wallet, Clock, ChevronRight, Sparkles, Users, Banknote } from "lucide-react";

export default function DashboardTab({ 
  myTodaySales, 
  myTodayOrders, 
  todayOrders, 
  todaySales, // ✅ Added
  avgOrder, // ✅ Added
  setActiveTab, 
  loggedStaff,
  shift, // ✅ Added
  setShowShiftModal // ✅ Added
}: any) {
  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div className="bg-gradient-to-r from-[#800020] to-[#5A0014] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-6 -top-6 opacity-10"><Sparkles size={120} /></div>
        <div className="relative z-10">
          <p className="text-xs font-bold text-white/70 uppercase tracking-wider">Namaste 🙏</p>
          <h2 className="text-2xl font-black mt-1">{loggedStaff.name.split(" ")[0]}, ready ho?</h2>
          <p className="text-xs text-white/80 mt-1">
            Aaj tak <span className="font-black text-white">₹{myTodaySales.toLocaleString("en-IN")}</span> ki sale ki hai ({myTodayOrders.length} bills)
          </p>
          <button onClick={() => setActiveTab("pos")}
            className="mt-3 inline-flex items-center gap-2 bg-white text-[#800020] px-4 py-2 rounded-xl text-sm font-black hover:bg-[#FFF9D8] transition active:scale-95">
            <Zap size={16} /> Sale Shuru Karo <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Meri Sale", val: `₹${myTodaySales}`, icon: IndianRupee, c: "text-green-600", bg: "bg-green-50" },
          { label: "Mere Bills", val: myTodayOrders.length, icon: Receipt, c: "text-blue-600", bg: "bg-blue-50" },
          { label: "Dukaan Total", val: `₹${todaySales}`, icon: TrendingUp, c: "text-[#800020]", bg: "bg-red-50" },
          { label: "Avg Bill", val: `₹${avgOrder}`, icon: Wallet, c: "text-amber-600", bg: "bg-amber-50" },
        ].map((s, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider truncate">{s.label}</span>
              <div className={`p-1.5 rounded-lg shrink-0 ${s.bg} ${s.c}`}><s.icon size={14} /></div>
            </div>
            <p className="text-xl font-black text-gray-800 truncate">{s.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <button onClick={() => setActiveTab("pos")} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:border-[#800020] hover:shadow-md transition text-left active:scale-95">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#800020] text-white mb-2"><Zap size={20} /></div>
          <p className="font-black text-sm text-gray-800">New Sale</p>
          <p className="text-[10px] text-gray-500">Billing shuru karo</p>
        </button>
        <button onClick={() => setActiveTab("customers")} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:border-amber-500 hover:shadow-md transition text-left active:scale-95">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white mb-2"><Users size={20} /></div>
          <p className="font-black text-sm text-gray-800">Customers</p>
          <p className="text-[10px] text-gray-500">Loyalty points dekho</p>
        </button>
        <button onClick={() => setShowShiftModal(true)} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-500 hover:shadow-md transition text-left active:scale-95">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white mb-2"><Banknote size={20} /></div>
          <p className="font-black text-sm text-gray-800">Shift</p>
          {/* 🔥 Yahan error aa raha tha, ab fix ho gaya kyunki shift props me aa gaya hai */}
          <p className="text-[10px] text-gray-500">{shift?.isOpen ? "Cash manage" : "Open karo"}</p>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-sm font-black text-gray-800 mb-3 flex items-center gap-2"><Clock size={16} /> Aaj ke bills</h3>
        <div className="space-y-2">
          {todayOrders.slice(0, 5).map((o: any) => (
            <div key={o.id} className="flex justify-between items-center text-xs pb-2 border-b border-gray-50 last:border-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="font-bold text-gray-800 truncate">{o.customerPhone === "Guest" ? "Walk-in Customer" : o.customerPhone}</p>
                <p className="text-[10px] text-gray-400 font-mono">{o.id} · {o.staffName || "Staff"}</p>
              </div>
              <p className="font-black text-[#800020] shrink-0">₹{o.total}</p>
            </div>
          ))}
          {todayOrders.length === 0 && <p className="text-xs text-gray-400 text-center py-4">Abhi tak koi bill nahi. POS kholo!</p>}
        </div>
      </div>
    </div>
  );
}