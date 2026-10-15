
# CareerPilot — AI-Powered Career Assistant

[![Next.js](https://img.shields.io/badge/Next.js-16.2.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.19-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

## 1. Introduction

CareerPilot is an AI-powered career assistance platform designed to help users plan their career development, analyze their resumes, and track their progress toward career goals.

The platform provides a personalized interface for career roadmap generation, resume analysis, and progress tracking. It uses a Next.js frontend and a Spring Boot backend, communicating through REST APIs.

- Live Demo: https://my-career-pilot.vercel.app/
- Frontend Repository: https://github.com/anshika-pathak005/career-assitant-frontend
- Backend Repository: https://github.com/anshika-pathak005/ai-career-assistant-backend

## 2. Features

- **User Authentication:**
  - User registration and login.
  - Authentication state management.
  - Protected route handling and authentication-aware layouts.

- **Career Dashboard:**
  - Access career development information through a centralized dashboard.
  - View relevant user and career progress information.

- **AI-Powered Career Roadmaps:**
  - Generate personalized career roadmaps.
  - View roadmap phases and learning steps.
  - Track roadmap progress.
  - Mark roadmap steps as completed.
  - Access roadmap usage information.

- **Resume Analysis:**
  - Submit resumes for analysis.
  - Display resume analysis results.
  - Access resume-related functionality through the user interface.

- **Profile & Account Settings:**
  - View and manage user profile information.
  - Update supported account settings.
  - Manage profile-related information through dedicated interfaces.

- **Form Validation & User Feedback:**
  - Form handling using React Hook Form.
  - Schema-based validation using Zod.
  - Toast notifications and user-facing error handling.

- **Planned Features:**
  - Career assistance chat functionality.
  - Job discovery and related functionality.
  - Skills exploration and management.

  Note: Chat, Jobs, and Skills are planned features and are not yet implemented as complete functional features.

## 3. Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Frontend framework and routing |
| React 19 | Component-based user interface |
| TypeScript | Static typing |
| Tailwind CSS | Styling and responsive layouts |
| Axios | HTTP communication with the backend |
| TanStack Query | Server-state management and caching |
| React Hook Form | Form state management |
| Zod | Schema validation |
| Lucide React | Icons |
| Sonner | Toast notifications |
| Spring Boot | Backend REST API |
| MySQL | Relational database |

## 4. Architecture and API Communication Flow

The frontend uses a modular architecture that separates routes, reusable components, custom hooks, API services, and shared utilities.

### API Communication Flow

User interaction
-> Next.js pages and React components
-> Custom hooks
-> Service layer
-> Axios HTTP request
-> Spring Boot REST API
-> Database or backend processing
-> API response
-> Application state update
-> UI update

### Architectural Components

- `app/` — Application routes, pages, layouts, and global styles.
- `components/` — Reusable UI and feature-specific components.
- `hooks/` — Custom hooks for authentication, roadmaps, resume analysis, and other application logic.
- `services/` — Functions responsible for backend API communication.
- `providers/` — Authentication and TanStack Query providers.
- `types/` — TypeScript type definitions.
- `utils/` — Shared utilities for formatting, validation, errors, and progress calculations.
- `lib/` — Shared libraries and supporting application logic.
- `constants/` — Application constants.

The frontend and backend are maintained in separate repositories and deployed independently.

## 5. Project Structure

```text
career-assitant-frontend/
├── app/
│   ├── about/
│   ├── chat/
│   ├── dashboard/
│   ├── help/
│   ├── jobs/
│   ├── login/
│   ├── progress/
│   ├── register/
│   ├── resume-analysis/
│   ├── roadmap/
│   ├── settings/
│   ├── skills/
│   ├── ClientLayoutWrapper.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   ├── profile/
│   ├── register/
│   ├── resume/
│   ├── roadmap/
│   ├── settings/
│   └── ui/
├── constants/
├── hooks/
├── lib/
├── providers/
│   ├── AuthProvider.tsx
│   └── QueryProvider.tsx
├── public/
├── services/
│   ├── authService.ts
│   ├── chatService.ts
│   ├── dashboardService.ts
│   ├── resumeService.ts
│   ├── roadmapService.ts
│   ├── specializationService.ts
│   └── userService.ts
├── types/
├── utils/
├── .env.example
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 6. Prerequisites and Installation

Prerequisites:

- Node.js compatible with Next.js 16.
- npm.
- Git.

Clone the repository:

```bash
git clone https://github.com/anshika-pathak005/career-assitant-frontend.git
cd career-assitant-frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root and configure the backend API URL.

## 7. Environment Variables

The application uses the following environment variable:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the backend REST API |

For the deployed backend:

```env
NEXT_PUBLIC_API_URL=https://careerpilot-backend-8j85.onrender.com
```

For local backend development:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Restart the development server after changing environment variables.

Note: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Do not store secrets or private credentials in these variables.

## 8. Running Locally

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

Ensure the configured backend is accessible for features that require API communication.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint |

To test a production build locally:

```bash
npm run build
npm run start
```

## 9. Deployment

The frontend and backend are deployed independently.

- **Frontend — Vercel:** https://my-career-pilot.vercel.app/
- **Backend — Render:** https://careerpilot-backend-8j85.onrender.com

### Frontend Deployment

1. Connect the frontend repository to Vercel.
2. Configure `NEXT_PUBLIC_API_URL` with the deployed backend URL.
3. Build and deploy the application.
4. Verify frontend-to-backend communication and the implemented features.

### Backend Deployment

The Spring Boot backend is maintained separately and deployed on Render.

Backend source code: https://github.com/anshika-pathak005/ai-career-assistant-backend

## 10. Author

**Anshika Pathak**

- GitHub: https://github.com/anshika-pathak005
