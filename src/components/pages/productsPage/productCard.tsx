"use client";

import { getPageUrl, placeholderImageLink } from "@/data/constants";
import { Product } from "@/data/types";
import { Discount, LocalShippingOutlined } from "@mui/icons-material";
import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Grid2, Rating, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

type Props = {
  item: Product;
};

const ProductCard = ({ item }: Props) => {
  const router = useRouter();

  return (
    <Grid2 key={item.id}>
      <Card>
        <CardActionArea key={item.id} component="a" onClick={() => router.push(getPageUrl.product(item.id))}>
          {item.discountedPrice !== undefined ? <Chip label="Sale" icon={<Discount />} color="success" sx={{ position: "absolute", top: 8, left: 8 }} /> : null}
          <CardMedia component="img" height="180" image={item.picturePaths?.[0] || placeholderImageLink} alt={item.name} />
          <CardContent>
            <Grid2 display="flex" alignItems="center" gap={1}>
              <LocalShippingOutlined />
              <Typography>{item.deliveryTime}</Typography>
            </Grid2>

            <Typography variant="h5">{item.name}</Typography>
            {item.discountedPrice !== undefined ? (
              <Box display="flex" gap={1}>
                <Typography variant="h6" color="success.main">
                  {item.discountedPrice.toFixed(2)}€
                </Typography>
                <Typography variant="h6" color="error.main" sx={{ textDecoration: "line-through" }}>
                  {item.price.toFixed(2)}€
                </Typography>
              </Box>
            ) : (
              <Box>
                <Typography variant="h6">{item.price.toFixed(2)}€</Typography>
              </Box>
            )}

            <Grid2 display="flex" alignItems="center" gap={1}>
              <Rating readOnly={true} value={item.rating} />
              <Typography variant="body2" color="text.secondary">
                ({item.ratingCount})
              </Typography>
            </Grid2>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid2>
  );
};

export default ProductCard;
