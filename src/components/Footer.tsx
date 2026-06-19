"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Brand icons declarations as inline SVGs
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const pathname = usePathname();

  // Hide footer on admin dashboards
  const isAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin/login";

  if (isAdminRoute) return null;

  return (
    <footer className="bg-brand-dark text-white border-t border-brand-navy-light mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-9 w-9 bg-white rounded-md flex items-center justify-center text-brand-navy font-bold text-lg border border-brand-green">
                STLY
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-extrabold text-white">
                  {language === "ar" ? "رابطة الشباب العلمية" : "STLY Constantine"}
                </span>
                <span className="text-xs text-brand-green font-bold">
                  {language === "ar" ? "قسنطينة" : "Constantine"}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("about.desc1")} {t("about.desc2")}
            </p>
            <div className="flex gap-3 text-slate-400">
              <a href="#" className="hover:text-brand-green transition-colors" aria-label="Facebook">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-brand-green transition-colors" aria-label="Twitter">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-brand-green transition-colors" aria-label="Youtube">
                <YoutubeIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Site Map */}
          <div>
            <h4 className="text-sm font-bold text-white border-b border-slate-700 pb-2 mb-4 uppercase tracking-wider">
              {language === "ar" ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/fields" className="hover:text-white transition-colors">
                  {t("nav.fields")}
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-white transition-colors">
                  {t("nav.programs")}
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  {t("nav.events")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Utility Links */}
          <div>
            <h4 className="text-sm font-bold text-white border-b border-slate-700 pb-2 mb-4 uppercase tracking-wider">
              {language === "ar" ? "أقسام أخرى" : "Sections"}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  {t("nav.news")}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  {t("nav.gallery")}
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-white transition-colors">
                  {t("nav.partners")}
                </Link>
              </li>
              <li>
                <Link href="/membership" className="hover:text-white transition-colors">
                  {t("nav.membership")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  {t("nav.privacy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-sm font-bold text-white border-b border-slate-700 pb-2 mb-4 uppercase tracking-wider">
              {t("contact.infoTitle")}
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex gap-2 items-start">
                <MapPin className="h-4 w-4 text-brand-green flex-shrink-0" />
                <span>{t("contact.address")}</span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone className="h-4 w-4 text-brand-green flex-shrink-0" />
                <span>031 92 48 10</span>
              </li>
              <li className="flex gap-2 items-center">
                <Mail className="h-4 w-4 text-brand-green flex-shrink-0" />
                <span>contact@stly.dz</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} {t("hero.title")}. {language === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
          <div className="flex items-center gap-1">
            <Award className="h-4 w-4 text-brand-green" />
            <span>{language === "ar" ? "الرابطة العلمية والتقنية للشباب بقسنطينة" : "STLY Constantine"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
