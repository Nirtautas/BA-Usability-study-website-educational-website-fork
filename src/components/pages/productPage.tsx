"use client";

import { useCart } from "@/data/cartContext";
import { getPageUrl, placeholderImageLink } from "@/data/constants";
import { products } from "@/data/entityData";
import { Add, Remove } from "@mui/icons-material";
import { Box, Button, Card, CardMedia, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  productId: number;
};

const ProductPage = ({ productId }: Props) => {
  const router = useRouter();
  const cartContext = useCart();
  const [openModal, setOpenModal] = useState(false);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(1);

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return notFound();
  }

  const handleAddToCart = () => {
    cartContext?.modifyCart(productId, selectedProductQuantity);
    setOpenModal(true);
  };

  const handleClose = () => setOpenModal(false);
  const handleGoToCart = () => router.push(getPageUrl.cart());

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product Page
      </Typography>

      <Grid2 container spacing={2} justifyContent="center">
        <Grid2 container size={7} border={1}>
          <Stack>
            <Box>
              <Typography>{product.name}</Typography>
            </Box>
            <Box>
              <Image src={product?.picturePaths?.[0] || "/images/productPictures/placeholder.jpg"} alt={product?.name || "Placeholder"} width={400} height={400} />
            </Box>
          </Stack>
        </Grid2>
        <Grid2 container spacing={2}>
          <Stack>
            <Typography>{product.price}€</Typography>
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

      <Dialog open={openModal} onClose={handleClose}>
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
