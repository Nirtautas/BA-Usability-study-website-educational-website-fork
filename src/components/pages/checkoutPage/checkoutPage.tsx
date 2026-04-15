"use client";

import ActionDialogModal from "@/components/shared/actionDialogModal";
import KeepsPlusServiceDialogInfo from "@/components/shared/keepsPlusServiceDialog";
import SubheadingBold from "@/components/shared/subheadingBold";
import { useCart } from "@/data/cartContext";
import { getPageUrl } from "@/data/constants";
import { storeLocations } from "@/data/entityData";
import { useSubscriptionContext } from "@/data/subscriptionContext";
import { DeliveryInfo } from "@/data/types";
import { useUserContext } from "@/data/userContext";
import { useRouter } from "@/i18n/navigation";
import { CheckOutlined } from "@mui/icons-material";
import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, FormHelperText, Paper, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import CartSummary from "../../shared/cartSummary";
import DeliverySelection from "./deliverySelection";
import PaymentSelection from "./paymentSelection";

const CheckoutPage = () => {
  const router = useRouter();
  const cartContext = useCart();
  const userContext = useUserContext();
  const subscriptionContext = useSubscriptionContext();
  const t = useTranslations();
  const cartItems = cartContext?.getFullCartItems();

  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({ deliveryMethod: "store", locationId: storeLocations[0]?.id, differentPersonPickUp: false });
  const [payment, setPayment] = useState("");
  const [bankValue, setBankValue] = useState("");

  const [deliveryError, setDeliveryError] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const [termsAccepted, setTermsAccepted] = useState(true);
  const [termsError, setTermsError] = useState("");
  const [keepsPlusAccepted, setKeepsPlusAccepted] = useState(true);

  const [openKeepsPlusServiceDialog, setOpenKeepsPlusServiceDialog] = useState(false);

  useEffect(() => {
    if (cartContext?.cart.length === 0) {
      router.push(getPageUrl.products());
    }
  }, []);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;

    if (!deliveryInfo.deliveryMethod) {
      setDeliveryError(t("CheckoutPage.DeliveryInformation.deliveryOptionMandatoryErrorText"));
      hasError = true;
    } else {
      setDeliveryError("");
    }

    if (!cartContext?.allItemsAreSubscriptions() && !payment) {
      setPaymentError(t("CheckoutPage.PaymentInformation.paymentOptionMandatoryErrorText"));
      hasError = true;
    } else {
      setPaymentError("");
    }

    if (!termsAccepted) {
      setTermsError(t("CheckoutPage.termsAndConditionsMandatoryErrorText"));
      hasError = true;
    } else {
      setTermsError("");
    }

    if (hasError) return;

    const loggedInUserData = userContext?.getLoggedInUserData();
    if (loggedInUserData) {
      const keepsPlusSubscriptionId = subscriptionContext?.getKeepsPlusSubscriptionId();
      if (!cartContext?.allItemsAreSubscriptions() && keepsPlusAccepted && keepsPlusSubscriptionId) {
        subscriptionContext?.linkSubscriptionToCurrentUser(keepsPlusSubscriptionId, loggedInUserData.id);
      }
      subscriptionContext?.linkCartSubscriptionsToCurrentUser();
      cartContext?.removeAllFromCart();
      router.push(getPageUrl.orderComplete());
    } else {
      router.push(getPageUrl.login().concat(`?checkoutRedirect=true&keepsPlusAccepted=${keepsPlusAccepted}`));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" justifyContent="center">
      <Stack direction="column" alignItems="center" gap={1}>
        <Box width={700}>
          <Stack direction="row" display="flex" justifyContent="space-between">
            <Typography variant="h5" gutterBottom>
              {t("CheckoutPage.title")}
            </Typography>
            <Button variant="contained" onClick={() => router.push(getPageUrl.cart())}>
              {t("CheckoutPage.backToCartButtonText")}
            </Button>
          </Stack>
        </Box>

        {userContext?.getLoggedInUserData() ? (
          <Paper sx={{ width: 700, padding: 1, bgcolor: "success.light" }}>
            <Typography alignItems="center" display="flex" gap={1}>
              <CheckOutlined />
              {t("CheckoutPage.loggedInAsText", {
                firstName: userContext.getLoggedInUserData()?.firstName ?? "null",
                lastName: userContext.getLoggedInUserData()?.lastName ?? "null",
              })}
            </Typography>
          </Paper>
        ) : (
          <></>
        )}

        {!cartContext?.allItemsAreSubscriptions() && (
          <Paper sx={{ width: 700, padding: 1 }}>
            <SubheadingBold headingText={t("CheckoutPage.DeliveryInformation.title")} />
            <Divider />
            <DeliverySelection deliveryInfo={deliveryInfo} setDeliveryInfo={setDeliveryInfo} error={deliveryError} />
          </Paper>
        )}

        <Paper sx={{ width: 700, padding: 1 }}>
          <SubheadingBold headingText={t("CheckoutPage.PaymentInformation.title")} />
          <Divider />
          <PaymentSelection value={payment} setValue={setPayment} error={paymentError} bankValue={bankValue} setBankValue={setBankValue} />
        </Paper>

        <Paper sx={{ width: 700, padding: 1 }}>
          <SubheadingBold headingText={t("CartPage.Summary.title")} />
          <Divider />
          <CartSummary fullCartItems={cartItems ?? []} deliveryInfo={deliveryInfo} />

          <FormGroup>
            {termsError?.length != 0 && <FormHelperText error={termsError?.length != 0}>{t("CheckoutPage.termsAndConditionsMandatoryErrorText")}</FormHelperText>}

            <FormControlLabel
              control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
              label={<Typography>{t("CheckoutPage.termsAndConditionsCheckboxText")} </Typography>}
            />

            {!cartContext?.allItemsAreSubscriptions() && !subscriptionContext?.userHasKeepsPlusSubscription() && (
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <FormControlLabel
                  control={<Checkbox checked={keepsPlusAccepted} onChange={(e) => setKeepsPlusAccepted(e.target.checked)} />}
                  label={<Typography>{t("CheckoutPage.freeShippingOfferCheckboxText")} </Typography>}
                />

                <Button onClick={() => setOpenKeepsPlusServiceDialog(true)} variant="text">
                  <Typography fontSize={14} textAlign="right" sx={{ textDecoration: "underline" }}>
                    {t("CheckoutPage.moreInformationCheckboxText")}
                  </Typography>
                </Button>
              </Stack>
            )}

            <FormControlLabel control={<Checkbox />} label={t("CheckoutPage.marketingCommunicationCheckboxText")} />
          </FormGroup>
          <Divider />

          <Box display="flex" justifyContent="left" paddingTop={1}>
            <Button type="submit" variant="contained">
              {t("CheckoutPage.continueToPaymentButtonText")}
            </Button>
          </Box>
        </Paper>
      </Stack>

      <ActionDialogModal
        open={openKeepsPlusServiceDialog}
        onConfirm={() => setOpenKeepsPlusServiceDialog(false)}
        title={t("KeepsPlusServiceModal.title")}
        confirmText={t("KeepsPlusServiceModal.confirmButtonText")}
      >
        <KeepsPlusServiceDialogInfo />
      </ActionDialogModal>
    </Box>
  );
};

export default CheckoutPage;
