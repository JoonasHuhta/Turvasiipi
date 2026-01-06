"use client";

import { useState, useEffect } from "react";
import { TimelineEvent } from "@/types";
import { useSecureLocalStorage } from "@/hooks/useSecureLocalStorage";
import { VaultWrapper } from "@/components/VaultWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Printer, ArrowLeft, BrainCircuit, CalendarRange, Scale, AlertTriangle, FileCheck } from "lucide-react";
import Link from "next/link";
import { analyzeEvents, generateSummaryChecklist } from "@/helpers/reportAnalysis";

export default function DocumentsPage() {
    const { data: events, isLocked, hasData, unlock } = useSecureLocalStorage<TimelineEvent[]>("suojasiipi_events_secure", []);
    const [mounted, setMounted] = useState(false);

    // Stats
    const stats = mounted ? analyzeEvents(events) : null;
    const checklist = stats ? generateSummaryChecklist(stats) : [];

    useEffect(() => {
        setMounted(true);
    }, []);

    const handlePrint = () => {
        window.print();
    };

    if (!mounted) return <div className="p-10 text-center animate-pulse">Ladataan raportointityökalua...</div>;

    return (
        <VaultWrapper isLocked={isLocked} hasData={hasData} onUnlock={unlock}>
            <div className="space-y-8 pb-20 animate-in fade-in duration-500">
                {/* Header (Hidden in Print) */}
                <div className="print:hidden space-y-6">
                    <div className="flex items-center gap-4">
                        <Link href="/timeline">
                            <Button variant="ghost" className="pl-0 gap-2 text-slate-500 hover:text-slate-800">
                                <ArrowLeft className="w-4 h-4" /> Takaisin aikajanaan
                            </Button>
                        </Link>
                    </div>

                    <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row gap-6 justify-between items-center relative overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <div className="relative z-10 space-y-2">
                            <h1 className="text-3xl font-bold">Tilannekuva</h1>
                            <p className="text-indigo-200 text-lg max-w-lg">
                                Automaattinen kooste kirjauksistasi. Käytä tätä keskustelun tukena työterveydessä tai luottamusmiehen kanssa.
                            </p>
                        </div>
                        <Button
                            onClick={handlePrint}
                            className="relative z-10 bg-white text-indigo-900 hover:bg-indigo-50 border-0 h-12 px-6 text-base font-bold shadow-lg gap-2"
                        >
                            <Printer className="w-5 h-5" /> Tallenna PDF / Tulosta
                        </Button>
                    </div>
                </div>

                {/* Printable Report Area */}
                <div className="print:p-0 print:shadow-none bg-white p-8 md:p-12 rounded-xl shadow-sm border border-slate-100 max-w-4xl mx-auto space-y-10">

                    {/* Report Header */}
                    <div className="border-b border-slate-200 pb-8 flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                            <h2 className="text-3xl font-serif text-slate-900 mb-2">Häirinnän ja epäasiallisen kohtelun kooste</h2>
                            <p className="text-slate-500">Luottamuksellinen • Turvasiipi-sovelluksen automaattiraportti</p>
                        </div>
                        <div className="text-right text-sm text-slate-400">
                            Luotu: {new Date().toLocaleDateString("fi-FI")} <br />
                            ID: {crypto.randomUUID().slice(0, 8)}
                        </div>
                    </div>

                    {/* Key Stats Grid */}
                    {stats && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <div className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                                    <FileCheck className="w-3 h-3" /> Tapahtumat
                                </div>
                                <div className="text-3xl font-bold text-slate-800">{stats.totalEvents}</div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <div className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                                    <CalendarRange className="w-3 h-3" /> Kesto (pv)
                                </div>
                                <div className="text-3xl font-bold text-slate-800">{stats.durationDays}</div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <div className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3" /> Vakavuus (ka)
                                </div>
                                <div className={`text-3xl font-bold ${stats.avgSeverity > 7 ? 'text-rose-600' : 'text-slate-800'}`}>
                                    {stats.avgSeverity}/10
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <div className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1 flex items-center gap-1">
                                    <Scale className="w-3 h-3" /> Päätyyppi
                                </div>
                                <div className="text-sm font-bold text-slate-800 leading-tight pt-1">
                                    {stats.commonTypes[0] || "Ei määritelty"}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* AI / Automated Insight Section */}
                    {checklist.length > 0 && (
                        <div className="bg-amber-50 mx-4 md:-mx-4 p-6 rounded-xl border-l-4 border-amber-400 space-y-3">
                            <h3 className="flex items-center gap-2 text-amber-900 font-bold">
                                <BrainCircuit className="w-5 h-5" /> Automaattiset havainnot
                            </h3>
                            <ul className="space-y-2">
                                {checklist.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-amber-800 text-sm">
                                        <span className="mt-1">•</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Detailed Event List */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-slate-800 border-b pb-2">Tapahtumakuvauset (Objektiiviset)</h3>
                        {events.length === 0 ? (
                            <p className="text-slate-400 italic">Ei kirjattuja tapahtumia.</p>
                        ) : (
                            events
                                .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                                .map((event) => (
                                    <div key={event.id} className="break-inside-avoid border-b border-slate-100 pb-4 mb-4 last:border-0">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <div className="font-bold text-slate-700">{event.date}</div>
                                            <div className="text-xs text-slate-400 uppercase tracking-widest">{event.emotion}</div>
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="md:col-span-2 space-y-2">
                                                <div>
                                                    <span className="text-xs font-bold text-slate-400 uppercase">Fakta:</span>
                                                    <p className="text-slate-800 text-sm whitespace-pre-wrap mt-0.5">
                                                        {event.objectiveDescription || event.description}
                                                    </p>
                                                </div>
                                                {event.evidence && (
                                                    <div className="inline-block bg-slate-100 px-2 py-1 rounded text-xs text-slate-600">
                                                        📎 Todiste: {event.evidence}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 h-fit">
                                                <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Vaikutus:</span>
                                                <p className="text-slate-600 text-xs italic">
                                                    {event.subjectiveEffect || "Ei kirjattua vaikutusta."}
                                                </p>
                                                <div className="mt-2 text-xs text-slate-400">
                                                    Vakavuus: {event.severity}/10
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>

                    <div className="pt-10 border-t text-center text-slate-400 text-xs">
                        <p>Tämä dokumentti on luotu Turvasiipi-palvelussa. <br />Käyttäjä vastaa tietojen oikeellisuudesta.</p>
                    </div>

                </div>
            </div>
        </VaultWrapper>
    );
}
