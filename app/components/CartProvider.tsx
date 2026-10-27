
"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
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

type CartItem = CartProduct & {
  quantity: number;
};

type NewCustomRequest = Omit<CustomCartRequest, "id">;

type CartContextType = {
  cartItems: CartItem[];
  customRequests: CustomCartRequest[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: CartProduct) => void;
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

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customRequests, setCustomRequests] = useState<
    CustomCartRequest[]
  >([]);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount =
    cartItems.reduce((sum, item) => sum + item.quantity, 0) +
    customRequests.reduce((sum, item) => sum + item.quantity, 0);

  // Custom products have no confirmed price, so they are excluded.
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function addToCart(product: CartProduct) {
    setCartItems((previous) => {
      const existing = previous.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { ...product, quantity: 1 }];
    });
  }

  function changeQuantity(id: string, amount: number) {
    setCartItems((previous) =>
      previous
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id: string) {
    setCartItems((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }

  function addCustomRequest(request: NewCustomRequest) {
    const newRequest: CustomCartRequest = {
      ...request,
      id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    };

    setCustomRequests((previous) => [...previous, newRequest]);
  }

  function removeCustomRequest(id: string) {
    setCustomRequests((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }

  const value = useMemo<CartContextType>(
    () => ({
      cartItems,
      customRequests,
      cartCount,
      cartTotal,
      addToCart,
      changeQuantity,
      removeFromCart,
      addCustomRequest,
      removeCustomRequest,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      cartOpen,
    }),
    [cartItems, customRequests, cartCount, cartTotal, cartOpen]
  );

  const orderLines = [
    isHindi
      ? "नमस्ते राशिद मेगा मार्ट, मेरा ऑर्डर:"
      : "Hello Rashid Mega Mart, my order:",
    ...cartItems.map(
      (item) =>
        `${isHindi ? item.nameHi : item.name} × ${item.quantity} = ${money(item.price * item.quantity)}`
    ),
    ...customRequests.map(
      (item) =>
        `${isHindi ? "कस्टम सामान" : "CUSTOM ITEM"}: ${item.name} × ${item.quantity}${item.note ? ` (${item.note})` : ""} — ${isHindi ? "कीमत की पुष्टि बाकी" : "Price confirmation pending"}`
    ),
    `${isHindi ? "लिस्टेड सामान का सबटोटल" : "Listed items subtotal"}: ${money(cartTotal)}`,
    ...(customRequests.length
      ? [
          isHindi
            ? "कस्टम सामान की कीमत दुकान से कन्फर्म होगी।"
            : "Custom item prices need store confirmation.",
        ]
      : []),
  ];

  const orderMessage = orderLines.join("\n");

  return (
    <CartContext.Provider value={value}>
      {children}

      {cartOpen && (
        <div
          className="fixed inset-0 z-[1000] flex justify-end bg-black/50"
          onClick={() => setCartOpen(false)}
        >
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            onClick={(event) => event.stopPropagation()}
            className="flex h-full max-h-[100dvh] w-full max-w-md flex-col bg-[#FFFCF0] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#800020]/15 bg-[#FFF9D8] p-4 sm:p-5">
              <div>
                <h2
                  id="cart-title"
                  className="text-xl font-black text-[#800020]"
                >
                  {isHindi ? "आपका कार्ट" : "Your Cart"}
                </h2>
                <p className="mt-1 text-xs text-[#76665C]">
                  {cartCount} {isHindi ? "आइटम" : "items"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label={isHindi ? "बंद करें" : "Close cart"}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#800020]/10 text-xl font-bold text-[#800020]"
              >
                ×
              </button>
            </div>

            {cartItems.length === 0 &&
            customRequests.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                <span className="text-6xl" aria-hidden="true">
                  🛒
                </span>
                <p className="mt-4 font-bold text-[#554239]">
                  {isHindi
                    ? "आपका कार्ट खाली है।"
                    : "Your cart is empty."}
                </p>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="mt-5 rounded-xl bg-[#800020] px-5 py-3 text-sm font-bold text-white"
                >
                  {isHindi ? "खरीदारी जारी रखें" : "Continue Shopping"}
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-4 sm:px-5">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 border-b border-[#800020]/10 py-4"
                    >
                      <img
                        src={item.image}
                        alt={isHindi ? item.nameHi : item.name}
                        className="h-14 w-14 shrink-0 rounded-xl bg-white object-contain p-1"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-[#30251F]">
                          {isHindi ? item.nameHi : item.name}
                        </p>
                        <p className="mt-1 text-sm font-black text-[#800020]">
                          {money(item.price * item.quantity)}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="mt-1 text-xs text-red-700 underline"
                        >
                          {isHindi ? "हटाएं" : "Remove"}
                        </button>
                      </div>

                      <div className="flex shrink-0 items-center gap-2 rounded-lg border border-[#800020]/20 bg-white p-1">
                        <button
                          type="button"
                          onClick={() => changeQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                          className="h-7 w-7 rounded-md font-bold text-[#800020]"
                        >
                          −
                        </button>
                        <span className="text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => changeQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                          className="h-7 w-7 rounded-md font-bold text-[#800020]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}

                  {customRequests.length > 0 && (
                    <section className="py-4">
                      <h3 className="mb-3 text-sm font-black text-[#800020]">
                        {isHindi
                          ? "आपके अनुरोध वाले सामान"
                          : "Requested Custom Items"}
                      </h3>

                      {customRequests.map((item) => (
                        <div
                          key={item.id}
                          className="mb-2 rounded-xl border border-dashed border-[#D4A84F] bg-[#FFF9D8] p-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="break-words text-sm font-bold text-[#30251F]">
                                {item.name}
                              </p>
                              <p className="mt-1 text-xs text-[#76665C]">
                                {isHindi ? "मात्रा" : "Quantity"}:{" "}
                                {item.quantity}
                              </p>
                              {item.note && (
                                <p className="mt-1 break-words text-xs text-[#76665C]">
                                  {isHindi ? "नोट" : "Note"}: {item.note}
                                </p>
                              )}
                              <p className="mt-2 text-xs font-bold text-[#800020]">
                                {isHindi
                                  ? "कीमत की पुष्टि बाकी"
                                  : "Price to be confirmed"}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeCustomRequest(item.id)}
                              className="shrink-0 text-xs font-bold text-red-700 underline"
                            >
                              {isHindi ? "हटाएं" : "Remove"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </section>
                  )}
                </div>

                <div className="border-t border-[#800020]/15 bg-[#FFF9D8] p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-[#554239]">
                      {isHindi
                        ? "लिस्टेड सामान का सबटोटल"
                        : "Listed Items Subtotal"}
                    </span>
                    <span className="text-2xl font-black text-[#800020]">
                      {money(cartTotal)}
                    </span>
                  </div>

                  {customRequests.length > 0 && (
                    <p className="mt-2 text-xs leading-5 text-[#76665C]">
                      {isHindi
                        ? "अनुरोध वाले सामान की कीमत इस सबटोटल में शामिल नहीं है। दुकान कीमत कन्फर्म करेगी।"
                        : "Custom requests are excluded from this subtotal until the store confirms their prices."}
                    </p>
                  )}

                  <a
                    href={`https://wa.me/918962531603?text=${encodeURIComponent(orderMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex min-h-12 items-center justify-center rounded-xl bg-[#138047] px-4 py-3 text-center text-sm font-extrabold text-white hover:bg-[#0D6837]"
                  >
                    {isHindi
                      ? "WhatsApp पर ऑर्डर भेजें"
                      : "Send Order on WhatsApp"}
                  </a>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </CartContext.Provider>
  );
}
