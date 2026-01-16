"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useProgress } from "@/context/ProgressContext";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
    ArrowRight, CheckCircle2, ChevronRight, ChevronDown, Activity,
    AlertTriangle, ShieldCheck, ClipboardCheck, BarChart3,
    Thermometer, Heart, Check, X, AlertCircle, RefreshCcw, User, Users
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";


interface CriteriaCategory {
    title: string;
    items: string[];
}

interface LiteracyScenario {
    id: number;
    text: string;
    isBullying: boolean;
    explanation: string;
}

interface Question {
    id: string;
    text: string;
    category: string;
    type: 'slider' | 'single_choice';
    options?: string[];
}

export default function WorkplaceStatusPage() {
    const { t } = useLanguage();
    return (
        <div className="container mx-auto px-6 sm:px-8 max-w-screen-lg py-32 space-y-12">

            {/* Header Section */}
            <header className="space-y-6 border-b border-[#E8DDD0] pb-8 text-center md:text-left">
                <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border border-[#5B4B8A] px-3 py-1 rounded-sm inline-block">
                    {t('lukutaito_page.header.badge')}
                </span>
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2B2B2B]">
                        {t('lukutaito_page.header.title')}
                    </h1>
                    <p className="text-lg text-[#4A4A4A] max-w-2xl leading-relaxed md:ml-0 mx-auto">
                        {t('lukutaito_page.header.description')}
                    </p>
                </div>
            </header>

            <Tabs defaultValue="warnings" className="w-full space-y-8">
                <TabsList className="flex flex-wrap md:flex-nowrap w-full bg-white border border-[#E8DDD0] p-1 h-auto rounded-sm gap-1">
                    <TabsTrigger value="team_check" className="flex-1 py-3 text-xs md:text-sm uppercase font-bold tracking-wider data-[state=active]:bg-[#FDFBF7] data-[state=active]:text-[#5B4B8A] data-[state=active]:shadow-none rounded-sm bg-transparent text-[#4A4A4A]">
                        <CheckCircle2 className="w-4 h-4 mr-2 hidden sm:inline" /> {t('lukutaito_page.tabs.team_check')}
                    </TabsTrigger>
                    <TabsTrigger value="thermometer" className="flex-1 py-3 text-xs md:text-sm uppercase font-bold tracking-wider data-[state=active]:bg-[#FDFBF7] data-[state=active]:text-[#5B4B8A] data-[state=active]:shadow-none rounded-sm bg-transparent text-[#4A4A4A]">
                        <Activity className="w-4 h-4 mr-2 hidden sm:inline" /> {t('lukutaito_page.tabs.thermometer')}
                    </TabsTrigger>
                    <TabsTrigger value="quicktest" className="flex-1 py-3 text-xs md:text-sm uppercase font-bold tracking-wider data-[state=active]:bg-[#FDFBF7] data-[state=active]:text-[#5B4B8A] data-[state=active]:shadow-none rounded-sm bg-transparent text-[#4A4A4A]">
                        <ClipboardCheck className="w-4 h-4 mr-2 hidden sm:inline" /> {t('lukutaito_page.tabs.quicktest')}
                    </TabsTrigger>
                    <TabsTrigger value="warnings" className="flex-1 py-3 text-xs md:text-sm uppercase font-bold tracking-wider data-[state=active]:bg-[#FDFBF7] data-[state=active]:text-[#5B4B8A] data-[state=active]:shadow-none rounded-sm bg-transparent text-[#4A4A4A]">
                        <AlertTriangle className="w-4 h-4 mr-2 hidden sm:inline" /> {t('lukutaito_page.tabs.warnings')}
                    </TabsTrigger>
                    <TabsTrigger value="self" className="flex-1 py-3 text-xs md:text-sm uppercase font-bold tracking-wider data-[state=active]:bg-[#FDFBF7] data-[state=active]:text-[#5B4B8A] data-[state=active]:shadow-none rounded-sm bg-transparent text-[#4A4A4A]">
                        <ShieldCheck className="w-4 h-4 mr-2 hidden sm:inline" /> {t('lukutaito_page.tabs.self')}
                    </TabsTrigger>
                </TabsList>

                {/* --- TEAM CHECKLIST TAB --- */}
                <TabsContent value="team_check" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <TeamChecklistComponent />
                </TabsContent>

                {/* --- THERMOMETER TAB --- */}
                <TabsContent value="thermometer" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white border border-[#E8DDD0] p-8 md:p-12 rounded-sm shadow-sm space-y-8">
                        <div className="flex items-center gap-3 border-b border-[#FAFAFA] pb-4">
                            <Thermometer className="w-6 h-6 text-[#5B4B8A]" />
                            <h2 className="text-xl font-serif font-bold text-[#2B2B2B]">{t('lukutaito_page.thermometer.title')}</h2>
                        </div>
                        <div className="grid gap-4 max-w-3xl mx-auto">
                            {/* Level 1: Excellent */}
                            <div className="relative group cursor-default">
                                <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-px h-6 bg-[#E8DDD0] z-0 group-last:hidden" />
                                <div className="relative z-10 bg-emerald-50/50 border border-emerald-100 p-6 rounded-sm text-center hover:bg-emerald-50 transition-colors">
                                    <h3 className="text-emerald-900 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                                        <Heart className="w-4 h-4 fill-emerald-500 text-emerald-500" /> {t('lukutaito_page.thermometer.levels.excellent.title')}
                                    </h3>
                                    <p className="text-emerald-800/80 text-sm mt-2 font-serif group-hover:block hidden animate-in fade-in">
                                        {t('lukutaito_page.thermometer.levels.excellent.desc')}
                                    </p>
                                </div>
                            </div>
                            {/* Level 2: Healthy */}
                            <div className="relative group cursor-default">
                                <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-px h-6 bg-[#E8DDD0] z-0" />
                                <div className="relative z-10 bg-[#FDFBF7] border border-[#E8DDD0] p-6 rounded-sm text-center hover:border-emerald-200 hover:bg-white transition-colors">
                                    <h3 className="text-[#2B2B2B] font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t('lukutaito_page.thermometer.levels.healthy.title')}
                                    </h3>
                                    <p className="text-[#4A4A4A] text-sm mt-2 font-serif group-hover:block hidden animate-in fade-in">
                                        {t('lukutaito_page.thermometer.levels.healthy.desc')}
                                    </p>
                                </div>
                            </div>
                            {/* Level 3: Concern */}
                            <div className="relative group cursor-default">
                                <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-px h-6 bg-[#E8DDD0] z-0" />
                                <div className="relative z-10 bg-[#FDFBF7] border border-[#E8DDD0] p-6 rounded-sm text-center hover:border-amber-200 hover:bg-amber-50/10 transition-colors">
                                    <h3 className="text-[#2B2B2B] font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-amber-400" /> {t('lukutaito_page.thermometer.levels.concern.title')}
                                    </h3>
                                    <p className="text-[#4A4A4A] text-sm mt-2 font-serif group-hover:block hidden animate-in fade-in">
                                        {t('lukutaito_page.thermometer.levels.concern.desc')}
                                    </p>
                                </div>
                            </div>
                            {/* Level 4: Warning */}
                            <div className="relative z-10 bg-[#FDFBF7] border border-[#E8DDD0] p-6 rounded-sm text-center hover:border-red-200 hover:bg-red-50/10 transition-colors cursor-default group">
                                <h3 className="text-[#2B2B2B] font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" /> {t('lukutaito_page.thermometer.levels.warning.title')}
                                </h3>
                                <p className="text-[#4A4A4A] text-sm mt-2 font-serif group-hover:block hidden animate-in fade-in">
                                    {t('lukutaito_page.thermometer.levels.warning.desc')}
                                </p>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* --- QUICK TEST TAB --- */}
                <TabsContent value="quicktest" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <LiteracyTestComponent />
                </TabsContent>

                {/* --- WARNING SIGNS TAB (REFACTORED WITH DETAILED LEVELS) --- */}
                <TabsContent value="warnings" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-4">
                        <Accordion type="single" collapsible className="w-full space-y-4">

                            {/* 1. KELTAINEN */}
                            <AccordionItem value="yellow" className="bg-white border-l-4 border-l-yellow-400 border border-[#E8DDD0] rounded-sm px-4">
                                <AccordionTrigger className="hover:no-underline py-6">
                                    <div className="flex items-start gap-4 text-left">
                                        <div className="mt-1 bg-yellow-100 p-2 rounded-full">
                                            <AlertCircle className="w-5 h-5 text-yellow-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-[#2B2B2B]">{t('lukutaito_page.warning_signs.yellow.title')}</h3>
                                            <p className="text-sm text-[#4A4A4A]">{t('lukutaito_page.warning_signs.yellow.subtitle')}</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-8 pl-16 grid gap-8">
                                    <p className="text-[#4A4A4A] italic">
                                        {t('lukutaito_page.warning_signs.yellow.description')}
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="bg-[#FDFBF7] p-6 rounded-sm border border-[#E8DDD0]">
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#2B2B2B]">{t('lukutaito_page.warning_signs.yellow.power_signs_title')}</h4>
                                            <ul className="space-y-2 text-sm text-[#4A4A4A]">
                                                {((t('lukutaito_page.warning_signs.yellow.power_signs_list', { returnObjects: true }) as string[]) || []).map((item, i) => (
                                                    <li key={i}>â€¢ {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-[#FDFBF7] p-6 rounded-sm border border-[#E8DDD0]">
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#2B2B2B]">{t('lukutaito_page.warning_signs.yellow.atmosphere_signs_title')}</h4>
                                            <ul className="space-y-2 text-sm text-[#4A4A4A]">
                                                {((t('lukutaito_page.warning_signs.yellow.atmosphere_signs_list', { returnObjects: true }) as string[]) || []).map((item, i) => (
                                                    <li key={i}>â€¢ {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="border border-yellow-200 bg-yellow-50 p-6 rounded-sm">
                                        <div className="flex items-center gap-2 font-bold text-yellow-800 uppercase tracking-widest text-xs mb-2">
                                            <ShieldCheck className="w-4 h-4" /> {t('lukutaito_page.warning_signs.yellow.check_yourself.label')}
                                        </div>
                                        <p className="font-serif text-lg text-yellow-900 border-l-4 border-yellow-300 pl-4 py-1">
                                            {t('lukutaito_page.warning_signs.yellow.check_yourself.text')}
                                        </p>
                                    </div>

                                    <div className="bg-[#F6F8FF] border border-[#5B4B8A]/20 p-6 rounded-sm">
                                        <h4 className="font-bold text-[#5B4B8A] flex items-center gap-2 mb-4">
                                            <CheckCircle2 className="w-4 h-4" /> {t('lukutaito_page.warning_signs.yellow.what_to_do.title')}
                                        </h4>
                                        <ol className="list-decimal list-inside space-y-2 text-sm text-[#4A4A4A]">
                                            {((t('lukutaito_page.warning_signs.yellow.what_to_do.steps', { returnObjects: true }) as string[]) || []).map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ol>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* 2. ORANSSI */}
                            <AccordionItem value="orange" className="bg-white border-l-4 border-l-orange-500 border border-[#E8DDD0] rounded-sm px-4">
                                <AccordionTrigger className="hover:no-underline py-6">
                                    <div className="flex items-start gap-4 text-left">
                                        <div className="mt-1 bg-orange-100 p-2 rounded-full">
                                            <AlertTriangle className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-[#2B2B2B]">{t('lukutaito_page.warning_signs.orange.title')}</h3>
                                            <p className="text-sm text-[#4A4A4A]">{t('lukutaito_page.warning_signs.orange.subtitle')}</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-8 pl-16 grid gap-8">
                                    <p className="text-[#4A4A4A] italic">
                                        {t('lukutaito_page.warning_signs.orange.description')}
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="bg-[#FDFBF7] p-6 rounded-sm border border-[#E8DDD0]">
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#2B2B2B]">{t('lukutaito_page.warning_signs.orange.power_abuse_title')}</h4>
                                            <ul className="space-y-2 text-sm text-[#4A4A4A]">
                                                {((t('lukutaito_page.warning_signs.orange.power_abuse_list', { returnObjects: true }) as string[]) || []).map((item, i) => (
                                                    <li key={i}>â€¢ {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-[#FDFBF7] p-6 rounded-sm border border-[#E8DDD0]">
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#2B2B2B]">{t('lukutaito_page.warning_signs.orange.doc_criteria_title')}</h4>
                                            <ul className="space-y-2 text-sm text-[#4A4A4A]">
                                                {((t('lukutaito_page.warning_signs.orange.doc_criteria_list', { returnObjects: true }) as string[]) || []).map((item, i) => (
                                                    <li className="flex items-center gap-2"><div className="w-2 h-2 bg-orange-400 rounded-full" /> {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="border border-orange-200 bg-orange-50 p-6 rounded-sm">
                                        <div className="flex items-center gap-2 font-bold text-orange-800 uppercase tracking-widest text-xs mb-2">
                                            <ShieldCheck className="w-4 h-4" /> {t('lukutaito_page.warning_signs.orange.check_yourself.label')}
                                        </div>
                                        <p className="font-serif text-lg text-orange-900 border-l-4 border-orange-300 pl-4 py-1">
                                            {t('lukutaito_page.warning_signs.orange.check_yourself.text')}
                                        </p>
                                    </div>

                                    <div className="bg-[#F6F8FF] border border-[#5B4B8A]/20 p-6 rounded-sm">
                                        <h4 className="font-bold text-[#5B4B8A] flex items-center gap-2 mb-4">
                                            <CheckCircle2 className="w-4 h-4" /> {t('lukutaito_page.warning_signs.orange.what_to_do.title')}
                                        </h4>
                                        <ol className="list-decimal list-inside space-y-2 text-sm text-[#4A4A4A]">
                                            {((t('lukutaito_page.warning_signs.orange.what_to_do.steps', { returnObjects: true }) as string[]) || []).map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ol>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* 3. PUNAINEN */}
                            <AccordionItem value="red" className="bg-white border-l-4 border-l-red-600 border border-[#E8DDD0] rounded-sm px-4">
                                <AccordionTrigger className="hover:no-underline py-6">
                                    <div className="flex items-start gap-4 text-left">
                                        <div className="mt-1 bg-red-100 p-2 rounded-full">
                                            <AlertTriangle className="w-5 h-5 text-red-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-[#2B2B2B]">{t('lukutaito_page.warning_signs.red.title')}</h3>
                                            <p className="text-sm text-[#4A4A4A]">{t('lukutaito_page.warning_signs.red.subtitle')}</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-8 pl-16 grid gap-8">
                                    <p className="text-[#4A4A4A] italic">
                                        {t('lukutaito_page.warning_signs.red.description')}
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="bg-[#FDFBF7] p-6 rounded-sm border border-[#E8DDD0]">
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#2B2B2B]">{t('lukutaito_page.warning_signs.red.fear_title')}</h4>
                                            <ul className="space-y-2 text-sm text-[#4A4A4A]">
                                                {((t('lukutaito_page.warning_signs.red.fear_list', { returnObjects: true }) as string[]) || []).map((item, i) => (
                                                    <li key={i}>â€¢ {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-[#FDFBF7] p-6 rounded-sm border border-[#E8DDD0]">
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#2B2B2B]">{t('lukutaito_page.warning_signs.red.physical_signs_title')}</h4>
                                            <ul className="space-y-2 text-sm text-[#4A4A4A]">
                                                {((t('lukutaito_page.warning_signs.red.physical_signs_list', { returnObjects: true }) as string[]) || []).map((item, i) => (
                                                    <li key={i}>â€¢ {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="border border-red-200 bg-red-50 p-6 rounded-sm">
                                        <div className="flex items-center gap-2 font-bold text-red-800 uppercase tracking-widest text-xs mb-2">
                                            <ShieldCheck className="w-4 h-4" /> {t('lukutaito_page.warning_signs.red.check_yourself.label')}
                                        </div>
                                        <p className="font-serif text-lg text-red-900 border-l-4 border-red-300 pl-4 py-1">
                                            {t('lukutaito_page.warning_signs.red.check_yourself.text')}
                                        </p>
                                    </div>

                                    <div className="bg-[#F6F8FF] border border-[#5B4B8A]/20 p-6 rounded-sm">
                                        <h4 className="font-bold text-[#5B4B8A] flex items-center gap-2 mb-4">
                                            <CheckCircle2 className="w-4 h-4" /> {t('lukutaito_page.warning_signs.red.what_to_do.title')}
                                        </h4>
                                        <ol className="list-decimal list-inside space-y-2 text-sm text-[#4A4A4A]">
                                            {((t('lukutaito_page.warning_signs.red.what_to_do.steps', { returnObjects: true }) as string[]) || []).map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ol>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* NEW: Conflict vs Bullying Table */}
                    <Card className="border-[#E8DDD0] bg-white rounded-sm shadow-sm mt-8">
                        <CardContent className="p-8">
                            <h3 className="text-xl font-serif font-bold text-[#2B2B2B] mb-6">{t('lukutaito_page.warning_signs.conflict_vs_bullying.title')}</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-[#E8DDD0]">
                                            <th className="text-left font-bold uppercase tracking-widest text-[10px] text-[#4A4A4A] py-3 text-left w-1/4">{t('lukutaito_page.warning_signs.conflict_vs_bullying.headers.situation')}</th>
                                            <th className="text-left font-bold uppercase tracking-widest text-[10px] text-emerald-700 py-3 w-1/3">
                                                <div className="flex items-center gap-2"><Check className="w-3 h-3" /> {t('lukutaito_page.warning_signs.conflict_vs_bullying.headers.healthy')}</div>
                                            </th>
                                            <th className="text-left font-bold uppercase tracking-widest text-[10px] text-amber-600 py-3">
                                                <div className="flex items-center gap-2"><AlertTriangle className="w-3 h-3" /> {t('lukutaito_page.warning_signs.conflict_vs_bullying.headers.warning')}</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-mono text-[#4A4A4A]">
                                        {((t('lukutaito_page.warning_signs.conflict_vs_bullying.rows', { returnObjects: true }) as any[]) || []).map((row, i) => (
                                            <tr key={i} className="border-b border-[#FAFAFA] hover:bg-[#FDFBF7]">
                                                <td className="py-4 font-bold">{row.situation}</td>
                                                <td className="py-4 pr-4">{row.healthy}</td>
                                                <td className="py-4">{row.warning}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* --- SELF ASSESSMENT TAB --- */}
                <TabsContent value="self" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <SelfAssessmentComponent />
                </TabsContent>
            </Tabs>
        </div>
    );
}


function TeamChecklistComponent() {
    const { t } = useLanguage();
    const criteria = t('lukutaito_page.team_checklist.criteria', { returnObjects: true }) as Record<string, CriteriaCategory>;
    const [checked, setChecked] = useState<Record<string, boolean>>({});

    const toggle = (section: string, index: number) => {
        const key = `${section}-${index}`;
        setChecked(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const totalChecked = Object.values(checked).filter(Boolean).length;
    const isCrisis = totalChecked < 15;

    return (
        <div className="space-y-8">
            <div className="bg-white border border-[#E8DDD0] p-8 rounded-sm shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 sticky top-4 z-20">
                <div className="space-y-2 text-center md:text-left">
                    <h2 className="text-2xl font-serif font-bold text-[#2B2B2B]">{t('lukutaito_page.team_checklist.title')}</h2>
                    <p className="text-[#4A4A4A]">{t('lukutaito_page.team_checklist.subtitle')}</p>
                </div>

                <div className={cn(
                    "px-8 py-4 rounded-sm border-2 flex items-center gap-6 transition-colors",
                    isCrisis ? "bg-red-50 border-red-100 text-red-900" : "bg-emerald-50 border-emerald-100 text-emerald-900"
                )}>
                    <div className="text-center">
                        <div className="text-3xl font-black">{totalChecked}</div>
                        <div className="text-[9px] uppercase font-bold tracking-widest opacity-70">{t('lukutaito_page.team_checklist.badges.checks')}</div>
                    </div>
                    <div className="h-10 w-px bg-current opacity-20" />
                    <div>
                        <div className="font-bold flex items-center gap-2 uppercase tracking-wide">
                            {isCrisis ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                            {isCrisis ? t('lukutaito_page.team_checklist.badges.crisis') : t('lukutaito_page.team_checklist.badges.healthy')}
                        </div>
                        <div className="text-xs opacity-90 max-w-[180px] leading-tight mt-1">
                            {isCrisis ? t('lukutaito_page.team_checklist.status.crisis_text') : t('lukutaito_page.team_checklist.status.healthy_text')}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(criteria).map(([key, category]) => {
                    const sectionCheckedCount = category.items.filter((_, idx) => checked[`${key}-${idx}`]).length;

                    return (
                        <Card key={key} className="border-[#E8DDD0] bg-white rounded-sm shadow-sm">
                            <CardContent className="p-8 space-y-6">
                                <div className="flex justify-between items-baseline border-b border-[#FAFAFA] pb-4">
                                    <h3 className="font-bold font-serif text-lg text-[#2B2B2B]">{category.title}</h3>
                                    <Badge variant="secondary" className="bg-[#FDFBF7] text-[#4A4A4A] border border-[#E8DDD0] font-mono text-xs">
                                        {sectionCheckedCount} / {category.items.length}
                                    </Badge>
                                </div>
                                <div className="space-y-4">
                                    {category.items.map((item, index) => {
                                        const isChecked = checked[`${key}-${index}`];
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => toggle(key, index)}
                                                className="flex items-start gap-4 text-left w-full group"
                                            >
                                                <div className={cn(
                                                    "w-5 h-5 rounded-sm border mt-0.5 shrink-0 flex items-center justify-center transition-all",
                                                    isChecked ? "bg-[#5B4B8A] border-[#5B4B8A]" : "bg-white border-[#E8DDD0] group-hover:border-[#5B4B8A]"
                                                )}>
                                                    {isChecked && <Check className="w-3.5 h-3.5 text-white" />}
                                                </div>
                                                <span className={cn(
                                                    "text-sm transition-colors",
                                                    isChecked ? "text-[#2B2B2B] font-medium" : "text-[#4A4A4A] group-hover:text-[#2B2B2B]"
                                                )}>
                                                    {item}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}


function LiteracyTestComponent() {
    const { t } = useLanguage();
    const { completeModule } = useProgress();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [lastResult, setLastResult] = useState<{ isCorrect: boolean } | null>(null);
    const [isFinished, setIsFinished] = useState(false);

    const literacyScenarios = t('lukutaito_page.quicktest.scenarios', { returnObjects: true }) as LiteracyScenario[];
    const currentScenario = literacyScenarios[currentIndex];

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

// --- SELF ASSESSMENT COMPONENT (Updated with User Content) ---

type QuestionType = "slider" | "single_choice";

interface Question {
    id: string;
    text: string;
    category: string;
    type: QuestionType;
    options?: string[];
}



function SelfAssessmentComponent() {
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
                    {currentStep === sections.length - 1 ? t('lukutaito_page.self_assessment.results.show_results') || "NÃ¤ytÃ¤ tulokset" : t('lukutaito_page.self_assessment.results.next_section') || "Seuraava osio"} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}
