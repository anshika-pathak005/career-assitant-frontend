// app/register/step2/page.tsx

"use client";

import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/register/SectionTitle";
import RoleSelector from "@/components/register/RoleSelector";
import IndustrySelector from "@/components/register/IndustrySelector";
import SkillsInput from "@/components/register/SkillsInput";
import ExperienceSelector from "@/components/register/ExperienceSelector";
import { useStep2Form } from "./useStep2Form";

export default function RegisterStep2Page() {
  const {
    form,
    onSubmit,
    router,
    isSubmitting,
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
  } = useStep2Form();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <main className="min-h-screen bg-brand-bg flex items-center justify-center px-4 py-12">
      {/* Background decorations */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-3xl relative">
        {/* Brand */}
        <div className="flex justify-center mb-8 animate-fade-up">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-brand-primary rounded-md flex items-center justify-center">
              <BriefcaseBusiness size={18} className="text-white" />
            </div>
            <span className="font-display text-brand-primary text-2xl">
              CareerPilot
            </span>
          </Link>
        </div>

        <Card className="animate-fade-up delay-1 shadow-lg">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
                Step 2 of 2
              </span>
              <span className="text-xs font-bold text-brand-accent">100%</span>
            </div>
            <div className="h-1.5 bg-brand-bg rounded-full overflow-hidden">
              <div className="h-full bg-brand-primary rounded-full w-full transition-all duration-500" />
            </div>
          </div>

          {/* Header */}
          <div className="mb-7">
            <h1 className="font-display text-brand-primary text-3xl mb-1">
              Complete your profile
            </h1>
            <p className="text-sm text-brand-muted">
              Help us personalize your AI career roadmap.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-8"
          >
            <RoleSelector
              value={selectedRole}
              onChange={selectRole}
              error={errors.userCategory?.message}
            />

            <div className="animate-fade-up delay-3">
              <SectionTitle>Dream Job</SectionTitle>
              <Input
                placeholder="e.g., Full Stack Developer"
                error={errors.dreamJob?.message}
                {...register("dreamJob")}
              />
            </div>

            <IndustrySelector
              selected={selectedIndustries}
              onToggle={toggleIndustry}
            />

            <SkillsInput
              selected={selectedSkills}
              suggestions={suggestedSkills}
              hasIndustries={selectedIndustries.length > 0}
              skillInput={skillInput}
              setSkillInput={setSkillInput}
              onAdd={addSkill}
              onRemove={removeSkill}
            />

            <ExperienceSelector
              value={selectedExp}
              onSelect={selectExperience}
            />

            <div className="animate-fade-up delay-6">
              <SectionTitle optional>Current / Past Role</SectionTitle>
              <Input
                placeholder="e.g., Software Engineer Intern"
                {...register("currentRole")}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-2 animate-fade-up delay-6">
              <Button
                type="button"
                variant="ghost"
                size="lg"
                onClick={() => router.push("/dashboard")}
                className="flex-1"
              >
                Skip for now
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="flex-1"
                isLoading={isSubmitting}
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
