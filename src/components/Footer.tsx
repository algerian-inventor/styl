"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { Container } from "@/components/ui/Container";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1.5z"></path>
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const { siteSettings } = usePrototypeState();
  const pathname = usePathname();

  // Hide footer on admin dashboards except login
  const isAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin/login";
  if (isAdminRoute) return null;

  return (
    <footer className="bg-[#041D38] text-white border-t border-[#062B55] mt-auto relative overflow-hidden">
      {/* Background scientific grid texture */}
      <div className="absolute inset-0 bg-sci-grid-dark opacity-20 pointer-events-none" />

      <Container className="relative z-10 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Column 1: Organization Identity & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 select-none">
              <div className="w-10 h-10 bg-[#062B55] rounded-xl flex items-center justify-center text-white font-black text-lg border border-brand-green/40 shadow-xs">
                STLY
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-extrabold text-white">
                  {language === "ar" ? siteSettings.leagueNameAr : siteSettings.leagueNameEn}
                </span>
                <span className="text-xs text-brand-green-accent font-bold">
                  {language === "ar" ? "قسنطينة — الجزائر" : "Constantine — Algeria"}
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              {language === "ar"
                ? "رابطة شبابية علمية تُعنى بنشر الثقافة التكنولوجية، ورعاية المبتكرين الشباب، وتمكين الأجيال القادمة في مجالات الروبوتيك والذكاء الاصطناعي."
                : "A youth scientific league dedicated to promoting technological culture, nurturing young innovators, and empowering future generations in robotics and AI."}
            </p>

            <div className="flex items-center gap-3 pt-2 text-slate-300">
              {siteSettings.instagramUrl && (
                <a
                  href={siteSettings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-green/20 hover:text-brand-green-accent flex items-center justify-center transition-colors border border-white/10"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
              )}
              {siteSettings.facebookUrl && (
                <a
                  href={siteSettings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-green/20 hover:text-brand-green-accent flex items-center justify-center transition-colors border border-white/10"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
              )}
              {siteSettings.youtubeUrl && (
                <a
                  href={siteSettings.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-green/20 hover:text-brand-green-accent flex items-center justify-center transition-colors border border-white/10"
                  aria-label="YouTube"
                >
                  <YoutubeIcon />
                </a>
              )}
              {siteSettings.tiktokUrl && (
                <a
                  href={siteSettings.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-green/20 hover:text-brand-green-accent flex items-center justify-center transition-colors border border-white/10"
                  aria-label="TikTok"
                >
                  <TiktokIcon />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold text-brand-green-accent uppercase tracking-widest">
              {language === "ar" ? "الرابطة" : "League"}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-medium">
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

          {/* Column 3: Resources & Media (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold text-brand-green-accent uppercase tracking-widest">
              {language === "ar" ? "الأنشطة والإعلام" : "Activities & Media"}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-medium">
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

          {/* Column 4: Direct Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold text-brand-green-accent uppercase tracking-widest">
              {t("contact.infoTitle")}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex gap-2.5 items-start">
                <MapPin className="h-4 w-4 text-brand-green-accent flex-shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {language === "ar" ? siteSettings.addressAr : siteSettings.addressEn}
                </span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone className="h-4 w-4 text-brand-green-accent flex-shrink-0" />
                <span dir="ltr">{siteSettings.phone}</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="h-4 w-4 text-brand-green-accent flex-shrink-0" />
                <span>{siteSettings.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/60 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            {language === "ar" ? siteSettings.leagueNameAr : siteSettings.leagueNameEn}.{" "}
            {language === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-200 transition-colors">
              {t("nav.privacy")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
