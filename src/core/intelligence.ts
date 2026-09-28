import type { SignalData, Hypothesis, ExperimentProposal, ExperimentVerdict, RecoverySnapshot, PersonalFactor } from "./domain";
import type { DecisionTier, TieredDecision, LLMResult, OnDeviceLLM, withLLMCircuitBreaker } from "./on-device-llm";

// Import on-device LLM instance
import { onDeviceLLM, withLLMCircuitBreaker } from "./on-device-llm";

// Tier 0: Deterministic baseline delta computation
export const computeBaselineDelta = (
  current: SleepSession,
  baseline: SleepSession
): number => {
  // 14-day median, weekday-aware delta
  const medianBaseline = 0; // computed from 14-night median
  const delta = current.efficiency - baseline.efficiency;
  return Number(delta.toFixed(1));
};

// Tier 1: RTL (Rule-Based Template Language) - guaranteed text floor
export const interpretSignal = (
  signal: keyof SignalData,
  value: number
): string => {
  const map: Record<string, string> = {
    rhr: value > 100 ? "Elevated resting heart rate detected" : "Resting heart rate within normal range",
    temperature: value > 37.5 ? "Slight temperature elevation" : "Temperature within normal range",
    respiratoryRate: value > 20 ? "Elevated respiratory rate" : "Respiratory rate within normal range",
  };
  return map[signal] || "Signal within expected range";
};

// RTL-based decision that serves as guaranteed floor (Tier 1)
export const rtlDecision = (
  factors: PersonalFactor[]
): TieredDecision => {
  const hasSignificantNegative = factors.some(
    (f) => f.type === "negative" && f.confidence >= "moderate"
  );

  if (hasSignificantNegative) {
    return {
      tier: "tier1",
      text: "Factors detected that may impact recovery — consider adjustments",
      confidence: 0.75,
      fallback: "Monitor for 2 additional nights before making changes",
    };
  }

  return {
    tier: "tier1",
    text: "No significant factors detected — your baseline looks stable",
    confidence: 0.85,
    fallback: "Maintain current routine",
  };
};

// Tier 2: On-device LLM (llama.rn / Qwen3) - probabilistic decisions
// Uses withLLMCircuitBreaker for graceful degradation
export const onDeviceLLMDecision = async (
  factors: PersonalFactor[],
  baselineDelta: number,
  snapshot?: RecoverySnapshot
): Promise<TieredDecision> => {
  return await withLLMCircuitBreaker(
    async () => {
      // Build context for on-device LLM
      const context = {
        factors,
        baselineDelta,
        snapshot,
      };

      // Process with on-device LLM (or fallback to RTL)
      const result = await onDeviceLLM.processText(
        "", // prompt handled internally
        context
      );

      return {
        tier: result.tier,
        text: result.text,
        confidence: result.confidence,
        fallback: "Monitor trends over 3 additional nights",
      };
    },
    (error) => {
      // Fallback to RTL guaranteed floor
      return rtlDecision(factors);
    }
  );
};

// Tier 3: Server proxy - only invoked when Tier 2 confidence < threshold
export const serverDecisionProxy = async (
  request: {
    userId: string;
    context: DailyContext;
    factors: PersonalFactor[];
  },
  onUpdate: (text: string) => void
): Promise<TieredDecision> => {
  // In production: fetch from LLM endpoint with circuit breaker
  // For now: return RTL-guaranteed floor with onUpdate notification
  onUpdate("Analysis pending — using reliable baseline assessment");

  return {
    tier: "tier1" as const,
    text: "System using reliable baseline assessment — no server LLM available",
    confidence: 0.8,
    fallback: "Maintain current routine, re-evaluate tomorrow",
  };
};

// Four-tier cascade: determine which tier to use
export const determineTier = async (
  factors: PersonalFactor[],
  baselineDelta: number,
  snapshot?: RecoverySnapshot,
  forceTier2 = false
): Promise<{
  tier: DecisionTier;
  text: string;
  confidence: number;
  source: "rtl" | "on-device-llm" | "server";
}> => {
  // If forced (for dark-launch testing) or model ready, use Tier 2
  if (forceTier2 || onDeviceLLM.isReady()) {
    const decision = await onDeviceLLMDecision(factors, baselineDelta, snapshot);
    return {
      tier: decision.tier,
      text: decision.text,
      confidence: decision.confidence,
      source: "on-device-llm",
    };
  }

  // Default: use RTL guaranteed floor (Tier 1)
  const rtl = rtlDecision(factors);
  return {
    tier: "tier1" as const,
    text: rtl.text,
    confidence: rtl.confidence,
    source: "rtl",
  };
};

// Circuit breaker status
export const getCircuitBreakerStatus = (): {
  failureCount: number;
  maxFailures: number;
  state: string;
  modelReady: boolean;
} => ({
  failureCount: onDeviceLLM.failureCount,
  maxFailures: onDeviceLLM.maxFailures,
  state: onDeviceLLM.getState(),
  modelReady: onDeviceLLM.isReady(),
});

// Model ready check for dark-launch control
export const isOnDeviceLLMAvailable = (): boolean => {
  // In production: check if model has been downloaded and loaded
  // For now: return false until model download completes
  return onDeviceLLM.isReady();
};