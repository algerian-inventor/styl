# STLY Constantine — Comprehensive UI/UX & Institutional Credibility Audit (v3)

**Live Production URL:** [https://styl-constantine.vercel.app/](https://styl-constantine.vercel.app/)  
**Target Repository:** `algerian-inventor/styl`  
**Production Branch:** `main`  
**Inspected Commit:** `5ed1744`  
**Audit Date:** August 13, 2026  
**Auditor:** Antigravity UI/UX Quality Assurance & Architecture Review  

---

## Executive Summary & Scorecard

This audit provides a strict, evidence-based evaluation of the live production STLY Constantine website. While the visual overhaul significantly improved the institutional color identity (Deep Navy `#062B55` and Emerald Green `#1F9D45`) and typography compared to the initial prototype, the site still exhibits critical architectural UX bugs (such as dynamic route SSR 404s and tablet breakpoint nav collapse), SaaS-dashboard visual tropes in key sections (especially the Hero right column), and unverified placeholder content that undermines organizational credibility.

### Scorecard (Strict Institutional Standard)

| Evaluation Dimension | Current Score (/10) | Expected Score After Fixes (/10) | Evaluation Rationale |
| :--- | :---: | :---: | :--- |
| **Visual Design** | **7.2** | **9.5** | Strong institutional colors and crisp typography, but suffers from card fatigue and pseudo-SaaS widget graphics. |
| **UX & Navigation** | **6.8** | **9.4** | Breakpoint navigation gap at 1024px-1279px, direct URL SSR 404s on all `[slug]` routes, monolithic mobile forms. |
| **Desktop Experience (1440px / 1280px)** | **7.5** | **9.6** | Polished at 1440px, but 1280x800 and 1024px tablet landscape suffer from nav link overflow and hiding. |
| **Mobile Experience (430px / 375px)** | **6.5** | **9.2** | High scroll fatigue on long forms; hero right-column card stacks awkwardly; touch target spacing needs tuning. |
| **Arabic (RTL)** | **7.8** | **9.5** | Natural Cairo font rendering and layout direction, but physical position classes (`right-3`) cause flipped badge alignments. |
| **English (LTR)** | **6.8** | **9.3** | Functional translation coverage, but certain hardcoded strings and untranslated date abbreviations persist. |
| **Typography & Hierarchy** | **7.4** | **9.4** | Excellent Cairo/Outfit pairing, but metadata font sizes drop below 11px and lead paragraphs are overly dense. |
| **Design Consistency** | **7.6** | **9.5** | Unified design tokens across core components; card borders and button variants are largely harmonized. |
| **Accessibility (a11y)** | **6.9** | **9.2** | Missing skip-to-content links, modal focus traps, and image alt text fallbacks on non-existent assets. |
| **Content Credibility** | **5.5** | **9.6** | Multiple unverified claims (univerity partnerships, national awards, addresses, contact details, social links `#`). |
| **Institutional Professionalism** | **7.0** | **9.5** | Feels 70% like a national scientific institute, but 30% like an AI-generated SaaS dashboard template. |

**CURRENT OVERALL SCORE:** **6.9 / 10**  
**EXPECTED SCORE AFTER RECOMMENDED FIXES:** **9.4 / 10**

---

## 1. Critical Technical & Architecture Findings (P0)

### 1.1 Direct Route Server-Render 404 Bug (`/programs/[slug]`, `/events/[slug]`, `/news/[slug]`)
- **Root Cause:** In `src/context/PrototypeStateContext.tsx`, state arrays (`programs`, `events`, `articles`) are initialized as empty arrays (`[]`) and only populated inside a client-side `useEffect` on mount.
- **Consequence:** When a user navigates directly to a URL (e.g. `https://styl-constantine.vercel.app/programs/robotics-club`) or refreshes the page, the Next.js server-side / static pre-rendering passes `programs = []` to `ProgramDetailPage`. The line `const program = programs.find((p) => p.slug === slug);` returns `undefined`, triggering `notFound()`. The user is served an HTTP 404 error page.
- **Impact:** All dynamic detail pages are completely inaccessible via direct links, bookmarking, social media sharing, or search engine indexing.

### 1.2 Tablet Breakpoint Navigation Deadzone (1024px – 1279px)
- **Root Cause:** In `src/components/Navbar.tsx`:
  - Desktop nav links: `className="hidden xl:flex items-center gap-1"` (hidden below 1280px)
  - Desktop action buttons: `className="hidden lg:flex items-center gap-3"` (visible from 1024px up)
  - Mobile hamburger toggle: `className="flex lg:hidden items-center gap-2"` (hidden from 1024px up)
- **Consequence:** On screens between 1024px and 1279px (iPad Pro landscape, common 13-inch laptop viewports at 1280x800 with OS scaling or browser sidebars), the main navigation links are hidden **and** the hamburger menu is also hidden. Users have zero navigation controls.

### 1.3 Client Re-hydration Flash & Cumulative Layout Shift (CLS) on Homepage
- **Root Cause:** On the homepage (`src/app/page.tsx`), sections for Featured Programs, Upcoming Events, Latest News, Gallery, and Partners are conditionally wrapped in `{featuredPrograms.length > 0 && ...}`. Because arrays are empty during SSR, the server sends HTML with none of these sections. When the client hydrates, all five massive sections abruptly pop into the DOM.
- **Impact:** Significant layout shift, poor Core Web Vitals score, and crawler penalty because search engine bots receive an empty shell for dynamic sections.

---

## 2. Homepage Deep Dive by Section

| Section | What Works | What Looks Weak / Generic | What Feels AI-Generated | What Should Be Removed / Simplified | What Should Be Emphasized |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **NAVBAR** | Crisp 76px institutional height, STLY emblem box, clear language switch, clean mobile drawer animation. | Admin login user icon placed in public header; 9 navigation links cause crowding on intermediate desktop widths. | Generic lockup of user avatar icon on a public youth NGO navbar. | **Remove Admin Icon** from public header (move to footer / private URL). Collapse secondary links (e.g. Partners, Fields) into dropdown or footer. | Prominent "طلب الانضمام" (Membership) CTA button and bilingual League identity. |
| **HERO** | High-contrast deep navy background (`#062B55`), authoritative Cairo headline, clear dual action buttons. | The right column is a dark simulated SaaS dashboard card with pseudo-tech widgets rather than real youth science photos. | Pseudo-code labels like `"ROS / Arduino"`, `"ML / Vision"`, `"Patents / Startups"`, and a pulsing green `"ACTIVE"` pill. | **Remove the fake SaaS status card and floating badge**. Replace with a high-impact editorial photo collage or structured institutional pillars. | Tangible impact: youth in labs, robotics workshops, scientific competitions, active programs. |
| **MISSION & VALUES** | 5-col narrative with 3-col core values grid (`العلم`, `الإبداع`, `المجتمع`); elegant asymmetrical layout. | Standard 3 icon cards with generic definitions that mirror generic NGO templates. | Generic Lucide icons (`Atom`, `Sparkles`, `Users`) inside identical colored squares. | Simplify card borders; convert into an integrated editorial manifesto with bulleted structural commitments. | Constantine local impact, university partnership ecosystem, youth development statistics. |
| **SCIENTIFIC FIELDS** | Comprehensive 6-track overview covering core scientific & engineering disciplines. | 6 identical bordered cards with light pastel icon backgrounds; creates visual repetition and card fatigue. | Generic 3-line bullet descriptions with generic icons. | Convert from 6 uniform cards into an interactive horizontal track selector or high-density editorial grid. | Practical equipment available in labs (e.g. 3D printers, microcontrollers, testing stations). |
| **PROGRAMS** | Clean 16:10 aspect ratio cards, duration and category tags, direct slug linking. | Relies on SVG fallback graphics when cover images are missing; cards look repetitive without distinct photos. | Generic program summaries (`برنامج تدريبي تطبيقي...`). | Standardize badge positioning with logical CSS (`start-3`); eliminate repetitive fallback patterns. | Clear start dates, age categories (e.g. 15-20, 21-35), and registration status badges. |
| **EVENTS** | Calendar date block with prominent day/month; distinguishes active vs closed registrations. | Date badge month abbreviation sometimes displays Latin characters in Arabic mode. | Generic event titles like `"صالون قسنطينة للعلوم"`. | Standardize date formatting with dedicated Arabic month names (e.g. مارس, أفريل). | Seat availability countdown, venue location badge, and direct registration trigger. |
| **NEWS** | Editorial 7-col featured article paired with 5-col secondary stack; good hierarchy. | Featured article placeholder image creates a huge gray void when image fails to load. | Generic corporate press release tone (`توج فريق الرابطة...`). | Add rich author metadata and reading time; eliminate generic fallback text. | Official press releases, competition photo documentation, downloadable announcements. |
| **GALLERY** | Interactive lightbox preview, hover caption overlays, aspect-square grid. | All 6 items currently render identical fallback SVGs; no real photo thumbnail loaded. | Generic placeholder titles. | Ensure progressive image loading with graceful blur placeholders. | Real event photo stream showcasing youth, robotic assemblies, and awards. |
| **PARTNERS** | Clean 6-col logo grid with grayscale hover effect; institutional category tags. | Partner logo fallback displays plain text inside an empty box when image file is missing. | Generic academic partner descriptions. | Provide official vector SVG logos for Algerian universities and research centers. | Formal partnership protocols and joint research initiatives. |
| **CTA BANNER** | Deep navy gradient (`#062B55` -> `#041D38`), clear dual actions ("طلب الانضمام" / "اكتشف البرامج"). | Generic headline ("جاهز للانطلاق معنا في رحلة الابتكار؟"); identical styling to SaaS marketing footers. | Generic sparkle badge. | Ground the copy in concrete youth opportunities (e.g. annual membership batch, free lab access). | Direct link to online application with processing timeline note. |
| **FOOTER** | 4-column structured deep navy layout; official accreditation badge; legal privacy link. | Social media icons link to dummy `href="#"`; telephone and address need official validation. | Generic copyright and placeholder social handles. | Replace dummy links with verified STLY channels; add administrative registry number. | Physical office location map link, official contact email, ministry accreditation notice. |

---

## 3. Visual Design & Card Fatigue Audit

### 3.1 Card Fatigue Analysis
The current website relies heavily on the "card in a box" paradigm across almost every section:
1. **Homepage:** 1 hero card + 3 mission cards + 6 field cards + 3 program cards + 2 event cards + 3 news cards + 6 partner cards = **24 bordered rectangular cards on a single page**.
2. **Impact on User Perception:** This creates a repetitive, "dashboard-like" visual rhythm that feels like an off-the-shelf SaaS directory rather than an official scientific institution.
3. **Editorial Alternatives Recommended:**
   - Replace Mission cards with a typography-driven editorial statement featuring bold key metrics.
   - Present Scientific Fields as an interactive tabulated track system with expandable module details.
   - Use horizontal editorial rows for events with calendar date stamps instead of vertical cards.

### 3.2 Design System Tokens & Hierarchy
- **Palette Consistency:** Institutional Navy (`#062B55`), Deep Navy (`#041D38`), Emerald Green (`#1F9D45`), Light Mint (`#2CB85C`), and Neutral Off-White (`#F4F7FA`) are applied harmoniously.
- **Border & Radius Inconsistency:**
  - Most cards use `rounded-xl` (`12px`), while the Hero widget uses `rounded-2xl` (`16px`) and buttons use `rounded-lg` (`8px`).
  - Standardize radius tokens: `rounded-lg` for interactive controls (buttons, inputs), `rounded-xl` for content containers, `rounded-2xl` for large visual banners.
- **Shadows:** Minimalist use of `shadow-xs` and `shadow-sm` is clean and avoids outdated muddy drop shadows.

---

## 4. Navbar & Navigation Quality

### 4.1 Findings & Flaws
1. **Nav Item Overcrowding:** 9 items in the primary header (`الرئيسية`, `عن الرابطة`, `المجالات`, `البرامج`, `الفعاليات`, `الأخبار`, `المعرض`, `الشركاء`, `اتصل بنا`) is too dense for standard desktop displays (1280px-1440px).
2. **Admin Login Icon:** Placing an admin user icon in the top header is confusing to public visitors and youth applicants. Public websites should never expose administrative entry points in primary navigation.
3. **Sticky Header Elevation:** Smooth transition on scroll (`isScrolled ? bg-white/95 backdrop-blur-md shadow-xs : bg-white`) works well.
4. **Active Route Indicator:** Green bottom border line (`h-0.5 bg-brand-green`) provides clear spatial orientation.

### 4.2 Recommended Navbar Structure
- **Primary Nav (5 links max):** `عن الرابطة` (About), `المجالات والبرامج` (Fields & Programs), `الفعاليات` (Events), `الأخبار` (News), `اتصل بنا` (Contact).
- **Secondary Links:** Move `الشركاء` (Partners), `المعرض` (Gallery), and `سياسة الخصوصية` (Privacy) to Footer.
- **Actions:** Language Switcher (`العربية / English`) + Primary Button (`طلب الانضمام`).

---

## 5. Typography & Bilingual (RTL/LTR) Review

### 5.1 Cairo & Outfit Typography
- **Arabic (Cairo):** Excellent legibility for headings and body copy. Weights 400 (regular), 600 (semi-bold), 700 (bold), and 800 (extra-bold) are utilized effectively.
- **Latin (Outfit):** Clean, geometric sans-serif that harmonizes well with Cairo's structure.
- **Typography Flaws Identified:**
  - Sub-labels and meta tags use `text-[10px]` and `text-[11px]` in several components, which is below the WCAG minimum recommendation for effortless reading on mobile devices.
  - Line height on Arabic paragraphs (`leading-relaxed`) is adequate, but Arabic headings with line breaks (`<br />`) sometimes have tight leading (`leading-[1.2]`) causing diacritic clipping on certain mobile browsers.

### 5.2 RTL & LTR Directional Issues
1. **Physical Positioning Classes:**
   - In `src/components/ui/ProgramCard.tsx`: `absolute top-3 right-3` places status badges on the right side in both Arabic and English. In RTL, standard leading edge is the right, but in LTR it should be the left. Should use logical classes `top-3 start-3` or `top-3 end-3`.
2. **Directional Arrow Icons:**
   - `ArrowIcon` dynamically switches between `ArrowLeft` and `ArrowRight`, which is correctly implemented in `page.tsx` and detail pages.
3. **Form Input Direction:**
   - Phone numbers and email inputs correctly enforce LTR text alignment (`dir="ltr"`) within RTL forms.

---

## 6. Mobile UX Inspection (430px / 375px Viewports)

| Component / Flow | Mobile UX Finding | Severity | Recommended Improvement |
| :--- | :--- | :---: | :--- |
| **Hero Section** | Stacks vertically into an excessively tall viewport section (>1200px height); users must scroll past multiple text blocks before seeing any content. | **P1** | Compact hero copy on mobile; hide secondary card mockup; bring primary CTA into immediate first fold. |
| **Membership Form** | Monolithic 12-field single page requires 4+ full screen scrolls; high drop-off risk. | **P1** | Convert into a streamlined 3-step wizard with visual progress bar. |
| **Filter Tabs (Gallery / Events)** | Horizontal filter pills wrap onto 3 jagged lines on 375px screens. | **P2** | Implement a horizontal scrollable pill container (`overflow-x-auto no-scrollbar`). |
| **Event Calendar Blocks** | Calendar square blocks take up full width on 375px screens, pushing event titles down. | **P2** | Inline the date badge with title in a compact flex row on mobile. |
| **Drawer Navigation** | Mobile drawer slides in cleanly with smooth overlay; touch targets are well-sized (48px height). | **Good** | Maintain current drawer behavior; ensure focus is trapped when open. |

---

## 7. Content Credibility & Client Verification

> [!WARNING]
> The current codebase contains detailed claims regarding official partnerships, university affiliations, competition awards, and contact coordinates. All items below **must be formally verified with the STLY leadership** before production release.

### Content Requiring Client Verification Table

| Content Category | Claim in Code / Site | Source File | Status / Verification Needed |
| :--- | :--- | :--- | :--- |
| **Institutional Address** | `حي سيدي مبروك السفلي، قسنطينة، الجزائر` | `src/context/PrototypeStateContext.tsx` | Confirm exact physical headquarters address & postal code. |
| **Phone Number** | `031 92 48 10` | `src/context/PrototypeStateContext.tsx` | Confirm if this landline/mobile is active and staffed. |
| **Official Email** | `contact@stly.dz` | `src/context/PrototypeStateContext.tsx` | Confirm if `@stly.dz` domain has active MX records and inbox. |
| **Academic Partnerships** | Mentouri Constantine 1 University (`UMC`) & Constantine 3 University (`Salah Boubnider`) | `src/data/partners.ts` | Confirm if formal signed conventions / protocols exist. |
| **Government Partnerships** | Directorate of Youth and Sports (`DJS Constantine`) | `src/data/partners.ts` | Confirm formal ministerial / wilaya affiliation status. |
| **Research Center Partner** | `CRTI` (Research Center in Industrial Technologies) | `src/data/partners.ts` | Confirm collaboration scope and approval to use logo. |
| **National Competition Award** | "1st Place in National Robotics Competition 2026 in Algiers" | `src/data/articles.ts` | Confirm if this was an actual won competition or placeholder. |
| **Official Social Links** | Facebook, Twitter/X, YouTube (all currently `href="#"`) | `src/components/Footer.tsx` | Provide actual official STLY social URLs. |
| **Working Hours** | `الأحد — الخميس: 08:30 — 16:30` | `src/app/contact/page.tsx` | Confirm actual youth club operating hours. |
| **Age Eligibility** | `15 — 35 سنة` | `src/data/translations.ts` | Confirm official league statute membership age range. |

---

## 8. Media & Photography Assessment

### 8.1 Real Photos vs Fallbacks
Currently, 100% of image paths in `public/images/` are dummy routes (`/images/programs/robotics.png`, `/images/events/salon.png`, `/images/gallery/camp-1.png`). The site relies exclusively on the generated `MediaFallback` SVG component.

### 8.2 Sections Urgently Requiring Real STLY Photography
1. **Homepage Hero:** Needs an authentic high-resolution photograph of Constantine youth collaborating in a robotics or electronics workshop.
2. **Programs Directory (`/programs`):** Needs 3 real cover photos depicting:
   - Robotics & Arduino assembly.
   - Computer programming & AI workshop.
   - Scientific experiment / chemistry lab.
3. **Events Directory (`/events`):** Needs 3 real event banner photographs showing previous conferences or salons.
4. **Gallery (`/gallery`):** Needs 12-16 authentic photographs categorized across albums (Robotics Lab, Science Salon, Youth Bootcamps).
5. **Partner Logos (`/partners`):** Needs high-resolution vector/transparent PNG logos for universities and institutions.

---

## 9. Forms & User Interaction Review

### 9.1 Membership Form (`/membership`)
- **Strengths:** Robust client-side validation schema using Zod; Algerian phone number regex (`^(05|06|07|02)[0-9]{8}$`); clear error messages; accessible form fields.
- **Weaknesses:** Monolithic single-page form with 12 input controls creates high friction on mobile devices.
- **Architectural Recommendation:** Refactor into a 3-step wizard:
  - **Step 1:** Personal Coordinates (Name, DOB, Wilaya, Municipality, Phone, Email).
  - **Step 2:** Scientific Interests & Education (Study field, interests checkbox group, practical skills).
  - **Step 3:** Motivation & Statement (Why join STLY, portfolio link, declaration checkbox).

### 9.2 Event Registration Form (`/events/[slug]`)
- **Strengths:** Ticket reference number generator with instant confirmation banner; clean field layout.
- **Weaknesses:** Submitting registration modifies client-only prototype state; registration form is embedded at bottom of event detail page without jump-link from top hero.

### 9.3 Contact Form (`/contact`)
- **Strengths:** Compact 4-field structure; paired with FAQ accordion; feedback toast on submission.

---

## 10. Accessibility (a11y) & Performance Audit

### 10.1 Accessibility Classification

#### CRITICAL (a11y)
- **Skip-to-Content Link:** Missing `<a href="#main-content" className="sr-only">Skip to content</a>`. Keyboard users must tab through all 9 navbar links on every page.
- **Modal Focus Trap:** In `GalleryPage` lightbox modal, focus is not trapped inside the active dialog; pressing `Tab` navigates background DOM elements.

#### MAJOR (a11y)
- **Image Fallback Alt Text:** In `MediaFallback.tsx`, decorative geometric SVGs lack `aria-hidden="true"`, causing screen readers to announce unlabelled graphic nodes.
- **Form Error Associations:** Error messages are displayed beneath inputs, but inputs lack `aria-invalid="true"` and `aria-describedby="error-id"`.

#### MINOR (a11y)
- **Contrast Ratios:** Muted text (`#64748B`) on background (`#F4F7FA`) achieves 4.6:1 contrast (passes AA normal text), but `text-xs` caption text on colored badges should be tested for AAA compliance.

### 10.2 UX & Performance Findings
- **Turbopack Build Optimization:** With variable font loading resolved, local build compiles in 3.2s with 0 type errors.
- **No Heavy 3rd-Party Scripts:** Zero heavy tracking scripts, bloated animation libraries, or external CDNs; fast initial bundle size.
- **Client-Side Cache Flash:** Due to client-only state hydration, users on slow connections experience a 100-300ms flash where data lists pop into existence.

---

## 11. Priority Matrix (P0 – P3)

```
====================================================================================================
PRIORITY CLASSIFICATION:
P0 = Broken / Functional Failure / Misleading / Prevents Navigation
P1 = Major UX or Visual Quality Flaw / Significant Friction
P2 = Important Polish & Consistency Improvement
P3 = Optional Refinement & Minor Aesthetic Tuning
====================================================================================================
```

| ID | Priority | Page / Area | Section | Issue Description | Why It Matters | Recommended Fix | Effort |
| :--- | :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| **BUG-01** | **P0** | Global (`[slug]`) | Server Rendering | Direct URL navigation to `/programs/[slug]`, `/events/[slug]`, `/news/[slug]` returns 404. | Users cannot bookmark, share, or open dynamic links from search or social media. | Initialize prototype state directly with static datasets during SSR; hydrate from storage only if local changes exist. | **Medium** |
| **BUG-02** | **P0** | Global (Navbar) | Breakpoints | 1024px-1279px viewport hides desktop links AND mobile hamburger menu. | iPad Pro and small laptop users have literally zero navigation links. | Adjust breakpoints: show desktop nav from `lg:flex` or display mobile toggle up to `xl:hidden`. | **Small** |
| **BUG-03** | **P0** | Homepage | SSR Hydration | Dynamic sections (Programs, Events, News, Gallery, Partners) are empty on initial server render. | Severe layout shift (CLS) and search engines receive an empty homepage shell. | Provide default server-rendered data items instead of waiting for client `useEffect`. | **Medium** |
| **UX-01** | **P1** | Homepage | Hero Right Col | Dark simulated SaaS status card with pseudo-code tags (`ROS/Arduino`, `ACTIVE`). | Makes a youth NGO look like an artificial AI-generated tech startup template. | Replace with authentic photography collage or dignified institutional mission pillars. | **Medium** |
| **UX-02** | **P1** | Navbar | Public Header | Admin login user icon placed directly in primary public navigation. | Confuses public users and lowers institutional dignity. | Remove from header; place discreet admin login link in Footer or private `/admin/login`. | **Small** |
| **UX-03** | **P1** | Membership | Form Flow | Monolithic 12-field single-page form on mobile viewports. | High user drop-off rate and visual intimidation on smartphones. | Refactor into a clean 3-step wizard with step indicators. | **Medium** |
| **UX-04** | **P1** | Global | Media Assets | 100% of photos are missing and rely on generic geometric SVG fallbacks. | Site looks like an unpopulated prototype without real human activity. | Integrate real STLY photography or high-fidelity authentic Algerian youth science imagery. | **Large** |
| **CONT-01**| **P1** | Global | Credibility | Unverified claims regarding partnerships, addresses, phone numbers, awards. | Legal and organizational risk if claims are inaccurate or unapproved. | Conduct formal content verification with STLY leadership using audit checklist. | **Medium** |
| **VIS-01** | **P2** | Homepage | Layout Rhythm | Card fatigue from 24 uniform bordered rectangular cards on one page. | Monotonous visual scanning; feels like a directory dashboard. | Introduce varied editorial layouts (manifesto typography, split rows, horizontal lists). | **Medium** |
| **VIS-02** | **P2** | Programs/Events | Badges | Physical positioning classes (`right-3`) cause flipped badge alignments in RTL/LTR. | Inconsistent visual hierarchy between Arabic and English modes. | Replace physical classes with logical Tailwind classes (`start-3`, `end-3`). | **Small** |
| **VIS-03** | **P2** | Gallery / Events | Mobile Tabs | Filter tab pills wrap onto multiple jagged lines on small screens. | Wastes vertical screen real estate on mobile. | Implement horizontal swipeable pill bar (`overflow-x-auto`). | **Small** |
| **A11Y-01**| **P2** | Global | Accessibility | Missing skip-to-content link and modal focus traps. | Fails WCAG keyboard navigation standards for disabled visitors. | Add accessible skip link and trap focus inside active modal dialogs. | **Small** |
| **POL-01** | **P3** | Footer | Social Links | Social links point to dummy `href="#"`. | Dead-end interaction for visitors looking for official social presence. | Update with real STLY handles or hide specific platforms until established. | **Small** |
| **POL-02** | **P3** | Typography | Font Scaling | Minor diacritic clipping on tightly lead Arabic headings on certain mobile OS. | Subtle visual artifact on Arabic typography. | Increase heading line-height from `leading-[1.2]` to `leading-[1.3]`. | **Small** |

---

## 12. Recommended Phased Implementation Plan

> [!NOTE]
> This plan is presented for architectural alignment only. **No implementation will begin until formal user review and approval.**

### Phase 1: Critical Bug Fixes & Architecture (P0 / Urgent)
1. **Fix SSR & Dynamic Route 404s:** Refactor `PrototypeStateContext` and dynamic route loaders to use static baseline data on server render, ensuring direct URL access and SEO indexing work flawlessly.
2. **Fix Tablet Navigation Breakpoint:** Align `Navbar.tsx` responsive classes so navigation is continuously accessible from 320px to 4K displays.
3. **Remove Admin Icon from Public Navbar:** Move administrative login exclusively to footer/private URL.

### Phase 2: Visual De-Dashboarding & Editorial Rhythm (P1 / Visual)
1. **Redesign Hero Right Column:** Replace pseudo-SaaS status card with an authoritative institutional visual layout featuring real youth science imagery or structured pillars.
2. **Break Card Fatigue:** Transform Mission into an editorial narrative and Scientific Fields into an interactive structured track explorer.
3. **Refactor Membership Form:** Build a responsive 3-step wizard with client-side progress state.

### Phase 3: Mobile, RTL & Accessibility Hardening (P2 / Quality)
1. **Logical Positioning:** Replace all physical `right-*` / `left-*` classes on badges and cards with logical `start-*` / `end-*` classes.
2. **Mobile Overflow Controls:** Add smooth horizontal scrolling to filter tabs in Events and Gallery.
3. **Accessibility Compliance:** Implement Skip-to-Content link, focus trap in gallery modal, and complete `aria-*` tags.

### Phase 4: Content Verification & Real Media Integration (P3 / Polish)
1. **Execute Client Verification:** Review and finalize all institutional claims, telephone numbers, emails, addresses, and partnerships with the STLY leadership.
2. **Deploy Real STLY Photography:** Populate official program covers, event highlights, and gallery albums.
