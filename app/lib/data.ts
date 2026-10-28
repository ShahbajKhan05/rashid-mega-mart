export type Product = {
  id: string;
  name: string;
  nameHi: string;
  price: number;
  image: string;
  category: string;
  emoji: string;
};

export type Kit = {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  emoji: string;
  items: Record<string, number>;
};

export const products: Product[] = [
  { id: "atta", category: "staples", name: "Wheat Atta", nameHi: "गेहूं का आटा", price: 220, image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=320&q=75", emoji: "🌾" },
  { id: "rice", category: "staples", name: "Basmati Rice", nameHi: "बासमती चावल", price: 250, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=320&q=75", emoji: "🍚" },
  { id: "dal", category: "staples", name: "Toor Dal", nameHi: "अरहर दाल", price: 140, image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=320&q=75", emoji: "🫘" },
  { id: "chana", category: "staples", name: "Chana Dal", nameHi: "चना दाल", price: 100, image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=320&q=75", emoji: "🫘" },
  { id: "oil", category: "oil", name: "Cooking Oil", nameHi: "खाना बनाने का तेल", price: 160, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=320&q=75", emoji: "🫒" },
  { id: "ghee", category: "oil", name: "Ghee", nameHi: "घी", price: 180, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=320&q=75", emoji: "🧈" },
  { id: "tea", category: "tea", name: "Tea Pack", nameHi: "चाय पैक", price: 150, image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=320&q=75", emoji: "🍵" },
  { id: "coffee", category: "tea", name: "Coffee", nameHi: "कॉफी", price: 120, image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=320&q=75", emoji: "☕" },
  { id: "sugar", category: "basics", name: "Sugar", nameHi: "चीनी", price: 50, image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=320&q=75", emoji: "🍚" },
  { id: "salt", category: "basics", name: "Table Salt", nameHi: "नमक", price: 25, image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442a?auto=format&fit=crop&w=320&q=75", emoji: "🧂" },
  { id: "turmeric", category: "masala", name: "Turmeric Powder", nameHi: "हल्दी पाउडर", price: 45, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=320&q=75", emoji: "🟡" },
  { id: "chilli", category: "masala", name: "Red Chilli Powder", nameHi: "लाल मिर्च पाउडर", price: 55, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=320&q=75", emoji: "🌶️" },
  { id: "garam-masala", category: "masala", name: "Garam Masala", nameHi: "गरम मसाला", price: 60, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=320&q=75", emoji: "🫙" },
  { id: "biscuits", category: "snacks", name: "Biscuits", nameHi: "बिस्कुट", price: 35, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=320&q=75", emoji: "🍪" },
  { id: "namkeen", category: "snacks", name: "Namkeen Pack", nameHi: "नमकीन पैक", price: 40, image: "https://images.unsplash.com/photo-1621939514649-280e2aa0f2ff?auto=format&fit=crop&w=320&q=75", emoji: "🥨" },
  { id: "oats", category: "breakfast", name: "Breakfast Oats", nameHi: "ब्रेकफास्ट ओट्स", price: 120, image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=320&q=75", emoji: "🥣" },
  { id: "poha", category: "breakfast", name: "Poha", nameHi: "पोहा", price: 45, image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=320&q=75", emoji: "🥣" },
  { id: "pickle", category: "pantry", name: "Mango Pickle", nameHi: "आम का अचार", price: 90, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=320&q=75", emoji: "🥭" },
  { id: "almonds", category: "dry", name: "Almonds", nameHi: "बादाम", price: 250, image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=320&q=75", emoji: "🥜" },
  { id: "cashews", category: "dry", name: "Cashews", nameHi: "काजू", price: 300, image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=320&q=75", emoji: "🥜" },
];

export const categoryOptions = [
  { id: "all", en: "All Items", hi: "सभी सामान" },
  { id: "staples", en: "Atta, Rice & Dal", hi: "आटा, चावल और दाल" },
  { id: "oil", en: "Oil & Ghee", hi: "तेल और घी" },
  { id: "tea", en: "Tea & Coffee", hi: "चाय और कॉफी" },
  { id: "basics", en: "Salt & Sugar", hi: "नमक और चीनी" },
  { id: "masala", en: "Masala", hi: "मसाले" },
  { id: "snacks", en: "Snacks", hi: "स्नैक्स" },
  { id: "breakfast", en: "Breakfast", hi: "ब्रेकफास्ट" },
  { id: "pantry", en: "Pantry", hi: "किराना" },
  { id: "dry", en: "Dry Fruits", hi: "ड्राई फ्रूट्स" },
];

export const kits: Kit[] = [
  {
    id: "starter",
    name: "Starter Kirana Kit",
    nameHi: "स्टार्टर किराना किट",
    description: "Everyday essentials for getting started.",
    descriptionHi: "रोजमर्रा के जरूरी किराना सामान।",
    emoji: "🛒",
    items: { atta: 1, rice: 1, dal: 1, oil: 1, tea: 1, sugar: 1, salt: 1, biscuits: 1 },
  },
  {
    id: "family",
    name: "Family Essentials Kit",
    nameHi: "फैमिली एसेंशियल्स किट",
    description: "Staples, spices, snacks and more.",
    descriptionHi: "किराना, मसाले, स्नैक्स और अन्य सामान।",
    emoji: "🏠",
    items: { atta: 1, rice: 1, dal: 1, chana: 1, oil: 1, tea: 1, sugar: 1, salt: 1, turmeric: 1, chilli: 1, biscuits: 1, poha: 1 },
  },
  {
    id: "monthly",
    name: "Monthly Grocery Kit",
    nameHi: "मंथली किराना किट",
    description: "A wider selection of pantry essentials.",
    descriptionHi: "ज्यादा मात्रा में जरूरी किराना सामान।",
    emoji: "📦",
    items: { atta: 2, rice: 2, dal: 2, chana: 1, oil: 2, tea: 2, sugar: 2, salt: 1, turmeric: 1, chilli: 1, biscuits: 2, namkeen: 2, poha: 2, oats: 1 },
  },
  {
    id: "premium",
    name: "Premium Family Kit",
    nameHi: "प्रीमियम फैमिली किट",
    description: "More variety with premium pantry extras.",
    descriptionHi: "ज्यादा वैरायटी के साथ प्रीमियम किराना सामान।",
    emoji: "🎁",
    items: { atta: 2, rice: 2, dal: 2, chana: 1, oil: 2, ghee: 1, tea: 2, coffee: 1, sugar: 2, salt: 1, turmeric: 1, chilli: 1, almonds: 1, cashews: 1, oats: 1, biscuits: 2, namkeen: 2 },
  },
  {
    id: "mega",
    name: "Mega Pantry Kit",
    nameHi: "मेगा पेंट्री किट",
    description: "A large grocery selection you can customize.",
    descriptionHi: "बड़ा किराना कलेक्शन, जिसे आप बदल सकते हैं।",
    emoji: "🛍️",
    items: { atta: 4, rice: 4, dal: 4, chana: 3, oil: 4, ghee: 3, tea: 4, coffee: 2, sugar: 3, salt: 3, turmeric: 2, chilli: 2, "garam-masala": 2, almonds: 3, cashews: 3, oats: 2, biscuits: 4, namkeen: 4, pickle: 2, poha: 2 },
  },
];