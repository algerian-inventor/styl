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
      <section className="relative bg-[#062B55] text-white py-14 sm:py-20 lg:py-24 overflow-hidden border-b border-[#041D38]">
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-6 text-start">
              <div className="inline-flex max-w-full items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/10 border border-white/15">
                <Atom className="w-4 h-4 text-brand-green-accent" />
                <span className="text-xs sm:text-sm font-bold text-slate-100">
                  {language === "ar" ? siteSettings.leagueNameAr : siteSettings.leagueNameEn}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-white leading-[1.15] tracking-tight">
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

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                {language === "ar"
                  ? "تفتح الرابطة العلمية والتقنية للشباب بقسنطينة مساحة عملية للشباب المهتم بالعلوم، التكنولوجيا، الروبوتيك، والذكاء الاصطناعي عبر ورشات وأنشطة مؤطرة."
                  : "STLY Constantine creates a practical space for young people interested in science, technology, robotics, and artificial intelligence through guided workshops and activities."}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/membership">
                  <Button variant="secondary" size="lg" className="gap-2 px-6">
                    <span>{t("nav.membership")}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </Button>
                </Link>

                <Link href="/events">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/25 text-white bg-white/10 hover:bg-white/20 hover:border-white/40 gap-2 px-6"
                  >
                    <span>{language === "ar" ? "الأنشطة القادمة" : "Activities"}</span>
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-xl overflow-hidden border border-white/15 bg-white/8 shadow-xl">
                {canShowHeroImage ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={heroImage}
                      alt={language === "ar" ? "أنشطة الرابطة العلمية والتقنية للشباب" : "STLY science and youth activities"}
                      onError={() => setBrokenHeroImage(heroImage)}
                      className="h-[280px] sm:h-[360px] lg:h-[430px] w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041D38]/85 via-[#062B55]/20 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6">
                      <p className="text-xs font-bold uppercase tracking-widest text-brand-green-accent">
                        STLY Constantine
                      </p>
                      <p className="mt-2 text-sm sm:text-base font-bold leading-relaxed text-white">
                        {language === "ar"
                          ? "ورشات، نواد علمية، وأنشطة ميدانية للشباب."
                          : "Workshops, science clubs, and youth activities."}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="p-6 sm:p-8 min-h-[320px] flex flex-col justify-between bg-[#08386E]">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-brand-green/20 border border-brand-green/30 flex items-center justify-center text-brand-green-accent">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-brand-green-accent">STLY</p>
                          <p className="text-sm font-bold text-white">
                            {language === "ar" ? "قسنطينة، الجزائر" : "Constantine, Algeria"}
                          </p>
                        </div>
                      </div>
                      <CalendarDays className="w-8 h-8 text-white/40" />
                    </div>
                    <div className="space-y-4">
                      <p className="text-2xl sm:text-3xl font-black leading-tight">
                        {language === "ar" ? siteSettings.sloganAr : siteSettings.sloganEn}
                      </p>
                      <p className="text-sm text-slate-200 leading-relaxed">
                        {language === "ar"
                          ? "واجهة بسيطة وواضحة تعكس هوية الرابطة وأنشطتها."
                          : "A simple branded composition that reflects the league and its activities."}
                      </p>
                    </div>
                  </div>
                )}
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
      <section className="py-16 sm:py-20 bg-[#F4F7FA] border-b border-[#DCE3EA]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center text-xs font-bold text-brand-navy tracking-wider uppercase bg-white border border-brand-navy/15 px-3 py-1 rounded-md">
                ANSF 2026
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark leading-tight tracking-tight">
                {language === "ar"
                  ? "المعرض العلمي الوطني الجزائري"
                  : "Algerian National Science Fair"}
              </h2>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed max-w-3xl">
                {language === "ar"
                  ? "مسابقة علمية لفئة 12–18 سنة، أقيمت من 17 إلى 19 جويلية 2026 ضمن الأنشطة العلمية لرابطة النشاطات العلمية والتقنية للشباب – قسنطينة."
                  : "A science competition for ages 12–18, held from 17 to 19 July 2026 within STLY Constantine's scientific activities."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
                {[
                  {
                    label: language === "ar" ? "التاريخ" : "Dates",
                    value: language === "ar" ? "17–19 جويلية 2026" : "17–19 July 2026",
                  },
                  {
                    label: language === "ar" ? "المجالات" : "Fields",
                    value: language === "ar" ? "9 مجالات" : "9 fields",
                  },
                  {
                    label: language === "ar" ? "الفئة العمرية" : "Ages",
                    value: language === "ar" ? "12–18 سنة" : "12–18",
                  },
                ].map((fact) => (
                  <div key={fact.label} className="rounded-xl border border-[#DCE3EA] bg-white p-4 shadow-xs">
                    <p className="text-[11px] font-bold text-brand-muted">{fact.label}</p>
                    <p className="mt-1 text-sm font-extrabold text-brand-dark">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 rounded-xl border border-[#DCE3EA] bg-white p-6 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#062B55] text-brand-green-accent">
                  <Atom className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-green">
                    ANSF
                  </p>
                  <p className="text-sm font-extrabold text-brand-dark">
                    {language === "ar" ? "نشاط علمي وطني" : "National Science Activity"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/ansf">
                  <Button variant="secondary" size="md" className="gap-2">
                    <span>{language === "ar" ? "تفاصيل ANSF" : "ANSF Details"}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </Button>
                </Link>
                <a href="https://ansf.tech/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="md" className="gap-2">
                    <span>{language === "ar" ? "الموقع الرسمي" : "Official Website"}</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================
          4. SCIENTIFIC FIELDS SECTION (3-Column Clean Grid)
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
          5. FEATURED PROGRAMS SECTION
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
          6. UPCOMING EVENTS SECTION
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
          7. LATEST NEWS & PUBLICATIONS SECTION
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
          8. GALLERY PREVIEW (Varied Mosaic Grid)
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
          9. PARTNERS & INSTITUTIONAL NETWORK
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
          10. MEMBERSHIP CALL TO ACTION SECTION (Navy)
      ======================================================== */}
      <CTASection />
    </div>
  );
}
