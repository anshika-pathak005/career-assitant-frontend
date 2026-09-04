// components/dashboard/Skeleton.tsx

/** Grey pulsing block used as a placeholder while dashboard data loads. */
export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-brand-bg/60 rounded-lg animate-pulse ${className}`} />
  );
}
