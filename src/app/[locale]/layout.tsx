import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import favicon from "@/app/favicon.ico";
import Footer from "@/components/templates/footer";
import MuiThemeProvider from "@/components/templates/mui";
import NavBar from "@/components/templates/navBar";
import { CartProvider } from "@/data/cartContext";
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

export const metadata: Metadata = {
  title: "Store",
  description: "Store",
  icons: favicon,
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
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          minHeight: "100vh",
          margin: 0,
        }}
      >
        <CartProvider>
          <AppRouterCacheProvider>
            <MuiThemeProvider>
              <NextIntlClientProvider>
                <NavBar />
                {children}
                <Footer />
              </NextIntlClientProvider>
            </MuiThemeProvider>
          </AppRouterCacheProvider>
        </CartProvider>
      </body>
    </html>
  );
}
