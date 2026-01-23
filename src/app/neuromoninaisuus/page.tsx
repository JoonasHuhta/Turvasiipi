"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Brain, Target, Scale, MessageCircle, AlertTriangle, Zap, Ear, Heart, BookOpen, ShieldCheck, ArrowRight, UserCheck, Briefcase, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

export default function NeurodiversityPage() {
    const { t } = useLanguage();
    const { completeModule, isModuleCompleted } = useProgress();
    const isCompleted = isModuleCompleted('neuro_info');

    const handleComplete = () => {
        completeModule('neuro_info');
    };
    return (
        <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 animate-in fade-in duration-500">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* HEADER */}
                <div className="text-center space-y-6">
                    <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border-b border-[#5B4B8A] pb-1 inline-block">
                        {t('neuro_page.header.mini_title')}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#2B2B2B] tracking-tight leading-tight">
                        {t('neuro_page.header.title')}
                    </h1>
                    <p className="text-xl text-[#4A4A4A] max-w-2xl mx-auto leading-relaxed font-serif italic">
                        {t('neuro_page.header.quote')}
                    </p>
                    <p className="text-sm text-[#666] max-w-xl mx-auto leading-relaxed">
                        {t('neuro_page.header.intro')}
                    </p>
                </div>

                {/* INTRODUCTION CARDS */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-white border-[#E8DDD0] shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                                <Brain className="w-8 h-8" />
                            </div>
                            <div>
                                <CardTitle className="text-xl">{t('neuro_page.cards.what.title')}</CardTitle>
                                <CardDescription>{t('neuro_page.cards.what.subtitle')}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="text-[#4A4A4A] space-y-2 text-sm">
                            <p dangerouslySetInnerHTML={{ __html: t('neuro_page.cards.what.adhd') }} />
                            <p dangerouslySetInnerHTML={{ __html: t('neuro_page.cards.what.autism') }} />
                            <p dangerouslySetInnerHTML={{ __html: t('neuro_page.cards.what.dyslexia') }} />
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-[#E8DDD0] shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="p-3 bg-[#FDFBF7] text-[#5B4B8A] rounded-xl border border-[#E8DDD0]">
                                <Zap className="w-8 h-8" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-serif">{t('neuro_page.cards.superpowers.title')}</CardTitle>
                                <CardDescription className="text-[#5B4B8A] font-mono text-[10px] uppercase tracking-wider">{t('neuro_page.cards.superpowers.subtitle')}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="text-[#4A4A4A] space-y-2 text-sm leading-relaxed">
                            <p dangerouslySetInnerHTML={{ __html: t('neuro_page.cards.superpowers.productivity') }} />
                            <p dangerouslySetInnerHTML={{ __html: t('neuro_page.cards.superpowers.innovation') }} />
                            <p dangerouslySetInnerHTML={{ __html: t('neuro_page.cards.superpowers.hyperfocus') }} />
                        </CardContent>
                    </Card>
                </div>

                {/* LUSIKKATEORIA */}
                <section id="lusikkateoria" className="bg-white rounded-[2.5rem] p-8 md:p-12 text-[#2B2B2B] relative overflow-hidden shadow-sm border border-[#E8DDD0]">
                    <div className="relative z-10 space-y-8">
                        <div className="flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
                            <div className="flex-1 space-y-4">
                                <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border-b border-[#5B4B8A] pb-1 inline-block">
                                    {t('neuro_page.spoon_theory.mini_title')}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2B2B2B] leading-tight">
                                    {t('neuro_page.spoon_theory.title')}
                                </h2>
                                <p className="text-[#4A4A4A] leading-relaxed font-medium">
                                    {t('neuro_page.spoon_theory.text')}
                                </p>
                            </div>
                            <div className="flex-1 grid grid-cols-4 gap-4 max-w-sm">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                    <div key={i} className={`aspect-square rounded-2xl flex items-center justify-center text-2xl bg-white border border-[#E8DDD0] shadow-sm ${i > 3 ? 'opacity-20 grayscale' : 'animate-pulse'}`}>
                                        🥄
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#E8DDD0]">
                                <h4 className="font-bold mb-3 text-[#5B4B8A] uppercase text-[10px] tracking-widest">{t('neuro_page.spoon_theory.what.title')}</h4>
                                <p className="text-sm text-[#4A4A4A]">{t('neuro_page.spoon_theory.what.text')}</p>
                            </div>
                            <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#E8DDD0]">
                                <h4 className="font-bold mb-3 text-rose-700 uppercase tracking-widest text-[10px]">{t('neuro_page.spoon_theory.consume.title')}</h4>
                                <p className="text-sm text-[#4A4A4A]">{t('neuro_page.spoon_theory.consume.text')}</p>
                            </div>
                            <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#E8DDD0]">
                                <h4 className="font-bold mb-3 text-emerald-700 uppercase tracking-widest text-[10px]">{t('neuro_page.spoon_theory.save.title')}</h4>
                                <p className="text-sm text-[#4A4A4A]">{t('neuro_page.spoon_theory.save.text')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* MAIN CONTENT SECTIONS */}

                <div className="space-y-8">

                    {/* 1. HAASTEET */}
                    <section id="haasteet">
                        <h2 className="text-2xl font-serif font-bold flex items-center gap-3 mb-6 text-[#2B2B2B]">
                            <AlertTriangle className="w-6 h-6 text-amber-600" />
                            {t('neuro_page.challenges.title')}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base flex items-center gap-2"><Briefcase className="w-4 h-4 text-slate-400" /> {t('neuro_page.challenges.environment.title')}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-slate-600 space-y-2">
                                    <p>{t('neuro_page.challenges.environment.text')}</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base flex items-center gap-2"><Ear className="w-4 h-4 text-slate-400" /> {t('neuro_page.challenges.misunderstandings.title')}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-slate-600 space-y-2">
                                    <p>{t('neuro_page.challenges.misunderstandings.text')}</p>
                                </CardContent>
                            </Card>
                            <Card className="md:col-span-2 border-red-100 bg-red-50/50">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base flex items-center gap-2 text-red-700">{t('neuro_page.challenges.masking.title')}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-slate-700 space-y-2">
                                    <p dangerouslySetInnerHTML={{ __html: t('neuro_page.challenges.masking.text') }} />
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    {/* 2. MITÄ VOIT TEHDÄ */}
                    <section id="toiminta" className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#E8DDD0]">
                        <h2 className="text-2xl font-serif font-bold flex items-center gap-3 mb-6 text-[#2B2B2B]">
                            <UserCheck className="w-6 h-6 text-emerald-600" />
                            {t('neuro_page.actions.title')}
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg text-emerald-800">{t('neuro_page.actions.employee.title')}</h3>
                                <ul className="space-y-3 text-slate-600 text-sm">
                                    {((t('neuro_page.actions.employee.list', { returnObjects: true }) as string[]) || []).map((item, i) => (
                                        <li key={i} className="flex gap-2" dangerouslySetInnerHTML={{ __html: item }} />
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg text-indigo-800">{t('neuro_page.actions.manager.title')}</h3>
                                <ul className="space-y-3 text-slate-600 text-sm">
                                    {((t('neuro_page.actions.manager.list', { returnObjects: true }) as string[]) || []).map((item, i) => (
                                        <li key={i} className="flex gap-2" dangerouslySetInnerHTML={{ __html: item }} />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 3. DOUBLE EMPATHY DECODER */}
                    <section id="decoder" className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#FDFBF7] text-[#5B4B8A] rounded-lg border border-[#E8DDD0]">
                                <MessageCircle className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-[#2B2B2B]">{t('neuro_page.decoder.title')}</h2>
                        </div>
                        <p className="text-slate-600 text-sm">{t('neuro_page.decoder.intro')}</p>

                        <div className="grid gap-4">
                            {((t('neuro_page.decoder.items', { returnObjects: true }) as Array<{ situation: string, nt: string, nd: string, bridge: string }>) || []).map((item, i) => (
                                <Card key={i} className="overflow-hidden border-slate-200">
                                    <div className="bg-slate-50 border-b border-slate-100 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-500">
                                        {t('neuro_page.decoder.situation_label')}: {item.situation}
                                    </div>
                                    <div className="grid md:grid-cols-2">
                                        <div className="p-4 border-b md:border-b-0 md:border-r border-slate-100 space-y-2">
                                            <span className="text-[10px] font-bold text-indigo-600 uppercase">{t('neuro_page.decoder.nt_label')}</span>
                                            <p className="text-sm text-slate-600 italic">"{item.nt}"</p>
                                        </div>
                                        <div className="p-4 space-y-2 bg-amber-50/30">
                                            <span className="text-[10px] font-bold text-amber-600 uppercase">{t('neuro_page.decoder.nd_label')}</span>
                                            <p className="text-sm text-slate-700 font-medium">"{item.nd}"</p>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-emerald-50 flex items-start gap-3">
                                        <UserCheck className="w-4 h-4 text-emerald-600 mt-0.5" />
                                        <p className="text-xs text-emerald-800 font-bold">{t('neuro_page.decoder.solution_label')}: {item.bridge}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* 4. NEPSY LOG TEMPLATES */}
                    <section id="templates" className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#FDFBF7] text-[#5B4B8A] rounded-lg border border-[#E8DDD0]">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-[#2B2B2B]">{t('neuro_page.logs.title')}</h2>
                        </div>
                        <p className="text-slate-600 text-sm font-medium">{t('neuro_page.logs.subtitle')}</p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="border-2 border-dashed border-slate-200 bg-transparent hover:border-indigo-300 transition-colors cursor-pointer group">
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center justify-between">
                                        {t('neuro_page.logs.accommodation.title')}
                                        <ShieldCheck className="w-4 h-4 text-slate-300 group-hover:text-indigo-500" />
                                    </CardTitle>
                                    <CardDescription>{t('neuro_page.logs.accommodation.desc')}</CardDescription>
                                </CardHeader>
                                <CardContent className="bg-white m-4 rounded-xl p-4 text-[11px] font-mono text-slate-500 leading-relaxed border border-slate-100 italic">
                                    <div dangerouslySetInnerHTML={{ __html: t('neuro_page.logs.accommodation.content') }} />
                                </CardContent>
                            </Card>

                            <Card className="border-2 border-dashed border-slate-200 bg-transparent hover:border-rose-300 transition-colors cursor-pointer group">
                                <CardHeader>
                                    <CardTitle className="text-base flex items-center justify-between">
                                        {t('neuro_page.logs.breakdown.title')}
                                        <AlertTriangle className="w-4 h-4 text-slate-300 group-hover:text-rose-500" />
                                    </CardTitle>
                                    <CardDescription>{t('neuro_page.logs.breakdown.desc')}</CardDescription>
                                </CardHeader>
                                <CardContent className="bg-white m-4 rounded-xl p-4 text-[11px] font-mono text-slate-500 leading-relaxed border border-slate-100 italic">
                                    <div dangerouslySetInnerHTML={{ __html: t('neuro_page.logs.breakdown.content') }} />
                                </CardContent>
                            </Card>
                        </div>
                        <div className="bg-[#FDFBF7] rounded-2xl p-6 text-[#2B2B2B] text-sm border border-[#E8DDD0] shadow-sm">
                            <div className="flex gap-4 items-center">
                                <Scale className="w-10 h-10 text-[#5B4B8A] shrink-0 opacity-50" />
                                <div>
                                    <h4 className="font-bold mb-1 font-serif">{t('neuro_page.logs.rights.title')}</h4>
                                    <p className="text-[#4A4A4A] leading-relaxed">{t('neuro_page.logs.rights.text')}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>

                {/* SIMULATION CALL TO ACTION */}
                <div className="bg-white border border-[#E8DDD0] rounded-3xl p-8 md:p-12 text-[#2B2B2B] relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-[#5B4B8A]/20" />

                    <div className="relative z-10 grid lg:grid-cols-[1fr_1.2fr] gap-12 text-left items-center">
                        <div className="space-y-6">
                            <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border-b border-[#5B4B8A] pb-1 inline-block">
                                {t('neuro_page.simulation.mini_title')}
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#2B2B2B] leading-tight">
                                {t('neuro_page.simulation.title')}
                            </h2>
                            <p className="text-[#4A4A4A] text-lg leading-relaxed max-w-md">
                                {t('neuro_page.simulation.text')}
                            </p>
                        </div>

                        <div className="grid gap-4">
                            <Link href="/simulaatio/neuro">
                                <div className="p-5 bg-[#FDFBF7] border border-[#E8DDD0] rounded-2xl hover:bg-white hover:border-[#5B4B8A] transition-all group shadow-sm">
                                    <h4 className="font-bold text-[#2B2B2B] flex items-center justify-between">
                                        {t('neuro_page.simulation.card1.title')}
                                        <ArrowRight className="w-4 h-4 text-[#5B4B8A] group-hover:translate-x-1 transition-transform" />
                                    </h4>
                                    <p className="text-xs text-[#666] mt-1">{t('neuro_page.simulation.card1.desc')}</p>
                                </div>
                            </Link>
                            <Link href="/simulaatio/performance-trap">
                                <div className="p-5 bg-[#FDFBF7] border border-[#E8DDD0] rounded-2xl hover:bg-white hover:border-[#5B4B8A] transition-all group shadow-sm">
                                    <h4 className="font-bold text-[#2B2B2B] flex items-center justify-between">
                                        {t('neuro_page.simulation.card2.title')}
                                        <ArrowRight className="w-4 h-4 text-[#5B4B8A] group-hover:translate-x-1 transition-transform" />
                                    </h4>
                                    <p className="text-xs text-[#666] mt-1">{t('neuro_page.simulation.card2.desc')}</p>
                                </div>
                            </Link>
                            <Link href="/simulaatio/information-shadow">
                                <div className="p-5 bg-[#FDFBF7] border border-[#E8DDD0] rounded-2xl hover:bg-white hover:border-[#5B4B8A] transition-all group shadow-sm">
                                    <h4 className="font-bold text-[#2B2B2B] flex items-center justify-between">
                                        {t('neuro_page.simulation.card3.title')}
                                        <ArrowRight className="w-4 h-4 text-[#5B4B8A] group-hover:translate-x-1 transition-transform" />
                                    </h4>
                                    <p className="text-xs text-[#666] mt-1">{t('neuro_page.simulation.card3.desc')}</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="pt-8 mt-8 border-t border-[#E8DDD0] relative z-10 text-center lg:text-left">
                        <Link href="/simulaatio">
                            <Button variant="outline" className="border-[#E8DDD0] text-[#5B4B8A] hover:bg-[#FDFBF7] rounded-full px-8 font-serif">
                                {t('neuro_page.simulation.btn_all')}
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* COMPLETION SECTION */}
                <div className="pt-8 border-t border-slate-200">
                    <Card className={cn(
                        "transition-all duration-500 rounded-3xl overflow-hidden border-2",
                        isCompleted
                            ? "bg-emerald-50 border-emerald-100 shadow-sm"
                            : "bg-white border-indigo-100 shadow-xl"
                    )}>
                        <CardContent className="p-6 md:p-12 text-center space-y-6">
                            <div className={cn(
                                "w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-4 transition-all duration-500 shadow-sm border border-[#E8DDD0]",
                                isCompleted ? "bg-emerald-500 text-white rotate-12" : "bg-white text-[#5B4B8A]"
                            )}>
                                {isCompleted ? <CheckCircle2 className="w-10 h-10" /> : <BookOpen className="w-10 h-10" />}
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">
                                    {isCompleted ? t('neuro_page.completion.title_done') : t('neuro_page.completion.title_new')}
                                </h3>
                                <p className="text-slate-600 max-w-sm mx-auto font-medium">
                                    {isCompleted
                                        ? t('neuro_page.completion.text_done')
                                        : t('neuro_page.completion.text_new')}
                                </p>
                            </div>

                            {!isCompleted ? (
                                <Button
                                    onClick={handleComplete}
                                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-wider px-8 py-4 sm:py-6 rounded-2xl shadow-lg hover:shadow-indigo-500/25 transition-all h-auto whitespace-normal"
                                >
                                    {t('neuro_page.completion.btn_mark')}
                                </Button>
                            ) : (
                                <Link href="/profiili" className="block w-full sm:inline-block sm:w-auto">
                                    <Button variant="outline" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-100 font-bold px-10 py-6 rounded-2xl">
                                        {t('neuro_page.completion.btn_back')}
                                    </Button>
                                </Link>
                            )}
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
