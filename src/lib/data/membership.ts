import { createClient } from "@/lib/supabase/client";
import { MembershipApplication, initialApplications } from "@/data/applications";
import { Database } from "@/types/database";

type DBApplication = Database["public"]["Tables"]["membership_applications"]["Row"];

export function mapDBApplicationToUI(data: DBApplication): MembershipApplication {
  return {
    id: data.id,
    fullName: data.full_name,
    dob: data.dob,
    wilaya: data.wilaya,
    municipality: data.municipality,
    email: data.email,
    phone: data.phone,
    educationProfession: data.education_profession,
    scientificInterests: Array.isArray(data.scientific_interests) ? (data.scientific_interests as string[]) : [],
    skills: data.skills,
    motivation: data.motivation,
    portfolio: data.portfolio || undefined,
    status: data.status,
    submissionDate: data.submission_date,
  };
}

export async function fetchMembershipApplications(): Promise<MembershipApplication[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("membership_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) return initialApplications;
    return data.map(mapDBApplicationToUI);
  } catch (err) {
    console.error("Error fetching membership applications:", err);
    return initialApplications;
  }
}

export async function createMembershipApplicationInDB(app: {
  fullName: string;
  dob: string;
  wilaya: string;
  municipality: string;
  email: string;
  phone: string;
  educationProfession: string;
  scientificInterests: string[];
  skills: string;
  motivation: string;
  portfolio?: string;
}): Promise<boolean> {
  try {
    const supabase = createClient();
    const payload: Database["public"]["Tables"]["membership_applications"]["Insert"] = {
      full_name: app.fullName,
      dob: app.dob,
      wilaya: app.wilaya,
      municipality: app.municipality,
      email: app.email,
      phone: app.phone,
      education_profession: app.educationProfession,
      scientific_interests: app.scientificInterests,
      skills: app.skills,
      motivation: app.motivation,
      portfolio: app.portfolio || null,
      status: "pending" as const,
      submission_date: new Date().toISOString().split("T")[0],
    };

    const { error } = await supabase.from("membership_applications").insert([payload]);
    if (error) {
      console.error("Supabase membership insert error:", error);
    }
    return !error;
  } catch (err) {
    console.error("Error creating membership application:", err);
    return true;
  }
}

export async function updateApplicationStatusInDB(id: string, status: "pending" | "underReview" | "accepted" | "rejected"): Promise<boolean> {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("membership_applications")
      .update({ status })
      .eq("id", id);

    return !error;
  } catch (err) {
    console.error("Error updating application status:", err);
    return false;
  }
}
