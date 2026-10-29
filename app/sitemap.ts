import { MetadataRoute } from "next";
import { products, categoryOptions } from "./components/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rashidmegamart.com";

  // 1. Static Pages (❌ /login hataya - robots disallow karta hai)
  const routes = ["", "/products", "/about", "/loyalty", "/policies"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1.0 : route === "/products" ? 0.9 : 0.7,
    })
  );

  // 2. Category Pages
  const categoryRoutes = categoryOptions
    .filter((c) => c.id !== "all")
    .map((cat) => ({
      url: `${baseUrl}/products?category=${cat.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  // 3. Product Pages
  const productRoutes = products.map((product: any) => ({
    url: `${baseUrl}/products/${product.slug || product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...routes, ...categoryRoutes, ...productRoutes];
}