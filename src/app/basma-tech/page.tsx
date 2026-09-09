"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowRight, 
  Compass, 
  Lightbulb, 
  Users, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Building2,
  Atom,
  Eye
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";
import { galleryItems } from "@/data/gallery";
import { Modal } from "@/components/ui/Modal";

// Basma-Tech 4 core values/principles
const principles = [
  {
    num: "01",
    title: { ar: "اكتشف", en: "Discover" },
    desc: {
      ar: "استكشاف أحدث مجالات العلوم والتكنولوجيا وتوسيع مدارك المعرفة والشغف العلمي لدى الشباب.",
      en: "Exploring emerging frontiers in science and technology to expand curiosity and technical knowledge."
    },
    icon: Compass,
    accent: "text-purple-600 bg-purple-50 border-purple-200",
    dot: "bg-purple-600",
  },
  {
    num: "02",
    title: { ar: "ابتكر", en: "Innovate" },
    desc: {
      ar: "تحويل الأفكار والحلول التقنية إلى نماذج ومشاريع واقعية وملموسة من خلال الورشات والتجارب.",
      en: "Transforming technical ideas and problem-solving concepts into real, tangible prototypes."
    },
    icon: Lightbulb,
    accent: "text-amber-600 bg-amber-50 border-amber-200",
    dot: "bg-amber-500",
  },
  {
    num: "03",
    title: { ar: "تعاون", en: "Collaborate" },
    desc: {
      ar: "العمل بروح الفريق الواحد وتبادل المهارات والخبرات بين الشباب في بيئة علمية محفزة.",
      en: "Fostering teamwork, shared peer learning, and collaborative execution in a supportive environment."
    },
    icon: Users,
    accent: "text-cyan-600 bg-cyan-50 border-cyan-200",
    dot: "bg-cyan-500",
  },
  {
    num: "04",
    title: { ar: "اترك بصمتك", en: "Make Your Mark" },
    desc: {
      ar: "إحداث أثر علمي إيجابي في المجتمع والمشاركة الفعالة في الأنشطة والمبادرات العلمية.",
      en: "Creating a positive scientific impact in the community through dedicated and purposeful youth initiatives."
    },
    icon: Sparkles,
    accent: "text-purple-700 bg-purple-50 border-purple-200",
    dot: "bg-purple-700",
  }
];

export default function BasmaTechPage() {
  const { language, dir } = useLanguage();
  const isRtl = dir === "rtl";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Filter real Basma-Tech gallery items, fallback to top shared items if needed to display 4-6 items
  const basmaItems = galleryItems.filter((item) => item.album === "basmaTech");
  const showcaseItems = basmaItems.length >= 4 ? basmaItems.slice(0, 6) : galleryItems.slice(0, 6);

  // Selected item for Lightbox modal
  const [selectedItem, setSelectedItem] = useState<(typeof galleryItems)[0] | null>(null);

  return (
    <div className="w-full bg-[#FCFCFD] text-slate-900 overflow-x-hidden">
      {/* ========================================================
          1 — CUSTOM BASMA-TECH HERO
      ======================================================== */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-200/80 bg-white overflow-hidden">
        {/* Subtle Circuit Line Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="basma-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E9D5FF" strokeWidth="0.5" strokeOpacity="0.5" />
                <circle cx="40" cy="0" r="1.5" fill="#7C3AED" fillOpacity="0.2" />
                <circle cx="0" cy="40" r="1.5" fill="#06B6D4" fillOpacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#basma-grid)" />
          </svg>
        </div>

        {/* Subtle Top & Bottom Accent Lines */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-600 via-cyan-500 to-amber-400" />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Brand, Typography & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-start">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                <span className="text-xs sm:text-sm font-extrabold text-purple-900 tracking-wide">
                  {language === "ar"
                    ? "فريق علمي داخل STLY Constantine"
                    : "A Scientific Team within STLY Constantine"}
                </span>
              </div>

              {/* Main Titles */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
                    BASMA-TECH
                  </h1>
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-purple-700">
                  {language === "ar" ? "بصمة تك" : "Youth Science & Tech"}
                </div>
              </div>

              {/* Tagline */}
              <p className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-cyan-500" />
                <span>
                  {language === "ar"
                    ? "اكتشف، ابتكر، واترك بصمتك"
                    : "Discover, Innovate, Make Your Mark"}
                </span>
              </p>

              {/* Short Text */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                {language === "ar"
                  ? "فريق شبابي علمي وتقني تابع لرابطة النشاطات العلمية والتقنية للشباب – قسنطينة، يجمع بين التعلم، التجربة، الابتكار والعمل الجماعي."
                  : "A scientific and technical youth team within STLY Constantine, bringing together learning, experimentation, innovation and collaboration."}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/gallery?album=basmaTech"
                  className="inline-flex items-center justify-center gap-2.5 px-6 h-12 rounded-lg font-bold bg-purple-700 text-white hover:bg-purple-800 transition-colors shadow-sm"
                >
                  <span>{language === "ar" ? "اكتشف أنشطة بصمة تك" : "Explore Basma-Tech Activities"}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2.5 px-6 h-12 rounded-lg font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  <span>{language === "ar" ? "تعرف على الرابطة" : "Discover STLY"}</span>
                  <Building2 className="w-4 h-4 text-slate-500" />
                </Link>
              </div>
            </div>

            {/* Right Column: Large Basma-Tech Brand Visual */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] aspect-square rounded-2xl bg-white border border-purple-100 p-6 sm:p-8 shadow-sm flex items-center justify-center group">
                {/* Circuit corner accent markers */}
                <div className="absolute top-2.5 start-2.5 w-3 h-3 border-t-2 border-s-2 border-purple-500" />
                <div className="absolute top-2.5 end-2.5 w-3 h-3 border-t-2 border-e-2 border-cyan-500" />
                <div className="absolute bottom-2.5 start-2.5 w-3 h-3 border-b-2 border-s-2 border-cyan-500" />
                <div className="absolute bottom-2.5 end-2.5 w-3 h-3 border-b-2 border-e-2 border-amber-500" />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/brands/basma-tech.png"
                  alt="Basma-Tech Identity"
                  className="w-full h-full object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================
          2 — ABOUT BASMA-TECH
      ======================================================== */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-purple-700">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                <span>{language === "ar" ? "عن الفريق" : "About the Team"}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {language === "ar" ? "ما هي بصمة تك؟" : "What is Basma-Tech?"}
              </h2>
            </div>

            {/* Editorial Content */}
            <div className="rounded-2xl border border-slate-200 bg-[#FAF9FE] p-6 sm:p-10 relative overflow-hidden">
              {/* Subtle side circuit accent bar */}
              <div className="absolute top-0 bottom-0 start-0 w-1.5 bg-gradient-to-b from-purple-600 via-cyan-500 to-purple-600" />

              <div className="space-y-5 text-base sm:text-lg text-slate-700 leading-relaxed">
                <p className="font-semibold text-slate-900 text-lg sm:text-xl">
                  {language === "ar"
                    ? "فريق بصمة تك هو فريق شبابي علمي وتقني ينشط تحت إشراف رابطة النشاطات العلمية والتقنية للشباب – قسنطينة (STLY)."
                    : "Basma-Tech is a scientific and technical youth team active under the supervision of the League of Scientific and Technical Youth Activities – Constantine (STLY)."}
                </p>
                <p>
                  {language === "ar"
                    ? "يرتكز الفريق على مبدأ التعلم بالممارسة والبحث التجريبي، حيث يجتمع الأعضاء لخوض تحديات علمية وتكنولوجية، وتطوير مشاريع تطبيقية في بيئة تشجع على التفكير الإبداعي والابتكار المستمر."
                    : "The team is rooted in learning by doing and hands-on experimentation. Members come together to tackle scientific challenges and develop practical projects in an environment that fosters creative thinking and ongoing innovation."}
                </p>
                <p>
                  {language === "ar"
                    ? "من خلال ورشات العمل التطبيقية والتعاون الجماعي، يسعى الفريق إلى تمكين الشباب من اكتساب المهارات العلمية والتقنية وإتاحة الفرصة لهم لترك بصمتهم الإيجابية."
                    : "Through applied workshops and collaborative teamwork, the team aims to empower youth with modern scientific skills and provide them with the platform to make a meaningful mark."}
                </p>
              </div>

              {/* Bottom Feature Points */}
              <div className="mt-8 pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { ar: "التعلم بالممارسة", en: "Learning by Doing" },
                  { ar: "التجربة والبحث", en: "Experimentation" },
                  { ar: "الابتكار التقني", en: "Technical Innovation" },
                  { ar: "العمل الجماعي", en: "Collaboration" },
                ].map((item) => (
                  <div key={item.en} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-slate-800">
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
          3 — BASMA-TECH PRINCIPLES (Values)
      ======================================================== */}
      <section className="py-16 sm:py-20 bg-[#F9F8FD] border-b border-slate-200/80">
        <Container>
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-purple-700">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
              <span>{language === "ar" ? "القيم الجوهرية" : "Core Values"}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {language === "ar" ? "مبادئ بصمة تك" : "Basma-Tech Principles"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {language === "ar"
                ? "أربع ركائز أساسية تعبر عن هوية الفريق وتوجه أنشطته ومبادراته العلمية."
                : "Four foundational pillars that define the team's identity and guide all scientific initiatives."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.num}
                  className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs hover:border-purple-300 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-purple-600 tracking-wider">
                        {item.num}
                      </span>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${item.accent}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 group-hover:text-purple-700 transition-colors">
                      {language === "ar" ? item.title.ar : item.title.en}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {language === "ar" ? item.desc.ar : item.desc.en}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Basma-Tech
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ========================================================
          4 — REAL ACTIVITY SHOWCASE
      ======================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-purple-700">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                <span>{language === "ar" ? "التغطية الميدانية" : "Activity Showcase"}</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {language === "ar" ? "من أنشطة بصمة تك" : "Inside Basma-Tech"}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                {language === "ar"
                  ? "توثيق واقعي لمشاركات وورشات الفريق ضمن الفعاليات العلمية والتكنولوجية للرابطة."
                  : "Authentic coverage from the team's applied sessions and collaborative science events."}
              </p>
            </div>

            <Link
              href="/gallery?album=basmaTech"
              className="inline-flex items-center gap-2 text-sm font-bold text-purple-700 hover:text-purple-900 shrink-0"
            >
              <span>{language === "ar" ? "عرض جميع الأنشطة" : "View All Activities"}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>

          {/* Varied Composition Grid: 1 Featured Large + 4-5 Surrounding Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {showcaseItems.map((item, idx) => {
              const isFeatured = idx === 0;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 cursor-pointer transition-all duration-300 hover:shadow-md ${
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

                  {/* Dark Vignette Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  {/* Badges & Content */}
                  <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-xs text-[11px] font-extrabold text-purple-900">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                        {language === "ar" ? "بصمة تك" : "Basma-Tech"}
                      </span>

                      <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-white font-extrabold text-sm sm:text-base line-clamp-2">
                        {language === "ar" ? item.title.ar : item.title.en}
                      </p>
                      {item.socialUrl && (
                        <span className="inline-flex items-center gap-1 text-slate-300 text-xs hover:text-white transition-colors">
                          <span>{language === "ar" ? "المصدر الأصلي" : "Original Source"}</span>
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
              href="/gallery?album=basmaTech"
              className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-lg font-bold bg-white text-purple-700 border-2 border-purple-600 hover:bg-purple-50 transition-colors shadow-xs"
            >
              <span>{language === "ar" ? "عرض جميع الأنشطة" : "View All Activities"}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ========================================================
          5 — BASMA-TECH + STLY RELATIONSHIP
      ======================================================== */}
      <section className="py-16 sm:py-20 bg-[#F9F8FD] border-b border-slate-200/80">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-purple-700">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
              <span>{language === "ar" ? "الهيكل التنظيمي" : "Organizational Framework"}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {language === "ar"
                ? "علاقة بصمة تك بالرابطة"
                : "Basma-Tech & STLY Constantine"}
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              {language === "ar"
                ? "بصمة تك جزء من رابطة النشاطات العلمية والتقنية للشباب – قسنطينة، وتعمل ضمن أنشطتها العلمية والتكنولوجية الموجهة للشباب."
                : "Basma-Tech is part of STLY Constantine and operates within its science and technology activities for youth."}
            </p>
          </div>

          {/* Visual Hierarchy Diagram */}
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
              {/* Parent: STLY */}
              <div className="rounded-xl border border-slate-200 bg-[#062B55] text-white p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center font-black text-white text-lg border border-white/20">
                    STLY
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base sm:text-lg">
                      {language === "ar"
                        ? "رابطة النشاطات العلمية والتقنية للشباب – قسنطينة"
                        : "STLY Constantine"}
                    </h4>
                    <p className="text-xs text-slate-300 font-semibold">
                      {language === "ar" ? "المنظمة الأم الحاضنة" : "Parent Organization"}
                    </p>
                  </div>
                </div>
                <Building2 className="w-5 h-5 text-brand-green shrink-0" />
              </div>

              {/* Connecting Vertical Line & Arrow */}
              <div className="flex flex-col items-center py-1">
                <div className="w-0.5 h-6 bg-gradient-to-b from-[#062B55] to-purple-600" />
                <div className="w-3 h-3 rounded-full bg-purple-600 ring-4 ring-purple-100" />
              </div>

              {/* Child: Basma-Tech */}
              <div className="rounded-xl border-2 border-purple-300 bg-purple-50/60 p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-white p-1 border border-purple-200 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/brands/basma-tech.png"
                      alt="Basma-Tech"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base sm:text-lg text-purple-950">
                      {language === "ar" ? "فريق بصمة تك" : "Basma-Tech Team"}
                    </h4>
                    <p className="text-xs text-purple-700 font-bold">
                      {language === "ar" ? "فريق علمي وتكنولوجي تابع للرابطة" : "Scientific & Technical Youth Team"}
                    </p>
                  </div>
                </div>
                <Atom className="w-5 h-5 text-purple-600 shrink-0" />
              </div>

              {/* CTA */}
              <div className="pt-4 text-center">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-purple-700 transition-colors"
                >
                  <span>{language === "ar" ? "تعرف على STLY" : "About STLY"}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================
          6 — FINAL BASMA CTA
      ======================================================== */}
      <section className="py-20 sm:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/40 to-transparent pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto rounded-3xl border border-purple-200/80 bg-gradient-to-br from-white via-[#FAF8FF] to-[#F0FDFA] p-8 sm:p-14 shadow-sm text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/70 text-purple-800 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === "ar" ? "شارك معنا" : "Get Involved"}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {language === "ar" ? "اترك بصمتك" : "Make Your Mark"}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
              {language === "ar"
                ? "اكتشف أنشطة الفريق وشارك في البيئة العلمية والتقنية للرابطة."
                : "Explore the team's activities and discover the scientific and technical environment of STLY Constantine."}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/gallery?album=basmaTech"
                className="inline-flex items-center justify-center gap-2 px-7 h-12 rounded-lg font-bold bg-purple-700 text-white hover:bg-purple-800 transition-colors shadow-sm"
              >
                <span>{language === "ar" ? "استكشف الأنشطة" : "Explore Activities"}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>

              <Link
                href="/membership"
                className="inline-flex items-center justify-center gap-2 px-7 h-12 rounded-lg font-bold bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 transition-colors"
              >
                <span>{language === "ar" ? "انضم إلى الرابطة" : "Join STLY"}</span>
              </Link>
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
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedItem.thumbnailUrl || selectedItem.url}
                alt={language === "ar" ? selectedItem.title.ar : selectedItem.title.en}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-1">
                <p className="font-extrabold text-slate-900">
                  {language === "ar" ? selectedItem.title.ar : selectedItem.title.en}
                </p>
                <p className="text-xs text-slate-500">
                  {language === "ar" ? "فريق بصمة تك – STLY Constantine" : "Basma-Tech Team – STLY Constantine"}
                </p>
              </div>

              {selectedItem.socialUrl && (
                <a
                  href={selectedItem.socialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-bold transition-colors"
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
