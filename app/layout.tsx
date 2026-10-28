import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";
import { CartProvider } from "./components/CartProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import IntroLoader from "./components/IntroLoader";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rashid Mega Mart | Ghoghar, Rewa",
  description: "Rashid Mega Mart, Ghoghar, Rewa. Ghar ke zaroori samaan aur value kits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Added data-scroll-behavior="smooth"
    <html lang="en" className={plusJakartaSans.variable} data-scroll-behavior="smooth">
      <body className={`${plusJakartaSans.className} antialiased bg-[#FFFCF0]`}>
        <LanguageProvider>
          <CartProvider>
            <IntroLoader />
            <Navbar />
            <div className="flex min-h-screen flex-col">
              {children}
            </div>
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}