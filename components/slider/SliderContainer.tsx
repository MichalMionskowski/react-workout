import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Slider from "./Slider";

interface SliderContainerProps {
  title: string;
  value: number;
  onChange: (value: number) => void;
  increments?: number;
  min?: number;
  max?: number;
}

export default function SliderContainer({
  title,
  value,
  onChange,
  increments = 1,
  min = 0,
  max = 100,
}: SliderContainerProps) {
  return (
    <View style={styles.sliderContainer}>
      <View style={styles.textContiainer}>
        <Text>{title} </Text>
        <Text style={styles.text}>{value}</Text>
      </View>
      <Slider
        value={value}
        onChange={onChange}
        increments={increments}
        min={min}
        max={max}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    flexShrink: 1,
    width: "80%",
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  textContiainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
