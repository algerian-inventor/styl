"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
  deleteGalleryItem: (id: string) => void;

  addPartner: (partner: Omit<Partner, "id">) => void;
  deletePartner: (id: string) => void;

  adminLogin: (email: string, pass: string) => boolean;
  adminLogout: () => void;
}

const PrototypeStateContext = createContext<PrototypeStateContextProps | undefined>(undefined);

export const PrototypeStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [applications, setApplications] = useState<MembershipApplication[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

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

    setArticles(loadState("stly_articles", defaultArticles));
    setEvents(loadState("stly_events", defaultEvents));
    setPrograms(loadState("stly_programs", defaultPrograms));
    setRegistrations(loadState("stly_registrations", initialRegistrations));
    setApplications(loadState("stly_applications", initialApplications));
    setContactMessages(loadState("stly_contact_messages", [
      {
        id: "MSG-001",
        fullName: "سليم بوحوش",
        email: "salim.b@gmail.com",
        subject: "طلب رعاية علمية لمعرض إلكترونيات",
        message: "السلام عليكم، نحن مجموعة من الطلبة ونود التعاون مع الرابطة لتنظيم معرض مصغر للابتكارات الإلكترونية في قسنطينة.",
        date: "2026-06-18",
      }
    ]));
    setGalleryItems(loadState("stly_gallery", defaultGallery));
    setPartners(loadState("stly_partners", defaultPartners));

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
  };

  const updateArticle = (id: string, fieldsToUpdate: Partial<Article>) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...fieldsToUpdate } : a))
    );
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
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
  };

  const updateEvent = (id: string, fieldsToUpdate: Partial<Event>) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...fieldsToUpdate } : e))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const toggleEventRegistration = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isClosed: !e.isClosed } : e))
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
  };

  const updateProgram = (id: string, fieldsToUpdate: Partial<Program>) => {
    setPrograms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...fieldsToUpdate } : p))
    );
  };

  const deleteProgram = (id: string) => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
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
    return refNum;
  };

  const updateRegistrationStatus = (id: string, status: EventRegistration["status"]) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const submitMembershipApplication = (app: Omit<MembershipApplication, "id" | "submissionDate" | "status">) => {
    const newApp: MembershipApplication = {
      ...app,
      id: `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      submissionDate: new Date().toISOString().split("T")[0],
      status: "pending",
    };
    setApplications((prev) => [newApp, ...prev]);
  };

  const updateApplicationStatus = (id: string, status: MembershipApplication["status"]) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const submitContactMessage = (msg: Omit<ContactMessage, "id" | "date">) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `MSG-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
    };
    setContactMessages((prev) => [newMsg, ...prev]);
  };

  const deleteContactMessage = (id: string) => {
    setContactMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const addGalleryItem = (item: Omit<GalleryItem, "id">) => {
    const newItem: GalleryItem = {
      ...item,
      id: `GAL-${Date.now()}`,
    };
    setGalleryItems((prev) => [newItem, ...prev]);
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((i) => i.id !== id));
  };

  const addPartner = (part: Omit<Partner, "id">) => {
    const newPart: Partner = {
      ...part,
      id: `PART-${Date.now()}`,
    };
    setPartners((prev) => [newPart, ...prev]);
  };

  const deletePartner = (id: string) => {
    setPartners((prev) => prev.filter((p) => p.id !== id));
  };

  // Auth operations
  const adminLogin = (email: string, pass: string): boolean => {
    if (email === "admin@stly.dz" && pass === "demo123") {
      setIsAdminAuthenticated(true);
      localStorage.setItem("stly_admin_auth", "true");
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem("stly_admin_auth");
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
