"use client";

import { ShopTitle } from "@/components/shared/simpleShared";
import SubheadingBold from "@/components/shared/subheadingBold";
import { getPageUrl, registerPageImageLink } from "@/data/constants";
import { useCart } from "@/data/contexts/cartContext";
import { useSubscriptionContext } from "@/data/contexts/subscriptionContext";
import { useUserContext } from "@/data/contexts/userContext";
import { Gender, genderTypeTranslationKeyMap, RegisterInfo } from "@/data/types";
import { UniquePathFragment } from "@/utils/uniqueFragmentUtil";
import { EmailOutlined, LockOutlined, PhoneAndroidOutlined } from "@mui/icons-material";
import { Box, Button, Container, Divider, FormControl, FormControlLabel, FormLabel, InputAdornment, Paper, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

type PageProps = {
  searchParams?: {
    checkoutRedirect?: string;
    keepsPlusAccepted?: string;
  };
};

const RegisterPage = ({ searchParams }: PageProps) => {
  const router = useRouter();
  const userContext = useUserContext();
  const subscriptionContext = useSubscriptionContext();
  const cartContext = useCart();
  const params = useParams<{ uniquePathFragment: UniquePathFragment }>();
  const t = useTranslations();
  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: Gender.Male,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const checkoutRedirect = searchParams?.checkoutRedirect === "true";
  const keepsPlusAccepted = searchParams?.keepsPlusAccepted === "true";

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    setErrorMsg("");
    e.preventDefault();
    const response = userContext?.attemptRegistration(registerInfo);

    if (!response?.error) {
      if (checkoutRedirect) {
        const keepsPlusSubscriptionId = subscriptionContext?.getKeepsPlusSubscriptionId();
        if (!cartContext?.allItemsAreSubscriptions() && keepsPlusAccepted && keepsPlusSubscriptionId) {
          subscriptionContext?.linkSubscriptionToCurrentUser(keepsPlusSubscriptionId, response?.userId);
        }
        subscriptionContext?.linkCartSubscriptionsToCurrentUser();
        cartContext?.removeAllFromCart();
        router.push(getPageUrl.orderComplete(params.uniquePathFragment));
      } else {
        router.push(getPageUrl.products(params.uniquePathFragment));
      }
    } else {
      setErrorMsg(response?.error || "");
    }
  };

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleRegistration} paddingTop={2} exercise-step={checkoutRedirect ? "forcedEnrollmentSelected" : undefined}>
        <Paper elevation={3}>
          <Stack direction="column">
            <Box component="img" src={registerPageImageLink} maxHeight={100} sx={{ objectFit: "cover" }} />
            <Stack direction="column" gap={1} textAlign="center" marginInline={2} marginBottom={2} flex={1}>
              <ShopTitle />
              <SubheadingBold headingText={checkoutRedirect ? t("RegisterPage.checkoutRedirectTitle") : t("RegisterPage.title")} />
              <Divider />

              {errorMsg && (
                <Typography color="error.main" fontSize={14}>
                  {errorMsg}
                </Typography>
              )}

              <TextField
                id="outlined-basic"
                label={t("RegisterPage.firstNameLabel")}
                size="small"
                variant="outlined"
                required
                value={registerInfo?.firstName}
                onChange={(e) => setRegisterInfo({ ...registerInfo, firstName: e.target.value })}
              />

              <TextField
                id="outlined-basic"
                label={t("RegisterPage.lastNameLabel")}
                size="small"
                variant="outlined"
                required
                value={registerInfo?.lastName}
                onChange={(e) => setRegisterInfo({ ...registerInfo, lastName: e.target.value })}
                sx={{ marginBottom: 2 }}
              />

              <TextField
                id="outlined-basic"
                label={t("RegisterPage.emailLabel")}
                size="small"
                variant="outlined"
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined />
                      </InputAdornment>
                    ),
                  },
                }}
                value={registerInfo?.email}
                onChange={(e) => setRegisterInfo({ ...registerInfo, email: e.target.value })}
              />

              <TextField
                id="outlined-basic"
                label={t("RegisterPage.phoneNumberLabel")}
                size="small"
                variant="outlined"
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneAndroidOutlined />
                      </InputAdornment>
                    ),
                  },
                }}
                value={registerInfo?.phoneNumber}
                onChange={(e) => setRegisterInfo({ ...registerInfo, phoneNumber: e.target.value })}
              />

              <TextField
                id="outlined-basic"
                label={t("RegisterPage.passwordLabel")}
                size="small"
                variant="outlined"
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    ),
                  },
                }}
                value={registerInfo.password}
                onChange={(e) => setRegisterInfo({ ...registerInfo, password: e.target.value })}
              />

              <TextField
                id="outlined-basic"
                label={t("RegisterPage.confirmPasswordLabel")}
                size="small"
                variant="outlined"
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    ),
                  },
                }}
                value={registerInfo.confirmPassword}
                onChange={(e) => setRegisterInfo({ ...registerInfo, confirmPassword: e.target.value })}
                sx={{ marginBottom: 1 }}
              />

              <FormControl required sx={{ textAlign: "left" }}>
                <FormLabel>{t("RegisterPage.genderLabel")}</FormLabel>
                <Divider />
                <RadioGroup defaultValue={Gender.Male} value={registerInfo.gender} onChange={(e) => setRegisterInfo({ ...registerInfo, gender: e.target.value as Gender })}>
                  {Object.values(Gender).map((gender) => (
                    <FormControlLabel key={gender} value={gender} control={<Radio />} label={t(genderTypeTranslationKeyMap[gender])} />
                  ))}
                </RadioGroup>
              </FormControl>

              <Button type="submit" variant="contained">
                {t("RegisterPage.registerButtonText")}
              </Button>
              <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
                <Typography alignItems="center" display="flex">
                  {t("RegisterPage.alreadyHaveAccountText")}{" "}
                </Typography>
                <Button
                  onClick={() => router.push(getPageUrl.login(params.uniquePathFragment).concat(`?checkoutRedirect=${checkoutRedirect}&keepsPlusAccepted=${keepsPlusAccepted}`))}
                  sx={{
                    padding: 0,
                    textDecoration: "underline",
                    "&:hover": {
                      background: "none",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {t("RegisterPage.loginHereText")}
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;
