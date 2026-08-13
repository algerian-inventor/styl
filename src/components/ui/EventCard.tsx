import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Event } from "@/data/events";
import { useLanguage } from "@/context/LanguageContext";
import { MediaFallback } from "./MediaFallback";

interface EventCardProps {
  event: Event;
  variant?: "card" | "row";
}

export const EventCard: React.FC<EventCardProps> = ({ event, variant = "card" }) => {
  const { language, dir, t } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const isRtl = dir === "rtl";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Extract day and month
  const eventDateObj = new Date(event.date);
  const dayNumber = isNaN(eventDateObj.getDate()) ? event.date.split("-")[2] || "15" : eventDateObj.getDate();
  const monthName = isNaN(eventDateObj.getTime())
    ? "MAR"
    : eventDateObj.toLocaleDateString(language === "ar" ? "ar-DZ" : "en-US", { month: "short" });

  const isClosed = event.isClosed;

  if (variant === "row") {
    return (
      <div
        className={`group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-5 sm:p-6 bg-white rounded-xl border border-[#DCE3EA] hover:border-brand-navy/30 transition-all duration-300 hover:shadow-sm ${
          isClosed ? "opacity-75 bg-slate-50/50" : ""
        }`}
      >
        {/* Date block + info */}
        <div className="flex items-start sm:items-center gap-4 sm:gap-6 flex-grow">
          {/* Calendar Badge */}
          <div
            className={`flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl border text-center font-bold ${
              isClosed
                ? "bg-slate-100 border-slate-200 text-slate-500"
                : "bg-brand-navy/5 border-brand-navy/15 text-brand-navy"
            }`}
          >
            <span className="text-xl sm:text-2xl font-black leading-none">{dayNumber}</span>
            <span className="text-xs uppercase tracking-wider font-semibold text-brand-green mt-1">
              {monthName}
            </span>
          </div>

          <div className="space-y-1.5 flex-grow">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-brand-green uppercase tracking-wide">
                {event.category}
              </span>
              {isClosed ? (
                <span className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                  {language === "ar" ? "منتهية" : "Closed"}
                </span>
              ) : (
                <span className="text-[11px] font-semibold bg-brand-green/10 text-brand-green px-2 py-0.5 rounded border border-brand-green/20">
                  {language === "ar" ? "مفتوحة للتسجيل" : "Open"}
                </span>
              )}
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-brand-dark group-hover:text-brand-navy transition-colors">
              {event.title[language]}
            </h3>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-brand-muted">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-navy" />
                {event.time}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-green" />
                {event.location[language]}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0 w-full md:w-auto flex items-center justify-end">
          <Link
            href={`/events/${event.slug}`}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              isClosed
                ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                : "bg-brand-navy text-white hover:bg-brand-navy-light"
            }`}
          >
            <span>{isClosed ? t("events.details") : t("events.registerNow")}</span>
            <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group flex flex-col h-full bg-white rounded-xl overflow-hidden border border-[#DCE3EA] hover:border-brand-navy/30 transition-all duration-300 hover:shadow-md ${
        isClosed ? "opacity-80" : ""
      }`}
    >
      {/* Cover visual */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
        {event.coverImage && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.coverImage}
            alt={event.title[language]}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <MediaFallback
            title={event.title[language]}
            category={event.category}
            aspectRatio="16/9"
          />
        )}

        {/* Date block positioned at the top left/right corner */}
        <div className="absolute top-3 right-3 z-10">
          <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-white/95 backdrop-blur-md shadow-md border border-slate-200 text-center font-bold">
            <span className="text-lg font-black text-brand-dark leading-none">{dayNumber}</span>
            <span className="text-[10px] uppercase font-bold text-brand-green mt-0.5">
              {monthName}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-green uppercase tracking-wide">
              {event.category}
            </span>
            {isClosed ? (
              <span className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                {language === "ar" ? "منتهية" : "Closed"}
              </span>
            ) : (
              <span className="text-[11px] font-semibold bg-brand-green/10 text-brand-green px-2 py-0.5 rounded border border-brand-green/20">
                {language === "ar" ? "مفتوحة" : "Open"}
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-navy transition-colors line-clamp-2">
            {event.title[language]}
          </h3>

          <p className="text-sm text-brand-muted leading-relaxed line-clamp-2">
            {event.description[language]}
          </p>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-[#DCE3EA]/60 space-y-3">
          <div className="flex flex-wrap items-center justify-between text-xs text-brand-muted gap-2">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-navy" />
              {event.time}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-green" />
              {event.location[language]}
            </span>
          </div>

          <Link
            href={`/events/${event.slug}`}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-brand-navy/5 text-brand-navy hover:bg-brand-navy hover:text-white font-bold text-xs sm:text-sm transition-all"
          >
            <span>{isClosed ? t("events.details") : t("events.registerNow")}</span>
            <ArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
