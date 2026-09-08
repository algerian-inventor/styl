"use client";

import React from "react";
import Link from "next/link";
import { CalendarDays, ExternalLink, Grid3X3, Users, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";

const competitionFields = [
  { ar: "الكيمياء", en: "Chemistry" },
  { ar: "الطب", en: "Medicine" },
  { ar: "الهندسة", en: "Engineering" },
  { ar: "الفيزياء", en: "Physics" },
  { ar: "البيئة", en: "Environment" },
  { ar: "الأحياء", en: "Biology" },
  { ar: "العلوم الاجتماعية", en: "Social Sciences" },
  { ar: "الرياضيات", en: "Mathematics" },
  { ar: "علوم الحاسوب", en: "Computer Science" },
];

export default function AnsfPage() {
  const { language, dir, t } = useLanguage();
  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight;

  const facts = [
    {
      icon: CalendarDays,
      label: language === "ar" ? "التاريخ" : "Dates",
      value: language === "ar" ? "17–19 جويلية 2026" : "17–19 July 2026",
    },
    {
      icon: Users,
      label: language === "ar" ? "الفئة العمرية" : "Age Range",
      value: language === "ar" ? "12–18 سنة" : "Ages 12–18",
    },
    {
      icon: Grid3X3,
      label: language === "ar" ? "مجالات المسابقة" : "Competition Fields",
      value: language === "ar" ? "9 مجالات" : "9 fields",
    },
  ];

  return (
    <div className="w-full bg-[#F4F7FA]">
      <PageHero
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: "ANSF" },
        ]}
        eyebrow={language === "ar" ? "نشاط علمي وطني" : "National Science Activity"}
        title={
          language === "ar"
            ? "المعرض العلمي الوطني الجزائري 2026"
            : "Algerian National Science Fair 2026"
        }
        description={
          language === "ar"
            ? "مسابقة علمية لفئة 12–18 سنة ضمن الأنشطة العلمية لرابطة النشاطات العلمية والتقنية للشباب – قسنطينة."
            : "A science competition for ages 12–18 organized within STLY Constantine's scientific activities."
        }
      />

      <section className="py-14 sm:py-16 bg-white border-b border-[#DCE3EA]">
        <Container className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex rounded-md border border-brand-navy/15 bg-brand-navy/5 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-navy">
                ANSF 2026
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight text-brand-dark">
                {language === "ar"
                  ? "المعرض العلمي الوطني الجزائري"
                  : "Algerian National Science Fair"}
              </h2>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-brand-muted">
                <p>
                  {language === "ar"
                    ? "ANSF 2026 هو مسابقة علمية لفئة 12–18 سنة، أقيمت من 17 إلى 19 جويلية 2026 ضمن الأنشطة العلمية لرابطة النشاطات العلمية والتقنية للشباب – قسنطينة."
                    : "ANSF 2026 is a science competition for ages 12–18, held from 17 to 19 July 2026 within STLY Constantine's scientific activities."}
                </p>
                <p>
                  {language === "ar"
                    ? "فريق بصمة تك التابع لرابطة النشاطات العلمية والتقنية للشباب – قسنطينة يشارك في المبادرة ضمن نشاطات الرابطة العلمية والتكنولوجية."
                    : "Basma-Tech, a scientific team within STLY Constantine, is involved in the initiative as part of the league's science and technology activities."}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a href="https://ansf.tech/" target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="md" className="gap-2">
                    <span>{language === "ar" ? "زيارة الموقع الرسمي" : "Visit Official Website"}</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
                <Link href="/gallery?album=ansf">
                  <Button variant="outline" size="md" className="gap-2">
                    <span>{language === "ar" ? "شاهد تغطية ANSF" : "View ANSF Gallery"}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {facts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <div
                    key={fact.label}
                    className="rounded-xl border border-[#DCE3EA] bg-[#F4F7FA] p-5 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#062B55] text-brand-green-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-brand-muted">{fact.label}</p>
                        <p className="text-sm font-extrabold text-brand-dark">{fact.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-16 bg-[#F4F7FA]">
        <Container>
          <div className="mb-8 max-w-2xl space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-green">
              {language === "ar" ? "مجالات المسابقة" : "Competition Fields"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
              {language === "ar" ? "تسعة مجالات علمية" : "Nine Scientific Fields"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {competitionFields.map((field, index) => (
              <div
                key={field.en}
                className="flex items-center gap-3 rounded-xl border border-[#DCE3EA] bg-white p-4 shadow-xs"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-navy/5 text-xs font-black text-brand-navy">
                  {index + 1}
                </span>
                <span className="text-sm font-extrabold text-brand-dark">
                  {language === "ar" ? field.ar : field.en}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
