"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { quizQuestions, getRiskLevel } from "@/data/questions";
import { ArrowRight, RotateCcw, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { cn } from "@/lib/utils";

export default function QuizPage() {
    const { t } = useLanguage();
    const { completeModule } = useProgress();
    const [hasStarted, setHasStarted] = useState(false);
    const [answers, setAnswers] = useState<Record<number, boolean>>({});
    const [isFinished, setIsFinished] = useState(false);

    const handleAnswer = (questionId: number, answer: boolean) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const finish = () => {
        setIsFinished(true);
        completeModule('quiz_risks');
        window.scrollTo(0, 0);
    };

    const reset = () => {
        setHasStarted(false);
        setAnswers({});
        setIsFinished(false);
        window.scrollTo(0, 0);
    };

    const calculateScore = () => {
        return Object.values(answers).filter(Boolean).length;
    };

    if (!hasStarted) {
        return (
            <div className="container mx-auto px-6 sm:px-8 max-w-screen-md py-32 space-y-12">
                <header className="space-y-6">
                    <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border-b border-[#5B4B8A] pb-1">
                        {t('quiz.page.label')}
                    </span>
                    <h1 className="text-4xl font-bold text-[#2B2B2B] leading-tight">
                        {t('quiz.page.title')} <br />
                        <span className="text-[#4A4A4A] font-normal italic">{t('quiz.page.subtitle')}</span>
                    </h1>
                    <p className="text-lg text-[#4A4A4A] leading-relaxed max-w-xl">
                        {t('quiz.page.description')}
                    </p>
                </header>

                <div className="grid md:grid-cols-2 gap-8 text-sm text-[#4A4A4A]">
                    <div className="space-y-4 p-6 bg-white border border-[#E8DDD0] rounded-sm">
                        <strong className="block text-[#2B2B2B] uppercase tracking-widest text-xs">{t('quiz.page.what_measures_title')}</strong>
                        <ul className="space-y-2 list-disc list-inside">
                            {(t('quiz.page.what_measures_list', { returnObjects: true }) as string[]).map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-4 p-6 bg-white border border-[#E8DDD0] rounded-sm">
                        <strong className="block text-[#2B2B2B] uppercase tracking-widest text-xs">{t('quiz.page.what_not_measures_title')}</strong>
                        <ul className="space-y-2 list-disc list-inside">
                            {(t('quiz.page.what_not_measures_list', { returnObjects: true }) as string[]).map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <button
                    onClick={() => setHasStarted(true)}
                    className="bg-[#2B2B2B] text-white px-8 py-4 rounded-sm font-medium hover:bg-[#5B4B8A] transition-colors flex items-center gap-2"
                >
                    {t('quiz.page.start_btn')} <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        );
    }

    if (isFinished) {
        const score = calculateScore();
        const risk = getRiskLevel(score);

        return (
            <div className="container mx-auto px-6 sm:px-8 max-w-screen-md py-32 space-y-12">
                <div className="space-y-4">
                    <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border-b border-[#5B4B8A] pb-1">{t('quiz.page.analysis_label')}</span>
                    <h1 className="text-4xl font-bold text-[#2B2B2B]">
                        {t('quiz.page.analysis_title', { score, total: quizQuestions.length })}
                    </h1>
                </div>

                <div className={cn(
                    "p-8 border-l-4 rounded-sm space-y-4",
                    risk.key === 'critical' || risk.key === 'severe' ? "bg-red-50 border-red-500" : "bg-[#FDFBF7] border-[#5B4B8A]"
                )}>
                    <h2 className="text-xl font-bold text-[#2B2B2B] uppercase tracking-wide flex items-center gap-2">
                        {risk.key === 'critical' || risk.key === 'severe' ? <AlertTriangle className="w-5 h-5 text-red-600" /> : <Info className="w-5 h-5 text-[#5B4B8A]" />}
                        {t(`quiz.risk_levels.${risk.key || 'stable'}.label`)}
                    </h2>
                    <p className="text-[#4A4A4A] leading-relaxed">
                        {t(`quiz.risk_levels.${risk.key || 'stable'}.description`)}
                    </p>
                </div>

                <div className="space-y-6 pt-8 border-t border-[#E8DDD0]">
                    <h3 className="text-lg font-bold text-[#2B2B2B]">{t('quiz.page.recommendations_title')}</h3>
                    <div className="grid gap-4">
                        {((t(`quiz.tiered_recommendations.${risk.key || 'stable'}`, { returnObjects: true }) as any[]) || []).map((item: any, i: number) => (
                            <div key={i} className="bg-white p-6 border border-[#E8DDD0] rounded-sm hover:border-[#5B4B8A] transition-colors group cursor-pointer">
                                <h4 className="font-bold text-[#2B2B2B] group-hover:text-[#5B4B8A] transition-colors mb-2">{item.title}</h4>
                                <p className="text-sm text-[#4A4A4A]">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-6">
                    <Link href="/" className="text-[#5B4B8A] font-bold hover:underline flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 rotate-180" /> {t('quiz.page.back_home')}
                    </Link>
                    <button onClick={reset} className="text-[#4A4A4A] hover:text-[#2B2B2B] flex items-center gap-2 text-sm">
                        <RotateCcw className="w-4 h-4" /> {t('quiz.page.retry')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 sm:px-8 max-w-screen-md py-32 space-y-16">
            <header className="flex items-center justify-between border-b border-[#E8DDD0] pb-6 sticky top-20 bg-[#FDFBF7]/95 backdrop-blur-sm z-10">
                <span className="text-sm font-bold text-[#2B2B2B]">{t('quiz.page.label')}</span>
                <span className="text-[11px] font-mono text-[#4A4A4A]">
                    {t('quiz.page.progress', { answered: Object.keys(answers).length, total: quizQuestions.length })}
                </span>
            </header>

            <div className="space-y-16">
                {quizQuestions.map((q) => (
                    <div key={q.id} className="space-y-6">
                        <p className="text-xl md:text-2xl font-serif text-[#2B2B2B] leading-relaxed">
                            {t(`quiz.questions.${q.id}`)}
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => handleAnswer(q.id, true)}
                                className={cn(
                                    "px-6 py-3 rounded-sm border transition-all text-sm font-bold uppercase tracking-wide",
                                    answers[q.id] === true
                                        ? "bg-[#2B2B2B] text-white border-[#2B2B2B]"
                                        : "bg-white text-[#4A4A4A] border-[#E8DDD0] hover:border-[#5B4B8A]"
                                )}
                            >
                                {t('quiz.page.yes')}
                            </button>
                            <button
                                onClick={() => handleAnswer(q.id, false)}
                                className={cn(
                                    "px-6 py-3 rounded-sm border transition-all text-sm font-bold uppercase tracking-wide",
                                    answers[q.id] === false
                                        ? "bg-[#2B2B2B] text-white border-[#2B2B2B]"
                                        : "bg-white text-[#4A4A4A] border-[#E8DDD0] hover:border-[#5B4B8A]"
                                )}
                            >
                                {t('quiz.page.no')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-12 border-t border-[#E8DDD0] sticky bottom-0 bg-[#FDFBF7] pb-8">
                <button
                    onClick={finish}
                    disabled={Object.keys(answers).length < quizQuestions.length}
                    className="w-full sm:w-auto bg-[#5B4B8A] text-white px-8 py-4 rounded-sm font-medium tracking-wide hover:bg-[#4A3A7A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {t('quiz.page.view_analysis')} <ArrowRight className="w-4 h-4" />
                </button>
                {Object.keys(answers).length < quizQuestions.length && (
                    <p className="text-center text-xs text-[#4A4A4A] mt-4 font-mono">
                        {t('quiz.page.answer_all_hint')}
                    </p>
                )}
            </div>
        </div>
    );
}
