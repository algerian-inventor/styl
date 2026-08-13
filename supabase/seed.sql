-- STLY Constantine Production Seed Migration
-- Seed file: supabase/seed.sql

-- 1. Default Site Settings
INSERT INTO site_settings (
  id,
  league_name_ar,
  league_name_en,
  slogan_ar,
  slogan_en,
  email,
  phone,
  address_ar,
  address_en,
  primary_color,
  hero_banner_url
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'الرابطة العلمية والتقنية للشباب – قسنطينة',
  'Scientific and Technical Youth League – Constantine',
  'نحو جيل يقود المستقبل بالعلم والابتكار',
  'Towards a generation leading the future with science and innovation',
  'contact@stly.dz',
  '031 92 48 10',
  'حي سيدي مبروك السفلي، قسنطينة، الجزائر',
  'Sidi Mabrouk El Sifli, Constantine, Algeria',
  'navy',
  NULL
) ON CONFLICT (id) DO NOTHING;

-- 2. Initial Articles
INSERT INTO articles (
  id, slug, title_ar, title_en, summary_ar, summary_en, content_ar, content_en,
  category_ar, category_en, author_name_ar, author_name_en, author_role_ar, author_role_en,
  published_date, read_time_ar, read_time_en, cover_image, is_published
) VALUES 
(
  '11111111-1111-1111-1111-111111111111',
  'national-robotics-win',
  'رابطة قسنطينة تتوج بالمرتبة الأولى في المسابقة الوطنية للروبوتيك',
  'STLY Constantine Wins First Place in National Robotics Competition',
  'حقق فريق الروبوتات التابع للرابطة إنجازاً متميزاً بحصوله على المركز الأول في التحدي الوطني للابتكار التكنولوجي بالعاصمة.',
  'STLY Constantine''s robotics team achieved a major milestone by winning first place in the National Tech Innovation Challenge in Algiers.',
  'توج فريق الرابطة العلمية والتقنية للشباب بقسنطينة بالمرتبة الأولى في المسابقة الوطنية للروبوتيك التي احتضنتها الجزائر العاصمة.',
  'STLY Constantine''s robotics team has been crowned first place in the National Robotics Competition held in Algiers.',
  'إنجازات', 'Achievements',
  'د. طارق مرابط', 'Dr. Tarek Merabet',
  'رئيس اللجنة العلمية', 'Head of Scientific Committee',
  '2026-06-15', '4 دقائق', '4 mins read',
  '/images/articles/robotics-win.png', true
),
(
  '11111111-1111-1111-1111-222222222222',
  'ai-workshop-recap',
  'اختتام فعاليات ورشة الذكاء الاصطناعي التفاعلية للشباب',
  'Recap: Interactive AI Workshop for Young Innovators',
  'اختتمت الرابطة العلمية دورة تدريبية مكثفة امتدت على مدار أسبوعين تناولت مبادئ تعلّم الآلة ورؤية الحاسوب.',
  'STLY completed an intensive two-week training program exploring machine learning and computer vision fundamentals.',
  'نظمت الرابطة ورشة عمل تفاعلية حول تطبيقات الذكاء الاصطناعي واستخداماتها الحضرية في قسنطينة.',
  'STLY organized an interactive workshop focusing on AI applications and smart city innovations in Constantine.',
  'ورشات عمل', 'Workshops',
  'م. أمين بوعلي', 'Eng. Amine Bouali',
  'مؤطر ناد الذكاء الاصطناعي', 'AI Club Lead',
  '2026-06-10', '3 دقائق', '3 mins read',
  '/images/articles/ai-workshop.png', true
)
ON CONFLICT (slug) DO NOTHING;

-- 3. Initial Events
INSERT INTO events (
  id, slug, title_ar, title_en, summary_ar, summary_en, description_ar, description_en,
  category, event_date, event_time, registration_deadline, location_ar, location_en,
  capacity, cover_image, speakers, program_agenda, is_closed_override, is_published
) VALUES 
(
  '22222222-2222-2222-2222-111111111111',
  'science-salon-2026',
  'صالون قسنطينة للعلوم والتقنيات 2026',
  'Constantine Science & Technology Salon 2026',
  'تظاهرة علمية كبرى تجمع الشباب الشغوفين بالاختراعات وتتضمن معارض ونشاطات علمية ممتعة.',
  'The Constantine Science Salon is the largest of its kind in the province, bringing together science clubs.',
  'تستعد الرابطة العلمية لتنظيم الطبعة الجديدة من صالون العلوم والتقنيات بقسنطينة.',
  'STLY is preparing to organize the new edition of the Science & Technology Salon in Constantine.',
  'معارض علمية', '2026-09-25', '09:00 - 17:00', '2026-09-20',
  'دار الشباب أحمد سعدي، قسنطينة', 'Ahmed Saadi Youth Center, Constantine',
  250, '/images/events/salon-2026.png',
  '[{"name": {"ar": "د. ياسين شريف", "en": "Dr. Yassine Cherif"}, "role": {"ar": "أستاذ الذكاء الاصطناعي", "en": "Professor of AI"}, "avatar": "/images/speakers/yassine.png"}]'::jsonb,
  '[{"time": "09:00", "activity": {"ar": "افتتاح المعرض", "en": "Opening Ceremony"}}]'::jsonb,
  false, true
)
ON CONFLICT (slug) DO NOTHING;

-- 4. Initial Programs / Clubs
INSERT INTO programs (
  id, slug, name_ar, name_en, summary_ar, summary_en, description_ar, description_en,
  category_ar, category_en, status, start_date, duration_ar, duration_en, cover_image,
  details_ar, details_en
) VALUES 
(
  '33333333-3333-3333-3333-111111111111',
  'robotics-club',
  'نادي الروبوتات والأنظمة الذكية',
  'Robotics and Smart Systems Club',
  'برنامج تدريبي تطبيقي يركز على تصميم وبرمجة الروبوتات باستخدام لوحات التحكم الدقيقة والمستشعرات.',
  'A practical training program focusing on designing and programming robots using microcontrollers and sensors.',
  'يهدف نادي الروبوتات إلى تزويد الشباب بالمهارات الأساسية في الهندسة والميكانيك والبرمجة.',
  'The Robotics Club aims to equip youth with core engineering, mechanics, and coding skills.',
  'الروبوتيك', 'Robotics', 'active', '2026-09-10', '3 أشهر (60 ساعة)', '3 Months (60 Hours)',
  '/images/programs/robotics.png',
  ARRAY['أساسيات البرمجة بلغة C++ للوحات Arduino', 'تطوير روبوت متكامل لتفادي العقبات'],
  ARRAY['C++ basics for Arduino controllers', 'Developing an obstacle-avoiding robot']
),
(
  '33333333-3333-3333-3333-222222222222',
  'ai-pioneers',
  'مخيم رواد الذكاء الاصطناعي',
  'AI Pioneers Bootcamp',
  'رحلة معرفية لاستكشاف تطبيقات الذكاء الاصطناعي وتعلم الآلة من الصفر باستخدام لغة بايثون.',
  'A learning journey to explore AI applications and machine learning from scratch using Python.',
  'في هذا المخيم، سيتعرف الطلاب على المفاهيم الأساسية للذكاء الاصطناعي وتعلم الآلة.',
  'In this bootcamp, students will learn the fundamental concepts of AI and machine learning.',
  'الذكاء الاصطناعي', 'AI', 'active', '2026-09-15', '2 شهرين (45 ساعة)', '2 Months (45 Hours)',
  '/images/programs/ai.png',
  ARRAY['أساسيات لغة بايثون والمكتبات الرياضية', 'تطوير نماذج تصنيف وتنبؤ بالبيانات'],
  ARRAY['Python syntax and scientific libraries', 'Developing classification and prediction pipelines']
)
ON CONFLICT (slug) DO NOTHING;

-- 5. Initial Gallery Items
INSERT INTO gallery_items (
  id, title_ar, title_en, album, album_name_ar, album_name_en, media_type, url
) VALUES 
(
  '44444444-4444-4444-4444-111111111111',
  'جانب من ورشة عمل التركيب الإلكتروني', 'Electronics Assembly Workshop Session',
  'robotics', 'الروبوتيك', 'Robotics', 'image', '/images/gallery/robotics-1.png'
),
(
  '44444444-4444-4444-4444-222222222222',
  'معرض ابتكارات الشباب في صالون العلوم 2026', 'General Exhibition of Clubs at Science Salon 2026',
  'salon', 'صالون العلوم', 'Science Salon', 'image', '/images/gallery/salon-1.png'
)
ON CONFLICT (id) DO NOTHING;

-- 6. Initial Partners
INSERT INTO partners (
  id, name_ar, name_en, type_ar, type_en, description_ar, description_en, logo, website
) VALUES 
(
  '55555555-5555-5555-5555-111111111111',
  'جامعة قسنطينة 1 - منتوري', 'University of Constantine 1 - Mentouri',
  'شريك أكاديمي', 'Academic Partner',
  'مؤسسة جامعية رائدة توفر التأطير العلمي والبحثي لنشاطات ومشاريع الرابطة.',
  'A leading university providing academic supervision and research support for STLY projects.',
  '/images/partners/mentouri.png', 'https://www.umc.edu.dz'
),
(
  '55555555-5555-5555-5555-222222222222',
  'مديرية الشباب والرياضة لولاية قسنطينة', 'Directorate of Youth and Sports - Constantine',
  'مؤسسة حكومية', 'Government Entity',
  'الهيئة الولائية الراعية والداعمة للمبادرات الشبانية والنوادي العلمية بالولاية.',
  'The state authority officially supporting youth initiatives and scientific clubs in the province.',
  '/images/partners/djs.png', 'https://djs-constantine.dz'
)
ON CONFLICT (id) DO NOTHING;
