"use client";

import { getPageUrl, placeholderImageLink } from "@/data/constants";
import { Product } from "@/data/types";
import { Discount, LocalShippingOutlined } from "@mui/icons-material";
import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Grid2, Rating, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

type Props = {
  item: Product;
};

const ProductCard = ({ item }: Props) => {
  const t = useTranslations();
  const router = useRouter();

  return (
    <Grid2 key={item.id} width={270}>
      <Card>
        <CardActionArea key={item.id} component="a" onClick={() => router.push(getPageUrl.product(item.id))}>
          {item.discountedPrice !== undefined ? <Chip label={t("ProductsPage.saleTagText")} icon={<Discount />} color="success" sx={{ position: "absolute", top: 8, left: 8, zIndex: 2 }} /> : null}
          <Box width="100%" paddingTop="100%" position="relative">
            <CardMedia
              component="img"
              image={item.picturePaths?.[0] || placeholderImageLink}
              alt={item.name}
              width="100%"
              height="100%"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                objectFit: "contain",
                borderBottom: "1px solid #ccc",
              }}
            />
          </Box>
          <CardContent>
            <Grid2 display="flex" alignItems="center" gap={1}>
              <LocalShippingOutlined />
              <Typography>
                {item.deliveryTime} {t("ProductCard.deliveryDaysText")}
              </Typography>
            </Grid2>

            <Typography fontSize={24}>{t(item.name)}</Typography>
            {item.discountedPrice !== undefined ? (
              <Box display="flex" gap={1}>
                <Typography fontSize={24} color="success.main">
                  {item.discountedPrice.toFixed(2)}€
                </Typography>
                <Typography fontSize={24} color="error.main" sx={{ textDecoration: "line-through" }}>
                  {item.price.toFixed(2)}€
                </Typography>
              </Box>
            ) : (
              <Box>
                <Typography fontSize={24}>{item.price.toFixed(2)}€</Typography>
              </Box>
            )}

            <Grid2 display="flex" alignItems="center" gap={1}>
              <Rating readOnly={true} value={item.rating} />
              <Typography color="text.secondary">({item.ratingCount})</Typography>
            </Grid2>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid2>
  );
};

export default ProductCard;
