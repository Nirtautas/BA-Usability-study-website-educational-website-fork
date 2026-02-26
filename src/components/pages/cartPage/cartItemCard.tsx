"use client";

import TwoActionDialog from "@/components/shared/twoActionDialog";
import { useCart } from "@/data/cartContext";
import { placeholderImageLink } from "@/data/constants";
import { FullCartItem } from "@/data/types";
import { Add, Delete, Remove } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Grid2, IconButton, Paper, Stack, Typography } from "@mui/material";
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
    <Box>
      <Card>
        <CardContent>
          <Grid2 container alignItems="center" justifyContent="space-between">
            <Grid2 display="flex" alignItems="center" gap={2}>
              <Grid2>
                <CardMedia component="img" height="95" image={item.picturePaths?.[0] || placeholderImageLink} alt={item.name} />
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
        title={`Do you really want to remove ${item.name} from your cart?`}
        confirmText="Remove"
        isDestructiveAction={true}
      >
        <Paper elevation={3} sx={{ padding: 1 }}>
          <Stack direction="row" alignItems="center">
            <CardMedia width={150} height={150} component="img" image={item.picturePaths?.[0] || placeholderImageLink} alt={item.name} sx={{ objectFit: "contain" }} />
            <Typography width={150} noWrap>
              {item.name}
            </Typography>
          </Stack>
        </Paper>
      </TwoActionDialog>
    </Box>
  );
};

export default CartItemCard;
