import * as React from "react";
import { Platform, Alert, ActivityIndicator, StyleSheet, View, Text } from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { launchCameraAsync, pickImageAsync } from "expo-image-picker";

// Model management for on-device LLM
export type DecisionTier = "tier0" | "tier1" | "tier2" | "tier3";

export interface TieredDecision {
  tier: DecisionTier;
  text: string;
  confidence: number;
  fallback?: string;
}

// Model info
const MODEL_INFO = {
  name: "Qwen3-1.7B",
  sizeMB: 850, // Q4_K_M quantized
  layers: 28,
  contextLength: 32768,
  description: "Small dense Qwen3 model, good for reasoning tasks",
};

// State model
export type LLMState =
  | "idle"
  | "downloading"
  | "ready"
  | "error"
  | "processing";

export type LLMResult = {
  text: string;
  confidence: number;
  tier: DecisionTier;
  reactionTimeMs: number;
};

export class OnDeviceLLM {
  private state: LLMState = "idle";
  private modelPath: string | null = null;
  private modelLoaded = false;
  private failureCount = 0;
  private maxFailures = 3;

  // Download model from HuggingFace (Qwen3-1.7B Q4_K_M)
  async downloadModel = async () => {
    if (this.state !== "idle" && this.state !== "error") {
      return;
    }

    this.state = "downloading";
    // Qwen3-1.7B Q4_K_M GGUF model
    const modelUrl =
      "https://huggingface.co/ggml-org/Qwen3-1.7B-GGUF/resolve/main/qwen3-1.7b-q4_k_m.gguf";

    try {
      const modelDir = FileSystem.documentDirectory + "models/";
      const modelPath = modelDir + "qwen3-1.7b-q4_k_m.gguf";

      // Check if already downloaded
      const info = await FileSystem.getInfoAsync(modelPath);
      if (info.exists) {
        this.modelPath = modelPath;
        this.state = "ready";
        this.modelLoaded = true;
        return;
      }

      // Create directory
      await FileSystem.makeDirectoryAsync(modelDir, { intermediates: true });

      // Download with progress tracking
      const download = FileSystem.downloadAsync(
        modelUrl,
        modelPath,
        {
          progress: (current, total) => {
            const progress = Math.round((current / total) * 100);
            // In production: update UI progress
          },
        }
      );

      const { uri } = await download;
      this.modelPath = uri;
      this.state = "ready";
      this.modelLoaded = true;
    } catch (error) {
      this.state = "error";
      console.error("Model download failed:", error);
      // Fallback: use RTL guaranteed floor
      this.modelLoaded = false;
    }
  };

  // Process text with on-device LLM
  async processText = async (
    prompt: string,
    context: {
      factors: any[];
      baselineDelta: number;
      snapshot: any;
    }
  ): Promise<LLMResult> => {
    const startTime = Date.now();

    // Check if model is available
    if (!this.modelLoaded || !this.modelPath) {
      // Fallback to RTL guaranteed floor
      const rtlDecision = this.getRTLFallback(context);
      const reactionTime = Date.now() - startTime;
      return {
        text: rtlDecision.text,
        confidence: rtlDecision.confidence,
        tier: "tier1",
        reactionTimeMs: reactionTime,
      };
    }

    try {
      // In production: import and use llama.rn here
      // For now: simulate with RTL fallback with delay
      await React.wait(500); // Simulate model inference time

      const rtlDecision = this.getRTLFallback(context);
      const reactionTime = Date.now() - startTime;

      return {
        text: rtlDecision.text,
        confidence: rtlDecision.confidence,
        tier: "tier2",
        reactionTimeMs: reactionTime,
      };
    } catch (error) {
      this.failureCount += 1;

      // Circuit breaker: after 3 failures, fall back to RTL
      if (this.failureCount >= this.maxFailures) {
        this.state = "idle"; // Reset, force RTL
        this.failureCount = 0;
        const rtlDecision = this.getRTLFallback(context);
        return {
          text: rtlDecision.text,
          confidence: rtlDecision.confidence,
          tier: "tier1",
          reactionTimeMs: 10,
        };
      }

      // Try fallback
      const rtlDecision = this.getRTLFallback(context);
      const reactionTime = Date.now() - startTime;
      return {
        text: `LLM processing unavailable — ${rtlDecision.text}`,
        confidence: rtlDecision.confidence,
        tier: "tier1",
        reactionTimeMs: Date.now() - startTime,
      };
    }
  };

  private getRTLFallback = (context: any): { text: string; confidence: number } => {
    const { factors, baselineDelta, snapshot } = context;

    // Tier 1 RTL decision logic
    const hasSignificantNegative = factors?.some(
      (f: any) => f.type === "negative" && f.confidence >= "moderate"
    );

    if (hasSignificantNegative) {
      return {
        text:
          "Factors detected that may impact recovery — consider adjustments",
        confidence: 0.75,
      };
    }

    return {
      text: "No significant factors detected — your baseline looks stable",
      confidence: 0.85,
    };
  };

  // Get current state
  getState = (): LLMState => this.state;

  // Check if model is ready
  isReady = (): boolean => this.state === "ready" && this.modelLoaded;

  // Reset state for new session
  reset = () => {
    this.state = "idle";
    this.modelPath = null;
    this.modelLoaded = false;
    this.failureCount = 0;
  };
}

// Export singleton instance
export const onDeviceLLM = new OnDeviceLLM();

// Decorator for circuit breaker integration
export const withLLMCircuitBreaker = async <T>(
  fn: () => Promise<T>,
  fallback: (error: Error) => T
): Promise<T> => {
  try {
    const result = await fn();
    // Reset failure count on success
    onDeviceLLM.failureCount = 0;
    return result;
  } catch (error) {
    onDeviceLLM.failureCount += 1;
    if (onDeviceLLM.failureCount >= onDeviceLLM.maxFailures) {
      onDeviceLLM.state = "idle";
      onDeviceLLM.failureCount = 0;
    }
    return fallback(error as Error);
  }
};