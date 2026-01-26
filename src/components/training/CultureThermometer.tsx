"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Thermometer,
    ArrowRight,
    X,
    ShieldCheck,
    AlertTriangle,
    MessageCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";

// --- TYPES ---
interface Question {
    id: number;
    text: string;
    category: 'safety' | 'risk';
}

// --- COMPONENT ---
export default function CultureThermometer({
    moduleId,
    onComplete,
    onExit
}: {
    moduleId?: string;
    onComplete: (score: number) => void;
    onExit: () => void;
}) {
    const { t } = useLanguage();
    const [view, setView] = useState<'intro' | 'survey' | 'result'>('intro');
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [currentIdx, setCurrentIdx] = useState(0);

    // Load translations
    const content = t('training.culture_thermometer', { returnObjects: true }) as any;
    // Fallback if translations not loaded yet
    const questionsList = (content?.questions as string[]) || [];

    // Construct questions with category logic (mapping indices to categories)
    // Indices 0, 2, 7, 8 are 'safety' (Indices based on original array checks)
    // Indices 1, 3, 4, 5, 6, 9 are 'risk'
    const QUESTIONS: Question[] = questionsList.map((text, idx) => ({
        id: idx + 1,
        text,
        category: [0, 2, 7, 8].includes(idx) ? 'safety' : 'risk'
    }));

    const handleAnswer = (val: number) => {
        const newAnswers = { ...answers, [QUESTIONS[currentIdx].id]: val };
        setAnswers(newAnswers);

        if (currentIdx < QUESTIONS.length - 1) {
            setCurrentIdx(prev => prev + 1);
        } else {
            setView('result');
        }
    };

    const results = React.useMemo(() => {
        if (Object.keys(answers).length < QUESTIONS.length) return { safety: 0, risk: 0 };

        const safetyIds = QUESTIONS.filter(q => q.category === 'safety').map(q => q.id);
        const riskIds = QUESTIONS.filter(q => q.category === 'risk').map(q => q.id);

        const avgSafety = (safetyIds.reduce((acc, id) => acc + (answers[id] || 0), 0) / safetyIds.length);
        const avgRisk = (riskIds.reduce((acc, id) => acc + (answers[id] || 0), 0) / riskIds.length);

        return {
            safety: (avgSafety / 5) * 100,
            risk: (avgRisk / 5) * 100 // Higher is "Better" (stronger structural protection)
        };
    }, [answers, QUESTIONS]);

    return (
        <div className="relative min-h-[600px] w-full bg-[#FAFAF9] rounded-[2rem] p-4 md:p-8 flex flex-col gap-6 border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C]">

            {/* HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700">
                        <Thermometer className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black uppercase tracking-widest text-[#292524]">{content?.title}</h2>
                        <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">{content?.subtitle}</span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onExit} className="hover:bg-[#F5F5F4] text-[#78716C]">
                    <X className="w-5 h-5" />
                </Button>
            </div>

            <div className="flex-1 relative flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
                <AnimatePresence mode="wait">

                    {/* INTRO */}
                    {view === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="text-center space-y-8 max-w-2xl"
                        >
                            <h1 className="text-4xl font-serif font-black text-[#292524]" dangerouslySetInnerHTML={{ __html: content?.intro?.title }} />
                            <p className="text-lg text-[#57534E] leading-relaxed" dangerouslySetInnerHTML={{ __html: content?.intro?.text }} />
                            
                            <Button onClick={() => setView('survey')} size="lg" className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-8 py-6 text-lg shadow-lg">
                                {content?.intro?.start} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* SURVEY */}
                    {view === 'survey' && (
                        <motion.div
                            key="survey"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="w-full max-w-2xl space-y-12"
                        >
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-[#A8A29E]">
                                    <span>{content?.survey?.question} {currentIdx + 1} / {QUESTIONS.length}</span>
                                    <span>{Math.round(((currentIdx) / QUESTIONS.length) * 100)}% {content?.survey?.ready}</span>
                                </div>
                                <div className="h-1 w-full bg-[#F5F5F4] rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-rose-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <Card className="p-8 md:p-12 bg-white border-[#E7E5E4] shadow-sm text-center space-y-8">
                                <h3 className="text-2xl md:text-3xl font-serif font-black text-[#292524] leading-tight px-4">
                                    "{QUESTIONS[currentIdx]?.text}"
                                </h3>

                                <div className="flex flex-col md:flex-row gap-2 justify-center">
                                    {[1, 2, 3, 4, 5].map((val) => (
                                        <Button
                                            key={val}
                                            variant="outline"
                                            onClick={() => handleAnswer(val)}
                                            className="h-14 md:h-16 md:w-20 rounded-xl border-2 hover:border-rose-500 hover:bg-rose-50 font-black text-lg transition-all"
                                        >
                                            {val}
                                        </Button>
                                    ))}
                                </div>
                                <div className="flex justify-between px-4 text-[10px] font-black uppercase tracking-widest text-[#A8A29E]">
                                    <span>{content?.survey?.disagree}</span>
                                    <span>{content?.survey?.agree}</span>
                                </div>
                            </Card>
                        </motion.div>
                    )}

                    {/* RESULT */}
                    {view === 'result' && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center space-y-4">
                                <Badge className="bg-rose-100 text-rose-700 border-0">{content?.result?.badge}</Badge>
                                <h2 className="text-3xl font-bold">{content?.result?.title}</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <Card className="p-8 space-y-6">
                                    <div className="flex items-center gap-3 text-emerald-600">
                                        <ShieldCheck className="w-6 h-6" />
                                        <h4 className="font-bold uppercase tracking-widest text-xs">{content?.result?.safety_title}</h4>
                                    </div>
                                    <div className="text-5xl font-black text-[#292524]">{Math.round(results.safety)}%</div>
                                    <p className="text-sm text-[#78716C]">
                                        {content?.result?.safety_desc}
                                    </p>
                                </Card>

                                <Card className="p-8 space-y-6">
                                    <div className="flex items-center gap-3 text-indigo-600">
                                        <AlertTriangle className="w-6 h-6" />
                                        <h4 className="font-bold uppercase tracking-widest text-xs">{content?.result?.risk_title}</h4>
                                    </div>
                                    <div className="text-5xl font-black text-[#292524]">{Math.round(results.risk)}%</div>
                                    <p className="text-sm text-[#78716C]">
                                        {content?.result?.risk_desc}
                                    </p>
                                </Card>
                            </div>

                            <div className="p-8 bg-white border border-[#E7E5E4] rounded-3xl space-y-4">
                                <h4 className="font-bold flex items-center gap-2">
                                    <MessageCircle className="w-5 h-5 text-rose-500" /> {content?.result?.insight_title}
                                </h4>
                                <p className="text-[#57534E]">
                                    {results.safety < 50 || results.risk < 50
                                        ? content?.result?.critical
                                        : content?.result?.strong}
                                </p>
                            </div>

                            <Button onClick={() => onComplete(100)} className="w-full py-8 bg-[#292524] hover:bg-[#44403C] text-white rounded-2xl text-xl font-black shadow-xl">
                                {content?.result?.finish}
                            </Button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
