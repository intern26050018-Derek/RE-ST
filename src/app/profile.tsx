import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Profile() {
  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={require("../assets/Logo_WithoutBG.png")}
          style={styles.logo}
        />
        <Text style={styles.name}>RE:ST User</Text>
      </View>

      {/* Subscription Info */}
      <View style={styles.subscription}>
        <Text style={styles.subTitle}>Subscription</Text>
        <Text style={styles.subDetails}>
          Free tier • 1 experiment/week
        </Text>
      </View>

      {/* Account Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionItem} onPress={() => console.log("Privacy Settings")}>
          <Text style={styles.actionText}>Privacy Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem} onPress={() => console.log("Delete Account")}>
          <Text style={styles.actionText}>Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem} onPress={() => console.log("Terms")}>
          <Text style={styles.actionText}>Terms & Policy</Text>
        </TouchableOpacity>
      </View>

      {/* Version */}
      <View style={styles.version}>
        <Text style={styles.versionText}>RE:ST v1.0</Text>
        <Text style={styles.versionSmall}>2026</Text>
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
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.12)",
    marginBottom: 20,
    textAlign: "center",
  },
  logo: {
    width: 60,
    height: 60,
    margin: "auto",
    marginBottom: 12,
  },
  name: {
    color: "#F6F1E8",
    fontSize: 18,
    fontFamily: "Plus Jakarta Sans",
    fontWeight: 500,
  },
  subscription: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.12)",
    marginBottom: 20,
  },
  subtitle: {
    color: "#929B98",
    fontSize: 14,
    fontFamily: "Plus Jakarta Sans",
  },
  subTitle: {
    color: "#E7C98F",
    fontSize: 14,
    fontFamily: "Plus Jakarta Sans",
    marginBottom: 4,
  },
  subDetails: {
    color: "#929B98",
    fontSize: 12,
    fontFamily: "Plus Jakarta Sans",
  },
  actions: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionItem: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionText: {
    color: "#929B98",
    fontSize: 14,
    fontFamily: "Plus Jakarta Sans",
  },
  version: {
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.12)",
    paddingTop: 12,
  },
  versionText: {
    color: "#929B98",
    fontSize: 12,
    fontFamily: "Plus Jakarta Sans",
  },
  versionSmall: {
    color: "#929B98",
    fontSize: 11,
    marginLeft: 4,
    fontFamily: "Plus Jakarta Sans",
  },
});