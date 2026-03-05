import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export const ShopTitle = () => {
  const t = useTranslations("NavBar");

  return (
    <Typography fontFamily="elephant" fontSize={36}>
      {t("title")}
    </Typography>
  );
};
