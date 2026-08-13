import React, { useState } from "react";
import Link from "next/link";
import { Clock, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { Program } from "@/data/programs";
import { useLanguage } from "@/context/LanguageContext";
import { MediaFallback } from "./MediaFallback";

interface ProgramCardProps {
  program: Program;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const { language, dir, t } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const isRtl = dir === "rtl";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const statusLabel =
    program.status === "active"
      ? t("programs.statusActive")
      : program.status === "upcoming"
      ? t("programs.statusUpcoming")
      : t("programs.statusCompleted");

  const statusColor =
    program.status === "active"
      ? "bg-brand-green/10 text-brand-green border-brand-green/25"
      : program.status === "upcoming"
      ? "bg-blue-500/10 text-blue-600 border-blue-500/25"
      : "bg-slate-500/10 text-slate-600 border-slate-500/25";

  return (
    <div className="group flex flex-col h-full bg-white rounded-xl overflow-hidden border border-[#DCE3EA] hover:border-brand-navy/30 transition-all duration-300 hover:shadow-md">
      {/* Cover Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        {program.coverImage && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={program.coverImage}
            alt={program.name[language]}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <MediaFallback
            title={program.name[language]}
            category={program.category[language]}
            aspectRatio="16/10"
          />
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-md border backdrop-blur-sm ${statusColor}`}
          >
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-brand-green uppercase tracking-wider">
            {program.category[language]}
          </span>

          <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-navy transition-colors line-clamp-1">
            {program.name[language]}
          </h3>

          <p className="text-sm text-brand-muted leading-relaxed line-clamp-2">
            {program.summary[language]}
          </p>
        </div>

        {/* Metadata & Footer Action */}
        <div className="pt-4 border-t border-[#DCE3EA]/60 flex items-center justify-between text-xs text-brand-muted">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-green" />
              {program.duration[language]}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-navy" />
              {program.startDate}
            </span>
          </div>

          <Link
            href={`/programs/${program.slug}`}
            className="inline-flex items-center gap-1 font-bold text-brand-navy group-hover:text-brand-green transition-colors"
          >
            <span>{t("programs.viewDetails")}</span>
            <ArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
