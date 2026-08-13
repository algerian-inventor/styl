"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { createClient } from "@/lib/supabase/client";
import { Article } from "@/data/articles";
import { Event } from "@/data/events";
import { Program } from "@/data/programs";
import { EventRegistration } from "@/data/registrations";
import { MembershipApplication } from "@/data/applications";
import { GalleryItem } from "@/data/gallery";
import { Partner } from "@/data/partners";

import { fetchArticles, createArticleInDB, updateArticleInDB, deleteArticleInDB } from "@/lib/data/articles";
import { fetchEvents, createEventInDB, updateEventInDB, toggleEventRegistrationInDB, deleteEventInDB } from "@/lib/data/events";
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

  // Staff Private Data Loaders
  loadRegistrations: () => Promise<void>;
  loadApplications: () => Promise<void>;
  loadContactMessages: () => Promise<void>;

  // Customizer actions
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<boolean>;

  // Toast actions
  addToast: (message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;

  // CRUD & actions
  addArticle: (article: Omit<Article, "id" | "slug">) => Promise<boolean>;
  updateArticle: (id: string, article: Partial<Article>) => Promise<boolean>;
  deleteArticle: (id: string) => Promise<boolean>;

  addEvent: (event: Omit<Event, "id" | "slug" | "isClosed">) => Promise<boolean>;
  updateEvent: (id: string, event: Partial<Event>) => Promise<boolean>;
  deleteEvent: (id: string) => Promise<boolean>;
  toggleEventRegistration: (id: string) => Promise<boolean>;

  addProgram: (program: Omit<Program, "id" | "slug">) => Promise<boolean>;
  updateProgram: (id: string, program: Partial<Program>) => Promise<boolean>;
  deleteProgram: (id: string) => Promise<boolean>;

  submitEventRegistration: (registration: Omit<EventRegistration, "id" | "registrationDate" | "status" | "eventTitle">) => Promise<{ success: boolean; referenceNumber: string | null; error?: string }>;
  updateRegistrationStatus: (id: string, status: EventRegistration["status"]) => Promise<boolean>;

  submitMembershipApplication: (application: Omit<MembershipApplication, "id" | "submissionDate" | "status">) => Promise<boolean>;
  updateApplicationStatus: (id: string, status: MembershipApplication["status"]) => Promise<boolean>;

  submitContactMessage: (message: Omit<ContactMessage, "id" | "date">) => Promise<boolean>;
  deleteContactMessage: (id: string) => Promise<boolean>;

  addGalleryItem: (item: Omit<GalleryItem, "id">) => Promise<boolean>;
  deleteGalleryItem: (id: string) => Promise<boolean>;

  addPartner: (partner: Omit<Partner, "id">) => Promise<boolean>;
  deletePartner: (id: string) => Promise<boolean>;

  adminLogin: (email: string, pass: string) => Promise<boolean>;
  adminLogout: () => Promise<void>;
}

const PrototypeStateContext = createContext<PrototypeStateContextProps | undefined>(undefined);

export const PrototypeStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [applications, setApplications] = useState<MembershipApplication[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSettings);
  const toastIdRef = React.useRef(0);

  // Initialize public content and auth state on mount
  useEffect(() => {
    const supabase = createClient();

    // Verify auth session & staff role
    const verifySession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();
        setIsAdminAuthenticated(profile?.role === "admin" || profile?.role === "editor");
      } else {
        setIsAdminAuthenticated(false);
      }
    };

    verifySession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();
        setIsAdminAuthenticated(profile?.role === "admin" || profile?.role === "editor");
      } else {
        setIsAdminAuthenticated(false);
      }
    });

    // Load ONLY public site content on visitor mount
    fetchSiteSettings().then(setSiteSettings);
    fetchArticles().then(setArticles);
    fetchEvents().then(setEvents);
    fetchPrograms().then(setPrograms);
    fetchGalleryItems().then(setGalleryItems);
    fetchPartners().then(setPartners);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Theme color variables in root document
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

  // Staff Private Data Loaders (Invoked only for authenticated staff within admin routes)
  const loadRegistrations = async () => {
    const data = await fetchEventRegistrations();
    setRegistrations(data);
  };

  const loadApplications = async () => {
    const data = await fetchMembershipApplications();
    setApplications(data);
  };

  const loadContactMessages = async () => {
    const data = await fetchContactMessages();
    setContactMessages(data);
  };

  // Customizer actions
  const updateSiteSettings = async (settings: Partial<SiteSettings>): Promise<boolean> => {
    const ok = await updateSiteSettingsInDB(settings);
    if (ok) {
      setSiteSettings((prev) => ({ ...prev, ...settings }));
      addToast(
        language === "ar" ? "تم حفظ إعدادات المظهر بنجاح!" : "Appearance settings saved successfully!",
        "success"
      );
      return true;
    } else {
      addToast(
        language === "ar" ? "فشل حفظ إعدادات المظهر" : "Failed to save appearance settings",
        "error"
      );
      return false;
    }
  };

  // Article Actions
  const addArticle = async (art: Omit<Article, "id" | "slug">): Promise<boolean> => {
    const created = await createArticleInDB(art);
    if (created) {
      setArticles((prev) => [created, ...prev]);
      addToast(
        language === "ar" ? "تم إضافة المقال بنجاح!" : "Article added successfully!",
        "success"
      );
      return true;
    } else {
      addToast(
        language === "ar" ? "فشل إضافة المقال في قاعدة البيانات" : "Failed to add article to database",
        "error"
      );
      return false;
    }
  };

  const updateArticle = async (id: string, fieldsToUpdate: Partial<Article>): Promise<boolean> => {
    const ok = await updateArticleInDB(id, fieldsToUpdate);
    if (ok) {
      setArticles((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...fieldsToUpdate } : a))
      );
      addToast(
        language === "ar" ? "تم تحديث المقال بنجاح!" : "Article updated successfully!",
        "success"
      );
      return true;
    } else {
      addToast(
        language === "ar" ? "فشل تحديث المقال" : "Failed to update article",
        "error"
      );
      return false;
    }
  };

  const deleteArticle = async (id: string): Promise<boolean> => {
    const ok = await deleteArticleInDB(id);
    if (ok) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
      addToast(
        language === "ar" ? "تم حذف المقال بنجاح!" : "Article deleted successfully!",
        "info"
      );
      return true;
    } else {
      addToast(
        language === "ar" ? "فشل حذف المقال" : "Failed to delete article",
        "error"
      );
      return false;
    }
  };

  // Event Actions
  const addEvent = async (evt: Omit<Event, "id" | "slug" | "isClosed">): Promise<boolean> => {
    const created = await createEventInDB(evt);
    if (created) {
      setEvents((prev) => [created, ...prev]);
      addToast(
        language === "ar" ? "تم إضافة الفعالية بنجاح!" : "Event added successfully!",
        "success"
      );
      return true;
    } else {
      addToast(
        language === "ar" ? "فشل إضافة الفعالية" : "Failed to add event",
        "error"
      );
      return false;
    }
  };

  const updateEvent = async (id: string, fieldsToUpdate: Partial<Event>): Promise<boolean> => {
    const ok = await updateEventInDB(id, fieldsToUpdate);
    if (ok) {
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? { ...e, ...fieldsToUpdate } : e))
      );
      addToast(
        language === "ar" ? "تم تحديث الفعالية بنجاح!" : "Event updated successfully!",
        "success"
      );
      return true;
    } else {
      addToast(
        language === "ar" ? "فشل تحديث الفعالية" : "Failed to update event",
        "error"
      );
      return false;
    }
  };

  const deleteEvent = async (id: string): Promise<boolean> => {
    const ok = await deleteEventInDB(id);
    if (ok) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
      addToast(
        language === "ar" ? "تم حذف الفعالية بنجاح!" : "Event deleted successfully!",
        "info"
      );
      return true;
    } else {
      addToast(
        language === "ar" ? "فشل حذف الفعالية" : "Failed to delete event",
        "error"
      );
      return false;
    }
  };

  const toggleEventRegistration = async (id: string): Promise<boolean> => {
    const target = events.find((e) => e.id === id);
    if (!target) return false;
    const ok = await toggleEventRegistrationInDB(id, target.isClosed);
    if (ok) {
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? { ...e, isClosed: !e.isClosed } : e))
      );
      addToast(
        language === "ar" ? "تم تحديث حالة التسجيل للفعالية!" : "Event registration toggled!",
        "info"
      );
      return true;
    } else {
      addToast(
        language === "ar" ? "فشل تغيير حالة الفعالية" : "Failed to toggle event registration status",
        "error"
      );
      return false;
    }
  };

  // Program Actions
  const addProgram = async (prog: Omit<Program, "id" | "slug">): Promise<boolean> => {
    const created = await createProgramInDB(prog);
    if (created) {
      setPrograms((prev) => [created, ...prev]);
      addToast(
        language === "ar" ? "تم إضافة البرنامج بنجاح!" : "Program added successfully!",
        "success"
      );
      return true;
    } else {
      addToast(
        language === "ar" ? "فشل إضافة البرنامج" : "Failed to add program",
        "error"
      );
      return false;
    }
  };

  const updateProgram = async (id: string, fieldsToUpdate: Partial<Program>): Promise<boolean> => {
    const ok = await updateProgramInDB(id, fieldsToUpdate);
    if (ok) {
      setPrograms((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...fieldsToUpdate } : p))
      );
      addToast(
        language === "ar" ? "تم تحديث البرنامج بنجاح!" : "Program updated successfully!",
        "success"
      );
      return true;
    } else {
      addToast(
        language === "ar" ? "فشل تحديث البرنامج" : "Failed to update program",
        "error"
      );
      return false;
    }
  };

  const deleteProgram = async (id: string): Promise<boolean> => {
    const ok = await deleteProgramInDB(id);
    if (ok) {
      setPrograms((prev) => prev.filter((p) => p.id !== id));
      addToast(
        language === "ar" ? "تم حذف البرنامج بنجاح!" : "Program deleted successfully!",
        "info"
      );
      return true;
    } else {
      addToast(
        language === "ar" ? "فشل حذف البرنامج" : "Failed to delete program",
        "error"
      );
      return false;
    }
  };

  // Registration Submissions
  const submitEventRegistration = async (
    reg: Omit<EventRegistration, "id" | "registrationDate" | "status" | "eventTitle">
  ): Promise<{ success: boolean; referenceNumber: string | null; error?: string }> => {
    const result = await createEventRegistrationInDB(reg);
    if (result.success && result.referenceNumber) {
      addToast(
        language === "ar"
          ? "تم تقديم طلب التسجيل بنجاح! رقم المرجع الخاص بك هو " + result.referenceNumber
          : "Registration submitted successfully! Reference: " + result.referenceNumber,
        "success"
      );
      return { success: true, referenceNumber: result.referenceNumber };
    } else {
      addToast(
        language === "ar"
          ? "تعذر التسجيل: " + (result.error || "خطأ غير متوقع")
          : "Registration failed: " + (result.error || "Unexpected error"),
        "error"
      );
      return { success: false, referenceNumber: null, error: result.error };
    }
  };

  const updateRegistrationStatus = async (id: string, status: EventRegistration["status"]): Promise<boolean> => {
    const ok = await updateRegistrationStatusInDB(id, status);
    if (ok) {
      setRegistrations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
      addToast(
        language === "ar" ? "تم تحديث حالة التسجيل بنجاح!" : "Registration status updated!",
        "info"
      );
      return true;
    } else {
      addToast(
        language === "ar" ? "فشل تحديث حالة التسجيل" : "Failed to update registration status",
        "error"
      );
      return false;
    }
  };

  // Membership Applications
  const submitMembershipApplication = async (
    app: Omit<MembershipApplication, "id" | "submissionDate" | "status">
  ): Promise<boolean> => {
    const ok = await createMembershipApplicationInDB({
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

    if (ok) {
      addToast(
        language === "ar" ? "تم تقديم طلب الانضمام للرابطة بنجاح!" : "Membership application submitted!",
        "success"
      );
      return true;
    } else {
      addToast(
        language === "ar" ? "حدث خطأ أثناء تقديم الطلب. يُرجى المحاولة لاحقاً." : "Error submitting application. Please try again.",
        "error"
      );
      return false;
    }
  };

  const updateApplicationStatus = async (id: string, status: MembershipApplication["status"]): Promise<boolean> => {
    const ok = await updateApplicationStatusInDB(id, status);
    if (ok) {
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
      addToast(
        language === "ar" ? "تم تحديث حالة طلب العضوية بنجاح!" : "Application status updated!",
        "info"
      );
      return true;
    } else {
      addToast(
        language === "ar" ? "فشل تحديث حالة طلب العضوية" : "Failed to update application status",
        "error"
      );
      return false;
    }
  };

  // Contact Messages
  const submitContactMessage = async (msg: Omit<ContactMessage, "id" | "date">): Promise<boolean> => {
    const ok = await createContactMessageInDB(msg);
    if (ok) {
      addToast(
        language === "ar" ? "تم إرسال رسالتك بنجاح!" : "Message sent successfully!",
        "success"
      );
      return true;
    } else {
      addToast(
        language === "ar" ? "فشل إرسال الرسالة. يُرجى المحاولة لاحقاً." : "Failed to send message. Please try again.",
        "error"
      );
      return false;
    }
  };

  const deleteContactMessage = async (id: string): Promise<boolean> => {
    const ok = await deleteContactMessageInDB(id);
    if (ok) {
      setContactMessages((prev) => prev.filter((m) => m.id !== id));
      addToast(
        language === "ar" ? "تم حذف الرسالة بنجاح!" : "Message deleted successfully!",
        "info"
      );
      return true;
    } else {
      addToast(
        language === "ar" ? "فشل حذف الرسالة" : "Failed to delete message",
        "error"
      );
      return false;
    }
  };

  // Gallery Actions
  const addGalleryItem = async (item: Omit<GalleryItem, "id">): Promise<boolean> => {
    const created = await createGalleryItemInDB(item);
    if (created) {
      setGalleryItems((prev) => [created, ...prev]);
      addToast(
        language === "ar" ? "تم إضافة المادة إلى المعرض!" : "Item added to gallery!",
        "success"
      );
      return true;
    } else {
      addToast(
        language === "ar" ? "فشل إضافة المادة إلى المعرض" : "Failed to add gallery item",
        "error"
      );
      return false;
    }
  };

  const deleteGalleryItem = async (id: string): Promise<boolean> => {
    const ok = await deleteGalleryItemInDB(id);
    if (ok) {
      setGalleryItems((prev) => prev.filter((i) => i.id !== id));
      addToast(
        language === "ar" ? "تم حذف مادة المعرض!" : "Gallery item deleted!",
        "info"
      );
      return true;
    } else {
      addToast(
        language === "ar" ? "فشل حذف مادة المعرض" : "Failed to delete gallery item",
        "error"
      );
      return false;
    }
  };

  // Partner Actions
  const addPartner = async (part: Omit<Partner, "id">): Promise<boolean> => {
    const created = await createPartnerInDB(part);
    if (created) {
      setPartners((prev) => [created, ...prev]);
      addToast(
        language === "ar" ? "تم إضافة الشريك بنجاح!" : "Partner added successfully!",
        "success"
      );
      return true;
    } else {
      addToast(
        language === "ar" ? "فشل إضافة الشريك" : "Failed to add partner",
        "error"
      );
      return false;
    }
  };

  const deletePartner = async (id: string): Promise<boolean> => {
    const ok = await deletePartnerInDB(id);
    if (ok) {
      setPartners((prev) => prev.filter((p) => p.id !== id));
      addToast(
        language === "ar" ? "تم حذف الشريك بنجاح!" : "Partner deleted successfully!",
        "info"
      );
      return true;
    } else {
      addToast(
        language === "ar" ? "فشل حذف الشريك" : "Failed to delete partner",
        "error"
      );
      return false;
    }
  };

  // Real Supabase Auth operations with strict profile role verification
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

      // Verify user's profile role
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      const isStaff = profile && (profile.role === "admin" || profile.role === "editor");

      if (!isStaff) {
        await supabase.auth.signOut();
        setIsAdminAuthenticated(false);
        addToast(
          language === "ar"
            ? "حسابك غير مخوّل بالدخول للوحة التحكم (مستخدم عادي)"
            : "Unauthorized: Your account does not have admin/editor permissions.",
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
        loadRegistrations,
        loadApplications,
        loadContactMessages,
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
