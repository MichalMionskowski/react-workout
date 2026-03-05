type ThemeKeysCard =
  | "cardBackground"
  | "cardBorder"
  | "cardIcon"
  | "cardSeparator"
  | "cardTitle"
  | "cardDescription";

type ThemeKeysInput =
  | "inputBackground"
  | "inputBorder"
  | "inputHint"
  | "inputText"
  | "inputIconLeft"
  | "inputIconRight";

type ThemeKeysSlider = "sliderTrack" | "sliderThumb";

type ThemeKeysButton = "buttonBackground" | "buttonIcon" | "buttonText";

type ThemeKeysMiscellaneous = "title" | "description" | "background";

export type ThemeKeys =
  | ThemeKeysMiscellaneous
  | ThemeKeysButton
  | ThemeKeysCard
  | ThemeKeysInput
  | ThemeKeysSlider;
