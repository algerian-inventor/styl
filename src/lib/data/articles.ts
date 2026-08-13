import { createClient } from "@/lib/supabase/client";
import { Article, articles as defaultArticles } from "@/data/articles";
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

    if (error || !data || data.length === 0) return defaultArticles;
    return data.map(mapDBArticleToUI);
  } catch (err) {
    console.error("Error fetching articles:", err);
    return defaultArticles;
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
      return defaultArticles.find((a) => a.slug === slug) || null;
    }
    return mapDBArticleToUI(data);
  } catch (err) {
    console.error("Error fetching article by slug:", err);
    return defaultArticles.find((a) => a.slug === slug) || null;
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
    if (error || !data) throw error;
    return mapDBArticleToUI(data);
  } catch (err) {
    console.error("Error creating article in DB:", err);
    return null;
  }
}

export async function deleteArticleInDB(id: string): Promise<boolean> {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("articles").delete().eq("id", id);
    return !error;
  } catch (err) {
    console.error("Error deleting article:", err);
    return false;
  }
}
