"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { impactQuestions, getImpactProfile, ImpactProfileType } from "@/data/impact-test";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, RotateCcw, Radar, Shield, Zap, Lock, Info, ChevronRight, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { CheckItem } from "./CheckItem";
import { useProgress } from "@/context/ProgressContext";

export default function ImpactProfilePage() {
    const { t } = useLanguage();
    const { completeModule } = useProgress();
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'results'>('intro');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [scores, setScores] = useState({ pressure: 0, power: 0, constructive: 0 });

    const handleAnswer = (value: number) => {
        // Store raw answer (1-5)
        const questionId = impactQuestions[currentIndex].id;
        setAnswers(prev => ({ ...prev, [questionId]: value }));

        // Calculate immediate impact on scores
        const category = impactQuestions[currentIndex].category;

        // Simple scoring logic: 
        // If value > 3 (Agree/Strongly Agree), add to the category score.
        // If value < 3 (Disagree), no points added to that category (or could be inverse).
        // Let's stick to positive accumulation for simplicity of 'traits'.
        if (value > 3) {
            setScores(prev => ({
                ...prev,
                [category]: prev[category] + (value - 3) // Add 1 or 2 points
            }));
        }

        if (currentIndex < impactQuestions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setGameState('results');
            completeModule('impact_profile');
        }
    };

    const reset = () => {
        setGameState('intro');
        setCurrentIndex(0);
        setAnswers({});
        setScores({ pressure: 0, power: 0, constructive: 0 });
    };

    // Scroll to top
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentIndex, gameState]);

    const resultProfile = gameState === 'results' ? getImpactProfile(scores) : 'A';

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-[#E8DDD0] p-4 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#5B4B8A] text-white flex items-center justify-center shadow-md">
                            <Radar className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="font-serif font-bold text-[#2B2B2B] leading-none text-lg">
                                {t('impact_profile.nav_title')}
                            </h1>
                            <span className="text-[10px] text-[#5B4B8A] uppercase font-mono tracking-widest hidden sm:inline">
                                {t('impact_profile.hero.subtitle')}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center pt-8 p-4 md:justify-center">
                <AnimatePresence mode="wait">

                    {/* INTRO */}
                    {gameState === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-3xl w-full"
                        >
                            <Card className="border border-[#E8DDD0] shadow-sm overflow-hidden rounded-sm bg-[#FDFBF7]">
                                <div className="grid md:grid-cols-2">
                                    <div className="bg-[#5B4B8A] p-8 md:p-12 text-white flex flex-col justify-center relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('/noise.png')]" />
                                        {/* Decorative circles */}
                                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                                        <div className="absolute bottom-10 -left-10 w-32 h-32 bg-indigo-500/30 rounded-full blur-2xl" />

                                        <div className="relative z-10 space-y-6">
                                            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-sm flex items-center justify-center border border-white/20">
                                                <Radar className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight mb-4">
                                                    {t('impact_profile.hero.title')}
                                                </h2>
                                                <div className="h-1 w-12 bg-white/30 rounded-full mb-4" />
                                                <p className="text-white/90 text-lg font-serif italic leading-relaxed">
                                                    &ldquo;{t('impact_profile.hero.subtitle')}&rdquo;
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 md:p-12 bg-white flex flex-col justify-between space-y-8">
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <h3 className="font-bold uppercase tracking-widest text-[#5B4B8A] text-xs">Mistä on kyse?</h3>
                                                <p className="text-[#4A4A4A] leading-relaxed">
                                                    Moni meistä pelkää olevansa "se hankala ihminen". Mutta harva paha olo syntyy ilkeydestä. Se syntyy toimintamalleista, jotka ovat menneet liian pitkälle.
                                                </p>
                                            </div>

                                            <div className="grid gap-3">
                                                <CheckItem text="Tunnista, milloin vaativuus muuttuu uuvuttamiseksi." />
                                                <CheckItem text="Ymmärrä, miksi hyvä tarkoitus voi kääntyä peloksi." />
                                                <CheckItem text="Löydä tapa vaikuttaa ilman, että jyräät muita." />
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4 border-t border-[#E8DDD0]">
                                            <Button
                                                onClick={() => setGameState('playing')}
                                                className="w-full h-14 rounded-sm text-lg font-serif font-bold bg-[#2B2B2B] hover:bg-[#5B4B8A] text-white transition-all shadow-sm group"
                                            >
                                                {t('impact_profile.hero.start_btn')}
                                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                            <p className="text-center text-xs text-[#4A4A4A] flex items-center justify-center gap-1.5 opacity-70">
                                                <Lock className="w-3 h-3" />
                                                {t('impact_profile.results.anonymous_note')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {/* PLAYING */}
                    {gameState === 'playing' && (
                        <motion.div
                            key="playing"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="max-w-2xl w-full space-y-6"
                        >
                            <div className="space-y-2">
                                <div className="flex justify-between text-[11px] font-mono uppercase tracking-widest text-[#5B4B8A]">
                                    <span>Kysymys {currentIndex + 1} / {impactQuestions.length}</span>
                                    <span>{Math.round(((currentIndex) / impactQuestions.length) * 100)}%</span>
                                </div>
                                <Progress value={((currentIndex) / impactQuestions.length) * 100} className="h-2 bg-[#E8DDD0]" />
                            </div>

                            <Card className="border border-[#E8DDD0] shadow-lg rounded-2xl overflow-hidden bg-white min-h-[400px] flex flex-col">
                                <CardHeader className="p-8 md:p-12 bg-[#FDFBF7] border-b border-[#E8DDD0] flex-1 flex items-center justify-center">
                                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#2B2B2B] text-center leading-tight">
                                        &ldquo;{impactQuestions[currentIndex].text}&rdquo;
                                    </h3>
                                </CardHeader>
                                <CardContent className="p-6 md:p-8 bg-white grid gap-3">
                                    {[
                                        { l: 'Täysin samaa mieltä', v: 5 },
                                        { l: 'Jokseenkin samaa mieltä', v: 4 },
                                        { l: 'Ei samaa eikä eri mieltä', v: 3 },
                                        { l: 'Jokseenkin eri mieltä', v: 2 },
                                        { l: 'Täysin eri mieltä', v: 1 }
                                    ].map((opt) => (
                                        <Button
                                            key={opt.v}
                                            variant="outline"
                                            onClick={() => handleAnswer(opt.v)}
                                            className="h-auto py-4 justify-between text-base font-medium px-6 rounded-xl border-[#E8DDD0] hover:border-[#5B4B8A] hover:bg-[#FDFBF7] hover:text-[#5B4B8A] transition-all text-[#4A4A4A] group"
                                        >
                                            <span>{opt.l}</span>
                                            {opt.v > 3 ? (
                                                <div className="w-3 h-3 rounded-full bg-[#5B4B8A] opacity-0 group-hover:opacity-100 transition-opacity" />
                                            ) : (
                                                <div className="w-3 h-3 rounded-full border border-[#5B4B8A] opacity-0 group-hover:opacity-100 transition-opacity" />
                                            )}
                                        </Button>
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* RESULTS */}
                    {gameState === 'results' && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-3xl w-full"
                        >
                            <ResultView profileType={resultProfile} onReset={reset} t={t} />
                        </motion.div>
                    )}

                </AnimatePresence>
            </main>
        </div>
    );
}

function Feature({ icon: Icon, label, text }: { icon: any, label: string, text: string }) {
    return (
        <div className="flex flex-col items-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-[#FDFBF7] border border-[#E8DDD0] flex items-center justify-center mb-3">
                <Icon className="w-6 h-6 text-[#5B4B8A]" />
            </div>
            <h3 className="font-bold text-[#2B2B2B] mb-1">{label}</h3>
            <p className="text-sm text-[#4A4A4A] leading-tight">{text}</p>
        </div>
    );
}

function ResultView({ profileType, onReset, t }: { profileType: ImpactProfileType, onReset: () => void, t: any }) {

    // Helper to get translated content safely
    const getProfileContent = (key: string) => t(`impact_profile.profiles.${profileType}.${key}`);

    const iconMap = {
        'A': '🌟', // Builder
        'B': '🔥', // Pressure Cooker
        'C': '🔒'  // Gatekeeper
    };

    const colorMap = {
        'A': 'bg-[#5B4B8A]',
        'B': 'bg-amber-600',
        'C': 'bg-slate-700'
    };

    return (
        <Card className="border-none shadow-2xl overflow-hidden rounded-3xl bg-white mb-12">

            {/* Header / Hero */}
            <div className={cn("p-10 text-center text-white relative overflow-hidden", colorMap[profileType] || 'bg-[#5B4B8A]')}>
                {/* Abstract BG shapes */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/noise.png')]" />

                <div className="text-7xl mb-4 relative z-10">{iconMap[profileType]}</div>
                <div className="relative z-10 space-y-2">
                    <span className="inline-block px-3 py-1 rounded-full border border-white/30 text-[10px] uppercase font-bold tracking-widest bg-black/10 backdrop-blur-sm">
                        {t('impact_profile.results.title')}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
                        {getProfileContent('title')}
                    </h2>
                    <p className="text-xl font-serif italic opacity-90">
                        &ldquo;{getProfileContent('subtitle')}&rdquo;
                    </p>
                </div>
            </div>

            <CardContent className="p-8 md:p-12 space-y-10 bg-white">

                {/* Visual Meter */}
                <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#E8DDD0] space-y-4">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-[#5B4B8A]">
                        <span>{t('impact_profile.results.constructive')}</span>
                        <span>{t('impact_profile.results.destructive')}</span>
                    </div>
                    <div className="h-4 bg-[#E8DDD0] rounded-full overflow-hidden relative">
                        {/* Render a marker based on profile type */}
                        <div
                            className="absolute top-0 bottom-0 w-2 bg-[#2B2B2B] rounded-full transition-all duration-1000 ease-out"
                            style={{
                                left: profileType === 'A' ? '15%' : profileType === 'B' ? '70%' : '90%'
                            }}
                        />
                        {/* Gradient background for the bar */}
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-amber-300 to-rose-500 opacity-30" />
                    </div>
                    <p className="text-center text-xs text-[#4A4A4A] italic">
                        {t('impact_profile.results.meter_label')}
                    </p>
                </div>

                {/* Description & Impact */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <Label>Kuvaus</Label>
                        <p className="text-[#4A4A4A] leading-relaxed">
                            {getProfileContent('description')}
                        </p>
                    </div>
                    <div className="space-y-4">
                        <Label>Vaikutus muihin</Label>
                        <p className="text-[#4A4A4A] leading-relaxed">
                            {getProfileContent('impact')}
                        </p>
                    </div>
                </div>

                <div className="h-px bg-[#E8DDD0]" />

                {/* Motivation & Why */}
                <div className="space-y-6">
                    <div>
                        <Label>Miksi tämä on tärkeää?</Label>
                        <p className="text-[#4A4A4A] leading-relaxed text-lg font-medium">
                            {getProfileContent('why')}
                        </p>
                    </div>

                    {getProfileContent('motivation') && (
                        <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-[#5B4B8A]">
                            <p className="text-[#2B2B2B] italic font-serif text-lg">
                                {getProfileContent('motivation')}
                            </p>
                        </div>
                    )}
                </div>

                {/* CTA / Next Step */}
                <div className="bg-[#2B2B2B] p-8 rounded-2xl text-white space-y-6 text-center">
                    <h3 className="font-bold uppercase tracking-widest text-sm text-white/70">Seuraava askel</h3>
                    <p className="text-lg md:text-xl font-serif">
                        {getProfileContent('next_step')}
                    </p>

                    {(profileType === 'B' || profileType === 'C') ? (
                        <Link href="/valmennus">
                            <Button className="w-full md:w-auto px-6 py-4 h-auto min-h-[3.5rem] bg-white text-[#2B2B2B] hover:bg-slate-100 font-bold text-lg rounded-xl whitespace-normal text-center leading-tight">
                                <span className="flex-1">
                                    {profileType === 'B' ? t('impact_profile.profiles.B.action_btn') : t('impact_profile.profiles.C.action_btn')}
                                </span>
                                <ChevronRight className="ml-2 w-5 h-5 shrink-0" />
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/valmennus">
                            <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
                                Siirry valmennukseen
                            </Button>
                        </Link>
                    )}
                </div>

                <div className="pt-4 text-center">
                    <Button variant="ghost" onClick={onReset} className="text-[#4A4A4A] hover:text-[#2B2B2B]">
                        <RotateCcw className="mr-2 w-4 h-4" /> Tee testi uudelleen
                    </Button>
                </div>

            </CardContent>
        </Card>
    );
}

function Label({ children }: { children: React.ReactNode }) {
    return <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#5B4B8A] mb-2">{children}</h4>;
}
