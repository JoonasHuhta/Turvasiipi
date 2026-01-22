"use client";

import { useState } from "react";
import Link from "next/link";
import { quizQuestions, getRiskLevel, calculateScore } from "@/data/questions";
import { ArrowRight, RotateCcw, AlertTriangle, Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { cn } from "@/lib/utils";

export default function QuizPage() {
    const { t } = useLanguage();
    const { completeModule } = useProgress();
    const [hasStarted, setHasStarted] = useState(false);
    const [answers, setAnswers] = useState<Record<number, 1 | 2 | 3 | 4 | 5>>({});
    const [isFinished, setIsFinished] = useState(false);

    // Load translations safely
    const localizedQuestions = t('quiz.questions', { returnObjects: true }) as any[];

    const getQuestionText = (id: number) => {
        if (!Array.isArray(localizedQuestions)) return "";
        const q = localizedQuestions.find((item: any) => item.id === id);
        return q ? q.question : "";
    };

    const handleAnswer = (questionId: number, answer: 1 | 2 | 3 | 4 | 5) => {
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

                <div className="bg-blue-50 p-6 rounded-sm border border-blue-200 text-sm space-y-4">
                    <h3 className="font-bold text-[#2B2B2B] flex items-center gap-2">
                        <Info className="w-4 h-4 text-blue-600" />
                        Ennen kuin aloitat
                    </h3>
                    <p className="text-[#4A4A4A]">
                        Hengitä rauhallisesti. Tämä on vain yksi näkökulma tilanteeseesi.
                        Vastaukseri ovat täysin anonyymejä ja tallentuvat vain tälle laitteelle.
                    </p>
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
        const score = calculateScore(answers);
        const risk = getRiskLevel(score);
        const riskContent = t(`quiz.results.${risk.key}`, { returnObjects: true }) as any;

        return (
            <div className="container mx-auto px-6 sm:px-8 max-w-screen-md py-32 space-y-12">
                <div className="space-y-4">
                    <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border-b border-[#5B4B8A] pb-1">{t('quiz.page.analysis_label')}</span>
                    <h1 className="text-4xl font-bold text-[#2B2B2B]">
                        {t('quiz.page.analysis_title', { score, total: quizQuestions.length * 5 })}
                    </h1>
                </div>

                <div className={cn(
                    "p-8 border-l-4 rounded-sm space-y-4",
                    risk.key === 'red' ? "bg-red-50 border-red-500" :
                        risk.key === 'orange' ? "bg-orange-50 border-orange-500" :
                            risk.key === 'yellow' ? "bg-yellow-50 border-yellow-500" :
                                "bg-green-50 border-green-500"
                )}>
                    <h2 className={cn("text-xl font-bold uppercase tracking-wide flex items-center gap-2", risk.color)}>
                        {risk.key === 'red' ? <AlertTriangle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                        {riskContent.level}
                    </h2>
                    <p className="text-[#4A4A4A] leading-relaxed">
                        {riskContent.description}
                    </p>
                </div>

                {/* Alternative Explanations */}
                {riskContent.alternativeExplanations && riskContent.alternativeExplanations.length > 0 && (
                    <div className="bg-blue-50 p-6 rounded-sm border border-blue-200">
                        <h3 className="font-bold text-[#2B2B2B] mb-3 text-sm uppercase tracking-wide">
                            💡 Tämä voi myös johtua seuraavista syistä:
                        </h3>
                        <ul className="space-y-2 text-sm text-[#4A4A4A]">
                            {riskContent.alternativeExplanations.map((exp: string, i: number) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-blue-600 mt-1">•</span>
                                    <span>{exp}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Next Steps */}
                {riskContent.nextSteps && riskContent.nextSteps.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#2B2B2B]">
                            Seuraavat askeleet
                        </h3>
                        <div className="grid gap-4">
                            {riskContent.nextSteps.map((step: any, i: number) => (
                                <div key={i} className="p-6 border rounded-sm bg-white border-[#E8DDD0]">
                                    <h4 className="font-bold text-[#2B2B2B] mb-2">{step.title}</h4>
                                    <p className="text-sm text-[#4A4A4A]">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Resources */}
                {riskContent.resources && riskContent.resources.length > 0 && (
                    <div className="bg-purple-50 p-6 rounded-sm border border-purple-200">
                        <h3 className="font-bold text-[#2B2B2B] mb-3">
                            📞 Tärkeät yhteystiedot
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {riskContent.resources.map((resource: any, i: number) => (
                                <div key={i} className="mb-3">
                                    <p className="font-bold text-sm">{resource.name}</p>
                                    <p className="text-sm text-[#4A4A4A] font-mono">{resource.contact}</p>
                                    <p className="text-xs text-[#6A6A6A] italic">{resource.when}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="pt-8 flex flex-col sm:flex-row gap-6">
                    <Link href="/" className="text-[#5B4B8A] font-bold hover:underline flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 rotate-180" /> {t('quiz.page.back_home')}
                    </Link>
                    <button onClick={reset} className="text-[#4A4A4A] hover:text-[#2B2B2B] flex items-center gap-2 text-sm">
                        <RotateCcw className="w-4 h-4" /> {t('quiz.page.retry')}
                    </button>
                </div>

                <div className="bg-gray-50 p-4 rounded-sm border border-gray-200 text-xs text-[#6A6A6A] italic">
                    ⚠️ {riskContent.disclaimer}
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
                        <div className="space-y-2">
                            {q.positive && (
                                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-[10px] font-bold uppercase rounded-sm">
                                    Vahvuus
                                </span>
                            )}
                            <p className="text-xl md:text-2xl font-serif text-[#2B2B2B] leading-relaxed">
                                {getQuestionText(q.id)}
                            </p>
                        </div>

                        <div className="grid grid-cols-5 gap-2">
                            {[1, 2, 3, 4, 5].map((val) => {
                                const isSelected = answers[q.id] === val;
                                // Labels for tooltips or mobile could be added
                                const labels = ["Ei koskaan", "Harvoin", "Joskus", "Usein", "Päivittäin"];
                                return (
                                    <button
                                        key={val}
                                        onClick={() => handleAnswer(q.id, val as 1 | 2 | 3 | 4 | 5)}
                                        className={cn(
                                            "flex flex-col items-center justify-center p-2 rounded-sm border transition-all h-20",
                                            isSelected
                                                ? "bg-[#5B4B8A] text-white border-[#5B4B8A]"
                                                : "bg-white text-[#4A4A4A] border-[#E8DDD0] hover:border-[#5B4B8A] hover:bg-slate-50"
                                        )}
                                    >
                                        <span className="text-lg font-bold mb-1">{val}</span>
                                        <span className="text-[10px] uppercase font-bold opacity-70 hidden sm:block">
                                            {labels[val - 1]}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                        <div className="flex justify-between text-xs text-[#6A6A6A] px-1 sm:hidden">
                            <span>Ei koskaan</span>
                            <span>Päivittäin</span>
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
