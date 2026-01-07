import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/Navigation";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Turvasiipi - Turvallinen tuki työpaikkakiusaamiseen",
  description: "Työkalu työpaikkakiusaamisen tunnistamiseen ja dokumentointiin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi">
      <body className={inter.className} suppressHydrationWarning>
        <div className="min-h-screen bg-background flex flex-col items-center overflow-x-hidden">
          <header className="w-full max-w-4xl p-4 sm:p-6 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-50 rounded-b-xl mb-4 border-b border-white/20">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="Turvasiipi Logo" width={48} height={48} className="w-12 h-12 object-contain" />
              <h1 className="text-2xl font-semibold text-primary tracking-tight hover:opacity-80 transition-opacity">Turvasiipi</h1>
            </Link>
            <Navigation />
          </header>
          <main className="w-full max-w-4xl p-6 flex-1">
            {children}
          </main>

          <footer className="w-full p-6 text-center text-sm text-muted-foreground space-y-2">
            <p>© 2025 Turvasiipi. Turvallinen ja luottamuksellinen.</p>
            <Link href="/tuki" className="inline-block hover:text-indigo-600 hover:underline transition-colors text-xs font-medium">
              Tuki, tietosuoja ja yhteystiedot
            </Link>
          </footer>
        </div>
      </body>
    </html>
  );
}
