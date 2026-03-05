import { ColorFor } from "@/theme/types";
import { useTheme } from "@/theme/useTheme";
import React from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

type SliderProps = {
  value: number;
  onChange: (value: number) => void;
  increments?: number;
  min?: number;
  max?: number;
};

const THUMB_SIZE = 24;

const getNewPosition = (
  trackLength: number,
  trackStartX: number,
  absoluteX: number,
) => {
  "worklet";
  return Math.max(
    0,
    Math.min(trackLength - THUMB_SIZE, absoluteX - trackStartX),
  );
};

const getSteppedValue = (
  positionX: number,
  trackLength: number,
  minVal: number,
  maxVal: number,
  increments: number,
) => {
  "worklet";
  const percentage = positionX / (trackLength - THUMB_SIZE);
  const newValue = minVal + percentage * (maxVal - minVal);
  return Math.round(newValue / increments) * increments;
};

const valueToPosition = (
  value: number,
  trackLength: number,
  min: number,
  max: number,
): number => {
  "worklet";
  return ((value - min) / (max - min)) * (trackLength - THUMB_SIZE);
};

export default function Slider({
  value,
  onChange,
  increments = 1,
  min = 0,
  max = 100,
}: SliderProps) {
  const { colorFor } = useTheme();
  const styles = _styles(colorFor);
  const positionX = useSharedValue(value);
  const trackLength = useSharedValue(0);
  const minVal = useSharedValue(min);
  const maxVal = useSharedValue(max);
  const incrementsVal = useSharedValue(increments);
  const trackStartX = useSharedValue(0);

  const dragX = Gesture.Pan()
    .onChange((event) => {
      positionX.value = getNewPosition(
        trackLength.value,
        trackStartX.value,
        event.absoluteX,
      );

      const steppedValue = getSteppedValue(
        positionX.value,
        trackLength.value,
        minVal.value,
        maxVal.value,
        incrementsVal.value,
      );

      if (steppedValue !== value) {
        runOnJS(onChange)(steppedValue);
      }
    })
    .onEnd(() => {
      const steppedValue = getSteppedValue(
        positionX.value,
        trackLength.value,
        minVal.value,
        maxVal.value,
        incrementsVal.value,
      );
      positionX.value = valueToPosition(
        steppedValue,
        trackLength.value,
        minVal.value,
        maxVal.value,
      );
    });

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: positionX.value }],
  }));

  const onLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    trackLength.value = width;
    e.target.measureInWindow((x) => {
      trackStartX.value = x;
    });
  };

  return (
    <View onLayout={onLayout} style={styles.wrapper}>
      <View style={styles.track} />
      <GestureDetector gesture={dragX}>
        <Animated.View style={[styles.thumbContainer, containerStyle]}>
          <View style={styles.thumb} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const _styles = (colorFor: ColorFor) =>
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
      backgroundColor: colorFor("sliderTrack"),
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
      top: 0, // wrapper is 24px tall, thumb is 24px tall - fills wrapper = centered on 4px track
    },
  });
