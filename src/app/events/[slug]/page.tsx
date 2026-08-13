"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, ArrowLeft, ArrowRight, CheckCircle2, Ticket } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { FormField } from "@/components/ui/FormField";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function EventDetailPage({ params }: PageProps) {
  const { slug } = React.use(params);
  const { t, language, dir } = useLanguage();
  const { events, submitEventRegistration } = usePrototypeState();

  const [regSuccessRef, setRegSuccessRef] = useState<string | null>(null);
  const [participantName, setParticipantName] = useState("");

  const isRtl = dir === "rtl";
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  const event = events.find((e) => e.slug === slug);

  // Form schema using Zod
  const registrationSchema = z.object({
    fullName: z.string().min(3, { message: "required" }),
    email: z.string().email({ message: "email" }),
    phone: z.string().regex(/^(05|06|07|02)[0-9]{8}$/, { message: "phone" }),
    wilaya: z.string().min(1, { message: "required" }),
    age: z.number()
        .min(15, { message: "age_min" })
        .max(35, { message: "age_max" }),
    educationProfession: z.string().min(1, { message: "required" }),
    motivation: z.string().min(10, { message: "required" }),
    consent: z.literal(true, { message: "consent" }),
  });

  type RegFormValues = z.infer<typeof registrationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      wilaya: "",
      educationProfession: "",
      motivation: "",
      consent: false as unknown as true,
    },
  });

  if (!event) {
    notFound();
  }

  const onSubmit = async (data: RegFormValues) => {
    // Submit registration to Supabase data layer via state context
    const ref = await submitEventRegistration({
      eventId: event.id,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      wilaya: data.wilaya,
      age: data.age,
      educationProfession: data.educationProfession,
      motivation: data.motivation,
    });
    setParticipantName(data.fullName);
    setRegSuccessRef(ref);
    reset();
  };

  const getErrorMessage = (errorKey?: string) => {
    if (!errorKey) return undefined;
    if (errorKey === "required") return t("forms.required");
    if (errorKey === "email") return t("forms.invalidEmail");
    if (errorKey === "phone") return t("forms.invalidPhone");
    if (errorKey === "age_min") return t("forms.minAge");
    if (errorKey === "age_max") return t("forms.maxAge");
    if (errorKey === "consent") return t("forms.consentRequired");
    return errorKey;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Back button */}
      <div>
        <Link href="/events">
          <Button variant="ghost" size="sm" leftIcon={<BackIcon className="h-4 w-4" />}>
            {t("nav.events")}
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Left Column: Event details */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant={event.isClosed ? "danger" : "success"}>
                {event.isClosed ? language === "ar" ? "مغلق" : "Closed" : language === "ar" ? "مفتوح للتسجيل" : "Open for Reg."}
              </Badge>
              <span className="text-xs font-bold text-brand-navy bg-brand-navy/5 border border-brand-navy/10 px-2 py-0.5 rounded uppercase tracking-wider">
                {event.category}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-brand-dark leading-tight">
              {language === "ar" ? event.title.ar : event.title.en}
            </h1>

            <p className="text-base font-semibold leading-relaxed text-brand-dark">
              {language === "ar" ? event.summary.ar : event.summary.en}
            </p>

            <div className="h-[1px] bg-brand-border" />

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-brand-dark">{language === "ar" ? "وصف الفعالية" : "Event Description"}</h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                {language === "ar" ? event.description.ar : event.description.en}
              </p>
            </div>

            {/* Speakers */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2">
                  <Users className="h-5 w-5 text-brand-green" />
                  {t("events.speakers")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {event.speakers.map((speaker, idx) => (
                    <div key={idx} className="flex gap-3 items-center bg-white border border-brand-border p-4 rounded-lg shadow-xs">
                      {/* Avatar placeholder */}
                      <div className="h-12 w-12 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-sm border border-brand-green">
                        {speaker.name.en.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-brand-dark text-xs sm:text-sm">
                          {language === "ar" ? speaker.name.ar : speaker.name.en}
                        </h4>
                        <p className="text-[10px] sm:text-xs text-brand-muted">
                          {language === "ar" ? speaker.role.ar : speaker.role.en}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Event Agenda */}
            {event.program && event.program.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-bold text-brand-dark">{t("events.schedule")}</h3>
                <div className="border-r border-brand-border pr-6 relative space-y-6 rtl:border-r rtl:pr-6 rtl:border-l-0 ltr:border-l ltr:pl-6 ltr:border-r-0">
                  {event.program.map((step, idx) => (
                    <div key={idx} className="relative">
                      {/* Timeline dot */}
                      <span className="absolute top-1.5 -right-[31px] rtl:-right-[31px] ltr:-left-[31px] h-3 w-3 bg-brand-green border-2 border-white rounded-full" />
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold text-brand-navy bg-brand-navy/5 px-2 py-0.5 rounded border border-brand-navy/10">
                          {step.time}
                        </span>
                        <p className="text-xs font-semibold text-brand-dark pt-1">
                          {language === "ar" ? step.activity.ar : step.activity.en}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column: Registration Card Panel / Success Card */}
        <div className="lg:col-span-1">
          {regSuccessRef ? (
            /* Registration Success Confirmation Screen */
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="border border-green-200 bg-green-50/50 p-6 space-y-6 text-center shadow-md">
                <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-green-800">{t("events.regSuccess")}</h3>
                  <p className="text-xs text-brand-dark leading-relaxed">
                    {language === "ar"
                      ? `شكراً لك يا ${participantName}، لقد تم حجز مقعدك بنجاح في الفعالية.`
                      : `Thank you ${participantName}, your seat has been reserved successfully.`}
                  </p>
                </div>

                <div className="bg-white border border-green-200 rounded-lg p-4 space-y-2 shadow-xs">
                  <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block">
                    {t("events.regRef")}
                  </span>
                  <div className="text-lg font-extrabold text-brand-navy tracking-widest flex items-center justify-center gap-1.5">
                    <Ticket className="h-5 w-5 text-brand-green" />
                    {regSuccessRef}
                  </div>
                </div>

                <p className="text-[10px] text-brand-muted leading-relaxed">
                  {t("events.regRefNote")}
                </p>

                <Button variant="outline" className="w-full bg-white border-green-200 hover:bg-green-100/50" onClick={() => setRegSuccessRef(null)}>
                  {language === "ar" ? "تسجيل شخص آخر" : "Register another person"}
                </Button>
              </Card>
            </motion.div>
          ) : (
            /* Registration Form Panel */
            <Card className="sticky top-24 bg-white border border-brand-border p-6 shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-bold text-brand-dark border-b border-brand-border pb-3 uppercase tracking-wider">
                  {language === "ar" ? "بيانات الفعالية" : "Event details"}
                </h3>
                <ul className="space-y-3 mt-4 text-xs text-brand-muted">
                  <li className="flex gap-2.5 items-center">
                    <Calendar className="h-4 w-4 text-brand-navy flex-shrink-0" />
                    <span>{event.date}</span>
                  </li>
                  <li className="flex gap-2.5 items-center">
                    <Clock className="h-4 w-4 text-brand-navy flex-shrink-0" />
                    <span>{event.time}</span>
                  </li>
                  <li className="flex gap-2.5 items-start">
                    <MapPin className="h-4 w-4 text-brand-navy flex-shrink-0 mt-0.5" />
                    <span>{language === "ar" ? event.location.ar : event.location.en}</span>
                  </li>
                  <li className="flex gap-2.5 items-center">
                    <Users className="h-4 w-4 text-brand-navy flex-shrink-0" />
                    <span>
                      {t("events.capacity")}: {event.capacity} {language === "ar" ? "مقعد" : "Seats"}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="h-[1px] bg-brand-border" />

              {event.isClosed ? (
                /* Registration closed */
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-4 rounded-lg text-center font-bold">
                  {language === "ar"
                    ? "عذراً، باب التسجيل مغلق حالياً لهذه الفعالية."
                    : "Sorry, registration is currently closed for this event."}
                </div>
              ) : (
                /* Form fields */
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wide">
                    {t("events.regTitle")}
                  </h4>

                  <FormField label={t("forms.fullName")} error={getErrorMessage(errors.fullName?.message)} required>
                    <input type="text" {...register("fullName")} placeholder="احمد بوعلي" />
                  </FormField>

                  <FormField label={t("forms.email")} error={getErrorMessage(errors.email?.message)} required>
                    <input type="email" {...register("email")} placeholder="ahmed@gmail.com" />
                  </FormField>

                  <FormField label={t("forms.phone")} error={getErrorMessage(errors.phone?.message)} required>
                    <input type="tel" {...register("phone")} placeholder="0661234567" />
                  </FormField>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField label={t("forms.wilaya")} error={getErrorMessage(errors.wilaya?.message)} required>
                      <input type="text" {...register("wilaya")} placeholder="قسنطينة" />
                    </FormField>
                    <FormField label={t("forms.age")} error={getErrorMessage(errors.age?.message)} required>
                      <input type="number" {...register("age", { valueAsNumber: true })} placeholder="20" />
                    </FormField>
                  </div>

                  <FormField label={t("forms.educationProfession")} error={getErrorMessage(errors.educationProfession?.message)} required>
                    <input type="text" {...register("educationProfession")} placeholder="طالب جامعة" />
                  </FormField>

                  <FormField label={t("forms.motivation")} error={getErrorMessage(errors.motivation?.message)} required>
                    <textarea {...register("motivation")} placeholder="لماذا ترغب بالحضور؟ (10 حروف على الأقل)" rows={3} className="resize-none" />
                  </FormField>

                  <div className="flex gap-2 items-start text-xs text-brand-dark pt-1">
                    <input type="checkbox" id="consent" {...register("consent")} className="mt-1 cursor-pointer" />
                    <label htmlFor="consent" className="cursor-pointer select-none leading-relaxed">
                      {t("forms.consent")}
                    </label>
                  </div>
                  {errors.consent && <p className="text-xs text-red-500">{getErrorMessage(errors.consent.message)}</p>}

                  <Button type="submit" variant="secondary" className="w-full" isLoading={isSubmitting}>
                    {t("events.submitReg")}
                  </Button>
                </form>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
