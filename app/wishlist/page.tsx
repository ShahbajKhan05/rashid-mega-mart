"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "../components/LanguageProvider";
import { useCart } from "../components/CartProvider";
import { ArrowLeft, Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";

function money(price: number) {
  return `₹${price.toLocaleString("en-IN")}`;
}

export default function WishlistPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const isHindi = language === "hi";
  
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load wishlist from local storage
    const saved = JSON.parse(localStorage.getItem("rmm_wishlist") || "[]");
    setWishlist(saved);
    setIsLoading(false);
  }, []);

  const removeFromWishlist = (id: string) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("rmm_wishlist", JSON.stringify(updated));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF9D8]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#800020] border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF9D8] pb-24">
      <div className="sticky top-0 z-50 bg-[#FFF9D8]/90 px-4 py-4 backdrop-blur-md border-b border-[#800020]/10">
        <div className="mx-auto flex max-w-4xl items-center gap-4">
          <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#800020] shadow-sm hover:bg-[#800020] hover:text-white transition">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-black text-[#800020] flex items-center gap-2">
            <Heart size={20} className="fill-[#800020]" /> {isHindi ? "मेरी विशलिस्ट" : "My Wishlist"}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 mt-6">
        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#FFF9D8] mb-4">
              <Heart size={40} className="text-[#800020]/30" />
            </div>
            <h2 className="text-lg font-black text-gray-800">{isHindi ? "विशलिस्ट खाली है" : "Wishlist is empty"}</h2>
            <p className="text-sm text-gray-500 mt-1 mb-6">{isHindi ? "आपने अभी तक कुछ सेव नहीं किया है।" : "You haven't saved any items yet."}</p>
            <Link href="/products" className="inline-flex items-center gap-2 rounded-xl bg-[#800020] px-6 py-3 text-sm font-bold text-white shadow-md">
              {isHindi ? "प्रोडक्ट्स देखें" : "Explore Products"} <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {wishlist.map((product) => (
              <div key={product.id} className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition hover:shadow-md">
                <button 
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-red-500 shadow-sm transition hover:bg-red-50"
                >
                  <Trash2 size={14} />
                </button>
                <Link href={`/products/${product.slug || product.id}`} className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-2">
                  <img src={product.image} alt={product.name} className="h-full w-full object-contain mix-blend-multiply transition group-hover:scale-105" />
                </Link>
                <div className="mt-3 flex flex-1 flex-col">
                  <p className="text-xs font-bold text-gray-800 line-clamp-2 leading-tight">{isHindi ? product.nameHi : product.name}</p>
                  <p className="text-sm font-black text-[#800020] mt-1">{money(product.price)}</p>
                  <button 
                    onClick={() => { addToCart(product); router.push('/cart'); }}
                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#800020]/5 py-2 text-[11px] font-black text-[#800020] transition hover:bg-[#800020] hover:text-white"
                  >
                    <ShoppingCart size={12} /> {isHindi ? "कार्ट में डालें" : "Move to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}