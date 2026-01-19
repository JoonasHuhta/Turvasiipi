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
    BookOpen,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    XCircle,
    Lightbulb,
    ShieldCheck,
    RotateCcw,
    ChevronRight,
    Trophy,
    AlertCircle,
    Target,
    Zap,
    History,
    Award,
    X,
    Siren,
    Activity,
    Compass,
    ShieldAlert
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { cn } from "@/lib/utils";

import { trainingHubData, TrainingCategory, TrainingModule } from "@/data/training-hub";
import { RTWWizard } from "@/components/training/RTWWizard";
import AssociationSimulation from "@/components/training/AssociationSimulation";
import BystanderSimulation from "@/components/training/BystanderSimulation";
import OstracismToolkit from "@/components/training/OstracismToolkit";
import { ExitStrategy } from "@/components/training/ExitStrategy";
import { SafetyRestoration } from "@/components/training/SafetyRestoration";
import { BullyingPatterns } from "@/components/training/BullyingPatterns";
import { ActionProtocols } from "@/components/training/ActionProtocols";
import { DifficultConversations } from "@/components/training/DifficultConversations";
import { MoralLabyrinth } from "@/components/training/MoralLabyrinth";
import { RecoveryWellbeing } from "@/components/training/RecoveryWellbeing";
import { OrganizationResources } from "@/components/training/OrganizationResources";
import { CertificatesModule } from "@/components/training/CertificatesModule";

export default function TrainingPage() {
    const { t } = useLanguage();
    const { completeModule, awardBadge, getCertificationProgress, isModuleCompleted } = useProgress();

    // VIEW STATE
    const [view, setView] = useState<'hub' | 'category' | 'intro' | 'playing' | 'feedback' | 'finished' | 'failed' | 'rtw-wizard' | 'association-sim' | 'bystander-sim' | 'concept-view' | 'certification-complete' | 'ostracism-toolkit' | 'exit-strategy' | 'safety-restoration' | 'bullying-patterns' | 'action-protocols' | 'conversations' | 'labyrinth' | 'recovery-wellbeing' | 'org-resources' | 'certificates'>('hub');
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

        if (selectedCategory?.id === 'return' && module.id === 'path_12_week') {
            setView('rtw-wizard');
            return;
        }

        if (selectedCategory?.id === 'recovery' && module.id === 'recovery_main') {
            setCurrentModuleId(module.id);
            setView('recovery-wellbeing');
            return;
        }

        // 'transferable_skills' is now in 'return' but uses 'association-sim' view
        if ((selectedCategory?.id === 'special' || selectedCategory?.id === 'return') && (module.id === 'association_basics' || module.id === 'hobby_boundaries' || module.id === 'transferable_skills')) {
            setView('association-sim');
            return;
        }

        // 'basic' is now in 'understand'
        if (selectedCategory?.id === 'understand' && module.id === 'basic') {
            startLevel('easy');
            setView('intro');
            return;
        }

        if (selectedCategory?.id === 'interactive' && (module.id === 'empathy' || module.id === 'bystander')) {
            setView('bystander-sim');
            return;
        }

        // 'exit_strategy' and 'safety' moved to 'acute'
        if (selectedCategory?.id === 'acute' && module.id === 'exit_strategy') {
            setCurrentModuleId(module.id);
            setView('exit-strategy');
            return;
        }

        if (selectedCategory?.id === 'acute' && module.id === 'safety') {
            setCurrentModuleId(module.id);
            setView('safety-restoration');
            return;
        }

        // 'action_protocols' and 'conversations' moved to 'acute'
        if (selectedCategory?.id === 'acute') {
            if (module.id === 'action_protocols') {
                setCurrentModuleId(module.id);
                setView('action-protocols');
                return;
            }
            if (module.id === 'conversations') {
                setCurrentModuleId(module.id);
                setView('conversations');
                return;
            }
        }

        if (selectedCategory?.id === 'interactive') {
            if (module.id === 'labyrinth') {
                setCurrentModuleId(module.id);
                setView('labyrinth');
                return;
            }
        }

        if (selectedCategory?.id === 'progress' && module.id === 'cert_view') {
            setView('certificates');
            return;
        }

        if (selectedCategory?.id === 'organization' && module.id === 'org_knowledge') {
            setCurrentModuleId(module.id);
            setView('org-resources');
            return;
        }

        // 'ostracism_toolkit' moved to 'understand'
        if (selectedCategory?.id === 'understand') {
            if (module.id === 'ostrakismi_toolkit') {
                setView('ostracism-toolkit');
                return;
            }
        }

        // Default to playing for generic modules/placeholders if any
        if (!selectedCategory) return;
        // fallback
    };

    const handleExit = () => {
        setView('category');
        setCurrentModuleId(null);
    };

    const handleConceptComplete = () => {
        if (currentModuleId) {
            completeModule(currentModuleId);
            awardBadge('concept_learner');
        }
        setView('category');
        setCurrentModuleId(null);
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


    return (
        <div className="min-h-screen bg-[#FDFBF7] pb-20">
            {/* Navigation Header */}
            <div className="bg-white border-b border-[#E8DDD0] sticky top-0 z-10 px-4 py-4 md:px-8 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    {view !== 'hub' && (
                        <Button
                            variant="ghost"
                            onClick={() => {
                                if (view === 'category') setView('hub');
                                else if (view === 'playing' || view === 'intro' || view === 'rtw-wizard' || view === 'association-sim' || view === 'bystander-sim' || view === 'exit-strategy' || view === 'safety-restoration' || view === 'action-protocols' || view === 'conversations' || view === 'labyrinth' || view === 'recovery-wellbeing' || view === 'org-resources' || view === 'certificates' || view === 'ostracism-toolkit') {
                                    if (selectedCategory) setView('category');
                                    else setView('hub');
                                }
                                else setView('hub');
                            }}
                            className="mr-2"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Takaisin
                        </Button>
                    )}
                    <h1 className="text-xl font-serif font-bold text-[#2B2B2B]">
                        {view === 'hub' ? 'Valmennuspolut' : selectedCategory?.title || 'Valmennus'}
                    </h1>
                </div>
                {view === 'hub' && (
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="hidden md:flex gap-1 border-emerald-200 bg-emerald-50 text-emerald-700">
                            <Trophy className="w-3 h-3" />
                            {certProgress.completed}/{certProgress.total} Sertifikaattia
                        </Badge>
                    </div>
                )}
            </div>

            <div className="max-w-5xl mx-auto px-4 py-8 md:px-8">
                <AnimatePresence mode="wait">
                    {view === 'hub' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <div className="text-center space-y-4 mb-12">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                                    Missä vaiheessa olet?
                                </h2>
                                <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                                    Valitse tilanteeseesi sopiva polku. Turvasiipi auttaa sinua etenemään kohti ratkaisua omassa tahdissasi.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {trainingHubData.map((category) => (
                                    <motion.button
                                        key={category.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            setSelectedCategory(category);
                                            setView('category');
                                        }}
                                        className={cn(
                                            "flex items-center gap-4 md:gap-6 p-5 md:p-8 rounded-[2rem] border transition-all text-left relative overflow-hidden group",
                                            "bg-white border-slate-200 hover:shadow-xl hover:border-slate-300"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shrink-0 transition-colors",
                                            `bg-${category.color}-50 text-${category.color}-600 group-hover:bg-${category.color}-100`
                                        )}>
                                            <category.icon className="w-6 h-6 md:w-8 md:h-8" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight break-words hyphens-auto">{category.title}</h3>
                                            </div>
                                            <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed line-clamp-2 md:line-clamp-none">{category.description}</p>
                                        </div>
                                        <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {view === 'category' && selectedCategory && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="flex items-start gap-6 mb-8">
                                <div className={cn(
                                    "w-20 h-20 rounded-[2rem] flex items-center justify-center shrink-0 shadow-sm",
                                    `bg-${selectedCategory.color}-50 text-${selectedCategory.color}-600`
                                )}>
                                    <selectedCategory.icon className="w-10 h-10" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">{selectedCategory.title}</h2>
                                    <p className="text-lg text-slate-500 max-w-2xl">{selectedCategory.description}</p>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                {selectedCategory.modules.map((module, index) => {
                                    const isCompleted = isModuleCompleted(module.id);
                                    return (
                                        <motion.div
                                            key={module.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <button
                                                onClick={() => startModule(module)}
                                                disabled={module.isLocked}
                                                className={cn(
                                                    "w-full flex items-center gap-6 p-6 rounded-[2rem] border transition-all text-left group",
                                                    isCompleted
                                                        ? "bg-emerald-50/50 border-emerald-100"
                                                        : module.isLocked
                                                            ? "bg-slate-50 border-slate-100 opacity-70 cursor-not-allowed"
                                                            : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border-2",
                                                    isCompleted
                                                        ? "bg-emerald-100 border-emerald-200 text-emerald-600"
                                                        : module.isLocked
                                                            ? "bg-slate-100 border-slate-200 text-slate-400"
                                                            : "bg-white border-slate-100 text-slate-400 group-hover:border-slate-300 group-hover:text-slate-600"
                                                )}>
                                                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : module.isLocked ? <ShieldAlert className="w-6 h-6" /> : <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-slate-400" />}
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h3 className={cn(
                                                            "text-lg font-bold uppercase tracking-tight",
                                                            isCompleted ? "text-emerald-900" : "text-slate-900"
                                                        )}>
                                                            {module.title}
                                                        </h3>
                                                        {module.isNew && !isCompleted && (
                                                            <Badge className="bg-rose-500 hover:bg-rose-600 text-white border-none text-[10px] px-2 py-0.5">UUSI</Badge>
                                                        )}
                                                        {module.isCertificationModule && (
                                                            <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50 text-[10px] px-2 py-0.5 gap-1">
                                                                <Award className="w-3 h-3" />
                                                                Sertifikaatti
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-slate-500 font-medium">{module.description}</p>
                                                </div>

                                                {module.isLocked ? (
                                                    <div className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                        Lukittu
                                                    </div>
                                                ) : (
                                                    <ArrowRight className={cn(
                                                        "w-5 h-5 transition-transform",
                                                        isCompleted ? "text-emerald-300" : "text-slate-300 group-hover:translate-x-1 group-hover:text-slate-600"
                                                    )} />
                                                )}
                                            </button>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* RENDER ACTIVE MODULE VIEW */}
                    {view === 'rtw-wizard' && (
                        <RTWWizard
                            onComplete={() => {
                                completeModule('path_12_week');
                                setView('category');
                            }}
                            onExit={() => setView('category')}
                        />
                    )}

                    {view === 'association-sim' && (
                        <AssociationSimulation
                            moduleId={currentModuleId || undefined}
                            onComplete={(score, passed) => {
                                if (currentModuleId) {
                                    completeModule(currentModuleId);
                                    setScore(score);
                                    if (passed) setView('finished');
                                    else setView('failed');
                                }
                            }}
                            onExit={() => setView('category')}
                        />
                    )}

                    {view === 'bystander-sim' && (
                        <BystanderSimulation
                            onExit={() => setView('category')}
                            onComplete={() => {
                                completeModule('bystander'); // or 'empathy' depending on module
                                setView('finished');
                            }}
                        />
                    )}

                    {view === 'exit-strategy' && (
                        <ExitStrategy
                            onExit={() => setView('category')}
                            onComplete={() => {
                                completeModule('exit_strategy');
                                setView('category');
                            }}
                        />
                    )}

                    {view === 'safety-restoration' && (
                        <SafetyRestoration
                            onExit={() => setView('category')}
                            onComplete={() => {
                                completeModule('safety');
                                setView('category');
                            }}
                        />
                    )}

                    {view === 'action-protocols' && (
                        <ActionProtocols
                            onExit={() => setView('category')}
                            onComplete={() => {
                                completeModule('action_protocols');
                                setView('category');
                            }}
                        />
                    )}

                    {view === 'conversations' && (
                        <DifficultConversations
                            onExit={() => setView('category')}
                            onComplete={() => {
                                completeModule('conversations');
                                setView('category');
                            }}
                        />
                    )}

                    {view === 'labyrinth' && (
                        <MoralLabyrinth
                            onExit={() => setView('category')}
                            onComplete={() => {
                                completeModule('labyrinth');
                                setView('category');
                            }}
                        />
                    )}

                    {view === 'recovery-wellbeing' && (
                        <RecoveryWellbeing
                            onExit={() => setView('category')}
                            onComplete={() => {
                                completeModule('recovery_main');
                                setView('category');
                            }}
                        />
                    )}

                    {view === 'ostracism-toolkit' && (
                        <OstracismToolkit
                            onExit={() => setView('category')}
                            onComplete={() => {
                                completeModule('ostrakismi_toolkit');
                                setView('category');
                            }}
                        />
                    )}

                    {view === 'intro' && (
                        <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-200 max-w-2xl mx-auto text-center space-y-8">
                            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
                                <BookOpen className="w-10 h-10" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 mb-4">Kiusaamisen Lukutaito</h2>
                                <p className="text-slate-500 text-lg leading-relaxed">
                                    Tämä moduuli opettaa sinut tunnistamaan 8 yleisintä kiusaamistaktiikkaa.
                                    Opit erottamaan normaalin konfliktin ja henkisen väkivallan toisistaan.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button size="lg" onClick={() => setView('playing')} className="w-full h-14 text-lg bg-indigo-600 hover:bg-indigo-700 rounded-xl">
                                    Aloita kurssi
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Placeholder for certificates view */}
                    {view === 'certificates' && (
                        <CertificatesModule onExit={() => setView('category')} />
                    )}

                    {view === 'org-resources' && (
                        <OrganizationResources
                            onExit={() => setView('category')}
                            onComplete={() => {
                                completeModule('org_knowledge');
                                setView('category');
                            }}
                        />
                    )}

                    {/* Playing View (Generic Quiz) */}
                    {(view === 'playing' || view === 'feedback') && currentLevel && (
                        <div className="max-w-2xl mx-auto">
                            {/* Existing quiz rendering logic would go here, usually calling a QuizComponent. 
                                Since this is a refactor, we assume the specific Quiz rendering is handled or generic placeholder. 
                                For now, we reuse the existing structure if it was inline or external.
                                The original code had inline quiz logic. I should preserve it if I can, or use a component.
                                I will implement a GENERIC QUIZ RENDERER here to be safe and clean.
                            */}
                            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-200 min-h-[500px] flex flex-col">
                                <div className="space-y-8">
                                    <div className="bg-white p-8 border border-[#E8DDD0]">
                                        <p className="text-xl font-serif text-[#2B2B2B] leading-relaxed mb-4">"{currentScenario.scenario}"</p>
                                        <p className="text-sm font-bold text-[#5B4B8A] uppercase tracking-wide">{currentScenario.question}</p>
                                    </div>

                                    {view === 'playing' && (
                                        <div className="grid gap-3">
                                            {currentScenario.options.map((option) => (
                                                <button
                                                    key={option.id}
                                                    onClick={() => handleAnswer(option.id)}
                                                    className="w-full text-left p-4 bg-white border border-[#E8DDD0] hover:border-[#5B4B8A] text-[#4A4A4A] font-medium transition-colors"
                                                >
                                                    {option.text}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {view === 'feedback' && (
                                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                                            <div className="bg-[#FDFBF7] p-6 border-l-4 border-[#5B4B8A]">
                                                <p className="text-[#4A4A4A] italic">{currentScenario.options.find(o => o.id === selectedOptionId)?.feedback}</p>
                                            </div>
                                            <Button onClick={nextQuestion} className="w-full bg-[#2B2B2B] text-white">Seuraava</Button>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    )}

                    {view === 'finished' && (
                        <div className="text-center space-y-6 pt-12">
                            <h2 className="text-3xl font-serif font-bold text-[#2B2B2B]">Onnittelut!</h2>
                            <p className="text-[#4A4A4A]">Olet suorittanut tämän osion.</p>
                            <Button onClick={() => setView('category')} className="bg-[#5B4B8A] text-white">Palaa valikkoon</Button>
                        </div>
                    )}

                    {view === 'failed' && (
                        <div className="text-center space-y-6 pt-12">
                            <h2 className="text-3xl font-serif font-bold text-[#2B2B2B]">Ei läpäisty</h2>
                            <p className="text-[#4A4A4A]">Kokeile uudestaan.</p>
                            <Button onClick={() => setView('category')} className="bg-[#2B2B2B] text-white">Palaa valikkoon</Button>
                        </div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
