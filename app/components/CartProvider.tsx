"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { ShoppingCart, Clock, Receipt, MapPin } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export type CartProduct = {
  id: string;
  name: string;
  nameHi: string;
  price: number;
  image: string;
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

export function CartProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customRequests, setCustomRequests] = useState<CustomCartRequest[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

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

  const orderLines = [
    isHindi ? "नमस्ते राशिद मेगा मार्ट, मेरा ऑर्डर:" : "Hello Rashid Mega Mart, my order:",
    ...cartItems.map((item) => `${isHindi ? item.nameHi : item.name} × ${item.quantity} = ${money(item.price * item.quantity)}`),
    ...customRequests.map((item) => `${isHindi ? "कस्टम सामान" : "CUSTOM ITEM"}: ${item.name} × ${item.quantity}${item.note ? ` (${item.note})` : ""} — ${isHindi ? "कीमत की पुष्टि बाकी" : "Price confirmation pending"}`),
    `${isHindi ? "लिस्टेड सामान का सबटोटल" : "Listed items subtotal"}: ${money(cartTotal)}`,
    ...(customRequests.length ? [isHindi ? "कस्टम सामान की कीमत दुकान से कन्फर्म होगी।" : "Custom item prices need store confirmation."] : []),
  ];

  const orderMessage = orderLines.join("\n");

  // RECEIPT PRINTER FUNCTION
  function printReceipt() {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const itemsHtml = cartItems.map(item => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${isHindi ? item.nameHi : item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price * item.quantity}</td>
      </tr>
    `).join('');

    const customHtml = customRequests.map(item => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name} (Custom)</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">TBD</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Rashid Mega Mart - Receipt</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; color: #333; max-width: 400px; margin: 0 auto; }
            .header { text-align: center; border-bottom: 2px dashed #800020; padding-bottom: 15px; margin-bottom: 20px; }
            .header h1 { color: #800020; margin: 0; font-size: 22px; }
            .header p { margin: 5px 0; font-size: 12px; color: #666; }
            .meta { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 15px; color: #555; }
            .items { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px; }
            .items th { text-align: left; padding: 8px; background: #FFF9D8; color: #800020; }
            .total-box { border-top: 2px dashed #800020; padding-top: 15px; text-align: right; font-size: 18px; font-weight: bold; color: #800020; }
            .footer { text-align: center; font-size: 11px; color: #888; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Rashid Mega Mart</h1>
            <p>Ghoghar, Rewa, MP</p>
            <p>Phone: +91 89625 31603</p>
          </div>
          <div class="meta">
            <span>Date: ${new Date().toLocaleDateString()}</span>
            <span>Time: ${new Date().toLocaleTimeString()}</span>
          </div>
          <table class="items">
            <thead>
              <tr><th>Item</th><th style="text-align: center;">Qty</th><th style="text-align: right;">Price</th></tr>
            </thead>
            <tbody>
              ${itemsHtml}
              ${customHtml}
            </tbody>
          </table>
          <div class="total-box">
            Total: ₹${cartTotal}
          </div>
          <div class="footer">
            Estimated Delivery: 30-45 mins<br>
            Thank you for shopping with us!
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }

  return (
    <CartContext.Provider value={value}>
      {children}

      {/* FLOATING MOBILE CART BUTTON */}
      {!cartOpen && cartCount > 0 && (
        <button onClick={() => setCartOpen(true)} className="fixed bottom-4 left-1/2 z-[900] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center justify-between rounded-full bg-[#800020] px-5 py-3.5 text-white shadow-[0_8px_30px_rgb(128,0,32,0.4)] sm:hidden">
          <span className="flex items-center gap-2 text-sm font-bold"><ShoppingCart size={18} /> {cartCount} {isHindi ? "आइटम" : "Items"}</span>
          <span className="text-sm font-black">{money(cartTotal)} <span className="ml-1">→</span></span>
        </button>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-[1000] flex justify-end bg-black/50" onClick={() => setCartOpen(false)}>
          <aside role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} className="flex h-full max-h-[100dvh] w-full max-w-md flex-col bg-[#FFFCF0] shadow-2xl">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#800020]/15 bg-[#FFF9D8] p-4 sm:p-5">
              <div>
                <h2 className="text-xl font-black text-[#800020]">{isHindi ? "आपका कार्ट" : "Your Cart"}</h2>
                <p className="mt-1 text-xs text-[#76665C]">{cartCount} {isHindi ? "आइटम" : "items"}</p>
              </div>
              <button onClick={() => setCartOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#800020]/10 text-xl font-bold text-[#800020]">×</button>
            </div>

            {/* Delivery Estimate Banner */}
            <div className="flex items-center gap-2 border-b border-[#800020]/10 bg-[#138047]/5 px-4 py-3 sm:px-5">
              <Clock size={16} className="text-[#138047]" />
              <div>
                <p className="text-xs font-bold text-[#138047]">
                  {isHindi ? "डिलीवरी का अनुमानित समय: 30-45 मिनट" : "Estimated Delivery: 30-45 mins"}
                </p>
                <p className="text-[10px] text-[#138047]/70">
                  {isHindi ? "घोघर, रीवा में" : "In Ghoghar, Rewa"}
                </p>
              </div>
            </div>

            {cartItems.length === 0 && customRequests.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                <span className="text-6xl">🛒</span>
                <p className="mt-4 font-bold text-[#554239]">{isHindi ? "आपका कार्ट खाली है।" : "Your cart is empty."}</p>
                <button onClick={() => setCartOpen(false)} className="mt-5 rounded-xl bg-[#800020] px-5 py-3 text-sm font-bold text-white">{isHindi ? "खरीदारी जारी रखें" : "Continue Shopping"}</button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-4 sm:px-5">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 border-b border-[#800020]/10 py-4">
                      <img src={item.image} alt="" className="h-14 w-14 shrink-0 rounded-xl bg-white object-contain p-1" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-[#30251F]">{isHindi ? item.nameHi : item.name}</p>
                        <p className="mt-1 text-sm font-black text-[#800020]">{money(item.price * item.quantity)}</p>
                        <button onClick={() => removeFromCart(item.id)} className="mt-1 text-xs text-red-700 underline">{isHindi ? "हटाएं" : "Remove"}</button>
                      </div>
                      <div className="flex shrink-0 items-center gap-2 rounded-lg border border-[#800020]/20 bg-white p-1">
                        <button onClick={() => changeQuantity(item.id, -1)} className="h-7 w-7 rounded-md font-bold text-[#800020]">−</button>
                        <span className="text-sm font-bold">{item.quantity}</span>
                        <button onClick={() => changeQuantity(item.id, 1)} className="h-7 w-7 rounded-md font-bold text-[#800020]">+</button>
                      </div>
                    </div>
                  ))}

                  {customRequests.length > 0 && (
                    <section className="py-4">
                      <h3 className="mb-3 text-sm font-black text-[#800020]">{isHindi ? "अनुरोध वाले सामान" : "Requested Custom Items"}</h3>
                      {customRequests.map((item) => (
                        <div key={item.id} className="mb-2 rounded-xl border border-dashed border-[#D4A84F] bg-[#FFF9D8] p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="break-words text-sm font-bold text-[#30251F]">{item.name}</p>
                              <p className="mt-1 text-xs text-[#76665C]">{isHindi ? "मात्रा" : "Quantity"}: {item.quantity}</p>
                              {item.note && <p className="mt-1 break-words text-xs text-[#76665C]">{isHindi ? "नोट" : "Note"}: {item.note}</p>}
                              <p className="mt-2 text-xs font-bold text-[#800020]">{isHindi ? "कीमत की पुष्टि बाकी" : "Price to be confirmed"}</p>
                            </div>
                            <button onClick={() => removeCustomRequest(item.id)} className="shrink-0 text-xs font-bold text-red-700 underline">{isHindi ? "हटाएं" : "Remove"}</button>
                          </div>
                        </div>
                      ))}
                    </section>
                  )}
                </div>

                {/* Footer with Actions */}
                <div className="border-t border-[#800020]/15 bg-[#FFF9D8] p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-sm font-bold text-[#554239]">{isHindi ? "लिस्टेड सामान का सबटोटल" : "Listed Items Subtotal"}</span>
                    <span className="text-2xl font-black text-[#800020]">{money(cartTotal)}</span>
                  </div>
                  
                  {customRequests.length > 0 && <p className="mb-3 text-xs leading-5 text-[#76665C]">{isHindi ? "कस्टम सामान की कीमत इस सबटोटल में शामिल नहीं है।" : "Custom requests are excluded from this subtotal until the store confirms their prices."}</p>}

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={printReceipt}
                      className="flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-[#800020] bg-white px-3 py-2 text-xs font-bold text-[#800020] hover:bg-[#800020]/5"
                    >
                      <Receipt size={16} />
                      {isHindi ? "रसीद प्रिंट करें" : "Print Receipt"}
                    </button>

                    <a 
                      href={`https://wa.me/918962531603?text=${encodeURIComponent(orderMessage)}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#138047] px-3 py-2 text-xs font-extrabold text-white hover:bg-[#0D6837]"
                    >
                      <MapPin size={16} />
                      {isHindi ? "WhatsApp ऑर्डर" : "WhatsApp Order"}
                    </a>
                  </div>
                  <p className="mt-3 text-center text-[10px] text-[#76665C]">
                    {isHindi ? "ऑर्डर कन्फर्म होने पर रसीद WhatsApp पर भेज दी जाएगी।" : "Receipt will be sent on WhatsApp once order is confirmed."}
                  </p>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </CartContext.Provider>
  );
}