"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import React, { createContext, useContext, useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { articles as defaultArticles, Article } from "@/data/articles";
import { events as defaultEvents, Event } from "@/data/events";
import { programs as defaultPrograms, Program } from "@/data/programs";
import { initialRegistrations, EventRegistration } from "@/data/registrations";
import { initialApplications, MembershipApplication } from "@/data/applications";
import { galleryItems as defaultGallery, GalleryItem } from "@/data/gallery";
import { partners as defaultPartners, Partner } from "@/data/partners";

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export interface SiteSettings {
  leagueNameAr: string;
  leagueNameEn: string;
  sloganAr: string;
  sloganEn: string;
  email: string;
  phone: string;
  addressAr: string;
  addressEn: string;
  primaryColor: "navy" | "teal" | "purple" | "orange";
  heroBannerUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
}

const initialContactMessages: ContactMessage[] = [
  {
    id: "MSG-001",
    fullName: "سليم بوحوش",
    email: "salim.b@gmail.com",
    subject: "طلب رعاية علمية لمعرض إلكترونيات",
    message: "السلام عليكم، نحن مجموعة من الطلبة ونود التعاون مع الرابطة لتنظيم معرض مصغر للابتكارات الإلكترونية في قسنطينة.",
    date: "2026-06-18",
  },
];

const defaultSettings: SiteSettings = {
  leagueNameAr: "الرابطة العلمية والتقنية للشباب – قسنطينة",
  leagueNameEn: "Scientific and Technical Youth League – Constantine",
  sloganAr: "نحو جيل يقود المستقبل بالعلم والابتكار",
  sloganEn: "Towards a generation leading the future with science and innovation",
  email: "contact@stly.dz",
  phone: "031 92 48 10",
  addressAr: "حي سيدي مبروك السفلي، قسنطينة، الجزائر",
  addressEn: "Sidi Mabrouk El Sifli, Constantine, Algeria",
  primaryColor: "navy",
  heroBannerUrl: "",
  instagramUrl: "",
  facebookUrl: "",
  youtubeUrl: "",
  tiktokUrl: "",
};

const GALLERY_SEED_VERSION = "2026-09-08-real-basma-tech-ansf";

interface PrototypeStateContextProps {
  articles: Article[];
  events: Event[];
  programs: Program[];
  registrations: EventRegistration[];
  applications: MembershipApplication[];
  contactMessages: ContactMessage[];
  galleryItems: GalleryItem[];
  partners: Partner[];
  isAdminAuthenticated: boolean;
  toasts: Toast[];
  siteSettings: SiteSettings;

  // Customizer actions
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;

  // Toast actions
  addToast: (message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;

  // CRUD & actions
  addArticle: (article: Omit<Article, "id" | "slug">) => void;
  updateArticle: (id: string, article: Partial<Article>) => void;
  deleteArticle: (id: string) => void;

  addEvent: (event: Omit<Event, "id" | "slug" | "isClosed">) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  toggleEventRegistration: (id: string) => void;

  addProgram: (program: Omit<Program, "id" | "slug">) => void;
  updateProgram: (id: string, program: Partial<Program>) => void;
  deleteProgram: (id: string) => void;

  submitEventRegistration: (registration: Omit<EventRegistration, "id" | "registrationDate" | "status" | "eventTitle">) => string; // Returns reference number
  updateRegistrationStatus: (id: string, status: EventRegistration["status"]) => void;

  submitMembershipApplication: (application: Omit<MembershipApplication, "id" | "submissionDate" | "status">) => void;
  updateApplicationStatus: (id: string, status: MembershipApplication["status"]) => void;

  submitContactMessage: (message: Omit<ContactMessage, "id" | "date">) => void;
  deleteContactMessage: (id: string) => void;

  addGalleryItem: (item: Omit<GalleryItem, "id">) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  addPartner: (partner: Omit<Partner, "id">) => void;
  deletePartner: (id: string) => void;

  adminLogin: (email: string, pass: string) => boolean;
  adminLogout: () => void;
}

const PrototypeStateContext = createContext<PrototypeStateContextProps | undefined>(undefined);

export const PrototypeStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  const [articles, setArticles] = useState<Article[]>(defaultArticles);
  const [events, setEvents] = useState<Event[]>(defaultEvents);
  const [programs, setPrograms] = useState<Program[]>(defaultPrograms);
  const [registrations, setRegistrations] = useState<EventRegistration[]>(initialRegistrations);
  const [applications, setApplications] = useState<MembershipApplication[]>(initialApplications);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(initialContactMessages);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(defaultGallery);
  const [partners, setPartners] = useState<Partner[]>(defaultPartners);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdRef = React.useRef(0);

  // Settings State
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSettings);

  // Initialize data on mount
  useEffect(() => {
    const loadState = <T,>(key: string, defaults: T[]): T[] => {
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error(`Error parsing ${key} from localStorage`, e);
        }
      }
      return defaults;
    };

    const loadGalleryState = (): GalleryItem[] => {
      const stored = localStorage.getItem("stly_gallery");
      if (!stored) {
        localStorage.setItem("stly_gallery_seed_version", GALLERY_SEED_VERSION);
        return defaultGallery;
      }

      try {
        const parsed = JSON.parse(stored) as GalleryItem[];
        const storedSeedVersion = localStorage.getItem("stly_gallery_seed_version");
        if (storedSeedVersion === GALLERY_SEED_VERSION) return parsed;

        const knownKeys = new Set(
          parsed.map((item) => (item.socialUrl || item.url || item.id).toLowerCase())
        );
        const missingDefaults = defaultGallery.filter(
          (item) => !knownKeys.has((item.socialUrl || item.url || item.id).toLowerCase())
        );

        localStorage.setItem("stly_gallery_seed_version", GALLERY_SEED_VERSION);
        return [...missingDefaults, ...parsed];
      } catch (e) {
        console.error("Error parsing stly_gallery from localStorage", e);
        localStorage.setItem("stly_gallery_seed_version", GALLERY_SEED_VERSION);
        return defaultGallery;
      }
    };

    setArticles(loadState("stly_articles", defaultArticles));
    setEvents(loadState("stly_events", defaultEvents));
    setPrograms(loadState("stly_programs", defaultPrograms));
    setRegistrations(loadState("stly_registrations", initialRegistrations));
    setApplications(loadState("stly_applications", initialApplications));
    setContactMessages(loadState("stly_contact_messages", initialContactMessages));
    setGalleryItems(loadGalleryState());
    setPartners(loadState("stly_partners", defaultPartners));

    // Load customizer settings
    const storedSettings = localStorage.getItem("stly_site_settings");
    if (storedSettings) {
      try {
        setSiteSettings(JSON.parse(storedSettings));
      } catch (e) {
        console.error("Error parsing settings from localStorage", e);
      }
    }

    const auth = localStorage.getItem("stly_admin_auth");
    if (auth === "true") {
      setIsAdminAuthenticated(true);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage when state changes (after hydration)
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("stly_articles", JSON.stringify(articles));
  }, [articles, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("stly_events", JSON.stringify(events));
  }, [events, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("stly_programs", JSON.stringify(programs));
  }, [programs, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("stly_registrations", JSON.stringify(registrations));
  }, [registrations, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("stly_applications", JSON.stringify(applications));
  }, [applications, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("stly_contact_messages", JSON.stringify(contactMessages));
  }, [contactMessages, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("stly_gallery", JSON.stringify(galleryItems));
  }, [galleryItems, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("stly_partners", JSON.stringify(partners));
  }, [partners, isHydrated]);

  // Save Customizer settings
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("stly_site_settings", JSON.stringify(siteSettings));
  }, [siteSettings, isHydrated]);

  // Inject Theme Color variables in root document
  useEffect(() => {
    if (!isHydrated) return;
    const colors = {
      navy: { primary: "#062B55", primaryLight: "#0d4682" },
      teal: { primary: "#0D9488", primaryLight: "#14b8a6" },
      purple: { primary: "#7C3AED", primaryLight: "#8b5cf6" },
      orange: { primary: "#D97706", primaryLight: "#f59e0b" },
    };
    const theme = colors[siteSettings.primaryColor] || colors.navy;
    if (typeof window !== "undefined") {
      document.documentElement.style.setProperty("--color-brand-navy", theme.primary);
      document.documentElement.style.setProperty("--color-brand-navy-light", theme.primaryLight);
    }
  }, [siteSettings.primaryColor, isHydrated]);

  // Settings Actions
  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...settings }));
    addToast(
      language === "ar" ? "تم حفظ إعدادات المظهر بنجاح!" : "Appearance settings saved successfully!",
      "success"
    );
  };

  // Toast actions
  const addToast = (message: string, type: "success" | "error" | "info" = "success") => {
    toastIdRef.current += 1;
    const id = `toast-${toastIdRef.current}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Helper for generating slugs
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF]/g, "-") // support Arabic chars in slug
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  // CRUD implementations
  const addArticle = (art: Omit<Article, "id" | "slug">) => {
    const slug = slugify(art.title.en || art.title.ar);
    const newArt: Article = {
      ...art,
      id: `ART-${Date.now()}`,
      slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
    };
    setArticles((prev) => [newArt, ...prev]);
    addToast(
      language === "ar" ? "تم إضافة المقال بنجاح!" : "Article added successfully!",
      "success"
    );
  };

  const updateArticle = (id: string, fieldsToUpdate: Partial<Article>) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...fieldsToUpdate } : a))
    );
    addToast(
      language === "ar" ? "تم تحديث المقال بنجاح!" : "Article updated successfully!",
      "success"
    );
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    addToast(
      language === "ar" ? "تم حذف المقال بنجاح!" : "Article deleted successfully!",
      "info"
    );
  };

  const addEvent = (evt: Omit<Event, "id" | "slug" | "isClosed">) => {
    const slug = slugify(evt.title.en || evt.title.ar);
    const newEvt: Event = {
      ...evt,
      id: `EVT-${Date.now()}`,
      slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
      isClosed: false,
    };
    setEvents((prev) => [newEvt, ...prev]);
    addToast(
      language === "ar" ? "تم إضافة الفعالية بنجاح!" : "Event added successfully!",
      "success"
    );
  };

  const updateEvent = (id: string, fieldsToUpdate: Partial<Event>) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...fieldsToUpdate } : e))
    );
    addToast(
      language === "ar" ? "تم تحديث الفعالية بنجاح!" : "Event updated successfully!",
      "success"
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    addToast(
      language === "ar" ? "تم حذف الفعالية بنجاح!" : "Event deleted successfully!",
      "info"
    );
  };

  const toggleEventRegistration = (id: string) => {
    let closedState = false;
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          closedState = !e.isClosed;
          return { ...e, isClosed: closedState };
        }
        return e;
      })
    );
    addToast(
      language === "ar"
        ? closedState
          ? "تم إغلاق التسجيل في الفعالية!"
          : "تم فتح التسجيل في الفعالية!"
        : closedState
        ? "Event registration closed!"
        : "Event registration opened!",
      "info"
    );
  };

  const addProgram = (prog: Omit<Program, "id" | "slug">) => {
    const slug = slugify(prog.name.en || prog.name.ar);
    const newProg: Program = {
      ...prog,
      id: `PROG-${Date.now()}`,
      slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
    };
    setPrograms((prev) => [newProg, ...prev]);
    addToast(
      language === "ar" ? "تم إضافة البرنامج بنجاح!" : "Program added successfully!",
      "success"
    );
  };

  const updateProgram = (id: string, fieldsToUpdate: Partial<Program>) => {
    setPrograms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...fieldsToUpdate } : p))
    );
    addToast(
      language === "ar" ? "تم تحديث البرنامج بنجاح!" : "Program updated successfully!",
      "success"
    );
  };

  const deleteProgram = (id: string) => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
    addToast(
      language === "ar" ? "تم حذف البرنامج بنجاح!" : "Program deleted successfully!",
      "info"
    );
  };

  const submitEventRegistration = (reg: Omit<EventRegistration, "id" | "registrationDate" | "status" | "eventTitle">): string => {
    const refNum = `REG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const eventObj = events.find((e) => e.id === reg.eventId);
    const eventTitle = eventObj
      ? eventObj.title
      : { ar: "فعالية خاصة", en: "Special Event" };

    const newReg: EventRegistration = {
      ...reg,
      id: refNum,
      eventTitle,
      registrationDate: new Date().toISOString().split("T")[0],
      status: "pending",
    };
    setRegistrations((prev) => [newReg, ...prev]);
    addToast(
      language === "ar"
        ? "تم تقديم طلب التسجيل بنجاح! رقم المرجع الخاص بك هو " + refNum
        : "Registration submitted successfully! Your reference number is " + refNum,
      "success"
    );
    return refNum;
  };

  const updateRegistrationStatus = (id: string, status: EventRegistration["status"]) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    addToast(
      language === "ar"
        ? `تم تحديث حالة التسجيل إلى: ${status === "confirmed" ? "مؤكد" : status === "rejected" ? "مرفوض" : "قيد الانتظار"}`
        : `Registration status updated to ${status}`,
      "info"
    );
  };

  const submitMembershipApplication = (app: Omit<MembershipApplication, "id" | "submissionDate" | "status">) => {
    const refNum = `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp: MembershipApplication = {
      ...app,
      id: refNum,
      submissionDate: new Date().toISOString().split("T")[0],
      status: "pending",
    };
    setApplications((prev) => [newApp, ...prev]);
    addToast(
      language === "ar"
        ? "تم تقديم طلب الانضمام للرابطة بنجاح! سنتواصل معك قريباً."
        : "Membership application submitted successfully! We will contact you soon.",
      "success"
    );
  };

  const updateApplicationStatus = (id: string, status: MembershipApplication["status"]) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    addToast(
      language === "ar"
        ? `تم تحديث حالة طلب العضوية إلى: ${status === "accepted" ? "مقبول" : status === "rejected" ? "مرفوض" : "قيد الدراسة"}`
        : `Application status updated to ${status}`,
      "info"
    );
  };

  const submitContactMessage = (msg: Omit<ContactMessage, "id" | "date">) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `MSG-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
    };
    setContactMessages((prev) => [newMsg, ...prev]);
    addToast(
      language === "ar" ? "تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا." : "Your message has been sent successfully! Thank you.",
      "success"
    );
  };

  const deleteContactMessage = (id: string) => {
    setContactMessages((prev) => prev.filter((m) => m.id !== id));
    addToast(
      language === "ar" ? "تم حذف الرسالة بنجاح!" : "Message deleted successfully!",
      "info"
    );
  };

  const addGalleryItem = (item: Omit<GalleryItem, "id">) => {
    const newItem: GalleryItem = {
      ...item,
      id: `GAL-${Date.now()}`,
    };
    setGalleryItems((prev) => [newItem, ...prev]);
    addToast(
      language === "ar" ? "تم إضافة المادة إلى المعرض!" : "Media item added to gallery!",
      "success"
    );
  };

  const updateGalleryItem = (id: string, updatedFields: Partial<GalleryItem>) => {
    setGalleryItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...updatedFields } : i))
    );
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((i) => i.id !== id));
    addToast(
      language === "ar" ? "تم حذف مادة المعرض!" : "Media item deleted from gallery!",
      "info"
    );
  };

  const addPartner = (part: Omit<Partner, "id">) => {
    const newPart: Partner = {
      ...part,
      id: `PART-${Date.now()}`,
    };
    setPartners((prev) => [newPart, ...prev]);
    addToast(
      language === "ar" ? "تم إضافة الشريك بنجاح!" : "Partner added successfully!",
      "success"
    );
  };

  const deletePartner = (id: string) => {
    setPartners((prev) => prev.filter((p) => p.id !== id));
    addToast(
      language === "ar" ? "تم حذف الشريك بنجاح!" : "Partner deleted successfully!",
      "info"
    );
  };

  // Auth operations
  const adminLogin = (email: string, pass: string): boolean => {
    if (email === "admin@stly.dz" && pass === "demo123") {
      setIsAdminAuthenticated(true);
      localStorage.setItem("stly_admin_auth", "true");
      addToast(
        language === "ar" ? "مرحباً بك مجدداً في لوحة التحكم!" : "Welcome back to the dashboard!",
        "success"
      );
      return true;
    }
    addToast(
      language === "ar" ? "البريد الإلكتروني أو كلمة المرور غير صحيحة" : "Invalid email or password",
      "error"
    );
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem("stly_admin_auth");
    addToast(
      language === "ar" ? "تم تسجيل الخروج بنجاح" : "Logged out successfully",
      "info"
    );
  };

  return (
    <PrototypeStateContext.Provider
      value={{
        articles,
        events,
        programs,
        registrations,
        applications,
        contactMessages,
        galleryItems,
        partners,
        isAdminAuthenticated,
        toasts,
        siteSettings,
        updateSiteSettings,
        addToast,
        removeToast,
        addArticle,
        updateArticle,
        deleteArticle,
        addEvent,
        updateEvent,
        deleteEvent,
        toggleEventRegistration,
        addProgram,
        updateProgram,
        deleteProgram,
        submitEventRegistration,
        updateRegistrationStatus,
        submitMembershipApplication,
        updateApplicationStatus,
        submitContactMessage,
        deleteContactMessage,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addPartner,
        deletePartner,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </PrototypeStateContext.Provider>
  );
};

export const usePrototypeState = () => {
  const context = useContext(PrototypeStateContext);
  if (!context) {
    throw new Error("usePrototypeState must be used within a PrototypeStateProvider");
  }
  return context;
};
