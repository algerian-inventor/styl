"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { createClient } from "@/lib/supabase/client";
import { articles as defaultArticles, Article } from "@/data/articles";
import { events as defaultEvents, Event } from "@/data/events";
import { programs as defaultPrograms, Program } from "@/data/programs";
import { initialRegistrations, EventRegistration } from "@/data/registrations";
import { initialApplications, MembershipApplication } from "@/data/applications";
import { galleryItems as defaultGallery, GalleryItem } from "@/data/gallery";
import { partners as defaultPartners, Partner } from "@/data/partners";

import { fetchArticles, createArticleInDB, deleteArticleInDB } from "@/lib/data/articles";
import { fetchEvents, createEventInDB, toggleEventRegistrationInDB, deleteEventInDB } from "@/lib/data/events";
import { fetchPrograms, createProgramInDB, updateProgramInDB, deleteProgramInDB } from "@/lib/data/programs";
import { fetchGalleryItems, createGalleryItemInDB, deleteGalleryItemInDB } from "@/lib/data/gallery";
import { fetchPartners, createPartnerInDB, deletePartnerInDB } from "@/lib/data/partners";
import { fetchSiteSettings, updateSiteSettingsInDB, defaultSettings } from "@/lib/data/settings";
import { fetchEventRegistrations, createEventRegistrationInDB, updateRegistrationStatusInDB } from "@/lib/data/registrations";
import { fetchMembershipApplications, createMembershipApplicationInDB, updateApplicationStatusInDB } from "@/lib/data/membership";
import { fetchContactMessages, createContactMessageInDB, deleteContactMessageInDB } from "@/lib/data/contact";

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
}

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
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<void>;

  // Toast actions
  addToast: (message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;

  // CRUD & actions
  addArticle: (article: Omit<Article, "id" | "slug">) => Promise<void>;
  updateArticle: (id: string, article: Partial<Article>) => void;
  deleteArticle: (id: string) => Promise<void>;

  addEvent: (event: Omit<Event, "id" | "slug" | "isClosed">) => Promise<void>;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => Promise<void>;
  toggleEventRegistration: (id: string) => Promise<void>;

  addProgram: (program: Omit<Program, "id" | "slug">) => Promise<void>;
  updateProgram: (id: string, program: Partial<Program>) => Promise<void>;
  deleteProgram: (id: string) => Promise<void>;

  submitEventRegistration: (registration: Omit<EventRegistration, "id" | "registrationDate" | "status" | "eventTitle">) => Promise<string>;
  updateRegistrationStatus: (id: string, status: EventRegistration["status"]) => Promise<void>;

  submitMembershipApplication: (application: Omit<MembershipApplication, "id" | "submissionDate" | "status">) => Promise<void>;
  updateApplicationStatus: (id: string, status: MembershipApplication["status"]) => Promise<void>;

  submitContactMessage: (message: Omit<ContactMessage, "id" | "date">) => Promise<void>;
  deleteContactMessage: (id: string) => Promise<void>;

  addGalleryItem: (item: Omit<GalleryItem, "id">) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;

  addPartner: (partner: Omit<Partner, "id">) => Promise<void>;
  deletePartner: (id: string) => Promise<void>;

  adminLogin: (email: string, pass: string) => Promise<boolean>;
  adminLogout: () => Promise<void>;
}

const PrototypeStateContext = createContext<PrototypeStateContextProps | undefined>(undefined);

export const PrototypeStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  const [articles, setArticles] = useState<Article[]>(defaultArticles);
  const [events, setEvents] = useState<Event[]>(defaultEvents);
  const [programs, setPrograms] = useState<Program[]>(defaultPrograms);
  const [registrations, setRegistrations] = useState<EventRegistration[]>(initialRegistrations);
  const [applications, setApplications] = useState<MembershipApplication[]>(initialApplications);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(defaultGallery);
  const [partners, setPartners] = useState<Partner[]>(defaultPartners);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSettings);
  const toastIdRef = React.useRef(0);

  // Initialize and sync session with Supabase Auth
  useEffect(() => {
    const supabase = createClient();

    // Check auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdminAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdminAuthenticated(!!session);
    });

    // Load initial data from data layer
    fetchSiteSettings().then(setSiteSettings);
    fetchArticles().then(setArticles);
    fetchEvents().then(setEvents);
    fetchPrograms().then(setPrograms);
    fetchGalleryItems().then(setGalleryItems);
    fetchPartners().then(setPartners);
    fetchEventRegistrations().then(setRegistrations);
    fetchMembershipApplications().then(setApplications);
    fetchContactMessages().then(setContactMessages);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Inject Theme Color variables in root document
  useEffect(() => {
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
  }, [siteSettings.primaryColor]);

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

  // Customizer actions
  const updateSiteSettings = async (settings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...settings }));
    await updateSiteSettingsInDB(settings);
    addToast(
      language === "ar" ? "تم حفظ إعدادات المظهر بنجاح!" : "Appearance settings saved successfully!",
      "success"
    );
  };

  // Article Actions
  const addArticle = async (art: Omit<Article, "id" | "slug">) => {
    const created = await createArticleInDB(art);
    if (created) {
      setArticles((prev) => [created, ...prev]);
    }
    addToast(
      language === "ar" ? "تم إضافة المقال بنجاح!" : "Article added successfully!",
      "success"
    );
  };

  const updateArticle = (id: string, fieldsToUpdate: Partial<Article>) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...fieldsToUpdate } : a))
    );
  };

  const deleteArticle = async (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    await deleteArticleInDB(id);
    addToast(
      language === "ar" ? "تم حذف المقال بنجاح!" : "Article deleted successfully!",
      "info"
    );
  };

  // Event Actions
  const addEvent = async (evt: Omit<Event, "id" | "slug" | "isClosed">) => {
    const created = await createEventInDB(evt);
    if (created) {
      setEvents((prev) => [created, ...prev]);
    }
    addToast(
      language === "ar" ? "تم إضافة الفعالية بنجاح!" : "Event added successfully!",
      "success"
    );
  };

  const updateEvent = (id: string, fieldsToUpdate: Partial<Event>) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...fieldsToUpdate } : e))
    );
  };

  const deleteEvent = async (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    await deleteEventInDB(id);
    addToast(
      language === "ar" ? "تم حذف الفعالية بنجاح!" : "Event deleted successfully!",
      "info"
    );
  };

  const toggleEventRegistration = async (id: string) => {
    let currentIsClosed = false;
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          currentIsClosed = e.isClosed;
          return { ...e, isClosed: !e.isClosed };
        }
        return e;
      })
    );
    await toggleEventRegistrationInDB(id, currentIsClosed);
    addToast(
      language === "ar" ? "تم تحديث حالة الفعالية بنجاح!" : "Event registration toggled!",
      "info"
    );
  };

  // Program Actions
  const addProgram = async (prog: Omit<Program, "id" | "slug">) => {
    const created = await createProgramInDB(prog);
    if (created) {
      setPrograms((prev) => [created, ...prev]);
    }
    addToast(
      language === "ar" ? "تم إضافة البرنامج بنجاح!" : "Program added successfully!",
      "success"
    );
  };

  const updateProgram = async (id: string, fieldsToUpdate: Partial<Program>) => {
    setPrograms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...fieldsToUpdate } : p))
    );
    await updateProgramInDB(id, fieldsToUpdate);
    addToast(
      language === "ar" ? "تم تحديث البرنامج بنجاح!" : "Program updated successfully!",
      "success"
    );
  };

  const deleteProgram = async (id: string) => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
    await deleteProgramInDB(id);
    addToast(
      language === "ar" ? "تم حذف البرنامج بنجاح!" : "Program deleted successfully!",
      "info"
    );
  };

  // Registration Submissions
  const submitEventRegistration = async (
    reg: Omit<EventRegistration, "id" | "registrationDate" | "status" | "eventTitle">
  ): Promise<string> => {
    const result = await createEventRegistrationInDB(reg);
    const eventObj = events.find((e) => e.id === reg.eventId);
    const newReg: EventRegistration = {
      ...reg,
      id: result.referenceNumber,
      eventTitle: eventObj ? eventObj.title : { ar: "فعالية خاصة", en: "Special Event" },
      registrationDate: new Date().toISOString().split("T")[0],
      status: "pending",
    };
    setRegistrations((prev) => [newReg, ...prev]);
    addToast(
      language === "ar"
        ? "تم تقديم طلب التسجيل بنجاح! رقم المرجع الخاص بك هو " + result.referenceNumber
        : "Registration submitted successfully! Reference: " + result.referenceNumber,
      "success"
    );
    return result.referenceNumber;
  };

  const updateRegistrationStatus = async (id: string, status: EventRegistration["status"]) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    await updateRegistrationStatusInDB(id, status);
    addToast(
      language === "ar" ? "تم تحديث حالة التسجيل بنجاح!" : "Registration status updated!",
      "info"
    );
  };

  // Membership Applications
  const submitMembershipApplication = async (
    app: Omit<MembershipApplication, "id" | "submissionDate" | "status">
  ) => {
    await createMembershipApplicationInDB({
      fullName: app.fullName,
      dob: app.dob,
      wilaya: app.wilaya,
      municipality: app.municipality,
      email: app.email,
      phone: app.phone,
      educationProfession: app.educationProfession,
      scientificInterests: app.scientificInterests,
      skills: app.skills,
      motivation: app.motivation,
      portfolio: app.portfolio,
    });

    const newApp: MembershipApplication = {
      ...app,
      id: `APP-${Date.now()}`,
      submissionDate: new Date().toISOString().split("T")[0],
      status: "pending",
    };
    setApplications((prev) => [newApp, ...prev]);
    addToast(
      language === "ar" ? "تم تقديم طلب الانضمام للرابطة بنجاح!" : "Membership application submitted!",
      "success"
    );
  };

  const updateApplicationStatus = async (id: string, status: MembershipApplication["status"]) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    await updateApplicationStatusInDB(id, status);
    addToast(
      language === "ar" ? "تم تحديث حالة طلب العضوية بنجاح!" : "Application status updated!",
      "info"
    );
  };

  // Contact Messages
  const submitContactMessage = async (msg: Omit<ContactMessage, "id" | "date">) => {
    await createContactMessageInDB(msg);
    const newMsg: ContactMessage = {
      ...msg,
      id: `MSG-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
    };
    setContactMessages((prev) => [newMsg, ...prev]);
    addToast(
      language === "ar" ? "تم إرسال رسالتك بنجاح!" : "Message sent successfully!",
      "success"
    );
  };

  const deleteContactMessage = async (id: string) => {
    setContactMessages((prev) => prev.filter((m) => m.id !== id));
    await deleteContactMessageInDB(id);
    addToast(
      language === "ar" ? "تم حذف الرسالة بنجاح!" : "Message deleted successfully!",
      "info"
    );
  };

  // Gallery Actions
  const addGalleryItem = async (item: Omit<GalleryItem, "id">) => {
    const created = await createGalleryItemInDB(item);
    if (created) {
      setGalleryItems((prev) => [created, ...prev]);
    }
    addToast(
      language === "ar" ? "تم إضافة المادة إلى المعرض!" : "Item added to gallery!",
      "success"
    );
  };

  const deleteGalleryItem = async (id: string) => {
    setGalleryItems((prev) => prev.filter((i) => i.id !== id));
    await deleteGalleryItemInDB(id);
    addToast(
      language === "ar" ? "تم حذف مادة المعرض!" : "Gallery item deleted!",
      "info"
    );
  };

  // Partner Actions
  const addPartner = async (part: Omit<Partner, "id">) => {
    const created = await createPartnerInDB(part);
    if (created) {
      setPartners((prev) => [created, ...prev]);
    }
    addToast(
      language === "ar" ? "تم إضافة الشريك بنجاح!" : "Partner added successfully!",
      "success"
    );
  };

  const deletePartner = async (id: string) => {
    setPartners((prev) => prev.filter((p) => p.id !== id));
    await deletePartnerInDB(id);
    addToast(
      language === "ar" ? "تم حذف الشريك بنجاح!" : "Partner deleted successfully!",
      "info"
    );
  };

  // Real Supabase Auth operations
  const adminLogin = async (email: string, pass: string): Promise<boolean> => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });

      if (error || !data.user) {
        addToast(
          language === "ar" ? "خطأ في البريد الإلكتروني أو كلمة المرور" : "Invalid email or password",
          "error"
        );
        return false;
      }

      setIsAdminAuthenticated(true);
      addToast(
        language === "ar" ? "مرحباً بك مجدداً في لوحة التحكم!" : "Welcome back to the dashboard!",
        "success"
      );
      return true;
    } catch (err) {
      console.error("Login error:", err);
      addToast(
        language === "ar" ? "حدث خطأ أثناء تسجيل الدخول" : "An error occurred during login",
        "error"
      );
      return false;
    }
  };

  const adminLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setIsAdminAuthenticated(false);
      addToast(
        language === "ar" ? "تم تسجيل الخروج بنجاح" : "Logged out successfully",
        "info"
      );
    } catch (err) {
      console.error("Logout error:", err);
      setIsAdminAuthenticated(false);
    }
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
