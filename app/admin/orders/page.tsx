"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../components/LanguageProvider"; // Path check kar lein
import { ArrowLeft, Package, CheckCircle2, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const isHindi = language === "hi";
  
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("rmm_user")) {
      router.push("/login");
      return;
    }
    const savedOrders = JSON.parse(localStorage.getItem("rmm_orders") || "[]");
    setOrders(savedOrders);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <div className="flex min-h-[70vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[#800020] border-t-transparent" /></div>;
  }

  return (
    <main className="min-h-screen bg-[#FFF9D8] pb-24">
      <div className="sticky top-0 z-50 bg-[#FFF9D8]/90 px-4 py-4 backdrop-blur-md border-b border-[#800020]/10">
        <div className="mx-auto flex max-w-3xl items-center gap-4">
          <button onClick={() => router.push("/account")} className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#800020] shadow-sm hover:bg-[#800020] hover:text-white transition">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-black text-[#800020]">{isHindi ? "मेरे ऑर्डर्स" : "My Orders"}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 mt-6 space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#FFF9D8] shadow-sm mb-4">
              <Package size={40} className="text-[#800020]" />
            </div>
            <h2 className="text-lg font-black text-gray-800">{isHindi ? "कोई ऑर्डर नहीं मिला" : "No orders found"}</h2>
            <p className="text-sm text-gray-500 mt-1 mb-6">{isHindi ? "आपने अभी तक कोई ऑर्डर नहीं किया है।" : "You haven't placed any orders yet."}</p>
            <Link href="/products" className="inline-flex items-center gap-2 rounded-xl bg-[#800020] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#600018] transition">
              <ShoppingBag size={18} /> {isHindi ? "खरीदारी करें" : "Start Shopping"}
            </Link>
          </div>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{isHindi ? "ऑर्डर आईडी" : "Order ID"}</p>
                  <p className="text-sm font-black text-gray-800 mt-0.5">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{isHindi ? "कुल राशि" : "Total Amount"}</p>
                  <p className="text-sm font-black text-[#800020] mt-0.5">₹{order.total}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                {order.items.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-600 line-clamp-1 flex-1">{item.name} <span className="font-bold text-gray-400">× {item.quantity}</span></span>
                    <span className="font-bold text-gray-800">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1.5 rounded-lg text-xs font-black">
                  <CheckCircle2 size={14} /> {isHindi ? "सफल" : "Placed"}
                </div>
                <p className="text-xs font-bold text-gray-400">{order.date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}