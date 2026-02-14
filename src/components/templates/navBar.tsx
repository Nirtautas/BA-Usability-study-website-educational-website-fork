"use client";

import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";

const pages = [
  { name: "Products", path: "/products" },
  { name: "Cart", path: "/cart" },
  { name: "Login", path: "/login" },
];

const NavBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="a" href="/" sx={{ flexGrow: 1 }}>
            Store
          </Typography>
          <Box sx={{ alignItems: "center" }}>
            {pages.map((page) => (
              <Button key={page.name} color="inherit" href={page.path}>
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
