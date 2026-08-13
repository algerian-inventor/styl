import React, { useState } from "react";
import Link from "next/link";
import { Calendar, User, ArrowLeft, ArrowRight } from "lucide-react";
import { Article } from "@/data/articles";
import { useLanguage } from "@/context/LanguageContext";
import { MediaFallback } from "./MediaFallback";

interface NewsCardProps {
  article: Article;
  variant?: "card" | "featured" | "row";
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, variant = "card" }) => {
  const { language, dir } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const isRtl = dir === "rtl";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  if (variant === "featured") {
    return (
      <div className="group grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-2xl overflow-hidden border border-[#DCE3EA] hover:border-brand-navy/30 transition-all duration-300 hover:shadow-md p-6 sm:p-8">
        <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto w-full min-h-[260px] rounded-xl overflow-hidden bg-slate-100">
          {article.coverImage && !imageError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.coverImage}
              alt={article.title[language]}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <MediaFallback
              title={article.title[language]}
              category={article.category[language]}
              aspectRatio="auto"
            />
          )}
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-brand-green uppercase tracking-wider bg-brand-green/10 px-2.5 py-1 rounded">
                {article.category[language]}
              </span>
              <span className="text-xs text-brand-muted flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {article.publishedDate}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark group-hover:text-brand-navy transition-colors leading-snug">
              <Link href={`/news/${article.slug}`}>
                {article.title[language]}
              </Link>
            </h3>

            <p className="text-base text-brand-muted leading-relaxed line-clamp-3">
              {article.summary[language]}
            </p>
          </div>

          <div className="pt-4 border-t border-[#DCE3EA] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium text-brand-muted">
              <div className="w-6 h-6 rounded-full bg-brand-navy/10 flex items-center justify-center text-brand-navy">
                <User className="w-3 h-3" />
              </div>
              <span>{article.author[language]}</span>
            </div>

            <Link
              href={`/news/${article.slug}`}
              className="inline-flex items-center gap-1.5 font-bold text-sm text-brand-navy group-hover:text-brand-green transition-colors"
            >
              <span>{language === "ar" ? "قراءة المقال" : "Read Article"}</span>
              <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "row") {
    return (
      <div className="group flex gap-4 sm:gap-6 p-4 sm:p-5 bg-white rounded-xl border border-[#DCE3EA] hover:border-brand-navy/30 transition-all hover:shadow-sm">
        <div className="relative w-28 sm:w-36 h-24 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
          {article.coverImage && !imageError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.coverImage}
              alt={article.title[language]}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <MediaFallback
              title={article.title[language]}
              category={article.category[language]}
              aspectRatio="auto"
            />
          )}
        </div>

        <div className="flex flex-col justify-between flex-grow">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-brand-muted">
              <span className="font-bold text-brand-green">
                {article.category[language]}
              </span>
              <span>•</span>
              <span>{article.publishedDate}</span>
            </div>

            <h4 className="text-base font-bold text-brand-dark group-hover:text-brand-navy transition-colors line-clamp-2 leading-snug">
              <Link href={`/news/${article.slug}`}>
                {article.title[language]}
              </Link>
            </h4>
          </div>

          <Link
            href={`/news/${article.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-navy group-hover:text-brand-green transition-colors mt-2"
          >
            <span>{language === "ar" ? "تفاصيل" : "Read more"}</span>
            <ArrowIcon className="w-3 h-3 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col h-full bg-white rounded-xl overflow-hidden border border-[#DCE3EA] hover:border-brand-navy/30 transition-all duration-300 hover:shadow-md">
      {/* Cover Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        {article.coverImage && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.coverImage}
            alt={article.title[language]}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <MediaFallback
            title={article.title[language]}
            category={article.category[language]}
            aspectRatio="16/10"
          />
        )}

        <div className="absolute top-3 right-3 z-10">
          <span className="text-xs font-bold bg-white/95 text-brand-green backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-200 shadow-xs">
            {article.category[language]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center gap-3 text-xs text-brand-muted">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {article.author[language]}
            </span>
          </div>

          <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-navy transition-colors line-clamp-2 leading-snug">
            {article.title[language]}
          </h3>

          <p className="text-sm text-brand-muted leading-relaxed line-clamp-3">
            {article.summary[language]}
          </p>
        </div>

        {/* Action Link */}
        <div className="pt-4 border-t border-[#DCE3EA]/60 flex items-center justify-end">
          <Link
            href={`/news/${article.slug}`}
            className="inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm text-brand-navy group-hover:text-brand-green transition-colors"
          >
            <span>{language === "ar" ? "قراءة المقال كاملاً" : "Read Full Article"}</span>
            <ArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
