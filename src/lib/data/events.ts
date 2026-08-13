import { createClient } from "@/lib/supabase/client";
import { Event, Speaker, ProgramStep } from "@/data/events";
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

    if (error || !data) {
      console.error("Error fetching events:", error);
      return [];
    }
    return data.map(mapDBEventToUI);
  } catch (err) {
    console.error("Failed to fetch events:", err);
    return [];
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
      console.error("Error fetching event by slug:", error);
      return null;
    }
    return mapDBEventToUI(data);
  } catch (err) {
    console.error("Failed to fetch event by slug:", err);
    return null;
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
    if (error || !data) {
      console.error("Error creating event in DB:", error);
      return null;
    }
    return mapDBEventToUI(data);
  } catch (err) {
    console.error("Failed to create event in DB:", err);
    return null;
  }
}

export async function updateEventInDB(id: string, fields: Partial<Event>): Promise<boolean> {
  try {
    const supabase = createClient();
    const payload: Partial<Database["public"]["Tables"]["events"]["Update"]> = {};
    if (fields.title) { payload.title_ar = fields.title.ar; payload.title_en = fields.title.en; }
    if (fields.summary) { payload.summary_ar = fields.summary.ar; payload.summary_en = fields.summary.en; }
    if (fields.description) { payload.description_ar = fields.description.ar; payload.description_en = fields.description.en; }
    if (fields.category) payload.category = fields.category;
    if (fields.date) payload.event_date = fields.date;
    if (fields.time) payload.event_time = fields.time;
    if (fields.registrationDeadline) payload.registration_deadline = fields.registrationDeadline;
    if (fields.location) { payload.location_ar = fields.location.ar; payload.location_en = fields.location.en; }
    if (fields.capacity !== undefined) payload.capacity = fields.capacity;
    if (fields.coverImage !== undefined) payload.cover_image = fields.coverImage;
    if (fields.speakers) payload.speakers = fields.speakers as unknown as Json;
    if (fields.program) payload.program_agenda = fields.program as unknown as Json;
    if (fields.isClosed !== undefined) payload.is_closed_override = fields.isClosed;

    const { error } = await supabase.from("events").update(payload).eq("id", id);
    if (error) {
      console.error("Error updating event in DB:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to update event in DB:", err);
    return false;
  }
}

export async function toggleEventRegistrationInDB(id: string, currentlyClosed: boolean): Promise<boolean> {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("events")
      .update({ is_closed_override: !currentlyClosed })
      .eq("id", id);

    if (error) {
      console.error("Error toggling event status:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to toggle event status:", err);
    return false;
  }
}

export async function deleteEventInDB(id: string): Promise<boolean> {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      console.error("Error deleting event:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to delete event:", err);
    return false;
  }
}
