"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trainingHubData, TrainingCategory } from "@/data/training-hub";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    ShieldAlert,
    Trophy,
    Award
} from "lucide-react";
import { useProgress } from "@/context/ProgressContext";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function TrainingPage() {
    const { t, loadNamespace } = useLanguage();
    const { getCertificationProgress, isModuleCompleted } = useProgress();
    const router = useRouter();

    useEffect(() => {
        loadNamespace('training');
    }, [loadNamespace]);

    // Only "hub" and "category" states remain. "playing" etc are now navigated away.
    const [view, setView] = useState<'hub' | 'category'>('hub');
    const [selectedCategory, setSelectedCategory] = useState<TrainingCategory | null>(null);

    const certProgress = getCertificationProgress();

    // Helper to navigate to module
    const openModule = (category: TrainingCategory, moduleId: string) => {
        // Special case for "Basic" literacy test which might not be in registry yet or has special path
        // For now, let's treat it as a standard module routed to dynamic page
        if (moduleId === 'basic') {
            // Basic literacy test might still be 'intro' view in old code. 
            // Ideally we migrate it too. For now let's route it and see if Registry handles it (it doesn't yet).
            // If not in registry, the dynamic page shows "Not Implemented".
            // We'll trust the registry will be updated or we handle it here.
        }

        router.push(`/valmennus/${category.id}/${moduleId}`);
    };

    return (
        <div className="min-h-screen bg-suojasiipi-bg pb-20">
            {/* Navigation Header */}
            <div className="bg-white border-b border-suojasiipi-secondary sticky top-0 z-10 px-4 py-4 md:px-8 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    {view !== 'hub' && (
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setView('hub');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="mr-2"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {t('training.coaching.back') || 'Back'}
                        </Button>
                    )}
                    <h1 className="text-xl font-serif font-bold text-suojasiipi-text-main">
                        {view === 'hub' ? (t('training.coaching.title') || 'Training') : (selectedCategory ? (t(`training.coaching.categories.${selectedCategory.id}.title`) || selectedCategory.title) : (t('training.coaching.category_title') || 'Category'))}
                    </h1>
                </div>
                {view === 'hub' && (
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="hidden md:flex gap-1 border-emerald-200 bg-emerald-50 text-emerald-700">
                            <Trophy className="w-3 h-3" />
                            {certProgress.completed}/{certProgress.total} {t('training.coaching.stats') || 'Certificates'}
                        </Badge>
                    </div>
                )}
            </div>

            <div className="max-w-5xl mx-auto px-4 py-8 md:px-8">
                <AnimatePresence mode="wait">
                    {/* HUB VIEW */}
                    {view === 'hub' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <div className="text-center space-y-4 mb-12">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                                    {t('training.coaching.hub.title') || 'Where are you at?'}
                                </h2>
                                <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                                    {t('training.coaching.hub.subtitle') || 'Choose the path that suits your situation.'}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {trainingHubData.map((category) => (
                                    <motion.button
                                        key={category.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            setSelectedCategory(category);
                                            setView('category');
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className={cn(
                                            "flex items-center gap-4 md:gap-6 p-5 md:p-8 rounded-[2rem] border transition-all text-left relative overflow-hidden group",
                                            "bg-white border-slate-200 hover:shadow-xl hover:border-slate-300"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shrink-0 transition-colors",
                                            `bg-${category.color}-50 text-${category.color}-600 group-hover:bg-${category.color}-100`
                                        )}>
                                            <category.icon className="w-6 h-6 md:w-8 md:h-8" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight break-words hyphens-auto">{t(`training.coaching.categories.${category.id}.title`)}</h3>
                                            </div>
                                            <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed line-clamp-2 md:line-clamp-none">{t(`training.coaching.categories.${category.id}.desc`)}</p>
                                        </div>
                                        <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* CATEGORY VIEW */}
                    {view === 'category' && selectedCategory && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="flex items-start gap-6 mb-8">
                                <div className={cn(
                                    "w-20 h-20 rounded-[2rem] flex items-center justify-center shrink-0 shadow-sm",
                                    `bg-${selectedCategory.color}-50 text-${selectedCategory.color}-600`
                                )}>
                                    <selectedCategory.icon className="w-10 h-10" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-2">{t(`training.coaching.categories.${selectedCategory.id}.title`)}</h2>
                                    <p className="text-lg text-slate-500 max-w-2xl">{t(`training.coaching.categories.${selectedCategory.id}.desc`)}</p>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                {selectedCategory.modules.map((module, index) => {
                                    const isCompleted = isModuleCompleted(module.id);
                                    return (
                                        <motion.div
                                            key={module.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <button
                                                onClick={() => openModule(selectedCategory, module.id)}
                                                disabled={module.isLocked}
                                                className={cn(
                                                    "w-full flex items-center gap-6 p-6 rounded-[2rem] border transition-all text-left group",
                                                    isCompleted
                                                        ? "bg-emerald-50/50 border-emerald-100"
                                                        : module.isLocked
                                                            ? "bg-slate-50 border-slate-100 opacity-70 cursor-not-allowed"
                                                            : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border-2",
                                                    isCompleted
                                                        ? "bg-emerald-100 border-emerald-200 text-emerald-600"
                                                        : module.isLocked
                                                            ? "bg-slate-100 border-slate-200 text-slate-400"
                                                            : "bg-white border-slate-100 text-slate-400 group-hover:border-slate-300 group-hover:text-slate-600"
                                                )}>
                                                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : module.isLocked ? <ShieldAlert className="w-6 h-6" /> : <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-slate-400" />}
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h3 className={cn(
                                                            "text-lg font-bold uppercase tracking-tight",
                                                            isCompleted ? "text-emerald-900" : "text-slate-900"
                                                        )}>
                                                            {t(`training.coaching.categories.${selectedCategory.id}.modules.${module.id}.title`)}
                                                        </h3>
                                                        {module.isNew && !isCompleted && (
                                                            <Badge className="bg-rose-500 hover:bg-rose-600 text-white border-none text-[10px] px-2 py-0.5">{t('training.coaching.ui.new')}</Badge>
                                                        )}
                                                        {module.isCertificationModule && (
                                                            <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50 text-[10px] px-2 py-0.5 gap-1">
                                                                <Award className="w-3 h-3" />
                                                                {t('training.coaching.ui.cert')}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-slate-500 font-medium">{t(`training.coaching.categories.${selectedCategory.id}.modules.${module.id}.desc`)}</p>
                                                </div>

                                                {module.isLocked ? (
                                                    <div className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                        {t('training.coaching.ui.locked')}
                                                    </div>
                                                ) : (
                                                    <ArrowRight className={cn(
                                                        "w-5 h-5 transition-transform",
                                                        isCompleted ? "text-emerald-300" : "text-slate-300 group-hover:translate-x-1 group-hover:text-slate-600"
                                                    )} />
                                                )}
                                            </button>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
