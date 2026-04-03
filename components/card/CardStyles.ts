import { StyleSheet } from "react-native";
import { ColorFor } from "../../theme/types";

export const styles = (colorFor: ColorFor) =>
  StyleSheet.create({
    cardContainer: {
      elevation: 8,
      backgroundColor: colorFor("cardBackground"),
      borderRadius: 12,
    },
  });
