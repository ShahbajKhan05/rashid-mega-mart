"use client";

import { createContext, useContext, useMemo, useState, useEffect, type ReactNode } from "react";
import { ShoppingCart, Clock, Receipt, MapPin, Trash2, ShieldCheck, ArrowRight, X, Plus } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { motion, AnimatePresence } from "motion/react";
import { products } from "./data"; 

export type CartProduct = {
  id: string;
  name: string;
  nameHi: string;
  price: number;
  image: string;
  category: string; // <-- YEH ADD KIYA (Error Fix)
};

export type CustomCartRequest = {
  id: string;
  name: string;
  quantity: number;
  note: string;
};

type CartItem = CartProduct & { quantity: number };
type NewCustomRequest = Omit<CustomCartRequest, "id">;

type CartContextType = {
  cartItems: CartItem[];
  customRequests: CustomCartRequest[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: CartProduct, quantity?: number) => void;
  changeQuantity: (id: string, amount: number) => void;
  removeFromCart: (id: string) => void;
  addCustomRequest: (request: NewCustomRequest) => void;
  removeCustomRequest: (id: string) => void;
  openCart: () => void;
  closeCart: () => void;
  cartOpen: boolean;
};

const CartContext = createContext<CartContextType | null>(null);

function money(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}

// WhatsApp Icon Component
function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customRequests, setCustomRequests] = useState<CustomCartRequest[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [customerLocation, setCustomerLocation] = useState("Ghoghar, Rewa");

  useEffect(() => {
    const savedLocation = localStorage.getItem("rmm_location");
    if (savedLocation) setCustomerLocation(savedLocation);
  }, [cartOpen]);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "unset";
  }, [cartOpen]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0) + customRequests.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addToCart(product: CartProduct, quantity: number = 1) {
    setCartItems((previous) => {
      const existing = previous.find((item) => item.id === product.id);
      if (existing) {
        return previous.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...previous, { ...product, quantity }];
    });
  }

  function changeQuantity(id: string, amount: number) {
    setCartItems((previous) => previous.map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0));
  }

  function removeFromCart(id: string) {
    setCartItems((previous) => previous.filter((item) => item.id !== id));
  }

  function addCustomRequest(request: NewCustomRequest) {
    const newRequest: CustomCartRequest = { ...request, id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` };
    setCustomRequests((previous) => [...previous, newRequest]);
  }

  function removeCustomRequest(id: string) {
    setCustomRequests((previous) => previous.filter((item) => item.id !== id));
  }

  const value = useMemo<CartContextType>(
    () => ({
      cartItems, customRequests, cartCount, cartTotal, addToCart, changeQuantity, removeFromCart, addCustomRequest, removeCustomRequest,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      cartOpen,
    }),
    [cartItems, customRequests, cartCount, cartTotal, cartOpen]
  );

  // --- SMART SUGGESTIONS LOGIC ---
  const suggestions = useMemo(() => {
    if (cartItems.length === 0) {
      return products.slice(0, 4); 
    }
    
    const cartProductIds = new Set(cartItems.map(item => item.id));
    const categoriesInCart = new Set(cartItems.map(item => item.category));
    
    let related = products.filter(p => !cartProductIds.has(p.id) && categoriesInCart.has(p.category));
    
    if (related.length < 4) {
      const others = products.filter(p => !cartProductIds.has(p.id) && !categoriesInCart.has(p.category));
      related = [...related, ...others];
    }
    
    return related.slice(0, 4);
  }, [cartItems]);

  // --- WHATSAPP MESSAGE FORMAT ---
  const orderLines = [
    isHindi ? "नमस्ते राशिद मेगा मार्ट, मेरा ऑर्डर:" : "Hello Rashid Mega Mart, my order:",
    "",
    ...cartItems.map((item) => `🛒 ${isHindi ? item.nameHi : item.name} × ${item.quantity} = ${money(item.price * item.quantity)}`),
    ...customRequests.map((item) => `✨ ${isHindi ? "कस्टम सामान" : "CUSTOM ITEM"}: ${item.name} × ${item.quantity}${item.note ? ` (${item.note})` : ""} — ${isHindi ? "कीमत बाकी" : "Price pending"}`),
    "",
    `💰 ${isHindi ? "सबटोटल" : "Subtotal"}: ${money(cartTotal)}`,
    ...(customRequests.length ? [isHindi ? "⚠️ कस्टम सामान की कीमत दुकान से कन्फर्म होगी।" : "⚠️ Custom item prices need store confirmation."] : []),
    "",
    `📍 ${isHindi ? "डिलीवरी लोकेशन" : "Delivery Location"}: ${customerLocation}`,
    "",
    isHindi ? "कृपया मेरा ऑर्डर कन्फर्म करें। धन्यवाद!" : "Please confirm my order. Thank you!"
  ];

  const orderMessage = orderLines.join("\n");

  // --- PREMIUM RECEIPT PRINTER ---
  function printReceipt() {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const billNo = `RMM${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${Math.floor(1000 + Math.random() * 9000)}`;
    const currentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    const discountAmount = Math.round(cartTotal * 0.05);
    const grandTotal = cartTotal - discountAmount;
    const deliveryCharge = 0;

    const itemsHtml = cartItems.map((item, index) => `
      <tr>
        <td style="padding: 10px 8px; border-bottom: 1px solid #eee; text-align: center; color: #555; font-weight: 600;">${index + 1}</td>
        <td style="padding: 10px 8px; border-bottom: 1px solid #eee;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${item.image}" alt="" style="width: 36px; height: 36px; object-fit: contain; background: #fff; border-radius: 6px;" />
            <span style="font-weight: 600; color: #333;">${isHindi ? item.nameHi : item.name}</span>
          </div>
        </td>
        <td style="padding: 10px 8px; border-bottom: 1px solid #eee; text-align: center; font-weight: 600;">${item.quantity}</td>
        <td style="padding: 10px 8px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price}</td>
        <td style="padding: 10px 8px; border-bottom: 1px solid #eee; text-align: right; font-weight: 700; color: #800020;">₹${item.price * item.quantity}</td>
      </tr>
    `).join('');

    const customHtml = customRequests.map((item, index) => `
      <tr>
        <td style="padding: 10px 8px; border-bottom: 1px solid #eee; text-align: center; color: #555;">${cartItems.length + index + 1}</td>
        <td style="padding: 10px 8px; border-bottom: 1px solid #eee;">
           <span style="font-weight: 600; color: #333;">${item.name}</span>
           <span style="font-size: 10px; color: #D4A84F; font-weight: 800; margin-left: 5px; text-transform: uppercase;">(Custom)</span>
        </td>
        <td style="padding: 10px 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px 8px; border-bottom: 1px solid #eee; text-align: right; color: #888;">TBD</td>
        <td style="padding: 10px 8px; border-bottom: 1px solid #eee; text-align: right; color: #888;">TBD</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Rashid Mega Mart - Receipt</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Inter', sans-serif; padding: 30px; color: #333; max-width: 800px; margin: 0 auto; background: #fff; }
            .top-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #800020; padding-bottom: 20px; margin-bottom: 20px; }
            .brand { display: flex; align-items: center; gap: 15px; }
            .brand img { height: 65px; object-fit: contain; }
            .brand-text h1 { margin: 0; font-size: 32px; font-weight: 900; color: #800020; line-height: 1; letter-spacing: -1px; }
            .brand-text h2 { margin: 2px 0 0 0; font-size: 18px; font-weight: 800; color: #138047; letter-spacing: 2px; }
            .brand-text p { margin: 4px 0 0 0; font-size: 11px; color: #666; font-weight: 600; font-style: italic; }
            .contact-info { font-size: 12px; color: #444; display: flex; flex-direction: column; gap: 6px; text-align: right; font-weight: 500; }
            .ribbon { background: #800020; color: #FFF9D8; text-align: center; padding: 8px; font-size: 11px; font-weight: 800; letter-spacing: 3px; border-radius: 4px; margin-bottom: 25px; }
            .receipt-title { text-align: center; font-size: 26px; font-weight: 900; color: #800020; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 1px; }
            .meta-grid { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 20px; border-bottom: 2px dashed #ddd; padding-bottom: 15px; background: #FFFCF5; padding: 15px; border-radius: 8px; }
            .meta-item strong { display: block; font-size: 10px; color: #888; text-transform: uppercase; margin-bottom: 3px; }
            .meta-item span { font-weight: 700; color: #111; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
            th { background: #FFF9D8; padding: 12px 8px; text-align: left; font-size: 12px; font-weight: 800; color: #800020; border-bottom: 2px solid #800020; text-transform: uppercase; letter-spacing: 0.5px; }
            th:nth-child(1) { text-align: center; }
            th:nth-child(3), th:nth-child(4), th:nth-child(5) { text-align: right; }
            td { font-size: 13px; color: #444; vertical-align: middle; }
            .totals-area { display: flex; justify-content: space-between; align-items: flex-start; border-top: 2px dashed #ddd; padding-top: 20px; }
            .qr-box { background: #FFF0F5; padding: 20px; border-radius: 12px; display: flex; align-items: center; gap: 15px; width: 45%; border: 1px solid #FFE4E8; }
            .qr-box img { width: 90px; height: 90px; border-radius: 8px; }
            .qr-box h4 { margin: 0; font-size: 15px; color: #800020; font-weight: 800; margin-bottom: 4px; }
            .qr-box p { margin: 0; font-size: 11px; color: #666; font-weight: 500; }
            .totals-table { width: 45%; font-size: 14px; }
            .totals-table div { display: flex; justify-content: space-between; padding: 8px 0; font-weight: 600; color: #555; }
            .totals-table .discount { color: #138047; font-weight: 700; }
            .totals-table .grand-total { background: #FFF9D8; padding: 15px; border-radius: 10px; margin-top: 10px; font-weight: 900; font-size: 20px; color: #800020; border: 1px solid #D4A84F; }
            .footer-features { display: flex; justify-content: space-between; margin-top: 35px; border-top: 1px solid #eee; padding-top: 20px; font-size: 11px; font-weight: 600; color: #555; }
            .thank-you { text-align: center; margin-top: 35px; padding: 20px; background: #FFF9F0; border-radius: 15px; font-size: 16px; font-weight: 800; color: #800020; font-style: italic; border: 1px dashed #D4A84F; }
            .bottom-bar { text-align: center; font-size: 11px; color: #999; margin-top: 30px; text-transform: uppercase; letter-spacing: 2px; border-top: 2px solid #138047; padding-top: 15px; font-weight: 700; }
            @media print { body { padding: 0; } .qr-box { background: transparent; border: 1px solid #ddd; } }
          </style>
        </head>
        <body>
          <div class="top-header">
            <div class="brand">
              <img src="/Logo.png" alt="Logo" />
              <div class="brand-text">
                <h1>RASHID</h1>
                <h2>MEGA MART</h2>
                <p>— Your Daily Needs, Our Priority —</p>
              </div>
            </div>
            <div class="contact-info">
              <span>📍 Ghoghar, Rewa, MP - 486001</span>
              <span>📞 +91 89625 31603</span>
              <span>✉️ support@rashidmegamart.com</span>
            </div>
          </div>

          <div class="ribbon">GROCERY | HOUSEHOLD | DAILY ESSENTIALS | VALUE KITS</div>
          <div class="receipt-title">SHOPPING RECEIPT</div>

          <div class="meta-grid">
            <div class="meta-item"><strong>Bill No:</strong><span>${billNo}</span></div>
            <div class="meta-item"><strong>Date:</strong><span>${currentDate}</span></div>
            <div class="meta-item"><strong>Time:</strong><span>${currentTime}</span></div>
            <div class="meta-item"><strong>Payment:</strong><span>WhatsApp Order</span></div>
          </div>

          <table>
            <thead>
              <tr>
                <th style="width: 50px;">S.No.</th>
                <th>Item</th>
                <th style="width: 60px;">Qty</th>
                <th style="width: 100px;">Price (₹)</th>
                <th style="width: 100px;">Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
              ${customHtml}
            </tbody>
          </table>

          <div class="totals-area">
            <div class="qr-box">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://wa.me/918962531603" alt="QR Code" />
              <div>
                <h4>Order via WhatsApp</h4>
                <p>Scan to reorder or share<br/> this bill directly on WhatsApp.</p>
              </div>
            </div>
            
            <div class="totals-table">
              <div><span>Subtotal</span><span>₹${cartTotal}</span></div>
              <div class="discount"><span>Discount (5%)</span><span>- ₹${discountAmount}</span></div>
              <div><span>Delivery Charge</span><span>${deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span></div>
              <div class="grand-total"><span>Grand Total</span><span>₹${grandTotal}</span></div>
            </div>
          </div>

          <div class="footer-features">
            <div>🚚 Estimated Delivery: 30-45 Mins</div>
            <div>✅ Quality Products Best Brands</div>
            <div>🛍️ Wide Range Daily Essentials</div>
            <div>🤝 Your Trust Our Priority</div>
          </div>

          <div class="thank-you">
            ❤️ Thank you for shopping with <br/> Rashid Mega Mart!
          </div>

          <div class="bottom-bar">
            — YOUR DAILY NEEDS, OUR PRIORITY —
          </div>

          <script>
            setTimeout(function() { window.print(); }, 1000);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }

  return (
    <CartContext.Provider value={value}>
      {children}

      {/* FLOATING MOBILE CART BUTTON */}
      <AnimatePresence>
        {!cartOpen && cartCount > 0 && (
          <motion.button 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onClick={() => setCartOpen(true)} 
            className="fixed bottom-5 left-1/2 z-[900] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center justify-between rounded-2xl bg-[#800020] px-5 py-4 text-white shadow-[0_10px_40px_rgba(128,0,32,0.4)] sm:hidden border border-[#600018]"
          >
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFF9D8]/80">{cartCount} Items</span>
              <span className="text-lg font-black">{money(cartTotal)}</span>
            </div>
            <span className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-sm">
              View Cart <ArrowRight size={16} />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* AWARD-WINNING CART DRAWER */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-[1000] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.aside 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              role="dialog" 
              aria-modal="true" 
              className="relative flex h-full max-h-[100dvh] w-full max-w-md flex-col bg-[#FFFCF0] shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#800020]/10 bg-white p-4 sm:p-5">
                <div>
                  <h2 className="text-xl font-black text-[#30251F]">{isHindi ? "आपका कार्ट" : "Your Cart"}</h2>
                  <p className="mt-0.5 text-xs font-medium text-[#76665C]">{cartCount} {isHindi ? "आइटम" : "items"} • <span className="text-[#138047] font-bold">Free Delivery</span></p>
                </div>
                <button onClick={() => setCartOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-[#800020]/10 hover:text-[#800020]">
                  <X size={20} />
                </button>
              </div>

              {/* Delivery Info */}
              <div className="flex items-center gap-3 border-b border-[#800020]/10 bg-[#138047]/5 px-4 py-3 sm:px-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#138047]/10 text-[#138047]">
                  <Clock size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#138047]">
                    {isHindi ? "डिलीवरी: 30-45 मिनट" : "Delivery in 30-45 mins"}
                  </p>
                  <p className="flex items-center gap-1 text-[10px] text-[#138047]/70">
                    <MapPin size={10} /> {customerLocation}
                  </p>
                </div>
              </div>

              {/* Cart Content */}
              {cartItems.length === 0 && customRequests.length === 0 ? (
                <div className="flex flex-1 flex-col overflow-y-auto p-6">
                  <div className="flex flex-col items-center justify-center text-center mb-8 mt-4">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#FFF9D8] mb-4">
                      <ShoppingCart size={40} className="text-[#800020]/30" />
                    </div>
                    <p className="text-lg font-black text-[#30251F]">{isHindi ? "कार्ट खाली है" : "Your cart is empty"}</p>
                    <p className="mt-1 text-xs text-[#76665C]">{isHindi ? "खरीदारी शुरू करने के लिए नीचे से चुनें।" : "Start shopping by picking items below."}</p>
                  </div>

                  {/* EMPTY CART SUGGESTIONS */}
                  <div className="mt-2">
                    <h3 className="text-sm font-black text-[#800020] mb-4 flex items-center gap-2">
                       <ShieldCheck size={16} /> {isHindi ? "आपके लिए सुझाव" : "Suggestions for you"}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {suggestions.map((item) => (
                        <div key={item.id} className="relative flex flex-col rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
                          <div className="h-20 w-full flex items-center justify-center mb-2">
                            <img src={item.image} alt={item.name} className="h-full object-contain mix-blend-multiply" />
                          </div>
                          <p className="text-xs font-bold text-[#30251F] line-clamp-2 h-8 leading-tight">{isHindi ? item.nameHi : item.name}</p>
                          <p className="text-sm font-black text-[#800020] mt-1">₹{item.price}</p>
                          
                          <button 
                            onClick={() => addToCart(item)}
                            className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg border border-[#800020]/20 bg-[#FFF9D8] py-1.5 text-[10px] font-black text-[#800020] transition-colors hover:bg-[#800020] hover:text-white"
                          >
                            <Plus size={12} /> {isHindi ? "जोड़ें" : "ADD"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button onClick={() => setCartOpen(false)} className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#800020] px-6 py-3 text-sm font-bold text-white shadow-md">
                    {isHindi ? "खरीदारी जारी रखें" : "Continue Shopping"} <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto px-4 sm:px-5">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 border-b border-[#800020]/10 py-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-sm">
                          <img src={item.image} alt="" className="h-full w-full object-contain" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-[#30251F] leading-tight">{isHindi ? item.nameHi : item.name}</p>
                          <p className="mt-1 text-sm font-black text-[#800020]">{money(item.price * item.quantity)}</p>
                          
                          <div className="mt-2 flex items-center gap-3">
                            <div className="flex items-center rounded-lg border border-[#800020]/20 bg-white p-0.5 shadow-sm">
                              <button onClick={() => changeQuantity(item.id, -1)} className="flex h-7 w-7 items-center justify-center rounded-md text-[#800020] transition hover:bg-[#800020]/5 font-bold">−</button>
                              <span className="w-6 text-center text-xs font-black">{item.quantity}</span>
                              <button onClick={() => changeQuantity(item.id, 1)} className="flex h-7 w-7 items-center justify-center rounded-md text-[#800020] transition hover:bg-[#800020]/5 font-bold">+</button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="flex items-center gap-1 text-[10px] font-bold text-red-500 hover:underline">
                              <Trash2 size={12} /> {isHindi ? "हटाएं" : "Remove"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {customRequests.length > 0 && (
                      <section className="py-4">
                        <h3 className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#A47A2C]">
                          <ShieldCheck size={14} /> {isHindi ? "कस्टम अनुरोध" : "Custom Requests"}
                        </h3>
                        {customRequests.map((item) => (
                          <div key={item.id} className="mb-2 rounded-xl border border-dashed border-[#D4A84F]/50 bg-[#FFF9D8] p-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="break-words text-sm font-bold text-[#30251F]">{item.name}</p>
                                <p className="mt-1 text-[10px] font-medium text-[#76665C]">{isHindi ? "मात्रा" : "Qty"}: {item.quantity} {item.note && `• ${item.note}`}</p>
                                <p className="mt-1.5 text-[10px] font-black uppercase text-[#D4A84F]">{isHindi ? "कीमत बाद में" : "Price TBD"}</p>
                              </div>
                              <button onClick={() => removeCustomRequest(item.id)} className="shrink-0 rounded-full bg-white p-1.5 text-red-500 shadow-sm"><Trash2 size={12} /></button>
                            </div>
                          </div>
                        ))}
                      </section>
                    )}

                    {/* FILLED CART SUGGESTIONS */}
                    {suggestions.length > 0 && (
                      <div className="py-4 border-t border-[#800020]/10 mt-2">
                         <h3 className="text-xs font-black uppercase tracking-wider text-[#800020] mb-3">
                           {isHindi ? "इसके साथ लें" : "Complete Your Order"}
                         </h3>
                         <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                           {suggestions.slice(0, 3).map((item) => (
                             <div key={item.id} className="shrink-0 w-[120px] flex flex-col rounded-xl border border-gray-100 bg-white p-2 shadow-sm">
                                <div className="h-16 w-full flex items-center justify-center mb-1">
                                  <img src={item.image} alt={item.name} className="h-full object-contain mix-blend-multiply" />
                                </div>
                                <p className="text-[10px] font-bold text-[#30251F] line-clamp-2 leading-tight h-7">{isHindi ? item.nameHi : item.name}</p>
                                <div className="flex items-center justify-between mt-1">
                                   <p className="text-[11px] font-black text-[#800020]">₹{item.price}</p>
                                   <button 
                                      onClick={() => addToCart(item)}
                                      className="flex h-6 w-6 items-center justify-center rounded-md bg-[#800020] text-white"
                                   >
                                     <Plus size={14} />
                                   </button>
                                </div>
                             </div>
                           ))}
                         </div>
                      </div>
                    )}
                  </div>

                  {/* Footer with Actions */}
                  <div className="border-t border-[#800020]/10 bg-white p-4 sm:p-5 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="text-sm font-bold text-[#554239]">{isHindi ? "सबटोटल" : "Subtotal"}</span>
                      <span className="text-2xl font-black text-[#30251F]">{money(cartTotal)}</span>
                    </div>
                    
                    {customRequests.length > 0 && <p className="mb-3 text-[10px] leading-relaxed text-[#76665C]">{isHindi ? "कस्टम सामान की कीमत इस सबटोटल में शामिल नहीं है।" : "Custom requests are excluded from this subtotal."}</p>}

                    <div className="flex flex-col gap-2">
                      <a 
                        href={`https://wa.me/918962531603?text=${encodeURIComponent(orderMessage)}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#138047] px-4 text-sm font-black text-white shadow-lg transition hover:bg-[#0D6837] active:scale-95"
                      >
                        <WhatsAppIcon className="h-5 w-5" />
                        {isHindi ? "WhatsApp पर ऑर्डर करें" : "Order on WhatsApp"}
                      </a>

                      <button
                        onClick={printReceipt}
                        className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border-2 border-[#30251F]/10 bg-transparent px-4 text-xs font-bold text-[#30251F] transition hover:bg-gray-50"
                      >
                        <Receipt size={16} />
                        {isHindi ? "रसीद डाउनलोड करें" : "Download Receipt"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
}