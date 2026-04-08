"use client";

import SubheadingBold from "@/components/shared/subheadingBold";
import { Container, List, ListItem, ListItemButton, ListItemText, Paper, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const AttributionsPage = () => {
  const t = useTranslations("AttributionsPage");

  return (
    <Container>
      <Stack direction="column" display="flex" alignItems="center" gap={1}>
        <Typography variant="h5" gutterBottom>
          {t("title")}
        </Typography>

        <Paper elevation={3} sx={{ padding: 2, width: 600 }}>
          <Typography gutterBottom>{t("description")}</Typography>
          <SubheadingBold headingText={t("freepikText")} />
          <List dense={true}>
            <ListItem>
              <ListItemButton
                component="a"
                href="https://www.freepik.com/free-photo/fashion-shoot-asian-woman-city_2827624.htm#fromView=search&page=4&position=46&uuid=4c2138e0-9048-4d38-853d-580a643d3a13&query=fashion"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItemText primary="rawpixel.com - Landing page picture" />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                component="a"
                href="https://www.freepik.com/free-photo/closeup-shot-purple-phalaenopsis-orchid-flowers-with-water-droplets_22859783.htm#fromView=search&page=1&position=20&uuid=4d0182b0-c058-4766-bc8e-565f2bfddb77&query=orchid"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItemText primary="wirestock - Orchid placeholder" />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                component="a"
                href="https://www.freepik.com/free-vector/corporate-business-fintech-logo-abstract-design-template-real-estate-charts-diagram-logotype-concept_7686952.htm#fromView=search&page=1&position=1&uuid=799101c1-2c34-43f4-9d12-8d1f562719c8&query=bank+logo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItemText primary="patrickss - Fintech bank logo" />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                component="a"
                href="https://www.freepik.com/free-vector/abstract-graphic-logo_822616.htm#fromView=search&page=1&position=0&uuid=543a6cfe-576b-403c-bf6f-d7698a712eca&query=bank+logo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItemText primary="patrickss - Finance bank logo" />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                component="a"
                href="https://www.freepik.com/free-vector/financial-logo-business-template-branding-design-vector_18879978.htm#fromView=search&page=1&position=42&uuid=543a6cfe-576b-403c-bf6f-d7698a712eca&query=bank+logo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItemText primary="rawpixel.com - Avobank bank logo" />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                component="a"
                href="https://www.freepik.com/free-vector/modern-money-logo-concept_2723611.htm#fromView=search&page=2&position=2&uuid=543a6cfe-576b-403c-bf6f-d7698a712eca&query=bank+logo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItemText primary="freepik - MoneyCare bank logo" />
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                component="a"
                href="https://www.freepik.com/free-vector/money-logos-collection-companies_2620514.htm#fromView=search&page=2&position=42&uuid=543a6cfe-576b-403c-bf6f-d7698a712eca&query=bank+logo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItemText primary="freepik - FastCash bank logo" />
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>

        <Paper elevation={3} sx={{ padding: 2, width: 600 }}>
          <SubheadingBold headingText={t("aiText")} />
          <List dense={true}>
            <ListItem>
              <ListItemButton component="a" href="https://chatgpt.com/" target="_blank" rel="noopener noreferrer">
                <ListItemText primary="Chat GPT - Product photos & descriptions" />
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>
      </Stack>
    </Container>
  );
};

export default AttributionsPage;
