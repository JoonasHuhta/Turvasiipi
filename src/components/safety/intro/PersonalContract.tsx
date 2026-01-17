"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Lock, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface PersonalContractProps {
    onLock: () => void;
}

export function PersonalContract({ onLock }: PersonalContractProps) {
    const { t } = useLanguage();
    const [contractText, setContractText] = useState("");
    const [isLocked, setIsLocked] = useState(false);

    const handleLock = () => {
        if (!contractText.trim()) return;

        setIsLocked(true);
        onLock();

        // Fire confetti
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        };

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    return (
        <div className="max-w-2xl mx-auto py-8">
            <div className={`
        relative overflow-hidden rounded-xl border-2 transition-all duration-500
        ${isLocked ? "border-[#5B4B8A] bg-[#FDFBF7]" : "border-[#E8DDD0] bg-white"}
      `}>
                {/* Header */}
                <div className="p-6 border-b border-[#E8DDD0] bg-[#FDFBF7]">
                    <h3 className="font-serif font-bold text-xl text-[#2B2B2B] flex items-center gap-3">
                        {isLocked ? <Lock className="w-5 h-5 text-[#5B4B8A]" /> : <PenToolIcon />}
                        {t("start_here.contract.label")}
                    </h3>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {!isLocked ? (
                        <textarea
                            value={contractText}
                            onChange={(e) => setContractText(e.target.value)}
                            placeholder={t("start_here.contract.placeholder")}
                            className="w-full h-32 p-4 rounded-md border border-[#E8DDD0] bg-white text-[#2B2B2B] placeholder:text-[#4A4A4A]/40 focus:ring-2 focus:ring-[#5B4B8A]/20 focus:border-[#5B4B8A] outline-none resize-none transition-all font-handwriting"
                        />
                    ) : (
                        <div className="p-6 bg-white rounded-md border border-[#E8DDD0] shadow-sm relative">
                            <p className="text-lg font-handwriting text-[#2B2B2B] italic">"{contractText}"</p>
                            <div className="absolute -top-3 -right-3 bg-[#5B4B8A] text-white p-2 rounded-full shadow-md">
                                <Lock className="w-4 h-4" />
                            </div>
                        </div>
                    )}

                    {/* Action */}
                    <div className="flex items-center justify-between">
                        {isLocked ? (
                            <div className="flex items-center gap-2 text-[#5B4B8A] font-medium animate-in slide-in-from-bottom-2">
                                <Sparkles className="w-5 h-5" />
                                <span>{t("start_here.contract.locked_toast")}</span>
                            </div>
                        ) : (
                            <p className="text-sm text-[#4A4A4A]/60">
                                {t("start_here.contract.privacy_note")}
                            </p>
                        )}

                        {!isLocked && (
                            <button
                                onClick={handleLock}
                                disabled={!contractText.trim()}
                                className="px-6 py-2 bg-[#2B2B2B] text-white rounded-md font-medium hover:bg-[#5B4B8A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                            >
                                <Lock className="w-4 h-4" />
                                {t("start_here.contract.lock_button")}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function PenToolIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#4A4A4A]"><path d="m12 19 7-7 3 3-7 7-3-3z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="m2 2 7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>
    )
}
