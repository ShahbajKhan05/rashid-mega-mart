// app/page.tsx
import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Rashid Mega Mart | Best Grocery Store in Ghoghar, Rewa",
  description:
    "Shop groceries, household items, and daily essentials online at Rashid Mega Mart, Ghoghar, Rewa. Order atta, rice, dal, oil, snacks with fast home delivery.",
  alternates: {
    canonical: "https://rashidmegamart.com", // 🔥 Homepage canonical
  },
  openGraph: {
    title: "Rashid Mega Mart | Your Daily Needs, Our Priority",
    description:
      "Order groceries, household items and value kits online. Fast delivery in Rewa.",
    url: "https://rashidmegamart.com",
    siteName: "Rashid Mega Mart",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "Rashid Mega Mart",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

// 🔥 Homepage JSON-LD (WebSite + SearchAction)
// Ye Google ko batata hai ki site pe search kaise kare
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Rashid Mega Mart",
  url: "https://rashidmegamart.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://rashidmegamart.com/products?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HomeClient />
    </>
  );
}