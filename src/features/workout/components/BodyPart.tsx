import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// Static imports — required for SVG transformer to work
import BackSvg from "../../../../assets/icons/body-parts/back.svg";
import BicepsSvg from "../../../../assets/icons/body-parts/biceps.svg";

interface BodyPartProps {
  name: string;
  onPress?: (name: string) => void;
}

const iconMap: Record<string, React.FC<{ width: number; height: number }>> = {
  neck: BackSvg,
  back: BackSvg,
  chest: BackSvg,
  shoulders: BackSvg,
  waist: BackSvg,
  cardio: BackSvg,
  upper_legs: BackSvg,
  lower_legs: BackSvg,
  lower_arms: BicepsSvg,
  upper_arms: BicepsSvg,
};

export default function BodyPart({ name, onPress }: BodyPartProps) {
  const normalizedName = name.toLowerCase().replace(" ", "_");
  const SvgIcon = iconMap[normalizedName] ?? BackSvg;

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => onPress?.(name)}
    >
      <View style={styles.iconContainer}>
        <SvgIcon width={50} height={50} />
      </View>
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minWidth: 100,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  iconContainer: {
    marginBottom: 8,
  },
  iconImage: {
    width: 50,
    height: 50,
    tintColor: "#4A90E2", // This works for PNGs with transparency to change their color!
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textTransform: "capitalize",
  },
});
