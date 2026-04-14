import { ShopTitle } from "@/components/shared/simpleShared";
import { getPageUrl, landingPageImageLink, loginPageImageLink } from "@/data/constants";
import { Box, Button, Container, Divider, Link, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import FakeReviewMarquee from "./fakeReviewMarquee";

const HomePage = () => {
  const t = useTranslations("LandingPage");

  return (
    <Container>
      <Stack direction="column" alignItems="center" gap={1}>
        <Stack direction="row" gap={1} borderRadius={2} border="1px solid" borderColor="#ccc">
          <Box component="img" src={loginPageImageLink} maxWidth={150} sx={{ objectFit: "cover" }} />
          <Stack direction="column" gap={1} textAlign="center" margin={2} flex={1}>
            <Typography variant="h5" color="error.main">
              {t("SpringSale.title")}
            </Typography>
            <Typography>{t("SpringSale.description")}</Typography>
            <Link href={getPageUrl.products().concat(`?onlyDiscounted=true`)}>
              <Button variant="contained">{t("SpringSale.buttonText")}</Button>
            </Link>
          </Stack>
        </Stack>

        <Box sx={{ position: "relative", width: "100%", maxWidth: 1200, maxHeight: 400, borderRadius: 2, overflow: "hidden" }}>
          <Box component="img" src={landingPageImageLink} sx={{ width: "100%", height: "100%", display: "block" }} />

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

        <Divider sx={{ width: "100%" }} />

        <Typography variant="h3">{t("StoreInformation.CustomerSatisfaction.title")}</Typography>
        <Typography textAlign="center" fontSize={24}>
          {t("StoreInformation.CustomerSatisfaction.description")}
        </Typography>
        <FakeReviewMarquee />
      </Stack>
    </Container>
  );
};

export default HomePage;
