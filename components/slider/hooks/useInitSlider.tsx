import { LayoutChangeEvent } from "react-native";
import { SharedValue, useSharedValue } from "react-native-reanimated";

interface Props {
  value: number;
  min: number;
  max: number;
  increment: number;
}

interface SliderValues {
  position: SharedValue<number>;
  trackLength: SharedValue<number>;
  trackStart: SharedValue<number>;
  increment: number;
  minVal: number;
  maxVal: number;
  onLayout: (e: LayoutChangeEvent) => void;
}

export default function useInitSlider({
  value,
  min,
  max,
  increment,
}: Props): SliderValues {
  const position = useSharedValue(value);
  const trackLength = useSharedValue(0);
  const minVal = min;
  const maxVal = max;
  const incrementVal = useSharedValue(increment);
  const trackStartX = useSharedValue(0);

  const onLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    trackLength.value = width;
    e.target.measureInWindow((x) => {
      trackStartX.value = x;
    });
  };

  return {
    position,
    trackLength,
    trackStart: trackStartX,
    increment: incrementVal.get(),
    minVal: minVal,
    maxVal: maxVal,
    onLayout,
  };
}
