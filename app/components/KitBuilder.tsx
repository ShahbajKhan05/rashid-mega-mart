"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

export const KITS_DATA = [
  {
    id: "500-kit",
    nameEn: "Smart Bachat Pack",
    nameHi: "स्मार्ट बचत पैक",
    descEn: "15 Essential items - Daily budget grocery kit (₹500)",
    descHi: "15 ज़रूरी सामान - दैनिक बजट किट (₹500)",
    badgeEn: "BUDGET STARTER",
    badgeHi: "बजट स्टार्टर",
    totalPrice: 500,
    mrp: 515,
    items: [
      { nameEn: "Kinki", nameHi: "किंकी", pack: "3 kg", price: 105, icon: "🌾", qty: 1 },
      { nameEn: "Oil", nameHi: "तेल", pack: "500 g", price: 90, icon: "🍶", qty: 1 },
      { nameEn: "Namak", nameHi: "नमक", pack: "1 kg", price: 15, icon: "🧂", qty: 1 },
      { nameEn: "Mirchi", nameHi: "मिर्ची", pack: "2 Packets", price: 20, icon: "🌶️", qty: 1 },
      { nameEn: "Dhaniya Big", nameHi: "धनिया बड़ा", pack: "2 Packets", price: 20, icon: "🌿", qty: 1 },
      { nameEn: "Dhaniya Small", nameHi: "धनिया छोटा", pack: "1 Packet", price: 10, icon: "🌿", qty: 1 },
      { nameEn: "Dalchini", nameHi: "दालचीनी", pack: "1 Pouch", price: 10, icon: "🪵", qty: 1 },
      { nameEn: "Dal", nameHi: "दाल", pack: "1 kg", price: 75, icon: "🥣", qty: 1 },
      { nameEn: "Poha", nameHi: "पोहा", pack: "500 g", price: 30, icon: "🥣", qty: 1 },
      { nameEn: "Moongfali", nameHi: "मूंगफली", pack: "100 g", price: 20, icon: "🥜", qty: 1 },
      { nameEn: "Agarbatti", nameHi: "अगरबत्ती", pack: "1 Packet", price: 10, icon: "🪔", qty: 1 },
      { nameEn: "Maggi", nameHi: "मैगी", pack: "1 Packet", price: 15, icon: "🍜", qty: 1 },
      { nameEn: "Dettol Handwash", nameHi: "डेटॉल हैंडवॉश", pack: "1 Unit", price: 10, icon: "🧼", qty: 1 },
      { nameEn: "Shakkar", nameHi: "शक्कर", pack: "1 kg", price: 60, icon: "🌾", qty: 1 },
      { nameEn: "Chaypatti", nameHi: "चायपत्ती", pack: "100 g", price: 25, icon: "☕", qty: 1 },
    ],
  },
  {
    id: "1000-refined-kit",
    nameEn: "Daily Essentials Combo",
    nameHi: "डेली एसेंशियल कॉम्बो",
    descEn: "13 Essential products with Refined & Sarso Oil (₹1000)",
    descHi: "13 ज़रूरी उत्पाद (रिफाइंड एवं सरसों तेल) (₹1000)",
    badgeEn: "MOST POPULAR",
    badgeHi: "सबसे लोकप्रिय",
    totalPrice: 1000,
    mrp: 1020,
    items: [
      { nameEn: "Kinki", nameHi: "किंकी", pack: "5 kg", price: 175, icon: "🌾", qty: 1 },
      { nameEn: "Shakkar", nameHi: "शक्कर", pack: "2 kg", price: 120, icon: "🌾", qty: 1 },
      { nameEn: "Sarso Oil", nameHi: "सरसों तेल", pack: "2 Litre", price: 340, icon: "🍶", qty: 1 },
      { nameEn: "Refined Oil", nameHi: "रिफाइंड तेल", pack: "1 Litre", price: 135, icon: "🛢️", qty: 1 },
      { nameEn: "Tata Namak", nameHi: "टाटा नमक", pack: "1 kg", price: 30, icon: "🧂", qty: 1 },
      { nameEn: "Mirch Taj", nameHi: "मिर्च ताज", pack: "100 g", price: 40, icon: "🌶️", qty: 1 },
      { nameEn: "Dhaniya Taj", nameHi: "धनिया ताज", pack: "100 g", price: 30, icon: "🌿", qty: 1 },
      { nameEn: "Haldi Taj", nameHi: "हल्दी ताज", pack: "100 g", price: 35, icon: "🌶️", qty: 1 },
      { nameEn: "Kapde Wali Sabun", nameHi: "कपड़े वाली साबुन", pack: "3 Pieces", price: 30, icon: "🧼", qty: 1 },
      { nameEn: "Nahane Wala Sabun", nameHi: "नहाने वाला साबुन", pack: "3 Pieces", price: 30, icon: "🧼", qty: 1 },
      { nameEn: "Bartan Wala Sabun", nameHi: "बर्तन वाला साबुन", pack: "3 Pieces", price: 15, icon: "🧼", qty: 1 },
      { nameEn: "Shampoo Patta", nameHi: "शैम्पू पत्ता", pack: "1 Patta", price: 15, icon: "🧴", qty: 1 },
      { nameEn: "Jeera", nameHi: "जीरा", pack: "50 g", price: 20, icon: "🌿", qty: 1 },
    ],
  },
  {
    id: "1000-arhar-kit",
    nameEn: "Arhar Special Saver",
    nameHi: "अरहर स्पेशल सेवर",
    descEn: "13 Essential products featuring 2 kg Arhar Dal (₹1000)",
    descHi: "13 ज़रूरी सामान (2 किग्रा अरहर दाल सहित) (₹1000)",
    badgeEn: "BEST VALUE",
    badgeHi: "बेस्ट वैल्यू",
    totalPrice: 1000,
    mrp: 1030,
    items: [
      { nameEn: "Kinki", nameHi: "किंकी", pack: "5 kg", price: 175, icon: "🌾", qty: 1 },
      { nameEn: "Shakkar", nameHi: "शक्कर", pack: "2 kg", price: 120, icon: "🌾", qty: 1 },
      { nameEn: "Sarso Oil", nameHi: "सरसों तेल", pack: "2 Litre", price: 340, icon: "🍶", qty: 1 },
      { nameEn: "Arhar Dal", nameHi: "अरहर दाल", pack: "2 kg", price: 150, icon: "🥣", qty: 1 },
      { nameEn: "Namak", nameHi: "नमक", pack: "1 kg", price: 30, icon: "🧂", qty: 1 },
      { nameEn: "Mirch", nameHi: "मिर्च", pack: "100 g", price: 40, icon: "🌶️", qty: 1 },
      { nameEn: "Dhaniya Taj", nameHi: "धनिया ताज", pack: "100 g", price: 30, icon: "🌿", qty: 1 },
      { nameEn: "Haldi", nameHi: "हल्दी", pack: "100 g", price: 35, icon: "🌶️", qty: 1 },
      { nameEn: "Kapde Wala Sabun", nameHi: "कपड़े वाला साबुन", pack: "3 Pieces", price: 30, icon: "🧼", qty: 1 },
      { nameEn: "Nahane Wala Sabun", nameHi: "नहाने वाला साबुन", pack: "3 Pieces", price: 30, icon: "🧼", qty: 1 },
      { nameEn: "Bartan Wala Sabun", nameHi: "बर्तन वाला साबुन", pack: "3 Pieces", price: 15, icon: "🧼", qty: 1 },
      { nameEn: "Shampoo Patta", nameHi: "शैम्पू पत्ता", pack: "1 Patta", price: 15, icon: "🧴", qty: 1 },
      { nameEn: "Jeera", nameHi: "जीरा", pack: "50 g", price: 20, icon: "🌿", qty: 1 },
    ],
  },
  {
    id: "2000-kit",
    nameEn: "Family Ration Pack",
    nameHi: "फैमिली राशन पैक",
    descEn: "24 Essential grocery items for entire family (₹2000)",
    descHi: "24 ज़रूरी किराना सामान पूरे परिवार के लिए (₹2000)",
    badgeEn: "BESTSELLER",
    badgeHi: "बेस्टसेलर",
    totalPrice: 2000,
    mrp: 2020,
    items: [
      { nameEn: "Chawal", nameHi: "चावल", pack: "5 kg", price: 300, icon: "🍚", qty: 1 },
      { nameEn: "Sarso Tel", nameHi: "सरसों तेल", pack: "3 Litre", price: 510, icon: "🍶", qty: 1 },
      { nameEn: "Refined Oil", nameHi: "रिफाइंड तेल", pack: "1 Litre", price: 140, icon: "🛢️", qty: 1 },
      { nameEn: "Tata Namak", nameHi: "टाटा नमक", pack: "1 Packet", price: 30, icon: "🧂", qty: 1 },
      { nameEn: "Mirch", nameHi: "मिर्च", pack: "100 g", price: 40, icon: "🌶️", qty: 1 },
      { nameEn: "Haldi", nameHi: "हल्दी", pack: "100 g", price: 35, icon: "🌶️", qty: 1 },
      { nameEn: "Dhaniya", nameHi: "धनिया", pack: "100 g", price: 30, icon: "🌿", qty: 1 },
      { nameEn: "Kapde Wali Sabun", nameHi: "कपड़े वाली साबुन", pack: "12 Pieces", price: 55, icon: "🧼", qty: 1 },
      { nameEn: "Nahane Wala Sabun", nameHi: "नहाने वाला साबुन", pack: "6 Pieces", price: 55, icon: "🧼", qty: 1 },
      { nameEn: "Bartan Wala Vim Gel", nameHi: "बर्तन वाला विम जेल", pack: "1 Unit", price: 20, icon: "🧴", qty: 1 },
      { nameEn: "Sakkar", nameHi: "शक्कर", pack: "5 kg", price: 290, icon: "🌾", qty: 1 },
      { nameEn: "Jeera", nameHi: "जीरा", pack: "50 g", price: 20, icon: "🌿", qty: 1 },
      { nameEn: "Kali Mirch", nameHi: "काली मिर्च", pack: "25 g", price: 25, icon: "🫘", qty: 1 },
      { nameEn: "Saunf", nameHi: "सौंफ", pack: "80 g", price: 20, icon: "🌿", qty: 1 },
      { nameEn: "Cheti", nameHi: "छेती", pack: "50 g", price: 20, icon: "🌿", qty: 1 },
      { nameEn: "Patta", nameHi: "पत्ता (तेजपत्ता)", pack: "25 g", price: 10, icon: "🍃", qty: 1 },
      { nameEn: "Jaiphal", nameHi: "जायफल", pack: "3 Nag", price: 15, icon: "🌰", qty: 1 },
      { nameEn: "Chaypatti", nameHi: "चायपत्ती", pack: "250 g", price: 50, icon: "☕", qty: 1 },
      { nameEn: "Dal", nameHi: "दाल", pack: "3 kg", price: 225, icon: "🥣", qty: 1 },
      { nameEn: "Manjan Bada", nameHi: "मंजन बड़ा", pack: "300 g", price: 30, icon: "🪥", qty: 1 },
      { nameEn: "Sempu Patta", nameHi: "शैम्पू पत्ता", pack: "1 Patta", price: 15, icon: "🧴", qty: 1 },
      { nameEn: "Maggi", nameHi: "मैगी", pack: "2 Packets", price: 30, icon: "🍜", qty: 1 },
      { nameEn: "Maggi Masala", nameHi: "मैगी मसाला", pack: "5 Packets", price: 25, icon: "🧂", qty: 1 },
      { nameEn: "Pasta", nameHi: "पास्ता", pack: "500 g", price: 30, icon: "🍝", qty: 1 },
    ],
  },
  {
    id: "2550-kit",
    nameEn: "Bori Rice Family Combo",
    nameHi: "बोरी राइस फैमिली कॉम्बो",
    descEn: "23 Items including 26 kg Bori Rice (₹2550)",
    descHi: "23 सामग्री (26 किग्रा बोरी चावल सहित) (₹2550)",
    badgeEn: "SUPER VALUE",
    badgeHi: "सुपर वैल्यू",
    totalPrice: 2550,
    mrp: 2558,
    items: [
      { nameEn: "Bori Kinki", nameHi: "बोरी किंकी", pack: "26 kg", price: 830, icon: "🌾", qty: 1 },
      { nameEn: "Sarso Tel", nameHi: "सरसों तेल", pack: "3 Litre", price: 510, icon: "🍶", qty: 1 },
      { nameEn: "Tata Namak", nameHi: "टाटा नमक", pack: "2 Packets", price: 60, icon: "🧂", qty: 1 },
      { nameEn: "Mirch", nameHi: "मिर्च", pack: "200 g", price: 75, icon: "🌶️", qty: 1 },
      { nameEn: "Haldi", nameHi: "हल्दी", pack: "200 g", price: 65, icon: "🌶️", qty: 1 },
      { nameEn: "Dhaniya", nameHi: "धनिया", pack: "200 g", price: 60, icon: "🌿", qty: 1 },
      { nameEn: "Dal", nameHi: "दाल", pack: "2 kg", price: 150, icon: "🥣", qty: 1 },
      { nameEn: "Jeera", nameHi: "जीरा", pack: "100 g", price: 40, icon: "🌿", qty: 1 },
      { nameEn: "Colgate Manjan", nameHi: "कोलगेट मंजन", pack: "1 Unit", price: 30, icon: "🪥", qty: 1 },
      { nameEn: "Surf Excel/Nirma", nameHi: "सर्फ एक्सेल/निरमा", pack: "1 Set", price: 110, icon: "🧼", qty: 1 },
      { nameEn: "Rin Sabun", nameHi: "रिन साबुन", pack: "12 Pieces", price: 110, icon: "🧼", qty: 1 },
      { nameEn: "Bartan Wala Liquid", nameHi: "बर्तन वाला लिक्विड", pack: "1 Unit", price: 20, icon: "🧴", qty: 1 },
      { nameEn: "Nahane Wala Sabun", nameHi: "नहाने वाला साबुन (Lifebuoy/Lux)", pack: "1 Set", price: 38, icon: "🧼", qty: 1 },
      { nameEn: "Dettol Liquid", nameHi: "डेटॉल लिक्विड", pack: "1 Unit", price: 45, icon: "🧴", qty: 1 },
      { nameEn: "Pasta", nameHi: "पास्ता", pack: "1 kg", price: 55, icon: "🍝", qty: 1 },
      { nameEn: "Besan", nameHi: "बेसन", pack: "1 Packet", price: 50, icon: "🌾", qty: 1 },
      { nameEn: "Poha", nameHi: "पोहा", pack: "1 Packet", price: 50, icon: "🥣", qty: 1 },
      { nameEn: "Kali Mirch", nameHi: "काली मिर्च", pack: "50 g", price: 50, icon: "🫘", qty: 1 },
      { nameEn: "Sempu Patta", nameHi: "शैम्पू पत्ता", pack: "1 Patta", price: 15, icon: "🧴", qty: 1 },
      { nameEn: "Sakkar", nameHi: "शक्कर", pack: "2 kg", price: 115, icon: "🌾", qty: 1 },
      { nameEn: "Chaypatti", nameHi: "चायपत्ती", pack: "250 g", price: 50, icon: "☕", qty: 1 },
      { nameEn: "Pasta Masala", nameHi: "पास्ता मसाला", pack: "2 Packets", price: 20, icon: "🧂", qty: 1 },
      { nameEn: "Facewash", nameHi: "फेसवाश", pack: "1 Unit", price: 20, icon: "🧴", qty: 1 },
    ],
  },
  {
    id: "3000-kit",
    nameEn: "Maha Ration Bundle",
    nameHi: "महा राशन बंडल",
    descEn: "25 Full ration items with 26 kg Bori Rice (₹3000)",
    descHi: "25 संपूर्ण राशन सामान (26 किग्रा बोरी चावल सहित) (₹3000)",
    badgeEn: "MEGA SAVINGS",
    badgeHi: "मेगा बचत",
    totalPrice: 3000,
    mrp: 3013,
    items: [
      { nameEn: "Bori Kinki", nameHi: "बोरी किंकी", pack: "26 kg", price: 830, icon: "🌾", qty: 1 },
      { nameEn: "Sarso Tel", nameHi: "सरसों तेल", pack: "3 Litre", price: 510, icon: "🍶", qty: 1 },
      { nameEn: "Refined Oil", nameHi: "रिफाइंड तेल", pack: "2 Litre", price: 280, icon: "🛢️", qty: 1 },
      { nameEn: "Aata Packet", nameHi: "आटा पैकेट", pack: "5 kg", price: 185, icon: "🌾", qty: 1 },
      { nameEn: "Namak", nameHi: "नमक", pack: "2 Packets", price: 60, icon: "🧂", qty: 1 },
      { nameEn: "Mirchi", nameHi: "मिर्ची", pack: "200 g", price: 75, icon: "🌶️", qty: 1 },
      { nameEn: "Haldi", nameHi: "हल्दी", pack: "200 g", price: 65, icon: "🌶️", qty: 1 },
      { nameEn: "Dhaniya", nameHi: "धनिया", pack: "200 g", price: 60, icon: "🌿", qty: 1 },
      { nameEn: "Dal Choti", nameHi: "दाल छोटी", pack: "2 kg", price: 150, icon: "🥣", qty: 1 },
      { nameEn: "Jeera", nameHi: "जीरा", pack: "100 g", price: 40, icon: "🌿", qty: 1 },
      { nameEn: "Manjan Colgate", nameHi: "मंजन कोलगेट", pack: "1 Unit", price: 30, icon: "🪥", qty: 1 },
      { nameEn: "Surf Excel/Nirma", nameHi: "सर्फ एक्सेल/निरमा", pack: "12 Packets", price: 110, icon: "🧼", qty: 1 },
      { nameEn: "Rin Sabun", nameHi: "रिन साबुन", pack: "12 Pieces", price: 110, icon: "🧼", qty: 1 },
      { nameEn: "Bartan Wali Liquid", nameHi: "बर्तन वाली लिक्विड", pack: "1 Unit", price: 20, icon: "🧴", qty: 1 },
      { nameEn: "Nahane Wala Sabun Lux", nameHi: "नहाने वाला साबुन लक्स", pack: "1 Set", price: 38, icon: "🧼", qty: 1 },
      { nameEn: "Dettol Liquid", nameHi: "डेटॉल लिक्विड", pack: "1 Unit", price: 45, icon: "🧴", qty: 1 },
      { nameEn: "Pasta", nameHi: "पास्ता", pack: "1 kg", price: 55, icon: "🍝", qty: 1 },
      { nameEn: "Besan Packet", nameHi: "बेसन पैकेट", pack: "1 Packet", price: 50, icon: "🌾", qty: 1 },
      { nameEn: "Poha Packet", nameHi: "पोहा पैकेट", pack: "1 Packet", price: 50, icon: "🥣", qty: 1 },
      { nameEn: "Kalimirch", nameHi: "कालीमिर्च", pack: "50 g", price: 50, icon: "🫘", qty: 1 },
      { nameEn: "Sempu Patta", nameHi: "शैम्पू पत्ता", pack: "1 Patta", price: 15, icon: "🧴", qty: 1 },
      { nameEn: "Shakkar", nameHi: "शक्कर", pack: "2 kg", price: 115, icon: "🌾", qty: 1 },
      { nameEn: "Chaypatti", nameHi: "चायपत्ती", pack: "250 g", price: 50, icon: "☕", qty: 1 },
      { nameEn: "Pasta Masala", nameHi: "पास्ता मसाला", pack: "4 Packets", price: 20, icon: "🧂", qty: 1 },
      { nameEn: "Magic", nameHi: "मैजिक", pack: "1 Unit", price: 20, icon: "✨", qty: 1 },
    ],
  },
  {
    id: "3500-kit",
    nameEn: "Ultimate Householder Pack",
    nameHi: "अल्टीमेट हाउसहोल्डर पैक",
    descEn: "25 Items with 5 Litre Sarso Oil & Hygiene Set (₹3500)",
    descHi: "25 प्रीमियम सामान (5 ली सरसों तेल) (₹3500)",
    badgeEn: "COMPLETE HOME",
    badgeHi: "कंपलीट होम",
    totalPrice: 3500,
    mrp: 3508,
    items: [
      { nameEn: "Bori Kinki", nameHi: "बोरी किंकी", pack: "26 kg", price: 830, icon: "🌾", qty: 1 },
      { nameEn: "Sarso Tel Full", nameHi: "सरसों तेल फुल", pack: "5 kg", price: 865, icon: "🍶", qty: 1 },
      { nameEn: "Aata", nameHi: "आटा", pack: "5 kg", price: 185, icon: "🌾", qty: 1 },
      { nameEn: "Namak", nameHi: "नमक", pack: "2 Packets", price: 60, icon: "🧂", qty: 1 },
      { nameEn: "Taja Mirch", nameHi: "ताजा मिर्च", pack: "200 g", price: 75, icon: "🌶️", qty: 1 },
      { nameEn: "Taja Dhaniya", nameHi: "ताजा धनिया", pack: "200 g", price: 60, icon: "🌿", qty: 1 },
      { nameEn: "Taja Haldi", nameHi: "ताजा हल्दी", pack: "200 g", price: 65, icon: "🌶️", qty: 1 },
      { nameEn: "Dal", nameHi: "दाल", pack: "3 kg", price: 225, icon: "🥣", qty: 1 },
      { nameEn: "Jeera", nameHi: "जीरा", pack: "100 g", price: 40, icon: "🌿", qty: 1 },
      { nameEn: "Manjan Colgate", nameHi: "मंजन कोलगेट", pack: "1 Unit", price: 30, icon: "🪥", qty: 1 },
      { nameEn: "Rin Sabun", nameHi: "रिन साबुन", pack: "12 Pieces", price: 110, icon: "🧼", qty: 1 },
      { nameEn: "Surf Excel/Nirma", nameHi: "सर्फ एक्सेल/निरमा", pack: "12 Packets", price: 110, icon: "🧼", qty: 1 },
      { nameEn: "Bartan Wala Liquid", nameHi: "बर्तन वाला लिक्विड", pack: "1 Unit", price: 20, icon: "🧴", qty: 1 },
      { nameEn: "Nahane Wala Sabun", nameHi: "नहाने वाला साबुन", pack: "1 Set", price: 38, icon: "🧼", qty: 1 },
      { nameEn: "Dettol Liquid", nameHi: "डेटॉल लिक्विड", pack: "1 Unit", price: 45, icon: "🧴", qty: 1 },
      { nameEn: "Besan", nameHi: "बेसन", pack: "1 kg", price: 55, icon: "🌾", qty: 1 },
      { nameEn: "Besan 2", nameHi: "बेसन 2", pack: "1 kg", price: 100, icon: "🌾", qty: 1 },
      { nameEn: "Chaypatti", nameHi: "चायपत्ती", pack: "500 g", price: 100, icon: "☕", qty: 1 },
      { nameEn: "Shakkar", nameHi: "शक्कर", pack: "5 kg", price: 290, icon: "🌾", qty: 1 },
      { nameEn: "Magic Bada", nameHi: "मैजिक बड़ा", pack: "1 Unit", price: 20, icon: "✨", qty: 1 },
      { nameEn: "Kali Mirch", nameHi: "काली मिर्च", pack: "50 g", price: 50, icon: "🫘", qty: 1 },
      { nameEn: "Laung", nameHi: "लौंग", pack: "20 g", price: 20, icon: "🌿", qty: 1 },
      { nameEn: "Dettol Handwash", nameHi: "डेटॉल हैंडवॉश", pack: "6 Pieces", price: 55, icon: "🧼", qty: 1 },
      { nameEn: "Vim All Chota", nameHi: "विम अल छोटा", pack: "1 Unit", price: 45, icon: "🧴", qty: 1 },
      { nameEn: "Sempu Patta", nameHi: "शैम्पू पत्ता", pack: "1 Patta", price: 15, icon: "🧴", qty: 1 },
    ],
  },
  {
    id: "6000-kit",
    nameEn: "Royal Mega Pack",
    nameHi: "रॉयल मेगा पैक",
    descEn: "21 Luxury items with Ghee, Dry Fruits & Rice Bori (₹6000)",
    descHi: "21 लक्जरी सामान (घी, ड्राई फ्रूट्स एवं चावल बोरी) (₹6000)",
    badgeEn: "PREMIUM LUXURY",
    badgeHi: "प्रीमियम लक्जरी",
    totalPrice: 6000,
    mrp: 6024,
    items: [
      { nameEn: "Chawal Bori Built", nameHi: "चावल 1 बोरी बुल्ट", pack: "1 Bori", price: 1500, icon: "🍚", qty: 1 },
      { nameEn: "Sarso Tel 2 Full", nameHi: "सरसों तेल 2 फुल", pack: "5 Litre", price: 870, icon: "🍶", qty: 1 },
      { nameEn: "Namak Tata", nameHi: "नमक टाटा", pack: "2 Packets", price: 60, icon: "🧂", qty: 1 },
      { nameEn: "Mirch Taj", nameHi: "मिर्च ताज", pack: "500 g", price: 180, icon: "🌶️", qty: 1 },
      { nameEn: "Dhaniya Taj", nameHi: "धनिया ताज", pack: "500 g", price: 150, icon: "🌿", qty: 1 },
      { nameEn: "Haldi Taj", nameHi: "हल्दी ताज", pack: "500 g", price: 160, icon: "🌶️", qty: 1 },
      { nameEn: "Maggi Family Pack", nameHi: "मैगी फैमिली पैक", pack: "1 Pack", price: 55, icon: "🍜", qty: 1 },
      { nameEn: "Dal Mixed", nameHi: "दाल मिक्सड", pack: "5 kg", price: 675, icon: "🥣", qty: 1 },
      { nameEn: "Jeera", nameHi: "जीरा", pack: "500 g", price: 160, icon: "🌿", qty: 1 },
      { nameEn: "Makhana", nameHi: "मखाना", pack: "250 g", price: 240, icon: "🍿", qty: 1 },
      { nameEn: "Kaju", nameHi: "काजू", pack: "250 g", price: 255, icon: "🥜", qty: 1 },
      { nameEn: "Badam", nameHi: "बादाम", pack: "250 g", price: 250, icon: "🥜", qty: 1 },
      { nameEn: "Sabun Nirma Sandal", nameHi: "साबुन निरमा सैंडल बड़ा", pack: "2 Sets", price: 150, icon: "🧼", qty: 1 },
      { nameEn: "Shakkar", nameHi: "शक्कर", pack: "5 kg", price: 280, icon: "🌾", qty: 1 },
      { nameEn: "Wadsahi Chai", nameHi: "वाडसाही चाय", pack: "400 g", price: 190, icon: "☕", qty: 1 },
      { nameEn: "Sempu Dibba", nameHi: "शैम्पू 1 डिब्बा", pack: "1 Box", price: 70, icon: "🧴", qty: 1 },
      { nameEn: "Handwash Dettol", nameHi: "हैंडवॉश डेटॉल", pack: "1 Unit", price: 99, icon: "🧼", qty: 1 },
      { nameEn: "Desi Ghee", nameHi: "देसी घी", pack: "500 g", price: 385, icon: "🧈", qty: 1 },
      { nameEn: "Amla Hair Oil", nameHi: "ऑवला हेयर तेल बड़ा", pack: "1 Unit", price: 250, icon: "🧴", qty: 1 },
      { nameEn: "All Out Machine Set", nameHi: "ऑल आउट मशीन सेट", pack: "1 Set", price: 100, icon: "🔌", qty: 1 },
      { nameEn: "Dettol Liquid", nameHi: "डेटॉल लिक्विड", pack: "1 Unit", price: 45, icon: "🧴", qty: 1 },
    ],
  },
];

type KitId = (typeof KITS_DATA)[number]["id"];
type KitQuantities = Record<KitId, number[]>;

function createInitialQuantities(): KitQuantities {
  return Object.fromEntries(
    KITS_DATA.map((kit) => [kit.id, kit.items.map((item) => item.qty)])
  ) as KitQuantities;
}

function formatMoney(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function BuildYourKit() {
  const { t, language } = useLanguage();
  const [selectedKitIndex, setSelectedKitIndex] = useState(0);
  const [quantitiesByKit, setQuantitiesByKit] =
    useState<KitQuantities>(createInitialQuantities);

  const currentKit = KITS_DATA[selectedKitIndex] ?? KITS_DATA[0];
  const quantities = quantitiesByKit[currentKit.id];
  const defaultQuantities = currentKit.items.map((item) => item.qty);

  const isStandardKit = quantities.every(
    (quantity, index) => quantity === defaultQuantities[index]
  );

  const totalPacks = quantities.reduce((sum, quantity) => sum + quantity, 0);
  const selectedItemCount = quantities.filter((quantity) => quantity > 0).length;

  const quantityAdjustment = currentKit.items.reduce(
    (sum, item, index) =>
      sum + (quantities[index] - item.qty) * item.price,
    0
  );

  const totalPrice = isStandardKit
    ? currentKit.totalPrice
    : Math.max(0, currentKit.totalPrice + quantityAdjustment);

  const totalSavings = isStandardKit
    ? Math.max(0, currentKit.mrp - currentKit.totalPrice)
    : 0;

  function updateQuantity(itemIndex: number, change: number) {
    setQuantitiesByKit((previous) => {
      const currentQuantities =
        previous[currentKit.id] ??
        currentKit.items.map((item) => item.qty);

      const nextQuantities = [...currentQuantities];
      const currentQuantity = nextQuantities[itemIndex] ?? 0;
      nextQuantities[itemIndex] = Math.max(
        0,
        Math.min(20, currentQuantity + change)
      );

      return {
        ...previous,
        [currentKit.id]: nextQuantities,
      };
    });
  }

  function resetCurrentKit() {
    setQuantitiesByKit((previous) => ({
      ...previous,
      [currentKit.id]: currentKit.items.map((item) => item.qty),
    }));
  }

  const selectedProducts = currentKit.items
    .map((item, index) => ({
      item,
      quantity: quantities[index] ?? 0,
      index,
    }))
    .filter(({ quantity }) => quantity > 0);

  const kitName = language === "hi" ? currentKit.nameHi : currentKit.nameEn;

  const orderLines = [
    language === "hi"
      ? `नमस्ते, मुझे राशिद मेगा मार्ट से यह किट ऑर्डर करनी है।`
      : "Hello, I would like to order this kit from Rashid Mega Mart.",
    "",
    `${language === "hi" ? "किट" : "Kit"}: ${kitName}`,
    `${language === "hi" ? "किट की विज्ञापित कीमत" : "Advertised kit price"}: ${formatMoney(currentKit.totalPrice)}`,
    "",
    language === "hi" ? "चुना हुआ सामान:" : "Selected items:",
    ...selectedProducts.map(({ item, quantity }) => {
      const itemName = language === "hi" ? item.nameHi : item.nameEn;
      return `${itemName} (${item.pack}) x ${quantity} = ${formatMoney(item.price * quantity)}`;
    }),
    "",
    `${language === "hi" ? "चुने हुए आइटम" : "Selected item types"}: ${selectedItemCount}`,
    `${language === "hi" ? "कुल पैक" : "Total packs"}: ${totalPacks}`,
    `${language === "hi" ? "कुल कीमत" : "Total amount"}: ${formatMoney(totalPrice)}`,
    ...(isStandardKit
      ? [
          `${language === "hi" ? "ऑफर कीमत" : "Standard offer price"}: ${formatMoney(currentKit.totalPrice)}`,
          `${language === "hi" ? "बचत" : "Savings"}: ${formatMoney(totalSavings)}`,
        ]
      : [
          language === "hi"
            ? "कस्टम किट: मात्रा बदलने के कारण सामान्य ऑफर की बचत लागू नहीं है।"
            : "Custom kit: quantities were changed; standard-kit savings are not applied.",
          `${language === "hi" ? "कीमत में बदलाव" : "Quantity adjustment"}: ${formatMoney(quantityAdjustment)}`,
        ]),
    "",
    language === "hi"
      ? "कृपया सामान की उपलब्धता और डिलीवरी की जानकारी की पुष्टि करें।"
      : "Please confirm stock availability and delivery details.",
  ];

  const whatsappUrl = `https://wa.me/918962531603?text=${encodeURIComponent(
    orderLines.join("\n")
  )}`;

  return (
    <div className="mx-auto max-w-2xl px-2 py-2 sm:px-4">
      {/* Title */}
      <div className="mb-3 text-center">
        <span className="rounded-full bg-[#800020]/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#800020]">
          {language === "hi" ? "राशिद मेगा मार्ट किट्स" : "Rashid Mega Mart Bundles"}
        </span>
        <h2 className="mt-2 text-xl font-black text-[#171717] sm:text-2xl">
          {language === "hi" ? "अपनी पसंदीदा किट चुनें" : "Select Your Grocery Kit"}
          <span className="text-[#800020]">.</span>
        </h2>
      </div>

      {/* Kit selector: all kits and advertised prices remain from KITS_DATA */}
      <div
        className="no-scrollbar mb-4 flex gap-2.5 overflow-x-auto px-1 pb-2 pt-1"
        aria-label={language === "hi" ? "किट चुनें" : "Choose a kit"}
      >
        {KITS_DATA.map((kit, index) => {
          const isSelected = selectedKitIndex === index;
          const kitName = language === "hi" ? kit.nameHi : kit.nameEn;
          const badge = language === "hi" ? kit.badgeHi : kit.badgeEn;

          return (
            <button
              key={kit.id}
              type="button"
              onClick={() => setSelectedKitIndex(index)}
              aria-pressed={isSelected}
              className={`relative flex w-44 shrink-0 flex-col justify-between rounded-2xl border p-3 text-left transition-all duration-300 active:scale-[0.98] ${
                isSelected
                  ? "border-[#800020] bg-[linear-gradient(135deg,#FFFDF5,#FFF3D1)] shadow-md ring-2 ring-[#800020]/20"
                  : "border-[#800020]/15 bg-white opacity-85 shadow-sm hover:border-[#800020]/40"
              }`}
            >
              <span
                className={`self-start rounded-md px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider ${
                  isSelected
                    ? "bg-[#800020] text-white"
                    : "bg-[#800020]/10 text-[#800020]"
                }`}
              >
                {badge}
              </span>

              <div className="my-2">
                <h3 className="line-clamp-1 text-xs font-black text-[#171717]">
                  {kitName}
                </h3>
                <p className="mt-0.5 line-clamp-2 min-h-7 text-[9px] leading-3.5 text-[#171717]/65">
                  {language === "hi" ? kit.descHi : kit.descEn}
                </p>
              </div>

              <div className="flex items-baseline justify-between gap-1 border-t border-[#800020]/10 pt-1.5">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-black text-[#800020]">
                    {formatMoney(kit.totalPrice)}
                  </span>
                  <span className="text-[9px] text-[#171717]/40 line-through">
                    {formatMoney(kit.mrp)}
                  </span>
                </div>
                <span className="text-[9px] font-extrabold text-[#800020]">
                  {language === "hi" ? "बचत" : "Save"} {formatMoney(kit.mrp - kit.totalPrice)}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active kit and item controls */}
      <div className="rounded-2xl border border-[#800020]/15 bg-[#FFFDF5] p-3.5 shadow-sm sm:p-5">
        <div className="flex items-start justify-between gap-2 border-b border-[#800020]/10 pb-3">
          <div className="min-w-0">
            <span className="text-[9px] font-black uppercase tracking-wider text-[#800020]">
              {kitName}
            </span>
            <h3 className="text-lg font-black leading-tight text-[#171717] sm:text-xl">
              {language === "hi" ? "अपनी किट बनाएं" : "Customize your kit"}
              <span className="text-[#800020]">.</span>
            </h3>
            <p className="mt-0.5 text-[11px] text-[#171717]/75">
              {language === "hi" ? currentKit.descHi : currentKit.descEn}
            </p>
          </div>

          <button
            type="button"
            onClick={resetCurrentKit}
            className="shrink-0 rounded-full border border-[#800020]/20 bg-white px-2.5 py-1.5 text-[10px] font-bold text-[#800020] transition hover:bg-[#FFF9D8] active:scale-95"
          >
            {language === "hi" ? "रीसेट ↺" : "Reset kit ↺"}
          </button>
        </div>

        {/* Live item count */}
        <div className="mt-3 flex items-center justify-between rounded-xl bg-[#FFF9D8] px-3 py-2">
          <div>
            <p className="text-xs font-bold text-[#171717]">
              {selectedItemCount}{" "}
              {language === "hi" ? "आइटम चुने गए" : "items selected"}
            </p>
            <p className="text-[10px] text-[#171717]/65">
              {language === "hi"
                ? `${totalPacks} पैक आपकी किट में`
                : `${totalPacks} packs in your kit`}
            </p>
          </div>

          <span className="rounded-md bg-[#800020] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white">
            {isStandardKit
              ? language === "hi"
                ? "स्टैंडर्ड ऑफर"
                : "Standard offer"
              : language === "hi"
                ? "कस्टम किट"
                : "Custom kit"}
          </span>
        </div>

        {/* Column headers */}
        <div className="mt-3 flex items-center justify-between px-1 text-[9px] font-bold uppercase tracking-wider text-[#171717]/50">
          <span>{language === "hi" ? "सामान / पैक मूल्य" : "Item / Pack Price"}</span>
          <span>{language === "hi" ? "मात्रा" : t("quantity")}</span>
        </div>

        {/* Each kit has its own quantity state; zero-quantity items remain available to re-add */}
        <div className="mt-1 divide-y divide-[#800020]/10">
          {currentKit.items.map((item, index) => {
            const quantity = quantities[index] ?? 0;
            const itemName = language === "hi" ? item.nameHi : item.nameEn;

            return (
              <div
                key={`${currentKit.id}-${index}`}
                className={`flex items-center justify-between gap-2 py-2.5 ${
                  quantity === 0 ? "opacity-55" : ""
                }`}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFF9D8] text-sm">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="truncate text-xs font-bold leading-tight text-[#171717]">
                      {itemName}
                    </h4>
                    <p className="mt-0.5 truncate text-[10px] text-[#171717]/60">
                      {item.pack} · {formatMoney(item.price)}
                    </p>
                    {quantity > 1 && (
                      <p className="mt-0.5 text-[10px] font-semibold text-[#800020]">
                        {language === "hi" ? "उप-योग" : "Subtotal"}:{" "}
                        {formatMoney(item.price * quantity)}
                      </p>
                    )}
                    {quantity === 0 && (
                      <p className="mt-0.5 text-[9px] text-[#800020]">
                        {language === "hi" ? "हटाया गया" : "Not selected"}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(index, -1)}
                    disabled={quantity <= 0}
                    aria-label={`${language === "hi" ? "मात्रा घटाएं" : "Decrease quantity"}: ${itemName}`}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[#800020]/20 bg-white text-xs font-bold text-[#800020] transition hover:bg-[#FFF9D8] disabled:cursor-not-allowed disabled:opacity-30 active:scale-90"
                  >
                    −
                  </button>

                  <span
                    aria-live="polite"
                    aria-label={`${quantity}`}
                    className="w-4 text-center text-xs font-bold tabular-nums text-[#171717]"
                  >
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => updateQuantity(index, 1)}
                    disabled={quantity >= 20}
                    aria-label={`${language === "hi" ? "मात्रा बढ़ाएं" : "Increase quantity"}: ${itemName}`}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-[#800020] text-xs font-bold text-white transition hover:bg-[#610019] disabled:cursor-not-allowed disabled:opacity-40 active:scale-90"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Price and savings */}
        <div className="mt-3 border-t border-[#800020]/15 pt-3">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#171717]/50">
                {t("yourTotal")}
              </p>
              <div className="flex flex-wrap items-baseline gap-1.5">
                <span className="text-xl font-black text-[#171717]">
                  {formatMoney(totalPrice)}
                </span>
                {isStandardKit && (
                  <span className="text-[11px] text-[#171717]/40 line-through">
                    {formatMoney(currentKit.mrp)}
                  </span>
                )}
              </div>

              {isStandardKit ? (
                <p className="text-[10px] font-bold text-[#800020]">
                  {language === "hi"
                    ? `बचत ${formatMoney(totalSavings)}`
                    : `Save ${formatMoney(totalSavings)}`}
                </p>
              ) : (
                <p className="max-w-56 text-[10px] leading-4 text-[#800020]/75">
                  {language === "hi"
                    ? "कस्टम कीमत: मात्रा बदलने के बाद गणना की गई है; स्टैंडर्ड बचत लागू नहीं है।"
                    : "Custom total; standard-kit savings do not apply."}
                </p>
              )}
            </div>

            {isStandardKit && (
              <div className="shrink-0 rounded-xl bg-[#800020] px-4 py-2 text-center text-white shadow-sm">
                <span className="block text-[8px] font-extrabold uppercase tracking-wider opacity-80">
                  {language === "hi" ? "आपकी बचत" : "You Save"}
                </span>
                <span className="text-base font-black">
                  {formatMoney(totalSavings)}
                </span>
              </div>
            )}
          </div>

          {selectedItemCount > 0 ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={
                language === "hi"
                  ? `WhatsApp पर ${kitName} ऑर्डर करें, कुल ${formatMoney(totalPrice)}`
                  : `Order ${kitName} on WhatsApp, total ${formatMoney(totalPrice)}`
              }
              className="mt-4 flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#800020] px-5 py-3.5 text-center text-sm font-extrabold text-[#FFF9D8] shadow-[0_8px_20px_rgba(128,0,32,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#610019] hover:shadow-[0_12px_24px_rgba(128,0,32,0.24)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#800020] active:translate-y-0"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 shrink-0"
                aria-hidden="true"
              >
                <path d="M20.52 3.48A11.84 11.84 0 0 0 12.08 0C5.5 0 .15 5.35.15 11.93c0 2.1.55 4.15 1.6 5.96L0 24l6.27-1.64a11.9 11.9 0 0 0 5.8 1.48h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.18-3.49-8.43ZM12.08 21.8a9.84 9.84 0 0 1-5.01-1.37l-.36-.21-3.72.97.99-3.62-.24-.37a9.85 9.85 0 1 1 8.34 4.6Zm5.41-7.38c-.3-.15-1.75-.87-2.02-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.74-1.64-2.03-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.5.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.66-1.6-.91-2.2-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46s1.06 2.85 1.2 3.05c.15.2 2.08 3.18 5.04 4.46.7.3 1.25.49 1.68.62.7.22 1.34.19 1.85.12.56-.08 1.75-.72 2-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.34Z" />
              </svg>
              <span>{language === "hi" ? "WhatsApp पर ऑर्डर करें" : "Order on WhatsApp"}</span>
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="mt-4 w-full cursor-not-allowed rounded-full bg-[#800020]/40 px-4 py-3.5 text-sm font-bold text-white"
            >
              {language === "hi" ? "ऑर्डर करने के लिए सामान चुनें" : "Select items to order"}
            </button>
          )}

          <p className="mt-3 text-center text-[9px] leading-relaxed text-[#171717]/55">
            {language === "hi"
              ? "ऑर्डर WhatsApp पर कन्फर्म होगा। स्टॉक और डिलीवरी की पुष्टि स्टोर से करें।"
              : "Order is confirmed on WhatsApp. Please confirm stock and delivery with the store."}
          </p>
        </div>
      </div>
    </div>
  );
}
