"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Program } from "@/data/programs";
import { Search, Plus, Trash2, Edit } from "lucide-react";

export default function AdminProgramsPage() {
  const { t, language } = useLanguage();
  const { programs, deleteProgram } = usePrototypeState();

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteProgram(deleteId);
      setDeleteId(null);
    }
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
        <div className="space-y-1">
          <p className="font-extrabold text-brand-dark line-clamp-1 max-w-sm">
            {language === "ar" ? row.name.ar : row.name.en}
          </p>
          <span className="text-[10px] text-brand-muted font-bold block">
            ID: {row.id}
          </span>
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
          {/* Mock edit button showing prototype nature */}
          <Button
            variant="ghost"
            size="sm"
            className="p-1"
            onClick={() => alert(language === "ar" ? "خاصية التعديل معطلة في هذا الإصدار التجريبي" : "Editing is locked in this design prototype")}
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

        {/* Mock Add Program showing prototype warning */}
        <Button
          size="sm"
          leftIcon={<Plus className="h-4.5 w-4.5" />}
          onClick={() => alert(language === "ar" ? "خاصية إضافة برنامج معطلة في هذا الإصدار التجريبي" : "Adding clubs is locked in this design prototype")}
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
