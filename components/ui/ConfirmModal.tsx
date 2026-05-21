// components/ui/ConfirmModal.tsx

"use client";

import { AlertCircle, X } from "lucide-react";
import Button from "./Button";
import Card from "./Card";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  icon?: React.ReactNode;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Yes, Continue",
  cancelText = "Cancel",
  icon,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000F22]/60 backdrop-blur-sm animate-fade-in">
      <Card
        variant="default"
        padding="lg"
        className="max-w-md w-full mx-4 animate-fade-up"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon || (
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertCircle size={20} className="text-amber-600" />
              </div>
            )}
            <h3 className="font-display text-[#000F22] text-xl">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#537FAF] hover:text-[#000F22] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-sm text-[#537FAF] mb-6 leading-relaxed">{message}</p>

        <div className="flex gap-3">
          <Button
            variant="ghost"
            size="md"
            onClick={onClose}
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1"
          >
            {confirmText}
          </Button>
        </div>
      </Card>
    </div>
  );
}
