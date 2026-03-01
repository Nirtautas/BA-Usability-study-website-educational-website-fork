"use client";

import { useCart } from "@/data/cartContext";
import { serviceFee } from "@/data/constants";
import { FullCartItem } from "@/data/types";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

type Props = {
  fullCartItems: FullCartItem[];
};

const CartSummary = ({ fullCartItems }: Props) => {
  const router = useRouter();
  const cartContext = useCart();

  return (
    <Stack gap={0.2}>
      <Stack direction="row" display="flex" justifyContent="space-between">
        <Typography>Item total:</Typography>
        <Typography>{cartContext?.calculateItemTotal().toFixed(2)}€</Typography>
      </Stack>
      {cartContext?.getUniqueItemsCount(true) !== 0 && (
        <Stack direction="row" display="flex" justifyContent="space-between">
          <Typography>Service fee:</Typography>
          <Typography>{serviceFee.toFixed(2)}€</Typography>
        </Stack>
      )}
      <Divider />
      <Box bgcolor={"primary.light"} marginBlock={1}>
        <Stack direction="row" display="flex" justifyContent="space-between">
          <Typography>Total:</Typography>
          <Typography>{cartContext?.calculateTotal().toFixed(2)}€</Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default CartSummary;
