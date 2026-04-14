import type { Metadata } from "next";
import { Abril_Fatface, Geist, Geist_Mono } from "next/font/google";

import favicon from "@/app/favicon.ico";
import Footer from "@/components/templates/footer";
import MarketingPopup from "@/components/templates/marketingPopup";
import MuiThemeProvider from "@/components/templates/mui";
import NavBar from "@/components/templates/navBar/navBar";
import { CartProvider } from "@/data/cartContext";
import { SubscriptionDataProvider } from "@/data/subscriptionContext";
import { UserDataProvider } from "@/data/userContext";
import { routing } from "@/i18n/routing";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const abril = Abril_Fatface({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-abril",
});

export const metadata: Metadata = {
  title: "Keeps - Apparel & more",
  description: "An apperel store",
  icons: favicon.src,
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${abril.variable}`}
        style={{
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          minHeight: "100vh",
          margin: 0,
        }}
      >
        <AppRouterCacheProvider>
          <MuiThemeProvider>
            <NextIntlClientProvider locale={locale}>
              <UserDataProvider>
                <CartProvider>
                  <SubscriptionDataProvider>
                    <NavBar />
                    {children}
                    <Footer />
                    <MarketingPopup />
                  </SubscriptionDataProvider>
                </CartProvider>
              </UserDataProvider>
            </NextIntlClientProvider>
          </MuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
