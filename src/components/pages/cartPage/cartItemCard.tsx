"use client";

import { useCart } from "@/data/cartContext";
import { placeholderImageLink } from "@/data/constants";
import { FullCartItem } from "@/data/types";
import { Add, Delete, Remove } from "@mui/icons-material";
import { Card, CardContent, CardMedia, Grid2, IconButton, Typography } from "@mui/material";

type Props = {
  fullCartItem: FullCartItem;
};

const CartItemCard = ({ fullCartItem }: Props) => {
  const { item, quantity } = fullCartItem;
  const cartContext = useCart();

  return (
    <Card>
      <CardContent>
        <Grid2 container alignItems="center" justifyContent="space-between">
          <Grid2 display="flex" alignItems="center" gap={2}>
            <CardMedia component="img" height="140" image={item.picturePaths?.[0] || placeholderImageLink} alt={item.name} />
            <Typography>{item.name}</Typography>
          </Grid2>
          <Grid2 display="flex" alignItems="center">
            <IconButton onClick={() => cartContext?.modifyCart(item.id, -1)}>
              <Remove />
            </IconButton>
            <Typography>{quantity}</Typography>
            <IconButton onClick={() => cartContext?.modifyCart(item.id, 1)}>
              <Add />
            </IconButton>
            <Typography>{((item.discountedPrice !== undefined ? item.discountedPrice : item.price) * quantity).toFixed(2)}€</Typography>
            <IconButton onClick={() => cartContext?.removeFromCart(item.id)}>
              <Delete />
            </IconButton>
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default CartItemCard;
