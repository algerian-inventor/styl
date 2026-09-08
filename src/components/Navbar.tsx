"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import { Button } from "@/components/ui/Button";

export const Navbar: React.FC = () => {
  const { language, setLanguage, t, dir } = useLanguage();
  const { siteSettings } = usePrototypeState();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isRtl = dir === "rtl";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Track scroll position for subtle elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide navbar on admin dashboards except admin login
  const isAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin/login";
  if (isAdminRoute) return null;

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    {
      href: "/programs",
      label: language === "ar" ? "النشاطات" : "Activities",
      dropdown: [
        { href: "/programs", label: t("nav.programs") },
        { href: "/fields", label: t("nav.fields") },
        { href: "/events", label: t("nav.events") },
      ],
    },
    { href: "/news", label: t("nav.news") },
    { href: "/gallery", label: t("nav.gallery") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const handleLanguageToggle = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-[#DCE3EA]"
          : "bg-white border-b border-[#DCE3EA]/80"
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[76px]">
          {/* Logo & Identity */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 select-none group">
              <div className="w-11 h-11 bg-[#062B55] rounded-xl flex items-center justify-center text-white font-black text-xl border border-brand-green/40 shadow-xs group-hover:bg-[#041D38] transition-colors">
                <span className="tracking-tighter">STLY</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm sm:text-base font-extrabold text-[#062B55] tracking-tight line-clamp-1">
                  {language === "ar" ? siteSettings.leagueNameAr : siteSettings.leagueNameEn}
                </span>
                <span className="text-xs text-brand-green font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green inline-block"></span>
                  {language === "ar" ? "قسنطينة — الجزائر" : "Constantine — Algeria"}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              
              if (link.dropdown) {
                return (
                  <div key={link.href} className="relative group px-1">
                    <Link
                      href={link.href}
                      className={`relative px-3.5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1 ${
                        active
                          ? "text-[#062B55] bg-slate-100/80 font-extrabold"
                          : "text-brand-dark hover:text-[#062B55] hover:bg-slate-50"
                      }`}
                    >
                      {link.label}
                      <svg className="w-3.5 h-3.5 opacity-50 transition-transform group-hover:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                      {active && (
                        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-green rounded-full" />
                      )}
                    </Link>
                    <div className={`absolute top-full ${isRtl ? "right-0" : "left-0"} mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
                      {link.dropdown.map((subLink) => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          className="block px-4 py-2 text-sm font-semibold text-brand-dark hover:bg-slate-50 hover:text-brand-navy"
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-bold transition-all ${
                    active
                      ? "text-[#062B55] bg-slate-100/80 font-extrabold"
                      : "text-brand-dark hover:text-[#062B55] hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-green rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={handleLanguageToggle}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 hover:text-brand-navy hover:bg-slate-100 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
              aria-label="Change language"
            >
              <Globe className="w-4 h-4 text-brand-green" />
              <span>{language === "ar" ? "English" : "العربية"}</span>
            </button>

            {/* Primary Action Button */}
            <Link href="/membership">
              <Button variant="secondary" size="md" className="gap-2 px-5">
                <span>{language === "ar" ? "انضم إلينا" : "Join Us"}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile / Tablet Menu & Language Toggle (< 1024px) */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={handleLanguageToggle}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 text-xs font-bold flex items-center gap-1 border border-slate-200"
            >
              <Globe className="w-4 h-4 text-brand-green" />
              <span>{language === "ar" ? "EN" : "عربي"}</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-lg text-[#062B55] hover:bg-slate-100 border border-slate-200 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out border-b border-[#DCE3EA] overflow-hidden ${
          isOpen ? "max-h-screen opacity-100 bg-white" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 py-4 space-y-1 bg-slate-50/50">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            
            if (link.dropdown) {
              return (
                <div key={link.href} className="space-y-1">
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                      active
                        ? "text-white bg-[#062B55]"
                        : "text-slate-700 hover:bg-slate-100 hover:text-[#062B55]"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                  <div className="ps-4 border-s-2 border-slate-200 ms-4 space-y-1 my-1">
                    {link.dropdown.map((subLink) => (
                      <Link
                        key={subLink.href}
                        href={subLink.href}
                        className="block px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-brand-navy"
                        onClick={() => setIsOpen(false)}
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                  active
                    ? "text-white bg-[#062B55]"
                    : "text-slate-700 hover:bg-slate-100 hover:text-[#062B55]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          
          <div className="pt-4 pb-2 px-2">
            <Link href="/membership" onClick={() => setIsOpen(false)}>
              <Button variant="secondary" className="w-full justify-between group">
                <span>{language === "ar" ? "انضم إلينا" : "Join Us"}</span>
                <ArrowIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
