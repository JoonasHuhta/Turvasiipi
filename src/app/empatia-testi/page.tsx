"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { empathyQuestions, getEmpathyProfile, EmpathyProfile } from "@/data/empathy-test";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Heart, Scale, ChevronRight, RotateCcw, Trophy, ArrowRight, Shield } from "lucide-react";
import { useProgress } from "@/context/ProgressContext";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function EmpathyTestPage() {
    const { completeModule } = useProgress();
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'results'>('intro');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});

    const handleAnswer = (value: number) => {
        setAnswers(prev => ({ ...prev, [empathyQuestions[currentIndex].id]: value }));

        if (currentIndex < empathyQuestions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setGameState('results');
            completeModule('empathy_test');
        }
    };

    const reset = () => {
        setGameState('intro');
        setCurrentIndex(0);
        setAnswers({});
    };

    const calculateScores = () => {
        const scores = { cognitive: 0, affective: 0, moral: 0 };
        empathyQuestions.forEach(q => {
            scores[q.category] += (answers[q.id] || 0);
        });
        return scores;
    };

    const profile = gameState === 'results' ? getEmpathyProfile(calculateScores()) : null;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* --- HEADER --- */}
            <header className="bg-white border-b border-slate-200 p-4 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                            <Brain className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="font-black uppercase tracking-tight text-slate-900 leading-none">Empatia-Spektri</h1>
                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Kognitiivinen • Affektiivinen • Moraalinen</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <AnimatePresence mode="wait">

                    {/* --- INTRO --- */}
                    {gameState === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="max-w-2xl w-full"
                        >
                            <Card className="border-none shadow-2xl overflow-hidden rounded-3xl">
                                <div className="bg-slate-900 p-12 text-center text-white space-y-6">
                                    <h2 className="text-4xl font-black leading-none">Tunne itsesi, <br />suojaa muita.</h2>
                                    <p className="text-slate-400 text-lg">
                                        Empatia ei ole vain "tuntemista" – se on myös ymmärtämistä ja toimintaa.
                                        Tämä testi kartoittaa empatiasi vahvuudet kolmella eri tasolla.
                                    </p>
                                </div>
                                <CardContent className="p-8 space-y-8 bg-white">
                                    <div className="grid grid-cols-3 gap-4">
                                        <IconFeature icon={Brain} label="Järki" color="text-blue-500" />
                                        <IconFeature icon={Heart} label="Tunne" color="text-red-500" />
                                        <IconFeature icon={Scale} label="Teot" color="text-emerald-500" />
                                    </div>
                                    <Button
                                        onClick={() => setGameState('playing')}
                                        className="w-full h-16 rounded-full text-xl font-black bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-900/10"
                                    >
                                        Aloita testi <ArrowRight className="ml-2 w-6 h-6" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* --- PLAYING --- */}
                    {gameState === 'playing' && (
                        <motion.div
                            key="playing"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-2xl w-full space-y-8"
                        >
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                                    <span>Kysymys {currentIndex + 1} / {empathyQuestions.length}</span>
                                    <span>{Math.round(((currentIndex) / empathyQuestions.length) * 100)}%</span>
                                </div>
                                <Progress value={((currentIndex) / empathyQuestions.length) * 100} className="h-2 bg-slate-200" />
                            </div>

                            <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
                                <CardHeader className="p-10 bg-white border-b border-slate-50">
                                    <Badge className={cn(
                                        "w-fit mb-4 uppercase font-black text-[10px] tracking-widest",
                                        empathyQuestions[currentIndex].category === 'cognitive' ? "bg-blue-100 text-blue-700" :
                                            empathyQuestions[currentIndex].category === 'affective' ? "bg-red-100 text-red-700" :
                                                "bg-emerald-100 text-emerald-700"
                                    )}>
                                        {empathyQuestions[currentIndex].category}
                                    </Badge>
                                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                                        {empathyQuestions[currentIndex].text}
                                    </h3>
                                </CardHeader>
                                <CardContent className="p-8 bg-slate-50/30">
                                    <div className="grid gap-3">
                                        {[
                                            { label: 'Täysin samaa mieltä', value: 4 },
                                            { label: 'Jokseenkin samaa mieltä', value: 3 },
                                            { label: 'Jokseenkin eri mieltä', value: 2 },
                                            { label: 'Täysin eri mieltä', value: 1 }
                                        ].map((opt) => (
                                            <Button
                                                key={opt.value}
                                                variant="outline"
                                                onClick={() => handleAnswer(opt.value)}
                                                className="h-14 justify-start text-lg font-bold px-8 rounded-2xl border-slate-200 bg-white hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                                            >
                                                {opt.label}
                                            </Button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* --- RESULTS --- */}
                    {gameState === 'results' && profile && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-2xl w-full"
                        >
                            <Card className="border-none shadow-2xl overflow-hidden rounded-3xl">
                                <div className="bg-indigo-600 p-12 text-center text-white space-y-4">
                                    <div className="text-7xl mb-4">{profile.icon}</div>
                                    <Badge className="bg-white/20 text-white border-white/20 uppercase font-black tracking-widest">Profiilisi on valmis</Badge>
                                    <h2 className="text-4xl font-black leading-none">{profile.title}</h2>
                                </div>
                                <CardContent className="p-10 space-y-8 bg-white">
                                    <p className="text-slate-600 text-lg leading-relaxed text-center">
                                        {profile.description}
                                    </p>

                                    <div className="grid grid-cols-3 gap-2">
                                        <ScoreBar label="Järki" score={calculateScores().cognitive} max={16} color="bg-blue-500" />
                                        <ScoreBar label="Tunne" score={calculateScores().affective} max={16} color="bg-red-500" />
                                        <ScoreBar label="Teot" score={calculateScores().moral} max={16} color="bg-emerald-500" />
                                    </div>

                                    <div className="pt-6 space-y-4">
                                        <Link href="/dashboard">
                                            <Button className="w-full h-16 rounded-full text-xl font-black bg-slate-900 hover:bg-slate-800">
                                                Katso palkinnot <Trophy className="ml-2 w-6 h-6" />
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" onClick={reset} className="w-full text-slate-400 font-bold">
                                            <RotateCcw className="mr-2 w-4 h-4" /> Tee testi uudelleen
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                </AnimatePresence>
            </main>
        </div>
    );
}

function IconFeature({ icon: Icon, label, color }: { icon: any, label: string, color: string }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className={cn("w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center", color)}>
                <Icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">{label}</span>
        </div>
    );
}

function ScoreBar({ label, score, max, color }: { label: string, score: number, max: number, color: string }) {
    const perc = (score / max) * 100;
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${perc}%` }}
                    className={cn("h-full", color)}
                />
            </div>
        </div>
    );
}
