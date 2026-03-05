"use client";

import { ShopTitle } from "@/components/shared/simpleShared";
import { getPageUrl } from "@/data/constants";
import { Button, Container, Divider, Link, Paper, Stack, Typography } from "@mui/material";

const OrderCompletePage = () => {
  return (
    <Container sx={{ width: 600 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Stack direction="column" gap={2} textAlign="center">
          <ShopTitle />
          <Typography variant="h4">Thank you for your order!</Typography>
          <Divider />
          <Typography>Order no. - 159486514</Typography>
          <Typography>We will send you a reminder when the parcel is in transit!</Typography>
          <Link href={getPageUrl.products()}>
            <Button variant="contained">Go back to products</Button>
          </Link>
        </Stack>
      </Paper>
    </Container>
  );
};

export default OrderCompletePage;
