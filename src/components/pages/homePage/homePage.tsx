import { getPageUrl } from "@/data/constants";
import { Button, Container, Link, Paper, Stack, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <Container>
      <Stack direction="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Welcome to the Store!
        </Typography>
        <Stack direction="column">
          <Paper elevation={3} sx={{ padding: 1, bgcolor: "primary.light" }}>
            <Typography>Winter sale ending soon!</Typography>
            <Typography>Get up to 40% off on selected products and save big!</Typography>
            <Link href={getPageUrl.products().concat(`?onlyDiscounted=true`)}>
              <Button variant="contained">Click here to see discounted offers!</Button>
            </Link>
          </Paper>
        </Stack>
      </Stack>
    </Container>
  );
};

export default HomePage;
