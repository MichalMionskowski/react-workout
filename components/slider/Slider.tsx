import React, { useMemo } from "react";
import { View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useTheme } from "../../theme/useTheme";
import useInitSlider from "./hooks/useInitSlider";
import useSliderGesture from "./hooks/useSliderGesture";
import { getStyles } from "./SliderStyles";

type SliderProps = {
  value: number;
  onChange: (value: number) => void;
  increments?: number;
  min?: number;
  max?: number;
};

// for now this will do, need to refactor this to maybe accept styles etc, also accessibility
export default function Slider({
  value,
  onChange,
  increments = 1,
  min = 0,
  max = 100,
}: SliderProps) {
  const { colorFor } = useTheme();
  const styles = useMemo(() => {
    return getStyles(colorFor);
  }, [colorFor]);
  const {
    position,
    trackLength,
    trackStart,
    increment,
    minVal,
    maxVal,
    onLayout,
  } = useInitSlider({
    value,
    min,
    max,
    increment: increments,
  });
  const sliderDragGesture = useSliderGesture({
    position,
    trackLength,
    trackStart,
    minVal,
    maxVal,
    increment,
    onChange,
  });

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <View onLayout={onLayout} style={styles.wrapper}>
      <View style={styles.track} />
      <GestureDetector gesture={sliderDragGesture}>
        <Animated.View style={[styles.thumbContainer, containerStyle]}>
          <View style={styles.thumb} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
