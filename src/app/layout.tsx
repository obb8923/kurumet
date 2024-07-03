import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GNB from "../components/GNB";
import Footer from "../components/Footer";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "kurumet",
  description: "kurumet main page",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <body className="min-h-screen flex flex-col justify-between">
        <GNB />
        {children}
        <Footer />
      </body>
    </html>
  );
}
