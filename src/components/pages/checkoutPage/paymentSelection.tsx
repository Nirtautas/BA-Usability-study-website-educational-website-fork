"use client";

import { FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup } from "@mui/material";

type Props = {
  value: string;
  setValue: (val: string) => void;
  error?: string;
};

const PaymentSelection = ({ value, setValue, error }: Props) => {
  return (
    <FormControl required fullWidth>
      <RadioGroup value={value} name="payment" onChange={(e) => setValue(e.target.value)}>
        <FormControlLabel value="cash" control={<Radio />} label="Cash or card on pickup" />
        <FormControlLabel value="bank" control={<Radio />} label="Online banking" />
        <FormControlLabel value="card" control={<Radio />} label="Credit card" />
      </RadioGroup>
      <FormHelperText error={error?.length != 0}>{error}</FormHelperText>
    </FormControl>
  );
};

export default PaymentSelection;
