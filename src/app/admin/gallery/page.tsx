"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { GalleryItem } from "@/data/gallery";
import { Search, Plus, Trash2 } from "lucide-react";

export default function AdminGalleryPage() {
  const { t, language } = useLanguage();
  const { galleryItems, deleteGalleryItem } = usePrototypeState();

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteGalleryItem(deleteId);
      setDeleteId(null);
    }
  };

  const filteredItems = galleryItems.filter(
    (item) =>
      item.title.ar.toLowerCase().includes(search.toLowerCase()) ||
      item.title.en.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<GalleryItem>[] = [
    {
      header: t("contact.subject"),
      cell: (row) => (
        <div className="space-y-0.5">
          <p className="font-extrabold text-brand-dark">{language === "ar" ? row.title.ar : row.title.en}</p>
          <span className="text-[9px] text-brand-muted block">ID: {row.id}</span>
        </div>
      ),
    },
    {
      header: language === "ar" ? "الألبوم" : "Album",
      cell: (row) => (
        <span className="text-xs text-brand-dark font-semibold">
          {language === "ar" ? row.albumName.ar : row.albumName.en}
        </span>
      ),
    },
    {
      header: language === "ar" ? "نوع الوسائط" : "Media Type",
      cell: (row) => (
        <span className="text-xs text-brand-muted uppercase font-bold">
          {row.type}
        </span>
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
          title="Delete media"
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
            {language === "ar" ? "إدارة معرض الوسائط" : "Media Gallery Asset Controller"}
          </h3>
          <p className="text-xs text-brand-muted mt-0.5">
            {language === "ar"
              ? "متابعة ألبومات الصور والفيديوهات، ورفع عناصر توثيقية جديدة لفعاليات ونشاطات الرابطة."
              : "Review photography and video assets, create placeholder elements, or delete."}
          </p>
        </div>

        {/* Mock Add media indicator */}
        <Button
          size="sm"
          leftIcon={<Plus className="h-4.5 w-4.5" />}
          onClick={() => alert(language === "ar" ? "خاصية إضافة وسائط معطلة في هذا العرض التجريبي" : "Adding media is locked in this design prototype")}
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
      <DataTable columns={columns} data={filteredItems} emptyMessage={t("admin.common.noData")} />

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
