import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function DeviceHub() {
  const sources = [
    {
      id: "apple-health",
      name: "Apple Health",
      type: "healthkit",
      receives: "Sleep sessions, HR, HRV, respiratory rate, SpO2",
      usedFor: "Recovery baseline, experiment comparison",
      coverage: "Full",
      reliability: "High",
      manage: "Manage",
    },
    {
      id: "health-connect",
      name: "Health Connect",
      type: "healthconnect",
      receives: "Sleep sessions, stages, heart rate, SpO2",
      usedFor: "Recovery baseline, Twin modeling",
      coverage: "Full",
      reliability: "High",
      manage: "Manage",
    },
    {
      id: "oura",
      name: "Oura",
      type: "wearable",
      receives: "Readiness, HRV, temperature, sleep stages",
      usedFor: "Recovery scoring, context insights",
      coverage: "Available via direct API",
      reliability: "Medium",
      manage: "Manage",
    },
    {
      id: "manual",
      name: "Manual Entry",
      type: "manual",
      receives: "Full sleep session data",
      usedFor: "Baseline when no device connected",
      coverage: "Full control",
      reliability: "User-defined",
      manage: "Manage",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Data Sources</Text>
      </View>

      <ScrollView style={styles.sourcesList} contentContainerStyle={{ gap: 12 }}>
        {sources.map((source) => (
          <View key={source.id} style={styles.sourceCard}>
            <View style={styles.sourceHeader}>
              <Text style={styles.sourceName}>{source.name}</Text>
              <Text style={styles.sourceType}>{source.type}</Text>
            </View>
            <View style={styles.sourceDetails}>
              <Text style={styles.receives}>
                <Icon alt="receives" /> {source.receives}
              </Text>
              <Text style={styles.usedFor}>
                <Icon alt="used-for" /> {source.usedFor}
              </Text>
            </View>
            <View style={styles.sourceMetrics}>
              <Text style={styles.coverage}>{source.coverage}</Text>
              <Text style={styles.reliability}>{source.reliability}</Text>
            </View>
            <TouchableOpacity style={styles.manageBtn} onPress={() => console.log("Manage")}>
              <Text style={styles.manageText}>Manage</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// Simple icon component placeholder
const Icon = ({ alt }: { alt: string }) => {
  // In production: use appropriate icon
  return <Text style={{ color: "#929B98", fontSize: 16 }}>ℹ️</Text>;
};

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
    fontSize: 20,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 600,
  },
  sourcesList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  sourceCard: {
    backgroundColor: "rgba(13, 25, 27, 0.8)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  sourceHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sourceName: {
    color: "#F6F1E8",
    fontSize: 16,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 600,
  },
  sourceType: {
    color: "#929B98",
    fontSize: 11,
    fontFamily: "Plus Jakarta Sans",
  },
  sourceDetails: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.12)",
  },
  receives: {
    color: "#929B98",
    fontSize: 12,
    fontFamily: "Plus Jakarta Sans",
    flex: 1,
  },
  usedFor: {
    color: "#929B98",
    fontSize: 12,
    fontFamily: "Plus Jakarta Sans",
    flex: 1,
  },
  sourceMetrics: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 11,
  },
  coverage: {
    color: "#3F6F52",
  },
  reliability: {
    color: "#E7C98F",
  },
  manageBtn: {
    width: "100%",
    marginTop: 8,
  },
  manageText: {
    color: "#0B5968",
    fontSize: 12,
    fontFamily: "Plus Jakarta Sans",
    textAlign: "center",
  },
});