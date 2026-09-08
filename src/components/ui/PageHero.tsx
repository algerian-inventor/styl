import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "./Container";
import { useLanguage } from "@/context/LanguageContext";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
  badge?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  badge,
}) => {
  const { dir } = useLanguage();
  const isRtl = dir === "rtl";
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <section className="relative bg-[#062B55] text-white py-14 sm:py-20 overflow-hidden border-b border-[#041D38]">
      {/* Background scientific grid and subtle gradients */}
      <div className="absolute inset-0 bg-sci-grid-dark opacity-30 pointer-events-none" />
      <Container className="relative z-10">
        <div className="max-w-3xl space-y-4">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-2 text-xs text-slate-300 font-medium pb-1">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <ChevronIcon className="w-3.5 h-3.5 text-slate-400" />}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-brand-green-accent transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white font-semibold">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}

          {/* Eyebrow or Badge */}
          <div className="flex flex-wrap items-center gap-3">
            {eyebrow && (
              <span className="inline-flex items-center text-xs font-bold text-brand-green-accent uppercase tracking-widest bg-brand-green/15 border border-brand-green/30 px-3 py-1 rounded-md">
                {eyebrow}
              </span>
            )}
            {badge}
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl pt-1">
              {description}
            </p>
          )}

          {children && <div className="pt-4">{children}</div>}
        </div>
      </Container>
    </section>
  );
};
