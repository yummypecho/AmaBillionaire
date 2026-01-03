import { useEffect, useRef } from "react";
import { ActivityIndicator, Animated, Easing, StyleSheet, Text, View } from "react-native";

export function LoadingScreen() {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.15,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.loadingContainer}>
      <Animated.View style={{ transform: [{ scale: pulse }] }}>
        <ActivityIndicator size="large" color="#4A8" />
      </Animated.View>

      <Text style={styles.loadingText}>Loading Billionaires...</Text>
      <Text style={styles.subText}>Counting yachts, private jets, and net worth data</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  subText: {
    marginTop: 6,
    color: "#aaa",
    fontSize: 14,
  },
});
