"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Anchor,
    Shield,
    Heart,
    Wind,
    ArrowRight,
    CheckCircle2,
    MapPin,
    Users,
    Smile,
    ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface SafetyRestorationProps {
    onComplete: () => void;
    onExit: () => void;
}

export const SafetyRestoration: React.FC<SafetyRestorationProps> = ({ onComplete, onExit }) => {
    const { t } = useLanguage();
    const [step, setStep] = useState<'intro' | 'grounding' | 'anchors' | 'plan' | 'summary'>('intro');
    const [anchors, setAnchors] = useState<{ places: string[], people: string[] }>({ places: [], people: [] });

    // State for Anchor inputs
    const [newPlace, setNewPlace] = useState('');
    const [newPerson, setNewPerson] = useState('');

    const addPlace = () => {
        if (newPlace.trim()) {
            setAnchors(prev => ({ ...prev, places: [...prev.places, newPlace] }));
            setNewPlace('');
        }
    };

    const addPerson = () => {
        if (newPerson.trim()) {
            setAnchors(prev => ({ ...prev, people: [...prev.people, newPerson] }));
            setNewPerson('');
        }
    };

    const groudingItems = (t('training.safety_restoration.grounding.items', { returnObjects: true }) as { text: string }[]).map((item, i) => ({
        count: 5 - i,
        text: item.text,
        icon: [Smile, Anchor, Wind, Heart, CheckCircle2][i]
    }));

    return (
        <div className="min-h-full p-6 md:p-12 max-w-4xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={onExit} className="text-slate-400 hover:text-slate-900 gap-2">
                    <ArrowLeft className="w-4 h-4" /> Keskeytä
                </Button>
                <div className="flex gap-2">
                    {['intro', 'grounding', 'anchors', 'plan', 'summary'].map((s, i) => (
                        <div key={s} className={cn("w-2 h-2 rounded-full transition-all",
                            s === step ? "bg-emerald-600 w-4" :
                                ['intro', 'grounding', 'anchors', 'plan', 'summary'].indexOf(step) > i ? "bg-emerald-200" : "bg-slate-200"
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
                        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                            <Shield className="w-12 h-12" />
                        </div>
                        <h1
                            className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight"
                            dangerouslySetInnerHTML={{ __html: t('training.safety_restoration.intro.title') }}
                        />
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            {t('training.safety_restoration.intro.text')}
                        </p>
                        <Button size="lg" onClick={() => setStep('grounding')} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-12 py-8 text-xl font-black uppercase tracking-widest shadow-xl shadow-emerald-200">
                            {t('training.safety_restoration.intro.action')} <ArrowRight className="ml-2" />
                        </Button>
                    </motion.div>
                )}

                {/* STEP 1: GROUNDING (5-4-3-2-1) */}
                {step === 'grounding' && (
                    <motion.div
                        key="grounding"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="text-center space-y-4">
                            <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-2xl mb-4">
                                <Wind className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h2 className="text-3xl font-black uppercase text-slate-900">{t('training.safety_restoration.grounding.title')}</h2>
                            <p className="text-slate-500 max-w-lg mx-auto">
                                {t('training.safety_restoration.grounding.text')}
                            </p>
                        </div>

                        <div className="grid gap-4 max-w-2xl mx-auto">
                            {groudingItems.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm"
                                >
                                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-black text-xl shrink-0">
                                        {item.count}
                                    </div>
                                    <p className="font-medium text-slate-700">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex justify-center pt-8">
                            <Button onClick={() => setStep('anchors')} className="rounded-full px-8 bg-slate-900 text-white font-bold h-12">
                                {t('training.safety_restoration.grounding.action')} <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 2: ANCHORS */}
                {step === 'anchors' && (
                    <motion.div
                        key="anchors"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-black uppercase text-slate-900">{t('training.safety_restoration.anchors.title')}</h2>
                            <p className="text-slate-500">{t('training.safety_restoration.anchors.text')}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Places */}
                            <Card className="p-6 border-slate-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <MapPin className="w-6 h-6 text-emerald-500" />
                                    <h3 className="font-bold text-lg">{t('training.safety_restoration.anchors.places_title')}</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder={t('training.safety_restoration.anchors.places_placeholder')}
                                            value={newPlace}
                                            onChange={(e) => setNewPlace(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && addPlace()}
                                            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                        <Button size="sm" onClick={addPlace} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase">{t('training.safety_restoration.anchors.btn_add')}</Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {anchors.places.map((p, i) => (
                                            <Badge key={i} variant="secondary" className="bg-emerald-100 text-emerald-800">{p}</Badge>
                                        ))}
                                        {anchors.places.length === 0 && <p className="text-slate-400 text-sm italic">{t('training.safety_restoration.anchors.places_empty')}</p>}
                                    </div>
                                </div>
                            </Card>

                            {/* People */}
                            <Card className="p-6 border-slate-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <Users className="w-6 h-6 text-emerald-500" />
                                    <h3 className="font-bold text-lg">{t('training.safety_restoration.anchors.people_title')}</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder={t('training.safety_restoration.anchors.people_placeholder')}
                                            value={newPerson}
                                            onChange={(e) => setNewPerson(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && addPerson()}
                                            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                        <Button size="sm" onClick={addPerson} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase">{t('training.safety_restoration.anchors.btn_add')}</Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {anchors.people.map((p, i) => (
                                            <Badge key={i} variant="secondary" className="bg-amber-100 text-amber-800">{p}</Badge>
                                        ))}
                                        {anchors.people.length === 0 && <p className="text-slate-400 text-sm italic">{t('training.safety_restoration.anchors.people_empty')}</p>}
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div className="flex justify-center pt-8">
                            <Button
                                onClick={() => setStep('summary')}
                                disabled={anchors.people.length === 0 && anchors.places.length === 0}
                                className="rounded-full px-8 bg-slate-900 text-white font-bold h-12"
                            >
                                {t('training.safety_restoration.anchors.action')} <ArrowRight className="ml-2 w-4 h-4" />
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
                        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <h2 className="text-3xl font-black uppercase text-slate-900">{t('training.safety_restoration.summary.title')}</h2>
                        <p
                            className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: t('training.safety_restoration.summary.text') }}
                        />

                        <div className="bg-slate-50 p-6 rounded-2xl max-w-lg mx-auto text-left">
                            <h4 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-widest">{t('training.safety_restoration.summary.my_anchors')}</h4>
                            <p className="text-slate-700 mb-4">
                                {anchors.places.length > 0 ? anchors.places.join(", ") : t('training.safety_restoration.summary.no_places')} ja {anchors.people.length > 0 ? anchors.people.join(", ") : t('training.safety_restoration.summary.no_people')}.
                            </p>
                            <p className="text-sm text-slate-500 italic">{t('training.safety_restoration.summary.hint')}</p>
                        </div>

                        <div className="flex justify-center pt-4">
                            <Button onClick={onComplete} className="rounded-full px-12 py-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-xl shadow-emerald-200">
                                {t('training.safety_restoration.summary.action')}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
