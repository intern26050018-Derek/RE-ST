/** Daily context logging */
export interface DailyContextFull {
  caffeine: {
    morning: boolean;
    afternoon: boolean;
    after4pm: boolean;
  };
  exercise: {
    intensity: "light" | "moderate" | "hard";
    evening: boolean;
  };
  stress: "low" | "moderate" | "high";
  lateMeal: boolean;
  windDown: boolean;
  travel: boolean;
  alcohol: boolean;
  feltUnwell: boolean;
  freeTextNote?: string;
}