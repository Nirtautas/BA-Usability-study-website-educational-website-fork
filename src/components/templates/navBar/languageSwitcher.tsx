"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { KeyboardArrowDown, Language } from "@mui/icons-material";
import { Button, Grid2, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const LanguageSwitcher = () => {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const query = new URLSearchParams(useSearchParams());

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const switchLanguageTo = (newLocale: string) => {
    router.replace(
      {
        pathname,
        query: Object.fromEntries(query.entries()),
      },
      { locale: newLocale },
    );
  };

  return (
    <Grid2>
      <Button color="inherit" onClick={handleClick} sx={{ minWidth: "auto", padding: 0 }}>
        <Stack direction="column">
          <Typography>{locale.toUpperCase()}</Typography>
          <Stack direction="row">
            <Language fontSize="small" />
            <KeyboardArrowDown fontSize="small" />
          </Stack>
        </Stack>
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem selected={locale === "en"} onClick={() => switchLanguageTo("en")}>
          🇬🇧 English
        </MenuItem>
        <MenuItem selected={locale === "lt"} onClick={() => switchLanguageTo("lt")}>
          🇱🇹 Lithuanian
        </MenuItem>
      </Menu>
    </Grid2>
  );
};

export default LanguageSwitcher;
