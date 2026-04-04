"use client";

import { postOfficeLocations } from "@/data/entityData";
import { DeliveryInfo } from "@/data/types";
import { Box, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";

type Props = {
  deliveryInfo: DeliveryInfo;
  setDeliveryInfo: (info: DeliveryInfo) => void;
  handleDeliveryLocationChange?: (event: SelectChangeEvent) => void;
};

const PostDeliverySelection = ({ deliveryInfo, setDeliveryInfo, handleDeliveryLocationChange }: Props) => {
  return (
    <Stack direction="column" gap={1} paddingLeft={1}>
      <Box>
        <Typography fontSize={12}>Select your post office location:</Typography>
        <Select labelId="postOfficeLocationLabel" id="postOfficeLocationSelect" value={deliveryInfo.locationId?.toString()} label="Age" onChange={handleDeliveryLocationChange}>
          {postOfficeLocations.map((location) => (
            <MenuItem key={location.id} value={location.id.toString()}>
              {location.locationName}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <TextField
        id="outlined-basic"
        label="Your full name"
        size="small"
        variant="outlined"
        required
        value={deliveryInfo.consigneeName || ""}
        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, consigneeName: e.target.value })}
      />
      <TextField
        id="outlined-basic"
        label="Your phone number"
        size="small"
        variant="outlined"
        required
        value={deliveryInfo.phoneNumber || ""}
        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phoneNumber: e.target.value })}
      />
    </Stack>
  );
};

export default PostDeliverySelection;
