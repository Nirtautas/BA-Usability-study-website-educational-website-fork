"use client";

import SubheadingBold from "@/components/shared/subheadingBold";
import { useCart } from "@/data/cartContext";
import { getPageUrl } from "@/data/constants";
import { useRouter } from "@/i18n/navigation";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CartSummary from "../../shared/cartSummary";
import DeliverySelection from "./deliverySelection";
import PaymentSelection from "./paymentSelection";

const CheckoutPage = () => {
  const router = useRouter();
  const cartContext = useCart();
  const cartItems = cartContext?.getFullCartItems();

  const [delivery, setDelivery] = useState("");
  const [payment, setPayment] = useState("");
  const [bankValue, setBankValue] = useState("");

  const [deliveryError, setDeliveryError] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;

    if (!delivery) {
      setDeliveryError("Delivery option is required!");
      hasError = true;
    } else {
      setDeliveryError("");
    }

    if (!payment) {
      setPaymentError("Payment option is required!");
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
              Checkout:
            </Typography>
            <Button variant="contained" onClick={() => router.push(getPageUrl.cart())}>
              Back to cart
            </Button>
          </Stack>
        </Box>

        <Paper sx={{ width: 600, padding: 1 }}>
          <SubheadingBold headingText="Choose delivery method:" />
          <Divider />
          <DeliverySelection value={delivery} setValue={setDelivery} error={deliveryError} />
        </Paper>
        <Paper sx={{ width: 600, padding: 1 }}>
          <SubheadingBold headingText="Choose payment method:" />
          <Divider />
          <PaymentSelection value={payment} setValue={setPayment} error={paymentError} bankValue={bankValue} setBankValue={setBankValue} />
        </Paper>
        <Paper sx={{ width: 600, padding: 1 }}>
          <SubheadingBold headingText="Cart summary" />
          <Divider />
          <CartSummary fullCartItems={cartItems ?? []} />
          <Box display="flex" justifyContent="right" paddingTop={1}>
            <Button type="submit" variant="contained">
              Continue to payment
            </Button>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export default CheckoutPage;
