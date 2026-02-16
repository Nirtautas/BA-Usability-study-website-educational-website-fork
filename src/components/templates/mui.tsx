"use client";

import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";

export default function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: "#CE874B",
      },
    },
  });

  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
}
