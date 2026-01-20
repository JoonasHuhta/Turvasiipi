"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, Save, Clock, MapPin, User, Quote, Users, ShieldCheck, CheckCircle2, Lightbulb } from "lucide-react";
import { bullyingTactics } from "@/data/tactics";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { useLogWizard } from "@/hooks/useLogWizard";

export default function LogPage() {
    return (
        <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
            <LogPageContent />
        </Suspense>
    );
}

function LogPageContent() {
    const router = useRouter();
    const { t } = useLanguage();

    const {
        step,
        formData,
        selectedTactic,
        meterScore,
        nextStep,
        prevStep,
        updateFormData,
        setSelectedTactic,
        toggleEvidenceType,
        saveLog
    } = useLogWizard();

    // Scroll to top on step change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);

    const getMeterColor = (score: number) => {
        if (score < 40) return "bg-red-500";
        if (score < 70) return "bg-yellow-500";
        return "bg-emerald-500";
    };

    const getMeterFeedback = (score: number) => {
        if (score < 40) return t('log_tool.meter.feedback.low');
        if (score < 70) return t('log_tool.meter.feedback.med');
        return t('log_tool.meter.feedback.high');
    };

    return (
        <div className="min-h-screen bg-suojasiipi-bg pb-20">
            {/* Header with Evidence Meter */}
            <div className="sticky top-0 z-50 bg-suojasiipi-bg/95 backdrop-blur-sm border-b border-suojasiipi-secondary shadow-sm px-6 py-4">
                <div className="max-w-3xl mx-auto flex items-center justify-between gap-6">
                    <Button variant="ghost" size="sm" onClick={() => router.back()}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> {t('log_tool.buttons.cancel')}
                    </Button>

                    <div className="flex-1">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-1">
                            <span>{t('log_tool.meter.label')}</span>
                            <span className={cn("transition-colors", meterScore > 70 ? "text-emerald-600" : "text-suojasiipi-text-body")}>
                                {meterScore}%
                            </span>
                        </div>
                        <div className="h-2 bg-suojasiipi-secondary rounded-full overflow-hidden">
                            <div
                                className={cn("h-full transition-all duration-500 ease-out", getMeterColor(meterScore))}
                                style={{ width: `${meterScore}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-2xl mx-auto px-6 py-8 space-y-8">
                {/* Step 0: Intro / Guide */}
                {step === 0 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center space-y-4 mb-8">
                            <h1 className="text-2xl md:text-3xl font-serif font-black uppercase tracking-tight text-suojasiipi-text-main">
                                {t('log_tool.header.title')}
                            </h1>
                            <p className="text-suojasiipi-text-body font-medium max-w-md mx-auto">
                                {t('log_tool.header.subtitle')}
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-sm shadow-sm border border-suojasiipi-secondary space-y-4">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-suojasiipi-bg border border-suojasiipi-secondary flex items-center justify-center shrink-0">
                                    <span className="font-bold text-suojasiipi-primary">1</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-suojasiipi-text-main">{t('log_tool.header.steps.step1_title')}</h3>
                                    <p className="text-sm text-suojasiipi-text-body mt-1">{t('log_tool.header.steps.step1_text')}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-suojasiipi-bg border border-suojasiipi-secondary flex items-center justify-center shrink-0">
                                    <span className="font-bold text-suojasiipi-primary">2</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-suojasiipi-text-main">{t('log_tool.header.steps.step2_title')}</h3>
                                    <p className="text-sm text-suojasiipi-text-body mt-1">{t('log_tool.header.steps.step2_text')}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-suojasiipi-bg border border-suojasiipi-secondary flex items-center justify-center shrink-0">
                                    <span className="font-bold text-suojasiipi-primary">3</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-suojasiipi-text-main">{t('log_tool.header.steps.step3_title')}</h3>
                                    <p className="text-sm text-suojasiipi-text-body mt-1">{t('log_tool.header.steps.step3_text')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-suojasiipi-bg border border-suojasiipi-secondary p-4 rounded-sm flex gap-3 text-suojasiipi-primary text-sm">
                            <ShieldCheck className="w-5 h-5 shrink-0" />
                            <p>{t('log_tool.header.help_text')}</p>
                        </div>
                    </div>
                )}

                {/* Step 1: Tactic Selection */}
                {
                    step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center space-y-2">
                                <h1 className="text-2xl font-serif font-bold text-suojasiipi-text-main">{t('log_tool.step1.title')}</h1>
                                <p className="text-suojasiipi-text-body">{t('log_tool.step1.subtitle')}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {bullyingTactics.map(tactic => (
                                    <Card
                                        key={tactic.id}
                                        className={cn(
                                            "cursor-pointer transition-all hover:shadow-md border-2",
                                            selectedTactic?.id === tactic.id ? "border-suojasiipi-primary bg-suojasiipi-bg shadow-md" : "border-transparent hover:border-suojasiipi-secondary"
                                        )}
                                        onClick={() => setSelectedTactic(tactic)}
                                    >
                                        <CardContent className="p-4 flex items-start gap-3">
                                            <div className="mt-1 p-2 bg-white rounded-lg shadow-sm">
                                                {tactic.category === 'verbal' && <Quote className="w-5 h-5 text-suojasiipi-primary" />}
                                                {tactic.category === 'social' && <Users className="w-5 h-5 text-emerald-600" />}
                                                {tactic.category === 'power' && <ShieldCheck className="w-5 h-5 text-orange-600" />}
                                                {!['verbal', 'social', 'power'].includes(tactic.category) && <User className="w-5 h-5 text-suojasiipi-text-body" />}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-suojasiipi-text-main">{tactic.name}</h3>
                                                <p className="text-sm text-suojasiipi-text-body line-clamp-2">{tactic.definition}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )
                }

                {/* Step 2: Context */}
                {
                    step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="text-center space-y-2">
                                <h1 className="text-2xl font-serif font-bold text-suojasiipi-text-main">{t('log_tool.step2.title')}</h1>
                                <p className="text-suojasiipi-text-body">{t('log_tool.step2.subtitle')}</p>
                            </div>

                            <div className="bg-white p-6 rounded-sm shadow-sm border border-suojasiipi-secondary space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>{t('log_tool.step2.date')}</Label>
                                        <div className="relative">
                                            <Clock className="absolute left-3 top-3 w-4 h-4 text-suojasiipi-primary" />
                                            <Input
                                                type="date"
                                                className="pl-10"
                                                value={formData.date}
                                                onChange={e => updateFormData({ date: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>{t('log_tool.step2.time')}</Label>
                                        <Input
                                            type="time"
                                            value={formData.time}
                                            onChange={e => updateFormData({ time: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>{t('log_tool.step2.location')}</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#5B4B8A]" />
                                        <Input
                                            placeholder={t('log_tool.step2.location_placeholder')}
                                            className="pl-10"
                                            value={formData.location}
                                            onChange={e => updateFormData({ location: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>{t('log_tool.step2.person')}</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 w-4 h-4 text-[#5B4B8A]" />
                                        <Input
                                            placeholder={t('log_tool.step2.person_placeholder')}
                                            className="pl-10"
                                            value={formData.person}
                                            onChange={e => updateFormData({ person: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Step 3: Description Builder (Sentence Blocks) */}
                {
                    step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="text-center space-y-2">
                                <h1 className="text-2xl font-serif font-bold text-[#2B2B2B]">{t('log_tool.step3.title')}</h1>
                                <p className="text-[#4A4A4A]">{t('log_tool.step3.subtitle')}</p>
                            </div>

                            {/* Sentence Builder Blocks */}
                            <div className="bg-white p-6 rounded-sm shadow-sm border border-[#E8DDD0] space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Subject Column */}
                                    <div className="space-y-3">
                                        <Label className="text-xs uppercase tracking-wider text-[#5B4B8A] font-bold">{t('log_tool.step3.col_subject')}</Label>
                                        <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                                            {[
                                                { id: 'esimies', label: t('log_tool.builder.subjects.esimies'), icon: '👔' },
                                                { id: 'kollega', label: t('log_tool.builder.subjects.kollega'), icon: '👤' },
                                                { id: 'johto', label: t('log_tool.builder.subjects.johto'), icon: '🏢' },
                                                { id: 'asiakas', label: t('log_tool.builder.subjects.asiakas'), icon: '🤝' },
                                                { id: 'ryhma', label: t('log_tool.builder.subjects.ryhma'), icon: '👥' },
                                            ].map(sub => (
                                                <div
                                                    key={sub.id}
                                                    onClick={() => updateFormData({
                                                        description: `${sub.label} ${formData.description.split(' ').slice(1).join(' ')}`
                                                    })}
                                                    className={cn(
                                                        "p-3 rounded-sm border cursor-pointer transition-all hover:bg-[#FDFBF7] flex items-center gap-3",
                                                        formData.description.startsWith(sub.label) ? "border-[#5B4B8A] bg-[#FDFBF7]" : "border-[#E8DDD0]"
                                                    )}
                                                >
                                                    <span className="text-xl">{sub.icon}</span>
                                                    <span className="font-medium text-slate-700">{sub.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Column */}
                                    <div className="space-y-3">
                                        <Label className="text-xs uppercase tracking-wider text-[#5B4B8A] font-bold">{t('log_tool.step3.col_action')}</Label>
                                        <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                                            {[
                                                { id: 'yelled', label: t('log_tool.builder.actions.yelled'), icon: '📢' },
                                                { id: 'ignored', label: t('log_tool.builder.actions.ignored'), icon: '🔕' },
                                                { id: 'criticized', label: t('log_tool.builder.actions.criticized'), icon: '👎' },
                                                { id: 'excluded', label: t('log_tool.builder.actions.excluded'), icon: '🚪' },
                                                { id: 'mocked', label: t('log_tool.builder.actions.mocked'), icon: '🤡' },
                                                { id: 'threatened', label: t('log_tool.builder.actions.threatened'), icon: '⚠️' },
                                                { id: 'withheld', label: t('log_tool.builder.actions.withheld'), icon: '🤐' },
                                            ].map(act => (
                                                <div
                                                    key={act.id}
                                                    onClick={() => {
                                                        const parts = formData.description.split(' ');
                                                        const subject = parts.length > 0 && parts[0] ? parts[0] : 'Tekijä';
                                                        updateFormData({ description: `${subject} ${act.label} ...` });
                                                    }}
                                                    className={cn(
                                                        "p-3 rounded-sm border cursor-pointer transition-all hover:bg-[#FDFBF7] flex items-center gap-3",
                                                        formData.description.includes(act.label) ? "border-rose-500 bg-rose-50" : "border-[#E8DDD0]"
                                                    )}
                                                >
                                                    <span className="text-xl">{act.icon}</span>
                                                    <span className="font-medium text-slate-700">{act.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Context Column */}
                                    <div className="space-y-3">
                                        <Label className="text-xs uppercase tracking-wider text-[#5B4B8A] font-bold">{t('log_tool.step3.col_context')}</Label>
                                        <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                                            {[
                                                { id: 'meeting', label: t('log_tool.builder.contexts.meeting'), icon: '📅' },
                                                { id: 'email', label: t('log_tool.builder.contexts.email'), icon: '📧' },
                                                { id: 'public', label: t('log_tool.builder.contexts.public'), icon: '👀' },
                                                { id: 'private', label: t('log_tool.builder.contexts.private'), icon: '🔒' },
                                                { id: 'chat', label: t('log_tool.builder.contexts.chat'), icon: '💬' },
                                                { id: 'break', label: t('log_tool.builder.contexts.break'), icon: '☕' },
                                            ].map(ctx => (
                                                <div
                                                    key={ctx.id}
                                                    onClick={() => {
                                                        const cleanDesc = formData.description.replace(/\s\.\.\.$/, '');
                                                        updateFormData({ description: `${cleanDesc} ${ctx.label}.` });
                                                    }}
                                                    className={cn(
                                                        "p-3 rounded-sm border cursor-pointer transition-all hover:bg-[#FDFBF7] flex items-center gap-3",
                                                        formData.description.includes(ctx.label) ? "border-emerald-500 bg-emerald-50" : "border-[#E8DDD0]"
                                                    )}
                                                >
                                                    <span className="text-xl">{ctx.icon}</span>
                                                    <span className="font-medium text-slate-700">{ctx.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <Label className="flex justify-between">
                                        {t('log_tool.step3.result_label')}
                                    </Label>
                                    <Textarea
                                        className="min-h-[120px] text-lg leading-relaxed shadow-inner bg-[#FDFBF7] border-[#E8DDD0]"
                                        value={formData.description}
                                        onChange={e => updateFormData({ description: e.target.value })}
                                        placeholder={t('log_tool.step3.result_placeholder')}
                                    />
                                </div>

                                <div className="space-y-4 pt-4 border-t border-[#E8DDD0]">
                                    <Label>{t('log_tool.step3.intensity.label')}</Label>
                                    <div className="px-2">
                                        <Slider
                                            min={1}
                                            max={5}
                                            step={1}
                                            value={formData.intensity}
                                            onValueChange={val => updateFormData({ intensity: val })}
                                            className="py-4"
                                        />
                                        <div className="flex justify-between text-xs text-[#5B4B8A] uppercase font-bold tracking-wider">
                                            <span>{t('log_tool.step3.intensity.low')}</span>
                                            <span>{t('log_tool.step3.intensity.med')}</span>
                                            <span className="text-rose-500">{t('log_tool.step3.intensity.high')}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>{t('log_tool.step3.witnesses')}</Label>
                                    <Input
                                        placeholder={t('log_tool.step3.witnesses_placeholder')}
                                        value={formData.witnesses}
                                        onChange={e => updateFormData({ witnesses: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="block mb-2">{t('log_tool.step3.evidence')}</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {['Email', 'Teams/Slack', 'SMS', 'Audio'].map(type => (
                                            <Badge
                                                key={type}
                                                variant={formData.evidenceType.includes(type) ? "default" : "outline"}
                                                className="cursor-pointer py-2 px-3 hover:bg-slate-100"
                                                onClick={() => toggleEvidenceType(type)}
                                            >
                                                {formData.evidenceType.includes(type) && <CheckCircle2 className="w-3 h-3 mr-1" />}
                                                {type}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Step 4: Summary */}
                {
                    step === 4 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="text-center space-y-2">
                                <h1 className="text-2xl font-serif font-bold text-[#2B2B2B]">{t('log_tool.step4.title')}</h1>
                                <p className="text-[#4A4A4A]">{t('log_tool.step4.subtitle')}</p>
                            </div>

                            <div className="bg-white rounded-sm shadow-sm border border-[#E8DDD0] overflow-hidden">
                                <div className={cn("p-4 text-white flex items-center justify-between", getMeterColor(meterScore))}>
                                    <div className="font-bold flex items-center gap-2">
                                        <ShieldCheck className="w-5 h-5" />
                                        {t('log_tool.meter.label')}: {meterScore}%
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <p className="text-sm font-medium text-slate-600 italic">
                                        "{getMeterFeedback(meterScore)}"
                                    </p>

                                    <div className="space-y-4 pt-4 border-t border-slate-100">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-slate-400 block text-xs uppercase">{t('log_tool.step4.labels.event')}</span>
                                                <span className="font-bold text-slate-900">{selectedTactic?.name}</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-400 block text-xs uppercase">{t('log_tool.step4.labels.time')}</span>
                                                <span className="font-bold text-slate-900">{formData.date} {t('log_tool.step4.at')} {formData.time}</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-400 block text-xs uppercase">{t('log_tool.step4.labels.location')}</span>
                                                <span className="font-bold text-slate-900">{formData.location || "-"}</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-400 block text-xs uppercase">{t('log_tool.step4.labels.person')}</span>
                                                <span className="font-bold text-slate-900">{formData.person || "-"}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 block text-xs uppercase mb-1">{t('log_tool.step4.labels.desc')}</span>
                                            <p className="text-slate-700 bg-slate-50 p-3 rounded-lg text-sm">
                                                {formData.description || t('log_tool.step4.labels.no_desc')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Step 5: Advice & Action Plan */}
                {
                    step === 5 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="text-center space-y-2">
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <h1 className="text-2xl font-serif font-bold text-[#2B2B2B]">{t('log_tool.step5.title')}</h1>
                                <p className="text-[#4A4A4A]">{t('log_tool.step5.subtitle')}</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-[#5B4B8A]">
                                        <Lightbulb className="w-5 h-5" />
                                        <h3 className="font-bold uppercase tracking-widest text-xs">{t('log_tool.step5.actions_title')} ({selectedTactic?.name})</h3>
                                    </div>
                                    <div className="space-y-3">
                                        {/* Mock advice if not in tactic data, or fetch real advice */}
                                        <div className="flex gap-4 p-4 bg-[#FDFBF7] rounded-sm border border-[#E8DDD0]">
                                            <span className="font-black text-[#5B4B8A]/20 text-lg">1</span>
                                            <p className="text-[#4A4A4A] text-sm font-medium">
                                                {t('log_tool.step5.actions.a1')}
                                            </p>
                                        </div>
                                        <div className="flex gap-4 p-4 bg-[#FDFBF7] rounded-sm border border-[#E8DDD0]">
                                            <span className="font-black text-[#5B4B8A]/20 text-lg">2</span>
                                            <p className="text-[#4A4A4A] text-sm font-medium">
                                                {t('log_tool.step5.actions.a2')}
                                            </p>
                                        </div>
                                        <div className="flex gap-4 p-4 bg-[#FDFBF7] rounded-sm border border-[#E8DDD0]">
                                            <span className="font-black text-[#5B4B8A]/20 text-lg">3</span>
                                            <p className="text-[#4A4A4A] text-sm font-medium">
                                                {t('log_tool.step5.actions.a3')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                    {step > 0 ? (
                        <Button variant="outline" onClick={prevStep} className="w-32 border-[#E8DDD0] hover:border-[#5B4B8A] text-[#2B2B2B]">
                            <ArrowLeft className="w-4 h-4 mr-2" /> {t('log_tool.buttons.back')}
                        </Button>
                    ) : (
                        <Button variant="ghost" onClick={() => router.back()} className="w-32 text-[#5B4B8A] hover:bg-[#5B4B8A]/10">
                            {t('log_tool.buttons.cancel')}
                        </Button>
                    )}


                    {step < 4 ? (
                        <Button
                            onClick={nextStep}
                            disabled={step === 1 && !selectedTactic}
                            className="w-32 bg-[#2B2B2B] hover:bg-[#4A4A4A] font-bold uppercase tracking-widest text-xs"
                        >
                            {t('log_tool.buttons.next')} <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    ) : step === 4 ? (
                        <Button
                            onClick={saveLog}
                            className="w-40 bg-emerald-600 hover:bg-emerald-700 font-bold text-white shadow-lg shadow-emerald-200"
                        >
                            {t('log_tool.buttons.save')} <Save className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <Button
                            onClick={() => router.push('/timeline')}
                            className="w-40 bg-[#2B2B2B] hover:bg-[#4A4A4A] font-bold text-white uppercase tracking-widest text-xs"
                        >
                            {t('log_tool.buttons.done')} <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    )}
                </div>
            </main >
        </div >
    );
}
