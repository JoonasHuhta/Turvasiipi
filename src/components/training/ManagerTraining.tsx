"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
    Gavel,
    Activity,
    HeartHandshake,
    Shield,
    ArrowRight,
    TrendingUp,
    Scale,
    CheckCircle2,
    AlertTriangle
} from "lucide-react";
import { useProgress } from "@/context/ProgressContext";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface ManagerTrainingProps {
    onExit: () => void;
    onComplete: () => void;
}

export const ManagerTraining: React.FC<ManagerTrainingProps> = ({ onExit, onComplete }) => {
    const { t } = useLanguage();
    const [currentStage, setCurrentStage] = useState(0);
    const { completeModule } = useProgress();
    const [completedStages, setCompletedStages] = useState<number[]>([]);

    // Stage 1 State: Toxic Star Matrix
    const [starResults, setStarResults] = useState(3);
    const [starValues, setStarValues] = useState(3);

    // Translations data
    const stepsTranslations = t('training.manager_training.stages', { returnObjects: true }) as any;
    // Helper to safely access nested key or return key
    const getStageT = (stageKey: string, field: string) => {
        return stepsTranslations?.[stageKey]?.[field] || `${stageKey}.${field}`;
    };

    const stages = [
        {
            id: "toxic-star",
            title: getStageT('toxic_star', 'title'),
            icon: AlertTriangle,
            color: "text-amber-600",
            bg: "bg-amber-50",
            borderColor: "border-amber-200"
        },
        {
            id: "legal",
            title: getStageT('legal', 'title'),
            icon: Scale,
            color: "text-slate-800",
            bg: "bg-slate-50",
            borderColor: "border-slate-200"
        },
        {
            id: "conflict",
            title: getStageT('conflict', 'title'),
            icon: Activity,
            color: "text-rose-600",
            bg: "bg-rose-50",
            borderColor: "border-rose-200"
        },
        {
            id: "restorative",
            title: getStageT('restorative', 'title'),
            icon: HeartHandshake,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            borderColor: "border-emerald-200"
        },
        {
            id: "accountability",
            title: getStageT('accountability', 'title'),
            icon: Shield,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
            borderColor: "border-indigo-200"
        }
    ];

    const handleComplete = (stageIndex: number) => {
        if (!completedStages.includes(stageIndex)) {
            setCompletedStages([...completedStages, stageIndex]);
        }
        if (stageIndex < stages.length - 1) {
            setCurrentStage(stageIndex + 1);
        } else {
            completeModule("manager");
            onComplete();
        }
    };

    const renderStage1_ToxicStar = () => {
        const content = stepsTranslations?.toxic_star || {};
        const labels = content?.labels || {};
        const analysis = content?.analysis || {};

        const getMatrixAnalysis = () => {
            if (starValues < 3 && starResults > 3) return analysis.toxic;
            if (starValues > 3 && starResults > 3) return analysis.star;
            if (starValues > 3 && starResults < 3) return analysis.potential;
            if (starValues < 3 && starResults < 3) return analysis.underperformer;
            return analysis.average;
        };

        return (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                    <h3 className="font-bold text-lg mb-2 text-amber-900 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        {content.matrix_title}
                    </h3>
                    <p className="text-amber-800 mb-6 text-sm">
                        {content.matrix_desc}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-slate-700">{content.axis_results}</label>
                            <Slider
                                value={[starResults]}
                                onValueChange={(v) => setStarResults(v[0])}
                                max={5}
                                min={1}
                                step={1}
                                className="py-2"
                            />
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>{labels.beginner}</span>
                                <span>{labels.top_performer}</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-slate-700">{content.axis_values}</label>
                            <Slider
                                value={[starValues]}
                                onValueChange={(v) => setStarValues(v[0])}
                                max={5}
                                min={1}
                                step={1}
                                className="py-2"
                            />
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>{labels.toxic}</span>
                                <span>{labels.exemplary}</span>
                            </div>
                        </div>
                    </div>

                    <div className={cn(
                        "p-4 rounded-lg border text-center font-bold text-lg transition-all",
                        starValues < 3 && starResults > 3 ? "bg-red-100 border-red-200 text-red-800" :
                            starValues > 3 && starResults > 3 ? "bg-emerald-100 border-emerald-200 text-emerald-800" :
                                "bg-white border-slate-200 text-slate-700"
                    )}>
                        {getMatrixAnalysis()}
                    </div>
                </div>

                <div className="prose prose-slate max-w-none text-slate-600">
                    <p dangerouslySetInnerHTML={{ __html: content.conclusion }} />
                </div>

                <Button onClick={() => handleComplete(0)} className="w-full">
                    {content.action} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        );
    };

    const renderStage2_Legal = () => {
        const content = stepsTranslations?.legal || {};
        const cards = content?.cards || {};

        return (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="font-bold text-lg mb-4 text-slate-900 flex items-center gap-2">
                        <Gavel className="w-5 h-5" />
                        {content.content_title}
                    </h3>

                    <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                            <div className="flex items-start gap-3">
                                <Scale className="w-5 h-5 text-indigo-600 mt-1" />
                                <div>
                                    <h4 className="font-bold text-slate-900">{cards.law?.title}</h4>
                                    <p className="text-sm text-slate-600 mt-1">{cards.law?.text}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                            <div className="flex items-start gap-3">
                                <Shield className="w-5 h-5 text-indigo-600 mt-1" />
                                <div>
                                    <h4 className="font-bold text-slate-900">{cards.right?.title}</h4>
                                    <p className="text-sm text-slate-600 mt-1">{cards.right?.text}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-50 text-indigo-900 rounded-lg text-center font-medium">
                        {content.quote}
                    </div>
                </div>

                <Button onClick={() => handleComplete(1)} className="w-full">
                    {content.action} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        );
    };

    const renderStage3_Conflict = () => {
        const content = stepsTranslations?.conflict || {};
        const sentences = content?.sentences || [];

        return (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="bg-rose-50 p-6 rounded-xl border border-rose-100">
                    <h3 className="font-bold text-lg mb-2 text-rose-900 flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        {content.content_title}
                    </h3>
                    <p className="text-rose-800 mb-6 text-sm">
                        {content.desc}
                    </p>

                    <div className="space-y-4">
                        <h4 className="font-bold text-slate-700">{content.exercise_title}</h4>
                        <p className="text-sm text-slate-600">{content.exercise_desc}</p>

                        <div className="space-y-2">
                            {sentences.map((sentence: string, i: number) => (
                                <div key={i} className="bg-white p-3 rounded border border-rose-200 text-slate-800 font-medium hover:bg-rose-100 transition-colors cursor-pointer group flex items-center justify-between">
                                    "{sentence}"
                                    <CheckCircle2 className="w-4 h-4 text-rose-300 group-hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Button onClick={() => handleComplete(2)} className="w-full bg-rose-600 hover:bg-rose-700">
                    {content.action} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        );
    };

    const renderStage4_Restorative = () => {
        const content = stepsTranslations?.restorative || {};
        const steps = content?.steps || [];

        return (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                    <h3 className="font-bold text-lg mb-4 text-emerald-900 flex items-center gap-2">
                        <HeartHandshake className="w-5 h-5" />
                        {content.content_title}
                    </h3>

                    <div className="prose prose-sm text-emerald-900 mb-6">
                        <p>{content.intro}</p>
                    </div>

                    <div className="space-y-4">
                        {steps.map((step: any, i: number) => (
                            <Card key={i} className="border-emerald-200">
                                <CardContent className="pt-6">
                                    <h4 className="font-bold text-slate-900 mb-2">{step.title}</h4>
                                    <p className="text-sm text-slate-600">{step.text}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <Button onClick={() => handleComplete(3)} className="w-full bg-emerald-600 hover:bg-emerald-700">
                    {content.action} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        );
    };

    const renderStage5_Accountability = () => {
        const content = stepsTranslations?.accountability || {};
        const cards = content?.cards || {};

        return (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <Shield className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-xl text-indigo-900 mb-2">
                        {content.content_title}
                    </h3>
                    <p className="text-indigo-700 max-w-md mx-auto mb-8">
                        {content.desc}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                        <div className="bg-white p-4 rounded-lg border border-indigo-100">
                            <h4 className="font-bold text-slate-900 text-sm mb-1">{cards.reward?.title}</h4>
                            <p className="text-xs text-slate-600">{cards.reward?.text}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-indigo-100">
                            <h4 className="font-bold text-slate-900 text-sm mb-1">{cards.support?.title}</h4>
                            <p className="text-xs text-slate-600">{cards.support?.text}</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStage(0)} className="flx-1">
                        {content.restart}
                    </Button>
                    <Button onClick={() => handleComplete(4)} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                        {content.finish}
                    </Button>
                </div>
            </div>
        );
    };

    const getIcon = () => {
        const Icon = stages[currentStage].icon;
        return <Icon className="w-6 h-6" />;
    };

    return (
        <div className="max-w-2xl mx-auto pb-20">
            <div className="mb-8 space-y-4">
                <div className="flex items-center justify-between text-sm text-slate-500 uppercase tracking-widest font-mono">
                    <span>{t('training.manager_training.title')}</span>
                    <span>{t('training.manager_training.step')} {currentStage + 1} / {stages.length}</span>
                </div>
                <Progress value={((currentStage) / stages.length) * 100} className="h-2" />
            </div>

            <Card className={cn("border-t-4 shadow-sm overflow-hidden transition-colors duration-500", stages[currentStage].borderColor)}>
                <CardHeader className={stages[currentStage].bg}>
                    <div className="flex items-center gap-4">
                        <div className={cn("p-3 bg-white rounded-lg shadow-sm border border-slate-100", stages[currentStage].color)}>
                            {getIcon()}
                        </div>
                        <div>
                            <CardTitle className={cn("text-xl", stages[currentStage].color)}>
                                {stages[currentStage].title}
                            </CardTitle>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 md:p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStage}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {currentStage === 0 && renderStage1_ToxicStar()}
                            {currentStage === 1 && renderStage2_Legal()}
                            {currentStage === 2 && renderStage3_Conflict()}
                            {currentStage === 3 && renderStage4_Restorative()}
                            {currentStage === 4 && renderStage5_Accountability()}
                        </motion.div>
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    );
};
