import type { SleepSession, DailyContext, PersonalFactor, RecoverySnapshot, Hypothesis, ExperimentProposal, ExperimentVerdict } from "../core/models";
import type { UserProfile, UserPreferences } from "../core/domain";

// Unit test utilities for RE:ST core

// Golden dataset sample - typical polysomnography-aligned sleep session
const GOLDEN_SLEEP_SESSION: SleepSession = {
  id: "golden-001",
  userId: "test-user",
  start: "10:30 PM",
  end: "6:30 AM",
  duration: 480, // 8 hours
  efficiency: 88,
  depth: "deep",
  awakenings: 2,
  source: "healthkit",
  provenance: "device",
  sourceConfidence: 0.95,
};

// Golden daily context
const GOLDEN_DAILY_CONTEXT: DailyContext = {
  id: "golden-ctx-001",
  userId: "test-user",
  date: "2026-09-20",
  caffeine: true,
  exercise: false,
  stress: "high",
  lateMeal: true,
  windDown: false,
  travel: false,
  alcohol: false,
  feltUnwell: false,
  phoneActiveMinutes: 45,
  source: "healthkit",
  provenance: "device",
  sourceConfidence: 0.9,
};

// Golden personal factor
const GOLDEN_PERSONAL_FACTOR: PersonalFactor = {
  id: "factor-001",
  name: "Late Caffeine",
  type: "negative",
  confidence: "moderate",
  comparableNights: 6,
  evidenceType: "observed",
  hasEvidence: true,
  provenance: "device",
  sourceConfidence: 0.85,
};

// Hypothesis test
const GOLDEN_HYPOTHESIS: Hypothesis = {
  id: "hyp-001",
  text: "Evening caffeine consumption correlates with longer sleep onset",
  confidence: "moderate",
  supportedBy: [GOLDEN_PERSONAL_FACTOR],
  refutedBy: [],
};

// Experiment proposal test
const GOLDEN_EXPERIMENT_PROPOSAL: ExperimentProposal = {
  id: "exp-001",
  title: "Early Caffeine Cutoff",
  description: "Stop caffeine after 2 PM for 7 nights",
  action: "try",
  expectedOutcome: "Faster sleep onset, higher recovery scores",
  duration: "1-week",
  confidence: "moderate",
};

// Experiment verdict test
const GOLDEN_EXPERIMENT_VERDICT: ExperimentVerdict = {
  id: "verdict-001",
  improvedNights: 5,
  totalNights: 7,
  pointsGained: 8,
  baselineComparison: "+8 points vs matched baseline",
  hypothesisSupported: true,
};

// Recovery snapshot test
const GOLDEN_RECOVERY_SNAPSHOT: RecoverySnapshot = {
  id: "snapshot-001",
  userId: "test-user",
  date: "2026-09-20",
  baselineDelta: 6,
  factors: [GOLDEN_PERSONAL_FACTOR],
  hypothesis: GOLDEN_HYPOTHESIS,
  experimentProposal: GOLDEN_EXPERIMENT_PROPOSAL,
  experimentVerdict: GOLDEN_EXPERIMENT_VERDICT,
  overallScore: 72,
  sourceConfidence: 0.88,
  provenance: "device",
};

// Test: drift detection
export const testDriftDetection = () => {
  const sessionWithDrift = { ...GOLDEN_SLEEP_SESSION, driftFlag: true, sourceConfidence: 0.3 };
  const sessionWithoutDrift = { ...GOLDEN_SLEEP_SESSION, driftFlag: undefined, sourceConfidence: 0.95 };

  const hasDrift1 = detectDrift(sessionWithDrift); // Should be true
  const hasDrift2 = detectDrift(sessionWithoutDrift); // Should be false

  return { hasDrift1, hasDrift2 };
};

// Test: drizzle interpolation
export const testDrizzle = () => {
  const existingSessions = [GOLDEN_SLEEP_SESSION];
  const missingNight = drizzle(existingSessions, "2026-09-15");
  return missingNight !== null && missingNight!.driftFlag === true;
};

// Test: age gate eligibility
export const testAgeGate = () => {
  const eligible = checkAgeGate(25); // Should be "eligible"
  const ineligible = checkAgeGate(16); // Should be "ineligible"
  const pending = checkAgeGate(undefined); // Should be "pending"
  return { eligible, ineligible, pending };
};

// Test: consent ledger operations
export const testConsentLedger = () => {
  const ledger = new (await import("../core/compliance")).ConsentLedger();
  const dataIngestion = ledger.recordConsent("data_ingestion", "granted");
  const hasConsent = ledger.hasActiveConsent("data_ingestion");
  ledger.withdrawConsent("data_ingestion");
  const withdrawn = ledger.hasActiveConsent("data_ingestion");
  return { dataIngestion, hasConsent, withdrawn };
};

// Test: user initialization
export const testUserInit = () => {
  const user25 = initializeUser(25);
  const user16 = initializeUser(16);
  const pendingUser = initializeUser(undefined);

  return {
    user25Eligible: user25.ageGateStatus === "eligible",
    user16Ineligible: user16.ageGateStatus === "ineligible",
    pendingStatus: pendingUser.ageGateStatus === "pending",
  };
};