import { List, Printer } from "lucide-react";

export default function OrdersTab({ orders }: any) {
  return (
    <div className="max-w-4xl mx-auto space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black text-gray-800">All Orders</h2>
        <span className="text-xs font-bold text-gray-500">{orders.length} total</span>
      </div>
      
      {orders.slice(0, 50).map((o: any) => {
        const isOnline = o.source === "Website" || o.id.startsWith("WEB-");
        const orderItems = o.items || [];
        
        return (
          <div key={o.id} className={`bg-white rounded-2xl p-4 shadow-sm border-l-4 border ${isOnline ? 'border-l-blue-500 border-gray-100' : 'border-l-[#800020] border-gray-100'}`}>
            <div className="flex justify-between items-start">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="text-sm font-black text-gray-800 font-mono">{o.id}</p>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${isOnline ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
                    {isOnline ? "🌐 Online" : "🚶 Walk-in"}
                  </span>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${o.status === "Completed" || o.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                    {o.status}
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 font-medium">
                  {o.date} · {o.method || "Online"} · 📞 {o.customerPhone === "Guest" ? "Walk-in Customer" : o.customerPhone}
                </p>
                {isOnline && o.customer?.address && (
                  <p className="text-[10px] text-blue-600 bg-blue-50 px-2 py-1 rounded mt-1.5 font-bold inline-block">
                    📍 {o.customer.address}
                  </p>
                )}
              </div>
              <div className="text-right shrink-0 ml-2">
                <p className="text-lg font-black text-[#800020]">₹{o.total}</p>
                <p className="text-[9px] text-gray-400 font-bold">{o.staffName || "Web Order"}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {orderItems.map((it: any, idx: number) => (
                <span key={idx} className="text-[10px] bg-gray-50 text-gray-600 rounded-md px-2 py-1 font-bold border border-gray-100">
                  {it.name || it.product?.name} ×{it.quantity || it.qty}
                </span>
              ))}
            </div>
          </div>
        );
      })}
      
      {orders.length === 0 && (
        <div className="bg-white rounded-2xl p-8 text-center text-gray-400 shadow-sm border border-gray-100">
          <List size={32} className="mx-auto mb-2" />
          <p className="text-sm font-bold">Abhi tak koi order nahi</p>
          <p className="text-xs">POS tab se pehla bill banao!</p>
        </div>
      )}
    </div>
  );
}