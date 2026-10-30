// app/checkout/CheckoutClient.tsx
"use client";

import { useState, useEffect } from "react";
import { useCart } from "../components/CartProvider"; 
import { useLanguage } from "../components/LanguageProvider"; 
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, MapPin, Ticket, X, ShieldCheck, Printer } from "lucide-react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";

export default function CheckoutClient() {
  const { cartItems, cartTotal, removeFromCart } = useCart();
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const router = useRouter();
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState(""); 
  const [placedOrder, setPlacedOrder] = useState<any>(null);

  const [formData, setFormData] = useState({ name: "", phone: "", address: "", pincode: "" });

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  useEffect(() => {
    const savedAddress = localStorage.getItem("rmm_saved_address");
    const user = localStorage.getItem("rmm_user");
    
    if (savedAddress) {
      const parsed = JSON.parse(savedAddress);
      setFormData(prev => ({ ...prev, address: parsed.address, pincode: parsed.pincode }));
    }
    if (user) {
      const parsedUser = JSON.parse(user);
      setFormData(prev => ({ ...prev, name: parsedUser.name || "", phone: parsedUser.mobile || "" }));
    }

    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cartItems.length, router]);

  const deliveryFee = cartTotal > 499 ? 0 : 40;
  const finalTotal = Math.max(0, cartTotal + deliveryFee - couponDiscount);

  const handleApplyCoupon = () => {
    setCouponError("");
    if (!couponInput.trim()) return;
    const allCoupons = JSON.parse(localStorage.getItem("rmm_coupons") || "{}");
    const isValid = Object.values(allCoupons).includes(couponInput.trim().toUpperCase());

    if (isValid) {
      setAppliedCoupon(couponInput.trim().toUpperCase());
      setCouponDiscount(75); 
      setCouponError("");
    } else {
      setCouponError(isHindi ? "गलत कूपन कोड!" : "Invalid Coupon Code.");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponInput("");
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `WEB-${Math.floor(100000 + Math.random() * 900000)}`; // WEB Prefix
    const orderDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    
    const orderLines = [
      isHindi ? "नमस्ते राशिद मेगा मार्ट, मेरा नया ऑनलाइन ऑर्डर:" : "Hello Rashid Mega Mart, my new ONLINE order:",
      "",
      `🆔 ${isHindi ? "ऑर्डर आईडी" : "Order ID"}: ${orderId}`,
      `👤 ${isHindi ? "नाम" : "Name"}: ${formData.name}`,
      `📞 ${isHindi ? "फोन" : "Phone"}: ${formData.phone}`,
      `📍 ${isHindi ? "पता" : "Address"}: ${formData.address}, ${formData.pincode}`,
      "",
      isHindi ? "ऑर्डर डिटेल्स:" : "Order Details:",
      ...cartItems.map((item) => `🛒 ${isHindi ? item.nameHi : item.name} × ${item.quantity} = ₹${item.price * item.quantity}`),
      "",
      `💰 ${isHindi ? "सबटोटल" : "Subtotal"}: ₹${cartTotal}`,
      appliedCoupon ? `🎟️ ${isHindi ? "कूपन" : "Coupon"} (${appliedCoupon}): -₹${couponDiscount}` : "",
      `🚚 ${isHindi ? "डिलीवरी" : "Delivery"}: ${deliveryFee === 0 ? (isHindi ? "मुफ्त" : "FREE") : `₹${deliveryFee}`}`,
      `💵 ${isHindi ? "कुल बिल" : "Total Bill"}: ₹${finalTotal}`,
      "",
      isHindi ? "कृपया मेरा ऑर्डर कन्फर्म करें। धन्यवाद!" : "Please confirm my order. Thank you!"
    ].filter(Boolean);

    const whatsappUrl = `https://wa.me/918962531603?text=${encodeURIComponent(orderLines.join("\n"))}`;
    
    // 🔥 1. ORDER OBJECT ME SOURCE ADD KIYA
    const newOrder = {
      id: orderId,
      date: orderDate,
      items: cartItems.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
      total: finalTotal,
      couponUsed: appliedCoupon,
      customer: formData,
      customerPhone: formData.phone, // Staff POS ke liye
      status: "Pending",             // Pending status taaki admin track kar sake
      source: "Website"              // Online order tag
    };

    // 2. Website Orders me save karo
    const existingWebOrders = JSON.parse(localStorage.getItem("rmm_website_orders") || "[]");
    localStorage.setItem("rmm_website_orders", JSON.stringify([newOrder, ...existingWebOrders]));

    // 🔥 3. LIVE ALERT SAVE KARO (Staff & Admin Notification ke liye)
    const newAlert = {
      id: orderId,
      message: `New Online Order of ₹${finalTotal} by ${formData.name}`,
      time: new Date().toLocaleTimeString(),
      isRead: false
    };
    const existingAlerts = JSON.parse(localStorage.getItem("rmm_order_alerts") || "[]");
    localStorage.setItem("rmm_order_alerts", JSON.stringify([newAlert, ...existingAlerts]));

    // 4. Coupon Remove Logic
    if (appliedCoupon) {
      const allCoupons = JSON.parse(localStorage.getItem("rmm_coupons") || "{}");
      const entry = Object.entries(allCoupons).find(([_, code]) => code === appliedCoupon);
      if (entry) {
        delete allCoupons[entry[0]];
        localStorage.setItem("rmm_coupons", JSON.stringify(allCoupons));
      }
    }

    window.open(whatsappUrl, "_blank");
    
    setPlacedOrderId(orderId);
    setPlacedOrder(newOrder);
    cartItems.forEach(item => removeFromCart(item.id));
    setIsSuccess(true);

    try {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#800020', '#D4A84F', '#138047'] });
    } catch (error) {}
  };

  const handlePrintReceipt = () => {
    if (!placedOrder) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const { id, date, items, total, customer, couponUsed } = placedOrder;
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const delivery = total - subtotal + (couponUsed ? 75 : 0); 
    const discount = couponUsed ? 75 : 0;

    const itemsHtml = items.map((item: any, index: number) => `
      <tr>
        <td style="padding: 8px 4px; border-bottom: 1px dashed #ddd; text-align: center; color: #555;">${index + 1}</td>
        <td style="padding: 8px 4px; border-bottom: 1px dashed #ddd; font-weight: 600; color: #333;">${item.name}</td>
        <td style="padding: 8px 4px; border-bottom: 1px dashed #ddd; text-align: center; font-weight: 600;">${item.quantity}</td>
        <td style="padding: 8px 4px; border-bottom: 1px dashed #ddd; text-align: right;">₹${item.price}</td>
        <td style="padding: 8px 4px; border-bottom: 1px dashed #ddd; text-align: right; font-weight: 700; color: #800020;">₹${item.price * item.quantity}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt - ${id}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Courier+Prime:wght@400;700&display=swap');
            body { font-family: 'Courier Prime', monospace; max-width: 320px; margin: 0 auto; padding: 20px; color: #000; background: #fff; }
            .center { text-align: center; }
            .title { font-family: 'Inter', sans-serif; font-size: 22px; font-weight: 800; margin-bottom: 2px; letter-spacing: -1px; }
            .sub { font-size: 11px; color: #555; }
            .dashed { border-bottom: 1px dashed #333; margin: 12px 0; }
            .row { display: flex; justify-content: space-between; margin: 4px 0; font-size: 12px; }
            .bold { font-weight: bold; }
            .table-header { display: flex; justify-content: space-between; font-weight: bold; font-size: 12px; margin-bottom: 5px; }
            .total-box { background: #f9f9f9; padding: 10px; border: 1px dashed #333; margin-top: 10px; border-radius: 4px; }
            .footer { font-size: 10px; text-align: center; margin-top: 20px; color: #555; }
          </style>
        </head>
        <body onload="window.print()">
          
          <div class="center">
            <div class="title">RASHID MEGA MART</div>
            <div class="sub">Ghoghar, Rewa, MP - 486001</div>
            <div class="sub">Ph: +91 89625 31603</div>
          </div>

          <div class="dashed"></div>

          <div class="row"><span>Order ID:</span><span class="bold">${id}</span></div>
          <div class="row"><span>Date:</span><span>${date}</span></div>
          <div class="row"><span>Customer:</span><span>${customer?.name || "Guest"}</span></div>
          <div class="row"><span>Mobile:</span><span>${customer?.phone || "-"}</span></div>
          <div class="row"><span>Address:</span><span style="text-align:right; max-width: 60%;">${customer?.address || "-"}</span></div>

          <div class="dashed"></div>

          <div class="table-header">
            <span style="width: 15%; text-align: center;">#</span>
            <span style="width: 50%;">Item</span>
            <span style="width: 10%; text-align: center;">Qty</span>
            <span style="width: 25%; text-align: right;">Amount</span>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
            <tbody>${itemsHtml}</tbody>
          </table>

          <div class="dashed"></div>

          <div class="total-box">
            <div class="row"><span>Subtotal:</span><span>₹${subtotal}</span></div>
            ${discount > 0 ? `<div class="row" style="color: #138047;"><span>Coupon Discount:</span><span>- ₹${discount}</span></div>` : ""}
            <div class="row"><span>Delivery:</span><span>${delivery <= 0 ? "FREE" : `₹${delivery}`}</span></div>
            <div class="row bold" style="font-size: 16px; margin-top: 5px; padding-top: 5px; border-top: 1px solid #ddd;">
              <span>Grand Total:</span><span style="color: #800020;">₹${total}</span>
            </div>
          </div>

          <div class="footer">
            Thank you for shopping with us!<br/>
            <strong>Smart Saver Club</strong><br/>
            * This is a computer generated receipt.
          </div>

        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        <motion.div 
          initial={{ scale: 0, rotate: -180 }} 
          animate={{ scale: 1, rotate: 0 }} 
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 mb-6 shadow-xl"
        >
          <CheckCircle2 size={50} className="text-green-600" />
        </motion.div>
        <h1 className="text-3xl font-black text-[#800020]">{isHindi ? "ऑर्डर सफल!" : "Order Placed!"}</h1>
        <p className="mt-2 text-sm font-medium text-gray-500 max-w-md">
          {isHindi 
            ? "आपका ऑर्डर WhatsApp पर भेज दिया गया है। दुकान जल्द ही आपसे संपर्क करेगी।" 
            : "Your order has been sent to WhatsApp. The store will contact you shortly."}
        </p>

        <div className="mt-4 rounded-xl bg-gray-50 border border-gray-200 px-4 py-2">
          <p className="text-xs font-bold text-gray-500">{isHindi ? "आपकी ऑर्डर आईडी" : "Your Order ID"}</p>
          <p className="text-lg font-mono font-black text-[#800020]">{placedOrderId}</p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
          <button 
            onClick={handlePrintReceipt} 
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white border-2 border-[#800020]/20 px-6 py-3 text-sm font-black text-[#800020] shadow-sm hover:bg-[#800020]/5 transition"
          >
            <Printer size={18} /> {isHindi ? "रसीद डाउनलोड करें" : "Download Receipt"}
          </button>
          
          <button 
            onClick={() => router.push("/account/orders")} 
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#800020] px-6 py-3 text-sm font-black text-white shadow-lg hover:bg-[#600018] transition"
          >
            {isHindi ? "मेरे ऑर्डर्स" : "View My Orders"}
          </button>
        </div>
        
        <button 
          onClick={() => router.push("/")} 
          className="mt-4 text-xs font-bold text-gray-500 hover:text-[#800020] underline"
        >
          {isHindi ? "होम पर जाएं" : "Back to Home"}
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <button onClick={() => router.back()} className="mb-6 flex items-center gap-2 text-sm font-bold text-[#800020] hover:underline">
        <ArrowLeft size={16} /> {isHindi ? "कार्ट पर वापस" : "Back to Cart"}
      </button>

      <form onSubmit={handlePlaceOrder} className="space-y-6">
        
        {/* Delivery Address Section */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider mb-2 flex items-center gap-2">
            <MapPin size={16} className="text-[#800020]" /> {isHindi ? "डिलीवरी का पता" : "Delivery Address"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">{isHindi ? "पूरा नाम" : "Full Name"}</label>
              <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#800020] focus:bg-white transition" placeholder="Rashid Khan" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">{isHindi ? "मोबाइल नंबर" : "Mobile Number"}</label>
              <input required type="tel" maxLength={10} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g,'')})} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#800020] focus:bg-white transition" placeholder="9876543210" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">{isHindi ? "पूरा पता" : "Full Address"}</label>
            <textarea required rows={2} value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#800020] focus:bg-white transition resize-none" placeholder="House No, Street, Area" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">{isHindi ? "पिनकोड" : "Pincode"}</label>
            <input required type="text" maxLength={6} value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value.replace(/\D/g,'')})} className="w-full max-w-[200px] rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-[#800020] focus:bg-white transition" placeholder="486001" />
          </div>
        </div>

        {/* Order Summary & Coupon Section */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
          <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider mb-4">{isHindi ? "ऑर्डर समरी" : "Order Summary"}</h2>
          
          <div className="mb-6 border-b border-gray-100 pb-4">
            {!appliedCoupon ? (
              <>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Ticket size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder={isHindi ? "कूपन कोड डालें..." : "Have a loyalty coupon?"}
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-3 py-2.5 text-sm font-mono font-bold uppercase outline-none focus:border-[#800020] focus:bg-white transition"
                    />
                  </div>
                  <button type="button" onClick={handleApplyCoupon} className="rounded-xl bg-gray-800 px-4 text-xs font-bold text-white hover:bg-black transition">{isHindi ? "लगाएं" : "Apply"}</button>
                </div>
                {couponError && <p className="text-[10px] font-bold text-red-500 mt-1.5 ml-1">{couponError}</p>}
              </>
            ) : (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center justify-between rounded-xl border-2 border-[#138047] bg-gradient-to-r from-[#138047] to-[#0D6837] p-3 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#138047]"><CheckCircle2 size={18} strokeWidth={3} /></div>
                  <div>
                    <p className="text-sm font-black text-white tracking-widest">{appliedCoupon}</p>
                    <p className="text-[10px] font-bold text-white/80">₹75 {isHindi ? "डिस्काउंट लागू" : "Discount Applied"}!</p>
                  </div>
                </div>
                <button type="button" onClick={handleRemoveCoupon} className="rounded-full bg-white/20 p-1.5 text-white hover:bg-white/30 transition"><X size={14} /></button>
              </motion.div>
            )}
          </div>

          <div className="space-y-2 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600 line-clamp-1 flex-1">{isHindi ? item.nameHi : item.name} × {item.quantity}</span>
                <span className="font-bold text-gray-800">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600"><span>{isHindi ? "सबटोटल" : "Subtotal"}</span><span>₹{cartTotal}</span></div>
            {couponDiscount > 0 && (
              <div className="flex justify-between text-[#138047] font-bold"><span>{isHindi ? "कूपन छूट" : "Coupon Discount"}</span><span>- ₹{couponDiscount}</span></div>
            )}
            <div className="flex justify-between text-gray-600"><span>{isHindi ? "डिलीवरी" : "Delivery"}</span><span className={deliveryFee === 0 ? "text-green-600 font-bold" : ""}>{deliveryFee === 0 ? (isHindi ? "मुफ्त" : "FREE") : `₹${deliveryFee}`}</span></div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="text-base font-black text-gray-800">{isHindi ? "कुल देय" : "Total Payable"}</span>
              <span className="text-2xl font-black text-[#800020]">₹{finalTotal}</span>
            </div>
          </div>
        </div>

        <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#138047] py-4 text-base font-black text-white shadow-[0_10px_20px_rgba(19,128,71,0.3)] transition hover:-translate-y-0.5 hover:bg-[#0D6837] active:scale-95">
          <ShieldCheck size={20} /> {isHindi ? "WhatsApp पर ऑर्डर करें" : "Place Order on WhatsApp"}
        </button>
      </form>
    </div>
  );
}