"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { fields, iconMap } from "@/data/fields";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/ui/CTASection";

const fieldCurricula: Record<string, { ar: string[]; en: string[]; tools?: string[] }> = {
  science: {
    ar: ["الفيزياء الكونية والفلكية", "مبادئ ميكانيكا الكم المبسطة", "البيولوجيا الخلوية وتطبيقات المجهر", "منهجية البحث العلمي وإعداد الأوراق البارزة"],
    en: ["Astrophysics & Cosmology", "Simplified Quantum Mechanics", "Cell Biology & Microscopy", "Scientific Writing & Research Methods"],
    tools: ["Microscopes", "Data Loggers", "LaTeX", "SPSS"],
  },
  tech: {
    ar: ["البرمجة بلغات Python و JavaScript", "تصميم وتطوير صفحات الويب والواجهات", "أساسيات قواعد البيانات السحابية", "شبكات الاتصال ونظم التشغيل المفتوحة"],
    en: ["Python & JavaScript Programming", "Web Application Development", "Cloud Databases Architecture", "Networking & Open-Source OS"],
    tools: ["React", "Python", "Linux", "Git"],
  },
  engineering: {
    ar: ["المقاومة الميكانيكية ودراسة المواد", "التصميم ثلاثي الأبعاد ببرنامج CAD", "الهياكل المعدنية والآليات البسيطة", "الطباعة والتصنيع ثلاثي الأبعاد (3D Printing)"],
    en: ["Stress Analysis & Materials Science", "3D CAD Modeling", "Metal Structures & Mechanics", "Additive Manufacturing & 3D Printing"],
    tools: ["SolidWorks", "AutoCAD", "3D Printers", "CNC"],
  },
  electronics: {
    ar: ["قوانين الدارات والتيار المستمر", "تجميع ولحام المكونات الإلكترونية", "تصميم الدارات المطبوعة (PCB Design)", "التعامل مع شرائح Arduino و ESP32"],
    en: ["DC circuit rules & Voltage controls", "Soldering & Hardware assembly", "PCB layout and schematic design", "Microcontrollers (Arduino & ESP32)"],
    tools: ["Arduino", "ESP32", "Altium", "Oscilloscopes"],
  },
  ai: {
    ar: ["خوارزميات تعلم الآلة الكلاسيكية", "تحليل وتصور البيانات الإحصائية", "الشبكات العصبية العميقة لتمثيل الصور", "معالجة وتحليل اللغات الطبيعية (NLP)"],
    en: ["Classical Machine Learning", "Data Analysis & Visualizations", "Deep Neural Networks for Vision", "Natural Language Processing (NLP)"],
    tools: ["PyTorch", "TensorFlow", "Scikit-Learn", "OpenCV"],
  },
  robotics: {
    ar: ["ميكانيك حركة الروبوتات وتوجيهها", "محركات السيرفو والخطوة (Servo & Stepper)", "ربط المستشعرات وقراءة معطيات المسافة", "برمجة الأنظمة ذاتية التحكم وتتبع المسارات"],
    en: ["Robot kinematics & motion rules", "Servo & Stepper motor drives", "Sensor feedback integrations", "Autonomous line-tracking logic"],
    tools: ["ROS", "Sensors", "Motors", "MicroPython"],
  },
  chemistry: {
    ar: ["التفاعلات الكيميائية الأساسية وشروط السلامة", "كيمياء المحاليل والتركيبات الجزيئية", "التحليل المخبري وتحديد العناصر", "صناعة المستحضرات والصابون الصديق للبيئة"],
    en: ["Chemical Reactions & Lab Safety", "Solution chemistry & molecules", "Lab analysis & element indicators", "Eco-friendly cosmetic formulations"],
    tools: ["Lab Glassware", "Spectroscopy", "pH Meters"],
  },
  innovation: {
    ar: ["منهجية التفكير التصميمي وحل المشكلات", "نموذج العمل التجاري وإعداد دراسة الجدوى", "مهارات الإدارة وتوزيع أدوار العمل", "تقنيات العرض والإقناع أمام المستثمرين"],
    en: ["Design Thinking & Problem Solving", "Business Model Canvas & Feasibility", "Project Management & Collaboration", "Pitching & Negotiation Techniques"],
    tools: ["Business Model Canvas", "Trello", "Prototyping"],
  },
};

export default function FieldsPage() {
  const { t, language } = useLanguage();

  return (
    <div className="w-full bg-[#F4F7FA]">
      {/* Page Hero */}
      <PageHero
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.fields") },
        ]}
        eyebrow={language === "ar" ? "المسارات المعرفية" : "Knowledge Tracks"}
        title={t("fields.title")}
        description={t("fields.subtitle")}
      />

      {/* Main Grid Section */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fields.map((field) => {
              const IconComp = iconMap[field.iconName];
              const curricula = fieldCurricula[field.id] || { ar: [], en: [], tools: [] };

              return (
                <div
                  key={field.id}
                  className="bg-white rounded-2xl p-7 sm:p-8 border border-[#DCE3EA] hover:border-brand-navy/30 transition-all duration-300 hover:shadow-md flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-5">
                    {/* Header with Icon and Title */}
                    <div className="flex items-start gap-4">
                      <div className={`p-3.5 rounded-xl border flex-shrink-0 ${field.colorClass}`}>
                        {IconComp && <IconComp className="w-7 h-7" />}
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-extrabold text-brand-green uppercase tracking-wider">
                          {language === "ar" ? "مسار تخصصي مؤطر" : "Structured Track"}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-brand-dark">
                          {language === "ar" ? field.title.ar : field.title.en}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                      {language === "ar" ? field.description.ar : field.description.en}
                    </p>

                    {/* Curriculum Modules */}
                    <div className="space-y-3 pt-2 border-t border-[#DCE3EA]">
                      <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">
                        {language === "ar" ? "أهم المحاور التدريبية والميدانية:" : "Core Training Modules:"}
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {(language === "ar" ? curricula.ar : curricula.en).map((topic, i) => (
                          <li key={i} className="flex gap-2 items-start text-xs sm:text-sm text-brand-dark">
                            <CheckCircle2 className="w-4 h-4 text-brand-green mt-0.5 flex-shrink-0" />
                            <span className="leading-snug">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tools Badges */}
                  {curricula.tools && curricula.tools.length > 0 && (
                    <div className="pt-4 border-t border-[#DCE3EA]/60 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-slate-400">
                        {language === "ar" ? "الأدوات والمعدات:" : "Tools & Stack:"}
                      </span>
                      {curricula.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-mono font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Membership CTA */}
      <CTASection />
    </div>
  );
}
