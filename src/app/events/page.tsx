"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { EventCard } from "@/components/ui/EventCard";
import { CTASection } from "@/components/ui/CTASection";

export default function EventsPage() {
  const { t, language } = useLanguage();
  const { events } = usePrototypeState();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState<"upcoming" | "previous">("upcoming");

  const categories = ["all", "Science", "Robotics", "Innovation"];
  const categoryTranslations: Record<string, { ar: string; en: string }> = {
    all: { ar: "كل الفعاليات", en: "All Events" },
    Science: { ar: "صالون العلوم", en: "Science Salon" },
    Robotics: { ar: "الروبوتيك", en: "Robotics" },
    Innovation: { ar: "الابتكار والريادة", en: "Innovation" },
  };

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.title.ar.toLowerCase().includes(search.toLowerCase()) ||
      e.title.en.toLowerCase().includes(search.toLowerCase()) ||
      e.summary.ar.toLowerCase().includes(search.toLowerCase()) ||
      e.summary.en.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "all" ||
      e.category.toLowerCase() === activeCategory.toLowerCase();

    const isClosed = e.isClosed;
    const matchesTab = activeTab === "upcoming" ? !isClosed : isClosed;

    return matchesSearch && matchesCategory && matchesTab;
  });

  return (
    <div className="w-full bg-[#F4F7FA]">
      {/* Page Hero */}
      <PageHero
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.events") },
        ]}
        eyebrow={language === "ar" ? "المؤتمرات والتحديات" : "Conferences & Workshops"}
        title={t("events.title")}
        description={t("events.subtitle")}
      />

      {/* Events Directory */}
      <section className="py-16 sm:py-20">
        <Container className="space-y-10">
          {/* Upcoming vs Previous Tabs */}
          <div className="flex border-b border-[#DCE3EA] justify-center gap-4 sm:gap-8">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`pb-4 px-6 font-bold text-sm sm:text-base border-b-2 transition-all cursor-pointer ${
                activeTab === "upcoming"
                  ? "border-brand-green text-[#062B55]"
                  : "border-transparent text-slate-400 hover:text-brand-dark"
              }`}
            >
              {t("events.upcoming")}
            </button>
            <button
              onClick={() => setActiveTab("previous")}
              className={`pb-4 px-6 font-bold text-sm sm:text-base border-b-2 transition-all cursor-pointer ${
                activeTab === "previous"
                  ? "border-brand-green text-[#062B55]"
                  : "border-transparent text-slate-400 hover:text-brand-dark"
              }`}
            >
              {t("events.previous")}
            </button>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="bg-white border border-[#DCE3EA] rounded-2xl p-5 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 pointer-events-none rtl:right-0 rtl:pr-3.5 ltr:left-0 ltr:pl-3.5 ltr:right-auto">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder={t("events.search")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-10 border border-[#DCE3EA] rounded-xl text-sm bg-white placeholder-slate-400 text-brand-dark focus:ring-2 focus:ring-brand-navy/15 focus:border-brand-navy rtl:pl-10 rtl:pr-10 ltr:pl-10 ltr:pr-4"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#062B55] border-[#062B55] text-white shadow-xs"
                      : "bg-slate-50 border-[#DCE3EA] text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {language === "ar" ? categoryTranslations[cat].ar : categoryTranslations[cat].en}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Events */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} variant="card" />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-white rounded-2xl border border-[#DCE3EA] p-8 max-w-lg mx-auto space-y-3">
              <h3 className="text-xl font-bold text-brand-dark">
                {language === "ar" ? "لا توجد فعاليات مسجلة في هذا القسم" : "No events found in this section"}
              </h3>
              <p className="text-sm text-brand-muted">
                {language === "ar"
                  ? "تابع إعلاناتنا القادمة لمواكبة أحدث الورشات والمسابقات العلمية."
                  : "Stay tuned to our announcements for future workshops and challenges."}
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
