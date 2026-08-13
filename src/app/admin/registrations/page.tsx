"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Search, Check, X, ShieldAlert, UserCheck, RefreshCw } from "lucide-react";
import { EventRegistration } from "@/data/registrations";

export default function AdminRegistrationsPage() {
  const { t, language } = useLanguage();
  const { registrations, updateRegistrationStatus, loadRegistrations } = usePrototypeState();

  React.useEffect(() => {
    loadRegistrations();
  }, [loadRegistrations]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleUpdateStatus = (id: string, status: EventRegistration["status"]) => {
    updateRegistrationStatus(id, status);
  };

  const getStatusBadge = (status: string) => {
    if (status === "confirmed") return <Badge variant="success">{t("admin.status.confirmed")}</Badge>;
    if (status === "pending") return <Badge variant="warning">{t("admin.status.pending")}</Badge>;
    if (status === "rejected") return <Badge variant="danger">{t("admin.status.rejected")}</Badge>;
    if (status === "attended") return <Badge variant="info">{t("admin.status.attended")}</Badge>;
    return <Badge>{status}</Badge>;
  };

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch =
      reg.fullName.toLowerCase().includes(search.toLowerCase()) ||
      reg.email.toLowerCase().includes(search.toLowerCase()) ||
      reg.phone.includes(search) ||
      (language === "ar" ? reg.eventTitle.ar : reg.eventTitle.en)
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || reg.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const columns: Column<EventRegistration>[] = [
    {
      header: t("forms.fullName"),
      cell: (row) => (
        <div className="space-y-0.5">
          <p className="font-extrabold text-brand-dark">{row.fullName}</p>
          <span className="text-[9px] text-brand-muted block">{row.email} | {row.phone}</span>
        </div>
      ),
    },
    {
      header: t("nav.events"),
      cell: (row) => (
        <span className="text-xs text-brand-dark font-semibold line-clamp-1 max-w-[200px]">
          {language === "ar" ? row.eventTitle.ar : row.eventTitle.en}
        </span>
      ),
    },
    {
      header: t("forms.wilaya"),
      accessorKey: "wilaya",
    },
    {
      header: t("admin.common.date"),
      accessorKey: "registrationDate",
    },
    {
      header: t("admin.common.status"),
      cell: (row) => getStatusBadge(row.status),
    },
    {
      header: t("forms.actions"),
      cell: (row) => (
        <div className="flex gap-2">
          {row.status === "pending" && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="p-1 text-green-600 hover:bg-green-50"
                onClick={() => handleUpdateStatus(row.id, "confirmed")}
                title="Confirm Registration"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-1 text-red-500 hover:bg-red-50"
                onClick={() => handleUpdateStatus(row.id, "rejected")}
                title="Reject Registration"
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          )}

          {row.status === "confirmed" && (
            <Button
              variant="ghost"
              size="sm"
              className="p-1 text-blue-600 hover:bg-blue-50"
              onClick={() => handleUpdateStatus(row.id, "attended")}
              leftIcon={<UserCheck className="h-4 w-4" />}
              title="Mark as Attended"
            >
              <span className="text-[10px] font-bold">{t("admin.status.attended")}</span>
            </Button>
          )}

          {row.status !== "pending" && (
            <Button
              variant="ghost"
              size="sm"
              className="p-1 text-brand-muted hover:bg-brand-bg"
              onClick={() => handleUpdateStatus(row.id, "pending")}
              title="Reset to Pending"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white border border-brand-border rounded-lg p-5 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-base font-extrabold text-brand-dark">
            {language === "ar" ? "تسجيلات الفعاليات والورشات" : "Workshop Registrations Logs"}
          </h3>
          <p className="text-xs text-brand-muted mt-0.5">
            {language === "ar"
              ? "متابعة طلبات حجز مقاعد الفعاليات، تأكيد الحضور، وإدارة بطاقات الدخول الإلكترونية."
              : "Review seat reservation forms, confirm attendees, and manage entrance badges."}
          </p>
        </div>

        {/* CSV export simulation */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => alert(language === "ar" ? "تصدير الملف غير مدعوم في هذا العرض التجريبي" : "CSV Export is not active in this design prototype")}
        >
          {t("admin.common.export")}
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-brand-border rounded-lg p-4 shadow-xs flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <span className="absolute inset-y-0 right-3 flex items-center text-brand-muted pointer-events-none rtl:right-3 ltr:left-3 ltr:right-auto">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder={language === "ar" ? "ابحث عن مشارك أو فعالية..." : "Search participant or event..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-1.5 border border-brand-border rounded-md text-xs bg-white text-brand-dark placeholder-slate-400 focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy rtl:pl-10 rtl:pr-10 ltr:pl-10 ltr:pr-4"
          />
        </div>

        {/* Status filters */}
        <div className="flex gap-2">
          {["all", "pending", "confirmed", "rejected", "attended"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 border rounded text-xs font-semibold cursor-pointer ${
                statusFilter === status
                  ? "bg-brand-navy border-brand-navy text-white shadow-xs"
                  : "bg-white border-brand-border text-brand-dark hover:bg-brand-bg"
              }`}
            >
              {status === "all" ? language === "ar" ? "كل الحالات" : "All Status" : t(`admin.status.${status}`)}
            </button>
          ))}
        </div>
      </div>

      {/* DataTable */}
      <DataTable columns={columns} data={filteredRegistrations} emptyMessage={t("admin.common.noData")} />
    </div>
  );
}
