"use client";

import { parcelLockerLocations, postOfficeLocations, storeLocations } from "@/data/entityData";
import { DeliveryInfo } from "@/data/types";
import { Box, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, SelectChangeEvent, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import LockerDeliverySelection from "./lockerDeliverySelection";
import PostDeliverySelection from "./postDeliverySelection";
import StoreDeliverySelection from "./storeDeliveryFields";

type Props = {
  deliveryInfo: DeliveryInfo;
  setDeliveryInfo: (info: DeliveryInfo) => void;
  error?: string;
};

const DeliverySelection = ({ deliveryInfo, setDeliveryInfo, error }: Props) => {
  const t = useTranslations("CheckoutPage.DeliveryInformation");

  const handleDeliveryMethodChange = (event: SelectChangeEvent) => {
    switch (event.target.value) {
      case "store":
        setDeliveryInfo({ deliveryMethod: event.target.value, locationId: storeLocations[0]?.id, differentPersonPickUp: false });
      case "post":
        setDeliveryInfo({ deliveryMethod: event.target.value, locationId: postOfficeLocations[0]?.id, consigneeName: "", phoneNumber: "" });
      case "locker":
        setDeliveryInfo({ deliveryMethod: event.target.value, locationId: parcelLockerLocations[0]?.id, consigneeName: "", phoneNumber: "" });
    }
  };

  const handleDeliveryLocationChange = (event: SelectChangeEvent) => {
    setDeliveryInfo({ ...deliveryInfo, locationId: parseInt(event.target.value) });
  };

  return (
    <Box>
      <FormControl required fullWidth>
        <RadioGroup value={deliveryInfo.deliveryMethod} name="deliveryMethod" onChange={handleDeliveryMethodChange}>
          <Stack>
            <FormControlLabel value="store" control={<Radio />} label={t("StoreDeliveryOption.title")} />

            {deliveryInfo.deliveryMethod === "store" && (
              <StoreDeliverySelection deliveryInfo={deliveryInfo} setDeliveryInfo={setDeliveryInfo} handleDeliveryLocationChange={handleDeliveryLocationChange} />
            )}
          </Stack>

          <Stack>
            <FormControlLabel value="post" control={<Radio />} label={t("PostDeliveryOption.title")} />

            {deliveryInfo.deliveryMethod === "post" && (
              <PostDeliverySelection deliveryInfo={deliveryInfo} setDeliveryInfo={setDeliveryInfo} handleDeliveryLocationChange={handleDeliveryLocationChange} />
            )}
          </Stack>
          <Stack>
            <FormControlLabel value="locker" control={<Radio />} label={t("ParcelLockerDeliveryOption.title")} />

            {deliveryInfo.deliveryMethod === "locker" && (
              <LockerDeliverySelection deliveryInfo={deliveryInfo} setDeliveryInfo={setDeliveryInfo} handleDeliveryLocationChange={handleDeliveryLocationChange} />
            )}
          </Stack>
        </RadioGroup>
        <FormHelperText error={error?.length != 0}>{error}</FormHelperText>
      </FormControl>
    </Box>
  );
};

export default DeliverySelection;
