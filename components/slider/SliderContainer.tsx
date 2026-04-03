import React from "react";
import { Text, View } from "react-native";
import Slider from "./Slider";
import { styles } from "./SliderContainerStyles";

interface SliderContainerProps {
  title: string;
  value: number;
  onChange: (value: number) => void;
  increments?: number;
  min?: number;
  max?: number;
}

// this should definitely be a separate component not tightly coupled with Slider itself
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
