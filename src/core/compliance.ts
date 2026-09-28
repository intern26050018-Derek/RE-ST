import type { ConsentRecord, ConsentPurpose, ConsentStatus } from "./domain";

// DPDP (Data Protection and Digital Privacy) Compliance Module

export type ConsentPurpose =
  | "data_ingestion"
  | "experiment_participation"
  | "result_sharing"
  | "analytics"
  | "pdf_export"
  | "pdf_report";

export interface ConsentRecord {
  id: string;
  userId: string;
  purpose: ConsentPurpose;
  grantedAt: string; // ISO timestamp
  expiresAt?: string;
  status: ConsentStatus;
  withdrawalStatus?: "pending" | "granted";
  version: number;
}

export type ConsentStatus = "granted" | "pending" | "withdrawn";

export const CONSENT_DEFAULTS = {
  dataIngestion: "granted" as ConsentStatus,
  experimentParticipation: "pending" as ConsentStatus,
  resultSharing: "pending" as ConsentStatus,
  analytics: "pending" as ConsentStatus,
  pdfExport: "granted" as ConsentStatus,
  pdfReport: "pending" as ConsentStatus,
};

// DPDP Notice content - displayed at onboarding
export const DPDP_NOTICE = {
  title: "Your Data, Your Recovery",
  body:
    "RE:ST collects sleep and behavioral data to provide personalized insights. No data is shared without your consent. You may withdraw consent at any time from Privacy Settings.",
  cta: "I Accept",
  ageGate: "Users must be 18+",
};

// Consent Ledger - persistent storage abstraction
export class ConsentLedger {
  private records: Map<string, ConsentRecord> = new Map();

  recordConsent = (purpose: ConsentPurpose, status: ConsentStatus): ConsentRecord => {
    const id = `consent-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const record: ConsentRecord = {
      id,
      userId: "",
      purpose,
      grantedAt: new Date().toISOString(),
      status,
      version: 1,
    };

    this.records.set(id, record);
    return record;
  };

  getConsent = (purpose: ConsentPurpose): ConsentRecord | undefined => {
    return Array.from(this.records.values()).find((r) => r.purpose === purpose);
  };

  hasActiveConsent = (purpose: ConsentPurpose): boolean => {
    const record = this.getConsent(purpose);
    return record?.status === "granted" && !this.isExpired(record);
  };

  isExpired = (record: ConsentRecord): boolean => {
    if (!record.expiresAt) return false;
    return new Date(record.expiresAt) < new Date();
  };

  withdrawConsent = (purpose: ConsentPurpose): void => {
    const record = this.getConsent(purpose);
    if (record) {
      record.status = "withdrawn";
      record.withdrawalStatus = "granted";
    }
  };

  getAllConsents = (): ConsentRecord[] => {
    return Array.from(this.records.values());
  };
}

// CDSCO (Central Drugs Standard Control Organisation) boundary enforcement
// RE:ST does not provide medical diagnosis - this is a behavioral feedback loop
export const MEDICAL_DISCLAIMER = {
  statement:
    "RE:ST is a behavioral wellness companion, not a medical device. All insights are for self-experimentation only. Consult a healthcare provider for medical concerns.",
  cdscoBoundary: "No diagnostic claims, no treatment recommendations, no CDSCO-regulated content",
};

// Privacy playbook for store listings
export const PRIVACY_PLAYBOOK = {
  dataTypesCollected: [
    "sleep duration & efficiency",
    "resting heart rate",
    "heart rate variability",
    "respiratory rate",
    "user-entered context factors",
    "device sensor data (iOS HealthKit / Android Health Connect)",
  ],
  dataRetention: "Until account deletion request, with 90-day anonymized retention option",
  dataSharing: "No third-party sharing without explicit consent. Aggregated analytics only with user consent.",
  userRights: [
    "Access: View all stored data",
    "Correction: Update personal factors",
    "Portability: Export data (CSV/PDF)",
    "Erasure: Delete account and data",
    "Restriction: Pause data collection",
  ],
};