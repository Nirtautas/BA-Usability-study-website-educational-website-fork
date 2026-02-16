import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/templates/footer";
import MuiThemeProvider from "@/components/templates/mui";
import NavBar from "@/components/templates/navBar";
import { CartProvider } from "@/data/cartContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import favicon from "./favicon.ico";

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
  icons: favicon.src,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
              <NavBar />
              {children}
              <Footer />
            </MuiThemeProvider>
          </AppRouterCacheProvider>
        </CartProvider>
      </body>
    </html>
  );
}
