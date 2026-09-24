# RE:ST — Functional Requirements Document (FRD)

| | |
|---|---|
| **Product** | RE:ST — AI Sleep & Recovery Companion |
| **Document** | FRD, **Final v1.0** (supersedes Draft v0.2) |
| **Status** | Approved for engineering planning |
| **Date** | 22 September 2026 |
| **Derived from** | Founder Blueprint v0.1; Market Intelligence Brief v2 (50-app competitive dataset); founder review feedback (16 incorporation points); research briefs on open-model economics, public sleep datasets, signal-interpretation science, and Indian compliance |
| **Change summary vs v0.2** | Added: Device Hub (§FR-2), session verification (FR-2.5), screen-usage corroboration (FR-12), All-Nighter Mode (FR-9), experiment streaks (FR-8.2), tiered zero-cost AI with template-library fallback (FR-10), DPDP + CDSCO + store compliance and T&C set (§9), signal-interpretation science appendix (Appendix A), phone-sensor tracking pipeline (FR-13 + Appendix C), 5 additional personas (§4), use-case catalog (§6), cost-rated unique-feature pipeline (§14). Revised: data export is CSV + PDF (FR-14.1); premium pricing deferred to post-validation. |

> **Requirement conventions.** IDs `FR-<module>.<n>`, priorities **P0** (MVP), **P1** (first 3 months), **P2** (later). Each of the founder's 16 review points is addressed by at least one requirement; Appendix D maps every point to its requirement.

---

## 1. Purpose & Scope

### 1.1 Purpose

Define the functional requirements for RE:ST: a mobile-first AI sleep and recovery companion whose core promise is:

> **"Don't just track your sleep. Learn how your life changes your recovery."**

RE:ST is a **behavioral feedback loop**, not a measurement dashboard: observe patterns → propose one small intervention → measure the result → learn what works for this individual.

### 1.2 Scope principles (new in v1.0)

1. **Cost-minimal by design.** The product must deliver full core value with zero LLM inference. AI prose generation is an enhancement layer, not a dependency (FR-10).
2. **Trust the data, verify with the user.** Ingested data is cross-checked (screen usage, user confirmation) rather than blindly trusted (FR-2.9, FR-12).
3. **Hardware-agnostic, phone-first.** Any third-party device can connect; the phone alone is always sufficient (FR-2).
4. **Compliance is a launch requirement**, not a follow-up (§9).
5. **Non-medical posture everywhere** — wellness insights and coaching only; no detection/diagnosis claims (NFR-9, §9.2).

### 1.3 In scope

iOS + Android app (Flutter); device hub ingestion (OS health stores + direct integrations); morning check-in and daily context logging; Sleep Twin; nightly experiment engine; Recovery Detective; All-Nighter Mode; tiered AI with template fallback; retention mechanics with experiment streaks; CSV/PDF export; DPDP-compliant consent and privacy flows.

### 1.4 Out of scope

- Medical claims, diagnosis, or treatment of any disorder (including apnea screening) — see §9.2 for the exact CDSCO boundary.
- Social/leaderboard features; engagement dark patterns.
- Web app; family/parental-control products.

---

## 2. Product Overview

### 2.1 The core loop

```text
Measure → Explain → Hypothesize → Run 1 small experiment → Compare → Learn → Adapt
```

### 2.2 Competitive context (why these requirements)

From the market brief: every incumbent with generative-AI coaching (WHOOP, Oura, Sleep Cycle Luma, Bevel, Eight Sleep) only *explains data* — none runs and evaluates interventions on the user's own data. Validation science shows consumer sleep staging is only fair-to-moderate (κ 0.21–0.59 vs PSG), so RE:ST frames everything as *within-person change vs the user's own baseline*. And because AI coaching is collapsing toward commodity pricing, RE:ST monetizes the *learning system*, not chat.

---

## 3. Definitions

| Term | Definition |
|---|---|
| **Sleep Session** | A night's/nap's sleep data, ingested from a health platform or device, **and optionally verified by the user** |
| **Verified session** | A session the user confirmed or edited in the morning card (FR-2.9); carries higher weight in the Sleep Twin |
| **DailyContext** | Logged lifestyle variables (caffeine, exercise, stress, meals, screens, travel, illness-feel) |
| **Recovery Snapshot** | Daily computed summary: recovery score, sleep metrics, subjective rating, passive vitals |
| **Sleep Twin** | The user's personal pattern model: statistical relationships between context variables and recovery, each with sample size, date range, strength, confidence band, observational/experimental status |
| **Experiment** | A single micro-intervention proposed by the system and optionally accepted, run over ≥1 night |
| **Experiment Outcome** | Measured comparison of experiment nights vs matched baseline nights |
| **Morning Brief** | Daily home-screen answer to: How did I recover? What likely changed? What should I do today? |
| **All-Nighter Mode** | A planned awake-night with pre/post guidance (FR-9) |
| **RTL** | Response Template Library — the versioned "bag of words" that powers all user-facing text when the LLM tier is unavailable (FR-10.5) |
| **Comparable nights** | Nights matched on weekday/weekend, recency, and context filters for within-person comparisons |

---

## 4. Personas

| # | Persona | Profile | Primary job-to-be-done |
|---|---|---|---|
| 1 | **Aarav, 27 — Irregular Professional** | Young professional, irregular schedule, mid-range smartwatch | "Tell me what is affecting my recovery, not just what happened last night" |
| 2 | **Meera, 31 — Fitness Tracker Owner** | Owns a smartwatch; generates data nothing intelligent consumes | "Give me one realistic thing to try tonight — and show me if it worked" |
| 3 | **Rohit, 38 — Shift Worker** | Night shifts, rotating schedule | "Help me understand my patterns without 20 charts" |
| 4 | **Priya, 20 — Student** | Hostel life, exam-season all-nighters, late-night phone use | "I have to pull an all-nighter — help me do the least damage and recover fast" |
| 5 | **Ananya, 29 — New Parent** | 4-month-old baby, fragmented sleep, unpredictable naps | "My sleep is chaos — help me bank recovery where I can and tell me what actually helps on good days" |
| 6 | **Arjun, 33 — Frequent Traveler** | Consultant, 2 flights/week, timezone whiplash | "Tell me how to time my sleep and light around this trip" |
| 7 | **Dr. Kavita, 52 — Perimenopausal Professional** | Night sweats, 3 a.m. awakenings, temperature swings | "Help me figure out what makes my nights worse — and don't tell me things I already know" |
| 8 | **Sana, 24 — Night-Owl Creator** | Delayed schedule, edits videos till 3 a.m., sleeps till 11 | "My rhythm is late, not broken — help me make it consistent within my reality" |

Persona coverage rule: every P0 feature must serve at least 3 personas; features serving only one persona are P2 by default.

---

## 5. Use-Case Catalog (what the product actually does for people)

| # | Scenario | Persona | Features engaged | Priority |
|---|---|---|---|---|
| UC-1 | "Why am I so drained this week?" | 1, 2, 7 | Recovery Detective (FR-7) with evidence | P1 |
| UC-2 | "I think late coffee hurts me — prove it" | 1, 2, 8 | Experiment engine: caffeine-cutoff experiment (FR-6), Twin relationship (FR-5) | P0 |
| UC-3 | "I have exams — I must stay up tonight" | 4 | All-Nighter Mode: pre-night planning, next-day nap strategy, recovery plan (FR-9.1–9.4) | P1 |
| UC-4 | "The baby slept, why didn't I?" | 5 | Fragmented-sleep-aware scoring, nap logging (FR-2), context logging | P1 |
| UC-5 | "My watch says I slept 8h but I feel terrible" | 1, 2, 7 | Session verification (FR-2.9) + screen-usage corroboration (FR-12) + subjective rating weighting (FR-3.5) | P0 |
| UC-6 | "Flying to Berlin Sunday — when do I sleep?" | 6 | Travel Mode: light/wake scheduling guidance, jet-lag adaptation plan (FR-9.5) | P2 |
| UC-7 | "Am I getting sick?" (pre-emptive self-check) | 2, 6, 7 | Personal-baseline drift view — temperature/RHR/RR deviation shown as "worth watching" signals, explicitly non-diagnostic (FR-5.8, Appendix A) | P2 |
| UC-8 | "Which matters more for me: earlier dinner or no late coffee?" | 1, 2, 8 | Experiment comparison ("duel") from experiment history (FR-6.9) | P2 |
| UC-9 | "Keep me accountable to a consistent bedtime" | 2, 8 | Experiment streaks (FR-8.2), wake-window experiments | P0 |
| UC-10 | "I drank last night — what happened to my body?" | 1, 6, 8 | Context-tagged morning brief with physiological explanation (Appendix A: alcohol's dose-response effect on RHR/HRV) | P1 |
| UC-11 | "My data looks wrong / I use my phone in bed with sleep mode on" | 1, 4, 8 | Screen-usage conflict detection → session correction prompt (FR-12.1–12.3) | P0 (Android) / P1 (iOS) |
| UC-12 | "I'll be off the grid (no watch)" | 3, 5 | Manual-entry mode with full loop support (FR-1.3) | P0 |
| UC-13 | "Show my doctor something useful" | 7 | PDF export of trends (FR-14.1) | P1 |
| UC-14 | New device bought (Oura/Noise/Garmin) | 2 | Device Hub: connect, see exactly what RE:ST reads from it and what it improves (FR-2.10–2.12) | P1 |

---

## 6. Functional Requirements

### FR-1 — Onboarding & Permissions

| ID | Requirement | Priority |
|---|---|---|
| FR-1.1 | Onboarding completes in ≤ 3 screens: (1) promise & privacy posture, (2) health-data connection, (3) first morning brief preview | P0 |
| FR-1.2 | Requests only health permissions used, with plain-language "why" for each (HealthKit: sleep analysis, HR, HRV, respiratory rate; Health Connect: sleep sessions/stages, heart rate, SpO2) — aligned with store policies (§9.3) | P0 |
| FR-1.3 | Full manual-entry mode with zero connected data; the complete loop (brief, experiment, outcome) must work manually | P0 |
| FR-1.4 | Baseline bootstrapping: ingest up to 90 days of history on first launch; show baseline immediately (Health Connect note: default reads are capped at 30 days without the extra history permission — request it, and degrade gracefully to 30) | P0 |
| FR-1.5 | No-history users enter "Explorer mode" with a communicated ~7-night learning horizon | P0 |
| FR-1.6 | Language selection: English + Hindi at launch (P0); other Indian languages via device locale (P1) | P0/P1 |
| FR-1.7 | Age gate: 16+ (18+ default), with verifiable parental consent flow required for under-18 accounts before health data collection (DPDP §9 — see FR-15.6) | P1 |

### FR-2 — Data Ingestion, Session Verification & Device Hub

| ID | Requirement | Priority |
|---|---|---|
| FR-2.1 | Ingest sleep sessions + passive vitals (RHR, HRV, respiratory rate, SpO2 where available) from HealthKit and Health Connect, on app open and via background schedule where permitted | P0 |
| FR-2.2 | Normalize heterogeneous sources into the internal `SleepSession` schema with per-field availability and source-confidence flags; never discard a partially-complete session | P0 |
| FR-2.3 | Manual sleep entry in ≤ 4 taps, with sanity checks (duration > 24 h rejected) | P0 |
| FR-2.4 | Conflict resolution: user-designated source priority; default manual > watch > phone; a night with two sources is stored as one merged session with source attribution | P1 |
| **FR-2.5 — Session verification (new)** | Every ingested session is presented in the morning card for user confirmation: "Apple Watch says 11:42–7:10 — looks right?" with one-tap **Confirm**, **Edit**, or **Not quite** (opens correction). Sessions carry a `verified` flag; unverified sessions still count but with reduced weight in the Twin (FR-5) and a visible "unverified" marker in evidence views | P0 |
| FR-2.6 | Editing of imported sessions limited to past 7 days (history-rewriting guard) | P1 |
| FR-2.7 | Data-quality view: per-field availability by device, and which insights depend on which fields | P1 |
| **FR-2.8 — Device Hub: any third-party device (new)** | A "Connected Devices" screen where the user can connect any third-party wearable/health source. V1: anything that writes to HealthKit / Health Connect (covers Apple Watch, Galaxy Watch, Fitbit, Garmin, Noise, boAt, Amazfit, Mi, Oura-via-health-store, etc.) is connectable by granting the relevant read permission. V1.5: direct vendor-cloud APIs (Oura, WHOOP, Garmin, Withings) for data the OS stores don't carry | P0 (V1) / P1 (V1.5) |
| **FR-2.9 — Source-value display (new)** | For each connected source, the Device Hub shows exactly: (a) what data RE:ST receives, (b) what RE:ST uses it for ("HRV → recovery baseline and experiment comparison"), (c) what it does NOT do with it ("we never sell or advertise against health data" — store-policy aligned), (d) a reliability/coverage indicator | P0 |
| FR-2.10 | Adding a new source triggers a re-ingestion of its available history and updates the Twin coverage estimate ("with RHR now available, recovery scoring improves") | P1 |
| FR-2.11 | Device Hub supports disconnect at any time; historical data from that source remains but is marked as from a disconnected source | P0 |

**Acceptance (FR-2.5):** Given a session the watch recorded as 23:42–07:10 but the user was on the phone until 01:00 (screen-usage conflict, FR-12), then the morning card shows the conflict inline ("phone was active until 01:00 — was this your bedtime?") and any edit stores the corrected session as `verified: true`.

### FR-3 — Morning Check-in & Daily Brief

| ID | Requirement | Priority |
|---|---|---|
| FR-3.1 | Home screen answers in < 10 seconds of reading: (1) How did I recover? (2) What likely changed? (3) What should I do today? — without scrolling | P0 |
| FR-3.2 | Recovery rating derived from **within-person change vs the user's 14-day baseline**, never absolute population scoring | P0 |
| FR-3.3 | Up to 3 likely-driver bullets, each tappable through to evidence | P0 |
| FR-3.4 | One recommendation for today (continuation or adjustment); never a checklist of > 3 items | P0 |
| FR-3.5 | Subjective check-in ≤ 3 taps (perceived recovery 1–5, optional mood tag); the subjective rating is a first-class Twin signal — divergences between subjective and objective recovery are themselves insights ("your body recovered well but you feel drained — check stress/alcohol context") | P0 |
| FR-3.6 | Missing overnight data → fallback prompt and manual entry (never a silent fake score) | P0 |
| FR-3.7 | All brief facts are computed deterministically; any LLM involvement is prose-only (FR-10.2) | P0 |

### FR-4 — Daily Context Logging

| ID | Requirement | Priority |
|---|---|---|
| FR-4.1 | One-tap logging: caffeine (morning/afternoon/after-4pm buckets), exercise (light/moderate/hard + evening flag), stress, late meal, travel, screen wind-down, alcohol (optional, off by default), **felt-unwell** flag | P0 |
| FR-4.2 | Total context input ≤ 30 seconds/day for a compliant user | P0 |
| FR-4.3 | Missed days never block the loop; coverage is marked honestly in evidence | P0 |
| FR-4.4 | Optional free-text note per day (≤ 90 chars) | P1 |
| FR-4.5 | The **felt-unwell** flag suppresses that night's contribution to baseline comparisons (sick nights are not valid baseline or experiment data) | P0 |

### FR-5 — Sleep Twin (Personal Pattern Model)

| ID | Requirement | Priority |
|---|---|---|
| FR-5.1 | Maintains pairwise relationships between context variables and recovery outcomes in the user's own data | P0 |
| FR-5.2 | Every relationship carries sample size, date range, strength, confidence band, observational/experimental flag — surfaced to the user | P0 |
| FR-5.3 | Minimum evidence threshold: no relationship displayed below 5 comparable nights (tunable) | P0 |
| FR-5.4 | Nightly incremental update; the user can see what changed in their model | P1 |
| FR-5.5 | Weekday/weekend and travel-aware comparable-night matching | P1 |
| FR-5.6 | Twin transparency view: "What your model knows about you" | P1 |
| FR-5.7 | Correlation never presented as causation; causal language reserved for completed experiments | P0 |
| **FR-5.8 — Signal interpretation map (new)** | The Twin's physiological feature interpretations follow the evidence base in **Appendix A** (e.g. RHR elevation → stress/alcohol/illness-feel hypotheses; temperature drift → confound-aware "worth watching" framing; respiratory-rate deviation → non-diagnostic prompt). All interpretations are: (a) within-person deviations only, (b) phrased as hypotheses to test via experiments, (c) never diagnostic | P0 |
| FR-5.9 | Fragmented-sleep handling: nights with ≥ 3 wake segments (new parents, insomnia) use a fragmentation-adjusted scoring mode rather than penalizing total duration alone | P1 |

### FR-6 — Nightly Experiment Engine (signature feature)

| ID | Requirement | Priority |
|---|---|---|
| FR-6.1 | Each evening, the system proposes **exactly one** micro-experiment from the library (V1 set of 6: caffeine cutoff, wake-time consistency, screen-free wind-down, dinner timing, bedtime-variability reduction, evening-workout timing) | P0 |
| FR-6.2 | Experiments are tiny, measurable, reversible, personalized — selected from the Twin's strongest current hypothesis, not rotation | P0 |
| FR-6.3 | Accept / skip / swap; skipping is never guilt-tripped | P0 |
| FR-6.4 | Default duration 4 nights (tunable per type); outcomes compared against matched baseline nights | P0 |
| FR-6.5 | Verdict in plain language: "improved on 3 of 4 nights vs your baseline", with evidence one tap away | P0 |
| FR-6.6 | Completed experiments write back to the Twin as experimentally-supported relationships | P0 |
| FR-6.7 | Browsable experiment history ("Your toolbox") | P1 |
| FR-6.8 | No re-proposal of an adequately-powered intervention within 60 days absent context change | P1 |
| **FR-6.9 — Experiment duel (new)** | When ≥ 2 experiment types have completed at adequate power, the user can request a head-to-head comparison: "For you, caffeine cutoff (+6 pts avg) beat earlier dinner (+2 pts, weak evidence)" — deterministic statistics, RTL/LLM phrasing | P2 |

### FR-7 — Recovery Detective

| ID | Requirement | Priority |
|---|---|---|
| FR-7.1 | Weekly and on-demand investigation: top 1–3 contributing signals ranked by evidence, most plausible contributor highlighted | P1 |
| FR-7.2 | Format: top signals → most plausible contributor → evidence → next experiment | P1 |
| FR-7.3 | Every claim tappable to underlying nights; no black-box statements | P1 |
| FR-7.4 | Must be able to say "we don't know yet" — honesty is a designed state | P1 |

### FR-8 — Progress Mechanics, Streaks & Reveals

| ID | Requirement | Priority |
|---|---|---|
| FR-8.1 | Four model-learning levels: Explorer → Pattern → Experimenter → Optimizer, advanced by data coverage and experiment completion, **not app opens** | P1 |
| **FR-8.2 — Experiment streaks (new)** | Streaks are earned by **completed experiments**, not consecutive days: each finished experiment (verdict reached) extends the streak; streaks display as "N experiments completed in a row" and level up (5 = "Lab Rat", 10 = "Self-Scientist", 25 = "Sleep Optimizer"). A skipped experiment **pauses** the streak rather than breaking it (one free skip per week without pause). No red/broken-streak anxiety UI, no guilt copy on pause — per the blueprint's no-dark-pattern principle, the streak celebrates learning, not compulsion | P1 |
| FR-8.3 | Weekly reveal "Your Week in Recovery": best/worst night, strongest factor, most successful experiment, one unresolved question, next week's proposal | P1 |
| FR-8.4 | Monthly Personal Sleep Report (premium): trends, stable variables, strongest associations, experiment history, unresolved factors, next-month focus | P2 |
| FR-8.5 | Streak history is browsable and exportable; users can hide streaks entirely from settings | P1 |

### FR-9 — Special Modes (new)

| ID | Requirement | Priority |
|---|---|---|
| **FR-9.1 — All-Nighter Mode (planned awake night)** | User declares "I need to stay up tonight" (exam, deadline, travel). The app provides a **harm-minimization plan**: (a) pre-night advice — bank sleep in advance (strategic naps 90-min cycles), set a caffeine schedule with last-dose timing, plan 20-min micro-nap windows; (b) safety lines — explicit "do not drive tomorrow if you've been awake 20+ hours" warning, drowsy-driving caution; (c) next-day recovery plan — best nap window vs the user's circadian pattern, lighter-activity advice, earlier wind-down | P1 |
| FR-9.2 | All-Nighter Mode sets expectations honestly: predicted next-day recovery dip from the user's own history of short-sleep nights (if available) rather than generic claims | P1 |
| FR-9.3 | Post-all-nighter morning flow: a dedicated recovery protocol screen, and the following night is **excluded from baseline calculations** (it is an intervention night, like an experiment) | P1 |
| FR-9.4 | Frequency guard: if All-Nighter Mode is used > 2×/month, the app surfaces a gentle, non-judgmental escalation screen ("this is the 3rd this month — want to look at what's forcing these?") and offers daytime-sleep alternatives; no shaming copy | P1 |
| **FR-9.5 — Travel Mode** | Trip declaration (origin/destination/timeframe) produces light/wake/sleep timing guidance for the first 3 days post-arrival and tags affected nights so they are excluded from baseline (deterministic circadian math, no LLM needed) | P2 |

### FR-10 — Intelligence Layer: Tiered, Near-Zero-Cost AI with Graceful Degradation (rewritten)

**Design principle (per founder review):** the product must work **fully without any LLM**. The LLM is a phrasing upgrade, not a dependency.

| ID | Requirement | Priority |
|---|---|---|
| **FR-10.1 — Four-tier intelligence cascade** | All user-facing intelligence flows through, in order: **Tier 0 — Deterministic**: rules + statistics computed in app code (always available, offline, ~ms). **Tier 1 — RTL**: versioned Response Template Library (see FR-10.5). **Tier 2 — On-device LLM**: quantized open-weight model (Qwen3-1.7B-class, ~1.3 GB runtime at 4-bit; runs on 4–6 GB RAM devices) for prose generation and chat. **Tier 3 — Server LLM**: only for devices that cannot run Tier 2, only when the user is online, with zero-retention policy. Every screen states which tier produced its text | P0 (architecture) |
| FR-10.2 | Strict separation: deterministic code computes all metrics; the statistical layer detects patterns; **the LLM only writes prose around pre-computed facts** — it never performs health math | P0 |
| FR-10.3 | **Minimal LLM task list** (the only permitted LLM uses, keeping inference within free/self-hosted tiers): (a) morning-brief prose variants, (b) experiment explanation phrasing, (c) chat coaching grounded in retrieved statistical-layer facts, (d) monthly-report narrative. Nothing else calls an LLM | P0 |
| FR-10.4 | **Graceful degradation** (circuit-breaker cascade): on-device LLM failure ≥ 3 consecutive calls → automatic fallthrough to RTL with **no user-visible error**; server tier unreachable → RTL; RTL is the guaranteed floor for 100% of features. Transitions log to telemetry, never interrupt UX; fallback text is never presented as AI output | P0 |
| **FR-10.5 — Response Template Library (RTL, the "bag of words")** | A versioned, in-repo library of pre-authored templates covering every user-facing text surface: morning brief variants (≥ 10 phrasings per outcome type: improved/declined/flat/insufficient-data), experiment proposals and verdicts (≥ 5 variants each), evidence summaries, coaching FAQ answers (≥ 50 entries), error and degradation states, medical-topic safe responses, and empty-state copy. Templates use slot substitution from deterministic metrics (e.g. `{recovery_delta}`, `{n_comparable_nights}`) and render in < 100 ms with zero model calls. RTL ships with V1 and is a first-class code artifact — reviewed, localized (EN/HI), and versioned like any module | P0 |
| FR-10.6 | Model choice per license economics: primary on-device model must be Apache-2.0/MIT class (Qwen3 1.7B/4B — Apache 2.0; Phi-3.5-mini — MIT). Llama 3.2 (community license, 700M-MAU carve-out, "Built with Llama" attribution) and Gemma (Gemma Terms, pass-through restrictions) are acceptable fallbacks pending legal review; no paid-API dependency for any core feature | P0 |
| FR-10.7 | Model updates ship app-side (side-loaded model bundle or optional download), never silently; users can disable Tier 2/3 entirely from settings ("Basic mode" = Tiers 0–1 only) | P1 |
| FR-10.8 | **Training/fine-tuning program** (cost-minimal): fine-tune the small model with QLoRA via Unsloth on free Colab/Kaggle GPU tiers (an 8B QLoRA run completes in minutes on a free T4; a 1–4B run is trivially within free quotas; realistic cash cost ≈ $0–50 for the whole experimentation program). Training data: (a) template-parallel corpora generated from our own RTL (phrasing diversity), (b) public datasets per FR-16. See §13 for the full cost model | P1 |

**Acceptance (FR-10.4):** Given the on-device model crashes and the device is offline, when the user opens the morning brief, then the brief renders fully from Tier 0/1 within normal performance budget and displays no error state.

### FR-11 — Evidence & Accuracy Transparency

| ID | Requirement | Priority |
|---|---|---|
| FR-11.1 | All scores framed relative to the user's own baseline; absolute stage durations appear only as raw source data, never interpreted as good/bad | P0 |
| FR-11.2 | Every insight displays sample size, date range, confidence, observational/experimental status | P0 |
| FR-11.3 | Unreliable-night suppression: missing HR, suspected watch-not-worn, or unverified + screen-conflicted sessions are flagged or excluded from insight generation | P1 |
| FR-11.4 | "About the science" page: plain-language explanation of what consumer sleep data can and cannot tell (orthosomnia-safety feature) | P1 |

### FR-12 — Screen-Usage Corroboration (new)

**Purpose:** watch/phone data can be wrong (people use phones in bed with sleep mode on; watches misclassify still wakefulness). Phone-usage data is an independent second witness.

| ID | Requirement | Priority |
|---|---|---|
| FR-12.1 | **Android**: with user-granted Usage Access (special permission via Settings), periodically sample UsageStatsManager buckets to build a night-time phone-activity profile (last-unlock time, first-unlock time, overnight active minutes). Conflicts — "device says asleep, phone active" — surface in the morning session-verification card (FR-2.5) as a correction prompt | P0 (Android) |
| FR-12.2 | **iOS**: the Screen Time API (FamilyControls/DeviceActivity) requires a special entitlement, multi-week Apple review, and returns only opaque app tokens — **per-app usage cannot be exported into analytics**. Therefore iOS V1 uses: (a) a manual "I was on my phone" morning toggle, (b) optional DeviceActivity-based bedtime wind-down scheduling (shields) as an experiment type (P2, entitlement-dependent). No iOS feature may depend on unavailable usage data | P1 (toggle) / P2 (shields) |
| FR-12.3 | Screen-activity data is used **only** for session corroboration and wind-down experiments; never displayed as judgment ("you scrolled 2 hours" → instead "phone was active late; want to try a wind-down experiment?") | P0 |
| FR-12.4 | Usage data never leaves the device and is never merged into any advertising/analytics pipeline (store-policy and DPDP aligned) | P0 |

### FR-13 — Phone-Sensor Sleep Tracking (Microphone/Sonar) — V2 Pipeline (new)

**Decision:** out of V1 (validation burden + incumbents' data moat — Sleep Cycle alone claims 3B+ analyzed nights), **in scope for V2 with a defined pipeline** so engineering can evaluate in parallel.

| ID | Requirement | Priority |
|---|---|---|
| FR-13.1 | V2 sonar pipeline (Android first): (1) **Capture** — inaudible 18–22 kHz tone from phone speaker, reflections captured by mic (Sleep as Android / Sleepwave precedent); (2) **Preprocess** — band-pass, motion artifact filtering; (3) **Feature extraction** — breathing rate and chest-motion features from reflected signal; (4) **Inference** — sleep/wake + coarse phase classifier (trained per FR-16 on Sleep-EDF/DOD with radar/PPG proxy tasks); (5) **Fusion** — combined with ingested watch data where available, with sonar as the fallback source; (6) **Explain** — via the standard intelligence cascade | P2 |
| FR-13.2 | Audio-classification track (both OSes): on-device snore/cough/sleep-talk detection from mic using OS sound-classifier primitives where available (iOS sound classifier; Android SoundTrigger), producing context features only (no raw audio storage, no cloud upload) | P2 |
| FR-13.3 | Hard constraints to respect in design: overnight battery (< 4%/night), iOS background-audio session limitations, explicit in-app disclosure that the microphone is active, and all audio processed on-device and discarded | P2 |
| FR-13.4 | A written feasibility gate before V2 commitment: bench validation of sonar wake-detection ≥ 90% vs ingested watch data on ≥ 20 internal nights before any user-facing rollout | P2 |

### FR-14 — Data, Privacy & Account Management

| ID | Requirement | Priority |
|---|---|---|
| **FR-14.1 — Export as CSV + PDF (revised)** | On-demand export: (a) **PDF** — human-readable summary report (trends, experiments, Twin findings, designed to be shareable with a doctor/coach, per UC-13); (b) **CSV** — complete raw data export (sessions, context, snapshots, experiments, outcomes) as a zip of per-entity files for the user's own analysis or migration to another app. JSON export is internal/debug only, not a user-facing surface | P0 |
| FR-14.2 | Account deletion (all health data) completes in-app; propagates to backups within 30 days | P0 |
| FR-14.3 | No ads, no data sale, no third-party analytics SDKs receiving health-adjacent events; health data never used for advertising or marketing (Apple 5.1.1 / Play policy aligned — §9.3) | P0 |
| FR-14.4 | Local-first storage: raw health data stays on-device; the server stores only what enabled features require, with minimization enforced at API-schema level | P1 |
| FR-14.5 | Consent ledger: readable, exportable log of every permission granted/revoked with timestamps (DPDP evidence trail) | P1 |

### FR-15 — Compliance Features (new; obligations detailed in §9)

| ID | Requirement | Priority |
|---|---|---|
| FR-15.1 | DPDP-compliant notice at onboarding: standalone, plain-language, itemized by data type and purpose, with one-tap consent withdrawal as easy as consent (Rule 3) | P0 |
| FR-15.2 | Consent artefacts stored and exportable (per FR-14.5); ready for integration with a registered Consent Manager when the ecosystem goes live (~Nov 2026) | P1 |
| FR-15.3 | Breach playbook: user notification (nature, extent, timing, mitigation, contact), Board intimation without delay + detailed report within 72 h, CERT-In 6-hour parallel reporting — documented, rehearsed, with on-call ownership | P0 (process) |
| FR-15.4 | Security safeguards per Rule 5: encryption at rest and in transit, access controls, processing logs retained ≥ 1 year | P0 |
| FR-15.5 | Grievance officer contact published in-app; response SLA tracked (published, ≤ 90 days; internal target 14 days) | P1 |
| FR-15.6 | Children's data: no behavioral-advertising risk by design (no ads at all); if under-18 use is supported, verifiable parental consent gate before health-data collection | P1 |
| FR-15.7 | All health-data uses match the store declarations: App Store privacy nutrition label and Play Console health-apps declaration are generated from the same internal data-use register (single source of truth) to prevent drift | P1 |

### FR-16 — Internal Calibration Library (new)

| ID | Requirement | Priority |
|---|---|---|
| FR-16.1 | RE:ST's statistical layer is calibrated and regression-tested against **publicly available, de-identified research sleep datasets** (commercially usable: Sleep-EDF Expanded — ODbL; DOD-H/DOD-O — MIT; Walch Apple Watch dataset and BIDSleep — ODbL; MIT-BIH — ODbL; gated if needed: SHHS PhysioNet subset — ODbL, MESA via commercial tier). Purpose: sanity-check scoring logic, sleep/wake detection benchmarks, and experiment-evaluation statistics | P1 |
| FR-16.2 | These datasets are used **internally for calibration and validation only**: no user data is mixed in, no user data enters any training set, and no marketing claims clinical validation ("as accurate as a sleep lab") may derive from this work — claims discipline is enforced at copy review (NFR-9) | P0 |
| FR-16.3 | Data-source transparency: the privacy policy maintains an accurate, plain-language description of internal data practices (as DPDP Rule 3 and store policies require); product marketing is under no obligation to feature internal calibration methods — but the privacy policy must never contradict actual practice | P0 |

### FR-17 — Notifications

| ID | Requirement | Priority |
|---|---|---|
| FR-17.1 | Evening experiment proposal at user-chosen time (default 20:00), ≤ 1/day | P0 |
| FR-17.2 | Morning brief availability (opt-in, default off) | P1 |
| FR-17.3 | Weekly reveal, ≤ 1/week | P1 |
| FR-17.4 | Hard budget: max 1/day, 2/week non-critical; quiet hours respected | P0 |

---

## 7. Non-Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| NFR-1 | Morning Brief from local cache < 2 s on 2022-class mid-range Android | P0 |
| NFR-2 | Cold start < 5 s on mid-range Android | P0 |
| NFR-3 | Nightly Twin update: on-device < 10 s for 90 days of data | P1 |
| NFR-4 | Background ingestion ≤ 1%/day battery impact; Tier-2 on-device LLM inference is opt-in at first use with a one-time ~1.3 GB download | P0 |
| NFR-5 | Offline-first: everything except server-fallback chat renders fully offline | P0 |
| NFR-6 | Privacy: on-device inference preference; zero-retention server inference otherwise; no health data in ads/analytics; accurate store privacy labels (FR-15.7) | P0 |
| NFR-7 | Accessibility: dynamic type, screen-reader labels, WCAG 2.1 AA contrast | P1 |
| NFR-8 | Localization: externalized strings; EN + Hindi at launch; ₹-first pricing display in India | P0 |
| NFR-9 | **Non-medical posture**: no detection/diagnosis/treatment claims in any UI, notification, store listing, or marketing; apnea/chronic-insomnia topics route to a vetted "talk to a doctor" flow; claims discipline reviewed pre-release (CDSCO boundary — §9.2) | P0 |
| NFR-10 | Orthosomnia-safe design: notification budget, no judgment colors on raw stage data, designed "we don't know yet" states | P1 |
| NFR-11 | Security: TLS everywhere, encryption at rest, no credentials in code, OWASP MASVS review pre-launch | P0 |
| NFR-12 | Scale: 100K MAU without re-architecture; server tier optional-by-design (the architecture must survive with zero servers beyond auth/telemetry) | P1 |
| NFR-13 | RTL rendering budget: any template composes in < 100 ms; RTL covers 100% of user-facing surfaces even with all AI tiers disabled | P0 |

---

## 8. Data Model (V1)

Inherited from blueprint §8, extended for v1.0 requirements (new/changed fields **bold**):

```text
User
 ├── Profile (**age_gate_status**), Preferences, Consent (→ ConsentLedger)
 ├── DeviceConnection (source type, **vendor, priority, health-store vs direct-API,
 │                     last_sync, coverage_fields[], reliability_score**)
 ├── SleepSession (blueprint §8.1 + source_confidence, data_quality_flag,
 │                 **verified: {unconfirmed|confirmed|user_edited},
 │                 screen_conflict: {none|suspected|confirmed},
 │                 special_context: {normal|all_nighter|travel|sick|fragmented}**)
 ├── ScreenActivityProfile (per-night, on-device only: last_unlock, first_unlock,
 │                          overnight_active_minutes, source: {usage_stats|manual})
 ├── DailyContext (blueprint §8.2 + free_text_note, **felt_unwell_flag,
 │                 alcohol_optional, all_nighter_declared**)
 ├── RecoverySnapshot (blueprint §8.3 + subjective_recovery_rating, **tier_that_rendered**)
 ├── PersonalFactor (Sleep Twin relationships: variable pair, direction, strength,
 │                   confidence_band, n_nights, date_range,
 │                   evidence_type ∈ {observational, experimental}, status,
 │                   **excluded_nights_refs[]** — sick/travel/all-nighter exclusions)
 ├── Experiment (type, hypothesis_ref, start_date, nights_planned,
 │              status ∈ {proposed, active, completed, declined}, **streak_eligible**)
 ├── ExperimentOutcome (nights_better/equal/worse, matched_baseline_ref, verdict,
 │                     twin_update_ref, **duel_refs[]**)
 ├── ExperimentStreak (current_count, best_count, **paused: {since, free_skips_left}**)
 ├── Insight (generated_at, evidence_refs[], **render_tier ∈ {t0, rtl, device_llm, server_llm}**,
 │            suppression_reason?)
 └── AIConversation (transcript_ref, grounding_refs[], retention=0, **render_tier**)
```

RTL is a code artifact (versioned template registry), not a user table.

---

## 9. Compliance & Legal

### 9.1 DPDP Act 2023 + DPDP Rules 2025 (India — primary regime)

Rules notified 14 November 2025 with staggered commencement: Rules 1, 2, 17–21 immediate; Consent Manager registration after ~12 months (Nov 2026); core obligations (notice, security, breach, retention, SDF duties) after ~18 months (May 2027). RE:ST builds to the full standard at launch (cheaper than retrofitting):

| Obligation | Requirement in RE:ST |
|---|---|
| Notice (Rule 3) | Standalone, plain-language, itemized by data type + purpose, with links to withdraw consent as easily as it was given — FR-15.1 |
| Consent artefacts | Consent ledger, exportable (FR-14.5); Consent Manager integration when ecosystem live (FR-15.2) |
| Breach notification (Rule 7) | User notice without delay + Board intimation + detailed report within 72 h; CERT-In 6-hour reporting in parallel — FR-15.3 |
| Security safeguards (Rules 5/6) | Encryption, access control, logs ≥ 1 year — FR-15.4, NFR-11 |
| Grievance redressal | Published officer + SLA ≤ 90 days (internal target 14) — FR-15.5 |
| Penalties exposure | Up to ₹250 crore (security), ₹200 crore (breach-notification/children's data) — treated as board-level risk, see §16 |
| Cross-border | No blanket localization in the Act (negative-list model); localization applies only if designated a Significant Data Fiduciary (not expected at our scale for years) — architecture keeps SDF-readiness cheap by design (local-first, FR-14.4) |
| Children's data (s.9) | Verifiable parental consent if under-18 use is enabled; no behavioral monitoring — FR-15.6, age gate FR-1.7 |

### 9.2 CDSCO medical-device boundary (India)

Under MDR 2017 as extended to software and CDSCO's Medical Device Software guidance (2026), the line is **intended use**: general wellness / lifestyle / fitness-tracking software is excluded; software that measures physiological values *for screening, diagnosis, monitoring, alerting, or management of a disease* is regulated. "Sleep quality insights and coaching" stays outside MDR; "detects sleep apnea" or "alerts you to illness" crosses into regulated territory.

**Product rule:** RE:ST presents physiological deviations as *personal-baseline signals worth watching* and hypotheses to test — never as detection or alerting of any condition. This rule is enforced at copy review (NFR-9, FR-16.2). The borderline features in Appendix A (temperature drift, respiratory-rate deviation) are therefore explicitly framed as non-diagnostic "worth watching" prompts with confound disclosure.

### 9.3 App-store health-data policies

- **Apple (Guidelines 5.1.1, 5.1.3):** HealthKit data may not be used for advertising, marketing, or data mining, may not be sold, may be shared only with permission with entities providing health services; privacy nutrition labels required; from spring 2026, Medical/Health & Fitness apps declare regulatory status in App Store Connect. → FR-14.3, FR-15.7.
- **Google Play / Health Connect:** granular permissions (e.g. READ_SLEEP) limited to approved use cases; Play Console health-apps declaration with per-data-type justification; prohibitions on selling/ad use of health data; Health Connect history reads capped at 30 days without extra permission (→ FR-1.4 degrade path).

### 9.4 GDPR (only if/when EU users are targeted)

A free app intentionally offered to EU users falls under GDPR; sleep data is Article 9 special-category data (explicit consent, DPIA, EU representative, 72-hour breach duty, fines up to €20M/4% turnover). The DPDP-first architecture (consent records, notice, breach workflow, erasure) maps onto GDPR with modest increments — a deliberate design hedge. **Decision: do not target EU in marketing or store localization until a GDPR review is done.**

### 9.5 Legal document set (T&C package — launch requirement)

| Document | Contents | Owner |
|---|---|---|
| **Terms of Service** | Service description; user responsibilities; subscription terms incl. no-silent-conversion trials (M-5); acceptable use; IP; disclaimers of warranties; limitation of liability; governing law (India; courts of Bengaluru); termination; changes process | Founder + counsel |
| **Privacy Policy (DPDP Rule-3 notice)** | Itemized data types × purposes; legal basis; retention schedule; breach notification commitment; data-principals' rights (access, correction, erasure, nomination, grievance); contact of Data Protection Officer/grievance officer; accurate description of internal calibration practices (FR-16.3) and AI processing (tiers, on-device preference, zero-retention) | Founder + counsel |
| **Health Data Disclaimer** | Non-medical/wellness-only statement; "not a medical device; does not diagnose, treat, or monitor any condition; consult a physician for sleep problems"; emergency guidance (drowsy-driving warning lives in-product, FR-9.1) | Founder + counsel |
| **EULA + open-source attribution** | Third-party notices incl. model licenses (Qwen — Apache 2.0; Phi — MIT; "Built with Llama" attribution if Llama models ship), dataset sources, Flutter/library notices | Engineering |
| **Age policy** | 16+ default; parental-consent flow reference (FR-1.7) | Founder |
| **Refund/cancellation policy** | India consumer-act-compliant; aligns with store refund mechanisms | Founder |

---

## 10. Integrations

| Integration | Purpose | Version |
|---|---|---|
| Apple HealthKit | iOS ingestion | V1 |
| Android Health Connect | Android ingestion (30-day history cap handling) | V1 |
| Device Hub — OS-store sources (Apple Watch, Galaxy Watch, Fitbit, Garmin, Noise, boAt, Amazfit, Mi…) via health stores | Any third-party device whose app writes to the OS store | V1 |
| Device Hub — direct vendor APIs (Oura, WHOOP, Garmin Connect, Withings) | Data not carried by OS stores; per-vendor permission UX | V1.5 |
| UsageStatsManager (Android) | Screen-usage corroboration | V1 |
| FamilyControls/DeviceActivity (iOS) | Wind-down shields experiment (entitlement-gated) | P2 |
| Share sheet (PDF + CSV zip) | Export | V1 |
| Self-hosted inference (optional) | Tier-3 fallback only | V1.5 |
| Push notifications | FR-17 | V1 |

---

## 11. Analytics & Success Metrics

(no third-party SDK receives health-adjacent events — FR-14.3; analytics events are metadata-only)

| Metric | Target (6 months post-launch) |
|---|---|
| Activation: baseline-informed brief within 48 h of install | ≥ 60% |
| Session-verification rate (confirmed or corrected) | ≥ 50% of sessions |
| Weekly experiment acceptance rate | ≥ 35% |
| 4-night experiment completion rate | ≥ 50% |
| Streak participation: % of retained users with ≥ 1 active streak by D30 | ≥ 40% |
| D30 retention: experiment-completers vs non-completers | ratio ≥ 2× (core-loop validation) |
| Median time from first session to first reliable Twin insight | ≤ 7 nights |
| Tier-2 (on-device LLM) availability without user-perceived failure | ≥ 99.9% of briefs render (RTL floor guarantees this) |
| Premium conversion | ≥ 4% of MAU |
| Notification opt-out rate | ≤ 20% |

**North star:** experiments completed per retained user per month.

---

## 12. Monetization

Unchanged from v0.2 except: **the premium price point decision (₹499–₹999 band) is deferred** to a post-validation willingness-to-pay test; no pricing experiments before the core-loop retention hypothesis (D30 ratio ≥ 2×) is validated. Structural rules stand: the free tier keeps the loop open (≥ 1 experiment/week free); premium never gates export or deletion; no silent trial conversions; a one-time lifetime option is evaluated at launch + 6 months.

---

## 13. Cost-Minimal Architecture & Economics (why this is nearly free to run)

| Layer | Choice | Running cost |
|---|---|---|
| Deterministic analytics + Twin | On-device code (Dart) | ₹0 |
| User-facing prose (floor) | RTL templates (FR-10.5) | ₹0 |
| On-device LLM (Tier 2) | Quantized Qwen3-1.7B (~1.3 GB at 4-bit, 4K context) or Phi-3.5-mini (MIT) via llama.cpp/ONNX | ₹0 (device-side) |
| Server LLM (Tier 3, optional) | Self-hosted small model on a single small GPU/CPU node; only for devices that can't run Tier 2; zero-retention | ~$20–50/mo at 100K MAU; avoidable entirely by shipping Tier-2-only |
| Backend (auth, sync, telemetry) | FastAPI + Supabase (blueprint); local-first means tiny payloads | Free/hobby tier initially |
| Fine-tuning program | QLoRA + Unsloth on free Colab/Kaggle GPUs (8B QLoRA ≈ minutes on a free T4; 1–4B trivially within quotas) | ≈ $0–50 total |
| Calibration/validation data | Public datasets (Sleep-EDF, DOD, Walch, BIDSleep, MIT-BIH — ODbL/MIT commercial-use friendly) | ₹0 |

Design consequence: **the marginal cost of a new user is approximately zero** — intelligence runs on the user's own phone, and the only server costs are auth/sync/telemetry.

---

## 14. Unique Feature Pipeline (out-of-the-box, cost-rated)

Curated from the research corpus; each is deterministic-first (no LLM needed), differentiating, and cheap. Priority follows cost/differentiation balance:

| # | Feature | What it is | Uniqueness rationale | Cost | Priority |
|---|---|---|---|---|---|
| 1 | **Night Auditor** | Cross-witness verification: watch says asleep, phone says active → correction prompt (FR-12) | No major app cross-validates sleep sessions against phone usage; directly answers the "sleep mode in bed" problem | ~₹0 (Android APIs) | P0 |
| 2 | **Experiment Duel** | Head-to-head comparison of completed interventions on the user's own data (FR-6.9) | Nobody ships comparative n-of-1 analytics; incumbents explain, they don't compare | ~₹0 (stats) | P2 |
| 3 | **All-Nighter Bank** | Pre-deadline sleep banking + next-day circadian nap scheduling (FR-9) | Students are unserved by every catalogued app; harm-minimization framing is unique | ~₹0 | P1 |
| 4 | **Caffeine Half-Life Clock** | Personal pharmacokinetic model: "your 4 pm coffee is still ~50% active at your bedtime" — sets personal cutoff suggestions | Deterministic math; nobody ties cutoff advice to *your* bedtime + experiment outcomes | ~₹0 | P1 |
| 5 | **Body Baseline Drift** | "Worth watching" card when temperature/RHR/respiratory-rate drift from personal baseline persists ≥ 2 nights — with confound disclosure (Appendix A) and non-diagnostic framing | Oura/WHOOP show illness research signals only inside expensive hardware; here it's software-only and honest about confounds | ~₹0 | P2 |
| 6 | **Circadian Compass** | Camera-based lux capture at wake/noon/evening → light-timing advice (morning light dose, evening dimming) | Arcascope-adjacent circadian scheduling without the research overhead; camera only | ~₹0 | P2 |
| 7 | **Whisper Check-in** | Optional voice-note morning check-in; on-device transcription where available, else RTL prompt fallback | Low-friction data entry for the most important daily signal | Small model cost | P2 |
| 8 | **Twin Garden** | A living visualization of the Sleep Twin: each learned relationship is a growing plant; experiments are seasons | Turns transparency (our moat) into delight; streak-compatible | ~₹0 (UI) | P2 |
| 9 | **Shareable Week Card** | Anonymized weekly PNG summary for social loops | Growth without ad spend — critical for a zero-marketing-budget launch | ~₹0 | P1 |

---

## 15. Release Plan

| Release | Contents |
|---|---|
| **V1 — MVP (the loop works end to end)** | FR-1, FR-2 (incl. session verification + OS-store Device Hub), FR-3, FR-4, FR-5 core, FR-6, FR-8.2 streaks, FR-10 (Tier 0/1 complete; Tier 2 dark-launched to beta), FR-11, FR-12.1 (Android), FR-14, FR-15 compliance set, FR-17; NFRs 1–5, 8–9, 11, 13 |
| **V1.1 — Learning made visible** | FR-7 Detective, FR-8 levels/weekly reveal, FR-9.1–9.4 All-Nighter Mode, FR-10 Tier 2 GA + RTL localization, FR-5.8 signal map GA, shareable week card |
| **V1.5 — Ecosystem** | Device Hub direct vendor APIs (Oura/WHOOP/Garmin/Withings), Tier 3 server fallback, iOS screen toggles, Travel Mode, caffeine clock |
| **V2 — Own sensing** | FR-13 phone-sensor pipeline (gated by FR-13.4 feasibility), iOS shields experiments, Experiment Duel, Twin Garden, Whisper check-in, Body Baseline Drift |

---

## 16. Risks & Mitigations

| Risk | Mitigation in this FRD |
|---|---|
| Apple/Samsung absorb AI coaching into the OS | The experiment loop is a *process*, not a score; incumbents show no n-of-1 experimentation appetite (FR-6) |
| Sleep Cycle's Luma converges on our positioning | Speed on loop + Night Auditor-style cross-validation (unique, cheap) + India-first market entry |
| AI-coaching price collapse | Monetize the learning system, not chat; marginal user cost ≈ ₹0 (§13) so we survive any price war |
| Accuracy/orthosomnia backlash | Baseline-relative framing, evidence display, confound disclosure (FR-11, Appendix A); no absolute claims (NFR-9) |
| iOS screen-data access is fundamentally limited | FR-12.2 designed around the restrictions (manual toggle + optional shields); no iOS feature depends on unavailable data |
| CDSCO reclassification of wellness features | §9.2 boundary discipline: deviations framed as "worth watching" hypotheses, never alerts/detection |
| DPDP penalties (₹250 crore ceiling) | §9.1 full-standard build at launch: notice, consent ledger, breach playbook, security safeguards |
| Sonar V2 battery/permission issues kill the pipeline | Hard constraints + feasibility gate before any commitment (FR-13.3, FR-13.4) |
| RTL coverage gap makes degradation feel broken | NFR-13: 100% surface coverage requirement, tested in CI with all AI tiers disabled |

---

## 17. Open Questions (updated)

1. ~~Premium price point~~ — **deferred** to post-validation willingness-to-pay test (§12).
2. Tier-2 model choice at GA: Qwen3-1.7B (Apache 2.0) vs Phi-3.5-mini (MIT) — decided by Hindi-quality benchmark on our RTL corpus + runtime memory on target devices.
3. Under-18 support: ship the parental-consent gate (FR-1.7) or restrict to 16+ at launch?
4. Experiment library expansion beyond the V1 six — driven by which Twin relationships users actually accrue.
5. Direct vendor API order for V1.5 Device Hub (Oura first by demand, or Garmin first by data richness?).
6. Whether Twin Garden (§14.8) ships — the only differentiator with real design cost.

---

# Appendices

## Appendix A — Signal Interpretation Map (the science the Twin uses)

**Standing rule for every row:** these are population-level associations from group studies. In-product, each becomes a *within-person deviation hypothesis* — "your RHR ran 6 bpm above your baseline" — paired with confound disclosure and an offer to test via experiment. Never diagnosis; never an alert.

| Signal | Normal range / behavior | What deviations are associated with | Product framing |
|---|---|---|---|
| **Sleeping heart rate** | ~40–60 bpm, below daytime resting, lowest in deep NREM; rises toward waking levels in REM | Stress/anxiety; alcohol (dose-response: each drink above personal average ≈ +2.4 bpm men / +2.8 bpm women, HRV −3.3–3.8 ms); caffeine; late heavy meals; dehydration; illness (+~3.6 bpm on sick nights; illness-prediction models caught ~80% of COVID cases pre-symptom in research settings); nightmares (elevated HR in nightmare recallers) | "Your heart ran high last night" + candidate causes from the user's own logged context (alcohol/stress/illness-feel) + experiment offer |
| **HRV suppression** | Highest during sleep; indexes parasympathetic (recovery) tone | Acute alcohol, acute endurance exercise (dose-response), anticipatory stress, insomnia hyper-arousal, illness; chronic overtraining shows weak/inconsistent effects — the reliable signal is deviation from personal baseline after acute stressors | Recovery rating input; "suppressed vs your baseline" in Detective |
| **Skin temperature** | Distal skin temp; meaningful signal is deviation from personal baseline | Illness (fever-detection AUROC ~0.85 in a 63K-wearer study; fever-tagged episodes warmed ~2 nights early), menstrual cycle phase (confound), room/bedding confounds, alcohol vasodilation | "Worth watching" card only with confound disclosure; never "you may be ill" |
| **Respiratory rate** | 90% of healthy sleepers within ~12–19/min | ≥ 3 breaths/min above personal baseline occurred in 36.4% of symptomatic COVID windows vs 4.3% of healthy windows in research; but in prospective validation the same alert pattern was more often triggered by stress (16%), poor sleep (13.7%), exercise (9.7%), alcohol/caffeine (6%) than infection | Same as temperature — drift prompt with heavy confound disclosure |
| **SpO2 dips** | Mid-to-upper 90s; brief dips normal, especially REM/supine | Cyclical "sawtooth" desaturations and ODI > 5/hr relate to obstructive apnea in clinical settings; wrist devices ± 2–3% error; consumer oximetry cannot diagnose (no airflow/effort data) | Display raw trend only; no interpretation; doctor-referral copy if the user asks about persistent patterns |
| **Sleep stages (ingested)** | Staging accuracy of consumer devices is only fair-to-moderate vs PSG (κ 0.21–0.59) | — | Never interpreted as absolute quality; used only for within-person change (e.g. "more REM than your baseline") |
| **Subjective rating divergence** | — | Body-recovered-but-feels-drained pattern points to stress/alcohol context | A first-class insight type (FR-3.5) |

## Appendix B — Response Template Library (RTL) specification

- **Artifact:** versioned JSON/Dart registry, one entry per (surface × outcome-class × language).
- **Surfaces:** morning brief (improved/declined/flat/insufficient-data × ≥ 10 phrasings), experiment proposal (per type × ≥ 5), experiment verdict (improved/weak/no-effect/worse × ≥ 5), evidence summary, coaching FAQ (≥ 50), medical-topic safe responses, degradation/empty/error states, streak celebration copy (non-compulsive tone).
- **Slots:** deterministic metrics only — `{recovery_delta}`, `{n_nights}`, `{factor}`, `{baseline_range}`, `{experiment_name}`, `{streak_count}`.
- **Tests in CI:** (1) every user-facing screen renders with all AI tiers disabled; (2) no template contains absolute medical claims (blocked-phrase list: "diagnos", "detect", "accurate", "clinical-grade", "illness"); (3) EN/HI parity check; (4) slot-substitution renders < 100 ms.

## Appendix C — Device Hub source-coverage matrix (V1, via OS health stores)

| Source family | Sleep sessions | Stages | HR | HRV | Temp | SpO2 | Notes |
|---|---|---|---|---|---|---|---|
| Apple Watch (via HealthKit) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Best overall coverage |
| Galaxy Watch (via Health Connect/HealthKit) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | Apnea feature exists on-device; we read raw only |
| Fitbit (via stores) | ✓ | ✓ | ✓ | partial | ✓ | ✓ | Sync latency varies |
| Garmin (via HealthKit/HC) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | |
| Noise / boAt / Amazfit / Mi (via Health Connect) | ✓ | partial | ✓ | partial | sparse | ✓ | The India mass-market tier; coverage varies by model |
| Manual | ✓ | — | — | — | — | — | Always available (FR-1.3) |

## Appendix D — Founder-feedback traceability (all 16 points)

| # | Point | Where addressed |
|---|---|---|
| 1 | Third-party device connectivity + what matters to us | FR-2.8–2.11, Appendix C, §10 |
| 2 | Free models, minimum LLM tasks, graceful degradation | FR-10 (whole), §13, Appendix B |
| 3 | Research/medical data usage without claiming it | FR-16 (calibration-only, claims discipline, accurate privacy policy) |
| 4 | Phone-sensor tracking pipeline | FR-13 + V2 gate |
| 5 | More personas | §4 (8 personas) |
| 6 | Sleep session verified by user | FR-2.5 |
| 7 | Screen-usage ingestion for verification | FR-12 (Android P0, iOS constrained) |
| 8 | Practical use cases | §5 (14 use cases) |
| 9 | DPDP ready | §9.1, FR-15 |
| 10 | Other gov compliance | §9.2 (CDSCO), §9.3 (stores), §9.4 (GDPR hedge) |
| 11 | T&C | §9.5 |
| 12 | How measurable data connects to other things | Appendix A, FR-5.8 |
| 13 | All-nighter feature | FR-9.1–9.4, UC-3 |
| 14 | Streaks after experiments | FR-8.2 |
| 15 | Bag of words when LLM fails | FR-10.5, Appendix B |
| 16 | Export CSV/PDF not JSON | FR-14.1 |

## Appendix E — Key Sources

- DPDP Rules 2025 (G.S.R. 846(E), notified 14 Nov 2025): https://www.meity.gov.in/ (official gazette)
- CDSCO Medical Device Software Guidance CDSCO/MD/GD/MDSW/01/2026: https://www.cdscope.gov.in/
- Apple App Review Guidelines 5.1.1/5.1.3: https://developer.apple.com/app-store/review/guidelines/
- Google Play Health apps policy / Health Connect: https://support.google.com/googleplay/android-developer/
- Qwen3 open-weight licenses (Apache 2.0): https://huggingface.co/Qwen ; Phi-3.5-mini (MIT): https://huggingface.co/microsoft/Phi-3.5-mini-instruct ; Llama 3.2 license: https://www.llama.com/llama-downloads/ ; Gemma terms: https://ai.google.dev/gemma/terms
- Sleep-EDF Expanded (ODbL): https://physionet.org/content/sleep-edfx/ ; DOD datasets (MIT): https://zenodo.org/ ; Walch Apple Watch dataset: https://physionet.org/ ; SHHS: https://sleepdata.org/ ; MESA: https://sleepdata.org/datasets/mesa
- Unsloth (QLoRA acceleration): https://github.com/unslothai/unsloth
- Alcohol–nocturnal-RHR dose-response (5.1M person-days): https://pubmed.ncbi.nlm.nih.gov/ (Study: "Consumption of alcohol... sleep HR/HRV")
- Stanford illness-prediction from wearables: https://pubmed.ncbi.nlm.nih.gov/ (M. Alavi et al., PNAS 2024)
- Oura fever detection (63,153 wearers): https://pubmed.ncbi.nlm.nih.gov/
- Nocturnal respiratory-rate deviation study: https://pubmed.ncbi.nlm.nih.gov/ (Sleep Heart Health Study analyses)
- Physiological signal interpretation research brief (compiled 22 Sep 2026, full sources in research file)
- iOS FamilyControls/DeviceActivity docs: https://developer.apple.com/documentation/familycontrols ; Android UsageStatsManager: https://developer.android.com/reference/android/app/usage/UsageStatsManager
