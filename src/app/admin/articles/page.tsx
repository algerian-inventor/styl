"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Search, Check, Eye } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Article } from "@/data/articles";

export default function AdminArticlesPage() {
  const { t, language } = useLanguage();
  const { articles, deleteArticle, updateArticle } = usePrototypeState();

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteArticle(deleteId);
      setDeleteId(null);
    }
  };

  const handleTogglePublish = (id: string, currentStatus: string) => {
    updateArticle(id, {
      isFeatured: currentStatus === "published" ? false : true, // Toggle featured as publish indicator in mock
    });
  };

  const filteredArticles = articles.filter(
    (art) =>
      art.title.ar.toLowerCase().includes(search.toLowerCase()) ||
      art.title.en.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<Article>[] = [
    {
      header: t("contact.subject"),
      cell: (row) => (
        <div className="space-y-1">
          <p className="font-extrabold text-brand-dark line-clamp-1 max-w-sm">
            {language === "ar" ? row.title.ar : row.title.en}
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
        <span className="text-xs font-semibold text-brand-dark">
          {language === "ar" ? row.category.ar : row.category.en}
        </span>
      ),
    },
    {
      header: t("admin.common.date"),
      accessorKey: "publishedDate",
    },
    {
      header: t("admin.common.status"),
      cell: (row) => (
        <Badge variant={row.isFeatured ? "success" : "default"}>
          {row.isFeatured ? t("admin.status.published") : t("admin.status.archived")}
        </Badge>
      ),
    },
    {
      header: t("forms.actions"),
      cell: (row) => (
        <div className="flex gap-2">
          {/* View link shortcut */}
          <Link href={`/news/${row.slug}`} target="_blank">
            <Button variant="ghost" size="sm" className="p-1" title="View details">
              <Eye className="h-4 w-4 text-brand-navy" />
            </Button>
          </Link>
          
          <Button
            variant="ghost"
            size="sm"
            className="p-1"
            onClick={() => handleTogglePublish(row.id, row.isFeatured ? "published" : "archived")}
            title="Toggle publish status"
          >
            <Check className={`h-4 w-4 ${row.isFeatured ? "text-green-600" : "text-brand-muted"}`} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="p-1 text-red-500 hover:text-red-700"
            onClick={() => setDeleteId(row.id)}
            title="Delete article"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-brand-border rounded-lg p-5 shadow-xs">
        <div>
          <h3 className="text-base font-extrabold text-brand-dark">
            {language === "ar" ? "قائمة المقالات والأخبار" : "Articles & Press List"}
          </h3>
          <p className="text-xs text-brand-muted mt-0.5">
            {language === "ar"
              ? "إدارة الأخبار والمقالات المنشورة، يمكنك تعديلها أو أرشفتها أو حذفها."
              : "Manage news and articles, perform CRUD edits, change statuses, or delete."}
          </p>
        </div>

        <Link href="/admin/articles/new">
          <Button size="sm" leftIcon={<Plus className="h-4.5 w-4.5" />}>
            {t("admin.common.create")}
          </Button>
        </Link>
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
      <DataTable columns={columns} data={filteredArticles} emptyMessage={t("admin.common.noData")} />

      {/* Delete Confirmation Modal */}
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
