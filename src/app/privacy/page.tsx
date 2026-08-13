"use client";

import React from "react";
import { Eye, FileText, Lock, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export default function PrivacyPage() {
  const { t, language } = useLanguage();

  return (
    <div className="w-full bg-[#F4F7FA]">
      {/* Page Hero */}
      <PageHero
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: language === "ar" ? "سياسة الخصوصية" : "Privacy Policy" },
        ]}
        eyebrow={language === "ar" ? "الالتزام القانوني والتنظيمي" : "Legal & Compliance"}
        title={language === "ar" ? "سياسة الخصوصية وحماية البيانات" : "Privacy & Data Protection Policy"}
        description={
          language === "ar"
            ? "التزامنا الصارم بحماية وسرية البيانات الشخصية لمنتسبي الرابطة ورواد الفعاليات"
            : "Our commitment to protecting the privacy and personal data of members and event attendees"
        }
      />

      {/* Main Policy Content Container */}
      <section className="py-16 sm:py-20">
        <Container size="narrow">
          <div className="bg-white rounded-2xl border border-[#DCE3EA] p-8 sm:p-12 shadow-xs space-y-10">
            {/* Section 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b border-[#DCE3EA] pb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green">
                  <Eye className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-brand-dark">
                  {language === "ar" ? "1. البيانات التي يتم جمعها" : "1. Data Collection"}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                {language === "ar"
                  ? "نقوم بجمع البيانات الشخصية الضرورية التي يقدمها المترشح طواعية عند ملء استمارة طلب الانضمام أو التسجيل في فعاليات وورشات الرابطة. تشمل هذه البيانات: الاسم الكامل، تاريخ الميلاد، البريد الإلكتروني، رقم الهاتف، ولاية الإقامة، المستوى التعليمي، والاهتمامات التقنية."
                  : "We collect personal data you voluntarily provide when submitting membership requests or registering for events. This includes: full name, date of birth, email, phone number, province of residence, education level, and scientific interests."}
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b border-[#DCE3EA] pb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-brand-dark">
                  {language === "ar" ? "2. الغرض من معالجة البيانات" : "2. Purpose of Data Processing"}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                {language === "ar"
                  ? "تُستخدم البيانات المدخلة حصرياً للأغراض التنظيمية والأكاديمية للرابطة، بما في ذلك: دراسة طلبات الانضمام من طرف اللجنة العلمية، حجز مقاعد الفعاليات وإرسال أرقام المراجع، وتوجيه الإشعارات الخاصة بمواعيد الورشات التدريبية."
                  : "We use this information strictly for league administrative purposes, including: evaluating applications by the scientific committee, reserving event seats, sending attendance confirmations, and contacting you for technical evaluations."}
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b border-[#DCE3EA] pb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green">
                  <Lock className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-brand-dark">
                  {language === "ar" ? "3. سرية البيانات والأمن" : "3. Confidentiality & Security"}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                {language === "ar"
                  ? "نلتزم باتخاذ المعايير التقنية والتنظيمية اللازمة لحماية بياناتكم من الوصول غير المصرح به أو الفقدان. لا نقوم إطلاقاً ببيع أو مشاركة بيانات المنتسبين مع أي جهات خارجية لأغراض تجارية أو إعلانية."
                  : "We implement technical measures to safeguard your data against loss, misuse, or unauthorized access. We do not share personal records with third parties or use them for commercial marketing under any circumstances."}
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b border-[#DCE3EA] pb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-brand-dark">
                  {language === "ar" ? "4. حقوق المستخدم والتعديل" : "4. Rights & Modifications"}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                {language === "ar"
                  ? "يحق لكل منخرط أو مسجل طلب مراجعة بياناته أو تعديلها أو مسحها نهائياً من سجلات الرابطة عبر مراسلة الأمانة العامة مباشرة عبر البريد الإلكتروني الرسمي."
                  : "You have the right to inspect, edit, or request complete removal of your personal data from our databases at any time by contacting us directly."}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
