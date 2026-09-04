// components/settings/DeleteAccountSection.tsx

"use client";

import { useState } from "react";
import { AlertCircle, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import PasswordInput from "@/components/ui/PasswordInput";
import ApiErrorAlert from "@/components/ui/ApiErrorAlert";
import { useDeleteAccount } from "@/hooks/useUserSettings";

export default function DeleteAccountSection() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");

  const deleteAccount = useDeleteAccount();

  const handleDelete = () => {
    if (password.trim()) {
      deleteAccount.mutate(password);
    }
  };

  if (deleteAccount.isSuccess) {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
          <AlertCircle size={20} className="text-red-500" />
        </div>
        <p className="text-sm font-semibold text-brand-primary mb-1">
          Account deleted
        </p>
        <p className="text-xs text-brand-muted mb-4">
          Your account has been permanently deleted.
        </p>
        <Button variant="primary" onClick={() => (window.location.href = "/")}>
          Go to Home
        </Button>
      </div>
    );
  }

  // Step 1 - just the button. The password field only appears after the
  // user has explicitly asked to delete.
  if (!showConfirm) {
    return (
      <div className="text-center py-4">
        <Button
          variant="danger"
          onClick={() => setShowConfirm(true)}
          leftIcon={<Trash2 size={14} />}
        >
          Delete My Account
        </Button>
        <p className="text-[10px] text-brand-accent-lt mt-2">
          This action is permanent and cannot be undone
        </p>
      </div>
    );
  }

  // Step 2 - warning + password confirmation
  return (
    <div className="space-y-4">
      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertCircle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-red-700">
              Warning: This action is permanent
            </p>
            <p className="text-xs text-red-600 mt-0.5">
              All your data including roadmaps, resume analyses, and profile
              information will be permanently deleted.
            </p>
          </div>
        </div>
      </div>

      <PasswordInput
        label="Confirm with your password"
        placeholder="Enter your password"
        value={password}
        onChange={setPassword}
        required
      />

      <div className="flex gap-3">
        <Button
          variant="danger"
          onClick={handleDelete}
          isLoading={deleteAccount.isPending}
          disabled={!password.trim()}
        >
          Permanently Delete Account
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setShowConfirm(false);
            setPassword("");
          }}
        >
          Cancel
        </Button>
      </div>

      {deleteAccount.isError && (
        <ApiErrorAlert
          error={deleteAccount.error}
          fallback="Failed to delete account"
        />
      )}
    </div>
  );
}
