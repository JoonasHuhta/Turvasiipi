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
        <div className="min-h-screen bg-background flex flex-col items-stretch overflow-x-hidden">
          <header className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex justify-between items-center">
              <Link href="/" className="flex items-center gap-3 group transition-all">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Image src="/logo.png" alt="Turvasiipi Logo" width={48} height={48} className="w-12 h-12 object-contain relative z-10" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Turvasiipi</h1>
              </Link>
              <Navigation />
            </div>
          </header>

          <main className="w-full flex-1">
            {children}
          </main>

          <footer className="w-full border-t border-slate-100 bg-white/30">
            <div className="max-w-6xl mx-auto p-8 text-center text-sm text-muted-foreground space-y-3">
              <p className="font-medium text-slate-600">© 2025 Turvasiipi. Turvallinen ja luottamuksellinen.</p>
              <div className="flex justify-center gap-6">
                <Link href="/tuki" className="hover:text-indigo-600 hover:underline transition-colors font-medium">
                  Tuki ja yhteystiedot
                </Link>
                <Link href="/tietosuoja" className="hover:text-indigo-600 hover:underline transition-colors font-medium">
                  Tietosuoja
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
