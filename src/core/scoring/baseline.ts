/**
 * Baseline-relative scoring engine (Tier 0)
 * Computes recovery score change vs user's 14-day baseline
 * All calculations are pure functions, no side effects
 */

/** Calculate recovery score vs 14-day baseline */
export function calculateBaselineDelta(
  currentScore: number,
  baselineScores: number[],
  subjectiveCurrent: number,
  subjectiveBaseline: number[]
): {
  recoveryScore: number;
  baselineDelta: number;
  subjectiveRating: number;
  baselineSubjectiveDelta: number;
} {
  // Compute 14-day median baseline
  const sorted = [...baselineScores].sort((a, b) => a - b);
  const median =
    sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];

  const baselineDelta = Math.round(((currentScore - median) / median) * 100);

  // Compute subjective baseline median
  const subSorted = [...subjectiveBaseline].sort((a, b) => a - b);
  const subMedian =
    subSorted.length % 2 === 0
      ? (subSorted[subSorted.length / 2 - 1] + subSorted[subSorted.length / 2]) / 2
      : subSorted[Math.floor(subSorted.length / 2)];

  const subjectiveRating = currentScore > 0 ? currentScore : subjectiveCurrent;
  const baselineSubjectiveDelta =
    subjectiveCurrent - subMedian;

  return {
    recoveryScore: currentScore,
    baselineDelta,
    subjectiveRating,
    baselineSubjectiveDelta,
  };
}

/** Effect size classification */
export function classifyEffectSize(delta: number): "strong" | "moderate" | "weak" | "none" {
  const absDelta = Math.abs(delta);
  if (absDelta >= 15) return "strong";
  if (absDelta >= 8) return "moderate";
  if (absDelta >= 3) return "weak";
  return "none";
}

/** Weekend-aware baseline matching */
export function getWeekdayBaseline(
  nightDate: string,
  baselineData: { date: string; score: number; subjective: number }[]
): {
  baselineScore: number;
  subjectiveScore: number;
  isWeekend: boolean;
} {
  const date = new Date(nightDate);
  const dayOfWeek = date.getDay(); // 0=Sunday, 6=Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // Filter baseline data matching the same weekday type
  const matching = baselineData.filter(
    (d) => {
      const dDate = new Date(d.date);
      const dDay = dDate.getDay();
      return isWeekend ? dDay === 0 || dDay === 6 : dDay !== 0 && dDay !== 6;
    }
  );

  if (matching.length === 0) {
    return { baselineScore: 0, subjectiveScore: 0, isWeekend };
  }

  const scores = matching.map((d) => d.score);
  const subjs = matching.map((d) => d.subjective);

  const sortedScores = [...scores].sort((a, b) => a - b);
  const medianScore =
    sortedScores.length % 2 === 0
      ? (sortedScores[sortedScores.length / 2 - 1] + sortedScores[sortedScores.length / 2]) / 2
      : sortedScores[Math.floor(sortedScores.length / 2)];

  const sortedSubjs = [...subjs].sort((a, b) => a - b);
  const medianSubj =
    sortedSubjs.length % 2 === 0
      ? (sortedSubjs[sortedSubjs.length / 2 - 1] + sortedSubjs[sortedSubjs.length / 2]) / 2
      : sortedSubjs[Math.floor(sortedSubjs.length / 2)];

  return { baselineScore: medianScore, subjectiveScore: medianSubj, isWeekend };
}