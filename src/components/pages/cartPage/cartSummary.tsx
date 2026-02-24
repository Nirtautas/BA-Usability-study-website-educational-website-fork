"use client";

import { useCart } from "@/data/cartContext";
import { getPageUrl } from "@/data/constants";
import { FullCartItem } from "@/data/types";
import { Button, Grid2, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

type Props = {
  fullCartItems: FullCartItem[];
};

const CartSummary = ({ fullCartItems }: Props) => {
  const router = useRouter();
  const cartContext = useCart();

  const serviceFee = 2.99;
  const calculateItemTotal = (items: FullCartItem[]) => {
    return items.reduce((total, cartItem) => total + (cartItem.item.discountedPrice !== undefined ? cartItem.item.discountedPrice : cartItem.item.price) * cartItem.quantity, 0);
  };

  const calculateTotal = (items: FullCartItem[]) => {
    return calculateItemTotal(items) + (cartContext?.getUniqueItemsCount(true) !== 0 ? serviceFee : 0);
  };

  return (
    <Grid2 container>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Stack gap={0.2}>
          <Typography variant="h6">Cart Summary</Typography>
          <Typography>
            Item total:
            {calculateItemTotal(fullCartItems).toFixed(2)}€
          </Typography>
          {cartContext?.getUniqueItemsCount(true) !== 0 && <Typography>Service fee: {serviceFee.toFixed(2)}€</Typography>}
          <Typography>
            Total:
            {calculateTotal(fullCartItems).toFixed(2)}€
          </Typography>
          {calculateTotal(fullCartItems) === 0 ? (
            <Button variant="contained" disabled onClick={() => router.push(getPageUrl.checkout())}>
              Continue to checkout
            </Button>
          ) : (
            <Button variant="contained" onClick={() => router.push(getPageUrl.checkout())}>
              Continue to checkout
            </Button>
          )}
        </Stack>
      </Paper>
    </Grid2>
  );
};

export default CartSummary;
