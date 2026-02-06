import React from "react"
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "IdeaForge - AI-Powered Idea Validation Platform",
  description:
    "Submit your startup ideas, get AI-powered scoring and feedback, join community upvote threads, build teams, and plan your initial funding roadmap.",
};

export const viewport: Viewport = {
  themeColor: "#8ac056",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
