"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Lock, Mail, AlertTriangle, ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { Card, CardContent } from "@/components/ui/Card";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const { t, language, dir } = useLanguage();
  const { adminLogin, isAdminAuthenticated } = usePrototypeState();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isRtl = dir === "rtl";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Redirect if already logged in
  useEffect(() => {
    if (isAdminAuthenticated) {
      router.push("/admin");
    }
  }, [isAdminAuthenticated, router]);

  // Schema validation
  const loginSchema = z.object({
    email: z.string().email({ message: "email" }),
    password: z.string().min(1, { message: "required" }),
  });

  type LoginFormValues = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setErrorMsg(null);
    const success = await adminLogin(data.email, data.password);
    if (success) {
      router.push("/admin");
    } else {
      setErrorMsg(t("admin.loginError"));
    }
  };

  const getErrorMessage = (errorKey?: string) => {
    if (!errorKey) return undefined;
    if (errorKey === "required") return t("forms.required");
    if (errorKey === "email") return t("forms.invalidEmail");
    return errorKey;
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-sci-grid">
      <div className="absolute inset-0 bg-brand-bg/90 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-white border border-brand-border shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="h-10 w-10 bg-brand-navy rounded-md flex items-center justify-center text-white font-bold text-lg border border-brand-green mx-auto">
              STLY
            </span>
            <h1 className="text-lg font-extrabold text-brand-dark">
              {t("admin.loginTitle")}
            </h1>
            <p className="text-xs text-brand-muted">
              {t("admin.loginSubtitle")}
            </p>
          </div>

          {errorMsg && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md flex gap-2 items-center text-xs text-red-700 font-semibold">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField label={t("forms.email")} error={getErrorMessage(errors.email?.message)} required>
              <div className="relative">
                <span className="absolute inset-y-0 right-3 flex items-center text-brand-muted pointer-events-none rtl:right-3 ltr:left-3 ltr:right-auto">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="admin@stly.dz"
                  className="pr-10 rtl:pr-10 ltr:pl-10 ltr:pr-4"
                />
              </div>
            </FormField>

            <FormField label={t("admin.password")} error={getErrorMessage(errors.password?.message)} required>
              <div className="relative">
                <span className="absolute inset-y-0 right-3 flex items-center text-brand-muted pointer-events-none rtl:right-3 ltr:left-3 ltr:right-auto">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="pr-10 rtl:pr-10 ltr:pl-10 ltr:pr-4"
                />
              </div>
            </FormField>

            <Button type="submit" variant="primary" className="w-full font-bold" isLoading={isSubmitting}>
              {t("admin.loginBtn")}
            </Button>
          </form>

          <div className="text-center pt-2">
            <Link href="/">
              <span className="text-xs font-semibold text-brand-navy hover:underline cursor-pointer flex items-center justify-center gap-1">
                {language === "ar" ? "العودة للموقع الرئيسي" : "Back to public website"}
                <ArrowIcon className="h-3 w-3" />
              </span>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
