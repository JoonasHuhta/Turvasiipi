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
    AlertCircle,
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

        if (selectedCategory?.id === 'leisure' && (module.id === 'association_basics' || module.id === 'hobby_boundaries' || module.id === 'transferable_skills')) {
            setView('association-sim');
            return;
        }

        if (selectedCategory?.id === 'literacy' && module.id === 'basic') {
            startLevel('easy');
            setView('intro');
            return;
        }

        if (selectedCategory?.id === 'interactive' && (module.id === 'empathy' || module.id === 'bystander')) {
            setView('bystander-sim');
            return;
        }

        if (selectedCategory?.id === 'return' && module.id === 'exit_strategy') {
            setCurrentModuleId(module.id);
            setView('exit-strategy');
            return;
        }

        if (selectedCategory?.id === 'return' && module.id === 'safety') {
            setCurrentModuleId(module.id);
            setView('safety-restoration');
            return;
        }

        if (selectedCategory?.id === 'interactive') {
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
            if (module.id === 'labyrinth') {
                setCurrentModuleId(module.id);
                setView('labyrinth');
                return;
            }
        }

        if (selectedCategory?.id === 'certificates' && module.id === 'cert_view') {
            setView('certificates');
            return;
        }

        if (selectedCategory?.id === 'organization' && module.id === 'org_knowledge') {
            setCurrentModuleId(module.id);
            setView('org-resources');
            return;
        }

        if (selectedCategory?.id === 'research') {
            if (module.id === 'ostrakismi_toolkit') {
                setView('ostracism-toolkit');
                return;
            }
            setView('concept-view');
            completeModule(module.id);
            return;
        }
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
        <div className="container mx-auto px-6 sm:px-8 max-w-screen-lg py-32 space-y-12">

            {/* 1. HEADER (Only visible if not in hub) */}
            {view !== 'hub' && (
                <header className="flex items-center justify-between border-b border-[#E8DDD0] pb-6 sticky top-20 bg-[#FDFBF7]/95 backdrop-blur-sm z-10 transition-all text-sm font-bold text-[#2B2B2B]">
                    <div className="flex items-center gap-3">
                        <button onClick={reset} className="hover:text-[#5B4B8A] transition-colors flex items-center gap-2">
                            Valmennus
                        </button>
                        {selectedCategory && (
                            <>
                                <span className="text-[#E8DDD0]">/</span>
                                <span className="text-[#4A4A4A] font-normal">{selectedCategory.title}</span>
                            </>
                        )}
                    </div>
                    <button onClick={view === 'category' ? reset : () => setView('category')} className="text-[#4A4A4A] hover:text-[#2B2B2B] text-xs uppercase tracking-wider font-normal">
                        {view === 'category' ? 'Sulje' : 'Takaisin'}
                    </button>
                </header>
            )}

            {/* 2. PROGRESS BAR */}
            {(view === 'playing' || view === 'feedback' || (view as string).includes('sim')) && (
                <div className="w-full">
                    <Progress value={((currentIndex + 1) / filteredScenarios.length) * 100} className="h-1 bg-[#E8DDD0]" />
                </div>
            )}

            {/* 3. MAIN CONTENT */}
            <main className="min-h-[60vh]">
                <AnimatePresence mode="wait">

                    {/* HUB VIEW */}
                    {view === 'hub' && (
                        <motion.div
                            key="hub"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="space-y-16"
                        >
                            <div className="space-y-6 max-w-2xl">
                                <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border-b border-[#5B4B8A] pb-1">Valmennus</span>
                                <h1 className="text-4xl md:text-5xl font-bold text-[#2B2B2B] leading-tight">
                                    Miten puhua asiasta, <br /> jota ei pitäisi olla olemassa.
                                </h1>
                                <p className="text-lg text-[#4A4A4A] leading-relaxed">
                                    Valitse polkusi. Täältä löydät konkreettisia taitoja, joilla suojaat itseäsi ja ymmärrät tilannettasi paremmin.
                                </p>
                            </div>

                            {/* Certification Progress */}
                            <div className="bg-white p-8 border border-[#E8DDD0] rounded-sm flex flex-col md:flex-row gap-8 items-start md:items-center">
                                <div className="w-16 h-16 rounded-full border-4 border-[#E8DDD0] flex items-center justify-center text-sm font-bold text-[#2B2B2B] bg-[#FDFBF7]">
                                    {certProgress.percentage}%
                                </div>
                                <div className="flex-1 space-y-2">
                                    <h3 className="text-lg font-bold text-[#2B2B2B]">Sertifiointi: Kiusaamisen lukutaito</h3>
                                    <p className="text-sm text-[#4A4A4A]">Suorita kaikki moduulit saadaksesi tunnistuksen.</p>
                                    <div className="h-1 w-full bg-[#FAFAFA] rounded-full overflow-hidden">
                                        <div className="h-full bg-[#5B4B8A]" style={{ width: `${certProgress.percentage}%` }} />
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {trainingHubData.map((category) => (
                                    <div
                                        key={category.id}
                                        onClick={() => !category.isLocked && setSelectedCategory(category)}
                                        onClickCapture={() => !category.isLocked && setView('category')}
                                        className={cn(
                                            "group p-8 border border-[#E8DDD0] bg-white hover:border-[#5B4B8A] transition-all cursor-pointer rounded-sm flex flex-col gap-6",
                                            category.isLocked && "opacity-50 grayscale cursor-not-allowed hover:border-[#E8DDD0]"
                                        )}
                                    >
                                        <div className="flex justify-between items-start">
                                            <category.icon className="w-8 h-8 text-[#5B4B8A]" />
                                            {category.isLocked && <span className="text-[10px] uppercase font-bold text-[#4A4A4A]">Tulossa</span>}
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-serif font-bold text-[#2B2B2B] mb-2">{category.title}</h3>
                                            <p className="text-sm text-[#4A4A4A] leading-relaxed">{category.description}</p>
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-[#FAFAFA] flex items-center justify-between text-xs font-bold text-[#4A4A4A] group-hover:text-[#5B4B8A] transition-colors">
                                            <span>{category.modules.length} Osioita</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* CATEGORY VIEW */}
                    {view === 'category' && selectedCategory && (
                        <motion.div
                            key="category"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="space-y-12"
                        >
                            <div className="space-y-4 border-b border-[#E8DDD0] pb-8">
                                <h1 className="text-3xl font-serif font-bold text-[#2B2B2B]">{selectedCategory.title}</h1>
                                <p className="text-lg text-[#4A4A4A] max-w-2xl">{selectedCategory.description}</p>
                            </div>

                            <div className="grid gap-4">
                                {selectedCategory.modules.map((module) => (
                                    <div
                                        key={module.id}
                                        onClick={() => startModule(module)}
                                        className={cn(
                                            "p-6 bg-white border border-[#E8DDD0] rounded-sm hover:border-[#5B4B8A] transition-all cursor-pointer flex items-center justify-between group",
                                            module.isLocked && "opacity-50 cursor-not-allowed"
                                        )}
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-bold text-[#2B2B2B]">{module.title}</h3>
                                                {module.isNew && <span className="text-[9px] uppercase font-bold text-[#5B4B8A] bg-[#5B4B8A]/10 px-2 py-0.5 rounded-sm">Uusi</span>}
                                            </div>
                                            <p className="text-sm text-[#4A4A4A]">{module.description}</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-[#E8DDD0] group-hover:text-[#5B4B8A] transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* OTHER VIEWS (Render specialized components) */}
                    {view === 'rtw-wizard' && <RTWWizard onComplete={() => { completeModule('valmennus_return_rtw'); setView('finished'); }} onExit={() => setView('category')} />}
                    {view === 'association-sim' && <AssociationSimulation onComplete={(s, p) => { if (p) { completeModule('valmennus_leisure_assoc'); setView('finished'); } else { setView('failed'); } }} onExit={() => setView('category')} />}
                    {view === 'bystander-sim' && <BystanderSimulation onComplete={(s, p) => { if (p) { completeModule('valmennus_bystander_sim'); setView('finished'); } else { setView('failed'); } }} onExit={() => setView('category')} />}
                    {view === 'ostracism-toolkit' && <OstracismToolkit onComplete={() => { if (currentModuleId) completeModule(currentModuleId); setView('finished'); }} />}
                    {view === 'exit-strategy' && <ExitStrategy onComplete={() => { if (currentModuleId) completeModule(currentModuleId); setView('finished'); }} onExit={() => setView('category')} />}
                    {view === 'safety-restoration' && <SafetyRestoration onComplete={() => { if (currentModuleId) completeModule(currentModuleId); setView('finished'); }} onExit={() => setView('category')} />}
                    {view === 'action-protocols' && <ActionProtocols onComplete={() => { if (currentModuleId) completeModule(currentModuleId); setView('finished'); }} onExit={() => setView('category')} />}
                    {view === 'conversations' && <DifficultConversations onComplete={() => { if (currentModuleId) completeModule(currentModuleId); setView('finished'); }} onExit={() => setView('category')} />}
                    {view === 'labyrinth' && <MoralLabyrinth onComplete={() => { if (currentModuleId) completeModule(currentModuleId); setView('finished'); }} onExit={() => setView('category')} />}
                    {view === 'recovery-wellbeing' && <RecoveryWellbeing onComplete={() => { if (currentModuleId) completeModule(currentModuleId); setView('finished'); }} onExit={() => setView('category')} />}
                    {view === 'org-resources' && <OrganizationResources onComplete={() => { if (currentModuleId) completeModule(currentModuleId); setView('finished'); }} onExit={() => setView('category')} />}
                    {view === 'certificates' && <CertificatesModule onExit={() => setView('category')} />}
                    {view === 'concept-view' && (
                        <div className="space-y-8 p-12 bg-white border border-[#E8DDD0]">
                            <h2 className="text-3xl font-serif font-bold text-[#2B2B2B]">Tutkimus: {currentModuleId}</h2>
                            <p className="text-[#4A4A4A]">Tutkimustieto auttaa ymmärtämään ilmiötä syvemmin.</p>
                            <Button onClick={handleConceptComplete} className="bg-[#2B2B2B] text-white">Merkitse luetuksi</Button>
                        </div>
                    )}

                    {/* STANDARD QUIZ / SCENARIO VIEWS */}
                    {(view === 'intro' || view === 'playing' || view === 'feedback') && (
                        <div className="max-w-2xl mx-auto space-y-8 pt-12">
                            {view === 'intro' && (
                                <div className="space-y-6 text-center">
                                    <h2 className="text-3xl font-serif font-bold text-[#2B2B2B]">Tunnista Taktiikat</h2>
                                    <p className="text-[#4A4A4A]">Valitse vaikeustaso aloittaaksesi.</p>
                                    <div className="flex justify-center gap-4">
                                        <button onClick={() => startLevel('easy')} className="px-6 py-3 bg-white border border-[#E8DDD0] hover:border-[#5B4B8A] font-bold text-[#2B2B2B]">Taso 1</button>
                                        <button onClick={() => startLevel('medium')} className="px-6 py-3 bg-white border border-[#E8DDD0] hover:border-[#5B4B8A] font-bold text-[#2B2B2B]">Taso 2</button>
                                        <button onClick={() => startLevel('hard')} className="px-6 py-3 bg-white border border-[#E8DDD0] hover:border-[#5B4B8A] font-bold text-[#2B2B2B]">Taso 3</button>
                                    </div>
                                </div>
                            )}

                            {(view === 'playing' || view === 'feedback') && currentScenario && (
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
                            )}
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
            </main>
        </div>
    );
}
