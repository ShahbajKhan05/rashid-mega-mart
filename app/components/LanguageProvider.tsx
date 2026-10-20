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
    home: "Home",
    categories: "Categories",
    offers: "Offers",
    about: "About",
    ourKit: "Our Kit",
    ourTeam: "Our Team",
    wishlist: "Wishlist",
    cart: "Cart",
    location: "Deliver to: Rewa, Madhya Pradesh",
    headlineFirst: "Ghar ki zaroorat.",
    headlineSecond: "Ek hi kit mein.",
    heroDescription: "₹1,153 ka samaan ab sirf ₹1,100 mein. Samaan aur quantity apne hisaab se chunein.",
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
    home: "होम",
    categories: "कैटेगरीज़",
    offers: "ऑफ़र्स",
    about: "हमारे बारे में",
    ourKit: "हमारी किट",
    ourTeam: "हमारी टीम",
    wishlist: "विशलिस्ट",
    cart: "कार्ट",
    location: "डिलीवरी स्थान: रीवा, मध्य प्रदेश",
    headlineFirst: "घर की ज़रूरत।",
    headlineSecond: "एक ही किट में।",
    heroDescription: "₹1,153 का सामान अब सिर्फ़ ₹1,100 में। सामान और मात्रा अपनी ज़रूरत के अनुसार चुनें।",
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