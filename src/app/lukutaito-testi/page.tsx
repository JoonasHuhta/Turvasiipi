"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { literacyScenarios, getLiteracyLevel } from "@/data/literacy-test";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle2, XCircle, ChevronRight, RotateCcw, Trophy, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { useProgress } from "@/context/ProgressContext";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IdentifyTab } from "./IdentifyTab";
import { HealthyWorkplaceTab } from "./HealthyWorkplaceTab";
import { AssessmentTool } from "@/components/assessment/AssessmentTool";


export default function LiteracyTestPage() {
    const { completeModule, awardBadge } = useProgress();
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'feedback' | 'finished'>('intro');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [lastResult, setLastResult] = useState<{ isCorrect: boolean } | null>(null);

    const handleAnswer = (userChoice: boolean) => {
        const scenario = literacyScenarios[currentIndex];
        const isCorrect = userChoice === scenario.isBullying;

        if (isCorrect) setScore(prev => prev + 1);
        setLastResult({ isCorrect });
        setGameState('feedback');
    };

    const nextScenario = () => {
        if (currentIndex < literacyScenarios.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setGameState('playing');
        } else {
            setGameState('finished');
            completeModule('literacy_test');
            if (score / literacyScenarios.length >= 0.85) {
                awardBadge('literacy_master');
            }
        }
    };

    const reset = () => {
        setGameState('intro');
        setCurrentIndex(0);
        setScore(0);
    };

    const currentScenario = literacyScenarios[currentIndex];

    // Quiz Content Component to keep main render clean
    const QuizContent = () => (
        <AnimatePresence mode="wait">
            {/* --- INTRO --- */}
            {gameState === 'intro' && (
                <motion.div
                    key="intro"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl w-full mx-auto"
                >
                    <Card className="border-none shadow-2xl overflow-hidden rounded-3xl">
                        <div className="bg-slate-900 p-12 text-center text-white space-y-6">
                            <h2 className="text-4xl font-black leading-none">Osaatko lukea <br />työpaikan kieltä?</h2>
                            <p className="text-slate-400 text-lg">
                                Kaikki ikävä ei ole kiusaamista, ja kaikki kiusaaminen ei näytä kiusaamiselta.
                                Testaa kykysi tunnistaa faktat 20 käytännön esimerkin avulla.
                            </p>
                        </div>
                        <CardContent className="p-8 space-y-6 bg-white">
                            <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                                <p className="text-sm text-emerald-900 font-medium">
                                    Testi perustuu työturvallisuuslakiin ja työpsykologiseen tutkimukseen kiusaamisen määritelmästä.
                                </p>
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
                    className="max-w-3xl w-full mx-auto space-y-8"
                >
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                            <span>Tapaus {currentIndex + 1} / {literacyScenarios.length}</span>
                            <span>{Math.round(((currentIndex) / literacyScenarios.length) * 100)}%</span>
                        </div>
                        <Progress value={((currentIndex) / literacyScenarios.length) * 100} className="h-2 bg-slate-200 shadow-inner" />
                    </div>

                    <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white">
                        <CardContent className="p-10 md:p-14 space-y-12">
                            <div className="space-y-4">
                                <Badge className="bg-slate-100 text-slate-500 border-none uppercase font-black text-[10px] tracking-widest">Skenaario</Badge>
                                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                                    "{currentScenario.text}"
                                </h3>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <Button
                                    onClick={() => handleAnswer(true)}
                                    className="h-20 rounded-2xl text-xl font-black bg-red-50 text-red-700 border-2 border-red-100 hover:bg-red-100 hover:border-red-200 transition-all flex flex-col gap-0 shadow-sm"
                                >
                                    Kyllä
                                    <span className="text-[10px] uppercase tracking-widest opacity-60">Tämä on kiusaamista</span>
                                </Button>
                                <Button
                                    onClick={() => handleAnswer(false)}
                                    className="h-20 rounded-2xl text-xl font-black bg-emerald-50 text-emerald-700 border-2 border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200 transition-all flex flex-col gap-0 shadow-sm"
                                >
                                    Ei
                                    <span className="text-[10px] uppercase tracking-widest opacity-60">Tämä EI ole kiusaamista</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            {/* --- FEEDBACK --- */}
            {gameState === 'feedback' && (
                <motion.div
                    key="feedback"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl w-full mx-auto"
                >
                    <Card className={cn(
                        "border-none shadow-2xl overflow-hidden rounded-3xl",
                        lastResult?.isCorrect ? "ring-4 ring-emerald-500/20" : "ring-4 ring-red-500/20"
                    )}>
                        <div className={cn(
                            "p-10 text-center text-white space-y-4",
                            lastResult?.isCorrect ? "bg-emerald-600" : "bg-red-600"
                        )}>
                            <div className="flex justify-center mb-2">
                                {lastResult?.isCorrect ? <CheckCircle2 className="w-16 h-16" /> : <XCircle className="w-16 h-16" />}
                            </div>
                            <h2 className="text-3xl font-black">{lastResult?.isCorrect ? 'Oikein!' : 'Väärin meni'}</h2>
                            <p className="text-white/80 font-bold uppercase tracking-widest text-sm">
                                Tämä {currentScenario.isBullying ? 'on' : 'ei ole'} kiusaamista.
                            </p>
                        </div>
                        <CardContent className="p-10 space-y-8 bg-white">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                                    <ShieldCheck className="w-4 h-4" /> Perustelu
                                </h4>
                                <p className="text-slate-700 text-lg leading-relaxed font-medium">
                                    {currentScenario.explanation}
                                </p>
                            </div>
                            <Button
                                onClick={nextScenario}
                                className="w-full h-16 rounded-full text-xl font-black bg-slate-900 hover:bg-slate-800"
                            >
                                Seuraava skenaario <ArrowRight className="ml-2 w-6 h-6" />
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            {/* --- FINISHED --- */}
            {gameState === 'finished' && (
                <motion.div
                    key="finished"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl w-full mx-auto"
                >
                    <Card className="border-none shadow-2xl overflow-hidden rounded-3xl">
                        <div className="bg-slate-900 p-12 text-center text-white space-y-6">
                            <Trophy className="w-20 h-20 text-yellow-400 mx-auto" />
                            <h2 className="text-4xl font-black">Testi suoritettu!</h2>
                            <div className="inline-flex items-end gap-2">
                                <span className="text-7xl font-black text-emerald-400">{score}</span>
                                <span className="text-2xl text-slate-500 font-bold mb-2">/ {literacyScenarios.length}</span>
                            </div>
                            <div className="space-y-1">
                                <Badge className="bg-emerald-500 text-white border-none uppercase font-black tracking-widest px-4 py-1">
                                    Taso: {getLiteracyLevel(score)}
                                </Badge>
                            </div>
                        </div>
                        <CardContent className="p-10 space-y-8 bg-white">
                            <p className="text-slate-600 text-lg leading-relaxed text-center font-medium">
                                Hienoa työtä! Lukutaidon parantaminen on ensimmäinen askel kohti työyhteisöä,
                                jossa kiusaamiselle ei ole sijaa. Jatka oppimista Turvasiiven muiden työkalujen avulla.
                            </p>
                            <div className="grid gap-4">
                                <Link href="/dashboard">
                                    <Button className="w-full h-16 rounded-full text-xl font-black bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20">
                                        Palaa hallintapaneeliin
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
    );

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* --- HEADER --- */}
            <div className="bg-white pt-12 pb-8 px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-slate-900 leading-none mb-4">
                    TUNNISTA <span className="text-indigo-600">TYÖYHTEISÖN TILA</span>
                </h1>
                <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
                    Terve työpaikka on perusta, josta kaikki lähtee. Tunnista, missä teidän yhteisönne menee.
                </p>
            </div>

            <main className="flex-1 max-w-5xl w-full mx-auto p-4 pb-20">
                <Tabs defaultValue="healthy" className="space-y-8">
                    <div className="flex justify-center overflow-x-auto pb-4 md:pb-0">
                        <TabsList className="h-14 p-1 rounded-full bg-white border border-slate-200 shadow-sm flex-nowrap inline-flex">
                            <TabsTrigger
                                value="healthy"
                                className="h-full rounded-full px-4 md:px-8 text-xs md:text-sm font-bold uppercase tracking-widest data-[state=active]:bg-emerald-500 data-[state=active]:text-white transition-all whitespace-nowrap"
                            >
                                ✅ Terve Työpaikka
                            </TabsTrigger>
                            <TabsTrigger
                                value="quiz"
                                className="h-full rounded-full px-4 md:px-8 text-xs md:text-sm font-bold uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-all whitespace-nowrap"
                            >
                                🔍 Pikatesti
                            </TabsTrigger>
                            <TabsTrigger
                                value="identify"
                                className="h-full rounded-full px-4 md:px-8 text-xs md:text-sm font-bold uppercase tracking-widest data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all whitespace-nowrap"
                            >
                                ⚖️ Varoitusmerkit
                            </TabsTrigger>
                            <TabsTrigger
                                value="assessment"
                                className="h-full rounded-full px-4 md:px-8 text-xs md:text-sm font-bold uppercase tracking-widest data-[state=active]:bg-pink-500 data-[state=active]:text-white transition-all whitespace-nowrap"
                            >
                                📊 Itsearviointi
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="healthy" className="focus-visible:outline-none">
                        <HealthyWorkplaceTab />
                    </TabsContent>

                    <TabsContent value="quiz" className="focus-visible:outline-none">
                        <QuizContent />
                    </TabsContent>

                    <TabsContent value="identify" className="focus-visible:outline-none">
                        <IdentifyTab />
                    </TabsContent>

                    <TabsContent value="assessment" className="focus-visible:outline-none">
                        <AssessmentTool />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
