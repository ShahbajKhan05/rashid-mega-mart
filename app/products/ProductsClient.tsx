// app/products/ProductsClient.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  products as staticProducts,
  categoryOptions,
} from "../components/data";
import ProductCard from "../components/ProductCard";
import { useLanguage } from "../components/LanguageProvider";
import { SlidersHorizontal, X, Search, PackageOpen } from "lucide-react";

type Props = {
  category?: string;
  sort?: string;
  query?: string;
};

export default function ProductsClient({
  category = "all",
  sort = "popular",
  query = "",
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const isHindi = language === "hi";

  // 🔥 SEO FIX: Initial state me static products (server HTML me render honge)
  const [allProducts, setAllProducts] = useState<any[]>(staticProducts);
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    const custom = JSON.parse(
      localStorage.getItem("rmm_custom_products") || "[]"
    );
    if (custom.length > 0) {
      setAllProducts([...custom, ...staticProducts]);
    }
  }, []);

  // Filter + Sort + Search
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Category filter
    if (category && category !== "all") {
      result = result.filter((p: any) => p.category === category);
    }

    // Search filter
    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (p: any) =>
          p.name?.toLowerCase().includes(q) ||
          p.nameHi?.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    else if (sort === "name")
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

    return result;
  }, [allProducts, category, sort, query]);

  // URL update helper (preserves category, updates sort/q)
  const updateUrl = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val) params.set(key, val);
      else params.delete(key);
    });
    router.push(`/products?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl({ q: searchInput.trim() || null });
  };

  const clearSearch = () => {
    setSearchInput("");
    updateUrl({ q: null });
  };

  // 🔥 FIX: label → en, labelHi → hi
  const currentCategory = categoryOptions.find((c) => c.id === category);
  const categoryLabel = currentCategory
    ? isHindi
      ? currentCategory.hi
      : currentCategory.en
    : isHindi
    ? "सभी उत्पाद"
    : "All Products";

  return (
    <main className="min-h-screen bg-[#FFFCF0] pb-24">
      {/* HEADER */}
      <section className="border-b border-[#800020]/10 bg-[#FFF9D8] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-black text-[#800020] sm:text-4xl">
            {query
              ? isHindi
                ? `खोज: "${query}"`
                : `Search: "${query}"`
              : categoryLabel}
          </h1>
          <p className="mt-2 text-sm text-[#76665C]">
            {filteredProducts.length}{" "}
            {isHindi ? "उत्पाद मिले" : "products found"}
          </p>
        </div>
      </section>

      {/* TOOLBAR */}
      <section className="sticky top-16 z-40 border-b border-[#800020]/10 bg-white/95 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full sm:max-w-xs"
          >
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={isHindi ? "उत्पाद खोजें..." : "Search products..."}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-9 text-sm outline-none focus:border-[#800020] focus:bg-white transition"
            />
            {searchInput && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100"
              >
                <X size={14} />
              </button>
            )}
          </form>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-[#800020]" />
            <select
              value={sort}
              onChange={(e) => updateUrl({ sort: e.target.value })}
              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-700 outline-none focus:border-[#800020] cursor-pointer"
            >
              <option value="popular">
                {isHindi ? "लोकप्रिय" : "Popular"}
              </option>
              <option value="price-low">
                {isHindi ? "कीमत: कम → ज़्यादा" : "Price: Low → High"}
              </option>
              <option value="price-high">
                {isHindi ? "कीमत: ज़्यादा → कम" : "Price: High → Low"}
              </option>
              <option value="name">
                {isHindi ? "नाम (A-Z)" : "Name (A-Z)"}
              </option>
            </select>
          </div>
        </div>
      </section>

      {/* CATEGORY PILLS */}
      <section className="border-b border-[#800020]/5 bg-white px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {categoryOptions.map((cat) => (
            <Link
              key={cat.id}
              href={`/products${cat.id !== "all" ? `?category=${cat.id}` : ""}`}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                category === cat.id
                  ? "bg-[#800020] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {/* 🔥 FIX: labelHi → hi, label → en */}
              {isHindi ? cat.hi : cat.en}
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#800020]/5">
              <PackageOpen size={48} className="text-[#800020]/40" />
            </div>
            <h2 className="text-xl font-black text-[#800020]">
              {isHindi ? "कोई उत्पाद नहीं मिला" : "No products found"}
            </h2>
            <p className="mt-2 max-w-sm text-sm text-gray-500">
              {isHindi
                ? "अपनी खोज बदलें या दूसरी श्रेणी आज़माएं।"
                : "Try changing your search or explore another category."}
            </p>
            <Link
              href="/products"
              className="mt-6 rounded-xl bg-[#800020] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#600018] transition"
            >
              {isHindi ? "सभी उत्पाद देखें" : "View All Products"}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
            {filteredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}