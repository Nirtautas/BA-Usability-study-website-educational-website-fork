"use client";

import { getPageUrl } from "@/data/constants";
import { UniquePathFragment } from "@/utils/uniqueFragmentUtil";
import { Facebook, Instagram, LinkedIn, YouTube } from "@mui/icons-material";
import { Grid2, Link, Paper, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

type Props = {
  uniquePathFragment: UniquePathFragment;
};

export function Footer({ uniquePathFragment }: Props) {
  const t = useTranslations();

  return (
    <Paper component="footer" sx={{ bgcolor: "primary.main", color: "primary.contrastText", marginTop: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="column" justifyContent="center">
          <Typography>
            {t("Footer.resourceAttributionsText")}
            <Link href={getPageUrl.attributions(uniquePathFragment)} underline="hover" sx={{ color: "primary.contrastText" }}>
              {t("Footer.resourceAttributionsLinkText")}
            </Link>
          </Typography>
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
