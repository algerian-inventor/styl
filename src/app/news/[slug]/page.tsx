"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { User, Calendar, Share2, Link as LinkIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

// Brand icons declarations as inline SVGs
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ArticleDetailPage({ params }: PageProps) {
  const { slug } = React.use(params);
  const { language, dir } = useLanguage();
  const { articles } = usePrototypeState();

  const isRtl = dir === "rtl";
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Find related articles (same category, excluding current article)
  const relatedArticles = articles
    .filter((a) => a.category.en === article.category.en && a.id !== article.id)
    .slice(0, 3);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert(language === "ar" ? "تم نسخ الرابط الحافظة!" : "Link copied to clipboard!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Back button */}
      <div>
        <Link href="/news">
          <Button variant="ghost" size="sm" leftIcon={<BackIcon className="h-4 w-4" />}>
            {language === "ar" ? "العودة لغرفة الأخبار" : "Back to newsroom"}
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Main Article Body */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex gap-2 items-center flex-wrap">
              <span className="text-xs font-bold text-brand-green bg-brand-green/5 border border-brand-green/20 px-2.5 py-0.5 rounded uppercase tracking-wider">
                {language === "ar" ? article.category.ar : article.category.en}
              </span>
              <span className="text-[10px] text-brand-muted font-bold flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {article.publishedDate}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-dark leading-snug">
              {language === "ar" ? article.title.ar : article.title.en}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-2 text-xs text-brand-muted font-semibold bg-white border border-brand-border p-3 rounded-lg w-fit">
              <User className="h-4 w-4 text-brand-green" />
              <span>
                {language === "ar" ? "بواسطة:" : "By:"} {language === "ar" ? article.author.ar : article.author.en}
              </span>
            </div>

            <div className="h-[1px] bg-brand-border" />

            {/* Content text */}
            <div className="text-xs sm:text-sm text-brand-dark leading-relaxed font-semibold whitespace-pre-line space-y-4">
              {language === "ar" ? article.content.ar : article.content.en}
            </div>

            {/* Article Tags */}
            {article.tags && (
              <div className="flex flex-wrap gap-2 pt-4">
                {(language === "ar" ? article.tags.ar : article.tags.en).map((tag, idx) => (
                  <Badge key={idx}>#{tag}</Badge>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column: Social Share & Related Articles */}
        <div className="space-y-8">
          {/* Share */}
          <Card className="bg-white border border-brand-border p-6 shadow-xs space-y-4">
            <h4 className="font-bold text-brand-dark text-xs sm:text-sm border-b border-brand-border pb-2 flex items-center gap-2">
              <Share2 className="h-4 w-4 text-brand-green" />
              {language === "ar" ? "مشاركة الخبر" : "Share Article"}
            </h4>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={handleCopyLink} leftIcon={<LinkIcon className="h-4 w-4" />}>
                {language === "ar" ? "نسخ الرابط" : "Copy Link"}
              </Button>
              <a href="#" className="flex-1" onClick={(e) => e.preventDefault()}>
                <Button variant="outline" size="sm" className="w-full" leftIcon={<FacebookIcon className="h-4 w-4 text-blue-600" />}>
                  Facebook
                </Button>
              </a>
              <a href="#" className="flex-1" onClick={(e) => e.preventDefault()}>
                <Button variant="outline" size="sm" className="w-full" leftIcon={<TwitterIcon className="h-4 w-4 text-sky-500" />}>
                  Twitter
                </Button>
              </a>
            </div>
          </Card>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-bold text-brand-dark text-sm">
                {language === "ar" ? "أخبار ذات صلة:" : "Related news:"}
              </h4>
              <div className="space-y-4">
                {relatedArticles.map((rel) => (
                  <Link key={rel.id} href={`/news/${rel.slug}`} className="block group">
                    <Card className="p-4 border border-brand-border bg-white hover:border-brand-navy/35 transition-colors">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-brand-green">
                          {language === "ar" ? rel.category.ar : rel.category.en}
                        </span>
                        <h5 className="font-extrabold text-brand-dark text-xs sm:text-sm leading-snug group-hover:text-brand-navy group-hover:underline">
                          {language === "ar" ? rel.title.ar : rel.title.en}
                        </h5>
                        <p className="text-[10px] text-brand-muted line-clamp-2">
                          {language === "ar" ? rel.summary.ar : rel.summary.en}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
