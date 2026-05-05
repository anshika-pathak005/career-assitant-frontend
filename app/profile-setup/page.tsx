"use client";

import { useEffect, useState, KeyboardEvent, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { X, BriefcaseBusiness, ArrowRight } from "lucide-react";
import Link from "next/link";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

import { useUserProfile } from "@/hooks/useUserProfile";
import { useAnalyzeFromProfile } from "@/hooks/useResumeAnalysis";
import {
  step2Schema,
  step2DefaultValues,
  type Step2FormData,
} from "@/app/register/step2/step2.schema";
import {
  ROLES,
  GOAL_TYPES,
  INDUSTRIES,
  EXPERIENCE_OPTIONS,
  PROJECT_LEVELS,
  WORK_PREFERENCES,
  INDUSTRY_SKILLS_MAP,
  DEFAULT_SKILLS,
} from "@/app/register/step2/step2.constants";

/* ─── SectionTitle ───────────────────────────────────────────────── */
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
export default function ProfileSetupPage() {
  const router = useRouter();
  const [skillInput, setSkillInput] = useState("");

  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const analyzeMutation = useAnalyzeFromProfile();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: step2DefaultValues,
  });

  /* Pre-fill form with existing profile data once loaded */
  useEffect(() => {
    if (!profile) return;
    reset({
      role: profile.userCategory ?? "",
      dreamJob: profile.dreamJob ?? "",
      industries: profile.industries ?? [],
      skills: profile.skills ?? [],
      experienceYears:
        profile.experienceYears != null ? String(profile.experienceYears) : "",
      currentRole: profile.currentRole ?? "",
      goalType: profile.goalType ?? "",
      projectLevel: profile.projectLevel ?? "",
      workPreference: profile.workPreference ?? "",
    });
  }, [profile, reset]);

  const selectedRole = watch("role");
  const selectedIndustries = watch("industries") ?? [];
  const selectedSkills = watch("skills") ?? [];
  const selectedExp = watch("experienceYears");
  const selectedGoal = watch("goalType");
  const selectedProject = watch("projectLevel");
  const selectedWork = watch("workPreference");

  const suggestedSkills = useMemo(() => {
    if (selectedIndustries.length === 0) return DEFAULT_SKILLS;
    const combined = new Set<string>();
    selectedIndustries.forEach((ind) =>
      (INDUSTRY_SKILLS_MAP[ind] ?? []).forEach((s) => combined.add(s)),
    );
    return Array.from(combined).sort();
  }, [selectedIndustries]);

  const toggleIndustry = (ind: string) => {
    const next = selectedIndustries.includes(ind)
      ? selectedIndustries.filter((i) => i !== ind)
      : [...selectedIndustries, ind];
    setValue("industries", next);
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

  /* On submit — send only changed fields as overrides */
  const onSubmit = (data: Step2FormData) => {
    const overrides: Record<string, unknown> = {};

    if (data.role !== (profile?.userCategory ?? "")) overrides.role = data.role;
    if (data.dreamJob !== (profile?.dreamJob ?? ""))
      overrides.dreamJob = data.dreamJob;
    if (data.goalType !== (profile?.goalType ?? ""))
      overrides.goalType = data.goalType;
    if (data.projectLevel !== (profile?.projectLevel ?? ""))
      overrides.projectLevel = data.projectLevel;
    if (data.workPreference !== (profile?.workPreference ?? ""))
      overrides.workPreference = data.workPreference;
    if (data.currentRole !== (profile?.currentRole ?? ""))
      overrides.currentRole = data.currentRole;

    // Arrays — compare serialized
    if (
      JSON.stringify(data.industries) !==
      JSON.stringify(profile?.industries ?? [])
    ) {
      overrides.industries = data.industries;
    }
    if (JSON.stringify(data.skills) !== JSON.stringify(profile?.skills ?? [])) {
      overrides.skills = data.skills;
    }

    analyzeMutation.mutate(overrides);
  };

  const pillCls = (selected: boolean) =>
    [
      "px-3 py-2.5 rounded-md border text-xs font-semibold text-center transition-all duration-150 cursor-pointer",
      selected
        ? "bg-[#000F22] border-[#000F22] text-white"
        : "bg-white border-[#7A9BC4]/30 text-[#537FAF] hover:border-[#557EB2] hover:text-[#042558]",
    ].join(" ");

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-[#C2E8FF] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#557EB2] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#C2E8FF] flex items-center justify-center px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#557EB2]/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-3xl relative">
        {/* Brand + back */}
        <div className="flex items-center justify-between mb-8 animate-fade-up">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#000F22] rounded-md flex items-center justify-center">
              <BriefcaseBusiness size={18} className="text-white" />
            </div>
            <span className="font-display text-[#000F22] text-2xl">
              CareerPilot
            </span>
          </Link>
          <Link
            href="/dashboard"
            className="text-xs font-semibold text-[#537FAF] hover:text-[#000F22] transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <Card className="animate-fade-up delay-1 shadow-lg">
          {/* Header */}
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-wider text-[#557EB2] mb-1">
              Confirm your details
            </p>
            <h1 className="font-display text-[#000F22] text-3xl mb-1">
              Review & Generate Roadmap
            </h1>
            <p className="text-sm text-[#537FAF]">
              All fields are required for the best AI analysis. Your saved info
              is pre-filled — update anything before continuing.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-8"
          >
            {/* 1. Role */}
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
                          ? "bg-[#000F22] border-[#000F22]"
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

            {/* 2. Goal Type */}
            <div className="animate-fade-up delay-2">
              <SectionTitle>Primary Goal</SectionTitle>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {GOAL_TYPES.map((g) => {
                  const isSelected = selectedGoal === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setValue("goalType", g.id)}
                      className={[
                        "flex flex-col items-center gap-2.5 p-4 rounded-lg border transition-all duration-150",
                        isSelected
                          ? "bg-[#000F22] border-[#000F22]"
                          : "bg-white border-[#7A9BC4]/30 hover:border-[#557EB2] hover:bg-[#C2E8FF]/40",
                      ].join(" ")}
                    >
                      <div
                        className={`w-9 h-9 rounded-md flex items-center justify-center ${isSelected ? "bg-white/15" : "bg-[#C2E8FF]"}`}
                      >
                        <g.icon
                          size={18}
                          className={
                            isSelected ? "text-white" : "text-[#557EB2]"
                          }
                        />
                      </div>
                      <span
                        className={`text-xs font-bold ${isSelected ? "text-white" : "text-[#000F22]"}`}
                      >
                        {g.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.goalType && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.goalType.message}
                </p>
              )}
            </div>

            {/* 3. Dream Job */}
            <div className="animate-fade-up delay-3">
              <SectionTitle>Dream Job</SectionTitle>
              <Input
                placeholder="e.g., Full Stack Developer"
                error={errors.dreamJob?.message}
                {...register("dreamJob")}
              />
            </div>

            {/* 4. Industries */}
            <div className="animate-fade-up delay-4">
              <SectionTitle optional>Industries of Interest</SectionTitle>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
                        className="w-3.5 h-3.5 rounded-sm flex-shrink-0 border flex items-center justify-center"
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

            {/* 5. Skills */}
            <div className="animate-fade-up delay-5">
              <SectionTitle optional>Your Skills</SectionTitle>
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
                        className="opacity-60 hover:opacity-100 flex items-center"
                      >
                        <X size={10} strokeWidth={3} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder="Type a skill and press Enter"
                className="w-full h-11 rounded-md border border-[#7A9BC4]/60 bg-white px-3.5 text-sm text-[#000F22] placeholder:text-[#7A9BC4] focus:outline-none focus:border-[#557EB2] focus:ring-2 focus:ring-[#557EB2]/20 transition-all"
              />
              <div className="mt-2.5">
                <p className="text-xs text-[#537FAF] mb-1.5">
                  {selectedIndustries.length > 0
                    ? "Suggested for your industries:"
                    : "Popular skills:"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedSkills.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => addSkill(s)}
                      disabled={selectedSkills.includes(s)}
                      className="text-xs bg-[#C2E8FF] text-[#042558] font-medium px-2.5 py-1 rounded-full border border-[#7A9BC4]/30 hover:bg-[#557EB2] hover:text-white hover:border-[#557EB2] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 6. Experience */}
            <div className="animate-fade-up delay-6">
              <SectionTitle optional>Years of Experience</SectionTitle>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {EXPERIENCE_OPTIONS.map((exp) => (
                  <button
                    key={exp}
                    type="button"
                    onClick={() =>
                      setValue(
                        "experienceYears",
                        selectedExp === exp ? "" : exp,
                      )
                    }
                    className={pillCls(selectedExp === exp)}
                  >
                    {exp}
                  </button>
                ))}
              </div>
            </div>

            {/* 7. Project Level */}
            <div className="animate-fade-up delay-6">
              <SectionTitle>Project Experience Level</SectionTitle>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PROJECT_LEVELS.map((p) => {
                  const isSelected = selectedProject === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setValue("projectLevel", p.id)}
                      className={[
                        "flex flex-col gap-1 p-3.5 rounded-lg border text-left transition-all duration-150",
                        isSelected
                          ? "bg-[#000F22] border-[#000F22]"
                          : "bg-white border-[#7A9BC4]/30 hover:border-[#557EB2] hover:bg-[#C2E8FF]/40",
                      ].join(" ")}
                    >
                      <span
                        className={`text-sm font-bold ${isSelected ? "text-white" : "text-[#000F22]"}`}
                      >
                        {p.label}
                      </span>
                      <span
                        className={`text-[11px] leading-snug ${isSelected ? "text-white/65" : "text-[#537FAF]"}`}
                      >
                        {p.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.projectLevel && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.projectLevel.message}
                </p>
              )}
            </div>

            {/* 8. Current Role */}
            <div className="animate-fade-up delay-6">
              <SectionTitle optional>Current / Past Role</SectionTitle>
              <Input
                placeholder="e.g., Software Engineer Intern"
                {...register("currentRole")}
              />
            </div>

            {/* 9. Work Preference */}
            <div className="animate-fade-up delay-6">
              <SectionTitle optional>Work Preference</SectionTitle>
              <div className="grid grid-cols-3 gap-3">
                {WORK_PREFERENCES.map((w) => {
                  const isSelected = selectedWork === w.id;
                  return (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() =>
                        setValue("workPreference", isSelected ? "" : w.id)
                      }
                      className={[
                        "flex items-center justify-center gap-2 py-3 rounded-lg border text-sm font-semibold transition-all duration-150",
                        isSelected
                          ? "bg-[#000F22] border-[#000F22] text-white"
                          : "bg-white border-[#7A9BC4]/30 text-[#537FAF] hover:border-[#557EB2] hover:text-[#042558] hover:bg-[#C2E8FF]/40",
                      ].join(" ")}
                    >
                      <w.icon size={15} />
                      {w.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-2 animate-fade-up delay-6">
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={() => router.push("/dashboard")}
                className="flex-shrink-0"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                size="lg"
                isLoading={analyzeMutation.isPending}
                rightIcon={<ArrowRight size={16} />}
              >
                {analyzeMutation.isPending
                  ? "Generating your roadmap…"
                  : "Save & Generate Roadmap"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}
