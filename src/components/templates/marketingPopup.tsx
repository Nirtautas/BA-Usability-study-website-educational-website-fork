"use client";

import { Box, Button, Fade, Paper, Stack, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const MarketingPopup = () => {
  const t = useTranslations("MarketingPopup");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const refusedMarketing = sessionStorage.getItem("refusedMarketing");
    if (!refusedMarketing) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 5000);
      const timerExecuted = sessionStorage.getItem("marketingTimerExecuted");

      if (timerExecuted) {
        setOpen(true);
        return;
      } else {
        sessionStorage.setItem("marketingTimerExecuted", "true");
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("refusedMarketing", "true");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <Fade in={open} timeout={500}>
      <Box component="form" onSubmit={handleClose} position="fixed" width="100%" display="flex" justifyContent="center" bottom={4} zIndex={1000} sx={{ pointerEvents: "none" }}>
        <Paper elevation={3} sx={{ pointerEvents: "auto", padding: 1, width: 460 }}>
          <Stack direction="column" gap={1}>
            <Typography color="success.main" fontSize={20}>
              {t("title")}
            </Typography>
            <Typography fontSize={12}>{t("description")}</Typography>
            <TextField id="outlined-basic" label={t("emailPlaceholder")} size="small" variant="outlined" />
            <Stack direction="row" justifyContent="space-between" gap={1}>
              <Button onClick={handleClose} sx={{ padding: 0.7 }}>
                {t("cancelButtonText")}
              </Button>
              <Button variant="contained" type="submit" sx={{ padding: 0.7 }}>
                {t("confirmButtonText")}
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Fade>
  );
};

export default MarketingPopup;
