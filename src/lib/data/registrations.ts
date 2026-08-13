import { createClient } from "@/lib/supabase/client";
import { EventRegistration } from "@/data/registrations";

export function mapDBRegistrationToUI(data: Record<string, unknown>): EventRegistration {
  const events = data.events as { title_ar?: string; title_en?: string } | undefined;
  return {
    id: String(data.reference_number || data.id),
    eventId: String(data.event_id),
    eventTitle: events ? { ar: String(events.title_ar || ""), en: String(events.title_en || "") } : { ar: "فعالية خاصة", en: "Special Event" },
    fullName: String(data.full_name || ""),
    email: String(data.email || ""),
    phone: String(data.phone || ""),
    wilaya: String(data.wilaya || ""),
    age: Number(data.age || 0),
    educationProfession: String(data.education_profession || ""),
    motivation: String(data.motivation || ""),
    status: (data.status as EventRegistration["status"]) || "pending",
    registrationDate: String(data.registration_date || ""),
  };
}

export async function fetchEventRegistrations(): Promise<EventRegistration[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("event_registrations")
      .select("*, events(title_ar, title_en)")
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("Error fetching event registrations:", error);
      return [];
    }
    return data.map(mapDBRegistrationToUI);
  } catch (err) {
    console.error("Failed to fetch event registrations:", err);
    return [];
  }
}

export async function createEventRegistrationInDB(reg: {
  eventId: string;
  fullName: string;
  email: string;
  phone: string;
  wilaya: string;
  age: number;
  educationProfession: string;
  motivation: string;
}): Promise<{ referenceNumber: string | null; success: boolean; error?: string }> {
  try {
    const supabase = createClient();
    
    // Execute atomic PostgreSQL register_for_event RPC function
    const { data, error } = await supabase.rpc("register_for_event", {
      p_event_id: reg.eventId,
      p_full_name: reg.fullName,
      p_email: reg.email,
      p_phone: reg.phone,
      p_wilaya: reg.wilaya,
      p_age: reg.age,
      p_education_profession: reg.educationProfession,
      p_motivation: reg.motivation,
    });

    if (error) {
      console.error("RPC registration error:", error);
      return { referenceNumber: null, success: false, error: error.message };
    }

    const res = Array.isArray(data) ? data[0] : data;
    if (res && res.success) {
      return { referenceNumber: res.reference_number, success: true };
    } else {
      return { referenceNumber: null, success: false, error: res?.error_message || "Registration failed" };
    }
  } catch (err: unknown) {
    console.error("Error creating event registration:", err);
    const msg = err instanceof Error ? err.message : "Failed to register for event";
    return { referenceNumber: null, success: false, error: msg };
  }
}

export async function updateRegistrationStatusInDB(idOrRef: string, status: "pending" | "confirmed" | "rejected" | "attended"): Promise<boolean> {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("event_registrations")
      .update({ status })
      .or(`id.eq.${idOrRef},reference_number.eq.${idOrRef}`);

    if (error) {
      console.error("Error updating registration status:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to update registration status:", err);
    return false;
  }
}
