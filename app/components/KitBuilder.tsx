"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { useCart } from "./CartProvider";
import { products, categoryOptions, type Product } from "./data";
import { 
  ArrowUpRight, ShoppingBag, X, Plus, Minus, Search, Crown, Sparkles, 
  Check, Star, Flame, Clock, BadgePercent, ShoppingBasket, LayoutGrid, 
  Users, Truck, ArrowRight 
} from "lucide-react";

const MIN_TOTAL = 499; 
const MAX_TOTAL = 9999;

function money(price: number) {
  return `₹${price.toLocaleString("en-IN")}`;
}

// Custom Kit Data mapped from your existing data.ts (for the new design)
const newKitsDesign = [
  {
    id: "family-ration",
    badgeText: "PREMIUM",
    badgeIcon: Crown,
    theme: "bg-[#FCEAD2]", // Peach
    textColor: "text-[#800020]",
    discount: "25% OFF",
    titleEn: "Family Ration Saver Kit",
    titleHi: "फैमिली राशन सेवर किट",
    descEn: "Full month ration for the whole family.",
    descHi: "पूरे महीने का राशन पूरे परिवार के लिए।",
    featuresEn: ["Atta, Rice, Dal", "Oil, Spices, Salt", "Daily Essentials", "15+ Products"],
    featuresHi: ["आटा, चावल, दाल", "तेल, मसाले, नमक", "रोज़मर्रा की ज़रूरतें", "15+ प्रोडक्ट्स"],
    price: 1999,
    originalPrice: 2650,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
  },
  {
    id: "family-saver",
    badgeText: "BEST VALUE",
    badgeIcon: Star,
    theme: "bg-[#DCEBDB]", // Mint Green
    textColor: "text-[#138047]",
    discount: "18% OFF",
    titleEn: "Family Saver Kit",
    titleHi: "फैमिली सेवर किट",
    descEn: "Perfect pack for a complete family.",
    descHi: "पूरे परिवार के लिए एकदम परफेक्ट पैक।",
    featuresEn: ["Kitchen Staples", "Breakfast & Snacks", "Personal Care", "12+ Products"],
    featuresHi: ["रसोई की ज़रूरतें", "नाश्ता और स्नैक्स", "पर्सनल केयर", "12+ प्रोडक्ट्स"],
    price: 1599,
    originalPrice: 1950,
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&q=80",
  },
  {
    id: "family-essential",
    badgeText: "POPULAR",
    badgeIcon: Flame,
    theme: "bg-[#F7DFE2]", // Pink
    textColor: "text-[#800020]",
    discount: "11% OFF",
    titleEn: "Family Essentials Kit",
    titleHi: "फैमिली एसेंशियल्स किट",
    descEn: "Daily essentials at a great value.",
    descHi: "रोज़मर्रा की ज़रूरतें बेहतरीन कीमत पर।",
    featuresEn: ["Daily Cooking Needs", "Snacks & Beverages", "Cleaning Essentials", "10+ Products"],
    featuresHi: ["रोज़ाना खाना बनाने की ज़रूरतें", "स्नैक्स और बेवरेज", "सफाई का सामान", "10+ प्रोडक्ट्स"],
    price: 999,
    originalPrice: 1120,
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&q=80",
  },
];

export default function KitBuilder() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const { addToCart, addCustomRequest, openCart } = useCart();

  const [activeKit, setActiveKit] = useState<any>(null);
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

  function openKit(kit: typeof newKitsDesign[0]) {
    setActiveKit(kit);
    const defaultItems: Record<string, number> = {};
    if (kit.id === "family-ration") {
      defaultItems["aashirvaad-atta"] = 2;
      defaultItems["india-gate-rice"] = 2;
      defaultItems["fortune-oil"] = 2;
      defaultItems["tata-salt"] = 1;
    } else if (kit.id === "family-saver") {
      defaultItems["aashirvaad-atta"] = 1;
      defaultItems["fortune-oil"] = 1;
      defaultItems["maggi"] = 4;
    } else {
      defaultItems["aashirvaad-atta"] = 1;
      defaultItems["tata-salt"] = 1;
    }
    
    setQuantities(defaultItems); 
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
    <section id="kit" className="scroll-mt-20 bg-[#FFFCF0] px-4 py-12 sm:px-6 lg:px-8 overflow-hidden">
      
      <div className="mx-auto max-w-7xl relative">
        
        {/* Decorative Leaves */}
        <div className="absolute -left-10 top-0 text-[#138047]/20 rotate-45 pointer-events-none">
          <Sparkles size={100} />
        </div>

        {/* HERO HEADER */}
        <div className="relative mb-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A84F]/50 bg-[#FFF4D6] px-4 py-1.5 shadow-sm">
            <Crown size={16} className="text-[#D4A84F]" />
            <span className="text-[11px] font-black uppercase tracking-widest text-[#8A6B29]">
              {isHindi ? "स्मार्ट शॉपिंग किट्स" : "SMART SHOPPING KITS"}
            </span>
          </div>
          
          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#800020] sm:text-5xl lg:text-6xl">
            {isHindi ? "राशिद मेगा मार्ट स्पेशल किट्स" : "Rashid Mega Mart Special Kits"}
          </h2>
          
          <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-[#68574A] sm:text-base">
            {isHindi 
              ? "आपके परिवार की हर ज़रूरत एक ही किट में। चुने हुए प्रोडक्ट्स, बेहतर वैल्यू और खरीदारी का आसान तरीका।" 
              : "Everything your family needs in one kit. Handpicked products, better value and a simpler way to shop."}
          </p>

          {/* 4 Icons Row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 lg:gap-12">
            {[
              { icon: Clock, titleEn: "Save Time", descEn: "Ready-to-shop kits", titleHi: "समय बचाएं", descHi: "तैयार किट्स" },
              { icon: BadgePercent, titleEn: "Better Value", descEn: "Special bundle prices", titleHi: "बेहतर वैल्यू", descHi: "स्पेशल बंडल कीमतें" },
              { icon: ShoppingBasket, titleEn: "Daily Essentials", descEn: "Trusted brands", titleHi: "रोज़मर्रा की ज़रूरतें", descHi: "भरोसेमंद ब्रांड्स" },
              { icon: Star, titleEn: "For Every Family", descEn: "Customised for your needs", titleHi: "हर परिवार के लिए", descHi: "आपकी ज़रूरत के हिसाब से" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-left">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFF9D8] text-[#D4A84F] shadow-sm">
                  <item.icon size={16} />
                </div>
                <div>
                  <p className="text-xs font-black text-[#30251F]">{isHindi ? item.titleHi : item.titleEn}</p>
                  <p className="text-[10px] text-[#76665C]">{isHindi ? item.descHi : item.descEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 PREMIUM KITS GRID */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {newKitsDesign.map((kit) => {
            const Icon = kit.badgeIcon;
            return (
              <div
                key={kit.id}
                onClick={() => openKit(kit)}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-[32px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] ${kit.theme}`}
              >
                <div className="relative z-20 flex items-start justify-between w-full mb-4">
                  <div className="flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1 backdrop-blur-sm shadow-sm">
                    <Icon size={12} className={kit.textColor} />
                    <span className={`text-[10px] font-black uppercase tracking-wider ${kit.textColor}`}>{kit.badgeText}</span>
                  </div>
                  <div className="rounded-full bg-[#800020] px-3 py-1 text-[10px] font-black text-white shadow-sm">
                    {kit.discount}
                  </div>
                </div>

                <div className="relative z-20 flex flex-col h-full w-[60%]">
                  <h3 className={`text-2xl font-black leading-[1.1] ${kit.textColor}`}>
                    {isHindi ? kit.titleHi : kit.titleEn}
                  </h3>
                  <p className="mt-2 text-xs font-medium leading-relaxed text-[#5C4B42]">
                    {isHindi ? kit.descHi : kit.descEn}
                  </p>

                  <ul className="mt-6 space-y-2">
                    {(isHindi ? kit.featuresHi : kit.featuresEn).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px] font-bold text-[#30251F]">
                        <Check size={14} className={`shrink-0 ${kit.textColor}`} strokeWidth={3} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="absolute bottom-0 right-0 w-[55%] h-full pointer-events-none">
                   <img
                    src={kit.image}
                    alt={kit.titleEn}
                    className="h-full w-full object-contain object-bottom drop-shadow-2xl transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-2"
                    style={{
                      maskImage: "linear-gradient(to top, black 50%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to top, black 50%, transparent 100%)",
                    }}
                  />
                </div>

                <div className="relative z-20 mt-8 flex items-end justify-between w-full">
                  <div>
                    <p className={`text-3xl font-black ${kit.textColor}`}>{money(kit.price)}</p>
                    <p className="text-[11px] font-bold text-[#76665C] line-through mt-1">{money(kit.originalPrice)}</p>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] font-bold text-[#138047] bg-[#138047]/10 px-2 py-0.5 rounded-sm mb-2">
                      Save {money(kit.originalPrice - kit.price)}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#800020] shadow-md transition-all group-hover:scale-110 group-hover:bg-[#800020] group-hover:text-white">
                      <ArrowUpRight size={20} strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================
          PREMIUM CUSTOMIZER MODAL (Blinkit Style)
          ========================================= */}
      {activeKit && (
        <div className="fixed inset-0 z-[900] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4" onClick={closeBuilder}>
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="flex h-[92dvh] w-full flex-col overflow-hidden rounded-t-[28px] bg-[#FFF9F0] shadow-2xl sm:h-auto sm:max-h-[90dvh] sm:max-w-3xl sm:rounded-[28px]"
          >
            
            {/* Modal Header */}
            <div className="relative overflow-hidden border-b border-[#800020]/10 bg-gradient-to-b from-[#FFF4D6] to-[#FFF9F0] px-4 py-4 sm:px-6">
              <div className="absolute -right-4 -top-4 opacity-20 text-6xl">🍅</div>
              <div className="absolute -left-4 bottom-0 opacity-20 text-5xl">🌾</div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm overflow-hidden border border-white">
                    <img src={activeKit.image} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#800020] sm:text-xl">
                      {isHindi ? activeKit.titleHi : activeKit.titleEn}
                    </h3>
                    <p className="text-[11px] font-medium text-[#68574A]">
                      {isHindi ? "ताज़ा सामान के साथ अपनी किट बनाएं।" : "Customize your kit with fresh essentials."}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeBuilder}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#800020] shadow-sm transition-all hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="relative z-10 mt-3 flex items-center justify-center gap-3 sm:gap-6 rounded-xl bg-[#D4A84F]/10 py-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#800020]"><Star size={12} /> {isHindi ? "बेस्ट वैल्यू" : "Best Value"}</div>
                <div className="h-3 w-px bg-[#800020]/20" />
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#800020]"><Truck size={12} /> {isHindi ? "डेली ज़रूरतें" : "Daily Essentials"}</div>
                <div className="h-3 w-px bg-[#800020]/20" />
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#800020]"><Users size={12} /> {isHindi ? "हर परिवार के लिए" : "For Every Family"}</div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-28 sm:pb-24">
              
              {/* Search & Categories */}
              <div className="sticky top-0 z-20 bg-[#FFF9F0]/95 px-4 py-3 backdrop-blur-md sm:px-6">
                <div className="relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={isHindi ? "सामान खोजें..." : "Search products..."}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm font-medium outline-none transition focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
                  />
                </div>
                
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {categoryOptions.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setCategory(item.id)}
                      className={`shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-bold transition-all ${
                        category === item.id ? "bg-[#800020] text-white shadow-sm" : "bg-white text-[#30251F] border border-gray-200 hover:border-[#800020]/30"
                      }`}
                    >
                      {item.id === "all" && <LayoutGrid size={12} />}
                      {isHindi ? item.hi : item.en}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products List with Savings */}
              <div className="px-3 pt-1 sm:px-5">
                <div className="flex flex-col gap-3">
                  {visibleProducts.map((product) => {
                    const quantity = quantities[product.id] || 0;
                    // Fake realistic MRP (Price + ~25%)
                    const originalPrice = product.originalPrice || Math.round(product.price * 1.25); 
                    const savings = originalPrice - product.price;
                    
                    return (
                      <div
                        key={product.id}
                        className={`flex items-center gap-3 rounded-xl border p-2.5 transition-all ${
                          quantity > 0 ? "border-[#D4A84F] bg-[#FFF8E5] shadow-sm" : "border-gray-100 bg-white shadow-sm hover:border-gray-300"
                        }`}
                      >
                        {/* Image with Quantity Badge */}
                        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[#F8F8F8] p-1 overflow-hidden">
                          <img src={product.image} alt="" className="h-full w-full object-contain mix-blend-multiply" />
                          {quantity > 0 && (
                            <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-br-lg bg-[#800020] text-[10px] font-black text-white shadow-sm">
                              {quantity}
                            </div>
                          )}
                        </div>
                        
                        {/* Details */}
                        <div className="min-w-0 flex-1">
                          <p className="text-[14px] font-bold text-[#30251F] leading-tight line-clamp-2">
                            {isHindi ? product.nameHi : product.name}
                          </p>
                          
                          {/* Realistic Savings Tag */}
                          <div className="mt-1 inline-flex items-center gap-1 rounded bg-[#138047]/10 px-1.5 py-0.5">
                            <span className="text-[9px] font-black text-[#138047] uppercase tracking-wider">
                              Save ₹{savings}
                            </span>
                          </div>

                          {/* Price Row */}
                          <div className="mt-1 flex items-center gap-2">
                            <p className="text-lg font-black text-[#800020]">{money(product.price)}</p>
                            <p className="text-xs font-medium text-gray-400 line-through">{money(originalPrice)}</p>
                          </div>
                        </div>

                        {/* +/- Controls */}
                        <div className="flex shrink-0 flex-col items-center gap-1">
                          <div className="flex items-center rounded-lg border border-[#800020]/20 bg-white shadow-sm overflow-hidden h-9">
                            <button
                              onClick={() => changeQuantity(product, -1)}
                              disabled={quantity === 0}
                              className="flex h-full w-8 items-center justify-center text-[#800020] transition-colors hover:bg-[#800020]/5 disabled:opacity-30"
                            >
                              <Minus size={14} strokeWidth={3} />
                            </button>
                            <span className="w-6 text-center text-sm font-black">{quantity}</span>
                            <button
                              onClick={() => changeQuantity(product, 1)}
                              className="flex h-full w-8 items-center justify-center bg-[#800020] text-white transition-transform active:scale-95"
                            >
                              <Plus size={14} strokeWidth={3} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {visibleProducts.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="text-4xl">🔎</p>
                    <p className="mt-3 text-base font-bold text-[#800020]">No items found</p>
                  </div>
                )}
              </div>

              {/* Add Custom Item Section */}
              <div className="mx-3 mt-4 rounded-xl border border-dashed border-[#D4A84F]/60 bg-[#FFF9D8] p-3 sm:mx-5">
                <h4 className="text-xs font-black text-[#800020] flex items-center gap-1.5">
                  <Plus size={14} /> {isHindi ? "सामान नहीं मिल रहा?" : "Can't find an item?"}
                </h4>
                <p className="mt-0.5 text-[10px] leading-relaxed text-[#76665C]">
                  {isHindi ? "सामान का नाम लिखें। दुकान कीमत कन्फर्म करेगी।" : "Type any item name. Store will confirm the price."}
                </p>
                
                <div className="mt-2 flex gap-2">
                  <input
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder={isHindi ? "सामान का नाम" : "Item name"}
                    className="h-9 flex-1 rounded-lg border border-gray-200 bg-white px-3 text-xs outline-none focus:border-[#800020]"
                  />
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={customQuantity}
                    onChange={(e) => setCustomQuantity(e.target.value)}
                    className="h-9 w-12 rounded-lg border border-gray-200 bg-white text-center text-xs font-bold outline-none focus:border-[#800020]"
                  />
                  <button
                    onClick={addMissingItem}
                    className="h-9 rounded-lg bg-[#800020] px-3 text-xs font-bold text-white shadow-sm hover:bg-[#600018]"
                  >
                    Add
                  </button>
                </div>

                {customItems.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    {customItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg bg-white p-2 shadow-sm border border-gray-100">
                        <div>
                          <p className="text-xs font-bold text-[#30251F]">
                            {item.name} <span className="text-[#800020]">× {item.quantity}</span>
                          </p>
                        </div>
                        <button
                          onClick={() => setCustomItems((prev) => prev.filter((_, i) => i !== index))}
                          className="text-red-400 hover:text-red-600"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Bottom Bar */}
            <div className="absolute inset-x-0 bottom-0 border-t border-[#800020]/10 bg-[#6B0019] px-4 py-3 shadow-[0_-10px_20px_rgba(0,0,0,0.1)] sm:px-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                    <ShoppingBasket size={20} className="text-[#D4A84F]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                      {chosenCount + customItems.length} ITEMS
                    </p>
                    <div className="flex items-baseline gap-1.5">
                      <p className="text-2xl font-black text-white">{money(total)}</p>
                      <p className="text-xs font-medium text-white/50 line-through">{money(total + 500)}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={submitKit}
                  disabled={total > MAX_TOTAL || (total < MIN_TOTAL && customItems.length === 0)}
                  className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#D4A84F] px-6 text-sm font-black text-[#30251F] shadow-[0_4px_15px_rgba(212,168,79,0.4)] transition-all hover:-translate-y-0.5 hover:bg-[#E8C77A] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isHindi ? "कार्ट देखें" : "View Cart"}
                  <ArrowRight size={18} strokeWidth={3} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}