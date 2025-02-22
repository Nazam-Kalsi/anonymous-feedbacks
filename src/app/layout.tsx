import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthSessionProvider from "@/context/authSessionProvider";
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/customComponents/toggleTheme";
import { Header } from "@/components/customComponents/header";
import { BackgroundBeams } from "@/components/magicui/background-beams";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthSessionProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <main className="bg min-h-screen">
            <BackgroundBeams className="-z-[99999]"/>
           <Header/>
            {children}
            </main>
          <Toaster />
        </body>
      </AuthSessionProvider>
    </html>
  );
}
