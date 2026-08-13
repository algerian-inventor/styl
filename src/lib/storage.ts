import { createClient } from "@/lib/supabase/client";

export type BucketName = "gallery" | "events" | "programs" | "articles" | "partners" | "site";

export async function uploadFileToBucket(
  file: File,
  bucket: BucketName
): Promise<{ url: string | null; error: string | null }> {
  if (file.size > 5 * 1024 * 1024) {
    return { url: null, error: "File size exceeds 5MB limit" };
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
  if (!allowedTypes.includes(file.type)) {
    return { url: null, error: "Invalid image format. Allowed: JPG, PNG, WEBP, GIF, SVG" };
  }

  try {
    const supabase = createClient();
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, { cacheControl: "3600", upsert: true });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return { url: null, error: uploadError.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return { url: publicUrlData.publicUrl, error: null };
  } catch (err: unknown) {
    console.error("Failed to upload file:", err);
    const msg = err instanceof Error ? err.message : "Failed to upload image";
    return { url: null, error: msg };
  }
}
