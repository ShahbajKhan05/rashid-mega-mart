// app/loyalty/staff/components/PosTab.tsx
"use client";
import { useState } from "react";
import { Search, Receipt, X, UserCircle2, ChevronRight, Coffee, Minus, Plus, Ticket, Star, Banknote, Wallet, IndianRupee, CheckCircle2, AlertCircle } from "lucide-react";

export default function PosTab({ inventory, setInventory, orders, setOrders, customers, setCustomers, coupons, setCoupons, settings, loggedStaff, showToast, shift, setShift }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [custSearch, setCustSearch] = useState("");
  const [showCustPicker, setShowCustPicker] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [cashTendered, setCashTendered] = useState("");

  const filteredProducts = inventory.filter((p: any) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredCustomers = customers.filter((c: any) => c.active !== false && ((c.name || "").toLowerCase().includes(custSearch.toLowerCase()) || c.phone.includes(custSearch))).slice(0, 20);

  const cartSubtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const couponDiscount = appliedCoupon && cartSubtotal >= appliedCoupon.minBill ? appliedCoupon.discount : 0;
  const cartTotal = Math.max(0, cartSubtotal - couponDiscount);
  const changeDue = cashTendered ? Number(cashTendered) - cartTotal : 0;

  const addToCart = (product: any) => {
    if (product.stock <= 0) return showToast("Stock khatam!", "error");
    setCart((prev) => {
      const ex = prev.find(i => i.product.id === product.id);
      if (ex) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) => prev.map(i => {
      if (i.product.id !== id) return i;
      const q = i.qty + delta;
      if (q <= 0) return i;
      return { ...i, qty: q };
    }));
  };

  const removeFromCart = (id: string) => setCart((prev) => prev.filter(i => i.product.id !== id));

  const applyCoupon = (code: string) => {
    const c = coupons.find((x: any) => x.code === code && x.status === "active");
    if (!c) return showToast("Coupon invalid", "error");
    if (cartSubtotal < c.minBill) return showToast(`Min ₹${c.minBill} chahiye`, "error");
    setAppliedCoupon(c);
    showToast(`Coupon lagaya: ₹${c.discount} off`, "success");
  };

  const handleCheckout = () => {
    if (!shift.isOpen) return showToast("Pehle shift open karo!", "error");
    
    // Logic to update inventory, customers, orders
    const newOrder = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`, 
      date: new Date().toLocaleDateString("en-GB"),
      customerPhone: selectedCustomer?.phone || "Guest", 
      items: cart.map(i => ({ product: i.product, qty: i.qty, name: i.product.name, quantity: i.qty, price: i.product.price })), 
      total: cartTotal, method: paymentMethod, status: "Completed", staffId: loggedStaff.id, staffName: loggedStaff.name, source: "POS"
    };

    setOrders([newOrder, ...orders]);
    
    // Inventory Update
    setInventory(inventory.map((p: any) => {
      const item = cart.find(c => c.product.id === p.id);
      return item ? { ...p, stock: p.stock - item.qty } : p;
    }));

    // Customer Update
    if (selectedCustomer) {
      setCustomers(customers.map((c: any) => c.phone === selectedCustomer.phone ? { ...c, totalSpent: (c.totalSpent || 0) + cartTotal } : c));
    }

    // Reset
    setCart([]); setSelectedCustomer(null); setAppliedCoupon(null); setShowCheckout(false); setCashTendered("");
    showToast(`Sale Complete! ₹${cartTotal}`, "success");
  };

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col lg:flex-row gap-3">
      <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[50vh]">
        <div className="p-3 border-b border-gray-100">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Product dhoondo..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full rounded-xl bg-gray-50 border border-gray-200 py-3 pl-10 pr-4 text-sm font-bold outline-none focus:border-[#800020]" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {filteredProducts.map((p: any) => (
            <button key={p.id} onClick={() => addToCart(p)} disabled={p.stock <= 0} className="flex flex-col text-left p-3 rounded-xl border-2 border-gray-100 hover:border-[#800020] hover:bg-[#800020]/5 transition disabled:opacity-40 active:scale-95">
              <span className="text-sm font-bold text-gray-800 line-clamp-2">{p.name}</span>
              <span className={`text-[10px] font-bold mt-1 ${p.stock < 20 ? "text-red-500" : "text-green-600"}`}>{p.stock} left</span>
              <span className="text-base font-black text-[#800020] mt-auto pt-2">₹{p.price}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-[400px] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden shrink-0 min-h-[50vh]">
        <div className="p-3 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-black text-gray-800 flex items-center gap-2"><Receipt size={16} /> Cart ({cart.length})</h3>
          {cart.length > 0 && <button onClick={() => setCart([])} className="text-[10px] font-bold text-red-500 hover:underline">Clear</button>}
        </div>

        <div className="p-3 border-b border-gray-100">
          {selectedCustomer ? (
            <div className="flex items-center justify-between bg-green-50 rounded-xl p-2.5">
              <div className="min-w-0">
                <p className="text-xs font-black text-green-800 truncate">{selectedCustomer.name}</p>
                <p className="text-[10px] text-green-600">{selectedCustomer.phone} · {selectedCustomer.stamps} stamps</p>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="p-1 text-green-700"><X size={14} /></button>
            </div>
          ) : (
            <button onClick={() => setShowCustPicker(true)} className="w-full flex items-center justify-between bg-gray-50 rounded-xl p-2.5 hover:bg-gray-100 transition">
              <div className="flex items-center gap-2">
                <UserCircle2 size={18} className="text-gray-400" />
                <span className="text-xs font-bold text-gray-500">Customer add karo</span>
              </div>
              <ChevronRight size={14} className="text-gray-400" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-[120px]">
          {cart.map((item) => (
            <div key={item.product.id} className="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
              <div className="flex-1 min-w-0"><p className="text-xs font-bold text-gray-800 truncate">{item.product.name}</p><p className="text-[10px] text-gray-500">₹{item.product.price} × {item.qty}</p></div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => updateQty(item.product.id, -1)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600"><Minus size={12} /></button>
                <span className="w-6 text-center text-xs font-black">{item.qty}</span>
                <button onClick={() => updateQty(item.product.id, 1)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600"><Plus size={12} /></button>
                <button onClick={() => removeFromCart(item.product.id)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-red-50 text-red-500 ml-1"><X size={12} /></button>
              </div>
              <p className="text-xs font-black text-[#800020] w-14 text-right shrink-0">₹{item.product.price * item.qty}</p>
            </div>
          ))}
          {cart.length === 0 && <div className="flex flex-col items-center justify-center py-8 text-gray-300"><Coffee size={32} /><p className="text-xs font-bold mt-2">Cart khaali hai</p></div>}
        </div>

        <div className="border-t border-gray-100 p-3 space-y-2">
          <div className="flex gap-2">
            <input type="text" placeholder="Coupon code" onKeyDown={e => { if (e.key === "Enter") { applyCoupon((e.target as HTMLInputElement).value.toUpperCase()); (e.target as HTMLInputElement).value = ""; } }} className="flex-1 rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-xs font-bold outline-none uppercase" />
            {appliedCoupon && <div className="flex items-center gap-1 bg-green-50 rounded-lg px-2"><span className="text-[10px] font-black text-green-700">{appliedCoupon.code}</span><button onClick={() => setAppliedCoupon(null)} className="text-green-700"><X size={12} /></button></div>}
          </div>
          <div className="flex justify-between text-xs font-bold text-gray-600"><span>Subtotal</span><span>₹{cartSubtotal}</span></div>
          {couponDiscount > 0 && <div className="flex justify-between text-xs font-bold text-green-600"><span>Discount</span><span>-₹{couponDiscount}</span></div>}
          <div className="flex justify-between text-base font-black text-[#800020] pt-1 border-t border-dashed"><span>Total</span><span>₹{cartTotal}</span></div>
          <button onClick={() => { if (cart.length) setShowCheckout(true); }} disabled={!cart.length} className="w-full rounded-xl bg-[#800020] py-3.5 text-sm font-black text-white shadow-lg hover:bg-[#600018] disabled:opacity-40 flex items-center justify-center gap-2"><Receipt size={16} /> Checkout · ₹{cartTotal}</button>
        </div>
      </div>

      {/* MODALS (Customer Picker & Checkout) */}
      {showCustPicker && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-black/50 p-0 md:p-4" onClick={() => setShowCustPicker(false)}>
          <div className="w-full md:max-w-md max-h-[80vh] bg-white rounded-t-3xl md:rounded-3xl p-4 flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between mb-3"><h3 className="font-black">Customer chuno</h3><button onClick={() => setShowCustPicker(false)}><X size={20} /></button></div>
            <input type="text" placeholder="Search..." value={custSearch} onChange={e => setCustSearch(e.target.value)} className="w-full rounded-xl bg-gray-50 border p-2 mb-3" />
            <div className="flex-1 overflow-y-auto space-y-2">
              {filteredCustomers.map((c: any) => (
                <button key={c.phone} onClick={() => { setSelectedCustomer(c); setShowCustPicker(false); }} className="w-full text-left p-3 hover:bg-gray-50 rounded-xl flex justify-between">
                  <div><p className="font-bold">{c.name}</p><p className="text-xs text-gray-500">{c.phone}</p></div>
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showCheckout && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={() => setShowCheckout(false)}>
          <div className="w-full max-w-sm bg-white rounded-3xl p-5" onClick={e => e.stopPropagation()}>
            <h3 className="font-black mb-4">Bill Confirm karo</h3>
            <p className="text-3xl font-black text-[#800020] mb-4">₹{cartTotal}</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {["Cash", "UPI", "Card"].map(m => (
                <button key={m} onClick={() => setPaymentMethod(m)} className={`py-2 rounded-xl border-2 font-bold ${paymentMethod === m ? "border-[#800020] bg-[#800020]/5 text-[#800020]" : "border-gray-100 text-gray-500"}`}>{m}</button>
              ))}
            </div>
            <button onClick={handleCheckout} className="w-full bg-green-600 text-white py-4 rounded-xl font-black">Sale Complete</button>
          </div>
        </div>
      )}
    </div>
  );
}