import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/AppProvider";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import SearchContext from "@/components/SearchContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description: "Created by Olu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <SearchContext>
            <Toaster />
            <Navbar />
            {children}
          </SearchContext>
        </AppProvider>
      </body>
    </html>
  );
}
