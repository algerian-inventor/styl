import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, UserPlus } from "lucide-react";
import { Container } from "./Container";
import { useLanguage } from "@/context/LanguageContext";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  className?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title,
  subtitle,
  primaryBtnText,
  primaryBtnLink = "/membership",
  secondaryBtnText,
  secondaryBtnLink = "/programs",
  className = "",
}) => {
  const { language, dir, t } = useLanguage();
  const isRtl = dir === "rtl";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const defaultTitle =
    language === "ar"
      ? "كن جزءاً من مجتمع يصنع المستقبل بالعلم والابتكار"
      : "Be part of a youth community shaping the future with science & innovation";

  const defaultSubtitle =
    language === "ar"
      ? "انضم إلى الرابطة العلمية والتقنية للشباب بقسنطينة للاستفادة من ورشاتنا التطبيقية ومشاريعنا التكنولوجية الرائدة."
      : "Join the Scientific and Technical Youth League in Constantine to benefit from hands-on workshops and pioneering technological projects.";

  return (
    <section className={`relative bg-gradient-to-br from-[#062B55] via-[#041D38] to-[#031528] text-white py-16 sm:py-20 overflow-hidden ${className}`}>
      {/* Background scientific grid pattern */}
      <div className="absolute inset-0 bg-sci-grid-dark opacity-35 pointer-events-none" />

      <Container className="relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-brand-green-accent text-xs sm:text-sm font-bold">
            <Sparkles className="w-4 h-4" />
            <span>
              {language === "ar" ? "انضمام مفتوح للشباب المبدع" : "Open Membership for Innovative Youth"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {title || defaultTitle}
          </h2>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto">
            {subtitle || defaultSubtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href={primaryBtnLink}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-green text-white font-bold text-base hover:bg-brand-green-accent transition-all shadow-lg hover:shadow-brand-green/20"
            >
              <UserPlus className="w-4 h-4" />
              <span>{primaryBtnText || t("nav.membership")}</span>
            </Link>

            <Link
              href={secondaryBtnLink}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 text-white font-bold text-base hover:bg-white/15 border border-white/20 transition-all"
            >
              <span>{secondaryBtnText || (language === "ar" ? "اكتشف البرامج" : "Explore Programs")}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
