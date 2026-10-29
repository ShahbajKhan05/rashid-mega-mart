export type Product = {
  id: string;
  slug: string; // 🔥 SEO ke liye
  name: string;
  nameHi: string;
  price: number;
  originalPrice: number; 
  rating: number;        
  image: string;
  brand?: string; 
  unit?: string;
  category: string;
  emoji: string;
  description?: string; // 🔥 SEO ke liye
};

export const products: Product[] = [
  { 
    id: "aashirvaad-atta", 
    slug: "aashirvaad-atta-5kg",
    category: "staples", 
    name: "Aashirvaad Atta 5kg", 
    nameHi: "आशीर्वाद आटा 5kg", 
    price: 240, 
    originalPrice: 280, 
    rating: 4.8, 
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80", 
    emoji: "🌾",
    description: "Buy Aashirvaad Shudh Chakki Atta online at Rashid Mega Mart. 100% whole wheat, no maida, gives you soft and fluffy rotis. Fast delivery."
  },
  { 
    id: "india-gate-rice", 
    slug: "india-gate-rice-2kg",
    category: "staples", 
    name: "India Gate Basmati Rice 2kg", 
    nameHi: "इंडिया गेट बासमती चावल 2kg", 
    price: 280, 
    originalPrice: 350, 
    rating: 4.7, 
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80", 
    emoji: "🍚",
    description: "Buy India Gate Basmati Rice online. Long grain, aromatic rice perfect for biryani and daily meals."
  },
  // ... (Baaki products me bhi slug aur description add karein)
];

export const categoryOptions = [
  { id: "all", en: "All Items", hi: "सभी सामान" },
  { id: "staples", en: "Atta, Rice & Dal", hi: "आटा, चावल और दाल" },
  { id: "oil", en: "Oil & Ghee", hi: "तेल और घी" },
  { id: "basics", en: "Salt & Sugar", hi: "नमक और चीनी" },
];