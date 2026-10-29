"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { useCart } from "./CartProvider";
import { products, categoryOptions, type Product } from "./data";
import { 
  ArrowUpRight, X, Plus, Minus, Search, Crown, Sparkles, 
  Check, Star, Flame, Clock, BadgePercent, ShoppingBasket, LayoutGrid, 
  Users, Truck, ChevronRight, Gift, ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const MIN_TOTAL = 499; 
const MAX_TOTAL = 9999;

function money(price: number) {
  return `₹${price.toLocaleString("en-IN")}`;
}

const newKitsDesign = [
  {
    id: "family-ration",
    badgeText: "PREMIUM",
    badgeIcon: Crown,
    theme: "bg-gradient-to-br from-[#FFF8E1] to-[#FFE082]", // Golden Yellow
    textColor: "text-[#B8860B]", // Dark Goldenrod
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
    theme: "bg-gradient-to-br from-[#FEF9C3] to-[#FDE047]", // Bright Yellow
    textColor: "text-[#854D0E]",
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
    theme: "bg-gradient-to-br from-[#FEF3C7] to-[#FCD34D]", // Amber Yellow
    textColor: "text-[#92400E]",
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
    <section id="kit" className="scroll-mt-20 bg-[#FFFDF5] px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
      
      <div className="mx-auto max-w-7xl relative">
        
        {/* Decorative Elements */}
        <div className="absolute -left-20 top-0 text-[#EAB308]/10 rotate-45 pointer-events-none">
          <Sparkles size={200} />
        </div>
        <div className="absolute -right-20 bottom-0 text-[#F59E0B]/10 -rotate-12 pointer-events-none">
          <Star size={180} />
        </div>

        {/* HERO HEADER */}
        <div className="relative mb-16 flex flex-col items-center text-center z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[#EAB308]/50 bg-[#FEF9C3] px-5 py-2 shadow-sm"
          >
            <Crown size={18} className="text-[#CA8A04]" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#854D0E]">
              {isHindi ? "स्मार्ट शॉपिंग किट्स" : "SMART SHOPPING KITS"}
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl font-black tracking-tight text-[#78350F] sm:text-5xl lg:text-7xl leading-[1.1]"
          >
            {isHindi ? (
              <>राशिद मेगा मार्ट <br/><span className="text-[#EAB308]">स्पेशल किट्स</span></>
            ) : (
              <>Rashid Mega Mart <br/><span className="text-[#EAB308]">Special Kits</span></>
            )}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 max-w-2xl text-sm font-medium leading-relaxed text-[#78350F]/70 sm:text-base"
          >
            {isHindi 
              ? "आपके परिवार की हर ज़रूरत एक ही किट में। चुने हुए प्रोडक्ट्स, बेहतर वैल्यू और खरीदारी का आसान तरीका।" 
              : "Everything your family needs in one kit. Handpicked products, better value and a simpler way to shop."}
          </motion.p>

          {/* 4 Icons Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-10 lg:gap-16"
          >
            {[
              { icon: Clock, titleEn: "Save Time", descEn: "Ready-to-shop kits", titleHi: "समय बचाएं", descHi: "तैयार किट्स" },
              { icon: BadgePercent, titleEn: "Better Value", descEn: "Special bundle prices", titleHi: "बेहतर वैल्यू", descHi: "स्पेशल बंडल कीमतें" },
              { icon: ShoppingBasket, titleEn: "Daily Essentials", descEn: "Trusted brands", titleHi: "रोज़मर्रा की ज़रूरतें", descHi: "भरोसेमंद ब्रांड्स" },
              { icon: Star, titleEn: "For Every Family", descEn: "Customised for your needs", titleHi: "हर परिवार के लिए", descHi: "आपकी ज़रूरत के हिसाब से" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#CA8A04] shadow-sm ring-1 ring-[#EAB308]/20">
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-black text-[#78350F]">{isHindi ? item.titleHi : item.titleEn}</p>
                  <p className="text-xs font-medium text-[#78350F]/60">{isHindi ? item.descHi : item.descEn}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3 PREMIUM KITS GRID */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 relative z-10">
          {newKitsDesign.map((kit, index) => {
            const Icon = kit.badgeIcon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                key={kit.id}
                onClick={() => openKit(kit)}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-[36px] p-8 shadow-[0_20px_50px_rgba(202,138,4,0.1)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(202,138,4,0.2)] cursor-pointer ${kit.theme}`}
              >
                <div className="relative z-20 flex items-start justify-between w-full mb-4">
                  <div className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 backdrop-blur-md shadow-sm border border-white/50">
                    <Icon size={14} className={kit.textColor} />
                    <span className={`text-[10px] font-black uppercase tracking-wider ${kit.textColor}`}>{kit.badgeText}</span>
                  </div>
                  <div className="rounded-full bg-[#CA8A04] px-3 py-1.5 text-[10px] font-black text-white shadow-md">
                    {kit.discount}
                  </div>
                </div>

                <div className="relative z-20 flex flex-col h-full w-[65%]">
                  <h3 className={`text-3xl font-black leading-[1.1] ${kit.textColor} tracking-tight`}>
                    {isHindi ? kit.titleHi : kit.titleEn}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-[#78350F]/80">
                    {isHindi ? kit.descHi : kit.descEn}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {(isHindi ? kit.featuresHi : kit.featuresEn).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-bold text-[#78350F]">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/60">
                           <Check size={12} className={`shrink-0 ${kit.textColor}`} strokeWidth={4} />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="absolute bottom-0 right-0 w-[60%] h-full pointer-events-none">
                   <img
                    src={kit.image}
                    alt={kit.titleEn}
                    className="h-full w-full object-contain object-bottom drop-shadow-[0_20px_20px_rgba(202,138,4,0.3)] transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3"
                    style={{
                      maskImage: "linear-gradient(to top, black 50%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to top, black 50%, transparent 100%)",
                    }}
                  />
                </div>

                <div className="relative z-20 mt-10 flex items-end justify-between w-full border-t border-[#CA8A04]/20 pt-5">
                  <div>
                    <p className={`text-4xl font-black ${kit.textColor} tracking-tighter`}>{money(kit.price)}</p>
                    <p className="text-xs font-bold text-[#78350F]/60 line-through mt-1">{money(kit.originalPrice)}</p>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-[#15803D] bg-white/80 px-2.5 py-1 rounded-md mb-2 shadow-sm">
                      Save {money(kit.originalPrice - kit.price)}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#CA8A04] shadow-lg transition-all group-hover:scale-110 group-hover:bg-[#CA8A04] group-hover:text-white">
                      <ArrowUpRight size={24} strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* =========================================
          AWARD-WINNING YELLOW IMMERSIVE MODAL
          ========================================= */}
      <AnimatePresence>
        {activeKit && (
          <div className="fixed inset-0 z-[900] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              onClick={closeBuilder}
            />
            <motion.div
              initial={{ y: "100%", opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              role="dialog"
              aria-modal="true"
              className="relative flex h-[96dvh] w-full flex-col overflow-hidden rounded-t-[40px] bg-[#FAFAFA] shadow-2xl sm:h-[88vh] sm:max-w-2xl sm:rounded-[40px]"
            >
              
              {/* --- YELLOW AWARD-WINNING HEADER --- */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#FDE047] via-[#FACC15] to-[#EAB308] px-6 pb-8 pt-6 sm:px-8 border-b-4 border-[#CA8A04]">
                {/* Trophy & Ribbon Background Details */}
                <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 pointer-events-none">
                  <div className="absolute right-10 top-4 text-8xl">🏆</div>
                  <div className="absolute right-4 bottom-4 text-6xl">👑</div>
                </div>
                
                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex items-center gap-5">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white shadow-xl overflow-hidden p-2 border-2 border-[#CA8A04]">
                      <img src={activeKit.image} alt="" className="h-full w-full object-contain" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-[#78350F] sm:text-3xl tracking-tight leading-tight drop-shadow-sm">
                        {isHindi ? activeKit.titleHi : activeKit.titleEn}
                      </h3>
                      <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#78350F] px-3 py-1 text-[10px] font-black text-[#FDE047] shadow-sm">
                        <Crown size={12} /> {isHindi ? "अवार्ड विनिंग किट" : "AWARD WINNING KIT"}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={closeBuilder}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#78350F]/10 text-[#78350F] backdrop-blur-md transition-all hover:bg-[#78350F]/20 active:scale-95"
                  >
                    <X size={20} strokeWidth={3} />
                  </button>
                </div>
              </div>

              {/* --- SCROLLABLE CONTENT --- */}
              <div className="flex-1 overflow-y-auto pb-36 relative scroll-smooth">
                
                {/* Search & Categories */}
                <div className="sticky top-0 z-30 bg-[#FAFAFA]/95 px-4 py-4 backdrop-blur-xl sm:px-6 border-b border-gray-200/50">
                  <div className="relative group">
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#CA8A04] transition-colors" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={isHindi ? "किट में सामान खोजें..." : "Search items in kit..."}
                      className="h-14 w-full rounded-2xl border-0 bg-white pl-12 pr-4 text-sm font-medium shadow-sm outline-none ring-1 ring-gray-200 transition-all focus:ring-2 focus:ring-[#EAB308]"
                    />
                  </div>
                  
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {categoryOptions.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setCategory(item.id)}
                        className={`shrink-0 flex items-center gap-2 rounded-xl px-4 py-2.5 text-[11px] font-bold transition-all duration-300 ${
                          category === item.id 
                            ? "bg-[#EAB308] text-[#78350F] shadow-md scale-105" 
                            : "bg-white text-[#78350F]/70 shadow-sm ring-1 ring-gray-200 hover:ring-[#EAB308]/50"
                        }`}
                      >
                        {item.id === "all" && <LayoutGrid size={14} />}
                        {isHindi ? item.hi : item.en}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Loyalty Card Banner */}
                <div className="mx-4 mt-6 sm:mx-6">
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FEF08A] to-[#FDE047] p-4 shadow-md border border-[#EAB308]/50 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-black text-[#78350F] uppercase tracking-wide flex items-center gap-1.5">
                        <Crown size={16} className="text-[#CA8A04]" /> 
                        {isHindi ? "लॉयल्टी कार्ड पाएं" : "GET A LOYALTY CARD"}
                      </h4>
                      <p className="mt-1 text-[11px] font-bold text-[#78350F]/70 max-w-[200px] sm:max-w-xs">
                        {isHindi ? "इस किट को खरीदें और पाएं एक्सक्लूसिव बेनिफिट्स!" : "Buy this kit & get exclusive benefits!"}
                      </p>
                    </div>
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#78350F] text-[#FDE047] shadow-lg transform rotate-6">
                      <Gift size={28} />
                    </div>
                  </div>
                </div>

                {/* Products List */}
                <div className="px-4 pt-6 sm:px-6">
                  <div className="flex flex-col gap-3">
                    {visibleProducts.map((product) => {
                      const quantity = quantities[product.id] || 0;
                      const originalPrice = product.originalPrice || Math.round(product.price * 1.25); 
                      const savings = originalPrice - product.price;
                      
                      return (
                        <div
                          key={product.id}
                          className={`group flex items-center gap-4 rounded-2xl border bg-white p-3.5 transition-all duration-300 ${
                            quantity > 0 
                              ? "border-[#EAB308] shadow-md ring-1 ring-[#EAB308]/30" 
                              : "border-gray-100 shadow-sm hover:shadow-md hover:border-[#EAB308]/40"
                          }`}
                        >
                          {/* Image */}
                          <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-[#FEF9C3]/50 p-2 overflow-hidden">
                            <img src={product.image} alt="" className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" />
                            {quantity > 0 && (
                              <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-br-xl bg-[#EAB308] text-[11px] font-black text-[#78350F] shadow-sm"
                              >
                                {quantity}
                              </motion.div>
                            )}
                          </div>
                          
                          {/* Details */}
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-[#30251F] leading-tight line-clamp-2">
                              {isHindi ? product.nameHi : product.name}
                            </p>
                            
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <p className="text-lg font-black text-[#CA8A04]">{money(product.price)}</p>
                              <p className="text-xs font-medium text-gray-400 line-through">{money(originalPrice)}</p>
                              <span className="rounded-md bg-[#15803D]/10 px-2 py-0.5 text-[9px] font-black tracking-wider text-[#15803D]">
                                {isHindi ? `₹${savings} बचत` : `₹${savings} OFF`}
                              </span>
                            </div>
                          </div>

                          {/* +/- Controls */}
                          <div className="shrink-0">
                            {quantity === 0 ? (
                              <button
                                onClick={() => changeQuantity(product, 1)}
                                className="flex h-10 w-24 items-center justify-center rounded-xl border border-[#EAB308]/40 bg-[#FEF9C3] text-xs font-black text-[#78350F] shadow-sm transition hover:bg-[#EAB308] active:scale-95"
                              >
                                ADD
                              </button>
                            ) : (
                              <div className="flex h-10 w-24 items-center justify-between rounded-xl bg-[#EAB308] px-1 shadow-sm">
                                <button
                                  onClick={() => changeQuantity(product, -1)}
                                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#78350F] transition hover:bg-black/10"
                                >
                                  <Minus size={16} strokeWidth={3} />
                                </button>
                                <span className="text-sm font-black text-[#78350F]">{quantity}</span>
                                <button
                                  onClick={() => changeQuantity(product, 1)}
                                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#78350F] transition hover:bg-black/10"
                                >
                                  <Plus size={16} strokeWidth={3} />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Empty State */}
                  {visibleProducts.length === 0 && (
                    <div className="py-16 text-center">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FEF9C3]">
                        <Search size={32} className="text-[#CA8A04]" />
                      </div>
                      <p className="mt-4 text-lg font-bold text-[#78350F]">No items found</p>
                    </div>
                  )}
                </div>

                {/* Add Custom Item Section */}
                <div className="mx-4 mt-8 rounded-2xl border border-dashed border-[#EAB308] bg-[#FEF9C3]/40 p-5 sm:mx-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={18} className="text-[#CA8A04]" />
                    <h4 className="text-sm font-black text-[#78350F]">
                      {isHindi ? "कोई सामान नहीं मिल रहा?" : "Can't find an item?"}
                    </h4>
                  </div>
                  <p className="text-xs leading-relaxed text-[#78350F]/70 mb-4">
                    {isHindi ? "सामान का नाम लिखें। हम आपके लिए लाएंगे और कीमत कन्फर्म करेंगे।" : "Type any item name. We'll source it and confirm the price."}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder={isHindi ? "जैसे: ब्राउन ब्रेड..." : "e.g., Brown Bread..."}
                      className="h-12 flex-1 rounded-xl border-0 bg-white px-4 text-sm font-medium shadow-sm ring-1 ring-gray-200 outline-none transition-all focus:ring-2 focus:ring-[#EAB308]"
                    />
                    <div className="flex gap-3">
                      <input
                        type="number"
                        min={1}
                        max={99}
                        value={customQuantity}
                        onChange={(e) => setCustomQuantity(e.target.value)}
                        className="h-12 w-16 rounded-xl border-0 bg-white text-center text-sm font-bold shadow-sm ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-[#EAB308]"
                      />
                      <button
                        onClick={addMissingItem}
                        className="flex h-12 items-center justify-center rounded-xl bg-[#CA8A04] px-6 text-sm font-bold text-white shadow-md hover:bg-[#A16207] transition active:scale-95"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {customItems.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {customItems.map((item, index) => (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          key={index} 
                          className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm ring-1 ring-gray-100"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FEF9C3] text-[#CA8A04] text-sm font-black">
                              {item.quantity}
                            </div>
                            <p className="text-sm font-bold text-[#30251F]">{item.name}</p>
                          </div>
                          <button
                            onClick={() => setCustomItems((prev) => prev.filter((_, i) => i !== index))}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* --- STICKY BOTTOM CHECKOUT BAR --- */}
              <div className="absolute inset-x-0 bottom-0 border-t border-gray-200 bg-white/95 px-4 py-4 shadow-[0_-20px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:px-6">
                {message && (
                  <div className="mb-3 rounded-lg bg-red-50 px-4 py-2 text-center text-xs font-bold text-red-600">
                    {message}
                  </div>
                )}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#78350F]/60">
                      {chosenCount + customItems.length} {isHindi ? "आइटम चुने गए" : "ITEMS SELECTED"}
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <p className="text-3xl font-black text-[#78350F] tracking-tighter">{money(total)}</p>
                      <p className="text-xs font-bold text-gray-400 line-through">{money(total + 650)}</p>
                    </div>
                  </div>

                  <button
                    onClick={submitKit}
                    disabled={total > MAX_TOTAL || (total < MIN_TOTAL && customItems.length === 0)}
                    className="flex h-14 w-full max-w-[200px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#EAB308] to-[#CA8A04] text-sm font-black text-[#78350F] shadow-[0_10px_25px_rgba(234,179,8,0.4)] transition-all hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(234,179,8,0.5)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    <ShoppingBasket size={20} />
                    {isHindi ? "कार्ट में जोड़ें" : "Add to Cart"}
                    <ChevronRight size={20} strokeWidth={3} />
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}