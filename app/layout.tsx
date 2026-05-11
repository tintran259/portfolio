import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tin Tran — Software Engineer",
  description:
    "Software Engineer with 3+ years specializing in large-scale e-commerce platforms and CMS-driven architecture. React, Next.js, TypeScript, React Native.",
  keywords: [
    "Tin Tran", "Software Engineer", "React", "Next.js", "TypeScript",
    "E-Commerce", "CMS", "React Native", "Portfolio", "Ho Chi Minh",
  ],
  authors: [{ name: "Tin Tran", url: "mailto:tintran2591999@gmail.com" }],
  themeColor: "#0d0d0d",
  openGraph: {
    title: "Tin Tran — Software Engineer",
    description:
      "3+ years building large-scale e-commerce platforms & CMS-driven storefronts with React, Next.js, and TypeScript.",
    type: "website",
    locale: "en_US",
    siteName: "Tin Tran Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tin Tran — Software Engineer",
    description:
      "3+ years building large-scale e-commerce platforms & CMS-driven storefronts with React, Next.js, and TypeScript.",
    creator: "@tintran259",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
