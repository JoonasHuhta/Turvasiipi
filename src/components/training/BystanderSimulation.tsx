"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HandHelping,
    ArrowRight,
    Info,
    X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

// --- TYPES ---
interface Choice {
    text: string;
    nextStep: string;
    impact: {
        solidarity: number;
        safety: number;
    };
    feedback: string;
    strategyType: 'direct_support' | 'collective' | 'internal' | 'passive';
}

interface ScenarioStep {
    id: string;
    text: string;
    speaker: string;
    type: 'narrative' | 'dialogue' | 'action';
    choices?: Choice[];
    contextInfo?: string;
}

// --- COMPONENT ---

export default function BystanderSimulation({
    moduleId,
    onComplete,
    onExit
}: {
    moduleId?: string;
    onComplete: (score: number, passed: boolean) => void;
    onExit: () => void;
}) {
    const { t } = useLanguage();
    const [currentStepId, setCurrentStepId] = useState('start');
    const [solidarity, setSolidarity] = useState(50);
    const [safety, setSafety] = useState(50);
    const [scenario, setScenario] = useState<ScenarioStep[]>([]);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');

    // Load scenarios from translation
    useEffect(() => {
        const moduleKey = moduleId === 'empathy' ? 'empathy' : 'bystander';
        const stepsRaw = t(`training.bystander_simulation.modules.${moduleKey}.steps`, { returnObjects: true });
        const titleRaw = t(`training.bystander_simulation.modules.${moduleKey}.title`);
        const subtitleRaw = t(`training.bystander_simulation.modules.${moduleKey}.subtitle`);

        if (Array.isArray(stepsRaw)) {
            setScenario(stepsRaw as ScenarioStep[]);
        }
        setTitle(titleRaw);
        setSubtitle(subtitleRaw);

        setCurrentStepId('start');
        setSolidarity(50);
        setSafety(50);
    }, [moduleId, t]);

    const currentStep = scenario.find(s => s.id === currentStepId) || scenario[0];

    // If scenario is not loaded yet
    if (!currentStep) return null;

    const handleChoice = (choice: Choice) => {
        setSolidarity(prev => Math.min(100, Math.max(0, prev + choice.impact.solidarity)));
        setSafety(prev => Math.min(100, Math.max(0, prev + choice.impact.safety)));

        if (choice.nextStep === 'finish') {
            const finalSolidarity = solidarity + choice.impact.solidarity;
            const finalSafety = safety + choice.impact.safety;
            const totalScore = finalSolidarity + finalSafety;
            const passed = totalScore >= 100;

            onComplete(totalScore, passed);
            return;
        }

        setCurrentStepId(choice.nextStep);
    };

    return (
        <div className="relative min-h-[500px] md:min-h-[600px] w-full bg-slate-950 rounded-[2rem] md:rounded-[3rem] p-4 md:p-10 flex flex-col gap-6 md:gap-8 border border-white/10 shadow-2xl">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                        <HandHelping className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-tight text-white leading-none">
                            {title}
                        </h2>
                        <p className="text-cyan-500/60 text-[10px] font-black uppercase tracking-widest mt-1">{subtitle}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto bg-white/5 p-3 md:p-4 px-4 md:px-6 rounded-2xl border border-white/5 backdrop-blur-md justify-between">
                    <div className="flex items-center gap-4 sm:gap-6">
                        <div className="flex flex-col gap-1 w-24">
                            <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-slate-400">
                                <span>{t('training.bystander_simulation.ui.solidarity')}</span>
                                <span className="text-cyan-400">{solidarity}%</span>
                            </div>
                            <Progress value={solidarity} className="h-1 bg-white/10" indicatorClassName="bg-cyan-500" />
                        </div>
                        <div className="flex flex-col gap-1 w-24">
                            <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-slate-400">
                                <span>{t('training.bystander_simulation.ui.safety')}</span>
                                <span className="text-emerald-400">{safety}%</span>
                            </div>
                            <Progress value={safety} className="h-1 bg-white/10" indicatorClassName="bg-emerald-500" />
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onExit} className="hover:bg-white/10 text-white/40 hover:text-white transition-colors shrink-0">
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 flex-1">
                {/* GAME AREA */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <Card className="bg-white/5 border-white/10 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] flex-1 flex flex-col justify-center relative overflow-hidden backdrop-blur-sm shadow-xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStepId}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-4 md:space-y-8"
                            >
                                <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-[8px] font-black uppercase tracking-widest px-3 h-6">
                                        {currentStep.speaker}
                                    </Badge>
                                </div>
                                <h3 className={cn(
                                    "text-xl md:text-3xl font-black leading-tight text-white tracking-tight",
                                    currentStep.type === 'dialogue' ? "italic text-indigo-100" : ""
                                )}>
                                    {currentStep.type === 'dialogue' && '"'}
                                    {currentStep.text}
                                    {currentStep.type === 'dialogue' && '"'}
                                </h3>

                                <div className="grid gap-3 pt-2 md:pt-4">
                                    {currentStep.choices?.map((choice, i) => (
                                        <Button
                                            key={i}
                                            onClick={() => handleChoice(choice)}
                                            className="h-auto py-4 md:py-5 px-5 md:px-8 justify-between text-left bg-white text-slate-950 hover:bg-cyan-500 hover:text-white rounded-[1.2rem] md:rounded-[1.5rem] flex items-center group transition-all duration-300 shadow-lg"
                                        >
                                            <span className="font-bold text-sm tracking-tight leading-snug flex-1 break-words">{choice.text}</span>
                                            <ArrowRight className="w-4 h-4 shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                        </Button>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Background subtle decoration */}
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
                    </Card>
                </div>

                {/* SIDEBAR */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <Card className="bg-white/5 border-white/10 p-8 rounded-[2.5rem] shadow-sm flex flex-col gap-6 backdrop-blur-md">
                        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                            <Info className="w-5 h-5 text-cyan-400" />
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-white">{t('training.bystander_simulation.ui.analysis_title')}</h4>
                        </div>
                        <div className="space-y-6">
                            {(t('training.bystander_simulation.ui.analysis_steps', { returnObjects: true }) as any[])?.map((step: any, i: number) => (
                                <div className="flex gap-4" key={i}>
                                    <div className={cn(
                                        "shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-cyan-400",
                                        i === 0 ? "bg-cyan-500/10" : "bg-emerald-500/10 text-emerald-400"
                                    )}>
                                        <span className="text-xs font-bold">{i + 1}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-black text-white uppercase tracking-tight">{step.title}</p>
                                        <p className="text-[10px] leading-relaxed text-slate-400 font-medium">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
