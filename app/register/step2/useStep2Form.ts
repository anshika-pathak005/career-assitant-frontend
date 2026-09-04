// app/register/step2/useStep2Form.ts

"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { registerStep2 } from "@/services/authService";
import { getApiErrorMessage } from "@/utils/apiError";
import {
  step2Schema,
  step2DefaultValues,
  type Step2FormData,
} from "./step2.schema";
import { INDUSTRY_SKILLS_MAP, DEFAULT_SKILLS } from "./step2.constants";

/** All state, derived values, handlers and the submit mutation for step 2. */
export function useStep2Form() {
  const router = useRouter();
  const [skillInput, setSkillInput] = useState("");

  const form = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: step2DefaultValues,
  });

  const { watch, setValue } = form;

  const selectedRole = watch("userCategory");
  const selectedIndustries = watch("industries") ?? [];
  const selectedSkills = watch("skills") ?? [];
  const selectedExp = watch("experienceYears");

  /* Derive suggested skills from selected industries — deduped & sorted */
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

  const selectRole = (id: string) => setValue("userCategory", id);

  // Clicking the already-selected value clears it, since this field is optional
  const selectExperience = (exp: string) =>
    setValue("experienceYears", selectedExp === exp ? "" : exp);

  const mutation = useMutation({
    mutationFn: registerStep2,
    onSuccess: () => {
      toast.success("Profile complete! Welcome to CareerPilot");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, "Something went wrong. Please try again."),
      );
    },
  });

  const onSubmit = (data: Step2FormData) => mutation.mutate(data);

  return {
    form,
    onSubmit,
    router,
    isSubmitting: mutation.isPending,
    selectedRole,
    selectRole,
    selectedIndustries,
    toggleIndustry,
    selectedSkills,
    addSkill,
    removeSkill,
    skillInput,
    setSkillInput,
    suggestedSkills,
    selectedExp,
    selectExperience,
  };
}
