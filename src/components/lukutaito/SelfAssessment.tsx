"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { User, Users, ChevronDown, RefreshCcw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

type QuestionType = "slider" | "single_choice";

interface Question {
    id: string;
    text: string;
    category: string;
    type: QuestionType;
    options?: string[];
}

export function SelfAssessment() {
    const { t } = useLanguage();
    const [mode, setMode] = useState<"menu" | "situation" | "culture">("menu");
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [currentStep, setCurrentStep] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    const situationData = t('lukutaito_page.self_assessment.situation_data', { returnObjects: true }) as Record<string, Question[]>;
    const cultureData = t('lukutaito_page.self_assessment.culture_data', { returnObjects: true }) as Record<string, Question[]>;

    const questionsData = mode === "situation" ? (situationData || {}) : (cultureData || {});
    const sections = questionsData ? Object.keys(questionsData) : [];

    const feedbackData = t('lukutaito_page.self_assessment.feedback', { returnObjects: true }) as Record<string, {
        risk?: { low: string, medium: string, high: string },
        culture?: { low: string, medium: string, high: string }
    }> || {};

    const handleStart = (selectedMode: "situation" | "culture") => {
        setMode(selectedMode);
        setAnswers({});
        setCurrentStep(0);
        setIsFinished(false);
    };

    const handleAnswer = (id: string, value: any) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    const nextStep = () => {
        if (currentStep < sections.length - 1) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo(0, 0);
        } else {
            setIsFinished(true);
            window.scrollTo(0, 0);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    const calculateScore = () => {
        let totalScore = 0;
        let maxScore = 0;

        if (!questionsData) return 0;

        Object.entries(questionsData).forEach(([section, qs]) => {
            qs.forEach(q => {
                if (q.type === 'slider') {
                    totalScore += (answers[q.id] || 3);
                    maxScore += 5;
                }
            });
        });

        const percent = Math.round((totalScore / maxScore) * 100);
        return percent || (mode === 'situation' ? 61 : 60); // fallback mocks
    };

    if (mode === "menu") {
        return (
            <div className="space-y-8 animate-in fade-in">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl font-serif font-bold text-[#2B2B2B]">{t('lukutaito_page.self_assessment.title')}</h2>
                    <p className="text-[#4A4A4A] max-w-xl mx-auto">
                        {t('lukutaito_page.self_assessment.description')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <Card className="hover:border-[#5B4B8A] transition-colors cursor-pointer group" onClick={() => handleStart("situation")}>
                        <CardContent className="p-8 text-center space-y-6">
                            <div className="w-16 h-16 bg-[#5B4B8A]/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-[#5B4B8A] transition-colors">
                                <User className="w-8 h-8 text-[#5B4B8A] group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#2B2B2B] mb-2">{t('lukutaito_page.self_assessment.menu.situation.title')}</h3>
                                <p className="text-sm text-[#4A4A4A]">{t('lukutaito_page.self_assessment.menu.situation.desc')}</p>
                            </div>
                            <Button className="w-full bg-[#5B4B8A] hover:bg-[#4A3A7A]">{t('lukutaito_page.self_assessment.menu.situation.btn')}</Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:border-emerald-600 transition-colors cursor-pointer group" onClick={() => handleStart("culture")}>
                        <CardContent className="p-8 text-center space-y-6">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-emerald-600 transition-colors">
                                <Users className="w-8 h-8 text-emerald-700 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#2B2B2B] mb-2">{t('lukutaito_page.self_assessment.menu.culture.title')}</h3>
                                <p className="text-sm text-[#4A4A4A]">{t('lukutaito_page.self_assessment.menu.culture.desc')}</p>
                            </div>
                            <Button className="w-full bg-emerald-700 hover:bg-emerald-800">{t('lukutaito_page.self_assessment.menu.culture.btn')}</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    if (isFinished) {
        const percent = calculateScore();
        const categoryScores = sections.map(section => {
            // Calculate real section score
            const sectionQs = questionsData[section] ? questionsData[section].filter(q => q.type === 'slider') : [];
            if (sectionQs.length === 0) return { section, score: 0 };

            const sectionTotal = sectionQs.reduce((acc, q) => acc + (answers[q.id] || 3), 0);
            const sectionMax = sectionQs.length * 5;
            return { section, score: Math.round((sectionTotal / sectionMax) * 100) };
        });

        // Feedback Logic
        let feedback = {
            color: "bg-orange-500",
            textColor: "text-orange-600",
            iconColor: "bg-red-500",
            title: t('lukutaito_page.self_assessment.results.title'),
            badge: `${percent}%`,
            description: "Tulokset analysoitu."
        };

        if (mode === 'situation') {
            // Risk Logic (High % = Bad)
            if (percent >= 60) {
                feedback = {
                    color: "bg-orange-500",
                    textColor: "text-orange-600",
                    iconColor: "bg-red-500",
                    title: t('lukutaito_page.self_assessment.results.situations.high_risk_title'),
                    badge: `${t('lukutaito_page.self_assessment.results.badges.risk_high')} ${percent}%`,
                    description: t('lukutaito_page.self_assessment.results.situations.high_risk_desc')
                };
            } else {
                feedback = {
                    color: "bg-emerald-600",
                    textColor: "text-emerald-700",
                    iconColor: "bg-emerald-400",
                    title: t('lukutaito_page.self_assessment.results.situations.low_risk_title'),
                    badge: `${t('lukutaito_page.self_assessment.results.badges.risk_low')} ${percent}%`,
                    description: t('lukutaito_page.self_assessment.results.situations.low_risk_desc')
                };
            }
        } else {
            // Culture Logic (High % = Good)
            if (percent >= 80) {
                feedback = {
                    color: "bg-emerald-600",
                    textColor: "text-emerald-700",
                    iconColor: "bg-white",
                    title: t('lukutaito_page.self_assessment.results.cultures.excellent_title'),
                    badge: `${t('lukutaito_page.self_assessment.results.badges.excellent')} ${percent}%`,
                    description: t('lukutaito_page.self_assessment.results.cultures.excellent_desc')
                };
            } else if (percent >= 50) {
                feedback = {
                    color: "bg-amber-500",
                    textColor: "text-amber-700",
                    iconColor: "bg-amber-100",
                    title: t('lukutaito_page.self_assessment.results.cultures.ok_title'),
                    badge: `${t('lukutaito_page.self_assessment.results.badges.ok')} ${percent}%`,
                    description: t('lukutaito_page.self_assessment.results.cultures.ok_desc')
                };
            } else {
                feedback = {
                    color: "bg-red-600",
                    textColor: "text-red-700",
                    iconColor: "bg-red-200",
                    title: t('lukutaito_page.self_assessment.results.cultures.bad_title'),
                    badge: `${t('lukutaito_page.self_assessment.results.badges.bad')} ${percent}%`,
                    description: t('lukutaito_page.self_assessment.results.cultures.bad_desc')
                };
            }
        }

        return (
            <div className="space-y-8 animate-in fade-in max-w-4xl mx-auto">
                <Button variant="ghost" onClick={() => setMode("menu")} className="text-[#4A4A4A] hover:text-[#2B2B2B] pl-0">
                    &larr; {t('lukutaito_page.self_assessment.results.back_btn')}
                </Button>

                <div className={cn("rounded-lg p-8 md:p-12 text-center text-white shadow-sm space-y-6", feedback.color)}>
                    <div className="inline-flex items-center gap-2 bg-white/20 px-6 py-2 rounded-full backdrop-blur-sm shadow-sm">
                        <div className={cn("w-3 h-3 rounded-full", feedback.iconColor)} />
                        <span className="font-bold text-sm tracking-wide uppercase">{feedback.badge}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">{feedback.title}</h2>
                    <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
                        {feedback.description}
                    </p>
                    <Button variant="secondary" className={cn("bg-white hover:bg-white/90 font-bold uppercase tracking-widest mt-4", feedback.textColor)}>
                        {mode === 'situation' ? t('lukutaito_page.self_assessment.results.show_actions') : t('lukutaito_page.self_assessment.results.show_recommendations')}
                    </Button>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-[#2B2B2B] uppercase tracking-wider text-center">{t('lukutaito_page.self_assessment.results.analysis_title')}</h3>
                    <p className="text-[#4A4A4A] text-sm text-center">{t('lukutaito_page.self_assessment.results.click_hint')}</p>

                    <div className="grid gap-4">
                        {categoryScores.map((cat, idx) => {
                            const isExpanded = expandedCategory === cat.section;

                            // Determine status level for feedback
                            let statusLevel: 'low' | 'medium' | 'high' = 'medium';
                            if (mode === 'situation') {
                                // Risk Mode: High score = BAD (High Risk)
                                if (cat.score < 30) statusLevel = 'low';      // Low Risk
                                else if (cat.score < 60) statusLevel = 'medium'; // Warning
                                else statusLevel = 'high';                    // High Risk
                            } else {
                                // Culture Mode: High score = GOOD (Healthy)
                                if (cat.score < 50) statusLevel = 'low';      // Bad (Alarming)
                                else if (cat.score < 80) statusLevel = 'medium'; // OK (Needs improvement)
                                else statusLevel = 'high';                    // Good (Healthy)
                            }

                            // Feedback Text
                            const feedbackText = feedbackData[cat.section]?.[mode === 'situation' ? 'risk' : 'culture']?.[statusLevel]
                                || "Ei palautetta saatavilla.";

                            // Colors based on Status Level & Mode
                            let colorClass = "bg-slate-100";
                            let textClass = "text-slate-700";
                            let borderClass = "border-[#E8DDD0]";

                            if (mode === 'situation') {
                                if (statusLevel === 'high') { colorClass = "bg-red-100"; textClass = "text-red-700"; borderClass = "border-red-200 bg-red-50/50"; }
                                else if (statusLevel === 'medium') { colorClass = "bg-amber-100"; textClass = "text-amber-700"; borderClass = "border-amber-200 bg-amber-50/50"; }
                                else { colorClass = "bg-emerald-100"; textClass = "text-emerald-700"; borderClass = "border-emerald-200 bg-emerald-50/50"; }
                            } else {
                                if (statusLevel === 'low') { colorClass = "bg-red-100"; textClass = "text-red-700"; borderClass = "border-red-200 bg-red-50/50"; }
                                else if (statusLevel === 'medium') { colorClass = "bg-amber-100"; textClass = "text-amber-700"; borderClass = "border-amber-200 bg-amber-50/50"; }
                                else { colorClass = "bg-emerald-100"; textClass = "text-emerald-700"; borderClass = "border-emerald-200 bg-emerald-50/50"; }
                            }

                            return (
                                <div
                                    key={idx}
                                    className={cn(
                                        "rounded-lg border transition-all duration-300 overflow-hidden",
                                        borderClass,
                                        isExpanded ? "shadow-md scale-[1.02]" : "hover:border-[#5B4B8A] cursor-pointer"
                                    )}
                                    onClick={() => setExpandedCategory(isExpanded ? null : cat.section)}
                                >
                                    <div className="p-5 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={cn("w-2 h-10 rounded-full shrink-0",
                                                mode === 'situation'
                                                    ? (statusLevel === 'high' ? 'bg-red-500' : (statusLevel === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'))
                                                    : (statusLevel === 'low' ? 'bg-red-500' : (statusLevel === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'))
                                            )} />
                                            <div>
                                                <h4 className="font-serif font-bold text-[#2B2B2B] text-lg leading-tight">{cat.section}</h4>
                                                {!isExpanded && (
                                                    <p className="text-xs text-[#4A4A4A] mt-1 font-medium tracking-wide uppercase opacity-70">
                                                        {t('lukutaito_page.self_assessment.results.expand_hint')}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={cn("font-black text-xl", textClass)}>{Math.round(cat.score)}%</span>
                                            <ChevronDown className={cn("w-5 h-5 text-[#4A4A4A] transition-transform duration-300", isExpanded && "rotate-180")} />
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div className="px-6 pb-6 pt-0 animate-in slide-in-from-top-2">
                                            <div className="h-px w-full bg-[#E8DDD0]/50 mb-4" />
                                            <p className="text-[#2B2B2B] leading-relaxed text-base font-medium">
                                                {feedbackText}
                                            </p>

                                            <div className="mt-4 flex gap-2">
                                                <Badge variant="outline" className={cn("bg-white/50 backdrop-blur-sm", textClass, borderClass)}>
                                                    {mode === 'situation' && statusLevel === 'high' && t('lukutaito_page.self_assessment.results.badges.serious_risk')}
                                                    {mode === 'situation' && statusLevel === 'medium' && t('lukutaito_page.self_assessment.results.badges.attention')}
                                                    {mode === 'situation' && statusLevel === 'low' && t('lukutaito_page.self_assessment.results.badges.low_risk')}

                                                    {mode === 'culture' && statusLevel === 'low' && t('lukutaito_page.self_assessment.results.badges.critical')}
                                                    {mode === 'culture' && statusLevel === 'medium' && t('lukutaito_page.self_assessment.results.badges.needs_improvement')}
                                                    {mode === 'culture' && statusLevel === 'high' && t('lukutaito_page.self_assessment.results.badges.excellent_label')}
                                                </Badge>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    <div className="flex justify-center pt-12 pb-8">
                        <Button onClick={() => handleStart(mode)} variant="outline" className="border-[#2B2B2B] text-[#2B2B2B] font-bold uppercase tracking-widest hover:bg-[#FDFBF7] px-8 py-6 text-lg">
                            <RefreshCcw className="w-5 h-5 mr-3" /> {t('lukutaito_page.self_assessment.results.retry_btn')}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const currentSection = sections[currentStep];
    const progress = Math.round((currentStep / sections.length) * 100);

    if (!currentSection || !questionsData[currentSection]) return null;

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in bg-white p-6 md:p-12 border border-[#E8DDD0] rounded-sm">
            {/* Header */}
            <div className="space-y-6 mb-8">
                <div className="flex items-center justify-between text-sm font-bold text-[#4A4A4A] uppercase tracking-widest">
                    <span>{currentSection}</span>
                    <span>{progress}% VALMIS</span>
                </div>
                <div className="h-1 w-full bg-[#FAFAFA] rounded-full overflow-hidden">
                    <div className="h-full bg-[#5B4B8A] transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
                <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-[#FDFBF7] border border-[#E8DDD0] flex items-center justify-center font-serif font-bold text-[#2B2B2B]">
                        {currentStep + 1}
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-[#2B2B2B]">{currentSection}</h2>
                </div>
            </div>

            {/* Questions */}
            <div className="space-y-12">
                {questionsData[currentSection].map((q) => (
                    <div key={q.id} className="space-y-6 border-b border-[#FAFAFA] pb-8 last:border-0">
                        <h4 className="text-lg font-medium text-[#2B2B2B]">{q.text}</h4>

                        {q.type === 'slider' && (
                            <div className="space-y-4 px-2">
                                <Slider
                                    value={[answers[q.id] || 3]}
                                    min={1}
                                    max={5}
                                    step={1}
                                    className="py-4 cursor-pointer"
                                    onValueChange={(val) => handleAnswer(q.id, val[0])}
                                />
                                <div className="flex justify-between text-xs text-[#4A4A4A] font-medium uppercase tracking-wider">
                                    <span>{mode === 'situation' ? t('lukutaito_page.self_assessment.answers.slider.never') : t('lukutaito_page.self_assessment.answers.slider.disagree')}</span>
                                    <span className="text-center opacity-50">{mode === 'situation' ? t('lukutaito_page.self_assessment.answers.slider.sometimes') : t('lukutaito_page.self_assessment.answers.slider.neutral')}</span>
                                    <span>{mode === 'situation' ? t('lukutaito_page.self_assessment.answers.slider.always') : t('lukutaito_page.self_assessment.answers.slider.agree')}</span>
                                </div>
                            </div>
                        )}

                        {q.type === 'single_choice' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {q.options?.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => handleAnswer(q.id, opt)}
                                        className={cn(
                                            "p-3 rounded-sm text-sm text-left transition-all border",
                                            answers[q.id] === opt
                                                ? "bg-[#5B4B8A] text-white border-[#5B4B8A]"
                                                : "bg-[#FDFBF7] text-[#4A4A4A] border-[#E8DDD0] hover:border-[#5B4B8A]"
                                        )}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Footer Navigation */}
            <div className="pt-8 flex justify-between items-center gap-4">
                <Button variant="ghost" onClick={prevStep} disabled={currentStep === 0} className="text-[#4A4A4A]">
                    Edellinen
                </Button>
                <Button onClick={nextStep} className="bg-[#5B4B8A] text-white hover:bg-[#4A3A7A] px-8 py-6 text-lg uppercase tracking-widest font-bold">
                    {currentStep === sections.length - 1 ? t('lukutaito_page.self_assessment.results.show_results') || "Näytä tulokset" : t('lukutaito_page.self_assessment.results.next_section') || "Seuraava osio"} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}
