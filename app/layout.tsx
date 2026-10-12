
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rashid Mega Mart | Coming Soon",
  description:
    "Something exciting is coming soon to Rashid Mega Mart, Rewa, Madhya Pradesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
