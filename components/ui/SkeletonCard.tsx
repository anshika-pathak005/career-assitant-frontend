// components/ui/SkeletonCard.tsx

/** Placeholder row shown while a list page loads. */
export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-brand-accent-lt/20 p-5 animate-pulse">
      <div className="flex justify-between items-start mb-3">
        <div className="h-5 bg-brand-bg rounded w-40" />
        <div className="h-5 bg-brand-bg rounded w-16" />
      </div>
      <div className="h-3 bg-brand-bg rounded w-32 mb-4" />
      <div className="h-2 bg-brand-bg rounded-full mb-3" />
      <div className="h-8 bg-brand-bg rounded w-32" />
    </div>
  );
}
