import type { Metadata } from "next";
import "./globals.css";
// import GNB from "../components/GNB";
import GNB2 from "../components/GNB/GNB2";
import Footer from "../components/Footer";
import Script from 'next/script';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  shrinkToFit: 'no',
  viewportFit: 'cover'
};

export const metadata: Metadata = {
  title: "kurumet",
  description: "kurumet main page",
  icons: [
    { rel: "icon", url: "/icons/kurumet-logo-192.png", sizes: "192x192" }
  ],
  manifest: "/manifest.json",
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
    {/* <!-- Google tag (gtag.js) --> */}
    <Script src="https://www.googletagmanager.com/gtag/js?id=G-QKX95L8C6C" />
    <Script id="google-analytics">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-QKX95L8C6C');
      `}
    </Script>
    <html>
      <body className="min-h-screen flex flex-col justify-between">
        {/* 검색 기능과 로그인 기능 구현 전 까지는 GNB2만 보이게 함 */}
        {/* <GNB /> */}
        <GNB2 />
        {children}
        <Footer />
      </body>
    </html>
    </>
  );
}
