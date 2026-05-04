"use client";

import { getPageUrl } from "@/data/constants";
import { useRouter } from "@/i18n/navigation";
import { UniquePathFragment } from "@/utils/uniqueFragmentUtil";
import { Facebook, Instagram, LinkedIn, YouTube } from "@mui/icons-material";
import { Button, Grid2, Paper, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

type Props = {
  uniquePathFragment: UniquePathFragment;
};

export function Footer({ uniquePathFragment }: Props) {
  const t = useTranslations();
  const router = useRouter();

  return (
    <Paper component="footer" sx={{ bgcolor: "primary.main", color: "primary.contrastText", marginTop: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="column" justifyContent="center">
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Typography>{t("Footer.resourceAttributionsText")}</Typography>
            <Button
              onClick={() => router.push(getPageUrl.attributions(uniquePathFragment))}
              sx={{
                padding: 0,
                textDecoration: "underline",
                color: "primary.contrastText",
                "&:hover": {
                  background: "none",
                  textDecoration: "underline",
                },
              }}
            >
              {t("Footer.resourceAttributionsLinkText")}
            </Button>
          </Stack>
        </Stack>
        <Stack direction="column" alignItems="flex-end">
          <Grid2 display="flex">
            <Facebook />
            <Instagram />
            <YouTube />
            <LinkedIn />
          </Grid2>
          <Typography>{t("Footer.rightsText")}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default Footer;
