import { colors } from "./colors";
import { ThemeKeys } from "./keys";
export const theme: Record<ThemeKeys, string[]> = {
  title: [colors.light.onPrimary, colors.dark.onPrimary],
  description: [colors.light.onPrimary, colors.dark.onPrimary],
  background: [colors.light.primary, colors.dark.primary],
  buttonBackground: [colors.light.onPrimary, colors.dark.onPrimary],
  buttonIcon: [colors.light.primary, colors.dark.primary],
  buttonText: [colors.light.primary, colors.dark.primary],
  cardBackground: [colors.light.onPrimary, colors.dark.onPrimary],
  cardBorder: [colors.light.primary, colors.dark.primary],
  cardIcon: [colors.light.primary, colors.dark.primary],
  cardSeparator: [colors.light.primary, colors.dark.primary],
  cardTitle: [colors.light.primary, colors.dark.primary],
  cardDescription: [colors.light.primary, colors.dark.primary],
  inputBackground: [colors.light.onPrimary, colors.dark.onPrimary],
  inputBorder: [colors.light.primary, colors.dark.primary],
  inputHint: [colors.light.primary, colors.dark.primary],
  inputText: [colors.light.primary, colors.dark.primary],
  inputIconLeft: [colors.light.primary, colors.dark.primary],
  inputIconRight: [colors.light.primary, colors.dark.primary],
  sliderTrack: [colors.light.onPrimary, colors.dark.onPrimary],
  sliderThumb: [
    colors.light.onPrimaryContainer,
    colors.dark.onPrimaryContainer,
  ],
};
