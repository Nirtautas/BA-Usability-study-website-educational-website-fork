"use client";

import { useCart } from "@/data/cartContext";
import { getPageUrl } from "@/data/constants";
import { Login, ShoppingBag, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Button, Grid2, Stack, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export function NavBar() {
  const router = useRouter();
  const cartContext = useCart();

  return (
    <Stack sx={{ mb: 2 }}>
      <Typography align="center">Reach us at +370 651 84956 or info@store.com</Typography>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Grid2>
            <Button color="inherit" onClick={() => router.push(getPageUrl.home())}>
              <Typography>Store</Typography>
            </Button>
          </Grid2>

          <Grid2 display="flex" alignItems="center" gap={1}>
            <Grid2 display="flex" alignItems="center">
              <ShoppingBag />
              <Button color="inherit" onClick={() => router.push(getPageUrl.products())}>
                <Typography>Products</Typography>
              </Button>
            </Grid2>

            <Grid2 display="flex" alignItems="center">
              <Badge badgeContent={cartContext?.getUniqueItemsCount() || 0} showZero={true} color="error">
                <ShoppingCart />
              </Badge>
              <Button color="inherit" onClick={() => router.push(getPageUrl.cart())}>
                <Typography>Cart</Typography>
              </Button>
            </Grid2>

            <Grid2 display="flex" alignItems="center">
              <Login />
              <Button color="inherit" onClick={() => router.push(getPageUrl.login())}>
                <Typography>Login</Typography>
              </Button>
            </Grid2>
          </Grid2>
        </Toolbar>
      </AppBar>
    </Stack>
  );
}

export default NavBar;
