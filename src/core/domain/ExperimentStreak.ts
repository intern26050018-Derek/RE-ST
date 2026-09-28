/** Experiment streak */
export interface ExperimentStreakFull {
  currentCount: number;
  bestCount: number;
  paused: {
    since: string;
    freeSkipsLeft: number;
  };
}