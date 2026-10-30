import { useState } from "react";
import { Search, UserPlus } from "lucide-react";

export default function CustomersTab({ customers, setCustomers, coupons, setCoupons, showToast }: any) {
  const [custSearch, setCustSearch] = useState("");
  
  const filtered = customers.filter((c: any) => 
    (c.name || "").toLowerCase().includes(custSearch.toLowerCase()) || c.phone.includes(custSearch)
  );

  return (
    <div className="max-w-4xl mx-auto space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-black text-gray-800">Customers</h2>
        <span className="text-xs font-bold text-gray-500">{customers.length} total</span>
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input 
          type="text" 
          placeholder="Naam ya phone se dhoondo..." 
          value={custSearch} 
          onChange={e => setCustSearch(e.target.value)} 
          className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm font-bold outline-none focus:border-[#800020]" 
        />
      </div>

      <div className="space-y-2">
        {filtered.map((c: any) => (
          <div key={c.phone} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#800020]/10 text-[#800020] font-black text-sm">
                {(c.name || "?").charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-black text-gray-800">{c.name || "Unknown"}</p>
                <p className="text-[10px] text-gray-500">{c.phone}</p>
              </div>
            </div>
            
            <div className="flex gap-4 text-center">
              <div>
                <p className="text-sm font-black text-amber-600">{c.stamps}</p>
                <p className="text-[8px] font-bold text-gray-400 uppercase">Stamps</p>
              </div>
              <div>
                <p className="text-sm font-black text-green-600">{c.rewards}</p>
                <p className="text-[8px] font-bold text-gray-400 uppercase">Rewards</p>
              </div>
              <div>
                <p className="text-sm font-black text-[#800020]">₹{c.totalSpent || 0}</p>
                <p className="text-[8px] font-bold text-gray-400 uppercase">Spent</p>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-8 text-sm">Koi customer nahi mila</p>
        )}
      </div>
    </div>
  );
}