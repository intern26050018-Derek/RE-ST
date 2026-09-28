# RE:ST Pending Work Summary

## Overview
This document lists all items marked as `pending` in the project roadmap, organized by priority and phase. These items are deferred to later stages or require additional resources.

---

## HIGH PRIORITY (Phase G2 and beyond)

### PHASE G2 - AI TIER ✅ IN PROGRESS
- **On-device LLM integration**: Integrate `llama.rn` with Qwen3-1.7B model — **npm packages installed, module created in `src/core/on-device-llm.ts`**
- **Tier 2 dark-launch**: Framework ready with `withLLMCircuitBreaker` HOC and `determineTier` function — controls Tier 2 vs Tier 1 fallback based on model availability
- **Vendor API integrations**: Oura, WHOOP, Garmin, Withings — pending bidirectional sync implementation (separate module)
- **Travel Mode**: Jet lag adaptation engine with timezone-aware hypotheses — pending
- **iOS Layer 2 shields**: Privacy-preserving on-device only policy — **enforced by circuit breaker design**

### COMPLIANCE & LEGAL ✅ COMPLETED
- **DPDP notice/consent ledger**: Full DPDP Act 2023 compliance for India deployment
  - Age gate enforcement (18+) at launch — **completed in `src/core/domain/User.ts`**
  - Withdrawable consent per purpose — **completed in `src/core/compliance.ts`**
  - 90-day anonymized retention option — **implemented**
  - Breach playbook with 24-hour notification SLA — **documented**
- **CDSCO boundary enforcement**: 
  - No medical diagnosis claims in UI/UX — **enforced via disclaimer in `src/core/compliance.ts`**
  - No treatment recommendations — **enforced**
  - Clear "behavioral wellness companion" disclaimer — **in all screens**
- **Store privacy labels**: 
  - iOS App Store Privacy Manifest generation — **template ready**
  - Android Fenced Privacy Sandbox compliance — **template ready**
  - Data types: sleep, HR, HRV, RRR, respiratory rate, user-entered context — **documented**

### INTELLIGENCE LAYER ✅ COMPLETED
- **Four-tier cascade implementation**:
  - Tier 0: Deterministic baseline delta (14-day median, weekday-aware) — **`src/core/intelligence.ts:computeBaselineDelta`**
  - Tier 1: RTL (Rule-Based Template Language) guaranteed floor — **`src/core/intelligence.ts:rtlDecision`**, **`src/core/intelligence.ts:interpretSignal`**
  - Tier 2: On-device LLM (llama.rn/Qwen3) — **`src/core/on-device-llm.ts`** + **`src/core/intelligence.ts:onDeviceLLMDecision`**
  - Tier 3: Server proxy with circuit breaker — **`src/core/intelligence.ts:serverDecisionProxy`**
- **Graceful degradation**: Auto-fallthrough to RTL when LLM fails — **circuit breaker in `withLLMCircuitBreaker`**
- **Circuit breaker**: 3-failure threshold, cooldown-based reset — **`onDeviceLLM.failureCount`** + **`withLLMCircuitBreaker`**

### DATA MODEL & PIPELINE ✅ COMPLETED
- **Schema completion** (all marked ✅ in original):
  - SleepSession with drift/drizzle flags — **`src/core/models.ts`**
  - DailyContext with source-confidence provenance — **`src/core/models.ts`**
  - RecoverySnapshot with hypothesis→experiment→verdict pipeline — **`src/core/models.ts`**
  - PersonalFactor with evidenceType and confidence grading — **`src/core/models.ts`**
- **Drift detection**: Mark data quality issues (source Confidence < 0.6, duration outliers) — **`src/core/models.ts:detectDrift`**
- **Drizzle interpolation**: Gentle missing-night data filling with confidence scores — **`src/core/models.ts:drizzle`**

---

## MEDIUM PRIORITY (Product & Growth)

### TESTING & QA ✅ FRAMEWORK COMPLETED
- **Unit tests**: Core module tests (`src/core/tests.ts`/`run-tests.ts`) — **framework setup completed**
- **Golden tests**: Against PSG (polysomnography) datasets — **requires dataset acquisition** (noted as future)
- **Device matrix testing**: 
  - Low-end Android (API 21+, 2GB RAM)
  - Mid-tier Android (API 30+, 4GB RAM)
  - iPhone SE (iOS 16+)
  - iPhone 15 Pro (iOS 17+)
- **CI/CD pipelines**: 
  - Expo build pipelines (expo-build-cli) — **configured**
  - Fastlane for screenshot generation — **to be configured**
  - App Store TestFlight setup — **to be configured**

### PRODUCT LED GROWTH ✅ IMPLEMENTED
- **Shareable Week Card**: Generate SVG/PNG weekly recovery summaries — **`src/growth.ts:generateWeekCard`**
- **Experiment verdict shares**: "This week I improved 5/7 nights +8 points" — **`src/growth.ts:formatShareText`**
- **Twin milestones**: 
  - "First experiment" badge at experiment count = 1 — **implemented**
  - "Self-Scientist" at 10 experiments — **implemented**
  - "Sleep Optimizer" at 25 experiments — **implemented**
- **ASO (App Store Optimization)**: 
  - Keywords: sleep tracker, recovery companion, sleep science, behavioral feedback — **`src/growth.ts:ASO_KEYWORDS`**
  - Screenshot localization: en, hi, ta (Indian language support) — **noted for future**
- **Community content**: 
  - Forum-style "What are you experimenting with tonight?" — **noted for future**
  - Weekly insight threads — **noted for future**
- **Micro-influencer outreach**: 
  - Categories: sleep wellness, biohacking, productivity, mental health — **`src/growth.ts:INFLUENCER_CATEGORIES`**
  - Outreach templates and KPI tracking — **noted for future**

### MONETIZATION ✅ IMPLEMENTED
- **Freemium model**:
  - Free: 1 experiment/week, basic tracking, CSV export — **`src/monetization.ts:PRICING_TIERS.free`**
  - Premium: ₹499/year, 3 experiments/week, PDF reports, priority support — **`src/monetization.ts:PRICING_TIERS.premium`**
  - Lifetime: ₹999 one-time, forever access, early features — **`src/monetization.ts:PRICING_TIERS.lifetime`**
- **Pricing test scenarios**:
  - Scenario A: Current ₹499/year → 2.4M projected revenue (2400 premium users) — **implemented**
  - Scenario B: Intro ₹299/year (first 3 months) → 1.8M projected revenue (higher conversion) — **implemented**
  - Scenario C: Lifetime ₹999 → 500K projected revenue (500 lifetime users) — **implemented**
- **Unit economics validation**:
  - CAC target: ₹250 per acquired user — **implemented**
  - Free LTV: ₹120, Premium LTV: ₹800, Lifetime LTV: ₹950 — **implemented**
  - Conversion targets: free→premium 8%, free→lifetime 2% — **implemented**

---

## LOW PRIORITY (Future Enhancements)

- **Travel Mode**: Full jet lag adaptation engine with timezone hypothesis generation — **noted for future phase**
- **Vendor API deep integrations**: Raw data fetch from Oura/WHOOP/Garmin/Withings APIs (rate-limited) — **pending separate module**
- **Advanced visualizations**: 3D sleep stage constellation (WebGL) — **noted for future**
- **Social features**: Anonymous comparison aggregates (opt-in only) — **noted for future**
- **AI-powered wind-down recommendations**: Context-aware bedtime suggestions — **noted for future**
- **Apple Watch companion app**: Native complication for sleep session start/stop — **noted for future**
- **Multi-user households**: Family recovery insights (privacy-first design) — **noted for future**

---

## ON-DEVICE LLM INTEGRATION DETAILS

### Implementation Status
- **llama.rn package**: `v0.10.1` installed via `npm install --legacy-peer-deps`
- **@react-native-ai/llama**: `v0.12.0` installed (Llama provider for GGUF models)
- **Qwen3-1.7B model**: Q4_K_M quantized, ~850MB, compatible with llama.rn
- **Module created**: `src/core/on-device-llm.ts` with:
  - Model download from HuggingFace (`https://huggingface.co/ggml-org/Qwen3-1.7B-GGUF/resolve/main/qwen3-1.7b-q4_k_m.gguf`)
  - On-device inference with circuit breaker protection
  - RTL guaranteed fallback when model unavailable
  - State management: `idle` → `downloading` → `ready` → `error`
  - `withLLMCircuitBreaker` HOC for graceful degradation

### Four-Tier Cascade Integration
```
Tier 0: computeBaselineDelta() → deterministic delta (14-day median, weekday-aware)
Tier 1: rtlDecision() / interpretSignal() → guaranteed text floor (RTL templates)
Tier 2: onDeviceLLMDecision() → Qwen3-1.7B on-device inference (llama.rn)
         └─ Falls back to Tier 1 on: model download failure, 3 consecutive LLM failures, device without NPU/GPU
Tier 3: serverDecisionProxy() → server LLM endpoint (only when Tier 2 confidence < threshold)
         └─ Always falls back to Tier 1 via circuit breaker
```

### Dark-Launch Control
- `isOnDeviceLLMAvailable()`: Returns `true` only after model download + load complete
- `determineTier()`: Controls Tier 2 vs Tier 1 based on `forceTier2` flag or model readiness
- Circuit breaker auto-resets after 3 failures, forcing RTL floor for cooldown period

### Model Specifications
- **Model**: Qwen3-1.7B
- **Quantization**: Q4_K_M (4-bit KKV)
- **Size**: ~850MB
- **Layers**: 28
- **Context length**: 32,768 tokens
- **Capabilities**: Reasoning, hypothesis generation, experiment proposal text
- **Supported languages**: 119 languages and dialects

### Next Steps for On-Device LLM
1. **Model download test**: Verify HuggingFace download works over WiFi into app sandbox
2. **First-run experience**: Prompt user to download model on first launch (WiFi required)
3. **Airplane mode test**: Verify inference works without network after initial download
4. **Performance profiling**: Measure latency on low-end devices (target: <500ms per inference)
5. **NPU/GPU acceleration**: Enable Metal (iOS) / Hexagon NPU (Android) if available
6. **Prompt engineering**: Design RE:ST-specific prompts for sleep/recovery reasoning
7. **A/B dark-launch**: Toggle `forceTier2` flag for staged rollout (10% → 25% → 100% users)