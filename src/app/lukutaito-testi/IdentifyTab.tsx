"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, AlertTriangle, ShieldAlert, ArrowUp, ChevronRight, CheckCircle2, HelpCircle } from "lucide-react";
import { identifyLevels, powerScaleItems, grayAreaScenarios } from "@/data/identify-situation";
import { cn } from "@/lib/utils";

export function IdentifyTab() {
    const [powerScaleCount, setPowerScaleCount] = useState(0);
    const [grayAreaAnswers, setGrayAreaAnswers] = useState<Record<number, string>>({});
    const [showGrayAreaResult, setShowGrayAreaResult] = useState<Record<number, boolean>>({});

    const handlePowerScaleChange = (checked: boolean) => {
        setPowerScaleCount(prev => checked ? prev + 1 : prev - 1);
    };

    const handleGrayAreaSelect = (scenarioId: number, optionId: string) => {
        setGrayAreaAnswers(prev => ({ ...prev, [scenarioId]: optionId }));
        setShowGrayAreaResult(prev => ({ ...prev, [scenarioId]: true }));
    };

    const getLevelColor = (color: string) => {
        switch (color) {
            case 'yellow': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'orange': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'red': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    const getLevelIcon = (color: string) => {
        switch (color) {
            case 'yellow': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
            case 'orange': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
            case 'red': return <ShieldAlert className="w-5 h-5 text-red-600" />;
            default: return null;
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-500">

            {/* --- VISUALIZATION: ESCALATION STAIRS --- */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <h2 className="text-2xl font-black text-slate-900 mb-6">Tilanteen eskaloituminen</h2>
                <div className="relative max-w-lg mx-auto py-8">
                    {/* Stairs Graphic */}
                    <div className="flex flex-col gap-4 relative z-10">
                        <div className="flex items-center gap-4 pl-[0%] opacity-100">
                            <div className="w-full bg-red-500 text-white p-4 rounded-xl shadow-lg border-l-4 border-red-700 flex items-center justify-between">
                                <span className="font-black">🔴 KRIISI</span>
                                <span className="text-xs bg-red-700/30 px-2 py-1 rounded">3-6 kk</span>
                            </div>
                        </div>
                        <div className="flex justify-center text-slate-300">
                            <ArrowUp className="w-6 h-6" />
                        </div>
                        <div className="flex items-center gap-4 pl-[10%] opacity-90">
                            <div className="w-full bg-orange-400 text-white p-4 rounded-xl shadow-md border-l-4 border-orange-600 flex items-center justify-between">
                                <span className="font-bold">🟠 SYSTEMAATTINEN</span>
                                <span className="text-xs bg-orange-600/30 px-2 py-1 rounded">1-3 kk</span>
                            </div>
                        </div>
                        <div className="flex justify-center text-slate-300">
                            <ArrowUp className="w-6 h-6" />
                        </div>
                        <div className="flex items-center gap-4 pl-[20%] opacity-80">
                            <div className="w-full bg-yellow-400 text-yellow-900 p-4 rounded-xl shadow-sm border-l-4 border-yellow-600 flex items-center justify-between">
                                <span className="font-bold">🟡 VARHAISET MERKIT</span>
                                <span className="text-xs bg-yellow-600/20 px-2 py-1 rounded">Alku</span>
                            </div>
                        </div>
                        <div className="flex justify-center text-slate-300">
                            <ArrowUp className="w-6 h-6" />
                        </div>
                        <div className="flex items-center gap-4 pl-[30%] opacity-60">
                            <div className="w-full bg-emerald-100 text-emerald-800 p-3 rounded-xl border border-emerald-200 text-center">
                                <span className="font-medium text-sm">✅ TERVE TYÖYMPÄRISTÖ</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-slate-500 text-sm mt-8 italic">
                        "Kiusaaminen ei ala vakavana - se kasvaa. Siksi varhaiset merkit ovat tärkeitä."
                    </p>
                </div>
            </section>

            {/* --- POWER SCALE --- */}
            <section className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
                <div className="flex items-start gap-4 mb-6">
                    <div className="bg-indigo-600 p-2 rounded-lg text-white">
                        <ArrowUp className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Valtasuhde-skaalain</h3>
                        <p className="text-slate-600 text-sm">Onko kiusaaja joku alla olevista? Jos kyllä, tilanne on vakavampi.</p>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {powerScaleItems.map(item => (
                        <div key={item.id} className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <Checkbox
                                id={item.id}
                                onCheckedChange={(checked) => handlePowerScaleChange(checked as boolean)}
                            />
                            <label
                                htmlFor={item.id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full"
                            >
                                {item.text}
                            </label>
                        </div>
                    ))}
                </div>

                {powerScaleCount > 0 && (
                    <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-indigo-900 text-sm font-medium flex items-center gap-3 animate-in slide-in-from-top-2">
                        <AlertTriangle className="w-5 h-5 text-indigo-600" />
                        <span>Valtasuhde tunnistettu: Tämä nostaa automaattisesti vakavuusastetta (esim. 🟡 → 🟠). Ole erityisen varovainen.</span>
                    </div>
                )}
            </section>

            {/* --- LEVELS ACCORDION --- */}
            <div className="space-y-4">
                {identifyLevels.map((level) => (
                    <Card key={level.color} className={cn("border-l-8 overflow-hidden",
                        level.color === 'yellow' ? "border-l-yellow-400" :
                            level.color === 'orange' ? "border-l-orange-500" : "border-l-red-600"
                    )}>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value={level.color} className="border-none">
                                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                                    <div className="flex items-center justify-between w-full text-left">
                                        <div className="flex items-center gap-4">
                                            <div className={cn("p-2 rounded-full", level.color === 'yellow' ? "bg-yellow-100" : level.color === 'orange' ? "bg-orange-100" : "bg-red-100")}>
                                                {getLevelIcon(level.color)}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-slate-900">{level.title}</h3>
                                                <p className="text-sm text-slate-500 font-medium">{level.subtitle}</p>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6 pt-0">
                                    <div className="pl-[3.25rem] space-y-6">
                                        <p className="text-slate-600">{level.description}</p>

                                        {/* Signs Categories */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {level.signs.map((signCat, idx) => (
                                                <div key={idx} className="bg-slate-50 p-5 rounded-2xl">
                                                    <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">{signCat.category}</h4>
                                                    <ul className="space-y-2">
                                                        {signCat.items.map(sign => (
                                                            <li key={sign.id} className="text-slate-700 text-sm flex items-start gap-2">
                                                                <span className={cn("mt-1.5 w-1.5 h-1.5 rounded-full shrink-0",
                                                                    level.color === 'yellow' ? "bg-yellow-400" :
                                                                        level.color === 'orange' ? "bg-orange-500" : "bg-red-600"
                                                                )} />
                                                                {sign.text}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Check Yourself */}
                                        <div className={cn("p-4 rounded-xl border-2 flex items-center gap-4",
                                            level.color === 'yellow' ? "bg-yellow-50 border-yellow-100" :
                                                level.color === 'orange' ? "bg-orange-50 border-orange-100" : "bg-red-50 border-red-100"
                                        )}>
                                            <HelpCircle className={cn("w-6 h-6 shrink-0",
                                                level.color === 'yellow' ? "text-yellow-600" :
                                                    level.color === 'orange' ? "text-orange-600" : "text-red-600"
                                            )} />
                                            <div>
                                                <span className="font-bold text-xs uppercase opacity-70 mb-1 block">Tarkista itsesi</span>
                                                <p className="text-slate-900 font-bold italic">"{level.checkYourself}"</p>
                                            </div>
                                        </div>

                                        {/* What To Do */}
                                        <div className="mt-4">
                                            <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                                                <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                                                Mitä teen nyt?
                                            </h4>
                                            <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100">
                                                <ul className="space-y-3">
                                                    {level.whatToDo.map((action, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-slate-700 text-sm font-medium">
                                                            <div className="w-5 h-5 rounded-full bg-white border border-indigo-200 flex items-center justify-center text-xs font-bold text-indigo-600 shrink-0 shadow-sm">
                                                                {i + 1}
                                                            </div>
                                                            {action}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </Card>
                ))}
            </div>

            {/* --- GRAY AREA TEST --- */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                        <HelpCircle className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900">Harmaa alue -testi</h2>
                </div>

                <div className="space-y-8">
                    {grayAreaScenarios.map((scenario) => (
                        <div key={scenario.id} className="space-y-4">
                            <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-slate-300 italic text-slate-700 mb-4">
                                "{scenario.text}"
                            </div>

                            <p className="font-bold text-sm text-slate-900">Onko tämä:</p>

                            <div className="grid sm:grid-cols-2 gap-3">
                                {scenario.options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handleGrayAreaSelect(scenario.id, option.id)}
                                        className={cn(
                                            "p-4 rounded-xl text-left text-sm font-medium border-2 transition-all",
                                            grayAreaAnswers[scenario.id] === option.id
                                                ? "bg-indigo-50 border-indigo-500 text-indigo-900 ring-2 ring-indigo-200"
                                                : "bg-white border-slate-200 hover:border-indigo-300 text-slate-700 hover:bg-slate-50"
                                        )}
                                    >
                                        {option.text}
                                    </button>
                                ))}
                            </div>

                            {showGrayAreaResult[scenario.id] && (
                                <div className="mt-4 bg-emerald-50 p-6 rounded-2xl border border-emerald-100 animate-in fade-in zoom-in-95">
                                    <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5" /> Oikea vastaus: {scenario.correctAnswer}
                                    </h4>
                                    <p className="text-emerald-800 text-sm">
                                        {scenario.explanation}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
