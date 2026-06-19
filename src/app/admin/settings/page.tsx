"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ContactMessage } from "@/context/PrototypeStateContext";
import { Save, Shield, Settings, Mail, Trash2, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { FormField } from "@/components/ui/FormField";

export default function AdminSettingsPage() {
  const { t, language } = useLanguage();
  const { contactMessages, deleteContactMessage } = usePrototypeState();

  const [activeTab, setActiveTab] = useState<"general" | "messages">("general");
  const [deleteMsgId, setDeleteMsgId] = useState<string | null>(null);
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);

  const handleDeleteMessage = () => {
    if (deleteMsgId) {
      deleteContactMessage(deleteMsgId);
      setDeleteMsgId(null);
    }
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
        /* GENERAL SYSTEM SETTINGS FORM */
        <Card className="bg-white border border-brand-border p-6 shadow-xs max-w-2xl">
          <CardContent className="p-0 space-y-6">
            <h4 className="text-sm font-bold text-brand-dark border-b border-brand-border pb-2 flex items-center gap-2">
              <Shield className="h-4.5 w-4.5 text-brand-green" />
              {language === "ar" ? "بيانات المنظمة ورسائل الإعداد" : "STLY Information & Configuration"}
            </h4>

            <form onSubmit={(e) => { e.preventDefault(); alert("Saved successfully (Mock)!"); }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="اسم الرابطة (العربية)" required>
                  <input type="text" defaultValue="الرابطة العلمية والتقنية للشباب – قسنطينة" />
                </FormField>
                <FormField label="League Name (English)" required>
                  <input type="text" defaultValue="Scientific and Technical Youth League – Constantine" />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="البريد الإلكتروني للرابطة" required>
                  <input type="email" defaultValue="contact@stly.dz" />
                </FormField>
                <FormField label="رقم الهاتف للمقر" required>
                  <input type="text" defaultValue="031 92 48 10" />
                </FormField>
              </div>

              <FormField label="شعار المنظمة بالعربية" required>
                <input type="text" defaultValue="نحو جيل يقود المستقبل بالعلم والابتكار" />
              </FormField>

              <FormField label="العنوان الجغرافي للمقر" required>
                <input type="text" defaultValue="حي سيدي مبروك السفلي، قسنطينة، الجزائر" />
              </FormField>

              <div className="border-t border-brand-border pt-4 flex justify-end">
                <Button type="submit" variant="secondary" leftIcon={<Save className="h-4.5 w-4.5" />}>
                  {t("admin.common.save")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
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
