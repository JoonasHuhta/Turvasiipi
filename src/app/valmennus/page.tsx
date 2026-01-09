"use client";

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
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
    Award,
    X
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { cn } from "@/lib/utils";

import { trainingHubData, TrainingCategory, TrainingModule } from "@/data/training-hub";
import { RTWWizard } from "@/components/training/RTWWizard";
import AssociationSimulation from "@/components/training/AssociationSimulation";
import BystanderSimulation from "@/components/training/BystanderSimulation";

export default function TrainingPage() {
    const { t } = useLanguage();
    const { completeModule, awardBadge, getCertificationProgress, isModuleCompleted } = useProgress();

    // VIEW STATE: hub | category | intro | playing | feedback | finished | rtw-wizard | association-sim | bystander-sim | concept-view | certification-complete
    const [view, setView] = useState<'hub' | 'category' | 'intro' | 'playing' | 'feedback' | 'finished' | 'rtw-wizard' | 'association-sim' | 'bystander-sim' | 'concept-view' | 'certification-complete'>('hub');
    const [selectedCategory, setSelectedCategory] = useState<TrainingCategory | null>(null);
    const [currentLevel, setCurrentLevel] = useState<TrainingLevel | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
    const [showHint, setShowHint] = useState(false);
    const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);
    const certProgress = getCertificationProgress();

    const filteredScenarios = currentLevel
        ? trainingScenarios.filter(s => s.level === currentLevel)
        : [];

    const startLevel = (level: TrainingLevel) => {
        setCurrentLevel(level);
        setCurrentIndex(0);
        setScore(0);
        setView('playing');
        setSelectedOptionId(null);
        setShowHint(false);
    };

    const startModule = (module: TrainingModule) => {
        if (module.isLocked) return;
        setCurrentModuleId(module.id);

        // Special handling for the Return to Work Wizard
        if (selectedCategory?.id === 'return' && module.id === 'path_12_week') {
            setView('rtw-wizard');
            return;
        }

        // Special handling for the Leisure & Association Simulation
        if (selectedCategory?.id === 'leisure' && (module.id === 'association_basics' || module.id === 'hobby_boundaries' || module.id === 'transferable_skills')) {
            setView('association-sim');
            return;
        }

        // Special handling for the existing tactical training (mapping basic/literacy to levels)
        if (selectedCategory?.id === 'literacy' && module.id === 'basic') {
            startLevel('easy');
            setView('intro');
            return;
        }

        if (selectedCategory?.id === 'interactive' && (module.id === 'empathy' || module.id === 'bystander')) {
            setView('bystander-sim');
            return;
        }

        if (selectedCategory?.id === 'research') {
            setView('concept-view');
            completeModule(module.id);
            return;
        }
    };

    const currentScenario = filteredScenarios[currentIndex];

    const handleAnswer = (optionId: string) => {
        setSelectedOptionId(optionId);
        const option = currentScenario.options.find(o => o.id === optionId);
        if (option?.isCorrect) {
            setScore(prev => prev + 1);
        }
        setView('feedback');
    };

    const nextQuestion = () => {
        if (currentIndex < filteredScenarios.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOptionId(null);
            setShowHint(false);
            setView('playing');
        } else {
            setView('finished');
            if (currentLevel) {
                completeModule(`valmennus_${currentLevel}`);
                awardBadge(`training_${currentLevel}`);
            }
        }
    };

    const reset = () => {
        setView('hub');
        setSelectedCategory(null);
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

    const getBgColor = (color: string) => {
        switch (color) {
            case 'indigo': return 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400';
            case 'emerald': return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
            case 'rose': return 'bg-rose-500/10 border-rose-500/20 text-rose-400';
            case 'cyan': return 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400';
            case 'amber': return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
            case 'slate': return 'bg-slate-500/10 border-slate-500/20 text-slate-400';
            case 'blue': return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
            default: return 'bg-slate-500/10 border-slate-500/20 text-slate-400';
        }
    };

    const currentModuleIndex = selectedCategory?.modules.findIndex(m => m.id === currentModuleId) ?? -1;
    const nextModule = selectedCategory?.modules[currentModuleIndex + 1];

    return (
        <div className={cn("fixed inset-0 z-[100] flex flex-col font-sans overflow-hidden transition-colors duration-700", view === 'hub' ? 'bg-slate-50' : darkBg)}>

            {/* Background Elements (Only for Hub) */}
            {view === 'hub' && (
                <>
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
                </>
            )}

            {/* 1. HEADER */}
            <header className={cn(
                "shrink-0 h-16 border-b transition-all z-30 flex items-center justify-between px-6",
                view === 'hub' ? "bg-white/80 backdrop-blur-xl border-slate-200" : "bg-slate-900/50 border-white/5 backdrop-blur-md"
            )}>
                <div className="flex items-center gap-3">
                    <History className={cn("w-5 h-5", view === 'hub' ? "text-indigo-600" : "text-indigo-400")} />
                    <div className="flex flex-col">
                        <span className={cn("font-black uppercase tracking-tighter text-sm", view === 'hub' ? "text-slate-900" : "text-white")}>Valmennus</span>
                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest leading-none">
                            {view === 'hub' ? 'Koulutuskeskus' : selectedCategory?.title || 'Valmennus'}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {view !== 'hub' && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={reset}
                            className="text-xs font-black uppercase tracking-widest gap-2 rounded-full text-slate-400 hover:text-white"
                        >
                            <RotateCcw className="w-3.5 h-3.5" /> Sulje
                        </Button>
                    )}
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon" className={cn("w-8 h-8", view === 'hub' ? "text-slate-400 hover:text-slate-900" : "text-slate-500 hover:text-white")}>
                            <X className="w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </header>

            {/* 2. PROGRESS BAR (Simulation style, only when playing) */}
            {(view === 'playing' || view === 'feedback') && (
                <div className="shrink-0 w-full px-6 pt-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                        <span>Edistyminen</span>
                        <span>{currentIndex + 1} / {filteredScenarios.length}</span>
                    </div>
                    <Progress value={((currentIndex + 1) / filteredScenarios.length) * 100} className="h-1 bg-slate-800" />
                </div>
            )}

            {/* 3. MAIN CONTENT */}
            <main className="flex-1 overflow-y-auto no-scrollbar relative overscroll-contain z-10">
                <AnimatePresence mode="wait">

                    {/* HUB VIEW */}
                    {view === 'hub' && (
                        <motion.div
                            key="hub"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="min-h-full p-6 md:p-12 max-w-6xl mx-auto space-y-12"
                        >
                            <div className="text-center space-y-4 max-w-3xl mx-auto">
                                <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tight leading-none">
                                    Valmennus- <br /><span className="text-indigo-600">keskus</span>
                                </h1>
                                <p className="text-lg text-slate-500 font-light leading-relaxed">
                                    Valitse polkusi. Täältä löydät kaiken tarvittavan tiedon, työkaluja ja harjoituksia
                                    kiusaamisen tunnistamiseen, siihen puuttumiseen ja siitä toipumiseen.
                                </p>
                            </div>

                            {/* Certification Progress Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-8 border border-white/5 shadow-2xl group"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -translate-y-32 translate-x-32 blur-3xl group-hover:bg-indigo-500/20 transition-all duration-1000" />
                                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                                    <div className="shrink-0 w-24 h-24 rounded-full bg-slate-800 border-4 border-indigo-500/30 flex items-center justify-center p-1">
                                        <div className="w-full h-full rounded-full border-4 border-indigo-500 flex items-center justify-center text-white text-xl font-black">
                                            {certProgress.percentage}%
                                        </div>
                                    </div>
                                    <div className="flex-1 text-center md:text-left space-y-2">
                                        <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap text-center md:text-left">
                                            <Badge className="bg-indigo-500 text-white border-none text-[8px] h-5 uppercase font-black tracking-widest px-3">Sertifikaatti</Badge>
                                            <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">Kiusaamisen lukutaito</span>
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-none">
                                            Sertifiointipolun edistyminen
                                        </h2>
                                        <p className="text-slate-400 text-sm font-medium">
                                            Suorita {certProgress.total} vaadittua moduulia saadaksesi virallisen "Kiusaamisen lukutaito" -sertifikaatin.
                                            ({certProgress.completed}/{certProgress.total} valmiina)
                                        </p>
                                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-4">
                                            <motion.div
                                                className="h-full bg-indigo-500"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${certProgress.percentage}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        className="rounded-full h-12 px-8 bg-white text-slate-900 font-black uppercase tracking-widest text-[10px] hover:bg-slate-100 transition-all shadow-xl"
                                        onClick={() => {
                                            // Find first non-completed cert module
                                            const certModules = [
                                                { id: 'valmennus_easy', cat: 'literacy' },
                                                { id: 'empathy_game', cat: 'interactive' },
                                                { id: 'valmennus_bystander_sim', cat: 'interactive' },
                                                { id: 'valmennus_leisure_assoc', cat: 'leisure' },
                                                { id: 'pluralistic_ignorance', cat: 'research' },
                                                { id: 'bystander_effect', cat: 'research' }
                                            ];
                                            const next = certModules.find(m => !isModuleCompleted(m.id));
                                            if (next) {
                                                const cat = trainingHubData.find(c => c.id === next.cat);
                                                if (cat) {
                                                    setSelectedCategory(cat);
                                                    setView('category');
                                                }
                                            }
                                        }}
                                    >
                                        Jatka polkua <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {trainingHubData.map((category) => (
                                    <motion.div
                                        key={category.id}
                                        whileHover={category.isLocked ? {} : { y: -5 }}
                                        whileTap={category.isLocked ? {} : { scale: 0.98 }}
                                        onClick={() => {
                                            if (category.isLocked) return;
                                            setSelectedCategory(category);
                                            setView('category');
                                        }}
                                        className={cn(
                                            "group relative bg-white border border-slate-200 rounded-[2.5rem] p-8 transition-all duration-500",
                                            category.isLocked ? "grayscale opacity-50 cursor-not-allowed" : "cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10"
                                        )}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-colors", getBgColor(category.color))}>
                                                <category.icon className="w-7 h-7" />
                                            </div>
                                            <Badge className={cn(
                                                "border-none text-[8px] h-5 uppercase font-black tracking-widest px-2",
                                                category.type === 'skill' ? "bg-amber-500/10 text-amber-600" : "bg-emerald-500/10 text-emerald-600"
                                            )}>
                                                {category.type === 'skill' ? 'Taito' : 'Prosessi'}
                                            </Badge>
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight">{category.title}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed mb-8">{category.description}</p>

                                        <div className="flex items-center text-slate-400 font-black uppercase text-[10px] tracking-widest mt-auto group-hover:text-indigo-600 transition-colors">
                                            {category.isLocked ? 'Tulossa pian' : `${category.modules.length} moduulia`}
                                            {!category.isLocked && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />}
                                        </div>

                                        {/* Subtle corner highlight */}
                                        <div className={cn("absolute top-0 right-0 w-24 h-24 bg-current opacity-[0.02] rounded-full -translate-y-12 translate-x-12", category.color === 'indigo' ? 'text-indigo-600' : 'text-slate-600')} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* CATEGORY VIEW */}
                    {view === 'category' && selectedCategory && (
                        <motion.div
                            key="category"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="min-h-full flex flex-col justify-start p-6 md:p-12 max-w-4xl mx-auto space-y-10"
                        >
                            <Button
                                variant="ghost"
                                onClick={() => setView('hub')}
                                className="w-fit text-slate-500 hover:text-slate-900 gap-2 font-black uppercase text-xs tracking-widest"
                            >
                                <RotateCcw className="w-4 h-4" /> Takaisin hubiin
                            </Button>

                            <div className="space-y-4">
                                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", getBgColor(selectedCategory.color))}>
                                    <selectedCategory.icon className="w-8 h-8" />
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tight">{selectedCategory.title}</h1>
                                <p className="text-xl text-slate-500 font-light max-w-2xl">{selectedCategory.description}</p>
                            </div>

                            <div className="grid gap-4">
                                {selectedCategory.modules.map((module) => (
                                    <div
                                        key={module.id}
                                        onClick={() => startModule(module)}
                                        className={cn(
                                            "group bg-white border border-slate-100 p-5 md:p-6 rounded-[2rem] flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer hover:shadow-xl hover:border-indigo-100 transition-all gap-4",
                                            module.isLocked && "opacity-50 grayscale cursor-not-allowed"
                                        )}
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                                {module.isLocked ? <ShieldCheck className="w-5 h-5 opacity-30" /> : <ChevronRight className="w-6 h-6" />}
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight break-words">{module.title}</h3>
                                                    <div className="flex gap-2">
                                                        {module.isNew && <Badge className="bg-emerald-500 text-white border-none text-[8px] h-4 uppercase font-black tracking-widest whitespace-nowrap">Uusi</Badge>}
                                                        {module.isCertificationModule && <Badge className="bg-indigo-500 text-white border-none text-[8px] h-4 uppercase font-black tracking-widest whitespace-nowrap">Sertifikaatti</Badge>}
                                                    </div>
                                                </div>
                                                <p className="text-slate-500 text-sm font-medium">{module.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-2 sm:mt-0">
                                            <Badge className={cn(
                                                "border-none text-[8px] h-5 uppercase font-black tracking-widest px-2 mr-2",
                                                selectedCategory.type === 'skill' ? "bg-amber-500/10 text-amber-600" : "bg-emerald-500/10 text-emerald-600"
                                            )}>
                                                {selectedCategory.type === 'skill' ? 'Taito' : 'Prosessi'}
                                            </Badge>
                                            {module.isLocked ? (
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Tulossa pian</span>
                                            ) : (
                                                <Button size="sm" className="bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest px-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    Aloita
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* INTRO (For the Tactical Quiz) */}
                    {view === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="min-h-full flex flex-col justify-center px-6 py-12 max-w-4xl mx-auto space-y-12"
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
                            <div className="flex justify-center">
                                <Button variant="ghost" onClick={() => setView('hub')} className="text-slate-500 hover:text-white uppercase text-xs font-black tracking-widest">
                                    <RotateCcw className="w-4 h-4 mr-2" /> Takaisin valintaan
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* PLAYING / FEEDBACK CONTENT */}
                    {(view === 'playing' || view === 'feedback') && currentScenario && (
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="min-h-full flex flex-col justify-center p-6 md:p-12 max-w-2xl mx-auto"
                        >
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

                            <div className="space-y-6 py-10 pb-32">
                                <div className="space-y-4">
                                    <p className="text-2xl md:text-3xl text-slate-100 leading-tight font-black uppercase tracking-tighter">
                                        {currentScenario.scenario}
                                    </p>
                                    <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest opacity-80">
                                        {currentScenario.question}
                                    </h4>
                                </div>

                                {!selectedOptionId && !showHint && (
                                    <div className="flex justify-center pt-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setShowHint(true);
                                                setTimeout(() => setShowHint(false), 5000);
                                            }}
                                            className="bg-indigo-500/5 text-slate-400 hover:text-indigo-400 border-white/5 hover:border-indigo-500/50 uppercase font-black text-[10px] tracking-widest gap-2 h-9 px-6 rounded-full transition-all"
                                        >
                                            <Lightbulb className="w-4 h-4 text-yellow-500" /> Vihje
                                        </Button>
                                    </div>
                                )}

                                {view === 'feedback' && (
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

                    {/* RTW WIZARD VIEW */}
                    {view === 'rtw-wizard' && (
                        <motion.div
                            key="rtw-wizard"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="min-h-full"
                        >
                            <RTWWizard
                                onComplete={() => {
                                    completeModule('valmennus_return_rtw');
                                    awardBadge('training_rtw');
                                    setView('finished');
                                }}
                                onExit={() => setView('category')}
                            />
                        </motion.div>
                    )}

                    {/* ASSOCIATION SIM VIEW */}
                    {view === 'association-sim' && (
                        <motion.div
                            key="association-sim"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="min-h-full"
                        >
                            <AssociationSimulation
                                moduleId={currentModuleId || undefined}
                                onComplete={(finalScore) => {
                                    setScore(finalScore);
                                    completeModule('valmennus_leisure_assoc');
                                    awardBadge('leisure_hero');
                                    setView('finished');
                                }}
                                onExit={() => setView('category')}
                            />
                        </motion.div>
                    )}

                    {/* BYSTANDER SIM VIEW */}
                    {view === 'bystander-sim' && (
                        <motion.div
                            key="bystander-sim"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="min-h-full"
                        >
                            <BystanderSimulation
                                moduleId={currentModuleId || undefined}
                                onComplete={(finalScore) => {
                                    setScore(finalScore);
                                    completeModule('valmennus_bystander_sim');
                                    awardBadge('bystander_hero');
                                    setView('finished');
                                }}
                                onExit={() => setView('category')}
                            />
                        </motion.div>
                    )}

                    {/* CONCEPT VIEW */}
                    {view === 'concept-view' && (
                        <motion.div
                            key="concept-view"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="min-h-full p-6 md:p-12 max-w-3xl mx-auto flex flex-col justify-center gap-8"
                        >
                            <Card className="bg-slate-900 border-indigo-500/30 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full pointer-events-none" />
                                <div className="space-y-8">
                                    <div className="flex items-center gap-3">
                                        <Badge className="bg-indigo-500 text-white border-none text-[8px] h-5 uppercase font-black tracking-widest px-3">Tutkimus & Käsitteet</Badge>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                                        {currentModuleId === 'pluralistic_ignorance' ? 'Pluralistinen Ignoranssi' :
                                            currentModuleId === 'bystander_effect' ? 'Bystander-efekti Syväluotaus' : 'Tutkimustieto'}
                                    </h2>
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2">Määritelmä</h4>
                                            <p className="text-lg text-slate-300 leading-relaxed font-light italic">
                                                {currentModuleId === 'pluralistic_ignorance'
                                                    ? 'Ryhmän jäsenet hylkäävät normin yksityisesti mutta tukevat sitä julkisesti, koska luulevat muiden hyväksyvän sen.'
                                                    : 'Ilmiö, jossa todistajat eivät auta uhria, jos paikalla on muita ihmisiä.'}
                                            </p>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6 pt-4">
                                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Mekanismi</h4>
                                                <p className="text-sm text-slate-400 leading-relaxed">
                                                    {currentModuleId === 'pluralistic_ignorance'
                                                        ? 'Vaikeneminen tulkitaan signaliksi hyväksynnästä. 70–80% todistajista paheksuu tilannetta mutta pelkää olevansa ainoa.'
                                                        : 'Vastuun hajautuminen: mitä enemmän ihmisiä, sitä vähemmän koetaan henkilökohtaista vastuuta puuttua.'}
                                                </p>
                                            </div>
                                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-cyan-400 mb-2">Miten murtaa?</h4>
                                                <p className="text-sm text-slate-400 leading-relaxed">
                                                    {currentModuleId === 'pluralistic_ignorance'
                                                        ? 'Ole ensimmäinen joka sanoo: "Hei, tuo ei ole ok – oletteko muuallakin samaa mieltä?". Tämä murtaa harhan välittömästi.'
                                                        : 'Luo henkilökohtainen yhteys: nimeä joku apuun tai tue uhria suoraan fyysisellä läsnäololla.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-8 flex flex-col sm:flex-row gap-4">
                                        <Button onClick={() => setView('category')} className="rounded-full h-12 px-8 uppercase font-black tracking-widest text-[10px] bg-white text-slate-900 hover:bg-white/90 transition-all">
                                            Takaisin listaan
                                        </Button>
                                        <Button onClick={() => setView('hub')} variant="ghost" className="rounded-full h-12 px-8 uppercase font-black tracking-widest text-[10px] text-slate-400 hover:text-white">
                                            Sulje
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                    {/* CERTIFICATION COMPLETE */}
                    {view === 'certification-complete' && (
                        <motion.div
                            key="certification-complete"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="min-h-full flex flex-col justify-center p-6 py-12 max-w-4xl mx-auto space-y-12"
                        >
                            <div className="text-center space-y-4">
                                <motion.div
                                    initial={{ rotate: -10, scale: 0 }}
                                    animate={{ rotate: 0, scale: 1 }}
                                    transition={{ type: "spring", damping: 10, stiffness: 100 }}
                                >
                                    <Award className="w-24 h-24 text-indigo-500 mx-auto" />
                                </motion.div>
                                <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                                    Onnittelut! <br /><span className="text-indigo-400">Olet sertifioitu.</span>
                                </h1>
                                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                                    Olet suorittanut Suojasiiven "Kiusaamisen lukutaito" -koulutuskokonaisuuden.
                                </p>
                            </div>

                            <Card className="bg-white p-12 md:p-20 rounded-none shadow-2xl border-[12px] border-indigo-500/20 relative">
                                <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-indigo-500/10 pointer-events-none" />
                                <div className="text-center space-y-10 relative z-10">
                                    <div className="flex justify-center mb-4">
                                        <History className="w-12 h-12 text-slate-900" />
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-slate-900 text-sm font-black uppercase tracking-[0.3em]">Suoritustodistus</h2>
                                        <h3 className="text-slate-800 text-4xl md:text-5xl font-serif italic">Kiusaamisen lukutaito</h3>
                                    </div>
                                    <div className="w-24 h-1 bg-slate-900 mx-auto" />
                                    <p className="text-slate-600 text-lg max-w-lg mx-auto leading-relaxed">
                                        Tämä todistus myönnetään tunnustuksena perinpohjaisesta perehtymisestä kiusaamisen dynamiikkaan,
                                        puuttumisen strategioihin ja työyhteisön psykologiseen turvallisuuteen.
                                    </p>
                                    <div className="flex justify-between items-end pt-10">
                                        <div className="text-left space-y-1">
                                            <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Päivämäärä</div>
                                            <div className="text-slate-900 font-bold">{new Date().toLocaleDateString('fi-FI')}</div>
                                        </div>
                                        <div className="text-right space-y-1">
                                            <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Myöntäjä</div>
                                            <div className="font-black text-slate-900 italic">Suojasiipi.fi</div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Button
                                    onClick={() => window.print()}
                                    className="rounded-full h-14 px-10 bg-indigo-600 text-white font-black uppercase tracking-widest text-xs hover:bg-indigo-700 shadow-xl"
                                >
                                    Lataa / Tulosta todistus
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={reset}
                                    className="rounded-full h-14 px-10 text-slate-400 hover:text-white font-black uppercase tracking-widest text-xs"
                                >
                                    Takaisin hubiin
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* FINISHED */}
                    {view === 'finished' && (
                        <motion.div
                            key="finished"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="min-h-full flex flex-col justify-center p-6 py-12 max-w-lg mx-auto space-y-8 pb-32"
                        >
                            <div className="text-center space-y-4">
                                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-2" />
                                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-none">
                                    {selectedCategory?.type === 'process' ? 'Oivallus suoritettu!' : 'Valmennus suoritettu!'}
                                </h2>
                                <p className="text-slate-500 text-sm">
                                    {selectedCategory?.type === 'process'
                                        ? 'Olet pysähtynyt tärkeän äärelle ja vienyt prosessia eteenpäin.'
                                        : 'Olet edistynyt merkittävästi taktiikoiden tunnistamisessa.'}
                                </p>
                            </div>

                            <Card className="bg-slate-900 border-indigo-500/30 overflow-hidden rounded-[2rem] shadow-2xl">
                                <div className="p-10 text-center space-y-6">
                                    {selectedCategory?.type === 'process' || selectedCategory?.id === 'leisure' || selectedCategory?.id === 'interactive' ? (
                                        <div className="space-y-1">
                                            <div className="text-emerald-400 uppercase font-black tracking-widest text-[10px]">Statuksesi</div>
                                            <div className="text-2xl font-black text-white uppercase italic tracking-tighter leading-tight">
                                                {selectedCategory?.id === 'return' ? 'Paluun Arkkitehti' :
                                                    selectedCategory?.id === 'leisure' ? 'Harrastuksen Turvamies' :
                                                        selectedCategory?.id === 'interactive' ? 'Bystander-Sankari' :
                                                            'Tietoinen pohtija'}
                                            </div>
                                            <p className="text-slate-500 text-sm mt-4 font-medium leading-relaxed">
                                                {selectedCategory?.id === 'leisure'
                                                    ? 'Olet osoittanut vahvaa kykyä suojella harrastusyhteisösi psykologista turvallisuutta.'
                                                    : selectedCategory?.id === 'interactive'
                                                        ? 'Olet murtanut bystander-efektin ja osoittanut solidaarisuutta, mikä vähentää eristäytymistä ja traumakehitystä.'
                                                        : 'Tämä harjoitus on tallennettu osaksi omaa polkuasi. Jatkuva harjaantuminen vahvistaa kykyäsi toimia vaikeissa tilanteissa.'}
                                            </p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="space-y-1">
                                                <div className="text-slate-500 uppercase font-black tracking-widest text-[10px]">Loppupisteesi</div>
                                                <div className="text-6xl font-black text-white">{score}<span className="text-xl text-slate-700">/{filteredScenarios.length}</span></div>
                                            </div>

                                            <div className="space-y-1">
                                                <div className="text-indigo-400 uppercase font-black tracking-widest text-[10px]">Arvonimesi</div>
                                                <div className="text-2xl font-black text-white uppercase italic tracking-tighter leading-tight">{getTitle(score)}</div>
                                            </div>
                                        </>
                                    )}

                                    <div className="pt-4 grid gap-3">
                                        {nextModule && !nextModule.isLocked && (
                                            <Button
                                                onClick={() => startModule(nextModule)}
                                                className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 rounded-full uppercase font-black tracking-widest text-[10px] shadow-lg shadow-emerald-900/40 border border-emerald-500/20"
                                            >
                                                Seuraava moduuli: {nextModule.title} <ArrowRight className="w-3 h-3 ml-2" />
                                            </Button>
                                        )}
                                        <Button
                                            onClick={() => {
                                                if (selectedCategory?.id === 'return') setView('rtw-wizard');
                                                else if (selectedCategory?.id === 'leisure') setView('association-sim');
                                                else if (selectedCategory?.type === 'skill') setView('intro');
                                                else setView('category');
                                            }}
                                            variant="outline"
                                            className="border-slate-800 text-slate-400 hover:bg-slate-800 rounded-full h-12 uppercase font-black tracking-widest text-[10px]"
                                        >
                                            <RotateCcw className="w-3 h-3 mr-2" />
                                            {selectedCategory?.type === 'process' ? 'Palaa harjoitukseen' : 'Kokeile uudestaan'}
                                        </Button>
                                        {certProgress.percentage === 100 && (
                                            <Button
                                                onClick={() => setView('certification-complete')}
                                                className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full uppercase font-black tracking-widest text-[10px] shadow-xl shadow-indigo-900/40 border-2 border-indigo-400/50"
                                            >
                                                🏆 Katso Sertifikaattisi
                                            </Button>
                                        )}
                                        <Button onClick={reset} variant="ghost" className="w-full h-12 text-slate-500 hover:text-white rounded-full uppercase font-black tracking-widest text-[10px]">
                                            Takaisin valikkoon
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                </AnimatePresence>
            </main>

            {/* 4. FOOTER (Quiz options) */}
            <AnimatePresence>
                {(view === 'playing' || view === 'feedback') && currentScenario && (
                    <motion.footer
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="shrink-0 bg-slate-950 border-t border-white/5 p-4 pb-8 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
                    >
                        <div className="max-w-lg mx-auto w-full flex flex-col gap-2">
                            {view === 'playing' ? (
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
                                    className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs md:text-lg font-black uppercase tracking-tighter shadow-xl shadow-indigo-500/20 group px-4"
                                >
                                    <span>
                                        {currentIndex === filteredScenarios.length - 1 ? 'Katso lopulliset tulokset' : 'Seuraava kysymys'}
                                    </span>
                                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform shrink-0" />
                                </Button>
                            )}
                        </div>
                    </motion.footer>
                )}
            </AnimatePresence>
        </div>
    );
}
