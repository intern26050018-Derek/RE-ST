import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function NightAuditor() {
  // Sample data - would come from actual health data ingestion
  const watchSession = {
    start: "11:42 PM",
    end: "7:10 AM",
  };

  const phoneActivity = {
    lastUnlock: "12:15 AM",
    firstUnlock: "1:00 AM",
    overnightActiveMinutes: 8,
  };

  return (
    <View style={styles.container}>
      {/* Glass Sheet */}
      <View style={styles.glassSheet}>
        {/* Watch Session */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Watch</Text>
          <Text style={styles.sessionTime}>
            {watchSession.start} → {watchSession.end}
          </Text>
        </View>

        {/* Phone Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phone activity</Text>
          <Text style={styles.activityTime}>
            Active until {phoneActivity.lastUnlock}
          </Text>
        </View>

        {/* Question */}
        <View style={styles.question}>
          <Text style={styles.questionText}>
            Was {phoneActivity.lastUnlock} closer to your actual bedtime?
          </Text>
          <Text style={{ color: "#6B7280", fontSize: 12, marginTop: 4 }}>
            (Phone was active until 1:00 AM — was this your intended bedtime?)
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => console.log("Confirm")}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => console.log("Edit")}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => console.log("Not Quite")}>
            <Text style={styles.buttonText}>Not Quite</Text>
          </TouchableOpacity>
        </View>

        {/* Why This Matters */}
        <View style={styles.matters}>
          <Text style={styles.mattersText}>Why this matters</Text>
          <Text style={{ color: "#929B98", fontSize: 12, marginTop: 4 }}>
            Phone misclassifies still wakefulness. Cross-checking sleep sessions against
            phone usage improves insight accuracy downstream.
          </Text>
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
  glassSheet: {
    backgroundColor: "rgba(13, 25, 27, 0.8)",
    borderRadius: 20,
    padding: 24,
    margin: 20,
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
  },
  section: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#929B98",
    fontSize: 12,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 500,
    width: 60,
  },
  sessionTime: {
    color: "#F6F1E8",
    fontSize: 16,
  },
  activityTime: {
    color: "#929B98",
    fontSize: 14,
  },
  question: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.12)",
  },
  questionText: {
    color: "#F6F1E8",
    fontSize: 14,
    fontFamily: "Plus Jakarta Sans",
  },
  buttons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  button: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#0B5968",
    fontSize: 13,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 500,
  },
  matters: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.12)",
  },
  mattersText: {
    color: "#929B98",
    fontSize: 12,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 500,
  },
});