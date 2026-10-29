"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../components/LanguageProvider";
import { ArrowLeft, ShieldCheck, FileText, RefreshCcw } from "lucide-react";

export default function PoliciesPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const [activeTab, setActiveTab] = useState("privacy");

  const tabs = [
    { id: "privacy", label: isHindi ? "प्राइवेसी" : "Privacy", icon: ShieldCheck },
    { id: "terms", label: isHindi ? "नियम" : "Terms", icon: FileText },
    { id: "refund", label: isHindi ? "रिफंड" : "Refund", icon: RefreshCcw },
  ];

  return (
    <main className="min-h-screen bg-[#FFF9D8] pb-24">
      <div className="sticky top-0 z-50 bg-[#FFF9D8]/90 px-4 py-4 backdrop-blur-md border-b border-[#800020]/10">
        <div className="mx-auto flex max-w-3xl items-center gap-4">
          <button onClick={() => router.back()} className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#800020] shadow-sm hover:bg-[#800020] hover:text-white transition">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-black text-[#800020]">
            {isHindi ? "पॉलिसीज और नियम" : "Policies & Terms"}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 mt-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 shrink-0 rounded-xl px-5 py-3 text-sm font-bold transition-all ${
                activeTab === tab.id 
                  ? "bg-[#800020] text-white shadow-md scale-105" 
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>

        <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100">
          {activeTab === "privacy" && (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <h2 className="text-2xl font-black text-gray-800 mb-4">Privacy Policy</h2>
              <p>Your privacy is important to us. It is Rashid Mega Mart's policy to respect your privacy regarding any information we may collect from you across our website.</p>
              <h3 className="text-lg font-bold text-gray-800 mt-6">1. Information We Collect</h3>
              <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
              <h3 className="text-lg font-bold text-gray-800 mt-6">2. How We Use It</h3>
              <p>We use the information we collect in various ways, including to provide, operate, and maintain our website, improve, personalize, and expand our website, and understand and analyze how you use our website.</p>
            </div>
          )}

          {activeTab === "terms" && (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <h2 className="text-2xl font-black text-gray-800 mb-4">Terms & Conditions</h2>
              <p>By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws, and regulations.</p>
              <h3 className="text-lg font-bold text-gray-800 mt-6">1. Use License</h3>
              <p>Permission is granted to temporarily download one copy of the materials (information or software) on Rashid Mega Mart's website for personal, non-commercial transitory viewing only.</p>
              <h3 className="text-lg font-bold text-gray-800 mt-6">2. Disclaimer</h3>
              <p>The materials on Rashid Mega Mart's website are provided on an 'as is' basis. Rashid Mega Mart makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability.</p>
            </div>
          )}

          {activeTab === "refund" && (
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <h2 className="text-2xl font-black text-gray-800 mb-4">Refund & Return Policy</h2>
              <p>We want you to be completely satisfied with your purchase. If you are not satisfied, we're here to help.</p>
              <h3 className="text-lg font-bold text-gray-800 mt-6">1. Returns</h3>
              <p>You have 24 hours to return an item from the time of delivery. To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
              <h3 className="text-lg font-bold text-gray-800 mt-6">2. Refunds</h3>
              <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}