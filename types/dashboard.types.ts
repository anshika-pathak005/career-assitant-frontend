export interface DashboardStats {
  totalStepsCompleted: number;
  totalStepsSkipped: number;
  totalSteps: number;
  totalPhasesCompleted: number;
  totalResumesAnalyzed: number;
  totalRoadmapsGenerated: number;
}

export interface PhaseProgress {
  phaseId: number;
  title: string;
  phaseOrder: number;
  progress: number;
  isComplete: boolean;
  isCurrent: boolean;
}

export interface CurrentPhase {
  phaseId: number;
  title: string;
  phaseOrder: number;
  phaseProgress: number;
  totalSkills: number;
  completedSkills: number;
}

export interface RoadmapData {
  roadmapId: number;
  dreamJob: string;
  specialization: string | null;
  overallProgress: number;
  totalEstimatedWeeks: number;
  generatedAt: string;
  currentPhase: CurrentPhase;
  lastActivity: string | null;
  phaseProgress: PhaseProgress[];
}

export interface ResumeData {
  resumeId: number;
  analysisId: number;
  fileName: string;
  overallScore: number;
  atsScore: number;
  interviewReadiness: string;
  resumeVerdict: string;
  uploadedAt: string;
  totalResumesUploaded: number;
}

export interface DashboardResponse {
  user: {
    userId: number;
    name: string;
    email: string;
    dreamJob: string;
    plan: string;
  };
  roadmap: RoadmapData | null;
  resume: ResumeData | null;
  stats: DashboardStats;
  limits: {
    roadmapLimit: {
      used: number;
      total: number;
      remaining: number;
      limitReached: boolean;
      resetsOn: string;
    };
    resumeLimit: {
      used: number;
      total: number;
      remaining: number;
      limitReached: boolean;
      resetsOn: string;
    };
  };
  profileStatus: {
    isComplete: boolean;
    missingFields: string[];
  };
}
