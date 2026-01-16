"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    feelingsQuestions,
    categoryWeights,
    getFeelingsRiskLevel,
    FeelingQuestion,
    FeelingCategory
} from "@/data/feelings-quiz";
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
    AlertTriangle,
    ShieldAlert,
    Phone,
    MessageCircle,
    Heart,
    Info
} from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";

export default function FeelingQuizPage() {
    const { completeModule } = useProgress();
    const [hasStarted, setHasStarted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [showValidation, setShowValidation] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const currentQuestion = feelingsQuestions[currentIndex];

    const handleAnswer = (value: number) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
        setShowValidation(true);
        scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const nextQuestion = () => {
        if (currentIndex < feelingsQuestions.length - 1) {
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
            // We might want to keep the answer visible? 
            // Current login resets showValidation to false, so it shows the question again.
            // That is fine, user can re-answer.
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
        let score = 0;
        Object.entries(answers).forEach(([id, value]) => {
            const question = feelingsQuestions.find(q => q.id === Number(id));
            if (question) {
                score += value * (categoryWeights[question.category] || 1);
            }
        });
        return Math.round(score);
    }, [answers]);

    const risk = getFeelingsRiskLevel(totalScore);

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

        feelingsQuestions.forEach(q => {
            const weight = categoryWeights[q.category] || 1;
            data[q.category].max += 4 * weight;
            if (answers[q.id] !== undefined) {
                data[q.category].score += answers[q.id] * weight;
            }
        });

        return data;
    }, [answers]);

    if (!hasStarted) {
        return (
            <div className="max-w-3xl mx-auto py-12 px-6 space-y-12 animate-in fade-in duration-700 pb-32">
                <section className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-primary/20">
                        <Heart className="w-3 h-3 fill-current" /> Itsearviointi
                    </div>
                    <h1 className="text-4xl sm:text-7xl font-black tracking-tighter text-slate-900 uppercase leading-[0.85] break-words hyphens-auto">
                        Uhrin <br />
                        <span className="text-primary italic">tuntemukset</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
                        Epäiletkö työpaikkakiusaamista? Tämä 5 minuutin testi auttaa sinua sanoittamaan tunteitasi ja normalisoimaan traumaasi.
                    </p>
                </section>

                <div className="grid gap-6 sm:grid-cols-2">
                    {[
                        { title: "Matala kynnys", text: "Vastaa rehellisesti omassa tahdissasi. Kukaan ei näe vastauksiasi.", icon: "🔒" },
                        { title: "Välitön palaute", text: "Opit normalisoivaa tietoa jokaisen vastauksen jälkeen.", icon: "💙" },
                        { title: "Painotettu analyysi", text: "Tunnistaa vakavimmat merkit, kuten gaslightingin.", icon: "📊" },
                        { title: "Kriisiavun ohjaus", text: "Tunnistaa akuutin avun tarpeen välittömästi.", icon: "🚨" }
                    ].map((item, i) => (
                        <Card key={i} className="border-none bg-slate-50 overflow-hidden group">
                            <CardContent className="p-6 flex items-start gap-4">
                                <span className="text-3xl group-hover:scale-110 transition-transform">{item.icon}</span>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                                    <p className="text-sm text-slate-600 leading-tight">{item.text}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="flex justify-center pt-8">
                    <Button
                        size="lg"
                        onClick={() => setHasStarted(true)}
                        className="rounded-full px-12 py-8 text-xl font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        Aloita arviointi <ArrowRight className="w-6 h-6 ml-2" />
                    </Button>
                </div>
            </div>
        );
    }

    if (isFinished) {
        return (
            <div className="max-w-4xl mx-auto py-12 px-6 animate-in zoom-in-95 fade-in duration-500 pb-32">
                <header className="text-center space-y-4 mb-12">
                    <Badge className="bg-primary/10 text-primary border-primary/20 uppercase font-black tracking-widest">Analyysi valmis</Badge>
                    <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none">Arviosi <span className="text-primary italic">tulokset</span></h1>
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
                                    Riskitaso: {risk.level}
                                </Badge>
                                <span className="text-xl font-black text-slate-400">Pisteet: {totalScore}</span>
                            </div>

                            <p className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-slate-900">
                                {totalScore > 80 ? "Tarvitset välitöntä tukea tilanteeseesi." :
                                    totalScore > 50 ? "Koet vakavaa ja systemaattista kuormitusta." :
                                        totalScore > 20 ? "Tilanteesi vaatii aktiivista seurantaa ja toimia." :
                                            "Tilanteesi vaikuttaa tällä hetkellä hallittavalta."}
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                {totalScore > 80 ? (
                                    <>
                                        <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-6 font-black uppercase tracking-widest gap-2" asChild>
                                            <a href="tel:0925250111"><Phone className="w-5 h-5" /> Soita kriisipuhelimeen</a>
                                        </Button>
                                        <Button variant="outline" className="rounded-full px-8 py-6 font-black uppercase tracking-widest border-2" asChild>
                                            <Link href="/timeline">Aloita dokumentointi</Link>
                                        </Button>
                                    </>
                                ) : (
                                    <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 font-black uppercase tracking-widest shadow-xl shadow-primary/20" asChild>
                                        <Link href="/timeline">Aloita dokumentointi</Link>
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
                                                {cat === 'itseepaily' ? 'Gaslighting & Itseepäily' :
                                                    cat === 'eristyksisyys' ? 'Eristyneisyys' :
                                                        cat === 'halvaantuminen' ? 'Halvaantuminen' :
                                                            cat === 'pelko' ? 'Pelko & Turvattomuus' :
                                                                cat === 'identiteetti' ? 'Identiteetin mureneminen' :
                                                                    'Fyysiset oireet'}
                                            </h4>
                                            <p className="font-bold text-slate-900">Painotettu rasitus</p>
                                        </div>
                                        <span className="font-black text-2xl text-primary">{Math.round((data.score / data.max) * 100)}%</span>
                                    </div>
                                    <Progress value={(data.score / data.max) * 100} className="h-3 bg-white" />
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="mt-12 p-8 bg-slate-900 text-white rounded-[2.5rem] space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight italic text-primary">💙 Muista tämä:</h3>
                    <p className="text-lg font-light leading-relaxed opacity-90">
                        Nämä tulokset eivät määritä arvoasi ihmisenä. Ne mittaavat vain sitä, kuinka raskaalla tavalla nykyinen ympäristösi vaikuttaa sinuun.
                        <strong> Kukaan ei ansaitse tätä.</strong> Turvasiipi on täällä auttaakseen sinua rakentamaan polun takaisin turvaan.
                    </p>
                    <div className="flex justify-center pt-4">
                        <Button variant="ghost" className="text-white/50 hover:text-white uppercase text-xs font-black tracking-widest" onClick={resetQuiz}>
                            <RotateCcw className="w-4 h-4 mr-2" /> Tee testi uudelleen
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

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
                            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none">Edistyminen</span>
                            <span className="text-[10px] text-primary font-black leading-none">{currentIndex + 1} / {feelingsQuestions.length}</span>
                        </div>
                        <Progress value={((currentIndex + 1) / feelingsQuestions.length) * 100} className="h-1" />
                    </div>
                </div>
                <Button variant="ghost" size="sm" onClick={resetQuiz} className="ml-4 opacity-50 hover:opacity-100 uppercase text-[10px] font-black tracking-widest h-8 px-2">Lopeta</Button>
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
                                    {currentQuestion.category === 'itseepaily' ? 'Itseepäily & Häpeä' :
                                        currentQuestion.category === 'eristyksisyys' ? 'Eristyneisyys' :
                                            currentQuestion.category === 'halvaantuminen' ? 'Halvaantuminen' :
                                                currentQuestion.category === 'pelko' ? 'Pelko & Turvattomuus' :
                                                    currentQuestion.category === 'identiteetti' ? 'Identiteetin mureneminen' :
                                                        'Fyysiset oireet'}
                                </Badge>
                                <h2 className="text-2xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] selection:bg-primary selection:text-white uppercase transition-all break-words hyphens-auto">
                                    {currentQuestion.question}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pb-6">
                                {[
                                    { label: "Kyllä, päivittäin", value: 4 },
                                    { label: "Kyllä, usein", value: 3 },
                                    { label: "Joskus", value: 2 },
                                    { label: "Harvoin", value: 1 },
                                    { label: "Ei koskaan", value: 0 }
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
                            Jatka <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    )}
                </div>
            </footer>
        </div>
    );
}
