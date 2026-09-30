// Age gate - 18+ self-declared at launch
export const AGE_GATE_ELIGIBLE = 18;

// Consent types (defined locally to avoid circular import)
export interface ConsentRecord {
  id: string;
  userId: string;
  purpose: string;
  grantedAt: string;
  expiresAt?: string;
  status: "granted" | "pending" | "withdrawn";
  withdrawalStatus?: "pending" | "granted";
  version: number;
}

// User preferences
export interface UserPreferences {
  darkMode: boolean;
  measurements: "imperial" | "metric";
  notifications: boolean;
  experimentFrequency: "weekly" | "biweekly" | "monthly";
  shareAnonymizedData: boolean;
}

// User profile with age gate, preferences, consent ledger
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

// Consent ledger interface (implemented in compliance.ts)
export interface ConsentLedgerInterface {
  recordConsent(purpose: string, status: string): any;
  getConsent(purpose: string): any;
  hasActiveConsent(purpose: string): boolean;
  withdrawConsent(purpose: string): void;
  getAllConsents(): any[];
}

// Initialize user (ledger passed in to avoid circular import)
export const initializeUser = (age?: number, ledger?: any): UserProfile => {
  const status = checkAgeGate(age);

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
    consentLedger: ledger?.getAllConsents?.() || [],
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    streakCount: 0,
    experimentCount: 0,
    recoveryScoreHistory: [],
  };
};