"use client";

import { useCart } from "@/data/cartContext";
import { getPageUrl, placeholderImageLink } from "@/data/constants";
import { products } from "@/data/entityData";
import { AccessTime, Add, LocalShippingOutlined, Remove } from "@mui/icons-material";
import { Box, Button, CardMedia, Container, Divider, Grid2, IconButton, Paper, Rating, Stack, Typography } from "@mui/material";
import { notFound, useRouter } from "next/navigation";
import { useState } from "react";
import TwoActionDialog from "../../shared/twoActionDialog";
import ProductGallery from "./productGallery";

type Props = {
  productId: number;
};

const ProductPage = ({ productId }: Props) => {
  const router = useRouter();
  const cartContext = useCart();
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
  const handleGoToCart = () => router.push(getPageUrl.cart());

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product Page
      </Typography>

      <Grid2 container spacing={2} justifyContent="center">
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Stack gap={1}>
            <ProductGallery product={product} />
            <Divider />
            <Stack>
              <Typography variant="h5">Description:</Typography>
              <Typography>{product.description}</Typography>
            </Stack>
          </Stack>
        </Paper>

        <Grid2 container spacing={2}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Stack gap={1}>
              <Typography variant="h3">{product.name}</Typography>
              {product.discountedPrice !== undefined ? (
                <Stack direction="column" display="flex" borderRadius={3} padding={1} sx={{ backgroundColor: "error.light" }}>
                  <Grid2 display="flex" gap={1}>
                    <AccessTime />
                    <Typography>Sale ending soon!</Typography>
                  </Grid2>
                  <Grid2 display="flex" gap={1}>
                    <Typography variant="h6" color="success.main">
                      {product.discountedPrice.toFixed(2)}€
                    </Typography>
                    <Typography variant="h6" sx={{ textDecoration: "line-through" }}>
                      {product.price.toFixed(2)}€
                    </Typography>
                  </Grid2>
                </Stack>
              ) : (
                <Box>
                  <Typography variant="h6">{product.price.toFixed(2)}€</Typography>
                </Box>
              )}

              <Grid2 display="flex" alignItems="center" gap={1}>
                <Rating readOnly={true} value={product.rating} />
                <Typography variant="body2" color="text.secondary">
                  ({product.ratingCount})
                </Typography>
              </Grid2>

              <Grid2 display="flex" alignItems="center" gap={1}>
                <LocalShippingOutlined />
                <Typography>{product.deliveryTime}</Typography>
              </Grid2>

              <Divider />

              <Grid2 display="flex" alignItems="center">
                <IconButton onClick={() => setSelectedProductQuantity(Math.max(1, selectedProductQuantity - 1))}>
                  <Remove />
                </IconButton>
                <Typography>{selectedProductQuantity}</Typography>
                <IconButton onClick={() => setSelectedProductQuantity(selectedProductQuantity + 1)}>
                  <Add />
                </IconButton>
                <Button variant="contained" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </Grid2>
            </Stack>
          </Paper>
        </Grid2>
      </Grid2>

      <TwoActionDialog
        open={openDialog}
        onClose={handleClose}
        onConfirm={handleGoToCart}
        title={`Added ${product.name.toLowerCase()} to cart!`}
        cancelText="Continue shopping"
        confirmText="Go to cart"
      >
        <Paper elevation={3} sx={{ padding: 1 }}>
          <Stack direction="row" alignItems="center">
            <CardMedia width={150} height={150} component="img" image={product.picturePaths?.[0] || placeholderImageLink} alt={product.name} sx={{ objectFit: "contain" }} />
            <Typography width={150} noWrap>
              {product.name}
            </Typography>
          </Stack>
        </Paper>
      </TwoActionDialog>
    </Container>
  );
};

export default ProductPage;
