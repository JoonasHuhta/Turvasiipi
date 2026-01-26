"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Fingerprint,
    CheckCircle2,
    ArrowRight,
    X,
    Eye,
    MessageSquare,
    ClipboardCheck,
    AlertCircle,
    Star
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ViewState = 'intro' | 'scenario' | 'checklist' | 'summary';

// --- COMPONENT ---
export default function EmpathyAudit({
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
    const [scenarioIdx, setScenarioIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [lastChoice, setLastChoice] = useState<'A' | 'B' | null>(null);

    // Get scenarios from translations
    const scenarios = t('training.empathy_audit.scenarios', { returnObjects: true }) as any[];
    // Fallback if not loaded
    const currentScenario = scenarios?.[scenarioIdx] || {
        id: 'missing',
        title: 'Loading...',
        description: '',
        choiceA: '',
        choiceB: '',
        feedbackA: '',
        feedbackB: ''
    };

    // Map icons manually since JSON can't hold components
    const ICONS = [Eye, MessageSquare, ClipboardCheck];

    const handleChoice = (choice: 'A' | 'B') => {
        setLastChoice(choice);
        if (choice === 'A') setScore(prev => prev + 1);
        setShowFeedback(true);
    };

    const nextScenario = () => {
        if (scenarios && scenarioIdx < scenarios.length - 1) {
            setScenarioIdx(prev => prev + 1);
            setShowFeedback(false);
            setLastChoice(null);
        } else {
            setView('checklist');
        }
    };

    // Checklist items
    const checklistItems = t('training.empathy_audit.checklist.items', { returnObjects: true }) as any[];

    return (
        <div className="relative min-h-[600px] w-full bg-[#FAFAF9] rounded-[2rem] p-4 md:p-8 flex flex-col gap-6 border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C]">

            {/* HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
                        <Fingerprint className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black uppercase tracking-widest text-[#292524]">{t('training.empathy_audit.title')}</h2>
                        <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">{t('training.empathy_audit.subtitle')}</span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onExit} className="hover:bg-[#F5F5F4] text-[#78716C]">
                    <X className="w-5 h-5" />
                </Button>
            </div>

            <div className="flex-1 relative flex flex-col items-center justify-center max-w-4xl mx-auto w-full py-4">
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
                            <h1 className="text-4xl font-serif font-black text-[#292524]">{t('training.empathy_audit.intro.title')}</h1>
                            <p className="text-lg text-[#57534E] leading-relaxed" dangerouslySetInnerHTML={{ __html: t('training.empathy_audit.intro.text') }} />
                            <Button onClick={() => setView('scenario')} size="lg" className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-6 text-lg shadow-lg">
                                {t('training.empathy_audit.intro.action')} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* SCENARIOS */}
                    {view === 'scenario' && (
                        <motion.div
                            key="scenario"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center space-y-2">
                                <Badge variant="outline" className="text-purple-600 border-purple-200 uppercase text-[10px] font-black tracking-widest">{t('training.empathy_audit.scenario_count', { current: scenarioIdx + 1, total: 3 })}</Badge>
                                <h3 className="text-2xl font-bold">{currentScenario.title}</h3>
                            </div>

                            <Card className="p-8 bg-white border-[#E7E5E4] shadow-sm space-y-8">
                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                                        {React.createElement(ICONS[scenarioIdx] || Eye, { className: 'w-6 h-6' })}
                                    </div>
                                    <p className="text-lg text-[#44403C] leading-relaxed pt-1">
                                        {currentScenario.description}
                                    </p>
                                </div>

                                {!showFeedback ? (
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <button
                                            onClick={() => handleChoice('A')}
                                            className="p-6 text-left border-2 border-[#E7E5E4] rounded-2xl hover:border-purple-500 hover:bg-purple-50 transition-all group"
                                        >
                                            <h4 className="font-bold text-sm mb-2 group-hover:text-purple-700">{t('training.empathy_audit.option_a')}</h4>
                                            <p className="text-xs text-[#78716C]">{currentScenario.choiceA}</p>
                                        </button>
                                        <button
                                            onClick={() => handleChoice('B')}
                                            className="p-6 text-left border-2 border-[#E7E5E4] rounded-2xl hover:border-purple-500 hover:bg-purple-50 transition-all group"
                                        >
                                            <h4 className="font-bold text-sm mb-2 group-hover:text-purple-700">{t('training.empathy_audit.option_b')}</h4>
                                            <p className="text-xs text-[#78716C]">{currentScenario.choiceB}</p>
                                        </button>
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={cn(
                                            "p-6 rounded-2xl border-l-4 space-y-2",
                                            lastChoice === 'A' ? "bg-emerald-50 border-emerald-500" : "bg-orange-50 border-orange-500"
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            {lastChoice === 'A' ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-orange-600" />}
                                            <h4 className="font-bold text-sm">{lastChoice === 'A' ? t('training.empathy_audit.feedback_good_title') : t('training.empathy_audit.feedback_bad_title')}</h4>
                                        </div>
                                        <p className="text-sm text-[#57534E]">
                                            {lastChoice === 'A' ? currentScenario.feedbackA : currentScenario.feedbackB}
                                        </p>
                                        <Button onClick={nextScenario} variant="ghost" className="mt-4 text-purple-700 font-bold p-0 hover:bg-transparent">
                                            {t('training.empathy_audit.continue')} <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </motion.div>
                                )}
                            </Card>
                        </motion.div>
                    )}

                    {/* CHECKLIST */}
                    {view === 'checklist' && (
                        <motion.div
                            key="checklist"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center space-y-4">
                                <Badge className="bg-purple-100 text-purple-700 border-0">{t('training.empathy_audit.result_badge')}</Badge>
                                <h1 className="text-4xl font-serif font-black text-[#292524]">
                                    {score === 3 ? t('training.empathy_audit.result_perfect') : t('training.empathy_audit.result_improve')}
                                </h1>
                                <p className="text-lg text-[#57534E]">{t('training.empathy_audit.result_score', { score: score, total: 3 })}</p>
                            </div>

                            <Card className="p-8 bg-white border-[#E7E5E4] shadow-sm">
                                <h4 className="text-xs font-black uppercase tracking-widest text-[#A8A29E] mb-6 border-b pb-4">{t('training.empathy_audit.checklist.title')}</h4>
                                <div className="grid gap-6">
                                    {checklistItems?.map((item, i) => (
                                        <div className="flex gap-4" key={i}>
                                            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 font-bold">{i + 1}</div>
                                            <div>
                                                <h5 className="font-bold">{item.title}</h5>
                                                <p className="text-xs text-[#78716C]">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <Button onClick={() => onComplete(100)} size="lg" className="w-full bg-[#292524] hover:bg-[#44403C] text-white rounded-2xl py-8 text-xl shadow-xl">
                                {t('training.empathy_audit.finish')}
                            </Button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

