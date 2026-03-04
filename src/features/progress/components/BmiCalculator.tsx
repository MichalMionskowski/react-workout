import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Slider from "./Slider";

export default function BmiCalculator() {
  const [weight, setWeight] = React.useState(70);
  return (
    <View style={styles.bmiContainer}>
      <Text>BmiCalculator</Text>
      <Slider value={weight} onChange={setWeight} />
    </View>
  );
}

const styles = StyleSheet.create({
  bmiContainer: {
    flex: 1,
    flexDirection: "column",
  },
});
