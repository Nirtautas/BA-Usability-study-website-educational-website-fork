"use client";

import { products } from "@/data/entityData";
import { ProductType } from "@/data/types";
import { Box, Container, Grid2, Typography } from "@mui/material";
import ProductCard from "./productCard";

const ProductsPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Products Page
      </Typography>

      <Grid2 container spacing={2} justifyContent="center">
        <Grid2 container size={3} border={1}>
          <Box>
            <Typography>Sidebar</Typography>
          </Box>
        </Grid2>
        <Grid2 container spacing={2}>
          {products
            .filter((product) => product.type !== ProductType.DeceptiveExtra)
            .map((product) => (
              <ProductCard key={product.id} item={product} />
            ))}
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default ProductsPage;
