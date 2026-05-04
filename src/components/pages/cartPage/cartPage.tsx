"use client";

import ActionDialogModal from "@/components/shared/actionDialogModal";
import SubheadingBold from "@/components/shared/subheadingBold";
import { getPageUrl } from "@/data/constants";
import { useCart } from "@/data/contexts/cartContext";
import { useRouter } from "@/i18n/navigation";
import { UniquePathFragment } from "@/utils/uniqueFragmentUtil";
import { LocalFireDepartment } from "@mui/icons-material";
import { Box, Button, Container, Divider, Grid2, Link, Paper, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import CartSummary from "../../shared/cartSummary";
import CartItemCard from "./cartItemCard";

const CartPage = () => {
  const params = useParams<{ uniquePathFragment: UniquePathFragment }>();
  const cartContext = useCart();

  const TIMER_DURATION = 1000 * 60 * 5 - 1000;
  const highDemandTimer = useTimer({
    expiryTimestamp: new Date(Date.now() + TIMER_DURATION),
    autoStart: true,
  });

  useEffect(() => {
    if (!highDemandTimer.isRunning && highDemandTimer.totalSeconds === 0) {
      const nextExpiry = new Date(Date.now() + TIMER_DURATION);
      highDemandTimer.restart(nextExpiry, true);
    }
  }, [highDemandTimer.isRunning]);

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
              <Box paddingTop={2}>
                <Stack direction="row" display="flex" gap={1}>
                  <Typography variant="h5" gutterBottom>
                    {t("CartPage.title")}
                  </Typography>
                  <Button variant="contained" onClick={() => router.push(getPageUrl.products(params.uniquePathFragment))} sx={{ marginLeft: "auto" }}>
                    {t("CartPage.goToProductsButtonText")}
                  </Button>
                  <Button color="error" variant="contained" onClick={handleRemoveClick}>
                    {t("CartPage.emptyCartButtonText")}
                  </Button>
                </Stack>
              </Box>
            ) : (
              <Stack direction="row" display="flex" justifyContent="space-between" paddingTop={2}>
                <Typography variant="h5" gutterBottom>
                  {t("CartPage.cartIsEmptyText")}
                </Typography>
                <Link href={getPageUrl.products(params.uniquePathFragment)}>
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

        <Stack direction="column" gap={1} marginTop={2}>
          {!cartContext?.allItemsAreSubscriptions() && (cartContext?.getFullCartItems().length ?? 0) > 0 && (
            <Paper elevation={3} sx={{ padding: 1, paddingInline: 2, bgcolor: "warning.light" }}>
              <Stack direction="column">
                <Stack direction="row">
                  <LocalFireDepartment />
                  <Typography>{t("CartPage.highDemandTimerTitle")}</Typography>
                </Stack>

                <Divider />
                <Typography fontWeight={600}>{t("CartPage.orderReservationText", { minutes: highDemandTimer.minutes, seconds: String(highDemandTimer.seconds).padStart(2, "0") })}</Typography>
              </Stack>
            </Paper>
          )}
          <Paper elevation={3} sx={{ padding: 2 }}>
            <SubheadingBold headingText={t("CartPage.Summary.title")} />
            <Divider />
            <CartSummary fullCartItems={items ?? []} />

            {cartContext?.calculateTotal() === 0 ? (
              <Button variant="contained" disabled onClick={() => router.push(getPageUrl.checkout(params.uniquePathFragment))} fullWidth>
                {t("CartPage.Summary.continueToCheckoutButtonText")}
              </Button>
            ) : (
              <Button variant="contained" onClick={() => router.push(getPageUrl.checkout(params.uniquePathFragment))} fullWidth>
                {t("CartPage.Summary.continueToCheckoutButtonText")}
              </Button>
            )}
          </Paper>
        </Stack>
      </Grid2>

      <ActionDialogModal
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
