import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { AccountProvider } from "@/components/AccountToggle";

const roboto = Roboto({ variable: "--font-roboto", subsets: ["latin"], weight: ["300", "400", "500", "700", "900"] });

export const metadata: Metadata = {
  title: "Master Mac Food",
  description: "Your one-stop online grocery store.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-sans antialiased`} suppressHydrationWarning>
        <CartProvider>
          <AccountProvider>
            {children}
          </AccountProvider>
        </CartProvider>
      </body>
    </html>
  );
}