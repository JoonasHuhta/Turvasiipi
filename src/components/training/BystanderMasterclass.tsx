"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Eye,
    Brain,
    HandHelping,
    Shield,
    CheckCircle2,
    X,
    ArrowRight,
    AlertTriangle,
    Zap,
    FileText,
    Clock,
    MessageSquare
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

// --- TYPES ---
type Stage = 'intro' | 'identify' | 'responsibility' | '5d_model' | 'boundaries' | 'summary';

interface QuizItem {
    scenario: string;
    explanation: string;
}

interface Choice {
    text: string;
    nextStep?: string;
    feedback?: string;
    dType?: string;
}

interface ScenarioStep {
    id: string;
    speaker: string;
    text: string;
    choices: Choice[];
}

interface CheatSheetItem {
    title: string;
    desc: string;
}

// --- COMPONENT ---
export default function BystanderMasterclass({
    moduleId,
    onComplete,
    onExit
}: {
    moduleId?: string;
    onComplete: (score: number, passed: boolean) => void;
    onExit: () => void;
}) {
    const { t } = useLanguage();
    const [stage, setStage] = useState<Stage>('intro');
    const [score, setScore] = useState(0);

    // Stage 1 State
    const [quizIndex, setQuizIndex] = useState(0);
    const [showQuizFeedback, setShowQuizFeedback] = useState(false);
    const [lastQuizCorrect, setLastQuizCorrect] = useState(false);

    // Stage 2 State
    const [bystanderCount, setBystanderCount] = useState(1);

    // Stage 3 State
    const [scenarioStepId, setScenarioStepId] = useState('start');
    const [lastFeedback, setLastFeedback] = useState<string | null>(null);

    // Stage 4 State
    // (Simple checklist, no state needed other than render)

    // Data Loading
    const quizQuestions = t('training.bystander_masterclass.identify.questions', { returnObjects: true }) as QuizItem[];
    const scenarioSteps = t('training.bystander_masterclass.model_5d.scenario', { returnObjects: true }) as ScenarioStep[];
    const cheatSheet = t('training.bystander_masterclass.model_5d.cheat_sheet', { returnObjects: true }) as CheatSheetItem[];
    const checklist = t('training.bystander_masterclass.boundaries.checklist', { returnObjects: true }) as string[];
    const stagesLabels = t('training.bystander_masterclass.stages', { returnObjects: true }) as string[];

    // --- HANDLERS ---

    const handleIntroNext = () => setStage('identify');

    const handleQuizAnswer = (isYes: boolean) => {
        // Hardcoded logic: 1st is Yes (bullying), 2nd is No (normal), 3rd is Yes (ostracism)
        // Adjust if order changes in translation, but typically 1=Yes, 2=No, 3=Yes.
        // Array index 0 -> Yes, 1 -> No, 2 -> Yes.
        const correctAnswers = [true, false, true];
        const isCorrect = isYes === correctAnswers[quizIndex];

        setLastQuizCorrect(isCorrect);
        setShowQuizFeedback(true);
        if (isCorrect) setScore(s => s + 20);
    };

    const nextQuiz = () => {
        setShowQuizFeedback(false);
        if (quizIndex < quizQuestions.length - 1) {
            setQuizIndex(i => i + 1);
        } else {
            setStage('responsibility');
        }
    };

    const handleResponsibilityNext = () => setStage('5d_model');

    const handleScenarioChoice = (choice: Choice, stepIndex: number) => {
        if (choice.feedback) {
            setLastFeedback(choice.feedback);
            // In 5D model first step, all choices have feedbacks and imply action types.
            // Assign points for taking action.
            setScore(s => s + 30);
        }

        // Logic to move next:
        // Key scenario steps: start -> (distract_success | direct_success | delay_success) -> finish
        // Since translation array structure is flat or by ID, we find next step by ID logic or simple progression.
        // Our translation JSON structure for scenario is an ARRAY.
        // We need to find the next step based on choice logic.
        // In the JSON, choices don't explicitly have 'nextStep' ID in all cases, or English version implies flow.
        // Let's assume standard flow: Step 1 choices lead to their respective success steps.
        // If choice.text is "Continue", we go to next logical step or finish.

        // Simplified Logic for Demo:
        // If we are at 'start', specific choices map to specific success IDs.
        // Choice 0 -> distract_success
        // Choice 1 -> direct_success
        // Choice 2 -> delay_success

        let nextId = 'finish';
        if (scenarioStepId === 'start') {
            // We can infer by index since we just rendered them in order
            // But we passed `choice` object.
            // Let's rely on the structure of the scenario array in JSON.
            // It's [start, distract_success, direct_success, delay_success]

            // We need to know WHICH choice was clicked. 
            // Let's pass index in handler? No.
            // We check choice content or just map index 0->1, 1->2...
            // Wait, the component needs to know which step to show next.
            // PROPOSAL: Add 'nextStep' to the choice object in JSON? 
            // I didn't add it in the JSON content I created.
            // I'll hardcode the transition logic based on index for the 'start' step.

            // Actually, I can render the button based on index, and set nextId accordingly.
        }

        // Since I can't easily modify JSON now without another big write, I'll use logic mapping here.
        if (scenarioStepId === 'start') {
            // We need to know which option was picked.
            // I'll update the render loop to pass index.
        } else {
            // Success steps usually just have "Continue".
            // Navigate to boundaries.
            setTimeout(() => setStage('boundaries'), 500);
            return;
        }
    };

    // Better handler that takes index
    const handleStartChoice = (index: number, feedback: string) => {
        setLastFeedback(feedback);
        setScore(s => s + 30);
        // Map index to next step ID
        // 0 -> distract_success
        // 1 -> direct_success
        // 2 -> delay_success
        const map = ['distract_success', 'direct_success', 'delay_success'];
        setScenarioStepId(map[index] || 'distract_success');
    };

    const finishModule = () => {
        onComplete(score, true);
    };

    const currentScenarioStep = scenarioSteps.find(s => s.id === scenarioStepId) || scenarioSteps[0];

    return (
        <div className="relative min-h-[600px] w-full bg-[#FAFAF9] rounded-[2rem] p-4 md:p-8 flex flex-col gap-6 border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C]">

            {/* HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F5F5F4] flex items-center justify-center text-[#57534E]">
                        <Eye className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black uppercase tracking-widest text-[#292524]">{t('training.bystander_masterclass.title')}</h2>
                        <div className="flex gap-2 text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest hidden sm:flex">
                            {stagesLabels.map((label, i) => (
                                <React.Fragment key={i}>
                                    <span className={cn(
                                        (i === 0 && stage === 'identify') || (i === 1 && stage === 'responsibility') || (i === 2 && stage === '5d_model') || (i === 3 && stage === 'boundaries') ? "text-[#0EA5E9]" : ""
                                    )}>{label}</span>
                                    {i < stagesLabels.length - 1 && <span>•</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-white rounded-lg border border-[#E7E5E4]">
                        <span className="text-xs font-bold text-[#0EA5E9]">{score} XP</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onExit} className="hover:bg-[#F5F5F4] text-[#78716C]">
                        <X className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div className="flex-1 relative flex flex-col items-center justify-center max-w-5xl mx-auto w-full">
                <AnimatePresence mode="wait">

                    {/* INTRO */}
                    {stage === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="text-center space-y-8 max-w-2xl"
                        >
                            <div className="w-24 h-24 bg-[#E0F2FE] rounded-full flex items-center justify-center shadow-lg shadow-[#0EA5E9]/10 mx-auto">
                                <HandHelping className="w-10 h-10 text-[#0284C7]" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-serif font-black text-[#292524]">{t('training.bystander_masterclass.intro.title')}</h1>
                            <p
                                className="text-lg text-[#57534E] leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: t('training.bystander_masterclass.intro.text') }}
                            />
                            <Button onClick={handleIntroNext} size="lg" className="bg-[#292524] hover:bg-[#44403C] text-white font-bold px-8 py-6 rounded-2xl text-lg shadow-lg">
                                {t('training.bystander_masterclass.intro.action')} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* STAGE 1: IDENTIFY */}
                    {stage === 'identify' && (
                        <motion.div
                            key="identify"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="w-full max-w-3xl"
                        >
                            <div className="text-center mb-8">
                                <Badge variant="outline" className="mb-4 border-[#0EA5E9]/30 bg-[#E0F2FE] text-[#0284C7]">{t('training.bystander_masterclass.identify.badge')}</Badge>
                                <h2 className="text-3xl font-bold text-[#292524]">{t('training.bystander_masterclass.identify.title')}</h2>
                            </div>

                            <Card className="bg-white border-[#E7E5E4] p-8 rounded-3xl shadow-sm min-h-[300px] flex flex-col justify-center">
                                {showQuizFeedback ? (
                                    <div className="text-center space-y-6 animate-in zoom-in-95 fade-in duration-300">
                                        <div className={cn("w-16 h-16 mx-auto rounded-full flex items-center justify-center", lastQuizCorrect ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600")}>
                                            {lastQuizCorrect ? <CheckCircle2 className="w-8 h-8" /> : <X className="w-8 h-8" />}
                                        </div>
                                        <div>
                                            <h3 className={cn("text-xl font-black mb-2", lastQuizCorrect ? "text-emerald-700" : "text-rose-700")}>
                                                {lastQuizCorrect ? t('training.bystander_masterclass.identify.correct') : t('training.bystander_masterclass.identify.incorrect')}
                                            </h3>
                                            <p className="text-[#57534E] text-lg leading-relaxed">{quizQuestions[quizIndex].explanation}</p>
                                        </div>
                                        <Button onClick={nextQuiz} className="bg-[#292524] hover:bg-[#44403C] text-white">
                                            {t('training.bystander_masterclass.identify.next')} <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        <p className="text-xl text-center leading-relaxed font-serif text-[#292524]">"{quizQuestions[quizIndex].scenario}"</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <Button onClick={() => handleQuizAnswer(true)} variant="outline" className="py-8 border-rose-200 bg-rose-50 text-rose-800 hover:bg-rose-100 hover:text-rose-900 hover:border-rose-300 text-lg">
                                                <AlertTriangle className="mr-2 w-5 h-5" /> {t('training.bystander_masterclass.identify.btn_yes')}
                                            </Button>
                                            <Button onClick={() => handleQuizAnswer(false)} variant="outline" className="py-8 border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 hover:text-emerald-900 hover:border-emerald-300 text-lg">
                                                <CheckCircle2 className="mr-2 w-5 h-5" /> {t('training.bystander_masterclass.identify.btn_no')}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    )}

                    {/* STAGE 2: RESPONSIBILITY */}
                    {stage === 'responsibility' && (
                        <motion.div
                            key="responsibility"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full max-w-3xl space-y-8"
                        >
                            <div className="text-center">
                                <Badge variant="outline" className="mb-4 border-[#0EA5E9]/30 bg-[#E0F2FE] text-[#0284C7]">{t('training.bystander_masterclass.responsibility.badge')}</Badge>
                                <h2 className="text-2xl font-bold text-[#292524] mb-2">{t('training.bystander_masterclass.responsibility.title')}</h2>
                                <p className="text-[#57534E]">{t('training.bystander_masterclass.responsibility.text')}</p>
                            </div>

                            <Card className="bg-white border-[#E7E5E4] p-8 rounded-3xl shadow-sm">
                                <div className="space-y-8">
                                    <div className="flex justify-between text-sm uppercase font-bold tracking-widest text-[#A8A29E]">
                                        <span>{t('training.bystander_masterclass.responsibility.labels.0')}</span>
                                        <span>{t('training.bystander_masterclass.responsibility.labels.1')}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        step="1"
                                        value={bystanderCount}
                                        onChange={(e) => setBystanderCount(Number(e.target.value))}
                                        className="w-full h-2 bg-[#F5F5F4] rounded-lg appearance-none cursor-pointer accent-[#0EA5E9]"
                                    />
                                    <div className="flex justify-center items-center gap-4 flex-wrap">
                                        {Array.from({ length: bystanderCount }).map((_, i) => (
                                            <Users key={i} className={cn("w-8 h-8 transition-all", i === 0 ? "text-[#0EA5E9] scale-110" : "text-[#D6D3D1]")} />
                                        ))}
                                    </div>

                                    <div className="bg-[#F5F5F4] p-6 rounded-2xl text-center">
                                        <p className="text-[#78716C] text-sm mb-2 uppercase tracking-widest">{t('training.bystander_masterclass.responsibility.prob_label')}</p>
                                        <div className={cn("text-4xl font-black transition-colors duration-500", bystanderCount === 1 ? "text-emerald-600" : "text-rose-500")}>
                                            {Math.round(100 / bystanderCount)}%
                                        </div>
                                        <p className="text-[#57534E] text-sm mt-4 max-w-md mx-auto leading-relaxed">
                                            {bystanderCount === 1
                                                ? t('training.bystander_masterclass.responsibility.explanation_alone')
                                                : t('training.bystander_masterclass.responsibility.explanation_group')}
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <div className="text-center">
                                <Button onClick={handleResponsibilityNext} className="bg-[#292524] hover:bg-[#44403C] text-white font-bold px-8 py-6 rounded-2xl shadow-lg">
                                    {t('training.bystander_masterclass.responsibility.action')} <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* STAGE 3: 5D MODEL */}
                    {stage === '5d_model' && (
                        <motion.div
                            key="5d_model"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="h-full flex flex-col md:flex-row gap-8 max-w-5xl mx-auto w-full"
                        >
                            <div className="flex-1 space-y-6">
                                <Badge variant="outline" className="border-[#0EA5E9]/30 bg-[#E0F2FE] text-[#0284C7]">{t('training.bystander_masterclass.model_5d.badge')}</Badge>

                                <Card className="bg-white border-[#E7E5E4] p-6 md:p-8 rounded-[2rem] relative overflow-hidden min-h-[400px] shadow-sm">
                                    {lastFeedback ? (
                                        <div className="h-full flex flex-col justify-center items-center text-center space-y-6 animate-in fade-in zoom-in-95">
                                            <div className="w-16 h-16 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center">
                                                <Brain className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-xl font-bold text-[#292524]">{t('training.bystander_masterclass.model_5d.why_worked')}</h3>
                                            <p className="text-[#57534E] leading-relaxed text-lg">{lastFeedback}</p>
                                            <Button onClick={() => {
                                                setLastFeedback(null);
                                                // If we were at start (and mapped to valid step), we are now at that step.
                                                // If we were at a success step, we are done.
                                                if (['distract_success', 'direct_success', 'delay_success'].includes(scenarioStepId)) {
                                                    setStage('boundaries');
                                                }
                                            }} variant="outline" className="border-[#E7E5E4] hover:bg-[#F5F5F4] text-[#292524]">
                                                {t('training.bystander_masterclass.model_5d.continue')}
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-3 mb-6">
                                                <Badge className="bg-[#F5F5F4] text-[#57534E] border-[#E7E5E4]">{currentScenarioStep.speaker}</Badge>
                                            </div>
                                            <p className="text-xl text-[#292524] leading-relaxed mb-8 font-medium font-serif">
                                                "{currentScenarioStep.text}"
                                            </p>

                                            <div className="space-y-3">
                                                {currentScenarioStep.choices.map((choice, i) => (
                                                    <Button
                                                        key={i}
                                                        onClick={() => {
                                                            if (scenarioStepId === 'start') {
                                                                handleStartChoice(i, choice.feedback || "");
                                                            } else {
                                                                // Just advance to boundaries
                                                                setTimeout(() => setStage('boundaries'), 200);
                                                            }
                                                        }}
                                                        className="w-full py-6 px-6 justify-between text-left bg-[#F5F5F4] hover:bg-[#E0F2FE] hover:border-[#0EA5E9]/30 hover:text-[#0284C7] border border-[#E7E5E4] text-[#44403C] rounded-xl group transition-all shadow-sm h-auto"
                                                    >
                                                        <span className="font-medium">{choice.text}</span>
                                                    </Button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </Card>
                            </div>

                            {/* SIDEBAR: 5D CHEAT SHEET */}
                            <div className="w-full md:w-80 space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-[#A8A29E]">{t('training.bystander_masterclass.model_5d.cheat_sheet_title')}</h3>
                                <div className="space-y-2">
                                    {cheatSheet.map((item, i) => (
                                        <div key={i} className="bg-white p-4 rounded-xl border border-[#E7E5E4] shadow-sm">
                                            <div className="font-bold text-[#0284C7] text-sm mb-1">{item.title}</div>
                                            <div className="text-xs text-[#78716C]">{item.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STAGE 4: BOUNDARIES & FINISH */}
                    {stage === 'boundaries' && (
                        <motion.div
                            key="boundaries"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center space-y-8"
                        >
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                                <Shield className="w-10 h-10" />
                            </div>

                            <h2 className="text-3xl font-bold text-[#292524]">{t('training.bystander_masterclass.boundaries.title')}</h2>
                            <p className="text-[#57534E]">
                                {t('training.bystander_masterclass.boundaries.text')}
                            </p>

                            <div className="text-left bg-white p-6 rounded-2xl w-full space-y-4 border border-[#E7E5E4] shadow-sm">
                                {checklist.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <MyCheckbox />
                                        <span className="text-[#44403C]">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <Button onClick={finishModule} className="bg-[#059669] hover:bg-[#047857] text-white font-bold px-12 py-6 rounded-2xl text-lg shadow-lg shadow-emerald-900/10">
                                {t('training.bystander_masterclass.boundaries.action')}
                            </Button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

function MyCheckbox() {
    const [checked, setChecked] = useState(false);
    return (
        <div
            onClick={() => setChecked(!checked)}
            className={cn(
                "w-6 h-6 rounded-md border flex items-center justify-center cursor-pointer transition-colors shrink-0",
                checked ? "bg-[#059669] border-[#059669]" : "border-[#D6D3D1] bg-white"
            )}
        >
            {checked && <CheckCircle2 className="w-4 h-4 text-white" />}
        </div>
    )
}
