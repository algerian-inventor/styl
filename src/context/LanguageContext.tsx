"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language } from "@/data/translations";

interface LanguageContextProps {
  language: Language;
  dir: "rtl" | "ltr";
  t: (path: string) => string;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("ar");
  const [dir, setDir] = useState<"rtl" | "ltr">("rtl");

  // Load saved preference on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("styl_lang") as Language;
    if (savedLang && (savedLang === "ar" || savedLang === "en")) {
      setLanguageState(savedLang);
      setDir(savedLang === "ar" ? "rtl" : "ltr");
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setDir(lang === "ar" ? "rtl" : "ltr");
    localStorage.setItem("styl_lang", lang);
    if (typeof window !== "undefined") {
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  };

  // Sync HTML elements attributes on mount/change
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  const t = (path: string): string => {
    const parts = path.split(".");
    let current: any = translations[language];
    for (const part of parts) {
      if (current && typeof current === "object" && part in current) {
        current = current[part];
      } else {
        // Fallback to English if translation is missing in current language
        let fallback: any = translations["en"];
        for (const fPart of parts) {
          if (fallback && typeof fallback === "object" && fPart in fallback) {
            fallback = fallback[fPart];
          } else {
            return path;
          }
        }
        return typeof fallback === "string" ? fallback : path;
      }
    }
    return typeof current === "string" ? current : path;
  };

  return (
    <LanguageContext.Provider value={{ language, dir, t, setLanguage }}>
      <div className={language === "ar" ? "font-cairo" : "font-outfit"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
