import React from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  theme?: "dark" | "light";
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  theme = "light",
  action,
}) => {
  const isCentered = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12 ${
        isCentered ? "text-center md:items-center" : "text-start"
      }`}
    >
      <div className={`space-y-2.5 max-w-2xl ${isCentered ? "mx-auto" : ""}`}>
        {eyebrow && (
          <span
            className={`inline-flex items-center text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border ${
              isDark
                ? "bg-brand-green/15 text-brand-green-accent border-brand-green/30"
                : "bg-brand-navy/5 text-brand-navy border-brand-navy/15"
            }`}
          >
            {eyebrow}
          </span>
        )}
        <h2
          className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
            isDark ? "text-white" : "text-brand-dark"
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              isDark ? "text-slate-300" : "text-brand-muted"
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
