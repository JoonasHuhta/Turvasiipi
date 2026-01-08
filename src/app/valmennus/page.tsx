"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { trainingScenarios, TrainingLevel, TrainingScenario } from "@/data/scenarios";
import {
    Brain,
    ArrowRight,
    CheckCircle2,
    XCircle,
    Lightbulb,
    ShieldCheck,
    RotateCcw,
    ChevronRight,
    Trophy,
    Target,
    Zap,
    History,
    X
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export default function TrainingPage() {
    const { t } = useLanguage();
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'feedback' | 'finished'>('intro');
    const [currentLevel, setCurrentLevel] = useState<TrainingLevel | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
    const [showHint, setShowHint] = useState(false);

    const filteredScenarios = currentLevel
        ? trainingScenarios.filter(s => s.level === currentLevel)
        : [];

    const startLevel = (level: TrainingLevel) => {
        setCurrentLevel(level);
        setCurrentIndex(0);
        setScore(0);
        setGameState('playing');
        setSelectedOptionId(null);
        setShowHint(false);
    };

    const currentScenario = filteredScenarios[currentIndex];

    const handleAnswer = (optionId: string) => {
        setSelectedOptionId(optionId);
        const option = currentScenario.options.find(o => o.id === optionId);
        if (option?.isCorrect) {
            setScore(prev => prev + 1);
        }
        setGameState('feedback');
    };

    const nextQuestion = () => {
        if (currentIndex < filteredScenarios.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOptionId(null);
            setShowHint(false);
            setGameState('playing');
        } else {
            setGameState('finished');
        }
    };

    const reset = () => {
        setGameState('intro');
        setCurrentLevel(null);
        setScore(0);
        setCurrentIndex(0);
    };

    const getTitle = (totalScore: number) => {
        if (totalScore <= 3) return "Havainnoija";
        if (totalScore <= 6) return "Kuvatun tunnistaja";
        if (totalScore <= 9) return "Todellisuuden suojelija";
        return "Tunnistamisen mestari";
    };

    // UI Colors
    const darkBg = "bg-slate-950 text-white";
    const accentColor = "text-indigo-400";

    return (
        <div className={cn("fixed inset-0 z-[100] flex flex-col font-sans overflow-hidden", darkBg)}>

            {/* 1. HEADER (Fixed) */}
            <header className="shrink-0 h-16 bg-slate-900/50 border-b border-white/5 px-6 flex items-center justify-between z-30 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <History className="w-5 h-5 text-indigo-400" />
                    <div className="flex flex-col">
                        <span className="font-black uppercase tracking-tighter text-sm">Valmennus</span>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest leading-none">
                            {gameState === 'intro' ? 'Valitse taso' : (currentLevel === 'easy' ? 'Taso 1' : currentLevel === 'medium' ? 'Taso 2' : 'Taso 3')}
                        </span>
                    </div>
                </div>

                {gameState !== 'intro' && gameState !== 'finished' && (
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none mb-1">Pisteet</span>
                            <span className={cn("text-xl font-black leading-none", accentColor)}>{score}</span>
                        </div>
                        <Link href="/quiz">
                            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white w-8 h-8">
                                <X className="w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                )}
            </header>

            {/* 2. PROGRESS BAR (Fixed below header) */}
            {gameState !== 'intro' && gameState !== 'finished' && (
                <div className="shrink-0 w-full px-6 pt-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                        <span>Progress</span>
                        <span>{currentIndex + 1} / {filteredScenarios.length}</span>
                    </div>
                    <Progress value={((currentIndex + 1) / filteredScenarios.length) * 100} className="h-1 bg-slate-800" />
                </div>
            )}

            {/* 3. MAIN CONTENT (Scrollable/Centered) */}
            <main className="flex-1 overflow-y-auto no-scrollbar relative overscroll-contain">
                <AnimatePresence mode="wait">

                    {/* INTRO */}
                    {gameState === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="min-h-full flex flex-col justify-start sm:justify-center px-6 pt-10 pb-20 md:py-12 max-w-4xl mx-auto space-y-12"
                        >
                            <div className="text-center space-y-6">
                                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none text-white">
                                    Tunnista <br /><span className={accentColor}>Kiusaamistaktiikat</span>
                                </h1>
                                <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                                    Opi tunnistamaan hienovarainen manipulointi ja mikroaggressiot käytännön skenaarioiden kautta.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                {[
                                    { level: 'easy' as TrainingLevel, title: 'Taso 1', desc: 'Perusteet', icon: Target, color: 'border-emerald-500/30 hover:border-emerald-500 bg-emerald-500/5' },
                                    { level: 'medium' as TrainingLevel, title: 'Taso 2', desc: 'Keskitaso', icon: Zap, color: 'border-indigo-500/30 hover:border-indigo-500 bg-indigo-500/5' },
                                    { level: 'hard' as TrainingLevel, title: 'Taso 3', desc: 'Mestari', icon: Brain, color: 'border-purple-500/30 hover:border-purple-500 bg-purple-500/5' },
                                ].map((step) => (
                                    <Card
                                        key={step.level}
                                        className="bg-slate-900 border-slate-800 cursor-pointer transition-all hover:scale-[1.02] active:scale-95 group border-2"
                                        onClick={() => startLevel(step.level)}
                                    >
                                        <CardHeader className="text-center p-6">
                                            <div className="mx-auto w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-3 group-hover:bg-slate-700 transition-colors">
                                                <step.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <CardTitle className="text-white uppercase font-black tracking-tight text-lg">{step.title}</CardTitle>
                                            <CardDescription className="text-slate-500 text-xs">{step.desc}</CardDescription>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* PLAYING / FEEDBACK CONTENT */}
                    {(gameState === 'playing' || gameState === 'feedback') && currentScenario && (
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="min-h-full flex flex-col justify-start sm:justify-center p-6 md:p-12 max-w-2xl mx-auto"
                        >
                            {/* HINT NOTIFICATION (Simulator style) */}
                            <AnimatePresence>
                                {showHint && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="absolute top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
                                    >
                                        <div className="bg-indigo-600/95 backdrop-blur text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-bold border border-indigo-500/30">
                                            <Lightbulb className="w-5 h-5 text-yellow-300 shrink-0" />
                                            <span>{currentScenario.hint}</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-6 py-6 md:py-10 pb-24">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <p className="text-lg md:text-3xl text-slate-100 leading-tight font-black uppercase tracking-tighter">
                                            {currentScenario.scenario}
                                        </p>
                                    </div>
                                    <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest opacity-80">
                                        {currentScenario.question}
                                    </h4>
                                </div>

                                {/* HINT BUTTON */}
                                {!selectedOptionId && !showHint && (
                                    <div className="flex justify-center">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setShowHint(true);
                                                setTimeout(() => setShowHint(false), 5000);
                                            }}
                                            className="text-slate-500 hover:text-indigo-400 uppercase font-black text-[9px] tracking-widest gap-2 h-8"
                                        >
                                            <Lightbulb className="w-4 h-4" /> Vihje
                                        </Button>
                                    </div>
                                )}

                                {/* FEEDBACK DETAIL */}
                                {gameState === 'feedback' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-slate-900 p-6 rounded-2xl border border-white/5 space-y-3 shadow-2xl"
                                    >
                                        <div className="flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest text-indigo-400">
                                            <ShieldCheck className="w-3 h-3" /> Analyysi & Perustelu
                                        </div>
                                        <p className="text-slate-300 leading-relaxed italic text-sm">
                                            {currentScenario.options.find(o => o.id === selectedOptionId)?.feedback}
                                        </p>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* FINISHED */}
                    {gameState === 'finished' && (
                        <motion.div
                            key="finished"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="min-h-full flex flex-col justify-start sm:justify-center p-6 py-12 max-w-lg mx-auto space-y-8 pb-32"
                        >
                            <div className="text-center space-y-4">
                                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-2" />
                                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-none">Valmennus suoritettu!</h2>
                                <p className="text-slate-500 text-sm">Olet edistynyt merkittävästi taktiikoiden tunnistamisessa.</p>
                            </div>

                            <Card className="bg-slate-900 border-indigo-500/30 overflow-hidden rounded-[2rem] shadow-2xl">
                                <div className="p-6 md:p-10 text-center space-y-6">
                                    <div className="space-y-1">
                                        <div className="text-slate-500 uppercase font-black tracking-widest text-[10px]">Loppupisteesi</div>
                                        <div className="text-5xl md:text-6xl font-black text-white">{score}<span className="text-xl text-slate-700">/{filteredScenarios.length}</span></div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="text-indigo-400 uppercase font-black tracking-widest text-[10px]">Arvonimesi</div>
                                        <div className="text-xl md:text-2xl font-black text-white uppercase italic tracking-tighter leading-tight">{getTitle(score)}</div>
                                    </div>

                                    <div className="pt-4 grid gap-3">
                                        <Button onClick={reset} variant="outline" className="border-slate-800 text-slate-400 hover:bg-slate-800 rounded-full h-12 uppercase font-black tracking-widest text-[10px]">
                                            <RotateCcw className="w-3 h-3 mr-2" /> Kokeile uudestaan
                                        </Button>
                                        <Link href="/quiz">
                                            <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 rounded-full uppercase font-black tracking-widest text-[10px]">
                                                Taktiikkapankkiin <ArrowRight className="w-3 h-3 ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                </AnimatePresence>
            </main>

            {/* 4. FOOTER: Answer Options (Fixed at bottom like Simulator) */}
            <AnimatePresence>
                {(gameState === 'playing' || gameState === 'feedback') && currentScenario && (
                    <motion.footer
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="shrink-0 bg-slate-950 border-t border-white/5 p-4 pb-8 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
                    >
                        <div className="max-w-lg mx-auto w-full flex flex-col gap-2">
                            {gameState === 'playing' ? (
                                currentScenario.options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleAnswer(option.id)}
                                        className="w-full text-left p-4 rounded-xl border-2 border-slate-800 bg-slate-900/50 hover:border-indigo-500 hover:bg-indigo-500/5 transition-all flex items-center justify-between group h-auto overflow-hidden"
                                    >
                                        <span className="text-xs md:text-sm font-bold leading-tight text-slate-300 group-hover:text-white uppercase tracking-tight break-words pr-2">
                                            {option.text}
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-indigo-400 transition-colors shrink-0" />
                                    </button>
                                ))
                            ) : (
                                <Button
                                    onClick={nextQuestion}
                                    size="lg"
                                    className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs md:text-lg font-black uppercase tracking-normal md:tracking-widest shadow-xl shadow-indigo-500/20 group px-4"
                                >
                                    <span className="truncate md:whitespace-normal">
                                        {currentIndex === filteredScenarios.length - 1 ? 'Katso lopulliset tulokset' : 'Seuraava kysymys'}
                                    </span>
                                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform shrink-0" />
                                </Button>
                            )}
                        </div>
                    </motion.footer>
                )}
            </AnimatePresence>

        </div>
    );
}
