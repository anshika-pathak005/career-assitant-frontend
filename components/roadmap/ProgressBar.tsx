// components/roadmap/ProgressBar.tsx

/** Thin horizontal progress bar with an optional label + percentage row. */
export default function ProgressBar({
  progress,
  label,
}: {
  progress: number;
  label?: string;
}) {
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs text-brand-muted mb-1">
          <span>{label}</span>
          <span>{progress}%</span>
        </div>
      )}
      <div className="h-1.5 bg-brand-bg rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-accent rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
