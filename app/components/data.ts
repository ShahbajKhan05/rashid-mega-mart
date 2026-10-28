export type Product = {
  id: string;
  name: string;
  nameHi: string;
  price: number;
  originalPrice: number; 
  rating: number;        
  image: string;
  category: string;
  emoji: string;
};

export type Kit = {
  id: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  image: string; 
  bg: string;
  price: number;
  originalPrice: number;
  items: Record<string, number>;
};

// 1. Products Database (Sabhi items jo kits aur products page me use honge)
export const products: Product[] = [
  // Atta & Rice
  { id: "aashirvaad-atta", category: "staples", name: "Aashirvaad Atta 5kg", nameHi: "आशीर्वाद आटा 5kg", price: 240, originalPrice: 280, rating: 4.8, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80", emoji: "🌾" },
  { id: "india-gate-rice", category: "staples", name: "India Gate Basmati Rice 2kg", nameHi: "इंडिया गेट बासमती चावल 2kg", price: 280, originalPrice: 350, rating: 4.7, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80", emoji: "🍚" },
  
  // Oil & Ghee
  { id: "fortune-oil", category: "oil", name: "Fortune Sunlite Oil 1L", nameHi: "फॉर्च्यून सनलाइट तेल 1L", price: 140, originalPrice: 170, rating: 4.6, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80", emoji: "🫒" },
  
  // Salt & Sugar
  { id: "tata-salt", category: "basics", name: "Tata Salt 1kg", nameHi: "टाटा नमक 1kg", price: 28, originalPrice: 30, rating: 4.9, image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442a?w=400&q=80", emoji: "🧂" },
  { id: "uttam-sugar", category: "basics", name: "Uttam Sugar 1kg", nameHi: "उत्तम चीनी 1kg", price: 45, originalPrice: 55, rating: 4.5, image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=400&q=80", emoji: "🍚" },

  // Dals
  { id: "arhar-dal", category: "staples", name: "Arhar Dal 1kg", nameHi: "अरहर दाल 1kg", price: 160, originalPrice: 190, rating: 4.6, image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&q=80", emoji: "🫘" },
  { id: "moong-dal", category: "staples", name: "Moong Dal 500g", nameHi: "मूंग दाल 500g", price: 90, originalPrice: 110, rating: 4.5, image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&q=80", emoji: "🫘" },
  { id: "masoor-dal", category: "staples", name: "Masoor Dal 500g", nameHi: "मसूर दाल 500g", price: 85, originalPrice: 100, rating: 4.4, image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&q=80", emoji: "🫘" },
  { id: "chana-dal", category: "staples", name: "Chana Dal 1kg", nameHi: "चना दाल 1kg", price: 100, originalPrice: 120, rating: 4.5, image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&q=80", emoji: "🫘" },

  // Masala & Spices
  { id: "everest-chilli", category: "masala", name: "Everest Red Chilli Powder 100g", nameHi: "एवरेस्ट लाल मिर्च 100g", price: 45, originalPrice: 55, rating: 4.8, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80", emoji: "🌶️" },
  { id: "everest-haldi", category: "masala", name: "Everest Turmeric Powder 100g", nameHi: "एवरेस्ट हल्दी 100g", price: 40, originalPrice: 50, rating: 4.7, image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80", emoji: "🟡" },
  { id: "everest-dhaniya", category: "masala", name: "Everest Coriander Powder 100g", nameHi: "एवरेस्ट धनिया पाउडर 100g", price: 38, originalPrice: 45, rating: 4.6, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80", emoji: "🫙" },
  { id: "everest-garam", category: "masala", name: "Everest Garam Masala 100g", nameHi: "एवरेस्ट गरम मसाला 100g", price: 65, originalPrice: 80, rating: 4.8, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80", emoji: "🫙" },
  { id: "dalchini", category: "masala", name: "Dalchini (Cinnamon) 50g", nameHi: "दालचीनी 50g", price: 30, originalPrice: 40, rating: 4.4, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80", emoji: "🪵" },
  { id: "jeera", category: "masala", name: "Jeera (Cumin) 100g", nameHi: "जीरा 100g", price: 50, originalPrice: 60, rating: 4.5, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80", emoji: "🌰" },

  // Breakfast & Snacks
  { id: "maggi", category: "snacks", name: "Maggi 2-Min Noodles (Pack of 4)", nameHi: "मैगी 2-मिनट नूडल्स (4 पैक)", price: 56, originalPrice: 70, rating: 4.8, image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=80", emoji: "🍜" },
  { id: "poha", category: "breakfast", name: "Bhagwat Poha 500g", nameHi: "भगवत पोहा 500g", price: 25, originalPrice: 35, rating: 4.3, image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80", emoji: "🥣" },
  { id: "biscuit", category: "snacks", name: "Brooke Bond Biscuit", nameHi: "ब्रुक बॉन्ड बिस्कुट", price: 30, originalPrice: 40, rating: 4.5, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80", emoji: "🍪" },
  { id: "peanuts", category: "snacks", name: "Moongfalli (Peanuts) 250g", nameHi: "मूंगफली 250g", price: 35, originalPrice: 45, rating: 4.4, image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&q=80", emoji: "🥜" },

  // Tea & Coffee
  { id: "tata-tea", category: "tea", name: "Tata Tea Premium 250g", nameHi: "टाटा टी प्रीमियम 250g", price: 120, originalPrice: 140, rating: 4.9, image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80", emoji: "🍵" },
  { id: "red-label", category: "tea", name: "Red Label Tea 250g", nameHi: "रेड लेबल चाय 250g", price: 110, originalPrice: 130, rating: 4.7, image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80", emoji: "🍵" },

  // Household & Personal Care
  { id: "surf-excel", category: "household", name: "Surf Excel Detergent 500g", nameHi: "सर्फ एक्सेल 500g", price: 60, originalPrice: 75, rating: 4.8, image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&q=80", emoji: "🧺" },
  { id: "dettol", category: "personal-care", name: "Dettol Handwash 1 Unit", nameHi: "डेटॉल हैंडवॉश 1 यूनिट", price: 99, originalPrice: 120, rating: 4.9, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80", emoji: "🧴" },
  { id: "colgate", category: "personal-care", name: "Colgate Toothpaste 100g", nameHi: "कोलगेट टूथपेस्ट 100g", price: 55, originalPrice: 65, rating: 4.8, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80", emoji: "🪥" },
];

// 2. Premium Kits Database (Aapki 4 images wali kits)
export const kits: Kit[] = [
  {
    id: "smart-bachat",
    titleEn: "Smart Bachat Kit",
    titleHi: "स्मार्ट बचत किट",
    descEn: "Daily essentials at a better price.",
    descHi: "रोजमर्रा की जरूरतें, एक बेहतर कीमत में।",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
    bg: "from-[#FCE4C3] to-[#D9B284]",
    price: 499,
    originalPrice: 560,
    items: {
      "aashirvaad-atta": 1, "fortune-oil": 1, "tata-salt": 1, "arhar-dal": 1,
      "everest-chilli": 1, "everest-dhaniya": 1, "everest-garam": 1, "maggi": 1,
      "dettol": 1, "poha": 1, "peanuts": 1, "tata-tea": 1, "biscuit": 1
    }
  },
  {
    id: "family-essential",
    titleEn: "Family Essentials Kit",
    titleHi: "फैमिली एसेंशियल्स किट",
    descEn: "Complete daily needs for the whole family.",
    descHi: "पूरे परिवार के लिए रोजमर्रा की जरूरतें।",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80",
    bg: "from-[#F5E3D3] to-[#DDB898]",
    price: 999,
    originalPrice: 1120,
    items: {
      "aashirvaad-atta": 1, "india-gate-rice": 1, "fortune-oil": 1, "tata-salt": 1,
      "arhar-dal": 1, "moong-dal": 1, "uttam-sugar": 1, "maggi": 1, "tata-tea": 1,
      "biscuit": 1, "everest-chilli": 1, "everest-haldi": 1, "poha": 1, "surf-excel": 1, "dettol": 1
    }
  },
  {
    id: "family-saver",
    titleEn: "Family Saver Kit",
    titleHi: "फैमिली सेवर किट",
    descEn: "Perfect pack for a complete family.",
    descHi: "पूरे परिवार के लिए एकदम परफेक्ट।",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80",
    bg: "from-[#E6F0DF] to-[#CFE1C0]",
    price: 1599,
    originalPrice: 1950,
    items: {
      "aashirvaad-atta": 2, "india-gate-rice": 2, "fortune-oil": 2, "tata-salt": 2,
      "uttam-sugar": 2, "arhar-dal": 1, "moong-dal": 1, "masoor-dal": 1, "maggi": 4,
      "red-label": 1, "everest-chilli": 1, "everest-haldi": 1, "everest-dhaniya": 1,
      "dalchini": 1, "jeera": 1, "poha": 1, "biscuit": 1, "surf-excel": 1, "dettol": 1, "peanuts": 1
    }
  },
  {
    id: "ration-saver",
    titleEn: "Family Ration Saver Kit",
    titleHi: "फैमिली राशन सेवर किट",
    descEn: "Full month ration for the whole family.",
    descHi: "पूरे परिवार के लिए पूरे महीने का राशन।",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80",
    bg: "from-[#FBE0DB] to-[#E8B6A6]",
    price: 1999,
    originalPrice: 2650,
    items: {
      "aashirvaad-atta": 2, "india-gate-rice": 2, "fortune-oil": 2, "tata-salt": 1,
      "uttam-sugar": 2, "arhar-dal": 2, "moong-dal": 1, "masoor-dal": 1, "chana-dal": 1,
      "maggi": 4, "tata-tea": 1, "red-label": 1, "everest-chilli": 2, "everest-haldi": 2,
      "everest-dhaniya": 2, "everest-garam": 1, "biscuit": 2, "surf-excel": 1, "dettol": 1, "colgate": 1
    }
  }
];

// 3. Categories for Search Filter (Yeh missing tha jisse error aa raha tha)
export const categoryOptions = [
  { id: "all", en: "All Items", hi: "सभी सामान" },
  { id: "staples", en: "Atta, Rice & Dal", hi: "आटा, चावल और दाल" },
  { id: "oil", en: "Oil & Ghee", hi: "तेल और घी" },
  { id: "basics", en: "Salt & Sugar", hi: "नमक और चीनी" },
  { id: "masala", en: "Spices", hi: "मसाले" },
  { id: "snacks", en: "Snacks", hi: "स्नैक्स" },
  { id: "breakfast", en: "Breakfast", hi: "ब्रेकफास्ट" },
  { id: "tea", en: "Tea & Coffee", hi: "चाय और कॉफी" },
  { id: "household", en: "Household", hi: "घरेलू सामान" },
  { id: "personal-care", en: "Personal Care", hi: "पर्सनल केयर" },
];