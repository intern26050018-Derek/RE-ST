import type { ConsentRecord, ConsentPurpose, ConsentStatus } from "./compliance";

// Age gate - 18+ self-declared at launch
export const AGE_GATE_ELIGIBLE = 18;

// User profile with age gate, preferences, consent ledger
export interface UserPreferences {
  darkMode: boolean;
  measurements: "imperial" | "metric";
  notifications: boolean;
  experimentFrequency: "weekly" | "biweekly" | "monthly";
  shareAnonymizedData: boolean;
}

export interface UserProfile {
  id: string;
  ageGateStatus: "eligible" | "ineligible" | "pending";
  preferences: UserPreferences;
  consentLedger: ConsentRecord[];
  createdAt: string;
  lastActive: string;
  streakCount: number;
  experimentCount: number;
  recoveryScoreHistory: number[];
}

// Age gate CTA component
export const checkAgeGate = (age?: number): "eligible" | "ineligible" | "pending" => {
  if (age === undefined) return "pending";
  if (age >= AGE_GATE_ELIGIBLE) return "eligible";
  return "ineligible";
};

// Consent ledger integration with User
export const initializeUser = (age?: number): UserProfile => {
  const status = checkAgeGate(age);
  const ledger = new (await import("./compliance")).ConsentLedger();

  return {
    id: `user-${Date.now()}`,
    ageGateStatus: status,
    preferences: {
      darkMode: true,
      measurements: "metric",
      notifications: true,
      experimentFrequency: "weekly",
      shareAnonymizedData: false,
    },
    consentLedger: ledger.getAllConsents(),
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    streakCount: 0,
    experimentCount: 0,
    recoveryScoreHistory: [],
  };
};