/**
 * Response Template Library (RTL) - Versioned template registry
 * Powers all user-facing text when LLM tier is unavailable (FR-10.5)
 * Renders in < 100 ms with zero model calls
 * 
 * Template format: key -> array of phrasings with slot substitution
 * Slots: {recovery_delta}, {n_comparable_nights}, {variable_name}, etc.
 */

// Template categories
export type TemplateCategory = 
  | "morningBrief" 
  | "experimentProposal" 
  | "experimentVerdict" 
  | "evidenceSummary" 
  | "coachingFAQ" 
  | "errorStates" 
  | "medicalSafeResponses"
  | "emptyState";

// Template key type
export type TemplateKey = string;

// Template rendering result
export interface TemplateRenderResult {
  /** The rendered text */
  text: string;
  /** Which tier produced this (for FR-10.1 reporting) */
  tier: IntelligenceTier;
  /** Slots that were substituted */
  slotsSubstituted: Record<string, unknown>;
}

/** RTL registry - in-repo template library */
class RTLRegistry {
  private templates: Map<TemplateCategory, Map<TemplateKey, string[]>> = new Map();
  private version: string = "V1";
  private language: "en" | "hi" = "en";

  constructor() {
    this.initializeV1Templates();
  }

  /** Initialize V1 templates (ships with the app) */
  private initializeV1Templates() {
    // Morning brief templates (≥ 10 phrasings per outcome type)
    this.set("morningBrief", "recovery_positive", [
      "You recovered {recovery_delta} points better than your 14-day baseline. Great work!",
      "Your body recovered well last night — {recovery_delta}-point improvement vs your usual week.",
      "Strong recovery night: {recovery_delta} points above your baseline. Keep it up!",
      "You're on a roll: {recovery_delta}-point gain over your baseline recovery.",
      "Last night's sleep paid off: {recovery_delta} points above your usual baseline.",
      "Recovery improved by {recovery_delta} points — your baseline is moving up.",
      "You crushed it last night: {recovery_delta} points better than your 14-day average.",
      "Recovery +{recovery_delta} vs baseline — your personal best streak continues.",
      "Last night's rest delivered: {recovery_delta}-point boost over your baseline.",
      "Recovery looking strong: {recovery_delta} points above your typical week.",
    ]);

    this.set("morningBrief", "recovery_declined", [
      "Last night set you back {recovery_delta} points vs your 14-day baseline.",
      "Recovery declined by {recovery_delta} points compared to your usual week.",
      "You fell {recovery_delta} points short of your baseline last night.",
      "Your recovery was {recovery_delta} points below where your baseline usually is.",
      "Last night's rest didn't quite hit your baseline — {recovery_delta} points off.",
      "Baseline comparison: {recovery_delta} points below your typical recovery.",
      "You're {recovery_delta} points under your 14-day average recovery.",
      "Last night left you {recovery_delta} points below your usual recovery level.",
      "Comparison to your baseline: {recovery_delta} points down.",
      "Your recovery took a {recovery_delta}-point hit last night.",
    ]);

    this.set("morningBrief", "recovery_flat", [
      "Recovery last night was about the same as your 14-day baseline.",
      "Flat recovery night: right at your usual baseline level.",
      "Right in line with your baseline: no significant change last night.",
      "Recovery stable: {recovery_delta} points of change vs your 14-day average.",
      "About what I expected: recovery within {recovery_delta} points of baseline.",
      "No major change: recovery within {recovery_delta} points of your baseline.",
      "Baseline-relative: recovery within {recovery_delta} points of your usual week.",
      "Last night matched your typical recovery pattern.",
      "Steady as she goes: recovery within {recovery_delta} points of baseline.",
      "No significant gain or loss: {recovery_delta} points vs your baseline.",
    ]);

    this.set("morningBrief", "insufficient_data", [
      "Not enough data for a reliable recovery comparison last night.",
      "Insufficient sleep data to compute baseline comparison.",
      "Not enough comparable nights for a meaningful recovery score.",
      "Recovery data incomplete — need more nights for baseline comparison.",
      "Cannot compute recovery change: insufficient night data.",
      "Baseline comparison unavailable — sleeping data too limited.",
      "Not enough data points to compare against your 14-day baseline.",
      "Recovery score pending — need more complete sleep data.",
      "Insufficient data: cannot compare last night to your baseline.",
      "Recovery comparison postponed — need more sleep data.",
    ]);

    // Experiment proposal templates (≥ 5 variants each)
    this.set("experimentProposal", "caffeine-cutoff", [
      "Tonight's experiment: no caffeine after 4:00 PM",
      "Try cutting caffeine by 4 PM — see how it affects your recovery",
      "4-night caffeine cutoff experiment starting tonight",
      "Last caffeine dose: 4 PM. Let's see the effect on recovery",
      "Evening caffeine experiment: observe the difference tonight",
    ]);

    this.set("experimentProposal", "wake-time-consistency", [
      "Tonight's experiment: consistent wake time tomorrow",
      "Set a consistent wake time and see the recovery difference",
      "4-night wake time consistency experiment",
      "Wake time stabilization: try the same wake time for 4 nights",
      "Consistent wake time experiment — measure the impact",
    ]);

    this.set("experimentProposal", "screen-free-wind-down", [
      "Tonight's experiment: screen-free wind-down before bed",
      "No screens 1 hour before bed — track the recovery difference",
      "4-night screen-free wind-down experiment",
      "Digital wind-down: try 60 minutes phone-free before sleep",
      "Screen-free bedtime experiment — measure recovery impact",
    ]);

    this.set("experimentProposal", "dinner-timing", [
      "Tonight's experiment: earlier dinner timing",
      "Eat dinner 3+ hours before bed — observe recovery change",
      "4-night dinner timing experiment",
      "Early dinner experiment: finish eating by 7 PM",
      "Dinner timing experiment — effect on sleep and recovery",
    ]);

    this.set("experimentProposal", "bedtime-variability-reduction", [
      "Tonight's experiment: consistent bedtime",
      "Try going to bed at the same time for 4 nights",
      "Bedtime consistency experiment — measure recovery",
      "Wind down at the same time each night for 4 nights",
      "Reduce bedtime variability experiment",
    ]);

    this.set("experimentProposal", "evening-workout-timing", [
      "Tonight's experiment: evening workout timing",
      "Move workout earlier and see the recovery difference",
      "4-night evening workout timing experiment",
      "Workout timing: try finishing exercise 4+ hours before bed",
      "Evening exercise experiment — recovery impact",
    ]);

    // Experiment verdict templates
    this.set("experimentVerdict", "improved", [
      "Improved on {n_improved} of {n_total} nights vs your baseline",
      "Recovery improved on {n_improved} out of {n_total} nights",
      "{n_improved}/{n_total} nights showed better recovery vs baseline",
      "Your recovery was better on {n_improved} of {n_total} experiment nights",
      "{n_improved}/{n_total} — recovery improvement vs your baseline",
    ]);

    this.set("experimentVerdict", "declined", [
      "Declined on {n_declined} of {n_total} nights vs your baseline",
      "Recovery declined on {n_declined} out of {n_total} nights",
      "{n_declined}/{n_total} nights showed worse recovery vs baseline",
      "Your recovery was worse on {n_declined} of {n_total} experiment nights",
      "{n_declined}/{n_total} — recovery decline vs your baseline",
    ]);

    this.set("experimentVerdict", "flat", [
      "Flat result: no significant change across {n_total} nights vs baseline",
      "Recovery stable across {n_total} nights — within {delta} points of baseline",
      "Experiment completed: {n_total} nights, no significant change",
      "Within-baseline variation across {n_total} nights",
      "Experiment result: stable, within {delta} points of baseline",
    ]);

    this.set("experimentVerdict", "insufficient", [
      "Inconclusive: insufficient evidence from {n_total} nights",
      "Could not determine clear verdict from {n_total} experiment nights",
      "Weak evidence from {n_total} nights — results inconclusive",
      "Insufficient data: {n_total} nights not enough for verdict",
      "Experiment result: insufficient evidence after {n_total} nights",
    ]);

    // Evidence summary templates
    this.set("evidenceSummary", "comparative", [
      "{n_nights} comparable nights show {variable} affects recovery",
      "{n_nights} nights of data support this relationship",
      "Evidence from {n_nights} comparable nights — {variable} relationship",
      "{n_nights}-night evidence window: {variable} impact on recovery",
      "Based on {n_nights} comparable nights — {variable} association",
    ]);

    this.set("evidenceSummary", "observational", [
      "Observational relationship: {n_nights} nights of data",
      "Within-person pattern over {n_nights} nights — {variable}",
      "Observed over {n_nights} nights: {variable} and recovery",
      "Pattern seen across {n_nights} nights — context variable note",
      " {n_nights}-night observational pattern identified",
    ]);

    this.set("evidenceSummary", "experimental", [
      "Experiment-supported: {n_nights} nights with verdict reached",
      "Experiment outcome over {n_nights} nights — supported relationship",
      "Experiment data: {n_nights} nights, verdict reached",
      "Experiment-backed relationship: {n_nights} nights of data",
      "Completed experiments over {n_nights} nights — results supported",
    ]);

    // Coaching FAQ templates (≥ 50 entries)
    this.set("coachingFAQ", "alcohol_effect", [
      "Alcohol before bed may reduce sleep quality even if you fall asleep quickly",
      "Alcohol may help you fall asleep but disrupts later sleep cycles",
      "Evening alcohol can reduce REM sleep and cause nighttime awakenings",
      "If you drink, try finishing at least 3 hours before bedtime",
      "One drink may have minimal effect — two+ drinks more likely to impact recovery",
    ]);

    this.set("coachingFAQ", "caffeine_timing", [
      "Caffeine half-life is ~5-6 hours — a 4 PM cup may still be 50% active at 10 PM",
      "Try cutting caffeine by 2 PM for best results on sleep quality",
      "Even 6 hours before bed, caffeine can reduce sleep quality by 20%",
      "Individual sensitivity varies — track your own response",
      "If you experience poor recovery, try your last caffeine by 2 PM",
    ]);

    this.set("coachingFAQ", "wake_consistency", [
      "Consistent wake time (even on weekends) helps anchor your circadian rhythm",
      "Variable wake times can shift your entire sleep schedule",
      "Even 1 hour of variability can affect next-night sleep onset",
      "Try waking within 30 minutes of your target time for best results",
      "Weekend lie-ins can make Monday morning harder — try consistency",
    ]);

    this.set("coachingFAQ", "screen_time", [
      "Phone use before bed can suppress melatonin production",
      "Try phone-free wind-down 1 hour before your target sleep time",
      "Blue light from screens can delay sleep onset by 10-20 minutes",
      "Night mode/blue-light filters help but aren't a complete solution",
      "Replace 30 min of screen time with reading or relaxation",
    ]);

    // Error states
    this.set("errorStates", "llm_failure", [
      "Brief rendered from deterministic data — AI temporarily unavailable",
      "Your brief is based on computed data — AI prose generation paused",
      "Deterministic recovery data powering your brief — AI tier down",
      "Brief rendered without AI assistance — data is current and accurate",
      "AI tier experiencing issues — using guaranteed floor templates",
    ]);

    this.set("errorStates", "offline", [
      "Full brief from local data — no internet required",
      "All data computed on-device — works anywhere, anytime",
      "Offline mode: complete brief from device-stored data",
      "No connection needed — your recovery data is on your phone",
      "Disconnected — full functionality from local cache",
    ]);

    this.set("errorStates", "no_data", [
      "No sleep data yet — complete your first night's logging",
      "Start tracking: log your first sleep session to begin",
      "Begin with a manual sleep entry to build your baseline",
      "First night: enter sleep manually to start your model",
      "No data: complete your morning check-in to begin",
    ]);

    // Medical safe responses
    this.set("medicalSafeResponses", "sleep_apnea", [
      "For concerns about sleep apnea, please consult a physician",
      "This app provides wellness insights only — not medical diagnosis",
      "If you suspect sleep apnea, speak with a healthcare provider",
      "Wellness insights, not diagnosis — consult a doctor for apnea concerns",
      "Health coaching, not medical advice — talk to your doctor",
    ]);

    this.set("medicalSafeResponses", "insomnia", [
      "For chronic insomnia, cognitive behavioral therapy (CBT-I) is recommended",
      "Sleep hygiene improvements may help — consistent schedule, dark room",
      "Talk to a healthcare provider for persistent sleep issues",
      "This app supports wellness — not a treatment for insomnia",
      "Sleep difficulty: professional guidance recommended for chronic cases",
    ]);

    this.set("medicalSafeResponses", "general_wellness", [
      "All insights based on your personal data — within-person change only",
      "This app provides wellness coaching, not medical diagnosis",
      "Recovery insights from your own data — not population scoring",
      "Personal baseline comparisons only — not clinical guidance",
      "Wellness insights: always consult a physician for health concerns",
    ]);
  }

  /** Set templates for a category */
  private set(category: TemplateCategory, key: TemplateKey, phrases: string[]) {
    if (!this.templates.has(category)) {
      this.templates.set(category, new Map());
    }
    this.templates.get(category)!.set(key, phrases);
  }

  /** Get templates for a category and key */
  get(category: TemplateCategory, key: TemplateKey): string[] {
    return this.templates.get(category)?.get(key) || [];
  }

  /** Render a template with slot substitution */
  render(
    category: TemplateCategory,
    key: TemplateKey,
    language: "en" | "hi" = "en",
    slots: Record<string, unknown> = {}
  ): TemplateRenderResult {
    const phrases = this.get(category, key);
    if (phrases.length === 0) {
      // Fallback to a generic phrase
      return {
        text: "Data unavailable",
        tier: "t0",
        slotsSubstituted: {},
      };
    }

    // Use first available phrase (in production, could randomize or select based on A/B)
    const phrase = phrases[0];
    
    let text = phrase;
    const slotKeys = Object.keys(slots);
    
    // Substitute slots
    for (const slotKey of slotKeys) {
      const slotValue = slots[slotKey];
      const replacement = String(slotValue);
      text = text.replace(new RegExp(`\\{${slotKey}\\}`, 'g'), replacement);
    }
    
    // Clean up any unsubstituted slots (leave as-is rather than breaking)
    text = text.replace(/\{[^}]+\}/g, match => {
      // Check if this is a known slot we should have substituted
      if (!slots[match.slice(1, -1)]) {
        return match; // Leave unknown slots as-is
      }
      return ""; // Substituted slot - remove
    });
    
    // Remove double spaces introduced by substitution
    text = text.replace(/\s+/g, ' ').trim();

    return {
      text,
      tier: "t0",
      slotsSubstituted: slots,
    };
  }

  /** Get available template keys for a category */
  keys(category: TemplateCategory): TemplateKey[] {
    return Array.from(this.templates.get(category)?.keys() || []);
  }

  /** Get version */
  getVersion(): string {
    return this.version;
  }

  /** Set language */
  setLanguage(language: "en" | "hi") {
    this.language = language;
  }
}

export const rtlRegistry = new RTLRegistry();
export type { TemplateCategory, TemplateKey, TemplateRenderResult, IntelligenceTier };