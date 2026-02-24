"use client";

import { useCart } from "@/data/cartContext";
import { getPageUrl } from "@/data/constants";
import { Login, ShoppingBag, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Button, Grid2, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LanguageSwitcher from "./languageSwitcher";

export function NavBar() {
  const router = useRouter();
  const cartContext = useCart();
  const t = useTranslations("NavBar");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack sx={{ mb: 2 }}>
      <Typography fontSize={11} align="center">
        Reach us at +370 651 84956 or info@store.com
      </Typography>

      <AppBar position="static">
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button color="inherit" onClick={() => router.push(getPageUrl.home())}>
            <Typography>{t("title")}</Typography>
          </Button>

          <Stack direction="row" spacing={2} alignItems="center">
            <Grid2 display="flex" alignItems="center" gap={1}>
              <Grid2>
                <LanguageSwitcher />
              </Grid2>

              <Grid2 display="flex" alignItems="center">
                <ShoppingBag />
                <Button color="inherit" onClick={handleClick}>
                  <Typography>Products</Typography>
                </Button>

                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  <MenuItem onClick={() => router.push(getPageUrl.products())}>All Products</MenuItem>
                  <MenuItem onClick={() => router.push(getPageUrl.products().concat(`?productType=Shoes`))}>Shoes</MenuItem>
                  <MenuItem onClick={() => router.push(getPageUrl.products().concat(`?productType=Shirts`))}>Shirts</MenuItem>
                </Menu>
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
          </Stack>
        </Toolbar>
      </AppBar>
    </Stack>
  );
}

export default NavBar;
