import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function DailyContext() {
  const [context, setContext] = React.useState({
    caffeine: false,
    exercise: false,
    stress: false,
    lateMeal: false,
    windDown: false,
    travel: false,
    alcohol: false,
    feltUnwell: false,
  });

  const contexts = [
    { key: "caffeine", label: "☕ Caffeine", icon: "☕" },
    { key: "exercise", label: "🏃 Exercise", icon: "🏃" },
    { key: "stress", label: "🧠 Stress", icon: "🧠" },
    { key: "lateMeal", label: "🍽 Late Meal", icon: "🍽" },
    { key: "windDown", label: "📱 Wind-down", icon: "📱" },
    { key: "travel", label: "✈ Travel", icon: "✈" },
    { key: "alcohol", label: "🍷 Alcohol", icon: "🍷" },
    { key: "feltUnwell", label: "✨ Felt Unwell", icon: "✨" },
  ];

  const handleSubmit = () => {
    // In production: save context, trigger Twin recalculation
    console.log("Context logged:", context);
  };

  const progress = 22; // 22% as example

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>What changed yesterday?</Text>
        <Text style={styles.headerProgress}>{progress}% · almost done</Text>
      </View>

      <ScrollView style={styles.pillsContainer} contentContainerStyle={{ gap: 12 }}>
        {contexts.map((c) => (
          <TouchableOpacity
            key={c.key}
            style={styles.pill}
            onPress={() => 
              setContext(prev => ({ ...prev, [c.key]: !prev[c.key] }))
            }
          >
            <Text style={styles.pillLabel}>
              {c.label}
              {context[c.key] && <Text style={styles.pillCheck}>✓</Text>}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Done</Text>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.12)",
    marginBottom: 12,
  },
  headerTitle: {
    color: "#F6F1E8",
    fontSize: 18,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 600,
  },
  headerProgress: {
    color: "#929B98",
    fontSize: 12,
    marginLeft: 8,
    fontFamily: "Plus Jakarta Sans",
  },
  pillsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  pill: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    padding: 12,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 44,
  },
  pillLabel: {
    color: "#929B98",
    fontSize: 14,
    fontFamily: "Plus Jakarta Sans",
    flex: 1,
  },
  pillCheck: {
    color: "#3F6F52",
    fontSize: 14,
    marginLeft: 4,
    fontFamily: "Plus Jakarta Sans",
  },
  submitButton: {
    backgroundColor: "#0E6875",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    width: "100%",
  },
  submitText: {
    color: "#F6F1E8",
    fontSize: 16,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 500,
  },
});