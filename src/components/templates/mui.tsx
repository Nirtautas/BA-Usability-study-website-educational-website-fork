"use client";

import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";

export default function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  const defaultTheme = createTheme({});

  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
}
