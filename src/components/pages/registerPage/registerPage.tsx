"use client";

import { Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const t = useTranslations("RegisterPage");

  return (
    <Container maxWidth="md">
      <Typography>Register Page</Typography>
    </Container>
  );
};

export default LoginPage;
