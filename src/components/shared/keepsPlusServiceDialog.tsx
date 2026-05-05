import { List, ListItem, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const KeepsPlusServiceDialogInfo = () => {
  const t = useTranslations("KeepsPlusServiceModal");

  return (
    <Stack direction="column" alignItems="center" gap={1}>
      <Typography>{t("Description.mainExplanation")}</Typography>
      <List sx={{ listStyleType: "disc" }}>
        <ListItem sx={{ display: "list-item" }}>
          <Typography>{t("Description.Perks.perk1")}</Typography>
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <Typography>{t("Description.Perks.perk2")}</Typography>
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <Typography>{t("Description.Perks.perk3")}</Typography>
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <Typography>{t("Description.Perks.perk4")}</Typography>
        </ListItem>
      </List>
      <Typography exercise-step="hiddenSubscriptionSelected">{t("Description.paymentExplanation")}</Typography>
      <Typography>{t("Description.cancellationExplanation")}</Typography>
    </Stack>
  );
};

export default KeepsPlusServiceDialogInfo;
