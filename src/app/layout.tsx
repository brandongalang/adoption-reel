import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Meridian AI Enablement Hub",
  description: "Fictional internal AI enablement portal (portfolio prototype)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans antialiased bg-background`}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
