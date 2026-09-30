import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import type { FactsObject } from "../core/domain";

// Mock data for demonstration
const mockFacts: FactsObject = {
  recoveryScore: 72,
  baselineDelta: 8,
  subjectiveRating: 4,
  likelyDrivers: ["Sleep Timing", "Late Caffeine", "Stress"],
  screenConflict: "none",
};

// Mock RTL registry (replace with actual import when rtl/registry is fixed)
const rtlRegistry = {
  get: (category: string, outcome: string) => ({ text: "Mock template" }),
  render: (category: string, outcome: string, lang: string, params: any) => ({
    text: `Recovery ${params.recovery_delta} — You recovered better than your usual week`,
  }),
};

export default function Home() {
  // Determine outcome class for RTL template
  const delta = mockFacts.baselineDelta;
  const outcomeClass = delta >= 5 ? "recovery_positive"
    : delta <= -5 ? "recovery_declined"
    : "recovery_flat";

  // Render using RTL
  const templates = rtlRegistry.get("morningBrief", outcomeClass);
  const result = rtlRegistry.render("morningBrief", outcomeClass, "en", {
    recovery_delta: `${mockFacts.baselineDelta > 0 ? '+' : ''}${mockFacts.baselineDelta} pts`,
  });

  return (
    <View style={styles.container}>
      {/* Glass Hero Section */}
      <View style={styles.glassHero}>
        <Text style={styles.recoveryScore}>{mockFacts.recoveryScore}</Text>
        <Text style={styles.baselineDelta}>{result.text}</Text>
        <Text style={{ color: "#929B98", fontSize: 12, fontFamily: "Plus Jakarta Sans" }}>
          You recovered better than your usual week
        </Text>
      </View>

      {/* Three Evidence Pillars */}
      <View style={styles.evidencePills}>
        {[ "Sleep Timing", "Late Caffeine", "Stress" ].map((label, i) => (
          <View key={i} style={styles.evidencePill}>
            <Text style={styles.evidenceText}>{label}</Text>
          </View>
        ))}
      </View>

      {/* Tonight's Experiment Card */}
      <View style={styles.experimentCard}>
        <Text style={styles.experimentTitle}>Tonight's Experiment</Text>
        <Text style={styles.experimentProtocol}>Try a 4-night caffeine cutoff</Text>
        <Text style={styles.experimentProtocol}>Your recent data suggests this is worth testing.</Text>
        <View style={styles.experimentActions}>
          <View style={styles.experimentAction}>
            <Text style={{ color: "#0B5968", fontSize: 12, fontFamily: "Plus Jakarta Sans" }}>Try It</Text>
          </View>
          <View style={styles.experimentAction}>
            <Text style={{ color: "#929B98", fontSize: 12, fontFamily: "Plus Jakarta Sans" }}>Swap</Text>
          </View>
          <View style={styles.experimentAction}>
            <Text style={{ color: "#929B98", fontSize: 12, fontFamily: "Plus Jakarta Sans" }}>Skip</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071011",
  },
  glassHero: {
    backgroundColor: "rgba(13, 25, 27, 0.8)",
    borderRadius: 20,
    padding: 32,
    margin: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  recoveryScore: {
    fontSize: 48,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "700",
    color: "#F6F1E8",
    marginBottom: 8,
  },
  baselineDelta: {
    fontSize: 18,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "500",
    color: "#E7C98F",
  },
  evidencePills: {
    flexDirection: "row",
    gap: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  evidencePill: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    minWidth: 80,
  },
  evidenceText: {
    color: "#929B98",
    fontSize: 12,
    fontFamily: "Plus Jakarta Sans",
  },
  experimentCard: {
    backgroundColor: "rgba(13, 25, 27, 0.8)",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  experimentTitle: {
    color: "#F6F1E8",
    fontSize: 16,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: "600",
    marginBottom: 8,
  },
  experimentProtocol: {
    color: "#929B98",
    fontSize: 13,
    fontFamily: "Plus Jakarta Sans",
  },
  experimentActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  experimentAction: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});