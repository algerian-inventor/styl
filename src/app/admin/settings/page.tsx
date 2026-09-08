"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ContactMessage } from "@/context/PrototypeStateContext";
import { Save, Shield, Settings, Mail, Trash2, Upload, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { FormField } from "@/components/ui/FormField";

export default function AdminSettingsPage() {
  const { t, language } = useLanguage();
  const { contactMessages, deleteContactMessage, siteSettings, updateSiteSettings } = usePrototypeState();

  const [activeTab, setActiveTab] = useState<"general" | "messages">("general");
  const [deleteMsgId, setDeleteMsgId] = useState<string | null>(null);
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);

  // Form states
  const [leagueNameAr, setLeagueNameAr] = useState("");
  const [leagueNameEn, setLeagueNameEn] = useState("");
  const [sloganAr, setSloganAr] = useState("");
  const [sloganEn, setSloganEn] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressAr, setAddressAr] = useState("");
  const [addressEn, setAddressEn] = useState("");
  const [primaryColor, setPrimaryColor] = useState<"navy" | "teal" | "purple" | "orange">("navy");
  const [heroBannerUrl, setHeroBannerUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");

  // Sync state with settings when context loads
  useEffect(() => {
    if (siteSettings) {
      setLeagueNameAr(siteSettings.leagueNameAr);
      setLeagueNameEn(siteSettings.leagueNameEn);
      setSloganAr(siteSettings.sloganAr);
      setSloganEn(siteSettings.sloganEn);
      setEmail(siteSettings.email);
      setPhone(siteSettings.phone);
      setAddressAr(siteSettings.addressAr);
      setAddressEn(siteSettings.addressEn);
      setPrimaryColor(siteSettings.primaryColor);
      setHeroBannerUrl(siteSettings.heroBannerUrl || "");
      setInstagramUrl(siteSettings.instagramUrl || "");
      setFacebookUrl(siteSettings.facebookUrl || "");
      setYoutubeUrl(siteSettings.youtubeUrl || "");
      setTiktokUrl(siteSettings.tiktokUrl || "");
    }
  }, [siteSettings]);

  const handleDeleteMessage = () => {
    if (deleteMsgId) {
      deleteContactMessage(deleteMsgId);
      setDeleteMsgId(null);
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeroBannerUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings({
      leagueNameAr,
      leagueNameEn,
      sloganAr,
      sloganEn,
      email,
      phone,
      addressAr,
      addressEn,
      primaryColor,
      heroBannerUrl,
      instagramUrl: instagramUrl.trim(),
      facebookUrl: facebookUrl.trim(),
      youtubeUrl: youtubeUrl.trim(),
      tiktokUrl: tiktokUrl.trim(),
    });
  };

  const messageColumns: Column<ContactMessage>[] = [
    {
      header: t("forms.fullName"),
      cell: (row) => (
        <div className="space-y-0.5">
          <p className="font-extrabold text-brand-dark">{row.fullName}</p>
          <span className="text-[9px] text-brand-muted block">{row.email}</span>
        </div>
      ),
    },
    {
      header: t("contact.subject"),
      cell: (row) => (
        <span className="text-xs text-brand-dark font-semibold line-clamp-1 max-w-[200px]">
          {row.subject}
        </span>
      ),
    },
    {
      header: t("admin.common.date"),
      accessorKey: "date",
    },
    {
      header: t("forms.actions"),
      cell: (row) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-1 text-brand-navy"
            onClick={() => setSelectedMsg(row)}
            title="Read Message"
          >
            <Mail className="h-4.5 w-4.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-1 text-red-500 hover:text-red-700"
            onClick={() => setDeleteMsgId(row.id)}
            title="Delete Message"
          >
            <Trash2 className="h-4.5 w-4.5" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-brand-border gap-6">
        <button
          onClick={() => setActiveTab("general")}
          className={`pb-3 font-bold text-sm border-b-2 transition-all cursor-pointer ${
            activeTab === "general"
              ? "border-brand-navy text-brand-navy"
              : "border-transparent text-brand-muted hover:text-brand-dark"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Settings className="h-4 w-4" />
            {language === "ar" ? "الإعدادات العامة" : "General Settings"}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("messages")}
          className={`pb-3 font-bold text-sm border-b-2 transition-all cursor-pointer ${
            activeTab === "messages"
              ? "border-brand-navy text-brand-navy"
              : "border-transparent text-brand-muted hover:text-brand-dark"
          }`}
        >
          <span className="flex items-center gap-1.5 text-xs sm:text-sm">
            <Mail className="h-4 w-4" />
            {t("admin.stats.messages")} ({contactMessages.length})
          </span>
        </button>
      </div>

      {activeTab === "general" ? (
        /* GENERAL CUSTOMIZER SETTINGS FORM */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Form Area */}
          <div className="lg:col-span-2">
            <Card className="bg-white border border-brand-border p-6 shadow-xs">
              <CardContent className="p-0 space-y-6">
                <h4 className="text-sm font-bold text-brand-dark border-b border-brand-border pb-2 flex items-center gap-2">
                  <Shield className="h-4.5 w-4.5 text-brand-green" />
                  {language === "ar" ? "تخصيص هوية وبيانات الموقع" : "Personalize Content & Layout Identity"}
                </h4>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* League Titles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="اسم المنظمة (العربية)" required>
                      <input
                        type="text"
                        value={leagueNameAr}
                        onChange={(e) => setLeagueNameAr(e.target.value)}
                      />
                    </FormField>
                    <FormField label="Organization Name (English)" required>
                      <input
                        type="text"
                        value={leagueNameEn}
                        onChange={(e) => setLeagueNameEn(e.target.value)}
                      />
                    </FormField>
                  </div>

                  {/* Slogans */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="شعار المنظمة (العربية)" required>
                      <input
                        type="text"
                        value={sloganAr}
                        onChange={(e) => setSloganAr(e.target.value)}
                      />
                    </FormField>
                    <FormField label="Organization Slogan (English)" required>
                      <input
                        type="text"
                        value={sloganEn}
                        onChange={(e) => setSloganEn(e.target.value)}
                      />
                    </FormField>
                  </div>

                  {/* Contact Credentials */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="البريد الإلكتروني للاتصال" required>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormField>
                    <FormField label="رقم الهاتف للمقر" required>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </FormField>
                  </div>

                  {/* Address directions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="العنوان الجغرافي (العربية)" required>
                      <input
                        type="text"
                        value={addressAr}
                        onChange={(e) => setAddressAr(e.target.value)}
                      />
                    </FormField>
                    <FormField label="Physical Address (English)" required>
                      <input
                        type="text"
                        value={addressEn}
                        onChange={(e) => setAddressEn(e.target.value)}
                      />
                    </FormField>
                  </div>

                  {/* Color Theme Dropdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label={language === "ar" ? "مظهر لون الموقع" : "Site Color Theme"} required>
                      <select value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value as "navy" | "teal" | "purple" | "orange")}>
                        <option value="navy">{language === "ar" ? "الأزرق الداكن (الافتراضي)" : "Navy Blue (Default)"}</option>
                        <option value="teal">{language === "ar" ? "الأخضر المائل (Teal)" : "Teal Green"}</option>
                        <option value="purple">{language === "ar" ? "البنفسجي (Purple)" : "Deep Purple"}</option>
                        <option value="orange">{language === "ar" ? "البرتقالي (Orange)" : "Golden Amber"}</option>
                      </select>
                    </FormField>
                  </div>

                  {/* Social Media Links */}
                  <div className="pt-4 border-t border-brand-border">
                    <h5 className="text-xs font-bold text-brand-dark mb-4">
                      {language === "ar" ? "روابط التواصل الاجتماعي" : "Social Media"}
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Instagram">
                        <input
                          type="url"
                          placeholder="https://instagram.com/..."
                          value={instagramUrl}
                          onChange={(e) => setInstagramUrl(e.target.value)}
                        />
                      </FormField>
                      <FormField label="Facebook">
                        <input
                          type="url"
                          placeholder="https://facebook.com/..."
                          value={facebookUrl}
                          onChange={(e) => setFacebookUrl(e.target.value)}
                        />
                      </FormField>
                      <FormField label="YouTube">
                        <input
                          type="url"
                          placeholder="https://youtube.com/..."
                          value={youtubeUrl}
                          onChange={(e) => setYoutubeUrl(e.target.value)}
                        />
                      </FormField>
                      <FormField label="TikTok">
                        <input
                          type="url"
                          placeholder="https://tiktok.com/..."
                          value={tiktokUrl}
                          onChange={(e) => setTiktokUrl(e.target.value)}
                        />
                      </FormField>
                    </div>
                  </div>

                  <div className="border-t border-brand-border pt-4 flex justify-end">
                    <Button type="submit" variant="secondary" leftIcon={<Save className="h-4.5 w-4.5" />}>
                      {t("admin.common.save")}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Area: Custom Hero Banner Uploader */}
          <div className="space-y-6">
            <Card className="bg-white border border-brand-border p-6 shadow-xs space-y-4">
              <h4 className="text-xs font-bold text-brand-dark border-b border-brand-border pb-2 flex items-center gap-1.5 uppercase tracking-wider">
                <Palette className="h-4.5 w-4.5 text-brand-navy" />
                {language === "ar" ? "صورة واجهة البانر الرئيسي" : "Hero Landing Banner Banner"}
              </h4>
              <p className="text-[10px] text-brand-muted leading-relaxed">
                {language === "ar"
                  ? "ارفع صورتك الخاصة ليتم وضعها مباشرة خلفية للبانر الرئيسي في الصفحة الرئيسية للموقع."
                  : "Upload a custom hero image file to change the landing banner background in real-time."}
              </p>

              <div className="space-y-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-brand-border rounded-xl cursor-pointer hover:bg-brand-bg/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                    <Upload className="h-8 w-8 text-brand-navy mb-2" />
                    <p className="text-[10px] font-bold text-brand-dark">
                      {language === "ar" ? "تحديث صورة الواجهة" : "Select Banner File"}
                    </p>
                    <p className="text-[9px] text-brand-muted mt-0.5">PNG, JPG, WEBP</p>
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} />
                </label>

                {/* Banner Thumbnail Preview */}
                {heroBannerUrl && (
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-brand-muted block">{language === "ar" ? "معاينة البانر النشط:" : "Active Banner Preview:"}</span>
                    <div className="relative h-24 w-full rounded-lg overflow-hidden border border-brand-border bg-slate-100">
                      <img src={heroBannerUrl} alt="banner-preview" className="h-full w-full object-cover" />
                    </div>
                    <Button variant="outline" size="sm" className="w-full text-[10px] py-1 h-fit" onClick={() => setHeroBannerUrl("")}>
                      {language === "ar" ? "إعادة تعيين الصورة الافتراضية" : "Reset Default Banner"}
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      ) : (
        /* MESSAGES LOGS TABLE */
        <div className="space-y-6">
          <DataTable columns={messageColumns} data={contactMessages} emptyMessage={t("admin.common.noData")} />

          {/* Delete Message Confirmation */}
          <Modal isOpen={deleteMsgId !== null} onClose={() => setDeleteMsgId(null)} title={t("admin.common.confirmDelete")}>
            <div className="space-y-4">
              <p className="text-xs text-brand-muted leading-relaxed">
                {t("admin.common.cannotUndo")}
              </p>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" size="sm" onClick={() => setDeleteMsgId(null)}>
                  {t("admin.common.cancel")}
                </Button>
                <Button variant="danger" size="sm" onClick={handleDeleteMessage}>
                  {t("admin.common.delete")}
                </Button>
              </div>
            </div>
          </Modal>

          {/* Read Message details Inspector Modal */}
          <Modal isOpen={selectedMsg !== null} onClose={() => setSelectedMsg(null)} title={language === "ar" ? "قراءة رسالة الاتصال" : "Read Contact Feedback"}>
            {selectedMsg && (
              <div className="space-y-5 text-xs text-brand-dark">
                <div className="border-b border-brand-border pb-3">
                  <h4 className="text-sm font-extrabold text-brand-navy">{selectedMsg.fullName}</h4>
                  <p className="text-[10px] text-brand-muted mt-0.5">{selectedMsg.email} | {selectedMsg.date}</p>
                </div>

                <div className="space-y-1">
                  <span className="font-extrabold text-brand-muted block">{t("contact.subject")}</span>
                  <p className="font-bold text-brand-dark leading-snug">{selectedMsg.subject}</p>
                </div>

                <div className="bg-brand-bg p-4 border border-brand-border rounded leading-relaxed font-semibold">
                  {selectedMsg.message}
                </div>

                <div className="flex gap-2 justify-end border-t border-brand-border pt-4">
                  <Button variant="outline" size="sm" onClick={() => setSelectedMsg(null)}>
                    {language === "ar" ? "إغلاق" : "Close"}
                  </Button>
                </div>
              </div>
            )}
          </Modal>
        </div>
      )}
    </div>
  );
}
