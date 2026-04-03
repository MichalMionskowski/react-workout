// ThemeProvider.tsx

import { ReactElement, useState } from "react";
import { ThemeKeys } from "./keys";
import { theme } from "./theme";
import { ColorFor, ThemeContext } from "./types";
import { VariantKeys } from "./variants";

interface ThemeProviderProps {
  children: ReactElement | ReactElement[];
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currTheme, setCurrTheme] = useState(VariantKeys.LIGHT);

  // light/dark variants
  const toggleTheme = () => {
    setCurrTheme(
      currTheme === VariantKeys.LIGHT ? VariantKeys.DARK : VariantKeys.LIGHT,
    );
  };

  // robust brand variants
  const setTheme = (variantKey: VariantKeys) => {
    setCurrTheme(variantKey);
  };

  const colorFor: ColorFor = (key: ThemeKeys): string =>
    theme[key]?.[currTheme] ?? "transparent";

  return (
    <ThemeContext.Provider value={{ currTheme, toggleTheme, colorFor }}>
      {children}
    </ThemeContext.Provider>
  );
}
