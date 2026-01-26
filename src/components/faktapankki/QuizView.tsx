"use client";

import { useState } from "react";
import { QuizPart, QuizQuestion } from "@/types/domain";
import { comprehensiveQuizData } from "@/data/tietovisa-questions";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, XCircle, RotateCcw, BookOpen, Library, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useLanguage } from "@/context/LanguageContext";

export function QuizView() {
    const { completeModule, awardBadge } = useProgress();
    const { t } = useLanguage();

    const quizDataRaw = t('quiz_content', { returnObjects: true });
    // Use imported data as fallback if translations is not available
    const quizData = Array.isArray(quizDataRaw) ? (quizDataRaw as QuizPart[]) : comprehensiveQuizData;


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
        ? quizData.flatMap(part => part.questions)
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
            if (activeQuestions.length > 0 && score / activeQuestions.length >= 0.8) {
                awardBadge('legal_expert');
            }
        }
    };

    const resetGame = () => {
        setSelectedPart(null);
        setGameEnded(false);
    };

    const getExpertFeedback = (score: number, total: number) => {
        const percentage = total === 0 ? 0 : (score / total) * 100;
        if (percentage < 40) return t('faktapankki.quiz_feedback.observer', { returnObjects: true }) as { title: string, text: string };
        if (percentage < 80) return t('faktapankki.quiz_feedback.alert', { returnObjects: true }) as { title: string, text: string };
        return t('faktapankki.quiz_feedback.expert', { returnObjects: true }) as { title: string, text: string };
    };

    // --- VIEW: MENU ---
    if (!selectedPart) {
        return (
            <div className="space-y-12 animate-in fade-in duration-500">
                <div className="space-y-6 border-b border-[#E8DDD0] pb-8">
                    <h2 className="text-3xl font-serif font-bold text-[#2B2B2B]">{t('faktapankki.quiz_ui.title')}</h2>
                    <p className="text-lg text-[#4A4A4A] max-w-2xl leading-relaxed">
                        {t('faktapankki.quiz_ui.description')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <button
                        className="md:col-span-2 bg-[#2B2B2B] text-white p-8 rounded-sm text-left hover:bg-[#4A4A4A] transition-colors group relative overflow-hidden"
                        onClick={() => handleStart('ALL')}
                    >
                        <Library className="w-12 h-12 text-white/10 absolute top-4 right-4" />
                        <h3 className="text-2xl font-serif font-bold mb-2 group-hover:underline decoration-1 underline-offset-4">
                            {t('faktapankki.quiz_ui.all_data_title')}
                        </h3>
                        <p className="text-white/70 mb-6 font-mono text-sm max-w-xl">
                            {t('faktapankki.quiz_ui.all_data_desc', { count: comprehensiveQuizData.flatMap(p => p.questions).length })}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                            {t('faktapankki.quiz_ui.start_btn')} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </button>

                    {quizData.map(part => (
                        <button
                            key={part.id}
                            className="bg-white border border-[#E8DDD0] p-8 rounded-sm text-left hover:border-[#5B4B8A] transition-all group hover:shadow-sm"
                            onClick={() => handleStart(part)}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#5B4B8A] border border-[#E8DDD0] bg-[#FDFBF7] px-2 py-1 rounded-sm">
                                    {t('faktapankki.quiz_ui.part_label', { id: part.id })}
                                </span>
                                <FileText className="w-5 h-5 text-[#E8DDD0] group-hover:text-[#5B4B8A] transition-colors" />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-[#2B2B2B] mb-2 group-hover:text-[#5B4B8A] transition-colors">
                                {part.title}
                            </h3>
                            <p className="text-sm text-[#4A4A4A] font-mono">
                                {t('faktapankki.quiz_ui.questions_count', { count: part.questions.length })}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // --- VIEW: RESULTS ---
    if (gameEnded) {
        const feedback = getExpertFeedback(score, activeQuestions.length);
        const percentage = Math.round((score / activeQuestions.length) * 100);

        return (
            <div className="flex flex-col items-center text-center animate-in fade-in duration-500">
                <div className="bg-white border border-[#E8DDD0] p-12 rounded-sm w-full space-y-8 shadow-sm">
                    <div className="w-20 h-20 bg-[#FDFBF7] rounded-full flex items-center justify-center mx-auto border border-[#E8DDD0]">
                        <span className="font-serif font-bold text-2xl text-[#2B2B2B]">{percentage}%</span>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-3xl font-serif font-bold text-[#2B2B2B]">{feedback.title}</h2>
                        <div className="w-12 h-1 bg-[#5B4B8A] mx-auto" />
                        <p className="text-[#4A4A4A] leading-relaxed text-lg max-w-lg mx-auto">
                            {feedback.text}
                        </p>
                    </div>

                    <div className="pt-8 border-t border-[#FAFAFA]">
                        <Button onClick={resetGame} variant="outline" className="border-[#2B2B2B] text-[#2B2B2B] hover:bg-[#2B2B2B] hover:text-white uppercase font-bold tracking-widest text-xs px-8 py-6 rounded-sm transition-all">
                            <RotateCcw className="w-4 h-4 mr-2" /> {t('faktapankki.quiz_ui.back_menu')}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // --- VIEW: QUESTION ---
    const question = activeQuestions[currentQuestionIndex];
    const progressPerc = ((currentQuestionIndex) / activeQuestions.length) * 100;

    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-full flex items-center justify-between mb-8 border-b border-[#E8DDD0] pb-4">
                <Button variant="ghost" onClick={resetGame} className="text-[#4A4A4A] hover:text-[#2B2B2B] pl-0 hover:bg-transparent">
                    <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <XCircle className="w-4 h-4" /> {t('faktapankki.quiz_ui.interrupt')}
                    </span>
                </Button>
                <div className="text-xs font-mono text-[#5B4B8A]">
                    {currentQuestionIndex + 1} / <span className="text-[#4A4A4A]">{activeQuestions.length}</span>
                </div>
            </div>

            <div className="w-full bg-[#E8DDD0] h-0.5 mb-12">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPerc}%` }}
                    className="h-full bg-[#5B4B8A]"
                />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={question.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full"
                >
                    <div className="bg-white border border-[#E8DDD0] p-8 md:p-12 rounded-sm shadow-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-[#5B4B8A] border border-[#5B4B8A] px-2 py-0.5 rounded-sm">
                                {t('faktapankki.quiz_ui.question_label')} {question.id}
                            </span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2B2B2B] leading-tight mb-12">
                            {question.text}
                        </h2>

                        {!showExplanation ? (
                            <div className="space-y-3">
                                {question.options.map((opt) => (
                                    <button
                                        key={opt.value}
                                        className="w-full text-left p-4 md:p-6 border border-[#E8DDD0] hover:border-[#5B4B8A] hover:bg-[#FDFBF7] transition-all flex items-baseline gap-4 group rounded-sm"
                                        onClick={() => handleAnswer(opt.value)}
                                    >
                                        <span className="font-mono text-sm font-bold text-[#4A4A4A] group-hover:text-[#5B4B8A] border-r border-[#E8DDD0] pr-4 py-1">
                                            {opt.value}
                                        </span>
                                        <span className="text-base text-[#4A4A4A] group-hover:text-[#2B2B2B] transition-colors leading-relaxed">
                                            {opt.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div className={`p-6 border-l-4 ${lastCorrect ? 'border-[#5B4B8A] bg-[#FDFBF7]' : 'border-[#4A4A4A] bg-[#FAFAFA]'}`}>
                                    <h3 className="font-bold font-serif text-xl text-[#2B2B2B] mb-2 flex items-center gap-2">
                                        {lastCorrect ? (
                                            <><CheckCircle2 className="w-5 h-5 text-[#5B4B8A]" /> {t('faktapankki.quiz_ui.correct')}</>
                                        ) : (
                                            <><XCircle className="w-5 h-5 text-[#4A4A4A]" /> {t('faktapankki.quiz_ui.wrong')}</>
                                        )}
                                    </h3>
                                    <p className="text-sm font-mono text-[#4A4A4A]">
                                        {t('faktapankki.quiz_ui.correct_answer', { answer: question.correctAnswer })}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#5B4B8A] flex items-center gap-2">
                                        <BookOpen className="w-3 h-3" /> {t('faktapankki.quiz_ui.explanation')}
                                    </h4>
                                    <p className="text-[#2B2B2B] leading-relaxed text-lg font-serif">
                                        {question.explanation}
                                    </p>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <Button
                                        onClick={nextQuestion}
                                        className="bg-[#2B2B2B] text-white hover:bg-[#4A4A4A] uppercase font-bold tracking-widest text-xs px-8 h-12 rounded-sm"
                                    >
                                        {t('faktapankki.quiz_ui.next')} <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
