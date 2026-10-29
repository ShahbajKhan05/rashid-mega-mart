// app/products/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

type Props = {
  searchParams: Promise<{ category?: string; sort?: string; q?: string }>;
};

// 🔥 generateMetadata me await theek hai (ye separate hota hai)
export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;
  const category = params.category || "all";
  const query = params.q;
  const baseUrl = "https://rashidmegamart.com";

  // Search results index nahi hone chahiye (thin content)
  if (query) {
    return {
      title: `Search: ${query}`,
      robots: { index: false, follow: true },
    };
  }

  const categoryMeta: Record<string, { title: string; description: string }> = {
    all: {
      title: "All Products - Shop Groceries Online",
      description:
        "Browse all products at Rashid Mega Mart. Shop atta, rice, dal, oil, spices, snacks and daily essentials with fast delivery in Rewa.",
    },
    staples: {
      title: "Atta, Rice & Dal - Buy Online",
      description:
        "Buy premium atta, rice, dal and staple groceries online at Rashid Mega Mart. Best prices, fast delivery in Rewa.",
    },
    oil: {
      title: "Oil & Ghee - Buy Online",
      description:
        "Shop cooking oil, ghee and dairy essentials online at Rashid Mega Mart. Fresh stock, best prices.",
    },
    masala: {
      title: "Spices & Masala - Buy Online",
      description:
        "Buy authentic Indian spices and masala online at Rashid Mega Mart. Pure, fresh and affordable.",
    },
    snacks: {
      title: "Snacks & Beverages - Buy Online",
      description:
        "Shop chips, biscuits, namkeen and beverages online at Rashid Mega Mart. Quick delivery in Rewa.",
    },
  };

  const meta = categoryMeta[category] || categoryMeta.all;

  // Canonical hamesha clean category URL - sort/filter ignore
  const canonicalUrl = `${baseUrl}/products${
    category !== "all" ? `?category=${category}` : ""
  }`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      type: "website",
    },
  };
}

// 🔥 OUTER PAGE — searchParams ko AWAIT NAHI karta, sirf promise pass karta hai
export default function ProductsPage({ searchParams }: Props) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#FFFCF0]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#800020] border-t-transparent" />
        </div>
      }
    >
      <ProductsContent searchParams={searchParams} />
    </Suspense>
  );
}

// 🔥 INNER COMPONENT — yahan await karte hain (Suspense ke andar)
async function ProductsContent({ searchParams }: Props) {
  const params = await searchParams;
  const category = params.category || "all";
  const sort = params.sort || "popular";
  const query = params.q || "";

  return <ProductsClient category={category} sort={sort} query={query} />;
}