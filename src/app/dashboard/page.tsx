"use client";

import React, { useState } from 'react';
import { useProgress, MODULES, BADGES, CategoryId } from '@/context/ProgressContext';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Trophy, Star, Flame, Target, ChevronRight,
    Home, Brain, Wrench, HeartHandshake, Gamepad2,
    Building2, GraduationCap, Sparkles, CheckCircle2, Circle,
    ChevronDown, ChevronUp, Info, Lightbulb, User, Settings, ShieldCheck, Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useSecureLocalStorage } from '@/hooks/useSecureLocalStorage';
import { TimelineEvent } from '@/types';
import { analyzePatterns } from '@/lib/analysis';
import { AlertTriangle, Info as InfoIcon, ArrowRight as ArrowRightIcon } from 'lucide-react';

export default function DashboardPage() {
    const { t } = useLanguage();
    const { progress, getExpertiseLevel, getProgressPercentage, isModuleCompleted } = useProgress();
    const [expandedCategory, setExpandedCategory] = useState<CategoryId | null>('CORE');

    // Fetch events for Insights
    const { data: events } = useSecureLocalStorage<TimelineEvent[]>("suojasiipi_events_secure", []);

    const totalBadges = BADGES.length;
    const earnedBadgesCount = progress.earnedBadgeIds.length;
    const { level, subLevel } = getExpertiseLevel();
    const progressPerc = getProgressPercentage();

    return (
        <div className="container mx-auto px-6 sm:px-8 max-w-screen-lg py-32 space-y-12">

            {/* Header Section - Technical/Neutral */}
            <div className="flex flex-col md:flex-row gap-8 justify-between items-start border-b border-[#E8DDD0] pb-8">
                <div className="space-y-2">
                    <span className="text-[11px] font-mono text-[#4A4A4A] uppercase tracking-widest border border-[#E8DDD0] px-2 py-0.5 rounded-sm inline-flex items-center gap-2">
                        <User className="w-3 h-3" /> {t('dashboard.level')} {level.id}
                    </span>
                    <h1 className="text-3xl font-serif font-bold text-[#2B2B2B]">{t('dashboard.title')}</h1>
                    <p className="text-sm text-[#4A4A4A] font-mono tracking-tight">ID: {progress.completedModuleIds.length > 0 ? 'ACTIVE_USER' : 'NEW_USER'} // STATUS: ONLINE</p>
                </div>

                <div className="flex gap-8 text-right">
                    <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#5B4B8A] mb-1">{t('dashboard.points')}</div>
                        <div className="text-3xl font-mono text-[#2B2B2B]">{progress.points}</div>
                    </div>
                    <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#5B4B8A] mb-1">{t('dashboard.streak')}</div>
                        <div className="text-3xl font-mono text-[#2B2B2B] flex justify-end gap-1">
                            {progress.streak} <Flame className="w-4 h-4 text-[#E8DDD0] mt-2" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-12">

                {/* Left Column - Stats & Settings */}
                <div className="lg:col-span-1 space-y-8 order-2 lg:order-1">

                    {/* Progress Card */}
                    <div className="bg-white border border-[#E8DDD0] p-6 rounded-sm space-y-4">
                        <div className="flex justify-between items-baseline mb-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#2B2B2B]">{t('dashboard.overall_progress')}</span>
                            <span className="font-mono text-xs text-[#5B4B8A]">{progressPerc}%</span>
                        </div>
                        <div className="h-1 bg-[#FDFBF7] border border-[#E8DDD0] w-full">
                            <div className="h-full bg-[#2B2B2B]" style={{ width: `${progressPerc}%` }} />
                        </div>
                        <div className="text-[10px] text-[#4A4A4A] font-mono text-right pt-2 border-t border-[#FAFAFA]">
                            {progress.completedModuleIds.length} / {MODULE_COUNT} modules completed
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="space-y-1">
                        <div className="flex justify-between p-4 bg-[#FDFBF7] border border-[#E8DDD0] text-xs">
                            <span className="font-bold uppercase tracking-wide text-[#4A4A4A]">{t('dashboard.badges_title')}</span>
                            <span className="font-mono text-[#2B2B2B]">{earnedBadgesCount} / {totalBadges}</span>
                        </div>
                        <div className="flex justify-between p-4 bg-[#FDFBF7] border border-[#E8DDD0] text-xs">
                            <span className="font-bold uppercase tracking-wide text-[#4A4A4A]">Rank</span>
                            <span className="font-mono text-[#2B2B2B]">{level.name}</span>
                        </div>
                    </div>

                    <ExpertisePathCard />

                </div>


                {/* Right Column - Modules & Content */}
                <div className="lg:col-span-2 space-y-8 order-1 lg:order-2">

                    <InsightsSection events={events} />

                    <Tabs defaultValue="modules" className="w-full">
                        <TabsList className="w-full bg-transparent border-b border-[#E8DDD0] p-0 mb-8 justify-start h-auto gap-8 rounded-none">
                            <TabsTrigger value="modules" className="px-0 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-[#2B2B2B] data-[state=active]:text-[#2B2B2B] text-[#4A4A4A] font-bold uppercase tracking-widest text-xs bg-transparent shadow-none hover:text-[#2B2B2B]">
                                {t('dashboard.tabs.modules')}
                            </TabsTrigger>
                            <TabsTrigger value="badges" className="px-0 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-[#2B2B2B] data-[state=active]:text-[#2B2B2B] text-[#4A4A4A] font-bold uppercase tracking-widest text-xs bg-transparent shadow-none hover:text-[#2B2B2B]">
                                {t('dashboard.tabs.badges')}
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="modules" className="space-y-4">
                            {categories.map(cat => (
                                <ModuleCategory
                                    key={cat}
                                    category={cat}
                                    expanded={expandedCategory === cat}
                                    onToggle={() => setExpandedCategory(expandedCategory === cat ? null : cat)}
                                />
                            ))}
                        </TabsContent>

                        <TabsContent value="badges">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {BADGES.map(badge => {
                                    const isEarned = progress.earnedBadgeIds.includes(badge.id);
                                    return (
                                        <div key={badge.id} className={cn(
                                            "border p-4 flex flex-col items-center text-center gap-3 transition-opacity",
                                            isEarned ? "border-[#2B2B2B] bg-white opacity-100" : "border-[#E8DDD0] bg-[#FAFAFA] opacity-50 grayscale"
                                        )}>
                                            <div className="text-2xl">{badge.icon}</div>
                                            <div className="space-y-1">
                                                <div className="text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B] leading-tight">{badge.title}</div>
                                                <div className="text-[9px] text-[#4A4A4A] leading-tight">{badge.description}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

// --- SUBCOMPONENTS ---

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

const categories: CategoryId[] = ['CORE', 'AWARENESS', 'TOOLS', 'SUPPORT', 'INTERACTIVE', 'ORGANIZATION', 'LEARNING', 'SPECIAL'];
const MODULE_COUNT = MODULES.length;

function ModuleCategory({ category, expanded, onToggle }: { category: CategoryId, expanded: boolean, onToggle: () => void }) {
    const { t } = useLanguage();
    const { isModuleCompleted } = useProgress();
    const Icon = CATEGORY_ICONS[category];
    const catModules = MODULES.filter(m => m.categoryId === category);
    const completedCount = catModules.filter(m => isModuleCompleted(m.id)).length;
    const isComplete = completedCount === catModules.length && catModules.length > 0;

    return (
        <div className="border border-[#E8DDD0] bg-white rounded-sm overflow-hidden transition-all hover:border-[#5B4B8A]">
            <button onClick={onToggle} className="w-full flex items-center justify-between p-6 hover:bg-[#FAFAFA] transition-colors text-left group">
                <div className="flex items-center gap-4">
                    <Icon className={cn("w-5 h-5 transition-colors", expanded ? "text-[#5B4B8A]" : "text-[#4A4A4A]")} />
                    <div>
                        <h3 className={cn("font-bold text-sm uppercase tracking-wider transition-colors", expanded ? "text-[#2B2B2B]" : "text-[#4A4A4A]")}>
                            {t(`dashboard.categories.${category}`)}
                        </h3>
                        <div className="text-[10px] font-mono text-[#5B4B8A] pt-1">
                            {completedCount}/{catModules.length} REQ
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {isComplete && <CheckCircle2 className="w-4 h-4 text-[#2B2B2B]" />}
                    <div className={cn("transition-transform duration-300", expanded ? "rotate-90" : "rotate-0")}>
                        <ChevronRight className="w-4 h-4 text-[#E8DDD0] group-hover:text-[#5B4B8A]" />
                    </div>
                </div>
            </button>
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden border-t border-[#E8DDD0]"
                    >
                        {catModules.map(module => {
                            const isDone = isModuleCompleted(module.id);
                            return (
                                <Link key={module.id} href={module.path} className="flex items-center justify-between p-4 pl-14 hover:bg-[#FDFBF7] border-b border-[#FAFAFA] last:border-0 group/link transition-colors">
                                    <span className={cn("text-sm font-serif transition-colors", isDone ? "text-[#2B2B2B] line-through decoration-[#E8DDD0]" : "text-[#4A4A4A]")}>{module.title}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-mono text-[#E8DDD0] group-hover/link:text-[#5B4B8A]">+{module.points}PTS</span>
                                        <ArrowRightIcon className="w-3 h-3 text-[#E8DDD0] group-hover/link:text-[#2B2B2B] opacity-0 group-hover/link:opacity-100 transition-all" />
                                    </div>
                                </Link>
                            )
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function ExpertisePathCard() {
    const { getExpertiseLevel } = useProgress();
    const { totalScore, level, subLevel } = getExpertiseLevel();

    return (
        <div className="bg-[#FDFBF7] border border-[#E8DDD0] p-6 rounded-sm space-y-4">
            <div className="flex items-center gap-2 text-[#5B4B8A] font-bold text-xs uppercase tracking-widest mb-4">
                <Activity className="w-4 h-4" /> Performance Metric
            </div>
            <div className="space-y-4">
                <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#4A4A4A] mb-1">Current Designation</div>
                    <div className="text-xl font-serif font-bold text-[#2B2B2B]">{subLevel.title}</div>
                </div>
                <div className="p-4 bg-white border border-[#E8DDD0] text-xs leading-relaxed text-[#4A4A4A] font-mono">
                    {subLevel.feedback}
                </div>
            </div>
        </div>
    );
}

function InsightsSection({ events }: { events: TimelineEvent[] }) {
    const insights = analyzePatterns(events);
    if (insights.length === 0) return null;

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-2 text-[#2B2B2B] font-bold text-xs uppercase tracking-widest border-b border-[#E8DDD0] pb-2">
                <Sparkles className="w-4 h-4" /> System Analysis
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                {insights.map(insight => (
                    <div key={insight.id} className="bg-white border border-[#E8DDD0] p-6 rounded-sm hover:border-[#5B4B8A] transition-colors">
                        <div className="flex items-start gap-4">
                            <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", insight.level === 'warning' ? "bg-red-500" : "bg-[#5B4B8A]")} />
                            <div className="space-y-2">
                                <h4 className="font-bold text-sm text-[#2B2B2B] uppercase tracking-wide">{insight.title}</h4>
                                <p className="text-sm text-[#4A4A4A] leading-relaxed serif">{insight.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
