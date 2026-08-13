-- STLY Constantine Initial Production Schema Migration
-- Migration: 001_initial_schema.sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Custom Enum Types
CREATE TYPE user_role AS ENUM ('admin', 'editor');
CREATE TYPE program_status AS ENUM ('active', 'upcoming', 'completed');
CREATE TYPE registration_status AS ENUM ('pending', 'confirmed', 'rejected', 'attended');
CREATE TYPE application_status AS ENUM ('pending', 'underReview', 'accepted', 'rejected');

-- Updated at timestamp trigger function
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

----------------------------------------------------
-- 1. PROFILES TABLE
----------------------------------------------------
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'editor',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_profiles_timestamp
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'editor')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

----------------------------------------------------
-- 2. SITE SETTINGS TABLE
----------------------------------------------------
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  league_name_ar TEXT NOT NULL DEFAULT 'الرابطة العلمية والتقنية للشباب – قسنطينة',
  league_name_en TEXT NOT NULL DEFAULT 'Scientific and Technical Youth League – Constantine',
  slogan_ar TEXT NOT NULL DEFAULT 'نحو جيل يقود المستقبل بالعلم والابتكار',
  slogan_en TEXT NOT NULL DEFAULT 'Towards a generation leading the future with science and innovation',
  email TEXT NOT NULL DEFAULT 'contact@stly.dz',
  phone TEXT NOT NULL DEFAULT '031 92 48 10',
  address_ar TEXT NOT NULL DEFAULT 'حي سيدي مبروك السفلي، قسنطينة، الجزائر',
  address_en TEXT NOT NULL DEFAULT 'Sidi Mabrouk El Sifli, Constantine, Algeria',
  primary_color TEXT NOT NULL DEFAULT 'navy' CHECK (primary_color IN ('navy', 'teal', 'purple', 'orange')),
  hero_banner_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_site_settings_timestamp
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

----------------------------------------------------
-- 3. ARTICLES TABLE
----------------------------------------------------
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  summary_ar TEXT NOT NULL,
  summary_en TEXT NOT NULL,
  content_ar TEXT NOT NULL,
  content_en TEXT NOT NULL,
  category_ar TEXT NOT NULL,
  category_en TEXT NOT NULL,
  author_name_ar TEXT NOT NULL,
  author_name_en TEXT NOT NULL,
  author_role_ar TEXT NOT NULL,
  author_role_en TEXT NOT NULL,
  published_date DATE NOT NULL DEFAULT CURRENT_DATE,
  read_time_ar TEXT NOT NULL,
  read_time_en TEXT NOT NULL,
  cover_image TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_published ON articles(is_published, published_date DESC);

CREATE TRIGGER update_articles_timestamp
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

----------------------------------------------------
-- 4. EVENTS TABLE
----------------------------------------------------
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  summary_ar TEXT NOT NULL,
  summary_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  category TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TEXT NOT NULL,
  registration_deadline DATE,
  location_ar TEXT NOT NULL,
  location_en TEXT NOT NULL,
  capacity INT NOT NULL CHECK (capacity > 0),
  cover_image TEXT,
  speakers JSONB DEFAULT '[]'::jsonb,
  program_agenda JSONB DEFAULT '[]'::jsonb,
  is_closed_override BOOLEAN DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_date ON events(event_date DESC);

CREATE TRIGGER update_events_timestamp
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

----------------------------------------------------
-- 5. EVENT REGISTRATIONS TABLE
----------------------------------------------------
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  reference_number TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  wilaya TEXT NOT NULL,
  age INT NOT NULL CHECK (age BETWEEN 10 AND 100),
  education_profession TEXT NOT NULL,
  motivation TEXT NOT NULL,
  status registration_status NOT NULL DEFAULT 'pending',
  registration_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_event_registrations_event ON event_registrations(event_id);
CREATE INDEX idx_event_registrations_ref ON event_registrations(reference_number);

----------------------------------------------------
-- 6. PROGRAMS (CLUBS) TABLE
----------------------------------------------------
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  summary_ar TEXT NOT NULL,
  summary_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  category_ar TEXT NOT NULL,
  category_en TEXT NOT NULL,
  status program_status NOT NULL DEFAULT 'active',
  start_date DATE NOT NULL,
  duration_ar TEXT NOT NULL,
  duration_en TEXT NOT NULL,
  cover_image TEXT,
  details_ar TEXT[] DEFAULT '{}',
  details_en TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_programs_slug ON programs(slug);
CREATE INDEX idx_programs_status ON programs(status);

CREATE TRIGGER update_programs_timestamp
  BEFORE UPDATE ON programs
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

----------------------------------------------------
-- 7. MEMBERSHIP APPLICATIONS TABLE
----------------------------------------------------
CREATE TABLE membership_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  dob DATE NOT NULL,
  wilaya TEXT NOT NULL,
  municipality TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  education_profession TEXT NOT NULL,
  scientific_interests TEXT[] DEFAULT '{}',
  skills TEXT NOT NULL,
  motivation TEXT NOT NULL,
  portfolio TEXT,
  status application_status NOT NULL DEFAULT 'pending',
  submission_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_membership_applications_status ON membership_applications(status);

----------------------------------------------------
-- 8. GALLERY ITEMS TABLE
----------------------------------------------------
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  album TEXT NOT NULL,
  album_name_ar TEXT NOT NULL,
  album_name_en TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_gallery_album ON gallery_items(album);

----------------------------------------------------
-- 9. PARTNERS TABLE
----------------------------------------------------
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  type_ar TEXT NOT NULL,
  type_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  logo TEXT NOT NULL,
  website TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

----------------------------------------------------
-- 10. CONTACT MESSAGES TABLE
----------------------------------------------------
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

----------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
----------------------------------------------------

-- Enable RLS on all 10 tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current authenticated user has staff role
CREATE OR REPLACE FUNCTION is_admin_or_editor()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'editor')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Profiles RLS
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id OR is_admin_or_editor());

CREATE POLICY "Admins can update profiles" ON profiles
  FOR UPDATE USING (is_admin_or_editor());

-- 2. Site Settings RLS
CREATE POLICY "Public can read site settings" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Staff can update site settings" ON site_settings
  FOR ALL USING (is_admin_or_editor());

-- 3. Articles RLS
CREATE POLICY "Public can read published articles" ON articles
  FOR SELECT USING (is_published = true OR is_admin_or_editor());

CREATE POLICY "Staff full access to articles" ON articles
  FOR ALL USING (is_admin_or_editor());

-- 4. Events RLS
CREATE POLICY "Public can read published events" ON events
  FOR SELECT USING (is_published = true OR is_admin_or_editor());

CREATE POLICY "Staff full access to events" ON events
  FOR ALL USING (is_admin_or_editor());

-- 5. Event Registrations RLS
CREATE POLICY "Public can insert event registration" ON event_registrations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Staff can view and update event registrations" ON event_registrations
  FOR ALL USING (is_admin_or_editor());

-- 6. Programs (Clubs) RLS
CREATE POLICY "Public can read programs" ON programs
  FOR SELECT USING (true);

CREATE POLICY "Staff full access to programs" ON programs
  FOR ALL USING (is_admin_or_editor());

-- 7. Membership Applications RLS
CREATE POLICY "Public can insert membership application" ON membership_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Staff can view and update membership applications" ON membership_applications
  FOR ALL USING (is_admin_or_editor());

-- 8. Gallery RLS
CREATE POLICY "Public can read gallery items" ON gallery_items
  FOR SELECT USING (true);

CREATE POLICY "Staff full access to gallery" ON gallery_items
  FOR ALL USING (is_admin_or_editor());

-- 9. Partners RLS
CREATE POLICY "Public can read partners" ON partners
  FOR SELECT USING (true);

CREATE POLICY "Staff full access to partners" ON partners
  FOR ALL USING (is_admin_or_editor());

-- 10. Contact Messages RLS
CREATE POLICY "Public can insert contact message" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Staff can view and delete contact messages" ON contact_messages
  FOR ALL USING (is_admin_or_editor());

----------------------------------------------------
-- STORAGE BUCKETS SETUP
----------------------------------------------------
INSERT INTO storage.buckets (id, name, public) VALUES
  ('gallery', 'gallery', true),
  ('events', 'events', true),
  ('programs', 'programs', true),
  ('articles', 'articles', true),
  ('partners', 'partners', true),
  ('site', 'site', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public read access to storage buckets" ON storage.objects
  FOR SELECT USING (bucket_id IN ('gallery', 'events', 'programs', 'articles', 'partners', 'site'));

CREATE POLICY "Staff upload access to storage buckets" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id IN ('gallery', 'events', 'programs', 'articles', 'partners', 'site') AND is_admin_or_editor());

CREATE POLICY "Staff update and delete storage objects" ON storage.objects
  FOR ALL USING (bucket_id IN ('gallery', 'events', 'programs', 'articles', 'partners', 'site') AND is_admin_or_editor());
