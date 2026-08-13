import React from "react";

interface SectionIntroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "start" | "center";
  action?: React.ReactNode;
  dark?: boolean;
  className?: string;
}

export const SectionIntro: React.FC<SectionIntroProps> = ({
  eyebrow,
  title,
  subtitle,
  align = "start",
  action,
  dark = false,
  className = "",
}) => {
  const isCentered = align === "center";

  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14 ${
        isCentered ? "text-center md:items-center" : "text-start"
      } ${className}`}
    >
      <div className={`space-y-3 max-w-2xl ${isCentered ? "mx-auto" : ""}`}>
        {eyebrow && (
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center text-xs sm:text-sm font-bold tracking-wider uppercase px-3 py-1 rounded-md border ${
                dark
                  ? "bg-brand-green/15 text-brand-green-accent border-brand-green/30"
                  : "bg-brand-navy/5 text-brand-navy border-brand-navy/15"
              }`}
            >
              {eyebrow}
            </span>
          </div>
        )}

        <h2
          className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
            dark ? "text-white" : "text-brand-dark"
          }`}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              dark ? "text-slate-300" : "text-brand-muted"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className={`flex-shrink-0 ${isCentered ? "mx-auto mt-4" : ""}`}>
          {action}
        </div>
      )}
    </div>
  );
};
