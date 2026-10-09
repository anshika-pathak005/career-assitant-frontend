// app/roadmap/generate/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { ArrowLeft, BriefcaseBusiness, Info, CheckCircle2 } from "lucide-react";
import Card from "@/components/ui/Card";
import FullPageSpinner from "@/components/ui/FullPageSpinner";
import LimitReachedScreen from "@/components/roadmap/LimitReachedScreen";
import ProfileIncompleteScreen from "@/components/roadmap/ProfileIncompleteScreen";
import UsageBanner from "@/components/roadmap/generate/UsageBanner";
import ProfileInfoSection from "@/components/roadmap/generate/ProfileInfoSection";
import PreferencesSection from "@/components/roadmap/generate/PreferencesSection";
import SkillLevelsSection from "@/components/roadmap/generate/SkillLevelsSection";
import SpecializationSection from "@/components/roadmap/generate/SpecializationSection";
import FormActions from "@/components/roadmap/generate/FormActions";
import { useRoadmapGenerateForm } from "./useRoadmapGenerateForm";

export default function RoadmapGeneratePage() {
  const router = useRouter();
  const {
    form,
    onSubmit,
    isSubmitting,
    profile,
    specializations,
    isLoading,
    isAuthenticated,
    selectedIndustries,
    toggleIndustry,
    selectedSkills,
    skillLevels,
    newSkill,
    setNewSkill,
    addSkill,
    removeSkill,
    updateSkillLevel,
  } = useRoadmapGenerateForm();

  /* ─── Gate states ──────────────────────────────────────────────── */
  if (isLoading) return <FullPageSpinner />;
  if (!isAuthenticated) return null;

  if (profile?.generationLimit?.limitReached) {
    return <LimitReachedScreen limit={profile.generationLimit} />;
  }

  if (profile && (!profile.isProfileComplete || !profile.dreamJob?.trim())) {
    return (
      <ProfileIncompleteScreen
        title="Complete Your Profile First"
        description="To generate a personalized career roadmap, we need some basic information about your background and career goals (including your target dream job)."
        backHref="/dashboard"
        backLabel="Back to Dashboard"
      />
    );
  }

  /* ─── Form ─────────────────────────────────────────────────────── */
  return (
    <div className="page-shell">
      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-brand-muted hover:text-brand-secondary transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="text-center mb-6">
            <h1 className="page-title mb-2">
              Configure Your Roadmap
            </h1>
            <p className="text-sm text-brand-muted max-w-md mx-auto">
              Provide your preferences to generate a personalized career
              roadmap.
            </p>
          </div>
        </div>

        {profile?.generationLimit && (
          <UsageBanner limit={profile.generationLimit} />
        )}

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Target role (read-only, comes from onboarding) */}
            <Card variant="default" padding="lg">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-bg flex items-center justify-center flex-shrink-0">
                  <BriefcaseBusiness size={18} className="text-brand-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-brand-muted mb-1">Target Role</p>
                  <p className="font-display text-brand-primary text-xl">
                    {profile?.dreamJob || "Not specified"}
                  </p>
                  <p className="text-xs text-brand-muted mt-1">
                    Category: {profile?.userCategory || "Not specified"}
                  </p>
                </div>
              </div>
            </Card>

            {/* Pre-filled information notice */}
            <div className="bg-gradient-to-r from-brand-bg to-white border-l-4 border-brand-accent rounded-lg p-4 flex items-start gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center flex-shrink-0">
                <Info size={14} className="text-brand-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-brand-secondary mb-0.5">
                  Profile information pre-loaded
                </p>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Your current role, industries, skills, and work preference
                  have been loaded from your profile. You can review and update
                  them below.
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-brand-success/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={14} className="text-brand-success" />
              </div>
            </div>

            <ProfileInfoSection
              profile={profile}
              selectedIndustries={selectedIndustries}
              toggleIndustry={toggleIndustry}
              selectedSkills={selectedSkills}
              newSkill={newSkill}
              setNewSkill={setNewSkill}
              addSkill={addSkill}
              removeSkill={removeSkill}
            />

            <PreferencesSection />

            <SkillLevelsSection
              skillLevels={skillLevels}
              updateSkillLevel={updateSkillLevel}
            />

            <SpecializationSection specializations={specializations} />

            <FormActions isSubmitting={isSubmitting} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
