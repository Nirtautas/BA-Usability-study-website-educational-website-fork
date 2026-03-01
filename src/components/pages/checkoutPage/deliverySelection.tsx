"use client";

import { Box, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup } from "@mui/material";

type Props = {
  value: string;
  setValue: (val: string) => void;
  error?: string;
};

const DeliverySelection = ({ value, setValue, error }: Props) => {
  return (
    <Box>
      <FormControl required fullWidth>
        <RadioGroup value={value} name="delivery" onChange={(e) => setValue(e.target.value)}>
          <FormControlLabel value="store" control={<Radio />} label="Pick up at the store" />
          <FormControlLabel value="post" control={<Radio />} label="Pick up at Lithuanian Post office" />
          <FormControlLabel value="locker" control={<Radio />} label="Pick up at parcel locker" />
        </RadioGroup>
        <FormHelperText error={error?.length != 0}>{error}</FormHelperText>
      </FormControl>
    </Box>
  );
};

export default DeliverySelection;
