"use client";

import { ShopTitle } from "@/components/shared/simpleShared";
import { EXERCISE_NAVBAR_HEIGHT, getPageUrl } from "@/data/constants";
import { useCart } from "@/data/contexts/cartContext";
import { useUserContext } from "@/data/contexts/userContext";
import { UniquePathFragment } from "@/utils/uniqueFragmentUtil";
import { AccountCircle, AttachMoneyOutlined, Login, LogoutOutlined, ShoppingBag, ShoppingCart, WidgetsOutlined } from "@mui/icons-material";
import { AppBar, Badge, Button, Grid2, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LanguageSwitcher from "./languageSwitcher";

type Props = {
  uniquePathFragment: UniquePathFragment;
};

export function NavBar({ uniquePathFragment }: Props) {
  const t = useTranslations();
  const router = useRouter();
  const cartContext = useCart();
  const userContext = useUserContext();
  const [anchorElGoods, setAnchorElGoods] = useState<null | HTMLElement>(null);
  const [anchorElAccount, setAnchorElAccount] = useState<null | HTMLElement>(null);
  const openGoods = Boolean(anchorElGoods);
  const openAccount = Boolean(anchorElAccount);

  const handleClickGoods = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElGoods(event.currentTarget);
  };

  const handleClickAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElAccount(event.currentTarget);
  };

  const handleLogout = () => {
    userContext?.logout();
    router.refresh();
  };

  return (
    <Stack sx={{ paddingTop: `${EXERCISE_NAVBAR_HEIGHT}px` }}>
      <Typography fontSize={11} align="center" color="text.secondary">
        {t("NavBar.infoText")}
      </Typography>

      <AppBar position="static">
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={() => router.push(getPageUrl.home(uniquePathFragment))} color="inherit">
            <ShopTitle />
          </Button>

          <Stack direction="row" spacing={2} alignItems="center">
            <Grid2 display="flex" alignItems="center" gap={1}>
              <Grid2>
                <LanguageSwitcher />
              </Grid2>

              <Grid2 display="flex" alignItems="center">
                <Button variant="contained" color="inherit" onClick={() => router.push(getPageUrl.keepsBox(uniquePathFragment))}>
                  <Stack direction="row" gap={1}>
                    <WidgetsOutlined color="primary" />
                    <Typography color="primary" fontWeight={600}>
                      {t("NavBar.KeepsBox")}
                    </Typography>
                  </Stack>
                </Button>
              </Grid2>

              <Grid2 display="flex" alignItems="center">
                <ShoppingBag />
                <Button color="inherit" onClick={handleClickGoods}>
                  <Typography>{t("NavBar.Products.title")}</Typography>
                </Button>

                <Menu anchorEl={anchorElGoods} open={openGoods} onClose={() => setAnchorElGoods(null)}>
                  <MenuItem onClick={() => router.push(getPageUrl.products(uniquePathFragment))}>{t("NavBar.Products.allProducts")}</MenuItem>
                  <MenuItem onClick={() => router.push(getPageUrl.products(uniquePathFragment).concat(`?productType=Shoes`))}>{t("ProductsPage.Filter.ProductType.shoesOption")}</MenuItem>
                  <MenuItem onClick={() => router.push(getPageUrl.products(uniquePathFragment).concat(`?productType=Pants`))}>{t("ProductsPage.Filter.ProductType.pantsOption")}</MenuItem>
                  <MenuItem onClick={() => router.push(getPageUrl.products(uniquePathFragment).concat(`?productType=Shirts`))}>{t("ProductsPage.Filter.ProductType.shirtOption")}</MenuItem>
                  <MenuItem onClick={() => router.push(getPageUrl.products(uniquePathFragment).concat(`?productType=Dresses`))}>{t("ProductsPage.Filter.ProductType.dressOption")}</MenuItem>
                </Menu>
              </Grid2>

              <Grid2 display="flex" alignItems="center">
                <Badge badgeContent={cartContext?.getUniqueItemsCount() || 0} showZero={true} color="error">
                  <ShoppingCart />
                </Badge>
                <Button color="inherit" onClick={() => router.push(getPageUrl.cart(uniquePathFragment))}>
                  <Typography>{t("NavBar.cart")}</Typography>
                </Button>
              </Grid2>

              {userContext?.getLoggedInUserData() ? (
                <Grid2 display="flex" alignItems="center" marginRight={2}>
                  <AccountCircle />
                  <Button color="inherit" onClick={handleClickAccount}>
                    <Typography>
                      {t("NavBar.Account.helloText", {
                        firstName: userContext.getLoggedInUserData()?.firstName ?? "null",
                        lastName: userContext.getLoggedInUserData()?.lastName ?? "null",
                      })}
                    </Typography>
                  </Button>

                  <Menu anchorEl={anchorElAccount} open={openAccount} onClose={() => setAnchorElAccount(null)}>
                    <MenuItem onClick={() => router.push(getPageUrl.subscriptions(uniquePathFragment))}>
                      <AttachMoneyOutlined /> {t("NavBar.Account.subscriptions")}
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <LogoutOutlined /> {t("NavBar.Account.logout")}
                    </MenuItem>
                  </Menu>
                </Grid2>
              ) : (
                <Grid2 display="flex" alignItems="center" marginRight={2}>
                  <Login />
                  <Button color="inherit" onClick={() => router.push(getPageUrl.login(uniquePathFragment))}>
                    <Typography>{t("NavBar.login")}</Typography>
                  </Button>
                </Grid2>
              )}
            </Grid2>
          </Stack>
        </Toolbar>
      </AppBar>
    </Stack>
  );
}

export default NavBar;
