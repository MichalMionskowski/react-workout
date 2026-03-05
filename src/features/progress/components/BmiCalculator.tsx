import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useBmiCalculate from "../hooks/useBmiCalculate";
import SliderContainer from "./SliderContainer";

export default function BmiCalculator() {
  const bmiValues = useBmiCalculate();
  return (
    <View style={styles.bmiContainer}>
      <Text>BmiCalculator</Text>
      <Text>BMI: {bmiValues.bmi}</Text>
      <View style={styles.container}>
        <View style={styles.sliderContainer}>
          <SliderContainer
            value={bmiValues.weight}
            onChange={bmiValues.onWeightChange}
            increments={1}
            min={40}
            max={160}
            title="Weight"
          />

          <SliderContainer
            value={bmiValues.height}
            onChange={bmiValues.onHeightChange}
            increments={1}
            min={100}
            max={220}
            title="Height"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    paddingHorizontal: 24,
  },
  bmiContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  track: {
    position: "absolute",
    width: "80%",
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
  },
  sliderContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
  },
  thumbContainer: {
    position: "absolute",
    top: -10, // Center thumb over track (track is 4px, thumb is 24px => offset by (24-4)/2 = 10)
  },
  text: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
});
