"use client";

import { getPageUrl, placeholderImageLink } from "@/data/constants";
import { Product } from "@/data/types";
import { Card, CardActionArea, CardContent, CardMedia, Grid2, Typography } from "@mui/material";
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
          <CardMedia component="img" height="140" image={item.picturePaths?.[0] || placeholderImageLink} alt={item.name} />
          <CardContent>
            <Typography variant="h5">{item.name}</Typography>
            <Typography variant="h6">{item.price.toFixed(2)}€</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid2>
  );
};

export default ProductCard;
