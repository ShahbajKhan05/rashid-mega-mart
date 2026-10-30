"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Image as ImageIcon, IndianRupee, Layers } from "lucide-react";
import { categoryOptions } from "../../components/data";
import { motion } from "motion/react";
import { safeGet, safeSet } from "./../../lib/store";

export default function AddProductPage() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Sirf 4 basic chizein client ke liye
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "staples",
    image: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const priceNum = Number(formData.price);
    const productId = `custom-${Date.now()}`;

    // Naya product object (Baaki chizein automatic set ho rahi hain)
    const newProduct = {
      id: productId,
      slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
      name: formData.name,
      nameHi: formData.name, 
      price: priceNum,
      originalPrice: Math.round(priceNum * 1.2), 
      category: formData.category,
      image: formData.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80",
      rating: 4.5,
      emoji: "📦",
      brand: "Local", 
      unit: "1 pc",
      description: `Buy ${formData.name} online at Rashid Mega Mart. Best quality and fast delivery.`
    };

    setTimeout(() => {
      // 1. Website me save karo
      const existing = JSON.parse(localStorage.getItem("rmm_custom_products") || "[]");
      localStorage.setItem("rmm_custom_products", JSON.stringify([newProduct, ...existing]));

      // 2. POS Billing (Inventory) me save karo taaki staff ko dikhe
      const posInventory = safeGet<any[]>("rmm_inventory", []);
      safeSet("rmm_inventory", [
        { id: newProduct.id, name: newProduct.name, price: newProduct.price, stock: 50, category: newProduct.category }, 
        ...posInventory
      ]);

      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => router.push("/admin"), 2000);
    }, 800);
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FFF9D8] p-6 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 mb-6">
          <CheckCircle2 size={50} className="text-green-600" />
        </motion.div>
        <h1 className="text-3xl font-black text-[#800020]">Product Added!</h1>
        <p className="mt-2 text-sm font-bold text-gray-500">Website aur POS dono me show ho jayega.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9D8] p-4 sm:p-8 pb-24">
      <div className="mx-auto max-w-2xl">
        
        <button onClick={() => router.back()} className="mb-6 flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#800020] shadow-sm hover:bg-gray-50 transition w-fit">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div className="rounded-[32px] bg-white p-6 sm:p-8 shadow-[0_20px_50px_rgba(128,0,32,0.05)] border border-gray-100">
          
          {/* Header with Original Logo */}
          <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-5">
             <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#800020]/5 p-1 border border-[#800020]/10 overflow-hidden">
               <img src="/Logo.png" alt="Rashid Mega Mart Logo" className="h-full w-full object-contain" />
             </div>
             <div>
               <h1 className="text-2xl font-black text-gray-800">Add New Item</h1>
               <p className="text-xs font-bold text-gray-400 mt-1">Website aur POS ke liye naya saman</p>
             </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 1. Product Name */}
            <div>
              <label className="flex items-center gap-1 text-sm font-black text-gray-700 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input 
                required 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-3.5 text-sm font-bold outline-none focus:border-[#800020] focus:bg-white transition" 
                placeholder="e.g. Tata Salt 1kg" 
              />
            </div>

            {/* 2. Price */}
            <div>
              <label className="flex items-center gap-1 text-sm font-black text-gray-700 mb-2">
                Selling Price (₹) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <IndianRupee size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  required 
                  type="number" 
                  value={formData.price} 
                  onChange={(e) => setFormData({...formData, price: e.target.value})} 
                  className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 pl-11 pr-4 py-3.5 text-lg font-black text-[#800020] outline-none focus:border-[#800020] focus:bg-white transition" 
                  placeholder="50" 
                />
              </div>
              <p className="text-[10px] text-gray-400 font-bold mt-1.5 ml-1">Original MRP (cut-price) automatic 20% zyada set ho jayega.</p>
            </div>

            {/* 3. Category */}
            <div>
              <label className="flex items-center gap-1 text-sm font-black text-gray-700 mb-2">
                <Layers size={16} /> Category <span className="text-red-500">*</span>
              </label>
              <select 
                value={formData.category} 
                onChange={(e) => setFormData({...formData, category: e.target.value})} 
                className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-3.5 text-sm font-bold outline-none focus:border-[#800020] focus:bg-white transition cursor-pointer"
              >
                {categoryOptions.filter(c => c.id !== "all").map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.en}</option>
                ))}
              </select>
            </div>

            {/* 4. Image */}
            <div>
              <label className="flex items-center gap-1 text-sm font-black text-gray-700 mb-2">
                <ImageIcon size={16} /> Image Link
              </label>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="flex-1 w-full">
                  <input 
                    type="url" 
                    value={formData.image} 
                    onChange={(e) => setFormData({...formData, image: e.target.value})} 
                    className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-3.5 text-sm font-bold outline-none focus:border-[#800020] focus:bg-white transition" 
                    placeholder="https://images.unsplash.com/photo-..." 
                  />
                  <p className="text-xs font-bold text-gray-400 mt-2 ml-1">Google se image copy karke yahan paste karein (Optional)</p>
                </div>
                
                {/* Image Preview */}
                <div className="h-24 w-24 shrink-0 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                  {formData.image ? (
                    <img src={formData.image} alt="Preview" className="h-full w-full object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  ) : (
                    <ImageIcon size={28} className="text-gray-300" />
                  )}
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full rounded-xl bg-[#138047] py-4 text-base font-black text-white shadow-[0_10px_20px_rgba(19,128,71,0.3)] hover:bg-[#0D6837] transition active:scale-95 mt-6 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="animate-pulse">Saving Product...</span>
              ) : (
                <>
                  <CheckCircle2 size={20} />
                  Save Product
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}