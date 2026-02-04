"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, AlertTriangle, Target, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { useTranslation } from "@/hooks/useTranslation";

export default function RSDHubPage() {
    const { t } = useTranslation('rsd');
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
                    <span className="text-[11px] font-mono text-rose-600 uppercase tracking-widest border-b border-rose-600 pb-1 inline-block">
                        {t('rsd.hub.mini_title')}
                    </span>

                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#2B2B2B] leading-tight">
                        {t('rsd.hub.title')}
                    </h1>

                    <p className="text-xl text-[#4A4A4A] max-w-2xl mx-auto leading-relaxed font-serif italic">
                        {t('rsd.hub.quote')}
                    </p>

                    <Alert className="bg-rose-50 border-rose-200 max-w-2xl mx-auto">
                        <Heart className="h-4 w-4 text-rose-600" />
                        <AlertDescription className="text-sm">
                            {t('rsd.hub.safety_note')}
                        </AlertDescription>
                    </Alert>
                </div>

                {/* WHAT IS RSD? */}
                <section className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-white border-rose-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
                                    <Brain className="w-6 h-6" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl">{t('rsd.hub.what.title')}</CardTitle>
                                    <CardDescription>{t('rsd.hub.what.subtitle')}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {t('rsd.hub.what.definition')}
                            </p>
                            <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
                                <p className="text-xs font-mono text-rose-800">
                                    ✓ {t('rsd.hub.what.stat1')}
                                </p>
                                <p className="text-xs font-mono text-rose-800 mt-1">
                                    ✓ {t('rsd.hub.what.stat2')}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl">{t('rsd.hub.workplace.title')}</CardTitle>
                                    <CardDescription>{t('rsd.hub.workplace.subtitle')}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div className="flex gap-2">
                                <span className="text-2xl">💼</span>
                                <p className="text-slate-600">{t('rsd.hub.workplace.fear_feedback')}</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-2xl">🎯</span>
                                <p className="text-slate-600">{t('rsd.hub.workplace.perfection')}</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-2xl">😰</span>
                                <p className="text-slate-600">{t('rsd.hub.workplace.catastrophic')}</p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* INTERACTIVE SCENARIO DEMO */}
                <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-serif font-bold text-slate-800">
                            {t('rsd.hub.scenario.title')}
                        </h2>
                        <p className="text-sm text-slate-600 mt-2">
                            {t('rsd.hub.scenario.instruction')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* RSD Interpretation */}
                        <div className="p-6 border-2 border-rose-200 bg-rose-50/30 rounded-xl">
                            <Badge className="mb-3 bg-rose-600">RSD-suodatin</Badge>
                            <p className="text-sm font-medium text-slate-700 mb-3">
                                "Esimies ei vastannut Teamsissa 15 minuuttiin"
                            </p>
                            <div className="space-y-2 text-xs text-slate-600">
                                <p>💭 <em>"Hän vihaa minua"</em></p>
                                <p>💭 <em>"Olen tehnyt jotain väärin"</em></p>
                                <p>💭 <em>"Minut irtisanotaan"</em></p>
                                <p className="text-rose-600 font-bold mt-3">Tunne: Paniikki 9/10</p>
                            </div>
                        </div>

                        {/* Neutral Interpretation */}
                        <div className="p-6 border-2 border-emerald-200 bg-emerald-50/30 rounded-xl">
                            <Badge className="mb-3 bg-emerald-600">Neutraali näkökulma</Badge>
                            <p className="text-sm font-medium text-slate-700 mb-3">
                                "Esimies ei vastannut Teamsissa 15 minuuttiin"
                            </p>
                            <div className="space-y-2 text-xs text-slate-600">
                                <p>📊 <em>"Hän on kokouksessa"</em></p>
                                <p>📊 <em>"Kiire päällä"</em></p>
                                <p>📊 <em>"Näki viestin, vastaa myöhemmin"</em></p>
                                <p className="text-emerald-600 font-bold mt-3">Tunne: Neutraali 3/10</p>
                            </div>
                        </div>
                    </div>

                    <Alert className="mt-6 bg-blue-50 border-blue-200">
                        <AlertDescription className="text-sm">
                            💡 {t('rsd.hub.scenario.insight')}
                        </AlertDescription>
                    </Alert>
                </section>

                {/* TOOLBOX NAVIGATION */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-serif font-bold text-slate-800 text-center">
                        {t('rsd.hub.tools.title')}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Tulkintasuodatin */}
                        <Link href="/neuromoninaisuus/rsd/tulkinta">
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-violet-100 h-full">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <Target className="w-8 h-8 text-violet-600" />
                                        <div>
                                            <CardTitle className="text-lg">{t('rsd.hub.tools.interpretation.title')}</CardTitle>
                                            <CardDescription>{t('rsd.hub.tools.interpretation.desc')}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Badge className="bg-violet-100 text-violet-700">Akuuttiapu</Badge>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* Meltdown-protokollat */}
                        <Link href="/neuromoninaisuus/rsd/meltdown">
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-amber-100 h-full">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <AlertTriangle className="w-8 h-8 text-amber-600" />
                                        <div>
                                            <CardTitle className="text-lg">{t('rsd.hub.tools.meltdown.title')}</CardTitle>
                                            <CardDescription>{t('rsd.hub.tools.meltdown.desc')}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Badge className="bg-amber-100 text-amber-700">Ennaltaehkäisy</Badge>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* Drama Filter */}
                        <Link href="/neuromoninaisuus/rsd/draama">
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-rose-100 h-full">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <Brain className="w-8 h-8 text-rose-600" />
                                        <div>
                                            <CardTitle className="text-lg">{t('rsd.hub.tools.drama.title')}</CardTitle>
                                            <CardDescription>{t('rsd.hub.tools.drama.desc')}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Badge className="bg-rose-100 text-rose-700">Tunnistaminen</Badge>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* Strategiat */}
                        <Link href="/neuromoninaisuus/rsd/strategiat">
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-emerald-100 h-full">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                                        <div>
                                            <CardTitle className="text-lg">{t('rsd.hub.tools.strategies.title')}</CardTitle>
                                            <CardDescription>{t('rsd.hub.tools.strategies.desc')}</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Badge className="bg-emerald-100 text-emerald-700">Selviytyminen</Badge>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </section>

                {/* COMPLETION */}
                <div className="text-center space-y-4">
                    {!isCompleted ? (
                        <Button
                            onClick={handleComplete}
                            size="lg"
                            className="bg-gradient-to-r from-rose-600 to-violet-600 hover:from-rose-700 hover:to-violet-700 text-white font-bold px-8 py-6 text-base"
                        >
                            {t('rsd.hub.complete_btn')}
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    ) : (
                        <Alert className="bg-emerald-50 border-emerald-200 max-w-2xl mx-auto">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            <AlertDescription>
                                ✓ {t('rsd.hub.completed')}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>

            </div>
        </div>
    );
}
