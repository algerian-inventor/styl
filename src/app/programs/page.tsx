"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ProgramCard } from "@/components/ui/ProgramCard";
import { CTASection } from "@/components/ui/CTASection";

export default function ProgramsPage() {
  const { t, language } = useLanguage();
  const { programs } = usePrototypeState();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "Robotics", "AI", "Electronics", "Innovation"];
  const categoryTranslations: Record<string, { ar: string; en: string }> = {
    all: { ar: "كل البرامج والنوادي", en: "All Programs & Clubs" },
    Robotics: { ar: "الروبوتيك", en: "Robotics" },
    AI: { ar: "الذكاء الاصطناعي", en: "AI" },
    Electronics: { ar: "الإلكترونيات", en: "Electronics" },
    Innovation: { ar: "الابتكار والقيادة", en: "Innovation" },
  };

  const filteredPrograms = programs.filter((p) => {
    const matchesSearch =
      p.name.ar.toLowerCase().includes(search.toLowerCase()) ||
      p.name.en.toLowerCase().includes(search.toLowerCase()) ||
      p.summary.ar.toLowerCase().includes(search.toLowerCase()) ||
      p.summary.en.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "all" ||
      p.category.en.toLowerCase() === activeCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full bg-[#F4F7FA]">
      {/* Page Hero */}
      <PageHero
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.programs") },
        ]}
        eyebrow={language === "ar" ? "التكوين والتأطير" : "Mentorship & Clubs"}
        title={t("programs.title")}
        description={t("programs.subtitle")}
      />

      {/* Programs Content Section */}
      <section className="py-16 sm:py-20">
        <Container className="space-y-10">
          {/* Search & Category Filter Bar */}
          <div className="bg-white border border-[#DCE3EA] rounded-2xl p-5 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 pointer-events-none rtl:right-0 rtl:pr-3.5 ltr:left-0 ltr:pl-3.5 ltr:right-auto">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder={language === "ar" ? "ابحث عن نادٍ أو مسار..." : "Search for a club or track..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-10 border border-[#DCE3EA] rounded-xl text-sm bg-white placeholder-slate-400 text-brand-dark focus:ring-2 focus:ring-brand-navy/15 focus:border-brand-navy rtl:pl-10 rtl:pr-10 ltr:pl-10 ltr:pr-4"
              />
            </div>

            {/* Category Pills */}
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

          {/* Grid of Program Cards */}
          {filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-white rounded-2xl border border-[#DCE3EA] p-8 max-w-lg mx-auto space-y-3">
              <h3 className="text-xl font-bold text-brand-dark">
                {language === "ar" ? "لا توجد برامج مطابقة" : "No matching programs found"}
              </h3>
              <p className="text-sm text-brand-muted">
                {language === "ar"
                  ? "جرب البحث بكلمة أخرى أو اختر تصنيفاً مختلفاً."
                  : "Try another search term or switch to another category filter."}
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
