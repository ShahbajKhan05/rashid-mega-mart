"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { useCart } from "./CartProvider";
import { products, kits, categoryOptions, type Product } from "./data";
import { ArrowUpRight, ShoppingBag, X, Plus, Minus, Search, Crown, Sparkles } from "lucide-react";

const MIN_TOTAL = 499; 
const MAX_TOTAL = 9999;

function money(price: number) {
  return `₹${price.toLocaleString("en-IN")}`;
}

export default function KitBuilder() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const { addToCart, addCustomRequest, openCart } = useCart();

  const [activeKit, setActiveKit] = useState<typeof kits[0] | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  
  const [customName, setCustomName] = useState("");
  const [customQuantity, setCustomQuantity] = useState("1");
  const [customNote, setCustomNote] = useState("");
  const [customItems, setCustomItems] = useState<{ name: string; quantity: number; note: string }[]>([]);
  
  const [message, setMessage] = useState("");

  const total = useMemo(() => {
    return products.reduce(
      (sum, product) => sum + product.price * (quantities[product.id] || 0),
      0
    );
  }, [quantities]);

  const chosenCount = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  const visibleProducts = products.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const searchText = search.trim().toLowerCase();
    const matchesSearch = !searchText || product.name.toLowerCase().includes(searchText) || product.nameHi.includes(searchText);
    return matchesCategory && matchesSearch;
  });

  function openKit(kit: typeof kits[0]) {
    setActiveKit(kit);
    setQuantities({ ...kit.items }); 
    setCategory("all"); 
    setCustomItems([]);
    setSearch("");
    setMessage("");
  }

  function closeBuilder() {
    setActiveKit(null);
    setMessage("");
  }

  function changeQuantity(product: Product, amount: number) {
    setQuantities((prev) => {
      const nextQuantity = Math.max(0, (prev[product.id] || 0) + amount);
      const nextTotal = total - product.price * (prev[product.id] || 0) + product.price * nextQuantity;

      if (nextTotal > MAX_TOTAL) {
        setMessage(isHindi ? "किट ₹9,999 से ज्यादा नहीं हो सकती।" : "Kit cannot exceed ₹9,999.");
        return prev;
      }
      setMessage("");
      
      const next = { ...prev };
      if (nextQuantity === 0) delete next[product.id];
      else next[product.id] = nextQuantity;
      return next;
    });
  }

  function addMissingItem() {
    const name = customName.trim();
    const quantity = Number(customQuantity);

    if (!name) {
      setMessage(isHindi ? "सामान का नाम लिखें।" : "Please enter the item name.");
      return;
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      setMessage(isHindi ? "मात्रा 1 से 99 के बीच रखें।" : "Quantity must be between 1 and 99.");
      return;
    }

    setCustomItems((prev) => [...prev, { name, quantity, note: customNote.trim() }]);
    setCustomName("");
    setCustomQuantity("1");
    setCustomNote("");
    setMessage("");
  }

  function submitKit() {
    if (total > MAX_TOTAL) {
      setMessage(isHindi ? "किट ₹9,999 से ज्यादा नहीं हो सकती।" : "Kit cannot exceed ₹9,999.");
      return;
    }
    if (total < MIN_TOTAL && customItems.length === 0) {
      setMessage(isHindi ? `कम से कम ₹${MIN_TOTAL} का सामान चुनें।` : `Select at least ₹${MIN_TOTAL} worth of listed products.`);
      return;
    }
    if (chosenCount === 0 && customItems.length === 0) {
      setMessage(isHindi ? "कुछ सामान चुनें।" : "Please select some items.");
      return;
    }

    products.forEach((product) => {
      const quantity = quantities[product.id] || 0;
      if (quantity > 0) addToCart(product, quantity);
    });
    customItems.forEach((item) => addCustomRequest(item));
    
    closeBuilder();
    openCart();
  }

  return (
    <section id="kit" className="scroll-mt-20 bg-[#FFFCF0] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4A84F]/40 bg-[#FFF4D6] px-3 py-1.5 text-[10px] font-bold text-[#8A6B29] shadow-sm sm:text-xs">
              <Sparkles size={14} /> {isHindi ? "एक्सक्लूसिव किट्स" : "EXCLUSIVE KITS"}
            </span>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-[#800020] sm:text-4xl">
              {isHindi ? "राशिद मेगा मार्ट की खास किट्स" : "Rashid Mega Mart Special Kits"}
            </h2>
            <p className="mt-1.5 text-sm text-[#76665C]">
              {isHindi ? "आपके परिवार के लिए पूरा राशन, एक ही किट में।" : "Complete ration for your family in one kit."}
            </p>
          </div>
        </div>

        {/* 4 PREMIUM KITS GRID */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kits.map((kit) => {
            const discountPercent = Math.round(((kit.originalPrice - kit.price) / kit.originalPrice) * 100);
            
            return (
              <div
                key={kit.id}
                onClick={() => openKit(kit)}
                className={`group relative flex min-h-[260px] cursor-pointer flex-col justify-between overflow-hidden rounded-[24px] border border-white/60 bg-gradient-to-br p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_40px_rgb(128,0,32,0.15)] ${kit.bg}`}
              >
                {/* Background Image Blend */}
                <div className="absolute inset-y-0 right-0 z-0 w-[65%] overflow-hidden">
                  <img
                    src={kit.image}
                    alt={kit.titleEn}
                    className="h-full w-full object-cover opacity-95 transition-transform duration-700 group-hover:scale-110"
                    style={{
                      maskImage: "linear-gradient(to right, transparent 0%, black 50%, black 100%)",
                      WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 50%, black 100%)",
                    }}
                  />
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Decorative Circle */}
                <div className="pointer-events-none absolute -right-8 -top-8 z-0 h-32 w-32 rounded-full border border-white/40 bg-white/20 backdrop-blur-md" />

                {/* Top Section: Badges & Title */}
                <div className="relative z-10 w-[85%]">
                  <div className="mb-2 flex flex-wrap items-center gap-1.5">
                    {/* Crown Icon Badge */}
                    <span className="inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-[#D4A84F] to-[#B88A2F] px-2 py-1 text-[9px] font-black uppercase text-white shadow-sm">
                      <Crown size={10} /> Premium
                    </span>
                    {discountPercent > 0 && (
                      <span className="inline-flex rounded-md bg-[#800020] px-2 py-1 text-[9px] font-black text-white shadow-sm">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-black leading-tight text-[#800020] drop-shadow-sm">
                    {isHindi ? kit.titleHi : kit.titleEn}
                  </h3>
                  <p className="mt-1 text-[11px] font-semibold leading-relaxed text-[#5C4B42] sm:text-xs">
                    {isHindi ? kit.descHi : kit.descEn}
                  </p>
                </div>

                {/* Bottom Section: Price & Action */}
                <div className="relative z-10 mt-auto flex w-full items-end justify-between pt-4">
                  <div>
                    <p className="text-2xl font-black text-[#800020]">{money(kit.price)}</p>
                    <p className="text-[11px] font-bold text-[#76665C] line-through decoration-[#800020]/30 decoration-2">
                      {money(kit.originalPrice)}
                    </p>
                  </div>
                  
                  {/* Floating Action Button */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#800020] shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-sm transition-all group-hover:scale-110 group-hover:bg-[#800020] group-hover:text-white">
                    <ArrowUpRight size={22} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FULL CUSTOMIZER MODAL (Same as before) */}
      {activeKit && (
        <div className="fixed inset-0 z-[900] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4" onClick={closeBuilder}>
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="flex h-[92dvh] w-full flex-col overflow-hidden rounded-t-[24px] bg-[#FFFCF0] shadow-2xl sm:h-auto sm:max-h-[90dvh] sm:max-w-4xl sm:rounded-[32px]"
          >
            <div className="flex items-center justify-between border-b border-[#800020]/10 bg-white px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br text-xl shadow-inner sm:h-12 sm:w-12 ${activeKit.bg}`}>
                  <img src={activeKit.image} alt="" className="h-full w-full object-cover opacity-80" />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-base font-black text-[#800020] sm:text-xl">
                    {isHindi ? activeKit.titleHi : activeKit.titleEn}
                  </h3>
                  <p className="mt-0.5 text-[10px] text-[#76665C] sm:text-xs">
                    {isHindi ? "सामान चुनें या नया लिखें।" : "Customize your kit."}
                  </p>
                </div>
              </div>
              <button
                onClick={closeBuilder}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF9D8] text-[#800020] transition-colors hover:bg-[#800020]/10 sm:h-10 sm:w-10"
              >
                <X size={18} className="sm:h-5 sm:w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pb-24 sm:pb-0">
              <div className="sticky top-0 z-10 bg-[#FFFCF0]/95 px-4 py-3 backdrop-blur-md sm:px-6">
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#800020]/50" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={isHindi ? "सामान खोजें..." : "Search products..."}
                    className="h-11 w-full rounded-xl border border-[#800020]/15 bg-white pl-10 pr-4 text-sm font-medium outline-none transition focus:border-[#800020] focus:ring-2 focus:ring-[#800020]/20"
                  />
                </div>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {categoryOptions.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setCategory(item.id)}
                      className={`shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all sm:text-xs ${
                        category === item.id
                          ? "bg-[#800020] text-white shadow-sm"
                          : "bg-white text-[#800020] border border-[#800020]/15"
                      }`}
                    >
                      {isHindi ? item.hi : item.en}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-4 py-2 sm:px-6">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleProducts.map((product) => {
                    const quantity = quantities[product.id] || 0;
                    return (
                      <div
                        key={product.id}
                        className={`flex items-center gap-3 rounded-xl border p-2.5 transition-all ${
                          quantity > 0 ? "border-[#D4A84F] bg-[#FFF9D8]" : "border-[#E8E4DA] bg-white"
                        }`}
                      >
                        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1">
                          <img src={product.image} alt="" className="h-full w-full object-contain" />
                          {quantity > 0 && (
                            <div className="absolute inset-0 flex items-center justify-center bg-[#800020]/10 backdrop-blur-[1px]">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#800020] text-[10px] font-black text-white">
                                {quantity}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-bold text-[#30251F] sm:text-sm">
                            {isHindi ? product.nameHi : product.name}
                          </p>
                          <p className="mt-1 text-xs font-black text-[#800020]">
                            {money(product.price)}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-1 rounded-lg border border-[#800020]/10 bg-white p-1">
                          <button
                            onClick={() => changeQuantity(product, -1)}
                            disabled={quantity === 0}
                            className="flex h-7 w-7 items-center justify-center rounded-md text-[#800020] disabled:opacity-30"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-5 text-center text-xs font-black">{quantity}</span>
                          <button
                            onClick={() => changeQuantity(product, 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-md bg-[#800020] text-white"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {visibleProducts.length === 0 && (
                  <div className="py-10 text-center">
                    <p className="text-3xl">🔎</p>
                    <p className="mt-2 text-sm font-bold text-[#800020]">No items found</p>
                  </div>
                )}
              </div>

              <div className="mx-4 mt-2 rounded-2xl border border-dashed border-[#D4A84F]/50 bg-[#FFF9D8] p-4 sm:mx-6">
                <h4 className="text-sm font-black text-[#800020]">✚ {isHindi ? "सामान नहीं मिल रहा?" : "Can't find an item?"}</h4>
                <p className="mt-1 text-[10px] leading-relaxed text-[#76665C]">
                  {isHindi ? "सामान का नाम लिखें। दुकान कीमत कन्फर्म करेगी।" : "Type any item name. Store will confirm the price."}
                </p>
                
                <div className="mt-3 grid grid-cols-[1fr_60px] gap-2">
                  <input
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder={isHindi ? "सामान का नाम" : "Item name"}
                    className="h-10 rounded-lg border border-[#800020]/15 bg-white px-3 text-xs outline-none focus:border-[#800020]"
                  />
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={customQuantity}
                    onChange={(e) => setCustomQuantity(e.target.value)}
                    className="h-10 rounded-lg border border-[#800020]/15 bg-white text-center text-xs font-bold outline-none focus:border-[#800020]"
                  />
                </div>
                <input
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder={isHindi ? "नोट (वैकल्पिक)" : "Note (optional)"}
                  className="mt-2 h-10 w-full rounded-lg border border-[#800020]/15 bg-white px-3 text-xs outline-none focus:border-[#800020]"
                />
                <button
                  onClick={addMissingItem}
                  className="mt-2 h-10 w-full rounded-lg border border-[#800020]/20 bg-white text-xs font-bold text-[#800020] transition hover:bg-[#800020] hover:text-white"
                >
                  + {isHindi ? "कस्टम सामान जोड़ें" : "Add Custom Item"}
                </button>

                {customItems.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {customItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg bg-white p-2 shadow-sm">
                        <div>
                          <p className="text-xs font-bold text-[#30251F]">
                            {item.name} × {item.quantity}
                          </p>
                          {item.note && <p className="text-[10px] text-[#76665C]">{item.note}</p>}
                        </div>
                        <button
                          onClick={() => setCustomItems((prev) => prev.filter((_, i) => i !== index))}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-red-500"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 border-t border-[#800020]/10 bg-white p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] sm:static sm:p-4">
              {message && (
                <p className="mb-2 text-center text-[10px] font-bold text-red-600 sm:text-xs">
                  ⚠️ {message}
                </p>
              )}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#76665C]">
                    {isHindi ? "कुल राशि" : "Total"}
                  </p>
                  <p className="text-lg font-black text-[#800020] sm:text-xl">
                    {money(total)}
                  </p>
                  <p className="text-[9px] text-[#A47A2C]">{chosenCount + customItems.length} items</p>
                </div>
                <button
                  onClick={submitKit}
                  disabled={total > MAX_TOTAL || (total < MIN_TOTAL && customItems.length === 0)}
                  className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#800020] px-4 text-xs font-black text-white shadow-md transition-all hover:bg-[#610019] disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:max-w-xs sm:text-sm"
                >
                  <ShoppingBag size={16} />
                  {customItems.length > 0 && total < MIN_TOTAL ? (
                    isHindi ? "कस्टम जोड़ें" : "Add Custom"
                  ) : (
                    isHindi ? "कार्ट में जोड़ें" : "Add to Cart"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}