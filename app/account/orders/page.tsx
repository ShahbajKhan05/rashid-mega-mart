"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "../../components/LanguageProvider";
import { useCart } from "../../components/CartProvider";
import { 
  ArrowLeft, Package, CheckCircle2, ShoppingBag, Truck, Clock, 
  Calendar, Printer, Trash2, X, AlertCircle, RotateCcw, Sparkles, Star, MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function OrdersPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const isHindi = language === "hi";
  
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("rmm_user")) {
      router.push("/login");
      return;
    }
    const savedOrders = JSON.parse(localStorage.getItem("rmm_orders") || "[]");
    setOrders(savedOrders);
    setIsLoading(false);
  }, [router]);

  const handleReorder = (orderItems: any[]) => {
    orderItems.forEach((item) => {
      const product: any = {
        id: item.id || item.name.toLowerCase().replace(/\s+/g, '-'),
        name: item.name,
        nameHi: item.name,
        price: item.price,
        image: item.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80",
        category: "staples",
        quantity: item.quantity
      };
      addToCart(product, item.quantity);
    });
    router.push("/cart");
  };

  const handleCancelOrder = () => {
    if (!orderToCancel) return;
    const orderToDelete = orders.find((o: any) => o.id === orderToCancel);
    if (orderToDelete && orderToDelete.couponUsed) {
      const allCoupons = JSON.parse(localStorage.getItem("rmm_coupons") || "{}");
      allCoupons[orderToDelete.customer.phone] = orderToDelete.couponUsed;
      localStorage.setItem("rmm_coupons", JSON.stringify(allCoupons));
    }
    const updatedOrders = orders.filter((o: any) => o.id !== orderToCancel);
    setOrders(updatedOrders);
    localStorage.setItem("rmm_orders", JSON.stringify(updatedOrders));
    setOrderToCancel(null);
  };

  const handlePrintReceipt = (order: any) => {
    // Aapka purana premium receipt code (same as before)
  };

  if (isLoading) {
    return <div className="flex min-h-[70vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[#800020] border-t-transparent" /></div>;
  }

  const activeOrders = orders.filter((o: any) => o.status !== "delivered");
  const pastOrders = orders.filter((o: any) => o.status === "delivered");
  const lastOrderId = orders.length > 0 ? orders[0].id : null;

  return (
    <main className="min-h-screen bg-[#F3F4F6] pb-24 font-sans">
      <div className="sticky top-0 z-50 bg-white px-4 py-4 shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center gap-4">
          <button onClick={() => router.push("/account")} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">{isHindi ? "मेरे ऑर्डर्स" : "My Orders"}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 mt-6 space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
             {/* Empty State */}
             <Package size={60} className="mx-auto text-gray-300 mb-4" />
             <h2 className="text-lg font-bold text-gray-700">{isHindi ? "कोई ऑर्डर नहीं" : "No orders yet"}</h2>
             <button onClick={() => router.push("/products")} className="mt-4 rounded-md bg-[#800020] px-6 py-2 text-sm font-bold text-white">Shop Now</button>
          </div>
        ) : (
          <>
            {activeOrders.map((order) => {
              const isLastOrder = order.id === lastOrderId;
              return (
                <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-500 uppercase">{isHindi ? "ऑर्डर" : "Order"}</span>
                      <span className="text-sm font-black text-gray-800">{order.id}</span>
                      {isLastOrder && <span className="bg-[#D4A84F] text-white text-[9px] font-black px-2 py-0.5 rounded-full ml-2">LATEST</span>}
                    </div>
                    <span className="text-sm font-black text-gray-800">₹{order.total}</span>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="h-20 w-20 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                         <Package size={32} className="text-gray-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-gray-800 mb-1">{order.items[0]?.name} {order.items.length > 1 && `+ ${order.items.length - 1} more`}</h3>
                        <p className="text-xs text-gray-500">{isHindi ? "तारीख" : "Date"}: {order.date}</p>
                        
                        <div className="mt-2 inline-flex items-center gap-1.5 rounded-sm bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700">
                          <Clock size={12} /> {order.status === "out-for-delivery" ? "Out for Delivery" : "Order Confirmed"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50">
                    <div className="flex gap-2">
                       <button onClick={() => handlePrintReceipt(order)} className="flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50">
                         <Printer size={14} /> {isHindi ? "रसीद" : "Receipt"}
                       </button>
                       {order.status === "confirmed" && (
                         <button onClick={() => setOrderToCancel(order.id)} className="flex items-center gap-1.5 rounded border border-red-200 bg-white px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50">
                           <Trash2 size={14} /> {isHindi ? "कैंसिल" : "Cancel"}
                         </button>
                       )}
                    </div>
                    <Link href="/order-tracking" className="text-xs font-bold text-[#800020] hover:underline flex items-center gap-1">
                      {isHindi ? "ट्रैक करें" : "Track Order"} <ArrowLeft size={12} className="rotate-180" />
                    </Link>
                  </div>
                </div>
              );
            })}

            {pastOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Delivered Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-500 uppercase">{isHindi ? "ऑर्डर" : "Order"}</span>
                    <span className="text-sm font-black text-gray-800">{order.id}</span>
                  </div>
                  <span className="text-sm font-black text-gray-800">₹{order.total}</span>
                </div>

                {/* Delivered Body */}
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="h-20 w-20 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                       <Package size={32} className="text-gray-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-800 mb-1">{order.items[0]?.name} {order.items.length > 1 && `+ ${order.items.length - 1} more`}</h3>
                      <p className="text-xs text-gray-500">{isHindi ? "तारीख" : "Date"}: {order.date}</p>
                      <div className="mt-2 inline-flex items-center gap-1.5 rounded-sm bg-green-50 px-2 py-1 text-xs font-bold text-green-700">
                        <CheckCircle2 size={12} /> {isHindi ? "डिलीवर हो गया" : "Delivered"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivered Footer */}
                <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                   <div className="flex items-center justify-between mb-3">
                      <button onClick={() => handleReorder(order.items)} className="rounded bg-[#800020] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#600018]">
                        {isHindi ? "फिर से ऑर्डर करें" : "Re-order"}
                      </button>
                      <button onClick={() => handlePrintReceipt(order)} className="text-xs font-bold text-gray-600 hover:underline">
                        {isHindi ? "रसीद डाउनलोड करें" : "Download Receipt"}
                      </button>
                   </div>
                   {/* Flipkart Style Rate & Chat */}
                   <div className="flex items-center gap-4 border-t border-gray-200 pt-3">
                      <button className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#800020]">
                        <Star size={14} /> {isHindi ? "रेट करें" : "Rate your experience"}
                      </button>
                      <a href="https://wa.me/918962531603" target="_blank" className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#138047]">
                        <MessageSquare size={14} /> {isHindi ? "चैट करें" : "Chat with us"}
                      </a>
                   </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* CANCEL MODAL */}
      <AnimatePresence>
        {orderToCancel && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setOrderToCancel(null)}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl p-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-4">
                <AlertCircle size={32} className="text-red-600" />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-2">
                {isHindi ? "ऑर्डर कैंसिल करें?" : "Cancel Order?"}
              </h3>
              <p className="text-sm font-medium text-gray-500 mb-6">
                {isHindi 
                  ? "क्या आप सच में इस ऑर्डर को कैंसिल करना चाहते हैं?" 
                  : "Are you sure you want to cancel this order?"}
              </p>
              <div className="flex gap-3">
                <button onClick={() => setOrderToCancel(null)} className="flex-1 rounded-xl bg-gray-100 py-3 text-sm font-bold text-gray-600 hover:bg-gray-200 transition">
                  {isHindi ? "नहीं" : "No"}
                </button>
                <button onClick={handleCancelOrder} className="flex-1 rounded-xl bg-red-600 py-3 text-sm font-bold text-white shadow-md hover:bg-red-700 transition">
                  {isHindi ? "हाँ, कैंसिल करें" : "Yes, Cancel"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}