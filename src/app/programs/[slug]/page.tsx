"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, BookOpen, CheckCircle2, ArrowLeft, ArrowRight, UserPlus, Layers, Atom } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { MediaFallback } from "@/components/ui/MediaFallback";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProgramDetailPage({ params }: PageProps) {
  const { slug } = React.use(params);
  const { t, language, dir } = useLanguage();
  const { programs } = usePrototypeState();
  const [imageError, setImageError] = useState(false);

  const isRtl = dir === "rtl";
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  const program = programs.find((p) => p.slug === slug);

  if (!program) {
    notFound();
  }

  const statusLabel =
    program.status === "active"
      ? t("programs.statusActive")
      : program.status === "upcoming"
      ? t("programs.statusUpcoming")
      : t("programs.statusCompleted");

  const statusColor =
    program.status === "active"
      ? "bg-brand-green/20 text-brand-green-accent border-brand-green/30"
      : program.status === "upcoming"
      ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
      : "bg-slate-500/20 text-slate-300 border-slate-500/30";

  return (
    <div className="w-full bg-[#F4F7FA]">
      {/* Page Hero */}
      <PageHero
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.programs"), href: "/programs" },
          { label: program.name[language] },
        ]}
        eyebrow={program.category[language]}
        title={program.name[language]}
        description={program.summary[language]}
        badge={
          <span className={`text-xs font-bold px-3 py-1 rounded-md border ${statusColor}`}>
            {statusLabel}
          </span>
        }
      />

      {/* Main Content Area */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content Column (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Cover Image or Fallback */}
              <div className="rounded-2xl overflow-hidden border border-[#DCE3EA] bg-white shadow-xs">
                {program.coverImage && !imageError ? (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={program.coverImage}
                      alt={program.name[language]}
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <MediaFallback
                    title={program.name[language]}
                    category={program.category[language]}
                    aspectRatio="16/9"
                  />
                )}
              </div>

              {/* Program Detailed Description */}
              <div className="bg-white rounded-2xl p-8 border border-[#DCE3EA] shadow-xs space-y-6">
                <div className="flex items-center gap-3 border-b border-[#DCE3EA] pb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy/10 flex items-center justify-center text-[#062B55]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-brand-dark">
                      {language === "ar" ? "تفاصيل وأهداف المسار التكويني" : "Program Overview & Objectives"}
                    </h3>
                    <p className="text-xs text-brand-muted">
                      {language === "ar" ? "رؤية شاملة للمهارات المكتسبة" : "Comprehensive skill roadmap"}
                    </p>
                  </div>
                </div>

                <div className="text-sm sm:text-base text-brand-dark leading-relaxed space-y-4">
                  <p>{program.description[language]}</p>
                </div>
              </div>

              {/* What You Will Learn (Curriculum Modules) */}
              {program.details[language] && program.details[language].length > 0 && (
                <div className="bg-white rounded-2xl p-8 border border-[#DCE3EA] shadow-xs space-y-6">
                  <div className="flex items-center gap-3 border-b border-[#DCE3EA] pb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                      <Atom className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-brand-dark">
                        {language === "ar" ? "ماذا ستتعلم في هذا النادي؟" : "What You Will Learn"}
                      </h3>
                      <p className="text-xs text-brand-muted">
                        {language === "ar" ? "المحاور والمشاريع التطبيقية" : "Practical modules and deliverables"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {program.details[language].map((detail, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-50 border border-[#DCE3EA] flex gap-3 items-start"
                      >
                        <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-bold text-brand-dark leading-snug">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sticky Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6 sticky top-28">
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#DCE3EA] shadow-xs space-y-6">
                <h3 className="text-base font-extrabold text-brand-dark border-b border-[#DCE3EA] pb-3 uppercase tracking-wider">
                  {language === "ar" ? "معلومات النادي" : "Program Summary"}
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy/5 flex items-center justify-center text-brand-navy border border-brand-navy/10">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400">{t("programs.startDate")}</p>
                      <p className="text-sm font-extrabold text-brand-dark">{program.startDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy/5 flex items-center justify-center text-brand-navy border border-brand-navy/10">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400">{t("programs.duration")}</p>
                      <p className="text-sm font-extrabold text-brand-dark">{program.duration[language]}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy/5 flex items-center justify-center text-brand-navy border border-brand-navy/10">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400">{t("programs.category")}</p>
                      <p className="text-sm font-extrabold text-brand-green">{program.category[language]}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DCE3EA] space-y-3">
                  <Link href="/membership" className="block w-full">
                    <Button variant="secondary" size="lg" className="w-full justify-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      <span>{language === "ar" ? "انضم للرابطة وشارك" : "Apply for Membership"}</span>
                    </Button>
                  </Link>

                  <Link href="/programs" className="block w-full">
                    <Button variant="outline" size="md" className="w-full justify-center gap-2">
                      <BackIcon className="w-4 h-4" />
                      <span>{language === "ar" ? "تصفح بقية البرامج" : "All Programs"}</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
