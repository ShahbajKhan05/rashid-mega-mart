// app/loyalty/staff/layout.tsx
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Staff POS | Rashid Mega Mart",
  description: "Internal Staff Point of Sale system.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#800020",
};

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  // POS apne aap ko public site se isolate rakhega (fixed full screen)
  return (
    <div className="fixed inset-0 z-[999] h-screen w-screen bg-gray-50 overflow-hidden">
      {children}
    </div>
  );
}