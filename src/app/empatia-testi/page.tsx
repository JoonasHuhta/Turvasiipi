"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { empathyQuestions, getEmpathyProfile, EmpathyProfile } from "@/data/empathy-test";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Fingerprint, Heart, Scale, ChevronRight, RotateCcw, Trophy, ArrowRight, BookOpen } from "lucide-react";
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
        <div className="container mx-auto px-6 sm:px-8 max-w-screen-lg py-32 space-y-24">

            {/* Header - Left Aligned "Human" Style */}
            <header className="space-y-12 max-w-2xl">
                <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border-b border-[#5B4B8A] pb-1 inline-block">
                    Empatia-Spektri
                </span>

                <h1 className="text-4xl md:text-5xl font-bold text-[#2B2B2B] leading-[1.1] tracking-tight">
                    Tunne itsesi, <br />
                    <span className="text-[#4A4A4A] font-normal italic">suojaa muita</span>
                </h1>

                <div className="space-y-6 max-w-xl">
                    <p className="text-lg text-[#4A4A4A] leading-relaxed">
                        Empatia ei ole vain "tuntemista" – se on myös ymmärtämistä ja toimintaa.
                    </p>
                    <p className="text-lg text-[#4A4A4A] leading-relaxed">
                        Tämä testi kartoittaa empatiasi vahvuudet kolmella eri tasolla: kognitiivisella, affektiivisella ja moraalisella.
                    </p>
                </div>
            </header>

            {/* Main Interaction Area */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <AnimatePresence mode="wait">

                    {/* --- INTRO CTA --- */}
                    {gameState === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-12 border-t border-[#E8DDD0] pt-12"
                        >
                            <div className="grid md:grid-cols-3 gap-8 max-w-3xl">
                                <FeatureItem icon={Fingerprint} title="Järki" desc="Kognitiivinen empatia" color="text-[#5B4B8A]" />
                                <FeatureItem icon={Heart} title="Tunne" desc="Affektiivinen empatia" color="text-rose-600" />
                                <FeatureItem icon={Scale} title="Teot" desc="Moraalinen empatia" color="text-emerald-700" />
                            </div>

                            <Button
                                onClick={() => setGameState('playing')}
                                className="bg-[#2B2B2B] text-white hover:bg-[#4A4A4A] px-8 py-6 text-lg rounded-full font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all hover:scale-105"
                            >
                                Aloita testi <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* --- PLAYING --- */}
                    {gameState === 'playing' && (
                        <motion.div
                            key="playing"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-8 border-t border-[#E8DDD0] pt-12 max-w-3xl"
                        >
                            <div className="flex justify-between items-baseline border-b border-[#E8DDD0] pb-4">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#5B4B8A]">
                                    Kysymys {currentIndex + 1} / {empathyQuestions.length}
                                </span>
                                <span className="text-[10px] uppercase tracking-widest text-[#4A4A4A]">
                                    {CATEGORY_LABELS[empathyQuestions[currentIndex].category]}
                                </span>
                            </div>

                            <div className="space-y-12">
                                <h3 className="text-3xl font-serif font-bold text-[#2B2B2B] leading-tight">
                                    {empathyQuestions[currentIndex].text}
                                </h3>

                                <div className="grid gap-3">
                                    {[
                                        { label: 'Täysin samaa mieltä', value: 4 },
                                        { label: 'Jokseenkin samaa mieltä', value: 3 },
                                        { label: 'Jokseenkin eri mieltä', value: 2 },
                                        { label: 'Täysin eri mieltä', value: 1 }
                                    ].map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => handleAnswer(opt.value)}
                                            className="w-full text-left p-6 bg-white border border-[#E8DDD0] hover:border-[#5B4B8A] hover:bg-[#FDFBF7] transition-all group rounded-sm flex items-center justify-between"
                                        >
                                            <span className="text-lg text-[#2B2B2B] group-hover:text-[#5B4B8A] font-medium font-serif">
                                                {opt.label}
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-[#E8DDD0] group-hover:text-[#5B4B8A] opacity-0 group-hover:opacity-100 transition-all" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* --- RESULTS --- */}
                    {gameState === 'results' && profile && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-12 border-t border-[#E8DDD0] pt-12"
                        >
                            <div className="grid md:grid-cols-2 gap-12 items-start">
                                {/* Left Col: Profile Intro */}
                                <div className="space-y-6">
                                    <div className="inline-block px-3 py-1 bg-[#2B2B2B] text-white text-xs font-bold uppercase tracking-widest rounded-sm">
                                        Sinun profiilisi
                                    </div>
                                    <h2 className="text-4xl font-serif font-bold text-[#2B2B2B] leading-tight flex items-center gap-4">
                                        <span className="text-5xl">{profile.icon}</span>
                                        {profile.title}
                                    </h2>
                                    <p className="text-lg text-[#4A4A4A] leading-relaxed italic border-l-4 border-[#E8DDD0] pl-6 py-2">
                                        {profile.description}
                                    </p>

                                    <div className="pt-6 flex flex-wrap gap-4">
                                        <Link href="/profiili">
                                            <Button className="bg-[#2B2B2B] text-white hover:bg-[#4A4A4A] h-12 px-8 uppercase font-bold tracking-widest rounded-sm text-xs">
                                                Katso palkinnot <Trophy className="ml-2 w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <Button variant="outline" onClick={reset} className="border-[#2B2B2B] text-[#2B2B2B] hover:bg-[#2B2B2B] hover:text-white h-12 px-8 uppercase font-bold tracking-widest rounded-sm text-xs">
                                            <RotateCcw className="mr-2 w-4 h-4" /> Uusi testi
                                        </Button>
                                    </div>
                                </div>

                                {/* Right Col: Detailed Scores */}
                                <div className="bg-[#FDFBF7] border border-[#E8DDD0] p-8 rounded-sm space-y-8">
                                    <h3 className="font-bold text-xs uppercase tracking-widest text-[#4A4A4A] border-b border-[#E8DDD0] pb-4 flex items-center gap-2">
                                        <BookOpen className="w-4 h-4" /> Tulosten erittely
                                    </h3>

                                    <ScoreRow
                                        label="Kognitiivinen (Järki)"
                                        score={calculateScores().cognitive}
                                        max={16}
                                        color="bg-[#5B4B8A]"
                                        desc="Kyky ymmärtää toisen näkökulma."
                                    />
                                    <ScoreRow
                                        label="Affektiivinen (Tunne)"
                                        score={calculateScores().affective}
                                        max={16}
                                        color="bg-rose-600"
                                        desc="Kyky tuntea toisen tunteet."
                                    />
                                    <ScoreRow
                                        label="Moraalinen (Teot)"
                                        score={calculateScores().moral}
                                        max={16}
                                        color="bg-emerald-700"
                                        desc="Halukkuus toimia oikein."
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

function FeatureItem({ icon: Icon, title, desc, color }: { icon: any, title: string, desc: string, color: string }) {
    return (
        <div className="flex items-start gap-4 group">
            <div className={cn("w-10 h-10 rounded-full bg-white border border-[#E8DDD0] flex items-center justify-center shrink-0 group-hover:border-current transition-colors", color)}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <h3 className="font-bold text-[#2B2B2B] text-lg">{title}</h3>
                <p className="text-sm text-[#4A4A4A]">{desc}</p>
            </div>
        </div>
    );
}

function ScoreRow({ label, score, max, color, desc }: { label: string, score: number, max: number, color: string, desc: string }) {
    const perc = (score / max) * 100;
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-sm text-[#2B2B2B]">{label}</span>
                <span className="font-mono text-xs font-bold text-[#5B4B8A]">{Math.round(perc)}%</span>
            </div>
            <div className="w-full bg-white border border-[#E8DDD0] h-2 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${perc}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={cn("h-full", color)}
                />
            </div>
            <p className="text-xs text-[#4A4A4A] italic pt-1">{desc}</p>
        </div>
    );
}
