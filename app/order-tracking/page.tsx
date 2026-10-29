"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../components/LanguageProvider";
import { ArrowLeft, Search, Package, CheckCircle2, Truck, Clock, Calendar } from "lucide-react";

export default function OrderTrackingPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const isHindi = language === "hi";
  
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");
  const [activeOrders, setActiveOrders] = useState<any[]>([]);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("rmm_orders") || "[]");
    const active = allOrders.filter((o: any) => o.status !== "delivered");
    setActiveOrders(active);
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setOrder(null);

    const allOrders = JSON.parse(localStorage.getItem("rmm_orders") || "[]");
    const found = allOrders.find((o: any) => o.id.toLowerCase() === orderId.trim().toLowerCase());

    if (found) {
      setOrder(found);
    } else {
      setError(isHindi ? "ऑर्डर आईडी नहीं मिली।" : "Order ID not found.");
    }
  };

  const status = order?.status || "confirmed";

  return (
    <main className="min-h-screen bg-[#F3F4F6] px-4 py-8 sm:px-6 font-sans">
      <div className="mx-auto max-w-2xl">
        
        <button onClick={() => router.back()} className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#800020]">
          <ArrowLeft size={16} /> {isHindi ? "वापस" : "Back"}
        </button>

        <div className="text-center mb-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#800020] shadow-sm mb-4">
            <Package size={32} />
          </div>
          <h1 className="text-2xl font-black text-gray-800">{isHindi ? "ऑर्डर ट्रैक करें" : "Track Your Order"}</h1>
        </div>

        {/* ACTIVE ORDERS SECTION */}
        {!order && activeOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-600 mb-3">{isHindi ? "आपके चालू ऑर्डर्स" : "Your Active Orders"}</h2>
            <div className="space-y-3">
              {activeOrders.map((ao) => (
                <div key={ao.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-500">{ao.id}</p>
                    <p className="text-sm font-bold text-gray-800 mt-1">{ao.items[0]?.name}</p>
                  </div>
                  <button 
                    onClick={() => setOrder(ao)}
                    className="rounded bg-[#800020] px-4 py-2 text-xs font-bold text-white hover:bg-[#600018]"
                  >
                    {isHindi ? "ट्रैक करें" : "Track"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEARCH BOX */}
        {!order && (
          <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200 mb-8">
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder={isHindi ? "ऑर्डर आईडी डालें..." : "Enter Order ID..."} 
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                  className="w-full h-12 rounded-lg border border-gray-300 bg-gray-50 pl-11 pr-4 text-sm font-bold text-gray-800 outline-none focus:border-[#800020] focus:bg-white"
                  required
                />
              </div>
              <button type="submit" className="h-12 rounded-lg bg-[#800020] px-6 text-sm font-bold text-white hover:bg-[#600018]">
                {isHindi ? "खोजें" : "Search"}
              </button>
            </form>
            {error && <p className="mt-2 text-xs font-bold text-red-500 text-center">{error}</p>}
          </div>
        )}

        {/* TRACKING RESULT */}
        {order && (
          <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex justify-between items-start border-b border-gray-200 pb-4 mb-6">
              <div>
                <p className="text-xs font-bold text-gray-500">{isHindi ? "ऑर्डर आईडी" : "Order ID"}</p>
                <p className="text-sm font-bold text-gray-800 mt-1">{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-gray-500">{isHindi ? "तारीख" : "Date"}</p>
                <p className="text-sm font-bold text-gray-800 mt-1">{order.date}</p>
              </div>
            </div>

            {/* Flipkart Style Timeline */}
            <div className="relative border-l-2 border-gray-100 ml-3 space-y-8 pb-4">
              {/* Step 1 */}
              <div className="relative pl-6">
                <div className={`absolute -left-[17px] top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 ${status !== 'cancelled' ? 'border-green-500 text-green-500' : 'border-gray-300 text-gray-300'}`}>
                  <CheckCircle2 size={16} />
                </div>
                <p className={`text-sm font-bold ${status !== 'cancelled' ? 'text-gray-800' : 'text-gray-500'}`}>Order Confirmed</p>
                <p className="text-xs text-gray-500 mt-0.5">{isHindi ? "आपका ऑर्डर मिल गया है।" : "Your order has been received."}</p>
              </div>

              {/* Step 2 */}
              <div className="relative pl-6">
                <div className={`absolute -left-[17px] top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 ${status === 'out-for-delivery' || status === 'delivered' ? 'border-[#D4A84F] text-[#D4A84F]' : 'border-gray-200 text-gray-300'}`}>
                  <Truck size={16} />
                </div>
                <p className={`text-sm font-bold ${status === 'out-for-delivery' || status === 'delivered' ? 'text-[#D4A84F]' : 'text-gray-400'}`}>Out for Delivery</p>
                <p className="text-xs text-gray-500 mt-0.5">{isHindi ? "डिलीवरी पार्टनर रास्ते में है।" : "Delivery partner is on the way."}</p>
              </div>

              {/* Step 3 */}
              <div className="relative pl-6">
                <div className={`absolute -left-[17px] top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 ${status === 'delivered' ? 'border-green-500 text-green-500' : 'border-gray-200 text-gray-300'}`}>
                  <Package size={16} />
                </div>
                <p className={`text-sm font-bold ${status === 'delivered' ? 'text-green-600' : 'text-gray-400'}`}>Delivered</p>
                <p className="text-xs text-gray-500 mt-0.5">{isHindi ? "ऑर्डर सफलतापूर्वक पहुंच गया!" : "Order delivered successfully!"}</p>
              </div>
            </div>

            {/* Order Items Summary */}
            <div className="border-t border-gray-200 pt-4 mt-4 bg-gray-50 rounded-lg p-4">
              <h3 className="text-xs font-bold text-gray-600 mb-2">{isHindi ? "ऑर्डर में शामिल सामान" : "Items in this order"}</h3>
              {order.items.map((item: any, i: number) => (
                <div key={i} className="flex justify-between text-sm py-1">
                  <span className="text-gray-700 line-clamp-1">{item.name} <span className="text-gray-400">x{item.quantity}</span></span>
                  <span className="font-bold text-gray-800">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}