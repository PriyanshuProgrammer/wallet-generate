import type { Metadata } from "next";
import { Toaster } from "../components/ui/sonner";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solana Wallet Generator",
  description: "Web based wallet generator fo solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-screen h-screen bg-zinc-900">
          <div className="w-[90%] relative md:w-[60%] flex flex-col h-screen bg-zinc-900 mx-auto">
            {children}
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
