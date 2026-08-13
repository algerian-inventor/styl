import { createClient } from "@/lib/supabase/client";
import { SiteSettings } from "@/context/PrototypeStateContext";
import { Database } from "@/types/database";

type DBSiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];

export const defaultSettings: SiteSettings = {
  leagueNameAr: "الرابطة العلمية والتقنية للشباب – قسنطينة",
  leagueNameEn: "Scientific and Technical Youth League – Constantine",
  sloganAr: "نحو جيل يقود المستقبل بالعلم والابتكار",
  sloganEn: "Towards a generation leading the future with science and innovation",
  email: "contact@stly.dz",
  phone: "031 92 48 10",
  addressAr: "حي سيدي مبروك السفلي، قسنطينة، الجزائر",
  addressEn: "Sidi Mabrouk El Sifli, Constantine, Algeria",
  primaryColor: "navy",
  heroBannerUrl: "",
};

export async function fetchSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .single();

    if (error || !data) return defaultSettings;

    const row = data as DBSiteSettings;
    return {
      leagueNameAr: row.league_name_ar,
      leagueNameEn: row.league_name_en,
      sloganAr: row.slogan_ar,
      sloganEn: row.slogan_en,
      email: row.email,
      phone: row.phone,
      addressAr: row.address_ar,
      addressEn: row.address_en,
      primaryColor: row.primary_color as SiteSettings["primaryColor"],
      heroBannerUrl: row.hero_banner_url || "",
    };
  } catch (err) {
    console.error("Error fetching site settings:", err);
    return defaultSettings;
  }
}

export async function updateSiteSettingsInDB(settings: Partial<SiteSettings>): Promise<boolean> {
  try {
    const supabase = createClient();
    const payload: Partial<Database["public"]["Tables"]["site_settings"]["Update"]> = {};
    if (settings.leagueNameAr !== undefined) payload.league_name_ar = settings.leagueNameAr;
    if (settings.leagueNameEn !== undefined) payload.league_name_en = settings.leagueNameEn;
    if (settings.sloganAr !== undefined) payload.slogan_ar = settings.sloganAr;
    if (settings.sloganEn !== undefined) payload.slogan_en = settings.sloganEn;
    if (settings.email !== undefined) payload.email = settings.email;
    if (settings.phone !== undefined) payload.phone = settings.phone;
    if (settings.addressAr !== undefined) payload.address_ar = settings.addressAr;
    if (settings.addressEn !== undefined) payload.address_en = settings.addressEn;
    if (settings.primaryColor !== undefined) payload.primary_color = settings.primaryColor;
    if (settings.heroBannerUrl !== undefined) payload.hero_banner_url = settings.heroBannerUrl;

    const { data: existing } = await supabase.from("site_settings").select("id").limit(1).single();

    if (existing) {
      const { error } = await supabase.from("site_settings").update(payload).eq("id", existing.id);
      return !error;
    } else {
      const { error } = await supabase.from("site_settings").insert([payload as Database["public"]["Tables"]["site_settings"]["Insert"]]);
      return !error;
    }
  } catch (err) {
    console.error("Error updating site settings:", err);
    return false;
  }
}
