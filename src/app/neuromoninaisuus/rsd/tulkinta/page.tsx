"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Camera, ArrowRight, ArrowLeft, Save, FileText, Trash2,
    Timer, Lock, Unlock, Heart, CheckCircle2, AlertTriangle
} from "lucide-react";
import Link from "next/link";

type Step = 'input' | 'facts' | 'alternatives' | 'timer' | 'summary';

interface InterpretationEvent {
    id: string;
    timestamp: number;
    rawInput: string;
    facts: string;
    interpretations: {
        rsd: string;
        neutral: string;
        positive: string;
    };
    emotionLevels: {
        rsd: number;
        neutral: number;
        positive: number;
    };
}

export default function InterpretationFilterPage() {
    const { t, loadNamespace } = useLanguage();
    const { completeModule, isModuleCompleted } = useProgress();

    const [currentStep, setCurrentStep] = useState<Step>('input');
    const [rawInput, setRawInput] = useState('');
    const [facts, setFacts] = useState('');
    const [rsdInterpretation, setRsdInterpretation] = useState('');
    const [neutralInterpretation, setNeutralInterpretation] = useState('');
    const [positiveInterpretation, setPositiveInterpretation] = useState('');
    const [rsdEmotion, setRsdEmotion] = useState(9);
    const [neutralEmotion, setNeutralEmotion] = useState(3);
    const [positiveEmotion, setPositiveEmotion] = useState(2);
    const [countdown, setCountdown] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        loadNamespace('rsd');
    }, [loadNamespace]);

    // Timer logic
    useEffect(() => {
        if (currentStep === 'timer' && countdown > 0) {
            setIsTimerActive(true);
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            setIsTimerActive(false);
        }
    }, [currentStep, countdown]);

    const saveEvent = () => {
        const event: InterpretationEvent = {
            id: Date.now().toString(),
            timestamp: Date.now(),
            rawInput,
            facts,
            interpretations: {
                rsd: rsdInterpretation,
                neutral: neutralInterpretation,
                positive: positiveInterpretation
            },
            emotionLevels: {
                rsd: rsdEmotion,
                neutral: neutralEmotion,
                positive: positiveEmotion
            }
        };

        const history = JSON.parse(localStorage.getItem('rsd_interpretation_history') || '[]');
        history.push(event);
        localStorage.setItem('rsd_interpretation_history', JSON.stringify(history));

        if (!isModuleCompleted('rsd_interpretation_tool')) {
            completeModule('rsd_interpretation_tool');
        }

        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const reset = () => {
        setCurrentStep('input');
        setRawInput('');
        setFacts('');
        setRsdInterpretation('');
        setNeutralInterpretation('');
        setPositiveInterpretation('');
        setCountdown(60);
        setSaved(false);
    };

    const getStepProgress = () => {
        const steps = ['input', 'facts', 'alternatives', 'timer', 'summary'];
        return ((steps.indexOf(currentStep) + 1) / steps.length) * 100;
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center space-y-4">
                    <Link href="/neuromoninaisuus/rsd" className="inline-block">
                        <span className="text-sm text-[#5B4B8A] hover:underline">← {t('rsd.hub.tools.title')}</span>
                    </Link>

                    <div className="space-y-2">
                        <span className="text-[11px] font-mono text-violet-700 uppercase tracking-widest border-b border-violet-600 pb-1 inline-block">
                            {t('rsd.tulkinta.header.mini_title')}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2B2B2B]">
                            {t('rsd.tulkinta.header.title')}
                        </h1>
                        <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
                            {t('rsd.tulkinta.header.subtitle')}
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="max-w-md mx-auto">
                        <Progress value={getStepProgress()} className="h-2" />
                    </div>
                </div>

                {/* Privacy Notice */}
                <Alert className="bg-blue-50 border-blue-200 max-w-2xl mx-auto">
                    <Lock className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-sm">
                        {t('rsd.tulkinta.header.intro')}
                    </AlertDescription>
                </Alert>

                {/* STEP 1: INPUT */}
                {currentStep === 'input' && (
                    <Card className="bg-white border-[#E8DDD0] shadow-lg">
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <Camera className="w-6 h-6 text-violet-600" />
                                <CardTitle className="text-2xl font-serif">{t('rsd.tulkinta.step1.title')}</CardTitle>
                            </div>
                            <CardDescription>{t('rsd.tulkinta.step1.subtitle')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Textarea
                                value={rawInput}
                                onChange={(e) => setRawInput(e.target.value)}
                                placeholder={t('rsd.tulkinta.step1.placeholder')}
                                className="min-h-[200px] text-base"
                            />
                            <p className="text-xs text-slate-500 flex items-center gap-2">
                                <Lock className="w-3 h-3" />
                                {t('rsd.tulkinta.step1.privacy')}
                            </p>
                            <Button
                                onClick={() => setCurrentStep('facts')}
                                disabled={!rawInput.trim()}
                                className="w-full bg-violet-600 hover:bg-violet-700 text-white"
                            >
                                {t('rsd.tulkinta.step1.button')}
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* STEP 2: FACTS */}
                {currentStep === 'facts' && (
                    <Card className="bg-white border-[#E8DDD0] shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl font-serif flex items-center gap-2">
                                🎥 {t('rsd.tulkinta.step2.title')}
                            </CardTitle>
                            <CardDescription>{t('rsd.tulkinta.step2.subtitle')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Alert className="bg-slate-50">
                                <AlertTitle className="text-sm font-bold">{t('rsd.tulkinta.step2.guide_title')}</AlertTitle>
                                <AlertDescription className="text-xs space-y-1 mt-2">
                                    <p>{t('rsd.tulkinta.step2.guide_facts')}</p>
                                    <p>{t('rsd.tulkinta.step2.guide_no_interpret')}</p>
                                    <p>{t('rsd.tulkinta.step2.guide_no_assume')}</p>
                                </AlertDescription>
                            </Alert>

                            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                                <p className="text-xs font-bold text-emerald-800 mb-2">{t('rsd.tulkinta.step2.example_title')}</p>
                                <p className="text-xs text-emerald-700">{t('rsd.tulkinta.step2.example_good')}</p>
                                <p className="text-xs text-rose-700">{t('rsd.tulkinta.step2.example_bad')}</p>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-slate-700 mb-2 block">{t('rsd.tulkinta.step2.your_facts')}</label>
                                <Textarea
                                    value={facts}
                                    onChange={(e) => setFacts(e.target.value)}
                                    placeholder="Henkilö X käveli käytävällä klo 14:30. Henkilö X ei sanonut mitään."
                                    className="min-h-[120px]"
                                />
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline" onClick={() => setCurrentStep('input')}>
                                    <ArrowLeft className="mr-2 w-4 h-4" />
                                    Takaisin
                                </Button>
                                <Button
                                    onClick={() => setCurrentStep('alternatives')}
                                    disabled={!facts.trim()}
                                    className="flex-1 bg-violet-600 hover:bg-violet-700"
                                >
                                    Jatka
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* STEP 3: ALTERNATIVES */}
                {currentStep === 'alternatives' && (
                    <div className="space-y-6">
                        <Card className="bg-white border-[#E8DDD0]">
                            <CardHeader>
                                <CardTitle className="text-2xl font-serif">{t('rsd.tulkinta.step3.title')}</CardTitle>
                                <CardDescription>{t('rsd.tulkinta.step3.subtitle')}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Alert className="bg-blue-50">
                                    <AlertDescription className="text-sm font-medium">
                                        {t('rsd.tulkinta.step3.rule')}
                                    </AlertDescription>
                                </Alert>
                            </CardContent>
                        </Card>

                        <div className="grid md:grid-cols-3 gap-4">
                            {/* RSD */}
                            <Card className="border-2 border-rose-200 bg-rose-50">
                                <CardHeader>
                                    <Badge className="bg-rose-600 text-white w-fit">{t('rsd.tulkinta.step3.rsd.title')}</Badge>
                                    <CardDescription className="text-rose-800">{t('rsd.tulkinta.step3.rsd.subtitle')}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Textarea
                                        value={rsdInterpretation}
                                        onChange={(e) => setRsdInterpretation(e.target.value)}
                                        placeholder={t('rsd.tulkinta.step3.rsd.placeholder')}
                                        className="min-h-[100px] bg-white"
                                    />
                                    <div>
                                        <label className="text-xs font-mono uppercase text-rose-700">{t('rsd.tulkinta.step3.rsd.emotion_label')}: {rsdEmotion}/10</label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            value={rsdEmotion}
                                            onChange={(e) => setRsdEmotion(Number(e.target.value))}
                                            className="w-full"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Neutral */}
                            <Card className="border-2 border-slate-200">
                                <CardHeader>
                                    <Badge className="bg-slate-600 text-white w-fit">{t('rsd.tulkinta.step3.neutral.title')}</Badge>
                                    <CardDescription>{t('rsd.tulkinta.step3.neutral.subtitle')}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Textarea
                                        value={neutralInterpretation}
                                        onChange={(e) => setNeutralInterpretation(e.target.value)}
                                        placeholder={t('rsd.tulkinta.step3.neutral.placeholder')}
                                        className="min-h-[100px]"
                                    />
                                    <div>
                                        <label className="text-xs font-mono uppercase text-slate-700">{t('rsd.tulkinta.step3.neutral.emotion_label')}: {neutralEmotion}/10</label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            value={neutralEmotion}
                                            onChange={(e) => setNeutralEmotion(Number(e.target.value))}
                                            className="w-full"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Positive */}
                            <Card className="border-2 border-emerald-200 bg-emerald-50">
                                <CardHeader>
                                    <Badge className="bg-emerald-600 text-white w-fit">{t('rsd.tulkinta.step3.positive.title')}</Badge>
                                    <CardDescription className="text-emerald-800">{t('rsd.tulkinta.step3.positive.subtitle')}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Textarea
                                        value={positiveInterpretation}
                                        onChange={(e) => setPositiveInterpretation(e.target.value)}
                                        placeholder={t('rsd.tulkinta.step3.positive.placeholder')}
                                        className="min-h-[100px] bg-white"
                                    />
                                    <div>
                                        <label className="text-xs font-mono uppercase text-emerald-700">{t('rsd.tulkinta.step3.positive.emotion_label')}: {positiveEmotion}/10</label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            value={positiveEmotion}
                                            onChange={(e) => setPositiveEmotion(Number(e.target.value))}
                                            className="w-full"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => setCurrentStep('facts')}>
                                <ArrowLeft className="mr-2 w-4 h-4" />
                                Takaisin
                            </Button>
                            <Button
                                onClick={() => {
                                    setCurrentStep('timer');
                                    setCountdown(60);
                                }}
                                disabled={!rsdInterpretation || !neutralInterpretation || !positiveInterpretation}
                                className="flex-1 bg-violet-600 hover:bg-violet-700"
                            >
                                {t('rsd.tulkinta.step3.next')}
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                )}

                {/* STEP 4: TIMER */}
                {currentStep === 'timer' && (
                    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300">
                        <CardHeader>
                            <div className="flex items-center justify-center gap-3 mb-4">
                                {isTimerActive ? <Lock className="w-8 h-8 text-amber-600" /> : <Unlock className="w-8 h-8 text-emerald-600" />}
                                <CardTitle className="text-3xl font-serif text-center">
                                    {isTimerActive ? t('rsd.tulkinta.step4.timer_title') : t('rsd.tulkinta.step4.unlocked')}
                                </CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 text-center">
                            <div className="text-6xl font-bold font-mono text-amber-600">
                                {String(Math.floor(countdown / 60)).padStart(2, '0')}:{String(countdown % 60).padStart(2, '0')}
                            </div>

                            <p className="text-lg text-[#4A4A4A]">
                                {t('rsd.tulkinta.step4.timer_text').replace('{seconds}', countdown.toString())}
                            </p>

                            {isTimerActive && (
                                <Alert className="bg-blue-50">
                                    <Heart className="h-4 w-4 text-blue-600" />
                                    <AlertTitle className="text-sm font-bold">{t('rsd.tulkinta.step4.breathing_title')}</AlertTitle>
                                    <AlertDescription className="text-xs space-y-1 mt-2">
                                        <p>1. {t('rsd.tulkinta.step4.breathing_in')}</p>
                                        <p>2. {t('rsd.tulkinta.step4.breathing_hold')}</p>
                                        <p>3. {t('rsd.tulkinta.step4.breathing_out')}</p>
                                    </AlertDescription>
                                </Alert>
                            )}

                            {!isTimerActive && (
                                <Alert className="bg-emerald-50">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                    <AlertDescription>
                                        {t('rsd.tulkinta.step4.unlocked')}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <Button
                                onClick={() => setCurrentStep('summary')}
                                disabled={isTimerActive}
                                className="w-full bg-violet-600 hover:bg-violet-700"
                                size="lg"
                            >
                                Näytä yhteenveto
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* STEP 5: SUMMARY */}
                {currentStep === 'summary' && (
                    <div className="space-y-6">
                        <Card className="bg-white border-[#E8DDD0]">
                            <CardHeader>
                                <CardTitle className="text-2xl font-serif">{t('rsd.tulkinta.summary.title')}</CardTitle>
                                <CardDescription>{t('rsd.tulkinta.summary.subtitle')}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                    <p className="text-xs font-bold uppercase text-slate-500 mb-2">{t('rsd.tulkinta.summary.raw_event')}</p>
                                    <p className="text-sm text-slate-700 italic">"{facts}"</p>
                                </div>

                                <div>
                                    <p className="text-sm font-bold mb-4">{t('rsd.tulkinta.summary.three_views')}</p>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-rose-50 rounded-lg border-l-4 border-rose-500">
                                            <Badge className="bg-rose-600 text-white mb-2">RSD</Badge>
                                            <p className="text-sm">"{rsdInterpretation}"</p>
                                            <p className="text-xs text-rose-600 mt-1">Tunne: {rsdEmotion}/10</p>
                                        </div>
                                        <div className="p-3 bg-slate-50 rounded-lg border-l-4 border-slate-400">
                                            <Badge className="bg-slate-600 mb-2">Neutraali</Badge>
                                            <p className="text-sm">"{neutralInterpretation}"</p>
                                            <p className="text-xs text-slate-600 mt-1">Tunne: {neutralEmotion}/10</p>
                                        </div>
                                        <div className="p-3 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                                            <Badge className="bg-emerald-600 mb-2">Positiivinen</Badge>
                                            <p className="text-sm">"{positiveInterpretation}"</p>
                                            <p className="text-xs text-emerald-600 mt-1">Tunne: {positiveEmotion}/10</p>
                                        </div>
                                    </div>
                                </div>

                                <Alert className="bg-blue-50">
                                    <AlertDescription className="text-sm">
                                        💡 {t('rsd.tulkinta.summary.insight')}
                                    </AlertDescription>
                                </Alert>
                            </CardContent>
                        </Card>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                                onClick={saveEvent}
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                            >
                                <Save className="mr-2 w-4 h-4" />
                                {saved ? t('rsd.tulkinta.actions.saved') : t('rsd.tulkinta.actions.save')}
                            </Button>
                            <Button
                                onClick={reset}
                                variant="outline"
                                className="flex-1"
                            >
                                {t('rsd.tulkinta.actions.new')}
                            </Button>
                        </div>

                        {saved && (
                            <Alert className="bg-emerald-50 border-emerald-200">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                <AlertTitle>{t('rsd.tulkinta.completion.title')}</AlertTitle>
                                <AlertDescription>
                                    {t('rsd.tulkinta.completion.text')}
                                    <span className="block mt-1 font-bold text-emerald-700">{t('rsd.tulkinta.completion.points')}</span>
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
