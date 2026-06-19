"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, User } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Hide navbar on admin dashboards except admin login
  const isAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin/login";

  if (isAdminRoute) return null;

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/fields", label: t("nav.fields") },
    { href: "/programs", label: t("nav.programs") },
    { href: "/events", label: t("nav.events") },
    { href: "/news", label: t("nav.news") },
    { href: "/gallery", label: t("nav.gallery") },
    { href: "/partners", label: t("nav.partners") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const handleLanguageToggle = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 select-none">
              <span className="h-9 w-9 bg-brand-navy rounded-md flex items-center justify-center text-white font-bold text-lg border border-brand-green">
                STLY
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-extrabold text-brand-navy">
                  {language === "ar" ? "رابطة الشباب العلمية" : "STLY Constantine"}
                </span>
                <span className="text-[10px] text-brand-green font-bold">
                  {language === "ar" ? "قسنطينة" : "Constantine"}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                  isActive(link.href)
                    ? "text-brand-navy bg-brand-navy/5 font-extrabold"
                    : "text-brand-dark hover:text-brand-navy hover:bg-brand-bg"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLanguageToggle}
              leftIcon={<Globe className="h-4 w-4" />}
            >
              {language === "ar" ? "English" : "العربية"}
            </Button>

            {/* Join Us Link Button */}
            <Link href="/membership">
              <Button variant="secondary" size="sm">
                {t("nav.membership")}
              </Button>
            </Link>

            {/* Admin Login Shortcut */}
            <Link href="/admin/login">
              <Button variant="outline" size="sm" leftIcon={<User className="h-4 w-4" />}>
                {t("nav.login")}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleLanguageToggle}>
              <Globe className="h-5 w-5" />
            </Button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-dark hover:text-brand-navy p-2 rounded-md hover:bg-brand-bg cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-brand-border bg-white px-2 pt-2 pb-4 space-y-1 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2.5 rounded-md text-base font-semibold ${
                isActive(link.href)
                  ? "text-brand-navy bg-brand-navy/5"
                  : "text-brand-dark hover:bg-brand-bg"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-brand-border my-2 pt-2 px-4 flex flex-col gap-2">
            <Link href="/membership" onClick={() => setIsOpen(false)} className="w-full">
              <Button variant="secondary" size="md" className="w-full">
                {t("nav.membership")}
              </Button>
            </Link>
            <Link href="/admin/login" onClick={() => setIsOpen(false)} className="w-full">
              <Button variant="outline" size="md" className="w-full" leftIcon={<User className="h-4 w-4" />}>
                {t("nav.login")}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
