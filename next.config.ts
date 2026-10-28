import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "anandoo.in" },
      { protocol: "https", hostname: "www.indiantelevision.com" },
      { protocol: "https", hostname: "www.tataconsumer.com" },
      { protocol: "https", hostname: "cdn.tasteatlas.com" },
      { protocol: "https", hostname: "www.agnifoods.co.uk" },
      { protocol: "https", hostname: "suneethafoods.com" },
      { protocol: "https", hostname: "logowik.com" },
      { protocol: "https", hostname: "www.pngkey.com" },
      { protocol: "https", hostname: "toppng.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;