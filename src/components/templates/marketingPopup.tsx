"use client";

import { MARKETING_TIMER_EXECUTED_STORAGE_KEY, REFUSED_MARKETING_STORAGE_KEY } from "@/data/constants";
import { Box, Button, Fade, keyframes, Paper, Stack, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 8px 28px rgba(0,0,0,0.2);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }
`;

const MarketingPopup = () => {
  const t = useTranslations("MarketingPopup");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const refusedMarketing = sessionStorage.getItem(REFUSED_MARKETING_STORAGE_KEY);
    if (!refusedMarketing) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 5000);
      const timerExecuted = sessionStorage.getItem(MARKETING_TIMER_EXECUTED_STORAGE_KEY);

      if (timerExecuted) {
        setOpen(true);
        return;
      } else {
        sessionStorage.setItem(MARKETING_TIMER_EXECUTED_STORAGE_KEY, "true");
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem(REFUSED_MARKETING_STORAGE_KEY, "true");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <Fade in={open} timeout={500}>
      <Box component="form" onSubmit={handleClose} position="fixed" width="100%" display="flex" justifyContent="center" bottom={4} zIndex={1000} sx={{ pointerEvents: "none" }}>
        <Paper
          elevation={3}
          sx={{
            pointerEvents: "auto",
            padding: 1,
            width: 460,
            animation: `${pulse} 3s infinite`,
          }}
        >
          <Stack direction="column" gap={1}>
            <Typography color="success.main" fontSize={20}>
              {t("title")}
            </Typography>
            <Typography fontSize={12}>{t("description")}</Typography>
            <TextField required label={t("emailPlaceholder")} size="small" variant="outlined" />
            <Stack direction="row" justifyContent="space-between" gap={1}>
              <Button onClick={handleClose} variant="outlined" sx={{ padding: 0.7 }} exercise-step="confirmshamingSelected">
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
