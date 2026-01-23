"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface YouthEndingProps {
    currentPhaseId: string;
    onExit: () => void;
}

export function YouthEnding({ currentPhaseId, onExit }: YouthEndingProps) {
    const { t } = useLanguage();
    const isGrowth = currentPhaseId === 'END_GROWTH';
    const isBurnout = currentPhaseId === 'END_BURNOUT';

    return (
        <div className="fixed inset-0 z-[100] bg-slate-50 text-slate-900 flex items-center justify-center p-4 overflow-y-auto no-scrollbar">
            <Card className="max-w-2xl w-full border-0 shadow-2xl overflow-hidden bg-white relative">
                <div className={cn("h-3 w-full", isGrowth ? "bg-emerald-500" : "bg-rose-500")} />

                <div className="p-8 md:p-12 text-center space-y-8">
                    <div className="text-6xl mb-4 animate-in zoom-in duration-500">
                        {isGrowth ? '🌱' : '📉'}
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                        {isGrowth ? t('game.endings.youth.agency_restored') : (isBurnout ? t('game.endings.youth.result_burnout') : t('game.endings.youth.result_label'))}
                    </h1>

                    <div className="prose prose-slate prose-lg mx-auto text-slate-600 leading-relaxed">
                        {isGrowth && (
                            <p dangerouslySetInnerHTML={{ __html: t('game.endings.youth.growth_desc') }} />
                        )}
                        {isBurnout && (
                            <p>{t('game.endings.youth.burnout_desc')}</p>
                        )}
                        {!isGrowth && !isBurnout && (
                            <p>{t('game.endings.youth.emotional_desc')}</p>
                        )}
                    </div>

                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-left">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                            <Brain className="w-4 h-4" />
                            {t('game.endings.youth.learning_exp')}
                        </h3>
                        <div className="space-y-3 text-sm text-slate-700">
                            <p>✅ <strong>{t('game.endings.youth.key_learning')}:</strong> {t('game.endings.youth.key_learning_text')}</p>
                            <p>🛡️ <strong>{t('game.endings.youth.protection')}:</strong> {t('game.endings.youth.protection_text')}</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white h-12 rounded-full px-8" onClick={onExit}>
                            {t('game.endings.youth.return_youth')}
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 rounded-full px-8" onClick={() => window.location.reload()}>
                            {t('game.endings.youth.try_another')}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
