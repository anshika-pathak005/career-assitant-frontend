// components/roadmap/generate/FormActions.tsx

"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

interface FormActionsProps {
  isSubmitting: boolean;
}

/** Back / submit row at the foot of the generation form. */
export default function FormActions({ isSubmitting }: FormActionsProps) {
  const router = useRouter();

  return (
    <div className="flex gap-3 pt-4">
      <Button
        type="button"
        variant="ghost"
        size="lg"
        leftIcon={<ArrowLeft size={14} />}
        onClick={() => router.back()}
      >
        Back
      </Button>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="flex-1"
        isLoading={isSubmitting}
        rightIcon={<Sparkles size={16} />}
      >
        {isSubmitting ? "Generating..." : "Generate Roadmap"}
      </Button>
    </div>
  );
}
