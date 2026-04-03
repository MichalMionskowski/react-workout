import { StyleSheet } from "react-native";
import { ColorFor } from "../../theme/types";

export const getStyles = (colorFor: ColorFor) =>
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
