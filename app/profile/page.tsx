// app/profile/page.tsx

"use client";

import { Wrench, MapPin } from "lucide-react";
import Card from "@/components/ui/Card";
import Skeleton from "@/components/dashboard/Skeleton";
import ProfileIdentityCard from "@/components/profile/ProfileIdentityCard";
import LearningPreferencesCard from "@/components/profile/LearningPreferencesCard";
import SkillsSection from "@/components/profile/SkillsSection";
import IndustriesSection from "@/components/profile/IndustriesSection";
import { useUserProfile, useUpdateProfile } from "@/hooks/useUserProfile";

// Auth is handled by useRouteGuard in ClientLayoutWrapper - this page only
// renders once the guard has confirmed the user is logged in.
export default function ProfilePage() {
  const { data: profile, isLoading } = useUserProfile();
  const updateProfile = useUpdateProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-bg py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-64" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (!profile) return null;

  // Every field saves through the same partial-update mutation
  const handleUpdate = updateProfile.mutate;

  return (
    <div className="min-h-screen bg-brand-bg py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display text-brand-primary text-3xl">Profile</h1>
          <p className="text-sm text-brand-muted mt-0.5">
            View and manage your personal information
          </p>
        </div>

        <ProfileIdentityCard profile={profile} onUpdate={handleUpdate} />

        {/* Skills & Industries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card variant="default" padding="lg">
            <h3 className="font-semibold text-brand-primary text-md mb-3 flex items-center gap-2">
              <Wrench size={16} className="text-brand-accent" />
              Skills
            </h3>
            <SkillsSection
              skills={profile.skills || []}
              onUpdate={(skills) => handleUpdate({ skills })}
            />
          </Card>

          <Card variant="default" padding="lg">
            <h3 className="font-semibold text-brand-primary text-md mb-3 flex items-center gap-2">
              <MapPin size={16} className="text-brand-accent" />
              Industries
            </h3>
            <IndustriesSection
              industries={profile.industries || []}
              onUpdate={(industries) => handleUpdate({ industries })}
            />
          </Card>
        </div>

        <LearningPreferencesCard profile={profile} onUpdate={handleUpdate} />

        {/* Save Notification */}
        {updateProfile.isPending && (
          <div className="fixed bottom-4 right-4 bg-brand-primary text-white text-xs px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50">
            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Saving changes...
          </div>
        )}
      </div>
    </div>
  );
}
