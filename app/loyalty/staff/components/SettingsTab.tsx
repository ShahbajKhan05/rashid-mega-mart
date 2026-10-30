// app/loyalty/staff/components/SettingsTab.tsx
import { UserCircle2, Gift, RefreshCw, LogOut, Banknote, Percent } from "lucide-react";

export default function SettingsTab({ loggedStaff, settings, shift, setShowShiftModal, handleLogout }: any) {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h2 className="text-lg font-black text-gray-800">Settings</h2>

      {/* Profile Card */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-black text-gray-800 mb-3 flex items-center gap-2">
          <UserCircle2 size={16} /> Profile
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#800020] text-white font-black text-xl">
            {loggedStaff?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-black text-gray-800">{loggedStaff?.name}</p>
            <p className="text-xs text-gray-500">Staff ID: {loggedStaff?.id}</p>
            <p className="text-xs text-green-600 font-bold">● Active</p>
          </div>
        </div>
      </div>

      {/* Loyalty Rules Card */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-black text-gray-800 mb-3 flex items-center gap-2">
          <Gift size={16} /> Loyalty Rules
        </h3>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-lg font-black text-[#800020]">{settings?.stampsRequired}</p>
            <p className="text-[9px] font-bold text-gray-500 uppercase">Stamps/Reward</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-lg font-black text-[#800020]">₹{settings?.rewardDiscount}</p>
            <p className="text-[9px] font-bold text-gray-500 uppercase">Reward Value</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-lg font-black text-[#800020]">₹{settings?.minBill}</p>
            <p className="text-[9px] font-bold text-gray-500 uppercase">Min Bill</p>
          </div>
        </div>
        <p className="text-[10px] text-gray-400 mt-3 flex items-center gap-1">
          <Percent size={10} /> Har ₹200 pe 1 stamp milta hai.
        </p>
      </div>

      {/* Shift Card */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-black text-gray-800 mb-2 flex items-center gap-2">
          <RefreshCw size={16} /> Shift Status
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          {shift?.isOpen ? `Open · ₹${shift.expectedCash} expected` : "Closed"}
        </p>
        <button 
          onClick={() => setShowShiftModal(true)}
          className="w-full rounded-xl bg-blue-50 text-blue-700 py-3 text-sm font-black hover:bg-blue-100 active:scale-95 transition flex items-center justify-center gap-2"
        >
          <Banknote size={16} /> Shift Manage karo
        </button>
      </div>

      {/* Logout Button */}
      <button 
        onClick={handleLogout}
        className="w-full rounded-xl bg-red-50 text-red-600 py-3.5 text-sm font-black hover:bg-red-100 active:scale-95 transition flex items-center justify-center gap-2"
      >
        <LogOut size={16} /> Logout karo
      </button>
    </div>
  );
}