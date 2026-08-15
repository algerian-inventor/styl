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
  CheckCircle2,
  Sparkles,
  Atom,
  Users,
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

export default function HomePage() {
  const { t, language, dir } = useLanguage();
  const { programs, events, articles, galleryItems, partners } = usePrototypeState();

  const isRtl = dir === "rtl";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Filter sections data
  const featuredPrograms = programs.slice(0, 3);
  const upcomingEvents = events.filter((e) => !e.isClosed).slice(0, 2);
  const latestNews = articles.slice(0, 3);
  const previewGallery = galleryItems.slice(0, 6);

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
        ar: "إجراء التجارب المعملية ومشاريع البحث العلمي بتأطير نخبة من الأساتذة والخبراء.",
        en: "Conducting laboratory experiments and scientific research mentored by university professors.",
      },
      icon: Microscope,
      color: "text-teal-600 bg-teal-50 border-teal-100",
    },
    {
      id: "innovation",
      title: { ar: "الابتكار وريادة المشاريع", en: "Innovation & Tech Leadership" },
      desc: {
        ar: "احتضان النماذج الأولية وتحويل المشاريع العلمية إلى مبادرات واعدة ومؤسسات ناشئة.",
        en: "Incubating prototypes and transforming scientific projects into promising technological ventures.",
      },
      icon: Lightbulb,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
  ];

  return (
    <div className="w-full">
      {/* ========================================================
          1. HERO SECTION (Premium Two-Column Editorial Hero)
      ======================================================== */}
      <section className="relative bg-[#062B55] text-white py-16 sm:py-24 lg:py-28 overflow-hidden border-b border-[#041D38]">
        {/* Subtle Scientific Geometry & Grids */}
        <div className="absolute inset-0 bg-sci-grid-dark opacity-35 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-brand-navy-light/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-brand-green/15 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Headline & Action Points (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-start">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/10 border border-white/15 backdrop-blur-sm">
                <Atom className="w-4 h-4 text-brand-green-accent" />
                <span className="text-xs sm:text-sm font-bold text-slate-200 tracking-wider">
                  {language === "ar"
                    ? "الرابطة العلمية والتقنية للشباب — قسنطينة"
                    : "Scientific and Technical Youth League — Constantine"}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-white leading-[1.2] tracking-tight">
                {language === "ar" ? (
                  <>
                    نصنع جيلاً يقود المستقبل <br />
                    <span className="text-brand-green-accent">بالعلم والابتكار</span>
                  </>
                ) : (
                  <>
                    Empowering Youth to Lead the Future Through{" "}
                    <span className="text-brand-green-accent">Science & Innovation</span>
                  </>
                )}
              </h1>

              {/* Supporting Paragraph */}
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                {language === "ar"
                  ? "تجمع الرابطة العلمية والتقنية للشباب بقسنطينة نخبة من الطاقات الشابة الشغوفة بالعلوم الدقيقة، التكنولوجيا، الروبوتيك، والذكاء الاصطناعي، لتوفير بيئة تكوينية وحاضنة للمشاريع الابتكارية."
                  : "STLY Constantine brings together enthusiastic young minds across exact sciences, technology, robotics, and artificial intelligence, offering an incubator for hands-on learning and innovative projects."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/programs">
                  <Button variant="secondary" size="lg" className="gap-2 px-6">
                    <span>{language === "ar" ? "اكتشف برامجنا" : "Explore Programs"}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </Button>
                </Link>

                <Link href="/membership">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/25 text-white bg-white/10 hover:bg-white/20 hover:border-white/40 gap-2 px-6"
                  >
                    <span>{t("nav.membership")}</span>
                  </Button>
                </Link>
              </div>

              {/* Small Credibility Badges */}
              <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300 font-bold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green-accent flex-shrink-0" />
                  <span>{language === "ar" ? "برامج علمية مؤطرة" : "Structured Programs"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green-accent flex-shrink-0" />
                  <span>{language === "ar" ? "ورشات ومخابر تطبيقية" : "Hands-on Labs"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green-accent flex-shrink-0" />
                  <span>{language === "ar" ? "مسابقات وتحديات وطنية" : "National Contests"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green-accent flex-shrink-0" />
                  <span>{language === "ar" ? "مجتمع شبابي نشط" : "Active Community"}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Structured Scientific Visual Composition (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Card Graphic */}
                <div className="relative rounded-2xl bg-gradient-to-br from-[#08386E] via-[#062B55] to-[#041D38] p-6 sm:p-8 border border-white/20 shadow-2xl overflow-hidden space-y-6">
                  {/* Subtle Grid inside card */}
                  <div className="absolute inset-0 bg-sci-grid-dark opacity-30 pointer-events-none" />

                  {/* Card Header */}
                  <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-green/20 border border-brand-green/30 flex items-center justify-center text-brand-green-accent">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">
                          {language === "ar" ? "منظومة الابتكار العلمي" : "Scientific Innovation Lab"}
                        </h3>
                        <p className="text-xs text-slate-300">STLY Constantine • 2026</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold bg-brand-green/20 text-brand-green-accent border border-brand-green/30 px-2 py-0.5 rounded">
                      ACTIVE
                    </span>
                  </div>

                  {/* Scientific Highlights Stack */}
                  <div className="relative z-10 space-y-3">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <Bot className="w-5 h-5 text-blue-400" />
                        <span className="text-sm font-bold text-slate-100">
                          {language === "ar" ? "مختبر الروبوتات الذكية" : "Robotics & Automation"}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">ROS / Arduino</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <Brain className="w-5 h-5 text-purple-400" />
                        <span className="text-sm font-bold text-slate-100">
                          {language === "ar" ? "حاضنة الذكاء الاصطناعي" : "Artificial Intelligence Lab"}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">ML / Vision</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <Lightbulb className="w-5 h-5 text-amber-400" />
                        <span className="text-sm font-bold text-slate-100">
                          {language === "ar" ? "مشاريع التخرج والابتكار" : "Incubated Prototypes"}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">Patents / Startups</span>
                    </div>
                  </div>

                  {/* Visual Status Indicator */}
                  <div className="relative z-10 pt-2 flex items-center justify-between text-xs text-slate-300 border-t border-white/10">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                      {language === "ar" ? "التسجيلات مفتوحة للموسم الحالي" : "Current Season Open"}
                    </span>
                    <Link
                      href="/fields"
                      className="font-bold text-brand-green-accent hover:underline flex items-center gap-1"
                    >
                      <span>{language === "ar" ? "استكشف" : "Details"}</span>
                      <ArrowIcon className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Floating Decorative Scientific Badges */}
                <div className="hidden sm:flex absolute -bottom-6 -right-6 bg-white text-brand-dark p-3.5 rounded-xl shadow-xl border border-[#DCE3EA] items-center gap-3 z-20">
                  <div className="w-8 h-8 rounded-lg bg-brand-navy/10 flex items-center justify-center text-[#062B55]">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-brand-dark">
                      {language === "ar" ? "مجتمع شبابي تفاعلي" : "Interactive Youth Club"}
                    </p>
                    <p className="text-[11px] text-brand-muted">
                      {language === "ar" ? "قسنطينة — الجزائر" : "Constantine, DZ"}
                    </p>
                  </div>
                </div>
              </div>
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
                  ? "تسعى الرابطة العلمية والتقنية للشباب بقسنطينة إلى إرساء نموذج رائد في التأطير الشبابي عبر دمج المعارف الأكاديمية مع الممارسة الميدانية، وتوفير المخابر والمعدات اللازمة لتحويل الأفكار إلى مشاريع واقعية تخدم المجتمع والاقتصاد الوطني."
                  : "STLY Constantine aims to establish a leading model in youth mentorship by merging academic foundations with hands-on practice, providing lab facilities and equipment to translate ideas into real-world technological solutions."}
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
          3. SCIENTIFIC FIELDS SECTION (3-Column Clean Grid)
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
          4. FEATURED PROGRAMS SECTION
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
          5. UPCOMING EVENTS SECTION
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
          6. LATEST NEWS & PUBLICATIONS SECTION
      ======================================================== */}
      {latestNews.length > 0 && (
        <section className="py-20 sm:py-24 bg-white border-y border-[#DCE3EA]">
          <Container>
            <SectionIntro
              eyebrow={language === "ar" ? "الإعلام والتغطيات" : "News & Media"}
              title={language === "ar" ? "آخر الأخبار والمقالات العلمية" : "Latest News & Articles"}
              subtitle={
                language === "ar"
                  ? "متابعة شاملة لأحدث إنجازات الرابطة، مشاركات الشباب، والمقالات العلمية التثقيفية."
                  : "Comprehensive coverage of our latest achievements, youth innovations, and tech articles."
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
          7. GALLERY PREVIEW (Varied Mosaic Grid)
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
                const hasValidThumb = Boolean(item.thumbnailUrl || (item.url && !item.url.startsWith("http")));

                return (
                  <Link
                    key={item.id}
                    href="/gallery"
                    className="group relative aspect-square rounded-xl overflow-hidden bg-slate-900 border border-[#DCE3EA] hover:border-brand-navy/30 transition-all duration-300 shadow-xs flex flex-col justify-between"
                  >
                    {/* Image if available */}
                    {hasValidThumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.thumbnailUrl || item.url}
                        alt={item.title[language]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : isSocial ? (
                      <div
                        className={`w-full h-full p-3 flex flex-col justify-between select-none ${
                          isInstagram
                            ? "bg-gradient-to-br from-[#405DE6] via-[#E1306C] to-[#FCAF45] text-white"
                            : "bg-gradient-to-br from-[#1877F2] via-[#0D47A1] to-[#041D38] text-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase opacity-90">
                            {isInstagram ? "Instagram" : "Facebook"}
                          </span>
                        </div>
                        <p className="text-[11px] font-bold line-clamp-2 leading-tight text-white drop-shadow-xs">
                          {item.title[language]}
                        </p>
                      </div>
                    ) : null}

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
          8. PARTNERS & INSTITUTIONAL NETWORK
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
          9. MEMBERSHIP CALL TO ACTION SECTION (Navy)
      ======================================================== */}
      <CTASection />
    </div>
  );
}
