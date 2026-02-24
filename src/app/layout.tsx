import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { ProgressProvider } from "@/context/ProgressContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";


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
      <body className="font-serif min-h-screen bg-suojasiipi-bg text-suojasiipi-text-main antialiased selection:bg-suojasiipi-secondary selection:text-suojasiipi-text-main overflow-x-hidden" suppressHydrationWarning>
        <ErrorBoundary>
          <LanguageProvider>
            <ProgressProvider>
              <div className="flex flex-col min-h-screen overflow-x-hidden">

                {/* Global Header (Solid Primary Style) */}
                <header className="fixed top-0 w-full z-50 bg-suojasiipi-primary border-b border-suojasiipi-primary shadow-sm">
                  <div className="max-w-screen-xl mx-auto px-6 h-20 flex items-center justify-between">

                    {/* Brand */}
                    <div className="flex items-center gap-4">
                      <Link href="/" className="text-sm font-bold tracking-tight text-white hover:text-suojasiipi-secondary transition-colors">
                        TURVASIIPI
                      </Link>
                      <span className="inline-block text-[11px] font-mono text-white bg-white/20 px-2 py-0.5 border border-white/30 rounded-sm">
                        BETA
                      </span>
                    </div>

                    {/* Navigation (Desktop Links + Mobile Trigger) */}
                    <Navigation />
                  </div>
                </header>

                <main className="flex-1 w-full pt-20 overflow-x-hidden">
                  {children}
                </main>

                {/* Global SOS Mode - Always available */}


                <Footer />
              </div>
            </ProgressProvider>
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
