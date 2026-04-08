"use client";

import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";

export default function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  const headingFont = {
    fontFamily: "var(--font-abril)",
    fontWeight: 600,
  };

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: "#2B2B2B",
        light: "#BEBEBE",
      },
    },
    typography: {
      allVariants: { textTransform: "none" },
      fontFamily: "Roboto, sans-serif",
      h1: headingFont,
      h2: headingFont,
      h3: headingFont,
      h4: headingFont,
      h5: headingFont,
      h6: headingFont,
    },
  });

  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
}
