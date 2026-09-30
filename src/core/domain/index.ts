// Domain types for RE:ST - AI Sleep & Recovery Companion
export type { SleepSessionFull as SleepSession } from "./SleepSession";
export type { DailyContextFull as DailyContext } from "./DailyContext";
export type { RecoverySnapshotFull as RecoverySnapshot } from "./RecoverySnapshot";
export type { PersonalFactorFull as PersonalFactor } from "./PersonalFactor";
export type { ExperimentProposal as Experiment, ExperimentVerdict as ExperimentVerdictType } from "./Experiment";
export type { ExperimentStreakFull as ExperimentStreak } from "./ExperimentStreak";
export type { ConsentLedgerEntryFull as ConsentLedger } from "./ConsentLedger";
export type { UserProfile as User, UserPreferences, checkAgeGate, initializeUser } from "./User";

// Signal data types
export interface SignalData {
  rhr: number;
  temperature: number;
  respiratoryRate: number;
}

export interface Hypothesis {
  id: string;
  text: string;
  confidence: "low" | "moderate" | "high";
  supportedBy: any[];
  refutedBy: any[];
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

export interface FactsObject {
  recoveryScore: number;
  baselineDelta: number;
  subjectiveRating: number;
  likelyDrivers: string[];
  screenConflict: "none" | "conflict" | "unclear";
}