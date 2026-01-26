"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Fingerprint,
    ArrowLeft,
    Scale,
    Users,
    Briefcase,
    ShieldAlert,
    ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface MoralLabyrinthProps {
    onComplete: () => void;
    onExit: () => void;
}

type ProfileType = 'idealist' | 'pragmatist' | 'protector' | 'survivor';

interface StoryOption {
    text: string;
    type: ProfileType;
    id?: string;
}

interface StoryStep {
    title: string;
    text: string;
    question: string;
    options: StoryOption[];
}

interface ProfileData {
    title: string;
    desc: string;
    advice: string;
}

export const MoralLabyrinth: React.FC<MoralLabyrinthProps> = ({ onComplete, onExit }) => {
    const { t } = useLanguage();
    const [step, setStep] = useState(0);
    const [choices, setChoices] = useState<string[]>([]);
    const [profile, setProfile] = useState<ProfileType | null>(null);

    // Load data
    const storySteps = t('training.moral_labyrinth.steps', { returnObjects: true }) as StoryStep[];
    const profilesData = t('training.moral_labyrinth.profiles', { returnObjects: true }) as Record<ProfileType, ProfileData>;

    // Profiles Configuration (Icons & Colors)
    const profileConfig = {
        idealist: {
            icon: Scale,
            color: "text-indigo-500",
            barColor: "bg-indigo-500",
            bg: "bg-indigo-100"
        },
        pragmatist: {
            icon: Briefcase,
            color: "text-emerald-500",
            barColor: "bg-emerald-500",
            bg: "bg-emerald-100"
        },
        protector: {
            icon: Users,
            color: "text-rose-500",
            barColor: "bg-rose-500",
            bg: "bg-rose-100"
        },
        survivor: {
            icon: ShieldAlert,
            color: "text-slate-500",
            barColor: "bg-slate-500",
            bg: "bg-slate-100"
        }
    };

    const calculateProfile = (choices: string[]): ProfileType => {
        const counts = { idealist: 0, pragmatist: 0, protector: 0, survivor: 0 };

        choices.forEach(c => {
            if (c === 'idealist') counts.idealist++;
            if (c === 'pragmatist') counts.pragmatist++;
            if (c === 'protector') counts.protector++;
            if (c === 'survivor') counts.survivor++;
        });

        let max = 0;
        let result: ProfileType = 'pragmatist'; // default

        (Object.keys(counts) as ProfileType[]).forEach(key => {
            if (counts[key] > max) {
                max = counts[key];
                result = key;
            }
        });

        return result;
    };

    const handleChoice = (type: ProfileType) => {
        const newChoices = [...choices, type];
        setChoices(newChoices);

        if (step < storySteps.length - 1) {
            setStep(prev => prev + 1);
        } else {
            setProfile(calculateProfile(newChoices));
            setStep(prev => prev + 1); // Move to results
        }
    };

    return (
        <div className="min-h-full p-6 md:p-12 max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500 font-sans text-slate-800">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={onExit} className="text-slate-400 hover:text-slate-900 gap-2">
                    <ArrowLeft className="w-4 h-4" /> {t('training.moral_labyrinth.ui.back')}
                </Button>
                <div className="flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest text-xs">
                    <Fingerprint className="w-4 h-4" /> {t('training.moral_labyrinth.title')}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step < storySteps.length ? (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8 mt-8"
                    >
                        <div className="w-full bg-slate-100 h-2 rounded-full mb-8">
                            <div className="h-full bg-indigo-600 transition-all duration-500 rounded-full" style={{ width: `${((step) / storySteps.length) * 100}%` }} />
                        </div>

                        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Fingerprint className="w-64 h-64" />
                            </div>
                            <h2 className="text-2xl font-black uppercase text-slate-900 mb-4 relative z-10">{storySteps[step].title}</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8 relative z-10">
                                {storySteps[step].text}
                            </p>

                            <h3 className="font-bold text-indigo-600 uppercase tracking-widest text-sm mb-4 relative z-10">{storySteps[step].question}</h3>

                            <div className="grid gap-4 relative z-10">
                                {storySteps[step].options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleChoice(opt.type)}
                                        className="text-left p-4 rounded-xl border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all font-medium text-slate-700 hover:text-indigo-900"
                                    >
                                        {opt.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : profile && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-8 text-center space-y-8"
                    >
                        <Card className="p-12 border-slate-200 shadow-2xl overflow-hidden relative">
                            <div className={cn("absolute top-0 left-0 w-full h-2", profileConfig[profile].barColor)} />

                            <div className={cn("w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6", profileConfig[profile].bg, profileConfig[profile].color)}>
                                {React.createElement(profileConfig[profile].icon, { className: "w-12 h-12" })}
                            </div>

                            <h2 className="text-4xl font-black uppercase text-slate-900 mb-2">{profilesData[profile].title}</h2>
                            <p className="text-xl text-slate-600 max-w-xl mx-auto mb-8 font-light">
                                "{profilesData[profile].desc}"
                            </p>

                            <div className="bg-slate-50 p-6 rounded-2xl max-w-lg mx-auto mb-8">
                                <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-2">{t('training.moral_labyrinth.profiles.analysis_title')}</h4>
                                <p className="text-slate-700 italic">{profilesData[profile].advice}</p>
                            </div>

                            <Button onClick={onComplete} className="rounded-full px-12 py-6 bg-slate-900 text-white font-bold text-lg shadow-xl hover:bg-slate-800">
                                {t('training.moral_labyrinth.profiles.action')} <ArrowRight className="ml-2" />
                            </Button>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
