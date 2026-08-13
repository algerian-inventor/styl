"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown, ChevronUp, Clock, Building2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

interface FAQItem {
  q: { ar: string; en: string };
  a: { ar: string; en: string };
}

export default function ContactPage() {
  const { t, language } = useLanguage();
  const { submitContactMessage, siteSettings } = usePrototypeState();

  const [isMessageSent, setIsMessageSent] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: { ar: "ما هي شروط الانضمام للرابطة؟", en: "What are the eligibility criteria to join?" },
      a: {
        ar: "أن يتراوح عمر المترشح بين 15 و 35 سنة، مع وجود شغف أو اختصاص في العلوم الدقيقة، البرمجة، الإلكترونيات، أو الروبوتيك، والالتزام بالحضور والمشاركة الإيجابية في أنشطة الرابطة.",
        en: "Applicants should be between 15 and 35 years old, enthusiastic about exact sciences, programming, electronics, or robotics, and committed to active participation in workshops.",
      },
    },
    {
      q: { ar: "هل الورشات والنوادي التكوينية مجانية؟", en: "Are training workshops and clubs free?" },
      a: {
        ar: "نعم، كافة برامج الرابطة التكوينية ومعدات المخابر مجانية وممولة بالكامل لفائدة الشباب المبدعين المقبولين.",
        en: "Yes, all STLY training tracks, workshops, and lab facilities are fully sponsored and free for accepted members.",
      },
    },
    {
      q: { ar: "أين يقع مقر الرابطة وكيف يمكن زيارتكم؟", en: "Where is STLY located and how to visit?" },
      a: {
        ar: "يقع مقر الرابطة بوسط مدينة قسنطينة، بالقرب من المنشآت الجامعية وحي سيدي مبروك. نرحب بالزيارات خلال أوقات العمل الرسمية.",
        en: "Our headquarters is situated in downtown Constantine, near academic institutions. Visitors are welcome during official working hours.",
      },
    },
    {
      q: { ar: "كيف يمكن للمؤسسات والشركات التعاون مع الرابطة؟", en: "How can academic and industrial institutions collaborate with STLY?" },
      a: {
        ar: "نرحب بالشراكات الأكاديمية والمؤسساتية. يرجى التواصل معنا عبر استمارة الاتصال أو مراسلة إدارة العلاقات الخارجية مباشرة.",
        en: "We welcome partnerships with universities and tech companies. Please contact us via this form or email our external relations office directly.",
      },
    },
  ];

  const contactSchema = z.object({
    fullName: z.string().min(3, { message: "required" }),
    email: z.string().email({ message: "email" }),
    subject: z.string().min(3, { message: "required" }),
    message: z.string().min(10, { message: "required" }),
  });

  type ContactFormValues = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    submitContactMessage({
      fullName: data.fullName,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });
    setIsMessageSent(true);
    reset();
  };

  const getErrorMessage = (errorKey?: string) => {
    if (!errorKey) return undefined;
    if (errorKey === "required") return t("forms.required");
    if (errorKey === "email") return t("forms.invalidEmail");
    return errorKey;
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div className="w-full bg-[#F4F7FA]">
      {/* Page Hero */}
      <PageHero
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.contact") },
        ]}
        eyebrow={language === "ar" ? "قنوات التواصل" : "Contact Channels"}
        title={t("contact.title")}
        description={t("contact.subtitle")}
      />

      {/* Main Contact Section */}
      <section className="py-16 sm:py-20">
        <Container className="space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Coordinates & Static Location Panel (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Official Coordinates Card */}
              <div className="bg-white rounded-2xl p-7 border border-[#DCE3EA] shadow-xs space-y-6">
                <h3 className="text-base font-extrabold text-brand-dark border-b border-[#DCE3EA] pb-3 uppercase tracking-wider">
                  {t("contact.infoTitle")}
                </h3>

                <div className="space-y-5 text-xs sm:text-sm">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy/5 text-brand-navy border border-brand-navy/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-brand-green" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-extrabold text-brand-dark">{language === "ar" ? "المقر الرئيسي" : "Headquarters"}</h5>
                      <p className="text-brand-muted leading-relaxed">
                        {language === "ar" ? siteSettings.addressAr : siteSettings.addressEn}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy/5 text-brand-navy border border-brand-navy/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-brand-green" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-extrabold text-brand-dark">{t("contact.phone")}</h5>
                      <p className="text-brand-muted font-mono" dir="ltr">{siteSettings.phone}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy/5 text-brand-navy border border-brand-navy/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-brand-green" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-extrabold text-brand-dark">{t("contact.email")}</h5>
                      <p className="text-brand-muted">{siteSettings.email}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy/5 text-brand-navy border border-brand-navy/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-brand-green" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-extrabold text-brand-dark">{t("contact.hours")}</h5>
                      <p className="text-brand-muted">{t("contact.hoursVal")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Static Institutional Location Panel (No fake map) */}
              <div className="bg-[#062B55] text-white rounded-2xl border border-white/10 p-7 shadow-xs space-y-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-sci-grid-dark opacity-35 pointer-events-none" />
                <div className="relative z-10 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/20 border border-brand-green/30 flex items-center justify-center text-brand-green-accent">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-base text-white">
                    {language === "ar" ? "موقع المقر والتوجيه" : "Location & Directions"}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {language === "ar"
                      ? "يتواجد مقر الرابطة بقلب مدينة قسنطينة بالقرب من المرافق الحيوية ومحطات النقل لضمان سهولة وصول الطلبة والشباب من مختلف بلديات الولاية."
                      : "Located in central Constantine with direct access to public transit, ensuring accessible connectivity for students across all municipalities."}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              {isMessageSent ? (
                /* Success Feedback */
                <div className="bg-white rounded-2xl border-2 border-emerald-500/40 p-8 sm:p-10 shadow-lg text-center space-y-6">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-brand-dark">
                      {language === "ar" ? "تم إرسال رسالتك بنجاح!" : "Message Sent Successfully!"}
                    </h3>
                    <p className="text-sm text-brand-muted leading-relaxed">
                      {t("contact.successMsg")}
                    </p>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => setIsMessageSent(false)}>
                    {language === "ar" ? "إرسال رسالة أخرى" : "Send another message"}
                  </Button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-[#DCE3EA] p-7 sm:p-9 shadow-xs space-y-6">
                  <div className="border-b border-[#DCE3EA] pb-4 space-y-1">
                    <h3 className="text-xl font-extrabold text-brand-dark">
                      {t("contact.formTitle")}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-muted">
                      {language === "ar"
                        ? "راسلنا للاستفسارات العامة، الاقتراحات، أو طلبات الشراكة"
                        : "Reach out for general inquiries, suggestions, or partnership requests"}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <FormField label={t("forms.fullName")} error={getErrorMessage(errors.fullName?.message)} required>
                      <input type="text" {...register("fullName")} placeholder="سليم بن يحيى" />
                    </FormField>

                    <FormField label={t("forms.email")} error={getErrorMessage(errors.email?.message)} required>
                      <input type="email" {...register("email")} placeholder="selim@outlook.com" />
                    </FormField>

                    <FormField label={t("contact.subject")} error={getErrorMessage(errors.subject?.message)} required>
                      <input type="text" {...register("subject")} placeholder="استفسار بخصوص نوادي الروبوتيك" />
                    </FormField>

                    <FormField label={t("contact.message")} error={getErrorMessage(errors.message?.message)} required>
                      <textarea
                        {...register("message")}
                        placeholder={language === "ar" ? "أكتب تفاصيل رسالتك هنا..." : "Write your message details here..."}
                        rows={4}
                        className="resize-none"
                      />
                    </FormField>

                    <Button
                      type="submit"
                      variant="secondary"
                      size="lg"
                      className="w-full justify-center gap-2"
                      isLoading={isSubmitting}
                    >
                      <Send className="w-4 h-4" />
                      <span>{t("contact.send")}</span>
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Accordion FAQ Section */}
          <div className="pt-8 border-t border-[#DCE3EA] space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-extrabold text-brand-green uppercase tracking-widest">
                {language === "ar" ? "الأسئلة الشائعة" : "FAQ"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
                {t("contact.faqTitle")}
              </h2>
              <p className="text-sm text-brand-muted">
                {t("contact.faqSubtitle")}
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-[#DCE3EA] rounded-xl overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-6 py-4 flex items-center justify-between text-start text-brand-dark hover:bg-slate-50 font-bold text-sm sm:text-base cursor-pointer gap-4"
                    >
                      <span>{faq.q[language]}</span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-brand-green flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-6 py-4 border-t border-[#DCE3EA] text-xs sm:text-sm text-brand-muted leading-relaxed font-medium bg-slate-50/50">
                        {faq.a[language]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
