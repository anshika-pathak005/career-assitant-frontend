// components/resume/ScoresGrid.tsx

import Card from "@/components/ui/Card";
import ScoreRing from "./ScoreRing";
import { getScoreColor } from "@/utils/score";

interface Scores {
  overallScore: number;
  atsScore: number;
  technicalSkillsScore: number;
  projectQualityScore: number;
  formattingScore: number;
}

/** Row of five score rings. */
export default function ScoresGrid({ scores }: { scores: Scores }) {
  const rings = [
    { value: scores.overallScore, label: "Overall" },
    { value: scores.atsScore, label: "ATS Score" },
    { value: scores.technicalSkillsScore, label: "Technical" },
    { value: scores.projectQualityScore, label: "Projects" },
    { value: scores.formattingScore, label: "Formatting" },
  ];

  return (
    <Card variant="default" padding="md" className="mb-6">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
        {rings.map((ring) => (
          <ScoreRing
            key={ring.label}
            value={ring.value}
            label={ring.label}
            color={getScoreColor(ring.value)}
          />
        ))}
      </div>
    </Card>
  );
}
