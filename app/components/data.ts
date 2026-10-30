// app/components/data.ts

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
  // --- STAPLES (Atta, Rice & Dal) ---
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
    brand: "Aashirvaad",
    unit: "5 kg",
    description: "Buy Aashirvaad Shudh Chakki Atta online at Rashid Mega Mart. 100% whole wheat, no maida, gives you soft and fluffy rotis."
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
    brand: "India Gate",
    unit: "2 kg",
    description: "Buy India Gate Basmati Rice online. Long grain, aromatic rice perfect for biryani and daily meals."
  },
  { 
    id: "toor-dal", 
    slug: "tata-sampann-toor-dal-1kg",
    category: "staples", 
    name: "Tata Sampann Toor Dal 1kg", 
    nameHi: "टाटा संपन्न तूर दाल 1kg", 
    price: 160, 
    originalPrice: 190, 
    rating: 4.6, 
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80", 
    emoji: "🥣",
    brand: "Tata Sampann",
    unit: "1 kg",
    description: "Unpolished Toor Dal from Tata Sampann. Rich in protein, no artificial polish."
  },
  { 
    id: "moong-dal", 
    slug: "moong-dal-1kg",
    category: "staples", 
    name: "Moong Dal 1kg", 
    nameHi: "मूंग दाल 1kg", 
    price: 140, 
    originalPrice: 170, 
    rating: 4.5, 
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80", 
    emoji: "🫘",
    brand: "Local",
    unit: "1 kg",
    description: "Premium quality yellow moong dal, easy to digest and perfect for daily meals."
  },
  { 
    id: "besan", 
    slug: "besan-1kg",
    category: "staples", 
    name: "Besan (Gram Flour) 1kg", 
    nameHi: "बेसन 1kg", 
    price: 90, 
    originalPrice: 110, 
    rating: 4.4, 
    image: "https://images.unsplash.com/photo-1626202812161-3a6e4bb9d5a4?w=400&q=80", 
    emoji: "🌾",
    brand: "Local",
    unit: "1 kg",
    description: "Fine quality gram flour, perfect for pakoras, chillas and sweets."
  },

  // --- OIL & GHEE ---
  { 
    id: "fortune-sunflower-oil", 
    slug: "fortune-sunflower-oil-1l",
    category: "oil", 
    name: "Fortune Sunflower Oil 1L", 
    nameHi: "फॉर्च्यून सूरजमुखी तेल 1L", 
    price: 135, 
    originalPrice: 160, 
    rating: 4.7, 
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80", 
    emoji: "🌻",
    brand: "Fortune",
    unit: "1 L",
    description: "Fortune Sunlite Refined Sunflower Oil. Light and healthy for everyday cooking."
  },
  { 
    id: "mustard-oil", 
    slug: "kachi-ghani-mustard-oil-1l",
    category: "oil", 
    name: "Kachi Ghani Mustard Oil 1L", 
    nameHi: "कच्ची घानी सरसों तेल 1L", 
    price: 150, 
    originalPrice: 180, 
    rating: 4.8, 
    image: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=400&q=80", 
    emoji: "🌿",
    brand: "Fortune",
    unit: "1 L",
    description: "Pure Kachi Ghani Mustard Oil. Strong aroma and authentic taste for pickles and cooking."
  },
  { 
    id: "amul-ghee", 
    slug: "amul-pure-ghee-1l",
    category: "oil", 
    name: "Amul Pure Ghee 1L", 
    nameHi: "अमूल प्योर घी 1L", 
    price: 600, 
    originalPrice: 650, 
    rating: 4.9, 
    image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=400&q=80", 
    emoji: "🧈",
    brand: "Amul",
    unit: "1 L",
    description: "Amul Pure Cow Ghee, rich in taste and aroma. Perfect for festivals and daily cooking."
  },
  { 
    id: "refined-oil", 
    slug: "refined-soyabean-oil-1l",
    category: "oil", 
    name: "Refined Soyabean Oil 1L", 
    nameHi: "रिफाइंड सोयाबीन तेल 1L", 
    price: 120, 
    originalPrice: 145, 
    rating: 4.3, 
    image: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=400&q=80", 
    emoji: "🛢️",
    brand: "Fortune",
    unit: "1 L",
    description: "Refined soyabean oil for daily cooking. Light on stomach and healthy."
  },
  { 
    id: "coconut-oil", 
    slug: "parachute-coconut-oil-500ml",
    category: "oil", 
    name: "Parachute Coconut Oil 500ml", 
    nameHi: "पैराशूट नारियल तेल 500ml", 
    price: 180, 
    originalPrice: 210, 
    rating: 4.6, 
    image: "https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?w=400&q=80", 
    emoji: "🥥",
    brand: "Parachute",
    unit: "500 ml",
    description: "100% pure coconut oil for hair and cooking. Adds a distinct flavor to South Indian dishes."
  },

  // --- BASICS (Salt & Sugar) ---
  { 
    id: "tata-salt", 
    slug: "tata-salt-1kg",
    category: "basics", 
    name: "Tata Salt 1kg", 
    nameHi: "टाटा नमक 1kg", 
    price: 25, 
    originalPrice: 28, 
    rating: 4.9, 
    image: "https://images.unsplash.com/photo-1626197031507-c17099753214?w=400&q=80", 
    emoji: "🧂",
    brand: "Tata",
    unit: "1 kg",
    description: "Tata Salt, India's most trusted iodized salt. Vacuum evaporated for purity."
  },
  { 
    id: "sugar", 
    slug: "sugar-1kg",
    category: "basics", 
    name: "Sugar 1kg", 
    nameHi: "चीनी 1kg", 
    price: 45, 
    originalPrice: 50, 
    rating: 4.5, 
    image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=400&q=80", 
    emoji: "🍬",
    brand: "Local",
    unit: "1 kg",
    description: "Pure white sugar crystals. Perfect for tea, coffee and baking."
  },
  { 
    id: "jaggery", 
    slug: "organic-jaggery-500g",
    category: "basics", 
    name: "Organic Jaggery (Gud) 500g", 
    nameHi: "ऑर्गेनिक गुड़ 500g", 
    price: 60, 
    originalPrice: 75, 
    rating: 4.7, 
    image: "https://images.unsplash.com/photo-1626202812161-3a6e4bb9d5a4?w=400&q=80", 
    emoji: "🍯",
    brand: "Organic India",
    unit: "500 g",
    description: "Natural and chemical-free jaggery. A healthier alternative to sugar."
  },
  { 
    id: "rock-salt", 
    slug: "rock-salt-1kg",
    category: "basics", 
    name: "Rock Salt (Sendha Namak) 1kg", 
    nameHi: "सेंधा नमक 1kg", 
    price: 40, 
    originalPrice: 50, 
    rating: 4.6, 
    image: "https://images.unsplash.com/photo-1626197031507-c17099753214?w=400&q=80", 
    emoji: "🧂",
    brand: "Local",
    unit: "1 kg",
    description: "Pure rock salt, ideal for fasting and Vrat recipes."
  },
  { 
    id: "black-salt", 
    slug: "black-salt-200g",
    category: "basics", 
    name: "Black Salt (Kala Namak) 200g", 
    nameHi: "काला नमक 200g", 
    price: 30, 
    originalPrice: 35, 
    rating: 4.4, 
    image: "https://images.unsplash.com/photo-1626197031507-c17099753214?w=400&q=80", 
    emoji: "🧂",
    brand: "Local",
    unit: "200 g",
    description: "Authentic black salt for chaats, raitas and summer drinks."
  },

  // --- DAIRY & BAKERY ---
  { 
    id: "amul-butter", 
    slug: "amul-butter-500g",
    category: "dairy", 
    name: "Amul Butter 500g", 
    nameHi: "अमूल बटर 500g", 
    price: 265, 
    originalPrice: 285, 
    rating: 4.9, 
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80", 
    emoji: "🧈",
    brand: "Amul",
    unit: "500 g",
    description: "Amul Salted Butter. Utterly Butterly Delicious! Perfect for toasts and parathas."
  },
  { 
    id: "amul-milk", 
    slug: "amul-taaza-milk-1l",
    category: "dairy", 
    name: "Amul Taaza Milk 1L", 
    nameHi: "अमूल ताज़ा दूध 1L", 
    price: 68, 
    originalPrice: 72, 
    rating: 4.8, 
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80", 
    emoji: "🥛",
    brand: "Amul",
    unit: "1 L",
    description: "Amul Taaza Toned Milk. Homogenized and pasteurized for purity."
  },
  { 
    id: "amul-cheese", 
    slug: "amul-cheese-slices-200g",
    category: "dairy", 
    name: "Amul Cheese Slices 200g", 
    nameHi: "अमूल चीज़ स्लाइस 200g", 
    price: 125, 
    originalPrice: 140, 
    rating: 4.7, 
    image: "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=400&q=80", 
    emoji: "🧀",
    brand: "Amul",
    unit: "200 g",
    description: "Processed cheese slices for sandwiches, burgers and pizzas."
  },
  { 
    id: "britannia-bread", 
    slug: "britannia-brown-bread-400g",
    category: "bakery", 
    name: "Britannia Brown Bread 400g", 
    nameHi: "ब्रिटानिया ब्राउन ब्रेड 400g", 
    price: 45, 
    originalPrice: 50, 
    rating: 4.5, 
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80", 
    emoji: "🍞",
    brand: "Britannia",
    unit: "400 g",
    description: "Soft and healthy brown bread, perfect for morning breakfast."
  },
  { 
    id: "eggs", 
    slug: "farm-fresh-eggs-6pcs",
    category: "dairy", 
    name: "Farm Fresh Eggs (6 pcs)", 
    nameHi: "फार्म फ्रेश अंडे (6 pcs)", 
    price: 48, 
    originalPrice: 60, 
    rating: 4.6, 
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&q=80", 
    emoji: "🥚",
    brand: "Local Farm",
    unit: "6 pcs",
    description: "High protein farm fresh eggs. Perfect for breakfast and baking."
  }
];

export const categoryOptions = [
  { id: "all", en: "All Items", hi: "सभी सामान" },
  { id: "staples", en: "Atta, Rice & Dal", hi: "आटा, चावल और दाल" },
  { id: "oil", en: "Oil & Ghee", hi: "तेल और घी" },
  { id: "basics", en: "Salt & Sugar", hi: "नमक और चीनी" },
  { id: "dairy", en: "Dairy & Eggs", hi: "डेयरी और अंडे" },
  { id: "bakery", en: "Bakery", hi: "बेकरी" },
];