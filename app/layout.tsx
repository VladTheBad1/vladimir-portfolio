import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Vladimir Proskurov - Serial Innovator Command Center",
  description: "Executive platform showcasing multi-venture portfolio and AI-powered company creation. Creating tomorrow's companies today.",
  keywords: ["serial entrepreneur", "AI ventures", "startup portfolio", "innovation", "Vladimir Proskurov"],
  authors: [{ name: "Vladimir Proskurov" }],
  openGraph: {
    title: "Vladimir Proskurov - Serial Innovator",
    description: "Where vision meets velocity. Creating tomorrow's companies today.",
    type: "website",
    locale: "en_US",
    url: "https://vladimirproskurov.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vladimir Proskurov - Serial Innovator",
    description: "Executive platform showcasing multi-venture portfolio and AI-powered company creation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-dark-900 text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
