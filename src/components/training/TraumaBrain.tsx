"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain,
    ShieldAlert,
    Sparkles,
    Zap,
    ZapOff,
    ArrowRight,
    X,
    MessageSquareQuote,
    RefreshCw,
    Activity
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

// --- TYPES ---
type ViewState = 'intro' | 'anatomy' | 'hijack' | 'repair' | 'summary';

// --- COMPONENT ---
export default function TraumaBrain({
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
    const [amygdalaActive, setAmygdalaActive] = useState(true);

    const finishModule = () => {
        onComplete(100);
    };

    return (
        <div className="relative min-h-[600px] w-full bg-[#FAFAF9] rounded-[2rem] p-4 md:p-8 flex flex-col gap-6 border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C]">

            {/* HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
                        <Brain className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black uppercase tracking-widest text-[#292524]">{t('training.trauma_brain.title')}</h2>
                        <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">{t('training.trauma_brain.subtitle')}</span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onExit} className="hover:bg-[#F5F5F4] text-[#78716C]">
                    <X className="w-5 h-5" />
                </Button>
            </div>

            <div className="flex-1 relative flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
                <AnimatePresence mode="wait">

                    {/* INTRO */}
                    {view === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="text-center space-y-8 max-w-2xl"
                        >
                            <h1
                                className="text-4xl font-serif font-black text-[#292524]"
                                dangerouslySetInnerHTML={{ __html: t('training.trauma_brain.intro.title') }}
                            />
                            <p
                                className="text-lg text-[#57534E] leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: t('training.trauma_brain.intro.text') }}
                            />
                            <Button onClick={() => setView('anatomy')} size="lg" className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-6 text-lg shadow-lg">
                                {t('training.trauma_brain.intro.action')} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* ANATOMY / THE PLAYERS */}
                    {view === 'anatomy' && (
                        <motion.div
                            key="anatomy"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center">
                                <Badge variant="outline" className="text-purple-600 border-purple-200">{t('training.trauma_brain.anatomy.step_badge')}</Badge>
                                <h2 className="text-3xl font-bold mt-2">{t('training.trauma_brain.anatomy.title')}</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <Card className="p-8 border-rose-100 bg-rose-50/30 flex flex-col items-center text-center space-y-4">
                                    <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-600">
                                        <ShieldAlert className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold uppercase tracking-tight">{t('training.trauma_brain.anatomy.amygdala.title')}</h3>
                                    <p className="text-sm text-[#78716C]">
                                        <strong>"{t('training.trauma_brain.anatomy.amygdala.desc_title')}"</strong> {t('training.trauma_brain.anatomy.amygdala.desc_text')}
                                    </p>
                                </Card>

                                <Card className="p-8 border-blue-100 bg-blue-50/30 flex flex-col items-center text-center space-y-4">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                        <Sparkles className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold uppercase tracking-tight">{t('training.trauma_brain.anatomy.prefrontal.title')}</h3>
                                    <p className="text-sm text-[#78716C]">
                                        <strong>"{t('training.trauma_brain.anatomy.prefrontal.desc_title')}"</strong> {t('training.trauma_brain.anatomy.prefrontal.desc_text')}
                                    </p>
                                </Card>
                            </div>

                            <Button onClick={() => setView('hijack')} className="w-full py-6 bg-[#292524] hover:bg-[#44403C] text-white">
                                {t('training.trauma_brain.anatomy.action')} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* THE HIJACK (Visual Interaction) */}
                    {view === 'hijack' && (
                        <motion.div
                            key="hijack"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full max-w-2xl space-y-12"
                        >
                            <div className="text-center space-y-4">
                                <Badge variant="outline" className="text-rose-600 border-rose-200">{t('training.trauma_brain.hijack.step_badge')}</Badge>
                                <h2 className="text-3xl font-bold">{t('training.trauma_brain.hijack.title')}</h2>
                                <p className="text-[#57534E]">{t('training.trauma_brain.hijack.text')}</p>
                            </div>

                            <div className="relative flex flex-col items-center gap-12 py-8">
                                {/* Visualizer of Connection */}
                                <div className="flex w-full justify-between items-center px-12 relative">
                                    <div className={cn("w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-700", amygdalaActive ? "bg-rose-500 text-white scale-125 shadow-xl shadow-rose-200" : "bg-rose-100 text-rose-500")}>
                                        <Zap className="w-8 h-8" />
                                        <span className="text-[10px] font-bold mt-1">{t('training.trauma_brain.hijack.alert')}</span>
                                    </div>

                                    {/* Connection Line */}
                                    <div className="flex-1 h-1 mx-4 bg-slate-200 relative">
                                        <motion.div
                                            animate={{
                                                width: amygdalaActive ? "0%" : "100%",
                                                backgroundColor: amygdalaActive ? "#F43F5E" : "#3B82F6"
                                            }}
                                            className="h-full absolute left-0 top-0"
                                        />
                                        {amygdalaActive && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: [0, 1, 0] }}
                                                transition={{ repeat: Infinity, duration: 1 }}
                                                className="absolute left-1/2 -top-6 -translate-x-1/2 text-rose-500 flex flex-col items-center"
                                            >
                                                <ZapOff className="w-6 h-6" />
                                                <span className="text-[10px] whitespace-nowrap font-black">{t('training.trauma_brain.hijack.connection_lost')}</span>
                                            </motion.div>
                                        )}
                                    </div>

                                    <div className={cn("w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-700", !amygdalaActive ? "bg-blue-500 text-white scale-125 shadow-xl shadow-blue-200" : "bg-blue-50 text-blue-200")}>
                                        <Activity className="w-8 h-8" />
                                        <span className="text-[10px] font-bold mt-1">{t('training.trauma_brain.hijack.thinking')}</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => setAmygdalaActive(!amygdalaActive)}
                                    variant="outline"
                                    className={cn("rounded-xl px-12 py-8 border-2 transition-all", amygdalaActive ? "border-emerald-500 text-emerald-700 bg-emerald-50" : "border-rose-500 text-rose-700 bg-rose-50")}
                                >
                                    {amygdalaActive ? t('training.trauma_brain.hijack.btn_breathe') : t('training.trauma_brain.hijack.btn_stress')}
                                </Button>
                            </div>

                            <div className="text-center">
                                <p className="text-[#57534E] italic">"{t('training.trauma_brain.hijack.quote')}"</p>
                                <Button onClick={() => setView('repair')} className="mt-8 bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-6">
                                    {t('training.trauma_brain.hijack.action')} <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* REPAIR / NEUROPLASTICITY */}
                    {view === 'repair' && (
                        <motion.div
                            key="repair"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center space-y-4">
                                <Badge variant="outline" className="text-emerald-600 border-emerald-200">{t('training.trauma_brain.repair.step_badge')}</Badge>
                                <h2 className="text-3xl font-bold">{t('training.trauma_brain.repair.title')}</h2>
                                <p className="text-[#57534E]">{t('training.trauma_brain.repair.text')}</p>
                            </div>

                            <div className="grid gap-4">
                                {[
                                    { title: t('training.trauma_brain.repair.item1.title'), icon: MessageSquareQuote, text: t('training.trauma_brain.repair.item1.text') },
                                    { title: t('training.trauma_brain.repair.item2.title'), icon: RefreshCw, text: t('training.trauma_brain.repair.item2.text') },
                                    { title: t('training.trauma_brain.repair.item3.title'), icon: Sparkles, text: t('training.trauma_brain.repair.item3.text') }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-6 bg-white border border-[#E7E5E4] rounded-2xl shadow-sm items-start">
                                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 shrink-0">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#292524]">{item.title}</h4>
                                            <p className="text-sm text-[#78716C]">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button onClick={() => setView('summary')} className="w-full py-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/10">
                                {t('training.trauma_brain.repair.action')} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* SUMMARY */}
                    {view === 'summary' && (
                        <motion.div
                            key="summary"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center space-y-12 max-w-xl"
                        >
                            <Brain className="w-24 h-24 text-purple-200 mx-auto" />
                            <div className="space-y-4">
                                <h1 className="text-4xl font-serif font-black text-[#292524]">{t('training.trauma_brain.summary.title')}</h1>
                                <p className="text-lg text-[#57534E]">
                                    {t('training.trauma_brain.summary.text')}
                                </p>
                            </div>

                            <Button onClick={finishModule} size="lg" className="bg-[#292524] hover:bg-[#44403C] text-white rounded-2xl px-12 py-8 text-xl shadow-xl">
                                {t('training.trauma_brain.summary.action')}
                            </Button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
