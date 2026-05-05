"use client";

import { serviceFee } from "@/data/constants";
import { useCart } from "@/data/contexts/cartContext";
import { DeliveryInfo, FullCartItem } from "@/data/types";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

type Props = {
  fullCartItems: FullCartItem[];
  deliveryInfo?: DeliveryInfo;
};

const CartSummary = ({ fullCartItems, deliveryInfo }: Props) => {
  const t = useTranslations("CartPage.Summary");
  const cartContext = useCart();

  return (
    <Stack gap={0.2} paddingBottom={1}>
      <Stack direction="row" display="flex" justifyContent="space-between">
        <Typography>{t("itemTotal")}</Typography>
        <Typography>{cartContext?.calculateItemTotal().toFixed(2)}€</Typography>
      </Stack>
      <Stack direction="row" display="flex" justifyContent="space-between">
        <Typography>{t("deliveryFee")}</Typography>
        <Typography>{cartContext?.getDeliveryFee(deliveryInfo?.deliveryMethod).toFixed(2)}€</Typography>
      </Stack>
      {cartContext?.getUniqueItemsCount(true) !== 0 && deliveryInfo && (
        <Stack direction="row" display="flex" justifyContent="space-between" exercise-step="hiddenCostsSelected">
          <Typography>{t("serviceFee")}</Typography>
          <Typography>{serviceFee.toFixed(2)}€</Typography>
        </Stack>
      )}
      <Divider />
      <Box bgcolor={"primary.light"} marginBlock={1}>
        <Stack direction="row" display="flex" justifyContent="space-between">
          <Typography>{t("total")}</Typography>
          <Typography>{cartContext?.calculateTotal(deliveryInfo?.deliveryMethod).toFixed(2)}€</Typography>
        </Stack>
      </Box>
      <Divider />
    </Stack>
  );
};

export default CartSummary;
