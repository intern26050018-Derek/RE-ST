/** SleepSession with full provenance */
export interface SleepSessionFull {
  id: string;
  start: string;
  end: string;
  duration: number;
  sourceConfidence: "high" | "medium" | "low";
  dataQualityFlag: "complete" | "partial" | "unverified";
  verified: boolean;
  screenConflict: "none" | "suspected" | "confirmed";
  specialContext: "normal" | "all_nighter" | "travel" | "sick" | "fragmented";
  source: "manual" | "healthkit" | "healthconnect" | "wearable";
  reliabilityScore: number;
  screenActivityProfile?: ScreenActivityProfileFull;
}

/** Full screen activity profile */
export interface ScreenActivityProfileFull {
  lastUnlock: string;
  firstUnlock: string;
  overnightActiveMinutes: number;
  source: "usage_stats" | "manual";
}