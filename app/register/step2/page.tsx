"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState, KeyboardEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  X,
  GraduationCap,
  Sparkles,
  BriefcaseBusiness,
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import { completeStep2 } from "@/services/authService";

/* ─── Constants ──────────────────────────────────────────────────── */
const ROLES = [
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

const INDUSTRIES = [
  "Technology & Software",
  "Banking & Finance",
  "Marketing & Advertising",
  "Healthcare & Pharma",
  "Design & Creative",
  "Education & Teaching",
  "Sales & Business Dev",
  "Consulting",
  "Data Science & AI",
  "Operations & Supply Chain",
] as const;

const EXPERIENCE_OPTIONS = [
  "0 years (Fresher)",
  "1–2 years",
  "3–5 years",
  "5–8 years",
  "8+ years",
] as const;

const POPULAR_SKILLS = [
  "React",
  "Java",
  "Python",
  "AWS",
  "Docker",
  "TypeScript",
];

/* ─── Zod schema ─────────────────────────────────────────────────── */
// Define the shape explicitly as a plain interface — this is the single
// source of truth for the form type. zodResolver works with this directly
// because there is no Zod input/output split caused by .optional()/.default().
interface Step2FormData {
  role: string;
  dreamJob: string;
  industries: string[];
  skills: string[];
  experienceYears: string;
  currentRole: string;
}

// Zod schema validates the same shape. No .optional() or .default() used,
// so the inferred type matches Step2FormData exactly — no resolver conflict.
const step2Schema = z.object({
  role: z.string().min(1, "Please select your current stage"),
  dreamJob: z.string().min(2, "Please enter your dream job").max(100),
  industries: z.array(z.string()),
  skills: z.array(z.string()),
  experienceYears: z.string(),
  currentRole: z.string(),
}) satisfies z.ZodType<Step2FormData>;

/* ─── Small sub-components ───────────────────────────────────────── */
function SectionTitle({
  children,
  optional,
}: {
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <p className="text-sm font-semibold text-[#042558]">{children}</p>
      {optional && (
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#537FAF] bg-[#C2E8FF] px-2 py-0.5 rounded-full">
          optional
        </span>
      )}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function RegisterStep2Page() {
  const router = useRouter();
  const [skillInput, setSkillInput] = useState("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      role: "",
      dreamJob: "",
      industries: [],
      skills: [],
      experienceYears: "",
      currentRole: "",
    },
  });

  const selectedRole = watch("role");
  const selectedIndustries = watch("industries") ?? [];
  const selectedSkills = watch("skills") ?? [];
  const selectedExp = watch("experienceYears");

  /* Toggle helpers */
  const toggleIndustry = (ind: string) => {
    const current = selectedIndustries;
    setValue(
      "industries",
      current.includes(ind)
        ? current.filter((i) => i !== ind)
        : [...current, ind],
    );
  };

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !selectedSkills.includes(trimmed)) {
      setValue("skills", [...selectedSkills, trimmed]);
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) =>
    setValue(
      "skills",
      selectedSkills.filter((s) => s !== skill),
    );

  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(skillInput);
    }
  };

  const mutation = useMutation({
    mutationFn: completeStep2,
    onSuccess: () => {
      toast.success("Profile complete! Welcome to CareerPilot 🎉");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        "Something went wrong. Please try again.";
      toast.error(message);
    },
  });

  const onSubmit = (data: Step2FormData) => mutation.mutate(data);

  return (
    <main className="min-h-screen bg-[#C2E8FF] flex items-center justify-center px-4 py-12">
      {/* Background decorations */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#557EB2]/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-3xl relative">
        {/* Brand */}
        <div className="flex justify-center mb-8 animate-fade-up">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#000F22] rounded-md flex items-center justify-center">
              <BriefcaseBusiness size={18} className="text-white" />
            </div>
            <span className="font-display  text-[#000F22] text-2xl">
              CareerPilot
            </span>
          </Link>
        </div>

        <Card className="animate-fade-up delay-1 shadow-lg">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#537FAF] uppercase tracking-wider">
                Step 2 of 2
              </span>
              <span className="text-xs font-bold text-[#557EB2]">100%</span>
            </div>
            <div className="h-1.5 bg-[#C2E8FF] rounded-full overflow-hidden">
              <div className="h-full bg-[#000F22] rounded-full w-full transition-all duration-500" />
            </div>
          </div>

          {/* Header */}
          <div className="mb-7">
            <h1 className="font-display  text-[#000F22] text-3xl mb-1">
              Complete your profile
            </h1>
            <p className="text-sm text-[#537FAF]">
              Help us personalize your AI career roadmap.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-7"
          >
            {/* ── 1. Role ─────────────────────────────────────── */}
            <div className="animate-fade-up delay-2">
              <SectionTitle>Where are you right now?</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ROLES.map((r) => {
                  const isSelected = selectedRole === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setValue("role", r.id)}
                      className={[
                        "text-left p-4 rounded-lg border transition-all duration-150",
                        isSelected
                          ? "bg-[#000F22] border-[#000F22] text-white"
                          : "bg-white border-[#7A9BC4]/30 hover:border-[#557EB2] hover:bg-[#C2E8FF]/40",
                      ].join(" ")}
                    >
                      <div
                        className={`w-9 h-9 rounded-md flex items-center justify-center mb-3 ${isSelected ? "bg-white/15" : "bg-[#C2E8FF]"}`}
                      >
                        <r.icon
                          size={18}
                          className={
                            isSelected ? "text-white" : "text-[#557EB2]"
                          }
                        />
                      </div>
                      <div
                        className={`font-bold text-sm mb-0.5 ${isSelected ? "text-white" : "text-[#000F22]"}`}
                      >
                        {r.label}
                      </div>
                      <div
                        className={`text-xs mb-1 ${isSelected ? "text-white/70" : "text-[#537FAF]"}`}
                      >
                        {r.sub}
                      </div>
                      <div
                        className={`text-xs ${isSelected ? "text-white/60" : "text-[#7A9BC4]"}`}
                      >
                        {r.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.role && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* ── 2. Dream Job ─────────────────────────────────── */}
            <div className="animate-fade-up delay-3">
              <SectionTitle>Dream Job</SectionTitle>
              <Input
                placeholder="e.g., Full Stack Developer"
                error={errors.dreamJob?.message}
                {...register("dreamJob")}
              />
            </div>

            {/* ── 3. Industries ────────────────────────────────── */}
            <div className="animate-fade-up delay-4">
              <SectionTitle optional>Industries of Interest</SectionTitle>
              <div className="grid grid-cols-2 gap-2">
                {INDUSTRIES.map((ind) => {
                  const isSelected = selectedIndustries.includes(ind);
                  return (
                    <button
                      key={ind}
                      type="button"
                      onClick={() => toggleIndustry(ind)}
                      className={[
                        "flex items-center gap-2.5 px-3 py-2.5 rounded-md border text-left text-xs font-medium transition-all duration-150",
                        isSelected
                          ? "bg-[#000F22] border-[#000F22] text-white"
                          : "bg-white border-[#7A9BC4]/30 text-[#537FAF] hover:border-[#557EB2] hover:text-[#042558]",
                      ].join(" ")}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-sm flex-shrink-0 border flex items-center justify-center transition-colors"
                        style={{
                          background: isSelected ? "#fff" : "transparent",
                          borderColor: isSelected ? "#fff" : "currentColor",
                        }}
                      >
                        {isSelected && (
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#000F22"
                            strokeWidth="3.5"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        )}
                      </span>
                      {ind}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── 4. Skills (tag input) ─────────────────────────── */}
            <div className="animate-fade-up delay-5">
              <SectionTitle optional>Your Skills</SectionTitle>

              {/* Tags */}
              {selectedSkills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 bg-[#000F22] text-white text-xs font-semibold px-3 py-1 rounded-full"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        aria-label={`Remove ${skill}`}
                        className="opacity-60 hover:opacity-100 transition-opacity flex items-center"
                      >
                        <X size={10} strokeWidth={3} />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Input */}
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder="Type a skill and press Enter"
                className="w-full h-11 rounded-md border border-[#7A9BC4]/60 bg-white px-3.5 text-sm text-[#000F22] placeholder:text-[#7A9BC4] focus:outline-none focus:border-[#557EB2] focus:ring-2 focus:ring-[#557EB2]/20 transition-all"
              />

              {/* Popular skill suggestions */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="text-xs text-[#537FAF]">Popular:</span>
                {POPULAR_SKILLS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => addSkill(s)}
                    disabled={selectedSkills.includes(s)}
                    className="text-xs text-[#557EB2] hover:text-[#042558] underline disabled:opacity-30 disabled:no-underline transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* ── 5. Experience ─────────────────────────────────── */}
            <div className="animate-fade-up delay-6">
              <SectionTitle optional>Years of Experience</SectionTitle>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {EXPERIENCE_OPTIONS.map((exp) => {
                  const isSelected = selectedExp === exp;
                  return (
                    <button
                      key={exp}
                      type="button"
                      onClick={() =>
                        setValue("experienceYears", isSelected ? "" : exp)
                      }
                      className={[
                        "px-3 py-2.5 rounded-md border text-xs font-semibold text-center transition-all duration-150",
                        isSelected
                          ? "bg-[#000F22] border-[#000F22] text-white"
                          : "bg-white border-[#7A9BC4]/30 text-[#537FAF] hover:border-[#557EB2] hover:text-[#042558]",
                      ].join(" ")}
                    >
                      {exp}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── 6. Current / Past Role ────────────────────────── */}
            <div className="animate-fade-up delay-6">
              <SectionTitle optional>Current / Past Role</SectionTitle>
              <Input
                placeholder="e.g., Software Engineer Intern"
                {...register("currentRole")}
              />
            </div>

            {/* ── Actions ───────────────────────────────────────── */}
            <div className="flex gap-3 mt-2 animate-fade-up delay-6">
              <Button
                type="button"
                variant="ghost"
                size="md"
                leftIcon={<ArrowLeft size={14} />}
                onClick={() => router.push("/register")}
                className="flex-shrink-0"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1"
                size="lg"
                isLoading={mutation.isPending}
                rightIcon={<ArrowRight size={16} />}
              >
                Complete Profile
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}
