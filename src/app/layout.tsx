import type { Metadata } from "next";
import { inter, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "peek.consulting — Systems from working-in-demo to running-in-production",
  description:
    "Senior engineering for founders and teams who need their next product, system, or AI build to actually work — and last.",
  openGraph: {
    title: "peek.consulting",
    description:
      "I take systems from working-in-demo to running-in-production.",
    url: "https://peek.consulting",
    siteName: "peek.consulting",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "peek.consulting",
    description:
      "I take systems from working-in-demo to running-in-production.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
