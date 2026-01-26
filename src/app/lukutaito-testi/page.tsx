"use client";

import { useEffect } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import {
    CheckCircle2, Activity,
    AlertTriangle, ShieldCheck, ClipboardCheck,
    Thermometer, Heart, AlertCircle, Check
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

// Imported Components
import { TeamChecklist } from "@/components/lukutaito/TeamChecklist";
import { LiteracyTest } from "@/components/lukutaito/LiteracyTest";
import { SelfAssessment } from "@/components/lukutaito/SelfAssessment";

export default function WorkplaceStatusPage() {
    const { t, loadNamespace } = useLanguage();

    useEffect(() => {
        loadNamespace('lukutaito');
    }, [loadNamespace]);

    return (
        <div className="container mx-auto px-6 sm:px-8 max-w-screen-lg py-32 space-y-12">

            {/* Header Section */}
            <header className="space-y-6 border-b border-suojasiipi-secondary pb-8 text-center md:text-left">
                <span className="text-[11px] font-mono text-suojasiipi-primary uppercase tracking-widest border border-suojasiipi-primary px-3 py-1 rounded-sm inline-block">
                    {t('lukutaito.header.badge')}
                </span>
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-suojasiipi-text-main">
                        {t('lukutaito.header.title')}
                    </h1>
                    <p className="text-lg text-suojasiipi-text-body max-w-2xl leading-relaxed md:ml-0 mx-auto">
                        {t('lukutaito.header.description')}
                    </p>
                </div>
            </header>

            <Tabs defaultValue="warnings" className="w-full space-y-8">
                <TabsList className="flex flex-wrap md:flex-nowrap w-full bg-white border border-suojasiipi-secondary p-1 h-auto rounded-sm gap-1">
                    <TabsTrigger value="team_check" className="flex-1 py-3 text-xs md:text-sm uppercase font-bold tracking-wider data-[state=active]:bg-suojasiipi-bg data-[state=active]:text-suojasiipi-primary data-[state=active]:shadow-none rounded-sm bg-transparent text-suojasiipi-text-body">
                        <CheckCircle2 className="w-4 h-4 mr-2 hidden sm:inline" /> {t('lukutaito.tabs.team_check')}
                    </TabsTrigger>
                    <TabsTrigger value="thermometer" className="flex-1 py-3 text-xs md:text-sm uppercase font-bold tracking-wider data-[state=active]:bg-suojasiipi-bg data-[state=active]:text-suojasiipi-primary data-[state=active]:shadow-none rounded-sm bg-transparent text-suojasiipi-text-body">
                        <Activity className="w-4 h-4 mr-2 hidden sm:inline" /> {t('lukutaito.tabs.thermometer')}
                    </TabsTrigger>
                    <TabsTrigger value="quicktest" className="flex-1 py-3 text-xs md:text-sm uppercase font-bold tracking-wider data-[state=active]:bg-suojasiipi-bg data-[state=active]:text-suojasiipi-primary data-[state=active]:shadow-none rounded-sm bg-transparent text-suojasiipi-text-body">
                        <ClipboardCheck className="w-4 h-4 mr-2 hidden sm:inline" /> {t('lukutaito.tabs.quicktest')}
                    </TabsTrigger>
                    <TabsTrigger value="warnings" className="flex-1 py-3 text-xs md:text-sm uppercase font-bold tracking-wider data-[state=active]:bg-suojasiipi-bg data-[state=active]:text-suojasiipi-primary data-[state=active]:shadow-none rounded-sm bg-transparent text-suojasiipi-text-body">
                        <AlertTriangle className="w-4 h-4 mr-2 hidden sm:inline" /> {t('lukutaito.tabs.warnings')}
                    </TabsTrigger>
                    <TabsTrigger value="self" className="flex-1 py-3 text-xs md:text-sm uppercase font-bold tracking-wider data-[state=active]:bg-suojasiipi-bg data-[state=active]:text-suojasiipi-primary data-[state=active]:shadow-none rounded-sm bg-transparent text-suojasiipi-text-body">
                        <ShieldCheck className="w-4 h-4 mr-2 hidden sm:inline" /> {t('lukutaito.tabs.self')}
                    </TabsTrigger>
                </TabsList>

                {/* --- TEAM CHECKLIST TAB --- */}
                <TabsContent value="team_check" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <TeamChecklist />
                </TabsContent>

                {/* --- THERMOMETER TAB --- */}
                <TabsContent value="thermometer" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white border border-suojasiipi-secondary p-8 md:p-12 rounded-sm shadow-sm space-y-8">
                        <div className="flex items-center gap-3 border-b border-[#FAFAFA] pb-4">
                            <Thermometer className="w-6 h-6 text-suojasiipi-primary" />
                            <h2 className="text-xl font-serif font-bold text-suojasiipi-text-main">{t('lukutaito.thermometer.title')}</h2>
                        </div>
                        <div className="grid gap-4 max-w-3xl mx-auto">
                            {/* Level 1: Excellent */}
                            <div className="relative group cursor-default">
                                <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-px h-6 bg-[#E8DDD0] z-0 group-last:hidden" />
                                <div className="relative z-10 bg-emerald-50/50 border border-emerald-100 p-6 rounded-sm text-center hover:bg-emerald-50 transition-colors">
                                    <h3 className="text-emerald-900 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                                        <Heart className="w-4 h-4 fill-emerald-500 text-emerald-500" /> {t('lukutaito.thermometer.levels.excellent.title')}
                                    </h3>
                                    <p className="text-emerald-800/80 text-sm mt-2 font-serif group-hover:block hidden animate-in fade-in">
                                        {t('lukutaito.thermometer.levels.excellent.desc')}
                                    </p>
                                </div>
                            </div>
                            {/* Level 2: Healthy */}
                            <div className="relative group cursor-default">
                                <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-px h-6 bg-suojasiipi-secondary z-0" />
                                <div className="relative z-10 bg-suojasiipi-bg border border-suojasiipi-secondary p-6 rounded-sm text-center hover:border-emerald-200 hover:bg-white transition-colors">
                                    <h3 className="text-suojasiipi-text-main font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t('lukutaito.thermometer.levels.healthy.title')}
                                    </h3>
                                    <p className="text-suojasiipi-text-body text-sm mt-2 font-serif group-hover:block hidden animate-in fade-in">
                                        {t('lukutaito.thermometer.levels.healthy.desc')}
                                    </p>
                                </div>
                            </div>
                            {/* Level 3: Concern */}
                            <div className="relative group cursor-default">
                                <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-px h-6 bg-suojasiipi-secondary z-0" />
                                <div className="relative z-10 bg-suojasiipi-bg border border-suojasiipi-secondary p-6 rounded-sm text-center hover:border-amber-200 hover:bg-amber-50/10 transition-colors">
                                    <h3 className="text-suojasiipi-text-main font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-amber-400" /> {t('lukutaito.thermometer.levels.concern.title')}
                                    </h3>
                                    <p className="text-suojasiipi-text-body text-sm mt-2 font-serif group-hover:block hidden animate-in fade-in">
                                        {t('lukutaito.thermometer.levels.concern.desc')}
                                    </p>
                                </div>
                            </div>
                            {/* Level 4: Warning */}
                            <div className="relative z-10 bg-suojasiipi-bg border border-suojasiipi-secondary p-6 rounded-sm text-center hover:border-red-200 hover:bg-red-50/10 transition-colors cursor-default group">
                                <h3 className="text-suojasiipi-text-main font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" /> {t('lukutaito.thermometer.levels.warning.title')}
                                </h3>
                                <p className="text-suojasiipi-text-body text-sm mt-2 font-serif group-hover:block hidden animate-in fade-in">
                                    {t('lukutaito.thermometer.levels.warning.desc')}
                                </p>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* --- QUICK TEST TAB --- */}
                <TabsContent value="quicktest" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <LiteracyTest />
                </TabsContent>

                {/* --- WARNING SIGNS TAB (REFACTORED WITH DETAILED LEVELS) --- */}
                <TabsContent value="warnings" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-4">
                        <Accordion type="single" collapsible className="w-full space-y-4">

                            {/* 1. KELTAINEN */}
                            <AccordionItem value="yellow" className="bg-white border-l-4 border-l-yellow-400 border border-suojasiipi-secondary rounded-sm px-4">
                                <AccordionTrigger className="hover:no-underline py-6">
                                    <div className="flex items-start gap-4 text-left">
                                        <div className="mt-1 bg-yellow-100 p-2 rounded-full">
                                            <AlertCircle className="w-5 h-5 text-yellow-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-suojasiipi-text-main">{t('lukutaito.warning_signs.yellow.title')}</h3>
                                            <p className="text-sm text-suojasiipi-text-body">{t('lukutaito.warning_signs.yellow.subtitle')}</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-8 pl-16 grid gap-8">
                                    <p className="text-suojasiipi-text-body italic">
                                        {t('lukutaito.warning_signs.yellow.description')}
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="bg-suojasiipi-bg p-6 rounded-sm border border-suojasiipi-secondary">
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-suojasiipi-text-main">{t('lukutaito.warning_signs.yellow.power_signs_title')}</h4>
                                            <ul className="space-y-2 text-sm text-suojasiipi-text-body">
                                                {((t('lukutaito.warning_signs.yellow.power_signs_list', { returnObjects: true }) as string[]) || []).map((item, i) => (
                                                    <li key={i}>• {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-suojasiipi-bg p-6 rounded-sm border border-suojasiipi-secondary">
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-suojasiipi-text-main">{t('lukutaito.warning_signs.yellow.atmosphere_signs_title')}</h4>
                                            <ul className="space-y-2 text-sm text-suojasiipi-text-body">
                                                {((t('lukutaito.warning_signs.yellow.atmosphere_signs_list', { returnObjects: true }) as string[]) || []).map((item, i) => (
                                                    <li key={i}>• {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="border border-yellow-200 bg-yellow-50 p-6 rounded-sm">
                                        <div className="flex items-center gap-2 font-bold text-yellow-800 uppercase tracking-widest text-xs mb-2">
                                            <ShieldCheck className="w-4 h-4" /> {t('lukutaito.warning_signs.yellow.check_yourself.label')}
                                        </div>
                                        <p className="font-serif text-lg text-yellow-900 border-l-4 border-yellow-300 pl-4 py-1">
                                            {t('lukutaito.warning_signs.yellow.check_yourself.text')}
                                        </p>
                                    </div>

                                    <div className="bg-[#F6F8FF] border border-suojasiipi-primary/20 p-6 rounded-sm">
                                        <h4 className="font-bold text-suojasiipi-primary flex items-center gap-2 mb-4">
                                            <CheckCircle2 className="w-4 h-4" /> {t('lukutaito.warning_signs.yellow.what_to_do.title')}
                                        </h4>
                                        <ol className="list-decimal list-inside space-y-2 text-sm text-suojasiipi-text-body">
                                            {((t('lukutaito.warning_signs.yellow.what_to_do.steps', { returnObjects: true }) as string[]) || []).map((item, i) => (
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
                                            <h3 className="text-lg font-bold text-[#2B2B2B]">{t('lukutaito.warning_signs.orange.title')}</h3>
                                            <p className="text-sm text-[#4A4A4A]">{t('lukutaito.warning_signs.orange.subtitle')}</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-8 pl-16 grid gap-8">
                                    <p className="text-[#4A4A4A] italic">
                                        {t('lukutaito.warning_signs.orange.description')}
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="bg-[#FDFBF7] p-6 rounded-sm border border-[#E8DDD0]">
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#2B2B2B]">{t('lukutaito.warning_signs.orange.power_abuse_title')}</h4>
                                            <ul className="space-y-2 text-sm text-[#4A4A4A]">
                                                {((t('lukutaito.warning_signs.orange.power_abuse_list', { returnObjects: true }) as string[]) || []).map((item, i) => (
                                                    <li key={i}>• {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-[#FDFBF7] p-6 rounded-sm border border-[#E8DDD0]">
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#2B2B2B]">{t('lukutaito.warning_signs.orange.doc_criteria_title')}</h4>
                                            <ul className="space-y-2 text-sm text-[#4A4A4A]">
                                                {((t('lukutaito.warning_signs.orange.doc_criteria_list', { returnObjects: true }) as string[]) || []).map((item, i) => (
                                                    <li key={i} className="flex items-center gap-2"><div className="w-2 h-2 bg-orange-400 rounded-full" /> {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="border border-orange-200 bg-orange-50 p-6 rounded-sm">
                                        <div className="flex items-center gap-2 font-bold text-orange-800 uppercase tracking-widest text-xs mb-2">
                                            <ShieldCheck className="w-4 h-4" /> {t('lukutaito.warning_signs.orange.check_yourself.label')}
                                        </div>
                                        <p className="font-serif text-lg text-orange-900 border-l-4 border-orange-300 pl-4 py-1">
                                            {t('lukutaito.warning_signs.orange.check_yourself.text')}
                                        </p>
                                    </div>

                                    <div className="bg-[#F6F8FF] border border-[#5B4B8A]/20 p-6 rounded-sm">
                                        <h4 className="font-bold text-[#5B4B8A] flex items-center gap-2 mb-4">
                                            <CheckCircle2 className="w-4 h-4" /> {t('lukutaito.warning_signs.orange.what_to_do.title')}
                                        </h4>
                                        <ol className="list-decimal list-inside space-y-2 text-sm text-[#4A4A4A]">
                                            {((t('lukutaito.warning_signs.orange.what_to_do.steps', { returnObjects: true }) as string[]) || []).map((item, i) => (
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
                                            <h3 className="text-lg font-bold text-[#2B2B2B]">{t('lukutaito.warning_signs.red.title')}</h3>
                                            <p className="text-sm text-[#4A4A4A]">{t('lukutaito.warning_signs.red.subtitle')}</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-8 pl-16 grid gap-8">
                                    <p className="text-[#4A4A4A] italic">
                                        {t('lukutaito.warning_signs.red.description')}
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="bg-[#FDFBF7] p-6 rounded-sm border border-[#E8DDD0]">
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#2B2B2B]">{t('lukutaito.warning_signs.red.fear_title')}</h4>
                                            <ul className="space-y-2 text-sm text-[#4A4A4A]">
                                                {((t('lukutaito.warning_signs.red.fear_list', { returnObjects: true }) as string[]) || []).map((item, i) => (
                                                    <li key={i}>• {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-[#FDFBF7] p-6 rounded-sm border border-[#E8DDD0]">
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#2B2B2B]">{t('lukutaito.warning_signs.red.physical_signs_title')}</h4>
                                            <ul className="space-y-2 text-sm text-[#4A4A4A]">
                                                {((t('lukutaito.warning_signs.red.physical_signs_list', { returnObjects: true }) as string[]) || []).map((item, i) => (
                                                    <li key={i}>• {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="border border-red-200 bg-red-50 p-6 rounded-sm">
                                        <div className="flex items-center gap-2 font-bold text-red-800 uppercase tracking-widest text-xs mb-2">
                                            <ShieldCheck className="w-4 h-4" /> {t('lukutaito.warning_signs.red.check_yourself.label')}
                                        </div>
                                        <p className="font-serif text-lg text-red-900 border-l-4 border-red-300 pl-4 py-1">
                                            {t('lukutaito.warning_signs.red.check_yourself.text')}
                                        </p>
                                    </div>

                                    <div className="bg-[#F6F8FF] border border-[#5B4B8A]/20 p-6 rounded-sm">
                                        <h4 className="font-bold text-[#5B4B8A] flex items-center gap-2 mb-4">
                                            <CheckCircle2 className="w-4 h-4" /> {t('lukutaito.warning_signs.red.what_to_do.title')}
                                        </h4>
                                        <ol className="list-decimal list-inside space-y-2 text-sm text-[#4A4A4A]">
                                            {((t('lukutaito.warning_signs.red.what_to_do.steps', { returnObjects: true }) as string[]) || []).map((item, i) => (
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
                            <h3 className="text-xl font-serif font-bold text-[#2B2B2B] mb-6">{t('lukutaito.warning_signs.conflict_vs_bullying.title')}</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-[#E8DDD0]">
                                            <th className="text-left font-bold uppercase tracking-widest text-[10px] text-[#4A4A4A] py-3 text-left w-1/4">{t('lukutaito.warning_signs.conflict_vs_bullying.headers.situation')}</th>
                                            <th className="text-left font-bold uppercase tracking-widest text-[10px] text-emerald-700 py-3 w-1/3">
                                                <div className="flex items-center gap-2"><Check className="w-3 h-3" /> {t('lukutaito.warning_signs.conflict_vs_bullying.headers.healthy')}</div>
                                            </th>
                                            <th className="text-left font-bold uppercase tracking-widest text-[10px] text-amber-600 py-3">
                                                <div className="flex items-center gap-2"><AlertTriangle className="w-3 h-3" /> {t('lukutaito.warning_signs.conflict_vs_bullying.headers.warning')}</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-mono text-[#4A4A4A]">
                                        {((t('lukutaito.warning_signs.conflict_vs_bullying.rows', { returnObjects: true }) as any[]) || []).map((row, i) => (
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
                    <SelfAssessment />
                </TabsContent>
            </Tabs>
        </div>
    );
}
