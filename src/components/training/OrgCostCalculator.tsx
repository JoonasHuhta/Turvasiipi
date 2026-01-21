"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calculator,
    TrendingDown,
    Users,
    Euro,
    Clock,
    AlertCircle,
    ArrowRight,
    X,
    Info,
    BarChart3
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

// --- COMPONENT ---
export default function OrgCostCalculator({
    moduleId,
    onComplete,
    onExit
}: {
    moduleId?: string;
    onComplete: (score: number) => void;
    onExit: () => void;
}) {
    const [view, setView] = useState<'intro' | 'calc' | 'result'>('intro');

    // Inputs
    const [employeeCount, setEmployeeCount] = useState(50);
    const [avgSalary, setAvgSalary] = useState(45000);
    const [prevalence, setPrevalence] = useState(10); // % of staff bullied

    // Derived stats
    const results = useMemo(() => {
        const affectedCount = Math.round(employeeCount * (prevalence / 100));
        const dailyWage = (avgSalary * 1.3) / 250; // Incl. employer costs

        // 1. Sickness Absence (Avg 15 days extra for bullied)
        const saDays = affectedCount * 15;
        const saCost = saDays * 400; // Using user's conservative 400€ estimate

        // 2. Presenteeism (20% productivity drop)
        const presenteeismCost = affectedCount * (avgSalary * 1.3) * 0.2;

        // 3. Turnover (10% of bullied leave, cost 0.75x salary)
        const turnoverCount = Math.ceil(affectedCount * 0.1);
        const turnoverCost = turnoverCount * (avgSalary * 1.3) * 0.75;

        // 4. Management/HR time (20h per case)
        const hrCost = affectedCount * 20 * 60; // 60€/h estimate

        const total = saCost + presenteeismCost + turnoverCost + hrCost;

        return {
            affectedCount,
            saCost,
            presenteeismCost,
            turnoverCost,
            hrCost,
            total
        };
    }, [employeeCount, avgSalary, prevalence]);

    return (
        <div className="relative min-h-[600px] w-full bg-[#FAFAF9] rounded-[2rem] p-4 md:p-8 flex flex-col gap-6 border border-[#E7E5E4] shadow-xl overflow-hidden font-sans text-[#44403C]">

            {/* HEADER */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700">
                        <Calculator className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black uppercase tracking-widest text-[#292524]">Kustannuslaskuri</h2>
                        <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">Hiljaisuuden hinta organisaatiolle</span>
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
                            <h1 className="text-4xl font-serif font-black text-[#292524]">Kiusaaminen on<br />kallis valinta.</h1>
                            <p className="text-lg text-[#57534E] leading-relaxed">
                                Nollatoleranssi on usein vain sana. Kun muutamme kiusaamiseen liittyvän pahoinvoinnin numeroiksi, se muuttuu <strong>strategiseksi riskiksi</strong>, johon johdon on pakko puuttua.
                                <br /><br />
                                Lasketaan, mitä ”vastaansanomaton kulttuuri” maksaa organisaatiollesi vuosittain.
                            </p>
                            <Button onClick={() => setView('calc')} size="lg" className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-8 py-6 text-lg shadow-lg">
                                Avaa laskuri <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </motion.div>
                    )}

                    {/* CALCULATOR */}
                    {view === 'calc' && (
                        <motion.div
                            key="calc"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full grid md:grid-cols-2 gap-12 items-center"
                        >
                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <label className="text-sm font-bold text-[#292524]">Henkilöstömäärä</label>
                                        <span className="text-2xl font-black text-orange-600">{employeeCount}</span>
                                    </div>
                                    <Slider
                                        value={[employeeCount]}
                                        onValueChange={([v]) => setEmployeeCount(v)}
                                        max={500}
                                        step={5}
                                        className="py-4"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <label className="text-sm font-bold text-[#292524]">Keski-vuosipalkka (€)</label>
                                        <span className="text-2xl font-black text-orange-600">{avgSalary.toLocaleString('fi-FI')}€</span>
                                    </div>
                                    <Slider
                                        value={[avgSalary]}
                                        onValueChange={([v]) => setAvgSalary(v)}
                                        min={20000}
                                        max={100000}
                                        step={1000}
                                        className="py-4"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center gap-2">
                                            <label className="text-sm font-bold text-[#292524]">Kiusaamisen esiintyvyys</label>
                                            <Badge variant="outline" className="text-[10px] uppercase font-black">Teollisuus ka. ~10%</Badge>
                                        </div>
                                        <span className="text-2xl font-black text-orange-600">{prevalence}%</span>
                                    </div>
                                    <Slider
                                        value={[prevalence]}
                                        onValueChange={([v]) => setPrevalence(v)}
                                        max={30}
                                        step={1}
                                        className="py-4"
                                    />
                                </div>
                            </div>

                            <Card className="p-8 bg-white border-[#E7E5E4] shadow-inner space-y-8">
                                <div className="text-center">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-[#A8A29E] mb-2">Arvioitu hinta hiljaisuudesta</h3>
                                    <div className="text-5xl font-black text-[#292524] tabular-nums">
                                        {results.total.toLocaleString('fi-FI', { maximumFractionDigits: 0 })}€
                                    </div>
                                    <p className="text-xs text-[#78716C] mt-2">vuoressa / organisaatio</p>
                                </div>

                                <div className="space-y-4 border-t border-[#F5F5F4] pt-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#57534E]">Sairauspoissaolot (SA):</span>
                                        <span className="font-bold">{results.saCost.toLocaleString('fi-FI')}€</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#57534E]">Presenteeismi:</span>
                                        <span className="font-bold">{results.presenteeismCost.toLocaleString('fi-FI')}€</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#57534E]">Henkilöstön vaihtuvuus:</span>
                                        <span className="font-bold">{results.turnoverCost.toLocaleString('fi-FI')}€</span>
                                    </div>
                                </div>

                                <Button onClick={() => setView('result')} className="w-full bg-[#292524] hover:bg-[#44403C] text-white py-6">
                                    Näytä analyysi <BarChart3 className="ml-2 w-4 h-4" />
                                </Button>
                            </Card>
                        </motion.div>
                    )}

                    {/* RESULT / ANALYSIS */}
                    {view === 'result' && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full space-y-8"
                        >
                            <div className="text-center space-y-2">
                                <Badge className="bg-orange-100 text-orange-700 border-0">Strateginen Laskelma</Badge>
                                <h2 className="text-3xl font-bold">Kiusaaminen maksaa {results.total.toLocaleString('fi-FI')}€ vuodessa.</h2>
                                <p className="text-[#57534E]">Arvio on perustuu {results.affectedCount} vaikuttuneeseen työntekijään.</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h4 className="font-bold text-orange-700 flex items-center gap-2">
                                        <TrendingDown className="w-5 h-5" /> Suurimmat erät
                                    </h4>
                                    <p className="text-sm text-[#78716C]">
                                        Tämä laskelma ei sisällä mainehaittaa tai mahdollisia oikeudenkäyntikuluja, jotka voivat helposti kaksinkertaistaa summan.
                                        <strong> Presenteeismi</strong> (työntekijä on paikalla, mutta tehokkuus on laskenut) on usein näkymätön ”valuva reikä”, joka kuluttaa tuhansia euroja kuukaudessa.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-bold text-orange-700 flex items-center gap-2">
                                        <Info className="w-5 h-5" /> Suositus johdolle
                                    </h4>
                                    <p className="text-sm text-[#78716C]">
                                        Interventio, joka vähentää kiusaamista vain 20%, maksaa itsensä takaisin {(results.total * 0.2).toLocaleString('fi-FI')}€ säästönä jo ensimmäisenä vuonna.
                                        Kulttuurimuutos ei ole vain inhimillisyyttä, se on <strong>tuottavuusloikka</strong>.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 justify-center">
                                <Button onClick={() => setView('calc')} variant="outline" className="px-8">Muokkaa lukuja</Button>
                                <Button onClick={() => { onComplete(100); }} className="bg-orange-600 hover:bg-orange-700 text-white px-8">
                                    Tallenna ja jatka
                                </Button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}

