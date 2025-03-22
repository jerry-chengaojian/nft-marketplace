import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/RainbowKitProviders";
import { Navbar } from './components/Navbar';
import { NotificationProvider } from '@/components/ui/notification-provider'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NFT Marketplace DApp",
  description: "A decentralized NFT marketplace for creating, buying, and selling digital collectibles using USDT",
  keywords: ["NFT", "marketplace", "blockchain", "ethereum", "web3", "digital collectibles", "crypto", "USDT"],
  authors: [{ name: "NFT Marketplace Team" }],
  openGraph: {
    title: "NFT Marketplace DApp",
    description: "Create, buy, and sell NFTs on our decentralized marketplace",
    type: "website",
    siteName: "NFT Marketplace DApp",
  },
  twitter: {
    card: "summary_large_image",
    title: "NFT Marketplace DApp",
    description: "Create, buy, and sell NFTs on our decentralized marketplace",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased container mx-auto`}
      >
        <NotificationProvider>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </NotificationProvider>
      </body>
    </html>
  );
}
