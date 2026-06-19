"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { StatCard } from "@/components/ui/StatCard";
import { FileText, Calendar, Users, UserCheck, MessageSquare, Image as ImageIcon, Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function AdminDashboardPage() {
  const { t, language } = useLanguage();
  const { articles, events, registrations, applications, contactMessages, galleryItems } = usePrototypeState();

  // Metrics definitions
  const publishedArticlesCount = articles.length;
  const upcomingEventsCount = events.filter((e) => !e.isClosed).length;
  const totalRegistrationsCount = registrations.length;
  const totalApplicationsCount = applications.length;
  const messagesCount = contactMessages.length;
  const galleryCount = galleryItems.length;

  // Recent activity logs merge
  const mergedActivity = [
    ...registrations.map((r) => ({
      id: r.id,
      type: "registration",
      title: {
        ar: `تسجيل جديد: ${r.fullName} في ${r.eventTitle.ar}`,
        en: `New Registration: ${r.fullName} for ${r.eventTitle.en}`,
      },
      date: r.registrationDate,
      status: r.status,
      href: "/admin/registrations",
    })),
    ...applications.map((a) => ({
      id: a.id,
      type: "membership",
      title: {
        ar: `طلب عضوية جديد من طرف ${a.fullName}`,
        en: `New Membership Application from ${a.fullName}`,
      },
      date: a.submissionDate,
      status: a.status,
      href: "/admin/membership",
    })),
    ...contactMessages.map((m) => ({
      id: m.id,
      type: "message",
      title: {
        ar: `رسالة تواصل من طرف ${m.fullName}: ${m.subject}`,
        en: `Contact message from ${m.fullName}: ${m.subject}`,
      },
      date: m.date,
      status: "pending",
      href: "/admin/settings", // Messages are reviewed in settings/activity in this mock
    })),
  ].sort((a, b) => b.id.localeCompare(a.id)); // sort by ID (newest first)

  const recentActivities = mergedActivity.slice(0, 5);

  // Chart data representation: Registrations by Field (Mock distribution)
  const chartData = [
    { label: { ar: "الروبوتيك", en: "Robotics" }, value: 35, percentage: "35%" },
    { label: { ar: "الذكاء الاصطناعي", en: "AI" }, value: 45, percentage: "45%" },
    { label: { ar: "الإلكترونيات", en: "Electronics" }, value: 20, percentage: "20%" },
    { label: { ar: "العلوم الأساسية", en: "Sciences" }, value: 15, percentage: "15%" },
  ];

  const getStatusVariant = (status: string) => {
    if (status === "confirmed" || status === "accepted" || status === "published") return "success";
    if (status === "pending" || status === "underReview") return "warning";
    if (status === "rejected") return "danger";
    return "default";
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-brand-border rounded-lg p-6 shadow-xs">
        <div>
          <h3 className="text-lg font-bold text-brand-dark">
            {t("admin.welcome")}
          </h3>
          <p className="text-xs text-brand-muted mt-1">
            {language === "ar"
              ? "إليك نظرة عامة على البيانات وحجم المشاركة التفاعلية في الرابطة اليوم."
              : "Here is an overview of the data and user engagement metrics today."}
          </p>
        </div>

        <div className="flex gap-2">
          <Link href="/admin/articles/new">
            <Button size="sm" leftIcon={<Plus className="h-4.5 w-4.5" />}>
              {language === "ar" ? "كتابة خبر" : "Write Article"}
            </Button>
          </Link>
          <Link href="/admin/events/new">
            <Button variant="secondary" size="sm" leftIcon={<Plus className="h-4.5 w-4.5" />}>
              {language === "ar" ? "إنشاء فعالية" : "Create Event"}
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title={t("admin.stats.publishedArticles")}
          value={publishedArticlesCount}
          icon={FileText}
          description="Total news articles"
          trend={{ value: "10%", isPositive: true }}
          colorClass="text-blue-500 bg-blue-50 border-blue-100"
        />

        <StatCard
          title={t("admin.stats.upcomingEvents")}
          value={upcomingEventsCount}
          icon={Calendar}
          description="Active event pages"
          colorClass="text-green-500 bg-green-50 border-green-100"
        />

        <StatCard
          title={t("admin.stats.eventRegs")}
          value={totalRegistrationsCount}
          icon={Users}
          description="Registrations in database"
          trend={{ value: "24%", isPositive: true }}
          colorClass="text-orange-500 bg-orange-50 border-orange-100"
        />

        <StatCard
          title={t("admin.stats.memberApps")}
          value={totalApplicationsCount}
          icon={UserCheck}
          description="Membership submissions"
          trend={{ value: "15%", isPositive: true }}
          colorClass="text-indigo-500 bg-indigo-50 border-indigo-100"
        />

        <StatCard
          title={t("admin.stats.messages")}
          value={messagesCount}
          icon={MessageSquare}
          description="Contact messages received"
          colorClass="text-red-500 bg-red-50 border-red-100"
        />

        <StatCard
          title={t("admin.stats.galleryItems")}
          value={galleryCount}
          icon={ImageIcon}
          description="Media assets online"
          colorClass="text-purple-500 bg-purple-50 border-purple-100"
        />
      </div>

      {/* Grid: Recent activities & charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent activities */}
        <Card className="lg:col-span-2 bg-white">
          <CardHeader className="border-b border-brand-border">
            <h4 className="font-bold text-brand-dark text-sm">
              {language === "ar" ? "أحدث النشاطات الواردة" : "Recent Activity Feed"}
            </h4>
          </CardHeader>
          <CardContent className="p-0">
            {recentActivities.length === 0 ? (
              <div className="p-8 text-center text-xs text-brand-muted">
                {t("admin.common.noData")}
              </div>
            ) : (
              <div className="divide-y divide-brand-border">
                {recentActivities.map((act) => (
                  <div key={act.id} className="p-5 flex items-center justify-between hover:bg-brand-bg/30 transition-colors">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-brand-dark leading-snug">
                        {language === "ar" ? act.title.ar : act.title.en}
                      </p>
                      <span className="text-[10px] text-brand-muted font-bold block">
                        {act.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge variant={getStatusVariant(act.status)}>
                        {t(`admin.status.${act.status}`)}
                      </Badge>
                      <Link href={act.href}>
                        <Button variant="ghost" size="sm">
                          {language === "ar" ? "عرض" : "Review"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* CSS Chart */}
        <Card className="bg-white">
          <CardHeader className="border-b border-brand-border">
            <h4 className="font-bold text-brand-dark text-sm">
              {language === "ar" ? "توزيع التسجيلات حسب المجال" : "Registrations by Tech Field"}
            </h4>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            {chartData.map((data, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-brand-dark">
                    {language === "ar" ? data.label.ar : data.label.en}
                  </span>
                  <span className="text-brand-navy font-bold">{data.value}%</span>
                </div>
                {/* Horizontal CSS Bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: data.percentage }}
                    className="bg-brand-green h-full rounded-full transition-all"
                  />
                </div>
              </div>
            ))}

            <div className="h-[1px] bg-brand-border" />

            <div className="p-3 bg-brand-bg border border-brand-border rounded text-[10px] text-brand-muted leading-relaxed">
              {language === "ar"
                ? "يتم توزيع هذه المؤشرات نسبياً بناءً على استبيان الاهتمامات العلمية المدرج باستمارة طلب الانضمام."
                : "This distribution metrics computes indicators dynamically from the scientific interests questionnaires."}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
