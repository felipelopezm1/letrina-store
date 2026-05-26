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
  title: {
    default: "Letrina Dumping Ground",
    template: "%s | Letrina Dumping Ground",
  },
  description:
    "One-time software drops by Felipe Lopez Mantilla. Pay once, keep a purchase ID, download up to five times.",
  metadataBase: new URL("https://letrina-store.vercel.app"),
  applicationName: "Letrina Dumping Ground",
  authors: [{ name: "Felipe Lopez Mantilla", url: "https://portfolio-felipe-lopez.vercel.app/" }],
  creator: "Felipe Lopez Mantilla",
  publisher: "Felipe Lopez Mantilla",
  keywords: ["software", "digital products", "pay what you want", "Felipe Lopez Mantilla"],
  openGraph: {
    title: "Letrina Dumping Ground",
    description:
      "A dark little shop for Felipe's software drops. No accounts. One-time purchase IDs. Five downloads.",
    url: "https://letrina-store.vercel.app",
    siteName: "Letrina Dumping Ground",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Pixel-art latrine logo for Letrina Dumping Ground",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Letrina Dumping Ground",
    description:
      "One-time software drops by Felipe Lopez Mantilla. Pay once, keep a purchase ID, download up to five times.",
    images: ["/twitter-image"],
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
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
