"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wind,
    Anchor,
    Eye,
    Ear,
    Hand,
    ArrowRight,
    X,
    Leaf,
    Sparkles,
    Heart,
    ArrowLeft
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

// --- TYPES ---
type ViewState = 'intro' | 'exercises' | 'practice' | 'summary';

interface Exercise {
    id: string;
    title: string;
    description: string;
    icon: any;
    color: string;
    content: React.ReactNode;
}

// --- COMPONENT ---
export default function MindfulnessGrounding({
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
    const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

    const finishModule = () => {
        onComplete(100);
    };

    // Helper to get nested translation arrays
    const getList = (path: string) => {
        const items = t(path, { returnObjects: true });
        return Array.isArray(items) ? items : [];
    };

    // Construct exercises with translations
    const exercisesData: Record<string, Exercise> = {
        observation: {
            id: 'observation',
            title: t('training.mindfulness_grounding.exercises_view.items.observation.title'),
            description: t('training.mindfulness_grounding.exercises_view.items.observation.description'),
            icon: Eye,
            color: 'bg-amber-100 text-amber-700',
            content: (
                <div className="space-y-4">
                    <p>{t('training.mindfulness_grounding.exercises_view.items.observation.content_intro')}</p>
                    <ul className="text-lg space-y-3 list-disc pl-6 marker:text-amber-500">
                        {getList('training.mindfulness_grounding.exercises_view.items.observation.steps').map((s: string, i: number) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ul>
                    <p className="text-sm italic text-[#78716C] mt-6 bg-amber-50 p-4 rounded-xl border border-amber-100">
                        {t('training.mindfulness_grounding.exercises_view.items.observation.hint')}
                    </p>
                </div>
            )
        },
        sound: {
            id: 'sound',
            title: t('training.mindfulness_grounding.exercises_view.items.sound.title'),
            description: t('training.mindfulness_grounding.exercises_view.items.sound.description'),
            icon: Ear,
            color: 'bg-sky-100 text-sky-700',
            content: (
                <div className="space-y-4">
                    <p>{t('training.mindfulness_grounding.exercises_view.items.sound.content_intro')}</p>
                    <ul className="text-lg space-y-3 list-disc pl-6 marker:text-sky-500">
                        {getList('training.mindfulness_grounding.exercises_view.items.sound.steps').map((s: string, i: number) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ul>
                </div>
            )
        },
        anchor: {
            id: 'anchor',
            title: t('training.mindfulness_grounding.exercises_view.items.anchor.title'),
            description: t('training.mindfulness_grounding.exercises_view.items.anchor.description'),
            icon: Anchor,
            color: 'bg-emerald-100 text-emerald-700',
            content: (
                <div className="space-y-4">
                    <p>{t('training.mindfulness_grounding.exercises_view.items.anchor.content_intro')}</p>
                    <ul className="text-lg space-y-3 list-disc pl-6 marker:text-emerald-500">
                        {getList('training.mindfulness_grounding.exercises_view.items.anchor.steps').map((s: string, i: number) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ul>
                </div>
            )
        }
    };

    const EXERCISES = Object.values(exercisesData);

    return (
        <div className="relative min-h-[600px] w-full bg-[#FAFAF9] rounded-[2rem] p-4 md:p-8 flex flex-col gap-6 border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C]">

            {/* HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                        <Leaf className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black uppercase tracking-widest text-[#292524]">{t('training.mindfulness_grounding.title')}</h2>
                        <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">{t('training.mindfulness_grounding.subtitle')}</span>
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
                            <h1
                                className="text-4xl font-serif font-black text-[#292524]"
                                dangerouslySetInnerHTML={{ __html: t('training.mindfulness_grounding.intro.title') }}
                            />
                            <p
                                className="text-lg text-[#57534E] leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: t('training.mindfulness_grounding.intro.text') }}
                            />
                            <Button onClick={() => setView('exercises')} size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-emerald-200/50">
                                {t('training.mindfulness_grounding.intro.action')} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* EXERCISES SELECTION */}
                    {view === 'exercises' && (
                        <motion.div
                            key="exercises"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center">
                                <Badge variant="outline" className="text-emerald-600 border-emerald-200">{t('training.mindfulness_grounding.exercises_view.badge')}</Badge>
                                <h2 className="text-3xl font-bold mt-2 text-[#292524]">{t('training.mindfulness_grounding.exercises_view.title')}</h2>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {EXERCISES.map((ex) => (
                                    <Card
                                        key={ex.id}
                                        onClick={() => {
                                            setSelectedExercise(ex.id);
                                            setView('practice');
                                        }}
                                        className="p-8 cursor-pointer hover:shadow-lg transition-all border-[#E7E5E4] flex flex-col items-center text-center space-y-4 group bg-white hover:bg-[#FAFAF9]"
                                    >
                                        <div className={cn("w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110", ex.color)}>
                                            <ex.icon className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#292524]">{ex.title}</h3>
                                        <p className="text-sm text-[#78716C]">{ex.description}</p>
                                    </Card>
                                ))}
                            </div>

                            <div className="pt-8 text-center">
                                <p className="text-sm text-[#78716C] italic">{t('training.mindfulness_grounding.exercises_view.quote')}</p>
                            </div>
                        </motion.div>
                    )}

                    {/* PRACTICE VIEW */}
                    {view === 'practice' && (
                        <motion.div
                            key="practice"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full max-w-2xl space-y-8"
                        >
                            {EXERCISES.find(e => e.id === selectedExercise) && (
                                <>
                                    <div className="text-center space-y-4">
                                        <Badge className="bg-emerald-100 text-emerald-700 border-0">{t('training.mindfulness_grounding.practice.badge')}</Badge>
                                        <h2 className="text-4xl font-serif font-black text-[#292524]">
                                            {EXERCISES.find(e => e.id === selectedExercise)?.title}
                                        </h2>
                                    </div>

                                    <Card className="p-8 border-emerald-100 bg-white shadow-inner relative overflow-hidden">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 0.05, scale: 1.2 }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                                            className="absolute -top-10 -right-10 text-emerald-900 pointer-events-none"
                                        >
                                            <Sparkles size={200} />
                                        </motion.div>
                                        <div className="relative z-10 text-lg leading-relaxed text-[#44403C]">
                                            {EXERCISES.find(e => e.id === selectedExercise)?.content}
                                        </div>
                                    </Card>

                                    <div className="flex gap-4 justify-center">
                                        <Button onClick={() => setView('exercises')} variant="outline" className="rounded-full px-8 py-6 text-[#57534E] hover:text-[#292524] border-[#D6D3D1]">
                                            {t('training.mindfulness_grounding.practice.action_retry')}
                                        </Button>
                                        <Button onClick={() => setView('summary')} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 py-6 shadow-lg shadow-emerald-200/50">
                                            {t('training.mindfulness_grounding.practice.action_done')} <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </div>
                                </>
                            )}
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
                            <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
                                <Heart className="w-12 h-12" />
                            </div>
                            <div className="space-y-4">
                                <h1 className="text-4xl font-serif font-black text-[#292524]">{t('training.mindfulness_grounding.summary.title')}</h1>
                                <p className="text-lg text-[#57534E]">
                                    {t('training.mindfulness_grounding.summary.text')}
                                </p>
                            </div>

                            <Button onClick={finishModule} size="lg" className="bg-[#292524] hover:bg-[#44403C] text-white rounded-2xl px-12 py-8 text-xl shadow-xl">
                                {t('training.mindfulness_grounding.summary.action')}
                            </Button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
