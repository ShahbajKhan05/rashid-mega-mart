import { Metadata } from "next";
import CartClient from "./CartClient";

// 🔥 SEO Metadata: Google isko index nahi karega
export const metadata: Metadata = {
  title: "Your Cart | Rashid Mega Mart",
  description: "View items in your cart and proceed to checkout at Rashid Mega Mart.",
  robots: {
    index: false, // Google is page ko search me nahi dikhayega
    follow: true,
  },
};

export default function CartPage() {
  return <CartClient />;
}