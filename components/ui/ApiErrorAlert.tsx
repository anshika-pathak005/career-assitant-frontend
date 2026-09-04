// components/ui/ApiErrorAlert.tsx

import { AlertCircle } from "lucide-react";
import { getApiErrorMessage } from "@/utils/apiError";

/** Red alert box for a failed mutation. */
export default function ApiErrorAlert({
  error,
  fallback,
}: {
  error: unknown;
  fallback: string;
}) {
  return (
    <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2">
      <AlertCircle size={14} className="text-red-500" />
      <p className="text-xs text-red-600">
        {getApiErrorMessage(error, fallback)}
      </p>
    </div>
  );
}
