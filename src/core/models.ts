import type { BaselineDelta, Hypothesis, ExperimentProposal, ExperimentVerdict, RecoverySnapshot, PersonalFactor, SignalData } from "./domain";

// Data models with drift/drizzle and provenance flags

export interface SleepSession {
  id: string;
  userId: string;
  start: string; // ISO time
  end: string;
  duration: number; // minutes
  efficiency: number; // percentage
  depth: "light" | "deep" | "rem" | "mixed";
  awakenings: number;
  source: "healthkit" | "healthconnect" | "manual" | "oura";
  provenance: "device" | "user-entered" | "inferred";
  driftFlag?: boolean; // marks nights with data quality issues
  sourceConfidence: number; // 0-1 scale
}

export interface DailyContext {
  id: string;
  userId: string;
  date: string;
  caffeine: boolean;
  exercise: boolean;
  stress: "low" | "medium" | "high";
  lateMeal: boolean;
  windDown: boolean;
  travel: boolean;
  alcohol: boolean;
  feltUnwell: boolean;
  phoneActiveMinutes: number;
  source: "healthkit" | "healthconnect" | "manual";
  provenance: "device" | "user-entered";
  sourceConfidence: number;
}

export interface PersonalFactor {
  id: string;
  name: string;
  type: "positive" | "negative" | "neutral";
  confidence: "low" | "moderate" | "high";
  comparableNights: number;
  evidenceType: "observed" | "experimental" | "theoretical";
  hasEvidence: boolean;
  provenance: "device" | "user-entered";
  sourceConfidence: number;
  driftFlag?: boolean;
}

export interface RecoverySnapshot {
  id: string;
  userId: string;
  date: string;
  baselineDelta: number;
  factors: PersonalFactor[];
  hypothesis: Hypothesis | null;
  experimentProposal: ExperimentProposal | null;
  experimentVerdict: ExperimentVerdict | null;
  overallScore: number; // 0-100
  sourceConfidence: number;
  provenance: "device" | "user-entered";
}

export interface Hypothesis {
  id: string;
  text: string;
  confidence: "low" | "moderate" | "high";
  supportedBy: PersonalFactor[];
  refutedBy: PersonalFactor[];
}

export interface ExperimentProposal {
  id: string;
  title: string;
  description: string;
  action: "try" | "swap" | "skip";
  expectedOutcome: string;
  duration: "1-night" | "3-night" | "1-week";
  confidence: "low" | "moderate" | "high";
}

export interface ExperimentVerdict {
  id: string;
  improvedNights: number;
  totalNights: number;
  pointsGained: number;
  baselineComparison: string;
  hypothesisSupported: boolean;
}

// Drift detection - marks data quality issues
export const detectDrift = (session: SleepSession): boolean => {
  return (
    session.driftFlag ||
    session.sourceConfidence < 0.6 ||
    session.duration < 300 || // less than 5 hours
    session.duration > 600 // more than 10 hours
  );
};

// Drizzle - gentle data interpolation for missing nights
export const drizzle = (
  existing: SleepSession[],
  missingDate: string
): SleepSession | null => {
  // Find closest night and interpolate
  const closest = existing.find((s) => s.date === missingDate);
  if (closest) return closest;

  // Simple interpolation based on adjacent nights
  const before = existing.filter((s) => new Date(s.date) < new Date(missingDate)).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  ).pop();

  const after = existing.filter((s) => new Date(s.date) > new Date(missingDate)).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  ).shift();

  if (!before || !after) return null;

  const interpolatedDuration = Math.round((before.duration + after.duration) / 2);
  const interpolatedEfficiency = Math.round((before.efficiency + after.efficiency) / 2);

  return {
    id: `drizzle-${missingDate}`,
    userId: "",
    start: "10:00 PM",
    end: "6:00 AM",
    duration: interpolatedDuration,
    efficiency: interpolatedEfficiency,
    depth: "mixed",
    awakenings: 2,
    source: "manual",
    provenance: "inferred",
    driftFlag: true,
    sourceConfidence: 0.4,
  };
};