import { createContext } from "react";
import { ThemeKeys } from "./keys";
import { VariantKeys } from "./variants";

export type ColorFor = (key: ThemeKeys) => string;

interface ThemeContextType {
  currTheme: VariantKeys;
  toggleTheme: () => void; // for light/dark variants
  colorFor: ColorFor;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
