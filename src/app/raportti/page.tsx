"use client";

import { useState, useEffect } from "react";
import { TimelineEvent } from "@/types";
import { useSecureLocalStorage } from "@/hooks/useSecureLocalStorage";
import { VaultWrapper } from "@/components/VaultWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Printer, ArrowLeft, BrainCircuit, CalendarRange, Scale, AlertTriangle, FileCheck, Copy, Check, FileText, Lock, Sparkles, CreditCard, Loader2, Download, ShieldCheck, Mail, Info, ExternalLink } from "lucide-react";
import Link from "next/link";
import { analyzeEvents, generateSummaryChecklist } from "@/helpers/reportAnalysis";
import { templates, TemplateCategory, Template } from "@/data/templates";
import { generatePremiumReport, AIReportResult } from "@/actions/generateReport";
import { useLanguage } from "@/context/LanguageContext";

export default function DocumentsPage() {
    const { t, language } = useLanguage();
    const { data: events, isLocked, hasData, unlock } = useSecureLocalStorage<TimelineEvent[]>("suojasiipi_events_secure", []);
    const [mounted, setMounted] = useState(false);
    const [activeCategory, setActiveCategory] = useState<TemplateCategory | 'all'>('all');
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

    // Premium AI State
    const [aiStep, setAiStep] = useState<'intro' | 'payment' | 'processing' | 'result'>('intro');
    const [consentGiven, setConsentGiven] = useState(false);
    const [aiResult, setAiResult] = useState<AIReportResult | null>(null);

    // Stats
    const stats = mounted ? analyzeEvents(events) : null;
    const checklist = stats ? generateSummaryChecklist(stats) : [];

    useEffect(() => {
        setMounted(true);
    }, []);

    const handlePrint = () => {
        window.print();
    };

    const handleCopy = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error("Copy failed", err);
        }
    };

    const handleStartPremiumProcess = () => {
        setAiStep('payment');
    };

    const handleSimulatePayment = () => {
        // Find "processing" state
        setAiStep('processing');

        // Simulate API call
        setTimeout(async () => {
            // Basic anonymization (simulated)
            const anonymizedData = JSON.stringify(events.map(e => ({
                ...e,
                peopleInvolved: "Henkilö A",
                description: e.description?.replace(/Matti|Teppo|Maija/g, "[NIMI POISTETTU]")
            })));

            const result = await generatePremiumReport(anonymizedData);
            setAiResult(result);
            setAiStep('result');
        }, 3500);
    };


    const filteredTemplates = activeCategory === 'all'
        ? templates
        : templates.filter(t => t.category === activeCategory);

    const categories: { id: TemplateCategory | 'all', label: string }[] = [
        { id: 'all', label: t('report.page.templates_tab.categories.all') },
        { id: 'employer', label: t('report.page.templates_tab.categories.employer') },
        { id: 'health', label: t('report.page.templates_tab.categories.health') },
        { id: 'union', label: t('report.page.templates_tab.categories.union') },
        { id: 'legal', label: t('report.page.templates_tab.categories.legal') },
        { id: 'communication', label: t('report.page.templates_tab.categories.communication') },
    ];

    if (!mounted) return <div className="p-10 text-center animate-pulse">{t('report.page.loading')}</div>;

    return (
        <div className="w-full max-w-6xl mx-auto px-6">
            <VaultWrapper isLocked={isLocked} hasData={hasData} onUnlock={unlock}>
                <div className="space-y-8 pb-20 animate-in fade-in duration-500">
                    {/* Header (Hidden in Print) */}
                    <div className="print:hidden space-y-6">
                        <div className="flex items-center gap-4">
                            <Link href="/timeline">
                                <Button variant="ghost" className="pl-0 gap-2 text-slate-500 hover:text-slate-800">
                                    <ArrowLeft className="w-4 h-4" /> {t('report.page.back_to_timeline')}
                                </Button>
                            </Link>
                        </div>

                        <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row gap-6 justify-between items-center relative overflow-hidden">
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                            <div className="relative z-10 space-y-2">
                                <h1 className="text-3xl font-bold">{t('report.page.title')}</h1>
                                <p className="text-indigo-200 text-lg max-w-lg">
                                    {t('report.page.subtitle')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <Tabs defaultValue="report" className="w-full">
                        <TabsList className="grid grid-cols-1 sm:grid-cols-3 h-auto w-full max-w-2xl mx-auto bg-slate-100/80 p-1.5 rounded-[2rem] sm:rounded-full border border-slate-200/50 shadow-sm gap-1 mb-12">
                            <TabsTrigger
                                value="report"
                                className="rounded-full px-6 py-4 sm:py-2.5 text-xs font-bold uppercase tracking-wider transition-all data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md sm:whitespace-nowrap flex items-center justify-center gap-2"
                            >
                                <Printer className="w-4 h-4" /> {t('report.page.tabs.report')}
                            </TabsTrigger>
                            <TabsTrigger
                                value="templates"
                                className="rounded-full px-6 py-4 sm:py-2.5 text-xs font-bold uppercase tracking-wider transition-all data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md sm:whitespace-nowrap flex items-center justify-center gap-2"
                            >
                                <FileCheck className="w-4 h-4" /> {t('report.page.tabs.templates')}
                            </TabsTrigger>
                            <TabsTrigger
                                value="premium"
                                className="rounded-full px-6 py-4 sm:py-2.5 text-xs font-bold uppercase tracking-wider transition-all data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-md sm:whitespace-nowrap flex items-center justify-center gap-2 bg-indigo-50/30"
                            >
                                <Sparkles className="w-4 h-4" /> {t('report.page.tabs.premium')}
                            </TabsTrigger>
                        </TabsList>

                        {/* REPORT CONTENT */}
                        <TabsContent value="report" className="focus-visible:outline-none focus-visible:ring-0">
                            <div className="print:p-0 print:shadow-none bg-white p-8 md:p-12 rounded-xl shadow-sm border border-slate-100 max-w-4xl mx-auto space-y-10">
                                <div className="border-b border-slate-200 pb-8 flex flex-col md:flex-row justify-between items-start gap-4">
                                    <div>
                                        <h2 className="text-3xl font-serif text-slate-900 mb-2">{t('report.page.main_report.title')}</h2>
                                        <p className="text-slate-500">{t('report.page.main_report.subtitle')}</p>
                                    </div>
                                    <div className="text-right text-sm text-slate-400 print:hidden">
                                        <Button onClick={handlePrint} variant="outline" size="sm" className="gap-2">
                                            <Printer className="w-4 h-4" /> {t('report.page.main_report.print_button')}
                                        </Button>
                                    </div>
                                </div>

                                {/* Key Stats Grid */}
                                {stats && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <div className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                                                <FileCheck className="w-3 h-3" /> {t('report.page.main_report.stats.events')}
                                            </div>
                                            <div className="text-3xl font-bold text-slate-800">{stats.totalEvents}</div>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <div className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                                                <CalendarRange className="w-3 h-3" /> {t('report.page.main_report.stats.duration')}
                                            </div>
                                            <div className="text-3xl font-bold text-slate-800">{stats.durationDays}</div>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <div className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                                                <AlertTriangle className="w-3 h-3" /> {t('report.page.main_report.stats.severity')}
                                            </div>
                                            <div className={`text-3xl font-bold ${stats.avgSeverity > 7 ? 'text-rose-600' : 'text-slate-800'}`}>
                                                {stats.avgSeverity}/10
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <div className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                                                <Scale className="w-3 h-3" /> {t('report.page.main_report.stats.main_type')}
                                            </div>
                                            <div className="text-sm font-bold text-slate-800 leading-tight pt-1">
                                                {stats.commonTypes[0] ? t(`timeline.types.${stats.commonTypes[0]}`) : t('report.page.main_report.stats.not_defined')}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Detailed Event List */}
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-slate-800 border-b pb-2">{t('report.page.main_report.event_list_title')}</h3>
                                    {events.length === 0 ? (
                                        <p className="text-slate-400 italic">{t('report.page.main_report.no_events')}</p>
                                    ) : (
                                        events
                                            .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                                            .map((event) => (
                                                <div key={event.id} className="break-inside-avoid border-b border-slate-100 pb-4 mb-4 last:border-0">
                                                    <div className="flex justify-between items-baseline mb-2">
                                                        <div className="font-bold text-slate-700">
                                                            {new Date(event.timestamp).toLocaleDateString(language === 'fi' ? 'fi-FI' : 'en-US')}
                                                        </div>
                                                        <div className="text-xs text-slate-400 uppercase tracking-widest">{t(`timeline.emotions.${event.emotion}`)}</div>
                                                    </div>
                                                    <div className="text-sm text-slate-800">{event.objectiveDescription || event.description}</div>
                                                </div>
                                            ))
                                    )}
                                </div>
                            </div>
                        </TabsContent>

                        {/* TEMPLATES CONTENT */}
                        <TabsContent value="templates" className="focus-visible:outline-none focus-visible:ring-0 space-y-6">
                            {/* Filter Bar */}
                            <div className="flex flex-wrap gap-2 pb-4">
                                {categories.map(cat => (
                                    <Button
                                        key={cat.id}
                                        variant={activeCategory === cat.id ? "default" : "outline"}
                                        onClick={() => setActiveCategory(cat.id)}
                                        size="sm"
                                        className="rounded-full"
                                    >
                                        {cat.label}
                                    </Button>
                                ))}
                            </div>

                            {/* Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredTemplates.map(template => (
                                    <Card
                                        key={template.id}
                                        className="flex flex-col hover:shadow-lg transition-all border-slate-200 cursor-pointer group hover:border-indigo-300"
                                        onClick={() => setSelectedTemplate(template)}
                                    >
                                        <CardHeader className="pb-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <Badge variant="secondary" className="uppercase tracking-wider text-[10px] font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-none px-2 py-0.5">
                                                    {categories.find(c => c.id === template.category)?.label}
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-xl font-bold leading-tight group-hover:text-indigo-900 transition-colors break-words">{t(`report.templates.${template.id}.title`)}</CardTitle>
                                            <CardDescription className="line-clamp-2 mt-2 text-sm text-slate-500 leading-normal">
                                                {t(`report.templates.${template.id}.description`)}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardFooter className="mt-auto pt-0">
                                            <Button variant="ghost" className="w-full justify-between items-center text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-bold px-0">
                                                {t('report.page.templates_tab.card.read_and_use')} <ExternalLink className="w-4 h-4 ml-2" />
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>

                            {/* Template Detail Dialog */}
                            <Dialog open={!!selectedTemplate} onOpenChange={(open) => !open && setSelectedTemplate(null)}>
                                <DialogContent className="max-w-3xl p-0 overflow-hidden border-none bg-white rounded-[2rem] shadow-2xl">
                                    {selectedTemplate && (
                                        <div className="flex flex-col max-h-[90vh]">
                                            <DialogHeader className="bg-indigo-900 text-white p-6 sm:p-10 space-y-2 relative overflow-hidden">
                                                {/* Background Decoration */}
                                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                                                <div className="relative z-10 flex items-center gap-3 mb-2">
                                                    <Badge className="bg-white/20 text-white uppercase font-black text-[10px] backdrop-blur-md border-white/10">
                                                        {categories.find(c => c.id === selectedTemplate.category)?.label}
                                                    </Badge>
                                                    {selectedTemplate.tags?.map(tag => (
                                                        <Badge key={tag} variant="outline" className="text-indigo-200 border-indigo-200/30 text-[10px] uppercase font-bold">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <DialogTitle className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight relative z-10">
                                                    {t(`report.templates.${selectedTemplate.id}.title`)}
                                                </DialogTitle>
                                                <DialogDescription className="text-indigo-100 text-lg font-light max-w-2xl opacity-90 relative z-10">
                                                    {t(`report.templates.${selectedTemplate.id}.description`)}
                                                </DialogDescription>
                                            </DialogHeader>

                                            <div className="p-6 sm:p-10 space-y-8 overflow-y-auto custom-scrollbar bg-slate-50/30">
                                                {/* Subject Field */}
                                                <section className="space-y-3">
                                                    <h4 className="text-indigo-900 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                                        <Mail className="w-4 h-4 text-indigo-500" /> {t('report.page.templates_tab.dialog.subject')}
                                                    </h4>
                                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group">
                                                        <code className="text-indigo-700 font-mono text-sm">{t(`report.templates.${selectedTemplate.id}.subject`)}</code>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-indigo-400 hover:text-indigo-600 shrink-0"
                                                            onClick={() => handleCopy(t(`report.templates.${selectedTemplate.id}.subject`), 'subject')}
                                                        >
                                                            {copiedId === 'subject' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                        </Button>
                                                    </div>
                                                </section>

                                                {/* Content Field */}
                                                <section className="space-y-3">
                                                    <h4 className="text-indigo-900 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                                        <FileText className="w-4 h-4 text-indigo-500" /> {t('report.page.templates_tab.dialog.content')}
                                                    </h4>
                                                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm relative group">
                                                        <div className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed text-base select-text">
                                                            {t(`report.templates.${selectedTemplate.id}.content`)}
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-slate-400 italic flex items-center gap-2">
                                                        <Info className="w-3 h-3" /> {t('report.page.templates_tab.dialog.copy_info')}
                                                    </p>
                                                </section>
                                            </div>

                                            <DialogFooter className="p-6 bg-white border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                                                <Button
                                                    variant="outline"
                                                    className="uppercase font-bold tracking-widest text-xs sm:order-1"
                                                    onClick={() => setSelectedTemplate(null)}
                                                >
                                                    {t('report.page.templates_tab.dialog.close')}
                                                </Button>
                                                <Button
                                                    className={`flex-1 sm:order-2 h-12 uppercase font-bold tracking-widest transition-all ${copiedId === selectedTemplate.id ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'
                                                        }`}
                                                    onClick={() => handleCopy(t(`report.templates.${selectedTemplate.id}.content`), selectedTemplate.id)}
                                                >
                                                    {copiedId === selectedTemplate.id ? (
                                                        <><Check className="w-5 h-5 mr-2" /> {t('report.page.templates_tab.dialog.copied')}</>
                                                    ) : (
                                                        <><Copy className="w-5 h-5 mr-2" /> {t('report.page.templates_tab.dialog.copy_all')}</>
                                                    )}
                                                </Button>
                                            </DialogFooter>
                                        </div>
                                    )}
                                </DialogContent>
                            </Dialog>
                        </TabsContent>

                        {/* PREMIUM AI CONTENT */}
                        <TabsContent value="premium" className="focus-visible:outline-none focus-visible:ring-0">
                            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl overflow-hidden shadow-2xl text-white min-h-[600px] flex flex-col items-center justify-center p-8 relative">
                                {/* Decorative Blobs */}
                                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                                {aiStep === 'intro' && (
                                    <div className="relative z-10 max-w-2xl text-center space-y-8 animate-in fade-in zoom-in duration-500">
                                        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/20 shadow-xl">
                                            <Sparkles className="w-12 h-12 text-indigo-300" />
                                        </div>
                                        <div className="space-y-4">
                                            <h2 className="text-4xl font-bold">{t('report.page.premium_tab.intro.title')}</h2>
                                            <p className="text-indigo-200 text-lg leading-relaxed">
                                                {t('report.page.premium_tab.intro.description')}
                                            </p>
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-4 text-left">
                                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                                <ShieldCheck className="w-6 h-6 text-green-400 mb-2" />
                                                <h3 className="font-bold">{t('report.page.premium_tab.intro.features.anonymized.title')}</h3>
                                                <p className="text-xs text-indigo-200 mt-1">{t('report.page.premium_tab.intro.features.anonymized.text')}</p>
                                            </div>
                                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                                <BrainCircuit className="w-6 h-6 text-purple-400 mb-2" />
                                                <h3 className="font-bold">{t('report.page.premium_tab.intro.features.ai_analysis.title')}</h3>
                                                <p className="text-xs text-indigo-200 mt-1">{t('report.page.premium_tab.intro.features.ai_analysis.text')}</p>
                                            </div>
                                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                                <FileText className="w-6 h-6 text-blue-400 mb-2" />
                                                <h3 className="font-bold">{t('report.page.premium_tab.intro.features.pdf_ready.title')}</h3>
                                                <p className="text-xs text-indigo-200 mt-1">{t('report.page.premium_tab.intro.features.pdf_ready.text')}</p>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <Button onClick={handleStartPremiumProcess} size="lg" className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-lg h-14 px-8 shadow-lg shadow-indigo-900/50">
                                                {t('report.page.premium_tab.intro.button')}
                                            </Button>
                                            <p className="text-xs text-indigo-400 mt-3">🎉 Ilmainen beta-testauksen ajan</p>
                                        </div>
                                    </div>
                                )}

                                {aiStep === 'payment' && (
                                    <div className="relative z-10 w-full max-w-md bg-white rounded-2xl text-slate-900 p-8 shadow-2xl animate-in slide-in-from-right duration-500">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-xl font-bold">{t('report.page.premium_tab.payment.title')}</h3>
                                            <Badge variant="outline" className="text-indigo-600 border-indigo-200">TestMode</Badge>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="bg-slate-50 p-4 rounded-lg space-y-3 border border-slate-100">
                                                <div className="flex justify-between text-sm">
                                                    <span>{t('report.page.premium_tab.payment.summary_title')}</span>
                                                    <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                                                        BETA - Ilmainen
                                                    </Badge>
                                                </div>
                                                <Separator />
                                                <div className="text-sm text-slate-600">
                                                    <p className="font-medium">🎉 Beta-testausvaihe</p>
                                                    <p className="text-xs mt-1">AI-analyysi on ilmainen beta-testauksen ajan. Kiitos palautteestasi!</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-start space-x-3">
                                                    <Checkbox id="consent" checked={consentGiven} onCheckedChange={(c) => setConsentGiven(!!c)} />
                                                    <div className="grid gap-1.5 leading-none">
                                                        <label htmlFor="consent" className="text-sm font-medium leading-tight cursor-pointer">
                                                            {t('report.page.premium_tab.payment.consent_label')}
                                                        </label>
                                                        <p className="text-xs text-slate-500">
                                                            {t('report.page.premium_tab.payment.consent_info')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <Button
                                                onClick={handleSimulatePayment}
                                                disabled={!consentGiven}
                                                className="w-full h-12 text-lg bg-green-600 hover:bg-green-700 font-bold"
                                            >
                                                <Sparkles className="w-5 h-5 mr-2" /> Aloita AI-analyysi (Ilmainen)
                                            </Button>

                                            <div className="text-center">
                                                <Button variant="link" onClick={() => setAiStep('intro')} className="text-slate-400 text-xs">
                                                    {t('report.page.premium_tab.payment.cancel')}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {aiStep === 'processing' && (
                                    <div className="relative z-10 text-center space-y-6 animate-in fade-in duration-500">
                                        <div className="relative mx-auto w-24 h-24">
                                            <div className="absolute inset-0 border-4 border-indigo-400/30 rounded-full"></div>
                                            <div className="absolute inset-0 border-4 border-t-white rounded-full animate-spin"></div>
                                            <BrainCircuit className="absolute inset-0 m-auto w-10 h-10 text-white animate-pulse" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold">{t('report.page.premium_tab.processing.title')}</h3>
                                            <p className="text-indigo-200">{t('report.page.premium_tab.processing.subtitle')}</p>
                                        </div>
                                        <div className="text-sm text-indigo-300/80 font-mono whitespace-pre-wrap">
                                            {t('report.page.premium_tab.processing.steps')}
                                        </div>
                                    </div>
                                )}

                                {aiStep === 'result' && aiResult && (
                                    <div className="relative z-10 w-full max-w-3xl bg-white text-slate-900 rounded-xl shadow-2xl overflow-hidden animate-in scale-95 duration-500">
                                        <div className="bg-emerald-50 p-4 border-b border-emerald-100 flex justify-between items-center">
                                            <div className="flex items-center gap-2 text-emerald-800 font-bold">
                                                <Check className="w-5 h-5" /> {t('report.page.premium_tab.result.ready')}
                                            </div>
                                            <Button size="sm" variant="outline" onClick={() => setAiStep('intro')}>
                                                {t('report.page.premium_tab.result.close')}
                                            </Button>
                                        </div>
                                        <div className="p-8 max-h-[60vh] overflow-y-auto prose prose-slate">
                                            <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                                                {aiResult.report}
                                            </div>
                                        </div>
                                        <div className="p-4 bg-slate-50 border-t flex justify-end gap-3">
                                            <Button variant="outline" onClick={() => navigator.clipboard.writeText(aiResult.report || "")}>
                                                <Copy className="w-4 h-4 mr-2" /> {t('report.page.premium_tab.result.copy')}
                                            </Button>
                                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                                <Download className="w-4 h-4 mr-2" /> {t('report.page.premium_tab.result.download')}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </VaultWrapper>
        </div>
    );
}
