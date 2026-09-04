// app/roadmap/generate/useRoadmapGenerateForm.ts

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useGenerateRoadmap } from "@/hooks/useRoadmap";
import { useSpecializations } from "@/hooks/useSpecializations";
import type { RoadmapGenerationRequest } from "@/types/roadmap.types";
import { generateSchema, type FormData, type SkillLevelItem } from "./generate.schema";

/**
 * useRoadmapGenerateForm
 *
 * Owns every piece of non-visual logic for the roadmap generation page:
 * form setup, profile pre-fill, the auth guard, error auto-focus, the
 * skill/industry handlers and submission.
 *
 * The page component below it is pure composition.
 */
export function useRoadmapGenerateForm() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const generateRoadmap = useGenerateRoadmap();

  const [skillLevels, setSkillLevels] = useState<SkillLevelItem[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(generateSchema),
    defaultValues: {
      industries: [],
      skills: [],
    },
  });

  const {
    setValue,
    formState: { errors },
  } = form;

  const dreamJob = profile?.dreamJob || "";
  const { data: specializations } = useSpecializations(dreamJob);

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
      if (profile.learningStyle)
        setValue("learningStyle", profile.learningStyle);

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

  /* ─── Scroll to and highlight the first field with an error ────── */
  useEffect(() => {
    const firstErrorField = Object.keys(errors)[0];
    if (!firstErrorField) return;

    const element = document.querySelector(
      `[name="${firstErrorField}"]`,
    ) as HTMLElement | null;
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "center" });
    element.focus();
    element.classList.add("ring-2", "ring-red-500", "ring-offset-2");

    const timeout = setTimeout(() => {
      element.classList.remove("ring-2", "ring-red-500", "ring-offset-2");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [errors]);

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
    // If there are validation errors, focus on the first field with error
    if (Object.keys(errors).length > 0) {
      const firstError = Object.keys(errors)[0];
      const errorElement = document.querySelector(
        `[name="${firstError}"]`,
      ) as HTMLElement | null;
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        errorElement.focus();
      }
      return;
    }

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

  return {
    // form
    form,
    onSubmit,
    isSubmitting: generateRoadmap.isPending,

    // remote data
    profile,
    specializations,

    // page-level status
    isLoading: authLoading || profileLoading,
    isAuthenticated,

    // industries
    selectedIndustries,
    toggleIndustry,

    // skills
    selectedSkills,
    skillLevels,
    newSkill,
    setNewSkill,
    addSkill,
    removeSkill,
    updateSkillLevel,
  };
}
