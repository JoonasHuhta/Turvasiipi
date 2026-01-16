"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import {
    ArrowRight,
    ArrowLeft,
    RotateCcw,
    CheckCircle2,
    ShieldAlert,
    Phone,
    Heart,
} from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { useLanguage } from "@/context/LanguageContext";

type FeelingCategory =
    | "itseepaily"
    | "eristyksisyys"
    | "halvaantuminen"
    | "pelko"
    | "identiteetti"
    | "fyysiset";

interface FeelingQuestion {
    id: number;
    category: FeelingCategory;
    question: string;
    validationTitle: string;
    validationText: string;
    isCritical?: boolean;
}

const categoryWeights: Record<FeelingCategory, number> = {
    itseepaily: 3,
    eristyksisyys: 2,
    halvaantuminen: 2,
    pelko: 2,
    identiteetti: 1.5,
    fyysiset: 3
};

export default function FeelingQuizPage() {
    const { completeModule } = useProgress();
    const { t, language } = useLanguage();

    // Fetch questions from translation logic
    const questions = useMemo(() => {
        const q = t('feeling_quiz.questions', { returnObjects: true });
        return Array.isArray(q) ? (q as FeelingQuestion[]) : [];
    }, [language, t]);

    const [hasStarted, setHasStarted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [showValidation, setShowValidation] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Safeguard if questions aren't loaded yet
    const currentQuestion = questions[currentIndex];

    // Reset quiz if language changes significantly or questions reload?
    // Actually better to just keep state but the text updates dynamically.

    const handleAnswer = (value: number) => {
        if (!currentQuestion) return;
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
        setShowValidation(true);
        scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setShowValidation(false);
            scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setIsFinished(true);
            scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
            completeModule('feeling_quiz');
        }
    };

    const prevQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setShowValidation(false);
            scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const resetQuiz = () => {
        setHasStarted(false);
        setCurrentIndex(0);
        setAnswers({});
        setShowValidation(false);
        setIsFinished(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const totalScore = useMemo(() => {
        if (!questions.length) return 0;
        let score = 0;
        Object.entries(answers).forEach(([id, value]) => {
            const question = questions.find(q => q.id === Number(id));
            if (question) {
                // Determine category from question data (which comes from translation now, so key must suffice)
                // Note: The translation JSON 'category' string matches FeelingCategory type
                score += value * (categoryWeights[question.category] || 1);
            }
        });
        return Math.round(score);
    }, [answers, questions]);

    const risk = useMemo(() => {
        if (totalScore >= 81) return { level: t('feeling_quiz.risk_levels.critical'), color: "text-red-600", bg: "bg-red-50", border: "border-red-200" };
        if (totalScore >= 51) return { level: t('feeling_quiz.risk_levels.high'), color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" };
        if (totalScore >= 21) return { level: t('feeling_quiz.risk_levels.moderate'), color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" };
        return { level: t('feeling_quiz.risk_levels.mild'), color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" };
    }, [totalScore, t]);

    // Calculate categorical breakdowns
    const categoricalData = useMemo(() => {
        const data: Record<FeelingCategory, { score: number; max: number }> = {
            itseepaily: { score: 0, max: 0 },
            eristyksisyys: { score: 0, max: 0 },
            halvaantuminen: { score: 0, max: 0 },
            pelko: { score: 0, max: 0 },
            identiteetti: { score: 0, max: 0 },
            fyysiset: { score: 0, max: 0 }
        };

        questions.forEach(q => {
            // Ensure category exists in our record
            if (data[q.category]) {
                const weight = categoryWeights[q.category] || 1;
                data[q.category].max += 4 * weight;
                if (answers[q.id] !== undefined) {
                    data[q.category].score += answers[q.id] * weight;
                }
            }
        });

        return data;
    }, [answers, questions]);

    if (!hasStarted) {
        return (
            <div className="max-w-3xl mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-700 pb-32">
                <section className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-primary/20">
                        <Heart className="w-3 h-3 fill-current" /> {t('feeling_quiz.page.badge')}
                    </div>
                    <h1 className="text-4xl sm:text-7xl font-black tracking-tighter text-slate-900 uppercase leading-[0.85] break-words hyphens-auto">
                        {t('feeling_quiz.page.title_prefix')} <br />
                        <span className="text-primary italic">{t('feeling_quiz.page.title_highlight')}</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
                        {t('feeling_quiz.page.intro')}
                    </p>
                </section>

                <div className="grid gap-3 sm:grid-cols-2 lg:gap-6">
                    {[
                        {
                            title: t('feeling_quiz.page.features.threshold.title'),
                            text: t('feeling_quiz.page.features.threshold.text'),
                            icon: "🔒"
                        },
                        {
                            title: t('feeling_quiz.page.features.feedback.title'),
                            text: t('feeling_quiz.page.features.feedback.text'),
                            icon: "💙"
                        },
                        {
                            title: t('feeling_quiz.page.features.analysis.title'),
                            text: t('feeling_quiz.page.features.analysis.text'),
                            icon: "📊"
                        },
                        {
                            title: t('feeling_quiz.page.features.crisis.title'),
                            text: t('feeling_quiz.page.features.crisis.text'),
                            icon: "🚨"
                        }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 items-start hover:bg-slate-100 transition-colors">
                            <span className="text-2xl pt-1 shrink-0">{item.icon}</span>
                            <div className="space-y-1">
                                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">{item.title}</h3>
                                <p className="text-sm text-slate-600 leading-snug">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center pt-8">
                    <Button
                        size="lg"
                        onClick={() => setHasStarted(true)}
                        className="rounded-full px-12 py-8 text-xl font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        {t('feeling_quiz.page.start_btn')} <ArrowRight className="w-6 h-6 ml-2" />
                    </Button>
                </div>
            </div>
        );
    }

    if (isFinished) {
        return (
            <div className="max-w-4xl mx-auto py-12 px-6 animate-in zoom-in-95 fade-in duration-500 pb-32">
                <header className="text-center space-y-4 mb-12">
                    <Badge className="bg-primary/10 text-primary border-primary/20 uppercase font-black tracking-widest">{t('feeling_quiz.results.badge')}</Badge>
                    <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none">
                        {t('feeling_quiz.results.title')} <span className="text-primary italic">{t('feeling_quiz.results.title_highlight')}</span>
                    </h1>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Main Risk Result */}
                    <Card className={`lg:col-span-12 border-4 ${risk.border} ${risk.bg} p-8 rounded-[2.5rem] shadow-2xl overflow-hidden relative`}>
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            {totalScore > 80 ? <ShieldAlert className="w-48 h-48" /> : <CheckCircle2 className="w-48 h-48" />}
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center gap-3">
                                <Badge className={`uppercase font-black px-4 py-1 rounded-full ${totalScore > 50 ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'}`}>
                                    {t('feeling_quiz.results.risk_level')}: {risk.level}
                                </Badge>
                                <span className="text-xl font-black text-slate-400">{t('feeling_quiz.results.score')}: {totalScore}</span>
                            </div>

                            <p className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-slate-900">
                                {totalScore > 80 ? t('feeling_quiz.results.immediate_support') :
                                    totalScore > 50 ? t('feeling_quiz.results.severe_load') :
                                        totalScore > 20 ? t('feeling_quiz.results.active_action') :
                                            t('feeling_quiz.results.manageable')}
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                {totalScore > 80 ? (
                                    <>
                                        <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-6 font-black uppercase tracking-widest gap-2" asChild>
                                            <a href="tel:0925250111"><Phone className="w-5 h-5" /> {t('feeling_quiz.results.call_crisis')}</a>
                                        </Button>
                                        <Button variant="outline" className="rounded-full px-8 py-6 font-black uppercase tracking-widest border-2" asChild>
                                            <Link href="/timeline">{t('feeling_quiz.results.start_docs')}</Link>
                                        </Button>
                                    </>
                                ) : (
                                    <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 font-black uppercase tracking-widest shadow-xl shadow-primary/20" asChild>
                                        <Link href="/timeline">{t('feeling_quiz.results.start_docs')}</Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Breakdown per Category */}
                    <div className="lg:col-span-12 grid md:grid-cols-2 gap-6 pt-8">
                        {Object.entries(categoricalData).map(([cat, data]) => (
                            <Card key={cat} className="border-none bg-slate-50 p-6 rounded-3xl">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-0.5">
                                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">
                                                {t(`feeling_quiz.categories.${cat}` as any)}
                                            </h4>
                                            <p className="font-bold text-slate-900">{t('feeling_quiz.results.weighted_strain')}</p>
                                        </div>
                                        <span className="font-black text-2xl text-primary">{Math.round((data.score / (data.max || 1)) * 100)}%</span>
                                    </div>
                                    <Progress value={(data.score / (data.max || 1)) * 100} className="h-3 bg-white" />
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="mt-12 p-8 bg-slate-900 text-white rounded-[2.5rem] space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight italic text-primary">{t('feeling_quiz.results.remember_title')}</h3>
                    <p className="text-lg font-light leading-relaxed opacity-90">
                        {t('feeling_quiz.results.remember_text')}
                    </p>
                    <div className="flex justify-center pt-4">
                        <Button variant="ghost" className="text-white/50 hover:text-white uppercase text-xs font-black tracking-widest" onClick={resetQuiz}>
                            <RotateCcw className="w-4 h-4 mr-2" /> {t('feeling_quiz.results.retry_btn')}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (!currentQuestion) return null; // Safe exit if loading

    return (
        <div className="fixed inset-0 z-[100] flex flex-col font-sans overflow-hidden bg-white">
            {/* Fixed Header */}
            <header className="shrink-0 h-14 sm:h-16 bg-white border-b px-4 sm:px-6 flex items-center justify-between z-30">
                <div className="flex items-center gap-4 flex-1 max-w-md">
                    {currentIndex > 0 && (
                        <Button variant="ghost" size="icon" onClick={prevQuestion} className="-ml-2 mr-1">
                            <ArrowLeft className="w-5 h-5 text-slate-500" />
                        </Button>
                    )}
                    <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none">{t('feeling_quiz.page.progress')}</span>
                            <span className="text-[10px] text-primary font-black leading-none">{currentIndex + 1} / {questions.length}</span>
                        </div>
                        <Progress value={((currentIndex + 1) / questions.length) * 100} className="h-1" />
                    </div>
                </div>
                <Button variant="ghost" size="sm" onClick={resetQuiz} className="ml-4 opacity-50 hover:opacity-100 uppercase text-[10px] font-black tracking-widest h-8 px-2">{t('feeling_quiz.page.quit_btn')}</Button>
            </header>

            {/* Main Content (Scrollable) */}
            <main ref={scrollContainerRef} className="flex-1 overflow-y-auto relative flex flex-col p-4 sm:p-6 pb-20">
                <AnimatePresence mode="wait">
                    {!showValidation ? (
                        <motion.div
                            key={`q-${currentIndex}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-2xl mx-auto w-full space-y-8 pt-6 sm:pt-12"
                        >
                            <div className="space-y-4">
                                <Badge className="bg-primary text-white uppercase font-black tracking-widest px-3 py-0.5 text-[9px]">
                                    {t(`feeling_quiz.categories.${currentQuestion.category}` as any)}
                                </Badge>
                                <h2 className="text-2xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] selection:bg-primary selection:text-white uppercase transition-all break-words hyphens-auto">
                                    {currentQuestion.question}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pb-6">
                                {[
                                    { label: t('feeling_quiz.options.daily'), value: 4 },
                                    { label: t('feeling_quiz.options.often'), value: 3 },
                                    { label: t('feeling_quiz.options.sometimes'), value: 2 },
                                    { label: t('feeling_quiz.options.rarely'), value: 1 },
                                    { label: t('feeling_quiz.options.never'), value: 0 }
                                ].map((opt, i) => (
                                    <Button
                                        key={opt.label}
                                        variant="outline"
                                        onClick={() => handleAnswer(opt.value)}
                                        className={cn(
                                            "min-h-[3.5rem] h-auto py-3 rounded-xl border-2 border-slate-100 hover:border-primary hover:bg-primary/5 text-sm sm:text-base font-bold transition-all text-slate-700 text-center px-2 leading-tight whitespace-normal",
                                            i === 4 && "col-span-1 sm:col-span-2"
                                        )}
                                    >
                                        {opt.label}
                                    </Button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={`v-${currentIndex}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="max-w-2xl mx-auto w-full"
                        >
                            <Card className="border-none shadow-2xl bg-slate-900 text-white p-8 sm:p-12 rounded-[2.5rem] overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-8 text-primary opacity-20">
                                    <Heart className="w-32 h-32 fill-current" />
                                </div>

                                <div className="relative z-10 space-y-6">
                                    <section className="space-y-4">
                                        <h4 className="text-primary font-black uppercase tracking-[0.2em] text-[10px] italic">{currentQuestion.validationTitle}</h4>
                                        <p className="text-xl sm:text-2xl font-light leading-relaxed selection:bg-primary selection:text-white opacity-90">
                                            {currentQuestion.validationText}
                                        </p>
                                    </section>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Fixed Footer (Used only for Next button in validation) */}
            <footer className={cn(
                "shrink-0 bg-white border-t p-4 pb-8 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] transition-all",
                !showValidation && "opacity-0 pointer-events-none h-0 p-0"
            )}>
                <div className="max-w-md mx-auto w-full">
                    {showValidation && (
                        <Button
                            onClick={nextQuestion}
                            className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl h-16 text-xl font-black uppercase tracking-widest shadow-xl shadow-primary/40 group active:scale-95 transition-all"
                        >
                            {t('feeling_quiz.page.continue_btn')} <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    )}
                </div>
            </footer>
        </div>
    );
}
