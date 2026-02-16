"use client";

import { useCart } from "@/data/cartContext";
import { getPageUrl, placeholderImageLink } from "@/data/constants";
import { products } from "@/data/entityData";
import { Add, LocalShippingOutlined, Remove } from "@mui/icons-material";
import { Box, Button, Card, CardMedia, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid2, IconButton, Rating, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { useState } from "react";

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
        <Grid2 container>
          <Image src={product?.picturePaths?.[0] || "/images/productPictures/placeholder.jpg"} alt={product?.name || "Placeholder"} width={500} height={500} />
        </Grid2>

        <Grid2 container spacing={2}>
          <Stack>
            <Typography variant="h3">{product.name}</Typography>
            {product.discountedPrice !== undefined ? (
              <Box display="flex" gap={1}>
                <Typography variant="h6" color="success.main">
                  {product.discountedPrice.toFixed(2)}€
                </Typography>
                <Typography variant="h6" color="error.main" sx={{ textDecoration: "line-through" }}>
                  {product.price.toFixed(2)}€
                </Typography>
              </Box>
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

            <Divider sx={{ my: 2 }} />

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
        </Grid2>
      </Grid2>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Added to Cart!</DialogTitle>
        <DialogContent>
          <Card>
            <Grid2 display="flex" alignItems="center" gap={2}>
              <CardMedia component="img" height="140" image={product.picturePaths?.[0] || placeholderImageLink} alt={product.name} />
              <Typography>{product.name}</Typography>
            </Grid2>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Continue Shopping
          </Button>
          <Button onClick={handleGoToCart} variant="contained" color="primary">
            Go to Cart
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductPage;
