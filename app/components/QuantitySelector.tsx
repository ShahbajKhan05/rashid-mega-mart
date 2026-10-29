"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: "sm" | "md";
}

export default function QuantitySelector({ quantity, onIncrease, onDecrease, size = "sm" }: QuantitySelectorProps) {
  const height = size === "sm" ? "h-8" : "h-10";
  const iconSize = size === "sm" ? 14 : 16;

  return (
    <div className={`flex items-center rounded-lg border border-[#800020]/20 bg-[#FFF9D8] ${height}`}>
      <button 
        onClick={onDecrease} 
        className="flex h-full w-8 items-center justify-center text-[#800020] font-bold hover:bg-[#800020]/10 rounded-l-lg transition"
      >
        <Minus size={iconSize} strokeWidth={3} />
      </button>
      <span className="w-8 text-center text-sm font-black text-[#800020]">{quantity}</span>
      <button 
        onClick={onIncrease} 
        className="flex h-full w-8 items-center justify-center text-[#800020] font-bold hover:bg-[#800020]/10 rounded-r-lg transition"
      >
        <Plus size={iconSize} strokeWidth={3} />
      </button>
    </div>
  );
}