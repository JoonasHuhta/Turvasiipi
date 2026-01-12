"use client";

import { useState, useEffect, useMemo } from "react";
import { useSecureLocalStorage } from "@/hooks/useSecureLocalStorage";
import { VaultWrapper } from "@/components/VaultWrapper";
import { TimelineEvent } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, BarChart3 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
    filterEventsByTimeRange,
    calculateStats,
    generateSmartInsights,
    getTacticDistribution,
    getIntensityTrend,
    TimeRange
} from "@/lib/overviewAnalysis";
import { cn } from "@/lib/utils";
import { SmartInsights } from "@/components/SmartInsights";
import { TacticDistribution } from "@/components/TacticDistribution";
import { IntensityTrend } from "@/components/IntensityTrend";

export default function OverviewPage() {
    const { t } = useLanguage();
    const { data: events, isLocked, hasData, unlock } = useSecureLocalStorage<TimelineEvent[]>("suojasiipi_events_secure", []);
    const [mounted, setMounted] = useState(false);
    const [timeRange, setTimeRange] = useState<TimeRange>('30d');

    useEffect(() => {
        setMounted(true);
    }, []);

    // Filter events by selected time range
    const filteredEvents = useMemo(() =>
        filterEventsByTimeRange(events, timeRange),
        [events, timeRange]
    );

    // Calculate statistics
    const stats = useMemo(() =>
        calculateStats(filteredEvents),
        [filteredEvents]
    );

    // Generate smart insights
    const insights = useMemo(() =>
        generateSmartInsights(filteredEvents),
        [filteredEvents]
    );

    // Get tactic distribution
    const tacticData = useMemo(() =>
        getTacticDistribution(filteredEvents),
        [filteredEvents]
    );

    // Get intensity trend
    const trendData = useMemo(() =>
        getIntensityTrend(filteredEvents),
        [filteredEvents]
    );

    if (!mounted) return <div className="p-10 text-center animate-pulse">{t('overview.loading')}</div>;

    return (
        <div className="w-full max-w-7xl mx-auto px-6 pb-20">
            <VaultWrapper isLocked={isLocked} hasData={hasData} onUnlock={unlock}>
                <div className="space-y-6 animate-in fade-in duration-500">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
                                <BarChart3 className="w-8 h-8 text-indigo-600" />
                                {t('overview.title')}
                            </h1>
                            <p className="text-slate-500 mt-1">
                                {t('overview.subtitle')}
                            </p>
                        </div>
                        <Button variant="outline" className="gap-2">
                            <Download className="w-4 h-4" />
                            {t('overview.download_pdf')}
                        </Button>
                    </div>

                    {/* Time Range Selector */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-medium text-slate-700 mr-2">
                                    {t('overview.time_range.label')}
                                </span>
                                {(['7d', '30d', '3mo', 'all'] as TimeRange[]).map((range) => (
                                    <Button
                                        key={range}
                                        variant={timeRange === range ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setTimeRange(range)}
                                        className={cn(
                                            timeRange === range && "bg-indigo-600 hover:bg-indigo-700"
                                        )}
                                    >
                                        {t(`overview.time_range.${range}`)}
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Total Events */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-slate-500">
                                    {t('overview.stats.events')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-slate-900">
                                    {stats.totalEvents}
                                </div>
                                <p className="text-xs text-slate-500 mt-1">
                                    {t('overview.stats.events_desc')}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Duration */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-slate-500">
                                    {t('overview.stats.duration')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-slate-900">
                                    {stats.duration}
                                </div>
                                <p className="text-xs text-slate-500 mt-1">
                                    {t('overview.stats.duration_desc')}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Trend */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-slate-500">
                                    {t('overview.stats.trend')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={cn(
                                    "text-3xl font-bold flex items-center gap-2",
                                    stats.trendPercentage > 0 ? "text-red-600" :
                                        stats.trendPercentage < 0 ? "text-green-600" : "text-slate-900"
                                )}>
                                    {stats.trendPercentage > 0 ? '↗' : stats.trendPercentage < 0 ? '↘' : '→'}
                                    {Math.abs(stats.trendPercentage)}%
                                </div>
                                <p className="text-xs text-slate-500 mt-1">
                                    {stats.trendPercentage > 0 ? t('overview.stats.trend_increased') :
                                        stats.trendPercentage < 0 ? t('overview.stats.trend_decreased') : t('overview.stats.trend_stable')}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Average Intensity */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-slate-500">
                                    {t('overview.stats.avg_intensity')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span
                                            key={i}
                                            className={cn(
                                                "w-3 h-3 rounded-full",
                                                i < Math.round(stats.avgIntensity)
                                                    ? "bg-red-500"
                                                    : "bg-slate-200"
                                            )}
                                        />
                                    ))}
                                </div>
                                <p className="text-xs text-slate-500 mt-1">
                                    {stats.avgIntensity.toFixed(1)} / 5.0
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Smart Insights */}
                    {filteredEvents.length > 0 && (
                        <SmartInsights insights={insights} />
                    )}

                    {/* Placeholder for upcoming components */}
                    {filteredEvents.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                                    {t('overview.empty.title')}
                                </h3>
                                <p className="text-slate-500">
                                    {t('overview.empty.desc')}
                                </p>
                            </CardContent>
                        </Card>
                    ) : null}

                    {/* Charts */}
                    {filteredEvents.length > 0 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <TacticDistribution data={tacticData} />
                            <IntensityTrend data={trendData} />
                        </div>
                    )}
                </div>
            </VaultWrapper>
        </div>
    );
}
