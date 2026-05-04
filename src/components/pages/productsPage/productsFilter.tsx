"use client";

import SubheadingBold from "@/components/shared/subheadingBold";
import { getPageUrl } from "@/data/constants";
import { Product, ProductType, productTypeTranslationKeyMap } from "@/data/types";
import { UniquePathFragment } from "@/utils/uniqueFragmentUtil";
import { Button, Checkbox, Divider, FormControlLabel, Link, Paper, Slider, Stack, Switch, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";

type Props = {
  products: Product[];
  appliedFilters: {
    oldMinPrice: number;
    oldMaxPrice: number;
    oldOnlyDiscounted: boolean;
    oldProductTypes: string[];
    oldSearchFragment: string;
  };
};

const ProductsFilter = ({ products, appliedFilters }: Props) => {
  const parameters = useParams<{ uniquePathFragment: UniquePathFragment }>();
  const t = useTranslations("ProductsPage.Filter");
  const prices = products.map((p) => p.discountedPrice ?? p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const [selectedMinPrice, setSelectedMinPrice] = useState<number>(Number.isNaN(appliedFilters.oldMinPrice) ? minPrice : appliedFilters.oldMinPrice);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(Number.isNaN(appliedFilters.oldMaxPrice) ? maxPrice : appliedFilters.oldMaxPrice);
  const [onlyDiscounted, setOnlyDiscounted] = useState(appliedFilters.oldOnlyDiscounted ?? false);
  const [selectedTypes, setSelectedTypes] = useState<ProductType[]>(appliedFilters.oldProductTypes?.map((t) => t as ProductType) ?? []);
  const [searchFragment, setSearchFragment] = useState(appliedFilters.oldSearchFragment ?? "");

  const getSearchString = () => {
    const params = new URLSearchParams();

    params.set("minPrice", selectedMinPrice.toString());
    params.set("maxPrice", selectedMaxPrice.toString());
    params.set("onlyDiscounted", onlyDiscounted.toString());
    selectedTypes.forEach((type) => {
      params.append("productType", type.toString());
    });

    if (searchFragment.trim()) {
      params.append("searchFragment", searchFragment.trim());
    }

    return getPageUrl.products(parameters.uniquePathFragment).concat(`?${params.toString()}`);
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setSelectedMinPrice(newValue[0]);
      setSelectedMaxPrice(newValue[1]);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, width: "100%" }}>
      <SubheadingBold headingText={t("title")} />
      <Divider />

      <Stack direction="column" gap={1}>
        <Typography>{t("ProductType.title")}</Typography>
        <Stack direction="column">
          {Object.values(ProductType).map(
            (type) =>
              type !== ProductType.DeceptiveExtra &&
              type !== ProductType.Subscriptions && (
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
                  label={t(productTypeTranslationKeyMap[type])}
                />
              ),
          )}
        </Stack>

        <Divider />
        <Typography>{t("PriceRange.title", { minPrice, maxPrice })}</Typography>
        <Slider value={[selectedMinPrice, selectedMaxPrice]} onChange={handlePriceChange} valueLabelDisplay="auto" min={minPrice} max={maxPrice} />

        <Divider />
        <FormControlLabel control={<Switch checked={onlyDiscounted} onChange={(e) => setOnlyDiscounted(e.target.checked)} />} label={t("OnlyDiscounted.title")} />

        <Divider />
        <Typography>{t("SearchFragment.filterLabel")}</Typography>
        <TextField label={t("SearchFragment.title")} variant="outlined" size="small" fullWidth value={searchFragment} onChange={(e) => setSearchFragment(e.target.value)} />

        <Divider />
        <Link href={getSearchString()} paddingTop={1}>
          <Button fullWidth variant="contained">
            {t("searchButtonText")}
          </Button>
        </Link>
      </Stack>
    </Paper>
  );
};

export default ProductsFilter;
