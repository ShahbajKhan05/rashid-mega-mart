"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, ShoppingCart, Star, Minus, Plus, Check, 
  Truck, ShieldCheck, Leaf, Heart, Share2, MapPin, 
  Tag, RotateCcw
} from "lucide-react";
import { useLanguage } from "../../components/LanguageProvider";
import { useCart } from "../../components/CartProvider";
import { products } from "../../components/data";

function money(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function productSlug(p: any) {
  return p.slug || p.id;
}

export default function ProductClient() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { language } = useLanguage();
  const { addToCart, openCart } = useCart();
  const isHindi = language === "hi";
  
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [pincode, setPincode] = useState("");
  const [pincodeChecked, setPincodeChecked] = useState(false);

  // Custom products (Admin) + Static products
  const allProducts = useMemo(() => {
    if (typeof window === "undefined") return products;
    const custom = JSON.parse(localStorage.getItem("rmm_custom_products") || "[]");
    return [...custom, ...products];
  }, []);

  const product: any = useMemo(
    () => allProducts.find((p: any) => productSlug(p) === slug || p.id === slug),
    [slug, allProducts]
  );

  const related = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter((p: any) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product, allProducts]);

  if (!product) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center bg-[#FFFCF0] p-6 text-center">
        <div className="h-24 w-24 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <span className="text-4xl">😕</span>
        </div>
        <h1 className="text-2xl font-black text-[#800020]">
          {isHindi ? "प्रोडक्ट नहीं मिला" : "Product not found"}
        </h1>
        <Link href="/products" className="mt-6 rounded-xl bg-[#800020] px-6 py-2.5 text-sm font-bold text-white">
          {isHindi ? "वापस जाएं" : "Go back"}
        </Link>
      </div>
    );
  }

  const originalPrice = product.originalPrice || Math.round(product.price * 1.25);
  const saving = originalPrice - product.price;
  const discountPct = Math.max(0, Math.round((saving / originalPrice) * 100));
  const rating = product.rating ?? 4.2;

  const galleryImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeChecked(true);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFCF0] pb-24">
      {/* Top Navbar */}
      <div className="sticky top-[105px] lg:top-[72px] z-50 bg-[#FFFCF0]/90 backdrop-blur-md shadow-sm border-b border-[#800020]/10">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#800020] shadow-sm hover:bg-[#800020] hover:text-white transition"
          >
            <ArrowLeft size={20} />
          </button>
          <p className="flex-1 truncate text-sm font-black text-gray-800">
            {isHindi ? product.nameHi : product.name}
          </p>
          <button
            onClick={openCart}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#800020] text-white shadow-sm hover:bg-[#600018]"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          
          {/* LEFT COLUMN: IMAGE GALLERY */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
              <img
                src={galleryImages[activeImage]}
                alt={product.name}
                className="h-full w-full object-contain p-4 mix-blend-multiply transition-transform duration-500 hover:scale-105"
              />
              {discountPct > 0 && (
                <div className="absolute left-4 top-4 rounded-lg bg-[#138047] px-3 py-1.5 text-xs font-black text-white shadow-md">
                  {discountPct}% OFF
                </div>
              )}
              <div className="absolute right-4 top-4 flex flex-col gap-2">
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md text-gray-500 hover:text-red-500 transition">
                  <Heart size={20} />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md text-gray-500 hover:text-[#800020] transition">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="flex justify-center gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`flex h-20 w-20 items-center justify-center rounded-xl border-2 bg-white p-2 transition-all ${
                    activeImage === idx ? "border-[#800020] shadow-md" : "border-gray-200 hover:border-[#800020]/50"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-contain mix-blend-multiply" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: PRODUCT DETAILS */}
          <div className="flex flex-col">
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-[#138047] px-2 py-1 text-xs font-black text-white">
                {rating} <Star size={12} fill="currentColor" />
              </span>
              <span className="text-xs font-bold text-gray-500">
                (1,245 {isHindi ? "रेटिंग्स" : "Reviews"})
              </span>
            </div>

            <h1 className="text-2xl font-black leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
              {isHindi ? product.nameHi : product.name}
            </h1>
            
            <p className="mt-1 text-sm font-medium text-gray-500">
              {isHindi ? "ब्रांड" : "Brand"}: <span className="font-bold text-[#800020]">Rashid Mega Mart</span>
            </p>

            {/* Price Section */}
            <div className="mt-4 flex flex-wrap items-baseline gap-3">
              <span className="text-4xl font-black text-[#800020]">
                {money(product.price)}
              </span>
              <span className="text-lg font-medium text-gray-400 line-through">
                {money(originalPrice)}
              </span>
              <span className="rounded-md bg-[#138047]/10 px-2 py-1 text-sm font-black text-[#138047]">
                {isHindi ? `${money(saving)} बचाएं` : `Save ${money(saving)}`}
              </span>
            </div>
            <p className="text-xs font-bold text-gray-400 mt-1">
              {isHindi ? "कीमत में सभी टैक्स शामिल हैं" : "Inclusive of all taxes"}
            </p>

            {/* Offers Box */}
            <div className="mt-6 rounded-2xl border border-[#D4A84F]/30 bg-[#FFF9D8] p-4">
              <h3 className="flex items-center gap-2 text-sm font-black text-[#800020] mb-2">
                <Tag size={16} /> {isHindi ? "उपलब्ध ऑफर्स" : "Available Offers"}
              </h3>
              <ul className="space-y-1.5 text-xs font-medium text-gray-700">
                <li className="flex items-start gap-2"><Check size={14} className="text-[#138047] shrink-0 mt-0.5"/> Get 5% off on first order.</li>
                <li className="flex items-start gap-2"><Check size={14} className="text-[#138047] shrink-0 mt-0.5"/> Use loyalty coupon to get ₹75 off.</li>
              </ul>
            </div>

            {/* Pincode Check */}
            <div className="mt-6">
              <p className="text-sm font-bold text-gray-700 mb-2">{isHindi ? "डिलीवरी चेक करें" : "Check Delivery"}</p>
              <form onSubmit={checkPincode} className="flex gap-2 max-w-sm">
                <div className="relative flex-1">
                  <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => { setPincode(e.target.value.replace(/\D/g,'') ); setPincodeChecked(false); }}
                    placeholder={isHindi ? "पिनकोड डालें" : "Enter Pincode"}
                    className="w-full h-10 rounded-lg border border-gray-300 bg-white pl-9 pr-3 text-sm font-medium outline-none focus:border-[#800020]"
                  />
                </div>
                <button type="submit" className="h-10 rounded-lg bg-gray-800 px-4 text-xs font-bold text-white hover:bg-black">
                  {isHindi ? "चेक" : "Check"}
                </button>
              </form>
              {pincodeChecked && (
                <p className="mt-2 text-xs font-bold text-[#138047] flex items-center gap-1">
                  <Check size={14} /> {isHindi ? "डिलीवरी उपलब्ध है (30-45 मिनट)" : "Delivery available in 30-45 mins"}
                </p>
              )}
            </div>

            {/* Add to Cart Section */}
            <div className="mt-8 flex items-center gap-4 border-t border-gray-100 pt-6">
              <div className="flex h-14 items-center rounded-xl border-2 border-[#800020]/20 bg-white px-2">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-[#800020] hover:bg-gray-50"
                >
                  <Minus size={18} strokeWidth={3} />
                </button>
                <span className="w-10 text-center text-lg font-black text-[#800020]">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-[#800020] hover:bg-gray-50"
                >
                  <Plus size={18} strokeWidth={3} />
                </button>
              </div>
              
              <button
                onClick={handleAdd}
                className={`flex h-14 flex-1 items-center justify-center gap-2 rounded-xl text-base font-black text-white shadow-[0_10px_20px_rgba(128,0,32,0.2)] transition-all active:scale-95 ${
                  added ? "bg-[#138047]" : "bg-[#800020] hover:-translate-y-0.5 hover:bg-[#600018]"
                }`}
              >
                {added ? (
                  <><Check size={20} strokeWidth={3} /> {isHindi ? "जोड़ दिया!" : "Added!"}</>
                ) : (
                  <><ShoppingCart size={20} /> {isHindi ? "कार्ट में डालें" : "Add to Cart"}</>
                )}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl border border-gray-200 bg-white p-4">
              <div className="flex flex-col items-center text-center gap-1">
                <Truck size={24} className="text-[#D4A84F]" />
                <p className="text-[10px] font-bold text-gray-700">{isHindi ? "तेज़ डिलीवरी" : "Fast Delivery"}</p>
              </div>
              <div className="flex flex-col items-center text-center gap-1 border-x border-gray-100">
                <RotateCcw size={24} className="text-[#D4A84F]" />
                <p className="text-[10px] font-bold text-gray-700">{isHindi ? "7 दिन रिटर्न" : "7 Days Return"}</p>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <ShieldCheck size={24} className="text-[#D4A84F]" />
                <p className="text-[10px] font-bold text-gray-700">{isHindi ? "100% ओरिजिनल" : "100% Genuine"}</p>
              </div>
            </div>

            {/* Product Description */}
            <div className="mt-6">
              <h3 className="text-lg font-black text-gray-800 mb-2">{isHindi ? "प्रोडक्ट के बारे में" : "About this product"}</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {product.description || (isHindi 
                  ? "यह प्रोडक्ट राशिद मेगा मार्ट से खरीदें। हम उच्चतम गुणवत्ता और ताज़ा सामान की गारंटी देते हैं। आपकी रोज़मर्रा की ज़रूरतों के लिए एक बेहतरीन विकल्प।" 
                  : "Buy this product from Rashid Mega Mart. We guarantee the highest quality and fresh items. A perfect choice for your daily needs.")}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-8">
            <h2 className="mb-6 text-2xl font-black text-[#800020]">
              {isHindi ? "इसी कैटेगरी से और" : "More from this category"}
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {related.map((p: any) => (
                <Link
                  key={p.id}
                  href={`/products/${productSlug(p)}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-white mb-3">
                    <img
                      src={p.image}
                      alt={isHindi ? p.nameHi : p.name}
                      className="h-full w-full object-contain mix-blend-multiply transition group-hover:scale-105"
                    />
                  </div>
                  <p className="line-clamp-2 text-xs font-bold text-gray-800 leading-tight">
                    {isHindi ? p.nameHi : p.name}
                  </p>
                  <p className="mt-2 text-base font-black text-[#800020]">{money(p.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}