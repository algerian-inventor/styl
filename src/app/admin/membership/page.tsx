"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Search, Eye, Check, X, ShieldAlert, Award, FileCode } from "lucide-react";
import { MembershipApplication } from "@/data/applications";

export default function AdminMembershipPage() {
  const { t, language } = useLanguage();
  const { applications, updateApplicationStatus } = usePrototypeState();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState<MembershipApplication | null>(null);

  const handleUpdateStatus = (id: string, status: MembershipApplication["status"]) => {
    updateApplicationStatus(id, status);
    // Refresh modal info if open
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status });
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "accepted") return <Badge variant="success">{t("admin.status.accepted")}</Badge>;
    if (status === "pending") return <Badge variant="warning">{t("admin.status.pending")}</Badge>;
    if (status === "rejected") return <Badge variant="danger">{t("admin.status.rejected")}</Badge>;
    if (status === "underReview") return <Badge variant="info">{t("admin.status.underReview")}</Badge>;
    return <Badge>{status}</Badge>;
  };

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase()) ||
      app.phone.includes(search) ||
      app.scientificInterests.some((interest) =>
        interest.toLowerCase().includes(search.toLowerCase())
      );

    const matchesStatus = statusFilter === "all" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const columns: Column<MembershipApplication>[] = [
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
      header: t("forms.wilaya"),
      accessorKey: "wilaya",
    },
    {
      header: t("forms.scientificInterests"),
      cell: (row) => (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {row.scientificInterests.map((interest, idx) => (
            <span key={idx} className="bg-brand-bg text-brand-dark border border-brand-border px-1.5 py-0.5 rounded text-[9px] font-semibold">
              {interest}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: t("admin.common.date"),
      accessorKey: "submissionDate",
    },
    {
      header: t("admin.common.status"),
      cell: (row) => getStatusBadge(row.status),
    },
    {
      header: t("forms.actions"),
      cell: (row) => (
        <div className="flex gap-2">
          {/* Review application details */}
          <Button
            variant="ghost"
            size="sm"
            className="p-1"
            onClick={() => setSelectedApp(row)}
            title="Review Details"
          >
            <Eye className="h-4.5 w-4.5 text-brand-navy" />
          </Button>

          {/* Quick approve */}
          {row.status === "pending" && (
            <Button
              variant="ghost"
              size="sm"
              className="p-1 text-green-600 hover:bg-green-50"
              onClick={() => handleUpdateStatus(row.id, "underReview")}
              title="Mark as Under Review"
            >
              <span className="text-[10px] font-bold">{t("admin.status.underReview")}</span>
            </Button>
          )}

          {row.status === "underReview" && (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="p-1 text-green-600 hover:bg-green-50"
                onClick={() => handleUpdateStatus(row.id, "accepted")}
                title="Accept Member"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-1 text-red-500 hover:bg-red-50"
                onClick={() => handleUpdateStatus(row.id, "rejected")}
                title="Reject Applicant"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white border border-brand-border rounded-lg p-5 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-base font-extrabold text-brand-dark">
            {language === "ar" ? "إدارة طلبات الانضمام للعضوية" : "Membership Applications Review"}
          </h3>
          <p className="text-xs text-brand-muted mt-0.5">
            {language === "ar"
              ? "مراجعة السير الذاتية والاهتمامات للمترشحين الجدد، تغيير حالة الطلبات وإرسال إشعارات المقابلة."
              : "Review curriculum vitae and interests, schedule interviews, and accept/reject applicants."}
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
            placeholder={language === "ar" ? "ابحث عن مترشح أو مهارة..." : "Search applicant or skill..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-1.5 border border-brand-border rounded-md text-xs bg-white text-brand-dark placeholder-slate-400 focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy rtl:pl-10 rtl:pr-10 ltr:pl-10 ltr:pr-4"
          />
        </div>

        {/* Status filters */}
        <div className="flex gap-2">
          {["all", "pending", "underReview", "accepted", "rejected"].map((status) => (
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
      <DataTable columns={columns} data={filteredApps} emptyMessage={t("admin.common.noData")} />

      {/* Details Inspector Modal */}
      <Modal isOpen={selectedApp !== null} onClose={() => setSelectedApp(null)} title={language === "ar" ? "ملف المترشح بالتفصيل" : "Applicant Detailed File"}>
        {selectedApp && (
          <div className="space-y-6 text-xs text-brand-dark">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-brand-border pb-4">
              <div>
                <h4 className="text-sm font-extrabold text-brand-navy">{selectedApp.fullName}</h4>
                <p className="text-[10px] text-brand-muted mt-0.5">{selectedApp.email} | {selectedApp.phone}</p>
              </div>
              {getStatusBadge(selectedApp.status)}
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-extrabold text-brand-muted block mb-0.5">{t("forms.dob")}</span>
                <p className="font-semibold">{selectedApp.dob}</p>
              </div>
              <div>
                <span className="font-extrabold text-brand-muted block mb-0.5">{t("forms.educationProfession")}</span>
                <p className="font-semibold">{selectedApp.educationProfession}</p>
              </div>
              <div>
                <span className="font-extrabold text-brand-muted block mb-0.5">{language === "ar" ? "البلدية والولاية" : "Municipality & Wilaya"}</span>
                <p className="font-semibold">{selectedApp.municipality}، {selectedApp.wilaya}</p>
              </div>
              <div>
                <span className="font-extrabold text-brand-muted block mb-0.5">{language === "ar" ? "تاريخ التقديم" : "Submission Date"}</span>
                <p className="font-semibold">{selectedApp.submissionDate}</p>
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-1.5">
              <span className="font-extrabold text-brand-muted block">{t("forms.scientificInterests")}</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedApp.scientificInterests.map((interest, idx) => (
                  <span key={idx} className="bg-brand-bg text-brand-dark border border-brand-border px-2 py-0.5 rounded font-semibold text-[10px]">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-1.5 bg-brand-bg p-3 border border-brand-border rounded">
              <span className="font-extrabold text-brand-dark block border-b border-brand-border pb-1 mb-1">{t("forms.skills")}</span>
              <p className="text-brand-muted leading-relaxed font-semibold">{selectedApp.skills}</p>
            </div>

            {/* Motivation */}
            <div className="space-y-1.5 bg-brand-bg p-3 border border-brand-border rounded">
              <span className="font-extrabold text-brand-dark block border-b border-brand-border pb-1 mb-1">{t("forms.motivation")}</span>
              <p className="text-brand-muted leading-relaxed font-semibold">{selectedApp.motivation}</p>
            </div>

            {/* Portfolio */}
            {selectedApp.portfolio && (
              <div className="flex items-center gap-2">
                <FileCode className="h-4 w-4 text-brand-green" />
                <span className="font-extrabold text-brand-dark">{t("forms.portfolio")}:</span>
                <a href={selectedApp.portfolio} target="_blank" rel="noopener noreferrer" className="text-brand-navy hover:underline font-semibold">
                  {selectedApp.portfolio}
                </a>
              </div>
            )}

            {/* Action buttons inside Modal */}
            <div className="flex gap-2 justify-end border-t border-brand-border pt-4">
              {selectedApp.status === "pending" && (
                <Button variant="secondary" size="sm" onClick={() => handleUpdateStatus(selectedApp.id, "underReview")}>
                  {language === "ar" ? "بدء المراجعة" : "Start Review"}
                </Button>
              )}
              {selectedApp.status === "underReview" && (
                <>
                  <Button variant="danger" size="sm" onClick={() => handleUpdateStatus(selectedApp.id, "rejected")}>
                    {language === "ar" ? "رفض" : "Reject"}
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => handleUpdateStatus(selectedApp.id, "accepted")}>
                    {language === "ar" ? "قبول العضو" : "Accept Member"}
                  </Button>
                </>
              )}
              <Button variant="outline" size="sm" onClick={() => setSelectedApp(null)}>
                {language === "ar" ? "إغلاق" : "Close"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
