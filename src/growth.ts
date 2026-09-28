import type { RecoverySnapshot, ExperimentVerdict, PersonalFactor } from "../core/models";

// Shareable Week Card - product growth feature
export const generateWeekCard = (
  snapshot: RecoverySnapshot
): {
  title: string;
  summary: string;
  goldAccent: string;
  shareText: string;
} => {
  const improved = snapshot.experimentVerdict?.improvedNights || 0;
  const total = snapshot.experimentVerdict?.totalNights || 1;
  const points = snapshot.experimentVerdict?.pointsGained || 0;

  return {
    title: "This Week's Recovery",
    summary: `${improved}/${total} nights improved · ${points} points gained`,
    goldAccent: "#D4AF6A",
    shareText: "Check out my RE:ST recovery week — what I'm learning about my sleep and recovery",
  };
};

// Experiment verdict shares
export const formatShareText = (verdict: ExperimentVerdict): string => {
  return `Week ${verdict.improvedNights}/${verdict.totalNights} nights improved. What I'm learning about my recovery → ${verdict.baselineComparison}`;
};

// Twin milestones
export const checkTwinMilestone = (
  streakCount: number,
  experimentCount: number
): "first-experiment" | "ten-experiments" | "twenty-five-experiments" | null => {
  if (experimentCount >= 25) return "twenty-five-experiments";
  if (experimentCount >= 10) return "ten-experiments";
  if (experimentCount >= 1) return "first-experiment";
  return null;
};

// ASO keywords (App Store Optimization)
export const ASO_KEYWORDS = [
  "sleep tracker",
  "recovery companion",
  "sleep science",
  "behavioral feedback",
  "personal experiment",
  "sleep optimization",
  "rest and recovery",
  "sleep quality",
];

// Micro-influencer outreach categories
export const INFLUENCER_CATEGORIES = [
  "sleep wellness",
  "productivity",
  "biohacking",
  "mental health",
  "fitness recovery",
  "lifestyle design",
];