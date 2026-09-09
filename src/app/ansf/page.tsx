"use client";

import React from "react";
import Link from "next/link";
import { CalendarDays, ExternalLink, Grid3X3, Users, ArrowLeft, ArrowRight, Atom } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const competitionFields = [
  { ar: "الكيمياء", en: "Chemistry" },
  { ar: "الطب", en: "Medicine" },
  { ar: "الهندسة", en: "Engineering" },
  { ar: "الفيزياء", en: "Physics" },
  { ar: "البيئة", en: "Environment" },
  { ar: "علم الأحياء", en: "Biology" },
  { ar: "العلوم الاجتماعية", en: "Social Sciences" },
  { ar: "الرياضيات", en: "Mathematics" },
  { ar: "علوم الحاسوب", en: "Computer Science" },
];

export default function AnsfPage() {
  const { language, dir } = useLanguage();
  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight;

  const facts = [
    {
      icon: CalendarDays,
      label: language === "ar" ? "التواريخ" : "Dates",
      value: language === "ar" ? "17–19 جويلية 2026" : "17–19 July 2026",
    },
    {
      icon: Users,
      label: language === "ar" ? "فئة الأعمار" : "Age Range",
      value: language === "ar" ? "12–18 سنة" : "Ages 12–18",
    },
    {
      icon: Grid3X3,
      label: language === "ar" ? "المجالات" : "Fields",
      value: language === "ar" ? "9 مجالات" : "9 fields",
    },
  ];

  return (
    <div className="w-full bg-[#020D1A] text-white">
      {/* ANSF Custom Hero */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-[#062B55] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E5FF]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00E5FF]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center text-xs font-bold text-[#00E5FF] tracking-wider uppercase bg-[#00E5FF]/10 border border-[#00E5FF]/20 px-3 py-1 rounded-md shadow-[0_0_15px_rgba(0,229,255,0.1)]">
              ANSF 2026
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              {language === "ar"
                ? "المعرض الوطني للعلوم قسنطينة"
                : "Algerian National Science Fair"}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {language === "ar"
                ? "مسابقة علمية وطنية للأعمار 12–18 سنة، نُظمت من 17 إلى 19 جويلية 2026 ضمن الأنشطة العلمية لرابطة النشاطات العلمية والتقنية للشباب قسنطينة."
                : "A national science competition for ages 12–18, held from 17 to 19 July 2026 within STLY Constantine's scientific activities."}
            </p>
          </div>
        </Container>
      </section>

      {/* Details Section */}
      <section className="py-14 sm:py-16 bg-[#04162B] border-b border-[#062B55]">
        <Container className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white">
                {language === "ar" ? "عن المعرض" : "About the Fair"}
              </h2>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-300">
                <p>
                  {language === "ar"
                    ? "ANSF 2026 هو مسابقة وطنية تهدف إلى تحفيز الابتكار والتفكير العلمي لدى الشباب، وتوفر بيئة تنافسية لعرض مشاريعهم أمام لجان تحكيم مختصة."
                    : "ANSF 2026 is a national competition aimed at stimulating innovation and scientific thinking among youth, providing a competitive environment to present their projects to expert judging panels."}
                </p>
                <p>
                  {language === "ar"
                    ? "فريق بصمة تك التابع للرابطة يشارك بنشاط في هذه المبادرة العلمية والتكنولوجية."
                    : "Basma-Tech, a scientific team within STLY Constantine, is actively involved in this scientific and technological initiative."}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a href="https://ansf.tech/" target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="md" className="bg-[#00E5FF] text-[#04162B] hover:bg-[#00BCCC] border-none gap-2">
                    <span>{language === "ar" ? "زيارة الموقع الرسمي" : "Visit Official Website"}</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
                <Link href="/gallery?album=ansf">
                  <Button variant="outline" size="md" className="border-white/20 text-white hover:bg-white/10 gap-2">
                    <span>{language === "ar" ? "شاهد تغطية ANSF" : "View ANSF Coverage"}</span>
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
                    className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400">{fact.label}</p>
                        <p className="text-sm font-extrabold text-white">{fact.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Fields Section */}
      <section className="py-14 sm:py-16 bg-[#020D1A]">
        <Container>
          <div className="mb-8 max-w-2xl space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#00E5FF]">
              {language === "ar" ? "مجالات المسابقة" : "Competition Fields"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {language === "ar" ? "9 مجالات علمية" : "Nine Scientific Fields"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {competitionFields.map((field, index) => (
              <div
                key={field.en}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00E5FF]/10 text-xs font-black text-[#00E5FF] border border-[#00E5FF]/20">
                  {index + 1}
                </span>
                <span className="text-sm font-extrabold text-white">
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
