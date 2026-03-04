import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BmiCalculator from "./components/BmiCalculator";

export default function ProgressScreen() {
  return (
    <View style={styles.progressContainer}>
      <Text>ProgressScreen</Text>
      <BmiCalculator />
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 16,
  },
});
