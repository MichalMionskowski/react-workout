import React, { useRef } from "react";
import {
  Animated,
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";

type SliderProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export default function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
}: SliderProps) {
  const pan = useRef(new Animated.Value(0)).current;
  const sliderWidth = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        let newX = gestureState.dx + (value / max) * sliderWidth.current;
        newX = Math.max(0, Math.min(newX, sliderWidth.current));
        pan.setValue(newX);
        const percantage = newX / sliderWidth.current;
        const newValue = min + percantage * (max - min);
        onChange(Math.round(newValue));
      },
    }),
  ).current;

  const onLayout = (e: LayoutChangeEvent) => {
    sliderWidth.current = e.nativeEvent.layout.width;
  };

  return (
    <View onLayout={onLayout} style={styles.container}>
      <Text>{value}</Text>
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX: pan }],
            },
          ]}
          {...panResponder.panHandlers}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  track: {
    position: "absolute",
    width: "100%",
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
  },
  thumb: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4CAF50",
    top: -10,
  },
});
