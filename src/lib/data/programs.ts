import { createClient } from "@/lib/supabase/client";
import { Program, programs as defaultPrograms } from "@/data/programs";
import { Database } from "@/types/database";

type DBProgram = Database["public"]["Tables"]["programs"]["Row"];

export function mapDBProgramToUI(data: DBProgram): Program {
  return {
    id: data.id,
    slug: data.slug,
    name: { ar: data.name_ar, en: data.name_en },
    summary: { ar: data.summary_ar, en: data.summary_en },
    description: { ar: data.description_ar, en: data.description_en },
    category: { ar: data.category_ar, en: data.category_en },
    status: data.status,
    startDate: data.start_date,
    duration: { ar: data.duration_ar, en: data.duration_en },
    coverImage: data.cover_image || "/images/programs/placeholder.png",
    details: {
      ar: Array.isArray(data.details_ar) ? (data.details_ar as string[]) : [],
      en: Array.isArray(data.details_en) ? (data.details_en as string[]) : [],
    },
  };
}

export async function fetchPrograms(): Promise<Program[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .order("start_date", { ascending: true });

    if (error || !data || data.length === 0) return defaultPrograms;
    return data.map(mapDBProgramToUI);
  } catch (err) {
    console.error("Error fetching programs:", err);
    return defaultPrograms;
  }
}

export async function fetchProgramBySlug(slug: string): Promise<Program | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return defaultPrograms.find((p) => p.slug === slug) || null;
    }
    return mapDBProgramToUI(data);
  } catch (err) {
    console.error("Error fetching program by slug:", err);
    return defaultPrograms.find((p) => p.slug === slug) || null;
  }
}

export async function createProgramInDB(prog: Omit<Program, "id" | "slug"> & { slug?: string }): Promise<Program | null> {
  try {
    const supabase = createClient();
    const slug = prog.slug || prog.name.en.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const payload: Database["public"]["Tables"]["programs"]["Insert"] = {
      slug,
      name_ar: prog.name.ar,
      name_en: prog.name.en,
      summary_ar: prog.summary.ar,
      summary_en: prog.summary.en,
      description_ar: prog.description.ar,
      description_en: prog.description.en,
      category_ar: prog.category.ar,
      category_en: prog.category.en,
      status: prog.status,
      start_date: prog.startDate,
      duration_ar: prog.duration.ar,
      duration_en: prog.duration.en,
      cover_image: prog.coverImage,
      details_ar: prog.details.ar,
      details_en: prog.details.en,
    };

    const { data, error } = await supabase.from("programs").insert([payload]).select().single();
    if (error || !data) throw error;
    return mapDBProgramToUI(data);
  } catch (err) {
    console.error("Error creating program in DB:", err);
    return null;
  }
}

export async function updateProgramInDB(id: string, fields: Partial<Program>): Promise<boolean> {
  try {
    const supabase = createClient();
    const payload: Partial<Database["public"]["Tables"]["programs"]["Update"]> = {};
    if (fields.name) { payload.name_ar = fields.name.ar; payload.name_en = fields.name.en; }
    if (fields.summary) { payload.summary_ar = fields.summary.ar; payload.summary_en = fields.summary.en; }
    if (fields.description) { payload.description_ar = fields.description.ar; payload.description_en = fields.description.en; }
    if (fields.category) { payload.category_ar = fields.category.ar; payload.category_en = fields.category.en; }
    if (fields.status) payload.status = fields.status;
    if (fields.startDate) payload.start_date = fields.startDate;
    if (fields.duration) { payload.duration_ar = fields.duration.ar; payload.duration_en = fields.duration.en; }
    if (fields.coverImage !== undefined) payload.cover_image = fields.coverImage;
    if (fields.details) { payload.details_ar = fields.details.ar; payload.details_en = fields.details.en; }

    const { error } = await supabase.from("programs").update(payload).eq("id", id);
    return !error;
  } catch (err) {
    console.error("Error updating program:", err);
    return false;
  }
}

export async function deleteProgramInDB(id: string): Promise<boolean> {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("programs").delete().eq("id", id);
    return !error;
  } catch (err) {
    console.error("Error deleting program:", err);
    return false;
  }
}
