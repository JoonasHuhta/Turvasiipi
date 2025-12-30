"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { quizQuestions, getRiskLevel } from "@/data/questions";
import { ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


export default function QuizPage() {
    const [hasStarted, setHasStarted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const handleAnswer = (isYes: boolean) => {
        if (isYes) setScore((prev) => prev + 1);

        if (currentIndex < quizQuestions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            setIsFinished(true);
        }
    };

    const resetQuiz = () => {
        setHasStarted(false);
        setCurrentIndex(0);
        setScore(0);
        setIsFinished(false);
    };

    const startQuiz = () => {
        setHasStarted(true);
    };

    const progress = ((currentIndex + 1) / quizQuestions.length) * 100;
    const currentQuestion = quizQuestions[currentIndex];
    const risk = getRiskLevel(score);

    if (!hasStarted) {
        return (
            <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
                <section className="space-y-6 text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">
                        Tunnistatko nämä ajatukset?
                    </h1>
                </section>

                <div className="grid gap-6">
                    {/* Item 1 */}
                    <Card className="bg-white/50 border-slate-200">
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl pt-1">💭</span>
                                    <p className="text-lg font-medium text-slate-800 italic">
                                        &quot;En ole varma, onko tämä oikeasti kiusaamista...&quot;
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 pl-11 text-slate-600">
                                    <ArrowRight className="w-5 h-5 text-primary shrink-0" />
                                    <p>Gaslighting saa sinut epäilemään itseäsi</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Item 2 */}
                    <Card className="bg-white/50 border-slate-200">
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl pt-1">💭</span>
                                    <p className="text-lg font-medium text-slate-800 italic">
                                        &quot;Ehkä olen liian herkkä. Ehkä ansaitsen tämän.&quot;
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 pl-11 text-slate-600">
                                    <ArrowRight className="w-5 h-5 text-primary shrink-0" />
                                    <p><span className="font-bold text-red-600">EI.</span> Kukaan ei ansaitse epäasiallista kohtelua.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Item 3 */}
                    <Card className="bg-white/50 border-slate-200">
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl pt-1">💭</span>
                                    <p className="text-lg font-medium text-slate-800 italic">
                                        &quot;Minulla ei ole todisteita. Kukaan ei usko.&quot;
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 pl-11 text-slate-600">
                                    <ArrowRight className="w-5 h-5 text-primary shrink-0" />
                                    <p>Siksi tarvitset dokumentoinnin <span className="font-bold">NYT</span>.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Item 4 */}
                    <Card className="bg-white/50 border-slate-200">
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl pt-1">💭</span>
                                    <p className="text-lg font-medium text-slate-800 italic">
                                        &quot;En tiedä, mitä pitäisi tehdä. Pelkään kostoa.&quot;
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 pl-11 text-slate-600">
                                    <ArrowRight className="w-5 h-5 text-primary shrink-0" />
                                    <p>Suojasiipi näyttää step-by-step polun.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Item 5 */}
                    <Card className="bg-white/50 border-slate-200">
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl pt-1">💭</span>
                                    <p className="text-lg font-medium text-slate-800 italic">
                                        &quot;Olen yksin tämän kanssa. Kukaan ei ymmärrä.&quot;
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 pl-11 text-slate-600">
                                    <ArrowRight className="w-5 h-5 text-primary shrink-0" />
                                    <p>120,000 muuta suomalaista ymmärtää täydellisesti.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>

                <div className="space-y-6 pt-8">
                    <h2 className="text-2xl font-bold text-center text-slate-900 uppercase">
                        Miksi sinun pitää toimia nyt?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Negative / Wait */}
                        <Card className="bg-red-50/50 border-red-200">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-red-700">
                                    <span className="text-xl">❌</span>
                                    Jos odotat:
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {[
                                        "Tilanne pahenee (kiusaaminen eskaloituu)",
                                        "Muistikuvat hämärtyvät (todisteet katoavat)",
                                        "Terveytesi kärsii (burnout, masennus)",
                                        "Joudut irtisanoutumaan ilman näyttöä",
                                        "Oikeusturvasi heikkenee"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-red-900/80">
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Positive / Act */}
                        <Card className="bg-green-50/50 border-green-200">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-green-700">
                                    <span className="text-xl">✅</span>
                                    Jos aloitat tänään:
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {[
                                        "Sinulla on kronologinen todistusaineisto",
                                        "Työnantaja ei voi kiistää tapahtumia",
                                        "Liitto/juristi voi auttaa tehokkaammin",
                                        "Säilytät työkykysi ja oikeutesi",
                                        "Toipuminen alkaa"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-green-900/80">
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="pt-4 flex justify-center">
                    <Button
                        size="lg"
                        onClick={startQuiz}
                        className="w-full md:w-auto px-8 py-6 text-lg gap-2 shadow-lg hover:scale-105 transition-transform"
                    >
                        Aloita tunnistuskysely – 2 minuuttia <ArrowRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        );
    }

    if (isFinished) {
        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <Card className="border-t-4 border-t-primary">
                    <CardHeader>
                        <CardTitle>Tuloksesi</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col items-center text-center p-6 bg-secondary/20 rounded-lg">
                            <span className="text-4xl font-bold mb-2">{score} / {quizQuestions.length}</span>
                            <h3 className={`text-2xl font-bold ${risk.color}`}>{risk.level}</h3>
                            <p className="mt-4 text-muted-foreground">{risk.description}</p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                        <Button variant="outline" onClick={resetQuiz} className="w-full sm:w-auto gap-2">
                            <RotateCcw className="w-4 h-4" /> Aloita alusta
                        </Button>
                        <Link href="/timeline" className="w-full sm:w-auto">
                            <Button className="w-full gap-2">
                                Aloita dokumentointi <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto space-y-8">
            <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Kysymys {currentIndex + 1} / {quizQuestions.length}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    <Card className="min-h-[200px] flex flex-col justify-center">
                        <CardHeader>
                            <CardTitle className="leading-relaxed text-xl">
                                {currentQuestion.text}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex gap-4 justify-center pt-4">
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-32 hover:bg-green-100 hover:text-green-700 hover:border-green-300 transition-all text-lg"
                                onClick={() => handleAnswer(true)}
                            >
                                Kyllä
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-32 hover:bg-slate-100 transition-all text-lg"
                                onClick={() => handleAnswer(false)}
                            >
                                Ei
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
