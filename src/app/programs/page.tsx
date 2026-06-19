"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function ProgramsPage() {
  const { t, language, dir } = useLanguage();
  const { programs } = usePrototypeState();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const isRtl = dir === "rtl";
  const ArrowIcon = isRtl ? (
    <span className="ltr:ml-1 rtl:mr-1">←</span>
  ) : (
    <span className="ltr:ml-1 rtl:mr-1">→</span>
  );

  // Extract categories for filters
  const categories = ["all", "Robotics", "AI", "Electronics", "Innovation"];
  const categoryTranslations: Record<string, { ar: string; en: string }> = {
    all: { ar: "كل النوادي", en: "All Clubs" },
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <SectionHeader
          title={t("programs.title")}
          subtitle={t("programs.subtitle")}
        />
      </motion.div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-muted pointer-events-none rtl:right-0 rtl:pr-3 ltr:left-0 ltr:pl-3 ltr:right-auto">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder={language === "ar" ? "ابحث عن نادٍ أو برنامج..." : "Search for a club or program..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-brand-border rounded-md text-sm bg-white placeholder-slate-400 text-brand-dark focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy rtl:pl-10 rtl:pr-10 ltr:pl-10 ltr:pr-4"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-brand-navy border-brand-navy text-white shadow-xs"
                  : "bg-white border-brand-border text-brand-dark hover:bg-brand-bg"
              }`}
            >
              {language === "ar" ? categoryTranslations[cat].ar : categoryTranslations[cat].en}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Programs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPrograms.map((program, idx) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <Card className="h-full flex flex-col justify-between bg-white border border-brand-border">
              {/* Cover image / placeholder */}
              <div 
                className="relative h-44 bg-brand-navy flex items-center justify-center overflow-hidden border-b border-brand-border bg-cover bg-center"
                style={program.coverImage ? { backgroundImage: `url(${program.coverImage})` } : undefined}
              >
                <div className="absolute inset-0 bg-brand-dark/45 bg-sci-grid opacity-40" />
                <span className="text-xs font-extrabold text-brand-dark bg-white border border-brand-border px-3 py-1.5 rounded-md z-10 uppercase tracking-widest shadow-xs">
                  {language === "ar" ? program.category.ar : program.category.en}
                </span>
              </div>

              <CardContent className="p-5 flex-grow space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant={program.status === "active" ? "success" : program.status === "upcoming" ? "warning" : "default"}>
                    {program.status === "active"
                      ? t("programs.statusActive")
                      : program.status === "upcoming"
                      ? t("programs.statusUpcoming")
                      : t("programs.statusCompleted")}
                  </Badge>
                  <span className="text-[10px] text-brand-muted font-bold flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {program.startDate}
                  </span>
                </div>

                <h3 className="text-base font-bold text-brand-dark line-clamp-1 leading-snug">
                  {language === "ar" ? program.name.ar : program.name.en}
                </h3>
                <p className="text-xs text-brand-muted line-clamp-3 leading-relaxed font-medium">
                  {language === "ar" ? program.summary.ar : program.summary.en}
                </p>
              </CardContent>

              <CardFooter className="px-5 py-3 border-t border-brand-border">
                <Link href={`/programs/${program.slug}`} className="w-full">
                  <Button variant="ghost" size="sm" className="w-full" rightIcon={ArrowIcon}>
                    {t("programs.viewDetails")}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredPrograms.length === 0 && (
        <div className="py-12">
          <SectionHeader
            title={language === "ar" ? "لا توجد نتائج" : "No results found"}
            subtitle={language === "ar" ? "جرب كلمة بحث أخرى أو تصفية تصنيف مختلفة." : "Try another search term or filter parameters."}
          />
        </div>
      )}
    </div>
  );
}
