import { ShopTitle } from "@/components/shared/simpleShared";
import { getPageUrl } from "@/data/constants";
import { Box, Button, Container, Divider, Link, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const HomePage = () => {
  const t = useTranslations("LandingPage");

  return (
    <Container>
      <Stack direction="column" alignItems="center" gap={1}>
        <Stack direction="column" alignItems="center" bgcolor="primary.light" paddingInline={2} paddingBlock={1} borderRadius={2} gap={1}>
          <Typography variant="h5" color="error.main">
            {t("SpringSale.title")}
          </Typography>
          <Typography>{t("SpringSale.description")}</Typography>
          <Link href={getPageUrl.products().concat(`?onlyDiscounted=true`)}>
            <Button variant="contained">{t("SpringSale.buttonText")}</Button>
          </Link>
        </Stack>

        <Box sx={{ position: "relative", width: "100%", maxWidth: 1200, maxHeight: 400, borderRadius: 2, overflow: "hidden" }}>
          <Box component="img" src="/images/landingPagePicture.jpg" sx={{ width: "100%", height: "100%", display: "block" }} />

          <Box sx={{ position: "absolute", top: "55%", left: "70%", textAlign: "center", color: "white" }}>
            <Stack direction="column" alignItems="flex-end" fontFamily="elephant">
              <Typography variant="h3">{t("MainBanner.title")}</Typography>
              <ShopTitle />
              <Link href={getPageUrl.products()} paddingTop={1}>
                <Button variant="contained" sx={{ bgcolor: "primary.light" }}>
                  <Typography fontFamily="elephant">{t("MainBanner.buttonText")}</Typography>
                </Button>
              </Link>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ width: "100%" }} />

        <Typography variant="h3">{t("StoreInformation.Introduction.title")}</Typography>
        <Typography textAlign="center" fontSize={24}>
          {t("StoreInformation.Introduction.description")}
        </Typography>

        <Typography variant="h3">{t("StoreInformation.CustomerSatisfaction.title")}</Typography>
        <Typography textAlign="center" fontSize={24}>
          {t("StoreInformation.CustomerSatisfaction.description")}
        </Typography>
      </Stack>
    </Container>
  );
};

export default HomePage;
