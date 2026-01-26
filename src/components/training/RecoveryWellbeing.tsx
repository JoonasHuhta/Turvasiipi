"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart,
    ArrowLeft,
    BookOpen,
    PlayCircle,
    Brain,
    Wind,
    Shield,
    User,
    Anchor,
    Pause,
    Play,
    BatteryCharging,
    Minus,
    Plus,
    Zap,
    Moon,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface RecoveryWellbeingProps {
    onComplete: () => void;
    onExit: () => void;
}

// --- COMPONENT ---

export const RecoveryWellbeing: React.FC<RecoveryWellbeingProps> = ({ onComplete, onExit }) => {
    const { t } = useLanguage();
    const [step, setStep] = useState<'intro' | 'battery' | 'plan' | 'summary'>('intro');
    const [batteryLevel, setBatteryLevel] = useState(30);

    const [plan, setPlan] = useState<{ micro: string[]; macro: string[] }>({ micro: [], macro: [] });
    const [newMicro, setNewMicro] = useState('');
    const [newMacro, setNewMacro] = useState('');

    const addMicro = () => {
        if (newMicro.trim()) {
            setPlan(prev => ({ ...prev, micro: [...prev.micro, newMicro] }));
            setNewMicro('');
        }
    };

    const addMacro = () => {
        if (newMacro.trim()) {
            setPlan(prev => ({ ...prev, macro: [...prev.macro, newMacro] }));
            setNewMacro('');
        }
    };

    return (
        <div className="min-h-full p-6 md:p-12 max-w-4xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={onExit} className="text-slate-400 hover:text-slate-900 gap-2">
                    <ArrowLeft className="w-4 h-4" /> Keskeytä
                </Button>
                <div className="flex gap-2">
                    {['intro', 'battery', 'plan', 'summary'].map((s, i) => (
                        <div key={s} className={cn("w-2 h-2 rounded-full transition-all",
                            s === step ? "bg-amber-600 w-4" :
                                ['intro', 'battery', 'plan', 'summary'].indexOf(step) > i ? "bg-amber-200" : "bg-slate-200"
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
                        <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600">
                            <BatteryCharging className="w-12 h-12" />
                        </div>
                        <h1
                            className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight"
                            dangerouslySetInnerHTML={{ __html: t('training.recovery_wellbeing.intro.title') }}
                        />
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            {t('training.recovery_wellbeing.intro.text')}
                        </p>
                        <Button size="lg" onClick={() => setStep('battery')} className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-12 py-8 text-xl font-black uppercase tracking-widest shadow-xl shadow-amber-200">
                            {t('training.recovery_wellbeing.intro.action')} <ArrowRight className="ml-2" />
                        </Button>
                    </motion.div>
                )}

                {/* BATTERY METAPHOR */}
                {step === 'battery' && (
                    <motion.div
                        key="battery"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-black uppercase text-slate-900">{t('training.recovery_wellbeing.battery.title')}</h2>
                        </div>

                        <div className="flex flex-col items-center justify-center py-12 gap-8">
                            <div className="w-48 h-80 border-8 border-slate-300 rounded-3xl p-2 relative">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-24 h-6 bg-slate-300 rounded-t-lg" />
                                <div className="w-full h-full bg-slate-100 rounded-xl overflow-hidden flex flex-col-reverse relative">
                                    <motion.div
                                        animate={{ height: `${batteryLevel}%` }}
                                        className={cn("w-full transition-all duration-300",
                                            batteryLevel < 20 ? "bg-red-500" : batteryLevel < 60 ? "bg-amber-500" : "bg-emerald-500"
                                        )}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center mix-blend-difference text-white font-black text-4xl">
                                        {batteryLevel}%
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button variant="outline" size="icon" onClick={() => setBatteryLevel(Math.max(0, batteryLevel - 10))}><Minus /></Button>
                                <span className="font-bold uppercase text-xs tracking-widest text-slate-500">{t('training.recovery_wellbeing.battery.charge')}</span>
                                <Button variant="outline" size="icon" onClick={() => setBatteryLevel(Math.min(100, batteryLevel + 10))}><Plus /></Button>
                            </div>
                        </div>

                        <p className="text-center text-slate-500 max-w-lg mx-auto">
                            {t('training.recovery_wellbeing.battery.text')}
                        </p>

                        <div className="flex justify-center pt-8">
                            <Button onClick={() => setStep('plan')} className="rounded-full px-8 bg-slate-900 text-white font-bold h-12">
                                {t('training.recovery_wellbeing.battery.action')} <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* PLAN */}
                {step === 'plan' && (
                    <motion.div
                        key="plan"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-black uppercase text-slate-900">{t('training.recovery_wellbeing.plan.title')}</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Micro */}
                            <Card className="p-6 border-slate-200 bg-amber-50/50">
                                <div className="flex items-center gap-3 mb-2">
                                    <Zap className="w-6 h-6 text-amber-600" />
                                    <h3 className="font-bold text-lg">{t('training.recovery_wellbeing.plan.micro_title')}</h3>
                                </div>
                                <p className="text-xs text-slate-500 mb-6 uppercase tracking-widest">{t('training.recovery_wellbeing.plan.micro_desc')}</p>

                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder={t('training.recovery_wellbeing.plan.micro_placeholder')}
                                            value={newMicro}
                                            onChange={(e) => setNewMicro(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && addMicro()}
                                            className="flex-1 bg-white border border-slate-200 rounded-lg px-4 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        />
                                        <Button size="sm" onClick={addMicro} className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase">{t('training.recovery_wellbeing.plan.btn_add_micro')}</Button>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {plan.micro.map((p, i) => (
                                            <div key={i} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-amber-100 text-sm font-medium text-slate-700 shadow-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                                {p}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>

                            {/* Macro */}
                            <Card className="p-6 border-slate-200 bg-emerald-50/50">
                                <div className="flex items-center gap-3 mb-2">
                                    <Moon className="w-6 h-6 text-emerald-600" />
                                    <h3 className="font-bold text-lg">{t('training.recovery_wellbeing.plan.macro_title')}</h3>
                                </div>
                                <p className="text-xs text-slate-500 mb-6 uppercase tracking-widest">{t('training.recovery_wellbeing.plan.macro_desc')}</p>

                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder={t('training.recovery_wellbeing.plan.macro_placeholder')}
                                            value={newMacro}
                                            onChange={(e) => setNewMacro(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && addMacro()}
                                            className="flex-1 bg-white border border-slate-200 rounded-lg px-4 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                        <Button size="sm" onClick={addMacro} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase">{t('training.recovery_wellbeing.plan.btn_add_macro')}</Button>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {plan.macro.map((p, i) => (
                                            <div key={i} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-emerald-100 text-sm font-medium text-slate-700 shadow-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                {p}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div className="flex justify-center pt-8">
                            <Button
                                onClick={() => setStep('summary')}
                                disabled={plan.micro.length === 0 && plan.macro.length === 0}
                                className="rounded-full px-8 bg-slate-900 text-white font-bold h-12"
                            >
                                {t('training.recovery_wellbeing.plan.action')} <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: SUMMARY */}
                {step === 'summary' && (
                    <motion.div
                        key="summary"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="text-center space-y-8 py-12"
                    >
                        <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-600">
                            <Heart className="w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-black uppercase text-slate-900">{t('training.recovery_wellbeing.summary.title')}</h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            {t('training.recovery_wellbeing.summary.text')}
                        </p>

                        <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto text-left">
                            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                                <h4 className="font-bold text-amber-900 mb-2 uppercase text-xs tracking-widest">{t('training.recovery_wellbeing.summary.micros')}</h4>
                                <ul className="list-disc list-inside text-sm text-slate-700">
                                    {plan.micro.length > 0 ? plan.micro.map((p, i) => <li key={i}>{p}</li>) : <li className="italic text-slate-400">{t('training.recovery_wellbeing.summary.empty')}</li>}
                                </ul>
                            </div>
                            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                <h4 className="font-bold text-emerald-900 mb-2 uppercase text-xs tracking-widest">{t('training.recovery_wellbeing.summary.macros')}</h4>
                                <ul className="list-disc list-inside text-sm text-slate-700">
                                    {plan.macro.length > 0 ? plan.macro.map((p, i) => <li key={i}>{p}</li>) : <li className="italic text-slate-400">{t('training.recovery_wellbeing.summary.empty')}</li>}
                                </ul>
                            </div>
                        </div>

                        <div className="flex justify-center pt-4">
                            <Button onClick={onComplete} className="rounded-full px-12 py-6 bg-slate-900 text-white font-bold text-lg shadow-xl">
                                {t('training.recovery_wellbeing.summary.action')}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
