"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, Info, UserPlus, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

export default function MembershipPage() {
  const { t, language } = useLanguage();
  const { submitMembershipApplication } = usePrototypeState();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const interestOptions = [
    t("fields.science"),
    t("fields.tech"),
    t("fields.engineering"),
    t("fields.electronics"),
    t("fields.ai"),
    t("fields.robotics"),
    t("fields.chemistry"),
    t("fields.innovation"),
  ];

  // Validation Schema using Zod
  const membershipSchema = z.object({
    fullName: z.string().min(3, { message: "required" }),
    dob: z.string().min(1, { message: "required" }),
    wilaya: z.string().min(1, { message: "required" }),
    municipality: z.string().min(1, { message: "required" }),
    email: z.string().email({ message: "email" }),
    phone: z.string().regex(/^(05|06|07|02)[0-9]{8}$/, { message: "phone" }),
    educationProfession: z.string().min(1, { message: "required" }),
    interests: z.array(z.string()).min(1, { message: "interests" }),
    skills: z.string().min(5, { message: "required" }),
    motivation: z.string().min(10, { message: "required" }),
    portfolio: z.string().optional(),
    consent: z.literal(true, { message: "consent" }),
  });

  type MembershipFormValues = z.infer<typeof membershipSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MembershipFormValues>({
    resolver: zodResolver(membershipSchema),
    defaultValues: {
      fullName: "",
      dob: "",
      wilaya: "",
      municipality: "",
      email: "",
      phone: "",
      educationProfession: "",
      interests: [],
      skills: "",
      motivation: "",
      portfolio: "",
      consent: false as unknown as true,
    },
  });

  const selectedInterests = watch("interests") || [];

  const handleInterestToggle = (interest: string) => {
    const current = [...selectedInterests];
    const idx = current.indexOf(interest);
    if (idx > -1) {
      current.splice(idx, 1);
    } else {
      current.push(interest);
    }
    setValue("interests", current, { shouldValidate: true });
  };

  const getErrorMessage = (errorKey?: string) => {
    if (!errorKey) return undefined;
    if (errorKey === "required") return t("forms.required");
    if (errorKey === "email") return t("forms.invalidEmail");
    if (errorKey === "phone") return t("forms.invalidPhone");
    if (errorKey === "consent") return t("forms.consentRequired");
    if (errorKey === "interests") return language === "ar" ? "يرجى تحديد اهتمام واحد على الأقل" : "Select at least one interest";
    return errorKey;
  };

  const onSubmit = (data: MembershipFormValues) => {
    submitMembershipApplication({
      fullName: data.fullName,
      dob: data.dob,
      wilaya: data.wilaya,
      municipality: data.municipality,
      email: data.email,
      phone: data.phone,
      educationProfession: data.educationProfession,
      scientificInterests: data.interests,
      skills: data.skills,
      motivation: data.motivation,
      portfolio: data.portfolio,
    });
    setIsSubmitted(true);
    reset();
  };

  return (
    <div className="w-full bg-[#F4F7FA]">
      {/* Page Hero */}
      <PageHero
        breadcrumbs={[
          { label: t("nav.home"), href: "/" },
          { label: t("nav.membership") },
        ]}
        eyebrow={language === "ar" ? "الانخراط والتطوع" : "Join the Community"}
        title={t("membership.title")}
        description={t("membership.subtitle")}
      />

      {/* Form & Benefits Section */}
      <section className="py-16 sm:py-20">
        <Container>
          {isSubmitted ? (
            /* Success Confirmation Screen */
            <div className="max-w-xl mx-auto bg-white rounded-2xl border-2 border-emerald-500/40 p-8 sm:p-10 shadow-lg space-y-6 text-center">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-brand-dark">
                  {t("membership.appSuccess")}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {t("membership.appSuccessDesc")}
                </p>
              </div>

              <div className="pt-4 border-t border-[#DCE3EA]">
                <Button variant="primary" onClick={() => setIsSubmitted(false)}>
                  {language === "ar" ? "تقديم طلب آخر" : "Submit another application"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Guidelines & Benefits (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                {/* Guidelines */}
                <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#DCE3EA] shadow-xs space-y-5">
                  <div className="flex items-center gap-3 border-b border-[#DCE3EA] pb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-navy/10 flex items-center justify-center text-brand-navy">
                      <Info className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-brand-dark">
                        {language === "ar" ? "شرح العضوية" : "Membership Scope"}
                      </h4>
                      <p className="text-xs text-brand-muted">
                        {language === "ar" ? "فرص وامتيازات منتسبي الرابطة" : "Member privileges & support"}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {t("membership.explanation")}
                  </p>

                  <div className="space-y-3 pt-3 border-t border-[#DCE3EA]">
                    <h5 className="text-xs font-bold text-brand-dark uppercase tracking-wider">
                      {t("membership.benefitsTitle")}
                    </h5>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-brand-dark font-medium">
                      {[
                        t("membership.benefit1"),
                        t("membership.benefit2"),
                        t("membership.benefit3"),
                        t("membership.benefit4"),
                      ].map((benefit, i) => (
                        <li key={i} className="flex gap-2.5 items-start">
                          <Check className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-[#DCE3EA]">
                    <h5 className="text-xs font-bold text-brand-dark uppercase tracking-wider">
                      {t("membership.requirementsTitle")}
                    </h5>
                    <ul className="space-y-2 text-xs text-brand-muted">
                      {[t("membership.req1"), t("membership.req2"), t("membership.req3")].map((req, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <Check className="w-3.5 h-3.5 text-brand-navy flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column: Application Form (8 cols) */}
              <div className="lg:col-span-8">
                <div className="bg-white rounded-2xl border border-[#DCE3EA] p-7 sm:p-10 shadow-xs space-y-8">
                  <div className="border-b border-[#DCE3EA] pb-5 space-y-1">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-brand-dark">
                      {t("membership.formTitle")}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-muted">
                      {language === "ar"
                        ? "يرجى ملء جميع الحقول المطلوبة بدقة لدراسة ملف طلب الانضمام"
                        : "Please fill in all required fields accurately for evaluation"}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* 1. Personal Details */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {language === "ar" ? "1. البيانات الشخصية" : "1. Personal Information"}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label={t("forms.fullName")} error={getErrorMessage(errors.fullName?.message)} required>
                          <input type="text" {...register("fullName")} placeholder="يوسف حداد" />
                        </FormField>

                        <FormField label={t("forms.dob")} error={getErrorMessage(errors.dob?.message)} required>
                          <input type="date" {...register("dob")} />
                        </FormField>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label={t("forms.wilaya")} error={getErrorMessage(errors.wilaya?.message)} required>
                          <input type="text" {...register("wilaya")} placeholder="قسنطينة" />
                        </FormField>

                        <FormField label={t("forms.municipality")} error={getErrorMessage(errors.municipality?.message)} required>
                          <input type="text" {...register("municipality")} placeholder="الخروب / قسنطينة" />
                        </FormField>
                      </div>
                    </div>

                    {/* 2. Contact Details */}
                    <div className="space-y-4 pt-4 border-t border-[#DCE3EA]">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {language === "ar" ? "2. معلومات الاتصال والمستوى" : "2. Contact & Background"}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label={t("forms.email")} error={getErrorMessage(errors.email?.message)} required>
                          <input type="email" {...register("email")} placeholder="yousef@gmail.com" />
                        </FormField>

                        <FormField label={t("forms.phone")} error={getErrorMessage(errors.phone?.message)} required>
                          <input type="tel" {...register("phone")} placeholder="0771234567" />
                        </FormField>
                      </div>

                      <FormField label={t("forms.educationProfession")} error={getErrorMessage(errors.educationProfession?.message)} required>
                        <input type="text" {...register("educationProfession")} placeholder="طالب جامعي - ماستر إلكترونيات" />
                      </FormField>
                    </div>

                    {/* 3. Scientific Interests */}
                    <div className="space-y-4 pt-4 border-t border-[#DCE3EA]">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {language === "ar" ? "3. المجالات العلمية المفضلة" : "3. Scientific Interests"}
                      </h4>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {interestOptions.map((opt) => {
                          const isChecked = selectedInterests.includes(opt);
                          return (
                            <button
                              type="button"
                              key={opt}
                              onClick={() => handleInterestToggle(opt)}
                              className={`p-3 border rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                                isChecked
                                  ? "bg-[#062B55] border-[#062B55] text-white shadow-xs"
                                  : "bg-slate-50 border-[#DCE3EA] text-slate-700 hover:bg-slate-100"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {errors.interests && (
                        <p className="text-xs text-red-500 font-medium">
                          {getErrorMessage(errors.interests.message)}
                        </p>
                      )}
                    </div>

                    {/* 4. Skills & Motivation */}
                    <div className="space-y-4 pt-4 border-t border-[#DCE3EA]">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {language === "ar" ? "4. المهارات والدوافع" : "4. Skills & Motivation"}
                      </h4>

                      <FormField label={t("forms.skills")} error={getErrorMessage(errors.skills?.message)} required>
                        <textarea
                          {...register("skills")}
                          placeholder={language === "ar" ? "أذكر أهم المهارات البرمجية أو التقنية أو الخبرات السابقة..." : "Describe your current technical skills..."}
                          rows={3}
                          className="resize-none"
                        />
                      </FormField>

                      <FormField label={t("forms.motivation")} error={getErrorMessage(errors.motivation?.message)} required>
                        <textarea
                          {...register("motivation")}
                          placeholder={language === "ar" ? "ما هي دوافعك للانضمام ومشاريعك المستقبلية؟" : "What is your main motivation to join?"}
                          rows={3}
                          className="resize-none"
                        />
                      </FormField>

                      <FormField label={t("forms.portfolio")} error={getErrorMessage(errors.portfolio?.message)}>
                        <input type="text" {...register("portfolio")} placeholder="https://github.com/yourusername (اختياري)" />
                      </FormField>
                    </div>

                    {/* Consent Checkbox */}
                    <div className="pt-2">
                      <div className="flex gap-2.5 items-start text-xs text-brand-dark">
                        <input type="checkbox" id="consent" {...register("consent")} className="mt-1 cursor-pointer" />
                        <label htmlFor="consent" className="cursor-pointer select-none leading-relaxed text-slate-600">
                          {t("forms.consent")}
                        </label>
                      </div>
                      {errors.consent && (
                        <p className="text-xs text-red-500 font-medium mt-1">
                          {getErrorMessage(errors.consent.message)}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="secondary"
                      size="lg"
                      className="w-full justify-center gap-2"
                      isLoading={isSubmitting}
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>{t("membership.submitApp")}</span>
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
