"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState, Suspense } from "react";
import { ArrowLeft, Search, ShoppingCart, Star, Plus, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../components/LanguageProvider";
import { useCart } from "../components/CartProvider";
import { products, categoryOptions } from "../components/data";

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { language } = useLanguage();
  const { addToCart, addCustomRequest, openCart } = useCart();
  const isHindi = language === "hi";

  const categorySlug = searchParams.get("category") || "all";
  const [searchQuery, setSearchQuery] = useState("");

  // Custom Item Modal State
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customQty, setCustomQty] = useState("1");
  const [customNote, setCustomNote] = useState("");

  const activeCategory = categoryOptions.find((c) => c.id === categorySlug);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = categorySlug === "all" || product.category === categorySlug;
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.nameHi.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [categorySlug, searchQuery]);

  function handleAddCustomItem(e: React.FormEvent) {
    e.preventDefault();
    if (!customName.trim()) return;

    addCustomRequest({
      name: customName.trim(),
      quantity: Number(customQty) || 1,
      note: customNote.trim(),
    });

    setShowCustomModal(false);
    setCustomName("");
    setCustomQty("1");
    setCustomNote("");
    openCart();
  }

  return (
    <main className="min-h-screen bg-[#FFFCF0] pb-24">
      
      {/* 
        =========================================
        HEADER & SEARCH (Aapke screenshot jaisa)
        =========================================
      */}
      <div className="sticky top-0 z-50 bg-[#FFFCF0] pt-4 shadow-sm border-b border-[#800020]/10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center gap-3">
            <button
              onClick={() => router.push("/")}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#800020] shadow-sm transition hover:bg-[#800020] hover:text-white"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-black text-[#800020] sm:text-3xl">
                {activeCategory ? (isHindi ? activeCategory.hi : activeCategory.en) : (isHindi ? "सभी सामान" : "All Items")}
              </h1>
              <p className="text-xs text-[#76665C]">
                {filteredProducts.length} items found
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex h-12 w-full items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 shadow-sm focus-within:border-[#800020] focus-within:ring-1 focus-within:ring-[#800020]">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHindi ? "सामान खोजें..." : "Search products..."}
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-gray-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-[#800020]">
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
            {categoryOptions.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className={`shrink-0 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                  categorySlug === cat.id
                    ? "bg-[#800020] text-white shadow-md"
                    : "border border-[#800020]/15 bg-white text-[#800020] hover:bg-[#800020]/5"
                }`}
              >
                {isHindi ? cat.hi : cat.en}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-6 lg:px-8">
        
        {/* 
          =========================================
          PRODUCT GRID (Exact Screenshot UI)
          =========================================
        */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
            {filteredProducts.map((product) => {
              const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
              const saving = product.originalPrice - product.price;

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Discount Badge (Golden Gradient) */}
                  {discountPercent > 0 && (
                    <div className="absolute left-0 top-2 z-10 rounded-r-md bg-gradient-to-r from-[#C28E2B] to-[#E8B04B] px-2 py-0.5 text-[10px] font-black text-white shadow-sm">
                      {discountPercent}% OFF
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-white">
                    <img
                      src={product.image}
                      alt={isHindi ? product.nameHi : product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80"; }}
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="mt-2 flex flex-1 flex-col px-1">
                    {/* Rating Box (Green) */}
                    <div className="mb-1 flex items-center">
                      <span className="flex items-center gap-0.5 rounded bg-[#138047] px-1.5 py-0.5 text-[10px] font-bold text-white">
                        {product.rating} <Star size={8} fill="currentColor" />
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xs font-bold leading-tight text-gray-800 line-clamp-2">
                      {isHindi ? product.nameHi : product.name}
                    </h3>
                    
                    {/* Price & Saving */}
                    <div className="mt-2">
                      <div className="flex items-baseline gap-1.5">
                        <p className="text-base font-black text-[#800020]">
                          ₹{product.price}
                        </p>
                        <p className="text-xs font-medium text-gray-400 line-through">
                          ₹{product.originalPrice}
                        </p>
                      </div>
                      <p className="text-[10px] font-bold text-[#138047] mt-0.5">
                        Save ₹{saving}
                      </p>
                    </div>

                    {/* Add Button */}
                    <button
                      onClick={() => addToCart(product)}
                      className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#800020]/20 bg-white py-1.5 text-xs font-black text-[#800020] transition hover:bg-[#800020] hover:text-white active:scale-95"
                    >
                      <ShoppingCart size={12} strokeWidth={3} />
                      Add
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#D4A84F] bg-[#FFF9D8] py-16 text-center">
            <span className="text-5xl">🔍</span>
            <h2 className="mt-4 text-lg font-bold text-[#800020]">
              No products found
            </h2>
            <Link href="/products?category=all" className="mt-5 rounded-xl bg-[#800020] px-5 py-2.5 text-sm font-bold text-white">
              View All Products
            </Link>
          </div>
        )}

        {/* 
          =========================================
          PREMIUM CUSTOM ORDER BANNER (Rashid Mega Mart Branding)
          =========================================
        */}
        <div className="mt-10 flex justify-center">
          <div className="relative w-full overflow-hidden rounded-[24px] bg-gradient-to-br from-[#8A0022] to-[#5A0014] px-6 py-8 text-center shadow-[0_10px_30px_rgba(128,0,32,0.2)]">
            <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#D4A84F]/10 blur-2xl" />
            <div className="relative z-10 flex flex-col items-center">
              <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Sparkles size={20} className="text-[#D4A84F]" />
              </span>
              <h2 className="text-xl font-black text-white sm:text-2xl">
                Can't find what you need?
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-white/80">
                Order any custom item from **Rashid Mega Mart**. We'll source it for you and confirm the price on WhatsApp.
              </p>
              <button
                onClick={() => setShowCustomModal(true)}
                className="mt-5 flex items-center gap-2 rounded-xl bg-[#D4A84F] px-6 py-2.5 text-sm font-black text-[#2A1510] shadow-lg transition hover:bg-[#E8C77A] active:scale-95"
              >
                <Plus size={16} strokeWidth={3} />
                Order Custom Item
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CUSTOM ORDER MODAL */}
      {showCustomModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setShowCustomModal(false)}>
          <div 
            className="w-full max-w-md overflow-hidden rounded-[24px] bg-[#FFFCF0] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative border-b border-[#800020]/10 bg-[#FFF9D8] px-5 py-5 text-center">
              <button 
                onClick={() => setShowCustomModal(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#800020]/5 text-[#800020] hover:bg-[#800020]/10"
              >
                <X size={18} />
              </button>
              <h3 className="text-lg font-black text-[#800020]">
                Order Custom Item
              </h3>
              <p className="mt-1 text-xs text-[#76665C]">
                We will get it from **Rashid Mega Mart** for you.
              </p>
            </div>
            
            <form onSubmit={handleAddCustomItem} className="p-5">
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#30251F]">
                    Item Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="e.g., Brown Bread, Paneer..."
                    className="w-full rounded-xl border border-[#800020]/20 bg-white px-3 py-3 text-sm outline-none focus:border-[#800020]"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <label className="mb-1.5 block text-xs font-bold text-[#30251F]">Qty *</label>
                    <input
                      type="number"
                      min="1"
                      value={customQty}
                      onChange={(e) => setCustomQty(e.target.value)}
                      className="w-full rounded-xl border border-[#800020]/20 bg-white px-3 py-3 text-center text-sm outline-none focus:border-[#800020]"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="mb-1.5 block text-xs font-bold text-[#30251F]">Note (optional)</label>
                    <input
                      type="text"
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      placeholder="Brand, size..."
                      className="w-full rounded-xl border border-[#800020]/20 bg-white px-3 py-3 text-sm outline-none focus:border-[#800020]"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="flex-1 rounded-xl border border-[#800020]/20 bg-white py-3.5 text-sm font-bold text-[#800020]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#138047] py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#0D6837]"
                >
                  Add to Cart
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#FFFCF0]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#800020] border-t-transparent" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}