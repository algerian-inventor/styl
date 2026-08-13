import { createClient } from "@/lib/supabase/client";
import { Article } from "@/data/articles";
import { Database } from "@/types/database";

type DBArticle = Database["public"]["Tables"]["articles"]["Row"];

export function mapDBArticleToUI(data: DBArticle): Article {
  return {
    id: data.id,
    slug: data.slug,
    title: { ar: data.title_ar, en: data.title_en },
    summary: { ar: data.summary_ar, en: data.summary_en },
    content: { ar: data.content_ar, en: data.content_en },
    category: { ar: data.category_ar, en: data.category_en },
    author: { ar: data.author_name_ar, en: data.author_name_en },
    publishedDate: data.published_date,
    coverImage: data.cover_image || "/images/articles/placeholder.png",
    isFeatured: data.is_published ?? true,
    tags: { ar: [], en: [] },
  };
}

export async function fetchArticles(): Promise<Article[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("published_date", { ascending: false });

    if (error || !data) {
      console.error("Error fetching articles:", error);
      return [];
    }
    return data.map(mapDBArticleToUI);
  } catch (err) {
    console.error("Failed to fetch articles:", err);
    return [];
  }
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      console.error("Error fetching article by slug:", error);
      return null;
    }
    return mapDBArticleToUI(data);
  } catch (err) {
    console.error("Failed to fetch article by slug:", err);
    return null;
  }
}

export async function createArticleInDB(art: Omit<Article, "id" | "slug"> & { slug?: string }): Promise<Article | null> {
  try {
    const supabase = createClient();
    const slug = art.slug || art.title.en.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const payload: Database["public"]["Tables"]["articles"]["Insert"] = {
      slug,
      title_ar: art.title.ar,
      title_en: art.title.en,
      summary_ar: art.summary.ar,
      summary_en: art.summary.en,
      content_ar: art.content.ar,
      content_en: art.content.en,
      category_ar: art.category.ar,
      category_en: art.category.en,
      author_name_ar: art.author.ar,
      author_name_en: art.author.en,
      author_role_ar: "مؤلف",
      author_role_en: "Author",
      published_date: art.publishedDate || new Date().toISOString().split("T")[0],
      read_time_ar: "3 دقائق",
      read_time_en: "3 mins read",
      cover_image: art.coverImage,
      is_published: true,
    };

    const { data, error } = await supabase.from("articles").insert([payload]).select().single();
    if (error || !data) {
      console.error("Error creating article in DB:", error);
      return null;
    }
    return mapDBArticleToUI(data);
  } catch (err) {
    console.error("Failed to create article in DB:", err);
    return null;
  }
}

export async function updateArticleInDB(id: string, fields: Partial<Article>): Promise<boolean> {
  try {
    const supabase = createClient();
    const payload: Partial<Database["public"]["Tables"]["articles"]["Update"]> = {};
    if (fields.title) { payload.title_ar = fields.title.ar; payload.title_en = fields.title.en; }
    if (fields.summary) { payload.summary_ar = fields.summary.ar; payload.summary_en = fields.summary.en; }
    if (fields.content) { payload.content_ar = fields.content.ar; payload.content_en = fields.content.en; }
    if (fields.category) { payload.category_ar = fields.category.ar; payload.category_en = fields.category.en; }
    if (fields.author) { payload.author_name_ar = fields.author.ar; payload.author_name_en = fields.author.en; }
    if (fields.publishedDate) payload.published_date = fields.publishedDate;
    if (fields.coverImage !== undefined) payload.cover_image = fields.coverImage;
    if (fields.isFeatured !== undefined) payload.is_published = fields.isFeatured;

    const { error } = await supabase.from("articles").update(payload).eq("id", id);
    if (error) {
      console.error("Error updating article in DB:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to update article in DB:", err);
    return false;
  }
}

export async function deleteArticleInDB(id: string): Promise<boolean> {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) {
      console.error("Error deleting article:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to delete article:", err);
    return false;
  }
}
