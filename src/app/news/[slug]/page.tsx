"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { User, Calendar, Share2, Link as LinkIcon, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { MediaFallback } from "@/components/ui/MediaFallback";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ArticleDetailPage({ params }: PageProps) {
  const { slug } = React.use(params);
  const { language, dir } = useLanguage();
  const { articles, addToast } = usePrototypeState();
  const [imageError, setImageError] = useState(false);

  const isRtl = dir === "rtl";
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = articles
    .filter((a) => a.category.en === article.category.en && a.id !== article.id)
    .slice(0, 3);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      addToast(
        language === "ar" ? "تم نسخ رابط المقال بنجاح!" : "Article link copied to clipboard!",
        "success"
      );
    }
  };

  return (
    <div className="w-full bg-[#F4F7FA]">
      {/* Page Hero */}
      <PageHero
        breadcrumbs={[
          { label: language === "ar" ? "الرئيسية" : "Home", href: "/" },
          { label: language === "ar" ? "الأخبار" : "News", href: "/news" },
          { label: article.title[language] },
        ]}
        eyebrow={article.category[language]}
        title={article.title[language]}
        description={article.summary[language]}
      />

      {/* Reading Container (Max 800px) */}
      <section className="py-16 sm:py-20">
        <Container size="narrow" className="space-y-10">
          {/* Article Header Metadata */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE3EA] shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#DCE3EA]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#062B55] text-white flex items-center justify-center font-bold text-sm">
                  <User className="w-4 h-4 text-brand-green-accent" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    {language === "ar" ? "الكاتب / المصدر" : "Author / Source"}
                  </p>
                  <p className="text-sm font-extrabold text-brand-dark">
                    {article.author[language]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
                <Calendar className="w-4 h-4 text-brand-green" />
                <span>{article.publishedDate}</span>
              </div>
            </div>

            {/* Cover Visual */}
            <div className="rounded-xl overflow-hidden border border-[#DCE3EA] bg-slate-100">
              {article.coverImage && !imageError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={article.coverImage}
                  alt={article.title[language]}
                  onError={() => setImageError(true)}
                  className="w-full aspect-[16/10] object-cover"
                />
              ) : (
                <MediaFallback
                  title={article.title[language]}
                  category={article.category[language]}
                  aspectRatio="16/10"
                />
              )}
            </div>

            {/* Article Content Typography */}
            <div className="text-base sm:text-lg text-brand-dark leading-[1.85] pt-4 whitespace-pre-line space-y-6 font-normal">
              {article.content[language]}
            </div>

            {/* Tags */}
            {article.tags && article.tags[language] && article.tags[language].length > 0 && (
              <div className="pt-6 border-t border-[#DCE3EA] flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400" />
                {article.tags[language].map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-md border border-slate-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Social Sharing Bar */}
          <div className="bg-white rounded-2xl p-6 border border-[#DCE3EA] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm font-bold text-brand-dark flex items-center gap-2">
              <Share2 className="w-4 h-4 text-brand-green" />
              {language === "ar" ? "مشاركة هذا المقال:" : "Share this article:"}
            </span>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                leftIcon={<LinkIcon className="w-3.5 h-3.5" />}
              >
                {language === "ar" ? "نسخ الرابط" : "Copy Link"}
              </Button>
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <div className="space-y-6 pt-6">
              <h3 className="text-xl font-extrabold text-brand-dark">
                {language === "ar" ? "مقالات وأخبار ذات صلة" : "Related Articles"}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/news/${rel.slug}`}
                    className="group bg-white p-5 rounded-xl border border-[#DCE3EA] hover:border-brand-navy/30 transition-all flex flex-col justify-between space-y-3 shadow-xs"
                  >
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-brand-green">
                        {rel.category[language]}
                      </span>
                      <h4 className="text-sm font-bold text-brand-dark group-hover:text-brand-navy transition-colors line-clamp-2 leading-snug">
                        {rel.title[language]}
                      </h4>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      {rel.publishedDate}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to Newsroom Button */}
          <div className="pt-4 text-center">
            <Link href="/news">
              <Button variant="outline" size="md" className="gap-2">
                <BackIcon className="w-4 h-4" />
                <span>{language === "ar" ? "العودة لقسم الأخبار" : "Back to Newsroom"}</span>
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
