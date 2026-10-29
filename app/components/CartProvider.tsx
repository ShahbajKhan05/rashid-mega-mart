"use client";

import { createContext, useContext, useMemo, useState, useEffect, type ReactNode } from "react";
import { ShoppingCart, Clock, Receipt, MapPin, Trash2, ShieldCheck, ArrowRight, X, Plus } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { motion, AnimatePresence } from "motion/react";
import { products } from "./data"; 
import { useRouter } from "next/navigation"; // 🔥 Router import kiya

export type CartProduct = {
  id: string;
  name: string;
  nameHi: string;
  price: number;
  image: string;
  category: string;
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
  const router = useRouter(); // 🔥 Router use kiya

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customRequests, setCustomRequests] = useState<CustomCartRequest[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [customerLocation, setCustomerLocation] = useState("Ghoghar, Rewa");
  const [isMounted, setIsMounted] = useState(false); 

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("rmm_cart_items");
      if (savedCart) setCartItems(JSON.parse(savedCart));
      
      const savedCustom = localStorage.getItem("rmm_custom_requests");
      if (savedCustom) setCustomRequests(JSON.parse(savedCustom));
      
      const savedLocation = localStorage.getItem("rmm_location");
      if (savedLocation) setCustomerLocation(savedLocation);
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem("rmm_cart_items", JSON.stringify(cartItems));
  }, [cartItems, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem("rmm_custom_requests", JSON.stringify(customRequests));
  }, [customRequests, isMounted]);

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

  const handleCheckout = () => {
    setCartOpen(false);
    router.push("/checkout");
  };

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
                      {/* 🔥 NAYA: Sirf Proceed to Checkout Button */}
                      <button 
                        onClick={handleCheckout}
                        className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#138047] px-4 text-sm font-black text-white shadow-lg transition hover:bg-[#0D6837] active:scale-95"
                      >
                         {isHindi ? "चेकआउट करें" : "Proceed to Checkout"} <ArrowRight size={18} />
                      </button>

                      <button
                        onClick={() => {
                          setCartOpen(false);
                          router.push("/cart");
                        }}
                        className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border-2 border-[#30251F]/10 bg-transparent px-4 text-xs font-bold text-[#30251F] transition hover:bg-gray-50"
                      >
                        {isHindi ? "पूरा कार्ट देखें" : "View Full Cart"}
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