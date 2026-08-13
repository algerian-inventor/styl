export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "user" | "editor" | "admin";
export type ProgramStatus = "active" | "upcoming" | "completed";
export type RegistrationStatus = "pending" | "confirmed" | "rejected" | "attended";
export type ApplicationStatus = "pending" | "underReview" | "accepted" | "rejected";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          id: string;
          league_name_ar: string;
          league_name_en: string;
          slogan_ar: string;
          slogan_en: string;
          email: string;
          phone: string;
          address_ar: string;
          address_en: string;
          primary_color: string;
          hero_banner_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          league_name_ar: string;
          league_name_en: string;
          slogan_ar: string;
          slogan_en: string;
          email: string;
          phone: string;
          address_ar: string;
          address_en: string;
          primary_color?: string;
          hero_banner_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          league_name_ar?: string;
          league_name_en?: string;
          slogan_ar?: string;
          slogan_en?: string;
          email?: string;
          phone?: string;
          address_ar?: string;
          address_en?: string;
          primary_color?: string;
          hero_banner_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      articles: {
        Row: {
          id: string;
          slug: string;
          title_ar: string;
          title_en: string;
          summary_ar: string;
          summary_en: string;
          content_ar: string;
          content_en: string;
          category_ar: string;
          category_en: string;
          author_name_ar: string;
          author_name_en: string;
          author_role_ar: string;
          author_role_en: string;
          published_date: string;
          read_time_ar: string;
          read_time_en: string;
          cover_image: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title_ar: string;
          title_en: string;
          summary_ar: string;
          summary_en: string;
          content_ar: string;
          content_en: string;
          category_ar: string;
          category_en: string;
          author_name_ar: string;
          author_name_en: string;
          author_role_ar: string;
          author_role_en: string;
          published_date: string;
          read_time_ar: string;
          read_time_en: string;
          cover_image?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title_ar?: string;
          title_en?: string;
          summary_ar?: string;
          summary_en?: string;
          content_ar?: string;
          content_en?: string;
          category_ar?: string;
          category_en?: string;
          author_name_ar?: string;
          author_name_en?: string;
          author_role_ar?: string;
          author_role_en?: string;
          published_date?: string;
          read_time_ar?: string;
          read_time_en?: string;
          cover_image?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      events: {
        Row: {
          id: string;
          slug: string;
          title_ar: string;
          title_en: string;
          summary_ar: string;
          summary_en: string;
          description_ar: string;
          description_en: string;
          category: string;
          event_date: string;
          event_time: string;
          registration_deadline: string | null;
          location_ar: string;
          location_en: string;
          capacity: number;
          cover_image: string | null;
          speakers: Json | null;
          program_agenda: Json | null;
          is_closed_override: boolean;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title_ar: string;
          title_en: string;
          summary_ar: string;
          summary_en: string;
          description_ar: string;
          description_en: string;
          category: string;
          event_date: string;
          event_time: string;
          registration_deadline?: string | null;
          location_ar: string;
          location_en: string;
          capacity: number;
          cover_image?: string | null;
          speakers?: Json | null;
          program_agenda?: Json | null;
          is_closed_override?: boolean;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title_ar?: string;
          title_en?: string;
          summary_ar?: string;
          summary_en?: string;
          description_ar?: string;
          description_en?: string;
          category?: string;
          event_date?: string;
          event_time?: string;
          registration_deadline?: string | null;
          location_ar?: string;
          location_en?: string;
          capacity?: number;
          cover_image?: string | null;
          speakers?: Json | null;
          program_agenda?: Json | null;
          is_closed_override?: boolean;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      event_registrations: {
        Row: {
          id: string;
          event_id: string;
          reference_number: string;
          full_name: string;
          email: string;
          phone: string;
          wilaya: string;
          age: number;
          education_profession: string;
          motivation: string;
          status: RegistrationStatus;
          registration_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          reference_number: string;
          full_name: string;
          email: string;
          phone: string;
          wilaya: string;
          age: number;
          education_profession: string;
          motivation: string;
          status?: RegistrationStatus;
          registration_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          reference_number?: string;
          full_name?: string;
          email?: string;
          phone?: string;
          wilaya?: string;
          age?: number;
          education_profession?: string;
          motivation?: string;
          status?: RegistrationStatus;
          registration_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          }
        ];
      };
      programs: {
        Row: {
          id: string;
          slug: string;
          name_ar: string;
          name_en: string;
          summary_ar: string;
          summary_en: string;
          description_ar: string;
          description_en: string;
          category_ar: string;
          category_en: string;
          status: ProgramStatus;
          start_date: string;
          duration_ar: string;
          duration_en: string;
          cover_image: string | null;
          details_ar: Json | null;
          details_en: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name_ar: string;
          name_en: string;
          summary_ar: string;
          summary_en: string;
          description_ar: string;
          description_en: string;
          category_ar: string;
          category_en: string;
          status?: ProgramStatus;
          start_date: string;
          duration_ar: string;
          duration_en: string;
          cover_image?: string | null;
          details_ar?: Json | null;
          details_en?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name_ar?: string;
          name_en?: string;
          summary_ar?: string;
          summary_en?: string;
          description_ar?: string;
          description_en?: string;
          category_ar?: string;
          category_en?: string;
          status?: ProgramStatus;
          start_date?: string;
          duration_ar?: string;
          duration_en?: string;
          cover_image?: string | null;
          details_ar?: Json | null;
          details_en?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      membership_applications: {
        Row: {
          id: string;
          full_name: string;
          dob: string;
          wilaya: string;
          municipality: string;
          email: string;
          phone: string;
          education_profession: string;
          scientific_interests: Json | null;
          skills: string;
          motivation: string;
          portfolio: string | null;
          status: ApplicationStatus;
          submission_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          dob: string;
          wilaya: string;
          municipality: string;
          email: string;
          phone: string;
          education_profession: string;
          scientific_interests?: Json | null;
          skills: string;
          motivation: string;
          portfolio?: string | null;
          status?: ApplicationStatus;
          submission_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          dob?: string;
          wilaya?: string;
          municipality?: string;
          email?: string;
          phone?: string;
          education_profession?: string;
          scientific_interests?: Json | null;
          skills?: string;
          motivation?: string;
          portfolio?: string | null;
          status?: ApplicationStatus;
          submission_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      gallery_items: {
        Row: {
          id: string;
          title_ar: string;
          title_en: string;
          album: string;
          album_name_ar: string;
          album_name_en: string;
          media_type: string;
          url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title_ar: string;
          title_en: string;
          album: string;
          album_name_ar: string;
          album_name_en: string;
          media_type: string;
          url: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title_ar?: string;
          title_en?: string;
          album?: string;
          album_name_ar?: string;
          album_name_en?: string;
          media_type?: string;
          url?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      partners: {
        Row: {
          id: string;
          name_ar: string;
          name_en: string;
          type_ar: string;
          type_en: string;
          description_ar: string;
          description_en: string;
          logo: string;
          website: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name_ar: string;
          name_en: string;
          type_ar: string;
          type_en: string;
          description_ar: string;
          description_en: string;
          logo: string;
          website?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name_ar?: string;
          name_en?: string;
          type_ar?: string;
          type_en?: string;
          description_ar?: string;
          description_en?: string;
          logo?: string;
          website?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          subject: string;
          message: string;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          subject: string;
          message: string;
          date?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          subject?: string;
          message?: string;
          date?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      register_for_event: {
        Args: {
          p_event_id: string;
          p_full_name: string;
          p_email: string;
          p_phone: string;
          p_wilaya: string;
          p_age: number;
          p_education_profession: string;
          p_motivation: string;
        };
        Returns: {
          success: boolean;
          reference_number: string | null;
          error_message: string | null;
        }[];
      };
    };
    Enums: {
      user_role: UserRole;
      program_status: ProgramStatus;
      registration_status: RegistrationStatus;
      application_status: ApplicationStatus;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
