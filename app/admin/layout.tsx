// app/admin/layout.tsx
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Rashid Mega Mart",
  description: "Owner panel to manage store, products, staff and orders.",
  robots: { index: false, follow: false }, // Google par show nahi hoga
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#800020",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Admin panel apne aap ko public site (navbar/footer) se isolate rakhega
  return (
    <div className="fixed inset-0 z-[999] h-screen w-screen bg-[#FFF9D8] overflow-y-auto">
      {children}
    </div>
  );
}