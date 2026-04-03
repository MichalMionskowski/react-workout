import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "../../../components/card/Card";
import SliderContainer from "../../../components/slider/SliderContainer";
import useBmiCalculate from "../hooks/useBmiCalculate";

export default function BmiCalculator() {
  const bmiValues = useBmiCalculate();
  return (
    <View style={styles.wrapper}>
      <Text>BmiCalculator</Text>
      <Card>
        <View style={styles.bmiContainer}>
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
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
  bmiContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 8,
    gap: 16,
  },
  container: {
    width: "100%",
    flexDirection: "column",
    paddingHorizontal: 24,
  },
  track: {
    position: "absolute",
    width: "80%",
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
  },
  sliderContainer: {
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
  },
  text: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
});
