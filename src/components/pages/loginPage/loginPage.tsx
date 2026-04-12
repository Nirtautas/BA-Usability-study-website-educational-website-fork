"use client";

import { ShopTitle } from "@/components/shared/simpleShared";
import SubheadingBold from "@/components/shared/subheadingBold";
import { useCart } from "@/data/cartContext";
import { getPageUrl, loginPageImageLink } from "@/data/constants";
import { LoginCredentials } from "@/data/types";
import { useUserContext } from "@/data/userContext";
import { EmailOutlined, LockOutlined } from "@mui/icons-material";
import { Box, Button, Container, Divider, InputAdornment, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PageProps = {
  searchParams?: {
    checkoutRedirect?: string;
  };
};

const LoginPage = ({ searchParams }: PageProps) => {
  const router = useRouter();
  const cartContext = useCart();
  const userContext = useUserContext();
  const t = useTranslations("LoginPage");
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const checkoutRedirect = searchParams?.checkoutRedirect === "true";

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    setErrorMsg("");
    e.preventDefault();
    const userId = userContext?.attemptLogin(loginCredentials.email, loginCredentials.password);

    if (userId) {
      if (checkoutRedirect) {
        cartContext?.removeAllFromCart();
        router.push(getPageUrl.orderComplete());
      } else {
        router.push(getPageUrl.products());
      }
    } else {
      setErrorMsg(t("invalidCredentialsErrorText"));
    }
  };

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleLogin}>
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
              <Typography>
                {t("dontHaveAccountText")}{" "}
                <Link href={getPageUrl.register().concat(`?checkoutRedirect=${checkoutRedirect}`)} sx={{ textDecoration: "underline" }}>
                  {t("registerHereText")}
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
