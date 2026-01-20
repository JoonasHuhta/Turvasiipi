"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LiteracyScenario {
    id: number;
    text: string;
    isBullying: boolean;
    explanation: string;
}

export function LiteracyTest() {
    const { t } = useLanguage();
    const { completeModule } = useProgress();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [lastResult, setLastResult] = useState<{ isCorrect: boolean } | null>(null);
    const [isFinished, setIsFinished] = useState(false);

    const literacyScenarios = t('lukutaito_page.quicktest.scenarios', { returnObjects: true }) as LiteracyScenario[];
    const currentScenario = literacyScenarios[currentIndex];

    // Safe guard if scenarios are undefined or empty
    if (!literacyScenarios || literacyScenarios.length === 0) {
        return null;
    }

    // Additional safe guard for current scenario
    if (!currentScenario) {
        return null;
    }

    const handleAnswer = (userChoice: boolean) => {
        const isCorrect = userChoice === currentScenario.isBullying;
        if (isCorrect) setScore(prev => prev + 1);
        setLastResult({ isCorrect });
        setHasAnswered(true);
    };

    const nextScenario = () => {
        if (currentIndex < literacyScenarios.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setHasAnswered(false);
            setLastResult(null);
        } else {
            setIsFinished(true);
            completeModule('literacy_test');
        }
    };

    if (isFinished) {
        return (
            <div className="bg-white border border-[#E8DDD0] p-8 rounded-sm text-center">
                <h3 className="text-2xl font-serif font-bold text-[#2B2B2B] mb-2">{t('lukutaito_page.quicktest.result_title', { score, total: literacyScenarios.length })}</h3>
                <p className="text-[#4A4A4A] mb-6">{t('lukutaito_page.quicktest.result_desc')}</p>
                <Button onClick={() => { setIsFinished(false); setCurrentIndex(0); setScore(0); }} variant="outline" className="border-[#2B2B2B] text-[#2B2B2B] uppercase font-bold tracking-widest text-xs">
                    {t('lukutaito_page.quicktest.retry_btn')}
                </Button>
            </div>
        )
    }

    return (
        <div className="bg-white border border-[#E8DDD0] p-8 md:p-12 rounded-sm shadow-sm">
            <div className="flex justify-between items-center mb-8 border-b border-[#FAFAFA] pb-4">
                <h3 className="font-serif font-bold text-xl text-[#2B2B2B]">{t('lukutaito_page.quicktest.title_prefix')} {currentIndex + 1}</h3>
                <span className="text-xs font-mono text-[#5B4B8A]">{currentIndex + 1} / {literacyScenarios.length}</span>
            </div>

            <p className="text-lg text-[#2B2B2B] leading-relaxed mb-8 min-h-[80px]">
                &quot;{currentScenario.text}&quot;
            </p>

            {!hasAnswered ? (
                <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => handleAnswer(true)} className="p-6 border border-[#E8DDD0] hover:bg-[#FDFBF7] hover:border-[#5B4B8A] text-left transition-all group rounded-sm">
                        <span className="block font-bold text-[#2B2B2B] mb-1 group-hover:text-[#5B4B8A]">{t('lukutaito_page.quicktest.yes_btn')}</span>
                        <span className="text-xs text-[#4A4A4A]">{t('lukutaito_page.quicktest.yes_desc')}</span>
                    </button>
                    <button onClick={() => handleAnswer(false)} className="p-6 border border-[#E8DDD0] hover:bg-[#FDFBF7] hover:border-[#5B4B8A] text-left transition-all group rounded-sm">
                        <span className="block font-bold text-[#2B2B2B] mb-1 group-hover:text-[#5B4B8A]">{t('lukutaito_page.quicktest.no_btn')}</span>
                        <span className="text-xs text-[#4A4A4A]">{t('lukutaito_page.quicktest.no_desc')}</span>
                    </button>
                </div>
            ) : (
                <div className="space-y-6 animate-in fade-in">
                    <div className={cn("p-6 border-l-4 bg-[#FDFBF7]", lastResult?.isCorrect ? "border-[#5B4B8A]" : "border-[#E8DDD0]")}>
                        <h4 className="font-bold font-serif text-[#2B2B2B] mb-2">{lastResult?.isCorrect ? t('lukutaito_page.quicktest.correct_title') : t('lukutaito_page.quicktest.wrong_title')}</h4>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">{currentScenario.explanation}</p>
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={nextScenario} className="bg-[#2B2B2B] text-white hover:bg-[#4A4A4A] uppercase font-bold tracking-widest text-xs">
                            {t('lukutaito_page.quicktest.next_btn')} <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
