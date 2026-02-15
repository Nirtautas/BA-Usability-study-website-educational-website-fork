"use client";

import { useCart } from "@/data/cartContext";
import { getPageUrl } from "@/data/constants";
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export function NavBar() {
  const router = useRouter();
  const cart = useCart();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="a" onClick={() => router.push(getPageUrl.home())} sx={{ flexGrow: 1 }}>
            Store
          </Typography>
          <Box sx={{ alignItems: "center" }}>
            <Button color="inherit" onClick={() => router.push(getPageUrl.products())}>
              Products
            </Button>
            <Button color="inherit" onClick={() => router.push(getPageUrl.cart())}>
              <Stack>
                <Typography>Cart</Typography>
                <Typography>({cart?.getUniqueItemsCount() || 0})</Typography>
              </Stack>
            </Button>
            <Button color="inherit" onClick={() => router.push(getPageUrl.login())}>
              Login
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
