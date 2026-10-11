import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Jost } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-serif" });
const script = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-script" });
const sans = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Zayn & Nora — Wedding Invitation",
  description: "You are invited to celebrate our wedding.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#8aa070" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${script.variable} ${sans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
