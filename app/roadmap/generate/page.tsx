// app/roadmap/generate/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Clock,
  Target,
  BookOpen,
  Wrench,
  Globe,
  Building2,
  Home,
  Plus,
  X,
  Sparkles,
  Info,
  CheckCircle2,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useGenerateRoadmap } from "@/hooks/useRoadmap";
import { useSpecializations } from "@/hooks/useSpecializations";
import {
  ROADMAP_GOAL_TYPES,
  LEARNING_STYLES,
  PROJECT_LEVEL_OPTIONS,
  SKILL_LEVELS,
  WORK_PREFERENCE_OPTIONS,
  WEEKLY_HOURS_OPTIONS,
  INDUSTRIES_LIST,
  EXPERIENCE_OPTIONS,
} from "@/constants/roadmap.constants";
import type { RoadmapGenerationRequest } from "@/types/roadmap.types";

/* ─── Form Schema ────────────────────────────────────────────────── */
const generateSchema = z.object({
  // Editable profile fields
  currentRole: z.string().optional(),
  industries: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  workPreference: z.string().optional(),

  // Required fields
  experienceYears: z.number(),
  goalType: z.string().min(1, "Please select your goal"),
  projectLevel: z.string().min(1, "Please select your project level"),
  learningStyle: z.string().min(1, "Please select your learning style"),
  weeklyHours: z.number(),
  specialization: z.string().optional(),
});

type FormData = z.infer<typeof generateSchema>;

/* ─── Skill Level Item ───────────────────────────────────────────── */
interface SkillLevelItem {
  name: string;
  level: string;
}

/* ─── Page Component ─────────────────────────────────────────────── */
export default function RoadmapGeneratePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const generateRoadmap = useGenerateRoadmap();

  const [skillLevels, setSkillLevels] = useState<SkillLevelItem[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(generateSchema),
    defaultValues: {
      industries: [],
      skills: [],
    },
  });

  const watchDreamJob = profile?.dreamJob || "";
  const watchGoalType = watch("goalType");
  const watchWorkPreference = watch("workPreference");
  const watchWeeklyHours = watch("weeklyHours");

  const { data: specializations, isLoading: specializationsLoading } =
    useSpecializations(watchDreamJob);

  /* ─── Initialize form with profile data ───────────────────────── */
  useEffect(() => {
    if (profile) {
      if (profile.currentRole) setValue("currentRole", profile.currentRole);
      if (profile.industries) setSelectedIndustries(profile.industries);
      if (profile.skills) setSelectedSkills(profile.skills);
      if (profile.workPreference)
        setValue("workPreference", profile.workPreference);
      if (profile.experienceYears)
        setValue("experienceYears", profile.experienceYears);
      if (profile.goalType) setValue("goalType", profile.goalType);
      if (profile.projectLevel) setValue("projectLevel", profile.projectLevel);
      if (profile.weeklyHours) setValue("weeklyHours", profile.weeklyHours);

      // Initialize skill levels
      if (profile.skills && profile.skills.length > 0) {
        const initialSkillLevels = profile.skills.map((skill) => ({
          name: skill,
          level: profile.skillLevels?.[skill] || "INTERMEDIATE",
        }));
        setSkillLevels(initialSkillLevels);
      }
    }
  }, [profile, setValue]);

  /* ─── Auth guard ───────────────────────────────────────────────── */
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-[#C2E8FF] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#557EB2] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  /* ─── Profile completion check ─────────────────────────────────── */
  if (profile && !profile.isProfileComplete) {
    return (
      <div className="min-h-screen bg-[#C2E8FF] flex items-center justify-center px-4">
        <Card variant="default" padding="lg" className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-[#C2E8FF] flex items-center justify-center mx-auto mb-4">
            <BriefcaseBusiness size={28} className="text-[#557EB2]" />
          </div>
          <h2 className="font-display text-[#000F22] text-2xl mb-2">
            Complete Your Profile First
          </h2>
          <p className="text-sm text-[#537FAF] mb-6 leading-relaxed">
            To generate a personalized career roadmap, we need some basic
            information about your background and career goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register/step2">
              <Button variant="primary" size="md">
                Complete Profile
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" size="md">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  /* ─── Handlers ─────────────────────────────────────────────────── */
  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry],
    );
  };

  const addSkill = () => {
    if (newSkill.trim() && !selectedSkills.includes(newSkill.trim())) {
      setSelectedSkills((prev) => [...prev, newSkill.trim()]);
      setSkillLevels((prev) => [
        ...prev,
        { name: newSkill.trim(), level: "INTERMEDIATE" },
      ]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill));
    setSkillLevels((prev) => prev.filter((s) => s.name !== skill));
  };

  const updateSkillLevel = (skillName: string, level: string) => {
    setSkillLevels((prev) =>
      prev.map((s) => (s.name === skillName ? { ...s, level } : s)),
    );
  };

  const onSubmit = (data: FormData) => {
    const request: RoadmapGenerationRequest = {
      currentRole: data.currentRole,
      industries: selectedIndustries,
      skills: selectedSkills,
      workPreference: data.workPreference,
      experienceYears: data.experienceYears,
      goalType: data.goalType,
      projectLevel: data.projectLevel,
      learningStyle: data.learningStyle,
      weeklyHours: data.weeklyHours,
      skillLevels: skillLevels.reduce(
        (acc, skill) => {
          acc[skill.name] = skill.level;
          return acc;
        },
        {} as Record<string, string>,
      ),
      specialization: data.specialization,
    };

    generateRoadmap.mutate(request);
  };

  return (
    <div className="min-h-screen bg-[#C2E8FF] py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-[#537FAF] hover:text-[#042558] transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="text-center mb-6">
            <h1 className="font-display text-[#000F22] text-3xl sm:text-4xl mb-2">
              Configure Your Roadmap
            </h1>
            <p className="text-sm text-[#537FAF] max-w-md mx-auto">
              Provide your preferences to generate a personalized career
              roadmap.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Fixed Information Card */}
          <Card variant="default" padding="lg">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#C2E8FF] flex items-center justify-center flex-shrink-0">
                <BriefcaseBusiness size={18} className="text-[#557EB2]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#537FAF] mb-1">Target Role</p>
                <p className="font-display text-[#000F22] text-xl">
                  {profile?.dreamJob || "Not specified"}
                </p>
                <p className="text-xs text-[#537FAF] mt-1">
                  Category: {profile?.userCategory || "Not specified"}
                </p>
              </div>
            </div>
          </Card>

          {/* Pre-filled Information Notice - HIGHLIGHTED */}
          <div className="bg-gradient-to-r from-[#C2E8FF] to-white border-l-4 border-[#557EB2] rounded-lg p-4 flex items-start gap-3 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-[#557EB2]/20 flex items-center justify-center flex-shrink-0">
              <Info size={14} className="text-[#557EB2]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#042558] mb-0.5">
                Profile information pre-loaded
              </p>
              <p className="text-xs text-[#537FAF] leading-relaxed">
                Your current role, industries, skills, and work preference have
                been loaded from your profile. You can review and update them
                below.
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#16A34A]/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={14} className="text-[#16A34A]" />
            </div>
          </div>

          {/* Section 1: Profile Information */}
          <Card variant="default" padding="lg">
            <h2 className="font-semibold text-[#000F22] text-lg mb-4">
              Professional Background
            </h2>

            <div className="space-y-4">
              <Input
                label={
                  profile?.currentRole
                    ? "Current Role (from profile ✓)"
                    : "Current Role"
                }
                placeholder="e.g., Software Engineer Intern"
                {...register("currentRole")}
              />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-[#042558]">
                    Industries of Interest
                  </label>
                  {profile?.industries && profile.industries.length > 0 && (
                    <span className="text-[10px] text-[#16A34A] bg-[#C2E8FF] px-2 py-0.5 rounded-full">
                      {profile.industries.length} industries from profile
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {INDUSTRIES_LIST.map((industry) => (
                    <button
                      key={industry}
                      type="button"
                      onClick={() => toggleIndustry(industry)}
                      className={`
                        px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150
                        ${
                          selectedIndustries.includes(industry)
                            ? "bg-[#000F22] text-white"
                            : "bg-white border border-[#7A9BC4]/30 text-[#537FAF] hover:border-[#557EB2]"
                        }
                      `}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-[#042558]">
                    Skills
                  </label>
                  {profile?.skills && profile.skills.length > 0 && (
                    <span className="text-[10px] text-[#16A34A] bg-[#C2E8FF] px-2 py-0.5 rounded-full">
                      {profile.skills.length} skills loaded from profile
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 bg-[#000F22] text-white text-xs font-medium px-2.5 py-1 rounded-full"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="opacity-60 hover:opacity-100 transition-opacity"
                      >
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                    placeholder="Type a skill and press Enter"
                    className="flex-1 h-11 rounded-md border border-[#7A9BC4]/60 bg-white px-3.5 text-sm text-[#000F22] placeholder:text-[#7A9BC4] focus:outline-none focus:border-[#557EB2] focus:ring-2 focus:ring-[#557EB2]/20 transition-all"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={addSkill}
                  >
                    <Plus size={14} />
                  </Button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-[#042558]">
                    Work Preference
                  </label>
                  {profile?.workPreference && (
                    <span className="text-[10px] text-[#16A34A] bg-[#C2E8FF] px-2 py-0.5 rounded-full">
                      Saved preference
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  {WORK_PREFERENCE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setValue("workPreference", option.value)}
                      className={`
                        flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-all duration-150
                        ${
                          watchWorkPreference === option.value
                            ? "bg-[#000F22] border-[#000F22] text-white"
                            : "bg-white border-[#7A9BC4]/30 text-[#537FAF] hover:border-[#557EB2]"
                        }
                      `}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Section 2: Roadmap Preferences */}
          <Card variant="default" padding="lg">
            <h2 className="font-semibold text-[#000F22] text-lg mb-4">
              Learning Preferences
            </h2>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-[#042558] block mb-2">
                  Experience Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {EXPERIENCE_OPTIONS.map((exp) => (
                    <button
                      key={exp.value}
                      type="button"
                      onClick={() => setValue("experienceYears", exp.value)}
                      className={`
                        px-3 py-2 rounded-md text-xs font-medium transition-all duration-150
                        ${
                          watch("experienceYears") === exp.value
                            ? "bg-[#000F22] text-white"
                            : "bg-white border border-[#7A9BC4]/30 text-[#537FAF] hover:border-[#557EB2]"
                        }
                      `}
                    >
                      {exp.label}
                    </button>
                  ))}
                </div>
                {errors.experienceYears && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.experienceYears.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-[#042558] block mb-2">
                  Career Goal
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ROADMAP_GOAL_TYPES.map((goal) => (
                    <button
                      key={goal.value}
                      type="button"
                      onClick={() => setValue("goalType", goal.value)}
                      className={`
                        flex items-start gap-3 p-3 rounded-lg border text-left transition-all duration-150
                        ${
                          watchGoalType === goal.value
                            ? "bg-[#000F22] border-[#000F22]"
                            : "bg-white border-[#7A9BC4]/30 hover:border-[#557EB2]"
                        }
                      `}
                    >
                      <goal.icon
                        size={18}
                        className={
                          watchGoalType === goal.value
                            ? "text-white"
                            : "text-[#557EB2]"
                        }
                      />
                      <div>
                        <p
                          className={`text-sm font-semibold ${watchGoalType === goal.value ? "text-white" : "text-[#000F22]"}`}
                        >
                          {goal.label}
                        </p>
                        <p
                          className={`text-xs ${watchGoalType === goal.value ? "text-white/70" : "text-[#537FAF]"}`}
                        >
                          {goal.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
                {errors.goalType && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.goalType.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-[#042558] block mb-2">
                  Project Experience Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PROJECT_LEVEL_OPTIONS.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setValue("projectLevel", level.value)}
                      className={`
                        p-3 rounded-lg border text-center transition-all duration-150
                        ${
                          watch("projectLevel") === level.value
                            ? "bg-[#000F22] border-[#000F22]"
                            : "bg-white border-[#7A9BC4]/30 hover:border-[#557EB2]"
                        }
                      `}
                    >
                      <p
                        className={`text-sm font-semibold ${watch("projectLevel") === level.value ? "text-white" : "text-[#000F22]"}`}
                      >
                        {level.label}
                      </p>
                      <p
                        className={`text-xs ${watch("projectLevel") === level.value ? "text-white/70" : "text-[#537FAF]"}`}
                      >
                        {level.sub}
                      </p>
                    </button>
                  ))}
                </div>
                {errors.projectLevel && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.projectLevel.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-[#042558] block mb-2">
                  Learning Style
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {LEARNING_STYLES.map((style) => (
                    <button
                      key={style.value}
                      type="button"
                      onClick={() => setValue("learningStyle", style.value)}
                      className={`
                        flex items-start gap-3 p-3 rounded-lg border text-left transition-all duration-150
                        ${
                          watch("learningStyle") === style.value
                            ? "bg-[#000F22] border-[#000F22]"
                            : "bg-white border-[#7A9BC4]/30 hover:border-[#557EB2]"
                        }
                      `}
                    >
                      <style.icon
                        size={18}
                        className={
                          watch("learningStyle") === style.value
                            ? "text-white"
                            : "text-[#557EB2]"
                        }
                      />
                      <div>
                        <p
                          className={`text-sm font-semibold ${watch("learningStyle") === style.value ? "text-white" : "text-[#000F22]"}`}
                        >
                          {style.label}
                        </p>
                        <p
                          className={`text-xs ${watch("learningStyle") === style.value ? "text-white/70" : "text-[#537FAF]"}`}
                        >
                          {style.sub}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-[#042558] block mb-2">
                  Weekly Study Hours
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {WEEKLY_HOURS_OPTIONS.map((hours) => (
                    <button
                      key={hours.value}
                      type="button"
                      onClick={() => setValue("weeklyHours", hours.value)}
                      className={`
                        py-2 rounded-md text-sm font-medium transition-all duration-150
                        ${
                          watchWeeklyHours === hours.value
                            ? "bg-[#000F22] text-white"
                            : "bg-white border border-[#7A9BC4]/30 text-[#537FAF] hover:border-[#557EB2]"
                        }
                      `}
                    >
                      {hours.value}h
                    </button>
                  ))}
                </div>
                {errors.weeklyHours && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.weeklyHours.message}
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Section 3: Skill Levels */}
          {skillLevels.length > 0 && (
            <Card variant="default" padding="lg">
              <h2 className="font-semibold text-[#000F22] text-lg mb-4">
                Rate Your Skills
              </h2>
              <p className="text-xs text-[#537FAF] mb-4">
                Select your proficiency level for each skill
              </p>

              <div className="space-y-3">
                {skillLevels.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg bg-[#C2E8FF]/20"
                  >
                    <span className="text-sm font-medium text-[#000F22] w-32">
                      {skill.name}
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {SKILL_LEVELS.map((level) => (
                        <button
                          key={level.value}
                          type="button"
                          onClick={() =>
                            updateSkillLevel(skill.name, level.value)
                          }
                          className={`
                            px-3 py-1 rounded-full text-xs font-medium transition-all duration-150
                            ${
                              skill.level === level.value
                                ? "bg-[#000F22] text-white"
                                : "bg-white border border-[#7A9BC4]/30 text-[#537FAF] hover:border-[#557EB2]"
                            }
                          `}
                        >
                          {level.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Section 4: Specialization */}
          {specializations && specializations.length > 0 && (
            <Card variant="default" padding="lg">
              <h2 className="font-semibold text-[#000F22] text-lg mb-4">
                Choose Specialization
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {specializations.map((spec) => (
                  <button
                    key={spec.title}
                    type="button"
                    onClick={() => setValue("specialization", spec.title)}
                    className={`
                      p-4 rounded-lg border text-left transition-all duration-150
                      ${
                        watch("specialization") === spec.title
                          ? "bg-[#000F22] border-[#000F22]"
                          : "bg-white border-[#7A9BC4]/30 hover:border-[#557EB2]"
                      }
                    `}
                  >
                    <p
                      className={`font-semibold ${watch("specialization") === spec.title ? "text-white" : "text-[#000F22]"}`}
                    >
                      {spec.title}
                    </p>
                    <p
                      className={`text-xs mt-1 ${watch("specialization") === spec.title ? "text-white/70" : "text-[#537FAF]"}`}
                    >
                      {spec.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {spec.coreTech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className={`text-[10px] px-2 py-0.5 rounded-full ${
                            watch("specialization") === spec.title
                              ? "bg-white/20 text-white/80"
                              : "bg-[#C2E8FF] text-[#537FAF]"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              size="lg"
              leftIcon={<ArrowLeft size={14} />}
              onClick={() => router.back()}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="flex-1"
              isLoading={generateRoadmap.isPending}
              rightIcon={<Sparkles size={16} />}
            >
              {generateRoadmap.isPending ? "Generating..." : "Generate Roadmap"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
