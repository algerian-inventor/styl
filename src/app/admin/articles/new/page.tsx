"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { FileText, Save, X, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { Card, CardContent } from "@/components/ui/Card";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

export default function AdminNewArticlePage() {
  const { t, language, dir } = useLanguage();
  const { addArticle } = usePrototypeState();
  const router = useRouter();

  const isRtl = dir === "rtl";
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  // Schema validation
  const articleSchema = z.object({
    titleAr: z.string().min(5, { message: "required" }),
    titleEn: z.string().min(5, { message: "required" }),
    summaryAr: z.string().min(10, { message: "required" }),
    summaryEn: z.string().min(10, { message: "required" }),
    contentAr: z.string().min(20, { message: "required" }),
    contentEn: z.string().min(20, { message: "required" }),
    categoryAr: z.string().min(2, { message: "required" }),
    categoryEn: z.string().min(2, { message: "required" }),
    authorAr: z.string().min(3, { message: "required" }),
    authorEn: z.string().min(3, { message: "required" }),
    tagsAr: z.string().optional(),
    tagsEn: z.string().optional(),
  });

  type ArticleFormValues = z.infer<typeof articleSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      titleAr: "",
      titleEn: "",
      summaryAr: "",
      summaryEn: "",
      contentAr: "",
      contentEn: "",
      categoryAr: "إعلان",
      categoryEn: "Announcement",
      authorAr: "اللجنة الإعلامية",
      authorEn: "Media Committee",
      tagsAr: "",
      tagsEn: "",
    },
  });

  const onSubmit = (data: ArticleFormValues) => {
    // Process tags from CSV string to array
    const processTags = (csv?: string) =>
      csv ? csv.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0) : [];

    addArticle({
      title: { ar: data.titleAr, en: data.titleEn },
      summary: { ar: data.summaryAr, en: data.summaryEn },
      content: { ar: data.contentAr, en: data.contentEn },
      category: { ar: data.categoryAr, en: data.categoryEn },
      author: { ar: data.authorAr, en: data.authorEn },
      publishedDate: new Date().toISOString().split("T")[0],
      isFeatured: false,
      coverImage: "/images/news/default.png",
      tags: {
        ar: processTags(data.tagsAr),
        en: processTags(data.tagsEn),
      },
    });

    router.push("/admin/articles");
  };

  const getErrorMessage = (errorKey?: string) => {
    if (!errorKey) return undefined;
    return t("forms.required");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Header */}
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/admin/articles")}
          leftIcon={<BackIcon className="h-4 w-4" />}
        >
          {language === "ar" ? "قائمة المقالات" : "Articles List"}
        </Button>
      </div>

      <Card className="bg-white border border-brand-border shadow-xs">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <h3 className="text-base font-bold text-brand-dark border-b border-brand-border pb-3 flex items-center gap-2 uppercase tracking-wider">
              <FileText className="h-5 w-5 text-brand-green" />
              {language === "ar" ? "إنشاء مقال أو خبر جديد" : "Create New Article"}
            </h3>

            {/* Bilingual Title Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="العنوان (العربية)" error={getErrorMessage(errors.titleAr?.message)} required>
                <input type="text" {...register("titleAr")} placeholder="أدخل عنوان المقال بالعربية..." />
              </FormField>
              <FormField label="Title (English)" error={getErrorMessage(errors.titleEn?.message)} required>
                <input type="text" {...register("titleEn")} placeholder="Enter article title in English..." />
              </FormField>
            </div>

            {/* Bilingual Summary Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="الملخص (العربية)" error={getErrorMessage(errors.summaryAr?.message)} required>
                <textarea {...register("summaryAr")} placeholder="ملخص بسيط للمقال يظهر بالصفحة الرئيسية..." rows={3} className="resize-none" />
              </FormField>
              <FormField label="Summary (English)" error={getErrorMessage(errors.summaryEn?.message)} required>
                <textarea {...register("summaryEn")} placeholder="Short summary displaying on list previews..." rows={3} className="resize-none" />
              </FormField>
            </div>

            {/* Bilingual Content Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="نص المقال (العربية)" error={getErrorMessage(errors.contentAr?.message)} required>
                <textarea {...register("contentAr")} placeholder="أكتب نص المقال الكامل هنا..." rows={6} className="resize-none" />
              </FormField>
              <FormField label="Article Body (English)" error={getErrorMessage(errors.contentEn?.message)} required>
                <textarea {...register("contentEn")} placeholder="Write the full article body contents here..." rows={6} className="resize-none" />
              </FormField>
            </div>

            {/* Category and Author */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="الفئة (العربية)" error={getErrorMessage(errors.categoryAr?.message)} required>
                  <input type="text" {...register("categoryAr")} />
                </FormField>
                <FormField label="Category (English)" error={getErrorMessage(errors.categoryEn?.message)} required>
                  <input type="text" {...register("categoryEn")} />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="الكاتب (العربية)" error={getErrorMessage(errors.authorAr?.message)} required>
                  <input type="text" {...register("authorAr")} />
                </FormField>
                <FormField label="Author (English)" error={getErrorMessage(errors.authorEn?.message)} required>
                  <input type="text" {...register("authorEn")} />
                </FormField>
              </div>
            </div>

            {/* Tags (comma separated list) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="الوسوم (مفصولة بفاصلة ,)">
                <input type="text" {...register("tagsAr")} placeholder="مثال: ذكاء, برمجة, تدريب" />
              </FormField>
              <FormField label="Tags (separated by comma ,)">
                <input type="text" {...register("tagsEn")} placeholder="example: AI, coding, training" />
              </FormField>
            </div>

            {/* Submit Actions */}
            <div className="flex gap-3 justify-end border-t border-brand-border pt-6">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/articles")}>
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
