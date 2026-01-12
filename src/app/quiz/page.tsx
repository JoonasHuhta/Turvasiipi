"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { quizQuestions, getRiskLevel, QuizCategory } from "@/data/questions";
import { bullyingTactics, Tactic, TacticCategory } from "@/data/tactics";
import { comparisonData, ComparisonPoint } from "@/data/comparison";
import {
    ArrowRight,
    RotateCcw,
    ShieldCheck,
    AlertTriangle,
    Brain,
    Info,
    Search,
    ChevronRight,
    MessageCircle,
    EyeOff,
    HeartPulse,
    UserX,
    TrendingUp,
    CheckCircle2,
    Scale,
    XCircle,
    CheckCircle,
    Zap,
    Activity,
    Quote,
    BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { cn } from "@/lib/utils";

export default function QuizPage() {
    const { t } = useLanguage();
    const { completeModule } = useProgress();
    const [activeTab, setActiveTab] = useState("quiz");
    const [hasStarted, setHasStarted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, boolean>>({});
    const [isFinished, setIsFinished] = useState(false);
    const [selectedTactic, setSelectedTactic] = useState<Tactic | null>(null);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const tacticScrollRef = useRef<HTMLDivElement>(null);

    const handleAnswer = (isYes: boolean) => {
        setAnswers(prev => ({ ...prev, [quizQuestions[currentIndex].id]: isYes }));

        if (currentIndex < quizQuestions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setIsFinished(true);
            scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
            completeModule('quiz_risks');
        }
    };

    const resetQuiz = () => {
        setHasStarted(false);
        setCurrentIndex(0);
        setAnswers({});
        setIsFinished(false);
        scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Reset tactic modal scroll when opening
    const handleTacticOpenChange = (open: boolean) => {
        if (!open) {
            setSelectedTactic(null);
        } else if (open) {
            // Small timeout to ensure the modal content is rendered
            setTimeout(() => {
                if (tacticScrollRef.current) {
                    tacticScrollRef.current.scrollTop = 0;
                }
            }, 50); // Increased delay slightly
        }
    };

    // Secondary reset when selectedTactic changes
    useEffect(() => {
        if (selectedTactic) {
            setTimeout(() => {
                if (tacticScrollRef.current) {
                    tacticScrollRef.current.scrollTop = 0;
                }
            }, 50);
        }
    }, [selectedTactic]);

    const score = Object.values(answers).filter(Boolean).length;
    const progress = ((currentIndex + 1) / quizQuestions.length) * 100;
    const currentQuestion = quizQuestions[currentIndex];
    const risk = getRiskLevel(score);

    const categoryScores = useMemo(() => {
        const scores: Record<QuizCategory, { score: number; total: number }> = {
            itsetunto: { score: 0, total: 0 },
            todellisuus: { score: 0, total: 0 },
            eristyksissä: { score: 0, total: 0 },
            fyysiset: { score: 0, total: 0 },
            käyttäytyminen: { score: 0, total: 0 }
        };

        quizQuestions.forEach(q => {
            scores[q.category].total++;
            if (answers[q.id]) {
                scores[q.category].score++;
            }
        });

        return scores;
    }, [answers]);

    const categoryLabels: Record<QuizCategory, { label: string; icon: any; description: string }> = {
        itsetunto: {
            label: t('quiz.categories.itsetunto.label'),
            icon: HeartPulse,
            description: t('quiz.categories.itsetunto.description')
        },
        todellisuus: {
            label: t('quiz.categories.todellisuus.label'),
            icon: EyeOff,
            description: t('quiz.categories.todellisuus.description')
        },
        eristyksissä: {
            label: t('quiz.categories.eristyksissä.label'),
            icon: UserX,
            description: t('quiz.categories.eristyksissä.description')
        },
        fyysiset: {
            label: t('quiz.categories.fyysiset.label'),
            icon: Brain,
            description: t('quiz.categories.fyysiset.description')
        },
        käyttäytyminen: {
            label: t('quiz.categories.käyttäytyminen.label'),
            icon: TrendingUp,
            description: t('quiz.categories.käyttäytyminen.description')
        }
    };

    // Dedicated Question OR Result View
    if (hasStarted && activeTab === "quiz") {
        if (isFinished) {
            return (
                <div className="fixed inset-0 z-[100] flex flex-col font-sans overflow-hidden bg-slate-50">
                    {/* Results Header */}
                    <header className="shrink-0 h-16 bg-white border-b px-6 flex items-center justify-between z-30">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col">
                                <Badge className="bg-primary text-white uppercase font-black text-[9px] py-0 px-2 w-fit mb-0.5">
                                    {t('quiz.results.analyzing')}
                                </Badge>
                                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest leading-none">
                                    Analyysi valmistui
                                </span>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={resetQuiz}
                            className="opacity-50 hover:opacity-100 uppercase text-[10px] font-black tracking-widest h-8 px-2 flex items-center gap-1"
                        >
                            <RotateCcw className="w-3 h-3" /> {t('quiz.results.restart')}
                        </Button>
                    </header>

                    {/* Main Results Content (Scrollable) */}
                    <main ref={scrollContainerRef} className="flex-1 overflow-y-auto relative flex flex-col items-center p-6 pb-24">
                        <div className="max-w-3xl w-full space-y-12 py-4 animate-in slide-in-from-bottom-4 duration-700">
                            {/* Score Card */}
                            <Card className="border-none shadow-2xl overflow-hidden rounded-[2.5rem]">
                                <CardHeader className={`${risk.level.includes('Kriittinen') || risk.key === 'severe' || risk.key === 'critical' ? 'bg-red-50' : 'bg-slate-50'} p-8 border-b`}>
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                                        <div className="space-y-2 text-center md:text-left">
                                            <CardTitle className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
                                                {t('quiz.results.score')} <br />
                                                <span className={risk.color}>{t(`quiz.risk_levels.${risk.key || 'stable'}.label`)}</span>
                                            </CardTitle>
                                        </div>
                                        <div className="bg-white shadow-xl rounded-full w-24 h-24 flex items-center justify-center border-4 border-slate-100 shrink-0">
                                            <span className="text-3xl font-black text-slate-900">{score}<span className="text-sm opacity-30">/25</span></span>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-8 space-y-12">
                                    <section className="bg-slate-900 text-white p-6 rounded-2xl space-y-3 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-8 opacity-10">
                                            <AlertTriangle className="w-32 h-32" />
                                        </div>
                                        <h3 className="text-xl font-bold uppercase tracking-tight relative z-10 flex items-center gap-2">
                                            <MessageCircle className="w-5 h-5 text-primary" /> {t('quiz.results.interpretation_title')}
                                        </h3>
                                        <p className="text-lg font-light leading-relaxed opacity-90 relative z-10">
                                            {t(`quiz.risk_levels.${risk.key || 'stable'}.description`)}
                                        </p>
                                        <p className="text-sm opacity-60 italic relative z-10">{t('quiz.results.disclaimer')}</p>
                                    </section>

                                    {/* CRITICAL SIGNALS SECTION */}
                                    {Object.entries(categoryScores).some(([_, data]) => data.score >= 4) && (
                                        <div className="space-y-4">
                                            <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-2">
                                                <Zap className="w-6 h-6 text-yellow-400" /> {t('quiz.critical_signals.title')}
                                            </h3>
                                            <div className="grid gap-3">
                                                {(Object.entries(categoryScores) as [QuizCategory, { score: number; total: number }][])
                                                    .filter(([_, data]) => data.score >= 4)
                                                    .map(([key]) => (
                                                        <div key={key} className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-start gap-4 animate-in fade-in slide-in-from-left-2 transition-all">
                                                            <div className="bg-red-600 text-white p-2 rounded-lg shrink-0">
                                                                <AlertTriangle className="w-4 h-4" />
                                                            </div>
                                                            <p className="text-sm text-red-900 font-medium leading-relaxed italic">
                                                                {t(`quiz.critical_signals.${key}`)}
                                                            </p>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* NUANCED RECOMMENDATIONS - BASED ON TIER */}
                                    <section className="space-y-6">
                                        <div className="p-8 bg-primary/5 rounded-[2rem] border-2 border-primary/10 space-y-6">
                                            <h3 className="text-2xl font-black uppercase tracking-tighter text-primary flex items-center gap-3">
                                                <ShieldCheck className="w-8 h-8" /> {t('quiz.results.steps_title')}
                                            </h3>
                                            <ul className="grid sm:grid-cols-2 gap-4">
                                                {((t(`quiz.tiered_recommendations.${risk.key || 'stable'}`, { returnObjects: true }) as any[]) || []).map((item: any, i: number) => (
                                                    <li key={i} className="bg-white p-5 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all flex flex-col justify-between shadow-sm">
                                                        <div className="space-y-2">
                                                            <h4 className="font-bold text-slate-900">{item.title}</h4>
                                                            <p className="text-xs text-slate-500 leading-relaxed">{item.text}</p>
                                                        </div>
                                                        {item.link ? (
                                                            <Link href={item.link} className="mt-4">
                                                                <Button variant="ghost" size="sm" className="w-full text-xs font-black uppercase tracking-widest text-primary gap-1 p-0 justify-start hover:bg-transparent">
                                                                    {item.label} <ChevronRight className="w-3 h-3" />
                                                                </Button>
                                                            </Link>
                                                        ) : (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="mt-4 w-full text-xs font-black uppercase tracking-widest text-primary gap-1 p-0 justify-start hover:bg-transparent"
                                                                onClick={() => {
                                                                    if (item.action === 'tactics') {
                                                                        setIsFinished(false);
                                                                        setHasStarted(false);
                                                                        setActiveTab('tactics');
                                                                    } else if (item.action === 'compare') {
                                                                        setIsFinished(false);
                                                                        setHasStarted(false);
                                                                        setActiveTab('compare');
                                                                    }
                                                                }}
                                                            >
                                                                {item.label} <ChevronRight className="w-3 h-3" />
                                                            </Button>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </section>
                                </CardContent>
                                <CardFooter className="p-8 border-t bg-slate-50 flex flex-col sm:flex-row gap-4 justify-between">
                                    <Button variant="ghost" onClick={resetQuiz} className="uppercase font-black tracking-widest gap-2">
                                        <RotateCcw className="w-4 h-4" /> {t('quiz.results.restart')}
                                    </Button>
                                    <Link href={risk.key === 'severe' || risk.key === 'critical' ? "/timeline" : "/valmennus"}>
                                        <Button className="rounded-full px-10 py-6 uppercase font-black tracking-widest shadow-xl shadow-primary/30">
                                            {risk.key === 'severe' || risk.key === 'critical' ? t('quiz.results.log_action') : "Jatka harjoittelua"} <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>

                            {/* Signal Details (Accordions or simple list) */}
                            <div className="space-y-6">
                                <h3 className="text-2xl font-black uppercase tracking-tighter">{t('quiz.results.signals_title')}</h3>
                                <div className="grid gap-4">
                                    {(Object.entries(categoryScores) as [QuizCategory, { score: number; total: number }][])
                                        .sort((a, b) => b[1].score - a[1].score)
                                        .map(([key, data]) => (
                                            <div key={key} className="bg-white p-6 rounded-3xl border border-slate-100 flex flex-col md:flex-row items-center gap-6 shadow-sm">
                                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${data.score > data.total / 2 ? 'bg-red-100 text-red-600' : 'bg-primary/10 text-primary'}`}>
                                                    <div className="w-8 h-8">
                                                        {(() => {
                                                            const Icon = categoryLabels[key].icon;
                                                            return <Icon className="w-full h-full" />;
                                                        })()}
                                                    </div>
                                                </div>
                                                <div className="flex-1 space-y-1 text-center md:text-left w-full">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <h4 className="font-black uppercase tracking-tight text-slate-900">{t(`quiz.categories.${key}.label`)}</h4>
                                                        <span className={`font-black text-sm px-2 py-0.5 rounded-full ${data.score > data.total / 2 ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                                                            {data.score}/{data.total}
                                                        </span>
                                                    </div>
                                                    <Progress
                                                        value={(data.score / data.total) * 100}
                                                        className={`h-2 mt-2 ${data.score > data.total / 2 ? 'bg-red-100' : 'bg-slate-200'}`}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            );
        }

        // Question rendering (KEEP EXISTING LOGIC)
        return (
            <div className="fixed inset-0 z-[100] flex flex-col font-sans overflow-hidden bg-white">
                {/* Fixed Header */}
                <header className="shrink-0 h-16 bg-slate-50 border-b px-6 flex items-center justify-between z-30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            {(() => {
                                const Icon = categoryLabels[currentQuestion.category].icon;
                                return <Icon className="w-6 h-6" />;
                            })()}
                        </div>
                        <div className="flex flex-col">
                            <Badge variant="secondary" className="bg-slate-200/50 text-slate-600 uppercase font-black text-[9px] py-0 px-2 w-fit mb-0.5">
                                {categoryLabels[currentQuestion.category].label}
                            </Badge>
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest leading-none">
                                {t('quiz.progress', { current: currentIndex + 1, total: quizQuestions.length })}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none mb-1">Eteneminen</span>
                        <span className="text-xl font-black leading-none text-primary">{Math.round(progress)}%</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={resetQuiz} className="ml-4 opacity-50 hover:opacity-100 uppercase text-[10px] font-black tracking-widest h-8 px-2">Lopeta</Button>
                </header>

                {/* Progress Bar (Fixed below header) */}
                <div className="shrink-0 w-full px-0">
                    <Progress value={progress} className="h-1 rounded-none bg-slate-100" />
                </div>

                {/* Main Content (Scrollable) */}
                <main ref={scrollContainerRef} className="flex-1 overflow-y-auto relative flex flex-col p-6 pb-20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="max-w-2xl mx-auto w-full text-center space-y-10 pt-4"
                        >
                            <div className="space-y-6">
                                <h2 className="text-xl sm:text-5xl font-black text-slate-900 tracking-tighter leading-[1.1] uppercase transition-all">
                                    {t(`quiz.questions.${currentQuestion.id}`)}
                                </h2>
                            </div>

                            <div className="max-w-sm mx-auto w-full flex gap-3 pb-8">
                                <Button
                                    size="lg"
                                    className="flex-1 py-6 sm:py-8 rounded-2xl text-lg sm:text-xl font-black uppercase tracking-widest bg-emerald-500 hover:bg-emerald-600 shadow-xl shadow-emerald-500/20 active:scale-95 transition-all h-auto"
                                    onClick={() => handleAnswer(true)}
                                >
                                    {t('quiz.card.yes')}
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="flex-1 py-6 sm:py-8 rounded-2xl text-lg sm:text-xl font-black uppercase tracking-widest border-2 hover:bg-slate-50 active:scale-95 transition-all text-slate-400 border-slate-200 h-auto"
                                    onClick={() => handleAnswer(false)}
                                >
                                    {t('quiz.card.no')}
                                </Button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </main>

                {/* Fixed Footer (Empty in quiz state) */}
                <footer className="shrink-0 bg-white border-t p-0 h-0 overflow-hidden opacity-0 pointer-events-none transition-all" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20 px-4">
            <section className="text-center space-y-6">
                {!isFinished && (
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 text-sm py-1 px-4 mb-2">
                        {t('quiz.hero.badge')}
                    </Badge>
                )}
                <h1 className="text-4xl sm:text-6xl font-black tracking-normal text-slate-900 uppercase leading-[0.9]">
                    {t('quiz.hero.title_start')} <br />
                    <span className="text-primary italic">{t('quiz.hero.title_highlight')}</span> {t('quiz.hero.title_end')}
                </h1>
                {!isFinished && (
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                        {t('quiz.hero.description')}
                    </p>
                )}
            </section>

            <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
                <div className="mb-12 w-full px-4">
                    <TabsList className="grid grid-cols-1 md:grid-cols-2 h-auto w-full max-w-xl mx-auto bg-slate-100/80 p-1.5 rounded-[2rem] sm:rounded-full border border-slate-200/50 shadow-sm gap-1">
                        <TabsTrigger
                            value="quiz"
                            className="rounded-full px-6 py-3 sm:py-2.5 text-xs font-bold uppercase tracking-wider transition-all data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md sm:whitespace-nowrap"
                        >
                            {t('quiz.tabs.quiz')}
                        </TabsTrigger>
                        <TabsTrigger
                            value="compare"
                            className="rounded-full px-6 py-3 sm:py-2.5 text-xs font-bold uppercase tracking-wider transition-all data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md sm:whitespace-nowrap"
                        >
                            {t('quiz.tabs.compare')}
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="quiz" className="space-y-12">
                    {isFinished ? (
                        <div className="max-w-3xl mx-auto py-12 text-center space-y-6">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary animate-bounce">
                                <ShieldCheck className="w-10 h-10" />
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-tighter">Analyysi valmistui</h2>
                            <p className="text-slate-500">Lopputulos on valmis tarkasteltavaksi.</p>
                            <Button size="lg" onClick={() => { setHasStarted(true); window.scrollTo(0, 0); }} className="rounded-full px-12 py-6 uppercase font-black tracking-widest shadow-xl shadow-primary/30">
                                Katso tulokset <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    ) : (
                        <div className="max-w-3xl mx-auto space-y-12 pb-32">
                            <div className="grid gap-4">
                                <Card className="border-none shadow-sm bg-slate-50">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg font-black uppercase tracking-tighter flex items-center gap-2 text-slate-900">
                                            <Search className="w-5 h-5 text-primary" /> {t('quiz.results.why_important')}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <ul className="grid sm:grid-cols-2 gap-4">
                                            {[
                                                { icon: "🛡️", title: t('quiz.step_actions.validate.title'), text: t('quiz.step_actions.validate.text') },
                                                { icon: "📝", title: t('quiz.step_actions.name.title'), text: t('quiz.step_actions.name.text') },
                                                { icon: "🛑", title: t('quiz.step_actions.boundaries.title'), text: t('quiz.step_actions.boundaries.text') },
                                                { icon: "⚖️", title: t('quiz.step_actions.justice.title'), text: t('quiz.step_actions.justice.text') }
                                            ].map((item, i) => (
                                                <li key={i} className="bg-white p-4 rounded-2xl border border-slate-100 space-y-2 shadow-sm">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xl">{item.icon}</span>
                                                        <span className="font-bold text-slate-900">{item.title}</span>
                                                    </div>
                                                    <p className="text-sm text-slate-600 leading-tight">{item.text}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="flex justify-center pb-20">
                                <Button
                                    size="lg"
                                    onClick={() => setHasStarted(true)}
                                    className="rounded-full px-12 py-8 text-xl font-black uppercase tracking-widest bg-primary hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20 gap-3 text-white"
                                >
                                    {t('quiz.results.start_analysis')} <ArrowRight className="w-6 h-6" />
                                </Button>
                            </div>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="compare">
                    <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom-4 duration-700 pb-20">
                        <section className="text-center space-y-4">
                            <Badge className="bg-indigo-100 text-indigo-700 uppercase font-black text-xs px-3 py-1">{t('quiz.compare_page.badge')}</Badge>
                            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase">
                                {t('quiz.compare_page.title_start')} <span className="text-primary italic">{t('quiz.compare_page.title_highlight')}</span> {t('quiz.compare_page.title_end')}
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
                                {t('quiz.compare_page.description')}
                            </p>
                        </section>

                        <div className="grid gap-6">
                            {comparisonData.map((point, i) => (
                                <Card key={i} className="border-none shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow">
                                    <div className="bg-slate-50 px-6 py-3 border-b flex items-center gap-3">
                                        <span className="text-xl">{point.icon}</span>
                                        <h4 className="font-black uppercase tracking-tight text-slate-900">{t(`quiz.comparison_points.${i}.title`)}</h4>
                                    </div>
                                    <CardContent className="p-0 flex flex-col md:flex-row">
                                        <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-slate-100 bg-red-50/10">
                                            <h5 className="text-red-600 font-black uppercase text-[10px] tracking-widest mb-3 flex items-center gap-2">
                                                <XCircle className="w-3 h-3" /> {t('quiz.compare_page.bullying_label')}
                                            </h5>
                                            <p className="text-slate-700 leading-relaxed font-medium">{t(`quiz.comparison_points.${i}.bullying`)}</p>
                                        </div>
                                        <div className="flex-1 p-6 bg-emerald-50/10">
                                            <h5 className="text-emerald-600 font-black uppercase text-[10px] tracking-widest mb-3 flex items-center gap-2">
                                                <CheckCircle className="w-3 h-3" /> {t('quiz.compare_page.criticism_label')}
                                            </h5>
                                            <p className="text-slate-700 leading-relaxed font-medium">{t(`quiz.comparison_points.${i}.criticism`)}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <Card className="bg-slate-900 text-white border-none shadow-2xl p-8 rounded-[2rem] relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                                <Scale className="w-32 h-32" />
                            </div>
                            <div className="relative z-10 space-y-4">
                                <h4 className="text-xl font-black uppercase tracking-tight text-primary">{t('quiz.compare_page.rule_title')}</h4>
                                <p className="text-lg font-light leading-relaxed opacity-90 max-w-2xl" dangerouslySetInnerHTML={{ __html: t('quiz.compare_page.rule_text') }} />
                            </div>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
