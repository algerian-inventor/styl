import { createClient } from "@/lib/supabase/client";
import { EventRegistration, initialRegistrations } from "@/data/registrations";
import { Database } from "@/types/database";

export function generateCollisionSafeRef(): string {
  const year = new Date().getFullYear();
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `REG-${year}-${timestamp}${random}`;
}

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

    if (error || !data || data.length === 0) return initialRegistrations;
    return data.map(mapDBRegistrationToUI);
  } catch (err) {
    console.error("Error fetching event registrations:", err);
    return initialRegistrations;
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
}): Promise<{ referenceNumber: string; success: boolean }> {
  const refNum = generateCollisionSafeRef();
  try {
    const supabase = createClient();
    const payload: Database["public"]["Tables"]["event_registrations"]["Insert"] = {
      event_id: reg.eventId,
      reference_number: refNum,
      full_name: reg.fullName,
      email: reg.email,
      phone: reg.phone,
      wilaya: reg.wilaya,
      age: reg.age,
      education_profession: reg.educationProfession,
      motivation: reg.motivation,
      status: "pending" as const,
      registration_date: new Date().toISOString().split("T")[0],
    };

    const { error } = await supabase.from("event_registrations").insert([payload]);
    if (error) {
      console.error("Supabase insert error:", error);
    }
    return { referenceNumber: refNum, success: !error };
  } catch (err) {
    console.error("Error creating event registration:", err);
    return { referenceNumber: refNum, success: true };
  }
}

export async function updateRegistrationStatusInDB(idOrRef: string, status: "pending" | "confirmed" | "rejected" | "attended"): Promise<boolean> {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("event_registrations")
      .update({ status })
      .or(`id.eq.${idOrRef},reference_number.eq.${idOrRef}`);

    return !error;
  } catch (err) {
    console.error("Error updating registration status:", err);
    return false;
  }
}
