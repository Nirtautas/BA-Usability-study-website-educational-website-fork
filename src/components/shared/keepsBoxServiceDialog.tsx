import { Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const KeepsBoxServiceDialogInfo = () => {
  const t = useTranslations("KeepsBoxServiceModal");

  return (
    <Stack direction="column" alignItems="center" gap={1}>
      <Typography>{t("Description.mainExplanation")}</Typography>
      <Typography exercise-step="hardToCancelSelected">{t("Description.paymentExplanation")}</Typography>
      <Typography>{t("Description.cancellationExplanation")}</Typography>
    </Stack>
  );
};

export default KeepsBoxServiceDialogInfo;
