import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Ridge Racer: Wild Trails",
  description: "2D physics hill climbing game. Upgrade vehicles, conquer maps, race wild trails.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ridge Racer",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0a12",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#0a0a12] text-white antialiased">
        {children}
        <Navigation />
      </body>
    </html>
  );
}
