"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // --- Navbar ---
    home: "Home",
    kits: "Kits",
    categories: "Categories",
    about: "About",
    rewards: "Rewards",
    login: "Login",
    searchPlaceholder: "Search for atta, oil, maggi...",
    deliveryIn: "Delivery in 30 mins",
    cart: "Cart",
    menu: "Menu",
    location: "Ghoghar, Rewa",
    selectLocation: "Select Delivery Location",
    useCurrentLocation: "Use my current location",
    detectAddress: "Detect address using GPS",
    enterManually: "OR ENTER MANUALLY",
    save: "Save",
    locationPlaceholder: "e.g., College Road, Rewa",
    noProductsFound: "No products found",

    // --- Footer ---
    contactUs: "Contact Us",
    quickLinks: "Quick Links",
    followUs: "Follow Us",
    certifiedStore: "Certified Store",
    aboutUs: "About Us",
    privacyPolicy: "Privacy Policy",
    termsConditions: "Terms & Conditions",
    allRightsReserved: "All Rights Reserved.",
    craftedBy: "Crafted by",
    neighbourhoodStore: "Your Neighbourhood Store",

    // --- Common ---
    add: "Add",
    remove: "Remove",
    viewCart: "View Cart",
    continueShopping: "Continue Shopping",
    freeDelivery: "Free Delivery",
    quality: "100% Quality",
    bestPrices: "Best Prices",
    delivery: "Delivery",
    reviews: "Reviews",
    orderOnWhatsApp: "Order on WhatsApp",
    downloadReceipt: "Download Receipt",

    // --- Cart ---
    yourCart: "Your Cart",
    items: "items",
    emptyCart: "Your cart is empty",
    emptyCartDesc: "Your favourite items will appear here.",
    startShopping: "Start Shopping",
    customRequests: "Custom Requests",
    subtotal: "Subtotal",
    total: "Total",
    deliveryEstimate: "Delivery in 30-45 mins",
    confirmOrder: "Please confirm my order. Thank you!",
    deliveryLocation: "Delivery Location",
    suggestionsForYou: "Suggestions for you",
    completeYourOrder: "Complete Your Order",
    pricePending: "Price to be confirmed",
    customItem: "CUSTOM ITEM",

    // --- About Page ---
    aboutHeroTitle: "Making Everyday Shopping Simpler.",
    aboutHeroDesc: "Rashid Mega Mart is your neighbourhood grocery store in Ghoghar, Rewa, Madhya Pradesh.",
    aboutStoryTitle: "Your Everyday Grocery Store",
    aboutMissionTitle: "Our Mission",
    aboutMissionDesc: "To make everyday grocery shopping more accessible, convenient and straightforward for local families.",
    aboutPromiseTitle: "Our Promise",
    aboutPromiseDesc: "Clear product information, transparent prices and a helpful shopping experience.",
    aboutClearInfo: "Clear Information",
    aboutTransparentPricing: "Transparent Pricing",
    aboutHelpfulExperience: "Helpful Experience",
    aboutEssentialsTitle: "Everyday Essentials",
    aboutViewAll: "View All Categories",
    aboutCtaTitle: "Your Daily Needs, One Place.",
    aboutCtaDesc: "Explore everyday groceries and discover convenient grocery kits for your household.",
    shopCategories: "Shop Categories",
    groceryKits: "Grocery Kits",

    // --- Login Page ---
    welcome: "Welcome",
    loginSignup: "Login / Sign Up",
    enterMobile: "Enter your mobile number to continue.",
    continue: "Continue",
    sending: "Sending...",
    verifyOtp: "Verify OTP",
    enterOtp: "Enter the 4-digit OTP",
    verifying: "Verifying...",
    verifyLogin: "Verify & Login",
    newMember: "NEW MEMBER",
    welcomeBackLabel: "WELCOME BACK",
    welcomeFamily: "Welcome to the Family!",
    welcomeBack: "Welcome Back!",
    welcomeAboard: "Welcome Aboard!",
    demoOtp: "Demo OTP: 1234",
    changeNumber: "Change Number?",
    invalidOtp: "Invalid OTP. Use 1234 for demo.",
    invalidNumber: "Please enter a valid 10-digit mobile number.",
    startShoppingCta: "Start Shopping",
    termsNotice: "By continuing, you agree to our Terms & Conditions.",

    // --- Loyalty Page ---
    loyaltyTitle: "Shop More, Earn More",
    loyaltyDesc: "Complete 7 orders and unlock a special ₹100 discount on your next purchase.",
    loyaltyRewards: "LOYALTY REWARDS",
    yourLoyaltyCard: "Your Loyalty Card",
    goldMembership: "GOLD MEMBERSHIP",
    yourProgress: "Your Progress",
    orders: "Orders",
    claim: "Claim",
    reward: "Reward",
    claimReward: "Claim ₹100 Reward Now",
    shopEarnStamp: "Shop & Earn a Stamp",
    howItWorks: "How It Works",
    stepShopTitle: "Shop & Order",
    stepShopDesc: "Place any order from our app or WhatsApp.",
    stepStampTitle: "Earn a Stamp",
    stepStampDesc: "Get 1 stamp with every completed order.",
    stepRewardTitle: "Unlock Reward",
    stepRewardDesc: "Collect 7 stamps and get ₹100 off.",

    // --- Old Keys (Keep for backward compatibility) ---
    offers: "Offers",
    ourKit: "Our Kit",
    ourTeam: "Our Team",
    wishlist: "Wishlist",
    headlineFirst: "Ghar ki zaroorat.",
    headlineSecond: "Ek hi kit mein.",
    heroDescription: "₹1,153 ka samaan ab sirf ₹1,100 mein.",
    buildKit: "Customize Your Kit ↓",
    itemsSelected: "items selected",
    bestValue: "Best Value",
    customKit: "Build your kit",
    yourTotal: "Your Total",
    quantity: "Quantity",
    madeWith: "Made with",
    by: "by",
    whatsappBtn: "WhatsApp ↗",
    whatsappTalk: "WhatsApp Par Baat Karein ↗",
  },
  
  hi: {
    // --- Navbar ---
    home: "होम",
    kits: "किट्स",
    categories: "कैटेगरी",
    about: "हमारे बारे में",
    rewards: "रिवॉर्ड्स",
    login: "लॉगिन",
    searchPlaceholder: "आटा, तेल, मैगी खोजें...",
    deliveryIn: "30 मिनट में डिलीवरी",
    cart: "कार्ट",
    menu: "मेन्यू",
    location: "घोघर, रीवा",
    selectLocation: "डिलीवरी लोकेशन चुनें",
    useCurrentLocation: "वर्तमान लोकेशन का उपयोग करें",
    detectAddress: "GPS के ज़रिए पता खोजें",
    enterManually: "या मैन्युअल रूप से डालें",
    save: "सेव करें",
    locationPlaceholder: "जैसे: College Road, Rewa",
    noProductsFound: "कोई सामान नहीं मिला",

    // --- Footer ---
    contactUs: "संपर्क करें",
    quickLinks: "महत्वपूर्ण लिंक",
    followUs: "हमसे जुड़ें",
    certifiedStore: "प्रमाणित दुकान",
    aboutUs: "हमारे बारे में",
    privacyPolicy: "गोपनीयता नीति",
    termsConditions: "नियम और शर्तें",
    allRightsReserved: "सर्वाधिकार सुरक्षित।",
    craftedBy: "द्वारा निर्मित",
    neighbourhoodStore: "आपकी पड़ोसी दुकान",

    // --- Common ---
    add: "जोड़ें",
    remove: "हटाएं",
    viewCart: "कार्ट देखें",
    continueShopping: "खरीदारी जारी रखें",
    freeDelivery: "फ्री डिलीवरी",
    quality: "100% शुद्ध",
    bestPrices: "सबसे सस्ता",
    delivery: "डिलीवरी",
    reviews: "रिव्यूज़",
    orderOnWhatsApp: "WhatsApp पर ऑर्डर करें",
    downloadReceipt: "रसीद डाउनलोड करें",

    // --- Cart ---
    yourCart: "आपका कार्ट",
    items: "आइटम",
    emptyCart: "कार्ट खाली है",
    emptyCartDesc: "आपकी पसंदीदा चीज़ें यहाँ दिखेंगी।",
    startShopping: "खरीदारी शुरू करें",
    customRequests: "कस्टम अनुरोध",
    subtotal: "सबटोटल",
    total: "कुल राशि",
    deliveryEstimate: "डिलीवरी: 30-45 मिनट",
    confirmOrder: "कृपया मेरा ऑर्डर कन्फर्म करें। धन्यवाद!",
    deliveryLocation: "डिलीवरी लोकेशन",
    suggestionsForYou: "आपके लिए सुझाव",
    completeYourOrder: "इसके साथ लें",
    pricePending: "कीमत बाद में",
    customItem: "कस्टम सामान",

    // --- About Page ---
    aboutHeroTitle: "रोज़मर्रा की खरीदारी, अब और आसान।",
    aboutHeroDesc: "राशिद मेगा मार्ट, घोघर, रीवा (मध्य प्रदेश) में आपका पड़ोसी किराना स्टोर है।",
    aboutStoryTitle: "आपका रोज़मर्रा का किराना स्टोर",
    aboutMissionTitle: "हमारा मिशन",
    aboutMissionDesc: "स्थानीय परिवारों के लिए रोज़मर्रा की किराना खरीदारी को अधिक सुलभ, सुविधाजनक और सरल बनाना।",
    aboutPromiseTitle: "हमारा वादा",
    aboutPromiseDesc: "स्पष्ट उत्पाद जानकारी, पारदर्शी कीमतें और एक सहायक खरीदारी अनुभव।",
    aboutClearInfo: "स्पष्ट जानकारी",
    aboutTransparentPricing: "पारदर्शी कीमतें",
    aboutHelpfulExperience: "सहायक अनुभव",
    aboutEssentialsTitle: "रोज़मर्रा की ज़रूरतें",
    aboutViewAll: "सभी श्रेणियाँ देखें",
    aboutCtaTitle: "आपकी रोज़ की ज़रूरतें, एक जगह।",
    aboutCtaDesc: "रोज़मर्रा का किराना सामान खोजें और अपने घर के लिए सुविधाजनक ग्रोसरी किट्स की खोज करें।",
    shopCategories: "श्रेणियाँ देखें",
    groceryKits: "ग्रोसरी किट्स",

    // --- Login Page ---
    welcome: "स्वागत है",
    loginSignup: "लॉगिन / साइन अप",
    enterMobile: "मोबाइल नंबर दर्ज करके आगे बढ़ें।",
    continue: "आगे बढ़ें",
    sending: "भेजा जा रहा है...",
    verifyOtp: "OTP सत्यापित करें",
    enterOtp: "4 अंकों का OTP दर्ज करें",
    verifying: "सत्यापित हो रहा है...",
    verifyLogin: "सत्यापित करें और लॉगिन करें",
    newMember: "नए सदस्य",
    welcomeBackLabel: "वापसी पर स्वागत",
    welcomeFamily: "परिवार में आपका स्वागत है!",
    welcomeBack: "आपका फिर से स्वागत है!",
    welcomeAboard: "स्वागत है!",
    demoOtp: "डेमो OTP: 1234",
    changeNumber: "नंबर बदलें?",
    invalidOtp: "गलत OTP। डेमो के लिए 1234 डालें।",
    invalidNumber: "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें।",
    startShoppingCta: "खरीदारी शुरू करें",
    termsNotice: "आगे बढ़ने पर आप हमारी नियम और शर्तें स्वीकार करते हैं।",

    // --- Loyalty Page ---
    loyaltyTitle: "खरीदारी करें, इनाम पाएं",
    loyaltyDesc: "हर 7 ऑर्डर पूरे करने पर पाएं ₹100 का डिस्काउंट।",
    loyaltyRewards: "राशिद मेगा मार्ट रिवॉर्ड्स",
    yourLoyaltyCard: "आपका लॉयल्टी कार्ड",
    goldMembership: "गोल्ड सदस्यता",
    yourProgress: "आपकी प्रगति",
    orders: "ऑर्डर",
    claim: "दावा करें",
    reward: "इनाम",
    claimReward: "अभी ₹100 का इनाम इस्तेमाल करें",
    shopEarnStamp: "ऑर्डर करें और स्टाम्प पाएं",
    howItWorks: "यह कैसे काम करता है?",
    stepShopTitle: "खरीदारी करें",
    stepShopDesc: "हमारे ऐप या WhatsApp से कोई भी ऑर्डर करें।",
    stepStampTitle: "स्टाम्प पाएं",
    stepStampDesc: "हर पूरे ऑर्डर पर 1 स्टाम्प पाएं।",
    stepRewardTitle: "इनाम पाएं",
    stepRewardDesc: "7 स्टाम्प पूरे करें और ₹100 की छूट पाएं।",

    // --- Old Keys ---
    offers: "ऑफ़र्स",
    ourKit: "हमारी किट",
    ourTeam: "हमारी टीम",
    wishlist: "विशलिस्ट",
    headlineFirst: "घर की ज़रूरत।",
    headlineSecond: "एक ही किट में।",
    heroDescription: "₹1,153 का सामान अब सिर्फ़ ₹1,100 में।",
    buildKit: "अपनी किट कस्टमाइज़ करें ↓",
    itemsSelected: "सामान चुने गए",
    bestValue: "सर्वश्रेष्ठ मूल्य",
    customKit: "अपनी किट बनाएं",
    yourTotal: "आपका कुल योग",
    quantity: "मात्रा",
    madeWith: "प्रेम से निर्मित",
    by: "द्वारा",
    whatsappBtn: "व्हाट्सएप ↗",
    whatsappTalk: "व्हाट्सएप पर बात करें ↗",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("app_lang") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "hi")) {
      setLanguage(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "hi" : "en";
    setLanguage(nextLang);
    localStorage.setItem("app_lang", nextLang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}