"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Clock, BookOpen, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProgramDetailPage({ params }: PageProps) {
  const { slug } = React.use(params);
  const { t, language, dir } = useLanguage();
  const { programs } = usePrototypeState();

  const isRtl = dir === "rtl";
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  const program = programs.find((p) => p.slug === slug);

  if (!program) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Back to list */}
      <div>
        <Link href="/programs">
          <Button variant="ghost" size="sm" leftIcon={<BackIcon className="h-4 w-4" />}>
            {language === "ar" ? "العودة لقائمة البرامج" : "Back to programs"}
          </Button>
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Left Column: Cover & Details */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant={program.status === "active" ? "success" : program.status === "upcoming" ? "warning" : "default"}>
                {program.status === "active"
                  ? t("programs.statusActive")
                  : program.status === "upcoming"
                  ? t("programs.statusUpcoming")
                  : t("programs.statusCompleted")}
              </Badge>
              <span className="text-xs font-bold text-brand-green uppercase bg-brand-green/5 border border-brand-green/20 px-2 py-0.5 rounded">
                {language === "ar" ? program.category.ar : program.category.en}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-dark leading-tight">
              {language === "ar" ? program.name.ar : program.name.en}
            </h1>

            <p className="text-base font-semibold leading-relaxed text-brand-dark">
              {language === "ar" ? program.summary.ar : program.summary.en}
            </p>

            <div className="h-[1px] bg-brand-border w-full" />

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-navy flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {language === "ar" ? "عن البرنامج التكويني" : "About the Program"}
              </h3>
              <p className="text-sm text-brand-muted leading-relaxed">
                {language === "ar" ? program.description.ar : program.description.en}
              </p>
            </div>

            {/* Curriculum/Bullet details */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-bold text-brand-navy flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                {language === "ar" ? "ماذا ستتعلم في هذا النادي؟" : "What will you learn?"}
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(language === "ar" ? program.details.ar : program.details.en).map((detail, idx) => (
                  <li key={idx} className="bg-white border border-brand-border p-4 rounded-lg flex gap-3 items-start shadow-xs">
                    <span className="h-5 w-5 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-xs font-semibold text-brand-dark leading-relaxed">
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Information Panel Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="sticky top-24 bg-white border border-brand-border p-6 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-brand-dark border-b border-brand-border pb-3 uppercase tracking-wider">
              {language === "ar" ? "معلومات التسجيل" : "Registration Info"}
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3 items-center text-xs">
                <Calendar className="h-5 w-5 text-brand-navy flex-shrink-0" />
                <div>
                  <h5 className="font-bold text-brand-muted">{t("programs.startDate")}</h5>
                  <p className="font-extrabold text-brand-dark">{program.startDate}</p>
                </div>
              </div>

              <div className="flex gap-3 items-center text-xs">
                <Clock className="h-5 w-5 text-brand-navy flex-shrink-0" />
                <div>
                  <h5 className="font-bold text-brand-muted">{t("programs.duration")}</h5>
                  <p className="font-extrabold text-brand-dark">
                    {language === "ar" ? program.duration.ar : program.duration.en}
                  </p>
                </div>
              </div>
            </div>

            <div className="h-[1px] bg-brand-border" />

            <div className="space-y-3">
              {program.status === "active" || program.status === "upcoming" ? (
                <>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {language === "ar"
                      ? "باب الانضمام لهذه الدورة أو النادي التكويني مفتوح حالياً للشباب المبدعين."
                      : "Applications for this training program are currently open for motivated youth."}
                  </p>
                  <Link href="/membership" className="w-full block">
                    <Button variant="secondary" className="w-full">
                      {language === "ar" ? "قدم طلب انضمام للرابطة" : "Apply for Membership"}
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-xs text-brand-muted leading-relaxed bg-brand-bg p-3 border border-brand-border rounded">
                    {language === "ar"
                      ? "هذه الدورة مكتملة حالياً. يمكنك تصفح الدورات الأخرى المتاحة."
                      : "This session has finished. You can browse other available programs."}
                  </p>
                  <Link href="/programs" className="w-full block">
                    <Button variant="outline" className="w-full">
                      {language === "ar" ? "تصفح الدورات الأخرى" : "Browse other programs"}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
