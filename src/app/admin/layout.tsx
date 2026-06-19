"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { usePrototypeState } from "@/context/PrototypeStateContext";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Grid,
  Users,
  UserCheck,
  Image as ImageIcon,
  Handshake,
  Settings,
  LogOut,
  Menu,
  X,
  Globe,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();
  const { isAdminAuthenticated, adminLogout } = usePrototypeState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // If this is the login page, bypass layout
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoaded(true);
  }, []);

  // Redirect to login if not authenticated on admin pages
  useEffect(() => {
    if (isLoaded && !isLoginPage && !isAdminAuthenticated) {
      router.push("/admin/login");
    }
  }, [isLoaded, isLoginPage, isAdminAuthenticated, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center text-sm font-semibold">
        {t("admin.common.loading")}
      </div>
    );
  }

  // If it's login page, render plain
  if (isLoginPage) {
    return <>{children}</>;
  }

  // If not authenticated, show gate screen before router push completes
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-6 text-center space-y-4">
        <Lock className="h-10 w-10 text-brand-navy animate-bounce" />
        <h3 className="font-extrabold text-brand-dark text-sm">
          {language === "ar" ? "الوصول مقيد - يرجى تسجيل الدخول" : "Restricted Access - Please Login"}
        </h3>
        <Link href="/admin/login">
          <Button variant="primary">{t("nav.login")}</Button>
        </Link>
      </div>
    );
  }

  const sidebarLinks = [
    { href: "/admin", label: t("admin.dashboard"), icon: LayoutDashboard },
    { href: "/admin/articles", label: t("admin.articles"), icon: FileText },
    { href: "/admin/events", label: t("admin.events"), icon: Calendar },
    { href: "/admin/programs", label: t("admin.programs"), icon: Grid },
    { href: "/admin/registrations", label: t("admin.registrations"), icon: Users },
    { href: "/admin/membership", label: t("admin.membership"), icon: UserCheck },
    { href: "/admin/gallery", label: t("admin.gallery"), icon: ImageIcon },
    { href: "/admin/partners", label: t("admin.partners"), icon: Handshake },
    { href: "/admin/settings", label: t("admin.settings"), icon: Settings },
  ];

  const handleLogout = () => {
    adminLogout();
    router.push("/admin/login");
  };

  const getPageTitle = () => {
    const link = sidebarLinks.find((l) => l.href === pathname);
    return link ? link.label : t("admin.dashboard");
  };

  return (
    <div className="min-h-screen bg-brand-bg flex">
      {/* 1. SIDEBAR (Desktop) */}
      <aside className="hidden md:flex md:w-64 flex-col bg-brand-dark text-white border-l border-brand-navy-light rtl:border-l ltr:border-r border-r-0">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-2">
          <span className="h-8 w-8 bg-white text-brand-navy rounded flex items-center justify-center font-extrabold text-sm border border-brand-green">
            STLY
          </span>
          <div className="flex flex-col leading-none">
            <span className="text-xs font-bold text-white">{language === "ar" ? "لوحة الإدارة" : "Admin Panel"}</span>
            <span className="text-[9px] text-brand-green font-bold">STLY Constantine</span>
          </div>
        </div>

        {/* Links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-semibold transition-colors ${
                  active
                    ? "bg-brand-navy text-white font-extrabold"
                    : "text-slate-400 hover:text-white hover:bg-brand-navy/10"
                }`}
              >
                <Icon className="h-4.5 w-4.5 flex-shrink-0" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full text-slate-400 hover:text-white hover:bg-red-950/20 text-xs justify-start px-3 py-2"
            leftIcon={<LogOut className="h-4.5 w-4.5 text-red-500" />}
          >
            {t("admin.logout")}
          </Button>
        </div>
      </aside>

      {/* MOBILE SIDEBAR DRAWDER */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-brand-dark/50" onClick={() => setSidebarOpen(false)} />

          <aside className="relative w-64 bg-brand-dark text-white flex flex-col z-10 border-l border-brand-navy-light rtl:border-l ltr:border-r border-r-0">
            <div className="h-16 flex items-center px-6 border-b border-slate-800 justify-between">
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 bg-white text-brand-navy rounded flex items-center justify-center font-extrabold text-sm border border-brand-green">
                  STLY
                </span>
                <span className="text-xs font-bold text-white">{language === "ar" ? "لوحة الإدارة" : "Admin Panel"}</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-1 rounded hover:bg-slate-800">
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                      active
                        ? "bg-brand-navy text-white"
                        : "text-slate-400 hover:text-white hover:bg-brand-navy/10"
                    }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-slate-800">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full text-slate-400 hover:text-white text-sm justify-start px-3"
                leftIcon={<LogOut className="h-5 w-5 text-red-500" />}
              >
                {t("admin.logout")}
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Main dashboard body */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-brand-border flex items-center justify-between px-6 z-10 shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -mr-2 text-brand-dark hover:text-brand-navy md:hidden rounded-md hover:bg-brand-bg cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="text-base font-extrabold text-brand-dark">
              {getPageTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
              leftIcon={<Globe className="h-4 w-4" />}
            >
              {language === "ar" ? "English" : "العربية"}
            </Button>

            <div className="h-4 w-[1px] bg-brand-border hidden sm:block" />

            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="h-8 w-8 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold">
                AD
              </span>
              <span className="font-extrabold text-brand-dark">{t("admin.welcome")}</span>
            </div>

            <Link href="/" className="hidden sm:block">
              <Button variant="outline" size="sm">
                {language === "ar" ? "معاينة الموقع" : "View Website"}
              </Button>
            </Link>
          </div>
        </header>

        {/* Content body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
