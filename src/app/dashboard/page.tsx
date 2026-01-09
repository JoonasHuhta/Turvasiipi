"use client";

import React, { useState } from 'react';
import { useProgress, MODULES, BADGES, CategoryId } from '@/context/ProgressContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Trophy, Star, Flame, Target, ChevronRight,
    Home, Brain, Wrench, HeartHandshake, Gamepad2,
    Building2, GraduationCap, Sparkles, CheckCircle2, Circle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const CATEGORY_ICONS: Record<CategoryId, any> = {
    CORE: Home,
    AWARENESS: Brain,
    TOOLS: Wrench,
    SUPPORT: HeartHandshake,
    INTERACTIVE: Gamepad2,
    ORGANIZATION: Building2,
    LEARNING: GraduationCap,
    SPECIAL: Sparkles
};

export default function DashboardPage() {
    const { t } = useLanguage();
    const { progress, getLevel, getProgressPercentage, isModuleCompleted } = useProgress();
    const [expandedCategory, setExpandedCategory] = useState<CategoryId | null>('CORE');

    const totalBadges = BADGES.length;
    const earnedBadgesCount = progress.earnedBadgeIds.length;
    const level = getLevel();
    const progressPerc = getProgressPercentage();

    const categories: CategoryId[] = ['CORE', 'AWARENESS', 'TOOLS', 'SUPPORT', 'INTERACTIVE', 'ORGANIZATION', 'LEARNING', 'SPECIAL'];

    return (
        <div className="min-h-screen bg-slate-50 py-6 md:py-12 px-4">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* --- HEADER DASHBOARD --- */}
                <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/20 overflow-hidden">
                    <div className="bg-slate-900 p-8 md:p-12 text-white relative">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full -mr-20 -mt-20" />

                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div className="space-y-2">
                                <h1 className="text-3xl md:text-4xl font-black tracking-tight">{t('dashboard.title')}</h1>
                                <p className="text-slate-400 font-medium">{t('dashboard.subtitle')}</p>
                            </div>

                            <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full md:w-auto">
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/10 text-center">
                                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{t('dashboard.level')}</div>
                                    <div className="text-2xl sm:text-3xl font-black text-indigo-400">{level}</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/10 text-center">
                                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{t('dashboard.points')}</div>
                                    <div className="text-2xl sm:text-3xl font-black text-emerald-400">{progress.points}</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/10 text-center">
                                    <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{t('dashboard.streak')}</div>
                                    <div className="text-2xl sm:text-3xl font-black text-orange-400 flex items-center justify-center gap-1">
                                        {progress.streak} <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 md:mt-12 space-y-4">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-2">
                                <span className="text-[10px] sm:text-sm font-bold uppercase tracking-widest text-slate-400">{t('dashboard.overall_progress')}: {progressPerc}%</span>
                                <span className="text-xs sm:text-sm font-bold text-white leading-none">{progress.completedModuleIds.length} / {MODULE_COUNT} {t('dashboard.completed')}</span>
                            </div>
                            <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPerc}%` }}
                                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-200/60">
                        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                                    <Trophy className="w-6 h-6" />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{t('dashboard.badges_title')}</div>
                                    <div className="text-sm sm:text-lg font-bold text-slate-900 truncate">{earnedBadgesCount} / {totalBadges} {t('dashboard.badges_earned')}</div>
                                </div>
                            </div>
                            <div className="md:col-span-2 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                    <Target className="w-6 h-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{t('dashboard.next_step')}</div>
                                    <Link href="/tietovisa" className="text-sm sm:text-base font-bold text-slate-700 hover:text-indigo-600 transition-colors flex items-center gap-2 group">
                                        <span className="truncate">{t('dashboard.next_step_action')}</span> <ChevronRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="modules" className="w-full">
                    <TabsList className="bg-white border p-1 rounded-2xl mb-8 w-full sm:w-auto h-auto flex flex-wrap gap-1">
                        <TabsTrigger value="modules" className="flex-1 sm:flex-none rounded-xl px-4 md:px-8 py-3 font-bold">{t('dashboard.tabs.modules')}</TabsTrigger>
                        <TabsTrigger value="badges" className="flex-1 sm:flex-none rounded-xl px-4 md:px-8 py-3 font-bold">{t('dashboard.tabs.badges')}</TabsTrigger>
                        <TabsTrigger value="stats" className="flex-1 sm:flex-none rounded-xl px-4 md:px-8 py-3 font-bold">{t('dashboard.tabs.stats')}</TabsTrigger>
                    </TabsList>

                    {/* --- MODULES TAB --- */}
                    <TabsContent value="modules" className="space-y-4">
                        {categories.map(cat => {
                            const Icon = CATEGORY_ICONS[cat];
                            const catModules = MODULES.filter(m => m.categoryId === cat);
                            const completedCount = catModules.filter(m => isModuleCompleted(m.id)).length;
                            const isExpanded = expandedCategory === cat;

                            return (
                                <div key={cat} className="group">
                                    <button
                                        onClick={() => setExpandedCategory(isExpanded ? null : cat)}
                                        className={cn(
                                            "w-full flex items-center justify-between p-6 bg-white border border-slate-200 rounded-3xl transition-all hover:shadow-md",
                                            isExpanded && "rounded-b-none border-b-transparent ring-1 ring-slate-200"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                                                isExpanded ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
                                            )}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">{t(`dashboard.categories.${cat}`)}</h3>
                                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                    {completedCount} / {catModules.length} {t('dashboard.completed')}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {completedCount === catModules.length && (
                                                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 uppercase font-black text-[10px]">{t('dashboard.completed')}</Badge>
                                            )}
                                            <ChevronRight className={cn("w-5 h-5 text-slate-400 transition-transform", isExpanded && "rotate-90")} />
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden bg-white border-x border-b border-slate-200 rounded-b-3xl shadow-lg"
                                            >
                                                <div className="p-2 space-y-1">
                                                    {catModules.map(module => {
                                                        const isDone = isModuleCompleted(module.id);
                                                        return (
                                                            <Link
                                                                key={module.id}
                                                                href={module.path}
                                                                className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors group/item"
                                                            >
                                                                <div className="flex items-center gap-4">
                                                                    {isDone ? (
                                                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                                                    ) : (
                                                                        <Circle className="w-5 h-5 text-slate-200 shrink-0" />
                                                                    )}
                                                                    <span className={cn(
                                                                        "font-bold transition-colors",
                                                                        isDone ? "text-slate-900" : "text-slate-400 group-hover/item:text-slate-600"
                                                                    )}>
                                                                        {module.title}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-4">
                                                                    <span className="text-xs font-bold text-slate-400">+{module.points} pts</span>
                                                                    <ChevronRight className="w-4 h-4 text-slate-300 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                                                                </div>
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </TabsContent>

                    {/* --- BADGES TAB --- */}
                    <TabsContent value="badges">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {BADGES.map(badge => {
                                const isEarned = progress.earnedBadgeIds.includes(badge.id);
                                return (
                                    <Card key={badge.id} className={cn(
                                        "relative border-2 transition-all p-4 text-center space-y-3 group",
                                        isEarned ? "border-indigo-100 bg-white" : "border-slate-100 bg-slate-50 grayscale opacity-70"
                                    )}>
                                        <div className={cn(
                                            "w-16 h-16 mx-auto rounded-3xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110",
                                            isEarned ? "bg-indigo-50 shadow-sm" : "bg-slate-200"
                                        )}>
                                            {badge.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black uppercase tracking-tighter text-slate-900 leading-tight h-8 flex items-center justify-center">
                                                {badge.title}
                                            </h4>
                                            <p className="text-[10px] text-slate-500 leading-tight mt-1">
                                                {isEarned ? badge.description : t('dashboard.locked')}
                                            </p>
                                        </div>
                                        {!isEarned && (
                                            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                                                <Badge variant="secondary" className="bg-slate-900 text-white font-bold text-[9px] uppercase tracking-widest">{t('dashboard.locked')}</Badge>
                                            </div>
                                        )}
                                    </Card>
                                );
                            })}
                        </div>
                    </TabsContent>

                    <TabsContent value="stats">
                        <Card className="rounded-3xl border-slate-200 p-8">
                            <h3 className="text-xl font-bold mb-6">{t('dashboard.stats_title')}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <StatItem label={t('dashboard.tabs.modules')} value={progress.completedModuleIds.length} total={MODULE_COUNT} color="text-indigo-600" />
                                    <StatItem label={t('dashboard.tabs.badges')} value={progress.earnedBadgeIds.length} total={totalBadges} color="text-emerald-600" />
                                    <StatItem label={t('dashboard.points_label')} value={progress.points} color="text-blue-600" />
                                </div>
                                <div className="space-y-6">
                                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                        <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-widest text-xs">{t('dashboard.streak')}</h4>
                                        <div className="flex items-center gap-4">
                                            <div className="text-5xl font-black text-orange-500">{progress.streak}</div>
                                            <div className="space-y-1">
                                                <div className="text-sm font-bold text-slate-700">{t('dashboard.days_streak')}</div>
                                                <p className="text-xs text-slate-500">{t('dashboard.streak_desc')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

function StatItem({ label, value, total, color }: { label: string, value: number, total?: number, color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-end">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</span>
                <span className={cn("text-xl font-black", color)}>
                    {value}{total ? <span className="text-slate-300 text-sm ml-1">/ {total}</span> : ''}
                </span>
            </div>
            {total && <Progress value={(value / total) * 100} className="h-2 rounded-full" />}
        </div>
    );
}

const MODULE_COUNT = MODULES.length;
