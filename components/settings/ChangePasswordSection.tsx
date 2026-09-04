// components/settings/ChangePasswordSection.tsx

"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import PasswordInput from "@/components/ui/PasswordInput";
import ApiErrorAlert from "@/components/ui/ApiErrorAlert";
import { useChangePassword } from "@/hooks/useUserSettings";

export default function ChangePasswordSection() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const changePassword = useChangePassword();

  const validatePasswords = () => {
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePasswords()) return;

    changePassword.mutate({ currentPassword, newPassword, confirmPassword });
  };

  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  if (changePassword.isSuccess) {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 rounded-full bg-brand-success/20 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 size={20} className="text-brand-success" />
        </div>
        <p className="text-sm font-semibold text-brand-primary mb-1">
          Password changed successfully!
        </p>
        <p className="text-xs text-brand-muted mb-4">
          Your password has been updated. Please login again.
        </p>
        <Button
          variant="primary"
          onClick={() => (window.location.href = "/login")}
        >
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PasswordInput
        label="Current Password"
        placeholder="Enter current password"
        value={currentPassword}
        onChange={setCurrentPassword}
        required
      />

      <PasswordInput
        label="New Password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={setNewPassword}
        required
      />

      <PasswordInput
        label="Confirm New Password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        error={passwordError}
        required
      />

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          variant="primary"
          isLoading={changePassword.isPending}
          disabled={changePassword.isPending}
        >
          Update Password
        </Button>
        <Button type="button" variant="ghost" onClick={resetForm}>
          Cancel
        </Button>
      </div>

      {changePassword.isError && (
        <ApiErrorAlert
          error={changePassword.error}
          fallback="Failed to change password"
        />
      )}
    </form>
  );
}
