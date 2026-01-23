"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { GameStats, LogEntry } from "@/lib/simulator/types";
import { useLanguage } from "@/context/LanguageContext";

interface GenericEndingProps {
    currentPhaseId: string;
    stats: GameStats;
    logEntries: LogEntry[];
    allies: string[];
    onExit: () => void;
}

export function GenericEnding({ currentPhaseId, stats, logEntries, allies, onExit }: GenericEndingProps) {
    const { t } = useLanguage();

    return (
        <div className="fixed inset-0 z-[100] bg-slate-950 text-white flex items-center justify-center p-4 overflow-y-auto no-scrollbar">
            <Card className="max-w-2xl w-full bg-slate-900 border-white/10 p-8 md:p-12 text-center space-y-8 shadow-2xl relative">
                <div className="text-6xl mb-4 animate-in zoom-in duration-700">
                    {currentPhaseId === 'END_C' ? '🛡️' : '💔'}
                </div>

                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                    {currentPhaseId === 'END_A' && t('game.endings.generic.exhaustion')}
                    {currentPhaseId === 'END_B' && t('game.endings.generic.resignation')}
                    {currentPhaseId === 'END_C' && t('game.endings.generic.survival')}
                </h1>

                <div className="prose prose-invert prose-lg mx-auto text-slate-300">
                    {currentPhaseId === 'END_A' && (
                        <p>{t('game.endings.generic.exhaustion_desc')}</p>
                    )}
                    {currentPhaseId === 'END_B' && (
                        <p>{t('game.endings.generic.resignation_desc')}</p>
                    )}
                    {currentPhaseId === 'END_C' && (
                        <p>{t('game.endings.generic.survival_desc')}</p>
                    )}
                </div>

                <div className="bg-white/5 p-6 rounded-2xl text-left space-y-2 border border-white/5 backdrop-blur-sm shadow-inner">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-4 flex items-center gap-2">
                        <FileText className="w-4 h-4" /> {t('game.endings.generic.stats_title')}
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">{t('game.endings.generic.log_count')}</div>
                            <div className="text-4xl font-black text-white">{logEntries.length}<span className="text-lg text-slate-700 ml-2">kpl</span></div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">{t('game.endings.generic.ally_count')}</div>
                            <div className="text-4xl font-black text-white">{allies.length}</div>
                        </div>
                        <div>
                            <div className="text-xs text-emerald-500 uppercase font-bold tracking-widest mb-1">{t('game.endings.generic.performance')}</div>
                            <div className="text-4xl font-black text-white">
                                {Math.round((stats.selfEsteem * 0.4) + (stats.hope * 0.4) + (stats.teamAcceptance * 0.2))}
                                <span className="text-lg text-slate-700 ml-1">/100</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <Button size="lg" variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-white h-12 rounded-full px-8 font-bold" onClick={onExit}>
                        {t('game.endings.generic.return_home')}
                    </Button>
                    <Button size="lg" variant="outline" className="border-white/10 text-slate-400 hover:bg-white/5 h-12 rounded-full px-8" onClick={() => window.location.reload()}>
                        {t('game.try_again')}
                    </Button>
                </div>
            </Card>
        </div>
    );
}
