// app/settings/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Settings,
  Bell,
  Shield,
  Key,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { useChangePassword, useDeleteAccount } from "@/hooks/useUserSettings";

/* ─── Skeleton Loader ───────────────────────────────────────────── */
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-[#C2E8FF]/60 rounded-lg animate-pulse ${className}`} />
  );
}

/* ─── Change Password Section ───────────────────────────────────── */
function ChangePasswordSection() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    changePassword.mutate({
      currentPassword,
      newPassword,
    });
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
        <div className="w-12 h-12 rounded-full bg-[#16A34A]/20 flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 size={20} className="text-[#16A34A]" />
        </div>
        <p className="text-sm font-semibold text-[#000F22] mb-1">
          Password changed successfully!
        </p>
        <p className="text-xs text-[#537FAF] mb-4">
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
      <div className="relative">
        <Input
          label="Current Password"
          type={showCurrentPassword ? "text" : "password"}
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          rightIcon={
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="text-[#537FAF] hover:text-[#042558]"
            >
              {showCurrentPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          }
        />
      </div>

      <div className="relative">
        <Input
          label="New Password"
          type={showNewPassword ? "text" : "password"}
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          rightIcon={
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="text-[#537FAF] hover:text-[#042558]"
            >
              {showNewPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          }
        />
      </div>

      <div className="relative">
        <Input
          label="Confirm New Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          error={passwordError}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-[#537FAF] hover:text-[#042558]"
            >
              {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          }
        />
      </div>

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
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2">
          <AlertCircle size={14} className="text-red-500" />
          <p className="text-xs text-red-600">
            {(changePassword.error as any)?.response?.data?.message ||
              "Failed to change password"}
          </p>
        </div>
      )}
    </form>
  );
}

/* ─── Delete Account Section ────────────────────────────────────── */
function DeleteAccountSection() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        <p className="text-sm font-semibold text-[#000F22] mb-1">
          Account deleted
        </p>
        <p className="text-xs text-[#537FAF] mb-4">
          Your account has been permanently deleted.
        </p>
        <Button variant="primary" onClick={() => (window.location.href = "/")}>
          Go to Home
        </Button>
      </div>
    );
  }

  if (!showConfirmModal) {
    return (
      <div className="text-center py-4">
        <Button
          variant="danger"
          onClick={() => setShowConfirmModal(true)}
          leftIcon={<Trash2 size={14} />}
        >
          Delete My Account
        </Button>
        <p className="text-[10px] text-[#7A9BC4] mt-2">
          This action is permanent and cannot be undone
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertCircle
            size={14}
            className="text-red-500 flex-shrink-0 mt-0.5"
          />
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

      <div className="relative">
        <Input
          label="Confirm with your password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#537FAF] hover:text-[#042558]"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          }
        />
      </div>

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
            setShowConfirmModal(false);
            setPassword("");
          }}
        >
          Cancel
        </Button>
      </div>

      {deleteAccount.isError && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2">
          <AlertCircle size={14} className="text-red-500" />
          <p className="text-xs text-red-600">
            {(deleteAccount.error as any)?.response?.data?.message ||
              "Failed to delete account"}
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function SettingsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#C2E8FF] py-8 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#C2E8FF] py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-[#537FAF] hover:text-[#042558] transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <h1 className="font-display text-[#000F22] text-3xl">Settings</h1>
          <p className="text-sm text-[#537FAF] mt-0.5">
            Manage your account security and preferences
          </p>
        </div>

        {/* Change Password Card */}
        <Card variant="default" padding="lg" className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#C2E8FF] flex items-center justify-center">
              <Key size={16} className="text-[#557EB2]" />
            </div>
            <div>
              <h2 className="font-semibold text-[#000F22]">Change Password</h2>
              <p className="text-xs text-[#537FAF]">
                Update your password to keep your account secure
              </p>
            </div>
          </div>
          <ChangePasswordSection />
        </Card>

        {/* Danger Zone Card */}
        <Card variant="default" padding="lg" className="border-red-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
              <Trash2 size={16} className="text-red-500" />
            </div>
            <div>
              <h2 className="font-semibold text-red-600">Danger Zone</h2>
              <p className="text-xs text-[#537FAF]">
                Permanently delete your account and all data
              </p>
            </div>
          </div>
          <DeleteAccountSection />
        </Card>
      </div>
    </div>
  );
}
