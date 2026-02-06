"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain,
    X,
    ArrowRight,
    CheckCircle2,
    ChevronLeft
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

// --- TYPES ---
type ViewState = 'intro' | 'situation' | 'thought' | 'alternatives' | 'reflection';

interface ModuleProps {
    moduleId: string;
    onComplete: () => void;
    onExit: () => void;
}

// --- COMPONENT ---
export default function RSDSparring({
    moduleId,
    onComplete,
    onExit
}: ModuleProps) {
    const { t, loadNamespace } = useLanguage();
    const [view, setView] = useState<ViewState>('intro');

    // Load training namespace on mount
    useEffect(() => {
        loadNamespace('training');
    }, [loadNamespace]);

    // Scroll to top when view changes (important for mobile)
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [view]);

    // User selections
    const [selectedSituation, setSelectedSituation] = useState<number | null>(null);
    const [selectedThought, setSelectedThought] = useState<number | null>(null);
    const [selectedAlternatives, setSelectedAlternatives] = useState<number[]>([]);
    const [intensityBefore, setIntensityBefore] = useState<number>(5);
    const [intensityAfter, setIntensityAfter] = useState<number>(5);

    const finishModule = () => {
        onComplete();
    };

    // Get options from translations
    const situationOptions = t('training.rsd_sparring.situation.options', { returnObjects: true }) as string[];
    const thoughtOptions = t('training.rsd_sparring.thought.options', { returnObjects: true }) as string[];
    const alternativeOptions = t('training.rsd_sparring.alternatives.options', { returnObjects: true }) as string[];

    const toggleAlternative = (index: number) => {
        if (selectedAlternatives.includes(index)) {
            setSelectedAlternatives(selectedAlternatives.filter(i => i !== index));
        } else {
            if (selectedAlternatives.length < 3) {
                setSelectedAlternatives([...selectedAlternatives, index]);
            }
        }
    };

    // Progress helper
    const viewOrder: ViewState[] = ['intro', 'situation', 'thought', 'alternatives', 'reflection'];
    const currentStep = viewOrder.indexOf(view);

    // Back navigation
    const goBack = () => {
        const currentIndex = viewOrder.indexOf(view);
        if (currentIndex > 0) {
            setView(viewOrder[currentIndex - 1]);
        }
    };

    return (
        <div className="relative min-h-[600px] w-full bg-[#FAFAF9] rounded-lg md:rounded-[2rem] p-3 md:p-8 flex flex-col gap-3 md:gap-6 border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C]">

            {/* HEADER */}
            <div className="flex items-center justify-between pb-2 md:pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-violet-100 flex items-center justify-center text-violet-700">
                        <Brain className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                        <h2 className="text-sm md:text-lg font-black uppercase tracking-wide md:tracking-widest text-[#292524]">
                            {t('training.rsd_sparring.intro.title')}
                        </h2>
                        <span className="hidden md:block text-xs font-bold text-[#A8A29E] uppercase tracking-widest">
                            Lempeä sparring RSD-tilanteisiin
                        </span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onExit} className="hover:bg-[#F5F5F4] text-[#78716C]">
                    <X className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
            </div>

            {/* PROGRESS INDICATOR */}
            {view !== 'intro' && (
                <div className="flex items-center justify-center gap-2 py-2">
                    {viewOrder.slice(1).map((step, index) => (
                        <div
                            key={step}
                            className={cn(
                                "h-2 rounded-full transition-all duration-300",
                                index < currentStep ? "w-8 bg-violet-600" : index === currentStep - 1 ? "w-12 bg-violet-600" : "w-8 bg-violet-200"
                            )}
                        />
                    ))}
                </div>
            )}

            <div className="flex-1 relative flex flex-col items-center justify-start max-w-4xl mx-auto w-full py-2 md:py-4 overflow-y-auto">
                <AnimatePresence mode="wait">

                    {/* INTRO */}
                    {view === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="text-center space-y-6 md:space-y-8 max-w-2xl mt-4 md:mt-12"
                        >
                            <h1 className="text-2xl md:text-4xl font-serif font-black text-[#292524]">
                                {t('training.rsd_sparring.intro.title')}
                            </h1>

                            <p className="text-base md:text-xl text-[#57534E] leading-relaxed">
                                {t('training.rsd_sparring.intro.subtitle')}
                            </p>

                            <p className="text-sm md:text-base text-[#57534E] leading-relaxed">
                                {t('training.rsd_sparring.intro.body')}
                            </p>

                            {/* Process Preview */}
                            <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 md:p-6 text-left">
                                <h3 className="text-sm md:text-base font-bold text-violet-900 mb-3">
                                    {t('training.rsd_sparring.intro.process_title')}
                                </h3>
                                <ul className="space-y-2 text-xs md:text-sm text-[#57534E]">
                                    {Array.isArray(t('training.rsd_sparring.intro.process_steps', { returnObjects: true })) &&
                                        (t('training.rsd_sparring.intro.process_steps', { returnObjects: true }) as string[]).map((step, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className="text-violet-600 mt-0.5">–</span>
                                                <span>{step}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>

                            {/* Duration & No Writing */}
                            <div className="space-y-1 text-xs md:text-sm text-[#78716C]">
                                <p>{t('training.rsd_sparring.intro.duration')}</p>
                                <p>{t('training.rsd_sparring.intro.no_writing')}</p>
                            </div>

                            <Button
                                onClick={() => setView('situation')}
                                size="lg"
                                className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-6 md:px-8 py-4 md:py-6 text-base md:text-lg shadow-xl shadow-violet-200/50"
                            >
                                {t('training.rsd_sparring.intro.start')} <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                            </Button>
                        </motion.div>
                    )}


                    {/* SITUATION */}
                    {view === 'situation' && (
                        <motion.div
                            key="situation"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full space-y-4 md:space-y-8"
                        >
                            <div className="text-center">
                                <Badge variant="outline" className="text-violet-600 border-violet-200 bg-violet-50 text-xs md:text-sm">
                                    {t('training.rsd_sparring.situation.title')}
                                </Badge>
                                <h2 className="text-xl md:text-3xl font-bold mt-2 text-[#292524]">
                                    {t('training.rsd_sparring.situation.question')}
                                </h2>
                            </div>

                            <div className="grid gap-2 md:gap-3 py-4 md:py-8">
                                {Array.isArray(situationOptions) && situationOptions.map((option, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => setSelectedSituation(index)}
                                        className={cn(
                                            "p-3 md:p-4 rounded-lg md:rounded-xl border-2 transition-all text-left text-sm md:text-base font-medium",
                                            selectedSituation === index
                                                ? "border-violet-500 bg-violet-50 text-violet-900"
                                                : "border-[#E7E5E4] bg-white hover:border-violet-200 text-[#44403C]"
                                        )}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {option}
                                    </motion.button>
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={goBack}
                                    className="border-[#E7E5E4] hover:bg-[#F5F5F4]"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-2" /> Takaisin
                                </Button>
                                <Button
                                    disabled={selectedSituation === null}
                                    onClick={() => setView('thought')}
                                    className="flex-1 py-4 md:py-6 bg-violet-600 hover:bg-violet-700 text-white disabled:opacity-50 rounded-full shadow-xl shadow-violet-200/50 text-sm md:text-base"
                                >
                                    {t('training.rsd_sparring.situation.continue')} <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* THOUGHT */}
                    {view === 'thought' && (
                        <motion.div
                            key="thought"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full space-y-4 md:space-y-8"
                        >
                            <div className="text-center space-y-1 md:space-y-2">
                                <Badge variant="outline" className="text-violet-600 border-violet-200 bg-violet-50 text-xs md:text-sm">
                                    {t('training.rsd_sparring.thought.title')}
                                </Badge>
                                <h2 className="text-xl md:text-3xl font-bold text-[#292524]">
                                    {t('training.rsd_sparring.thought.question')}
                                </h2>
                                <p className="text-xs md:text-sm text-[#78716C] italic">
                                    {t('training.rsd_sparring.thought.hint')}
                                </p>
                            </div>

                            <div className="grid gap-2 md:gap-3 py-4 md:py-8">
                                {Array.isArray(thoughtOptions) && thoughtOptions.map((option, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => setSelectedThought(index)}
                                        className={cn(
                                            "p-3 md:p-4 rounded-lg md:rounded-xl border-2 transition-all text-left text-sm md:text-base font-medium",
                                            selectedThought === index
                                                ? "border-violet-500 bg-violet-50 text-violet-900"
                                                : "border-[#E7E5E4] bg-white hover:border-violet-200 text-[#44403C]"
                                        )}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {option}
                                    </motion.button>
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={goBack}
                                    className="border-[#E7E5E4] hover:bg-[#F5F5F4]"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-2" /> Takaisin
                                </Button>
                                <Button
                                    disabled={selectedThought === null}
                                    onClick={() => setView('alternatives')}
                                    className="flex-1 py-4 md:py-6 bg-violet-600 hover:bg-violet-700 text-white disabled:opacity-50 rounded-full shadow-xl shadow-violet-200/50 text-sm md:text-base"
                                >
                                    {t('training.rsd_sparring.thought.continue')} <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* ALTERNATIVES */}
                    {view === 'alternatives' && (
                        <motion.div
                            key="alternatives"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full space-y-4 md:space-y-8"
                        >
                            <div className="text-center space-y-1 md:space-y-2">
                                <Badge variant="outline" className="text-violet-600 border-violet-200 bg-violet-50 text-xs md:text-sm">
                                    {t('training.rsd_sparring.alternatives.selectedCount', { count: selectedAlternatives.length })}
                                </Badge>
                                <h2 className="text-xl md:text-3xl font-bold text-[#292524]">
                                    {t('training.rsd_sparring.alternatives.title')}
                                </h2>
                                <p className="text-xs md:text-sm text-[#78716C] whitespace-pre-line">
                                    {t('training.rsd_sparring.alternatives.instruction')}
                                </p>
                            </div>

                            <div className="grid gap-3 py-8">
                                {Array.isArray(alternativeOptions) && alternativeOptions.map((option, index) => {
                                    const isSelected = selectedAlternatives.includes(index);
                                    const canSelect = selectedAlternatives.length < 3 || isSelected;

                                    return (
                                        <motion.button
                                            key={index}
                                            onClick={() => canSelect && toggleAlternative(index)}
                                            disabled={!canSelect}
                                            className={cn(
                                                "p-3 md:p-4 rounded-lg md:rounded-xl border-2 transition-all text-left text-sm md:text-base font-medium relative",
                                                isSelected
                                                    ? "border-violet-500 bg-violet-50 text-violet-900"
                                                    : canSelect
                                                        ? "border-[#E7E5E4] bg-white hover:border-violet-200 text-[#44403C]"
                                                        : "border-[#E7E5E4] bg-slate-50 text-slate-400 cursor-not-allowed opacity-50"
                                            )}
                                            whileHover={canSelect ? { scale: 1.02 } : {}}
                                            whileTap={canSelect ? { scale: 0.98 } : {}}
                                        >
                                            {isSelected && (
                                                <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-violet-600" />
                                            )}
                                            {option}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {selectedAlternatives.length < 3 && (
                                <p className="text-center text-sm text-[#A8A29E]">
                                    {t('training.rsd_sparring.ui.selectThree', { remaining: 3 - selectedAlternatives.length })}
                                </p>
                            )}

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={goBack}
                                    className="border-[#E7E5E4] hover:bg-[#F5F5F4]"
                                >
                                    <ChevronLeft className="w-4 h-4 mr-2" /> Takaisin
                                </Button>
                                <Button
                                    disabled={selectedAlternatives.length !== 3}
                                    onClick={() => setView('reflection')}
                                    className="flex-1 py-4 md:py-6 bg-violet-600 hover:bg-violet-700 text-white disabled:opacity-50 rounded-full shadow-xl shadow-violet-200/50 text-sm md:text-base"
                                >
                                    {t('training.rsd_sparring.alternatives.continue')} <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* REFLECTION */}
                    {view === 'reflection' && (
                        <motion.div
                            key="reflection"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center">
                                <Badge variant="outline" className="text-violet-600 border-violet-200 bg-violet-50">
                                    {t('training.rsd_sparring.reflection.title')}
                                </Badge>
                            </div>

                            {/* Journey Summary */}
                            <Card className="p-3 md:p-6 border-violet-200 bg-violet-50/50">
                                <h3 className="text-xs md:text-sm font-bold uppercase tracking-wide text-violet-900 mb-2 md:mb-4">Polkusi:</h3>
                                <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                                    <div>
                                        <span className="text-[#78716C] font-medium">Tilanne: </span>
                                        <span className="text-[#292524]">
                                            {selectedSituation !== null && Array.isArray(situationOptions) && situationOptions[selectedSituation]}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-[#78716C] font-medium">Ajatus: </span>
                                        <span className="text-[#292524]">
                                            {selectedThought !== null && Array.isArray(thoughtOptions) && thoughtOptions[selectedThought]}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-[#78716C] font-medium">Vaihtoehdot: </span>
                                        <ul className="mt-1 md:mt-2 space-y-0.5 md:space-y-1 list-disc list-inside text-[#292524]">
                                            {Array.isArray(alternativeOptions) && selectedAlternatives.map(idx => (
                                                <li key={idx} className="text-xs md:text-sm">{alternativeOptions[idx]}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-4 md:p-8 border-[#E7E5E4] bg-white space-y-4 md:space-y-8">
                                {/* Before */}
                                <div className="space-y-2 md:space-y-4">
                                    <label className="text-sm md:text-lg font-serif font-medium text-[#292524]">
                                        {t('training.rsd_sparring.reflection.before.label')}
                                    </label>
                                    <p className="text-xs text-[#A8A29E]">
                                        {t('training.rsd_sparring.reflection.before.scaleHint')}
                                    </p>
                                    <div className="flex items-center gap-2 md:gap-4">
                                        <span className="text-xs md:text-sm text-[#78716C]">0</span>
                                        <input
                                            type="range"
                                            min="0"
                                            max="10"
                                            value={intensityBefore}
                                            onChange={(e) => setIntensityBefore(Number(e.target.value))}
                                            className="flex-1 accent-violet-600"
                                        />
                                        <span className="text-xs md:text-sm text-[#78716C]">10</span>
                                        <div className="min-w-[30px] md:min-w-[40px] text-center">
                                            <span className="text-xl md:text-2xl font-bold text-violet-600">{intensityBefore}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* After */}
                                <div className="space-y-2 md:space-y-4">
                                    <label className="text-sm md:text-lg font-serif font-medium text-[#292524]">
                                        {t('training.rsd_sparring.reflection.after.label')}
                                    </label>
                                    <div className="flex items-center gap-2 md:gap-4">
                                        <span className="text-xs md:text-sm text-[#78716C]">0</span>
                                        <input
                                            type="range"
                                            min="0"
                                            max="10"
                                            value={intensityAfter}
                                            onChange={(e) => setIntensityAfter(Number(e.target.value))}
                                            className="flex-1 accent-emerald-600"
                                        />
                                        <span className="text-xs md:text-sm text-[#78716C]">10</span>
                                        <div className="min-w-[30px] md:min-w-[40px] text-center">
                                            <span className="text-xl md:text-2xl font-bold text-emerald-600">{intensityAfter}</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Why it works */}
                            <Card className="p-3 md:p-6 bg-blue-50 border-blue-200">
                                <h3 className="text-xs md:text-sm font-bold uppercase tracking-wide text-blue-900 mb-2 md:mb-3">Miksi tämä toimii?</h3>
                                <p className="text-xs md:text-sm text-[#57534E] leading-relaxed">
                                    RSD:n ydinkysymys ei ole "väärä ajatus", vaan <strong>nopeus ja voimakkuus</strong>.
                                    Kun ajatus laukeaa, se tuntuu absoluuttiselta totuudelta.
                                    <br /><br />
                                    Tämä harjoitus ei yritä vakuuttaa sinua siitä, että toinen selitys on "oikea".
                                    Se vain <strong>hidastaa prosessia</strong> – antaa aivoillesi aikaa havaita, että on useampi kuin yksi mahdollinen tulkinta.
                                    <br /><br />
                                    Jos intensiteetti laski edes yhden numeron, hidastus tapahtui.
                                </p>
                            </Card>

                            {/* Summary */}
                            <Card className="p-4 md:p-8 bg-emerald-50 border-emerald-200">
                                <div className="text-center space-y-2 md:space-y-4">
                                    <h3 className="text-base md:text-xl font-serif font-bold text-[#292524]">
                                        {t('training.rsd_sparring.reflection.summary.title')}
                                    </h3>
                                    <p className="text-sm md:text-base text-[#57534E] whitespace-pre-line leading-relaxed">
                                        {t('training.rsd_sparring.reflection.summary.body')}
                                    </p>
                                </div>
                            </Card>

                            <Button
                                onClick={finishModule}
                                size="lg"
                                className="w-full bg-[#292524] hover:bg-[#44403C] text-white rounded-full px-8 md:px-12 py-4 md:py-8 text-base md:text-xl shadow-xl"
                            >
                                {t('training.rsd_sparring.reflection.finish')}
                            </Button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* Gentle reminder at bottom */}
            <div className="text-center text-xs text-[#A8A29E] pt-4 border-t border-[#E7E5E4]">
                {t('training.rsd_sparring.ui.gentlePause')}
            </div>
        </div>
    );
}
