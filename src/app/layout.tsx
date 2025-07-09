// app/layout.tsx
import { Providers } from "@/components/providers";
import { cn, constructMetadata } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = constructMetadata({});

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const GA_MEASUREMENT_ID = "G-MXXSF7GGEW";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        cookie_flags: 'SameSite=None;Secure',
        debug_mode: true
      });
    `,
          }}
        />
      </head>
      <body className={cn("min-h-screen bg-background antialiased")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
