"use client";

import { ShopTitle } from "@/components/shared/simpleShared";
import SubheadingBold from "@/components/shared/subheadingBold";
import { getPageUrl, loginPageImageLink } from "@/data/constants";
import { useCart } from "@/data/contexts/cartContext";
import { useCompleteStepOnNavigation } from "@/data/contexts/exerciseContext/utils";
import { useSubscriptionContext } from "@/data/contexts/subscriptionContext";
import { useUserContext } from "@/data/contexts/userContext";
import { LoginCredentials } from "@/data/types";
import { UniquePathFragment } from "@/utils/uniqueFragmentUtil";
import { EmailOutlined, LockOutlined } from "@mui/icons-material";
import { Box, Button, Container, Divider, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

type PageProps = {
  searchParams?: {
    checkoutRedirect?: string;
    keepsPlusAccepted?: string;
  };
};

const LoginPage = ({ searchParams }: PageProps) => {
  const router = useRouter();
  const cartContext = useCart();
  const subscriptionContext = useSubscriptionContext();
  const userContext = useUserContext();
  const params = useParams<{ uniquePathFragment: UniquePathFragment }>();
  const t = useTranslations("LoginPage");
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const checkoutRedirect = searchParams?.checkoutRedirect === "true";
  const keepsPlusAccepted = searchParams?.keepsPlusAccepted === "true";
  useCompleteStepOnNavigation("visitLoginForced", checkoutRedirect);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    setErrorMsg("");
    e.preventDefault();
    const userId = userContext?.attemptLogin(loginCredentials.email, loginCredentials.password);

    if (userId) {
      if (checkoutRedirect) {
        const keepsPlusSubscriptionId = subscriptionContext?.getKeepsPlusSubscriptionId();
        if (!cartContext?.allItemsAreSubscriptions() && keepsPlusAccepted && keepsPlusSubscriptionId) {
          subscriptionContext?.linkSubscriptionToCurrentUser(keepsPlusSubscriptionId, userId);
        }
        subscriptionContext?.linkCartSubscriptionsToCurrentUser();
        cartContext?.removeAllFromCart();
        router.push(getPageUrl.orderComplete(params.uniquePathFragment));
      } else {
        router.push(getPageUrl.products(params.uniquePathFragment));
      }
    } else {
      setErrorMsg(t("invalidCredentialsErrorText"));
    }
  };

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleLogin} paddingTop={2} exercise-step={checkoutRedirect ? "forcedEnrollmentSelected" : undefined}>
        <Paper elevation={3}>
          <Stack direction="row" gap={1}>
            <Box component="img" src={loginPageImageLink} maxWidth={400} sx={{ objectFit: "cover" }} />
            <Stack direction="column" gap={1} textAlign="center" margin={2} flex={1}>
              <ShopTitle />
              <SubheadingBold headingText={checkoutRedirect ? t("checkoutRedirectTitle") : t("title")} />
              <Divider />
              {errorMsg && (
                <Typography color="error.main" fontSize={14}>
                  {errorMsg}
                </Typography>
              )}
              <TextField
                id="outlined-basic"
                label={t("emailLabel")}
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
                value={loginCredentials.email}
                onChange={(e) => setLoginCredentials({ ...loginCredentials, email: e.target.value })}
              />
              <TextField
                id="outlined-basic"
                label={t("passwordLabel")}
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
                value={loginCredentials.password}
                onChange={(e) => setLoginCredentials({ ...loginCredentials, password: e.target.value })}
              />
              <Typography fontSize={14} textAlign="right" sx={{ textDecoration: "underline", cursor: "pointer" }}>
                {t("forgotPasswordText")}
              </Typography>
              <Button type="submit" variant="contained">
                {t("loginButtonText")}
              </Button>
              <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
                <Typography alignItems="center" display="flex">
                  {t("dontHaveAccountText")}{" "}
                </Typography>
                <Button
                  onClick={() => router.push(getPageUrl.register(params.uniquePathFragment).concat(`?checkoutRedirect=${checkoutRedirect}&keepsPlusAccepted=${keepsPlusAccepted}`))}
                  sx={{
                    padding: 0,
                    textDecoration: "underline",
                    "&:hover": {
                      background: "none",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {t("registerHereText")}
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
