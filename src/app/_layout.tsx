import * as React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { useColorScheme } from "react-native";
import { router } from "expo-router";

// Brand colors from RE:ST design system
const COLORS = {
  obsidian: "#071011",
  elevatedObsidian: "#0D191B",
  peacockBlue: "#0B5968",
  richPeacock: "#0E6875",
  mehendiGreen: "#3F6F52",
  deepMehendi: "#28523C",
  antiqueGold: "#D4AF6A",
  champagneGold: "#E7C98F",
  ivory: "#F6F1E8",
  softIvory: "#D8D1C4",
  mutedText: "#929B98",
};

const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.obsidian,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.obsidian,
  },
});

// Keep splash visible during initial load
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <View style={baseStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.obsidian} />
    </View>
  );
}

/* Expo Router types */
declare module "expo-router" {
  interface RootStackParamList {
    home: undefined;
    onboarding: undefined;
    morningBrief: undefined;
    twin: undefined;
    experiments: undefined;
    insights: undefined;
    profile: undefined;
    nightAuditor: undefined;
    dailyContext: undefined;
    experimentVerdict: undefined;
    recoveryDetective: undefined;
    experimentStreak: undefined;
    deviceHub: undefined;
    allNighterMode: undefined;
    premiumReport: undefined;
  }
}