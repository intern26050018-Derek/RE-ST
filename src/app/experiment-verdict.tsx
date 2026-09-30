import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function ExperimentVerdict() {
  // Verdict data - would come from actual experiment completion
  const verdictData = {
    improvedNights: 3,
    totalNights: 4,
    pointsGained: 6,
    baselineComparison: "+6 points vs matched baseline",
  };

  return (
    <View style={styles.container}>
      {/* Premium Verdict Reveal */}
      <View style={styles.revealContainer}>
        <Text style={styles.experimentComplete}>Experiment Complete</Text>

        <Text style={styles.improvedNights}>
          {verdictData.improvedNights} / {verdictData.totalNights} nights improved
        </Text>

        <Text style={styles.pointsGained}>
          {verdictData.pointsGained} points
        </Text>

        <Text style={styles.baselineComparison}>
          {verdictData.baselineComparison}
        </Text>

        {/* Gold discovery animation placeholder */}
        <View style={styles.goldReveal} />
      </View>

      {/* CTA */}
      <TouchableOpacity style={styles.cta} onPress={() => console.log("See the Nights")}>
        <Text style={styles.ctaText}>See the Nights</Text>
      </TouchableOpacity>

      {/* Add to Sleep Twin */}
      <TouchableOpacity style={styles.twinButton} onPress={() => console.log("Add to Sleep Twin")}>
        <Text style={styles.twinButtonText}>Add to Sleep Twin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071011",
  },
  revealContainer: {
    padding: 40,
    alignItems: "center",
    marginBottom: 32,
  },
  experimentComplete: {
    color: "#D4AF6A",
    fontSize: 18,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 600,
    marginBottom: 16,
  },
  improvedNights: {
    color: "#F6F1E8",
    fontSize: 24,
    fontFamily: "Plus Jakarta Sans",
    marginBottom: 8,
  },
  pointsGained: {
    color: "#E7C98F",
    fontSize: 18,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 600,
  },
  baselineComparison: {
    color: "#929B98",
    fontSize: 14,
    fontFamily: "Plus Jakarta Sans",
    marginBottom: 24,
  },
  goldReveal: {
    width: 60,
    height: 60,
    backgroundColor: "#D4AF6A",
    borderRadius: 30,
    marginHorizontal: "auto",
    marginBottom: 20,
  },
  cta: {
    backgroundColor: "#0E6875",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  ctaText: {
    color: "#F6F1E8",
    fontSize: 16,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 500,
  },
  twinButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  twinButtonText: {
    color: "#0B5968",
    fontSize: 14,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 500,
  },
});