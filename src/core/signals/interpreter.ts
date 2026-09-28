/**
 * Signal interpretation map (FR-5.8 minimal set at G0)
 * All interpretations are:
 * (a) within-person deviations only
 * (b) phrased as hypotheses to test via experiments
 * (c) never diagnostic
 * 
 * References: Appendix A - Signal Interpretation Science
 */

// RHR elevation hypotheses
export function interpretRHR Elevation(
  currentRHR: number,
  baselineRHR: number,
  context: {
    alcoholOptional: boolean;
    feltUnwell?: boolean;
    stress?: "low" | "moderate" | "high";
  }
): {
  hypotheses: string[];
  confidence: "low" | "moderate" | "high";
  experimental: boolean;
} {
  const delta = currentRHR - baselineRHR;
  const hypotheses: string[] = [];
  let confidence: "low" | "moderate" | "high" = "low";

  // Standard RHR elevation interpretations
  if (delta > 5) {
    hypotheses.push("Recent physical activity or exercise");
    confidence = "moderate";
  }
  if (delta > 10) {
    hypotheses.push("Possible illness incipient (pre-symptomatic)");
    confidence = "moderate";
  }
  if (delta > 15) {
    hypotheses.push("Significant stress or emotional arousal");
    confidence = "high";
  }

  // Alcohol-specific
  if (context.alcoholOptional && delta > 3) {
    hypotheses.unshift("Alcohol consumption effect on heart rate");
    confidence = "moderate";
  }

  // Felt unwell
  if (context.feltUnwell) {
    hypotheses.push("Body fighting illness - RHR elevation as expected");
    confidence = "high";
  }

  // Stress
  if (context.stress === "high") {
    hypotheses.push("Elevated psychological stress");
    confidence = "high";
  }

  return {
    hypotheses: hypotheses.length > 0 ? hypotheses : ["RHR within normal range"],
    confidence,
    experimental: false, // Always hypotheses, never diagnostic
  };
}

// Temperature drift hypotheses
export function interpretTemperatureDrift(
  currentTemp: number,
  baselineTemp: number,
  context: {
    feltUnwell?: boolean;
    alcoholOptional?: boolean;
  }
): {
  hypotheses: string[];
  confidence: "low" | "moderate" | "high";
  experimental: boolean;
} {
  const delta = currentTemp - baselineTemp;
  const hypotheses: string[] = [];
  let confidence: "low" | "moderate" | "high" = "low";

  if (delta > 1) {
    hypotheses.push("Possible low-grade infection or inflammation");
    confidence = "moderate";
  }
  if (delta > 2) {
    hypotheses.push("Hot environment or bedding temperature");
    confidence = "low";
  }
  if (delta < -1) {
    hypotheses.push("Cold environment or lighter bedding");
    confidence = "low";
  }

  if (context.feltUnwell) {
    hypotheses.unshift("Body temperature deviation with felt-unwell confirmation");
    confidence = "high";
  }

  return {
    hypotheses,
    confidence,
    experimental: false,
  };
}

// Respiratory rate deviation hypotheses
export function interpretRRDeviation(
  currentRR: number,
  baselineRR: number
): {
  hypotheses: string[];
  confidence: "low" | "moderate" | "high";
  experimental: boolean;
} {
  const delta = Math.abs(currentRR - baselineRR);
  const hypotheses: string[] = [];
  let confidence: "low" | "moderate" | "high" = "low";

  // Within-person deviation only, never diagnostic
  if (delta > 3) {
    hypotheses.push("Respiratory rate deviation from personal baseline");
    confidence = "moderate";
    hypotheses.push(
      "This is a within-person observation — not a medical diagnosis"
    );
    confidence = "moderate"; // maintain moderate, add confound disclosure
  }

  return {
    hypotheses,
    confidence,
    experimental: false,
  };
}

// Composite interpretation for Morning Brief
export function generateBriefInterpretations(
  rhrDelta: number,
  tempDelta: number,
  rrDelta: number,
  context: {
    alcoholOptional: boolean;
    feltUnwell?: boolean;
    stress?: "low" | "moderate" | "high";
  }
) {
  const rhr = interpretRHRElevation(rhrDelta, context);
  const temp = interpretTemperatureDrift(tempDelta, context);
  const rr = interpretRRDeviation(rrDelta);

  return {
    rhr: rhr.hypotheses,
    temperature: temp.hypotheses,
    respiratoryRate: rr.hypotheses,
    // Confound disclosure: always frame as hypotheses
    confoundDisclosure:
      "These are within-person observations, not diagnoses. " +
      "Test these hypotheses via experiments in the app.",
  };
}