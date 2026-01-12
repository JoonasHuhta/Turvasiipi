"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function Footer() {
    const { t } = useLanguage();
    const [showDeveloperInfo, setShowDeveloperInfo] = useState(false);

    return (
        <>
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
                        <button
                            onClick={() => setShowDeveloperInfo(true)}
                            className="hover:text-indigo-600 hover:underline transition-colors font-medium"
                        >
                            Tietoja kehittäjästä
                        </button>
                    </div>
                </div>
            </footer>

            {/* Developer Info Dialog */}
            <Dialog open={showDeveloperInfo} onOpenChange={setShowDeveloperInfo}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="sr-only">Tietoja kehittäjästä</DialogTitle>
                    </DialogHeader>

                    <div className="bg-gradient-to-br from-indigo-50 to-slate-50 p-8 rounded-2xl border border-indigo-100">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                JH
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h2 className="text-xl font-bold text-slate-900">Tietoja sovelluksesta</h2>
                                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-full border border-amber-200">
                                        BETA
                                    </span>
                                </div>
                                <p className="text-slate-600 mb-4">
                                    Turvasiipi on beta-vaiheessa oleva sovellus. Palautetta kaivataan!
                                </p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <span className="font-semibold text-slate-700">Versio:</span> 1.0.0 (Beta)
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <span className="font-semibold text-slate-700">Kehittäjä:</span> Joonas Huhta
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <span className="font-semibold text-slate-700">Palaute:</span>
                                        <a href="mailto:turvasiipi@gmail.fi" className="text-indigo-600 hover:text-indigo-700 font-medium underline">
                                            turvasiipi@gmail.fi
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <span className="font-semibold text-slate-700">LinkedIn:</span>
                                        <a
                                            href="https://www.linkedin.com/in/joonas-huhta-2821a3260/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 hover:text-indigo-700 font-medium underline inline-flex items-center gap-1"
                                        >
                                            Joonas Huhta
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 mt-4 italic">
                                    Tämä sovellus ei kerää dataa. Kaikki tieto pysyy laitteellasi.
                                </p>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
