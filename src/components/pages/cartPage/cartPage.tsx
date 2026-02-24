"use client";

import TwoActionDialog from "@/components/shared/twoActionDialog";
import { useCart } from "@/data/cartContext";
import { products } from "@/data/entityData";
import { FullCartItem } from "@/data/types";
import { Button, Container, Grid2, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CartItemCard from "./cartItemCard";
import CartSummary from "./cartSummary";

const CartPage = () => {
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

        <CartSummary fullCartItems={items} />
      </Grid2>

      <TwoActionDialog open={openDialog} onClose={handleCancel} onConfirm={handleConfirmRemove} title="Do you really want to empty your cart?" confirmText="Empty my cart" isDestructiveAction={true} />
    </Container>
  );
};

export default CartPage;
