// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#E6FBFF",
    100: "#CCF7FE",
    200: "#99EEFD",
    300: "#66E6FC",
    400: "#33DDFB",
    500: "#00D5FA",
    600: "#00A0BC",
    700: "#006B7D",
    800: "#00353F",
    900: "#001519",
  },
  custom: {
    primary_dark: "#3700FF",
    primary_main: "#3101EE",
    primary_light: "#8C8C8C",
    neutral_dark: "#FFFFFF",
    neutral_main: "#DBDBDB",
    neutral_medium_main: "#C1C1C1",
    neutral_medium: "#AFAFAF",
    neutral_light: "#22294B",
    background: "#01061C",
    background_alt: "#1B213B",
  }
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      primary: {
        dark: colorTokens.custom["primary_dark"],
        main: colorTokens.custom["primary_main"],
        light: colorTokens.custom["primary_light"],
      },
      neutral: {
        dark: colorTokens.custom["neutral_dark"],
        main: colorTokens.custom["neutral_main"],
        mediumMain: colorTokens.custom["neutral_medium_main"],
        medium: colorTokens.custom["neutral_medium"],
        light: colorTokens.custom["neutral_light"],
      },
      background: {
        default: colorTokens.custom["background"],
        alt: colorTokens.custom["background_alt"]
      },
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
