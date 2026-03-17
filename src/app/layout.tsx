import type { Metadata } from "next";
import { syne, spaceMono, dmSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Peek Projects — AI Agents That Run Real Businesses",
  description:
    "Isaiah Peek deploys autonomous AI agent systems in regulated, high-stakes environments. Voice AI, case intelligence, workflow automation — in production, today.",
  openGraph: {
    title: "Peek Projects",
    description: "AI agents that run real businesses.",
    url: "https://peek.consulting",
    siteName: "Peek Projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peek Projects",
    description: "AI agents that run real businesses.",
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
      className={`${syne.variable} ${spaceMono.variable} ${dmSans.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
