"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../components/LanguageProvider";
import { ArrowLeft, User, Mail, Phone, Save, CheckCircle2, ShieldCheck } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    altMobile: ""
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("rmm_user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setFormData({
        name: user.name || "",
        mobile: user.mobile || "",
        email: user.email || "",
        altMobile: user.altMobile || ""
      });
    } else {
      router.push("/login");
    }
    setIsLoading(false);
  }, [router]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      const updatedUser = {
        ...formData,
        mobile: formData.mobile // Primary mobile change nahi hoga
      };
      
      localStorage.setItem("rmm_user", JSON.stringify(updatedUser));
      
      setIsSaving(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        router.push("/account");
      }, 1500);
    }, 800);
  };

  if (isLoading) return null;

  if (isSuccess) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FFF9D8] p-6 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 mb-6">
          <CheckCircle2 size={50} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-black text-[#800020]">
          {isHindi ? "प्रोफ़ाइल सेव हो गई!" : "Profile Saved!"}
        </h1>
        <p className="mt-2 text-sm font-bold text-gray-500">
          {isHindi ? "आपकी जानकारी अपडेट कर दी गई है।" : "Your information has been updated."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9D8] pb-24 px-4 pt-6">
      <div className="mx-auto max-w-2xl">
        
        <button onClick={() => router.back()} className="mb-6 flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#800020] shadow-sm hover:bg-gray-50 transition w-fit">
          <ArrowLeft size={16} /> {isHindi ? "वापस" : "Back"}
        </button>

        <div className="rounded-[32px] bg-white p-6 sm:p-8 shadow-xl border border-gray-100">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-5">
             <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#800020]/10 text-[#800020]">
               <User size={28} />
             </div>
             <div>
               <h1 className="text-2xl font-black text-gray-800">{isHindi ? "प्रोफ़ाइल सेटिंग्स" : "Profile Settings"}</h1>
               <p className="text-xs font-bold text-gray-400 mt-1">{isHindi ? "अपनी जानकारी अपडेट करें" : "Update your personal details"}</p>
             </div>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-black text-gray-600 uppercase tracking-wide mb-1.5">
                {isHindi ? "पूरा नाम" : "Full Name"}
              </label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-bold text-gray-800 outline-none focus:border-[#800020] focus:bg-white transition"
                  placeholder={isHindi ? "आपका नाम" : "Your Name"}
                />
              </div>
            </div>

            {/* Primary Mobile (Read Only) */}
            <div>
              <label className="block text-xs font-black text-gray-600 uppercase tracking-wide mb-1.5">
                {isHindi ? "मुख्य मोबाइल नंबर" : "Primary Mobile Number"}
              </label>
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  readOnly
                  type="tel"
                  value={formData.mobile}
                  className="w-full rounded-xl border-2 border-gray-100 bg-gray-100 py-3.5 pl-11 pr-4 text-sm font-bold text-gray-500 outline-none cursor-not-allowed"
                />
              </div>
              <p className="text-[10px] font-bold text-gray-400 mt-1 ml-1">
                {isHindi ? "मुख्य नंबर बदला नहीं जा सकता।" : "Primary number cannot be changed."}
              </p>
            </div>

            {/* Alternate Mobile (Optional) */}
            <div>
              <label className="block text-xs font-black text-gray-600 uppercase tracking-wide mb-1.5">
                {isHindi ? "अल्टरनेट मोबाइल (वैकल्पिक)" : "Alternate Mobile (Optional)"}
              </label>
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  maxLength={10}
                  value={formData.altMobile}
                  onChange={(e) => setFormData({...formData, altMobile: e.target.value.replace(/\D/g,'')})}
                  className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-bold text-gray-800 outline-none focus:border-[#800020] focus:bg-white transition"
                  placeholder="9876543210"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-black text-gray-600 uppercase tracking-wide mb-1.5">
                {isHindi ? "ईमेल आईडी" : "Email ID"}
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full rounded-xl border-2 border-gray-100 bg-gray-50 py-3.5 pl-11 pr-4 text-sm font-bold text-gray-800 outline-none focus:border-[#800020] focus:bg-white transition"
                  placeholder="rashid@example.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full rounded-xl bg-[#800020] py-4 text-sm font-black text-white shadow-lg hover:bg-[#600018] transition active:scale-95 mt-4 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSaving ? (
                <>{isHindi ? "सेव हो रहा है..." : "Saving..."}</>
              ) : (
                <><Save size={18} /> {isHindi ? "बदलाव सेव करें" : "Save Changes"}</>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 mt-2">
              <ShieldCheck size={14} className="text-green-500" />
              {isHindi ? "आपकी जानकारी सुरक्षित है" : "Your data is secure with us"}
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}