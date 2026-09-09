"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Cpu,
  Brain,
  Code,
  Microscope,
  Lightbulb,
  Sparkles,
  Atom,
  Users,
  CalendarDays,
  ExternalLink,
  ImageIcon,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { ProgramCard } from "@/components/ui/ProgramCard";
import { EventCard } from "@/components/ui/EventCard";
import { NewsCard } from "@/components/ui/NewsCard";
import { CTASection } from "@/components/ui/CTASection";
import { Button } from "@/components/ui/Button";
import { MediaFallback } from "@/components/ui/MediaFallback";
import { getDisplayThumbnailUrl } from "@/lib/social-media";

export default function HomePage() {
  const { t, language, dir } = useLanguage();
  const { programs, events, articles, galleryItems, partners, siteSettings } = usePrototypeState();
  const [brokenHeroImage, setBrokenHeroImage] = React.useState<string | null>(null);

  const isRtl = dir === "rtl";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Filter sections data
  const featuredPrograms = programs.slice(0, 3);
  const upcomingEvents = events.filter((e) => !e.isClosed).slice(0, 2);
  const latestNews = articles.slice(0, 3);
  const previewGallery = galleryItems.slice(0, 6);
  const heroImage = siteSettings.heroBannerUrl || "/images/club-salon.jpg";
  const canShowHeroImage = Boolean(heroImage && brokenHeroImage !== heroImage);

  // Scientific Fields Definition with Lucide Icons
  const scientificFields = [
    {
      id: "robotics",
      title: { ar: "الروبوتيك والأنظمة المدمجة", en: "Robotics & Embedded Systems" },
      desc: {
        ar: "تصميم وبرمجة الروبوتات والأنظمة الذكية والمتحكمات الدقيقة عبر ورشات تطبيقية.",
        en: "Designing and programming robots, smart systems, and microcontrollers through hands-on labs.",
      },
      icon: Bot,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      id: "ai",
      title: { ar: "الذكاء الاصطناعي والبيانات", en: "Artificial Intelligence & Data" },
      desc: {
        ar: "استكشاف خوارزميات تعلم الآلة، معالجة اللغات، وتحليل البيانات لبناء حلول مستقبلية.",
        en: "Exploring machine learning, natural language processing, and data analysis to build modern solutions.",
      },
      icon: Brain,
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
    {
      id: "electronics",
      title: { ar: "الإلكترونيات والدوائر المطبوعة", en: "Electronics & PCB Design" },
      desc: {
        ar: "تطوير الدوائر الإلكترونية، المستشعرات، وإنترنت الأشياء وتطبيقات التحكم الآلي.",
        en: "Developing electronic circuits, sensors, IoT devices, and automation applications.",
      },
      icon: Cpu,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      id: "programming",
      title: { ar: "تطوير البرمجيات والأنظمة", en: "Software & Systems Development" },
      desc: {
        ar: "بناء تطبيقات الويب، الهواتف الذكية، وأدوات المحاكاة العلمية بلغات برمجية حديثة.",
        en: "Building web platforms, mobile apps, and scientific simulation tools with modern languages.",
      },
      icon: Code,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      id: "research",
      title: { ar: "البحث العلمي والتجارب", en: "Scientific Research & Labs" },
      desc: {
        ar: "تنظيم تجارب وأنشطة بحثية تطبيقية بتأطير من أساتذة ومختصين عند توفرهم.",
        en: "Organizing applied experiments and research activities with guidance from available mentors and specialists.",
      },
      icon: Microscope,
      color: "text-teal-600 bg-teal-50 border-teal-100",
    },
    {
      id: "innovation",
      title: { ar: "الابتكار والعمل الجماعي", en: "Innovation & Teamwork" },
      desc: {
        ar: "مساعدة المشاركين على صياغة أفكارهم وتجريب حلول تقنية بسيطة ضمن فرق عمل.",
        en: "Helping participants shape ideas and test practical technical solutions in teams.",
      },
      icon: Lightbulb,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
  ];

  return (
    <div className="w-full">
      {/* ========================================================
          1. HERO SECTION (Full-width Background)
      ======================================================== */}
      <section 
        className="relative text-white flex items-center border-b border-[#041D38] overflow-hidden"
        style={{ minHeight: "clamp(620px, 80vh, 680px)" }}
      >
        <div className="absolute inset-0 w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-stly-constantine.png"
            alt={language === "ar" ? "رابطة النشاطات العلمية والتقنية للشباب قسنطينة" : "STLY Constantine"}
            className="w-full h-full object-cover object-[70%_center] sm:object-[80%_center]"
          />
        </div>

        {/* Overlay: navy left→right overlay, preserve city image on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#031B38] via-[#062B55]/80 to-transparent" />

        <Container className="relative z-10 w-full h-full flex flex-col justify-center" style={{ direction: 'ltr' }}>
          <div className="max-w-[600px] py-14 sm:py-20 lg:py-24" dir={language === "ar" ? "rtl" : "ltr"}>
            <div className="inline-flex max-w-full items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#062B55]/50 border border-white/10 backdrop-blur-md mb-6 shadow-sm">
              <Atom className="w-4 h-4 text-brand-green-accent" />
              <span className="text-xs sm:text-sm font-bold text-slate-100">
                {language === "ar" ? "رابطة النشاطات العلمية والتقنية للشباب قسنطينة" : "STLY Constantine"}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight mb-6">
              {language === "ar" ? (
                <>
                  نصنع جيلاً يبتكر<br />
                  <span className="text-brand-green-accent">المستقبل</span>
                </>
              ) : (
                <>
                  Building a Generation<br />
                  to Innovate the <span className="text-brand-green-accent">Future</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-8 font-medium drop-shadow-sm">
              {language === "ar"
                ? "بيئة شبابية تجمع العلوم والتكنولوجيا والابتكار من خلال الأنشطة التطبيقية، الورشات، المبادرات والتحديات العلمية."
                : "A youth environment bringing together science, technology and innovation through hands-on activities, workshops, initiatives and scientific challenges."}
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link 
                href="/membership" 
                className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-lg font-bold bg-brand-green text-brand-dark hover:bg-brand-green-accent transition-colors shadow-lg shadow-brand-green/20"
              >
                <span>{language === "ar" ? "انضم إلينا" : "Join Us"}</span>
                <ArrowIcon className="w-4 h-4" />
              </Link>

              <Link 
                href="/gallery"
                className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-lg font-bold bg-white/5 text-white border border-white/25 hover:bg-white/10 backdrop-blur-sm transition-colors"
              >
                <span>{language === "ar" ? "اكتشف نشاطاتنا" : "Explore Activities"}</span>
              </Link>
            </div>

            {/* Compact Quick Links */}
            <div className="flex flex-wrap gap-3">
              <Link href="/ansf" className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#041D38]/60 border border-white/10 hover:bg-[#062B55]/80 text-xs font-bold text-slate-300 hover:text-white transition-colors backdrop-blur-sm">
                ANSF 2026
              </Link>
              <Link href="/gallery?album=basmaTech" className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#041D38]/60 border border-white/10 hover:bg-[#062B55]/80 text-xs font-bold text-slate-300 hover:text-white transition-colors backdrop-blur-sm">
                {language === "ar" ? "بصمة تك" : "Basma-Tech"}
              </Link>
              <Link href="/gallery" className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#041D38]/60 border border-white/10 hover:bg-[#062B55]/80 text-xs font-bold text-slate-300 hover:text-white transition-colors backdrop-blur-sm">
                {language === "ar" ? "معرض الأنشطة" : "Gallery"}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================
          2. MISSION & CORE VALUES SECTION (Asymmetrical Layout)
      ======================================================== */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#DCE3EA]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Narrative Column (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <span className="inline-flex items-center text-xs font-bold text-brand-navy tracking-wider uppercase bg-brand-navy/5 border border-brand-navy/15 px-3 py-1 rounded-md">
                {language === "ar" ? "رسالتنا ورؤيتنا" : "Our Mission & Vision"}
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark leading-tight tracking-tight">
                {language === "ar" ? (
                  <>
                    بيئة علمية متكاملة لصقل <br />
                    <span className="text-[#062B55]">طاقات الشباب المبدع</span>
                  </>
                ) : (
                  <>
                    An Integrated Ecosystem to Nurture{" "}
                    <span className="text-[#062B55]">Young Innovators</span>
                  </>
                )}
              </h2>

              <p className="text-base text-brand-muted leading-relaxed">
                {language === "ar"
                  ? "تسعى الرابطة العلمية والتقنية للشباب بقسنطينة إلى دعم التأطير الشبابي عبر دمج المعارف الأكاديمية مع الممارسة الميدانية، وتشجيع التعلم التطبيقي والعمل الجماعي."
                  : "STLY Constantine supports youth mentorship by connecting academic foundations with hands-on practice, applied learning, and collaborative work."}
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 font-bold text-sm text-[#062B55] hover:text-brand-green transition-colors"
                >
                  <span>{language === "ar" ? "تعرف أكثر على تاريخ وأهداف الرابطة" : "Read more about our journey and goals"}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Core Values Column (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Value 1: Science */}
              <div className="p-6 rounded-xl bg-slate-50 border border-[#DCE3EA] hover:border-brand-navy/30 transition-all duration-300 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#062B55] text-white flex items-center justify-center font-bold shadow-xs">
                  <Atom className="w-6 h-6 text-brand-green-accent" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark">
                  {language === "ar" ? "العلم" : "Science"}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {language === "ar"
                    ? "ترسيخ المنهج العلمي الدقيق والتفكير النقدي في حل الإشكاليات التقنية المعاصرة."
                    : "Instilling rigorous scientific methods and critical thinking to solve modern technical challenges."}
                </p>
              </div>

              {/* Value 2: Creativity */}
              <div className="p-6 rounded-xl bg-slate-50 border border-[#DCE3EA] hover:border-brand-navy/30 transition-all duration-300 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#062B55] text-white flex items-center justify-center font-bold shadow-xs">
                  <Sparkles className="w-6 h-6 text-brand-green-accent" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark">
                  {language === "ar" ? "الإبداع" : "Creativity"}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {language === "ar"
                    ? "تشجيع الابتكار الحر وتطوير حلول تكنولوجية غير تقليدية تخدم المجتمع."
                    : "Encouraging open innovation and crafting non-traditional technology solutions."}
                </p>
              </div>

              {/* Value 3: Community */}
              <div className="p-6 rounded-xl bg-slate-50 border border-[#DCE3EA] hover:border-brand-navy/30 transition-all duration-300 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#062B55] text-white flex items-center justify-center font-bold shadow-xs">
                  <Users className="w-6 h-6 text-brand-green-accent" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark">
                  {language === "ar" ? "المجتمع" : "Community"}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {language === "ar"
                    ? "بناء شبكة شبابية متعاونة تجمع المبتكرين والخبراء لصناعة الأثر الإيجابي."
                    : "Building a collaborative network uniting young minds and mentors to create lasting impact."}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================
          3. ANSF FEATURE SECTION
      ======================================================== */}
      <section className="py-16 sm:py-20 bg-[#04162B] border-y border-[#062B55] text-white overflow-hidden relative">
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center text-xs font-bold text-[#00E5FF] tracking-wider uppercase bg-[#00E5FF]/10 border border-[#00E5FF]/20 px-3 py-1 rounded-md shadow-[0_0_15px_rgba(0,229,255,0.1)]">
                ANSF 2026
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
                {language === "ar"
                  ? "المعرض العلمي الوطني الجزائري 2026"
                  : "Algerian National Science Fair"}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                {language === "ar"
                  ? "مسابقة علمية وطنية للأعمار 12–18 سنة، نُظمت من 17 إلى 19 جويلية 2026 ضمن الأنشطة العلمية للرابطة."
                  : "A national science competition for ages 12–18, held from 17 to 19 July 2026 within STLY Constantine's scientific activities."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mb-6">
                {[
                  {
                    label: language === "ar" ? "التواريخ" : "Dates",
                    value: language === "ar" ? "17–19 جويلية 2026" : "17–19 July 2026",
                  },
                  {
                    label: language === "ar" ? "المجالات" : "Fields",
                    value: language === "ar" ? "9 مجالات علمية" : "9 scientific fields",
                  },
                  {
                    label: language === "ar" ? "فئة الأعمار" : "Ages",
                    value: language === "ar" ? "12–18 سنة" : "12–18",
                  },
                ].map((fact) => (
                  <div key={fact.label} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
                    <p className="text-[11px] font-bold text-slate-400">{fact.label}</p>
                    <p className="mt-1 text-sm font-extrabold text-[#00E5FF]">{fact.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/ansf" className="inline-flex items-center justify-center gap-2 px-5 h-11 rounded-lg font-bold bg-[#00E5FF] text-[#04162B] hover:bg-[#00BCCC] transition-colors shadow-lg shadow-[#00E5FF]/20">
                  <span>{language === "ar" ? "اكتشف ANSF 2026" : "Explore ANSF 2026"}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>
                
                <Link href="/gallery?album=ansf" className="inline-flex items-center justify-center gap-2 px-5 h-11 rounded-lg font-bold bg-white/5 text-white border border-white/20 hover:bg-white/10 transition-colors">
                  <span>{language === "ar" ? "شاهد التغطية" : "View Coverage"}</span>
                </Link>

                <a href="https://ansf.tech/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 h-11 rounded-lg font-bold text-slate-400 hover:text-white transition-colors text-sm">
                  <span>{language === "ar" ? "زيارة الموقع الرسمي" : "Visit Official Website"}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
              <div className="absolute inset-0 bg-[#00E5FF]/5 blur-3xl rounded-full" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brands/ansf-logo.jpg"
                alt="ANSF 2026"
                className="relative z-10 w-48 sm:w-60 md:w-72 lg:w-80 h-auto object-contain rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================
          4. BASMA-TECH FEATURE SECTION
      ======================================================== */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#DCE3EA] relative overflow-hidden">
        {/* Purple/Cyan accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full pointer-events-none" />

        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/3 flex justify-center lg:justify-end">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/brands/basma-tech.png"
                alt="Basma-Tech"
                className="w-32 sm:w-40 md:w-48 lg:w-56 h-auto object-contain"
              />
            </div>
            
            <div className="w-full md:w-2/3 space-y-5 text-center md:text-start" dir={language === "ar" ? "rtl" : "ltr"}>
              <span className="inline-flex items-center text-xs font-bold text-purple-700 tracking-wider uppercase bg-purple-50 border border-purple-200 px-3 py-1 rounded-md">
                Basma-Tech
              </span>
              <p className="text-lg sm:text-xl font-bold text-slate-800 leading-relaxed">
                {language === "ar"
                  ? "فريق بصمة تك هو فريق علمي تابع لرابطة النشاطات العلمية والتقنية للشباب – قسنطينة."
                  : "Basma-Tech is a scientific team within STLY Constantine."}
              </p>
              <div className="flex justify-center md:justify-start">
                <Link 
                  href="/gallery?album=basmaTech"
                  className="inline-flex items-center justify-center gap-2 px-6 h-11 rounded-lg font-bold bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-md"
                >
                  <span>{language === "ar" ? "استكشف بصمة تك" : "Explore Basma-Tech"}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================
          5. SCIENTIFIC FIELDS SECTION (3-Column Clean Grid)
      ======================================================== */}
      <section className="py-20 sm:py-24 bg-[#F4F7FA]">
        <Container>
          <SectionIntro
            eyebrow={language === "ar" ? "المسارات المعرفية" : "Knowledge Tracks"}
            title={language === "ar" ? "المجالات العلمية والتقنية" : "Scientific & Technical Fields"}
            subtitle={
              language === "ar"
                ? "نوفر برامج تدريبية وتأطيراً متخصصاً في أهم التخصصات التكنولوجية الحديثة."
                : "Offering specialized training and mentorship across core contemporary technological disciplines."
            }
            action={
              <Link href="/fields">
                <Button variant="outline" size="md" className="gap-2">
                  <span>{language === "ar" ? "استكشف كل المجالات" : "View All Fields"}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Button>
              </Link>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scientificFields.map((field) => {
              const IconComp = field.icon;
              return (
                <div
                  key={field.id}
                  className="group bg-white p-6 sm:p-7 rounded-xl border border-[#DCE3EA] hover:border-brand-navy/30 transition-all duration-300 hover:shadow-md flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border ${field.color}`}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-brand-dark group-hover:text-brand-navy transition-colors">
                      {field.title[language]}
                    </h3>

                    <p className="text-sm text-brand-muted leading-relaxed">
                      {field.desc[language]}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#DCE3EA]/50">
                    <Link
                      href="/fields"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy group-hover:text-brand-green transition-colors"
                    >
                      <span>{language === "ar" ? "تفاصيل المسار" : "Explore Track"}</span>
                      <ArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ========================================================
          6. FEATURED PROGRAMS SECTION
      ======================================================== */}
      {featuredPrograms.length > 0 && (
        <section className="py-20 sm:py-24 bg-white border-y border-[#DCE3EA]">
          <Container>
            <SectionIntro
              eyebrow={language === "ar" ? "التكوين والتأطير" : "Training & Mentorship"}
              title={language === "ar" ? "برامجنا ونوادينا العلمية" : "Featured Programs & Clubs"}
              subtitle={
                language === "ar"
                  ? "برامج تدريبية متخصصة ومستمرة تهدف لتزويد الشباب بالمهارات التقنية والتطبيقية."
                  : "Continuous specialized programs empowering youth with practical technical skills."
              }
              action={
                <Link href="/programs">
                  <Button variant="outline" size="md" className="gap-2">
                    <span>{language === "ar" ? "عرض جميع البرامج" : "All Programs"}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </Button>
                </Link>
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPrograms.map((prog) => (
                <ProgramCard key={prog.id} program={prog} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ========================================================
          7. UPCOMING EVENTS SECTION
      ======================================================== */}
      {upcomingEvents.length > 0 && (
        <section className="py-20 sm:py-24 bg-[#F4F7FA]">
          <Container>
            <SectionIntro
              eyebrow={language === "ar" ? "المؤتمرات والورشات" : "Conferences & Workshops"}
              title={language === "ar" ? "الفعاليات والأنشطة القادمة" : "Upcoming Events & Activities"}
              subtitle={
                language === "ar"
                  ? "شارك في الفعاليات والورشات التفاعلية القادمة واحجز مقعدك للمشاركة."
                  : "Join our upcoming workshops, seminars, and challenges. Reserve your seat now."
              }
              action={
                <Link href="/events">
                  <Button variant="outline" size="md" className="gap-2">
                    <span>{language === "ar" ? "جدول الفعاليات كاملاً" : "All Events Calendar"}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </Button>
                </Link>
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((evt) => (
                <EventCard key={evt.id} event={evt} variant="card" />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ========================================================
          8. LATEST NEWS & PUBLICATIONS SECTION
      ======================================================== */}
      {latestNews.length > 0 && (
        <section className="py-20 sm:py-24 bg-white border-y border-[#DCE3EA]">
          <Container>
            <SectionIntro
              eyebrow={language === "ar" ? "الإعلام والتغطيات" : "News & Media"}
              title={language === "ar" ? "آخر الأخبار والمقالات العلمية" : "Latest News & Articles"}
              subtitle={
                language === "ar"
                  ? "متابعة لأحدث أنشطة الرابطة، مشاركات الشباب، والمقالات العلمية التثقيفية."
                  : "Updates from STLY activities, youth participation, and educational science articles."
              }
              action={
                <Link href="/news">
                  <Button variant="outline" size="md" className="gap-2">
                    <span>{language === "ar" ? "مركز الأخبار" : "News Center"}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </Button>
                </Link>
              }
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Featured Article (7 cols) */}
              <div className="lg:col-span-7">
                <NewsCard article={latestNews[0]} variant="featured" />
              </div>

              {/* Secondary Articles List (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                {latestNews.slice(1, 3).map((art) => (
                  <NewsCard key={art.id} article={art} variant="row" />
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ========================================================
          9. GALLERY PREVIEW (Varied Mosaic Grid)
      ======================================================== */}
      {previewGallery.length > 0 && (
        <section className="py-20 sm:py-24 bg-[#F4F7FA]">
          <Container>
            <SectionIntro
              eyebrow={language === "ar" ? "الألبوم والتوثيق" : "Gallery & Documentation"}
              title={language === "ar" ? "معرض الصور والأنشطة" : "Media & Activities Gallery"}
              subtitle={
                language === "ar"
                  ? "لمحات مصورة من ورشاتنا التطبيقية، مسابقاتنا العلمية، ومشاركات أعضاء الرابطة."
                  : "Visual highlights from our workshops, scientific challenges, and youth activities."
              }
              action={
                <Link href="/gallery">
                  <Button variant="outline" size="md" className="gap-2">
                    <span>{language === "ar" ? "تصفح المعرض كاملاً" : "Full Gallery"}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </Button>
                </Link>
              }
            />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {previewGallery.map((item) => {
                const isInstagram = item.sourceType === "instagram" || item.socialPlatform === "instagram";
                const isFacebook = item.sourceType === "facebook" || item.socialPlatform === "facebook";
                const isSocial = isInstagram || isFacebook;
                const isVideo = item.type === "video";
                const rawThumb = item.thumbnailUrl || (item.url && !item.url.startsWith("http") ? item.url : null);
                const displayThumb = getDisplayThumbnailUrl(rawThumb);
                const hasValidThumb = Boolean(displayThumb);

                return (
                  <Link
                    key={item.id}
                    href={`/gallery?album=${item.album}`}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-slate-900 border border-[#DCE3EA] hover:border-brand-navy/30 transition-all duration-300 shadow-xs flex flex-col justify-between"
                  >
                    {/* Image if available */}
                    {hasValidThumb && displayThumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={displayThumb}
                        alt={item.title[language]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : isSocial ? (
                      <div className="w-full h-full p-3 flex flex-col justify-between select-none bg-white text-brand-dark">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-extrabold uppercase ${
                              isInstagram ? "text-pink-700" : "text-blue-700"
                            }`}
                          >
                            {isInstagram
                              ? isVideo
                                ? "Instagram Reel"
                                : "Instagram Post"
                              : isVideo
                              ? "Facebook Reel"
                              : "Facebook Post"}
                          </span>
                        </div>
                        <p className="text-[11px] font-bold line-clamp-2 leading-tight text-brand-dark">
                          {item.title[language]}
                        </p>
                        <span className="text-[10px] font-bold text-brand-navy">
                          {language === "ar" ? "فتح المنشور الأصلي" : "View Original Post"}
                        </span>
                      </div>
                    ) : (
                      <MediaFallback
                        title={item.title[language]}
                        category={item.albumName[language]}
                        aspectRatio="1/1"
                      />
                    )}

                    {/* Corner badge for social posts */}
                    {isSocial && (
                      <div className="absolute top-2 end-2 z-10">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shadow-xs text-white text-[10px] ${
                            isInstagram
                              ? "bg-gradient-to-tr from-[#FD1D1D] to-[#833AB4]"
                              : "bg-[#1877F2]"
                          }`}
                        >
                          {isInstagram ? "IG" : "FB"}
                        </div>
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex items-end">
                      <p className="text-xs font-bold text-white line-clamp-1">
                        {item.title[language]}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* ========================================================
          10. PARTNERS & INSTITUTIONAL NETWORK
      ======================================================== */}
      {partners.length > 0 && (
        <section className="py-16 sm:py-20 bg-white border-t border-[#DCE3EA]">
          <Container>
            <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-extrabold text-brand-green uppercase tracking-widest">
                {language === "ar" ? "التعاون المؤسساتي" : "Institutional Network"}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-dark">
                {language === "ar" ? "شركاء النجاح والبحث العلمي" : "Our Partners & Collaborators"}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-center">
              {partners.slice(0, 6).map((partner) => (
                <div
                  key={partner.id}
                  className="flex items-center justify-center p-4 rounded-xl border border-[#DCE3EA] bg-slate-50/60 hover:bg-white hover:border-brand-navy/20 transition-all grayscale hover:grayscale-0"
                  title={partner.name[language]}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={partner.logo}
                    alt={partner.name[language]}
                    className="max-h-12 w-auto object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <span className="text-xs font-bold text-slate-700 text-center px-1">
                    {partner.name[language]}
                  </span>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ========================================================
          11. MEMBERSHIP CALL TO ACTION SECTION (Navy)
      ======================================================== */}
      <CTASection />
    </div>
  );
}
