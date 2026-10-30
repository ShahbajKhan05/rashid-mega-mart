"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "../components/LanguageProvider";
import { 
  User, LogOut, Package, MapPin, ChevronRight, Settings, 
  Heart, Truck, Ticket, Bell, ShieldCheck, X, Save, Star, Gift 
} from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [savedAddress, setSavedAddress] = useState({ address: "", pincode: "" });

  // Notifications State
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);

  useEffect(() => {
    // 🔥 1. CHECK IF USER IS BLOCKED
    const savedUser = localStorage.getItem("rmm_user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      const loyaltyCustomers = JSON.parse(localStorage.getItem("rmm_loyalty_customers") || "[]");
      const currentLoyaltyUser = loyaltyCustomers.find((c: any) => c.phone === userData.mobile);

      // Agar block hai to bahar nikal do
      if (currentLoyaltyUser && currentLoyaltyUser.active === false) {
        alert(isHindi 
          ? "आपका अकाउंट ब्लॉक कर दिया गया है।" 
          : "Your account has been blocked by the admin."
        );
        localStorage.removeItem("rmm_user");
        localStorage.removeItem("rmm_loyalty_logged_in");
        window.location.href = "/";
        return;
      }
    }

    // 2. Normal Login Check
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoading(false);
    } else {
      router.push("/login");
    }
    
    // 3. Load Address
    const addressData = localStorage.getItem("rmm_saved_address");
    if (addressData) {
      try {
        setSavedAddress(JSON.parse(addressData));
      } catch (e) {}
    }

    // 4. Generate Notifications
    const allOrders = JSON.parse(localStorage.getItem("rmm_orders") || "[]");
    const generatedNotifications: any[] = [];

    allOrders.forEach((order: any) => {
      if (order.status === "out-for-delivery") {
        generatedNotifications.push({
          id: `${order.id}-out`,
          title: isHindi ? "ऑर्डर रास्ते में है!" : "Order Out for Delivery!",
          message: isHindi ? `आपका ऑर्डर ${order.id} रास्ते में है।` : `Your order ${order.id} is on the way.`,
          date: order.date,
          type: "delivery"
        });
      } else if (order.status === "delivered") {
        generatedNotifications.push({
          id: `${order.id}-del`,
          title: isHindi ? "ऑर्डर डिलीवर हो गया" : "Order Delivered",
          message: isHindi ? `आपका ऑर्डर ${order.id} सफलतापूर्वक पहुंच गया है।` : `Your order ${order.id} has been delivered.`,
          date: order.date,
          type: "delivered"
        });
      }
    });

    setNotifications(generatedNotifications);
  }, [router, isHindi]);

  // Permanent Delete / Logout
  const handleLogout = () => {
    const confirmDelete = window.confirm(
      isHindi 
        ? "क्या आप वाकई अपना अकाउंट डिलीट करना चाहते हैं? आपका सारा डेटा (ऑर्डर्स, पॉइंट्स, कार्ट) हमेशा के लिए मिट जाएगा।" 
        : "Are you sure you want to delete your account? All your data will be lost permanently."
    );

    if (!confirmDelete) return;

    if (typeof window !== "undefined") {
      const keysToRemove = [
        "rmm_user",
        "rmm_cart",
        "rmm_saved_address",
        "rmm_loyalty_logged_in",
        "rmm_notifications",
        "rmm_wishlist"
      ];
      keysToRemove.forEach(key => localStorage.removeItem(key));

      if (user && user.mobile) {
        const allCustomers = JSON.parse(localStorage.getItem("rmm_loyalty_customers") || "[]");
        const updatedCustomers = allCustomers.filter((c: any) => c.phone !== user.mobile);
        localStorage.setItem("rmm_loyalty_customers", JSON.stringify(updatedCustomers));
      }
    }

    window.location.href = "/";
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("rmm_saved_address", JSON.stringify(savedAddress));
    setIsAddressModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF9D8]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#800020] border-t-transparent"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FFF9D8] pb-24 px-4 pt-6">
      <div className="mx-auto max-w-3xl">
        
        {/* Profile Header */}
        <div className="bg-[#800020] rounded-[32px] p-6 sm:p-8 relative overflow-hidden shadow-xl mb-6">
          <div className="absolute top-0 right-0 opacity-10 text-[150px] leading-none translate-x-4 -translate-y-4">👤</div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#800020] text-3xl font-black shadow-lg">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-black">{user.name || (isHindi ? "ग्राहक" : "Valued Customer")}</h1>
              <p className="text-sm font-medium text-white/80 mt-1">+91 {user.mobile}</p>
            </div>
          </div>
        </div>

        {/* Menu Links */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
          
          <Link href="/account/orders" className="flex items-center justify-between p-4 hover:bg-gray-50 transition">
            <div className="flex items-center gap-4">
              <Package size={22} className="text-gray-500" />
              <span className="text-sm font-bold text-gray-800">{isHindi ? "मेरे ऑर्डर्स" : "Orders"}</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </Link>

          <Link href="/account/coupons" className="flex items-center justify-between p-4 hover:bg-gray-50 transition">
            <div className="flex items-center gap-4">
              <Ticket size={22} className="text-gray-500" />
              <span className="text-sm font-bold text-gray-800">{isHindi ? "मेरे कूपन्स" : "My Coupons"}</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </Link>

          <Link href="/loyalty" className="flex items-center justify-between p-4 hover:bg-gray-50 transition">
            <div className="flex items-center gap-4">
              <Star size={22} className="text-gray-500" />
              <span className="text-sm font-bold text-gray-800">{isHindi ? "मेरे रिवॉर्ड्स" : "My Rewards"}</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </Link>

          <Link href="/wishlist" className="flex items-center justify-between p-4 hover:bg-gray-50 transition">
            <div className="flex items-center gap-4">
              <Heart size={22} className="text-gray-500" />
              <span className="text-sm font-bold text-gray-800">{isHindi ? "मेरी विशलिस्ट" : "Wishlist"}</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </Link>

          <Link href="/order-tracking" className="flex items-center justify-between p-4 hover:bg-gray-50 transition">
            <div className="flex items-center gap-4">
              <Truck size={22} className="text-gray-500" />
              <span className="text-sm font-bold text-gray-800">{isHindi ? "ऑर्डर ट्रैक करें" : "Track Order"}</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </Link>

          <button 
            onClick={() => setIsAddressModalOpen(true)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition text-left"
          >
            <div className="flex items-center gap-4">
              <MapPin size={22} className="text-gray-500" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800">{isHindi ? "सेव किया गया पता" : "Saved Addresses"}</span>
                {savedAddress.address && (
                  <span className="text-[10px] text-gray-500 truncate max-w-[200px]">{savedAddress.address}</span>
                )}
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button onClick={() => setIsNotifModalOpen(true)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition text-left">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell size={22} className="text-gray-500" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 border-2 border-white"></span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800">{isHindi ? "नोटिफिकेशन" : "Notifications"}</span>
                {notifications.length > 0 && (
                  <span className="text-[10px] text-[#800020] font-bold">{notifications.length} {isHindi ? "नए अपडेट्स" : "new updates"}</span>
                )}
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <Link href="/account/settings" className="flex items-center justify-between p-4 hover:bg-gray-50 transition">
            <div className="flex items-center gap-4">
              <Settings size={22} className="text-gray-500" />
              <span className="text-sm font-bold text-gray-800">{isHindi ? "सेटिंग्स" : "Settings"}</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </Link>

          <button onClick={handleLogout} className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition text-left">
            <div className="flex items-center gap-4">
              <LogOut size={22} className="text-red-500" />
              <span className="text-sm font-bold text-red-600">{isHindi ? "लॉगआउट / अकाउंट डिलीट" : "Logout / Delete Account"}</span>
            </div>
          </button>

        </div>

      </div>

      {/* ADDRESS MODAL */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setIsAddressModalOpen(false)}>
          <div 
            className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 bg-[#FFF9D8] p-5">
              <h3 className="text-lg font-black text-[#800020] flex items-center gap-2">
                <MapPin size={18} /> {isHindi ? "डिलीवरी का पता" : "Delivery Address"}
              </h3>
              <button onClick={() => setIsAddressModalOpen(false)} className="rounded-full bg-white p-1.5 text-gray-500 hover:text-[#800020] shadow-sm">
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleSaveAddress} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">{isHindi ? "पूरा पता" : "Full Address"}</label>
                <textarea
                  required
                  rows={3}
                  value={savedAddress.address}
                  onChange={(e) => setSavedAddress({...savedAddress, address: e.target.value})}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#800020] focus:bg-white transition resize-none"
                  placeholder={isHindi ? "मकान नंबर, गली, इलाका" : "House No, Street, Area"}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">{isHindi ? "पिनकोड" : "Pincode"}</label>
                <input
                  required
                  type="text"
                  maxLength={6}
                  value={savedAddress.pincode}
                  onChange={(e) => setSavedAddress({...savedAddress, pincode: e.target.value.replace(/\D/g,'')})}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#800020] focus:bg-white transition"
                  placeholder="486001"
                />
              </div>
              
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#800020] py-3.5 text-sm font-black text-white shadow-lg transition hover:bg-[#600018] active:scale-95 mt-2">
                <Save size={18} /> {isHindi ? "पता सेव करें" : "Save Address"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* NOTIFICATIONS MODAL */}
      {isNotifModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setIsNotifModalOpen(false)}>
          <div 
            className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 bg-[#FFF9D8] p-5">
              <h3 className="text-lg font-black text-[#800020] flex items-center gap-2">
                <Bell size={18} /> {isHindi ? "नोटिफिकेशन" : "Notifications"}
              </h3>
              <button onClick={() => setIsNotifModalOpen(false)} className="rounded-full bg-white p-1.5 text-gray-500 hover:text-[#800020] shadow-sm">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-5 max-h-[60vh] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
                    <Bell size={32} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-bold text-gray-500">{isHindi ? "अभी कोई नोटिफिकेशन नहीं है।" : "No notifications yet."}</p>
                  <p className="text-xs text-gray-400 mt-1">{isHindi ? "जब आपका ऑर्डर अपडेट होगा, तो यहाँ सूचना मिलेगी।" : "You'll be notified here when your order updates."}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div key={notif.id} className={`rounded-xl p-4 border ${notif.type === 'delivered' ? 'bg-green-50 border-green-100' : 'bg-amber-50 border-amber-100'}`}>
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${notif.type === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                          {notif.type === 'delivered' ? <Package size={16} /> : <Truck size={16} />}
                        </div>
                        <div>
                          <p className={`text-sm font-black ${notif.type === 'delivered' ? 'text-green-800' : 'text-amber-800'}`}>{notif.title}</p>
                          <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                          <p className="text-[10px] font-bold text-gray-400 mt-2">{notif.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}