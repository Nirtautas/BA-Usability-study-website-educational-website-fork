"use client";

import ActionDialogModal from "@/components/shared/actionDialogModal";
import KeepsBoxServiceDialogInfo from "@/components/shared/keepsBoxServiceDialog";
import KeepsPlusServiceDialogInfo from "@/components/shared/keepsPlusServiceDialog";
import { getPageUrl } from "@/data/constants";
import { useSubscriptionContext } from "@/data/subscriptionContext";
import { SubscriptionType } from "@/data/types";
import { useUserContext } from "@/data/userContext";
import { useRouter } from "@/i18n/navigation";
import { Button, Container, Divider, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const getNextMonthBillingDate = () => {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 15);
  return nextMonth.toLocaleDateString().split(",")[0];
};

const SubscriptionsPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const subscriptionsContext = useSubscriptionContext();
  const userContext = useUserContext();
  const currentUser = userContext?.getLoggedInUserData();
  const subscriptionCount = subscriptionsContext?.getCurrentUserSubscriptionCount();

  const [openKeepsBoxServiceDialog, setOpenKeepsBoxServiceDialog] = useState(false);
  const [openKeepsPlusServiceDialog, setOpenKeepsPlusServiceDialog] = useState(false);

  useEffect(() => {
    if (!userContext?.getLoggedInUserData()) {
      router.push(getPageUrl.home());
    }
  }, []);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Stack direction="column" gap={1}>
          <Typography variant="h5" textAlign="center">
            {t("SubscriptionsPage.title")}
          </Typography>
          <Divider />
          {subscriptionCount !== 0 ? (
            <Stack direction="column" gap={1}>
              <Typography fontWeight={600}>{t("SubscriptionsPage.numberOfSubscriptions", { subscriptionCount: subscriptionCount ?? 0 })}</Typography>
              <Divider />
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>{t("SubscriptionsPage.tableHeaderSubscriptionName")}</TableCell>
                      <TableCell align="right">{t("SubscriptionsPage.tableHeaderNextBillingDate")}</TableCell>
                      <TableCell align="right">{t("SubscriptionsPage.tableHeaderPrice")}</TableCell>
                      <TableCell align="right">{t("SubscriptionsPage.tableHeaderInfoButton")}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentUser?.id &&
                      subscriptionsContext?.getUserSubscriptions(currentUser.id).map((subscription) => (
                        <TableRow key={subscription.id}>
                          <TableCell>
                            <Typography fontWeight={600}>{t(subscription.name)}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>{getNextMonthBillingDate()}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>{subscription.discountedPrice ?? subscription.price}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              variant="contained"
                              onClick={subscription.subscriptionType === SubscriptionType.KeepsPlus ? () => setOpenKeepsPlusServiceDialog(true) : () => setOpenKeepsBoxServiceDialog(true)}
                            >
                              {t("SubscriptionsPage.infoButtonText")}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          ) : (
            <Stack direction="row" gap={1} display="flex" alignItems="center" justifyContent="space-between">
              <Typography>{t("SubscriptionsPage.noSubscriptions")}</Typography>
              <Button variant="contained" onClick={() => router.push(getPageUrl.keepsBox())}>
                {t("SubscriptionsPage.goToProductsButtonText")}
              </Button>
            </Stack>
          )}
        </Stack>
      </Paper>

      <ActionDialogModal
        open={openKeepsPlusServiceDialog}
        onConfirm={() => setOpenKeepsPlusServiceDialog(false)}
        title={t("KeepsPlusServiceModal.title")}
        confirmText={t("KeepsPlusServiceModal.confirmButtonText")}
      >
        <KeepsPlusServiceDialogInfo />
      </ActionDialogModal>

      <ActionDialogModal
        open={openKeepsBoxServiceDialog}
        onConfirm={() => setOpenKeepsBoxServiceDialog(false)}
        title={t("KeepsBoxServiceModal.title")}
        confirmText={t("KeepsBoxServiceModal.confirmButtonText")}
      >
        <KeepsBoxServiceDialogInfo />
      </ActionDialogModal>
    </Container>
  );
};

export default SubscriptionsPage;
