"use client";

import { storeLocations } from "@/data/entityData";
import { DeliveryInfo } from "@/data/types";
import { Box, FormControlLabel, MenuItem, Select, SelectChangeEvent, Stack, Switch, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

type Props = {
  deliveryInfo: DeliveryInfo;
  setDeliveryInfo: (info: DeliveryInfo) => void;
  handleDeliveryLocationChange?: (event: SelectChangeEvent) => void;
};

const StoreDeliverySelection = ({ deliveryInfo, setDeliveryInfo, handleDeliveryLocationChange }: Props) => {
  const t = useTranslations("CheckoutPage.DeliveryInformation");

  return (
    <Stack direction="column" gap={1} paddingLeft={1}>
      <Box>
        <Typography fontSize={12}>{t("StoreDeliveryOption.storeLocationLabel")}</Typography>
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
        label={t("StoreDeliveryOption.differentPersonPickingUpText")}
      />
    </Stack>
  );
};

export default StoreDeliverySelection;
