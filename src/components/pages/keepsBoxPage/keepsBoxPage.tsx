"use client";

import SubheadingBold from "@/components/shared/subheadingBold";
import { getPageUrl, keepsBoxPicture } from "@/data/constants";
import { useCart } from "@/data/contexts/cartContext";
import { products } from "@/data/entityData";
import { SubscriptionType } from "@/data/types";
import { useRouter } from "@/i18n/navigation";
import { UniquePathFragment } from "@/utils/uniqueFragmentUtil";
import { Box, Button, Container, Divider, FormControl, List, ListItem, Paper, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";

const KeepsBoxPage = () => {
  const params = useParams<{ uniquePathFragment: UniquePathFragment }>();
  const t = useTranslations();
  const cartContext = useCart();
  const router = useRouter();
  const filteredSubscriptions = products.filter((product) => product.subscriptionType === SubscriptionType.KeepsBox);
  const defaultSubscriptionId = filteredSubscriptions[filteredSubscriptions.length - 1]?.id?.toString() ?? "";
  const [subscriptionId, setSubscriptionId] = useState(defaultSubscriptionId);
  console.log(params.uniquePathFragment);

  const addSubscriptionToCart = () => {
    const cartItems = cartContext?.getFullCartItems();
    const keepsBoxCartItems = cartItems?.filter((i) => i.item.subscriptionType === SubscriptionType.KeepsBox) ?? [];

    if (keepsBoxCartItems?.length === 0) {
      cartContext?.modifyCart(Number(subscriptionId), 1);
    } else {
      keepsBoxCartItems.forEach((subscription) => {
        cartContext?.removeFromCart(Number(subscription.item.id));
      });

      cartContext?.modifyCart(Number(subscriptionId), 1);
    }

    router.push(getPageUrl.cart(params.uniquePathFragment));
  };

  return (
    <Container maxWidth="lg">
      <FormControl required fullWidth>
        <Stack>
          <Stack direction="row" gap={1} display="flex" marginBottom={2}>
            <Typography variant="h5">{t("KeepsBoxPage.lookingForProductsText")}</Typography>
            <Button variant="contained" onClick={() => router.push(getPageUrl.products(params.uniquePathFragment))}>
              <Typography>{t("KeepsBoxPage.goToProductsButtonText")}</Typography>
            </Button>
          </Stack>

          <Paper elevation={3}>
            <Box padding={1}>
              <Box padding={1} textAlign="center">
                <Typography variant="h3" marginBottom={1}>
                  {t("NavBar.KeepsBox")}
                </Typography>
                <Divider />
                <Typography fontSize={24}>{t("KeepsBoxPage.description")}</Typography>
                <img src={keepsBoxPicture} alt={t("NavBar.KeepsBox")} style={{ height: "auto", maxWidth: "100%" }} />
              </Box>
              <Divider />
              <RadioGroup value={subscriptionId} name="bank" onChange={(e) => setSubscriptionId(e.target.value)} sx={{ padding: 1 }}>
                <Typography fontWeight={600}>{t("KeepsBoxPage.selectSubscriptionText")}</Typography>
                <Stack direction="row" gap={1} marginTop={1} marginBottom={1}>
                  {filteredSubscriptions.map((product, index) => {
                    const value = product.id.toString();
                    const selected = value === subscriptionId;

                    return (
                      <Box
                        key={product.id}
                        border={defaultSubscriptionId === value ? "4px solid" : "2px solid"}
                        borderColor={selected ? (value === defaultSubscriptionId ? "success.main" : "primary.main") : "primary.light"}
                        borderRadius={2}
                        boxShadow={3}
                        padding={1}
                        flex={1}
                        textAlign="center"
                        onClick={() => setSubscriptionId(value)}
                        sx={{
                          opacity: index === 0 ? 0.4 : 1,
                          cursor: index === 0 ? "default" : "pointer",
                        }}
                      >
                        <Radio value={value} checked={selected} onChange={(e) => setSubscriptionId(e.target.value)} sx={{ display: "none" }} />
                        <Stack height="100%">
                          <SubheadingBold headingText={t(product.name)} />
                          <Divider />

                          <Typography fontSize={16} textAlign="left">
                            {t(product.description ?? "")}
                          </Typography>
                          <Divider />

                          <Typography fontSize={16} fontWeight={600} textAlign="left">
                            {t("KeepsBoxPage.subscriptionIncludesText")}
                          </Typography>
                          <Divider />

                          <List dense={true}>
                            {product.qualitiesDescriptions?.map((quality, index) => (
                              <ListItem key={index} sx={{ padding: 0 }}>
                                <Typography fontSize={14}>
                                  {index + 1}. {t(quality)}
                                </Typography>
                              </ListItem>
                            ))}
                          </List>

                          <Divider />
                          {product.discountedPrice !== undefined ? (
                            <Box marginTop="auto" display="flex" justifyContent="flex-end" gap={1}>
                              <Typography fontSize={32} color="success.main">
                                {product.discountedPrice.toFixed(2)}€
                              </Typography>
                              <Typography fontSize={32} color="error.main" sx={{ textDecoration: "line-through" }}>
                                {product.price.toFixed(2)}€
                              </Typography>
                            </Box>
                          ) : (
                            <Box marginTop="auto" display="flex" justifyContent="flex-end">
                              <Typography fontSize={32}>{product.price.toFixed(2)}€</Typography>
                            </Box>
                          )}
                        </Stack>
                      </Box>
                    );
                  })}
                </Stack>
              </RadioGroup>
              <Divider />
              <Button variant="contained" fullWidth onClick={addSubscriptionToCart} sx={{ marginTop: 1 }}>
                <Typography>{t("KeepsBoxPage.addToCartButtonText")}</Typography>
              </Button>
            </Box>
          </Paper>
        </Stack>
      </FormControl>
    </Container>
  );
};

export default KeepsBoxPage;
