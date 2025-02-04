// import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
// import { ThemeProvider } from "@/components/theme-provider"
// import { ModeToggle } from "@/components/mode-toggle"
import type React from "react"; // Added import for React
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Event Registration Portal",
  description: "Register and manage attendees for your events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <main>{children}</main>
          <Toaster position="top-center" />
        </div>
        er
      </body>
    </html>
  );
}
