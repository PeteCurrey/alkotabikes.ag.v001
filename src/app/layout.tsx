import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "ALKOTA | Performance Engineering",
  description:
    "Performance mountain bikes shaped by precision engineering, real terrain and an obsession with the details that change the ride.",
  keywords: [
    "ALKOTA",
    "ALKOTA Performance Engineering",
    "Mountain Bike Engineering",
    "Project 01",
    "Chassis Development",
    "Kinematics",
  ],
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "ALKOTA | Performance Engineering",
    description:
      "Performance mountain bikes shaped by precision engineering, real terrain and an obsession with the details that change the ride.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ALKOTA Project 01 Glacier White in Alpine Showroom",
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
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
