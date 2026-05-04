"use client";

import { getPageUrl, placeholderImageLink } from "@/data/constants";
import { useCart } from "@/data/contexts/cartContext";
import { products } from "@/data/entityData";
import { UniquePathFragment } from "@/utils/uniqueFragmentUtil";
import { AccessTime, Add, ArrowBack, Inventory2Outlined, LocalShippingOutlined, Remove } from "@mui/icons-material";
import { Box, Button, CardMedia, Container, Divider, Grid2, IconButton, Paper, Rating, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { notFound, useParams, useRouter } from "next/navigation";
import { useState } from "react";
import ActionDialogModal from "../../shared/actionDialogModal";
import ProductGallery from "./productGallery";

type Props = {
  productId: number;
};

const ProductPage = ({ productId }: Props) => {
  const router = useRouter();
  const cartContext = useCart();
  const params = useParams<{ uniquePathFragment: UniquePathFragment }>();
  const t = useTranslations();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(1);

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return notFound();
  }

  const handleAddToCart = () => {
    cartContext?.modifyCart(productId, selectedProductQuantity);
    setOpenDialog(true);
  };

  const handleClose = () => setOpenDialog(false);
  const handleGoToCart = () => router.push(getPageUrl.cart(params.uniquePathFragment));

  return (
    <Container>
      <Stack direction="column" gap={1} marginTop={2}>
        <Button variant="contained" onClick={() => router.push(getPageUrl.products(params.uniquePathFragment))} sx={{ alignSelf: "flex-start" }}>
          {t("ProductPage.backToProductsButtonText")}
        </Button>

        <Stack direction="row" gap={1} justifyContent="center" maxWidth={900}>
          <Paper elevation={3} sx={{ padding: 2, width: "100%", maxWidth: 600 }}>
            <Stack gap={1}>
              <ProductGallery product={product} />
              <Divider />
              <Stack>
                <Typography variant="h5" gutterBottom>
                  {t("ProductPage.descriptionTitle")}
                </Typography>
                <Divider />
                <Typography paddingTop={1}>{product.description ? t(product.description) : ""}</Typography>
              </Stack>
            </Stack>
          </Paper>

          <Grid2 container spacing={2}>
            <Paper elevation={3} sx={{ padding: 2, width: "100%" }}>
              <Stack gap={1}>
                <Typography variant="h3">{t(product.name)}</Typography>
                <Divider />

                {product.discountedPrice !== undefined ? (
                  <Stack direction="column" display="flex" padding={1}>
                    <Grid2 display="flex" gap={1} borderRadius={3} sx={{ backgroundColor: "error.light" }} padding={1} marginBottom={1}>
                      <AccessTime />
                      <Typography>{t("ProductPage.saleEndingSoonText")}</Typography>
                    </Grid2>
                    <Grid2 display="flex" gap={1} alignItems="center">
                      <Typography fontSize={24} color="success.main">
                        {product.discountedPrice.toFixed(2)}€
                      </Typography>
                      <ArrowBack />
                      <Typography fontSize={24} color="error.light" sx={{ textDecoration: "line-through" }}>
                        {product.price.toFixed(2)}€
                      </Typography>
                    </Grid2>
                  </Stack>
                ) : (
                  <Box>
                    <Typography fontSize={24}>{product.price.toFixed(2)}€</Typography>
                  </Box>
                )}
                <Divider />

                <Grid2 display="flex" alignItems="center" gap={1}>
                  <Rating readOnly={true} value={product.rating} />
                  <Typography color="text.secondary">({product.ratingCount})</Typography>
                </Grid2>
                <Divider />

                <Grid2 display="flex" alignItems="center" gap={1}>
                  <LocalShippingOutlined />
                  <Typography>{t("ProductPage.deliveryTimeText", { deliveryTime: product.deliveryTime })}</Typography>
                </Grid2>

                <Grid2 display="flex" alignItems="center" gap={1}>
                  <Inventory2Outlined />
                  {product.stock <= 5 ? (
                    <Typography color="error.main">{t("ProductPage.lowStockText")}</Typography>
                  ) : (
                    <Typography>{t("ProductPage.inStockText", { itemCount: product.stock })}</Typography>
                  )}
                </Grid2>

                <Divider />

                <Grid2 display="flex" alignItems="center">
                  <IconButton onClick={() => setSelectedProductQuantity(Math.max(1, selectedProductQuantity - 1))}>
                    <Remove />
                  </IconButton>
                  <Typography>{selectedProductQuantity}</Typography>
                  <IconButton onClick={() => setSelectedProductQuantity(selectedProductQuantity + 1 <= product.stock ? selectedProductQuantity + 1 : selectedProductQuantity)}>
                    <Add />
                  </IconButton>
                  <Button variant="contained" onClick={handleAddToCart} fullWidth>
                    {t("ProductPage.addToCartButtonText")}
                  </Button>
                </Grid2>
              </Stack>
            </Paper>
          </Grid2>
        </Stack>
      </Stack>

      <ActionDialogModal
        open={openDialog}
        onClose={handleClose}
        onConfirm={handleGoToCart}
        title={t("AddToCartModal.title", { productName: t(product.name) })}
        cancelText={t("AddToCartModal.cancelButtonText")}
        confirmText={t("AddToCartModal.confirmButtonText")}
      >
        <Paper elevation={3} sx={{ padding: 1 }}>
          <Stack direction="row" alignItems="center">
            <Box width={150} height={150} paddingRight={3}>
              <CardMedia
                component="img"
                image={product.picturePaths?.[0] || placeholderImageLink}
                alt={t(product.name)}
                width="100%"
                height="100%"
                sx={{
                  objectFit: "contain",
                }}
              />
            </Box>
            <Typography noWrap>{t(product.name)}</Typography>
          </Stack>
        </Paper>
      </ActionDialogModal>
    </Container>
  );
};

export default ProductPage;
