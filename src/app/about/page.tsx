"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Compass, Heart, Users, Target } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/Card";

export default function AboutPage() {
  const { t, language } = useLanguage();
  const { siteSettings } = usePrototypeState();

  const values = [
    {
      icon: Target,
      title: { ar: "التميز العلمي", en: "Scientific Excellence" },
      desc: { ar: "السعي الدائم لتقديم محتوى معرفي وتدريبي متوافق مع المقاييس العلمية.", en: "Always striving to deliver educational and training content that complies with high scientific standards." }
    },
    {
      icon: Compass,
      title: { ar: "الابتكار والمبادرة", en: "Innovation & Initiative" },
      desc: { ar: "تشجيع التفكير الحر وتحويل المشكلات الواقعية إلى تحديات للبحث والابتكار.", en: "Encouraging out-of-the-box thinking and turning real-life problems into research challenges." }
    },
    {
      icon: Users,
      title: { ar: "العمل الجماعي", en: "Collaboration" },
      desc: { ar: "ترسيخ ثقافة التعاون والمشاركة المعرفية بين النوادي والمبتكرين الشباب.", en: "Establishing a culture of knowledge sharing and collaboration among youth and clubs." }
    },
    {
      icon: Heart,
      title: { ar: "المسؤولية الاجتماعية", en: "Social Responsibility" },
      desc: { ar: "توجيه الابتكارات والمشاريع لخدمة وتطوير ولاية قسنطينة والجزائر بشكل عام.", en: "Directing tech innovations to serve and develop the Constantine province and Algeria as a whole." }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <SectionHeader
          title={t("about.title")}
          subtitle={t("about.subtitle")}
        />
      </motion.div>

      {/* Main Intro */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6 text-brand-dark"
        >
          <h3 className="text-xl font-bold border-b border-brand-green/30 pb-2 flex items-center gap-2 text-brand-navy">
            <Award className="h-5 w-5 text-brand-green" />
            {language === "ar" ? "من نحن؟" : "Who are we?"}
          </h3>
          <p className="text-base font-semibold leading-relaxed">
            {t("about.desc1")}
          </p>
          <p className="text-sm text-brand-muted leading-relaxed">
            {language === "ar"
              ? `${siteSettings.leagueNameAr} هي منظمة شبانية معتمدة غير ربحية، تأسست لتشكل جسراً يربط بين الفضول العلمي والتطبيقات التكنولوجية. نوفر بيئة حاضنة للشباب تمكنهم من التفاعل مع العلوم الحديثة وتطوير مهارات ملموسة تفتح لهم آفاقاً واسعة في دراستهم الجامعية وحياتهم المهنية.`
              : `${siteSettings.leagueNameEn} is an approved non-profit youth organization, founded to act as a bridge between scientific curiosity and technological implementation. We provide a space for young people to interact with sciences and develop skills that open opportunities in their university and career paths.`}
          </p>
          <p className="text-sm text-brand-muted leading-relaxed">
            {language === "ar"
              ? "نعمل تحت إشراف وتأطير ثلة من الباحثين، الدكاترة، والمهندسين المتميزين في شتى مجالات الهندسة، الروبوتيك، البرمجة، والذكاء الاصطناعي، بهدف توجيه المبتكرين ودعم مشاريعهم نحو براءات الاختراع وتأسيس الشركات الناشئة."
              : "We operate under the guidance of academics, PhDs, and engineers in fields of engineering, robotics, programming, and AI, assisting young creators to copyright inventions and start tech companies."}
          </p>
        </motion.div>

        {/* Vision / Mission boxes */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-6"
        >
          <Card className="bg-brand-navy text-white p-6">
            <CardContent className="p-0 space-y-3">
              <h4 className="text-lg font-bold text-brand-green flex items-center gap-2">
                <span>{t("about.visionTitle")}</span>
              </h4>
              <p className="text-xs leading-relaxed text-slate-200">
                {t("about.visionDesc")}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-brand-border p-6">
            <CardContent className="p-0 space-y-3">
              <h4 className="text-lg font-bold text-brand-navy flex items-center gap-2">
                <span>{t("about.missionTitle")}</span>
              </h4>
              <p className="text-xs leading-relaxed text-brand-muted">
                {t("about.missionDesc")}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Strategic Objectives */}
      <section className="bg-brand-bg border border-brand-border rounded-2xl p-8 md:p-12 relative overflow-hidden bg-sci-grid">
        <div className="absolute inset-0 bg-brand-bg/95 pointer-events-none" />
        
        <div className="relative z-10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-brand-dark">
              {t("about.objectivesTitle")}
            </h3>
            <p className="text-xs text-brand-muted">
              {language === "ar" ? "نسعى لتحقيق أهداف ملموسة تصنع الأثر في مجتمعنا" : "We strive to reach practical milestones impacting our society"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[t("about.obj1"), t("about.obj2"), t("about.obj3"), t("about.obj4")].map((obj, i) => (
              <div key={i} className="bg-white border border-brand-border p-5 rounded-lg flex gap-4 items-start shadow-xs">
                <span className="h-8 w-8 bg-brand-navy/5 text-brand-navy border border-brand-navy/10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {i + 1}
                </span>
                <p className="text-xs font-semibold text-brand-dark leading-relaxed pt-1">
                  {obj}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-xl sm:text-2xl font-extrabold text-brand-dark">
            {language === "ar" ? "القيم الموجهة لنا" : "Our Core Values"}
          </h3>
          <p className="text-xs text-brand-muted">
            {language === "ar" ? "المبادئ الأخلاقية والمهنية التي تنظم نشاطاتنا وتوجه فرق العمل" : "Ethical & professional guidelines regulating our initiatives"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => {
            const IconComp = val.icon;
            return (
              <Card key={idx} className="h-full flex flex-col justify-between">
                <CardContent className="p-6 space-y-4">
                  <div className="p-3 bg-brand-green/5 text-brand-green border border-brand-green/10 rounded-lg w-fit">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-brand-dark text-sm">
                    {language === "ar" ? val.title.ar : val.title.en}
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {language === "ar" ? val.desc.ar : val.desc.en}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
