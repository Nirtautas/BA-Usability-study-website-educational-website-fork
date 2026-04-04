"use client";

import { storeLocations } from "@/data/entityData";
import { DeliveryInfo } from "@/data/types";
import { Box, FormControlLabel, MenuItem, Select, SelectChangeEvent, Stack, Switch, Typography } from "@mui/material";

type Props = {
  deliveryInfo: DeliveryInfo;
  setDeliveryInfo: (info: DeliveryInfo) => void;
  handleDeliveryLocationChange?: (event: SelectChangeEvent) => void;
};

const StoreDeliverySelection = ({ deliveryInfo, setDeliveryInfo, handleDeliveryLocationChange }: Props) => {
  return (
    <Stack direction="column" gap={1} paddingLeft={1}>
      <Box>
        <Typography fontSize={12}>Select your store location:</Typography>
        <Select labelId="storeLocationLabel" id="storeLocationSelect" value={deliveryInfo.locationId?.toString()} label="Age" onChange={handleDeliveryLocationChange}>
          {storeLocations.map((location) => (
            <MenuItem key={location.id} value={location.id.toString()}>
              {location.locationName}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <FormControlLabel
        control={<Switch checked={deliveryInfo.differentPersonPickUp} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, differentPersonPickUp: e.target.checked })} />}
        label="Different person picking up"
      />
    </Stack>
  );
};

export default StoreDeliverySelection;
