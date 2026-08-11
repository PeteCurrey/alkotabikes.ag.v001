import type { Metadata } from "next";
import "@/lib/env";
import { siteUrl } from "@/lib/env";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/store/cartContext";
import { CookieConsentProvider } from "@/components/legal/CookieConsentManager";
import OrganizationSchema from "@/components/schema/OrganizationSchema";
import UtmCapture from "@/components/analytics/UtmCapture";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Performance Mountain Bikes | Alkota Cycles",
    template: "%s | Alkota Cycles",
  },
  description:
    "Performance mountain bikes shaped by precision engineering, terrain validation and an obsession with chassis kinematics and ride quality.",
  alternates: {
    canonical: siteUrl,
  },
  robots:
    process.env.ALLOW_INDEXING === "true"
      ? { index: true, follow: true }
      : { index: false, follow: false },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Performance Mountain Bikes | Alkota Cycles",
    description:
      "Performance mountain bikes shaped by precision engineering, terrain validation and an obsession with chassis kinematics and ride quality.",
    url: siteUrl,
    siteName: "Alkota Cycles",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alkota Cycles Performance Mountain Bikes",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-alkota-white text-alkota-black min-h-screen flex flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:p-3 focus:bg-alkota-signal focus:text-alkota-black font-mono text-xs font-bold uppercase tracking-wider shadow-xl"
        >
          Skip to main content
        </a>
        <OrganizationSchema />
        <CookieConsentProvider>
          <CartProvider>
            <UtmCapture />
            <Header />
            <main id="main-content" className="flex-1 w-full">{children}</main>
            <Footer />
          </CartProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}
