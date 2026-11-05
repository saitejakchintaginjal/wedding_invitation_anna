import type { Metadata, Viewport } from "next";
import {
  Satisfy,
  Cormorant_Garamond,
  Great_Vibes,
  Jost,
} from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});
const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});
const display = Satisfy({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});
const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

// The picture/title/description WhatsApp, Facebook and others show when the link is shared. The cover picture comes from
// app/opengraph-image.jpg and app/twitter-image.jpg. metadataBase makes its address absolute, so it must be the address
// people actually share. Netlify's own URL variable points at a different site name (saikiranashaweddinginvitation), whose
// image address 404s, so the address is fixed here; set NEXT_PUBLIC_SITE_URL to override it (e.g. for a custom domain).
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://saikiran-weds-asha.netlify.app";
const title = "SaiKiran weds Asha - Wedding Invitation";
const description =
  "With the blessings of our elders, we invite you to the wedding of SaiKiran & Asha.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    type: "website",
    siteName: "SaiKiran weds Asha",
    locale: "en_IN",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff7ea",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${serif.variable} ${script.variable} ${sans.variable} ${display.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
