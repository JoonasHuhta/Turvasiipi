"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wind,
    Waves,
    TreeDeciduous,
    Flame,
    ArrowRight,
    CheckCircle2,
    RotateCcw,
    Play,
    Pause,
    X,
    HeartPulse
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- TYPES ---

type ViewState = 'intro' | 'menu' | 'exercise' | 'debrief';
type ExerciseId = 'shake' | 'breath' | 'ground' | 'relax';

interface Exercise {
    id: ExerciseId;
    title: string;
    description: string;
    icon: any;
    color: string;
    durationSeconds: number;
    steps: ExerciseStep[];
}

interface ExerciseStep {
    text: string;
    duration: number; // ms
    instruction?: string;
}

// --- DATA ---

const EXERCISES: Exercise[] = [
    {
        id: 'shake',
        title: 'The Shake',
        description: 'Pura adrenaliini ravistelemalla kehoa.',
        icon: Waves,
        color: 'bg-rose-100 text-rose-600',
        durationSeconds: 60,
        steps: [
            { text: "Nouse seisomaan, jos voit.", duration: 5000 },
            { text: "Aloita ravistamalla käsiä.", duration: 10000, instruction: "Anna ranteiden olla rentoina." },
            { text: "Ota mukaan hartiat.", duration: 10000, instruction: "Päästä äänihuulista huokaus." },
            { text: "Ravistele koko kehoa.", duration: 15000, instruction: "Kuin koira vedestä noustessaan." },
            { text: "Pysähdy ja tunne virtaus.", duration: 10000 }
        ]
    },
    {
        id: 'breath',
        title: 'Laatikkohengitys',
        description: 'Laske syketasoa rytmisellä hengityksellä.',
        icon: Wind,
        color: 'bg-sky-100 text-sky-600',
        durationSeconds: 120,
        steps: [
            { text: "Hengitä sisään...", duration: 4000 },
            { text: "Pidätä...", duration: 4000 },
            { text: "Hengitä ulos...", duration: 4000 },
            { text: "Pidätä...", duration: 4000 }
        ]
    },
    {
        id: 'ground',
        title: '5-4-3-2-1 Maadoitus',
        description: 'Palauta mieli nykyhetkeen aistien avulla.',
        icon: TreeDeciduous,
        color: 'bg-emerald-100 text-emerald-600',
        durationSeconds: 90,
        steps: [
            { text: "Etsi 5 asiaa, jotka näet.", duration: 15000, instruction: "Nimeä ne mielessäsi." },
            { text: "Etsi 4 asiaa, joita voit koskettaa.", duration: 15000, instruction: "Tunne tekstuuri sormillasi." },
            { text: "Etsi 3 ääntä, jotka kuulet.", duration: 15000, instruction: "Liikenne? Tuuletin? Oma hengitys?" },
            { text: "Etsi 2 asiaa, jotka haistat.", duration: 10000 },
            { text: "Etsi 1 asia, jota voit maistaa.", duration: 10000, instruction: "Tai tunne suusi maku." }
        ]
    },
    {
        id: 'relax',
        title: 'Progressiivinen Relaksaatio',
        description: 'Jännitä ja rentouta lihakset vuorotellen.',
        icon: Flame,
        color: 'bg-amber-100 text-amber-600',
        durationSeconds: 180,
        steps: [
            { text: "Purista kädet nyrkkiin...", duration: 5000 },
            { text: "Ja päästä aivan rennoksi.", duration: 10000 },
            { text: "Vedä hartiat korviin...", duration: 5000 },
            { text: "Pudota hartiat alas.", duration: 10000 },
            { text: "Purista silmät tiukasti kiinni...", duration: 5000 },
            { text: "Anna kasvojen sulaa rennoksi.", duration: 10000 }
        ]
    }
];

// --- COMPONENT ---

export default function SomaticRelease({
    moduleId,
    onComplete,
    onExit
}: {
    moduleId?: string;
    onComplete: (score: number) => void;
    onExit: () => void;
}) {
    const [view, setView] = useState<ViewState>('intro');
    const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
    const [stepIndex, setStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    // Timer logic for Breathing/Steps
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (view === 'exercise' && activeExercise && isPlaying) {
            const currentStep = activeExercise.steps[stepIndex % activeExercise.steps.length];
            // If it's the "breath" exercise, we loop the steps indefinitely until user stops or 2 mins pass? 
            // Simplified: Just loop defined steps for now or sequential.

            // For Box Breathing, we want it to loop properly
            const isLooping = activeExercise.id === 'breath' || activeExercise.id === 'relax';

            interval = setInterval(() => {
                setStepIndex(prev => {
                    const next = prev + 1;
                    if (next >= activeExercise.steps.length) {
                        if (activeExercise.id === 'breath') return 0; // Loop breathing forever until manual stop? Or fixed cycles.
                        // For others, finish
                        setIsPlaying(false);
                        setTimeout(() => setView('debrief'), 1000);
                        return prev;
                    }
                    return next;
                });
            }, currentStep.duration);
        }

        return () => clearInterval(interval);
    }, [view, activeExercise, isPlaying, stepIndex]);

    // Box Breathing Visualizer Logic (separate ticker for smooth animation if needed)
    // Using CSS/Framer transitions driven by key 'stepIndex' is easier.

    const startExercise = (ex: Exercise) => {
        setActiveExercise(ex);
        setStepIndex(0);
        setIsPlaying(true);
        setView('exercise');
    };

    const finishSession = () => {
        onComplete(100);
    };

    return (
        <div className="relative min-h-[600px] w-full bg-[#FAFAF9] rounded-[2rem] p-6 md:p-8 flex flex-col gap-6 border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C]">

            {/* HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] flex items-center justify-center text-[#166534]">
                        <HeartPulse className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black uppercase tracking-widest text-[#292524]">Somaattinen Vapautus</h2>
                        <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">Kehon & Mielen Toipuminen</span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onExit} className="hover:bg-[#F5F5F4] text-[#78716C]">
                    <X className="w-5 h-5" />
                </Button>
            </div>

            <div className="flex-1 relative flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">

                    {/* INTRO */}
                    {view === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="max-w-2xl text-center space-y-8"
                        >
                            <h1 className="text-3xl font-serif font-medium text-[#292524]">Miksi keho muistaa?</h1>
                            <p className="text-lg text-[#57534E] leading-relaxed">
                                Trauma ja krooninen stressi eivät ole vain "päässäsi". Ne varastoituvat kehoon jännityksenä, valppautena tai turtumuksena.
                                Jotta mieli voi rauhoittua, kehon täytyy ensin tuntea olevansa turvassa.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-[#78716C]">
                                <div className="bg-white p-4 rounded-2xl border border-[#E7E5E4]">
                                    <div className="font-bold mb-1 block">1. Aktivoi</div>
                                    Vagus-hermo
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-[#E7E5E4]">
                                    <div className="font-bold mb-1 block">2. Pura</div>
                                    Stressihormonit
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-[#E7E5E4]">
                                    <div className="font-bold mb-1 block">3. Palauta</div>
                                    Turvallisuus
                                </div>
                            </div>
                            <Button onClick={() => setView('menu')} size="lg" className="bg-[#166534] hover:bg-[#14532D] text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-emerald-900/10">
                                Valitse harjoitus <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* MENU */}
                    {view === 'menu' && (
                        <motion.div
                            key="menu"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full max-w-4xl grid md:grid-cols-2 gap-4"
                        >
                            {EXERCISES.map((ex) => (
                                <Card
                                    key={ex.id}
                                    onClick={() => startExercise(ex)}
                                    className="p-6 cursor-pointer hover:shadow-md transition-all border-[#E7E5E4] hover:border-[#166534]/30 group bg-white"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", ex.color)}>
                                            <ex.icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-[#292524] mb-1 group-hover:text-[#166534] transition-colors">{ex.title}</h3>
                                            <p className="text-sm text-[#78716C] mb-3">{ex.description}</p>
                                            <Badge variant="secondary" className="bg-[#F5F5F4] text-[#78716C]">{ex.durationSeconds} sek</Badge>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-[#D6D3D1] group-hover:text-[#166534] self-center" />
                                    </div>
                                </Card>
                            ))}
                        </motion.div>
                    )}

                    {/* EXERCISE PLAYER */}
                    {view === 'exercise' && activeExercise && (
                        <motion.div
                            key="exercise"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full max-w-2xl flex flex-col items-center text-center space-y-12"
                        >
                            <div className="relative w-64 h-64 flex items-center justify-center">
                                {/* Visualizer Circles */}
                                <motion.div
                                    animate={{
                                        scale: activeExercise.id === 'breath'
                                            ? [1, 1.5, 1.5, 1] // Breath pattern
                                            : [1, 1.05, 1] // Gentle pulse for others
                                    }}
                                    transition={{
                                        duration: activeExercise.id === 'breath' ? 16 : 4, // 16s total cycle for box breath? 4+4+4+4=16
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        times: activeExercise.id === 'breath' ? [0, 0.25, 0.5, 0.75] : [0, 0.5, 1]
                                    }}
                                    className={cn("absolute inset-0 rounded-full opacity-20 filter blur-xl", activeExercise.color.split(' ')[0])}
                                />
                                <div className={cn("w-32 h-32 rounded-full flex items-center justify-center shadow-sm relative z-10", activeExercise.color)}>
                                    <activeExercise.icon className="w-12 h-12" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-3xl font-serif text-[#292524]">
                                    {activeExercise.steps[stepIndex % activeExercise.steps.length].text}
                                </h2>
                                {activeExercise.steps[stepIndex % activeExercise.steps.length].instruction && (
                                    <p className="text-xl text-[#78716C]">
                                        {activeExercise.steps[stepIndex % activeExercise.steps.length].instruction}
                                    </p>
                                )}
                            </div>

                            <Button
                                variant="outline"
                                onClick={() => setView('debrief')}
                                className="rounded-full px-8 py-6 text-slate-500 hover:text-slate-800"
                            >
                                Lopeta harjoitus
                            </Button>
                        </motion.div>
                    )}

                    {/* DEBRIEF */}
                    {view === 'debrief' && (
                        <motion.div
                            key="debrief"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="max-w-xl text-center space-y-8"
                        >
                            <CheckCircle2 className="w-20 h-20 text-[#166534] mx-auto opacity-20" />
                            <h2 className="text-2xl font-bold text-[#292524]">Miltä kehossasi tuntuu nyt?</h2>
                            <p className="text-[#57534E]">
                                Pienikin hetki hermoston rauhoittumista auttaa palautumisessa.
                                Voit palata tähän aina kun tunnet olosi ylivireäksi tai jähmeäksi.
                            </p>

                            <div className="flex gap-4 justify-center pt-8">
                                <Button onClick={() => setView('menu')} variant="outline" className="px-8 py-6 rounded-xl">
                                    <RotateCcw className="mr-2 w-4 h-4" /> Tee toinen harjoitus
                                </Button>
                                <Button onClick={finishSession} className="bg-[#292524] hover:bg-[#44403C] text-white px-8 py-6 rounded-xl">
                                    Palaa etusivulle <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
