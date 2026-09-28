import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";

export default function RecoveryDetective() {
  // Sample evidence-ranked data
  const evidence = [
    {
      title: "Late Caffeine",
      comparableNights: 6,
      relationship: "possible negative",
      description: "Evening caffeine associated with longer sleep onset",
    },
    {
      title: "Bedtime Variability",
      comparableNights: 8,
      relationship: "negative",
      description: "Irregular bedtimes correlate with lower recovery scores",
    },
    {
      title: "Elevated Stress",
      comparableNights: 5,
      relationship: "possible negative",
      description: "High stress days show lower perceived recovery",
    },
  ];

  const unresolved = [
    {
      title: "Temperature drift pattern",
      description: "3-night temperature elevation not fully explained",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Let's Investigate</Text>
        <Text style={styles.headerQuestion}>Why did this week feel harder?</Text>
      </View>

      {/* Evidence-Ranked Cards */}
      <ScrollView style={styles.cardsContainer}>
        {evidence.map((item, i) => (
          <View key={i} style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardNights}>
                {item.comparableNights} comparable nights
              </Text>
            </View>
            <Text style={styles.cardRelationship}>{item.relationship}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>

      {/* "We Don't Know Yet" Intentional State */}
      <View style={styles.unresolvedCard}>
        <Text style={styles.unresolvedTitle}>We don't know yet.</Text>
        <Text style={styles.unresolvedSub}>
          Evidence is insufficient to draw a conclusion this week.
        </Text>
      </View>

      {/* Next Experiment CTA */}
      <TouchableOpacity style={styles.ctaButton} onPress={() => console.log("Start Next Experiment")}>
        <Text style={styles.ctaText}>Next Experiment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071011",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.12)",
    marginBottom: 20,
  },
  headerTitle: {
    color: "#F6F1E8",
    fontSize: 24,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 700,
  },
  headerQuestion: {
    color: "#929B98",
    fontSize: 14,
    fontFamily: "Plus Jakarta Sans",
    marginTop: 4,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  card: {
    backgroundColor: "rgba(13, 25, 27, 0.8)",
    borderRadius: 16,
    padding: 16,
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardTitle: {
    color: "#F6F1E8",
    fontSize: 14,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 500,
  },
  cardNights: {
    color: "#E7C98F",
    fontSize: 11,
    fontFamily: "Plus Jakarta Sans",
  },
  cardRelationship: {
    color: "#929B98",
    fontSize: 12,
    fontFamily: "Plus Jakarta Sans",
    marginBottom: 4,
  },
  cardDescription: {
    color: "#929B98",
    fontSize: 12,
    fontFamily: "Plus Jakarta Sans",
  },
  unresolvedCard: {
    backgroundColor: "rgba(13, 25, 27, 0.8)",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    textAlign: "center",
  },
  unresolvedTitle: {
    color: "#D4AF6A",
    fontSize: 18,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 600,
    marginBottom: 4,
  },
  unresolvedSub: {
    color: "#929B98",
    fontSize: 12,
    fontFamily: "Plus Jakarta Sans",
  },
  ctaButton: {
    backgroundColor: "#0E6875",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    width: "100%",
  },
  ctaText: {
    color: "#F6F1E8",
    fontSize: 16,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 500,
  },
});