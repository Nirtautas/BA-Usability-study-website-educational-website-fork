"use client";

import { placeholderImageLink } from "@/data/constants";
import { banks } from "@/data/entityData";
import { Box, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

type Props = {
  value: string;
  setValue: (value: string) => void;
  bankValue: string;
  setBankValue: (value: string) => void;
  error?: string;
};

const PaymentSelection = ({ value, setValue, error, bankValue, setBankValue }: Props) => {
  const t = useTranslations("CheckoutPage.PaymentInformation");

  return (
    <FormControl required fullWidth>
      <RadioGroup value={value} name="payment" onChange={(e) => setValue(e.target.value)}>
        <Stack>
          <FormControlLabel value="cash" control={<Radio />} label={t("OnPickup.title")} />

          {value === "cash" && (
            <Box bgcolor="primary.light" padding={1}>
              <Typography>{t("OnPickup.description")}</Typography>
            </Box>
          )}
        </Stack>
        <Stack>
          <FormControlLabel value="bank" control={<Radio />} label={t("OnlineBanking.title")} />

          {value === "bank" && (
            <Stack direction="column">
              <Typography fontSize={12}>{t("OnlineBanking.selectBankLabel")}</Typography>
              <RadioGroup value={bankValue} name="bank" onChange={(e) => setBankValue(e.target.value)} sx={{ padding: 1 }}>
                <Stack direction="row" gap={1} flexWrap="wrap">
                  {banks.map((bank) => {
                    return (
                      <Box
                        key={bank.name}
                        border="2px solid"
                        borderColor={bank.name === bankValue ? "primary.main" : "primary.light"}
                        textAlign="center"
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <Typography>{bank.name}</Typography>
                        <FormControlLabel
                          value={bank.name}
                          control={<Radio sx={{ display: "none" }} />}
                          label={<img src={bank.picturePath || placeholderImageLink} alt={bank.name} width={100} height={100} style={{ display: "block", border: "1px solid #ccc" }} />}
                          sx={{ margin: 0 }}
                        />
                      </Box>
                    );
                  })}
                </Stack>
              </RadioGroup>
            </Stack>
          )}
        </Stack>
        <Stack>
          <FormControlLabel value="card" control={<Radio />} label={t("CreditCart.title")} />

          {value === "card" && (
            <Box>
              <Stack spacing={2}>
                <Typography fontSize={12}>{t("CreditCart.enterCardDetailsLabel")}</Typography>
                <TextField label={t("CreditCart.cardholderNameText")} fullWidth size="small" defaultValue={t("CreditCart.defaultCardholderName")} />
                <TextField label={t("CreditCart.cardNumberText")} fullWidth size="small" defaultValue="1548 2315 1564 1564" />
                <Stack direction="row" spacing={2}>
                  <TextField label={t("CreditCart.expiryDateText")} size="small" defaultValue="2027-08-01" />
                  <TextField label={t("CreditCart.securityCodeText")} size="small" defaultValue="948" />
                </Stack>
              </Stack>
            </Box>
          )}
        </Stack>
      </RadioGroup>
      <FormHelperText error={error?.length != 0}>{error}</FormHelperText>
    </FormControl>
  );
};

export default PaymentSelection;
