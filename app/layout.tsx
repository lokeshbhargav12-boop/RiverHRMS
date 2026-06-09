import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://river-hrms.com"),
  title: "RIVER HRMS | AI Hiring Operating System",
  description:
    "RIVER HRMS by Neyvin Technologies combines AI resume analysis, ATS scoring, job matching, interview generation, subscriptions, RBAC, and voice-assisted HR workflows.",
  openGraph: {
    title: "RIVER HRMS",
    description: "AI-native hiring and HRMS operating system for growing teams and enterprises.",
    images: ["/logo_HR.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable}`}>{children}</body>
    </html>
  );
}
