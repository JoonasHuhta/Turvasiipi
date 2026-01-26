import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GameStats } from "@/lib/simulator/types";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { Brain, Users, Heart, ArrowRight } from "lucide-react";

interface StatLabel {
    label: string;
    description: string;
}

interface GameHeaderProps {
    day: number;
    stats: GameStats;
    onExit: () => void;
    statLabels?: Partial<Record<keyof GameStats, StatLabel>>;
}

export function GameHeader({ day, stats, onExit, statLabels }: GameHeaderProps) {
    const { t } = useLanguage();
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    const getStatConfig = () => {
        const baseConfig = [
            { id: 'selfEsteem', label: t('game.stats.self_esteem'), icon: Brain, color: 'bg-indigo-500', description: t('game.stat_descriptions.self_esteem') },
            { id: 'teamAcceptance', label: t('game.stats.team_acceptance'), icon: Users, color: 'bg-cyan-500', description: t('game.stat_descriptions.team_acceptance') },
            { id: 'physicalHealth', label: t('game.stats.physical_health'), icon: Heart, color: 'bg-rose-500', description: t('game.stat_descriptions.physical_health') },
            { id: 'hope', label: t('game.stats.hope'), icon: ArrowRight, color: 'bg-emerald-500', description: t('game.stat_descriptions.hope') }
        ];

        if (!statLabels) return baseConfig;

        return baseConfig.map(stat => {
            const override = statLabels[stat.id as keyof GameStats];
            if (override) {
                return { ...stat, label: override.label, description: override.description };
            }
            return stat;
        });
    };

    const config = getStatConfig();

    return (
        <>
            <header className="shrink-0 h-16 bg-white/70 backdrop-blur-xl border-b border-white/20 px-4 flex items-center justify-between z-30 shadow-sm relative select-none">
                <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 tracking-tighter text-lg uppercase">{t('nav.simulation')}</span>
                    <div className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {t('game.day')} {day}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Compact Stat Bars */}
                    <div
                        className="flex gap-2.5 cursor-pointer active:scale-95 transition-transform p-1.5 rounded-xl hover:bg-white/50"
                        onClick={() => setIsHelpOpen(true)}
                    >
                        {config.map(stat => (
                            <MiniStatBar key={stat.id} icon={stat.icon} value={stats[stat.id as keyof GameStats]} color={stat.color} />
                        ))}
                    </div>

                    <Button variant="ghost" size="icon" onClick={onExit} className="text-slate-400 hover:text-red-500 w-8 h-8 transition-colors">
                        <span className="sr-only">{t('game.quit')}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </Button>
                </div>
            </header>

            {/* HELP MODAL */}
            {isHelpOpen && (
                <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setIsHelpOpen(false)}>
                    <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
                        <div className="bg-slate-50 border-b p-6">
                            <h3 className="font-black text-slate-900 uppercase tracking-tight">{t('game.resources')}</h3>
                        </div>
                        <div className="p-6 space-y-5">
                            {config.map(stat => (
                                <div key={stat.id} className="flex items-center gap-4">
                                    <div className={cn("p-3 rounded-xl", stat.color.replace('bg-', 'text-').replace('500', '600'), stat.color.replace('bg-', 'bg-').replace('500', '100'))}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="font-black text-sm text-slate-900 uppercase tracking-tight">{stat.label}</div>
                                        <div className="text-xs text-slate-500 leading-relaxed font-medium">{stat.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-slate-50 border-t">
                            <Button onClick={() => setIsHelpOpen(false)} className="w-full h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-xs">{t('game.continue')}</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function MiniStatBar({ icon: Icon, value, color }: any) {
    return (
        <div className="flex flex-col gap-0.5 items-center justify-center w-8 group relative">
            <Icon className="w-3 h-3 text-slate-400 mb-0.5" />
            <div className="relative w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                    className={cn("absolute inset-y-0 left-0 transition-all duration-500", color)}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}
