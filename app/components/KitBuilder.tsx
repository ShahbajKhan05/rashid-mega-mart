
"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import {
  useCart,
  type CartProduct,
} from "./CartProvider";

type Product = CartProduct & {
  category: string;
  emoji: string;
};

type Kit = {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  emoji: string;
  items: Record<string, number>;
};

const products: Product[] = [
  { id: "atta", category: "staples", name: "Wheat Atta", nameHi: "गेहूं का आटा", price: 220, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=320&q=75", emoji: "🌾" },
  { id: "rice", category: "staples", name: "Basmati Rice", nameHi: "बासमती चावल", price: 250, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=320&q=75", emoji: "🍚" },
  { id: "dal", category: "staples", name: "Toor Dal", nameHi: "अरहर दाल", price: 140, image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=320&q=75", emoji: "🫘" },
  { id: "chana", category: "staples", name: "Chana Dal", nameHi: "चना दाल", price: 100, image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=320&q=75", emoji: "🫘" },
  { id: "oil", category: "oil", name: "Cooking Oil", nameHi: "खाना बनाने का तेल", price: 160, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=320&q=75", emoji: "🫒" },
  { id: "ghee", category: "oil", name: "Ghee", nameHi: "घी", price: 180, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=320&q=75", emoji: "🧈" },
  { id: "tea", category: "tea", name: "Tea Pack", nameHi: "चाय पैक", price: 150, image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=320&q=75", emoji: "🍵" },
  { id: "coffee", category: "tea", name: "Coffee", nameHi: "कॉफी", price: 120, image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=320&q=75", emoji: "☕" },
  { id: "sugar", category: "basics", name: "Sugar", nameHi: "चीनी", price: 50, image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=320&q=75", emoji: "🍚" },
  { id: "salt", category: "basics", name: "Table Salt", nameHi: "नमक", price: 25, image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442a?auto=format&fit=crop&w=320&q=75", emoji: "🧂" },
  { id: "turmeric", category: "masala", name: "Turmeric Powder", nameHi: "हल्दी पाउडर", price: 45, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=320&q=75", emoji: "🟡" },
  { id: "chilli", category: "masala", name: "Red Chilli Powder", nameHi: "लाल मिर्च पाउडर", price: 55, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=320&q=75", emoji: "🌶️" },
  { id: "garam-masala", category: "masala", name: "Garam Masala", nameHi: "गरम मसाला", price: 60, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=320&q=75", emoji: "🫙" },
  { id: "biscuits", category: "snacks", name: "Biscuits", nameHi: "बिस्कुट", price: 35, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=320&q=75", emoji: "🍪" },
  { id: "namkeen", category: "snacks", name: "Namkeen Pack", nameHi: "नमकीन पैक", price: 40, image: "https://images.unsplash.com/photo-1621939514649-280e2aa0f2ff?auto=format&fit=crop&w=320&q=75", emoji: "🥨" },
  { id: "oats", category: "breakfast", name: "Breakfast Oats", nameHi: "ब्रेकफास्ट ओट्स", price: 120, image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=320&q=75", emoji: "🥣" },
  { id: "poha", category: "breakfast", name: "Poha", nameHi: "पोहा", price: 45, image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=320&q=75", emoji: "🥣" },
  { id: "pickle", category: "pantry", name: "Mango Pickle", nameHi: "आम का अचार", price: 90, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=320&q=75", emoji: "🥭" },
  { id: "almonds", category: "dry", name: "Almonds", nameHi: "बादाम", price: 250, image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=320&q=75", emoji: "🥜" },
  { id: "cashews", category: "dry", name: "Cashews", nameHi: "काजू", price: 300, image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=320&q=75", emoji: "🥜" },
];

const categoryOptions = [
  { id: "all", en: "All Items", hi: "सभी सामान" },
  { id: "staples", en: "Atta, Rice & Dal", hi: "आटा, चावल और दाल" },
  { id: "oil", en: "Oil & Ghee", hi: "तेल और घी" },
  { id: "tea", en: "Tea & Coffee", hi: "चाय और कॉफी" },
  { id: "basics", en: "Salt & Sugar", hi: "नमक और चीनी" },
  { id: "masala", en: "Masala", hi: "मसाले" },
  { id: "snacks", en: "Snacks", hi: "स्नैक्स" },
  { id: "breakfast", en: "Breakfast", hi: "ब्रेकफास्ट" },
  { id: "pantry", en: "Pantry", hi: "किराना" },
  { id: "dry", en: "Dry Fruits", hi: "ड्राई फ्रूट्स" },
];

const kits: Kit[] = [
  {
    id: "starter",
    name: "Starter Kirana Kit",
    nameHi: "स्टार्टर किराना किट",
    description: "Everyday essentials for getting started.",
    descriptionHi: "रोजमर्रा के जरूरी किराना सामान।",
    emoji: "🛒",
    items: {
      atta: 1,
      rice: 1,
      dal: 1,
      oil: 1,
      tea: 1,
      sugar: 1,
      salt: 1,
      biscuits: 1,
    },
  },
  {
    id: "family",
    name: "Family Essentials Kit",
    nameHi: "फैमिली एसेंशियल्स किट",
    description: "Staples, spices, snacks and more.",
    descriptionHi: "किराना, मसाले, स्नैक्स और अन्य सामान।",
    emoji: "🏠",
    items: {
      atta: 1,
      rice: 1,
      dal: 1,
      chana: 1,
      oil: 1,
      tea: 1,
      sugar: 1,
      salt: 1,
      turmeric: 1,
      chilli: 1,
      biscuits: 1,
      poha: 1,
    },
  },
  {
    id: "monthly",
    name: "Monthly Grocery Kit",
    nameHi: "मंथली किराना किट",
    description: "A wider selection of pantry essentials.",
    descriptionHi: "ज्यादा मात्रा में जरूरी किराना सामान।",
    emoji: "📦",
    items: {
      atta: 2,
      rice: 2,
      dal: 2,
      chana: 1,
      oil: 2,
      tea: 2,
      sugar: 2,
      salt: 1,
      turmeric: 1,
      chilli: 1,
      biscuits: 2,
      namkeen: 2,
      poha: 2,
      oats: 1,
    },
  },
  {
    id: "premium",
    name: "Premium Family Kit",
    nameHi: "प्रीमियम फैमिली किट",
    description: "More variety with premium pantry extras.",
    descriptionHi: "ज्यादा वैरायटी के साथ प्रीमियम किराना सामान।",
    emoji: "🎁",
    items: {
      atta: 2,
      rice: 2,
      dal: 2,
      chana: 1,
      oil: 2,
      ghee: 1,
      tea: 2,
      coffee: 1,
      sugar: 2,
      salt: 1,
      turmeric: 1,
      chilli: 1,
      almonds: 1,
      cashews: 1,
      oats: 1,
      biscuits: 2,
      namkeen: 2,
    },
  },
  {
    id: "mega",
    name: "Mega Pantry Kit",
    nameHi: "मेगा पेंट्री किट",
    description: "A large grocery selection you can customize.",
    descriptionHi: "बड़ा किराना कलेक्शन, जिसे आप बदल सकते हैं।",
    emoji: "🛍️",
    items: {
      atta: 4,
      rice: 4,
      dal: 4,
      chana: 3,
      oil: 4,
      ghee: 3,
      tea: 4,
      coffee: 2,
      sugar: 3,
      salt: 3,
      turmeric: 2,
      chilli: 2,
      "garam-masala": 2,
      almonds: 3,
      cashews: 3,
      oats: 2,
      biscuits: 4,
      namkeen: 4,
      pickle: 2,
      poha: 2,
    },
  },
];

const MIN_TOTAL = 999;
const MAX_TOTAL = 9999;

function money(price: number) {
  return `₹${price.toLocaleString("en-IN")}`;
}

function totalFor(items: Record<string, number>) {
  return products.reduce(
    (sum, product) => sum + product.price * (items[product.id] || 0),
    0
  );
}

export default function KitBuilder() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const {
    addToCart,
    addCustomRequest,
    openCart,
  } = useCart();

  const [activeKit, setActiveKit] = useState<Kit | null>(null);
  const [customMode, setCustomMode] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const [customName, setCustomName] = useState("");
  const [customQuantity, setCustomQuantity] = useState("1");
  const [customNote, setCustomNote] = useState("");
  const [customItems, setCustomItems] = useState<
    { name: string; quantity: number; note: string }[]
  >([]);

  const [message, setMessage] = useState("");

  const total = useMemo(() => totalFor(quantities), [quantities]);

  const chosenCount = Object.values(quantities).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  const visibleProducts = products.filter((product) => {
    const matchesCategory =
      category === "all" || product.category === category;

    const searchText = search.trim().toLowerCase();
    const matchesSearch =
      !searchText ||
      product.name.toLowerCase().includes(searchText) ||
      product.nameHi.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

  const text = {
    heading: isHindi ? "अपनी किराना किट बनाएं" : "Build Your Grocery Kit",
    subtitle: isHindi
      ? "तैयार किट चुनें या अपनी पसंद के सामान जोड़ें।"
      : "Choose a ready-made kit or select your own items.",
    priceRange: isHindi ? "₹999 से ₹9,999" : "₹999–₹9,999",
    customise: isHindi ? "बदलें" : "Customize",
    addKit: isHindi ? "कार्ट में जोड़ें" : "Add to Cart",
    buildOwn: isHindi ? "अपनी किट बनाएं" : "Build Your Own",
    all: isHindi ? "सभी सामान" : "All Items",
    search: isHindi ? "सामान खोजें..." : "Search products...",
    items: isHindi ? "आइटम" : "items",
    subtotal: isHindi ? "कुल राशि" : "Total",
    selected: isHindi ? "चुना हुआ सामान" : "Selected Items",
    missing: isHindi ? "सामान नहीं मिल रहा?" : "Can't find an item?",
    missingHint: isHindi
      ? "सामान का नाम लिखें। दुकान उसकी उपलब्धता और कीमत कन्फर्म करेगी।"
      : "Type any item name. The store will confirm availability and price.",
    itemName: isHindi ? "सामान का नाम" : "Item name",
    quantity: isHindi ? "मात्रा" : "Qty",
    note: isHindi
      ? "ब्रांड, साइज या कोई नोट (वैकल्पिक)"
      : "Brand, size or note (optional)",
    addCustom: isHindi ? "कस्टम सामान जोड़ें" : "Add Custom Item",
    pending: isHindi ? "कीमत बाद में कन्फर्म होगी" : "Price to be confirmed",
    min: isHindi
      ? "कम से कम ₹999 का सामान चुनें।"
      : "Select at least ₹999 worth of listed products.",
    max: isHindi
      ? "किट ₹9,999 से ज्यादा नहीं हो सकती।"
      : "Kit cannot exceed ₹9,999.",
    close: isHindi ? "बंद करें" : "Close",
    clear: isHindi ? "रीसेट" : "Reset",
    remove: isHindi ? "हटाएँ" : "Remove",
  };

  function startPreset(kit: Kit) {
    setActiveKit(kit);
    setCustomMode(false);
    setQuantities({ ...kit.items });
    setCustomItems([]);
    setCustomName("");
    setCustomQuantity("1");
    setCustomNote("");
    setCategory("all");
    setSearch("");
    setMessage("");
  }

  function startCustom() {
    setActiveKit(null);
    setCustomMode(true);
    setQuantities({});
    setCustomItems([]);
    setCustomName("");
    setCustomQuantity("1");
    setCustomNote("");
    setCategory("all");
    setSearch("");
    setMessage("");
  }

  function closeBuilder() {
    setActiveKit(null);
    setCustomMode(false);
    setMessage("");
  }

  function changeQuantity(product: Product, amount: number) {
    setQuantities((previous) => {
      const nextQuantity = Math.max(
        0,
        (previous[product.id] || 0) + amount
      );

      const nextTotal =
        totalFor(previous) -
        product.price * (previous[product.id] || 0) +
        product.price * nextQuantity;

      if (nextTotal > MAX_TOTAL) {
        setMessage(text.max);
        return previous;
      }

      setMessage("");

      const next = { ...previous };

      if (nextQuantity === 0) {
        delete next[product.id];
      } else {
        next[product.id] = nextQuantity;
      }

      return next;
    });
  }

  function addMissingItem() {
    const name = customName.trim();
    const quantity = Number(customQuantity);

    if (!name) {
      setMessage(
        isHindi ? "पहले सामान का नाम लिखें।" : "Please enter the item name."
      );
      return;
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      setMessage(
        isHindi
          ? "मात्रा 1 से 99 के बीच रखें।"
          : "Quantity must be between 1 and 99."
      );
      return;
    }

    setCustomItems((previous) => [
      ...previous,
      {
        name,
        quantity,
        note: customNote.trim(),
      },
    ]);

    setCustomName("");
    setCustomQuantity("1");
    setCustomNote("");
    setMessage("");
  }

  function submitKit() {
    const hasCustom = customItems.length > 0;

    // For listed products, enforce the kit price range.
    if (total > MAX_TOTAL) {
      setMessage(text.max);
      return;
    }

    if (!hasCustom && total < MIN_TOTAL) {
      setMessage(text.min);
      return;
    }

    if (chosenCount === 0 && !hasCustom) {
      setMessage(
        isHindi ? "कुछ सामान चुनें।" : "Please select some items."
      );
      return;
    }

    // Add all listed items to the shared cart.
    products.forEach((product) => {
      const quantity = quantities[product.id] || 0;

      for (let index = 0; index < quantity; index += 1) {
        addToCart(product);
      }
    });

    // Unlisted products are quote requests, not zero-priced products.
    customItems.forEach((item) => addCustomRequest(item));

    closeBuilder();
    openCart();
  }

  return (
    <section
      id="kit"
      className="scroll-mt-20 bg-[#FFFCF0] px-3 py-5 text-[#30251F] sm:px-6 sm:py-9 lg:px-8"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-4 flex items-end justify-between gap-3 sm:mb-6">
          <div>
            <span className="inline-flex rounded-full border border-[#D4A84F]/70 bg-[#FFF0D1] px-2.5 py-1 text-[10px] font-extrabold text-[#800020] sm:text-xs">
              {text.priceRange}
            </span>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#800020] sm:text-3xl">
              {text.heading}
            </h2>

            <p className="mt-1 text-xs leading-5 text-[#76665C] sm:text-sm">
              {text.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={startCustom}
            className="shrink-0 rounded-xl bg-[#800020] px-3 py-2.5 text-xs font-extrabold text-white hover:bg-[#610019] sm:px-5 sm:py-3 sm:text-sm"
          >
            + {text.buildOwn}
          </button>
        </div>

        {/* Ready-made kits */}
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {kits.map((kit) => {
            const kitTotal = totalFor(kit.items);
            const product = products.find(
              (item) => (kit.items[item.id] || 0) > 0
            );

            const itemCount = Object.values(kit.items).reduce(
              (sum, quantity) => sum + quantity,
              0
            );

            return (
              <article
                key={kit.id}
                className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#E8E4DA] bg-white transition hover:border-[#D4A84F] hover:shadow-md sm:rounded-2xl"
              >
                <div className="relative flex aspect-[1.25/1] items-center justify-center overflow-hidden bg-[#FFF0D1] p-3">
                  {product ? (
                    <img
                      src={product.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-contain"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-5xl">{kit.emoji}</span>
                  )}

                  <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[9px] font-black text-[#800020] sm:text-[10px]">
                    {kit.emoji} {isHindi ? "ग्रॉसरी किट" : "GROCERY KIT"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-2.5 sm:p-3.5">
                  <h3 className="min-h-9 text-xs font-extrabold leading-4 sm:text-sm sm:leading-5">
                    {isHindi ? kit.nameHi : kit.name}
                  </h3>

                  <p className="mt-1 text-[10px] leading-4 text-[#76665C] sm:text-xs">
                    {isHindi ? kit.descriptionHi : kit.description}
                  </p>

                  <div className="mt-auto pt-3">
                    <p className="text-lg font-black text-[#800020]">
                      {money(kitTotal)}
                    </p>
                    <p className="mt-0.5 text-[10px] text-[#76665C] sm:text-xs">
                      {itemCount} {text.items}
                    </p>

                    <button
                      type="button"
                      onClick={() => startPreset(kit)}
                      className="mt-2.5 min-h-10 w-full rounded-lg border border-[#800020]/25 bg-[#FFF9D8] px-2 py-2 text-xs font-extrabold text-[#800020] hover:bg-[#800020] hover:text-white"
                    >
                      {text.customise}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Customizer */}
      {(activeKit || customMode) && (
        <div
          className="fixed inset-0 z-[900] flex items-end justify-center bg-black/55 sm:items-center sm:p-4"
          onClick={closeBuilder}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="kit-builder-title"
            onClick={(event) => event.stopPropagation()}
            className="flex max-h-[95dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl bg-[#FFFCF0] shadow-2xl sm:rounded-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-[#800020]/15 bg-[#FFF9D8] px-3 py-3 sm:px-5">
              <div className="min-w-0">
                <h3
                  id="kit-builder-title"
                  className="text-base font-black text-[#800020] sm:text-xl"
                >
                  {customMode
                    ? text.buildOwn
                    : isHindi
                      ? activeKit?.nameHi
                      : activeKit?.name}
                </h3>
                <p className="mt-0.5 text-[10px] text-[#76665C] sm:text-xs">
                  {isHindi
                    ? "सामान चुनें या अपना नया आइटम लिखें।"
                    : "Choose products or request a missing item."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeBuilder}
                aria-label={text.close}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#800020]/10 text-xl font-bold text-[#800020]"
              >
                ×
              </button>
            </div>

            {/* Live total */}
            <div className="flex items-center justify-between gap-3 border-b border-[#800020]/10 px-3 py-3 sm:px-5">
              <div>
                <p className="text-[10px] text-[#76665C] sm:text-xs">
                  {text.selected}: {chosenCount}
                </p>
                <p className="mt-0.5 text-xl font-black text-[#800020] sm:text-2xl">
                  {money(total)}
                </p>
              </div>
              <p className="max-w-44 text-right text-[10px] leading-4 text-[#76665C] sm:text-xs">
                {text.priceRange}
                {customItems.length > 0
                  ? ` · ${customItems.length} ${isHindi ? "कस्टम अनुरोध" : "custom requests"}`
                  : ""}
              </p>
            </div>

            {/* Product search */}
            <div className="px-3 pt-3 sm:px-5">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={text.search}
                aria-label={text.search}
                className="min-h-10 w-full rounded-xl border border-[#800020]/20 bg-white px-3 py-2 text-sm outline-none placeholder:text-[#9A8C80] focus:border-[#800020]"
              />
            </div>

            {/* Category filters */}
            <div className="flex gap-2 overflow-x-auto px-3 py-3 sm:px-5">
              {categoryOptions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCategory(item.id)}
                  className={`shrink-0 rounded-full px-3 py-2 text-[10px] font-extrabold sm:text-xs ${
                    category === item.id
                      ? "bg-[#800020] text-white"
                      : "border border-[#800020]/20 bg-white text-[#800020]"
                  }`}
                >
                  {isHindi ? item.hi : item.en}
                </button>
              ))}
            </div>

            {/* Available products */}
            <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3 sm:px-5">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {visibleProducts.map((product) => {
                  const quantity = quantities[product.id] || 0;

                  return (
                    <div
                      key={product.id}
                      className="flex min-w-0 items-center gap-2.5 rounded-xl border border-[#E8E4DA] bg-white p-2"
                    >
                      <img
                        src={product.image}
                        alt=""
                        loading="lazy"
                        className="h-12 w-12 shrink-0 rounded-lg bg-[#EFF5FF] object-contain p-1"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-extrabold leading-4 sm:text-sm">
                          {isHindi ? product.nameHi : product.name}
                        </p>
                        <p className="mt-1 text-xs font-black text-[#800020]">
                          {money(product.price)}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => changeQuantity(product, -1)}
                          disabled={quantity === 0}
                          aria-label={`Decrease ${product.name}`}
                          className="h-8 w-8 rounded-lg border border-[#800020]/20 font-bold text-[#800020] disabled:opacity-30"
                        >
                          −
                        </button>
                        <span className="w-4 text-center text-xs font-black">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => changeQuantity(product, 1)}
                          aria-label={`Increase ${product.name}`}
                          disabled={total + product.price > MAX_TOTAL}
                          className="h-8 w-8 rounded-lg bg-[#800020] font-bold text-white disabled:opacity-30"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Missing item request */}
              <section className="mt-4 rounded-2xl border border-dashed border-[#D4A84F] bg-[#FFF9D8] p-3 sm:p-4">
                <h4 className="text-sm font-black text-[#800020] sm:text-base">
                  ✚ {text.missing}
                </h4>
                <p className="mt-1 text-[11px] leading-5 text-[#76665C] sm:text-xs">
                  {text.missingHint}
                </p>

                <div className="mt-3 grid grid-cols-[minmax(0,1fr)_68px] gap-2">
                  <input
                    value={customName}
                    onChange={(event) => setCustomName(event.target.value)}
                    placeholder={text.itemName}
                    className="min-h-10 min-w-0 rounded-lg border border-[#800020]/20 bg-white px-3 text-sm outline-none focus:border-[#800020]"
                  />

                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={customQuantity}
                    onChange={(event) =>
                      setCustomQuantity(event.target.value)
                    }
                    aria-label={text.quantity}
                    className="min-h-10 w-full rounded-lg border border-[#800020]/20 bg-white px-2 text-center text-sm outline-none focus:border-[#800020]"
                  />
                </div>

                <input
                  value={customNote}
                  onChange={(event) => setCustomNote(event.target.value)}
                  placeholder={text.note}
                  className="mt-2 min-h-10 w-full rounded-lg border border-[#800020]/20 bg-white px-3 text-xs outline-none focus:border-[#800020] sm:text-sm"
                />

                <button
                  type="button"
                  onClick={addMissingItem}
                  className="mt-2 min-h-10 w-full rounded-lg border border-[#800020]/25 bg-white px-3 py-2 text-xs font-extrabold text-[#800020] transition hover:bg-[#800020] hover:text-white sm:text-sm"
                >
                  + {text.addCustom}
                </button>

                {customItems.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {customItems.map((item, index) => (
                      <div
                        key={`${item.name}-${index}`}
                        className="flex items-center gap-2 rounded-lg border border-[#D4A84F]/50 bg-white p-2"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="break-words text-xs font-bold text-[#30251F]">
                            {item.name} × {item.quantity}
                          </p>
                          {item.note && (
                            <p className="mt-1 break-words text-[10px] text-[#76665C]">
                              {item.note}
                            </p>
                          )}
                          <p className="mt-1 text-[10px] font-bold text-[#800020]">
                            {text.pending}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setCustomItems((previous) =>
                              previous.filter((_, i) => i !== index)
                            )
                          }
                          aria-label={text.remove}
                          className="shrink-0 rounded-lg px-2 py-1 text-xs font-bold text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* Submit */}
            <div className="border-t border-[#800020]/15 bg-[#FFF9D8] p-3 sm:p-5">
              {message && (
                <p
                  role="status"
                  className="mb-2 text-xs font-bold text-[#800020]"
                >
                  {message}
                </p>
              )}

              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] text-[#76665C] sm:text-xs">
                    {text.subtotal}
                  </p>
                  <p className="text-xl font-black text-[#800020] sm:text-2xl">
                    {money(total)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={submitKit}
                  disabled={
                    total > MAX_TOTAL ||
                    (total < MIN_TOTAL &&
                      customItems.length === 0)
                  }
                  className="min-h-11 flex-1 rounded-xl bg-[#800020] px-3 py-3 text-xs font-extrabold text-white transition hover:bg-[#610019] disabled:cursor-not-allowed disabled:opacity-40 sm:max-w-sm sm:text-sm"
                >
                  {customItems.length > 0 && total < MIN_TOTAL
                    ? isHindi
                      ? "कस्टम अनुरोध कार्ट में जोड़ें"
                      : "Add Custom Request to Cart"
                    : text.addKit}
                </button>
              </div>

              <p className="mt-2 text-[10px] leading-4 text-[#76665C] sm:text-xs">
                {isHindi
                  ? "कस्टम सामान की कीमत स्टोर कन्फर्म करेगा।"
                  : "The store will confirm prices for custom requests."}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
