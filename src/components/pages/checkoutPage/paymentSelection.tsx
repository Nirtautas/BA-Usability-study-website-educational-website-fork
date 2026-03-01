"use client";

import { placeholderImageLink } from "@/data/constants";
import { banks } from "@/data/entityData";
import { Box, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";

type Props = {
  value: string;
  setValue: (value: string) => void;
  bankValue: string;
  setBankValue: (value: string) => void;
  error?: string;
};

const PaymentSelection = ({ value, setValue, error, bankValue, setBankValue }: Props) => {
  return (
    <FormControl required fullWidth>
      <RadioGroup value={value} name="payment" onChange={(e) => setValue(e.target.value)}>
        <Stack>
          <FormControlLabel value="cash" control={<Radio />} label="Cash or card on pickup" />

          {value === "cash" && (
            <Box bgcolor="primary.light" padding={1}>
              <Typography>If you choose this payment method, you will pay for goods by cash or card when you pick up the item.</Typography>
            </Box>
          )}
        </Stack>
        <Stack>
          <FormControlLabel value="bank" control={<Radio />} label="Online banking" />

          {value === "bank" && (
            <Stack direction="column">
              <Typography fontSize={12}>Select your bank:</Typography>
              <RadioGroup value={bankValue} name="bank" onChange={(e) => setBankValue(e.target.value)} sx={{ padding: 1 }}>
                <Stack direction="row" gap={1} flexWrap="wrap">
                  {banks.map((bank) => {
                    return (
                      <Box
                        key={bank.name}
                        border="2px solid"
                        borderColor={bank.name === bankValue ? "primary.main" : "primary.light"}
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <FormControlLabel
                          value={bank.name}
                          control={<Radio sx={{ display: "none" }} />}
                          label={<img src={bank.picturePath || placeholderImageLink} alt={bank.name} width={100} height={100} style={{ display: "block" }} />}
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
          <FormControlLabel value="card" control={<Radio />} label="Credit card" />

          {value === "card" && (
            <Box>
              <Stack spacing={2}>
                <Typography fontSize={12}>Enter card details:</Typography>
                <TextField label="Cardholder full name" fullWidth size="small" defaultValue="John Doe" />
                <TextField label="Card number" fullWidth size="small" defaultValue="1548 2315 1564 1564" />
                <Stack direction="row" spacing={2}>
                  <TextField label="Card expiry date" size="small" defaultValue="2027-08-01" />
                  <TextField label="Security code" size="small" defaultValue="948" />
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
