import type { Metadata, Viewport } from "next";
import { Satisfy, Cormorant_Garamond, Great_Vibes, Jost } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-serif" });
const script = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-script" });
const display = Satisfy({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const sans = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Saikiran & Asha - Wedding Invitation",
  description: "You are invited to celebrate our wedding.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#fff7ea" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${script.variable} ${sans.variable} ${display.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
