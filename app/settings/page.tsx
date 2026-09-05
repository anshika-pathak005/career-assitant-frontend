// app/settings/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { Key, Trash2, ArrowLeft } from "lucide-react";
import SettingCard from "@/components/settings/SettingCard";
import ChangePasswordSection from "@/components/settings/ChangePasswordSection";
import DeleteAccountSection from "@/components/settings/DeleteAccountSection";

// Auth is handled by useRouteGuard in ClientLayoutWrapper - this page only
// renders once the guard has confirmed the user is logged in.
export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="page-shell">
      <div className="page-container-narrow">
        {/* Header */}
        <div className="page-header">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-brand-muted hover:text-brand-secondary transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">
            Manage your account security and preferences
          </p>
        </div>

        <SettingCard
          icon={Key}
          title="Change Password"
          description="Update your password to keep your account secure"
        >
          <ChangePasswordSection />
        </SettingCard>

        <SettingCard
          icon={Trash2}
          title="Danger Zone"
          description="Permanently delete your account and all data"
          danger
        >
          <DeleteAccountSection />
        </SettingCard>
      </div>
    </div>
  );
}
