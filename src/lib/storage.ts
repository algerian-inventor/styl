import { createClient } from "@/lib/supabase/client";

export type BucketName = "gallery" | "events" | "programs" | "articles" | "partners" | "site";

export async function uploadFileToBucket(
  file: File,
  bucket: BucketName
): Promise<{ url: string | null; error: string | null }> {
  // 1. File size check (Max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return { url: null, error: "File size exceeds 5MB limit" };
  }

  // 2. Strict MIME type check (JPEG, PNG, WEBP) - SVG excluded for security
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return { url: null, error: "Invalid image format. Allowed formats: JPG, PNG, WEBP" };
  }

  try {
    const supabase = createClient();
    const fileExt = file.name.split(".").pop() || "png";
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return { url: null, error: uploadError.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return { url: publicUrlData.publicUrl, error: null };
  } catch (err: unknown) {
    console.error("Failed to upload file:", err);
    const msg = err instanceof Error ? err.message : "Failed to upload image";
    return { url: null, error: msg };
  }
}
