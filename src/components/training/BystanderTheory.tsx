"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Eye,
    Brain,
    ArrowRight,
    CheckCircle2,
    HelpCircle,
    X,
    Lock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

// --- TYPES ---
type Stage = 'intro' | 'diffusion' | 'evaluation' | 'ignorance' | 'summary';

// --- COMPONENT ---
export default function BystanderTheory({
    moduleId,
    onComplete,
    onExit
}: {
    moduleId?: string;
    onComplete: (score: number) => void;
    onExit: () => void;
}) {
    const { t } = useLanguage();
    const [stage, setStage] = useState<Stage>('intro');
    const [peopleCount, setPeopleCount] = useState(1);
    const [revealedIgnorance, setRevealedIgnorance] = useState(false);

    const finishModule = () => {
        onComplete(100);
    };

    return (
        <div className="relative min-h-[600px] w-full bg-[#FAFAF9] rounded-[2rem] p-4 md:p-8 flex flex-col gap-6 border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C]">

            {/* HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700">
                        <Brain className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black uppercase tracking-widest text-[#292524]">{t('training.bystander_theory.title')}</h2>
                        <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">{t('training.bystander_theory.subtitle')}</span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onExit} className="hover:bg-[#F5F5F4] text-[#78716C]">
                    <X className="w-5 h-5" />
                </Button>
            </div>

            <div className="flex-1 relative flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
                <AnimatePresence mode="wait">

                    {/* INTRO */}
                    {stage === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="text-center space-y-8 max-w-2xl"
                        >
                            <h1 className="text-4xl font-serif font-black text-[#292524]">{t('training.bystander_theory.intro.title')}</h1>
                            <p
                                className="text-lg text-[#57534E] leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: t('training.bystander_theory.intro.text') }}
                            />
                            <Button onClick={() => setStage('diffusion')} size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-indigo-200/50">
                                {t('training.bystander_theory.intro.action')} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* 1. DIFFUSION OF RESPONSIBILITY */}
                    {stage === 'diffusion' && (
                        <motion.div
                            key="diffusion"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center space-y-2">
                                <Badge variant="secondary" className="bg-indigo-50 text-indigo-700">{t('training.bystander_theory.diffusion.badge')}</Badge>
                                <h2 className="text-3xl font-bold text-[#292524]">{t('training.bystander_theory.diffusion.title')}</h2>
                                <p className="text-[#78716C]">{t('training.bystander_theory.diffusion.subtitle')}</p>
                            </div>

                            <Card className="p-8 bg-white border-[#E7E5E4] shadow-sm">
                                <div className="space-y-8">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-xs uppercase tracking-widest text-[#A8A29E]">{t('training.bystander_theory.diffusion.witnesses_label')}</span>
                                        <span className="font-bold text-2xl text-indigo-600">{peopleCount}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="20"
                                        value={peopleCount}
                                        onChange={(e) => setPeopleCount(Number(e.target.value))}
                                        className="w-full h-2 bg-[#F5F5F4] rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                    />

                                    <div className="flex items-center justify-center gap-2 flex-wrap min-h-[60px]">
                                        {Array.from({ length: Math.min(peopleCount, 12) }).map((_, i) => (
                                            <Users key={i} className={cn("w-8 h-8 transition-colors", i === 0 ? "text-[#292524]" : "text-[#D6D3D1]")} />
                                        ))}
                                        {peopleCount > 12 && <span className="text-[#A8A29E] font-bold">...</span>}
                                    </div>

                                    <div className="bg-[#FAFAF9] p-6 rounded-2xl text-center space-y-2">
                                        <div className="text-sm uppercase tracking-widest text-[#78716C]">{t('training.bystander_theory.diffusion.responsibility_label')}</div>
                                        <div className="text-4xl font-black text-[#292524]">{Math.round(100 / peopleCount)}%</div>
                                        <p className="text-sm text-[#78716C] pt-2">
                                            {t('training.bystander_theory.diffusion.explanation')}
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <div className="flex justify-end">
                                <Button onClick={() => setStage('evaluation')} variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                                    {t('training.bystander_theory.diffusion.action')} <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* 2. EVALUATION APPREHENSION */}
                    {stage === 'evaluation' && (
                        <motion.div
                            key="evaluation"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center space-y-2">
                                <Badge variant="secondary" className="bg-rose-50 text-rose-700">{t('training.bystander_theory.evaluation.badge')}</Badge>
                                <h2 className="text-3xl font-bold text-[#292524]">{t('training.bystander_theory.evaluation.title')}</h2>
                                <p className="text-[#78716C]">{t('training.bystander_theory.evaluation.subtitle')}</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <Card className="p-6 bg-white border-[#E7E5E4] flex flex-col items-center text-center space-y-4 hover:border-indigo-300 transition-colors">
                                    <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600">
                                        <Eye className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-lg text-[#292524]">{t('training.bystander_theory.evaluation.cards.pressure.title')}</h3>
                                    <p className="text-sm text-[#78716C]">
                                        {t('training.bystander_theory.evaluation.cards.pressure.text')}
                                    </p>
                                </Card>
                                <Card className="p-6 bg-white border-[#E7E5E4] flex flex-col items-center text-center space-y-4 hover:border-indigo-300 transition-colors">
                                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                                        <Lock className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-lg text-[#292524]">{t('training.bystander_theory.evaluation.cards.risk.title')}</h3>
                                    <p className="text-sm text-[#78716C]">
                                        {t('training.bystander_theory.evaluation.cards.risk.text')}
                                    </p>
                                </Card>
                            </div>

                            <Card className="bg-indigo-50 border-indigo-100 p-6">
                                <p className="text-indigo-900 font-medium text-center">
                                    {t('training.bystander_theory.evaluation.solution')}
                                </p>
                            </Card>

                            <div className="flex justify-end">
                                <Button onClick={() => setStage('ignorance')} variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                                    {t('training.bystander_theory.evaluation.action')} <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* 3. PLURALISTIC IGNORANCE */}
                    {stage === 'ignorance' && (
                        <motion.div
                            key="ignorance"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center space-y-2">
                                <Badge variant="secondary" className="bg-purple-50 text-purple-700">{t('training.bystander_theory.ignorance.badge')}</Badge>
                                <h2 className="text-3xl font-bold text-[#292524]">{t('training.bystander_theory.ignorance.title')}</h2>
                                <p className="text-[#78716C]">{t('training.bystander_theory.ignorance.subtitle')}</p>
                            </div>

                            <Card
                                onClick={() => setRevealedIgnorance(true)}
                                className={cn(
                                    "relative p-12 bg-[#292524] text-white text-center cursor-pointer overflow-hidden transition-all duration-500 group",
                                    revealedIgnorance ? "bg-white text-[#292524] border-[#E7E5E4]" : "hover:bg-[#44403C]"
                                )}
                            >
                                {!revealedIgnorance ? (
                                    <div className="space-y-4">
                                        <HelpCircle className="w-16 h-16 mx-auto text-[#78716C] group-hover:text-white transition-colors" />
                                        <h3 className="text-2xl font-bold">{t('training.bystander_theory.ignorance.reveal_hidden.title')}</h3>
                                        <p className="text-[#A8A29E]">{t('training.bystander_theory.ignorance.reveal_hidden.hint')}</p>
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex justify-center gap-4 text-4xl mb-4">
                                            😰 😨 😓
                                        </div>
                                        <h3 className="text-2xl font-bold">{t('training.bystander_theory.ignorance.reveal_shown.title')}</h3>
                                        <p className="text-[#57534E]">
                                            {t('training.bystander_theory.ignorance.reveal_shown.text')}
                                        </p>
                                    </motion.div>
                                )}
                            </Card>

                            <div className="flex justify-end">
                                <Button onClick={() => setStage('summary')} variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                                    {t('training.bystander_theory.ignorance.action')} <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* SUMMARY */}
                    {stage === 'summary' && (
                        <motion.div
                            key="summary"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-8 max-w-2xl"
                        >
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>

                            <h2 className="text-3xl font-serif font-bold text-[#292524]">{t('training.bystander_theory.summary.title')}</h2>

                            <div className="grid gap-4 text-left">
                                <div className="bg-white p-4 rounded-xl border border-[#E7E5E4] shadow-sm flex gap-4">
                                    <div className="font-bold text-indigo-600">1.</div>
                                    <div>
                                        <div className="font-bold text-[#292524]">{t('training.bystander_theory.summary.steps.0.title')}</div>
                                        <div className="text-sm text-[#78716C]">{t('training.bystander_theory.summary.steps.0.text')}</div>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-[#E7E5E4] shadow-sm flex gap-4">
                                    <div className="font-bold text-indigo-600">2.</div>
                                    <div>
                                        <div className="font-bold text-[#292524]">{t('training.bystander_theory.summary.steps.1.title')}</div>
                                        <div className="text-sm text-[#78716C]">{t('training.bystander_theory.summary.steps.1.text')}</div>
                                    </div>
                                </div>
                            </div>

                            <Button onClick={finishModule} size="lg" className="bg-[#292524] text-white hover:bg-[#44403C] rounded-full px-8 py-6 w-full sm:w-auto shadow-xl">
                                {t('training.bystander_theory.summary.action')} <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
