"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowRight, 
  CalendarDays, 
  ExternalLink, 
  Users, 
  FlaskConical,
  HeartPulse,
  Cog,
  Orbit,
  Leaf,
  Dna,
  Binary,
  Terminal,
  Building2,
  Sparkles,
  Layers,
  Eye
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";
import { galleryItems } from "@/data/gallery";
import { Modal } from "@/components/ui/Modal";

// Nine Verified Scientific Fields with controlled blue/cyan/green accents
const competitionFields = [
  {
    num: "01",
    name: { ar: "الكيمياء", en: "Chemistry" },
    icon: FlaskConical,
    accent: "text-cyan-400 bg-cyan-950/60 border-cyan-800/60",
    dot: "bg-cyan-400",
  },
  {
    num: "02",
    name: { ar: "الطب", en: "Medicine" },
    icon: HeartPulse,
    accent: "text-emerald-400 bg-emerald-950/60 border-emerald-800/60",
    dot: "bg-emerald-400",
  },
  {
    num: "03",
    name: { ar: "الهندسة", en: "Engineering" },
    icon: Cog,
    accent: "text-blue-400 bg-blue-950/60 border-blue-800/60",
    dot: "bg-blue-400",
  },
  {
    num: "04",
    name: { ar: "الفيزياء", en: "Physics" },
    icon: Orbit,
    accent: "text-sky-400 bg-sky-950/60 border-sky-800/60",
    dot: "bg-sky-400",
  },
  {
    num: "05",
    name: { ar: "البيئة", en: "Environment" },
    icon: Leaf,
    accent: "text-teal-400 bg-teal-950/60 border-teal-800/60",
    dot: "bg-teal-400",
  },
  {
    num: "06",
    name: { ar: "علم الأحياء", en: "Biology" },
    icon: Dna,
    accent: "text-green-400 bg-green-950/60 border-green-800/60",
    dot: "bg-green-400",
  },
  {
    num: "07",
    name: { ar: "العلوم الاجتماعية", en: "Social Sciences" },
    icon: Users,
    accent: "text-cyan-300 bg-cyan-950/60 border-cyan-800/60",
    dot: "bg-cyan-300",
  },
  {
    num: "08",
    name: { ar: "الرياضيات", en: "Mathematics" },
    icon: Binary,
    accent: "text-blue-300 bg-blue-950/60 border-blue-800/60",
    dot: "bg-blue-300",
  },
  {
    num: "09",
    name: { ar: "علوم الحاسوب", en: "Computer Science" },
    icon: Terminal,
    accent: "text-emerald-300 bg-emerald-950/60 border-emerald-800/60",
    dot: "bg-emerald-300",
  },
];

export default function AnsfPage() {
  const { language, dir } = useLanguage();
  const isRtl = dir === "rtl";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Sourced real gallery items for ANSF, fallback to real shared items to provide 4-6 items
  const ansfItems = galleryItems.filter((item) => item.album === "ansf");
  const showcaseItems = ansfItems.length >= 4 ? ansfItems.slice(0, 6) : galleryItems.slice(0, 6);

  // Selected item for Lightbox modal
  const [selectedItem, setSelectedItem] = useState<(typeof galleryItems)[0] | null>(null);

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
      icon: Layers,
      label: language === "ar" ? "المجالات" : "Fields",
      value: language === "ar" ? "9 مجالات علمية" : "9 Scientific Fields",
    },
  ];

  return (
    <div className="w-full bg-[#021426] text-white overflow-x-hidden">
      {/* ========================================================
          1 — CUSTOM BRANDED ANSF HERO
          Luminous vibrant science navy with cyan ambient illumination
      ======================================================== */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-[#0E4A7D] bg-gradient-to-br from-[#0B2C54] via-[#083566] to-[#052445] overflow-hidden">
        {/* Luminous Ambient Light Orbs */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00E5FF]/20 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-blue-500/20 blur-[130px] rounded-full pointer-events-none" />

        {/* Subtle Science Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="ansf-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#00E5FF" strokeWidth="0.5" strokeOpacity="0.4" />
                <circle cx="48" cy="0" r="1.5" fill="#00E5FF" fillOpacity="0.4" />
                <circle cx="0" cy="48" r="1.5" fill="#3B82F6" fillOpacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ansf-grid)" />
          </svg>
        </div>

        {/* Controlled Cyan Accent Top Border Line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-blue-600 via-[#00E5FF] to-blue-600 shadow-[0_0_12px_rgba(0,229,255,0.6)]" />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Text + Verified Facts + CTAs + Scientific Categories Strip */}
            <div className="lg:col-span-7 space-y-6 text-start">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00E5FF]/20 border border-[#00E5FF]/40 shadow-[0_0_20px_rgba(0,229,255,0.18)]">
                <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
                <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide uppercase">
                  {language === "ar"
                    ? "مبادرة علمية وطنية داخل STLY"
                    : "A National Science Initiative within STLY"}
                </span>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-white leading-[1.15]">
                  {language === "ar"
                    ? "المعرض العلمي الوطني الجزائري 2026"
                    : "Algerian National Science Fair 2026"}
                </h1>
                <div className="text-xl sm:text-2xl font-black text-[#00E5FF] tracking-wide">
                  ANSF 2026
                </div>
              </div>

              {/* Short Intro */}
              <p className="text-base sm:text-lg text-blue-100 leading-relaxed max-w-2xl font-medium">
                {language === "ar"
                  ? "معرض علمي وطني موجه للشباب من 12 إلى 18 سنة، يضم 9 مجالات علمية، وأقيم من 17 إلى 19 جويلية 2026."
                  : "A national science fair for young people aged 12–18, covering 9 scientific fields and held from 17 to 19 July 2026."}
              </p>

              {/* Fact Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {facts.map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <div
                      key={fact.label}
                      className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md p-4 flex items-center gap-3 shadow-md hover:bg-white/15 transition-colors"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00E5FF] text-[#021426] font-black shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-cyan-200 uppercase tracking-wider">{fact.label}</p>
                        <p className="text-xs sm:text-sm font-black text-white">{fact.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Link
                  href="/gallery?album=ansf"
                  className="inline-flex items-center justify-center gap-2.5 px-7 h-12 rounded-lg font-black bg-[#00E5FF] text-[#021426] hover:bg-cyan-300 transition-colors shadow-lg shadow-[#00E5FF]/35 hover:shadow-[0_0_25px_rgba(0,229,255,0.5)]"
                >
                  <span>{language === "ar" ? "شاهد التغطية" : "View Coverage"}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>

                <a
                  href="https://ansf.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 h-12 rounded-lg font-bold bg-white/15 text-white border border-white/30 backdrop-blur-md hover:bg-white/25 hover:border-white/50 transition-colors"
                >
                  <span>{language === "ar" ? "زيارة الموقع الرسمي" : "Visit Official Website"}</span>
                  <ExternalLink className="w-4 h-4 text-[#00E5FF]" />
                </a>
              </div>

              {/* 4. COMPACT SCIENCE CATEGORY CHIP SYSTEM */}
              <div className="pt-4 border-t border-white/15 space-y-2.5">
                <p className="text-xs font-bold text-cyan-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>
                    {language === "ar" ? "المجالات العلمية التسعة" : "9 Verified Scientific Categories"}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {competitionFields.map((field) => {
                    const Icon = field.icon;
                    return (
                      <span
                        key={field.num}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-xs font-semibold text-white hover:border-cyan-300 hover:bg-white/20 transition-colors backdrop-blur-xs"
                      >
                        <Icon className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                        <span>{language === "ar" ? field.name.ar : field.name.en}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Prominent, Well-Lit ANSF Logo Container */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div 
                className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[430px] aspect-square rounded-3xl border-2 border-cyan-400/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,229,255,0.25)] flex items-center justify-center group overflow-hidden"
                style={{
                  background: "radial-gradient(circle at center, rgba(0,229,255,0.32) 0%, rgba(37,99,235,0.22) 45%, #0B3158 85%)"
                }}
              >
                {/* Internal Luminous Halo behind artwork */}
                <div className="absolute inset-6 rounded-2xl bg-cyan-400/10 blur-xl pointer-events-none" />

                {/* Circuit corner accent markers */}
                <div className="absolute top-3 start-3 w-4 h-4 border-t-2 border-s-2 border-[#00E5FF]" />
                <div className="absolute top-3 end-3 w-4 h-4 border-t-2 border-e-2 border-cyan-300" />
                <div className="absolute bottom-3 start-3 w-4 h-4 border-b-2 border-s-2 border-blue-400" />
                <div className="absolute bottom-3 end-3 w-4 h-4 border-b-2 border-e-2 border-[#00E5FF]" />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/brands/ansf-logo.jpg"
                  alt="ANSF 2026 Logo"
                  className="relative z-10 w-full h-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.02] filter drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================
          2 — ABOUT ANSF
          Surface: #06203A (Slightly lighter navy)
      ======================================================== */}
      <section className="py-16 sm:py-20 bg-[#06203A] border-b border-[#0A3D6E]">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-3 text-start">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#00E5FF]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                <span>{language === "ar" ? "عن المعرض" : "About the Fair"}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {language === "ar" ? "ما هو ANSF؟" : "What is ANSF?"}
              </h2>
            </div>

            {/* Editorial Content on layered card */}
            <div className="rounded-2xl border border-[#0A477A] bg-[#04192F] p-6 sm:p-10 relative overflow-hidden shadow-sm">
              {/* Controlled Cyan Accent Bar */}
              <div className="absolute top-0 bottom-0 start-0 w-1.5 bg-gradient-to-b from-[#00E5FF] to-blue-600" />

              <div className="space-y-5 text-base sm:text-lg text-slate-200 leading-relaxed text-start">
                <p className="font-semibold text-white text-lg sm:text-xl">
                  {language === "ar"
                    ? "ANSF 2026 هو المعرض العلمي الوطني الجزائري، وهو تظاهرة علمية وتنافسية موجهة للشباب والناشئة."
                    : "ANSF 2026 is the Algerian National Science Fair, a national competitive science exhibition dedicated to youth."}
                </p>
                <p>
                  {language === "ar"
                    ? "يستهدف المعرض الفئة العمرية من 12 إلى 18 سنة، ويشمل تسعة مجالات علمية متخصصة تجمع بين العلوم الدقيقة، والتكنولوجيا، والعلوم التطبيقية."
                    : "The fair addresses young people aged 12 to 18, spanning nine specialized scientific disciplines that integrate exact sciences, technology, and applied studies."}
                </p>
                <p>
                  {language === "ar"
                    ? "أقيمت فعاليات المعرض في الفترة من 17 إلى 19 جويلية 2026، ويُعرض ضمن موقع الرابطة كإحدى مبادراتها وأنشطتها العلمية الرئيسية الموجهة للشباب الجزائري."
                    : "Held from 17 to 19 July 2026, the fair is featured on the STLY website as one of its flagship scientific initiatives and youth activities."}
                </p>
              </div>

              {/* Factual Highlights */}
              <div className="mt-8 pt-6 border-t border-[#0A477A] grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { ar: "معرض علمي وطني", en: "National Science Fair" },
                  { ar: "الأعمار 12–18 سنة", en: "Ages 12–18" },
                  { ar: "9 مجالات علمية", en: "9 Scientific Fields" },
                  { ar: "17–19 جويلية 2026", en: "17–19 July 2026" },
                ].map((item) => (
                  <div key={item.en} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00E5FF] shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-slate-200">
                      {language === "ar" ? item.ar : item.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================
          3 — NINE SCIENTIFIC FIELDS
          Surface: #031D38 (Blue/Cyan tinted navy)
      ======================================================== */}
      <section className="py-16 sm:py-20 bg-[#031D38] border-b border-[#0A3D6E]">
        <Container>
          <div className="max-w-3xl mb-12 space-y-3 text-start">
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#00E5FF]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
              <span>{language === "ar" ? "التخصصات المعتمدة" : "Competition Categories"}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {language === "ar" ? "المجالات العلمية التسعة" : "Nine Scientific Fields"}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {language === "ar"
                ? "المجالات العلمية الرسمية المعتمدة في المعرض الوطني للعلوم 2026."
                : "The nine officially verified scientific fields represented at the Algerian National Science Fair 2026."}
            </p>
          </div>

          {/* Clean 3x3 Grid with lighter card surfaces and controlled accents */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {competitionFields.map((field) => {
              const Icon = field.icon;
              return (
                <div
                  key={field.num}
                  className="rounded-xl border border-[#0A477A] bg-[#062B55]/80 p-5 hover:border-[#00E5FF]/70 hover:bg-[#07366B] transition-all flex items-center justify-between group shadow-xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-11 h-11 rounded-lg flex items-center justify-center border ${field.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-cyan-300">
                        {field.num}
                      </span>
                      <h3 className="text-base font-extrabold text-white group-hover:text-[#00E5FF] transition-colors">
                        {language === "ar" ? field.name.ar : field.name.en}
                      </h3>
                    </div>
                  </div>

                  <span className={`w-2 h-2 rounded-full ${field.dot} opacity-70 group-hover:opacity-100 transition-opacity`} />
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ========================================================
          4 — REAL ANSF MEDIA SHOWCASE
          Surface: #F4F8FC (Light blue-gray high-contrast section)
      ======================================================== */}
      <section className="py-16 sm:py-24 bg-[#F4F8FC] border-b border-slate-200 text-slate-900">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 text-start">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-100/70 border border-blue-200 px-3 py-1 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>{language === "ar" ? "التوثيق الميداني" : "Field Coverage"}</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {language === "ar" ? "من تغطيات ANSF 2026" : "Inside ANSF 2026"}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                {language === "ar"
                  ? "توثيق ميداني للأنشطة والمشاركات العلمية خلال فعاليات المعرض الوطني."
                  : "Authentic coverage from the scientific sessions and exhibitions during the national science fair."}
              </p>
            </div>

            <Link
              href="/gallery?album=ansf"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900 shrink-0"
            >
              <span>{language === "ar" ? "عرض جميع تغطيات ANSF" : "View All ANSF Coverage"}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>

          {/* Varied Editorial Composition Grid: 1 Featured Large + 4-5 Supporting Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {showcaseItems.map((item, idx) => {
              const isFeatured = idx === 0;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`group relative rounded-2xl overflow-hidden border border-slate-200 bg-white cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-cyan-500 ${
                    isFeatured
                      ? "md:col-span-2 md:row-span-2 min-h-[300px] sm:min-h-[420px]"
                      : "min-h-[200px] sm:min-h-[220px]"
                  }`}
                >
                  {/* Real Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.thumbnailUrl || item.url}
                    alt={language === "ar" ? item.title.ar : item.title.en}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Dark Vignette Overlay for readable text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  {/* Badges & Content */}
                  <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-[11px] font-extrabold text-blue-950 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        ANSF 2026
                      </span>

                      <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-1 text-start">
                      <p className="text-white font-extrabold text-sm sm:text-base line-clamp-2">
                        {language === "ar" ? item.title.ar : item.title.en}
                      </p>
                      {item.socialUrl && (
                        <span className="inline-flex items-center gap-1 text-slate-300 text-xs hover:text-cyan-300 transition-colors">
                          <span>{language === "ar" ? "المصدر الأصلي" : "Original Post"}</span>
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Underneath */}
          <div className="mt-10 text-center">
            <Link
              href="/gallery?album=ansf"
              className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-lg font-bold bg-white text-blue-950 border-2 border-[#00E5FF] hover:bg-cyan-50 hover:text-cyan-900 transition-colors shadow-xs"
            >
              <span>{language === "ar" ? "عرض جميع تغطيات ANSF" : "View All ANSF Coverage"}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ========================================================
          5 & 6 — ANSF + STLY RELATIONSHIP & BASMA-TECH CONTEXT
          Surface: Clean White section (#FFFFFF)
      ======================================================== */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200 text-slate-900">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span>{language === "ar" ? "الانتماء التنظيمي" : "Organizational Framework"}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {language === "ar"
                ? "علاقة ANSF برابطة STLY"
                : "ANSF & STLY Constantine"}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {language === "ar"
                ? "ANSF 2026 يظهر ضمن المبادرات والأنشطة العلمية لرابطة النشاطات العلمية والتقنية للشباب – قسنطينة."
                : "ANSF 2026 is presented within the scientific initiatives and activities of STLY Constantine."}
            </p>
          </div>

          {/* Hierarchy & Context Cards */}
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* STLY Constantine Parent Card */}
            <div className="bg-[#062B55] text-white rounded-2xl border border-[#062B55] p-6 sm:p-7 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-4 text-start">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center font-black text-white text-lg border border-white/20">
                    STLY
                  </div>
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-emerald-950/60 border border-emerald-700/60 px-2.5 py-1 rounded-md">
                    {language === "ar" ? "المنظمة الحاضنة" : "Host Organization"}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-white">
                    {language === "ar"
                      ? "رابطة النشاطات العلمية والتقنية للشباب – قسنطينة"
                      : "STLY Constantine"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {language === "ar"
                      ? "المنظمة الحاضنة التي تُنظم وتدعم الفعاليات العلمية والتكنولوجية لفائدة الشباب والناشئة في قسنطينة والجزائر."
                      : "The host league organizing and backing science and technology initiatives for youth in Constantine and across Algeria."}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-start">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-white transition-colors"
                >
                  <span>{language === "ar" ? "تعرف على STLY" : "About STLY"}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Basma-Tech Context Card */}
            <div className="bg-[#FAF8FF] text-slate-900 rounded-2xl border border-purple-200 p-6 sm:p-7 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-4 text-start">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-lg bg-white p-1 border border-purple-200 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/brands/basma-tech.png"
                      alt="Basma-Tech"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wider bg-purple-100 border border-purple-200 px-2.5 py-1 rounded-md">
                    {language === "ar" ? "فريق علمي" : "Scientific Team"}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-slate-900">
                    {language === "ar" ? "فريق بصمة تك" : "Basma-Tech Team"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {language === "ar"
                      ? "فريق بصمة تك هو فريق علمي تابع للرابطة، يشارك في الفعاليات والتجارب العلمية والتكنولوجية."
                      : "Basma-Tech is a scientific team within STLY Constantine, participating in scientific and technological activities."}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-purple-100 text-start">
                <Link
                  href="/basma-tech"
                  className="inline-flex items-center gap-2 text-xs font-bold text-purple-700 hover:text-purple-900 transition-colors"
                >
                  <span>{language === "ar" ? "اكتشف بصمة تك" : "Explore Basma-Tech"}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================
          7 — FINAL CTA
          Surface: #021426 (Deep Navy return)
      ======================================================== */}
      <section className="py-20 sm:py-24 bg-[#021426] border-t border-[#08345C] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00E5FF]/5 to-transparent pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto rounded-3xl border border-[#0A477A] bg-gradient-to-br from-[#031A33] via-[#062B55] to-[#041E3A] p-8 sm:p-14 shadow-2xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] text-xs font-black uppercase tracking-wider border border-[#00E5FF]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ANSF 2026</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {language === "ar" ? "استكشف ANSF 2026" : "Explore ANSF 2026"}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
              {language === "ar"
                ? "اطلع على التغطية الميدانية للفعالية أو قم بزيارة الموقع الرسمي للمعرض."
                : "View field coverage of the event or visit the official science fair website."}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/gallery?album=ansf"
                className="inline-flex items-center justify-center gap-2 px-7 h-12 rounded-lg font-bold bg-[#00E5FF] text-[#020D1A] hover:bg-[#00BCCC] transition-colors shadow-lg shadow-[#00E5FF]/25"
              >
                <span>{language === "ar" ? "شاهد التغطية" : "View Coverage"}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>

              <a
                href="https://ansf.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 h-12 rounded-lg font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors"
              >
                <span>{language === "ar" ? "زيارة الموقع الرسمي" : "Official Website"}</span>
                <ExternalLink className="w-4 h-4 text-[#00E5FF]" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================
          MEDIA LIGHTBOX MODAL
      ======================================================== */}
      {selectedItem && (
        <Modal
          isOpen={Boolean(selectedItem)}
          onClose={() => setSelectedItem(null)}
          title={language === "ar" ? selectedItem.title.ar : selectedItem.title.en}
          size="lg"
        >
          <div className="space-y-4">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedItem.thumbnailUrl || selectedItem.url}
                alt={language === "ar" ? selectedItem.title.ar : selectedItem.title.en}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-1 text-start">
                <p className="font-extrabold text-white">
                  {language === "ar" ? selectedItem.title.ar : selectedItem.title.en}
                </p>
                <p className="text-xs text-slate-400">
                  {language === "ar" ? "المعرض الوطني للعلوم – STLY Constantine" : "National Science Fair – STLY Constantine"}
                </p>
              </div>

              {selectedItem.socialUrl && (
                <a
                  href={selectedItem.socialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 hover:bg-[#00E5FF]/20 text-xs font-bold transition-colors"
                >
                  <span>{language === "ar" ? "فتح المنشور الأصلي" : "Open Original Post"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
