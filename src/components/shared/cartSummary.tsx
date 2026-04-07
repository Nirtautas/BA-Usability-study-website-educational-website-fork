"use client";

import { useCart } from "@/data/cartContext";
import { serviceFee } from "@/data/constants";
import { FullCartItem } from "@/data/types";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

type Props = {
  fullCartItems: FullCartItem[];
};

const CartSummary = ({ fullCartItems }: Props) => {
  const t = useTranslations("CartPage.Summary");
  const cartContext = useCart();

  return (
    <Stack gap={0.2}>
      <Stack direction="row" display="flex" justifyContent="space-between">
        <Typography>{t("itemTotal")}</Typography>
        <Typography>{cartContext?.calculateItemTotal().toFixed(2)}€</Typography>
      </Stack>
      {cartContext?.getUniqueItemsCount(true) !== 0 && (
        <Stack direction="row" display="flex" justifyContent="space-between">
          <Typography>{t("serviceFee")}</Typography>
          <Typography>{serviceFee.toFixed(2)}€</Typography>
        </Stack>
      )}
      <Divider />
      <Box bgcolor={"primary.light"} marginBlock={1}>
        <Stack direction="row" display="flex" justifyContent="space-between">
          <Typography>{t("total")}</Typography>
          <Typography>{cartContext?.calculateTotal().toFixed(2)}€</Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default CartSummary;
