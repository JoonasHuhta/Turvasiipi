"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { empathyQuestions, getEmpathyProfile, EmpathyProfile } from "@/data/empathy-test";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Fingerprint, Heart, Scale, ChevronRight, RotateCcw, Trophy, ArrowRight, Shield } from "lucide-react";
import { useProgress } from "@/context/ProgressContext";
import { cn } from "@/lib/utils";
import Link from "next/link";

const CATEGORY_LABELS: Record<string, string> = {
    cognitive: 'Kognitiivinen',
    affective: 'Affektiivinen',
    moral: 'Moraalinen'
};

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

    // Scroll to top when question or state changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentIndex, gameState]);

    const calculateScores = () => {
        const scores = { cognitive: 0, affective: 0, moral: 0 };
        empathyQuestions.forEach(q => {
            scores[q.category] += (answers[q.id] || 0);
        });
        return scores;
    };

    const profile = gameState === 'results' ? getEmpathyProfile(calculateScores()) : null;

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
            {/* --- HEADER --- */}
            <header className="bg-white border-b border-[#E8DDD0] p-4 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#FDFBF7] border border-[#E8DDD0] flex items-center justify-center text-[#5B4B8A] shadow-sm">
                            <Fingerprint className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="font-serif font-bold text-[#2B2B2B] leading-none">Empatia-Spektri</h1>
                            <span className="text-[9px] text-[#5B4B8A] uppercase font-mono tracking-widest border-b border-[#5B4B8A]/20">Kognitiivinen • Affektiivinen • Moraalinen</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center pt-6 md:justify-center p-4">
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
                            <Card className="border border-[#E8DDD0] shadow-sm overflow-hidden rounded-3xl bg-white">
                                <div className="bg-[#FDFBF7] p-12 text-center space-y-6 relative border-b border-[#E8DDD0]">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-[#5B4B8A]/20" />
                                    <h2 className="text-4xl font-serif font-bold text-[#2B2B2B] leading-tight">Tunne itsesi, <br />suojaa muita.</h2>
                                    <p className="text-[#4A4A4A] text-lg font-serif italic max-w-md mx-auto">
                                        Empatia ei ole vain "tuntemista" – se on myös ymmärtämistä ja toimintaa.
                                        Tämä testi kartoittaa empatiasi vahvuudet kolmella eri tasolla.
                                    </p>
                                </div>
                                <CardContent className="p-8 space-y-10 bg-white">
                                    <div className="grid grid-cols-3 gap-4">
                                        <IconFeature icon={Fingerprint} label="Järki" color="text-[#5B4B8A]" />
                                        <IconFeature icon={Heart} label="Tunne" color="text-rose-600" />
                                        <IconFeature icon={Scale} label="Teot" color="text-emerald-700" />
                                    </div>
                                    <Button
                                        onClick={() => setGameState('playing')}
                                        className="w-full h-16 rounded-2xl text-xl font-serif font-bold bg-[#2B2B2B] hover:bg-[#5B4B8A] text-white transition-colors shadow-lg"
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
                            className="max-w-2xl w-full space-y-4 md:space-y-8"
                        >
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-[#5B4B8A]">
                                    <span>Kysymys {currentIndex + 1} / {empathyQuestions.length}</span>
                                    <span>{Math.round(((currentIndex) / empathyQuestions.length) * 100)}%</span>
                                </div>
                                <Progress value={((currentIndex) / empathyQuestions.length) * 100} className="h-1.5 bg-[#E8DDD0]" />
                            </div>

                            <Card className="border border-[#E8DDD0] shadow-sm rounded-3xl overflow-hidden bg-white">
                                <CardHeader className="p-6 md:p-12 bg-[#FDFBF7] border-b border-[#E8DDD0]">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className={cn(
                                            "text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-sm border",
                                            empathyQuestions[currentIndex].category === 'cognitive' ? "border-[#5B4B8A]/20 text-[#5B4B8A]" :
                                                empathyQuestions[currentIndex].category === 'affective' ? "border-rose-600/20 text-rose-600" :
                                                    "border-emerald-700/20 text-emerald-700"
                                        )}>
                                            {CATEGORY_LABELS[empathyQuestions[currentIndex].category]}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#2B2B2B] leading-tight">
                                        {empathyQuestions[currentIndex].text}
                                    </h3>
                                </CardHeader>
                                <CardContent className="p-6 md:p-8 bg-white">
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
                                                className="h-auto py-4 justify-start text-base sm:text-lg font-serif font-bold px-6 sm:px-8 rounded-2xl border-[#E8DDD0] bg-white hover:border-[#5B4B8A] hover:bg-[#FDFBF7] transition-all text-[#2B2B2B] whitespace-normal text-left"
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
                                <div className="bg-[#5B4B8A] p-12 text-center text-white space-y-6 relative overflow-hidden">
                                    <div className="text-7xl relative z-10">{profile.icon}</div>
                                    <div className="space-y-2 relative z-10">
                                        <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest border border-white/20 px-2 py-0.5 rounded-sm">
                                            Profiili valmis
                                        </span>
                                        <h2 className="text-4xl font-serif font-bold leading-tight">{profile.title}</h2>
                                    </div>
                                    {/* Subtle decorative circle */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 font-serif" />
                                </div>
                                <CardContent className="p-8 md:p-12 space-y-8 bg-white">
                                    <p className="text-[#4A4A4A] text-lg leading-relaxed text-center font-serif italic">
                                        {profile.description}
                                    </p>

                                    <div className="grid grid-cols-3 gap-3">
                                        <ScoreBar label="Järki" score={calculateScores().cognitive} max={16} color="bg-[#5B4B8A]" />
                                        <ScoreBar label="Tunne" score={calculateScores().affective} max={16} color="bg-rose-600" />
                                        <ScoreBar label="Teot" score={calculateScores().moral} max={16} color="bg-emerald-700" />
                                    </div>

                                    <div className="pt-8 space-y-4">
                                        <Link href="/dashboard">
                                            <Button className="w-full h-16 rounded-2xl text-xl font-serif font-bold bg-[#2B2B2B] hover:bg-[#5B4B8A] text-white transition-colors shadow-lg">
                                                Katso palkinnot <Trophy className="ml-2 w-6 h-6" />
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" onClick={reset} className="w-full text-[#4A4A4A] font-medium hover:text-[#2B2B2B]">
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
        <div className="flex flex-col items-center gap-3">
            <div className={cn("w-14 h-14 rounded-2xl bg-[#FDFBF7] border border-[#E8DDD0] flex items-center justify-center shadow-sm", color)}>
                <Icon className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#5B4B8A]">{label}</span>
        </div>
    );
}

function ScoreBar({ label, score, max, color }: { label: string, score: number, max: number, color: string }) {
    const perc = (score / max) * 100;
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#5B4B8A]">{label}</span>
            </div>
            <div className="h-1.5 bg-[#E8DDD0] rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${perc}%` }}
                    className={cn("h-full", color)}
                />
            </div>
        </div>
    );
}
