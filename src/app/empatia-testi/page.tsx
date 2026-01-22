"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { empathyQuestions, getEmpathyProfile, EmpathyProfile } from "@/data/empathy-test";
import { Button } from "@/components/ui/button";
import { Fingerprint, Heart, Scale, RotateCcw, Trophy, ArrowRight, BookOpen } from "lucide-react";
import { useProgress } from "@/context/ProgressContext";
import { useLanguage } from "@/context/LanguageContext";
import { useSecureLocalStorage } from "@/hooks/useSecureLocalStorage";
import { VaultWrapper } from "@/components/VaultWrapper";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function EmpathyTestPage() {
    const { completeModule } = useProgress();
    const { t } = useLanguage();

    // Persistence
    const { data: savedResult, setData, isLocked, hasData, unlock } = useSecureLocalStorage<EmpathyProfile | null>("suojasiipi_empathy_result", null);

    const [gameState, setGameState] = useState<'intro' | 'playing' | 'results'>('intro');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});

    // Check if we have a saved result
    useEffect(() => {
        if (savedResult && gameState === 'intro') {
            // Optional: Auto-show results logic can go here
        }
    }, [savedResult]);

    // Scroll to top when game state changes (Intro -> Playing, Playing -> Results)
    useEffect(() => {
        if (gameState !== 'intro') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [gameState]);

    const handleAnswer = (value: number) => {
        const newAnswers = { ...answers, [empathyQuestions[currentIndex].id]: value };
        setAnswers(newAnswers);

        if (currentIndex < empathyQuestions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            // NOTE: We do NOT scroll to top between questions to keep flow smooth.
            // Content should fit in viewport.
        } else {
            finishTest(newAnswers);
        }
    };

    const finishTest = (finalAnswers: Record<number, number>) => {
        const profile = calculateProfile(finalAnswers);
        setData(profile);
        setGameState('results');
        completeModule('empathy_test');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const reset = () => {
        setGameState('intro');
        setCurrentIndex(0);
        setAnswers({});
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const calculateScores = (currentAnswers: Record<number, number>) => {
        const scores = { cognitive: 0, affective: 0, moral: 0 };
        empathyQuestions.forEach(q => {
            scores[q.category] += (currentAnswers[q.id] || 0);
        });
        return scores;
    };

    const calculateProfile = (currentAnswers: Record<number, number>) => {
        return getEmpathyProfile(calculateScores(currentAnswers));
    }

    const currentProfile = gameState === 'results'
        ? calculateProfile(answers)
        : (savedResult || null);

    const categories = {
        cognitive: t('empathy_test.category_labels.cognitive'),
        affective: t('empathy_test.category_labels.affective'),
        moral: t('empathy_test.category_labels.moral')
    };

    // --- INTRO VIEW ---
    if (gameState === 'intro') {
        return (
            <div className="container mx-auto px-6 sm:px-8 max-w-screen-lg py-32 space-y-24 animate-in fade-in duration-700">
                <VaultWrapper isLocked={isLocked} hasData={hasData} onUnlock={unlock}>
                    <header className="space-y-12 max-w-2xl">
                        <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border-b border-[#5B4B8A] pb-1 inline-block">
                            {t('empathy_test.hero.label')}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-[#2B2B2B] leading-[1.1] tracking-tight whitespace-pre-line">
                            {t('empathy_test.hero.title')}
                        </h1>
                        <div className="space-y-6 max-w-xl">
                            <p className="text-lg text-[#4A4A4A] leading-relaxed">{t('empathy_test.hero.description_1')}</p>
                            <p className="text-lg text-[#4A4A4A] leading-relaxed">{t('empathy_test.hero.description_2')}</p>
                        </div>
                    </header>

                    <div className="space-y-12 border-t border-[#E8DDD0] pt-12">
                        <div className="grid md:grid-cols-3 gap-8 max-w-3xl">
                            <FeatureItem icon={Fingerprint} title={t('empathy_test.features.cognitive.title')} desc={t('empathy_test.features.cognitive.desc')} color="text-[#5B4B8A]" />
                            <FeatureItem icon={Heart} title={t('empathy_test.features.affective.title')} desc={t('empathy_test.features.affective.desc')} color="text-rose-600" />
                            <FeatureItem icon={Scale} title={t('empathy_test.features.moral.title')} desc={t('empathy_test.features.moral.desc')} color="text-emerald-700" />
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Button onClick={() => setGameState('playing')} className="bg-[#2B2B2B] text-white hover:bg-[#4A4A4A] px-8 py-6 text-lg rounded-full font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all hover:scale-105">
                                {savedResult ? t('empathy_test.actions.retry') : t('empathy_test.actions.start')} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            {savedResult && (
                                <Button variant="outline" onClick={() => setGameState('results')} className="border-[#2B2B2B] text-[#2B2B2B] hover:bg-[#2B2B2B] hover:text-white px-8 py-6 text-lg rounded-full font-bold uppercase tracking-widest transition-all">
                                    Näytä tulokset <Trophy className="ml-2 w-5 h-5" />
                                </Button>
                            )}
                        </div>
                    </div>
                </VaultWrapper>
            </div>
        );
    }

    // --- PLAYING VIEW (App-like fixed structure) ---
    if (gameState === 'playing') {
        return (
            <div className="fixed inset-0 z-[100] flex flex-col font-sans overflow-hidden bg-[#FDFBF7]">
                {/* Fixed Header */}
                <header className="shrink-0 h-16 bg-white border-b border-[#E8DDD0] px-4 sm:px-6 flex items-center justify-between z-30 gap-2">
                    <div className="flex items-center gap-2 sm:gap-4">
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#5B4B8A] whitespace-nowrap">
                            {t('empathy_test.progress', { current: currentIndex + 1, total: empathyQuestions.length })}
                        </span>
                        <div className="w-16 sm:w-24 h-1 bg-[#E8DDD0] rounded-full overflow-hidden shrink-0">
                            <div
                                className="h-full bg-[#5B4B8A] transition-all duration-500"
                                style={{ width: `${((currentIndex + 1) / empathyQuestions.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Category Label - Hidden on very small screens to save space */}
                    <span className="text-[10px] uppercase tracking-widest text-[#4A4A4A] hidden sm:inline-block truncate px-2">
                        {categories[empathyQuestions[currentIndex].category]}
                    </span>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setGameState('intro')}
                        className="opacity-50 hover:opacity-100 uppercase text-[10px] font-black tracking-widest px-2 sm:px-4 shrink-0"
                    >
                        <RotateCcw className="w-4 h-4 sm:mr-2" />
                        <span className="hidden sm:inline">{t('empathy_test.actions.quit')}</span>
                        <span className="sm:hidden">Lopeta</span> {/* Validating if trans key fails */}
                    </Button>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-12 pb-32 flex flex-col items-center justify-center min-h-0">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="max-w-2xl w-full space-y-6 sm:space-y-12 my-auto"
                    >
                        <div className="space-y-2 text-center">
                            <span className="sm:hidden text-[9px] font-bold uppercase tracking-widest text-[#4A4A4A] bg-[#E8DDD0] px-2 py-0.5 rounded-full">
                                {categories[empathyQuestions[currentIndex].category]}
                            </span>
                            <h3 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-[#2B2B2B] leading-tight text-center break-words hyphens-auto px-2">
                                {t(`empathy_test.questions.${empathyQuestions[currentIndex].id}`)}
                            </h3>
                        </div>

                        <div className="grid gap-3 w-full">
                            {[
                                { label: t('empathy_test.options.4'), value: 4 },
                                { label: t('empathy_test.options.3'), value: 3 },
                                { label: t('empathy_test.options.2'), value: 2 },
                                { label: t('empathy_test.options.1'), value: 1 }
                            ].map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => handleAnswer(opt.value)}
                                    className="w-full text-left p-4 sm:p-6 bg-white border border-[#E8DDD0] hover:border-[#5B4B8A] hover:bg-white hover:shadow-lg transition-all group rounded-xl flex items-center justify-between"
                                >
                                    <span className="text-sm sm:text-lg text-[#2B2B2B] group-hover:text-[#5B4B8A] font-medium font-serif">
                                        {opt.label}
                                    </span>
                                    <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 text-[#E8DDD0] group-hover:text-[#5B4B8A] opacity-0 group-hover:opacity-100 transition-all" />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </main>
            </div>
        );
    }

    // --- RESULTS VIEW ---
    if (gameState === 'results' && currentProfile) {
        return (
            <div className="container mx-auto px-6 sm:px-8 max-w-screen-lg py-12 space-y-12 animate-in slide-in-from-bottom-8 duration-700">
                <VaultWrapper isLocked={isLocked} hasData={hasData} onUnlock={unlock}>
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Left Col: Profile Intro */}
                        <div className="space-y-6">
                            <div className="inline-block px-3 py-1 bg-[#2B2B2B] text-white text-xs font-bold uppercase tracking-widest rounded-sm">
                                {t('empathy_test.results.your_profile')}
                            </div>
                            <h2 className="text-4xl font-serif font-bold text-[#2B2B2B] leading-tight flex items-center gap-4">
                                <span className="text-5xl">{currentProfile.icon}</span>
                                {t(`empathy_test.profiles.${currentProfile.key}.title`)}
                            </h2>
                            <p className="text-lg text-[#4A4A4A] leading-relaxed italic border-l-4 border-[#E8DDD0] pl-6 py-2">
                                {t(`empathy_test.profiles.${currentProfile.key}.description`)}
                            </p>

                            <div className="pt-6 flex flex-wrap gap-4">
                                <Link href="/profiili">
                                    <Button className="bg-[#2B2B2B] text-white hover:bg-[#4A4A4A] h-12 px-8 uppercase font-bold tracking-widest rounded-sm text-xs">
                                        {t('empathy_test.actions.view_rewards')} <Trophy className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                                <Button variant="outline" onClick={reset} className="border-[#2B2B2B] text-[#2B2B2B] hover:bg-[#2B2B2B] hover:text-white h-12 px-8 uppercase font-bold tracking-widest rounded-sm text-xs">
                                    <RotateCcw className="mr-2 w-4 h-4" /> {t('empathy_test.actions.retry')}
                                </Button>
                            </div>
                        </div>

                        {/* Right Col: Detailed Scores */}
                        <div className="space-y-8">
                            <div className="bg-[#FDFBF7] border border-[#E8DDD0] p-8 rounded-sm space-y-8">
                                <h3 className="font-bold text-xs uppercase tracking-widest text-[#4A4A4A] border-b border-[#E8DDD0] pb-4 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4" /> {t('empathy_test.results.breakdown')}
                                </h3>

                                <ScoreRow label={t('empathy_test.results.cognitive_label')} score={calculateScores(answers).cognitive} max={16} color="bg-[#5B4B8A]" desc={t('empathy_test.results.cognitive_desc')} />
                                <ScoreRow label={t('empathy_test.results.affective_label')} score={calculateScores(answers).affective} max={16} color="bg-rose-600" desc={t('empathy_test.results.affective_desc')} />
                                <ScoreRow label={t('empathy_test.results.moral_label')} score={calculateScores(answers).moral} max={16} color="bg-emerald-700" desc={t('empathy_test.results.moral_desc')} />
                            </div>

                            <div className="bg-white border border-[#E8DDD0] p-6 rounded-sm space-y-4">
                                <h4 className="font-bold text-xs uppercase tracking-widest text-[#5B4B8A]">{t('empathy_test.results.context_title')}</h4>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed">{t('empathy_test.results.context_intro')}</p>
                                <ul className="text-sm text-[#4A4A4A] space-y-2 list-disc pl-4">
                                    <li>{t('empathy_test.results.context_factors.stress')}</li>
                                    <li>{t('empathy_test.results.context_factors.trauma')}</li>
                                    <li>{t('empathy_test.results.context_factors.neurodiversity')}</li>
                                </ul>
                                <p className="text-xs text-[#5B4B8A] italic pt-2 border-t border-[#E8DDD0] mt-4">{t('empathy_test.results.disclaimer')}</p>
                            </div>
                        </div>
                    </div>
                </VaultWrapper>
            </div>
        );
    }

    return null; // Fallback
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
