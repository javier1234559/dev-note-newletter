import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/layout/provider";

export const metadata: Metadata = {
  title: "Dev note Newsletter",
  icons: {
    icon: "/icons/logo.svg",
  },
  description: "A newsletter for developers to share new tools and resources.",
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
