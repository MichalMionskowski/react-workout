import { ColorFor } from "@/theme/types";
import { useTheme } from "@/theme/useTheme";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import useInitSlider from "./hooks/useInitSlider";
import useSliderGesture from "./hooks/useSliderGesture";

type SliderProps = {
  value: number;
  onChange: (value: number) => void;
  increments?: number;
  min?: number;
  max?: number;
};

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

const getStyles = (colorFor: ColorFor) =>
  StyleSheet.create({
    wrapper: {
      width: "100%",
      height: 24,
      alignSelf: "center",
      justifyContent: "center",
    },
    track: {
      width: "100%",
      height: 4,
      backgroundColor: colorFor("sliderTrack") + "40",
      borderRadius: 2,
    },
    thumb: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colorFor("sliderThumb"),
    },
    thumbContainer: {
      position: "absolute",
      top: 0,
    },
  });
