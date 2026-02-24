"use client";

import TwoActionDialog from "@/components/shared/twoActionDialog";
import { useCart } from "@/data/cartContext";
import { getPageUrl } from "@/data/constants";
import { products } from "@/data/entityData";
import { FullCartItem } from "@/data/types";
import { Button, Container, Grid2, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CartItemCard from "./cartItemCard";

const CartPage = () => {
  const router = useRouter();
  const cartContext = useCart();
  const [openDialog, setOpenDialog] = useState(false);

  const handleRemoveClick = () => setOpenDialog(true);
  const handleCancel = () => setOpenDialog(false);
  const handleConfirmRemove = () => {
    cartContext?.removeAllFromCart();
    setOpenDialog(false);
  };

  const items: FullCartItem[] =
    cartContext?.cart
      .map((item) => {
        const product = products.find((p) => p.id === item.itemId);
        return { item: product, quantity: item.quantity };
      })
      .filter((i): i is FullCartItem => i.item !== undefined) || [];

  const serviceFee = 2.99;
  const calculateItemTotal = (items: FullCartItem[]) => {
    return items.reduce((total, cartItem) => total + (cartItem.item.discountedPrice !== undefined ? cartItem.item.discountedPrice : cartItem.item.price) * cartItem.quantity, 0);
  };

  const calculateTotal = (items: FullCartItem[]) => {
    return calculateItemTotal(items) + (cartContext?.getUniqueItemsCount(true) !== 0 ? serviceFee : 0);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Cart Page
      </Typography>

      <Grid2 container justifyContent="center">
        <Grid2 size={7}>
          <Grid2>
            {cartContext?.cart.length !== 0 ? (
              <>
                <Grid2 display="flex" justifyContent="space-between">
                  <Typography variant="h5" gutterBottom>
                    Items in your cart:
                  </Typography>
                  <Button color="error" variant="contained" onClick={handleRemoveClick}>
                    Empty cart
                  </Button>
                </Grid2>
              </>
            ) : (
              <Typography variant="h5" gutterBottom>
                Your cart is empty.
              </Typography>
            )}
          </Grid2>
          <Stack spacing={2}>
            {items.map((cartItem) => (
              <CartItemCard key={cartItem.item.id} fullCartItem={cartItem} />
            ))}
          </Stack>
        </Grid2>

        <Grid2 container>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Stack gap={0.2}>
              <Typography variant="h6">Cart Summary</Typography>
              <Typography>
                Item total:
                {calculateItemTotal(items).toFixed(2)}€
              </Typography>
              {cartContext?.getUniqueItemsCount(true) !== 0 && <Typography>Service fee: {serviceFee.toFixed(2)}€</Typography>}
              <Typography>
                Total:
                {calculateTotal(items).toFixed(2)}€
              </Typography>
              {calculateTotal(items) === 0 ? (
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
      </Grid2>

      <TwoActionDialog open={openDialog} onClose={handleCancel} onConfirm={handleConfirmRemove} title="Do you really want to empty your cart?" confirmText="Empty my cart" isDestructiveAction={true} />
    </Container>
  );
};

export default CartPage;
