"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Ghost, AlertTriangle, Shield, CheckCircle2,
    MessageCircle, Users, EyeOff, Info, ArrowRight,
    Search, ClipboardList, BookOpen, Lightbulb,
    Ban, Heart, ShieldCheck, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface OstracismToolkitProps {
    onComplete: () => void;
    onExit: () => void;
}

// --- COMPONENT ---

export const OstracismToolkit: React.FC<OstracismToolkitProps> = ({ onComplete, onExit }) => {
    const { t } = useLanguage();
    const [step, setStep] = useState<'intro' | 'survival' | 'validation' | 'summary'>('intro');
    const [validationItems, setValidationItems] = useState<string[]>([]);
    const [newItem, setNewItem] = useState('');

    const addItem = () => {
        if (newItem.trim()) {
            setValidationItems(prev => [...prev, newItem]);
            setNewItem('');
        }
    };

    return (
        <div className="min-h-full p-6 md:p-12 max-w-4xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500 bg-slate-50 border-x border-slate-200">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={onExit} className="text-slate-400 hover:text-slate-900 gap-2">
                    <ArrowLeft className="w-4 h-4" /> Keskeytä
                </Button>
                <div className="flex gap-2">
                    {['intro', 'survival', 'validation', 'summary'].map((s, i) => (
                        <div key={s} className={cn("w-2 h-2 rounded-full transition-all",
                            s === step ? "bg-rose-600 w-4" :
                                ['intro', 'survival', 'validation', 'summary'].indexOf(step) > i ? "bg-rose-200" : "bg-slate-200"
                        )} />
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {/* INTRO */}
                {step === 'intro' && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="text-center space-y-8 py-12"
                    >
                        <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-600">
                            <Ban className="w-12 h-12" />
                        </div>
                        <h1
                            className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight"
                            dangerouslySetInnerHTML={{ __html: t('training.ostracism_toolkit.intro.title') }}
                        />
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            {t('training.ostracism_toolkit.intro.text')}
                        </p>
                        <Button size="lg" onClick={() => setStep('survival')} className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-12 py-8 text-xl font-black uppercase tracking-widest shadow-xl shadow-rose-200">
                            {t('training.ostracism_toolkit.intro.action')} <ArrowRight className="ml-2" />
                        </Button>
                    </motion.div>
                )}

                {/* STEP 1: SURVIVAL KIT */}
                {step === 'survival' && (
                    <motion.div
                        key="survival"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-black uppercase text-slate-900">{t('training.ostracism_toolkit.survival.title')}</h2>
                            <p className="text-slate-500 max-w-lg mx-auto">
                                {t('training.ostracism_toolkit.survival.text')}
                            </p>
                        </div>

                        <div className="grid gap-6 max-w-2xl mx-auto">
                            {[
                                { title: t('training.ostracism_toolkit.survival.step1.title'), text: t('training.ostracism_toolkit.survival.step1.text'), icon: AlertTriangle },
                                { title: t('training.ostracism_toolkit.survival.step2.title'), text: t('training.ostracism_toolkit.survival.step2.text'), icon: Users },
                                { title: t('training.ostracism_toolkit.survival.step3.title'), text: t('training.ostracism_toolkit.survival.step3.text'), icon: ShieldCheck }
                            ].map((item, i) => (
                                <Card key={i} className="p-6 border-slate-200 hover:border-rose-200 transition-colors">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 shrink-0">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900">{item.title}</h3>
                                            <p className="text-slate-600 leading-relaxed">{item.text}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="flex justify-center pt-8">
                            <Button onClick={() => setStep('validation')} className="rounded-full px-8 bg-slate-900 text-white font-bold h-12">
                                {t('training.ostracism_toolkit.survival.action')} <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 2: VALIDATION */}
                {step === 'validation' && (
                    <motion.div
                        key="validation"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-black uppercase text-slate-900">{t('training.ostracism_toolkit.validation.title')}</h2>
                            <p className="text-slate-500 max-w-lg mx-auto">
                                {t('training.ostracism_toolkit.validation.text')}
                            </p>
                        </div>

                        <div className="max-w-xl mx-auto w-full space-y-6">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder={t('training.ostracism_toolkit.validation.placeholder')}
                                    value={newItem}
                                    onChange={(e) => setNewItem(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addItem()}
                                    className="flex-1 bg-white border border-slate-200 rounded-xl px-6 h-14 text-lg focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm"
                                    autoFocus
                                />
                                <Button size="lg" onClick={addItem} className="h-14 px-8 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold">{t('training.ostracism_toolkit.validation.btn_add')}</Button>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-6 min-h-[200px]">
                                <h4 className="font-bold text-slate-400 mb-4 uppercase text-xs tracking-widest">{t('training.ostracism_toolkit.validation.list_title')}</h4>
                                <div className="space-y-3">
                                    {validationItems.length > 0 ? (
                                        validationItems.map((item, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="bg-white p-4 rounded-xl border border-rose-100 text-slate-800 font-medium shadow-sm flex items-center gap-3"
                                            >
                                                <div className="w-2 h-2 rounded-full bg-rose-400" />
                                                {item}
                                            </motion.div>
                                        ))
                                    ) : (
                                        <p className="text-slate-400 italic text-center py-12">{t('training.ostracism_toolkit.validation.empty')}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center pt-8">
                            <Button
                                onClick={() => setStep('summary')}
                                disabled={validationItems.length === 0}
                                className="rounded-full px-8 bg-slate-900 text-white font-bold h-12"
                            >
                                {t('training.ostracism_toolkit.validation.action')} <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: SUMMARY */}
                {step === 'summary' && (
                    <motion.div
                        key="summary"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="text-center space-y-8 py-12"
                    >
                        <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-600">
                            <Heart className="w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-black uppercase text-slate-900">{t('training.ostracism_toolkit.summary.title')}</h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            {t('training.ostracism_toolkit.summary.text')}
                        </p>

                        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-rose-100 rotate-1">
                            <p className="font-handwriting text-2xl text-rose-600 leading-relaxed font-bold">
                                "&quot;Minä riitän.<br />Minä olen tärkeä.<br />Minulla on väliä.&quot;"
                            </p>
                        </div>

                        <div className="flex justify-center pt-8">
                            <Button onClick={onComplete} className="rounded-full px-12 py-6 bg-rose-600 hover:bg-rose-700 text-white font-bold text-lg shadow-xl shadow-rose-200">
                                {t('training.ostracism_toolkit.summary.action')}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OstracismToolkit;
