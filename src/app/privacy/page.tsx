"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Eye, Lock, FileText } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/ui/Card";

export default function PrivacyPage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <SectionHeader
          title={language === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
          subtitle={language === "ar" ? "التزامنا بحماية بياناتكم الشخصية المنخرطة بالرابطة" : "Our commitment to protecting your personal data submitted to the league"}
        />
      </motion.div>

      {/* Main Text Cards */}
      <Card className="bg-white border border-brand-border p-8 shadow-xs space-y-8 text-brand-dark">
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-extrabold text-brand-navy flex items-center gap-2 border-b border-brand-border pb-2">
            <Eye className="h-5 w-5 text-brand-green" />
            {language === "ar" ? "1. البيانات التي نجمعها" : "1. Data Collection"}
          </h3>
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-semibold">
            {language === "ar"
              ? "نقوم بجمع البيانات الشخصية التي تقدمها طواعية عند ملء استمارة طلب الانضمام أو التسجيل في إحدى الفعاليات. تشمل هذه البيانات: الاسم الكامل، تاريخ الميلاد، البريد الإلكتروني، رقم الهاتف، ولاية الإقامة، المستوى التعليمي، والاهتمامات العلمية."
              : "We collect personal data you voluntarily provide when submitting membership requests or registering for events. This includes: full name, date of birth, email, phone number, province of residence, education level, and scientific interests."}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-extrabold text-brand-navy flex items-center gap-2 border-b border-brand-border pb-2">
            <FileText className="h-5 w-5 text-brand-green" />
            {language === "ar" ? "2. كيف نستخدم بياناتكم" : "2. How We Use Data"}
          </h3>
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-semibold">
            {language === "ar"
              ? "نستخدم هذه المعلومات حصرياً للأغراض التنظيمية للرابطة، بما في ذلك: دراسة طلبات العضوية من قبل اللجنة العلمية، حجز مقاعد الفعاليات، إرسال تأكيدات الحضور وتنبيهات الأنشطة التكوينية، والتواصل المباشر لإجراء المقابلات التقنية."
              : "We use this information strictly for league administrative purposes, including: evaluating applications by the scientific committee, reserving event seats, sending attendance confirmations, and contacting you for technical evaluations."}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-extrabold text-brand-navy flex items-center gap-2 border-b border-brand-border pb-2">
            <Lock className="h-5 w-5 text-brand-green" />
            {language === "ar" ? "3. أمن البيانات وحمايتها" : "3. Data Security"}
          </h3>
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-semibold">
            {language === "ar"
              ? "نلتزم باتخاذ كافة الإجراءات والتدابير التقنية المناسبة لحماية بياناتكم الشخصية ضد الفقدان أو التعديل أو الوصول غير المصرح به. لا نقوم بمشاركة أي بيانات شخصية مع جهات خارجية أو استخدامها لأغراض تجارية بأي حال من الأحوال."
              : "We implement technical measures to safeguard your data against loss, misuse, or unauthorized access. We do not share personal records with third parties or use them for commercial marketing under any circumstances."}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-extrabold text-brand-navy flex items-center gap-2 border-b border-brand-border pb-2">
            <ShieldAlert className="h-5 w-5 text-brand-green" />
            {language === "ar" ? "4. تعديل البيانات والمسح" : "4. Data Updates & Erasure"}
          </h3>
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-semibold">
            {language === "ar"
              ? "يحق لكم في أي وقت مراجعة بياناتكم المخزنة لدينا أو تعديلها أو طلب مسحها نهائياً من سجلات الرابطة عبر مراسلتنا مباشرة على البريد الإلكتروني الرسمي: contact@stly.dz"
              : "You have the right to inspect, edit, or request complete removal of your personal data from our databases at any time by contacting us directly at contact@stly.dz"}
          </p>
        </div>
      </Card>
    </div>
  );
}
