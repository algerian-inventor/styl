import { createClient } from "@/lib/supabase/client";
import { Partner } from "@/data/partners";
import { Database } from "@/types/database";

type DBPartner = Database["public"]["Tables"]["partners"]["Row"];

export function mapDBPartnerToUI(data: DBPartner): Partner {
  return {
    id: data.id,
    name: { ar: data.name_ar, en: data.name_en },
    category: { ar: data.type_ar, en: data.type_en },
    description: { ar: data.description_ar, en: data.description_en },
    logo: data.logo,
    website: data.website || "#",
  };
}

export async function fetchPartners(): Promise<Partner[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .order("created_at", { ascending: true });

    if (error || !data) {
      console.error("Error fetching partners:", error);
      return [];
    }
    return data.map(mapDBPartnerToUI);
  } catch (err) {
    console.error("Failed to fetch partners:", err);
    return [];
  }
}

export async function createPartnerInDB(partner: Omit<Partner, "id">): Promise<Partner | null> {
  try {
    const supabase = createClient();
    const payload: Database["public"]["Tables"]["partners"]["Insert"] = {
      name_ar: partner.name.ar,
      name_en: partner.name.en,
      type_ar: partner.category.ar,
      type_en: partner.category.en,
      description_ar: partner.description.ar,
      description_en: partner.description.en,
      logo: partner.logo,
      website: partner.website,
    };

    const { data, error } = await supabase.from("partners").insert([payload]).select().single();
    if (error || !data) {
      console.error("Error creating partner in DB:", error);
      return null;
    }
    return mapDBPartnerToUI(data);
  } catch (err) {
    console.error("Failed to create partner in DB:", err);
    return null;
  }
}

export async function deletePartnerInDB(id: string): Promise<boolean> {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("partners").delete().eq("id", id);
    if (error) {
      console.error("Error deleting partner:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to delete partner:", err);
    return false;
  }
}
