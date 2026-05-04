import { maxProductThumbnails, placeholderImageLink } from "@/data/constants";
import { Product } from "@/data/types";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";

type Props = {
  product: Product;
};

const ProductGallery = ({ product }: Props) => {
  const t = useTranslations();
  const productPicturePaths = product?.picturePaths || [];
  const visibleThumbnailPaths = productPicturePaths.slice(0, maxProductThumbnails);
  const hiddenThumbnailCount = productPicturePaths.length - maxProductThumbnails;

  return (
    <Stack direction="column" spacing={1}>
      <Box borderRadius={2} overflow="hidden" position="relative">
        {/*
            <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            zIndex: 2,
            backgroundColor: "success.main",
            color: "white",
            padding: 1,
            borderRadius: 2,
            fontSize: 14,
            fontWeight: 600,
            maxWidth: 260,
            boxShadow: 2,
          }}
        >
          <Stack direction="row" display="flex" alignItems="center" gap={0.5}>
            <AddShoppingCart />
            <Typography>{t("ProductPage.activityNotificationText", { peopleCount: 24 })}</Typography>
          </Stack>
        </Box>
          */}

        <Image
          key={0}
          src={product?.picturePaths?.[0] || placeholderImageLink}
          alt={product?.name || "Placeholder"}
          width={532}
          height={532}
          style={{
            objectFit: "contain",
          }}
        />
      </Box>

      <Stack direction="row" spacing={1}>
        {visibleThumbnailPaths.map((path, index) => {
          const isLastThumbnailWithMore = index === maxProductThumbnails - 1 && hiddenThumbnailCount > 0;

          return (
            <Box key={index} borderRadius={2} overflow="hidden" sx={{ position: "relative", width: 100, height: 100 }}>
              <Image key={index} src={path || placeholderImageLink} alt={product?.name + " thumbnail " + (index + 1)} width={100} height={100} style={{ objectFit: "contain" }} />
              {isLastThumbnailWithMore && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 10,
                  }}
                >
                  <Typography>+{hiddenThumbnailCount}</Typography>
                </Box>
              )}
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default ProductGallery;
