"use client";

import { ShopTitle } from "@/components/shared/simpleShared";
import { useCart } from "@/data/cartContext";
import { getPageUrl } from "@/data/constants";
import { Login, ShoppingBag, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Button, Grid2, Link, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LanguageSwitcher from "./languageSwitcher";

export function NavBar() {
  const t = useTranslations();
  const router = useRouter();
  const cartContext = useCart();
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
      <Typography fontSize={11} align="center" color="text.secondary">
        {t("NavBar.infoText")}
      </Typography>

      <AppBar position="static">
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link href={getPageUrl.home()} padding={1} sx={{ color: "inherit", textDecoration: "none" }}>
            <ShopTitle />
          </Link>

          <Stack direction="row" spacing={2} alignItems="center">
            <Grid2 display="flex" alignItems="center" gap={1}>
              <Grid2>
                <LanguageSwitcher />
              </Grid2>

              <Grid2 display="flex" alignItems="center">
                <ShoppingBag />
                <Button color="inherit" onClick={handleClick}>
                  <Typography>{t("NavBar.Products.title")}</Typography>
                </Button>

                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  <MenuItem onClick={() => router.push(getPageUrl.products())}>{t("NavBar.Products.allProducts")}</MenuItem>
                  <MenuItem onClick={() => router.push(getPageUrl.products().concat(`?productType=Shoes`))}>{t("ProductsPage.Filter.ProductType.shoesOption")}</MenuItem>
                  <MenuItem onClick={() => router.push(getPageUrl.products().concat(`?productType=Pants`))}>{t("ProductsPage.Filter.ProductType.pantsOption")}</MenuItem>
                  <MenuItem onClick={() => router.push(getPageUrl.products().concat(`?productType=Shirts`))}>{t("ProductsPage.Filter.ProductType.shirtOption")}</MenuItem>
                  <MenuItem onClick={() => router.push(getPageUrl.products().concat(`?productType=Dresses`))}>{t("ProductsPage.Filter.ProductType.dressOption")}</MenuItem>
                </Menu>
              </Grid2>

              <Grid2 display="flex" alignItems="center">
                <Badge badgeContent={cartContext?.getUniqueItemsCount() || 0} showZero={true} color="error">
                  <ShoppingCart />
                </Badge>
                <Button color="inherit" onClick={() => router.push(getPageUrl.cart())}>
                  <Typography>{t("NavBar.cart")}</Typography>
                </Button>
              </Grid2>

              <Grid2 display="flex" alignItems="center">
                <Login />
                <Button color="inherit" onClick={() => router.push(getPageUrl.login())}>
                  <Typography>{t("NavBar.login")}</Typography>
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
