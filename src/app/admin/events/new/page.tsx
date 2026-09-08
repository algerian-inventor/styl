"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, Save, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { Card, CardContent } from "@/components/ui/Card";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

export default function AdminNewEventPage() {
  const { t, language, dir } = useLanguage();
  const { addEvent } = usePrototypeState();
  const router = useRouter();

  const isRtl = dir === "rtl";
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  // Schema validation
  const eventSchema = z.object({
    titleAr: z.string().min(5, { message: "required" }),
    titleEn: z.string().min(5, { message: "required" }),
    summaryAr: z.string().min(10, { message: "required" }),
    summaryEn: z.string().min(10, { message: "required" }),
    descriptionAr: z.string().min(20, { message: "required" }),
    descriptionEn: z.string().min(20, { message: "required" }),
    date: z.string().min(1, { message: "required" }),
    time: z.string().min(1, { message: "required" }),
    locationAr: z.string().min(3, { message: "required" }),
    locationEn: z.string().min(3, { message: "required" }),
    capacity: z.number().min(5, { message: "required" }),
    registrationDeadline: z.string().min(1, { message: "required" }),
    category: z.string().min(2, { message: "required" }),
  });

  type EventFormValues = z.infer<typeof eventSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      titleAr: "",
      titleEn: "",
      summaryAr: "",
      summaryEn: "",
      descriptionAr: "",
      descriptionEn: "",
      date: "",
      time: "09:00 - 16:00",
      locationAr: "",
      locationEn: "",
      capacity: 50,
      registrationDeadline: "",
      category: "ANSF",
    },
  });

  const onSubmit = (data: EventFormValues) => {
    addEvent({
      title: { ar: data.titleAr, en: data.titleEn },
      summary: { ar: data.summaryAr, en: data.summaryEn },
      description: { ar: data.descriptionAr, en: data.descriptionEn },
      date: data.date,
      time: data.time,
      location: { ar: data.locationAr, en: data.locationEn },
      capacity: data.capacity,
      registrationDeadline: data.registrationDeadline,
      category: data.category,
      coverImage: "",
      speakers: [],
      program: [],
    });

    router.push("/admin/events");
  };

  const getErrorMessage = (errorKey?: string) => {
    if (!errorKey) return undefined;
    return t("forms.required");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back button */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/admin/events")}
          leftIcon={<BackIcon className="h-4 w-4" />}
        >
          {language === "ar" ? "قائمة الفعاليات" : "Events List"}
        </Button>
      </div>

      <Card className="bg-white border border-brand-border shadow-xs">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <h3 className="text-base font-bold text-brand-dark border-b border-brand-border pb-3 flex items-center gap-2 uppercase tracking-wider">
              <Calendar className="h-5 w-5 text-brand-green" />
              {language === "ar" ? "إنشاء فعالية أو ورشة جديدة" : "Create New Event"}
            </h3>

            {/* Bilingual Title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="عنوان الفعالية (العربية)" error={getErrorMessage(errors.titleAr?.message)} required>
                <input type="text" {...register("titleAr")} placeholder="أدخل عنوان الفعالية بالعربية..." />
              </FormField>
              <FormField label="Event Title (English)" error={getErrorMessage(errors.titleEn?.message)} required>
                <input type="text" {...register("titleEn")} placeholder="Enter event title in English..." />
              </FormField>
            </div>

            {/* Bilingual Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="الملخص (العربية)" error={getErrorMessage(errors.summaryAr?.message)} required>
                <textarea {...register("summaryAr")} placeholder="ملخص يظهر في بطاقات المعاينة..." rows={2} className="resize-none" />
              </FormField>
              <FormField label="Summary (English)" error={getErrorMessage(errors.summaryEn?.message)} required>
                <textarea {...register("summaryEn")} placeholder="Short summary for card previews..." rows={2} className="resize-none" />
              </FormField>
            </div>

            {/* Bilingual Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="تفاصيل الفعالية (العربية)" error={getErrorMessage(errors.descriptionAr?.message)} required>
                <textarea {...register("descriptionAr")} placeholder="أدخل تفاصيل ومحاور الفعالية..." rows={5} className="resize-none" />
              </FormField>
              <FormField label="Event Description (English)" error={getErrorMessage(errors.descriptionEn?.message)} required>
                <textarea {...register("descriptionEn")} placeholder="Enter full details about this event..." rows={5} className="resize-none" />
              </FormField>
            </div>

            {/* Date, Time & Deadline */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <FormField label="تاريخ الفعالية" error={getErrorMessage(errors.date?.message)} required>
                <input type="date" {...register("date")} />
              </FormField>
              <FormField label="توقيت الفعالية (ساعات)" error={getErrorMessage(errors.time?.message)} required>
                <input type="text" {...register("time")} placeholder="09:00 - 16:00" />
              </FormField>
              <FormField label="آخر أجل للتسجيل" error={getErrorMessage(errors.registrationDeadline?.message)} required>
                <input type="date" {...register("registrationDeadline")} />
              </FormField>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="المكان (العربية)" error={getErrorMessage(errors.locationAr?.message)} required>
                <input type="text" {...register("locationAr")} placeholder="مقر الرابطة، قسنطينة" />
              </FormField>
              <FormField label="Location (English)" error={getErrorMessage(errors.locationEn?.message)} required>
                <input type="text" {...register("locationEn")} placeholder="STLY HQ, Constantine" />
              </FormField>
            </div>

            {/* Capacity & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField label="السعة القصوى (عدد المقاعد)" error={getErrorMessage(errors.capacity?.message)} required>
                <input type="number" {...register("capacity", { valueAsNumber: true })} />
              </FormField>

              <FormField label="التصنيف" error={getErrorMessage(errors.category?.message)} required>
                <select {...register("category")}>
                  <option value="Science">Science (العلوم)</option>
                  <option value="Robotics">Robotics (الروبوتيك)</option>
                  <option value="AI">AI (الذكاء الاصطناعي)</option>
                  <option value="Innovation">Innovation (الابتكار والقيادة)</option>
                </select>
              </FormField>
            </div>

            {/* Submit Actions */}
            <div className="flex gap-3 justify-end border-t border-brand-border pt-6">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/events")}>
                {t("admin.common.cancel")}
              </Button>
              <Button type="submit" variant="secondary" isLoading={isSubmitting} leftIcon={<Save className="h-4.5 w-4.5" />}>
                {t("admin.common.save")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
