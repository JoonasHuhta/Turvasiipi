"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Brain, Briefcase, GraduationCap, Heart, Info, AlertTriangle, CheckCircle2, XCircle, ArrowRight, User, Shield, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgress } from "@/context/ProgressContext";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function YouthPage() {
    const { t } = useLanguage();
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [simulationStep, setSimulationStep] = useState<number>(0);
    const { completeModule, isModuleCompleted } = useProgress();

    const isCompleted = isModuleCompleted('youth_info');

    const handleComplete = () => {
        completeModule('youth_info');
    };

    return (
        <main className="min-h-screen bg-[#FDFBF7] pb-20">
            {/* HERO */}
            <section className="bg-[#2B2B2B] text-white py-16 px-4">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[#E8DDD0] text-sm font-medium">
                        <GraduationCap className="w-4 h-4" />
                        {t('youth_page.hero.label')}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black leading-tight" dangerouslySetInnerHTML={{ __html: t('youth_page.hero.title') }} />
                    <p className="text-xl text-[#E8DDD0] max-w-2xl leading-relaxed">
                        {t('youth_page.hero.text')}
                    </p>
                </div>
            </section>

            {/* MAIN CONTENT AREA */}
            <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
                <Tabs defaultValue="intro" className="space-y-8">

                    {/* NAV TABS */}
                    <TabsList className="bg-white p-1 shadow-lg rounded-xl flex flex-wrap h-auto gap-1 border border-[#E8DDD0]">
                        <TabsTrigger value="intro" className="flex-1 min-w-[120px] py-3 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">{t('youth_page.tabs.intro')}</TabsTrigger>
                        <TabsTrigger value="career" className="flex-1 min-w-[120px] py-3 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">{t('youth_page.tabs.career')}</TabsTrigger>
                        <TabsTrigger value="interview" className="flex-1 min-w-[120px] py-3 data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700">{t('youth_page.tabs.interview')}</TabsTrigger>
                        <TabsTrigger value="sim" className="flex-1 min-w-[120px] py-3 data-[state=active]:bg-rose-50 data-[state=active]:text-rose-700">{t('youth_page.tabs.sim')}</TabsTrigger>
                        <TabsTrigger value="recovery" className="flex-1 min-w-[120px] py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">{t('youth_page.tabs.recovery')}</TabsTrigger>
                    </TabsList>

                    {/* 1. INTRO (Tilannekuva) */}
                    <TabsContent value="intro" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-2xl">
                                    <Info className="w-6 h-6 text-[#5B4B8A]" />
                                    {t('youth_page.intro.title')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 text-[#4A4A4A] leading-relaxed">
                                <p dangerouslySetInnerHTML={{ __html: t('youth_page.intro.text1') }} />
                                <p>
                                    {t('youth_page.intro.text2')}
                                </p>

                                <div className="grid md:grid-cols-2 gap-4 my-6">
                                    <div className="bg-rose-50 p-5 rounded-xl border border-rose-100">
                                        <h3 className="font-bold text-rose-800 mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> {t('youth_page.intro.exploitation.title')}</h3>
                                        <p className="text-sm text-rose-700">{t('youth_page.intro.exploitation.text')}</p>
                                    </div>
                                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                        <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2"><User className="w-4 h-4" /> {t('youth_page.intro.structural.title')}</h3>
                                        <p className="text-sm text-slate-600">{t('youth_page.intro.structural.text')}</p>
                                    </div>
                                </div>

                                <p className="font-medium text-[#2B2B2B] bg-[#FDFBF7] p-4 rounded-lg border border-[#E8DDD0]">
                                    {t('youth_page.intro.quote')}
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* 2. CAREER (Ammatinvalinta) */}
                    <TabsContent value="career" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('youth_page.career.title')}</CardTitle>
                                <CardDescription>
                                    {t('youth_page.career.subtitle')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <Button
                                        variant="outline"
                                        className={cn("h-auto p-6 flex flex-col items-start gap-4 hover:border-indigo-500 hover:bg-indigo-50", selectedRole === 'IT' && "border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200")}
                                        onClick={() => setSelectedRole('IT')}
                                    >
                                        <div className="bg-blue-100 p-3 rounded-full text-blue-700 text-2xl">💻</div>
                                        <div className="text-left">
                                            <div className="font-bold text-lg mb-1">{t('youth_page.career.roles.it.title')}</div>
                                            <div className="text-sm text-slate-500">{t('youth_page.career.roles.it.desc')}</div>
                                        </div>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className={cn("h-auto p-6 flex flex-col items-start gap-4 hover:border-emerald-500 hover:bg-emerald-50", selectedRole === 'TECH' && "border-emerald-600 bg-emerald-50 ring-2 ring-emerald-200")}
                                        onClick={() => setSelectedRole('TECH')}
                                    >
                                        <div className="bg-emerald-100 p-3 rounded-full text-emerald-700 text-2xl">🔧</div>
                                        <div className="text-left">
                                            <div className="font-bold text-lg mb-1">{t('youth_page.career.roles.tech.title')}</div>
                                            <div className="text-sm text-slate-500">{t('youth_page.career.roles.tech.desc')}</div>
                                        </div>
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className={cn("h-auto p-6 flex flex-col items-start gap-4 hover:border-rose-500 hover:bg-rose-50", selectedRole === 'CARE' && "border-rose-600 bg-rose-50 ring-2 ring-rose-200")}
                                        onClick={() => setSelectedRole('CARE')}
                                    >
                                        <div className="bg-rose-100 p-3 rounded-full text-rose-700 text-2xl">❤️</div>
                                        <div className="text-left">
                                            <div className="font-bold text-lg mb-1">{t('youth_page.career.roles.care.title')}</div>
                                            <div className="text-sm text-slate-500">{t('youth_page.career.roles.care.desc')}</div>
                                        </div>
                                    </Button>
                                </div>

                                {selectedRole === 'IT' && (
                                    <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100 animate-in fade-in duration-300">
                                        <h3 className="text-xl font-bold text-blue-900 mb-4">{t('youth_page.career.it_content.title')}</h3>
                                        <ul className="space-y-3">
                                            <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> <span><strong>{t('youth_page.career.analysis.why_good')}</strong> {t('youth_page.career.it_content.good')}</span></li>
                                            <li className="flex gap-3"><AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" /> <span><strong>{t('youth_page.career.analysis.risk')}</strong> {t('youth_page.career.it_content.risk')}</span></li>
                                            <li className="flex gap-3"><XCircle className="w-5 h-5 text-rose-600 shrink-0" /> <span><strong>{t('youth_page.career.analysis.exploitation')}</strong> {t('youth_page.career.it_content.expl')}</span></li>
                                        </ul>
                                        <div className="mt-4 pt-4 border-t border-blue-200 text-sm font-semibold text-blue-800">
                                            {t('youth_page.career.analysis.strategy')} {t('youth_page.career.it_content.strat')}
                                        </div>
                                    </div>
                                )}

                                {selectedRole === 'TECH' && (
                                    <div className="mt-8 bg-emerald-50 p-6 rounded-xl border border-emerald-100 animate-in fade-in duration-300">
                                        <h3 className="text-xl font-bold text-emerald-900 mb-4">{t('youth_page.career.tech_content.title')}</h3>
                                        <ul className="space-y-3">
                                            <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> <span><strong>{t('youth_page.career.analysis.why_good')}</strong> {t('youth_page.career.tech_content.good')}</span></li>
                                            <li className="flex gap-3"><AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" /> <span><strong>{t('youth_page.career.analysis.risk')}</strong> {t('youth_page.career.tech_content.risk')}</span></li>
                                            <li className="flex gap-3"><XCircle className="w-5 h-5 text-rose-600 shrink-0" /> <span><strong>{t('youth_page.career.analysis.exploitation')}</strong> {t('youth_page.career.tech_content.expl')}</span></li>
                                        </ul>
                                        <div className="mt-4 pt-4 border-t border-emerald-200 text-sm font-semibold text-emerald-800">
                                            {t('youth_page.career.analysis.strategy')} {t('youth_page.career.tech_content.strat')}
                                        </div>
                                    </div>
                                )}

                                {selectedRole === 'CARE' && (
                                    <div className="mt-8 bg-rose-50 p-6 rounded-xl border border-rose-100 animate-in fade-in duration-300">
                                        <h3 className="text-xl font-bold text-rose-900 mb-4">{t('youth_page.career.care_content.title')}</h3>
                                        <ul className="space-y-3">
                                            <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> <span><strong>{t('youth_page.career.analysis.why_good')}</strong> {t('youth_page.career.care_content.good')}</span></li>
                                            <li className="flex gap-3"><AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" /> <span><strong>{t('youth_page.career.analysis.risk')}</strong> {t('youth_page.career.care_content.risk')}</span></li>
                                            <li className="flex gap-3"><XCircle className="w-5 h-5 text-rose-600 shrink-0" /> <span><strong>{t('youth_page.career.analysis.exploitation')}</strong> {t('youth_page.career.care_content.expl')}</span></li>
                                        </ul>
                                        <div className="mt-4 pt-4 border-t border-rose-200 text-sm font-semibold text-rose-800">
                                            {t('youth_page.career.analysis.strategy')} {t('youth_page.career.care_content.strat')}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* 3. INTERVIEW (Haastattelu) */}
                    <TabsContent value="interview" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('youth_page.interview.title')}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h3 className="font-bold flex items-center gap-2"><Shield className="w-5 h-5 text-indigo-500" /> {t('youth_page.interview.ask_title')}</h3>
                                        <div className="bg-slate-50 p-4 rounded-lg text-sm space-y-3">
                                            <div>
                                                <p className="font-semibold text-slate-800">{t('youth_page.interview.q1')}</p>
                                                <p className="text-slate-500 text-xs mt-1">{t('youth_page.interview.w1')}</p>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-800">{t('youth_page.interview.q2')}</p>
                                                <p className="text-slate-500 text-xs mt-1">{t('youth_page.interview.w2_good')}</p>
                                                <p className="text-slate-500 text-xs">{t('youth_page.interview.w2_bad')}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="font-bold flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-rose-500" /> {t('youth_page.interview.flags_title')}</h3>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex gap-2 items-start bg-rose-50 p-2 rounded text-rose-900 border border-rose-100">
                                                <XCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                                <span>{t('youth_page.interview.f1')}</span>
                                            </li>
                                            <li className="flex gap-2 items-start bg-rose-50 p-2 rounded text-rose-900 border border-rose-100">
                                                <XCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                                <span>{t('youth_page.interview.f2')}</span>
                                            </li>
                                            <li className="flex gap-2 items-start bg-rose-50 p-2 rounded text-rose-900 border border-rose-100">
                                                <XCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                                <span>{t('youth_page.interview.f3')}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* 4. SIMULATION (CTA) */}
                    <TabsContent value="sim" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card className="bg-indigo-950 text-white overflow-hidden relative shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500 rounded-full blur-[100px] opacity-10" />

                            <CardHeader className="text-center pt-16 pb-8 relative z-10">
                                <div className="w-20 h-20 mx-auto bg-white/10 rounded-3xl flex items-center justify-center text-4xl mb-6 backdrop-blur-sm shadow-xl ring-1 ring-white/20">
                                    🎓
                                </div>
                                <CardTitle className="text-3xl md:text-5xl font-black">{t('youth_page.sim.title')}</CardTitle>
                                <CardDescription className="text-indigo-200 text-lg max-w-xl mx-auto mt-4">
                                    {t('youth_page.sim.desc')}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="text-center pb-16 relative z-10">
                                <div className="flex flex-wrap gap-4 justify-center text-sm font-medium text-indigo-200 mb-8 opacity-80">
                                    <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10">{t('youth_page.sim.tags.duration')}</span>
                                    <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10">{t('youth_page.sim.tags.skill')}</span>
                                    <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10">{t('youth_page.sim.tags.result')}</span>
                                </div>

                                <Button
                                    size="lg"
                                    className="bg-white text-indigo-900 hover:bg-slate-100 font-bold px-8 py-6 text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                                    onClick={() => window.location.href = '/simulaatio/nuoret'}
                                >
                                    {t('youth_page.sim.btn')} <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* 5. RECOVERY (Toipuminen) */}
                    <TabsContent value="recovery" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">{t('youth_page.recovery.title')}</CardTitle>
                                <CardDescription>
                                    {t('youth_page.recovery.desc')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-indigo-900">{t('youth_page.recovery.p1_title')}</h4>
                                        <p className="text-slate-600 text-sm">{t('youth_page.recovery.p1_text')}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-indigo-900">{t('youth_page.recovery.p2_title')}</h4>
                                        <p className="text-slate-600 text-sm">{t('youth_page.recovery.p2_text')}</p>
                                    </div>
                                </div>

                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Brain className="w-5 h-5 text-indigo-500" /> {t('youth_page.recovery.ex_title')}</h3>
                                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                                        <div className="p-4 bg-white rounded border border-slate-200">
                                            <div className="text-xs uppercase font-bold text-slate-400 mb-1">{t('youth_page.recovery.fact_label')}</div>
                                            <div>{t('youth_page.recovery.fact_val')}</div>
                                        </div>
                                        <div className="p-4 bg-white rounded border border-rose-100 ring-2 ring-rose-50">
                                            <div className="text-xs uppercase font-bold text-rose-400 mb-1">{t('youth_page.recovery.interp_label')}</div>
                                            <div>{t('youth_page.recovery.interp_val')}</div>
                                        </div>
                                    </div>
                                    <p className="text-slate-500 text-sm mt-4 italic">{t('youth_page.recovery.note')}</p>
                                </div>

                                <div className="p-4 bg-indigo-50 text-indigo-900 rounded-xl border border-indigo-100 font-medium text-center">
                                    {t('youth_page.recovery.final_quote')}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* COMPLETION SECTION */}
                <div className="mt-16 pt-8 border-t border-slate-200">
                    <Card className={cn(
                        "transition-all duration-500 rounded-3xl overflow-hidden border-2",
                        isCompleted
                            ? "bg-emerald-50 border-emerald-100 shadow-sm"
                            : "bg-white border-indigo-100 shadow-xl"
                    )}>
                        <CardContent className="p-8 md:p-12 text-center space-y-6">
                            <div className={cn(
                                "w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-4 transition-all duration-500",
                                isCompleted ? "bg-emerald-500 text-white rotate-12" : "bg-indigo-50 text-indigo-600"
                            )}>
                                {isCompleted ? <CheckCircle2 className="w-10 h-10" /> : <BookOpen className="w-10 h-10" />}
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">
                                    {isCompleted ? t('youth_page.completion.title_done') : t('youth_page.completion.title_new')}
                                </h3>
                                <p className="text-slate-600 max-w-sm mx-auto font-medium">
                                    {isCompleted
                                        ? t('youth_page.completion.text_done')
                                        : t('youth_page.completion.text_new')}
                                </p>
                            </div>

                            {!isCompleted ? (
                                <Button
                                    onClick={handleComplete}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest px-10 py-6 rounded-2xl shadow-lg hover:shadow-indigo-500/25 transition-all"
                                >
                                    {t('youth_page.completion.btn_mark')}
                                </Button>
                            ) : (
                                <Link href="/profiili">
                                    <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-100 font-bold px-10 py-6 rounded-2xl">
                                        {t('youth_page.completion.btn_back')}
                                    </Button>
                                </Link>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
