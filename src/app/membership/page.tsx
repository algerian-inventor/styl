"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Check, Send, CheckCircle2, Award, ClipboardList, Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/Card";
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

  const onSubmit = async (data: MembershipFormValues) => {
    await submitMembershipApplication({
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <SectionHeader
          title={t("membership.title")}
          subtitle={t("membership.subtitle")}
        />
      </motion.div>

      {isSubmitted ? (
        /* SUCCESS CONFIRMATION PANEL */
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto">
          <Card className="border border-green-200 bg-green-50/50 p-8 space-y-6 text-center shadow-md">
            <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-extrabold text-green-800">{t("membership.appSuccess")}</h3>
              <p className="text-xs sm:text-sm text-brand-dark leading-relaxed font-semibold">
                {t("membership.appSuccessDesc")}
              </p>
            </div>

            <div className="h-[1px] bg-green-200" />

            <div className="text-center pt-2">
              <Button variant="primary" onClick={() => setIsSubmitted(false)}>
                {language === "ar" ? "تقديم طلب انضمام جديد" : "Submit another application"}
              </Button>
            </div>
          </Card>
        </motion.div>
      ) : (
        /* INFORMATION PANEL + FORM PANEL GRID */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Columns: Explanations, benefits, requirements */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white border border-brand-border rounded-xl p-6 shadow-xs space-y-6">
              {/* Explanation */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-brand-navy flex items-center gap-2">
                  <Info className="h-5 w-5 text-brand-green" />
                  {language === "ar" ? "شرح العضوية" : "Membership Guidelines"}
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed font-semibold">
                  {t("membership.explanation")}
                </p>
              </div>

              <div className="h-[1px] bg-brand-border" />

              {/* Benefits */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-brand-navy flex items-center gap-2">
                  <Award className="h-5 w-5 text-brand-green" />
                  {t("membership.benefitsTitle")}
                </h3>
                <ul className="space-y-2 text-xs text-brand-dark leading-relaxed">
                  {[
                    t("membership.benefit1"),
                    t("membership.benefit2"),
                    t("membership.benefit3"),
                    t("membership.benefit4"),
                  ].map((benefit, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <Check className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="h-[1px] bg-brand-border" />

              {/* Requirements */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-brand-navy flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-brand-green" />
                  {t("membership.requirementsTitle")}
                </h3>
                <ul className="space-y-2 text-xs text-brand-dark leading-relaxed">
                  {[t("membership.req1"), t("membership.req2"), t("membership.req3")].map((req, i) => (
                    <li key={i} className="flex gap-2 items-start">
                      <Check className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Zod Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white border border-brand-border p-8 shadow-xs">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <h3 className="text-lg font-bold text-brand-dark border-b border-brand-border pb-3 uppercase tracking-wider">
                  {t("membership.formTitle")}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField label={t("forms.fullName")} error={getErrorMessage(errors.fullName?.message)} required>
                    <input type="text" {...register("fullName")} placeholder="يوسف حداد" />
                  </FormField>

                  <FormField label={t("forms.dob")} error={getErrorMessage(errors.dob?.message)} required>
                    <input type="date" {...register("dob")} />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField label={t("forms.wilaya")} error={getErrorMessage(errors.wilaya?.message)} required>
                    <input type="text" {...register("wilaya")} placeholder="قسنطينة" />
                  </FormField>

                  <FormField label={t("forms.municipality")} error={getErrorMessage(errors.municipality?.message)} required>
                    <input type="text" {...register("municipality")} placeholder="الخروب" />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

                {/* Interests Checklist Array */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-brand-dark block">
                    {t("forms.scientificInterests")} <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {interestOptions.map((opt) => {
                      const isChecked = selectedInterests.includes(opt);
                      return (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => handleInterestToggle(opt)}
                          className={`px-3 py-2 border rounded-md text-xs font-semibold text-center transition-all cursor-pointer ${
                            isChecked
                              ? "bg-brand-navy border-brand-navy text-white shadow-xs"
                              : "bg-white border-brand-border text-brand-dark hover:bg-brand-bg"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {errors.interests && <p className="text-xs text-red-500 mt-1">{getErrorMessage(errors.interests.message)}</p>}
                </div>

                <FormField label={t("forms.skills")} error={getErrorMessage(errors.skills?.message)} required>
                  <textarea
                    {...register("skills")}
                    placeholder={language === "ar" ? "أذكر أهم المهارات أو الخبرات السابقة..." : "Describe your current technical skills..."}
                    rows={3}
                    className="resize-none"
                  />
                </FormField>

                <FormField label={t("forms.motivation")} error={getErrorMessage(errors.motivation?.message)} required>
                  <textarea
                    {...register("motivation")}
                    placeholder={language === "ar" ? "ما هي دوافعك ورغبتك في الانضمام للرابطة؟" : "What is your main motivation to join us?"}
                    rows={3}
                    className="resize-none"
                  />
                </FormField>

                <FormField label={t("forms.portfolio")} error={getErrorMessage(errors.portfolio?.message)}>
                  <input type="text" {...register("portfolio")} placeholder="https://github.com/yourusername (اختياري)" />
                </FormField>

                <div className="space-y-1">
                  <div className="flex gap-2 items-start text-xs text-brand-dark pt-1">
                    <input type="checkbox" id="consent" {...register("consent")} className="mt-1 cursor-pointer" />
                    <label htmlFor="consent" className="cursor-pointer select-none leading-relaxed">
                      {t("forms.consent")}
                    </label>
                  </div>
                  {errors.consent && <p className="text-xs text-red-500">{getErrorMessage(errors.consent.message)}</p>}
                </div>

                <Button type="submit" variant="secondary" className="w-full" isLoading={isSubmitting} leftIcon={<Send className="h-4 w-4" />}>
                  {t("membership.submitApp")}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
