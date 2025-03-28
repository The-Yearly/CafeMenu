import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CartProvider from "@/lib/context/ItemContext";
import { ThemeProvider } from "@/lib/context/ThemeContext";
import { OrderProvider } from "@/lib/context/ordersContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cookie",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <ThemeProvider>
            <OrderProvider>
              {children}
              </OrderProvider>
            </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  );
}
