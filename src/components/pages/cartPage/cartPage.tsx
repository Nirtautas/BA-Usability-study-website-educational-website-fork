"use client";

import { useCart } from "@/data/cartContext";
import { products } from "@/data/entityData";
import { FullCartItem } from "@/data/types";
import { Button, Container, Grid2, Paper, Stack, Typography } from "@mui/material";
import CartItemCard from "./cartItemCard";

const CartPage = () => {
  const cartContext = useCart();
  const items: FullCartItem[] =
    cartContext?.cart
      .map((item) => {
        const product = products.find((p) => p.id === item.itemId);
        return { item: product, quantity: item.quantity };
      })
      .filter((i): i is FullCartItem => i.item !== undefined) || [];

  const serviceFee = 2.99;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Cart Page
      </Typography>

      <Grid2 container justifyContent="center" spacing={2}>
        <Grid2 size={7}>
          <Stack spacing={2}>
            {cartContext?.cart.length === 0 ? <Typography>Your cart is empty.</Typography> : items?.map((cartItem) => <CartItemCard key={cartItem?.item?.id} fullCartItem={cartItem} />)}
          </Stack>
        </Grid2>
        <Grid2 container display="flex">
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6">Cart Summary</Typography>
            <Typography>
              Item total:
              {items.reduce((total, cartItem) => total + (cartItem.item.discountedPrice !== undefined ? cartItem.item.discountedPrice : cartItem.item.price) * cartItem.quantity, 0).toFixed(2)}€
            </Typography>
            <Typography>Service fee: {serviceFee.toFixed(2)}€</Typography>
            <Typography>
              Total:
              {(
                items.reduce((total, cartItem) => total + (cartItem.item.discountedPrice !== undefined ? cartItem.item.discountedPrice : cartItem.item.price) * cartItem.quantity, 0) + serviceFee
              ).toFixed(2)}
              €
            </Typography>
            <Button variant="contained">Continue to checkout</Button>
          </Paper>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default CartPage;
