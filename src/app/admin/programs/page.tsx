"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { FormField } from "@/components/ui/FormField";
import { Program } from "@/data/programs";
import { Search, Plus, Trash2, Edit, Upload, Save } from "lucide-react";

export default function AdminProgramsPage() {
  const { t, language } = useLanguage();
  const { programs, deleteProgram, addProgram, updateProgram } = usePrototypeState();

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);

  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [summaryAr, setSummaryAr] = useState("");
  const [summaryEn, setSummaryEn] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [categoryAr, setCategoryAr] = useState("");
  const [categoryEn, setCategoryEn] = useState("");
  const [status, setStatus] = useState<"active" | "upcoming" | "completed">("active");
  const [startDate, setStartDate] = useState("");
  const [durationAr, setDurationAr] = useState("");
  const [durationEn, setDurationEn] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [detailsArText, setDetailsArText] = useState("");
  const [detailsEnText, setDetailsEnText] = useState("");

  const resetForm = (prog: Program | null = null) => {
    if (prog) {
      setNameAr(prog.name.ar);
      setNameEn(prog.name.en);
      setSummaryAr(prog.summary.ar);
      setSummaryEn(prog.summary.en);
      setDescriptionAr(prog.description.ar);
      setDescriptionEn(prog.description.en);
      setCategoryAr(prog.category.ar);
      setCategoryEn(prog.category.en);
      setStatus(prog.status);
      setStartDate(prog.startDate);
      setDurationAr(prog.duration.ar);
      setDurationEn(prog.duration.en);
      setCoverImage(prog.coverImage || "");
      setDetailsArText(prog.details?.ar?.join("\n") || "");
      setDetailsEnText(prog.details?.en?.join("\n") || "");
    } else {
      setNameAr("");
      setNameEn("");
      setSummaryAr("");
      setSummaryEn("");
      setDescriptionAr("");
      setDescriptionEn("");
      setCategoryAr("");
      setCategoryEn("");
      setStatus("active");
      setStartDate(new Date().toISOString().split("T")[0]);
      setDurationAr("");
      setDurationEn("");
      setCoverImage("");
      setDetailsArText("");
      setDetailsEnText("");
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteProgram(deleteId);
      setDeleteId(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const programData = {
      name: { ar: nameAr, en: nameEn },
      summary: { ar: summaryAr, en: summaryEn },
      description: { ar: descriptionAr, en: descriptionEn },
      category: { ar: categoryAr, en: categoryEn },
      status,
      startDate,
      duration: { ar: durationAr, en: durationEn },
      coverImage,
      details: {
        ar: detailsArText.split("\n").map(s => s.trim()).filter(Boolean),
        en: detailsEnText.split("\n").map(s => s.trim()).filter(Boolean)
      }
    };

    if (editingProgram) {
      updateProgram(editingProgram.id, programData);
    } else {
      addProgram(programData);
    }
    setIsFormOpen(false);
    setEditingProgram(null);
  };

  const filteredPrograms = programs.filter(
    (prog) =>
      prog.name.ar.toLowerCase().includes(search.toLowerCase()) ||
      prog.name.en.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<Program>[] = [
    {
      header: t("programs.title"),
      cell: (row) => (
        <div className="flex items-center gap-3">
          {row.coverImage && (
            <div className="relative h-10 w-14 rounded overflow-hidden border border-brand-border bg-slate-50 flex-shrink-0">
              <img src={row.coverImage} alt="cover" className="h-full w-full object-cover" />
            </div>
          )}
          <div className="space-y-1">
            <p className="font-extrabold text-brand-dark line-clamp-1 max-w-sm">
              {language === "ar" ? row.name.ar : row.name.en}
            </p>
            <span className="text-[10px] text-brand-muted font-bold block">
              ID: {row.id}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: t("programs.category"),
      cell: (row) => (
        <span className="text-xs text-brand-dark font-semibold">
          {language === "ar" ? row.category.ar : row.category.en}
        </span>
      ),
    },
    {
      header: t("programs.startDate"),
      accessorKey: "startDate",
    },
    {
      header: t("programs.duration"),
      cell: (row) => (
        <span className="text-xs text-brand-muted">
          {language === "ar" ? row.duration.ar : row.duration.en}
        </span>
      ),
    },
    {
      header: t("admin.common.status"),
      cell: (row) => (
        <Badge variant={row.status === "active" ? "success" : row.status === "upcoming" ? "warning" : "default"}>
          {row.status === "active"
            ? t("programs.statusActive")
            : row.status === "upcoming"
            ? t("programs.statusUpcoming")
            : t("programs.statusCompleted")}
        </Badge>
      ),
    },
    {
      header: t("forms.actions"),
      cell: (row) => (
        <div className="flex gap-2">
          {/* Edit button */}
          <Button
            variant="ghost"
            size="sm"
            className="p-1"
            onClick={() => {
              setEditingProgram(row);
              resetForm(row);
              setIsFormOpen(true);
            }}
            title="Edit program"
          >
            <Edit className="h-4 w-4 text-brand-navy" />
          </Button>

          {/* Delete */}
          <Button
            variant="ghost"
            size="sm"
            className="p-1 text-red-500 hover:text-red-700"
            onClick={() => setDeleteId(row.id)}
            title="Delete program"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-brand-border rounded-lg p-5 shadow-xs">
        <div>
          <h3 className="text-base font-extrabold text-brand-dark">
            {language === "ar" ? "إدارة النوادي والبرامج التكوينية" : "Educational Clubs & Programs Controller"}
          </h3>
          <p className="text-xs text-brand-muted mt-0.5">
            {language === "ar"
              ? "متابعة النوادي التكنولوجية والعلمية النشطة والمكتملة المنضوية بالرابطة."
              : "Review active, upcoming, or completed training programs run by STLY."}
          </p>
        </div>

        {/* Add Program Button */}
        <Button
          size="sm"
          leftIcon={<Plus className="h-4.5 w-4.5" />}
          onClick={() => {
            setEditingProgram(null);
            resetForm(null);
            setIsFormOpen(true);
          }}
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
      <DataTable columns={columns} data={filteredPrograms} emptyMessage={t("admin.common.noData")} />

      {/* Add/Edit Modal Form */}
      <Modal 
        isOpen={isFormOpen} 
        onClose={() => {
          setIsFormOpen(false);
          setEditingProgram(null);
        }} 
        title={editingProgram ? (language === "ar" ? "تعديل بيانات النادي" : "Edit Club Program") : (language === "ar" ? "إضافة نادٍ جديد" : "Create New Club")}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
          {/* Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label={language === "ar" ? "اسم النادي (العربية)" : "Club Name (Arabic)"} required>
              <input type="text" value={nameAr} onChange={(e) => setNameAr(e.target.value)} required />
            </FormField>
            <FormField label={language === "ar" ? "اسم النادي (الإنجليزية)" : "Club Name (English)"} required>
              <input type="text" value={nameEn} onChange={(e) => setNameEn(e.target.value)} required />
            </FormField>
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label={language === "ar" ? "التصنيف (العربية)" : "Category (Arabic)"} required>
              <input type="text" value={categoryAr} onChange={(e) => setCategoryAr(e.target.value)} required />
            </FormField>
            <FormField label={language === "ar" ? "التصنيف (الإنجليزية)" : "Category (English)"} required>
              <input type="text" value={categoryEn} onChange={(e) => setCategoryEn(e.target.value)} required />
            </FormField>
          </div>

          {/* Dates & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label={language === "ar" ? "تاريخ البدء" : "Start Date"} required>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </FormField>
            <FormField label={language === "ar" ? "المدة (العربية)" : "Duration (Arabic)"} required>
              <input type="text" value={durationAr} onChange={(e) => setDurationAr(e.target.value)} required />
            </FormField>
            <FormField label={language === "ar" ? "المدة (الإنجليزية)" : "Duration (English)"} required>
              <input type="text" value={durationEn} onChange={(e) => setDurationEn(e.target.value)} required />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label={language === "ar" ? "حالة النادي" : "Status"} required>
              <select value={status} onChange={(e) => setStatus(e.target.value as "active" | "upcoming" | "completed")} required>
                <option value="active">{language === "ar" ? "نشط حالياً" : "Active"}</option>
                <option value="upcoming">{language === "ar" ? "قريباً" : "Upcoming"}</option>
                <option value="completed">{language === "ar" ? "منتهي / مكتمل" : "Completed"}</option>
              </select>
            </FormField>
          </div>

          {/* Image Uploader */}
          <FormField label={language === "ar" ? "صورة غلاف النادي" : "Club Cover Image"}>
            <div className="space-y-3">
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-brand-border rounded-lg cursor-pointer hover:bg-brand-bg/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-3 pb-3 text-center">
                  <Upload className="h-6 w-6 text-brand-navy mb-1" />
                  <p className="text-[10px] font-bold text-brand-dark">
                    {language === "ar" ? "اختر صورة الغلاف" : "Select Cover Image"}
                  </p>
                  <p className="text-[8px] text-brand-muted">PNG, JPG, WEBP</p>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
              {coverImage && (
                <div className="relative h-20 w-32 rounded-lg overflow-hidden border border-brand-border bg-slate-100">
                  <img src={coverImage} alt="cover-preview" className="h-full w-full object-cover" />
                </div>
              )}
            </div>
          </FormField>

          {/* Summaries */}
          <div className="grid grid-cols-1 gap-4">
            <FormField label={language === "ar" ? "ملخص قصير (العربية)" : "Short Summary (Arabic)"} required>
              <input type="text" value={summaryAr} onChange={(e) => setSummaryAr(e.target.value)} required />
            </FormField>
            <FormField label={language === "ar" ? "ملخص قصير (الإنجليزية)" : "Short Summary (English)"} required>
              <input type="text" value={summaryEn} onChange={(e) => setSummaryEn(e.target.value)} required />
            </FormField>
          </div>

          {/* Descriptions */}
          <div className="grid grid-cols-1 gap-4">
            <FormField label={language === "ar" ? "الوصف التفصيلي (العربية)" : "Detailed Description (Arabic)"} required>
              <textarea rows={3} value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)} required />
            </FormField>
            <FormField label={language === "ar" ? "الوصف التفصيلي (الإنجليزية)" : "Detailed Description (English)"} required>
              <textarea rows={3} value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} required />
            </FormField>
          </div>

          {/* Details (What they will learn) */}
          <div className="grid grid-cols-1 gap-4">
            <FormField label={language === "ar" ? "تفاصيل محتوى النادي (سطر لكل عنصر - العربية)" : "Club Content / What you learn (One per line - Arabic)"} required>
              <textarea rows={3} value={detailsArText} onChange={(e) => setDetailsArText(e.target.value)} placeholder="أساسيات الروبوتات&#10;التعامل مع الحساسات" required />
            </FormField>
            <FormField label={language === "ar" ? "تفاصيل محتوى النادي (سطر لكل عنصر - الإنجليزية)" : "Club Content / What you learn (One per line - English)"} required>
              <textarea rows={3} value={detailsEnText} onChange={(e) => setDetailsEnText(e.target.value)} placeholder="Robotics basics&#10;Working with sensors" required />
            </FormField>
          </div>

          <div className="border-t border-brand-border pt-4 flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setIsFormOpen(false);
                setEditingProgram(null);
              }}
            >
              {t("admin.common.cancel")}
            </Button>
            <Button type="submit" variant="secondary" leftIcon={<Save className="h-4 w-4" />}>
              {t("admin.common.save")}
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
