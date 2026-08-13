"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { GalleryItem } from "@/data/gallery";
import { Search, Plus, Trash2, Upload } from "lucide-react";

export default function AdminGalleryPage() {
  const { t, language } = useLanguage();
  const { galleryItems, addGalleryItem, deleteGalleryItem, addToast } = usePrototypeState();

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Form states
  const [titleAr, setTitleAr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [album, setAlbum] = useState("robotics");
  const [imageUrl, setImageUrl] = useState("");

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteGalleryItem(deleteId);
      setDeleteId(null);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const { uploadFileToBucket } = await import("@/lib/storage");
      const { url, error } = await uploadFileToBucket(file, "gallery");
      if (url) {
        setImageUrl(url);
      } else {
        addToast(error || "Failed to upload gallery image", "error");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAr || !titleEn || !imageUrl) return;

    const albumNames: Record<string, { ar: string; en: string }> = {
      robotics: { ar: "الروبوتيك", en: "Robotics" },
      salon: { ar: "صالون العلوم", en: "Science Salon" },
      camp: { ar: "معسكر الذكاء الاصطناعي", en: "AI Bootcamp" },
    };

    addGalleryItem({
      title: { ar: titleAr, en: titleEn },
      album,
      albumName: albumNames[album] || { ar: "عام", en: "General" },
      type: "image",
      url: imageUrl,
    });

    // Reset and close
    setTitleAr("");
    setTitleEn("");
    setAlbum("robotics");
    setImageUrl("");
    setIsCreateOpen(false);
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
        <div className="flex items-center gap-3">
          {/* Miniature Image Preview */}
          <div className="h-10 w-10 rounded border border-brand-border bg-slate-100 flex-shrink-0 overflow-hidden flex items-center justify-center">
            {row.url ? (
              <img src={row.url} alt="" className="h-full w-full object-cover" />
            ) : (
              <span className="text-[10px] text-slate-400">Mock</span>
            )}
          </div>
          <div className="space-y-0.5">
            <p className="font-extrabold text-brand-dark text-xs sm:text-sm">
              {language === "ar" ? row.title.ar : row.title.en}
            </p>
            <span className="text-[9px] text-brand-muted block">ID: {row.id}</span>
          </div>
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-brand-border rounded-xl p-5 shadow-xs">
        <div>
          <h3 className="text-base font-extrabold text-brand-dark">
            {language === "ar" ? "إدارة معرض الوسائط" : "Media Gallery Asset Controller"}
          </h3>
          <p className="text-xs text-brand-muted mt-0.5">
            {language === "ar"
              ? "متابعة ألبومات الصور والفيديوهات، ورفع عناصر توثيقية جديدة لفعاليات ونشاطات الرابطة."
              : "Review photography and video assets, upload custom photos, or delete entries."}
          </p>
        </div>

        <Button
          size="sm"
          leftIcon={<Plus className="h-4.5 w-4.5" />}
          onClick={() => setIsCreateOpen(true)}
        >
          {t("admin.common.create")}
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-brand-border rounded-xl p-4 shadow-xs flex items-center justify-between">
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

      {/* Upload Media Modal Form */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title={language === "ar" ? "إضافة صورة للمعرض" : "Add Image to Gallery"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label={language === "ar" ? "العنوان (بالعربية)" : "Title (Arabic)"} required>
            <input
              type="text"
              placeholder="مثال: فريق الروبوتات الفائز"
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
            />
          </FormField>

          <FormField label={language === "ar" ? "العنوان (بالإنجليزية)" : "Title (English)"} required>
            <input
              type="text"
              placeholder="e.g. Winning Robotics Team"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
            />
          </FormField>

          <FormField label={language === "ar" ? "الألبوم" : "Album"} required>
            <select value={album} onChange={(e) => setAlbum(e.target.value)}>
              <option value="robotics">{language === "ar" ? "الروبوتيك" : "Robotics"}</option>
              <option value="salon">{language === "ar" ? "صالون العلوم" : "Science Salon"}</option>
              <option value="camp">{language === "ar" ? "معسكر الذكاء الاصطناعي" : "AI Bootcamp"}</option>
            </select>
          </FormField>

          <FormField label={language === "ar" ? "اختر صورة للرفع" : "Select Image to Upload"} required>
            <div className="flex flex-col gap-2">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-brand-border rounded-xl cursor-pointer hover:bg-brand-bg/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                  <Upload className="h-8 w-8 text-brand-navy mb-2" />
                  <p className="text-xs font-semibold text-brand-dark">
                    {language === "ar" ? "انقر لاختيار ملف صورة" : "Click to select an image file"}
                  </p>
                  <p className="text-[10px] text-brand-muted mt-1">PNG, JPG, WEBP</p>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>

              {/* Uploaded Preview */}
              {imageUrl && (
                <div className="relative h-20 w-20 rounded-lg overflow-hidden border border-brand-border mt-2">
                  <img src={imageUrl} alt="preview" className="h-full w-full object-cover" />
                </div>
              )}
            </div>
          </FormField>

          <div className="flex gap-3 justify-end pt-2">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsCreateOpen(false)}>
              {t("admin.common.cancel")}
            </Button>
            <Button variant="secondary" size="sm" type="submit" disabled={!titleAr || !titleEn || !imageUrl}>
              {language === "ar" ? "حفظ ونشر" : "Save & Publish"}
            </Button>
          </div>
        </form>
      </Modal>

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
