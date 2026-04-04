import { ShopTitle } from "@/components/shared/simpleShared";
import { getPageUrl } from "@/data/constants";
import { Box, Button, Container, Divider, Link, Stack, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Container>
      <Stack direction="column" alignItems="center" gap={1}>
        <Stack direction="column" alignItems="center" bgcolor="primary.light" paddingInline={2} paddingBlock={1} borderRadius={2} gap={1}>
          <Typography fontSize={24} fontFamily="elephant" color="error.main">
            Spring sale is ending SOON!
          </Typography>
          <Typography>{`The spring sale is wrapping up soon!\nGet up to 40% off selected products and save BIG!`}</Typography>
          <Link href={getPageUrl.products().concat(`?onlyDiscounted=true`)}>
            <Button variant="contained">Click here to see discounted offers!</Button>
          </Link>
        </Stack>

        <Box sx={{ position: "relative", width: "100%", maxWidth: 1200, maxHeight: 400, borderRadius: 2, overflow: "hidden" }}>
          <Box component="img" src="/images/landingPagePicture.jpg" sx={{ width: "100%", height: "100%", display: "block" }} />

          <Box sx={{ position: "absolute", top: "2%", left: "80%", textAlign: "center", color: "white" }}>
            <Stack direction="column" alignItems="flex-end" fontFamily="elephant">
              <Typography fontFamily="elephant" fontSize={36}>
                Welcome to
              </Typography>
              <ShopTitle />
              <Link href={getPageUrl.products()} paddingTop={1}>
                <Button variant="contained" sx={{ bgcolor: "primary.light" }}>
                  <Typography fontFamily="elephant">Explore our products</Typography>
                </Button>
              </Link>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ width: "100%" }} />

        <Typography fontFamily="elephant" fontSize={36}>
          Who we are:
        </Typography>
        <Typography textAlign="center" fontSize={24}>
          Established in 1995, &quot;Keeps&quot; is an environmentaly conscious apperel brand, aiming to provide its customers with high-quality choices while keeping the planet in mind. We provide a
          wide range of products and are constantly trying to improve our offerings so you can have the best experience possible.
        </Typography>

        <Typography fontFamily="elephant" fontSize={36}>
          Hundreds of satisfied customers:
        </Typography>
        <Typography textAlign="center" fontSize={24}>
          We have been in the business for over 25 years and are proud to have a high satisfaction rate!
        </Typography>
      </Stack>
    </Container>
  );
};

export default HomePage;
