/** Personal factor (Sleep Twin relationship) */
export interface PersonalFactorFull {
  variablePair: string;
  direction: "positive" | "negative";
  strength: number;
  confidenceBand: string;
  nNights: number;
  dateRange: {
    start: string;
    end: string;
  };
  evidenceType: "observational" | "experimental";
  status: "active" | "supported" | "rejected" | "insufficient";
  excludedNights: string[];
}