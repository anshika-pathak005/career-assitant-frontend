# CareerPilot — Frontend

The frontend client for **Career Assistant**, a full-stack AI-powered career guidance platform that helps students and aspiring professionals plan and manage their career journey. Built with **Next.js** and **TypeScript**, it consumes the Career Assistant backend REST API.

> Backend repository: see the companion `career-assistant` project (Java Spring Boot + MySQL).

---

## Overview

The frontend provides the full user experience for the platform:

- Account registration (multi-step onboarding) and secure login
- Resume upload and AI-powered resume analysis viewer
- Personalized career roadmap generation and progress tracking
- Interactive dashboard with profile status, quick stats, and activity overview
- Profile and account settings management
- Placeholder sections for upcoming features: AI chat assistant, job listings, and skills tracking

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| HTTP Client | Axios |
| Data Fetching / Caching | React Query (via `QueryProvider`) |
| Auth State | Custom `AuthProvider` + JWT-based session |
| Linting | ESLint |

---

## Project Structure

```
app/                       # Next.js App Router pages
├── about/, help/, pricing/    # Static/marketing pages
├── login/, register/          # Auth flows (register has a 2-step flow)
├── dashboard/                  # Main authenticated dashboard
├── resume-analysis/            # Resume upload, analysis list & detail views
├── roadmap/                    # Roadmap generation & detail views
├── progress/, skills/          # Progress & skills tracking
├── profile/, settings/         # Account management
├── chat/, jobs/                # Upcoming feature placeholders

components/
├── dashboard/       # Dashboard-specific widgets (stats, cards, banners)
├── landingPageSections/  # Public landing page sections
├── layout/           # App shell, header, sidebar, navbar, footer
└── ui/               # Reusable UI primitives (Button, Card, Input, Modals)

constants/    # Enums, roadmap constants, route definitions
hooks/        # Custom React hooks (data fetching per domain)
lib/          # Axios instance, React Query client setup
providers/    # Context providers (Auth, Query)
services/     # API service layer (one per domain)
types/        # Shared TypeScript types
utils/        # Small utility helpers (debounce, date formatting, validation)
```

---

## Core Features by Module

### Authentication
- `app/login`, `app/register`, `app/register/step2`
- `hooks/useAuth.ts`, `useLogin.ts`, `useRegister.ts`
- `services/authService.ts`
- `providers/AuthProvider.tsx` — manages auth state app-wide

### Resume Analysis
- `app/resume-analysis`, `app/resume-analysis/analyze`, `app/resume-analysis/[id]`
- `hooks/useResumeAnalysis.ts`
- `services/resumeService.ts`
- `types/resume.types.ts`

### Career Roadmap
- `app/roadmap`, `app/roadmap/generate`, `app/roadmap/[id]`
- `hooks/useRoadmap.ts`, `useRoadmapUsage.ts`
- `services/roadmapService.ts`
- `types/roadmap.types.ts`
- `constants/roadmap.constants.ts`

### Dashboard
- `app/dashboard`
- `hooks/useDashboard.ts`
- `services/dashboardService.ts`
- `components/dashboard/*` — quick stats, roadmap preview, analysis overview, profile completion banner

### Profile & Settings
- `app/profile`, `app/settings`
- `hooks/useUser.ts`, `useUserProfile.ts`, `useUserSettings.ts`
- `services/userService.ts`
- `types/profile.types.ts`

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Setup

1. **Clone the repository**
   ```bash
   git clone <frontend-repo-url>
   cd career-assistant-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**

   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

---

## Architecture Notes

- **API communication**: centralized through `lib/axiosInstance.ts`, with one dedicated service file per domain (`authService`, `resumeService`, `roadmapService`, `dashboardService`, `userService`, `chatService`, `specializationService`) — keeping API logic out of components.
- **Data fetching**: React Query (`QueryProvider`) handles caching, refetching, and loading/error states via custom hooks.
- **Route protection**: `hooks/useRouteGuard.ts` guards authenticated routes.
- **Reusable UI**: shared primitives live in `components/ui`, keeping page-level components lean.

---

## Roadmap (Planned Features)

- AI career chat assistant (`app/chat`)
- Job recommendations (`app/jobs`)
- Expanded skills tracking (`app/skills`)

