"use client";

import { Container, Stack, Typography } from "@mui/material";

const OrderCompletePage = () => {
  return (
    <Container>
      <Stack direction="column" alignItems="center" gap={1}>
        <Typography variant="h4" gutterBottom>
          Order complete page
        </Typography>
      </Stack>
    </Container>
  );
};

export default OrderCompletePage;
