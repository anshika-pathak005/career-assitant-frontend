// components/resume/ProjectSuggestions.tsx

import { Rocket } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionHeader from "./SectionHeader";

/**
 * Project ideas. The backend sends each one as "Title — description",
 * so we split on the em dash before rendering.
 */
export default function ProjectSuggestions({ projects }: { projects: string[] }) {
  return (
    <Card variant="default" padding="lg" className="mb-6">
      <SectionHeader
        icon={Rocket}
        title="Project Suggestions"
        description="Build these to strengthen your portfolio"
      />
      <div className="space-y-3">
        {projects.map((project, idx) => {
          const [title, description] = project.split(" — ");
          return (
            <div key={idx} className="p-3 bg-brand-bg/30 rounded-lg">
              <p className="text-sm font-semibold text-brand-primary">{title}</p>
              <p className="text-xs text-brand-muted mt-0.5">{description}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
