"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ManagerEndingProps {
    onExit: () => void;
}

export function ManagerEnding({ onExit }: ManagerEndingProps) {
    const { t } = useLanguage();

    return (
        <div className="fixed inset-0 z-[100] bg-slate-950 text-white flex items-center justify-center p-4 overflow-y-auto no-scrollbar">
            <Card className="max-w-3xl w-full bg-slate-900 border-red-900/30 p-6 md:p-12 text-center space-y-6 shadow-2xl shadow-red-900/10 relative">
                <div className="text-6xl mb-4 grayscale opacity-50">
                    📉
                </div>

                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                    {t('game.endings.manager.title')}
                </h1>

                <div className="prose prose-invert prose-lg mx-auto text-slate-400">
                    <p>
                        {t('game.endings.manager.desc')}
                    </p>
                </div>

                <div className="bg-red-950/30 p-4 md:p-6 rounded-xl text-left space-y-6 border border-red-900/30">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        {t('game.endings.manager.anatomy_title')}
                    </h3>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Inhimillinen */}
                        <div className="space-y-2">
                            <div className="text-xs text-red-300/60 uppercase font-semibold">{t('game.endings.manager.human_crash')}</div>
                            <div className="text-lg font-medium text-red-200">{t('game.endings.manager.burnout_severe')}</div>
                            <p className="text-xs text-red-300/70 leading-relaxed">
                                {t('game.endings.manager.human_desc')}
                            </p>
                        </div>

                        {/* Taloudellinen */}
                        <div className="space-y-2">
                            <div className="text-xs text-red-300/60 uppercase font-semibold">{t('game.endings.manager.financial_hit')}</div>
                            <div className="text-2xl font-mono text-white">~112 000 €</div>
                            <div className="text-xs text-slate-500 space-y-1 bg-black/20 p-2 rounded">
                                <div className="flex justify-between"><span>{t('game.endings.manager.sick_leave')}:</span> <span className="text-slate-400">35 000€</span></div>
                                <div className="flex justify-between"><span>{t('game.endings.manager.recruitment')}:</span> <span className="text-slate-400">25 000€</span></div>
                                <div className="flex justify-between"><span>{t('game.endings.manager.productivity_loss')}:</span> <span className="text-slate-400">52 000€</span></div>
                            </div>
                        </div>

                        {/* Mainehaitta */}
                        <div className="space-y-2">
                            <div className="text-xs text-red-300/60 uppercase font-semibold">{t('game.endings.manager.reputation_hit')}</div>
                            <div className="text-lg font-medium text-red-200">{t('game.endings.manager.reputation_damage')}</div>
                            <p className="text-xs text-red-300/70 leading-relaxed">
                                {t('game.endings.manager.reputation_desc')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <Button size="lg" variant="default" className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 h-12 rounded-full px-8" onClick={onExit}>
                        {t('game.endings.generic.return_home')}
                    </Button>
                    <Button size="lg" variant="outline" className="border-red-900/30 text-red-400 hover:bg-red-950/30 hover:text-red-300 h-12 rounded-full px-8" onClick={() => window.location.reload()}>
                        {t('game.try_again')}
                    </Button>
                </div>
            </Card>
        </div>
    );
}
