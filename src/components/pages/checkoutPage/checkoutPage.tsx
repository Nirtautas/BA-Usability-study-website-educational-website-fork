"use client";

import SubheadingBold from "@/components/shared/subheadingBold";
import { useCart } from "@/data/cartContext";
import { getPageUrl } from "@/data/constants";
import { storeLocations } from "@/data/entityData";
import { DeliveryInfo } from "@/data/types";
import { useRouter } from "@/i18n/navigation";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import CartSummary from "../../shared/cartSummary";
import DeliverySelection from "./deliverySelection";
import PaymentSelection from "./paymentSelection";

const CheckoutPage = () => {
  const router = useRouter();
  const cartContext = useCart();
  const t = useTranslations();
  const cartItems = cartContext?.getFullCartItems();

  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({ deliveryMethod: "store", locationId: storeLocations[0]?.id, differentPersonPickUp: false });
  const [payment, setPayment] = useState("");
  const [bankValue, setBankValue] = useState("");

  const [deliveryError, setDeliveryError] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;

    if (!deliveryInfo.deliveryMethod) {
      setDeliveryError(t("CheckoutPage.DeliveryInformation.deliveryOptionMandatoryErrorText"));
      hasError = true;
    } else {
      setDeliveryError("");
    }

    if (!payment) {
      setPaymentError(t("CheckoutPage.PaymentInformation.paymentOptionMandatoryErrorText"));
      hasError = true;
    } else {
      setPaymentError("");
    }

    if (hasError) return;

    cartContext?.removeAllFromCart();
    router.push(getPageUrl.orderComplete());
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" justifyContent="center">
      <Stack direction="column" alignItems="center" gap={1}>
        <Box width={600}>
          <Stack direction="row" display="flex" justifyContent="space-between">
            <Typography variant="h5" gutterBottom>
              {t("CheckoutPage.title")}
            </Typography>
            <Button variant="contained" onClick={() => router.push(getPageUrl.cart())}>
              {t("CheckoutPage.backToCartButtonText")}
            </Button>
          </Stack>
        </Box>

        <Paper sx={{ width: 600, padding: 1 }}>
          <SubheadingBold headingText={t("CheckoutPage.DeliveryInformation.title")} />
          <Divider />
          <DeliverySelection deliveryInfo={deliveryInfo} setDeliveryInfo={setDeliveryInfo} error={deliveryError} />
        </Paper>
        <Paper sx={{ width: 600, padding: 1 }}>
          <SubheadingBold headingText={t("CheckoutPage.PaymentInformation.title")} />
          <Divider />
          <PaymentSelection value={payment} setValue={setPayment} error={paymentError} bankValue={bankValue} setBankValue={setBankValue} />
        </Paper>
        <Paper sx={{ width: 600, padding: 1 }}>
          <SubheadingBold headingText={t("CartPage.Summary.title")} />
          <Divider />
          <CartSummary fullCartItems={cartItems ?? []} deliveryInfo={deliveryInfo} />
          <Box display="flex" justifyContent="right" paddingTop={1}>
            <Button type="submit" variant="contained">
              {t("CheckoutPage.continueToPaymentButtonText")}
            </Button>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export default CheckoutPage;
