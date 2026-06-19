"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Partner } from "@/data/partners";
import { Search, Plus, Trash2, Globe } from "lucide-react";

export default function AdminPartnersPage() {
  const { t, language } = useLanguage();
  const { partners, deletePartner } = usePrototypeState();

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deletePartner(deleteId);
      setDeleteId(null);
    }
  };

  const filteredPartners = partners.filter(
    (part) =>
      part.name.ar.toLowerCase().includes(search.toLowerCase()) ||
      part.name.en.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<Partner>[] = [
    {
      header: language === "ar" ? "الشريك" : "Partner Name",
      cell: (row) => (
        <div className="space-y-0.5">
          <p className="font-extrabold text-brand-dark">{language === "ar" ? row.name.ar : row.name.en}</p>
          <span className="text-[9px] text-brand-muted block">ID: {row.id}</span>
        </div>
      ),
    },
    {
      header: t("programs.category"),
      cell: (row) => (
        <span className="text-xs text-brand-green font-semibold bg-brand-green/5 px-2 py-0.5 rounded border border-brand-green/10">
          {language === "ar" ? row.category.ar : row.category.en}
        </span>
      ),
    },
    {
      header: language === "ar" ? "رابط الموقع" : "Website link",
      cell: (row) =>
        row.website && row.website !== "#" ? (
          <a href={row.website} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-navy hover:underline flex items-center gap-1">
            <Globe className="h-3.5 w-3.5" />
            <span>{row.website}</span>
          </a>
        ) : (
          <span className="text-xs text-brand-muted font-bold">-</span>
        ),
    },
    {
      header: t("forms.actions"),
      cell: (row) => (
        <Button
          variant="ghost"
          size="sm"
          className="p-1 text-red-500 hover:text-red-700"
          onClick={() => setDeleteId(row.id)}
          title="Delete partner"
        >
          <Trash2 className="h-4.5 w-4.5" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-brand-border rounded-lg p-5 shadow-xs">
        <div>
          <h3 className="text-base font-extrabold text-brand-dark">
            {language === "ar" ? "إدارة شركاء الرابطة" : "Partners & Sponsors Registry"}
          </h3>
          <p className="text-xs text-brand-muted mt-0.5">
            {language === "ar"
              ? "متابعة بروتوكولات التعاون مع الجامعات والشركات وإضافتها لصفحات الشركاء."
              : "Review collaborative protocols with universities, sponsors, or startups."}
          </p>
        </div>

        {/* Mock Add partner */}
        <Button
          size="sm"
          leftIcon={<Plus className="h-4.5 w-4.5" />}
          onClick={() => alert(language === "ar" ? "خاصية إضافة الشركاء معطلة في هذا العرض التجريبي" : "Adding partners is locked in this design prototype")}
        >
          {t("admin.common.create")}
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-brand-border rounded-lg p-4 shadow-xs flex items-center justify-between">
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 right-3 flex items-center text-brand-muted pointer-events-none rtl:right-3 ltr:left-3 ltr:right-auto">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder={t("admin.common.search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-1.5 border border-brand-border rounded-md text-xs bg-white text-brand-dark placeholder-slate-400 focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy rtl:pl-10 rtl:pr-10 ltr:pl-10 ltr:pr-4"
          />
        </div>
      </div>

      {/* Table Data */}
      <DataTable columns={columns} data={filteredPartners} emptyMessage={t("admin.common.noData")} />

      {/* Delete confirmation */}
      <Modal isOpen={deleteId !== null} onClose={() => setDeleteId(null)} title={t("admin.common.confirmDelete")}>
        <div className="space-y-4">
          <p className="text-xs text-brand-muted leading-relaxed">
            {t("admin.common.cannotUndo")}
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" size="sm" onClick={() => setDeleteId(null)}>
              {t("admin.common.cancel")}
            </Button>
            <Button variant="danger" size="sm" onClick={handleDeleteConfirm}>
              {t("admin.common.delete")}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
