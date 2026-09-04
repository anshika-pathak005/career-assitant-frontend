// components/ui/FullPageSpinner.tsx

/**
 * FullPageSpinner — centered loading state that fills the viewport.
 *
 * Replaces the identical inline spinner previously duplicated in
 * ClientLayoutWrapper, roadmap/generate, jobs, skills and progress.
 */
export default function FullPageSpinner() {
  return (
    <div className="min-h-screen bg-[#C2E8FF] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-[#557EB2] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
