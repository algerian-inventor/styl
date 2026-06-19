"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function EventsPage() {
  const { t, language, dir } = useLanguage();
  const { events } = usePrototypeState();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState<"upcoming" | "previous">("upcoming");

  const isRtl = dir === "rtl";
  const ArrowIcon = isRtl ? (
    <span className="ltr:ml-1 rtl:mr-1">←</span>
  ) : (
    <span className="ltr:ml-1 rtl:mr-1">→</span>
  );

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

    // Check if event is closed / past
    const isClosed = e.isClosed;
    const matchesTab =
      activeTab === "upcoming" ? !isClosed : isClosed;

    return matchesSearch && matchesCategory && matchesTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <SectionHeader
          title={t("events.title")}
          subtitle={t("events.subtitle")}
        />
      </motion.div>

      {/* Tabs Selector */}
      <div className="flex border-b border-brand-border justify-center gap-8">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`pb-4 px-6 font-bold text-sm border-b-2 transition-all cursor-pointer ${
            activeTab === "upcoming"
              ? "border-brand-navy text-brand-navy"
              : "border-transparent text-brand-muted hover:text-brand-dark"
          }`}
        >
          {t("events.upcoming")}
        </button>
        <button
          onClick={() => setActiveTab("previous")}
          className={`pb-4 px-6 font-bold text-sm border-b-2 transition-all cursor-pointer ${
            activeTab === "previous"
              ? "border-brand-navy text-brand-navy"
              : "border-transparent text-brand-muted hover:text-brand-dark"
          }`}
        >
          {t("events.previous")}
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-muted pointer-events-none rtl:right-0 rtl:pr-3 ltr:left-0 ltr:pl-3 ltr:right-auto">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder={t("events.search")}
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

      {/* Grid of Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredEvents.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <Card className="h-full flex flex-col sm:flex-row overflow-hidden border border-brand-border">
              {/* Cover Placeholder */}
              <div className="relative w-full sm:w-2/5 min-h-[160px] bg-brand-navy flex items-center justify-center border-b sm:border-b-0 sm:border-l border-brand-border overflow-hidden">
                <div className="absolute inset-0 bg-brand-green/20 bg-sci-grid animate-pulse" />
                <span className="text-xs font-bold text-white bg-brand-navy border border-brand-green px-2.5 py-1 rounded z-10">
                  {event.category}
                </span>
              </div>

              <CardContent className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-brand-dark line-clamp-1 leading-snug">
                    {language === "ar" ? event.title.ar : event.title.en}
                  </h3>
                  <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed font-medium">
                    {language === "ar" ? event.summary.ar : event.summary.en}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-brand-muted">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Calendar className="h-4 w-4 text-brand-green" />
                    <span>{event.date}</span>
                    <span className="mx-1">•</span>
                    <Clock className="h-4 w-4 text-brand-green" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-brand-green" />
                    <span className="line-clamp-1">{language === "ar" ? event.location.ar : event.location.en}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-brand-border flex items-center justify-between">
                  {activeTab === "upcoming" ? (
                    <Link href={`/events/${event.slug}`}>
                      <Button variant="primary" size="sm">
                        {t("events.registerNow")}
                      </Button>
                    </Link>
                  ) : (
                    <Badge>{language === "ar" ? "منتهية" : "Completed"}</Badge>
                  )}
                  <Link href={`/events/${event.slug}`}>
                    <Button variant="ghost" size="sm" rightIcon={ArrowIcon}>
                      {t("events.details")}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="py-12">
          <SectionHeader
            title={language === "ar" ? "لا توجد فعاليات" : "No events found"}
            subtitle={language === "ar" ? "جرب تغيير معايير البحث أو التصفية." : "Try changing search terms or filters."}
          />
        </div>
      )}
    </div>
  );
}
