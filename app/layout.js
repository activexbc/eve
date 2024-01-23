import { BreadCrumbs, Navbar } from "@/components";
import { Inter } from "next/font/google";
import GlobalProvider from "./GlobalProvider";
import "./globals.css";
import Head from "./head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>
        <GlobalProvider>
          <Navbar />
          <BreadCrumbs />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
