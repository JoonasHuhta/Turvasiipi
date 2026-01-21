"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    RefreshCw,
    Zap,
    ZapOff,
    Brain,
    ArrowRight,
    X,
    Infinity as InfinityIcon,
    Pause,
    Play,
    Compass,
    Waves
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- TYPES ---
type ViewState = 'intro' | 'explanation' | 'simulation' | 'breakout' | 'summary';

// --- COMPONENT ---
export default function DefaultModeNetwork({
    moduleId,
    onComplete,
    onExit
}: {
    moduleId?: string;
    onComplete: (score: number) => void;
    onExit: () => void;
}) {
    const [view, setView] = useState<ViewState>('intro');
    const [isLooping, setIsLooping] = useState(true);
    const [loopStep, setLoopStep] = useState(0);

    const loopPhrases = [
        "Miksi minä?",
        "Mitä jos olisin tehnyt toisin?",
        "Hän ei koskaan muutu.",
        "Kukaan ei usko minua.",
        "Olenko minä syyllinen?",
        "Tämä ei lopu koskaan."
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (view === 'simulation' && isLooping) {
            interval = setInterval(() => {
                setLoopStep(prev => (prev + 1) % loopPhrases.length);
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [view, isLooping]);

    const finishModule = () => {
        onComplete(100);
    };

    return (
        <div className="relative min-h-[600px] w-full bg-[#FAFAF9] rounded-[2rem] p-4 md:p-8 flex flex-col gap-6 border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C]">

            {/* HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
                        <RefreshCw className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black uppercase tracking-widest text-[#292524]">Default Mode Network</h2>
                        <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">Märehtimisen Purkaminen</span>
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
                            <h1 className="text-4xl font-serif font-black text-[#292524]">Aivot jumissa?<br />Se on märehtimisverkko.</h1>
                            <p className="text-lg text-[#57534E] leading-relaxed">
                                Kun emme tee mitään, aivoissamme aktivoituu "Default Mode Network" (DMN).
                                Trauman jälkeen se muuttuu <strong>märehdimiseksi</strong>: loputtomaksi ketjuksi menneitä vääryyksiä ja tulevia pelkoja.
                                <br /><br />
                                Se ei ole ajattelua. Se on aivojen tapa yrittää ratkaista mahdotonta.
                            </p>
                            <Button onClick={() => setView('explanation')} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg shadow-lg">
                                Kuinka se toimii? <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* EXPLANATION */}
                    {view === 'explanation' && (
                        <motion.div
                            key="explanation"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center">
                                <Badge variant="outline" className="text-blue-600 border-blue-200">Vaihe 1/3: Mekanismi</Badge>
                                <h2 className="text-3xl font-bold mt-2">DMN: "Eilisen murehtija"</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <Card className="p-8 border-slate-100 bg-white space-y-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                        <Pause className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold">Lepo-tilan harha</h3>
                                    <p className="text-sm text-[#78716C]">
                                        DMN aktivoituu, kun "keskittynyt verkko" sammuu. Trauman jälkeen aivot eivät osaa levätä, vaan ne alkavat toistaa traumaattisia muistoja yrittäen löytää niistä ratkaisun.
                                    </p>
                                </Card>
                                <Card className="p-8 border-slate-100 bg-white space-y-4">
                                    <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                                        <InfinityIcon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold">Silmukka (Loop)</h3>
                                    <p className="text-sm text-[#78716C]">
                                        Märehtiminen on kuin pyörisi kehää metsässä: olet aktiivinen, muttet pääse mihinkään. Tämä kuluttaa valtavasti energiaa ja estää toipumisen.
                                    </p>
                                </Card>
                            </div>

                            <Button onClick={() => setView('simulation')} className="w-full py-6 bg-[#292524] hover:bg-[#44403C] text-white">
                                Katso miltä silmukka näyttää <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* SIMULATION (Visual Interaction) */}
                    {view === 'simulation' && (
                        <motion.div
                            key="simulation"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full max-w-2xl space-y-12"
                        >
                            <div className="text-center space-y-4">
                                <Badge variant="outline" className="text-rose-600 border-rose-200">Vaihe 2/3: Silmukka</Badge>
                                <h2 className="text-3xl font-bold">Märehtimisen kierre</h2>
                                <p className="text-[#57534E]">Aivosi toistavat näitä lauseita tuhansia kertoja päivässä.</p>
                            </div>

                            <div className="relative h-64 flex items-center justify-center">
                                {/* Visualizer of Loop */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                >
                                    <div className="w-64 h-64 border-4 border-dashed border-blue-200 rounded-full" />
                                </motion.div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={loopStep}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="text-2xl md:text-3xl font-serif font-black text-blue-800 text-center px-8 z-10"
                                    >
                                        "{loopPhrases[loopStep]}"
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <div className="flex flex-col items-center gap-6">
                                <Button
                                    onClick={() => setView('breakout')}
                                    size="lg"
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-12 py-8 text-xl shadow-xl animate-bounce"
                                >
                                    KATKAISE KIERRE
                                </Button>
                                <p className="text-[#78716C] text-sm italic">"Tunnista, että tämä on aivojesi automaattinen silmukka."</p>
                            </div>
                        </motion.div>
                    )}

                    {/* BREAKOUT / TOOLS */}
                    {view === 'breakout' && (
                        <motion.div
                            key="breakout"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center space-y-4">
                                <Badge variant="outline" className="text-emerald-600 border-emerald-200">Vaihe 3/3: Vapautus</Badge>
                                <h2 className="text-3xl font-bold">Kuinka pysäyttää DMN?</h2>
                                <p className="text-[#57534E]">Märehtiminen loppuu vain vaihtamalla tilaa.</p>
                            </div>

                            <div className="grid gap-4">
                                {[
                                    { title: "Keskittynyt aisti", icon: Waves, text: "Aivot eivät voi märehtiä ja keskittyä aisteihin samaan aikaan. Tunne jalkapohjat maassa tai kosketa jotain pintaa." },
                                    { title: "Nimeä silmukka", icon: Compass, text: "Sano itsellesi: 'Nyt aivoni märehtivät taas.' Tämä siirtää hallinnan etuotsalohkolle." },
                                    { title: "Konkreettinen teko", icon: Play, text: "Tee jotain fyysistä. Siivoa hylly, kävele huoneen poikki, avaa ikkuna. Vaihda ympäristöä." }
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

                            <Button onClick={() => setView('summary')} className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
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
                            className="text-center space-y-12 max-w-xl"
                        >
                            <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-blue-50/50">
                                <RefreshCw className="w-12 h-12" />
                            </div>
                            <div className="space-y-4">
                                <h1 className="text-4xl font-serif font-black text-[#292524]">Kierre on rikottu.</h1>
                                <p className="text-lg text-[#57534E]">
                                    Aivosi yrittivät suojella sinua murehtimalla, mutta nyt tiedät, ettei se johda mihinkään.
                                    Valitse tietoinen keskittyminen märehtimisen sijaan aina kun huomaat silmukan alkavan.
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

