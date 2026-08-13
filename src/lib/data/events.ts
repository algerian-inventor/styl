import { createClient } from "@/lib/supabase/client";
import { Event, Speaker, ProgramStep, events as defaultEvents } from "@/data/events";
import { Database, Json } from "@/types/database";

type DBEvent = Database["public"]["Tables"]["events"]["Row"];

export function computeEventIsClosed(data: {
  event_date: string;
  registration_deadline?: string | null;
  is_closed_override?: boolean | null;
}): boolean {
  if (data.is_closed_override === true) return true;

  const today = new Date().toISOString().split("T")[0];

  if (data.registration_deadline && data.registration_deadline < today) {
    return true;
  }

  if (data.event_date < today) {
    return true;
  }

  return false;
}

export function mapDBEventToUI(data: DBEvent): Event {
  const isClosed = computeEventIsClosed(data);

  return {
    id: data.id,
    slug: data.slug,
    title: { ar: data.title_ar, en: data.title_en },
    summary: { ar: data.summary_ar, en: data.summary_en },
    description: { ar: data.description_ar, en: data.description_en },
    date: data.event_date,
    time: data.event_time,
    location: { ar: data.location_ar, en: data.location_en },
    capacity: data.capacity,
    registrationDeadline: data.registration_deadline || data.event_date,
    category: data.category,
    coverImage: data.cover_image || "/images/events/placeholder.png",
    isClosed,
    speakers: (Array.isArray(data.speakers) ? data.speakers : []) as unknown as Speaker[],
    program: (Array.isArray(data.program_agenda) ? data.program_agenda : []) as unknown as ProgramStep[],
  };
}

export async function fetchEvents(): Promise<Event[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: true });

    if (error || !data || data.length === 0) {
      return defaultEvents.map((evt) => ({
        ...evt,
        isClosed: computeEventIsClosed({
          event_date: evt.date,
          registration_deadline: evt.registrationDeadline,
          is_closed_override: evt.isClosed,
        }),
      }));
    }
    return data.map(mapDBEventToUI);
  } catch (err) {
    console.error("Error fetching events:", err);
    return defaultEvents;
  }
}

export async function fetchEventBySlug(slug: string): Promise<Event | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      const fallback = defaultEvents.find((e) => e.slug === slug);
      if (!fallback) return null;
      return {
        ...fallback,
        isClosed: computeEventIsClosed({
          event_date: fallback.date,
          registration_deadline: fallback.registrationDeadline,
          is_closed_override: fallback.isClosed,
        }),
      };
    }
    return mapDBEventToUI(data);
  } catch (err) {
    console.error("Error fetching event by slug:", err);
    const fallback = defaultEvents.find((e) => e.slug === slug);
    return fallback || null;
  }
}

export async function createEventInDB(evt: Omit<Event, "id" | "slug" | "isClosed"> & { slug?: string }): Promise<Event | null> {
  try {
    const supabase = createClient();
    const slug = evt.slug || evt.title.en.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const payload: Database["public"]["Tables"]["events"]["Insert"] = {
      slug,
      title_ar: evt.title.ar,
      title_en: evt.title.en,
      summary_ar: evt.summary.ar,
      summary_en: evt.summary.en,
      description_ar: evt.description.ar,
      description_en: evt.description.en,
      category: evt.category,
      event_date: evt.date,
      event_time: evt.time,
      registration_deadline: evt.registrationDeadline || evt.date,
      location_ar: evt.location.ar,
      location_en: evt.location.en,
      capacity: evt.capacity,
      cover_image: evt.coverImage,
      speakers: evt.speakers as unknown as Json,
      program_agenda: evt.program as unknown as Json,
      is_closed_override: false,
      is_published: true,
    };

    const { data, error } = await supabase.from("events").insert([payload]).select().single();
    if (error || !data) throw error;
    return mapDBEventToUI(data);
  } catch (err) {
    console.error("Error creating event in DB:", err);
    return null;
  }
}

export async function toggleEventRegistrationInDB(id: string, currentlyClosed: boolean): Promise<boolean> {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("events")
      .update({ is_closed_override: !currentlyClosed })
      .eq("id", id);

    return !error;
  } catch (err) {
    console.error("Error toggling event status:", err);
    return false;
  }
}

export async function deleteEventInDB(id: string): Promise<boolean> {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("events").delete().eq("id", id);
    return !error;
  } catch (err) {
    console.error("Error deleting event:", err);
    return false;
  }
}
