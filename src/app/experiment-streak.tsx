import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function ExperimentStreak() {
  // Streak data - would come from actual experiment completion tracking
  const streak = {
    currentCount: 4,
    bestCount: 10,
    paused: {
      since: "2026-09-15",
      freeSkipsLeft: 1,
    },
  };

  const levels = [
    { threshold: 5, name: "Lab Rat" },
    { threshold: 10, name: "Self-Scientist" },
    { threshold: 25, name: "Sleep Optimizer" },
  ];

  return (
    <View style={styles.container}>
      {/* Current Streak */}
      <View style={styles.streakCurrent}>
        <Text style={styles.currentLabel}>Current Streak</Text>
        <Text style={styles.currentCount}>{streak.currentCount} Experiments Completed</Text>
      </View>

      {/* Level Progress */}
      <View style={styles.levelProgress}>
        <Text style={styles.levelName}>{levels[1].name}</Text>
        <Text style={styles.levelThreshold}>
          {levels[1].threshold} experiments to {levels[2].name}
        </Text>
      </View>

      {/* Celebration */}
      <View style={styles.celebration}>
        <Image
          source={require("../assets/chevron-right.png")}
          style={styles.celebrationIcon}
        />
        <Text style={styles.celebrationText}>You're learning what works for you.</Text>
      </View>

      {/* Calm celebration note - no red, no guilt */}
      <View style={styles.note}>
        <Text style={styles.noteText}>
          Celebrating learning, not compulsion.
        </Text>
        <Text style={styles.noteSub}>
          Skipped experiments pause the streak (one free skip per week). No anxiety UI.
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
  streakCurrent: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.12)",
    marginBottom: 20,
  },
  currentLabel: {
    color: "#929B98",
    fontSize: 12,
    fontFamily: "Plus Jakarta Sans",
  },
  currentCount: {
    color: "#F6F1E8",
    fontSize: 24,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 600,
  },
  levelProgress: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  levelName: {
    color: "#E7C98F",
    fontSize: 14,
    fontFamily: "Plus Jakarta Sans",
    marginBottom: 4,
  },
  levelThreshold: {
    color: "#929B98",
    fontSize: 12,
    fontFamily: "Plus Jakarta Sans",
  },
  celebration: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    marginHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  celebrationIcon: {
    width: 40,
    height: 40,
    marginBottom: 12,
  },
  celebrationText: {
    color: "#F6F1E8",
    fontSize: 14,
    fontFamily: "Plus Jakarta Sans",
    textAlign: "center",
  },
  note: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  noteText: {
    color: "#D4AF6A",
    fontSize: 12,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 500,
    marginBottom: 2,
  },
  noteSub: {
    color: "#929B98",
    fontSize: 11,
    fontFamily: "Plus Jakarta Sans",
  },
});