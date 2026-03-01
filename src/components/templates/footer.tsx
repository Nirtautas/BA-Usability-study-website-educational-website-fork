"use client";

import { Facebook, Instagram, LinkedIn, YouTube } from "@mui/icons-material";
import { Grid2, Paper, Stack, Typography } from "@mui/material";

export function Footer() {
  return (
    <Paper component="footer" sx={{ bgcolor: "primary.main", marginTop: 1 }}>
      <Stack alignItems="flex-end">
        <Grid2 display="flex">
          <Facebook />
          <Instagram />
          <YouTube />
          <LinkedIn />
        </Grid2>
        <Typography>&quot;Store&quot; © 2025-2026. All rights reserved.</Typography>
      </Stack>
    </Paper>
  );
}

export default Footer;
