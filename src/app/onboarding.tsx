import * as React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import * as SplashScreen from "expo-splash-screen";

// Keep splash visible while onboarding is loading
SplashScreen.preventAutoHideAsync();

export default function Onboarding() {
  const [screen, setScreen] = useState(1);

  const screens = [
    {
      title: "Don't just track your sleep.",
      subtitle: "Learn what changes your recovery.",
      cta: "Start Learning",
      icon: "🌙",
      visual: require("../assets/Logo_WithoutBG.png"), // Placeholder - will use actual illustration
    },
    {
      title: "Bring your sleep data with you.",
      subtitle: "Apple Health | Health Connect | Manual Entry",
      cta: "Continue",
      icon: "📱",
    },
    {
      title: "Show a realistic Morning Brief preview.",
      subtitle: "See how your recovery looks in RE:ST",
      cta: "See My First Brief",
      icon: "📊",
    },
  ];

  const handleCtaPress = () => {
    if (screen < 3) {
      setScreen(screen + 1);
    } else {
      // Onboarding complete - navigate to home
      router.push("/home");
    }
  };

  const screenData = screens[screen - 1];

  return (
    <View style={{ flex: 1, backgroundColor: "#071011" }}>
      <View style={{ width: "80%", padding: 24, marginBottom: 24 }}>
        <Image
          source={screenData.visual as any}
          style={StyleSheet.absoluteFill}
          resizeMode="contain"
        />
        <View>
          <Text style={{ color: "#0B5968", fontSize: 24, fontWeight: 600, fontFamily: "Plus Jakarta Sans", textAlign: "center", marginBottom: 8 }}>
            {screenData.title}
          </Text>
          <Text style={{ color: "#929B98", fontSize: 14, fontFamily: "Plus Jakarta Sans", textAlign: "center", marginBottom: 24 }}>
            {screenData.subtitle}
          </Text>
          <TouchableOpacity style={{ 
            backgroundColor: "#0E6875", 
            paddingVertical: 12, 
            paddingHorizontal: 24, 
            borderRadius: 28, 
            marginTop: 24, 
            width: "100%",
            alignItems: "center" 
          } onPress={handleCtaPress}>
            <Text style={{ color: "#F6F1E8", fontSize: 16, fontFamily: "Plus Jakarta Sans", fontWeight: 500 }}>{screenData.cta}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}