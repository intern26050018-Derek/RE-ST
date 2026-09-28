/** Daily recovery snapshot */
export interface RecoverySnapshotFull {
  recoveryScore: number;
  baselineDelta: number;
  subjectiveRating: number;
  tierThatRendered: "t0" | "rtl" | "device_llm" | "server_llm";
}