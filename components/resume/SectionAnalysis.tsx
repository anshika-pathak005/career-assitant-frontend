// components/resume/SectionAnalysis.tsx

import { Users } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionHeader from "./SectionHeader";

/** Per-section feedback (experience, education, projects...) as a keyed object. */
export default function SectionAnalysis({
  sections,
}: {
  sections: Record<string, string>;
}) {
  return (
    <Card variant="default" padding="lg">
      <SectionHeader
        icon={Users}
        title="Section-wise Analysis"
        description="Detailed breakdown of each resume section"
      />
      <div className="space-y-3">
        {Object.entries(sections).map(([section, feedback]) => (
          <div
            key={section}
            className="border-b border-brand-accent-lt/15 pb-3 last:border-0"
          >
            <p className="text-sm font-semibold text-brand-primary capitalize">
              {section}
            </p>
            <p className="text-xs text-brand-muted mt-0.5">{feedback}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
