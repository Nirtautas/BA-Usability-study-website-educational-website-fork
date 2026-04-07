"use client";

import { parcelLockerLocations } from "@/data/entityData";
import { DeliveryInfo } from "@/data/types";
import { Box, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

type Props = {
  deliveryInfo: DeliveryInfo;
  setDeliveryInfo: (info: DeliveryInfo) => void;
  handleDeliveryLocationChange?: (event: SelectChangeEvent) => void;
};

const LockerDeliverySelection = ({ deliveryInfo, setDeliveryInfo, handleDeliveryLocationChange }: Props) => {
  const t = useTranslations("CheckoutPage.DeliveryInformation");

  return (
    <Stack direction="column" gap={1} paddingLeft={1}>
      <Box>
        <Typography fontSize={12}>{t("ParcelLockerDeliveryOption.parcelLockerLocationLabel")}</Typography>
        <Select labelId="parcelLockerLocationLabel" id="parcelLockerLocationSelect" value={deliveryInfo.locationId?.toString()} onChange={handleDeliveryLocationChange}>
          {parcelLockerLocations.map((location) => (
            <MenuItem key={location.id} value={location.id.toString()}>
              {location.locationName}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <TextField
        id="outlined-basic"
        label={t("ParcelLockerDeliveryOption.fullNameLabel")}
        size="small"
        variant="outlined"
        required
        value={deliveryInfo.consigneeName || ""}
        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, consigneeName: e.target.value })}
      />
      <TextField
        id="outlined-basic"
        label={t("ParcelLockerDeliveryOption.phoneNumberLabel")}
        size="small"
        variant="outlined"
        required
        value={deliveryInfo.phoneNumber || ""}
        onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phoneNumber: e.target.value })}
      />
    </Stack>
  );
};

export default LockerDeliverySelection;
