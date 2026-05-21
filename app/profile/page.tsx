// app/profile/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  BriefcaseBusiness,
  GraduationCap,
  Target,
  MapPin,
  Wrench,
  Calendar,
  Save,
  Edit2,
  X,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile, useUpdateProfile } from "@/hooks/useUserProfile";
import {
  INDUSTRIES_LIST,
  ROADMAP_GOAL_TYPES,
  LEARNING_STYLES,
  PROJECT_LEVEL_OPTIONS,
  SKILL_LEVELS,
  WORK_PREFERENCE_OPTIONS,
  WEEKLY_HOURS_OPTIONS,
  EXPERIENCE_OPTIONS,
} from "@/constants/roadmap.constants";

/* ─── Skeleton Loader ───────────────────────────────────────────── */
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-[#C2E8FF]/60 rounded-lg animate-pulse ${className}`} />
  );
}

/* ─── Helper function to get label from value ───────────────────── */
const getGoalTypeLabel = (value: string): string => {
  return ROADMAP_GOAL_TYPES.find((g) => g.value === value)?.label ?? value;
};

const getLearningStyleLabel = (value: string): string => {
  return LEARNING_STYLES.find((l) => l.value === value)?.label ?? value;
};

const getProjectLevelLabel = (value: string): string => {
  return PROJECT_LEVEL_OPTIONS.find((p) => p.value === value)?.label ?? value;
};

const getWorkPreferenceLabel = (value: string): string => {
  return WORK_PREFERENCE_OPTIONS.find((w) => w.value === value)?.label ?? value;
};

const getExperienceLabel = (value: number): string => {
  if (value === 0) return "0 years (Fresher)";
  if (value === 1) return "1 year";
  if (value <= 2) return "1-2 years";
  if (value <= 4) return "2-4 years";
  if (value <= 7) return "4-7 years";
  return "7+ years";
};

/* ─── Editable Field Component ──────────────────────────────────── */
function EditableField({
  label,
  value,
  onSave,
  type = "text",
  multiline = false,
}: {
  label: string;
  value: string;
  onSave: (newValue: string) => void;
  type?: string;
  multiline?: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    if (editValue.trim() !== value) {
      onSave(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        {multiline ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full rounded-md border border-[#7A9BC4]/60 bg-white px-3.5 py-2 text-sm text-[#000F22] focus:outline-none focus:border-[#557EB2] focus:ring-2 focus:ring-[#557EB2]/20 transition-all resize-none"
            rows={3}
          />
        ) : (
          <input
            type={type}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full rounded-md border border-[#7A9BC4]/60 bg-white px-3.5 py-2 text-sm text-[#000F22] focus:outline-none focus:border-[#557EB2] focus:ring-2 focus:ring-[#557EB2]/20 transition-all"
          />
        )}
        <div className="flex gap-2">
          <Button size="sm" variant="primary" onClick={handleSave}>
            <CheckCircle2 size={12} className="mr-1" />
            Save
          </Button>
          <Button size="sm" variant="ghost" onClick={handleCancel}>
            <X size={12} className="mr-1" />
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-3 bg-[#C2E8FF]/20 rounded-lg group">
      <div>
        <p className="text-xs text-[#537FAF] mb-0.5">{label}</p>
        <p className="text-sm font-medium text-[#000F22]">{value || "Not specified"}</p>
      </div>
      <button
        onClick={() => setIsEditing(true)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-[#537FAF] hover:text-[#557EB2]"
      >
        <Edit2 size={14} />
      </button>
    </div>
  );
}

/* ─── Radio/Button Select Component ─────────────────────────────── */
function SelectField({
  label,
  value,
  options,
  onSave,
}: {
  label: string;
  value: string;
  options: readonly { value: string; label: string; desc?: string; icon?: any }[];
  onSave: (newValue: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const handleSave = () => {
    if (selectedValue !== value) {
      onSave(selectedValue);
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {options.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedValue === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelectedValue(option.value)}
                className={`
                  flex items-start gap-2 p-2.5 rounded-lg border text-left transition-all
                  ${isSelected ? "bg-[#000F22] border-[#000F22]" : "bg-white border-[#7A9BC4]/30 hover:border-[#557EB2]"}
                `}
              >
                {Icon && <Icon size={14} className={isSelected ? "text-white" : "text-[#557EB2]"} />}
                <div className="flex-1">
                  <p className={`text-xs font-semibold ${isSelected ? "text-white" : "text-[#000F22]"}`}>
                    {option.label}
                  </p>
                  {option.desc && (
                    <p className={`text-[10px] ${isSelected ? "text-white/70" : "text-[#537FAF]"}`}>
                      {option.desc}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  const displayLabel = options.find((o) => o.value === value)?.label || value || "Not specified";

  return (
    <div className="flex items-center justify-between p-3 bg-[#C2E8FF]/20 rounded-lg group">
      <div>
        <p className="text-xs text-[#537FAF] mb-0.5">{label}</p>
        <p className="text-sm font-medium text-[#000F22]">{displayLabel}</p>
      </div>
      <button
        onClick={() => setIsEditing(true)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-[#537FAF] hover:text-[#557EB2]"
      >
        <Edit2 size={14} />
      </button>
    </div>
  );
}

/* ─── Skills Section ────────────────────────────────────────────── */
function SkillsSection({
  skills,
  onUpdate,
}: {
  skills: string[];
  onUpdate: (skills: string[]) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [tempSkills, setTempSkills] = useState<string[]>(skills);

  const addSkill = () => {
    if (skillInput.trim() && !tempSkills.includes(skillInput.trim())) {
      setTempSkills([...tempSkills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setTempSkills(tempSkills.filter((s) => s !== skill));
  };

  const handleSave = () => {
    onUpdate(tempSkills);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2 mb-2">
          {tempSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 bg-[#000F22] text-white text-xs font-medium px-2.5 py-1 rounded-full"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="opacity-60 hover:opacity-100"
              >
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSkill()}
            placeholder="Type a skill and press Enter"
            className="flex-1 h-10 rounded-md border border-[#7A9BC4]/60 bg-white px-3 text-sm text-[#000F22] placeholder:text-[#7A9BC4] focus:outline-none focus:border-[#557EB2] focus:ring-2 focus:ring-[#557EB2]/20"
          />
          <Button size="sm" variant="secondary" onClick={addSkill}>
            Add
          </Button>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="primary" onClick={handleSave}>
            Save Skills
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-[#537FAF]">Skills</p>
        <button
          onClick={() => setIsEditing(true)}
          className="text-[#537FAF] hover:text-[#557EB2] transition-colors"
        >
          <Edit2 size={14} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <span
              key={skill}
              className="text-xs font-medium text-[#042558] bg-[#C2E8FF] px-2.5 py-1 rounded-full"
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-sm text-[#7A9BC4]">No skills added yet</p>
        )}
      </div>
    </div>
  );
}

/* ─── Industries Section ────────────────────────────────────────── */
function IndustriesSection({
  industries,
  onUpdate,
}: {
  industries: string[];
  onUpdate: (industries: string[]) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempIndustries, setTempIndustries] = useState<string[]>(industries);

  const toggleIndustry = (industry: string) => {
    setTempIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  const handleSave = () => {
    onUpdate(tempIndustries);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
          {INDUSTRIES_LIST.map((industry) => (
            <button
              key={industry}
              type="button"
              onClick={() => toggleIndustry(industry)}
              className={`
                px-2.5 py-1 rounded-full text-xs font-medium transition-all
                ${
                  tempIndustries.includes(industry)
                    ? "bg-[#000F22] text-white"
                    : "bg-[#C2E8FF] text-[#537FAF] hover:bg-[#557EB2] hover:text-white"
                }
              `}
            >
              {industry}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="primary" onClick={handleSave}>
            Save Industries
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-[#537FAF]">Industries</p>
        <button
          onClick={() => setIsEditing(true)}
          className="text-[#537FAF] hover:text-[#557EB2] transition-colors"
        >
          <Edit2 size={14} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {industries.length > 0 ? (
          industries.map((industry) => (
            <span
              key={industry}
              className="text-xs font-medium text-[#042558] bg-[#C2E8FF] px-2.5 py-1 rounded-full"
            >
              {industry}
            </span>
          ))
        ) : (
          <p className="text-sm text-[#7A9BC4]">No industries selected</p>
        )}
      </div>
    </div>
  );
}

/* ─── Experience Selector ───────────────────────────────────────── */
function ExperienceField({
  value,
  onSave,
}: {
  value: number | null;
  onSave: (value: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value?.toString() || "");

  const handleSave = () => {
    const numValue = parseInt(selectedValue);
    if (!isNaN(numValue) && numValue !== value) {
      onSave(numValue);
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {EXPERIENCE_OPTIONS.map((exp) => (
            <button
              key={exp.value}
              type="button"
              onClick={() => setSelectedValue(exp.value.toString())}
              className={`
                px-3 py-2 rounded-md text-xs font-medium transition-all
                ${selectedValue === exp.value.toString()
                  ? "bg-[#000F22] text-white"
                  : "bg-white border border-[#7A9BC4]/30 text-[#537FAF] hover:border-[#557EB2]"
                }
              `}
            >
              {exp.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-3 bg-[#C2E8FF]/20 rounded-lg group">
      <div>
        <p className="text-xs text-[#537FAF] mb-0.5">Experience Years</p>
        <p className="text-sm font-medium text-[#000F22]">
          {value !== null && value !== undefined ? getExperienceLabel(value) : "Not specified"}
        </p>
      </div>
      <button
        onClick={() => setIsEditing(true)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-[#537FAF] hover:text-[#557EB2]"
      >
        <Edit2 size={14} />
      </button>
    </div>
  );
}

/* ─── Weekly Hours Field ────────────────────────────────────────── */
function WeeklyHoursField({
  value,
  onSave,
}: {
  value: number | null;
  onSave: (value: number) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value?.toString() || "");

  const handleSave = () => {
    const numValue = parseInt(selectedValue);
    if (!isNaN(numValue) && numValue !== value) {
      onSave(numValue);
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {WEEKLY_HOURS_OPTIONS.map((hours) => (
            <button
              key={hours.value}
              type="button"
              onClick={() => setSelectedValue(hours.value.toString())}
              className={`
                py-2 rounded-md text-xs font-medium transition-all
                ${selectedValue === hours.value.toString()
                  ? "bg-[#000F22] text-white"
                  : "bg-white border border-[#7A9BC4]/30 text-[#537FAF] hover:border-[#557EB2]"
                }
              `}
            >
              {hours.value}h
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="primary" onClick={handleSave}>
            Save
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-3 bg-[#C2E8FF]/20 rounded-lg group">
      <div>
        <p className="text-xs text-[#537FAF] mb-0.5">Weekly Study Hours</p>
        <p className="text-sm font-medium text-[#000F22]">
          {value ? `${value} hours/week` : "Not specified"}
        </p>
      </div>
      <button
        onClick={() => setIsEditing(true)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-[#537FAF] hover:text-[#557EB2]"
      >
        <Edit2 size={14} />
      </button>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const updateProfile = useUpdateProfile();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-[#C2E8FF] py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-64" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !profile) return null;

  return (
    <div className="min-h-screen bg-[#C2E8FF] py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display text-[#000F22] text-3xl">Profile</h1>
          <p className="text-sm text-[#537FAF] mt-0.5">
            View and manage your personal information
          </p>
        </div>

        {/* Profile Card */}
        <Card variant="default" padding="lg" className="mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#000F22] flex items-center justify-center">
              <User size={28} className="text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-[#000F22] text-xl">{profile.name}</h2>
              <p className="text-sm text-[#537FAF]">{profile.email}</p>
            </div>
          </div>

          <div className="space-y-3">
            <EditableField
              label="Full Name"
              value={profile.name || ""}
              onSave={(val) => updateProfile.mutate({ name: val })}
            />
            <EditableField
              label="Current Role"
              value={profile.currentRole || ""}
              onSave={(val) => updateProfile.mutate({ currentRole: val })}
            />
            <EditableField
              label="Dream Job"
              value={profile.dreamJob || ""}
              onSave={(val) => updateProfile.mutate({ dreamJob: val })}
            />
            <EditableField
              label="User Category"
              value={profile.userCategory || ""}
              onSave={(val) => updateProfile.mutate({ userCategory: val })}
            />
          </div>
        </Card>

        {/* Skills & Industries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card variant="default" padding="lg">
            <h3 className="font-semibold text-[#000F22] text-md mb-3 flex items-center gap-2">
              <Wrench size={16} className="text-[#557EB2]" />
              Skills
            </h3>
            <SkillsSection skills={profile.skills || []} onUpdate={(skills) => updateProfile.mutate({ skills })} />
          </Card>

          <Card variant="default" padding="lg">
            <h3 className="font-semibold text-[#000F22] text-md mb-3 flex items-center gap-2">
              <MapPin size={16} className="text-[#557EB2]" />
              Industries
            </h3>
            <IndustriesSection
              industries={profile.industries || []}
              onUpdate={(industries) => updateProfile.mutate({ industries })}
            />
          </Card>
        </div>

        {/* Learning Preferences */}
        <Card variant="default" padding="lg" className="mb-6">
          <h3 className="font-semibold text-[#000F22] text-md mb-4 flex items-center gap-2">
            <Sparkles size={16} className="text-[#557EB2]" />
            Learning Preferences
          </h3>
          <div className="space-y-3">
            <ExperienceField
              value={profile.experienceYears}
              onSave={(val) => updateProfile.mutate({ experienceYears: val })}
            />
            <SelectField
              label="Career Goal"
              value={profile.goalType || ""}
              options={ROADMAP_GOAL_TYPES}
              onSave={(val) => updateProfile.mutate({ goalType: val })}
            />
            <SelectField
              label="Project Experience Level"
              value={profile.projectLevel || ""}
              options={PROJECT_LEVEL_OPTIONS}
              onSave={(val) => updateProfile.mutate({ projectLevel: val })}
            />
            <SelectField
              label="Learning Style"
              value={profile.learningStyle || ""}
              options={LEARNING_STYLES}
              onSave={(val) => updateProfile.mutate({ learningStyle: val })}
            />
            <SelectField
              label="Work Preference"
              value={profile.workPreference || ""}
              options={WORK_PREFERENCE_OPTIONS}
              onSave={(val) => updateProfile.mutate({ workPreference: val })}
            />
            <WeeklyHoursField
              value={profile.weeklyHours}
              onSave={(val) => updateProfile.mutate({ weeklyHours: val })}
            />
          </div>
        </Card>

        {/* Save Notification */}
        {updateProfile.isPending && (
          <div className="fixed bottom-4 right-4 bg-[#000F22] text-white text-xs px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50">
            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Saving changes...
          </div>
        )}
      </div>
    </div>
  );
}