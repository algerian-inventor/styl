"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown, ChevronUp, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/Card";
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
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // FAQ items list
  const faqs: FAQItem[] = [
    {
      q: { ar: "ما هي شروط الانضمام للرابطة؟", en: "What are the rules to join the league?" },
      a: { ar: "أن يكون عمرك بين 15 و 35 سنة، وأن تكون مهتماً بمجال علمي أو تقني، وتلتزم بالحضور والمشاركة في مشاريع الرابطة.", en: "You must be aged 15-35, have a passion for science or technology, and commit to participating in league projects." }
    },
    {
      q: { ar: "هل الورشات والنوادي التكوينية مجانية؟", en: "Are the workshops and clubs free of charge?" },
      a: { ar: "نعم، كافة ورشات الرابطة وأنشطتها مجانية وممولة بالكامل لفائدة المبتكرين المقبولين.", en: "Yes, all STLY workshops and activities are completely free for accepted members." }
    },
    {
      q: { ar: "أين يقع مقر الرابطة؟", en: "Where is the STLY headquarters located?" },
      a: { ar: "يقع مقر الرابطة بوسط مدينة قسنطينة، حي سيدي مبروك السفلي، بالقرب من محطة الحافلات.", en: "STLY is located in downtown Constantine, Sidi Mabrouk El Sifli, close to the bus terminal." }
    },
    {
      q: { ar: "كيف يمكن للمؤسسات والشركات التعاون معكم؟", en: "How can businesses and organizations collaborate with you?" },
      a: { ar: "يسعدنا جداً التعاون العلمي والأكاديمي. يرجى مراسلتنا عبر البريد الإلكتروني المخصص للشركاء: partners@stly.dz أو ملء استمارة الاتصال وسيتواصل معكم مسؤول العلاقات الخارجية.", en: "We welcome scientific cooperation. Please email us at partners@stly.dz or fill out this contact form and our relationships officer will contact you." }
    }
  ];

  // Validation Schema
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

  const onSubmit = async (data: ContactFormValues) => {
    const success = await submitContactMessage({
      fullName: data.fullName,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });
    if (success) {
      setIsMessageSent(true);
      reset();
    }
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <SectionHeader
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
        />
      </motion.div>

      {/* Info & Form grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Coordinates & Simulated Map */}
        <div className="space-y-8">
          <div className="bg-white border border-brand-border rounded-xl p-6 shadow-xs space-y-6">
            <h3 className="text-base font-bold text-brand-dark border-b border-brand-border pb-3 uppercase tracking-wider">
              {t("contact.infoTitle")}
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3 items-center text-xs">
                <span className="p-2.5 rounded-lg bg-brand-bg text-brand-navy border border-brand-border flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h5 className="font-extrabold text-brand-dark">{language === "ar" ? "العنوان" : "Address"}</h5>
                  <p className="text-brand-muted">{language === "ar" ? siteSettings.addressAr : siteSettings.addressEn}</p>
                </div>
              </div>

              <div className="flex gap-3 items-center text-xs">
                <span className="p-2.5 rounded-lg bg-brand-bg text-brand-navy border border-brand-border flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <h5 className="font-extrabold text-brand-dark">{t("contact.phone")}</h5>
                  <p className="text-brand-muted">{siteSettings.phone}</p>
                </div>
              </div>

              <div className="flex gap-3 items-center text-xs">
                <span className="p-2.5 rounded-lg bg-brand-bg text-brand-navy border border-brand-border flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <h5 className="font-extrabold text-brand-dark">{t("contact.email")}</h5>
                  <p className="text-brand-muted">{siteSettings.email}</p>
                </div>
              </div>

              <div className="flex gap-3 items-center text-xs">
                <span className="p-2.5 rounded-lg bg-brand-bg text-brand-navy border border-brand-border flex-shrink-0">
                  <Globe className="h-5 w-5" />
                </span>
                <div>
                  <h5 className="font-extrabold text-brand-dark">{t("contact.hours")}</h5>
                  <p className="text-brand-muted">{t("contact.hoursVal")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Simulated Scientific Map */}
          <div className="h-64 bg-brand-navy text-white rounded-xl border border-brand-border flex flex-col items-center justify-center p-6 text-center bg-sci-grid relative overflow-hidden shadow-xs">
            <div className="absolute inset-0 bg-brand-navy/55 pointer-events-none" />
            <div className="relative z-10 space-y-3">
              <MapPin className="h-10 w-10 text-brand-green mx-auto animate-bounce" />
              <h4 className="font-extrabold text-sm text-white">
                {language === "ar" ? "خريطة المقر الجغرافي" : "Geographical Headquarters Map"}
              </h4>
              <p className="text-[10px] text-slate-300 max-w-xs leading-relaxed mx-auto">
                {language === "ar" ? "قسنطينة، الجزائر (سيتم تحميل خريطة تفاعلية في النسخة النهائية)" : "Constantine, Algeria (An interactive map loader will connect in production)"}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact form / Success Message */}
        <div>
          {isMessageSent ? (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="border border-green-200 bg-green-50/50 p-8 text-center space-y-6 shadow-md">
                <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-green-800">{language === "ar" ? "تم الإرسال بنجاح!" : "Sent Successfully!"}</h3>
                  <p className="text-xs sm:text-sm text-brand-dark leading-relaxed font-medium">
                    {t("contact.successMsg")}
                  </p>
                </div>
                <Button variant="outline" className="w-full bg-white border-green-200 hover:bg-green-100/50" onClick={() => setIsMessageSent(false)}>
                  {language === "ar" ? "إرسال رسالة أخرى" : "Send another message"}
                </Button>
              </Card>
            </motion.div>
          ) : (
            <Card className="bg-white border border-brand-border p-8 shadow-xs">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <h3 className="text-lg font-bold text-brand-dark border-b border-brand-border pb-3 uppercase tracking-wider">
                  {t("contact.formTitle")}
                </h3>

                <FormField label={t("forms.fullName")} error={getErrorMessage(errors.fullName?.message)} required>
                  <input type="text" {...register("fullName")} placeholder="سليم بن يحيى" />
                </FormField>

                <FormField label={t("forms.email")} error={getErrorMessage(errors.email?.message)} required>
                  <input type="email" {...register("email")} placeholder="selim@outlook.com" />
                </FormField>

                <FormField label={t("contact.subject")} error={getErrorMessage(errors.subject?.message)} required>
                  <input type="text" {...register("subject")} placeholder="طلب تعاون تكنولوجي" />
                </FormField>

                <FormField label={t("contact.message")} error={getErrorMessage(errors.message?.message)} required>
                  <textarea
                    {...register("message")}
                    placeholder={language === "ar" ? "أكتب رسالتك بالتفصيل هنا..." : "Write your message here..."}
                    rows={4}
                    className="resize-none"
                  />
                </FormField>

                <Button type="submit" variant="secondary" className="w-full font-bold" isLoading={isSubmitting} leftIcon={<Send className="h-4 w-4" />}>
                  {t("contact.send")}
                </Button>
              </form>
            </Card>
          )}
        </div>
      </div>

      {/* Accordion FAQs */}
      <section className="space-y-8 bg-brand-bg/50 border border-brand-border rounded-2xl p-8 shadow-inner">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-xl sm:text-2xl font-extrabold text-brand-dark">
            {t("contact.faqTitle")}
          </h3>
          <p className="text-xs text-brand-muted">
            {t("contact.faqSubtitle")}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div key={idx} className="bg-white border border-brand-border rounded-lg overflow-hidden transition-all shadow-xs">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-start text-brand-dark hover:bg-brand-bg/30 font-bold text-xs sm:text-sm cursor-pointer"
                >
                  <span>{language === "ar" ? faq.q.ar : faq.q.en}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-brand-green flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-brand-navy flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 py-4 border-t border-brand-border text-xs text-brand-muted leading-relaxed font-semibold">
                    {language === "ar" ? faq.a.ar : faq.a.en}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
