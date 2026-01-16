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
import { Printer, ArrowLeft, BrainCircuit, CalendarRange, Scale, AlertTriangle, FileCheck, Copy, Check, FileText, Lock, Sparkles, CreditCard, Loader2, Download, ShieldCheck, Mail, Info, ExternalLink, ChevronRight, LayoutDashboard, TrendingUp, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Link from "next/link";
import { analyzeEvents, generateSummaryChecklist } from "@/helpers/reportAnalysis";
import { templates, TemplateCategory, Template } from "@/data/templates";
// import { generatePremiumReport, AIReportResult } from "@/actions/generateReport";
import { useLanguage } from "@/context/LanguageContext";

export default function DocumentsPage() {
    const { t, language } = useLanguage();
    const { data: events, isLocked, hasData, unlock } = useSecureLocalStorage<TimelineEvent[]>("suojasiipi_events_secure", []);
    const [mounted, setMounted] = useState(false);
    const [activeCategory, setActiveCategory] = useState<TemplateCategory | 'all'>('all');
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

    // Premium AI State
    // const [aiStep, setAiStep] = useState<'intro' | 'payment' | 'processing' | 'result'>('intro');
    // const [consentGiven, setConsentGiven] = useState(false);
    // const [aiResult, setAiResult] = useState<AIReportResult | null>(null);

    // Stats
    const stats = mounted ? analyzeEvents(events) : null;
    const checklist = stats ? generateSummaryChecklist(stats) : [];

    // Overview Filter State
    const [timeRange, setTimeRange] = useState<'7d' | '30d' | '3m' | 'all'>('7d');

    // Filtered Events for Chart
    const getFilteredEvents = () => {
        const now = new Date();
        const rangeDays = {
            '7d': 7,
            '30d': 30,
            '3m': 90,
            'all': 36500 // 100 years
        }[timeRange];

        return events.filter(e => {
            const eventDate = new Date(e.timestamp);
            const diffTime = Math.abs(now.getTime() - eventDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= rangeDays;
        }).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    };

    const filteredEvents = getFilteredEvents();

    // Chart Data Preparation
    const chartData = filteredEvents.reduce((acc: any[], event) => {
        const date = new Date(event.timestamp).toLocaleDateString(language === 'fi' ? 'fi-FI' : 'en-US', { day: 'numeric', month: 'short' });
        const existing = acc.find(item => item.date === date);
        if (existing) {
            existing.count += 1;
        } else {
            acc.push({ date, count: 1 });
        }
        return acc;
    }, []);

    // Calculate Overview Stats
    const overviewStats = {
        count: filteredEvents.length,
        duration: filteredEvents.length > 0
            ? Math.ceil((new Date().getTime() - new Date(filteredEvents[0].timestamp).getTime()) / (1000 * 60 * 60 * 24))
            : 0,
        avgSeverity: filteredEvents.length > 0
            ? (filteredEvents.reduce((acc, curr) => acc + (curr.intensity || 0), 0) / filteredEvents.length).toFixed(1)
            : 0,
        trend: filteredEvents.length > 5 ? "+12%" : "0%" // Mock trend for now
    };

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

    /*
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

            // const result = await generatePremiumReport(anonymizedData);
            // setAiResult(result);
            setAiStep('result');
        }, 3500);
    };
    */


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

    if (!mounted) return <div className="p-32 text-center text-[#5B4B8A] font-mono animate-pulse">{t('report.page.loading')}</div>;

    return (
        <div className="container mx-auto px-6 sm:px-8 max-w-screen-lg py-32 space-y-12">
            <VaultWrapper isLocked={isLocked} hasData={hasData} onUnlock={unlock}>
                <div className="space-y-12 pb-20 animate-in fade-in duration-500">
                    {/* Header (Hidden in Print) */}
                    <div className="print:hidden space-y-6 border-b border-[#E8DDD0] pb-8">
                        <div className="flex items-center gap-4">
                            <Link href="/timeline" className="text-sm font-bold text-[#5B4B8A] hover:underline flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4" /> {t('report.page.back_to_timeline')}
                            </Link>
                        </div>
                        <div className="space-y-2">
                            <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest">
                                Välineet &mdash; Raportointi
                            </span>
                            <h1 className="text-4xl font-serif font-bold text-[#2B2B2B]">{t('report.page.title')}</h1>
                            <p className="text-lg text-[#4A4A4A] max-w-2xl leading-relaxed">
                                {t('report.page.subtitle')}
                            </p>
                        </div>
                    </div>

                    <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="flex flex-col sm:flex-row w-full sm:w-auto bg-transparent border-b border-[#E8DDD0] p-0 mb-12 gap-6 sm:gap-8 justify-start h-auto">
                            <TabsTrigger
                                value="overview"
                                className="px-0 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-[#5B4B8A] data-[state=active]:text-[#5B4B8A] text-[#4A4A4A] font-bold uppercase tracking-widest text-xs bg-transparent shadow-none transition-all hover:text-[#2B2B2B]"
                            >
                                <LayoutDashboard className="w-4 h-4 mr-2" /> {t('report.page.tabs.overview')}
                            </TabsTrigger>
                            <TabsTrigger
                                value="report"
                                className="px-0 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-[#5B4B8A] data-[state=active]:text-[#5B4B8A] text-[#4A4A4A] font-bold uppercase tracking-widest text-xs bg-transparent shadow-none transition-all hover:text-[#2B2B2B]"
                            >
                                <Printer className="w-4 h-4 mr-2" /> {t('report.page.tabs.report')}
                            </TabsTrigger>
                            <TabsTrigger
                                value="templates"
                                className="px-0 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-[#5B4B8A] data-[state=active]:text-[#5B4B8A] text-[#4A4A4A] font-bold uppercase tracking-widest text-xs bg-transparent shadow-none transition-all hover:text-[#2B2B2B]"
                            >
                                <FileCheck className="w-4 h-4 mr-2" /> {t('report.page.tabs.templates')}
                            </TabsTrigger>
                            {/* PREMIUM TAB HIDDEN TEMPORARILY
                            <TabsTrigger
                                value="premium"
                                className="px-0 py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-[#5B4B8A] data-[state=active]:text-[#5B4B8A] text-[#4A4A4A] font-bold uppercase tracking-widest text-xs bg-transparent shadow-none transition-all hover:text-[#2B2B2B]"
                            >
                                <Sparkles className="w-4 h-4 mr-2" /> {t('report.page.tabs.premium')}
                            </TabsTrigger>
                            */}
                        </TabsList>

                        {/* OVERVIEW CONTENT */}
                        <TabsContent value="overview" className="focus-visible:outline-none focus-visible:ring-0 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-[#2B2B2B] flex items-center gap-3">
                                        <BarChart3 className="w-6 h-6 text-[#5B4B8A]" />
                                        {t('report.overview.title')}
                                    </h2>
                                    <p className="text-[#4A4A4A] mt-1">{t('report.overview.subtitle')}</p>
                                </div>
                                <Button variant="outline" className="border-[#E8DDD0] hover:border-[#5B4B8A] text-[#2B2B2B]">
                                    <Download className="w-4 h-4 mr-2" /> {t('report.overview.download_pdf')}
                                </Button>
                            </div>

                            <div className="bg-white p-2 rounded-lg border border-[#E8DDD0] inline-flex self-start">
                                {(['7d', '30d', '3m', 'all'] as const).map(range => (
                                    <button
                                        key={range}
                                        onClick={() => setTimeRange(range)}
                                        className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wide transition-all ${timeRange === range
                                            ? "bg-[#5B4B8A] text-white shadow-sm"
                                            : "text-[#4A4A4A] hover:bg-[#FDFBF7]"
                                            }`}
                                    >
                                        {t(`report.overview.ranges.${range}`)}
                                    </button>
                                ))}
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <Card className="bg-white border-[#E8DDD0] shadow-sm">
                                    <CardContent className="p-6">
                                        <div className="text-[10px] uppercase font-bold tracking-widest text-[#5B4B8A] mb-2">{t('report.overview.stats.events')}</div>
                                        <div className="text-4xl font-serif font-bold text-[#2B2B2B]">{overviewStats.count}</div>
                                        <div className="text-xs text-[#4A4A4A] mt-1">{t('report.overview.stats.events_desc')}</div>
                                    </CardContent>
                                </Card>
                                <Card className="bg-white border-[#E8DDD0] shadow-sm">
                                    <CardContent className="p-6">
                                        <div className="text-[10px] uppercase font-bold tracking-widest text-[#5B4B8A] mb-2">{t('report.overview.stats.duration')}</div>
                                        <div className="text-4xl font-serif font-bold text-[#2B2B2B]">
                                            {overviewStats.duration} <span className="text-base font-normal text-[#4A4A4A]">{t('report.overview.stats.days')}</span>
                                        </div>
                                        <div className="text-xs text-[#4A4A4A] mt-1">{t('report.overview.stats.duration_desc')}</div>
                                    </CardContent>
                                </Card>
                                <Card className="bg-white border-[#E8DDD0] shadow-sm">
                                    <CardContent className="p-6">
                                        <div className="text-[10px] uppercase font-bold tracking-widest text-[#5B4B8A] mb-2">{t('report.overview.stats.trend')}</div>
                                        <div className="text-4xl font-serif font-bold text-[#2B2B2B] flex items-center gap-2">
                                            <TrendingUp className="w-6 h-6 text-emerald-600" />
                                            {overviewStats.trend}
                                        </div>
                                        <div className="text-xs text-[#4A4A4A] mt-1">{t('report.overview.stats.level_stable')}</div>
                                    </CardContent>
                                </Card>
                                <Card className="bg-white border-[#E8DDD0] shadow-sm">
                                    <CardContent className="p-6">
                                        <div className="text-[10px] uppercase font-bold tracking-widest text-[#5B4B8A] mb-2">{t('report.overview.stats.avg_intensity')}</div>
                                        <div className="flex items-baseline gap-2">
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map(i => (
                                                    <div key={i} className={`w-3 h-3 rounded-full ${i <= Number(overviewStats.avgSeverity) ? "bg-[#5B4B8A]" : "bg-[#E8DDD0]"}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-xs text-[#4A4A4A] mt-2 font-mono">
                                            {overviewStats.avgSeverity} {t('report.overview.stats.score_label')}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Chart Area */}
                            <Card className="bg-white border-[#E8DDD0] shadow-sm h-[400px] flex flex-col relative overflow-hidden">
                                <CardHeader className="pb-0">
                                    <CardTitle className="text-sm font-bold text-[#4A4A4A] uppercase tracking-widest flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4" /> {t('report.overview.chart.title')}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1 pt-6 pb-2 px-4">
                                    {filteredEvents.length > 0 ? (
                                        <div className="w-full h-full min-h-[250px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0EAE3" />
                                                    <XAxis
                                                        dataKey="date"
                                                        axisLine={false}
                                                        tickLine={false}
                                                        tick={{ fill: '#5B4B8A', fontSize: 10, fontFamily: 'monospace' }}
                                                        dy={10}
                                                        angle={-45}
                                                        textAnchor="end"
                                                    />
                                                    <YAxis
                                                        axisLine={false}
                                                        tickLine={false}
                                                        tick={{ fill: '#5B4B8A', fontSize: 10, fontFamily: 'monospace' }}
                                                    />
                                                    <Tooltip
                                                        cursor={{ fill: '#FDFBF7' }}
                                                        contentStyle={{
                                                            backgroundColor: '#2B2B2B',
                                                            border: 'none',
                                                            borderRadius: '2px',
                                                            padding: '8px 12px',
                                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                                        }}
                                                        itemStyle={{ color: '#FDFBF7', fontSize: '11px', fontWeight: 'bold' }}
                                                        labelStyle={{ color: '#E8DDD0', fontSize: '10px', marginBottom: '4px', textTransform: 'uppercase' }}
                                                    />
                                                    <Bar
                                                        dataKey="count"
                                                        fill="#5B4B8A"
                                                        radius={[2, 2, 0, 0]}
                                                        barSize={32}
                                                    >
                                                        {chartData.map((entry: any, index: number) => (
                                                            <Cell
                                                                key={`cell-${index}`}
                                                                className="hover:fill-[#2B2B2B] transition-colors duration-200"
                                                                cursor="pointer"
                                                            />
                                                        ))}
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                            <BarChart3 className="w-16 h-16 text-[#E8DDD0]" />
                                            <div>
                                                <h3 className="font-bold text-[#2B2B2B]">{t('report.overview.chart.no_data')}</h3>
                                                <p className="text-sm text-[#4A4A4A]">{t('report.overview.chart.no_data_desc')}</p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* REPORT CONTENT */}
                        <TabsContent value="report" className="focus-visible:outline-none focus-visible:ring-0">
                            <div className="print:p-0 print:shadow-none bg-white p-8 md:p-12 rounded-sm border border-[#E8DDD0] shadow-sm max-w-4xl mx-auto space-y-12">
                                <div className="border-b border-[#E8DDD0] pb-8 flex flex-col md:flex-row justify-between items-start gap-4">
                                    <div>
                                        <h2 className="text-3xl font-serif text-[#2B2B2B] mb-2">{t('report.page.main_report.title')}</h2>
                                        <p className="text-[#4A4A4A]">{t('report.page.main_report.subtitle')}</p>
                                    </div>
                                    <div className="text-right text-sm text-[#4A4A4A] print:hidden">
                                        <Button onClick={handlePrint} variant="outline" size="sm" className="gap-2 border-[#E8DDD0] hover:border-[#5B4B8A] text-[#2B2B2B]">
                                            <Printer className="w-4 h-4" /> {t('report.page.main_report.print_button')}
                                        </Button>
                                    </div>
                                </div>

                                {/* Key Stats Grid */}
                                {stats && (
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                        <div className="bg-[#FDFBF7] p-6 rounded-sm border border-[#E8DDD0]">
                                            <div className="text-[#5B4B8A] text-[10px] uppercase font-bold tracking-widest mb-2 flex items-center gap-1">
                                                <FileCheck className="w-3 h-3" /> {t('report.page.main_report.stats.events')}
                                            </div>
                                            <div className="text-3xl font-serif font-bold text-[#2B2B2B]">{stats.totalEvents}</div>
                                        </div>
                                        <div className="bg-[#FDFBF7] p-6 rounded-sm border border-[#E8DDD0]">
                                            <div className="text-[#5B4B8A] text-[10px] uppercase font-bold tracking-widest mb-2 flex items-center gap-1">
                                                <CalendarRange className="w-3 h-3" /> {t('report.page.main_report.stats.duration')}
                                            </div>
                                            <div className="text-3xl font-serif font-bold text-[#2B2B2B]">{stats.durationDays}</div>
                                        </div>
                                        <div className="bg-[#FDFBF7] p-6 rounded-sm border border-[#E8DDD0]">
                                            <div className="text-[#5B4B8A] text-[10px] uppercase font-bold tracking-widest mb-2 flex items-center gap-1">
                                                <AlertTriangle className="w-3 h-3" /> {t('report.page.main_report.stats.severity')}
                                            </div>
                                            <div className={`text-3xl font-serif font-bold ${stats.avgSeverity > 7 ? 'text-red-700' : 'text-[#2B2B2B]'}`}>
                                                {stats.avgSeverity}/10
                                            </div>
                                        </div>
                                        <div className="bg-[#FDFBF7] p-6 rounded-sm border border-[#E8DDD0]">
                                            <div className="text-[#5B4B8A] text-[10px] uppercase font-bold tracking-widest mb-2 flex items-center gap-1">
                                                <Scale className="w-3 h-3" /> {t('report.page.main_report.stats.main_type')}
                                            </div>
                                            <div className="text-sm font-bold text-[#2B2B2B] leading-tight pt-1">
                                                {stats.commonTypes[0] ? t(`timeline.types.${stats.commonTypes[0]}`) : t('report.page.main_report.stats.not_defined')}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Detailed Event List */}
                                <div className="space-y-8">
                                    <h3 className="text-xl font-bold font-serif text-[#2B2B2B] border-b border-[#E8DDD0] pb-4">{t('report.page.main_report.event_list_title')}</h3>
                                    {events.length === 0 ? (
                                        <p className="text-[#4A4A4A] italic border-l-2 border-[#E8DDD0] pl-4">{t('report.page.main_report.no_events')}</p>
                                    ) : (
                                        events
                                            .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                                            .map((event) => (
                                                <div key={event.id} className="break-inside-avoid border-b border-[#FAFAFA] pb-6 mb-6 last:border-0">
                                                    <div className="flex justify-between items-baseline mb-2">
                                                        <div className="font-bold text-[#2B2B2B]">
                                                            {new Date(event.timestamp).toLocaleDateString(language === 'fi' ? 'fi-FI' : 'en-US')}
                                                        </div>
                                                        <div className="text-[10px] text-[#4A4A4A] uppercase tracking-widest border border-[#E8DDD0] px-2 py-0.5 rounded-sm bg-[#FDFBF7]">
                                                            {t(`timeline.emotions.${event.emotion}`)}
                                                        </div>
                                                    </div>
                                                    <div className="text-sm text-[#4A4A4A] leading-relaxed font-serif">{event.objectiveDescription || event.description}</div>
                                                </div>
                                            ))
                                    )}
                                </div>
                            </div>
                        </TabsContent>

                        {/* TEMPLATES CONTENT */}
                        <TabsContent value="templates" className="focus-visible:outline-none focus-visible:ring-0 space-y-8">
                            {/* Filter Bar */}
                            <div className="flex flex-wrap gap-2 pb-4">
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id)}
                                        className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wide transition-all border ${activeCategory === cat.id
                                            ? "bg-[#2B2B2B] text-white border-[#2B2B2B]"
                                            : "bg-white text-[#4A4A4A] border-[#E8DDD0] hover:border-[#5B4B8A] hover:text-[#2B2B2B]"
                                            }`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>

                            {/* Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredTemplates.map(template => (
                                    <div
                                        key={template.id}
                                        className="bg-white border border-[#E8DDD0] p-6 hover:shadow-lg hover:border-[#5B4B8A] transition-all cursor-pointer group flex flex-col h-full rounded-sm"
                                        onClick={() => setSelectedTemplate(template)}
                                    >
                                        <div className="mb-4 flex justify-between items-start">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#5B4B8A] bg-[#5B4B8A]/5 px-2 py-1 rounded-sm">
                                                {categories.find(c => c.id === template.category)?.label}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-serif font-bold text-[#2B2B2B] mb-2 group-hover:text-[#5B4B8A] transition-colors">
                                            {t(`report.templates.${template.id}.title`)}
                                        </h3>
                                        <p className="text-sm text-[#4A4A4A] leading-relaxed line-clamp-3 mb-6 flex-1">
                                            {t(`report.templates.${template.id}.description`)}
                                        </p>
                                        <div className="pt-4 border-t border-[#FAFAFA] flex items-center justify-between mt-auto text-xs font-bold text-[#2B2B2B] group-hover:text-[#5B4B8A]">
                                            <span>{t('report.page.templates_tab.card.read_and_use')}</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Template Detail Dialog - Styled as a "File View" */}
                            <Dialog open={!!selectedTemplate} onOpenChange={(open) => !open && setSelectedTemplate(null)}>
                                <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white border border-[#E8DDD0] shadow-2xl rounded-sm">
                                    {selectedTemplate && (
                                        <div className="flex flex-col max-h-[90vh]">
                                            <DialogHeader className="p-8 border-b border-[#E8DDD0] bg-[#FDFBF7]">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="text-[10px] font-mono text-[#5B4B8A] uppercase tracking-widest border border-[#5B4B8A] px-2 py-0.5 rounded-sm">
                                                        {categories.find(c => c.id === selectedTemplate.category)?.label}
                                                    </span>
                                                    {selectedTemplate.tags?.map(tag => (
                                                        <span key={tag} className="text-[10px] font-mono text-[#4A4A4A] uppercase tracking-widest border border-[#E8DDD0] px-2 py-0.5 rounded-sm bg-white">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <DialogTitle className="text-2xl sm:text-3xl font-serif font-bold text-[#2B2B2B] leading-tight">
                                                    {t(`report.templates.${selectedTemplate.id}.title`)}
                                                </DialogTitle>
                                                <DialogDescription className="text-[#4A4A4A] mt-2 text-base leading-relaxed">
                                                    {t(`report.templates.${selectedTemplate.id}.description`)}
                                                </DialogDescription>
                                            </DialogHeader>

                                            <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar bg-white">
                                                {/* Subject Field */}
                                                <section className="space-y-2">
                                                    <h4 className="text-[#2B2B2B] font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
                                                        <Mail className="w-3 h-3 text-[#5B4B8A]" /> {t('report.page.templates_tab.dialog.subject')}
                                                    </h4>
                                                    <div className="bg-[#FAFAFA] p-4 border border-[#E8DDD0] flex items-center justify-between group rounded-sm">
                                                        <code className="text-[#2B2B2B] font-mono text-sm">{t(`report.templates.${selectedTemplate.id}.subject`)}</code>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-[#5B4B8A] hover:bg-[#5B4B8A]/10"
                                                            onClick={() => handleCopy(t(`report.templates.${selectedTemplate.id}.subject`), 'subject')}
                                                        >
                                                            {copiedId === 'subject' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                        </Button>
                                                    </div>
                                                </section>

                                                {/* Content Field */}
                                                <section className="space-y-2">
                                                    <h4 className="text-[#2B2B2B] font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
                                                        <FileText className="w-3 h-3 text-[#5B4B8A]" /> {t('report.page.templates_tab.dialog.content')}
                                                    </h4>
                                                    <div className="bg-white p-6 border border-[#E8DDD0] rounded-sm relative group bg-[url('/paper-texture.png')]">
                                                        <div className="whitespace-pre-wrap font-serif text-[#2B2B2B] leading-relaxed text-base select-text">
                                                            {t(`report.templates.${selectedTemplate.id}.content`)}
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-[#4A4A4A] italic flex items-center gap-2">
                                                        <Info className="w-3 h-3" /> {t('report.page.templates_tab.dialog.copy_info')}
                                                    </p>
                                                </section>
                                            </div>

                                            <DialogFooter className="p-6 bg-[#FDFBF7] border-t border-[#E8DDD0] flex flex-col sm:flex-row gap-3">
                                                <Button
                                                    variant="outline"
                                                    className="uppercase font-bold tracking-widest text-xs border-[#E8DDD0] sm:order-1"
                                                    onClick={() => setSelectedTemplate(null)}
                                                >
                                                    {t('report.page.templates_tab.dialog.close')}
                                                </Button>
                                                <Button
                                                    className={`flex-1 sm:order-2 h-10 uppercase font-bold tracking-widest text-xs transition-all ${copiedId === selectedTemplate.id ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#2B2B2B] hover:bg-[#4A4A4A]'
                                                        } text-white rounded-sm`}
                                                    onClick={() => handleCopy(t(`report.templates.${selectedTemplate.id}.content`), selectedTemplate.id)}
                                                >
                                                    {copiedId === selectedTemplate.id ? (
                                                        <><Check className="w-4 h-4 mr-2" /> {t('report.page.templates_tab.dialog.copied')}</>
                                                    ) : (
                                                        <><Copy className="w-4 h-4 mr-2" /> {t('report.page.templates_tab.dialog.copy_all')}</>
                                                    )}
                                                </Button>
                                            </DialogFooter>
                                        </div>
                                    )}
                                </DialogContent>
                            </Dialog>
                        </TabsContent>

                        {/* PREMIUM AI CONTENT HIDDEN TEMPORARILY
                        <TabsContent value="premium" className="focus-visible:outline-none focus-visible:ring-0">
                            <div className="bg-[#FDFBF7] border border-[#E8DDD0] rounded-sm p-8 md:p-12 min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden">

                                {aiStep === 'intro' && (
                                    <div className="max-w-2xl text-center space-y-12 animate-in fade-in duration-500">
                                        <div className="w-20 h-20 bg-white border border-[#E8DDD0] rounded-full flex items-center justify-center mx-auto shadow-sm">
                                            <Sparkles className="w-8 h-8 text-[#5B4B8A]" />
                                        </div>
                                        <div className="space-y-6">
                                            <h2 className="text-3xl font-serif font-bold text-[#2B2B2B]">{t('report.page.premium_tab.intro.title')}</h2>
                                            <p className="text-[#4A4A4A] text-lg leading-relaxed font-serif italic text-balance">
                                                "{t('report.page.premium_tab.intro.description')}"
                                            </p>
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-6 text-left">
                                            <div className="bg-white p-6 border border-[#E8DDD0] rounded-sm">
                                                <ShieldCheck className="w-5 h-5 text-[#5B4B8A] mb-3" />
                                                <h3 className="font-bold text-[#2B2B2B] text-sm uppercase tracking-wide mb-2">{t('report.page.premium_tab.intro.features.anonymized.title')}</h3>
                                                <p className="text-xs text-[#4A4A4A]">{t('report.page.premium_tab.intro.features.anonymized.text')}</p>
                                            </div>
                                            <div className="bg-white p-6 border border-[#E8DDD0] rounded-sm">
                                                <BrainCircuit className="w-5 h-5 text-[#5B4B8A] mb-3" />
                                                <h3 className="font-bold text-[#2B2B2B] text-sm uppercase tracking-wide mb-2">{t('report.page.premium_tab.intro.features.ai_analysis.title')}</h3>
                                                <p className="text-xs text-[#4A4A4A]">{t('report.page.premium_tab.intro.features.ai_analysis.text')}</p>
                                            </div>
                                            <div className="bg-white p-6 border border-[#E8DDD0] rounded-sm">
                                                <FileText className="w-5 h-5 text-[#5B4B8A] mb-3" />
                                                <h3 className="font-bold text-[#2B2B2B] text-sm uppercase tracking-wide mb-2">{t('report.page.premium_tab.intro.features.pdf_ready.title')}</h3>
                                                <p className="text-xs text-[#4A4A4A]">{t('report.page.premium_tab.intro.features.pdf_ready.text')}</p>
                                            </div>
                                        </div>

                                        <div className="pt-8">
                                            <Button onClick={handleStartPremiumProcess} size="lg" className="bg-[#2B2B2B] text-white hover:bg-[#4A4A4A] font-bold uppercase tracking-widest text-xs h-14 px-10 rounded-sm">
                                                {t('report.page.premium_tab.intro.button')}
                                            </Button>
                                            <p className="text-[10px] text-[#5B4B8A] mt-4 font-mono tracking-widest uppercase">Beta-vaihe &mdash; Maksuton</p>
                                        </div>
                                    </div>
                                )}

                                {aiStep === 'payment' && (
                                    <div className="w-full max-w-lg bg-white border border-[#E8DDD0] p-8 md:p-12 shadow-sm rounded-sm animate-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#E8DDD0]">
                                            <h3 className="text-xl font-serif font-bold text-[#2B2B2B]">{t('report.page.premium_tab.payment.title')}</h3>
                                            <div className="text-[10px] uppercase font-bold text-[#5B4B8A] border border-[#5B4B8A] px-2 py-0.5 rounded-sm">TestMode</div>
                                        </div>

                                        <div className="space-y-8">
                                            <div className="bg-[#FDFBF7] p-4 border border-[#E8DDD0] space-y-2">
                                                <div className="flex justify-between text-sm font-bold text-[#2B2B2B]">
                                                    <span>{t('report.page.premium_tab.payment.summary_title')}</span>
                                                    <span className="text-[#5B4B8A]">0.00 €</span>
                                                </div>
                                                <p className="text-xs text-[#4A4A4A]">AI-analyysi on ilmainen beta-testauksen ajan.</p>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-start space-x-3">
                                                    <Checkbox id="consent" checked={consentGiven} onCheckedChange={(c) => setConsentGiven(!!c)} />
                                                    <div className="grid gap-1.5 leading-none">
                                                        <label htmlFor="consent" className="text-sm font-medium leading-tight cursor-pointer text-[#2B2B2B]">
                                                            {t('report.page.premium_tab.payment.consent_label')}
                                                        </label>
                                                        <p className="text-xs text-[#4A4A4A] leading-relaxed">
                                                            {t('report.page.premium_tab.payment.consent_info')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <Button
                                                onClick={handleSimulatePayment}
                                                disabled={!consentGiven}
                                                className="w-full h-12 text-xs font-bold uppercase tracking-widest bg-[#2B2B2B] text-white hover:bg-[#4A4A4A] rounded-sm disabled:opacity-50"
                                            >
                                                Aloita analyysi
                                            </Button>

                                            <div className="text-center">
                                                <button onClick={() => setAiStep('intro')} className="text-[#4A4A4A] text-xs hover:underline">
                                                    {t('report.page.premium_tab.payment.cancel')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {aiStep === 'processing' && (
                                    <div className="text-center space-y-8 animate-in fade-in duration-500">
                                        <div className="relative mx-auto w-16 h-16">
                                            <Loader2 className="w-16 h-16 text-[#5B4B8A] animate-spin" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-serif font-bold text-[#2B2B2B]">{t('report.page.premium_tab.processing.title')}</h3>
                                            <p className="text-[#4A4A4A]">{t('report.page.premium_tab.processing.subtitle')}</p>
                                        </div>
                                        <div className="text-xs font-mono text-[#5B4B8A] whitespace-pre-wrap max-w-md mx-auto leading-relaxed border-t border-[#E8DDD0] pt-4">
                                            {t('report.page.premium_tab.processing.steps')}
                                        </div>
                                    </div>
                                )}

                                {aiStep === 'result' && aiResult && (
                                    <div className="w-full max-w-4xl bg-white border border-[#E8DDD0] shadow-xl animate-in scale-95 duration-500 rounded-sm">
                                        <div className="bg-[#FDFBF7] p-4 border-b border-[#E8DDD0] flex justify-between items-center">
                                            <div className="flex items-center gap-2 text-[#2B2B2B] font-bold text-sm uppercase tracking-wide">
                                                <Check className="w-4 h-4 text-emerald-600" /> {t('report.page.premium_tab.result.ready')}
                                            </div>
                                            <Button size="sm" variant="ghost" onClick={() => setAiStep('intro')} className="text-[#4A4A4A] hover:text-[#2B2B2B]">
                                                {t('report.page.premium_tab.result.close')}
                                            </Button>
                                        </div>
                                        <div className="p-8 md:p-12 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                            <div className="whitespace-pre-wrap font-serif text-[#2B2B2B] text-sm leading-relaxed">
                                                {aiResult.report}
                                            </div>
                                        </div>
                                        <div className="p-6 bg-[#FAFAFA] border-t border-[#E8DDD0] flex justify-end gap-3">
                                            <Button variant="outline" className="border-[#E8DDD0] bg-white hover:border-[#5B4B8A]" onClick={() => navigator.clipboard.writeText(aiResult.report || "")}>
                                                <Copy className="w-4 h-4 mr-2" /> {t('report.page.premium_tab.result.copy')}
                                            </Button>
                                            <Button className="bg-[#2B2B2B] text-white hover:bg-[#4A4A4A]">
                                                <Download className="w-4 h-4 mr-2" /> {t('report.page.premium_tab.result.download')}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                        */}
                    </Tabs>
                </div>
            </VaultWrapper>
        </div>
    );
}
