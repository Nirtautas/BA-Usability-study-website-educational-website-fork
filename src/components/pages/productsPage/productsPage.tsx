"use client";

import { products } from "@/data/entityData";
import { ProductType } from "@/data/types";
import { Container, FormControlLabel, Grid2, Paper, Slider, Switch, Typography } from "@mui/material";
import { useState } from "react";
import ProductCard from "./productCard";

const prices = products.map((p) => p.discountedPrice ?? p.price);
const minPrice = Math.min(...prices);
const maxPrice = Math.max(...prices);

const ProductsPage = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Products Page
      </Typography>

      <Grid2 container spacing={2} justifyContent="center" sx={{ alignItems: "flex-start" }}>
        <Grid2 container size={3}>
          <Paper elevation={3} sx={{ padding: 2, width: "100%" }}>
            <Typography variant="h6">Filters</Typography>

            <Grid2>
              <Typography>
                Price range: {minPrice}€ - {maxPrice}€
              </Typography>
              <Slider value={priceRange} onChange={handlePriceChange} valueLabelDisplay="auto" min={minPrice} max={maxPrice} />
            </Grid2>
            <Grid2>
              <FormControlLabel control={<Switch checked={onlyDiscounted} onChange={(e) => setOnlyDiscounted(e.target.checked)} />} label="Only discounted" />
            </Grid2>
          </Paper>
        </Grid2>

        <Grid2 container size={9} spacing={2}>
          {products
            .filter((product) => product.type !== ProductType.DeceptiveExtra)
            .filter((product) => (product.discountedPrice ?? product.price) >= priceRange[0] && (product.discountedPrice ?? product.price) <= priceRange[1])
            .filter((product) => !onlyDiscounted || (product.discountedPrice !== undefined && product.discountedPrice > 0))
            .map((product) => (
              <ProductCard key={product.id} item={product} />
            ))}
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default ProductsPage;
