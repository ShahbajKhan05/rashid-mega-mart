"use client";

import Link from "next/link";
import Image from "next/image"; // 🔥 Next Image import kiya
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useCart } from "./CartProvider";
import { useLanguage } from "./LanguageProvider";

interface ProductCardProps {
  product: any;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: any) => void;
}

export default function ProductCard({ product, isWishlisted, onToggleWishlist }: ProductCardProps) {
  const { addToCart } = useCart();
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const originalPrice = Math.round(product.originalPrice || (product.price * 1.25));
  const sellingPrice = Math.round(product.price);
  const discountPercent = Math.max(0, Math.round(((originalPrice - sellingPrice) / originalPrice) * 100));
  const saving = originalPrice - sellingPrice;
  const rating = product.rating ?? 4.2;
  const href = `/products/${product.slug || product.id}`;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <div className="absolute left-0 top-2 z-10 rounded-r-md bg-gradient-to-r from-[#C28E2B] to-[#E8B04B] px-2 py-0.5 text-[10px] font-black text-white shadow-sm">
          {discountPercent}% OFF
        </div>
      )}

      {/* Wishlist Heart Button */}
      {onToggleWishlist && (
        <button 
          onClick={(e) => { e.preventDefault(); onToggleWishlist(product); }}
          className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition hover:scale-110"
        >
          <Heart size={14} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"} />
        </button>
      )}

      {/* Product Image (Next/Image for SEO & Speed) */}
      <Link href={href} className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-[#F8F8F8]">
        <Image 
          src={product.image} 
          alt={isHindi ? product.nameHi : product.name} 
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-2 mix-blend-multiply transition-transform duration-500 group-hover:scale-105" 
        />
      </Link>

      {/* Product Details */}
      <div className="mt-2 flex flex-1 flex-col px-1">
        <div className="mb-1 flex items-center">
          <span className="flex items-center gap-0.5 rounded bg-[#138047] px-1.5 py-0.5 text-[10px] font-bold text-white">
            {rating} <Star size={8} fill="currentColor" />
          </span>
        </div>

        <Link href={href} className="text-xs font-bold leading-tight text-gray-800 line-clamp-2 hover:text-[#800020]">
          {isHindi ? product.nameHi : product.name}
        </Link>

        <div className="mt-2">
          <div className="flex items-baseline gap-1.5">
            <p className="text-base font-black text-[#800020]">₹{sellingPrice}</p>
            <p className="text-xs font-medium text-gray-400 line-through">₹{originalPrice}</p>
          </div>
          <p className="text-[10px] font-bold text-[#138047] mt-0.5">{isHindi ? `₹${saving} बचाएं` : `Save ₹${saving}`}</p>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-2.5">
          <button 
            onClick={() => addToCart(product, 1)}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#800020]/20 bg-white py-1.5 text-xs font-black text-[#800020] transition hover:bg-[#800020] hover:text-white active:scale-95"
          >
            <ShoppingCart size={12} strokeWidth={3} /> {isHindi ? "जोड़ें" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}