import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/account/",
          "/checkout/",
          "/cart/",
          "/login",
          "/loyalty/staff",
          "/api/",
          "/*?*sort=",   // 🔥 Sort/filter crawling waste rokne ke liye
          "/*?*filter=",
        ],
      },
      // 🔥 AI crawlers ko allow karo (AI search me dikhne ke liye)
      {
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"],
        allow: ["/"],
        disallow: ["/cart/", "/checkout/", "/account/", "/login"],
      },
    ],
    sitemap: "https://rashidmegamart.com/sitemap.xml",
    host: "https://rashidmegamart.com",
  };
}