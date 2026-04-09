"use client";

import { ShopTitle } from "@/components/shared/simpleShared";
import SubheadingBold from "@/components/shared/subheadingBold";
import { getPageUrl, registerPageImageLink } from "@/data/constants";
import { Gender, genderTypeTranslationKeyMap, RegisterInfo } from "@/data/types";
import { useUserContext } from "@/data/userContext";
import { EmailOutlined, LockOutlined, PhoneAndroidOutlined } from "@mui/icons-material";
import { Box, Button, Container, Divider, FormControl, FormControlLabel, FormLabel, InputAdornment, Link, Paper, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const router = useRouter();
  const userContext = useUserContext();
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

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    setErrorMsg("");
    e.preventDefault();
    const errorMsg = userContext?.attemptRegistration(registerInfo);

    if (!errorMsg) {
      router.push(getPageUrl.products());
    } else {
      setErrorMsg(errorMsg);
    }
  };

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleRegistration}>
        <Paper elevation={3}>
          <Stack direction="column">
            <Box component="img" src={registerPageImageLink} maxHeight={100} sx={{ objectFit: "cover" }} />
            <Stack direction="column" gap={1} textAlign="center" marginInline={2} marginBottom={2} flex={1}>
              <ShopTitle />
              <SubheadingBold headingText={t("RegisterPage.title")} />
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
              <Typography>
                {t("RegisterPage.alreadyHaveAccountText")}{" "}
                <Link href={getPageUrl.login()} sx={{ textDecoration: "underline" }}>
                  {t("RegisterPage.loginHereText")}
                </Link>
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;
