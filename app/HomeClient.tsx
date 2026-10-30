// app/HomeClient.tsx
"use client";

import { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import BrandMarquee from "./components/BrandMarquee";
import Categories from "./components/Categories";
import KitBuilder from "./components/KitBuilder";
import ProductCard from "./components/ProductCard";
import IntroLoader from "./components/IntroLoader"; // 🔥 1. LOADER YAHAN IMPORT KIYA
import { products as staticProducts } from "./components/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeClient() {
  // 🔥 Initial state me static products - Google bots ko render hone par milenge
  const [bestSellers, setBestSellers] = useState<any[]>(
    staticProducts.slice(0, 8)
  );

  useEffect(() => {
    const customProducts = JSON.parse(
      localStorage.getItem("rmm_custom_products") || "[]"
    );
    if (customProducts.length > 0) {
      const all = [...customProducts, ...staticProducts];
      setBestSellers(all.slice(0, 8));
    }
  }, []);

  return (
    <>
      {/* 🔥 2. LOADER SIRF HOME PAGE PAR DIKHEGA */}
      <IntroLoader />

      <main>
        <HeroSection />
        <BrandMarquee />
        <Categories />

        {/* BEST SELLERS SECTION */}
        <section className="bg-[#FFF9D8] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A47A2C] sm:text-xs">
                  Handpicked for you
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-[#800020] sm:text-4xl">
                  Best Sellers
                </h2>
              </div>
              <Link
                href="/products"
                className="hidden sm:flex items-center gap-1 text-sm font-bold text-[#800020] hover:underline"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-8 flex justify-center sm:hidden">
              <Link
                href="/products"
                className="flex items-center gap-1 rounded-xl bg-[#800020] px-6 py-3 text-sm font-bold text-white shadow-md"
              >
                View All Products <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <KitBuilder />
      </main>
    </>
  );
}