import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  theme?: "dark" | "light";
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  align = "center",
  theme = "light",
}) => {
  const alignClass = align === "center" ? "text-center items-center" : "text-start items-start";
  const titleColor = theme === "light" ? "text-brand-dark" : "text-white";
  const subtitleColor = theme === "light" ? "text-brand-muted" : "text-slate-300";

  return (
    <div className={`flex flex-col gap-2 mb-10 max-w-2xl ${alignClass} ${align === "center" ? "mx-auto" : ""}`}>
      <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${titleColor}`}>
        {title}
      </h2>
      <div className="h-1 w-16 bg-brand-green rounded-full mt-1" />
      {subtitle && (
        <p className={`text-sm sm:text-base mt-2 ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
