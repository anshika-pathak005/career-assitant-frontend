// components/ui/ErrorText.tsx

interface ErrorTextProps {
  message?: string;
  fieldName?: string;
}

export default function ErrorText({ message, fieldName }: ErrorTextProps) {
  if (!message) return null;

  return (
    <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
      <span className="text-red-500">•</span>
      {fieldName ? `${fieldName} is required` : "This field is required"}
    </p>
  );
}
