import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/seo/structured-data";
import { Navigation } from "@/components/layout/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vladimirproskurov.com"),
  title: {
    default: "Vladimir Proskurov - Serial Innovator & CEO | Building the Future",
    template: "%s | Vladimir Proskurov"
  },
  description: "Serial entrepreneur with 40+ ventures. Building a company a day using AI. CEO managing HealthTech, AI, NanoTech, and consumer ventures. $125M+ portfolio value.",
  keywords: [
    "Vladimir Proskurov",
    "Serial Entrepreneur",
    "CEO",
    "AI Innovation",
    "Venture Building",
    "HealthTech",
    "Investment Opportunities",
    "Startup Founder",
    "Company Builder",
    "ADHD Entrepreneur",
    "Tech Innovation",
    "Portfolio Management"
  ],
  authors: [{ name: "Vladimir Proskurov", url: "https://vladimirproskurov.com" }],
  creator: "Vladimir Proskurov",
  publisher: "Vladimir Proskurov",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Vladimir Proskurov - Serial Innovator & CEO",
    description: "Building the future one company at a time. 40+ ventures, $125M portfolio, leveraging AI to create revolutionary companies.",
    type: "website",
    locale: "en_US",
    url: "https://vladimirproskurov.com",
    siteName: "Vladimir Proskurov",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vladimir Proskurov - Serial Innovator"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vladimir Proskurov - Serial Innovator & CEO",
    description: "Building the future one company at a time. 40+ ventures, $125M portfolio.",
    creator: "@VladTheBad1",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png" }
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://vladimirproskurov.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <div className="min-h-screen">
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}
