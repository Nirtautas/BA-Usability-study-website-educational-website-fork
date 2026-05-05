"use client";

import { ShopTitle } from "@/components/shared/simpleShared";
import { getPageUrl } from "@/data/constants";
import { useCompleteStepOnNavigation } from "@/data/contexts/exerciseContext/utils";
import { useRouter } from "@/i18n/navigation";
import { UniquePathFragment } from "@/utils/uniqueFragmentUtil";
import { Button, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const OrderCompletePage = () => {
  const router = useRouter();
  const params = useParams<{ uniquePathFragment: UniquePathFragment }>();
  const t = useTranslations("OrderCompletePage");
  useCompleteStepOnNavigation("completeCheckout");

  return (
    <Container sx={{ width: 600 }}>
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <Stack direction="column" gap={2} textAlign="center">
          <ShopTitle />
          <Typography variant="h4">{t("title")}</Typography>
          <Divider />
          <Typography>{t("orderNumberText", { orderNumber: "159486514" })}</Typography>
          <Typography>{t("description")}</Typography>
          <Button variant="contained" onClick={() => router.push(getPageUrl.products(params.uniquePathFragment))}>
            {t("goToProductsButtonText")}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default OrderCompletePage;
