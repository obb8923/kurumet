import type { Metadata } from "next";
import "./globals.css";
import GNB from "../components/GNB";
import Footer from "../components/Footer";
export const viewport = {
  width: 'device-width',
  initialScale: 1
};
export const metadata: Metadata = {
  title: "kurumet",
  description: "kurumet main page",
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "icon", url: "/icons/kurumet-logo-192.png", sizes: "192x192" }
  ],
  manifest: "/manifest.json",

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
