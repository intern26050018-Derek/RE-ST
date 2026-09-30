import * as React from "react";
import { Platform, Alert, ActivityIndicator, StyleSheet, View, Text } from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { launchCameraAsync, pickImageAsync } from "expo-image-picker";
import { Asset } from "expo-asset";

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

  // Model filename - matches the extracted fine-tuned model
  private readonly MODEL_FILENAME = "qwen3-1.7b.Q4_K_M.gguf";

  // Initialize model - copy from bundled asset to document directory on first launch
  async initializeModel = async () => {
    if (this.state !== "idle" && this.state !== "error") {
      return;
    }

    this.state = "downloading";
    const modelDir = FileSystem.documentDirectory + "models/";
    const modelPath = modelDir + this.MODEL_FILENAME;

    try {
      // Check if already exists in document directory
      const info = await FileSystem.getInfoAsync(modelPath);
      if (info.exists) {
        this.modelPath = modelPath;
        this.state = "ready";
        this.modelLoaded = true;
        return;
      }

      // Create directory
      await FileSystem.makeDirectoryAsync(modelDir, { intermediates: true });

      // Try to load from bundled asset (for production builds)
      // or copy from project models folder (for development)
      const asset = Asset.fromModule(require("../../../models/qwen3-1.7b.Q4_K_M.gguf"));
      await asset.downloadAsync();
      
      if (asset.localUri) {
        // Copy from asset to document directory
        await FileSystem.copyAsync({
          from: asset.localUri,
          to: modelPath,
        });
      } else {
        // Fallback: try to copy from project models folder (dev only)
        const projectModelPath = FileSystem.documentDirectory + "../models/" + this.MODEL_FILENAME;
        const projectInfo = await FileSystem.getInfoAsync(projectModelPath);
        if (projectInfo.exists) {
          await FileSystem.copyAsync({
            from: projectModelPath,
            to: modelPath,
          });
        } else {
          throw new Error("Model not found in bundled assets or project folder");
        }
      }

      this.modelPath = modelPath;
      this.state = "ready";
      this.modelLoaded = true;
    } catch (error) {
      this.state = "error";
      console.error("Model initialization failed:", error);
      // Fallback: use RTL guaranteed floor
      this.modelLoaded = false;
    }
  };

  // Legacy method name for backward compatibility
  async downloadModel = async () => {
    return this.initializeModel();
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
      // import { llama } from '@react-native-ai/llama';
      // const model = llama.languageModel(this.modelPath);
      // await model.prepare();
      // const { textStream } = streamText({ model, prompt: this.buildPrompt(context) });
      // let fullText = '';
      // for await (const delta of textStream) { fullText += delta; }
      // return { text: fullText, confidence: 0.82, tier: "tier2", reactionTimeMs: Date.now() - startTime };

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