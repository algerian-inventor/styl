"use client";

import React from "react";
import { Compass, Heart, Users, Target, Handshake, Atom } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/ui/CTASection";

export default function AboutPage() {
  const { t, language } = useLanguage();
  const { siteSettings } = usePrototypeState();

  const values = [
    {
      icon: Target,
      title: { ar: "التميز العلمي والمنهجي", en: "Scientific & Methodological Rigor" },
      desc: {
        ar: "تقديم برامج وتكوينات دقيقة تتطابق مع المعايير الأكاديمية والتطبيقية الحديثة.",
        en: "Delivering educational and training content aligned with modern scientific and academic standards.",
      },
    },
    {
      icon: Compass,
      title: { ar: "الابتكار والمبادرة الحرة", en: "Innovation & Initiative" },
      desc: {
        ar: "تشجيع التفكير الإبداعي وتحويل المشكلات الميدانية إلى مشاريع ونماذج تقنية حقيقية.",
        en: "Encouraging out-of-the-box thinking and turning real challenges into concrete technological prototypes.",
      },
    },
    {
      icon: Users,
      title: { ar: "العمل الجماعي والتعاون", en: "Collaboration & Community" },
      desc: {
        ar: "ترسيخ ثقافة تبادل الخبرات والتكامل المعرفي بين الشباب، الباحثين والنوادي العلمية.",
        en: "Fostering knowledge-sharing and team synergy among youth, researchers, and scientific clubs.",
      },
    },
    {
      icon: Heart,
      title: { ar: "المسؤولية والأثر المجتمعي", en: "Impact & Social Value" },
      desc: {
        ar: "توجيه المعرفة والتكنولوجيا لتطوير الحلول المحلية وخدمة قسنطينة والجزائر عموماً.",
        en: "Harnessing tech tools to solve local problems and serve Constantine and Algeria at large.",
      },
    },
  ];

  return (
    <div className="w-full bg-[#F4F7FA]">
      {/* Page Hero */}
      <PageHero
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.about") },
        ]}
        eyebrow={language === "ar" ? "الهوية والرؤية" : "Identity & Vision"}
        title={t("about.title")}
        description={t("about.subtitle")}
      />

      {/* Main Editorial Story Section */}
      <section className="py-20 bg-white border-b border-[#DCE3EA]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Story text (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center text-xs font-bold text-brand-navy tracking-wider uppercase bg-brand-navy/5 border border-brand-navy/15 px-3 py-1 rounded-md">
                {language === "ar" ? "من نحن؟" : "Who We Are"}
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark leading-tight tracking-tight">
                {language === "ar" ? (
                  <>
                    رابطة شبابية علمية تدمج <br />
                    <span className="text-[#062B55]">المعرفة الأكاديمية بالتطبيق الميداني</span>
                  </>
                ) : (
                  <>
                    Bridging Academic Knowledge with <br />
                    <span className="text-[#062B55]">Real-World Tech Implementation</span>
                  </>
                )}
              </h2>

              <p className="text-base sm:text-lg text-brand-dark font-medium leading-relaxed">
                {t("about.desc1")}
              </p>

              <div className="space-y-4 text-sm sm:text-base text-brand-muted leading-relaxed">
                <p>
                  {language === "ar"
                    ? `${siteSettings.leagueNameAr} هي منظمة شبابية علمية في ولاية قسنطينة، تعمل على تنمية الشغف المعرفي والابتكار التكنولوجي. نركز على الورشات، التأطير، والعمل الجماعي لمساعدة الشباب على اختبار أفكارهم وتطوير مهاراتهم.`
                    : `${siteSettings.leagueNameEn} is a scientific youth organization based in Constantine, focused on knowledge curiosity and technology learning through workshops, mentorship, and collaborative practice.`}
                </p>
                <p>
                  {language === "ar"
                    ? "تستفيد نوادينا وبرامجنا من مساهمات أساتذة وباحثين ومهندسين ومختصين في الروبوتيك، الإلكترونيات، الذكاء الاصطناعي، وهندسة البرمجيات حسب طبيعة كل نشاط."
                    : "Our clubs and programs benefit from contributions by professors, researchers, engineers, and specialists in robotics, electronics, artificial intelligence, and software systems depending on each activity."}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-6 text-sm font-bold text-brand-dark">
                <div className="flex items-center gap-2">
                  <Handshake className="w-5 h-5 text-brand-green" />
                  <span>{language === "ar" ? "تعاون مؤسساتي ومجتمعي" : "Institutional and Community Cooperation"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Atom className="w-5 h-5 text-brand-green" />
                  <span>{language === "ar" ? "مخابر وورشات تطبيقية مجهزة" : "Equipped Science Labs"}</span>
                </div>
              </div>
            </div>

            {/* Vision & Mission Highlight Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Vision Card */}
              <div className="p-8 rounded-2xl bg-[#062B55] text-white border border-white/10 shadow-lg space-y-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-sci-grid-dark opacity-30 pointer-events-none" />
                <div className="relative z-10 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/20 border border-brand-green/30 flex items-center justify-center text-brand-green-accent">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-extrabold text-white">
                    {t("about.visionTitle")}
                  </h3>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {t("about.visionDesc")}
                  </p>
                </div>
              </div>

              {/* Mission Card */}
              <div className="p-8 rounded-2xl bg-white text-brand-dark border border-[#DCE3EA] shadow-xs space-y-4">
                <div className="w-10 h-10 rounded-xl bg-brand-navy/10 flex items-center justify-center text-brand-navy">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-extrabold text-brand-dark">
                  {t("about.missionTitle")}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {t("about.missionDesc")}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Strategic Objectives Section */}
      <section className="py-20 bg-[#F4F7FA] border-b border-[#DCE3EA]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-extrabold text-brand-green uppercase tracking-widest">
              {language === "ar" ? "خارطة الطريق" : "Our Roadmap"}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark">
              {t("about.objectivesTitle")}
            </h2>
            <p className="text-sm sm:text-base text-brand-muted">
              {language === "ar"
                ? "أهداف استراتيجية محددة تقود كافة فعالياتنا ونشاطاتنا التكوينية"
                : "Key strategic objectives driving our initiatives and youth workshops"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[t("about.obj1"), t("about.obj2"), t("about.obj3"), t("about.obj4")].map((obj, i) => (
              <div
                key={i}
                className="bg-white border border-[#DCE3EA] hover:border-brand-navy/30 p-6 rounded-xl flex gap-4 items-start shadow-xs transition-all"
              >
                <span className="w-10 h-10 bg-[#062B55] text-brand-green-accent rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 shadow-xs">
                  0{i + 1}
                </span>
                <p className="text-sm sm:text-base font-bold text-brand-dark leading-relaxed pt-1.5">
                  {obj}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white border-b border-[#DCE3EA]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-extrabold text-brand-green uppercase tracking-widest">
              {language === "ar" ? "المبادئ التوجيهية" : "Guiding Principles"}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark">
              {language === "ar" ? "قيمنا الجوهرية" : "Our Core Values"}
            </h2>
            <p className="text-sm sm:text-base text-brand-muted">
              {language === "ar"
                ? "الركائز المهنية والأخلاقية التي تحكم عملنا وتضمن بيئة آمنة ومحفزة للشباب"
                : "Ethical and professional foundations ensuring an engaging environment for all youth"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F4F7FA] p-6 rounded-xl border border-[#DCE3EA] hover:border-brand-navy/30 transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-white text-brand-green flex items-center justify-center shadow-xs border border-[#DCE3EA]">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-brand-dark">
                      {language === "ar" ? val.title.ar : val.title.en}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                      {language === "ar" ? val.desc.ar : val.desc.en}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
