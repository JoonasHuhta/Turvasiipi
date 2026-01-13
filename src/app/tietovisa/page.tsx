"use client";

import { useState } from "react";
import { comprehensiveQuizData, QuizPart, QuizQuestion } from "@/data/tietovisa-questions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, CheckCircle2, XCircle, RotateCcw, Brain, BookOpen, Trophy, Play, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";

export default function TietovisaPage() {
    const { completeModule, awardBadge } = useProgress();
    const [selectedPart, setSelectedPart] = useState<QuizPart | 'ALL' | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<boolean[]>([]);
    const [showExplanation, setShowExplanation] = useState(false);
    const [lastCorrect, setLastCorrect] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);

    // Derived score
    const score = userAnswers.filter(Boolean).length;

    // Prepare questions based on selection
    const activeQuestions: QuizQuestion[] = selectedPart === 'ALL'
        ? comprehensiveQuizData.flatMap(part => part.questions)
        : selectedPart
            ? selectedPart.questions
            : [];

    const handleStart = (part: QuizPart | 'ALL') => {
        setSelectedPart(part);
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setShowExplanation(false);
        setGameEnded(false);
    };

    const handleAnswer = (value: string) => {
        const currentQ = activeQuestions[currentQuestionIndex];
        const isCorrect = value === currentQ.correctAnswer;

        setUserAnswers(prev => [...prev, isCorrect]);
        setLastCorrect(isCorrect);
        setShowExplanation(true);
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < activeQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setShowExplanation(false);
        } else {
            setGameEnded(true);
            completeModule('tietovisa');
            if (score / activeQuestions.length >= 0.8) {
                awardBadge('legal_expert');
            }
        }
    };

    const prevQuestion = () => {
        // If we are showing explanation, we just want to "undo" the answer attempt
        if (showExplanation) {
            setShowExplanation(false);
            setUserAnswers(prev => prev.slice(0, -1));
            return;
        }

        // If not showing explanation, we go to previous question AND reset it
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
            // Also undo the answer for that previous question so user can try again
            setUserAnswers(prev => prev.slice(0, -1));
            setShowExplanation(false);
        }
    };

    const resetGame = () => {
        setSelectedPart(null);
        setGameEnded(false);
    };

    const getExpertFeedback = (score: number, total: number) => {
        // If full quiz (35 questions)
        if (total === 35) {
            if (score === 0) return {
                title: "🥴 Työpaikan Pökkelö",
                text: "Et tiennyt oikein mitään! Mutta hyvä, että teit testin – nyt tiedät, mitä pitää oppia."
            };
            if (score <= 5) return {
                title: "😅 Kahvihuoneen Juoruammattilainen",
                text: "Sinulla on hajanaista tietoa, mutta ei kokonaisuuden hahmotusta. Luulet tietäväsi, mutta todellisuus on toinen."
            };
            if (score <= 10) return {
                title: "🤔 Aloitteleva Havainnoija",
                text: "Perustiedot puuttuvat vielä suurelta osin. Nyt on aika oppia tunnistamaan kiusaamisen dynamiikka ja sen vakavuus."
            };
            if (score <= 15) return {
                title: "📚 Työturvallisuuskortin Lukija",
                text: "Olet lukenut pakollisen koulutusmateriaalin. Tiedät perusasiat, mutta syvempi ymmärrys puuttuu."
            };
            if (score <= 20) return {
                title: "👀 Tarkkaavainen Työkaveri",
                text: "Hyvä perustietämys! Ymmärrät kiusaamisen pääpiirteet ja tunnistat yleisimmät muodot. Osaat tunnistaa räikeimmät tapaukset."
            };
            if (score <= 25) return {
                title: "🎓 Työhyvinvoinnin Ystävä",
                text: "Erittäin hyvä asiantuntemus! Ymmärrät kiusaamisen monimutkaisuuden ja tutkimusten keskeiset löydökset. Olisit hyvä luottamusmies."
            };
            if (score <= 28) return {
                title: "🛡️ Sivullisten Puolustaja",
                text: "Loistava tietämys! Tunnistat hienovaraisetkin kiusaamisen muodot ja ymmärrät sivullisten roolin. Olet arvokas resurssi työyhteisössä."
            };
            if (score <= 31) return {
                title: "🔍 Työpaikkakiusaamisen Tunnistaja",
                text: "Asiantuntijataso! Sinulla on syvällinen ymmärrys kiusaamisesta rakenteellisena, psykologisena ja organisatorisena ilmiönä."
            };
            if (score <= 34) return {
                title: "🏆 Työhyvinvoinnin Mestari",
                text: "Erinomainen suoritus! Tiedät, että kiusaaminen on hienovaraista valtapeliä, joka vaatii järjestelmällistä puuttumista. Voisit kouluttaa muita."
            };
            return {
                title: "👑 Työpaikan Oikeudenmukaisuuden Ritari",
                text: "Täydellinen suoritus! Sinulla on eksperttitason ymmärrys työpaikkakiusaamisesta kaikilla tasoillaan. Olet vaarallinen kiusaajille ja turva uhreille. Respekti! 🙌"
            };
        }

        // For smaller quizzes (e.g., 5 questions), map loosely to the same spirit
        const percentage = (score / total) * 100;
        if (percentage === 0) return { title: "🥴 Työpaikan Pökkelö", text: "Nyt meni kaikki ohi! Kannattaa tutustua aiheeseen tarkemmin." };
        if (percentage < 40) return { title: "🤔 Aloitteleva Havainnoija", text: "Perustiedoissa on vielä aukkoja. Hyvä että harjoittelet!" };
        if (percentage < 60) return { title: "📚 Työturvallisuuskortin Lukija", text: "Tiedät perusasiat, mutta tarkkuus puuttuu vielä." };
        if (percentage < 80) return { title: "👀 Tarkkaavainen Työkaveri", text: "Hyvä suoritus! Tunnistat useimmat tilanteet oikein." };
        if (percentage < 100) return { title: "🛡️ Sivullisten Puolustaja", text: "Erittäin hienoa työtä! Olet perillä asioista." };
        return { title: "👑 Oikeudenmukaisuuden Ritari", text: "Täydellinen suoritus tässä osiossa! Olet asian ytimessä." };
    };

    // --- VIEW: MENU ---
    if (!selectedPart) {
        return (
            <div className="min-h-screen bg-slate-50 py-12 px-4 animate-in fade-in duration-500">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center space-y-4">
                        <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200">Oppimiskeskus</Badge>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Työelämän faktapankki</h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Testaa tietosi työpaikkakiusaamisen tutkimuksista, laeista ja psykologiasta. Tieto on paras suoja.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <Card
                            className="md:col-span-2 bg-gradient-to-r from-slate-900 to-indigo-900 text-white border-none shadow-xl cursor-pointer hover:scale-[1.01] transition-transform"
                            onClick={() => handleStart('ALL')}
                        >
                            <CardContent className="p-8 flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                        <Trophy className="w-6 h-6 text-yellow-400" /> Koko testi
                                    </h3>
                                    <p className="text-slate-300">Haasta itsesi kaikilla 35 kysymyksellä.</p>
                                </div>
                                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full font-bold">
                                    Aloita <Play className="w-4 h-4 ml-2" />
                                </Button>
                            </CardContent>
                        </Card>

                        {comprehensiveQuizData.map(part => (
                            <Card
                                key={part.id}
                                className="hover:border-indigo-500 cursor-pointer transition-all hover:shadow-md group"
                                onClick={() => handleStart(part)}
                            >
                                <CardHeader>
                                    <CardTitle className="text-lg group-hover:text-indigo-700 transition-colors">
                                        {part.title}
                                    </CardTitle>
                                    <CardDescription>{part.questions.length} kysymystä</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // --- VIEW: RESULTS ---
    if (gameEnded) {
        const feedback = getExpertFeedback(score, activeQuestions.length);
        return (
            <div className="min-h-screen bg-slate-50 py-12 px-4 flex items-center justify-center animate-in zoom-in-95 duration-500">
                <Card className="max-w-2xl w-full border-none shadow-2xl overflow-hidden">
                    <div className="bg-slate-900 text-white p-12 text-center space-y-6">
                        <div className="text-6xl mb-4">🎓</div>
                        <h2 className="text-4xl font-black">Tulokset</h2>
                        <div className="text-8xl font-black text-indigo-400">
                            {score}<span className="text-4xl text-slate-500">/{activeQuestions.length}</span>
                        </div>
                    </div>
                    <CardContent className="p-8 space-y-6 text-center">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">{feedback.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">{feedback.text}</p>
                        </div>
                        <Button onClick={resetGame} size="lg" className="w-full rounded-full bg-slate-900 hover:bg-slate-800 h-14 text-lg">
                            <RotateCcw className="w-5 h-5 mr-2" /> Palaa valikkoon
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // --- VIEW: QUESTION ---
    const question = activeQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / activeQuestions.length) * 100;

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 flex flex-col items-center">
            <div className="w-full max-w-3xl mb-8 flex items-center gap-4">
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={resetGame} title="Lopeta peli">
                        <XCircle className="w-5 h-5 text-slate-400" />
                    </Button>
                    {/* Back Button */}
                    {(currentQuestionIndex > 0 || showExplanation) && (
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={prevQuestion}
                            title="Edellinen kysymys / Uusi yritys"
                            className="bg-white hover:bg-slate-50"
                        >
                            <ChevronLeft className="w-5 h-5 text-slate-600" />
                        </Button>
                    )}
                </div>
                <div className="flex-1">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                        <span>Edistyminen</span>
                        <span>{currentQuestionIndex + 1} / {activeQuestions.length}</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full max-w-3xl"
                >
                    <Card className="border-none shadow-xl overflow-hidden">
                        <CardHeader className="bg-white border-b p-8">
                            <Badge className="w-fit mb-4 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-100">
                                Kysymys {question.id}
                            </Badge>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                                {question.text}
                            </h2>
                        </CardHeader>

                        <CardContent className="p-8 bg-slate-50/50">
                            {!showExplanation ? (
                                <div className="grid gap-4">
                                    {question.options.map((opt) => (
                                        <Button
                                            key={opt.value}
                                            variant="outline"
                                            className="h-auto py-6 px-6 justify-start text-left text-base hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-900 transition-all bg-white border-slate-200"
                                            onClick={() => handleAnswer(opt.value)}
                                        >
                                            <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold mr-4 shrink-0">
                                                {opt.value}
                                            </span>
                                            {opt.label}
                                        </Button>
                                    ))}
                                </div>
                            ) : (
                                <div className={`rounded-xl p-8 border-2 ${lastCorrect ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'} animate-in zoom-in-95 duration-300`}>
                                    <div className="flex items-start gap-4 mb-6">
                                        {lastCorrect ? (
                                            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
                                                <CheckCircle2 className="w-8 h-8" />
                                            </div>
                                        ) : (
                                            <div className="p-3 bg-red-100 text-red-600 rounded-full">
                                                <XCircle className="w-8 h-8" />
                                            </div>
                                        )}
                                        <div>
                                            <h3 className={`text-xl font-bold mb-1 ${lastCorrect ? 'text-emerald-900' : 'text-red-900'}`}>
                                                {lastCorrect ? "Oikein!" : "Väärin"}
                                            </h3>
                                            <p className={`text-sm font-medium ${lastCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                                                Oikea vastaus oli: {question.correctAnswer}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-white/60 p-6 rounded-lg border border-slate-200/50 mb-6">
                                        <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">
                                            <BookOpen className="w-4 h-4" /> Asiantuntijan selitys
                                        </h4>
                                        <p className="text-slate-700 leading-relaxed text-lg">
                                            {question.explanation}
                                        </p>
                                    </div>

                                    <Button size="lg" onClick={nextQuestion} className={`w-full font-bold ${lastCorrect ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-900 hover:bg-slate-800'}`}>
                                        Seuraava kysymys <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
