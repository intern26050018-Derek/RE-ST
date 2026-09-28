import { testDriftDetection, testDrizzle, testAgeGate, testConsentLedger, testUserInit } from "./tests";

// Run all core tests
const driftResults = testDriftDetection();
console.log("🔍 Drift Detection Tests:", driftResults);

const drizzleResults = testDrizzle();
console.log("💧 Drizzle Interpolation Tests:", drizzleResults);

const ageGateResults = testAgeGate();
console.log("🚪 Age Gate Tests:", ageGateResults);

const consentResults = testConsentLedger();
console.log("📜 Consent Ledger Tests:", consentResults);

const userInitResults = testUserInit();
console.log("👤 User Init Tests:", userInitResults);

// Summary
const allPassed = 
  driftResults.hasDrift1 && !driftResults.hasDrift2 &&
  drizzleResults !== null &&
  ageGateResults.eligible === "eligible" && 
  ageGateResults.ineligible === "ineligible" && 
  ageGateResults.pending === "pending" &&
  consentResults.dataIngestion && !consentResults.hasConsent && consentResults.withdrawn &&
  userInitResults.user25Eligible && user16Ineligible && pendingStatus;

console.log("\n" + "=".repeat(50));
console.log(allPassed ? "✅ ALL CORE TESTS PASSED" : "❌ SOME TESTS FAILED");
console.log("=".repeat(50));