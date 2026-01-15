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
            <footer className="bg-[#F0EEE6] border-t border-[#E8DDD0] py-24 px-8 text-center space-y-12 mt-auto">
                <div className="space-y-4 max-w-lg mx-auto">
                    <p className="text-[12px] font-medium text-[#4A4A4A]">Turvasiipi ei korvaa työterveyttä tai oikeudellista neuvontaa.</p>
                    <p className="text-[12px] font-medium text-[#4A4A4A]">Tämä ei ole kriisipalvelu.</p>
                </div>

                <div className="inline-block text-left bg-white p-6 border border-[#E8DDD0] rounded-sm shadow-sm">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#5B4B8A] mb-4">Jos olet välittömässä vaarassa, hae apua heti:</p>
                    <ul className="space-y-2 text-[12px] font-mono text-[#4A4A4A]">
                        <li>• Hätänumero: 112</li>
                        <li>• Kriisipuhelin: 09 2525 0111</li>
                        <li>• Mieli ry: mieli.fi</li>
                    </ul>
                </div>

                <div className="pt-12 border-t border-[#E8DDD0]/50 max-w-xs mx-auto">
                    <button
                        onClick={() => setShowDeveloperInfo(true)}
                        className="text-[10px] font-mono uppercase tracking-widest text-[#4A4A4A]/50 hover:text-[#5B4B8A] transition-colors"
                    >
                        Tietoja kehittäjästä
                    </button>
                </div>
            </footer>

            {/* Developer Info Dialog */}
            <Dialog open={showDeveloperInfo} onOpenChange={setShowDeveloperInfo}>
                <DialogContent className="max-w-2xl bg-[#FDFBF7] border-[#E8DDD0]">
                    <DialogHeader>
                        <DialogTitle className="sr-only">Tietoja kehittäjästä</DialogTitle>
                    </DialogHeader>

                    <div className="bg-white p-8 rounded-sm border border-[#E8DDD0]">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#5B4B8A] rounded-sm flex items-center justify-center text-white font-bold text-xl flex-shrink-0 font-serif">
                                JH
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h2 className="text-xl font-bold text-[#2B2B2B] font-serif">Tietoja sovelluksesta</h2>
                                    <span className="px-2 py-0.5 bg-[#FDFBF7] text-[#5B4B8A] text-xs font-bold rounded-sm border border-[#E8DDD0]">
                                        BETA
                                    </span>
                                </div>
                                <p className="text-[#4A4A4A] mb-4 text-sm leading-relaxed">
                                    Turvasiipi on beta-vaiheessa oleva sovellus. Palautetta kaivataan!
                                </p>
                                <div className="space-y-2 text-sm text-[#4A4A4A] font-mono">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-[#2B2B2B]">Versio:</span> 1.0.0 (Beta)
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-[#2B2B2B]">Kehittäjä:</span> Joonas Huhta
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-[#2B2B2B]">Palaute:</span>
                                        <a href="mailto:turvasiipi@gmail.fi" className="text-[#5B4B8A] hover:underline">
                                            turvasiipi@gmail.fi
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-[#2B2B2B]">LinkedIn:</span>
                                        <a
                                            href="https://www.linkedin.com/in/joonas-huhta-2821a3260/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#5B4B8A] hover:underline flex items-center gap-1"
                                        >
                                            Joonas Huhta
                                        </a>
                                    </div>
                                </div>
                                <p className="text-xs text-[#4A4A4A]/70 mt-4 italic font-serif">
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
