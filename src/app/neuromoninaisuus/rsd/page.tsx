"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, AlertTriangle, Target, ArrowRight, CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect } from "react";

export default function RSDHubPage() {
    const { t, loadNamespace } = useLanguage();

    useEffect(() => {
        loadNamespace('rsd');
    }, [loadNamespace]);

    const { completeModule, isModuleCompleted } = useProgress();
    const isCompleted = isModuleCompleted('rsd_intro');

    const handleComplete = () => {
        completeModule('rsd_intro');
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 animate-in fade-in duration-500">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* HERO SECTION */}
                <div className="text-center space-y-6">
                    <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border-b border-[#5B4B8A] pb-1 inline-block">
                        {t('rsd.hub.mini_title')}
                    </span>

                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#2B2B2B] tracking-tight leading-tight">
                        {t('rsd.hub.title')}
                    </h1>

                    <p className="text-xl text-[#4A4A4A] max-w-2xl mx-auto leading-relaxed font-serif italic">
                        {t('rsd.hub.quote')}
                    </p>

                    <Alert className="bg-[#FFF5F5] border border-[#FED7D7] max-w-2xl mx-auto">
                        <Heart className="h-4 w-4 text-[#C53030]" />
                        <AlertDescription className="text-sm text-[#4A4A4A]">
                            {t('rsd.hub.safety_note')}
                        </AlertDescription>
                    </Alert>
                </div>

                {/* WHAT IS RSD? */}
                <section className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-white border-[#E8DDD0] shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="p-3 bg-[#FDFBF7] text-[#5B4B8A] rounded-xl border border-[#E8DDD0]">
                                <Brain className="w-8 h-8" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-serif">{t('rsd.hub.what.title')}</CardTitle>
                                <CardDescription className="text-[#5B4B8A] font-mono text-[10px] uppercase tracking-wider">
                                    {t('rsd.hub.what.subtitle')}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-[#4A4A4A] leading-relaxed">
                                {t('rsd.hub.what.definition')}
                            </p>
                            <div className="bg-[#FDFBF7] p-4 rounded-lg border border-[#E8DDD0]">
                                <p className="text-xs font-mono text-[#5B4B8A]">
                                    ✓ {t('rsd.hub.what.stat1')}
                                </p>
                                <p className="text-xs font-mono text-[#5B4B8A] mt-1">
                                    ✓ {t('rsd.hub.what.stat2')}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-[#E8DDD0] shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="p-3 bg-amber-50 text-amber-700 rounded-xl border border-amber-200">
                                <AlertTriangle className="w-8 h-8" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-serif">{t('rsd.hub.workplace.title')}</CardTitle>
                                <CardDescription className="text-amber-700 font-mono text-[10px] uppercase tracking-wider">
                                    {t('rsd.hub.workplace.subtitle')}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div className="flex gap-2">
                                <span className="text-2xl">💼</span>
                                <p className="text-[#4A4A4A] leading-relaxed">{t('rsd.hub.workplace.fear_feedback')}</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-2xl">🎯</span>
                                <p className="text-[#4A4A4A] leading-relaxed">{t('rsd.hub.workplace.perfection')}</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-2xl">😰</span>
                                <p className="text-[#4A4A4A] leading-relaxed">{t('rsd.hub.workplace.catastrophic')}</p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* INTERACTIVE SCENARIO DEMO */}
                <section className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-[#E8DDD0] shadow-sm">
                    <div className="text-center mb-8 space-y-3">
                        <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border-b border-[#5B4B8A] pb-1 inline-block">
                            Esimerkki
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2B2B2B] leading-tight">
                            {t('rsd.hub.scenario.title')}
                        </h2>
                        <p className="text-sm text-[#4A4A4A] max-w-xl mx-auto">
                            {t('rsd.hub.scenario.instruction')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* RSD Interpretation */}
                        <div className="p-6 border-2 border-[#FED7D7] bg-[#FFF5F5] rounded-2xl">
                            <Badge className="mb-3 bg-[#C53030] text-white font-mono text-[10px] uppercase tracking-wider">
                                RSD-suodatin
                            </Badge>
                            <p className="text-sm font-medium text-[#2B2B2B] mb-4 font-serif">
                                "Esimies ei vastannut Teamsissa 15 minuuttiin"
                            </p>
                            <div className="space-y-2 text-xs text-[#4A4A4A]">
                                <p>💭 <em>"Hän vihaa minua"</em></p>
                                <p>💭 <em>"Olen tehnyt jotain väärin"</em></p>
                                <p>💭 <em>"Minut irtisanotaan"</em></p>
                                <p className="text-[#C53030] font-bold mt-4 font-mono">Tunne: Paniikki 9/10</p>
                            </div>
                        </div>

                        {/* Neutral Interpretation */}
                        <div className="p-6 border-2 border-emerald-200 bg-emerald-50 rounded-2xl">
                            <Badge className="mb-3 bg-emerald-700 text-white font-mono text-[10px] uppercase tracking-wider">
                                Neutraali näkökulma
                            </Badge>
                            <p className="text-sm font-medium text-[#2B2B2B] mb-4 font-serif">
                                "Esimies ei vastannut Teamsissa 15 minuuttiin"
                            </p>
                            <div className="space-y-2 text-xs text-[#4A4A4A]">
                                <p>📊 <em>"Hän on kokouksessa"</em></p>
                                <p>📊 <em>"Kiire päällä"</em></p>
                                <p>📊 <em>"Näki viestin, vastaa myöhemmin"</em></p>
                                <p className="text-emerald-700 font-bold mt-4 font-mono">Tunne: Neutraali 3/10</p>
                            </div>
                        </div>
                    </div>

                    <Alert className="mt-8 bg-blue-50 border border-blue-200">
                        <AlertDescription className="text-sm text-[#4A4A4A]">
                            💡 {t('rsd.hub.scenario.insight')}
                        </AlertDescription>
                    </Alert>
                </section>

                {/* TOOLBOX NAVIGATION */}
                <section className="space-y-6">
                    <div className="text-center space-y-3">
                        <span className="text-[11px] font-mono text-[#5B4B8A] uppercase tracking-widest border-b border-[#5B4B8A] pb-1 inline-block">
                            Työkalut
                        </span>
                        <h2 className="text-3xl font-serif font-bold text-[#2B2B2B]">
                            {t('rsd.hub.tools.title')}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Tulkintasuodatin */}
                        <Link href="/neuromoninaisuus/rsd/tulkinta">
                            <Card className="bg-white border-[#E8DDD0] shadow-sm hover:shadow-lg transition-all cursor-pointer h-full">
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <div className="p-3 bg-violet-50 text-violet-700 rounded-xl border border-violet-200">
                                        <Target className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg font-serif">{t('rsd.hub.tools.interpretation.title')}</CardTitle>
                                        <CardDescription className="text-[#5B4B8A] font-mono text-[10px] uppercase">
                                            {t('rsd.hub.tools.interpretation.desc')}
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Badge className="bg-violet-100 text-violet-800 font-mono text-[9px] uppercase">
                                        Akuuttiapu
                                    </Badge>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* Meltdown-protokollat */}
                        <Link href="/neuromoninaisuus/rsd/meltdown">
                            <Card className="bg-white border-[#E8DDD0] shadow-sm hover:shadow-lg transition-all cursor-pointer h-full">
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <div className="p-3 bg-amber-50 text-amber-700 rounded-xl border border-amber-200">
                                        <AlertTriangle className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg font-serif">{t('rsd.hub.tools.meltdown.title')}</CardTitle>
                                        <CardDescription className="text-[#5B4B8A] font-mono text-[10px] uppercase">
                                            {t('rsd.hub.tools.meltdown.desc')}
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Badge className="bg-amber-100 text-amber-800 font-mono text-[9px] uppercase">
                                        Ennaltaehkäisy
                                    </Badge>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* Drama Filter */}
                        <Link href="/neuromoninaisuus/rsd/draama">
                            <Card className="bg-white border-[#E8DDD0] shadow-sm hover:shadow-lg transition-all cursor-pointer h-full">
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <div className="p-3 bg-rose-50 text-rose-700 rounded-xl border border-rose-200">
                                        <Brain className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg font-serif">{t('rsd.hub.tools.drama.title')}</CardTitle>
                                        <CardDescription className="text-[#5B4B8A] font-mono text-[10px] uppercase">
                                            {t('rsd.hub.tools.drama.desc')}
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Badge className="bg-rose-100 text-rose-800 font-mono text-[9px] uppercase">
                                        Tunnistaminen
                                    </Badge>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* Strategiat */}
                        <Link href="/neuromoninaisuus/rsd/strategiat">
                            <Card className="bg-white border-[#E8DDD0] shadow-sm hover:shadow-lg transition-all cursor-pointer h-full">
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200">
                                        <CheckCircle2 className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg font-serif">{t('rsd.hub.tools.strategies.title')}</CardTitle>
                                        <CardDescription className="text-[#5B4B8A] font-mono text-[10px] uppercase">
                                            {t('rsd.hub.tools.strategies.desc')}
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Badge className="bg-emerald-100 text-emerald-800 font-mono text-[9px] uppercase">
                                        Selviytyminen
                                    </Badge>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </section>

                {/* COMPLETION */}
                <div className="text-center space-y-4 pt-8">
                    {!isCompleted ? (
                        <Button
                            onClick={handleComplete}
                            size="lg"
                            className="bg-[#5B4B8A] hover:bg-[#4A3A72] text-white font-bold uppercase tracking-wider px-12 py-6 rounded-2xl shadow-md hover:shadow-lg transition-all text-base"
                        >
                            {t('rsd.hub.complete_btn')}
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    ) : (
                        <Alert className="bg-emerald-50 border border-emerald-200 max-w-2xl mx-auto">
                            <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                            <AlertDescription className="text-sm text-emerald-800 font-medium">
                                ✓ {t('rsd.hub.completed')}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>

            </div>
        </div>
    );
}
