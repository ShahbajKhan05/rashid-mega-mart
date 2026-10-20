import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";


const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rashid Mega Mart | Ghoghar, Rewa",
  description:
    "Rashid Mega Mart, Ghoghar, Rewa, Madhya Pradesh. Ghar ke zaroori samaan aur value kits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="antialiased">
        <LanguageProvider>
          {children}
          
        </LanguageProvider>
      </body>
    </html>
  );
}