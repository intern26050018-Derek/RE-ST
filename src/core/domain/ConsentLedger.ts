/** Consent ledger entry */
export interface ConsentLedgerEntryFull {
  permission: string;
  action: "granted" | "revoked";
  timestamp: string;
  dataTypes: string[];
}