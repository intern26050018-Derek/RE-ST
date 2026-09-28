import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";

export default function SleepTwin() {
  // Sample data - would come from actual PersonalFactor calculations
  const relationships = [
    {
      variable: "Late Caffeine",
      type: "possible negative",
      comparableNights: 7,
      confidence: "moderate",
      evidenceType: "observed",
      hasEvidence: true,
    },
    {
      variable: "Wake-Time Consistency",
      type: "experiment supported",
      comparableNights: 12,
      confidence: "moderate",
      evidenceType: "experimental",
      hasEvidence: true,
    },
    {
      variable: "Stress Level",
      type: "possible negative",
      comparableNights: 5,
      confidence: "low",
      evidenceType: "observed",
      hasEvidence: true,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Title and Subtitle */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Sleep Twin</Text>
        <Text style={styles.subtitle}>What your data is learning about you</Text>
      </View>

      {/* Constellation Visualization (simplified) */}
      <View style={styles.visualization}>
        {/* Peacock Blue nodes */}
        <View style={styles.node peacock} />
        <View style={styles.node peacock} />
        {/* Mehendi Green nodes */}
        <View style={styles.node mehendi} />
        <View style={styles.node mehendi} />
        {/* Gold node (experiment-supported) */}
        <View style={styles.node gold} />
      </View>

      {/* Relationship Cards */}
      <ScrollView style={styles.cardsContainer}>
        {relationships.map((rel, i) => (
          <View key={i} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardVariable}>{rel.variable}</Text>
              <Image
                source={require("../assets/chevron-right.png")}
                style={styles.cardArrow}
              />
            </View>
            <View style={styles.cardDetails}>
              <Text style={styles.cardType}>{rel.type}</Text>
              <Text style={styles.cardNights}>
                {rel.comparableNights} comparable nights
              </Text>
            </View>
            <TouchableOpacity style={styles.cardArrow} onPress={() => console.log("See Evidence")}>
              <Text style={styles.cardSeeMore}>See Evidence</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Intentional Uncertainty State */}
      <View style={styles.uncertaintyCard}>
        <Text style={styles.uncertaintyText}>
          We don't know yet.
        </Text>
        <Text style={{ color: "#929B98", fontSize: 12, marginTop: 4, fontFamily: "Plus Jakarta Sans" }}>
          This uncertainty is a designed state — honesty is the brand.
        </Text>
      </View>
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
  title: {
    color: "#F6F1E8",
    fontSize: 24,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 700,
  },
  subtitle: {
    color: "#929B98",
    fontSize: 14,
    fontFamily: "Plus Jakarta Sans",
    marginTop: 4,
  },
  visualization: {
    height: 180,
    marginHorizontal: 20,
    marginBottom: 20,
    position: "relative",
  },
  node: {
    position: "absolute",
    borderRadius: 20,
    width: 24,
    height: 24,
  },
  peacock: {
    backgroundColor: "#0B5968",
    left: 20,
    top: 60,
    border: "2px solid #D4AF6A",
  },
  mehendi: {
    backgroundColor: "#3F6F52",
    left: 60,
    top: 20,
    border: "2px solid #D4AF6A",
  },
  gold: {
    backgroundColor: "#D4AF6A",
    left: 100,
    top: 60,
    width: 20,
    height: 20,
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
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardVariable: {
    color: "#F6F1E8",
    fontSize: 14,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 500,
  },
  cardArrow: {
    color: "#929B98",
    fontSize: 12,
  },
  cardDetails: {
    flexDirection: "column",
  },
  cardType: {
    color: "#929B98",
    fontSize: 12,
    fontFamily: "Plus Jakarta Sans",
  },
  cardNights: {
    color: "#E7C98F",
    fontSize: 12,
    marginTop: 2,
    fontFamily: "Plus Jakarta Sans",
  },
  uncertaintyCard: {
    backgroundColor: "rgba(13, 25, 27, 0.8)",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    alignItems: "center",
    textAlign: "center",
  },
  uncertaintyText: {
    color: "#D4AF6A",
    fontSize: 18,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 600,
    marginBottom: 4,
  },
});