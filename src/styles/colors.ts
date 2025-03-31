import { useTheme } from "_providers/ThemeContext";

export const Colors = {
  themes: {
    light: {
      background: "#FFFFFF",
      componentBackground: "#EFEFEF",
      text: "#212121",
      surface: "#F5F5F5",
      border: "#E0E0E0",
      primary: "#E36034",
    },
    dark: {
      background: "#212121",
      componentBackground: "#EFEFEF",
      text: "#FFFFFF",
      surface: "#424242",
      border: "#616161",
      primary: "#E36034",
    },
  },
} as const;

export type ThemeMode = "light" | "dark";
export type ThemeToken = keyof typeof Colors.themes.light;

export const useColor = (category: ThemeToken): string => {
  const { theme } = useTheme();
  return theme[category];
};
