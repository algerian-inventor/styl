"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, MapPin, Clock, Users, CheckCircle2, Ticket } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { FormField } from "@/components/ui/FormField";
import { MediaFallback } from "@/components/ui/MediaFallback";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function EventDetailPage({ params }: PageProps) {
  const { slug } = React.use(params);
  const { t, language } = useLanguage();
  const { events, submitEventRegistration } = usePrototypeState();
  const [imageError, setImageError] = useState(false);

  const [regSuccessRef, setRegSuccessRef] = useState<string | null>(null);
  const [participantName, setParticipantName] = useState("");

  const event = events.find((e) => e.slug === slug);

  // Form validation schema
  const registrationSchema = z.object({
    fullName: z.string().min(3, { message: "required" }),
    email: z.string().email({ message: "email" }),
    phone: z.string().regex(/^(05|06|07|02)[0-9]{8}$/, { message: "phone" }),
    wilaya: z.string().min(1, { message: "required" }),
    age: z
      .number()
      .min(10, { message: "age_min" })
      .max(100, { message: "age_max" }),
    educationProfession: z.string().min(1, { message: "required" }),
    motivation: z.string().min(5, { message: "required" }),
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

  const hasLocation = Boolean(event.location[language]);
  const hasCapacity = event.capacity > 0;

  const onSubmit = (data: RegFormValues) => {
    const ref = submitEventRegistration({
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
    <div className="w-full bg-[#F4F7FA]">
      {/* Page Hero */}
      <PageHero
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.events"), href: "/events" },
          { label: event.title[language] },
        ]}
        eyebrow={event.category}
        title={event.title[language]}
        description={event.summary[language]}
        badge={
          <span
            className={`text-xs font-bold px-3 py-1 rounded-md border ${
              event.isClosed
                ? "bg-slate-500/20 text-slate-300 border-slate-500/30"
                : "bg-brand-green/20 text-brand-green-accent border-brand-green/30"
            }`}
          >
            {event.isClosed ? (language === "ar" ? "مغلق" : "Closed") : (language === "ar" ? "مفتوح للتسجيل" : "Open for Registration")}
          </span>
        }
      />

      {/* Main Content Area */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Cover, Description, Speakers, Agenda (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Event Cover Image */}
              <div className="rounded-2xl overflow-hidden border border-[#DCE3EA] bg-white shadow-xs">
                {event.coverImage && !imageError ? (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={event.coverImage}
                      alt={event.title[language]}
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <MediaFallback
                    title={event.title[language]}
                    category={event.category}
                    aspectRatio="16/9"
                  />
                )}
              </div>

              {/* Event Detailed Description */}
              <div className="bg-white rounded-2xl p-8 border border-[#DCE3EA] shadow-xs space-y-6">
                <h3 className="text-lg sm:text-xl font-extrabold text-brand-dark border-b border-[#DCE3EA] pb-4">
                  {language === "ar" ? "تفاصيل وأهداف الفعالية" : "Event Overview & Description"}
                </h3>
                <p className="text-sm sm:text-base text-brand-dark leading-relaxed">
                  {event.description[language]}
                </p>
              </div>

              {/* Speakers / Mentors */}
              {event.speakers && event.speakers.length > 0 && (
                <div className="bg-white rounded-2xl p-8 border border-[#DCE3EA] shadow-xs space-y-6">
                  <div className="flex items-center gap-3 border-b border-[#DCE3EA] pb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-brand-dark">
                        {t("events.speakers")}
                      </h3>
                      <p className="text-xs text-brand-muted">
                        {language === "ar" ? "نخبة المؤطرين والأساتذة" : "Featured trainers and guests"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {event.speakers.map((speaker, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-[#DCE3EA]"
                      >
                        <div className="w-12 h-12 rounded-xl bg-[#062B55] text-brand-green-accent flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-xs">
                          {speaker.name.en.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-brand-dark text-sm">
                            {speaker.name[language]}
                          </h4>
                          <p className="text-xs text-brand-muted">
                            {speaker.role[language]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Event Schedule Agenda */}
              {event.program && event.program.length > 0 && (
                <div className="bg-white rounded-2xl p-8 border border-[#DCE3EA] shadow-xs space-y-6">
                  <div className="flex items-center gap-3 border-b border-[#DCE3EA] pb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy/10 flex items-center justify-center text-brand-navy">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-brand-dark">
                        {t("events.schedule")}
                      </h3>
                      <p className="text-xs text-brand-muted">
                        {language === "ar" ? "البرنامج الزمني للأنشطة" : "Detailed timeline of activities"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 border-r-2 border-[#DCE3EA] pr-6 rtl:border-r-2 rtl:pr-6 ltr:border-l-2 ltr:pl-6 ltr:border-r-0">
                    {event.program.map((step, idx) => (
                      <div key={idx} className="relative space-y-1">
                        <span className="absolute top-1.5 -right-[31px] rtl:-right-[31px] ltr:-left-[31px] w-3.5 h-3.5 bg-brand-green rounded-full border-2 border-white shadow-xs" />
                        <span className="text-xs font-mono font-bold text-brand-navy bg-brand-navy/5 px-2.5 py-0.5 rounded border border-brand-navy/10">
                          {step.time}
                        </span>
                        <p className="text-sm font-bold text-brand-dark pt-1">
                          {step.activity[language]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Registration Card Panel / Success Screen (4 cols) */}
            <div className="lg:col-span-4 sticky top-28 space-y-6">
              {regSuccessRef ? (
                /* Registration Success Confirmation Screen */
                <div className="bg-white rounded-2xl border-2 border-emerald-500/40 p-7 shadow-lg space-y-6 text-center">
                  <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-brand-dark">
                      {t("events.regSuccess")}
                    </h3>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      {language === "ar"
                        ? `شكراً لك يا ${participantName}، تم تسجيل طلبك بنجاح لحضور الفعالية.`
                        : `Thank you ${participantName}, your registration request has been submitted.`}
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-[#DCE3EA] rounded-xl p-4 space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      {t("events.regRef")}
                    </span>
                    <div className="text-base sm:text-lg font-black text-[#062B55] tracking-wider flex items-center justify-center gap-1.5">
                      <Ticket className="w-4 h-4 text-brand-green" />
                      <span>{regSuccessRef}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {t("events.regRefNote")}
                  </p>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setRegSuccessRef(null)}
                  >
                    {language === "ar" ? "تسجيل شخص آخر" : "Register another attendee"}
                  </Button>
                </div>
              ) : (
                /* Registration Form Panel */
                <div className="bg-white rounded-2xl border border-[#DCE3EA] p-6 sm:p-7 shadow-xs space-y-6">
                  {/* Event Quick Info */}
                  <div className="space-y-3 pb-5 border-b border-[#DCE3EA]">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {language === "ar" ? "الموعد والمكان" : "Schedule & Venue"}
                    </h4>
                    <ul className="space-y-2.5 text-xs text-brand-dark font-medium">
                      <li className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-brand-green flex-shrink-0" />
                        <span>{event.date}</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-brand-navy flex-shrink-0" />
                        <span>{event.time}</span>
                      </li>
                      {hasLocation && (
                        <li className="flex items-start gap-2.5">
                          <MapPin className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                          <span>{event.location[language]}</span>
                        </li>
                      )}
                      {hasCapacity && (
                        <li className="flex items-center gap-2.5">
                          <Users className="w-4 h-4 text-brand-navy flex-shrink-0" />
                          <span>
                            {t("events.capacity")}: {event.capacity} {language === "ar" ? "مقعد" : "Seats"}
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>

                  {event.isClosed ? (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
                      <p className="text-xs font-bold text-slate-600">
                        {language === "ar"
                          ? "عذراً، باب التسجيل مغلق حالياً لهذه الفعالية."
                          : "Registration is currently closed for this event."}
                      </p>
                      <Link href="/ansf" className="inline-block pt-1">
                        <Button variant="outline" size="sm">
                          {language === "ar" ? "تفاصيل ANSF" : "ANSF Details"}
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <h4 className="text-xs font-extrabold text-brand-dark uppercase tracking-wide">
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

                      <div className="grid grid-cols-2 gap-3">
                        <FormField label={t("forms.wilaya")} error={getErrorMessage(errors.wilaya?.message)} required>
                          <input type="text" {...register("wilaya")} placeholder="قسنطينة" />
                        </FormField>
                        <FormField label={t("forms.age")} error={getErrorMessage(errors.age?.message)} required>
                          <input type="number" {...register("age", { valueAsNumber: true })} placeholder="20" />
                        </FormField>
                      </div>

                      <FormField label={t("forms.educationProfession")} error={getErrorMessage(errors.educationProfession?.message)} required>
                        <input type="text" {...register("educationProfession")} placeholder="طالب جامعي / مهندس" />
                      </FormField>

                      <FormField label={t("forms.motivation")} error={getErrorMessage(errors.motivation?.message)} required>
                        <textarea {...register("motivation")} placeholder="سبب الرغبة في الحضور" rows={3} className="resize-none" />
                      </FormField>

                      <div className="flex gap-2 items-start text-xs text-brand-dark pt-1">
                        <input type="checkbox" id="consent" {...register("consent")} className="mt-1 cursor-pointer" />
                        <label htmlFor="consent" className="cursor-pointer select-none leading-relaxed text-slate-600">
                          {t("forms.consent")}
                        </label>
                      </div>
                      {errors.consent && (
                        <p className="text-xs text-red-500 font-medium">
                          {getErrorMessage(errors.consent.message)}
                        </p>
                      )}

                      <Button type="submit" variant="secondary" size="lg" className="w-full justify-center" isLoading={isSubmitting}>
                        {t("events.submitReg")}
                      </Button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
