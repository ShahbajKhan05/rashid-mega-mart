import { Metadata } from "next";
import CheckoutClient from "./CheckoutClient";

// 🔥 SEO Metadata: Google isko index nahi karega
export const metadata: Metadata = {
  title: "Checkout | Rashid Mega Mart",
  description: "Complete your order at Rashid Mega Mart.",
  robots: {
    index: false, // Checkout page search me nahi aayega
    follow: false,
  },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}