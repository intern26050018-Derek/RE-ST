import type { RecoverySnapshot, ExperimentVerdict } from "../core/models";

// Freemium pricing tiers
export const PRICING_TIERS = {
  free: {
    name: "Free",
    price: "₹0/year",
    experimentsPerWeek: 1,
    maxStreak: "unlimited",
    features: [
      "Basic sleep tracking",
      "Morning Brief",
      "Sleep Twin",
      "1 experiment/week",
      "CSV export",
    ],
  },
  premium: {
    name: "Premium",
    price: "₹499/year",
    experimentsPerWeek: 3,
    maxStreak: "unlimited",
    features: [
      "All Free features",
      "3 experiments/week",
      "Unlimited context factors",
      "PDF weekly reports",
      "Experiment verdict shares",
      "Recovery Detective",
      "Priority support",
    ],
  },
  lifetime: {
    name: "Lifetime",
    price: "₹999 one-time",
    experimentsPerWeek: "unlimited",
    maxStreak: "unlimited",
    features: [
      "All Premium features",
      "One-time payment",
      "Forever access",
      "Early feature access",
      "Exclusive Twin themes",
    ],
  },
};

// Unit economics validation
export const UNIT_ECONOMICS = {
  // CAC (Customer Acquisition Cost) targets
  cacTarget: 250, // ₹250 per acquired user (organic + micro-influencer)
  // LTV (Lifetime Value) projections
  freeLTV: 120, // ₹120 average free user value (ads, network effect)
  premiumLTV: 800, // ₹800 average premium user value
  lifetimeLTV: 950, // ₹950 average lifetime user value
  // Conversion targets
  freeToPremiumRate: 8, // 8% free → premium conversion
  freeToLifetimeRate: 2, // 2% free → lifetime conversion
};

// Pricing test scenarios
export const PRICING_SCENARIOS = {
  scenarioA: {
    name: "Current₹499/year",
    premiumConversion: 8,
    projectedRevenue₹: 1200000, // 2400 premium users × ₹499
  },
  scenarioB: {
    name: "Intro₹299/year (first 3 months)",
    premiumConversion: 12, // higher conversion at lower price
    projectedRevenue₹: 900000, // 3000 premium users × ₹299
  },
  scenarioC: {
    name: "Lifetime₹999",
    premiumConversion: 2,
    projectedRevenue₹: 500000, // 500 lifetime users × ₹999,
  },
};

// Revenue validation
export const validateRevenue = (
  freeUsers: number,
  premiumConversion: number,
  lifetimeConversion: number
) => {
  const premiumUsers = Math.floor(freeUsers * (premiumConversion / 100));
  const lifetimeUsers = Math.floor(freeUsers * (lifetimeConversion / 100));
  const revenue = premiumUsers * 499 + lifetimeUsers * 999;
  return { premiumUsers, lifetimeUsers, revenue };
};