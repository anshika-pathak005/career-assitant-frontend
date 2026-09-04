// components/roadmap/generate/SpecializationSection.tsx

"use client";

import { useFormContext } from "react-hook-form";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import type { Specialization } from "@/types/roadmap.types";
import type { FormData } from "@/app/roadmap/generate/generate.schema";

interface SpecializationSectionProps {
  specializations?: Specialization[];
}

/**
 * Suggested specializations for the user's dream job, with a free-text
 * escape hatch. Renders nothing when the backend returns no suggestions.
 */
export default function SpecializationSection({
  specializations,
}: SpecializationSectionProps) {
  const { watch, setValue } = useFormContext<FormData>();
  const selected = watch("specialization");

  if (!specializations || specializations.length === 0) return null;

  return (
    <Card variant="default" padding="lg">
      <h2 className="font-semibold text-[#000F22] text-lg mb-4">
        Choose Specialization
      </h2>
      <p className="text-xs text-[#537FAF] mb-4 -mt-2">
        Select a specialization for a more focused roadmap, or type your own
        below.
      </p>

      <div className="grid grid-cols-1 gap-2">
        {specializations.map((spec) => {
          const isSelected = selected === spec.title;

          return (
            <button
              key={spec.title}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setValue("specialization", spec.title)}
              className={`p-3 rounded-lg border text-left transition-all duration-150 ${
                isSelected
                  ? "bg-[#000F22] border-[#000F22]"
                  : "bg-white border-[#7A9BC4]/30 hover:border-[#557EB2]"
              }`}
            >
              <p
                className={`font-semibold text-sm ${
                  isSelected ? "text-white" : "text-[#000F22]"
                }`}
              >
                {spec.title}
              </p>
              <p
                className={`text-xs mt-0.5 ${
                  isSelected ? "text-white/70" : "text-[#537FAF]"
                }`}
              >
                {spec.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {spec.coreTech.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-white/80"
                        : "bg-[#C2E8FF] text-[#537FAF]"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom Specialization Input */}
      <div className="mt-4 pt-4 border-t border-[#7A9BC4]/15">
        <label className="text-xs font-semibold text-[#042558] block mb-2">
          Or specify your own specialization
        </label>
        <Input
          placeholder="e.g., MERN Stack Developer, AI/ML Engineer"
          value={selected || ""}
          onChange={(e) => setValue("specialization", e.target.value)}
          hint="Leave empty for a general roadmap"
        />
      </div>
    </Card>
  );
}
