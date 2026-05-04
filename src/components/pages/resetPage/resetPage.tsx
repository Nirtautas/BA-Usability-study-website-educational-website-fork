"use client";

import {
  CART_STORAGE_KEY,
  getPageUrl,
  MARKETING_TIMER_EXECUTED_STORAGE_KEY,
  REFUSED_MARKETING_STORAGE_KEY,
  SUBSCRIPTION_STORAGE_KEY,
  USER_DATA_STORAGE_KEY,
  USER_ID_STORAGE_KEY,
} from "@/data/constants";
import { UniquePathFragment } from "@/utils/uniqueFragmentUtil";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const STORAGE_KEYS = [CART_STORAGE_KEY, SUBSCRIPTION_STORAGE_KEY, USER_DATA_STORAGE_KEY, USER_ID_STORAGE_KEY, REFUSED_MARKETING_STORAGE_KEY, MARKETING_TIMER_EXECUTED_STORAGE_KEY];

const ResetPage = () => {
  const router = useRouter();
  const params = useParams<{ uniquePathFragment: UniquePathFragment }>();

  useEffect(() => {
    STORAGE_KEYS.forEach((key) => sessionStorage.removeItem(key));

    router.replace(getPageUrl.home(params.uniquePathFragment));
    router.refresh();
  }, [router, params.uniquePathFragment]);

  return (
    <Stack display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={2}>
      <CircularProgress />
      <Typography variant="h6">Resetting exercise...</Typography>
    </Stack>
  );
};

export default ResetPage;
