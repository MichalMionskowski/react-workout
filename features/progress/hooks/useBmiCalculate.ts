import React from "react";

interface BmiCalculate {
  weight: number;
  height: number;
  onWeightChange: (value: number) => void;
  onHeightChange: (value: number) => void;
  bmi: string;
}

export default function useBmiCalculate(): BmiCalculate {
  const [weight, setWeight] = React.useState(80);
  const [height, setHeight] = React.useState(170);
  const bmi = calculateBmi(weight, height);

  return {
    weight,
    height,
    onWeightChange: setWeight,
    onHeightChange: setHeight,
    bmi,
  };
}

const calculateBmi = (weight: number, height: number) => {
  return (weight / (height / 100) ** 2).toFixed(2);
};
