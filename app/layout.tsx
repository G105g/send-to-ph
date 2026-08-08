import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learn To Transfer | Compare Money Transfers to the Philippines",
  description:
    "Compare fees, exchange rates, and delivery speed for sending money to the Philippines. Wise, Remitly, WorldRemit, Western Union, MoneyGram, and Xoom.",
  openGraph: {
    title: "Learn To Transfer | Compare Money Transfers to the Philippines",
    description:
      "Find the cheapest and fastest way to send money from the USA to the Philippines.",
    url: "https://send-to-ph.vercel.app",
    siteName: "Learn To Transfer",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn To Transfer | Compare Money Transfers to the Philippines",
    description:
      "Find the cheapest and fastest way to send money from the USA to the Philippines.",
  },
  other: {
    "impact-site-verification": "d12f1802-d55a-44f5-9d20-518066f2b074",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#111] text-gray-100">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
