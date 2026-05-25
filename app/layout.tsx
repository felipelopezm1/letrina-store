import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/Footer";
import { GrungeBg } from "@/components/GrungeBg";
import { Nav } from "@/components/Nav";
import { StickerLayer } from "@/components/StickerLayer";
import { ThemeRandomizer } from "@/components/ThemeRandomizer";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Letrina Dumping Ground",
  description: "One-time software drops by Felipe Lopez Mantilla.",
  metadataBase: new URL("https://letrina-store.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${display.variable} ${mono.variable}`} lang="en">
      <body className="min-h-screen bg-ink text-cream antialiased">
        <ThemeRandomizer />
        <GrungeBg />
        <StickerLayer />
        <Nav />
        <main className="relative z-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
