"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { NewsCard } from "@/components/ui/NewsCard";
import { CTASection } from "@/components/ui/CTASection";

export default function NewsPage() {
  const { t, language } = useLanguage();
  const { articles } = usePrototypeState();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "Activities", "Training", "Partnership"];
  const categoryTranslations: Record<string, { ar: string; en: string }> = {
    all: { ar: "كل الأخبار والمقالات", en: "All Articles" },
    Activities: { ar: "أنشطة ومشاركات", en: "Activities" },
    Training: { ar: "تدريب وتكوين", en: "Training" },
    Partnership: { ar: "شراكات ومبادرات", en: "Partnerships" },
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

  const featuredArticle = filteredArticles.find((a) => a.isFeatured) || filteredArticles[0];
  const regularArticles = filteredArticles.filter((a) => a.id !== (featuredArticle?.id || ""));

  return (
    <div className="w-full bg-[#F4F7FA]">
      {/* Page Hero */}
      <PageHero
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.news") },
        ]}
        eyebrow={language === "ar" ? "المركز الإعلامي" : "Media Center"}
        title={t("nav.news")}
        description={
          language === "ar"
            ? "متابعة شاملة لأحدث إنجازات الرابطة، مشاركات الشباب، والتغطيات الإخبارية والعلمية"
            : "Comprehensive coverage of our latest achievements, youth innovations, and scientific activities"
        }
      />

      {/* Newsroom Content */}
      <section className="py-16 sm:py-20">
        <Container className="space-y-12">
          {/* Search & Category Filter Bar */}
          <div className="bg-white border border-[#DCE3EA] rounded-2xl p-5 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 pointer-events-none rtl:right-0 rtl:pr-3.5 ltr:left-0 ltr:pl-3.5 ltr:right-auto">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder={language === "ar" ? "ابحث عن مقال أو تغطية..." : "Search for news or articles..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-10 border border-[#DCE3EA] rounded-xl text-sm bg-white placeholder-slate-400 text-brand-dark focus:ring-2 focus:ring-brand-navy/15 focus:border-brand-navy rtl:pl-10 rtl:pr-10 ltr:pl-10 ltr:pr-4"
              />
            </div>

            {/* Category Filter Pills */}
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

          {/* Featured Article */}
          {featuredArticle && search === "" && activeCategory === "all" && (
            <div className="w-full">
              <NewsCard article={featuredArticle} variant="featured" />
            </div>
          )}

          {/* Regular Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(search !== "" || activeCategory !== "all" ? filteredArticles : regularArticles).map((article) => (
                <NewsCard key={article.id} article={article} variant="card" />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-white rounded-2xl border border-[#DCE3EA] p-8 max-w-lg mx-auto space-y-3">
              <h3 className="text-xl font-bold text-brand-dark">
                {language === "ar" ? "لا توجد مقالات مطابقة" : "No articles found"}
              </h3>
              <p className="text-sm text-brand-muted">
                {language === "ar"
                  ? "جرب البحث بكلمات أخرى أو تغيير خيارات التصفية."
                  : "Try another search term or choose another filter."}
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
