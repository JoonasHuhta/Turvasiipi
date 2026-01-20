"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, ArrowRight, Users, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { GameStats } from "@/lib/simulator/types";

interface NeuroEndingProps {
    currentPhaseId: string;
    stats: GameStats;
    onExit: () => void;
}

export function NeuroEnding({ currentPhaseId, stats, onExit }: NeuroEndingProps) {
    const isBurnout = currentPhaseId === 'END_BURNOUT';
    const isNewStart = currentPhaseId === 'END_NEW_START';

    const statConfig = [
        { id: 'selfEsteem', label: 'Itseluottamus', icon: Brain, color: 'bg-indigo-500' },
        { id: 'teamAcceptance', label: 'Hyväksyntä', icon: Users, color: 'bg-cyan-500' },
        { id: 'physicalHealth', label: 'Jaksaminen', icon: Heart, color: 'bg-rose-500' },
        { id: 'hope', label: 'Toivo', icon: ArrowRight, color: 'bg-emerald-500' }
    ];

    return (
        <div className="fixed inset-0 z-[100] bg-slate-950 text-white flex items-center justify-center p-4 overflow-y-auto no-scrollbar">
            <Card className="max-w-3xl w-full bg-slate-900 border-indigo-900/30 p-6 md:p-12 text-center space-y-8 shadow-2xl shadow-indigo-900/10 relative">
                <div className="text-6xl mb-4 animate-in zoom-in spin-in-3 duration-700">
                    {isBurnout ? '🔋' : (isNewStart ? '🌟' : '🧩')}
                </div>

                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                    {isBurnout ? "Päivä päättyi uupumiseen" : (isNewStart ? "Uusi alku" : "Päivä pulkassa")}
                </h1>

                <div className="prose prose-invert prose-lg mx-auto text-slate-300 leading-relaxed">
                    <p>
                        {isBurnout
                            ? "Lopulta maski putosi. Jatkuva yrittäminen sopeutua muuttiin joka ei jousta, vei voimasi. Tämä ei ole epäonnistuminen, vaan merkki siitä, että ympäristön on muututtava."
                            : "Selvisit päivästä. Olet tehnyt lukemattomia näkymättömiä valintoja säästääksesi energiaasi ja tullaksesi ymmärretyksi."}
                    </p>
                </div>

                {/* FINAL STATS GRID */}
                <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6 flex items-center justify-center gap-2">
                        <Brain className="w-4 h-4" />
                        Päivän saldot
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {statConfig.map(stat => (
                            <div key={stat.id} className="flex flex-col items-center gap-2">
                                <div className={cn("p-2 rounded-lg bg-opacity-20 mb-1", stat.color.replace('bg-', 'bg-').replace('500', '900'), stat.color.replace('bg-', 'text-').replace('500', '400'))}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <div className="text-2xl font-mono font-bold text-white">{stats[stat.id as keyof GameStats] || 0}%</div>
                                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <Button size="lg" variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 rounded-full px-8" onClick={onExit}>
                        Palaa Neuromoninaisuus-sivulle
                    </Button>
                    <Button size="lg" variant="outline" className="border-slate-700 text-slate-400 hover:bg-slate-800 h-12 rounded-full px-8" onClick={() => window.location.reload()}>
                        Yritä uudelleen
                    </Button>
                </div>
            </Card>
        </div>
    );
}
