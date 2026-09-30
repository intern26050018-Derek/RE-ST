import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function AllNighterMode() {
  return (
    <View style={styles.container}>
      {/* Mode Header with Champagne Gold accent */}
      <View style={styles.modeHeader}>
        <Text style={styles.modeTitle}>Need to stay up tonight?</Text>
        <Text style={styles.modeSubtitle}>Let's make tomorrow easier</Text>
      </View>

      {/* Before Tonight Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Before Tonight</Text>
        <View style={styles.bullet}>
          <Text style={styles.bulletIcon}>🌙</Text>
          <Text style={styles.bulletText}>
            Sleep bank: Try for 20-30 min extra sleep tonight and tomorrow night
          </Text>
        </View>
        <View style={styles.bullet}>
          <Text style={styles.bulletIcon}>☕</Text>
          <Text style={styles.bulletText}>
            Caffeine timing: Last dose by 4 PM, sets schedule for the night
          </Text>
        </View>
        <View style={styles.bullet}>
          <Text style={styles.bulletIcon}>💤</Text>
          <Text style={styles.bulletText}>
            Micro-nap planning: 20-min windows if needed during the night
          </Text>
        </View>
      </View>

      {/* During the Night Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>During the Night</Text>
        <View style={styles.bullet}>
          <Text style={styles.bulletIcon}>💧</Text>
          <Text style={styles.bulletText}>
            Hydration: Sip water, avoid excess to minimize nighttime awakenings
          </Text>
        </View>
        <View style={styles.bullet}>
          <Text style={styles.bulletIcon}>🛌</Text>
          <Text style={styles.bulletText}>
            Micro-nap: 20-minute windows if feasible, then resume
          </Text>
        </View>
        <View style={styles.bullet}>
          <Text style={styles.bulletIcon}>⚠️</Text>
          <Text style={styles.bulletText}>
            Safety: Do not drive tomorrow if awake 20+ hours — arrange alternative transport
          </Text>
        </View>
      </View>

      {/* Tomorrow Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tomorrow</Text>
        <View style={styles.bullet}>
          <Text style={styles.bulletIcon}>🌅</Text>
          <Text style={styles.bulletText}>
            Recovery plan: Earlier wind-down tonight, normal sleep window
          </Text>
        </View>
        <View style={styles.bullet}>
          <Text style={styles.bulletIcon}>🛌</Text>
          <Text style={styles.bulletText}>
            Nap window: 20-min nap possible if needed, not after 3 PM
          </Text>
        </View>
        <View style={styles.bullet}>
          <Text style={styles.bulletIcon}>📊</Text>
          <Text style={styles.bulletText}>
            Track next night: Recovery will reflect harm-minimization success
          </Text>
        </View>
      </View>

      {/* Frequency Guard CTA */}
      <View style={styles.frequencyGuard}>
        <Text style={styles.frequencyText}>
          This is the 3rd all-nighter this month — want to look at what's forcing these?
        </Text>
        <TouchableOpacity style={styles.frequencyBtn} onPress={() => console.log("View alternatives")}>
          <Text style={styles.frequencyBtnText}>Daytime-sleep alternatives</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071011",
  },
  modeHeader: {
    padding: 20,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.12)",
    marginBottom: 20,
  },
  modeTitle: {
    color: "#F6F1E8",
    fontSize: 20,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 600,
  },
  modeSubtitle: {
    color: "#D4AF6A",
    fontSize: 14,
    fontFamily: "Plus Jakarta Sans",
    marginTop: 4,
  },
  section: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: "rgba(13, 25, 27, 0.8)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  sectionTitle: {
    color: "#0B5968",
    fontSize: 14,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 600,
    marginBottom: 8,
  },
  bullet: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  bulletIcon: {
    color: "#D4AF6A",
    fontSize: 14,
  },
  bulletText: {
    color: "#929B98",
    fontSize: 13,
    fontFamily: "Plus Jakarta Sans",
  },
  frequencyGuard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  frequencyText: {
    color: "#F6F1E8",
    fontSize: 14,
    fontFamily: "Plus Jakarta Sans",
    marginBottom: 8,
  },
  frequencyBtn: {
    width: "100%",
  },
  frequencyBtnText: {
    color: "#E7C98F",
    fontSize: 13,
    fontFamily: "Plus Jakarta Sans",
    textAlign: "center",
  },
});