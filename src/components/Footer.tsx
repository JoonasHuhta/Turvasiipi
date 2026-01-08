"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="w-full border-t border-slate-100 bg-white/30">
            <div className="max-w-6xl mx-auto p-8 text-center text-sm text-muted-foreground space-y-3">
                <p className="font-medium text-slate-600">{t('footer.copyright')}</p>
                <div className="flex justify-center gap-6">
                    <Link href="/tuki" className="hover:text-indigo-600 hover:underline transition-colors font-medium">
                        {t('footer.support')}
                    </Link>
                    <Link href="/tietosuoja" className="hover:text-indigo-600 hover:underline transition-colors font-medium">
                        {t('footer.privacy')}
                    </Link>
                </div>
            </div>
        </footer>
    );
}
