"use client";

import TwoActionDialog from "@/components/templates/shared/twoActionDialog";
import { useCart } from "@/data/cartContext";
import { placeholderImageLink } from "@/data/constants";
import { FullCartItem } from "@/data/types";
import { Add, Delete, Remove } from "@mui/icons-material";
import { Card, CardContent, CardMedia, Container, Grid2, IconButton, Typography } from "@mui/material";
import { useState } from "react";

type Props = {
  fullCartItem: FullCartItem;
};

const CartItemCard = ({ fullCartItem }: Props) => {
  const { item, quantity } = fullCartItem;
  const [openDialog, setOpenDialog] = useState(false);
  const cartContext = useCart();

  const handleRemoveClick = () => setOpenDialog(true);
  const handleConfirmRemove = () => {
    cartContext?.removeFromCart(item.id);
    setOpenDialog(false);
  };
  const handleCancel = () => setOpenDialog(false);

  return (
    <Container>
      <Card>
        <CardContent>
          <Grid2 container alignItems="center" justifyContent="space-between">
            <Grid2 display="flex" alignItems="center" gap={2}>
              <Grid2>
                <CardMedia component="img" height="140" image={item.picturePaths?.[0] || placeholderImageLink} alt={item.name} />
              </Grid2>
              <Grid2>
                <Typography>{item.name}</Typography>
              </Grid2>
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
              <IconButton onClick={() => handleRemoveClick()}>
                <Delete />
              </IconButton>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>

      <TwoActionDialog
        open={openDialog}
        onClose={handleCancel}
        onConfirm={handleConfirmRemove}
        title="Do you really want to remove this item from your cart?"
        confirmText="Remove"
        isDestructiveAction={true}
      >
        <Card>
          <Grid2 display="flex" alignItems="center" gap={2}>
            <CardMedia component="img" height="140" image={item.picturePaths?.[0] || placeholderImageLink} alt={item.name} />
            <Typography>{item.name}</Typography>
          </Grid2>
        </Card>
      </TwoActionDialog>
    </Container>
  );
};

export default CartItemCard;
