"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, BookOpen, Shield, AlertTriangle, CheckCircle2, XCircle, ArrowRight, Quote, Lock, Copy, Eye, FileCheck, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export default function DocumentationGuidePage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-[#FDFBF7] pb-20">
            {/* Header */}
            <div className="bg-[#2B2B2B] text-white pt-32 pb-16 px-6">
                <div className="max-w-3xl mx-auto space-y-6">
                    <Link href="/timeline" className="inline-flex items-center text-white/60 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" /> {t('guide.hero.back')}
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                        {t('guide.hero.title_start')} <br />
                        <span className="text-emerald-400">{t('guide.hero.title_end')}</span>
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
                        {t('guide.hero.subtitle')}
                    </p>
                </div>
            </div>

            <main className="max-w-3xl mx-auto px-6 -mt-10 space-y-16">

                {/* Intro Card */}
                <Card className="border-none shadow-xl bg-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
                    <CardContent className="p-8 md:p-10 space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-emerald-100 rounded-full text-emerald-700 shrink-0">
                                <Shield className="w-8 h-8" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-[#2B2B2B]">{t('guide.intro.title')}</h2>
                                <p className="text-[#4A4A4A] leading-relaxed text-lg">
                                    {t('guide.intro.text')}
                                </p>
                                <div className="grid md:grid-cols-2 gap-4 pt-2">
                                    <div className="bg-[#FDFBF7] p-4 rounded-lg border border-[#E8DDD0]">
                                        <h3 className="font-bold text-[#5B4B8A] mb-2 flex items-center gap-2">
                                            <Lock className="w-4 h-4" /> {t('guide.intro.memory_title')}
                                        </h3>
                                        <p className="text-sm text-[#4A4A4A]">{t('guide.intro.memory_text')}</p>
                                    </div>
                                    <div className="bg-[#FDFBF7] p-4 rounded-lg border border-[#E8DDD0]">
                                        <h3 className="font-bold text-[#5B4B8A] mb-2 flex items-center gap-2">
                                            <Eye className="w-4 h-4" /> {t('guide.intro.patterns_title')}
                                        </h3>
                                        <p className="text-sm text-[#4A4A4A]">{t('guide.intro.patterns_text')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Psychological Safety */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 text-[#5B4B8A]">
                        <AlertTriangle className="w-6 h-6" />
                        <h2 className="text-sm font-bold uppercase tracking-widest">{t('guide.psych.title')}</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-[#E8DDD0] hover:border-[#5B4B8A]/30 transition-colors">
                            <h3 className="font-bold text-[#2B2B2B] mb-2">{t('guide.psych.card1_title')}</h3>
                            <p className="text-[#4A4A4A] text-sm leading-relaxed">
                                {t('guide.psych.card1_text')}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-[#E8DDD0] hover:border-[#5B4B8A]/30 transition-colors">
                            <h3 className="font-bold text-[#2B2B2B] mb-2">{t('guide.psych.card2_title')}</h3>
                            <p className="text-[#4A4A4A] text-sm leading-relaxed">
                                {t('guide.psych.card2_text')}
                            </p>
                        </div>
                    </div>
                </section>

                {/* 5-Point Formula & Copyable Template */}
                <section className="space-y-8">
                    <div className="text-center max-w-lg mx-auto space-y-2">
                        <h2 className="text-3xl font-serif font-bold text-[#2B2B2B]">{t('guide.formula.title')}</h2>
                        <p className="text-[#4A4A4A]">{t('guide.formula.subtitle')}</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-[#E8DDD0] overflow-hidden">
                        <div className="grid divide-y divide-[#E8DDD0]">
                            {[
                                { num: 1, title: t('guide.formula.step1.title'), desc: t('guide.formula.step1.desc') },
                                { num: 2, title: t('guide.formula.step2.title'), desc: t('guide.formula.step2.desc') },
                                { num: 3, title: t('guide.formula.step3.title'), desc: t('guide.formula.step3.desc') },
                                { num: 4, title: t('guide.formula.step4.title'), desc: t('guide.formula.step4.desc') },
                                { num: 5, title: t('guide.formula.step5.title'), desc: t('guide.formula.step5.desc') },
                            ].map((item) => (
                                <div key={item.num} className="p-6 flex gap-4 items-center">
                                    <div className="w-10 h-10 rounded-full bg-[#2B2B2B] text-white flex items-center justify-center font-bold text-lg shrink-0">
                                        {item.num}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#2B2B2B]">{item.title}</h3>
                                        <p className="text-[#4A4A4A] text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Copyable Template Card */}
                    <Card className="border-indigo-100 bg-indigo-50/30">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-[#5B4B8A] flex items-center gap-2">
                                    <Copy className="w-4 h-4" /> {t('guide.template.title')}
                                </h3>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-white hover:bg-indigo-50 text-indigo-700 border-indigo-200"
                                    onClick={() => {
                                        const template = t('guide.template.content');
                                        navigator.clipboard.writeText(template);
                                        alert(t('guide.template.copied'));
                                    }}
                                >
                                    <Copy className="w-3 h-3 mr-2" /> {t('guide.template.button')}
                                </Button>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-indigo-100 text-sm font-mono text-[#4A4A4A] whitespace-pre-line">
                                {t('guide.template.content').split('\n').filter((l: string) => l.trim() !== '').map((line: string, i: number) => <div key={i}>{line}</div>)}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Follow-up Tracking */}
                    <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 space-y-2">
                        <h3 className="font-bold text-amber-900 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" /> {t('guide.followup.title')}
                        </h3>
                        <p className="text-amber-800 text-sm leading-relaxed">
                            {t('guide.followup.text')}<br />
                            <em>{t('guide.followup.example')}</em>
                        </p>
                    </div>
                </section>

                {/* Interactive Training: Observation vs Emotion */}
                <section className="space-y-8 py-8">
                    <div className="text-center max-w-lg mx-auto space-y-2">
                        <h2 className="text-3xl font-serif font-bold text-[#2B2B2B]">{t('guide.training.title')}</h2>
                        <p className="text-[#4A4A4A]">{t('guide.training.subtitle')}</p>
                    </div>

                    <div className="space-y-6">
                        {(t('guide.training.cards', { returnObjects: true }) as any[]).map((card: any, index: number) => (
                            <TrainingCard
                                key={index}
                                bad={card.bad}
                                good={card.good}
                                explanation={card.expl}
                            />
                        ))}
                    </div>
                </section>

                {/* Witness Protection & Anonymization */}
                <section className="grid md:grid-cols-2 gap-8">
                    <div className="bg-[#FDFBF7] p-8 rounded-3xl border border-[#E8DDD0] space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#5B4B8A] rounded-lg text-white">
                                <Quote className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-[#2B2B2B]">{t('guide.witness.title')}</h2>
                        </div>

                        <div className="space-y-4 text-[#4A4A4A] leading-relaxed text-sm">
                            <p>{t('guide.witness.text')}</p>
                            <p><strong>{t('guide.witness.anonymize')}</strong></p>
                            <ul className="space-y-2 list-disc pl-4 marker:text-[#5B4B8A]">
                                {(t('guide.witness.list', { returnObjects: true }) as string[]).map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Technical Security */}
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-700 rounded-lg text-white">
                                <Lock className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-[#2B2B2B]">{t('guide.security.title')}</h2>
                        </div>

                        <div className="space-y-4 text-[#4A4A4A] leading-relaxed text-sm">
                            <p><strong>{t('guide.security.dont_use_work')}</strong></p>
                            <ul className="space-y-2 list-disc pl-4 marker:text-slate-400">
                                {(t('guide.security.list', { returnObjects: true }) as string[]).map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Templates Link */}
                <section className="bg-indigo-900 text-white p-8 rounded-3xl space-y-6 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="space-y-4 max-w-lg">
                            <h2 className="text-2xl font-serif font-bold flex items-center gap-3">
                                <FileCheck className="w-8 h-8 text-indigo-300" />
                                {t('guide.templates_link.title')}
                            </h2>
                            <p className="text-indigo-100 text-sm leading-relaxed">
                                {t('guide.templates_link.text')}
                            </p>
                        </div>
                        <Link href="/raportti">
                            <Button className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold px-6 py-6 rounded-xl shadow-lg transition-all group shrink-0">
                                {t('guide.templates_link.button')} <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Motivation Challenge */}
                <section className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-3xl border border-emerald-100 text-center space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl -mr-16 -mt-16" />

                    <h2 className="text-2xl font-serif font-bold text-[#2B2B2B]">{t('guide.motivation.title')}</h2>
                    <div className="grid md:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
                        <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">{t('guide.motivation.today')}</span>
                            <p className="text-sm">{t('guide.motivation.today_text')}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">{t('guide.motivation.tomorrow')}</span>
                            <p className="text-sm">{t('guide.motivation.tomorrow_text')}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">{t('guide.motivation.week')}</span>
                            <p className="text-sm">{t('guide.motivation.week_text')}</p>
                        </div>
                    </div>
                    <p className="text-emerald-800 text-sm italic">{t('guide.motivation.quote')}</p>
                </section>

                {/* Final CTA */}
                <div className="bg-[#2B2B2B] rounded-3xl p-8 md:p-12 text-center space-y-6">
                    <h2 className="text-3xl font-serif font-bold text-white">{t('guide.cta.title')}</h2>
                    <p className="text-white/70 max-w-md mx-auto">
                        {t('guide.cta.text')}
                    </p>
                    <Link href="/loki" className="inline-block">
                        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-6 rounded-xl text-lg shadow-lg shadow-emerald-500/20 transition-all hover:scale-105">
                            {t('guide.cta.button')} <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>

                <div className="h-10" />
            </main>
        </div>
    );
}

function TrainingCard({ bad, good, explanation }: { bad: string, good: string, explanation: string }) {
    const [revealed, setRevealed] = useState(false);
    const { t } = useLanguage();

    return (
        <div className="grid md:grid-cols-2 gap-4 items-stretch relative">
            {/* The "Bad" Side */}
            <div className={cn(
                "p-6 rounded-xl border border-dashed border-rose-200 bg-rose-50/50 transition-opacity",
                revealed ? "opacity-50" : "opacity-100"
            )}>
                <div className="flex items-center gap-2 mb-3 text-rose-600 font-bold text-xs uppercase tracking-widest">
                    <XCircle className="w-4 h-4" /> {t('guide.training.emotion_label')}
                </div>
                <p className="text-lg font-medium text-rose-900">"{bad}"</p>
            </div>

            {/* The "Good" Side (Hidden/Revealed) */}
            <div
                className={cn(
                    "p-6 rounded-xl border transition-all cursor-pointer relative overflow-hidden group",
                    revealed
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-white border-[#E8DDD0] hover:border-[#5B4B8A]"
                )}
                onClick={() => setRevealed(true)}
            >
                {!revealed && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[2px] z-10 group-hover:bg-white/30 transition-colors">
                        <span className="bg-[#2B2B2B] text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg transform group-hover:scale-105 transition-transform">
                            <BookOpen className="w-4 h-4" /> {t('guide.training.reveal')}
                        </span>
                    </div>
                )}

                <div className="flex items-center gap-2 mb-3 text-emerald-600 font-bold text-xs uppercase tracking-widest">
                    <CheckCircle2 className="w-4 h-4" /> {t('guide.training.observation_label')}
                </div>
                <p className="text-lg font-bold text-[#2B2B2B] mb-2">"{good}"</p>
                <p className="text-sm text-[#4A4A4A] border-t border-emerald-200/50 pt-2 mt-2">
                    💡 {explanation}
                </p>
            </div>

            {!revealed && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:block hidden z-20 pointer-events-none">
                    <ArrowRight className="w-6 h-6 text-[#2B2B2B]/20" />
                </div>
            )}
        </div>
    );
}
