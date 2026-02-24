"use client";

import { getPageUrl } from "@/data/constants";
import { Product, ProductType } from "@/data/types";
import { Button, Checkbox, FormControlLabel, Grid2, Link, Paper, Slider, Switch, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Props = {
  products: Product[];
  appliedFilters: {
    oldMinPrice: number;
    oldMaxPrice: number;
    oldOnlyDiscounted: boolean;
    oldProductTypes: string[];
  };
};

const ProductsFilter = ({ products, appliedFilters }: Props) => {
  const t = useTranslations("Products.Filter");
  const prices = products.map((p) => p.discountedPrice ?? p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const [selectedMinPrice, setSelectedMinPrice] = useState<number>(Number.isNaN(appliedFilters.oldMinPrice) ? minPrice : appliedFilters.oldMinPrice);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(Number.isNaN(appliedFilters.oldMaxPrice) ? maxPrice : appliedFilters.oldMaxPrice);
  const [onlyDiscounted, setOnlyDiscounted] = useState(appliedFilters.oldOnlyDiscounted ?? false);
  const [selectedTypes, setSelectedTypes] = useState<ProductType[]>(appliedFilters.oldProductTypes?.map((t) => t as ProductType) ?? []);

  const getSearchString = () => {
    const params = new URLSearchParams();

    params.set("minPrice", selectedMinPrice.toString());
    params.set("maxPrice", selectedMaxPrice.toString());
    params.set("onlyDiscounted", onlyDiscounted.toString());
    selectedTypes.forEach((type) => {
      params.append("productType", type.toString());
    });

    return getPageUrl.products().concat(`?${params.toString()}`);
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setSelectedMinPrice(newValue[0]);
      setSelectedMaxPrice(newValue[1]);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, width: "100%" }}>
      <Typography variant="h6">{t("title")}</Typography>
      <Grid2>
        <Typography>Product type:</Typography>
        {Object.values(ProductType).map(
          (type) =>
            type !== ProductType.DeceptiveExtra && (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={selectedTypes.includes(type)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTypes([...selectedTypes, type]);
                      } else {
                        setSelectedTypes(selectedTypes.filter((t) => t !== type));
                      }
                    }}
                  />
                }
                label={type}
              />
            ),
        )}
      </Grid2>
      <Grid2>
        <Typography>
          Price range: {minPrice}€ - {maxPrice}€
        </Typography>
        <Slider value={[selectedMinPrice, selectedMaxPrice]} onChange={handlePriceChange} valueLabelDisplay="auto" min={minPrice} max={maxPrice} />
      </Grid2>
      <Grid2>
        <FormControlLabel control={<Switch checked={onlyDiscounted} onChange={(e) => setOnlyDiscounted(e.target.checked)} />} label="Only discounted" />
      </Grid2>
      <Grid2>
        <Link href={getSearchString()}>
          <Button fullWidth variant="contained">
            Search
          </Button>
        </Link>
      </Grid2>
    </Paper>
  );
};

export default ProductsFilter;
