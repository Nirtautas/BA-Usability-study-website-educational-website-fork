import { getPageUrl } from "@/data/constants";
import { Button, Container, Grid2, Link, Stack, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Container>
      <Stack direction="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Welcome to the Store!
        </Typography>
        <Grid2>
          <Typography>SALE ENDING SOON</Typography>
          <Link href={getPageUrl.products().concat(`?onlyDiscounted=true`)}>
            <Button variant="contained">Check discounted products!!!</Button>
          </Link>
        </Grid2>
      </Stack>
    </Container>
  );
};

export default HomePage;
