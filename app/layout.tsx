import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";
import { CartProvider } from "./components/CartProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rashid-mega-mart.vercel.app"),
  title: {
    default: "Rashid Mega Mart | Best Grocery Store in Ghoghar, Rewa",
    template: "%s | Rashid Mega Mart",
  },
  description:
    "Rashid Mega Mart is your trusted neighbourhood grocery store in Ghoghar, Rewa. Order atta, rice, dal, oil, snacks, and daily essentials online with fast delivery.",
  keywords: [
    "Rashid Mega Mart",
    "Grocery store Rewa",
    "Kirana store Ghoghar",
    "Online grocery Rewa",
    "Daily essentials home delivery",
    "Atta Dal Oil online",
  ],
  authors: [{ name: "Rashid Mega Mart" }],
  creator: "Rashid Mega Mart",
  publisher: "Rashid Mega Mart",
  formatDetection: { email: false, address: false, telephone: false },

  // 🔥 GSC verification (Search Console se token leke daalo)
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN_HERE",
  },

  openGraph: {
    title: "Rashid Mega Mart | Your Daily Needs, Our Priority",
    description:
      "Order groceries, household items, and value kits online from Rashid Mega Mart. Fast delivery in Rewa.",
    url: "https://rashid-mega-mart.vercel.app",
    siteName: "Rashid Mega Mart",
    images: [
      {
        // 🔥 YAHAN POORA URL DAALA HAI
        url: "https://rashid-mega-mart.vercel.app/opengraph-image", 
        width: 1200,
        height: 630,
        alt: "Rashid Mega Mart Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rashid Mega Mart | Best Grocery Store in Rewa",
    description: "Order daily essentials and get them delivered fast.",
    // 🔥 YAHAN BHI POORA URL DAALA HAI
    images: ["https://rashid-mega-mart.vercel.app/opengraph-image"], 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/Logo.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GroceryStore",
  name: "Rashid Mega Mart",
  image: "https://rashidmegamart.com/Logo.png",
  "@id": "https://rashidmegamart.com",
  url: "https://rashidmegamart.com",
  telephone: "+918962531603",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ghoghar",
    addressLocality: "Rewa",
    addressRegion: "Madhya Pradesh",
    postalCode: "486001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 24.5362,
    longitude: 81.3037,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "07:00",
    closes: "22:00",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={plusJakartaSans.variable}
      data-scroll-behavior="smooth"
    >
      <body className={`${plusJakartaSans.className} antialiased bg-[#FFFCF0]`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          <CartProvider>
            <Navbar />
            <main className="flex min-h-screen flex-col">{children}</main>
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}