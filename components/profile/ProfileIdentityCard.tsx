// components/profile/ProfileIdentityCard.tsx

import { User } from "lucide-react";
import Card from "@/components/ui/Card";
import EditableField from "./EditableField";
import type { UserProfile, ProfileUpdateRequest } from "@/types/profile.types";

interface Props {
  profile: UserProfile;
  onUpdate: (patch: ProfileUpdateRequest) => void;
}

/** Avatar, name/email header and the four free-text identity fields. */
export default function ProfileIdentityCard({ profile, onUpdate }: Props) {
  const fields = [
    { label: "Full Name", key: "name" as const, value: profile.name },
    {
      label: "Current Role",
      key: "currentRole" as const,
      value: profile.currentRole,
    },
    { label: "Dream Job", key: "dreamJob" as const, value: profile.dreamJob },
    {
      label: "User Category",
      key: "userCategory" as const,
      value: profile.userCategory,
    },
  ];

  return (
    <Card variant="default" padding="lg" className="mb-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center">
          <User size={28} className="text-white" />
        </div>
        <div>
          <h2 className="subsection-title">
            {profile.name}
          </h2>
          <p className="text-sm text-brand-muted">{profile.email}</p>
        </div>
      </div>

      <div className="space-y-3">
        {fields.map((field) => (
          <EditableField
            key={field.key}
            label={field.label}
            value={field.value || ""}
            onSave={(val) => onUpdate({ [field.key]: val })}
          />
        ))}
      </div>
    </Card>
  );
}
