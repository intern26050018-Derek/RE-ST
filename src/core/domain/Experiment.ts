/** Experiment type from V1 library */
export type ExperimentType = 
  | "caffeine-cutoff" 
  | "wake-time-consistency" 
  | "screen-free-wind-down" 
  | "dinner-timing" 
  | "bedtime-variability-reduction" 
  | "evening-workout-timing";

/** Experiment proposal */
export interface ExperimentProposal {
  id: string;
  type: ExperimentType;
  hypothesis: string;
  protocol: string;
  duration: number; // nights
  measure: string;
  cta: string;
  secondary: {
    swap: string;
    skip: string;
  };
}

/** Experiment verdict */
export interface ExperimentVerdict {
  nightsBetter: number;
  nightsEqual: number;
  nightsWorse: number;
  verdict: string; // plain language
  evidence: string; // one tap away
}