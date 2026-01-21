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

// --- TYPES ---
type ViewState = 'intro' | 'labels' | 'values' | 'narrative' | 'summary';

interface Value {
    id: string;
    label: string;
    icon: any;
}

// --- DATA ---
const LABELS = [
    "Vaikea ihminen",
    "Yliherkkä",
    "Epäpätevä",
    "Yksin jäänyt",
    "Hankala työntekijä",
    "Riidankylväjä"
];

const VALUES: Value[] = [
    { id: 'honesty', label: 'Rehellisyys', icon: ShieldCheck },
    { id: 'creativity', label: 'Luovuus', icon: Sparkles },
    { id: 'empathy', label: 'Empatia', icon: Heart },
    { id: 'justice', label: 'Oikeudenmukaisuus', icon: Gem },
    { id: 'courage', label: 'Rohkeus', icon: User },
];

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
    const [view, setView] = useState<ViewState>('intro');
    const [peeledLabels, setPeeledLabels] = useState<string[]>([]);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [narrative, setNarrative] = useState({
        past: "",
        learning: "",
        future: ""
    });

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

    return (
        <div className="relative min-h-[600px] w-full bg-[#FAFAF9] rounded-[2rem] p-4 md:p-8 flex flex-col gap-6 border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C]">

            {/* HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700">
                        <User className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black uppercase tracking-widest text-[#292524]">Identiteetin Rakentaminen</h2>
                        <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">Kuka olen kiusaamisen jälkeen?</span>
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
                            <h1 className="text-4xl font-serif font-black text-[#292524]">Sinä et ole se, mitä sinulle tapahtui.</h1>
                            <p className="text-lg text-[#57534E] leading-relaxed">
                                Kiusaaminen pyrkii määrittelemään sinut uudelleen: se liimaa sinuun valheellisia leimoja ja nujertaa itsetuntosi.
                                Mutta kiusaaja ei tunne sinua. Tässä moduulissa alamme kuoria pois muiden antamia määritelmiä ja löytää tiesi takaisin aitoon itseesi.
                            </p>
                            <Button onClick={() => setView('labels')} size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-6 text-lg shadow-lg">
                                Aloita kuoriminen <ArrowRight className="ml-2 w-5 h-5" />
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
                                <Badge variant="outline" className="text-indigo-600 border-indigo-200">Vaihe 1/3: Leimojen poisto</Badge>
                                <h2 className="text-3xl font-bold mt-2 text-[#292524]">Heitä pois valheelliset leimat.</h2>
                                <p className="text-[#57534E] mt-2">Klikkaa leimaa heittääksesi sen pois. Ne eivät kuulu sinulle.</p>
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
                                        <p className="text-xl font-serif text-[#292524]">Puhdas pöytä. Nyt olet vapaa määrittelemään itsesi.</p>
                                    </motion.div>
                                )}
                            </div>

                            <Button
                                disabled={peeledLabels.length < 3}
                                onClick={() => setView('values')}
                                className="w-full py-6 bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
                            >
                                Seuraava: Mitkä ovat arvosi? <ArrowRight className="ml-2 w-5 h-5" />
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
                                <Badge variant="outline" className="text-indigo-600 border-indigo-200">Vaihe 2/3: Peruskivet</Badge>
                                <h2 className="text-3xl font-bold">Löydä ydinarvosi.</h2>
                                <p className="text-[#57534E]">Valitse 3 tärkeintä arvoa, jotka ohjaavat sinua eteenpäin.</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-8">
                                {VALUES.map((val) => (
                                    <Card
                                        key={val.id}
                                        onClick={() => toggleValue(val.id)}
                                        className={cn(
                                            "p-6 cursor-pointer text-center transition-all flex flex-col items-center gap-4",
                                            selectedValues.includes(val.id)
                                                ? "ring-2 ring-indigo-500 bg-indigo-50/20"
                                                : "hover:border-indigo-200"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                                            selectedValues.includes(val.id) ? "bg-indigo-100 text-indigo-700" : "bg-slate-50 text-slate-400"
                                        )}>
                                            <val.icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-sm font-bold">{val.label}</span>
                                    </Card>
                                ))}
                            </div>

                            <Button
                                disabled={selectedValues.length < 3}
                                onClick={() => setView('narrative')}
                                className="w-full py-6 bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
                            >
                                Seuraava: Kirjoita tarinasi uusiksi <ArrowRight className="ml-2 w-5 h-5" />
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
                                <Badge variant="outline" className="text-indigo-600 border-indigo-200">Vaihe 3/3: Uusi tarina</Badge>
                                <h2 className="text-3xl font-bold">Minun matkani</h2>
                                <p className="text-[#57534E]">Täytä lauseet. Katso matkaasi selviytyjän silmin.</p>
                            </div>

                            <Card className="p-8 border-[#E7E5E4] bg-white space-y-8 relative">
                                <Quote className="absolute top-4 left-4 w-12 h-12 text-indigo-50" />
                                <div className="space-y-6 relative z-10">
                                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <span className="text-lg font-serif">Koin vaikeita asioita, mutta</span>
                                        <input
                                            placeholder="esim. säilytin arvokkuuteni..."
                                            className="flex-1 border-b-2 border-indigo-100 focus:border-indigo-500 outline-none p-2 bg-transparent"
                                            value={narrative.past}
                                            onChange={(e) => setNarrative({ ...narrative, past: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <span className="text-lg font-serif">Tämä kokemus opetti minulle, että</span>
                                        <input
                                            placeholder="esim. olen vahvempi kuin luulin..."
                                            className="flex-1 border-b-2 border-indigo-100 focus:border-indigo-500 outline-none p-2 bg-transparent"
                                            value={narrative.learning}
                                            onChange={(e) => setNarrative({ ...narrative, learning: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <span className="text-lg font-serif">Tänään valitsen toimia arvojeni mukaan, eli</span>
                                        <input
                                            placeholder="esim. rehellisesti ja rohkeasti..."
                                            className="flex-1 border-b-2 border-indigo-100 focus:border-indigo-500 outline-none p-2 bg-transparent"
                                            value={narrative.future}
                                            onChange={(e) => setNarrative({ ...narrative, future: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </Card>

                            <Button
                                disabled={!narrative.past || !narrative.learning || !narrative.future}
                                onClick={() => setView('summary')}
                                className="w-full py-6 bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl disabled:opacity-50"
                            >
                                Valmis <ArrowRight className="ml-2 w-5 h-5" />
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
                            <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-indigo-50/50">
                                <Sparkles className="w-12 h-12" />
                            </div>
                            <div className="space-y-4">
                                <h1 className="text-4xl font-serif font-black text-[#292524]">Olet enemmän kuin tarinasi.</h1>
                                <p className="text-lg text-[#57534E]">
                                    Identiteetin palauttaminen on prosessi. Olet tänään ottanut haltuun kynän, jolla kirjoitat loppuelämäsi.
                                    Pidä kiinni valitsemistasi arvoista – ne ovat ankkureitasi, jotka eivät petä.
                                </p>
                            </div>

                            <Button onClick={finishModule} size="lg" className="bg-[#292524] hover:bg-[#44403C] text-white rounded-2xl px-12 py-8 text-xl shadow-xl">
                                Palaa valmennukseen
                            </Button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

