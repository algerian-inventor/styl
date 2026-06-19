"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "@/components/SectionHeader";
import { fields, iconMap } from "@/data/fields";
import { Card, CardContent } from "@/components/ui/Card";
import { Check } from "lucide-react";

// Mock curricula for each field to add detail
const fieldCurricula: Record<string, { ar: string[]; en: string[] }> = {
  science: {
    ar: ["الفيزياء الكونية والفلكية", "مبادئ ميكانيكا الكم المبسطة", "البيولوجيا الخلوية وتطبيقات المجهر", "منهجية البحث العلمي وإعداد الأوراق البارزة"],
    en: ["Astrophysics & Cosmology", "Simplified Quantum Mechanics", "Cell Biology & Microscopy", "Scientific Writing & Research Methods"]
  },
  tech: {
    ar: ["البرمجة بلغات Python و JavaScript", "تصميم وتطوير صفحات الويب والواجهات", "أساسيات قواعد البيانات السحابية", "شبكات الاتصال ونظم التشغيل المفتوحة المصدر"],
    en: ["Python & JavaScript Programming", "Web Application Development", "Cloud Databases Architecture", "Networking & Open-Source OS"]
  },
  engineering: {
    ar: ["المقاومة الميكانيكية ودراسة المواد", "التصميم ثلاثي الأبعاد ببرنامج CAD", "الهياكل المعدنية والآليات البسيطة", "التصنيع باستخدام طابعات ثلاثية الأبعاد (3D Printing)"],
    en: ["Stress Analysis & Materials Science", "3D CAD Modeling", "Metal Structures & Mechanics", "Additive Manufacturing & 3D Printing"]
  },
  electronics: {
    ar: ["قوانين الدارات والتيار المستمر", "تجميع ولحام المكونات الإلكترونية", "تصميم الدارات المطبوعة (PCB Design)", "التعامل مع شرائح Arduino و ESP32"],
    en: ["DC circuit rules & Voltage controls", "Soldering & Hardware assembly", "PCB layout and schematic design", "Microcontrollers (Arduino & ESP32)"]
  },
  ai: {
    ar: ["خوارزميات تعلم الآلة الكلاسيكية", "تحليل وتصور البيانات الإحصائية", "الشبكات العصبية العميقة لتمثيل الصور", "معالجة وتحليل اللغات الطبيعية (NLP)"],
    en: ["Classical Machine Learning", "Data Analysis & Visualizations", "Deep Neural Networks for Vision", "Natural Language Processing (NLP)"]
  },
  robotics: {
    ar: ["ميكانيك حركة الروبوتات وتوجيهها", "محركات السيرفو والخطوة (Servo & Stepper)", "ربط المستشعرات وقراءة معطيات المسافة", "برمجة الأنظمة ذاتية التحكم وتتبع المسارات"],
    en: ["Robot kinematics & motion rules", "Servo & Stepper motor drives", "Sensor feedback integrations", "Autonomous line-tracking logic"]
  },
  chemistry: {
    ar: ["التفاعلات الكيميائية الأساسية وشروط السلامة", "كيمياء المحاليل والتركيبات الجزيئية", "التحليل المخبري وتحديد العناصر", "صناعة المستحضرات والصابون الصديق للبيئة"],
    en: ["Chemical Reactions & Lab Safety", "Solution chemistry & molecules", "Lab analysis & element indicators", "Eco-friendly cosmetic formulations"]
  },
  innovation: {
    ar: ["منهجية التفكير التصميمي وحل المشكلات", "نموذج العمل التجاري وإعداد دراسة الجدوى", "مهارات الإدارة وتوزيع أدوار العمل", "تقنيات العرض والإقناع أمام المستثمرين"],
    en: ["Design Thinking & Problem Solving", "Business Model Canvas & Feasibility", "Project Management & Collaboration", "Pitching & Negotiation Techniques"]
  }
};

export default function FieldsPage() {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <SectionHeader
          title={t("fields.title")}
          subtitle={t("fields.subtitle")}
        />
      </motion.div>

      {/* Grid of Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {fields.map((field, idx) => {
          const IconComp = iconMap[field.iconName];
          const curricula = fieldCurricula[field.id] || { ar: [], en: [] };

          return (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Card className="h-full flex flex-col justify-between border border-brand-border hover:border-brand-navy/35">
                <CardContent className="p-6 space-y-6">
                  {/* Title and Icon */}
                  <div className="flex gap-4 items-center">
                    <div className={`p-3 rounded-lg border flex-shrink-0 ${field.colorClass}`}>
                      {IconComp && <IconComp className="h-6 w-6" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-brand-dark">
                        {language === "ar" ? field.title.ar : field.title.en}
                      </h3>
                      <span className="text-[10px] text-brand-green font-extrabold uppercase tracking-widest bg-brand-green/5 border border-brand-green/20 px-2 py-0.5 rounded">
                        {language === "ar" ? "مسار تخصصي" : "Specialization Track"}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-brand-muted leading-relaxed font-semibold">
                    {language === "ar" ? field.description.ar : field.description.en}
                  </p>

                  {/* Curriculum topics list */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-brand-dark border-b border-brand-border pb-1.5 uppercase tracking-wide">
                      {language === "ar" ? "أهم المحاور التدريبية:" : "Key Learning Modules:"}
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(language === "ar" ? curricula.ar : curricula.en).map((topic, i) => (
                        <li key={i} className="flex gap-1.5 items-start text-xs text-brand-dark">
                          <Check className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
