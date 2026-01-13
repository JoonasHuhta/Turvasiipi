"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    ArrowRight,
    ArrowLeft,
    AlertTriangle,
    TrafficCone,
    DoorOpen,
    CheckCircle2,
    Briefcase,
    ShieldAlert,
    HelpCircle,
    UserX,
    TrendingDown,
    Flag
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ExitStrategyProps {
    onComplete: () => void;
    onExit: () => void;
}

export const ExitStrategy: React.FC<ExitStrategyProps> = ({ onComplete, onExit }) => {
    const [step, setStep] = useState<'intro' | 'signs' | 'traffic-light' | 'manager-test' | 'plan' | 'summary'>('intro');

    // State for Signs Checklist
    const [checkedSigns, setCheckedSigns] = useState<string[]>([]);

    // State for Traffic Light Assessment
    const [trafficLightScore, setTrafficLightScore] = useState<number>(0); // 0-100 scale logic or simplified

    // State for Manager Test
    const [selectedManagerQuestions, setSelectedManagerQuestions] = useState<number[]>([]);

    const signsList = [
        { id: 'repetition', text: 'Toistuvuus: Tilanteet toistuvat viikoittain, eivätkä ole satunnaisia.' },
        { id: 'exclusion', text: 'Eristäminen: Jään toistuvasti ulkopuolelle tiedosta tai kutsuista.' },
        { id: 'health', text: 'Terveys: Koen fyysisiä oireita (vatsakipu, unettomuus) työpäivää ajatellessa.' },
        { id: 'normalization', text: 'Normalisointi: Asiattomuudet kuitataan "huumorina" tai "talon tapana".' },
        { id: 'target', text: 'Kohdentuminen: Kritiikki kohdistuu minuun henkilönä, ei työhöni.' },
    ];

    const managerQuestions = [
        { text: "Esimies puuttui tilanteeseen viikon sisällä ilmoituksesta.", score: 2 },
        { text: "Esimies kuunteli molempia osapuolia tasapuolisesti.", score: 2 },
        { text: "Tehtiin selkeä kirjallinen suunnitelma seurantoineen.", score: 2 },
        { text: "Esimies vähätteli tilannetta tai kehotti 'olemaan välittämättä'.", score: -5 },
        { text: "Kostotoimia tai painostusta ilmeni ilmoituksen jälkeen.", score: -10 },
    ];

    // Derived score
    const managerScore = selectedManagerQuestions.reduce((acc, idx) => acc + managerQuestions[idx].score, 0);

    const getTrafficLightResult = () => {
        // Simple logic combining signs and manager score
        let severity = 0;
        if (checkedSigns.length >= 3) severity += 50;
        if (managerScore < 0) severity += 50;

        if (severity >= 80) return { color: 'red', text: 'Punainen valo: Vakava tilanne', desc: 'Merkit viittaavat siihen, että tilanne on terveydelle vaarallinen eikä muutosta ole näköpiirissä.' };
        if (severity >= 40) return { color: 'yellow', text: 'Keltainen valo: Varoitus', desc: 'Tilanne on huolestuttava. Aktiivinen seuranta ja suunnitelma B ovat tarpeen.' };
        return { color: 'green', text: 'Vihreä valo: Toivoa on', desc: 'Tilanteessa on vielä mahdollisuuksia korjaaviin liikkeisiin, mutta ole valppaana.' };
    };

    const result = getTrafficLightResult();

    return (
        <div className="min-h-full p-6 md:p-12 max-w-4xl mx-auto flex flex-col gap-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={onExit} className="text-slate-400 hover:text-slate-900 gap-2">
                    <ArrowLeft className="w-4 h-4" /> Keskeytä
                </Button>
                <div className="flex gap-2">
                    {['intro', 'signs', 'traffic-light', 'manager-test', 'plan', 'summary'].map((s, i) => (
                        <div key={s} className={cn("w-2 h-2 rounded-full transition-all",
                            s === step ? "bg-indigo-600 w-4" :
                                ['intro', 'signs', 'traffic-light', 'manager-test', 'plan', 'summary'].indexOf(step) > i ? "bg-indigo-200" : "bg-slate-200"
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
                            <DoorOpen className="w-12 h-12" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">
                            Milloin on aika <br /><span className="text-rose-600">Lähteä?</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Lähteminen ei ole luovuttamista. Se on joskus ainoa oikea strateginen siirto terveytesi suojelemiseksi.
                            Tämä työkalu auttaa sinua arvioimaan tilanteen objektiivisesti.
                        </p>
                        <Button size="lg" onClick={() => setStep('signs')} className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-12 py-8 text-xl font-black uppercase tracking-widest shadow-xl shadow-rose-200">
                            Aloita arviointi <ArrowRight className="ml-2" />
                        </Button>
                    </motion.div>
                )}

                {/* STEP 1: SIGNS */}
                {step === 'signs' && (
                    <motion.div
                        key="signs"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-black uppercase text-slate-900">Varhaiset varoitusmerkit</h2>
                            <p className="text-slate-500">Valitse kaikki, jotka tunnistat omassa tilanteessasi.</p>
                        </div>

                        <div className="grid gap-4 max-w-2xl mx-auto">
                            {signsList.map(item => (
                                <div
                                    key={item.id}
                                    className={cn(
                                        "flex items-center space-x-4 p-5 rounded-2xl border-2 cursor-pointer transition-all hover:bg-slate-50",
                                        checkedSigns.includes(item.id) ? "border-rose-500 bg-rose-50" : "border-slate-100"
                                    )}
                                    onClick={() => {
                                        setCheckedSigns(prev =>
                                            prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id]
                                        );
                                    }}
                                >
                                    <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0",
                                        checkedSigns.includes(item.id) ? "border-rose-500 bg-rose-500 text-white" : "border-slate-300"
                                    )}>
                                        {checkedSigns.includes(item.id) && <CheckCircle2 className="w-4 h-4" />}
                                    </div>
                                    <Label className="text-lg cursor-pointer font-medium text-slate-700 leading-snug">{item.text}</Label>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center pt-8">
                            <Button onClick={() => setStep('manager-test')} className="rounded-full px-8 bg-slate-900 text-white font-bold">
                                Seuraava vaihe <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 2: MANAGER TEST */}
                {step === 'manager-test' && (
                    <motion.div
                        key="manager-test"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-black uppercase text-slate-900">Esimiestesti</h2>
                            <p className="text-slate-500">Miten esimies tai johto on reagoinut tilanteeseen?</p>
                        </div>

                        <div className="grid gap-4 max-w-2xl mx-auto">
                            {managerQuestions.map((q, idx) => {
                                const isSelected = selectedManagerQuestions.includes(idx);
                                return (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all",
                                            isSelected ? (q.score > 0 ? "border-emerald-500 bg-emerald-50" : "border-rose-500 bg-rose-50") : "border-slate-100 bg-white hover:bg-slate-50"
                                        )}
                                        onClick={() => {
                                            setSelectedManagerQuestions(prev =>
                                                prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
                                            );
                                        }}
                                    >
                                        <p className="font-medium text-slate-800 pr-4">{q.text}</p>
                                        {isSelected && (
                                            q.score > 0
                                                ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                                                : <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="bg-indigo-50 p-4 rounded-xl text-center text-indigo-800 text-sm max-w-xl mx-auto">
                            <p><strong>Tiesitkö?</strong> Tutkimusten mukaan puuttuminen epäonnistuu 60-80% tapauksista, jos johto on passiivinen. Johdon tuki on kriittistä.</p>
                        </div>

                        <div className="flex justify-center pt-8">
                            <Button onClick={() => setStep('traffic-light')} className="rounded-full px-8 bg-slate-900 text-white font-bold">
                                Katso tulos <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: TRAFFIC LIGHT (RESULT) */}
                {step === 'traffic-light' && (
                    <motion.div
                        key="traffic-light"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10 py-8 text-center"
                    >
                        <div className="space-y-4">
                            <h2 className="text-3xl font-black uppercase text-slate-900">Tilannearviosi</h2>
                            <p className="text-slate-500">Perustuu havaitsemiisi merkkeihin ja johdon toimintaan.</p>
                        </div>

                        <div className="flex justify-center">
                            <div className="relative w-40 h-80 bg-slate-900 rounded-[3rem] p-4 flex flex-col justify-between shadow-2xl border-4 border-slate-800">
                                <div className={cn("w-28 h-28 rounded-full transition-all duration-1000 shadow-[0_0_50px_rgba(0,0,0,0.5)]",
                                    result.color === 'red' ? "bg-red-500 shadow-red-500" : "bg-red-900/30"
                                )} />
                                <div className={cn("w-28 h-28 rounded-full transition-all duration-1000 shadow-[0_0_50px_rgba(0,0,0,0.5)]",
                                    result.color === 'yellow' ? "bg-amber-500 shadow-amber-500" : "bg-amber-900/30"
                                )} />
                                <div className={cn("w-28 h-28 rounded-full transition-all duration-1000 shadow-[0_0_50px_rgba(0,0,0,0.5)]",
                                    result.color === 'green' ? "bg-emerald-500 shadow-emerald-500" : "bg-emerald-900/30"
                                )} />
                            </div>
                        </div>

                        <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                            <h3 className={cn("text-2xl font-black uppercase mb-4",
                                result.color === 'red' ? "text-red-600" : result.color === 'yellow' ? "text-amber-600" : "text-emerald-600"
                            )}>
                                {result.text}
                            </h3>
                            <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                {result.desc}
                            </p>

                            {result.color === 'red' && (
                                <div className="mt-6 bg-red-50 border border-red-100 p-4 rounded-xl flex items-start gap-3 text-left">
                                    <TrendingDown className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                                    <div>
                                        <p className="font-bold text-red-800 text-sm">Tilastollinen faktaa:</p>
                                        <p className="text-red-700 text-sm">Ihmiset lähtevät tyypillisesti 6-12kk kuluessa, kun terveys alkaa pettää. Älä odota palamista loppuun.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-center pt-8">
                            <Button onClick={() => setStep('plan')} className="rounded-full px-8 bg-slate-900 text-white font-bold h-12 text-lg">
                                Tee Exit-suunnitelma <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 4: ACTION PLAN */}
                {step === 'plan' && (
                    <motion.div
                        key="plan"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-black uppercase text-slate-900">Toimintasuunnitelma</h2>
                            <p className="text-slate-500">Ota ohjat omiin käsiin. Tässä ehdotus seuraaviksi askeleiksi.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="p-6 border-slate-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">1</div>
                                    <h3 className="font-bold text-lg">Varmista selusta</h3>
                                </div>
                                <ul className="space-y-3 text-sm text-slate-600">
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Käy työterveydessä dokumentoimassa oireet.</li>
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Ota yhteys liiton lakimieheen tai luottamusmieheen.</li>
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Päivitä CV ja LinkedIn-profiili (hiljaisesti).</li>
                                </ul>
                            </Card>

                            <Card className="p-6 border-slate-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">2</div>
                                    <h3 className="font-bold text-lg">Henkinen irtautuminen</h3>
                                </div>
                                <ul className="space-y-3 text-sm text-slate-600">
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Lopeta ylisuorittaminen ja "hyväksynnän hakeminen".</li>
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Keskity vapaa-aikaan ja identiteettiin työn ulkopuolella.</li>
                                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Määritä "takaportti" (esim. opintovapaa tai säästöt).</li>
                                </ul>
                            </Card>
                        </div>

                        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl mt-8">
                            <h3 className="text-xl font-bold uppercase tracking-tight mb-4 flex items-center gap-2">
                                <Flag className="w-5 h-5 text-indigo-400" /> Tavoitepäivämäärä
                            </h3>
                            <p className="opacity-80 mb-6">Aseta itsellesi takaraja. Jos tilanne ei ole parantunut siihen mennessä, aktivoit suunnitelman B täysimääräisesti.</p>
                            <div className="flex gap-4">
                                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">3 kuukautta</Button>
                                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">6 kuukautta</Button>
                            </div>
                        </div>

                        <div className="flex justify-center pt-8">
                            <Button onClick={onComplete} className="rounded-full px-12 py-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-xl shadow-emerald-200">
                                Valmis, otan vastuun <CheckCircle2 className="ml-2" />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
