"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    ArrowRight,
    ArrowLeft,
    AlertTriangle,
    DoorOpen,
    CheckCircle2,
    TrendingDown,
    Flag
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface ExitStrategyProps {
    onComplete: () => void;
    onExit: () => void;
}

export const ExitStrategy: React.FC<ExitStrategyProps> = ({ onComplete, onExit }) => {
    const { t } = useLanguage();
    const [step, setStep] = useState<'intro' | 'signs' | 'traffic-light' | 'manager-test' | 'plan' | 'summary'>('intro');

    // State for Signs Checklist
    const [checkedSigns, setCheckedSigns] = useState<string[]>([]);

    // State for Traffic Light Assessment
    // const [trafficLightScore, setTrafficLightScore] = useState<number>(0); 

    // State for Manager Test
    const [selectedManagerQuestions, setSelectedManagerQuestions] = useState<number[]>([]);

    const signsList = Object.keys(t('training.exit_strategy.signs.list', { returnObjects: true }) || {}).map(key => ({
        id: key,
        text: t(`training.exit_strategy.signs.list.${key}`)
    }));

    const managerQuestionsData = t('training.exit_strategy.manager_test.questions', { returnObjects: true }) as any[];
    const managerQuestions = Array.isArray(managerQuestionsData) ? managerQuestionsData : [];

    // Derived score
    const managerScore = selectedManagerQuestions.reduce((acc, idx) => acc + (managerQuestions[idx]?.score || 0), 0);

    const getTrafficLightResult = () => {
        // Simple logic combining signs and manager score
        let severity = 0;
        if (checkedSigns.length >= 3) severity += 50;
        if (managerScore < 0) severity += 50;

        // Fetch translations for results
        const red = t('training.exit_strategy.traffic_light.results.red', { returnObjects: true }) as any;
        const yellow = t('training.exit_strategy.traffic_light.results.yellow', { returnObjects: true }) as any;
        const green = t('training.exit_strategy.traffic_light.results.green', { returnObjects: true }) as any;

        if (severity >= 80) return { color: 'red', text: red.text, desc: red.desc };
        if (severity >= 40) return { color: 'yellow', text: yellow.text, desc: yellow.desc };
        return { color: 'green', text: green.text, desc: green.desc };
    };

    const result = getTrafficLightResult();

    const planSection1 = t('training.exit_strategy.plan.section1.items', { returnObjects: true }) as string[];
    const planSection2 = t('training.exit_strategy.plan.section2.items', { returnObjects: true }) as string[];

    return (
        <div className="min-h-full p-6 md:p-12 max-w-4xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500 font-sans text-[#44403C]">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={onExit} className="text-[#78716C] hover:text-[#292524] gap-2">
                    <ArrowLeft className="w-4 h-4" /> {t('common.back') || 'Takaisin'}
                </Button>
                <div className="flex gap-2">
                    {['intro', 'signs', 'traffic-light', 'manager-test', 'plan', 'summary'].map((s, i) => (
                        <div key={s} className={cn("w-2 h-2 rounded-full transition-all",
                            s === step ? "bg-amber-600 w-4" :
                                ['intro', 'signs', 'traffic-light', 'manager-test', 'plan', 'summary'].indexOf(step) > i ? "bg-amber-200" : "bg-[#E7E5E4]"
                        )} />
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {/* INTRO */}
                {step === 'intro' && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="text-center space-y-8 py-12"
                    >
                        <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-600">
                            <DoorOpen className="w-12 h-12" />
                        </div>
                        <h1
                            className="text-4xl md:text-5xl font-black text-[#292524] uppercase tracking-tight"
                            dangerouslySetInnerHTML={{ __html: t('training.exit_strategy.intro.title') }}
                        />
                        <p className="text-xl text-[#57534E] max-w-2xl mx-auto leading-relaxed">
                            {t('training.exit_strategy.intro.text')}
                        </p>
                        <Button size="lg" onClick={() => setStep('signs')} className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-12 py-8 text-xl font-black uppercase tracking-widest shadow-xl shadow-rose-200/50">
                            {t('training.exit_strategy.intro.action')} <ArrowRight className="ml-2" />
                        </Button>
                    </motion.div>
                )}

                {/* STEP 1: SIGNS */}
                {step === 'signs' && (
                    <motion.div
                        key="signs"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-black uppercase text-[#292524]">{t('training.exit_strategy.signs.title')}</h2>
                            <p className="text-[#57534E]">{t('training.exit_strategy.signs.subtitle')}</p>
                        </div>

                        <div className="grid gap-4 max-w-2xl mx-auto">
                            {signsList.map(item => (
                                <div
                                    key={item.id}
                                    className={cn(
                                        "flex items-center space-x-4 p-5 rounded-2xl border-2 cursor-pointer transition-all hover:bg-rose-50/50",
                                        checkedSigns.includes(item.id) ? "border-rose-500 bg-rose-50" : "border-[#E7E5E4]"
                                    )}
                                    onClick={() => {
                                        setCheckedSigns(prev =>
                                            prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id]
                                        );
                                    }}
                                >
                                    <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0",
                                        checkedSigns.includes(item.id) ? "border-rose-500 bg-rose-500 text-white" : "border-[#D6D3D1]"
                                    )}>
                                        {checkedSigns.includes(item.id) && <CheckCircle2 className="w-4 h-4" />}
                                    </div>
                                    <Label className="text-lg cursor-pointer font-medium text-[#44403C] leading-snug">{item.text}</Label>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center pt-8">
                            <Button onClick={() => setStep('manager-test')} className="rounded-full px-8 bg-[#292524] text-white font-bold hover:bg-[#44403C]">
                                {t('training.exit_strategy.signs.action')} <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 2: MANAGER TEST */}
                {step === 'manager-test' && (
                    <motion.div
                        key="manager-test"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-black uppercase text-[#292524]">{t('training.exit_strategy.manager_test.title')}</h2>
                            <p className="text-[#57534E]">{t('training.exit_strategy.manager_test.subtitle')}</p>
                        </div>

                        <div className="grid gap-4 max-w-2xl mx-auto">
                            {managerQuestions.map((q, idx) => {
                                const isSelected = selectedManagerQuestions.includes(idx);
                                return (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all",
                                            isSelected ? (q.score > 0 ? "border-emerald-500 bg-emerald-50" : "border-rose-500 bg-rose-50") : "border-[#E7E5E4] bg-white hover:bg-[#FAFAF9]"
                                        )}
                                        onClick={() => {
                                            setSelectedManagerQuestions(prev =>
                                                prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
                                            );
                                        }}
                                    >
                                        <p className="font-medium text-[#44403C] pr-4">{q.text}</p>
                                        {isSelected && (
                                            q.score > 0
                                                ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                                : <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="bg-amber-50 p-4 rounded-xl text-center text-amber-900 text-sm max-w-xl mx-auto border border-amber-100">
                            <p dangerouslySetInnerHTML={{ __html: t('training.exit_strategy.manager_test.insight') }} />
                        </div>

                        <div className="flex justify-center pt-8">
                            <Button onClick={() => setStep('traffic-light')} className="rounded-full px-8 bg-[#292524] text-white font-bold hover:bg-[#44403C]">
                                {t('training.exit_strategy.manager_test.action')} <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: TRAFFIC LIGHT (RESULT) */}
                {step === 'traffic-light' && (
                    <motion.div
                        key="traffic-light"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10 py-8 text-center"
                    >
                        <div className="space-y-4">
                            <h2 className="text-3xl font-black uppercase text-[#292524]">{t('training.exit_strategy.traffic_light.title')}</h2>
                            <p className="text-[#57534E]">{t('training.exit_strategy.traffic_light.subtitle')}</p>
                        </div>

                        <div className="flex justify-center">
                            <div className="relative w-40 h-80 bg-[#292524] rounded-[3rem] p-4 flex flex-col justify-between shadow-2xl border-4 border-[#44403C]">
                                <div className={cn("w-28 h-28 rounded-full transition-all duration-1000 shadow-[0_0_50px_rgba(0,0,0,0.5)]",
                                    result.color === 'red' ? "bg-red-500 shadow-red-500" : "bg-red-900/30"
                                )} />
                                <div className={cn("w-28 h-28 rounded-full transition-all duration-1000 shadow-[0_0_50px_rgba(0,0,0,0.5)]",
                                    result.color === 'yellow' ? "bg-amber-500 shadow-amber-500" : "bg-amber-900/30"
                                )} />
                                <div className={cn("w-28 h-28 rounded-full transition-all duration-1000 shadow-[0_0_50px_rgba(0,0,0,0.5)]",
                                    result.color === 'green' ? "bg-emerald-500 shadow-emerald-500" : "bg-emerald-900/30"
                                )} />
                            </div>
                        </div>

                        <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-[#E7E5E4]">
                            <h3 className={cn("text-2xl font-black uppercase mb-4",
                                result.color === 'red' ? "text-red-600" : result.color === 'yellow' ? "text-amber-600" : "text-emerald-600"
                            )}>
                                {result.text}
                            </h3>
                            <p className="text-lg text-[#57534E] leading-relaxed font-medium">
                                {result.desc}
                            </p>

                            {result.color === 'red' && (
                                <div className="mt-6 bg-red-50 border border-red-100 p-4 rounded-xl flex items-start gap-3 text-left">
                                    <TrendingDown className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                                    <div>
                                        <p className="font-bold text-red-800 text-sm">{t('training.exit_strategy.traffic_light.stat_box.title')}</p>
                                        <p className="text-red-700 text-sm">{t('training.exit_strategy.traffic_light.stat_box.text')}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-center pt-8">
                            <Button onClick={() => setStep('plan')} className="rounded-full px-8 bg-[#292524] text-white font-bold h-12 text-lg hover:bg-[#44403C]">
                                {t('training.exit_strategy.traffic_light.action')} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 4: ACTION PLAN */}
                {step === 'plan' && (
                    <motion.div
                        key="plan"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-black uppercase text-[#292524]">{t('training.exit_strategy.plan.title')}</h2>
                            <p className="text-[#57534E]">{t('training.exit_strategy.plan.subtitle')}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="p-6 border-[#E7E5E4]">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold">1</div>
                                    <h3 className="font-bold text-lg text-[#292524]">{t('training.exit_strategy.plan.section1.title')}</h3>
                                </div>
                                <ul className="space-y-3 text-sm text-[#57534E]">
                                    {planSection1?.map((item, i) => (
                                        <li key={i} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {item}</li>
                                    ))}
                                </ul>
                            </Card>

                            <Card className="p-6 border-[#E7E5E4]">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold">2</div>
                                    <h3 className="font-bold text-lg text-[#292524]">{t('training.exit_strategy.plan.section2.title')}</h3>
                                </div>
                                <ul className="space-y-3 text-sm text-[#57534E]">
                                    {planSection2?.map((item, i) => (
                                        <li key={i} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {item}</li>
                                    ))}
                                </ul>
                            </Card>
                        </div>

                        <div className="bg-[#292524] text-white p-8 rounded-3xl shadow-xl mt-8">
                            <h3 className="text-xl font-bold uppercase tracking-tight mb-4 flex items-center gap-2">
                                <Flag className="w-5 h-5 text-amber-400" /> {t('training.exit_strategy.plan.target_date.title')}
                            </h3>
                            <p className="opacity-80 mb-6">{t('training.exit_strategy.plan.target_date.text')}</p>
                            <div className="flex gap-4">
                                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">3 {t('common.months') || 'kk'}</Button>
                                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">6 {t('common.months') || 'kk'}</Button>
                            </div>
                        </div>

                        <div className="flex justify-center pt-8">
                            <Button onClick={onComplete} className="rounded-full px-12 py-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-xl shadow-emerald-200/50">
                                {t('training.exit_strategy.plan.action')} <CheckCircle2 className="ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
