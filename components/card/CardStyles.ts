import { ColorFor } from "@/theme/types";
import { StyleSheet } from "react-native";

export const styles = (colorFor: ColorFor) =>
  StyleSheet.create({
    cardContainer: {
      elevation: 8,
      backgroundColor: colorFor("cardBackground"),
      borderRadius: 12,
    },
  });
