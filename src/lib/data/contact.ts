import { createClient } from "@/lib/supabase/client";
import { ContactMessage } from "@/context/PrototypeStateContext";
import { Database } from "@/types/database";

type DBContactMessage = Database["public"]["Tables"]["contact_messages"]["Row"];

export function mapDBContactToUI(data: DBContactMessage): ContactMessage {
  return {
    id: data.id,
    fullName: data.full_name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    date: data.date || data.created_at?.split("T")[0],
  };
}

export async function fetchContactMessages(): Promise<ContactMessage[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("Error fetching contact messages:", error);
      return [];
    }
    return data.map(mapDBContactToUI);
  } catch (err) {
    console.error("Failed to fetch contact messages:", err);
    return [];
  }
}

export async function createContactMessageInDB(msg: {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}): Promise<boolean> {
  try {
    const supabase = createClient();
    const payload: Database["public"]["Tables"]["contact_messages"]["Insert"] = {
      full_name: msg.fullName,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
      date: new Date().toISOString().split("T")[0],
    };

    const { error } = await supabase.from("contact_messages").insert([payload]);
    if (error) {
      console.error("Supabase contact message insert error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to create contact message:", err);
    return false;
  }
}

export async function deleteContactMessageInDB(id: string): Promise<boolean> {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) {
      console.error("Error deleting contact message:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to delete contact message:", err);
    return false;
  }
}
