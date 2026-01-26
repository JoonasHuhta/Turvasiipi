"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield,
    MessageSquare,
    Clock,
    Hand,
    ArrowRight,
    X,
    CheckCircle2,
    Lock,
    Unlock,
    UserCircle2,
    Briefcase
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

// --- TYPES ---
type ViewState = 'intro' | 'categories' | 'script' | 'summary';

interface BoundaryCategory {
    id: string;
    icon: any;
}

// --- COMPONENT ---
export default function BoundariesModule({
    moduleId,
    onComplete,
    onExit
}: {
    moduleId?: string;
    onComplete: (score: number) => void;
    onExit: () => void;
}) {
    const { t } = useLanguage();
    const [view, setView] = useState<ViewState>('intro');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [scriptSteps, setScriptSteps] = useState({
        action: "",
        reason: ""
    });

    // Category icons mapping
    const CATEGORY_ICONS: Record<string, any> = {
        professional: Briefcase,
        emotional: UserCircle2,
        physical: Hand
    };

    const BOUNDARY_CATEGORIES: BoundaryCategory[] = [
        { id: 'professional', icon: Briefcase },
        { id: 'emotional', icon: UserCircle2 },
        { id: 'physical', icon: Hand }
    ];

    const finishModule = () => {
        onComplete(100);
    };

    // Helper to replace template variables
    const formatTemplate = (template: string, vars: Record<string, string>) => {
        let result = template;
        Object.entries(vars).forEach(([key, value]) => {
            result = result.replace(`{{${key}}}`, value || `[${key}]`);
        });
        return result;
    };

    return (
        <div className="relative min-h-[600px] w-full bg-[#FAFAF9] rounded-[2rem] p-4 md:p-8 flex flex-col gap-6 border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C]">

            {/* HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black uppercase tracking-widest text-[#292524]">{t('training.boundaries_module.title')}</h2>
                        <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">{t('training.boundaries_module.subtitle')}</span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onExit} className="hover:bg-[#F5F5F4] text-[#78716C]">
                    <X className="w-5 h-5" />
                </Button>
            </div>

            <div className="flex-1 relative flex flex-col items-center justify-start max-w-4xl mx-auto w-full py-4">
                <AnimatePresence mode="wait">

                    {/* INTRO */}
                    {view === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="text-center space-y-8 max-w-2xl mt-12"
                        >
                            <h1
                                className="text-4xl font-serif font-black text-[#292524]"
                                dangerouslySetInnerHTML={{ __html: t('training.boundaries_module.intro.title') }}
                            />
                            <p
                                className="text-lg text-[#57534E] leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: t('training.boundaries_module.intro.text') }}
                            />
                            <Button onClick={() => setView('categories')} size="lg" className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-8 py-6 text-lg shadow-xl shadow-amber-200/50">
                                {t('training.boundaries_module.intro.action')} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* CATEGORIES */}
                    {view === 'categories' && (
                        <motion.div
                            key="categories"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center">
                                <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">{t('training.boundaries_module.categories_step.badge')}</Badge>
                                <h2 className="text-3xl font-bold mt-2 text-[#292524]">{t('training.boundaries_module.categories_step.title')}</h2>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {BOUNDARY_CATEGORIES.map((cat) => (
                                    <Card
                                        key={cat.id}
                                        className={cn(
                                            "p-6 cursor-pointer transition-all border-[#E7E5E4] flex flex-col h-full",
                                            selectedCategory === cat.id ? "ring-2 ring-amber-500 bg-amber-50/20" : "hover:border-amber-200 hover:bg-white"
                                        )}
                                        onClick={() => setSelectedCategory(cat.id)}
                                    >
                                        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-4">
                                            <cat.icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-bold text-[#292524] mb-2">{t(`training.boundaries_module.categories.${cat.id}.title`)}</h3>
                                        <p className="text-sm text-[#78716C] mb-4 flex-1">{t(`training.boundaries_module.categories.${cat.id}.description`)}</p>

                                        {selectedCategory === cat.id && (
                                            <motion.ul
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-xs space-y-2 text-amber-800 italic border-t border-amber-100 pt-4"
                                            >
                                                {(t(`training.boundaries_module.categories.${cat.id}.examples`, { returnObjects: true }) as string[]).map((ex, i) => (
                                                    <li key={i}>• "{ex}"</li>
                                                ))}
                                            </motion.ul>
                                        )}
                                    </Card>
                                ))}
                            </div>

                            <Button
                                disabled={!selectedCategory}
                                onClick={() => setView('script')}
                                className="w-full py-6 bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-50 rounded-full shadow-xl shadow-amber-200/50"
                            >
                                {t('training.boundaries_module.categories_action')} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* SCRIPT LAB */}
                    {view === 'script' && (
                        <motion.div
                            key="script"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center space-y-4">
                                <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">{t('training.boundaries_module.script_step.badge')}</Badge>
                                <h2 className="text-3xl font-bold">{t('training.boundaries_module.script_step.title')}</h2>
                                <p className="text-[#57534E]">{t('training.boundaries_module.script_step.subtitle')}</p>
                            </div>

                            <Card className="p-8 border-[#E7E5E4] bg-white shadow-inner">
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <label className="text-xs font-black uppercase text-[#A8A29E] tracking-widest">{t('training.boundaries_module.script_form.label_action')}</label>
                                        <input
                                            placeholder={t('training.boundaries_module.script_form.placeholder_action')}
                                            className="w-full p-4 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl focus:ring-2 ring-amber-500 outline-none"
                                            value={scriptSteps.action}
                                            onChange={(e) => setScriptSteps({ ...scriptSteps, action: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs font-black uppercase text-[#A8A29E] tracking-widest">{t('training.boundaries_module.script_form.label_reason')}</label>
                                        <input
                                            placeholder={t('training.boundaries_module.script_form.placeholder_reason')}
                                            className="w-full p-4 bg-[#FAFAF9] border border-[#E7E5E4] rounded-xl focus:ring-2 ring-amber-500 outline-none"
                                            value={scriptSteps.reason}
                                            onChange={(e) => setScriptSteps({ ...scriptSteps, reason: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="mt-12 p-8 bg-amber-50/50 rounded-2xl border border-amber-100 text-center relative overflow-hidden">
                                    <MessageSquare className="absolute -bottom-4 -right-4 w-24 h-24 text-amber-100/50" />
                                    <h4 className="text-xs font-black uppercase text-amber-600 tracking-widest mb-4">{t('training.boundaries_module.script_form.result_title')}</h4>
                                    <p
                                        className="text-xl font-serif text-[#292524] leading-relaxed"
                                        dangerouslySetInnerHTML={{
                                            __html: formatTemplate(
                                                t('training.boundaries_module.script_form.result_template'),
                                                { action: scriptSteps.action, reason: scriptSteps.reason }
                                            )
                                        }}
                                    />
                                </div>
                            </Card>

                            <Button
                                disabled={!scriptSteps.action || !scriptSteps.reason}
                                onClick={() => setView('summary')}
                                className="w-full py-6 bg-amber-600 hover:bg-amber-700 text-white shadow-xl shadow-amber-200/50 disabled:opacity-50 rounded-full"
                            >
                                {t('training.boundaries_module.script_action')} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* SUMMARY */}
                    {view === 'summary' && (
                        <motion.div
                            key="summary"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center space-y-12 max-w-xl mt-12"
                        >
                            <div className="w-24 h-24 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-amber-50/50">
                                <CheckCircle2 className="w-12 h-12" />
                            </div>
                            <div className="space-y-4">
                                <h1 className="text-4xl font-serif font-black text-[#292524]">{t('training.boundaries_module.summary.title')}</h1>
                                <p
                                    className="text-lg text-[#57534E]"
                                    dangerouslySetInnerHTML={{ __html: t('training.boundaries_module.summary.text') }}
                                />
                            </div>

                            <Button onClick={finishModule} size="lg" className="bg-[#292524] hover:bg-[#44403C] text-white rounded-full px-12 py-8 text-xl shadow-xl">
                                {t('training.boundaries_module.summary.action')}
                            </Button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
