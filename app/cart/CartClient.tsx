"use client";

import { useCart } from "../components/CartProvider";
import { useLanguage } from "../components/LanguageProvider";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartClient() {
  const { cartItems, changeQuantity, removeFromCart, cartTotal } = useCart();
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const router = useRouter();

  const deliveryFee = cartTotal > 499 ? 0 : 40;
  const finalTotal = cartTotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-[#800020]/5">
          <span className="text-6xl">🛒</span>
        </div>
        <h1 className="text-2xl font-black text-[#800020]">
          {isHindi ? "आपका कार्ट खाली है" : "Your Cart is Empty"}
        </h1>
        <p className="mt-2 text-sm text-gray-500 max-w-sm">
          {isHindi 
            ? "लगता है आपने अभी तक कुछ नहीं खरीदा। चलिए कुछ शानदार सामान देखें!" 
            : "Looks like you haven't added anything yet. Let's find some great items!"}
        </p>
        <button
          onClick={() => router.push("/products")}
          className="mt-8 rounded-xl bg-[#800020] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#600018]"
        >
          {isHindi ? "खरीदारी शुरू करें" : "Start Shopping"}
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#800020] shadow-sm hover:bg-[#800020] hover:text-white transition"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-black text-[#800020]">
          {isHindi ? `आपका कार्ट (${cartItems.length})` : `Your Cart (${cartItems.length})`}
        </h1>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
              <div className="h-24 w-24 shrink-0 rounded-xl bg-gray-50 p-2 flex items-center justify-center">
                <img src={item.image} alt={item.name} className="h-full object-contain mix-blend-multiply" />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-800">{isHindi ? item.nameHi : item.name}</h3>
                  <p className="mt-1 text-lg font-black text-[#800020]">₹{item.price}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-[#800020]/20 bg-[#FFF9D8]">
                    <button onClick={() => changeQuantity(item.id, -1)} className="flex h-8 w-8 items-center justify-center text-[#800020] font-bold hover:bg-[#800020]/10 rounded-l-lg">−</button>
                    <span className="w-8 text-center text-sm font-black">{item.quantity}</span>
                    <button onClick={() => changeQuantity(item.id, 1)} className="flex h-8 w-8 items-center justify-center text-[#800020] font-bold hover:bg-[#800020]/10 rounded-r-lg">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="flex items-center gap-1 text-xs font-bold text-red-500 hover:underline">
                    <Trash2 size={14} /> {isHindi ? "हटाएं" : "Remove"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bill Summary */}
        <div className="lg:w-80 shrink-0">
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 sticky top-24">
            <h2 className="mb-4 text-lg font-black text-gray-800">{isHindi ? "बिल डिटेल्स" : "Bill Details"}</h2>
            <div className="space-y-3 text-sm font-medium text-gray-600 border-b border-gray-100 pb-4">
              <div className="flex justify-between">
                <span>{isHindi ? "सबटोटल" : "Item Total"}</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>{isHindi ? "डिलीवरी चार्ज" : "Delivery Fee"}</span>
                <span className={deliveryFee === 0 ? "text-green-600 font-bold" : ""}>{deliveryFee === 0 ? (isHindi ? "मुफ्त" : "FREE") : `₹${deliveryFee}`}</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="text-base font-black text-gray-800">{isHindi ? "कुल योग" : "To Pay"}</span>
              <span className="text-2xl font-black text-[#800020]">₹{finalTotal}</span>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#800020] py-3.5 text-sm font-black text-white shadow-lg transition hover:bg-[#600018] active:scale-95"
            >
              {isHindi ? "चेकआउट करें" : "Proceed to Checkout"} <ArrowRight size={18} />
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400">
              <ShieldCheck size={14} className="text-green-500" /> {isHindi ? "100% सुरक्षित खरीदारी" : "100% Secure & Safe Shopping"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}