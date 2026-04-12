"use client";

import SubheadingBold from "@/components/shared/subheadingBold";
import TwoActionDialog from "@/components/shared/twoActionDialog";
import { useCart } from "@/data/cartContext";
import { getPageUrl } from "@/data/constants";
import { useRouter } from "@/i18n/navigation";
import { Box, Button, Container, Divider, Grid2, Link, Paper, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import CartSummary from "../../shared/cartSummary";
import CartItemCard from "./cartItemCard";

const CartPage = () => {
  const cartContext = useCart();
  const router = useRouter();
  const t = useTranslations();
  const [openDialog, setOpenDialog] = useState(false);

  const handleRemoveClick = () => setOpenDialog(true);
  const handleCancel = () => setOpenDialog(false);
  const handleConfirmRemove = () => {
    cartContext?.removeAllFromCart();
    setOpenDialog(false);
  };

  const items = cartContext?.getFullCartItems();

  return (
    <Container>
      <Grid2 container justifyContent="center" gap={2}>
        <Grid2 size={7}>
          <Stack spacing={2}>
            {cartContext?.cart.length !== 0 ? (
              <Box>
                <Stack direction="row" display="flex" gap={1}>
                  <Typography variant="h5" gutterBottom>
                    {t("CartPage.title")}
                  </Typography>
                  <Button variant="contained" onClick={() => router.push(getPageUrl.products())} sx={{ marginLeft: "auto" }}>
                    {t("CartPage.goToProductsButtonText")}
                  </Button>
                  <Button color="error" variant="contained" onClick={handleRemoveClick}>
                    {t("CartPage.emptyCartButtonText")}
                  </Button>
                </Stack>
              </Box>
            ) : (
              <Stack direction="row" display="flex" justifyContent="space-between">
                <Typography variant="h5" gutterBottom>
                  {t("CartPage.cartIsEmptyText")}
                </Typography>
                <Link href={getPageUrl.products()}>
                  <Button variant="contained">{t("CartPage.goToProductsButtonText")}</Button>
                </Link>
              </Stack>
            )}

            <Divider />

            {items?.map((cartItem) => (
              <CartItemCard key={cartItem.item.id} fullCartItem={cartItem} />
            ))}
          </Stack>
        </Grid2>

        <Grid2 container>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <SubheadingBold headingText={t("CartPage.Summary.title")} />
            <CartSummary fullCartItems={items ?? []} />

            {cartContext?.calculateTotal() === 0 ? (
              <Button variant="contained" disabled onClick={() => router.push(getPageUrl.checkout())}>
                {t("CartPage.Summary.continueToCheckoutButtonText")}
              </Button>
            ) : (
              <Button variant="contained" onClick={() => router.push(getPageUrl.checkout())}>
                {t("CartPage.Summary.continueToCheckoutButtonText")}
              </Button>
            )}
          </Paper>
        </Grid2>
      </Grid2>

      <TwoActionDialog
        open={openDialog}
        onClose={handleCancel}
        onConfirm={handleConfirmRemove}
        title={t("EmptyCartModal.title")}
        cancelText={t("EmptyCartModal.cancelButtonText")}
        confirmText={t("EmptyCartModal.confirmButtonText")}
        isDestructiveAction={true}
      />
    </Container>
  );
};

export default CartPage;
