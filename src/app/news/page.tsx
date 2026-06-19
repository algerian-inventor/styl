"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Calendar, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function NewsPage() {
  const { t, language, dir } = useLanguage();
  const { articles } = usePrototypeState();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const isRtl = dir === "rtl";
  const ArrowIcon = isRtl ? (
    <span className="ltr:ml-1 rtl:mr-1">←</span>
  ) : (
    <span className="ltr:ml-1 rtl:mr-1">→</span>
  );

  const categories = ["all", "Achievements", "Training", "Partnership"];
  const categoryTranslations: Record<string, { ar: string; en: string }> = {
    all: { ar: "كل الأخبار", en: "All News" },
    Achievements: { ar: "إنجازات", en: "Achievements" },
    Training: { ar: "تدريب وتكوين", en: "Training" },
    Partnership: { ar: "شراكات", en: "Partnerships" },
  };

  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title.ar.toLowerCase().includes(search.toLowerCase()) ||
      art.title.en.toLowerCase().includes(search.toLowerCase()) ||
      art.summary.ar.toLowerCase().includes(search.toLowerCase()) ||
      art.summary.en.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "all" ||
      art.category.en.toLowerCase() === activeCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Featured article is the first article marked isFeatured (or just the first overall if none are featured)
  const featuredArticle = filteredArticles.find((a) => a.isFeatured) || filteredArticles[0];
  const regularArticles = filteredArticles.filter((a) => a.id !== (featuredArticle?.id || ""));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <SectionHeader
          title={t("nav.news")}
          subtitle={language === "ar" ? "تابع تغطيتنا الإعلامية وأبرز التتويجات والنشاطات" : "Keep track of our media coverage and institutional activities"}
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
            placeholder={language === "ar" ? "ابحث عن مقال أو خبر..." : "Search for news..."}
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

      {/* Featured Article Section */}
      {featuredArticle && search === "" && activeCategory === "all" && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
          <Card className="flex flex-col lg:flex-row overflow-hidden border border-brand-border bg-white shadow-xs">
            <div className="relative w-full lg:w-1/2 min-h-[250px] lg:min-h-[350px] bg-brand-navy flex items-center justify-center border-b lg:border-b-0 lg:border-l border-brand-border overflow-hidden">
              <div className="absolute inset-0 bg-brand-green/20 bg-sci-grid" />
              <Badge variant="info" className="absolute top-4 right-4 z-10 text-[10px] uppercase font-bold tracking-wider">
                {language === "ar" ? "مقال مميز" : "Featured Article"}
              </Badge>
              <span className="text-xs font-bold text-brand-dark bg-white border border-brand-border px-3 py-1 rounded z-10">
                {language === "ar" ? featuredArticle.category.ar : featuredArticle.category.en}
              </span>
            </div>

            <CardContent className="p-8 flex-grow flex flex-col justify-between space-y-6 lg:w-1/2">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-brand-muted font-semibold">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {language === "ar" ? featuredArticle.author.ar : featuredArticle.author.en}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {featuredArticle.publishedDate}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-brand-dark leading-snug">
                  {language === "ar" ? featuredArticle.title.ar : featuredArticle.title.en}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-medium">
                  {language === "ar" ? featuredArticle.summary.ar : featuredArticle.summary.en}
                </p>
              </div>

              <div>
                <Link href={`/news/${featuredArticle.slug}`}>
                  <Button variant="primary" rightIcon={ArrowIcon}>
                    {language === "ar" ? "قراءة المقال بالكامل" : "Read full article"}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Grid of Regular Articles */}
      {filteredArticles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(search !== "" || activeCategory !== "all" ? filteredArticles : regularArticles).map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Card className="h-full flex flex-col justify-between bg-white border border-brand-border">
                {/* Image Placeholder */}
                <div className="relative h-44 bg-brand-navy flex items-center justify-center overflow-hidden border-b border-brand-border">
                  <div className="absolute inset-0 bg-brand-dark bg-sci-grid opacity-30" />
                  <span className="text-xs font-bold text-brand-dark bg-white border border-brand-border px-2.5 py-1 rounded z-10">
                    {language === "ar" ? article.category.ar : article.category.en}
                  </span>
                </div>

                <CardContent className="p-5 flex-grow space-y-4">
                  <div className="flex items-center gap-2 text-[10px] text-brand-muted font-bold">
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {language === "ar" ? article.author.ar : article.author.en}
                    </span>
                    <span>•</span>
                    <span>{article.publishedDate}</span>
                  </div>

                  <h3 className="text-base font-bold text-brand-dark line-clamp-2 leading-snug">
                    {language === "ar" ? article.title.ar : article.title.en}
                  </h3>
                  <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed font-semibold">
                    {language === "ar" ? article.summary.ar : article.summary.en}
                  </p>
                </CardContent>

                <CardFooter className="px-5 py-3 border-t border-brand-border">
                  <Link href={`/news/${article.slug}`} className="w-full">
                    <Button variant="ghost" size="sm" className="w-full" rightIcon={ArrowIcon}>
                      {language === "ar" ? "اقرأ الخبر كاملاً" : "Read full article"}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {filteredArticles.length === 0 && (
        <div className="py-12">
          <SectionHeader
            title={language === "ar" ? "لا توجد أخبار" : "No articles found"}
            subtitle={language === "ar" ? "جرب استخدام معايير بحث أخرى." : "Try using other search terms."}
          />
        </div>
      )}
    </div>
  );
}
