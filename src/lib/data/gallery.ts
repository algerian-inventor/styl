import { createClient } from "@/lib/supabase/client";
import { GalleryItem } from "@/data/gallery";
import { Database } from "@/types/database";

type DBGalleryItem = Database["public"]["Tables"]["gallery_items"]["Row"];

export function mapDBGalleryToUI(data: DBGalleryItem): GalleryItem {
  return {
    id: data.id,
    title: { ar: data.title_ar, en: data.title_en },
    album: data.album,
    albumName: { ar: data.album_name_ar, en: data.album_name_en },
    type: data.media_type as "image" | "video",
    url: data.url,
  };
}

export async function fetchGalleryItems(): Promise<GalleryItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("gallery_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("Error fetching gallery items:", error);
      return [];
    }
    return data.map(mapDBGalleryToUI);
  } catch (err) {
    console.error("Failed to fetch gallery items:", err);
    return [];
  }
}

export async function createGalleryItemInDB(item: Omit<GalleryItem, "id">): Promise<GalleryItem | null> {
  try {
    const supabase = createClient();
    const payload: Database["public"]["Tables"]["gallery_items"]["Insert"] = {
      title_ar: item.title.ar,
      title_en: item.title.en,
      album: item.album,
      album_name_ar: item.albumName.ar,
      album_name_en: item.albumName.en,
      media_type: item.type,
      url: item.url,
    };

    const { data, error } = await supabase.from("gallery_items").insert([payload]).select().single();
    if (error || !data) {
      console.error("Error creating gallery item in DB:", error);
      return null;
    }
    return mapDBGalleryToUI(data);
  } catch (err) {
    console.error("Failed to create gallery item in DB:", err);
    return null;
  }
}

export async function deleteGalleryItemInDB(id: string): Promise<boolean> {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("gallery_items").delete().eq("id", id);
    if (error) {
      console.error("Error deleting gallery item:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to delete gallery item:", err);
    return false;
  }
}
