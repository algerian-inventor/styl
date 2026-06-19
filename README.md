# STLY Constantine

Official high-fidelity web prototype and backend foundation for the **Scientific and Technical Youth League (STLY) – Constantine** (الرابطة العلمية والتقنية للشباب – قسنطينة).

This project is a complete, interactive frontend prototype designed to showcase the organization's public routes, user flows, and administrative dashboard.

---

## 🛠️ Technology Stack

- **Core**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion (for animations and custom transitions)
- **Forms & Validation**: React Hook Form, Zod
- **Icons**: Lucide React
- **State Management**: Client-side state managed via React Context (`PrototypeStateContext`) backed by `localStorage` persistence

---

## 📱 Prototype Status & Scope

- **Localization**: Native Arabic RTL (primary) and English LTR (secondary) toggle support. Layouts, margins, alignments, and icons flip automatically depending on the selected language.
- **Routes Implemented**:
  - **Public (14 routes)**: Home (`/`), About (`/about`), Scientific Fields (`/fields`), Club Programs (`/programs` and `/programs/[slug]`), Events (`/events` and `/events/[slug]`), News feed (`/news` and `/news/[slug]`), Gallery lightbox (`/gallery`), Partners directory (`/partners`), Membership Application form (`/membership`), Contact & FAQs (`/contact`), and Privacy policy (`/privacy`).
  - **Admin Panel (12 routes)**: Dashboard home (`/admin`), articles overview, bilingual article creator, events controller, event builder, programs table, registrations manager, membership profile reviews, gallery directory, partners directory, and configuration settings.
- **Storage Layer**: The prototype relies on client-side React Context and `localStorage` to simulate backend storage. Submissions from membership or event booking forms immediately populate the administration log tables in real-time.

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 2. Environment Setup
Rename the template `.env.example` file to `.env.local`:
```bash
cp .env.example .env.local
```
Define your environment variables inside `.env.local` using placeholders:
- `DATABASE_URL`: PostgreSQL database link (for future integration)
- `AUTH_SECRET`: Secret key used for admin dashboard sessions
- `NEXT_PUBLIC_API_URL`: Root URL of the API server

### 3. Run the Development Server
Start the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the prototype.

### 4. Build for Production
Run the production compiler and type checker:
```bash
npm run build
```

### 5. Code Linter Check
Run ESLint code standards verification:
```bash
npm run lint
```

---

## 🔒 Security & Prototype Limitations

> [!WARNING]
> **DEMO SECURITY ONLY**
> The authentication flow and client-side database persistence are mock structures designed for demonstration purposes only.
> - **Demo Admin Credentials**: `admin@stly.dz` / `demo123`
> - **State Persistence**: Database operations are cached in `localStorage`. Clearing your browser cache will reset all data tables to their default mock records.
> - **Production Safety**: Never deploy this version of the authentication flow to a production environment. When connecting a live backend, ensure this gate is replaced with production-grade protocols (e.g., Auth.js / NextAuth or a secure external auth service).

---

## 📝 License
This project is proprietary. All rights reserved.
