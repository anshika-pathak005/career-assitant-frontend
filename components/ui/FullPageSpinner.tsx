// components/ui/FullPageSpinner.tsx

/**
 * FullPageSpinner — centered loading state that fills the viewport.
 *
 * Replaces the identical inline spinner previously duplicated in
 * ClientLayoutWrapper, roadmap/generate, jobs, skills and progress.
 */
export default function FullPageSpinner() {
  return (
    <div className="page-shell-centered">
      <div className="w-6 h-6 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
