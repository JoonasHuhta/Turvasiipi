import React from "react";
import { Phase } from "@/lib/simulator/types";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { MapPin, Clock, Briefcase, User, Brain, AlertTriangle } from "lucide-react";

interface GameRendererProps {
    currentPhase: Phase;
}

export function GameRenderer({ currentPhase }: GameRendererProps) {
    const { t } = useLanguage();

    const getContentTextSize = (length: number, isMobile: boolean) => {
        if (length > 600) return isMobile ? "text-[13px] leading-tight" : "text-sm";
        if (length > 300) return isMobile ? "text-[14px] leading-snug" : "text-base";
        return isMobile ? "text-[16px] leading-normal" : "text-lg";
    };

    const textSizeClass = getContentTextSize(currentPhase.content.length, true);
    const isComplexPhase = currentPhase.content.includes("**Sinun näkökulmasi:**") || currentPhase.content.includes("**Your perspective:**");

    return (
        <div className="min-h-full flex flex-col justify-center p-6 pb-12 transition-all">

            {/* Scene Meta Info */}
            {(currentPhase.time || currentPhase.location) && (
                <div className="flex items-center justify-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 opacity-60">
                    {currentPhase.time && <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {currentPhase.time}</span>}
                    {currentPhase.location && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {currentPhase.location}</span>}
                </div>
            )}

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 text-center leading-[1.1] mb-8 uppercase tracking-tighter">
                {currentPhase.title}
            </h2>

            {/* Content Block */}
            <div className={cn("prose prose-slate max-w-none text-slate-800 text-center mx-auto transition-all", textSizeClass)}>
                {isComplexPhase ? (
                    <div className="space-y-4 text-left">
                        {currentPhase.content.split('\n\n').map((section, idx) => {
                            if (section.includes("**Sinun näkökulmasi:**") || section.includes("**Your perspective:**")) {
                                return (
                                    <div key={idx} className="bg-white/60 backdrop-blur-sm p-5 rounded-3xl border border-white shadow-sm">
                                        <div className="flex items-center gap-2 mb-2 font-black text-slate-900 uppercase tracking-widest text-[10px]">
                                            <Briefcase className="w-3.5 h-3.5 text-indigo-500" /> {t('game.your_perspective')}
                                        </div>
                                        <p className="m-0 text-slate-900 font-medium leading-relaxed">{section.replace(/\*\*Sinun näkökulmasi:\*\*/, "").replace(/\*\*Your perspective:\*\*/, "").trim()}</p>
                                    </div>
                                );
                            }
                            if (section.includes("**Antin näkökulma") || section.includes("Victim's perspective") || section.includes("perspective (Victim's voice):")) {
                                return (
                                    <div key={idx} className="bg-white/40 backdrop-blur-sm p-5 rounded-3xl border-l-4 border-indigo-500 shadow-sm">
                                        <div className="flex items-center gap-2 mb-2 font-black text-indigo-900 uppercase tracking-widest text-[10px]">
                                            <User className="w-3.5 h-3.5 text-indigo-500" /> {t('game.victim_perspective')}
                                        </div>
                                        <p className="italic text-indigo-900 m-0 font-medium leading-relaxed">"{section.replace(/\*\*Antin.+?\*\*:/, "").replace(/\*\*Antin's.+?\*\*:/, "").replace(/\*\*Victim's.+?\*\*:/, "").replace(/"/g, "").trim()}"</p>
                                    </div>
                                );
                            }
                            if (section.includes("**Psykologinen analyysi:**") || section.includes("**Psychological analysis:**")) {
                                return (
                                    <div key={idx} className="bg-emerald-50/50 backdrop-blur-sm p-5 rounded-3xl border-l-4 border-emerald-500 shadow-sm">
                                        <div className="flex items-center gap-2 mb-2 font-black text-emerald-900 uppercase tracking-widest text-[10px]">
                                            <Brain className="w-3.5 h-3.5 text-emerald-500" /> {t('game.psych_analysis')}
                                        </div>
                                        <p className="text-emerald-900 m-0 font-medium leading-relaxed">{section.replace("**Psykologinen analyysi:**", "").replace("**Psychological analysis:**", "").trim()}</p>
                                    </div>
                                );
                            }
                            return <p key={idx} className="mb-4 last:mb-0 leading-relaxed font-medium">{section}</p>;
                        })}
                    </div>
                ) : (
                    // Simple text content
                    <p className="whitespace-pre-line leading-relaxed font-medium text-lg">{currentPhase.content}</p>
                )}

                {currentPhase.isCrisis && (
                    <div className="mt-8 p-4 bg-red-600 text-white rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest animate-pulse shadow-lg shadow-red-500/20">
                        <AlertTriangle className="w-5 h-5 shrink-0" />
                        <span>{t('game.crisis_report')}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
