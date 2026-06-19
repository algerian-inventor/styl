"use client";

import React, { useState } from "react";
import Link from "react-hook-form";
import LinkNext from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Search, Plus, Calendar, Eye, Trash2, ShieldAlert, ToggleLeft, ToggleRight } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Event } from "@/data/events";

export default function AdminEventsPage() {
  const { t, language } = useLanguage();
  const { events, deleteEvent, toggleEventRegistration } = usePrototypeState();

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteEvent(deleteId);
      setDeleteId(null);
    }
  };

  const filteredEvents = events.filter(
    (evt) =>
      evt.title.ar.toLowerCase().includes(search.toLowerCase()) ||
      evt.title.en.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<Event>[] = [
    {
      header: t("events.title"),
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
      header: t("admin.common.date"),
      cell: (row) => (
        <span className="text-xs text-brand-dark font-semibold">
          {row.date} {row.time}
        </span>
      ),
    },
    {
      header: t("events.location"),
      cell: (row) => (
        <span className="text-xs text-brand-muted line-clamp-1 max-w-[200px]">
          {language === "ar" ? row.location.ar : row.location.en}
        </span>
      ),
    },
    {
      header: t("events.capacity"),
      cell: (row) => (
        <span className="text-xs text-brand-dark font-bold">
          {row.capacity}
        </span>
      ),
    },
    {
      header: t("admin.common.status"),
      cell: (row) => (
        <Badge variant={row.isClosed ? "danger" : "success"}>
          {row.isClosed ? language === "ar" ? "مغلق" : "Closed" : language === "ar" ? "نشط" : "Active"}
        </Badge>
      ),
    },
    {
      header: t("forms.actions"),
      cell: (row) => (
        <div className="flex gap-2">
          {/* View Event shortcut */}
          <LinkNext href={`/events/${row.slug}`} target="_blank">
            <Button variant="ghost" size="sm" className="p-1" title="View event details">
              <Eye className="h-4 w-4 text-brand-navy" />
            </Button>
          </LinkNext>

          {/* Toggle registration */}
          <Button
            variant="ghost"
            size="sm"
            className="p-1"
            onClick={() => toggleEventRegistration(row.id)}
            title={row.isClosed ? t("admin.common.openReg") : t("admin.common.closeReg")}
          >
            {row.isClosed ? (
              <ToggleRight className="h-5 w-5 text-brand-muted" />
            ) : (
              <ToggleLeft className="h-5 w-5 text-green-600" />
            )}
          </Button>

          {/* Delete */}
          <Button
            variant="ghost"
            size="sm"
            className="p-1 text-red-500 hover:text-red-700"
            onClick={() => setDeleteId(row.id)}
            title="Delete event"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-brand-border rounded-lg p-5 shadow-xs">
        <div>
          <h3 className="text-base font-extrabold text-brand-dark">
            {language === "ar" ? "إدارة الفعاليات والورشات" : "Events & Workshops Manager"}
          </h3>
          <p className="text-xs text-brand-muted mt-0.5">
            {language === "ar"
              ? "إضافة فعاليات جديدة، إغلاق أو فتح تسجيلات المقاعد، وتصدير إحصائيات المسجلين."
              : "Create new workshops, open/close registration forms, and track user stats."}
          </p>
        </div>

        <LinkNext href="/admin/events/new">
          <Button size="sm" leftIcon={<Plus className="h-4.5 w-4.5" />}>
            {t("admin.common.create")}
          </Button>
        </LinkNext>
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

      {/* DataTable */}
      <DataTable columns={columns} data={filteredEvents} emptyMessage={t("admin.common.noData")} />

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
