import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { ProgressProvider } from "@/context/ProgressContext";

import "./globals.css";

export const metadata: Metadata = {
  title: "Turvasiipi - Turvallinen loki ja tuki",
  description: "Työkalu työpaikkakiusaamisen tunnistamiseen, dokumentointiin ja ymmärtämiseen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi">
      <body className="font-serif min-h-screen bg-suojasiipi-bg text-suojasiipi-text-main antialiased selection:bg-suojasiipi-secondary selection:text-suojasiipi-text-main" suppressHydrationWarning>
        <LanguageProvider>
          <ProgressProvider>
            <div className="flex flex-col min-h-screen">

              {/* Global Header (Warm Document Style) */}
              <header className="fixed top-0 w-full z-50 bg-suojasiipi-bg/95 backdrop-blur-md border-b border-suojasiipi-secondary">
                <div className="max-w-screen-xl mx-auto px-6 h-20 flex items-center justify-between">

                  {/* Brand */}
                  <div className="flex items-center gap-4">
                    <Link href="/" className="text-sm font-bold tracking-tight text-suojasiipi-text-main hover:text-suojasiipi-primary transition-colors">
                      TURVASIIPI
                    </Link>
                    <span className="inline-block text-[11px] font-mono text-suojasiipi-text-body bg-white px-2 py-0.5 border border-suojasiipi-secondary rounded-sm">
                      BETA
                    </span>
                  </div>

                  {/* Navigation (Desktop Links + Mobile Trigger) */}
                  <Navigation />
                </div>
              </header>

              <main className="flex-1 w-full pt-20">
                {children}
              </main>

              <Footer />
            </div>
          </ProgressProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
