import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Web3Provider from "../components/Web3Provider";

const inter = Inter({ subsets: ["latin"] });

// The Google-Tier Metadata Configuration
export const metadata: Metadata = {
  // CRITICAL FIX: Next.js needs the absolute URL to resolve the Twitter image
  metadataBase: new URL(
    process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : 'https://lithos.vercel.app' // Update this to your actual Vercel URL later
  ),
  title: "Lithos.eth | Architect of the Future Internet",
  description: "Web3 Systems Architect specializing in EVM smart contracts, Trusted Execution Environments (TEEs), and immutable protocol design.",
  openGraph: {
    title: "Lithos.eth | Architect of the Future Internet",
    description: "Web3 Systems Architect specializing in EVM smart contracts and TEEs.",
    url: "/",
    siteName: "Lithos.eth Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Make sure this image is actually in your public/ folder!
        width: 1200,
        height: 630,
        alt: "Lithos.eth System Architecture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lithos.eth | Architect of the Future Internet",
    description: "Web3 Systems Architect specializing in EVM smart contracts and TEEs.",
    creator: "@Lithos_eth",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}