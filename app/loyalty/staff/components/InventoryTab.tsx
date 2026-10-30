import { Package } from "lucide-react";

export default function InventoryTab({ inventory }: any) {
  return (
    <div className="max-w-4xl mx-auto space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black text-gray-800">Stock</h2>
        <span className="text-xs font-bold text-gray-500">{inventory.length} items</span>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
        {inventory.map((p: any) => (
          <div key={p.id} className="p-4 flex justify-between items-center gap-2">
            <div className="min-w-0 flex-1">
              <p className="font-bold text-gray-800 text-sm truncate">{p.name}</p>
              <p className="text-[10px] text-gray-500 uppercase">{p.category} · {p.id}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-black text-[#800020]">₹{p.price}</p>
              <p className={`text-[10px] font-bold ${p.stock < 20 ? "text-red-500" : "text-green-600"}`}>
                {p.stock} in stock
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}