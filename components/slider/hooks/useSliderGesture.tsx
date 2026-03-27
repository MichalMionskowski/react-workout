import { useMemo } from "react";
import { Gesture } from "react-native-gesture-handler";
import { runOnJS, SharedValue } from "react-native-reanimated";
import {
  getNewPosition,
  getSteppedValue,
  valueToPosition,
} from "../utils/worklets";

interface Props {
  position: SharedValue<number>;
  trackLength: SharedValue<number>;
  trackStart: SharedValue<number>;
  minVal: number;
  maxVal: number;
  increment: number;
  onChange: (value: number) => void;
}

export default function useSliderGesture({
  position,
  trackLength,
  trackStart,
  minVal,
  maxVal,
  increment,
  onChange,
}: Props) {
  return useMemo(() => {
    return Gesture.Pan()
      .onChange((event) => {
        position.value = getNewPosition(
          trackLength.value,
          trackStart.value,
          event.absoluteX,
        );

        const steppedValue = getSteppedValue(
          position.value,
          trackLength.value,
          minVal,
          maxVal,
          increment,
        );

        runOnJS(onChange)(steppedValue);
      })
      .onEnd(() => {
        const steppedValue = getSteppedValue(
          position.value,
          trackLength.value,
          minVal,
          maxVal,
          increment,
        );
        position.value = valueToPosition(
          steppedValue,
          trackLength.value,
          minVal,
          maxVal,
        );
      });
  }, []);
}
