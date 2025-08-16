import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/layout/provider";
import Script from 'next/script'

export const metadata: Metadata = {
  title: "Social Media Dashboard",
  description: "Curated posts from TikTok, Instagram, and Facebook",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
