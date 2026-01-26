"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Trash2,
    Sparkles,
    Heart,
    ArrowRight,
    X,
    CheckCircle2,
    ShieldCheck,
    Quote,
    Gem
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

// --- TYPES ---
type ViewState = 'intro' | 'labels' | 'values' | 'narrative' | 'summary';

interface Value {
    id: string;
    icon: any;
}

// --- COMPONENT ---
export default function IdentityModule({
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
    const [peeledLabels, setPeeledLabels] = useState<string[]>([]);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [narrative, setNarrative] = useState({
        past: "",
        learning: "",
        future: ""
    });

    // Value icons mapping
    const VALUES: Value[] = [
        { id: 'honesty', icon: ShieldCheck },
        { id: 'creativity', icon: Sparkles },
        { id: 'empathy', icon: Heart },
        { id: 'justice', icon: Gem },
        { id: 'courage', icon: User },
    ];

    const finishModule = () => {
        onComplete(100);
    };

    const toggleLabel = (label: string) => {
        if (peeledLabels.includes(label)) return;
        setPeeledLabels([...peeledLabels, label]);
    };

    const toggleValue = (valueId: string) => {
        if (selectedValues.includes(valueId)) {
            setSelectedValues(selectedValues.filter(id => id !== valueId));
        } else {
            if (selectedValues.length < 3) {
                setSelectedValues([...selectedValues, valueId]);
            }
        }
    };

    // Get labels from translation
    const LABELS = t('training.identity_module.labels', { returnObjects: true }) as string[];

    return (
        <div className="relative min-h-[600px] w-full bg-[#FAFAF9] rounded-[2rem] p-4 md:p-8 flex flex-col gap-6 border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C]">

            {/* HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                        <User className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black uppercase tracking-widest text-[#292524]">{t('training.identity_module.title')}</h2>
                        <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">{t('training.identity_module.subtitle')}</span>
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
                            <h1 className="text-4xl font-serif font-black text-[#292524]">{t('training.identity_module.intro.title')}</h1>
                            <p className="text-lg text-[#57534E] leading-relaxed">
                                {t('training.identity_module.intro.text')}
                            </p>
                            <Button onClick={() => setView('labels')} size="lg" className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-8 py-6 text-lg shadow-xl shadow-amber-200/50">
                                {t('training.identity_module.intro.action')} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* LABELS - PEELING OFF */}
                    {view === 'labels' && (
                        <motion.div
                            key="labels"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center">
                                <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">{t('training.identity_module.labels_step.badge')}</Badge>
                                <h2 className="text-3xl font-bold mt-2 text-[#292524]">{t('training.identity_module.labels_step.title')}</h2>
                                <p className="text-[#57534E] mt-2">{t('training.identity_module.labels_step.subtitle')}</p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4 py-12 min-h-[200px]">
                                {LABELS.map((label, i) => (
                                    <motion.button
                                        key={i}
                                        onClick={() => toggleLabel(label)}
                                        className={cn(
                                            "px-6 py-4 rounded-xl border-2 transition-all font-bold text-lg shadow-sm relative group",
                                            peeledLabels.includes(label)
                                                ? "opacity-0 scale-0 pointer-events-none"
                                                : "bg-white border-[#E7E5E4] text-[#78716C] hover:border-red-200 hover:text-red-500"
                                        )}
                                        whileHover={{ rotate: [0, -2, 2, 0] }}
                                    >
                                        <Trash2 className="absolute -top-2 -right-2 w-6 h-6 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {label}
                                    </motion.button>
                                ))}
                                {peeledLabels.length === LABELS.length && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center w-full space-y-4"
                                    >
                                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                            <CheckCircle2 className="w-10 h-10" />
                                        </div>
                                        <p className="text-xl font-serif text-[#292524]">{t('training.identity_module.labels_step.completion')}</p>
                                    </motion.div>
                                )}
                            </div>

                            <Button
                                disabled={peeledLabels.length < 3}
                                onClick={() => setView('values')}
                                className="w-full py-6 bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-50 rounded-full shadow-xl shadow-amber-200/50"
                            >
                                {t('training.identity_module.labels_action')} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* VALUES SELECTION */}
                    {view === 'values' && (
                        <motion.div
                            key="values"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center space-y-4">
                                <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">{t('training.identity_module.values_step.badge')}</Badge>
                                <h2 className="text-3xl font-bold">{t('training.identity_module.values_step.title')}</h2>
                                <p className="text-[#57534E]">{t('training.identity_module.values_step.subtitle')}</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-8">
                                {VALUES.map((val) => (
                                    <Card
                                        key={val.id}
                                        onClick={() => toggleValue(val.id)}
                                        className={cn(
                                            "p-6 cursor-pointer text-center transition-all flex flex-col items-center gap-4",
                                            selectedValues.includes(val.id)
                                                ? "ring-2 ring-amber-500 bg-amber-50/20"
                                                : "hover:border-amber-200"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                                            selectedValues.includes(val.id) ? "bg-amber-100 text-amber-700" : "bg-slate-50 text-slate-400"
                                        )}>
                                            <val.icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-sm font-bold">{t(`training.identity_module.values.${val.id}`)}</span>
                                    </Card>
                                ))}
                            </div>

                            <Button
                                disabled={selectedValues.length < 3}
                                onClick={() => setView('narrative')}
                                className="w-full py-6 bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-50 rounded-full shadow-xl shadow-amber-200/50"
                            >
                                {t('training.identity_module.values_action')} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* NARRATIVE SHIFT */}
                    {view === 'narrative' && (
                        <motion.div
                            key="narrative"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center space-y-4">
                                <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">{t('training.identity_module.narrative_step.badge')}</Badge>
                                <h2 className="text-3xl font-bold">{t('training.identity_module.narrative_step.title')}</h2>
                                <p className="text-[#57534E]">{t('training.identity_module.narrative_step.subtitle')}</p>
                            </div>

                            <Card className="p-8 border-[#E7E5E4] bg-white space-y-8 relative">
                                <Quote className="absolute top-4 left-4 w-12 h-12 text-amber-50" />
                                <div className="space-y-6 relative z-10">
                                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <span className="text-lg font-serif">{t('training.identity_module.narrative_form.prompt_past')}</span>
                                        <input
                                            placeholder={t('training.identity_module.narrative_form.placeholder_past')}
                                            className="flex-1 border-b-2 border-amber-100 focus:border-amber-500 outline-none p-2 bg-transparent"
                                            value={narrative.past}
                                            onChange={(e) => setNarrative({ ...narrative, past: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <span className="text-lg font-serif">{t('training.identity_module.narrative_form.prompt_learning')}</span>
                                        <input
                                            placeholder={t('training.identity_module.narrative_form.placeholder_learning')}
                                            className="flex-1 border-b-2 border-amber-100 focus:border-amber-500 outline-none p-2 bg-transparent"
                                            value={narrative.learning}
                                            onChange={(e) => setNarrative({ ...narrative, learning: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <span className="text-lg font-serif">{t('training.identity_module.narrative_form.prompt_future')}</span>
                                        <input
                                            placeholder={t('training.identity_module.narrative_form.placeholder_future')}
                                            className="flex-1 border-b-2 border-amber-100 focus:border-amber-500 outline-none p-2 bg-transparent"
                                            value={narrative.future}
                                            onChange={(e) => setNarrative({ ...narrative, future: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </Card>

                            <Button
                                disabled={!narrative.past || !narrative.learning || !narrative.future}
                                onClick={() => setView('summary')}
                                className="w-full py-6 bg-amber-600 hover:bg-amber-700 text-white shadow-xl shadow-amber-200/50 disabled:opacity-50 rounded-full"
                            >
                                {t('training.identity_module.narrative_action')} <ArrowRight className="ml-2 w-5 h-5" />
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
                                <Sparkles className="w-12 h-12" />
                            </div>
                            <div className="space-y-4">
                                <h1 className="text-4xl font-serif font-black text-[#292524]">{t('training.identity_module.summary.title')}</h1>
                                <p className="text-lg text-[#57534E]">
                                    {t('training.identity_module.summary.text')}
                                </p>
                            </div>

                            <Button onClick={finishModule} size="lg" className="bg-[#292524] hover:bg-[#44403C] text-white rounded-full px-12 py-8 text-xl shadow-xl">
                                {t('training.identity_module.summary.action')}
                            </Button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
