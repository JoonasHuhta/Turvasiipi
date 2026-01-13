"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, AlertCircle, ArrowUp, Heart, ShieldCheck, ThumbsUp } from "lucide-react";
import { healthySigns, conflictVsBullying } from "@/data/healthy-workplace";
import { cn } from "@/lib/utils";

export function HealthyWorkplaceTab() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    const toggleItem = (categoryIndex: number, itemIndex: number) => {
        const key = `${categoryIndex}-${itemIndex}`;
        setCheckedItems(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const checkedCount = Object.values(checkedItems).filter(Boolean).length;

    // Calculate status based on user's logic
    // 20-25 = Excellent
    // 15-19 = Healthy
    // 10-14 = Concern
    // 5-9 = Warning
    // 0-4 = Crisis
    const getStatus = (count: number) => {
        if (count >= 20) return {
            label: "ERINOMAINEN",
            color: "text-emerald-600",
            bg: "bg-emerald-100",
            border: "border-emerald-200",
            icon: Heart,
            desc: "Jatka samaan malliin, vahvista kulttuuria! 💚"
        };
        if (count >= 15) return {
            label: "TERVE",
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            border: "border-emerald-200",
            icon: CheckCircle2,
            desc: "Työpaikkasi on terveellä pohjalla. ✅"
        };
        if (count >= 10) return {
            label: "HUOLI",
            color: "text-yellow-600",
            bg: "bg-yellow-50",
            border: "border-yellow-200",
            icon: AlertCircle,
            desc: "Tunnista ongelma-alueet, tee toimintasuunnitelma. 🟡"
        };
        if (count >= 5) return {
            label: "VAROITUS",
            color: "text-orange-600",
            bg: "bg-orange-50",
            border: "border-orange-200",
            icon: AlertCircle,
            desc: "Välitön arviointi tarpeen, harkitse ulkopuolista apua. 🟠"
        };
        return {
            label: "KRIISI",
            color: "text-red-600",
            bg: "bg-red-50",
            border: "border-red-200",
            icon: ShieldCheck,
            desc: "Akuutti toiminta tarpeen. Ota yhteys työsuojeluun. 🔴"
        };
    };

    const status = getStatus(checkedCount);
    const StatusIcon = status.icon;

    return (
        <div className="space-y-12 animate-in fade-in duration-500">

            {/* --- VISUALIZATION: THERMOMETER --- */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-emerald-100 p-2 rounded-xl">
                        <Heart className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900">Työhyvinvoinnin termometri</h2>
                </div>

                <div className="relative max-w-lg mx-auto py-8 space-y-2">
                    {[
                        { label: "🔴 KRIISI - Akuutti toiminta tarpeen", color: "bg-red-50 text-red-700 border-red-200" },
                        { label: "🟠 VAROITUS - Systemaattinen ongelma", color: "bg-orange-50 text-orange-700 border-orange-200" },
                        { label: "🟡 HUOLI - Varhaiset merkit", color: "bg-yellow-50 text-yellow-700 border-yellow-200" },
                        { label: "✅ TERVE - Näin sen kuuluu olla", color: "bg-emerald-50 text-emerald-700 border-emerald-200 font-bold ring-2 ring-emerald-500/20" },
                        { label: "💚 ERINOMAINEN - Turvallisuuskulttuuri", color: "bg-emerald-100 text-emerald-800 border-emerald-300 font-black shadow-sm" }
                    ].reverse().map((level, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            {idx > 0 && <ArrowUp className="w-4 h-4 text-slate-300 my-1" />}
                            <div className={cn("w-full p-4 rounded-xl border text-center transition-all hover:scale-[1.02]", level.color)}>
                                {level.label}
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-center text-slate-500 text-sm mt-6 italic max-w-lg mx-auto">
                    "Terve työpaikka ei tarkoita, ettei ole koskaan konflikteja - vaan että ne käsitellään rakentavasti."
                </p>
            </section>

            {/* --- CHECK YOUR TEAM --- */}
            <section className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">Tarkista tiimisi</h2>
                        <p className="text-slate-600">Rastita kohdat, jotka toteutuvat työpaikallasi.</p>
                    </div>

                    {/* Live Score Card */}
                    <div className={cn(
                        "flex items-center gap-4 px-6 py-4 rounded-2xl border-2 shadow-sm transition-all duration-300",
                        status.bg, status.border
                    )}>
                        <div className="text-center">
                            <div className="text-3xl font-black text-slate-900 leading-none">{checkedCount}</div>
                            <div className="text-[10px] uppercase font-bold text-slate-500">Rastia</div>
                        </div>
                        <div className="h-10 w-px bg-slate-300/50" />
                        <div>
                            <div className={cn("font-black text-lg flex items-center gap-2", status.color)}>
                                <StatusIcon className="w-5 h-5" />
                                {status.label}
                            </div>
                            <div className="text-xs font-medium text-slate-600 max-w-[200px] leading-tight mt-0.5">
                                {status.desc}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {healthySigns.map((category, catIdx) => (
                        <Card key={catIdx} className="border-none shadow-sm overflow-hidden">
                            <div className="bg-white p-4 font-bold text-slate-900 border-b border-slate-100 flex items-center justify-between">
                                {category.title}
                                <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                                    {category.items.filter((_, itemIdx) => checkedItems[`${catIdx}-${itemIdx}`]).length} / {category.items.length}
                                </span>
                            </div>
                            <CardContent className="p-0">
                                {category.items.map((item, itemIdx) => {
                                    const isChecked = checkedItems[`${catIdx}-${itemIdx}`];
                                    return (
                                        <div
                                            key={itemIdx}
                                            onClick={() => toggleItem(catIdx, itemIdx)}
                                            className={cn(
                                                "flex items-start gap-3 p-4 border-b border-slate-50 cursor-pointer transition-colors hover:bg-slate-50 last:border-0",
                                                isChecked ? "bg-emerald-50/30" : ""
                                            )}
                                        >
                                            <div className={cn(
                                                "w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all text-white",
                                                isChecked ? "bg-emerald-500 border-emerald-500" : "bg-white border-slate-300"
                                            )}>
                                                {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                                            </div>
                                            <span className={cn("text-sm transition-colors", isChecked ? "text-slate-900 font-medium" : "text-slate-600")}>
                                                {item}
                                            </span>
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* --- COMPARISON TABLE --- */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <h2 className="text-2xl font-black text-slate-900 mb-6">Normaali konflikti vs. Kiusaaminen</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap md:whitespace-normal">
                        <thead>
                            <tr className="border-b-2 border-slate-100">
                                <th className="p-4 font-black text-slate-400 uppercase tracking-wider text-xs w-1/4">Tilanne</th>
                                <th className="p-4 font-black text-emerald-600 uppercase tracking-wider text-xs w-1/3 bg-emerald-50/50 rounded-t-xl">✅ Terve työpaikka</th>
                                <th className="p-4 font-black text-yellow-600 uppercase tracking-wider text-xs w-1/3 bg-yellow-50/50 rounded-t-xl">🟡 Varoitusmerkki</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {conflictVsBullying.map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 font-bold text-slate-900">{row.situation}</td>
                                    <td className="p-4 text-emerald-900 bg-emerald-50/30 font-medium">{row.healthy}</td>
                                    <td className="p-4 text-yellow-900 bg-yellow-50/30">{row.warning}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
