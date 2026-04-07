"use client";

import { ShopTitle } from "@/components/shared/simpleShared";
import { getPageUrl } from "@/data/constants";
import { Button, Container, Divider, Link, Paper, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const OrderCompletePage = () => {
  const t = useTranslations("OrderCompletePage");

  return (
    <Container sx={{ width: 600 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Stack direction="column" gap={2} textAlign="center">
          <ShopTitle />
          <Typography variant="h4">{t("title")}</Typography>
          <Divider />
          <Typography>{t("orderNumberText", { orderNumber: "159486514" })}</Typography>
          <Typography>{t("description")}</Typography>
          <Link href={getPageUrl.products()}>
            <Button variant="contained">{t("goToProductsButtonText")}</Button>
          </Link>
        </Stack>
      </Paper>
    </Container>
  );
};

export default OrderCompletePage;
