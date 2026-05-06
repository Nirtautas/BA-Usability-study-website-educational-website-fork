"use client";

import ActionDialogModal from "@/components/shared/actionDialogModal";
import { AllowedPathFragments, placeholderImageLink } from "@/data/constants";
import { useCart } from "@/data/contexts/cartContext";
import { FullCartItem, ProductType } from "@/data/types";
import { Add, Delete, Remove } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Grid2, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Props = {
  fullCartItem: FullCartItem;
  uniquePathFragment: string;
};

const CartItemCard = ({ fullCartItem, uniquePathFragment }: Props) => {
  const { item, quantity } = fullCartItem;
  const [openDialog, setOpenDialog] = useState(false);
  const cartContext = useCart();
  const t = useTranslations();

  const handleRemoveClick = () => setOpenDialog(true);
  const handleConfirmRemove = () => {
    cartContext?.removeFromCart(item.id);
    setOpenDialog(false);
  };
  const handleCancel = () => setOpenDialog(false);

  return (
    <Box exercise-step={item.type === ProductType.DeceptiveExtra ? "sneakIntoBasketSelected" : undefined}>
      <Card>
        <CardContent>
          <Grid2 container alignItems="center" justifyContent="space-between">
            <Grid2 display="flex" alignItems="center" gap={2}>
              <Grid2>
                <Box width={100} height={100} paddingRight={3}>
                  <CardMedia
                    component="img"
                    image={item.picturePaths?.[0] || placeholderImageLink}
                    alt={t(item.name)}
                    width="100%"
                    height="100%"
                    sx={{
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Grid2>
              <Grid2>
                <Typography>{t(item.name)}</Typography>
              </Grid2>
            </Grid2>

            <Grid2 display="flex" alignItems="center">
              <IconButton onClick={() => cartContext?.modifyCart(item.id, -1, uniquePathFragment === AllowedPathFragments.SneakIntoBasket)}>
                <Remove />
              </IconButton>
              <Typography>{quantity}</Typography>
              <IconButton onClick={() => cartContext?.modifyCart(item.id, 1, uniquePathFragment === AllowedPathFragments.SneakIntoBasket)}>
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

      <ActionDialogModal
        open={openDialog}
        onClose={handleCancel}
        onConfirm={handleConfirmRemove}
        title={t("RemoveItemFromCartModal.title", { productName: t(item.name) })}
        confirmText={t("RemoveItemFromCartModal.confirmButtonText")}
        cancelText={t("RemoveItemFromCartModal.cancelButtonText")}
        isDestructiveAction={true}
      >
        <Paper elevation={3} sx={{ padding: 1 }}>
          <Stack direction="row" alignItems="center">
            <Box width={150} height={150} paddingRight={3}>
              <CardMedia
                component="img"
                image={item.picturePaths?.[0] || placeholderImageLink}
                alt={t(item.name)}
                width="100%"
                height="100%"
                sx={{
                  objectFit: "contain",
                }}
              />
            </Box>
            <Typography noWrap>{t(item.name)}</Typography>
          </Stack>
        </Paper>
      </ActionDialogModal>
    </Box>
  );
};

export default CartItemCard;
