"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText,
    ArrowRight,
    X,
    ShieldCheck,
    EyeOff,
    Zap
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

// --- TYPES ---
type ViewState = 'intro' | 'tactics' | 'stages' | 'reclaim' | 'summary';

interface Tactic {
    phrase: string;
    translation: string;
    tacticName: string;
    description: string;
}

interface StageItem {
    name: string;
    text: string;
}

interface ReclaimItem {
    title: string;
    text: string;
}

// --- COMPONENT ---
export default function GaslightingMechanisms({
    moduleId,
    onComplete,
    onExit
}: {
    moduleId?: string;
    onComplete: (score: number) => void;
    onExit: () => void;
}) {
    const { t } = useLanguage();
    const [view, setView] = useState<ViewState>('intro');
    const [activeTactic, setActiveTactic] = useState<number | null>(null);

    const finishModule = () => {
        onComplete(100);
    };

    const tactics = t('training.gaslighting_mechanisms.tactics.items', { returnObjects: true }) as Tactic[];
    const stages = t('training.gaslighting_mechanisms.stages.items', { returnObjects: true }) as StageItem[];
    const reclaimItems = t('training.gaslighting_mechanisms.reclaim.items', { returnObjects: true }) as ReclaimItem[];

    return (
        <div className="relative min-h-[600px] w-full bg-[#FAFAF9] rounded-[2rem] p-4 md:p-8 flex flex-col gap-6 border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C]">

            {/* HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                        <EyeOff className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black uppercase tracking-widest text-[#292524]">{t('training.gaslighting_mechanisms.title')}</h2>
                        <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">{t('training.gaslighting_mechanisms.subtitle')}</span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onExit} className="hover:bg-[#F5F5F4] text-[#78716C]">
                    <X className="w-5 h-5" />
                </Button>
            </div>

            <div className="flex-1 relative flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
                <AnimatePresence mode="wait">

                    {/* INTRO */}
                    {view === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="text-center space-y-8 max-w-2xl"
                        >
                            <h1 className="text-4xl font-serif font-black text-[#292524]">{t('training.gaslighting_mechanisms.intro.title')}</h1>
                            <p
                                className="text-lg text-[#57534E] leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: t('training.gaslighting_mechanisms.intro.text') }}
                            />
                            <Button onClick={() => setView('tactics')} size="lg" className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-8 py-6 text-lg shadow-lg">
                                {t('training.gaslighting_mechanisms.intro.action')} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* TACTICS REVEAL */}
                    {view === 'tactics' && (
                        <motion.div
                            key="tactics"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center">
                                <Badge variant="outline" className="text-amber-600 border-amber-200">{t('training.gaslighting_mechanisms.tactics.badge')}</Badge>
                                <h2 className="text-3xl font-bold mt-2 text-[#292524]">{t('training.gaslighting_mechanisms.tactics.title')}</h2>
                                <p className="text-[#57534E]">{t('training.gaslighting_mechanisms.tactics.subtitle')}</p>
                            </div>

                            <div className="grid gap-4">
                                {tactics.map((tactic, i) => (
                                    <Card
                                        key={i}
                                        onClick={() => setActiveTactic(activeTactic === i ? null : i)}
                                        className={cn(
                                            "p-6 cursor-pointer transition-all border-[#E7E5E4] overflow-hidden",
                                            activeTactic === i ? "ring-2 ring-amber-500 bg-amber-50/30" : "hover:border-amber-200"
                                        )}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-black uppercase text-amber-500 tracking-widest">{t('training.gaslighting_mechanisms.tactics.card_label')}</span>
                                            {activeTactic === i && <Badge className="bg-amber-600 text-white border-0">{tactic.tacticName}</Badge>}
                                        </div>
                                        <div className="text-xl font-medium text-[#292524] italic mb-4">
                                            "{tactic.phrase}"
                                        </div>

                                        <AnimatePresence>
                                            {activeTactic === i && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    className="border-t border-amber-100 pt-4"
                                                >
                                                    <p className="text-[#44403C] font-bold mb-2">💡 Totuus:</p>
                                                    <p className="text-[#57534E] mb-4">{tactic.translation}</p>
                                                    <div className="bg-white p-4 rounded-xl text-sm border border-amber-100 italic text-[#78716C]">
                                                        {tactic.description}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </Card>
                                ))}
                            </div>

                            <Button onClick={() => setView('stages')} className="w-full py-6 bg-[#292524] hover:bg-[#44403C] text-white">
                                {t('training.gaslighting_mechanisms.tactics.action')} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* STAGES OF GASLIGHTING */}
                    {view === 'stages' && (
                        <motion.div
                            key="stages"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full space-y-12"
                        >
                            <div className="text-center space-y-4">
                                <Badge variant="outline" className="text-amber-600 border-amber-200">{t('training.gaslighting_mechanisms.stages.badge')}</Badge>
                                <h2 className="text-3xl font-bold text-[#292524]">{t('training.gaslighting_mechanisms.stages.title')}</h2>
                                <p className="text-[#57534E]">{t('training.gaslighting_mechanisms.stages.subtitle')}</p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 relative">
                                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-amber-100 -translate-y-1/2 hidden md:block" />

                                {stages.map((s, i) => (
                                    <Card key={i} className="relative z-10 p-6 border-[#E7E5E4] bg-white flex flex-col items-center text-center space-y-4">
                                        <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-bold">
                                            {i + 1}
                                        </div>
                                        <h3 className="font-bold text-[#292524]">{s.name}</h3>
                                        <p className="text-xs text-[#78716C]">{s.text}</p>
                                    </Card>
                                ))}
                            </div>

                            <Button onClick={() => setView('reclaim')} className="w-full py-6 bg-amber-600 hover:bg-amber-700 text-white rounded-full">
                                {t('training.gaslighting_mechanisms.stages.action')} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* RECLAIMING REALITY */}
                    {view === 'reclaim' && (
                        <motion.div
                            key="reclaim"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center space-y-4">
                                <Badge variant="outline" className="text-emerald-600 border-emerald-200">{t('training.gaslighting_mechanisms.reclaim.badge')}</Badge>
                                <h2 className="text-3xl font-bold text-[#292524]">{t('training.gaslighting_mechanisms.reclaim.title')}</h2>
                                <p className="text-[#57534E]">{t('training.gaslighting_mechanisms.reclaim.subtitle')}</p>
                            </div>

                            <div className="grid gap-4">
                                {reclaimItems.map((item, i) => (
                                    <Card key={i} className={cn("p-6 border-emerald-100 bg-emerald-50/20 flex gap-4",
                                        i === 2 && "bg-amber-50/20 border-amber-100" // Highlight the last one differently if desired, or keep uniform
                                    )}>
                                        <div className={cn("shrink-0 w-12 h-12 bg-white rounded-xl border flex items-center justify-center",
                                            i === 2 ? "border-amber-100 text-amber-600" : "border-emerald-100 text-emerald-600"
                                        )}>
                                            {i === 0 && <FileText className="w-6 h-6" />}
                                            {i === 1 && <ShieldCheck className="w-6 h-6" />}
                                            {i === 2 && <Zap className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#292524]">{item.title}</h4>
                                            <p className="text-sm text-[#78716C]">{item.text}</p>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            <Button onClick={() => setView('summary')} className="w-full py-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg">
                                {t('training.gaslighting_mechanisms.reclaim.action')} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* SUMMARY */}
                    {view === 'summary' && (
                        <motion.div
                            key="summary"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center space-y-12 max-w-xl"
                        >
                            <div className="w-24 h-24 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-amber-50/50">
                                <ShieldCheck className="w-12 h-12" />
                            </div>
                            <div className="space-y-4">
                                <h1 className="text-4xl font-serif font-black text-[#292524]">{t('training.gaslighting_mechanisms.summary.title')}</h1>
                                <p className="text-lg text-[#57534E]">
                                    {t('training.gaslighting_mechanisms.summary.text')}
                                </p>
                            </div>

                            <Button onClick={finishModule} size="lg" className="bg-[#292524] hover:bg-[#44403C] text-white rounded-2xl px-12 py-8 text-xl shadow-xl">
                                {t('training.gaslighting_mechanisms.summary.action')}
                            </Button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
