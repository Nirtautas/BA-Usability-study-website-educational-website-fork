import { products } from "@/data/entityData";
import { ProductType } from "@/data/types";
import { Container, Grid2, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import ProductCard from "./productCard";
import ProductsFilter from "./productsFilter";

type PageProps = {
  searchParams?: {
    minPrice?: string;
    maxPrice?: string;
    onlyDiscounted?: string;
    productType?: string | string[];
    searchFragment?: string;
  };
};

const ProductsPage = ({ searchParams }: PageProps) => {
  const t = useTranslations("ProductsPage");
  const minPrice = Number(searchParams?.minPrice);
  const maxPrice = Number(searchParams?.maxPrice);
  const onlyDiscounted = searchParams?.onlyDiscounted === "true";
  const productTypes: string[] = searchParams?.productType ? (Array.isArray(searchParams.productType) ? searchParams.productType : [searchParams.productType]) : [];

  const filteredOutProducts = products
    .filter((product) => product.type !== ProductType.DeceptiveExtra)
    .filter((product) => {
      if (Number.isNaN(minPrice)) return true;
      return (product.discountedPrice ?? product.price) >= minPrice;
    })
    .filter((product) => {
      if (Number.isNaN(maxPrice)) return true;
      return (product.discountedPrice ?? product.price) <= maxPrice;
    })
    .filter((product) => {
      if (!onlyDiscounted) return true;
      return product?.discountedPrice && product.discountedPrice > 0;
    })
    .filter((product) => {
      if (productTypes.length === 0) return true;
      return productTypes.includes(product.type);
    })
    .filter((product) => {
      if (productTypes.length === 0) return true;
      return productTypes.includes(product.type);
    })
    .filter((product) => {
      if (!searchParams?.searchFragment) return true;
      return product.name.toUpperCase().includes(searchParams.searchFragment.toUpperCase());
    });

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {t("title")}
      </Typography>

      <Grid2 container spacing={2} justifyContent="center" sx={{ alignItems: "flex-start" }}>
        <Grid2 container size={3}>
          <ProductsFilter
            products={products}
            appliedFilters={{ oldMinPrice: minPrice, oldMaxPrice: maxPrice, oldOnlyDiscounted: onlyDiscounted, oldProductTypes: productTypes, oldSearchFragment: searchParams?.searchFragment ?? "" }}
          />
        </Grid2>

        <Grid2 container size={9} spacing={2}>
          {filteredOutProducts.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default ProductsPage;
