import { useTheme } from "@/theme/useTheme";
import React, { ReactElement } from "react";
import { View } from "react-native";
import { styles } from "./CardStyles";

interface Props {
  children: ReactElement | ReactElement[];
}

export default function Card({ children }: Props) {
  const { colorFor } = useTheme();
  const style = styles(colorFor);
  return <View style={style.cardContainer}>{children}</View>;
}
