// components/roadmap/SkillResources.tsx

import { ExternalLink } from "lucide-react";

interface Resource {
  name: string;
  url: string;
  type: string;
}

/**
 * Learning-resource links for one skill.
 * The backend sends `resources` as a JSON string, so parsing can fail -
 * if it does we render nothing rather than breaking the whole phase.
 */
export default function SkillResources({ resources }: { resources?: string }) {
  if (!resources) return null;

  let parsed: Resource[];
  try {
    parsed = JSON.parse(resources);
  } catch {
    return null;
  }

  if (!parsed?.length) return null;

  return (
    <div className="mb-3">
      <p className="text-xs font-semibold text-brand-secondary mb-2">
        Learning Resources
      </p>
      <div className="flex flex-wrap gap-2">
        {parsed.map((resource, idx) => (
          <a
            key={idx}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-brand-accent-lt/30 text-brand-secondary hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all duration-150 text-xs font-medium"
          >
            <ExternalLink size={10} />
            {resource.name}
            <span className="text-[9px] opacity-70 uppercase">
              {resource.type}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
