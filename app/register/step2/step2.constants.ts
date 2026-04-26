// all arrays: ROLES, INDUSTRIES, GOAL_TYPES, etc.

import {
  GraduationCap,
  Sparkles,
  BriefcaseBusiness,
  Target,
  Rocket,
  RefreshCw,
  TrendingUp,
  Globe,
  Building2,
  Zap,
} from "lucide-react";

/* ─── Role options ───────────────────────────────────────────────── */
export const ROLES = [
  {
    id: "student",
    label: "Student",
    sub: "High School / College",
    desc: "Looking for internships",
    icon: GraduationCap,
  },
  {
    id: "fresher",
    label: "Fresher",
    sub: "Graduated, first job",
    desc: "Need resume help",
    icon: Sparkles,
  },
  {
    id: "professional",
    label: "Professional",
    sub: "Experienced",
    desc: "Looking for a job switch",
    icon: BriefcaseBusiness,
  },
] as const;

/* ─── Goal type options ──────────────────────────────────────────── */
export const GOAL_TYPES = [
  { id: "Internship", label: "Internship", icon: Target },
  { id: "First Job", label: "First Job", icon: Rocket },
  { id: "Career Switch", label: "Career Switch", icon: RefreshCw },
  { id: "Upskill", label: "Upskill", icon: TrendingUp },
] as const;

/* ─── Industry options ───────────────────────────────────────────── */
export const INDUSTRIES = [
  "Technology & Software",
  "Data Science & AI",
  "Banking & Finance",
  "Marketing & Advertising",
  "Healthcare & Pharma",
  "Design & Creative",
  "Education & Teaching",
  "Sales & Business Development",
  "Consulting",
  "Operations & Supply Chain",
  "Startup / Entrepreneurship",
  "E-commerce & Retail",
  "Media & Entertainment",
  "Government & Public Sector",
  "Cybersecurity",
  "Cloud & DevOps",
] as const;

/* ─── Experience options ─────────────────────────────────────────── */
export const EXPERIENCE_OPTIONS = [
  "0 years (Fresher)",
  "1–2 years",
  "3–5 years",
  "5–8 years",
  "8+ years",
] as const;

/* ─── Project experience levels ──────────────────────────────────── */
export const PROJECT_LEVELS = [
  { id: "No projects", label: "No Projects", desc: "Just getting started" },
  { id: "Basic", label: "Basic", desc: "Simple guided projects" },
  { id: "Intermediate", label: "Intermediate", desc: "Personal / course work" },
  { id: "Real-world", label: "Real-world", desc: "Production / freelance" },
] as const;

/* ─── Work preference options ────────────────────────────────────── */
export const WORK_PREFERENCES = [
  { id: "Remote", label: "Remote", icon: Globe },
  { id: "On-site", label: "On-site", icon: Building2 },
  { id: "Hybrid", label: "Hybrid", icon: Zap },
] as const;

/* ─── Industry → suggested skills map ───────────────────────────── */
export const INDUSTRY_SKILLS_MAP: Record<string, string[]> = {
  "Technology & Software": [
    "React",
    "Node.js",
    "Java",
    "Spring Boot",
    "JavaScript",
    "TypeScript",
    "REST APIs",
    "Git",
    "Docker",
    "AWS",
  ],
  "Data Science & AI": [
    "Python",
    "Pandas",
    "NumPy",
    "Machine Learning",
    "TensorFlow",
    "PyTorch",
    "SQL",
    "Data Visualization",
    "Statistics",
  ],
  "Banking & Finance": [
    "Financial Analysis",
    "Excel",
    "Accounting",
    "Risk Management",
    "Investment Analysis",
    "Financial Modeling",
    "SQL",
  ],
  "Marketing & Advertising": [
    "SEO",
    "SEM",
    "Content Marketing",
    "Social Media Marketing",
    "Google Analytics",
    "Copywriting",
    "Canva",
  ],
  "Healthcare & Pharma": [
    "Clinical Research",
    "Healthcare Analytics",
    "Medical Coding",
    "Biostatistics",
    "Excel",
  ],
  "Design & Creative": [
    "Figma",
    "UI/UX Design",
    "Wireframing",
    "Adobe Photoshop",
    "Illustrator",
    "Prototyping",
    "User Research",
  ],
  "Education & Teaching": [
    "Curriculum Design",
    "Teaching",
    "Public Speaking",
    "Content Creation",
    "E-learning Tools",
    "Communication",
  ],
  "Sales & Business Development": [
    "Lead Generation",
    "CRM Tools",
    "Negotiation",
    "Communication",
    "Sales Strategy",
    "HubSpot",
  ],
  Consulting: [
    "Problem Solving",
    "Business Analysis",
    "Strategy",
    "Presentation Skills",
    "Market Research",
    "Excel",
  ],
  "Operations & Supply Chain": [
    "Logistics",
    "Supply Chain Management",
    "Inventory Management",
    "Process Optimization",
    "ERP Systems",
  ],
  "Startup / Entrepreneurship": [
    "Product Thinking",
    "MVP Development",
    "Fundraising Basics",
    "Growth Hacking",
    "Leadership",
    "Agile",
  ],
  "E-commerce & Retail": [
    "Shopify",
    "Product Management",
    "Digital Marketing",
    "Customer Experience",
    "Google Analytics",
  ],
  "Media & Entertainment": [
    "Video Editing",
    "Content Creation",
    "Storytelling",
    "Social Media",
    "Adobe Premiere",
  ],
  "Government & Public Sector": [
    "Policy Analysis",
    "Public Administration",
    "Research",
    "Report Writing",
    "Communication",
  ],
  Cybersecurity: [
    "Network Security",
    "Ethical Hacking",
    "Penetration Testing",
    "Security Tools",
    "Linux",
    "SIEM",
  ],
  "Cloud & DevOps": [
    "AWS",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Linux",
    "Monitoring Tools",
    "Terraform",
  ],
};

/* ─── Default skills shown when no industry is selected ─────────── */
export const DEFAULT_SKILLS = [
  "JavaScript",
  "Python",
  "Communication",
  "Problem Solving",
  "Excel",
];